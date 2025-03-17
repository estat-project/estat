      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      margin = {top:50, bottom:30, left:100, right:30};
      svgWidth    = 640;
      svgHeight   = 300;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;
      var widthL  = margin.left - 10;
      var heightR = 280;
      var i, j, k, nrow, ncol, num, nn; 
      var gxmin, gxmax, gymin, gymax, temp;
      var xmin, xmax, xbar, xucl, xcl, xlcl;
      var mTitle;
      var checkInput = false;
      var fontsize = "1em";
      var nline  = 5+1;
      var nobs   = new Array(nline);
      var rowMax = 201;
      var xmean  = new Array(rowMax);

      document.getElementById("kk").disabled = true;
      document.getElementById("xbar").disabled = true;
      xucl = document.getElementById("xucl").value;
      xcl  = document.getElementById("xcl").value;
      xlcl = document.getElementById("xlcl").value;


      // input data control ===================================================
      d3.select("#datax").on("input", function() {
        stat    = simpletext("#datax");  
        datax   = data;  
        nobs[0] = stat.n;
      });
      d3.select("#data1").on("input", function() {
        stat    = simplestat("#data1");  
        data1   = data;  
        nobs[1] = stat.n;
      });
      // basic text input function ============================================
      simpletext = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
        n = data.length;
        return {'n' : n};
      }
      // update data
      updateData = function() {
        document.getElementById("datax").value = '';    
        document.getElementById("data1").value = '';
      }

      // erase Line Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("datax").value = "";    
        document.getElementById("data1").value = "";
        document.getElementById("nn").value    = "";   
        document.getElementById("kk").value    = "";   
        document.getElementById("xbar").value  = "";   
      })

      // Draw Control Chart ======================================
      d3.select("#execute").on("click",function() {
        nn   = document.getElementById("nn").value;
        ncol = 0;
        // 자료수가 100개 이하인지 체크
        if (nobs[0] > 100) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[49][langNum]).style("stroke","red").style("font-size","1em");
            return;
        }       
        // 입력행이 같은지 체크
        if (nobs[0] != nobs[1] ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
        }
        else ncol++;
        if (nn == '') {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text("Enter sample size n").style("stroke","red").style("font-size","1em");
            return;
        }
        nrow = nobs[0];
        // 입력 도수에 숫자 문자 빈칸 있나 체크
        for (i=0; i<nrow; i++) {
            if (isNaN(data1[i]) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
        }
        initialize();
        drawXbarChart();
      })

      // 초기 작업
      function initialize() {
        chart.selectAll("*").remove();
        var tmin, tmax, xsum, rsum, temp;
        // 입력값 최대도수 계산
        xmin =  99999999;
        xmax = -99999999;
        xsum = 0;
        for (i=0; i<nrow; i++) { 
          xmean[i] = data1[i] / nn;
          xsum += xmean[i];
        }
        xbar = xsum / nrow;
        document.getElementById("kk").value   = nrow;
        document.getElementById("xbar").value = f3(xbar);
        temp = 3*Math.sqrt(xbar*(1-xbar)/nn);
        xucl = xbar + temp;
        xcl  = xbar;
        xlcl = xbar - temp;
        if (document.getElementById("xucl").value == '') {
          document.getElementById("xucl").value = f3(xucl);
          document.getElementById("xcl").value  = f3(xcl);
          document.getElementById("xlcl").value = f3(xlcl);
        }
        else {
          xucl = parseFloat(document.getElementById("xucl").value);
          xcl  = parseFloat(document.getElementById("xcl").value);
          xlcl = parseFloat(document.getElementById("xlcl").value);
        }
        temp = (xucl - xlcl) / 6;
        freqMaxX = xucl + temp;
        freqMinX = xlcl - temp;
      }

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
 
  // Draw Xbar Chart
  function drawXbarChart() {
    var i, j, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var betweenbarWidth = graphWidth / nrow; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var tbuffer  = (freqMaxX - freqMinX) * 0.1;
    freqMaxX = freqMaxX + tbuffer;
    freqMinX = freqMinX - tbuffer;
    var freqRatioV = graphHeight / (freqMaxX - freqMinX); // 그래프 영역과 데이터 영역의 비율

    chart.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top - 15)
        .style("font-size", "1.4em")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .text("p Chart")
    drawAxisX();

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")

    // UCL
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (xucl - freqMinX) * freqRatioV;
      chart.append("text")
        .attr("x", margin.left - widthL)
        .attr("y", y1 + 5)
        .style("font-size", "0.8em")
        .style("font-family", "sans-seirf")
        .style("stroke", "red")
//        .style("text-anchor", "middle")
        .text("UCL "+f3(xucl))
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (xucl - freqMinX) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        x1 = x2;
        y1 = y2;
      }
    // CL
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (xcl - freqMinX) * freqRatioV;
      drawLabel(nrow, datax, betweenbarWidth, barWidth, gapWidth, y1);
      chart.append("text")
        .attr("x", margin.left - widthL)
        .attr("y", y1 + 5)
        .style("font-size", "0.8em")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
//        .style("text-anchor", "middle")
        .text("CL "+f3(xcl))
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (xcl - freqMinX) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "grey")
        x1 = x2;
        y1 = y2;
      }
    // LCL
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (xlcl - freqMinX) * freqRatioV;
      chart.append("text")
        .attr("x", margin.left - widthL)
        .attr("y", y1 + 5)
        .style("font-size", "0.8em")
        .style("font-family", "sans-seirf")
        .style("stroke", "red")
//        .style("text-anchor", "middle")
        .text("LCL "+f3(xlcl))
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (xlcl - freqMinX) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        x1 = x2;
        y1 = y2;
      }

    // Xbar
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (xmean[0] - freqMinX) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("stroke", "black")
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (xmean[i] - freqMinX) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "black")
        if (xmean[i] >= xlcl && xmean[i] <= xucl) {
          chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("stroke", "black")
        }
        else {
          chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","8")
             .style("stroke", "red")
        }
        x1 = x2;
        y1 = y2;
      }
   }


  // 변량값명 쓰기 함수
  function drawLabel(ndvalue, label, betweenbarWidth, barWidth, gapWidth, yy) {
    var i, j, k, x1, y1, tx, ty, str, strAnchor;
    var angle;

    ty = yy;
    if (ndvalue < 21) angle = 0;
    else if (ndvalue < 51) angle = 45;
    else angle = 90;
    str = "middle";
    y1 = ty + 20;
 
    for (j = 0; j < ndvalue; j++) {
      if ((ndvalue > 20) && (ndvalue <= 40) && (j%2 != 0)) continue;
      if ((ndvalue > 40) && (ndvalue <= 60) && (j%3 != 0)) continue;
      if ((ndvalue > 60) && (ndvalue <= 80) && (j%4 != 0)) continue;
      if ((ndvalue > 90) && (ndvalue <= 100) && (j%5 != 0)) continue;
      x1 = margin.left + gapWidth + j * betweenbarWidth;
      chart.append("line") // tick
                    .attr("x1", x1)
                    .attr("x2", x1)
                    .attr("y1", ty)
                    .attr("y2", ty + 5)
                    .style("stroke", "black")
                    .style("stroke-width", "0.5")
      chart.append("text")
                    .style("text-anchor", str)
                    .style("font-family", "sans-serif")
                    .style("font-size", "0.8em")
                    .attr("x", x1)
                    .attr("y", y1)
                    .attr("transform", "rotate(" + angle + "," + x1 + "," + y1 + ")  ")
                    .text(label[j])
    }
  }

  // Xbar Chart Y축 그리기
  function drawAxisX() {
    var tx, ty;
    var xScale, yScale;
    var ygrid = new Array(rowMax);

    yScale = d3.scaleLinear().domain([freqMinX, freqMaxX]).range([graphHeight, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("transform", "translate(" + tx + "," + ty + ")")
         .call(d3.axisLeft(yScale)) // 눈금을 표시할 함수 호출
    // Y축 그리드
    for (i = 1; i < ygrid.length; i++) {
      ty = margin.top + yScale(ygrid[i]);
      chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
    }
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left)
                    .attr("x2", margin.left)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left + graphWidth)
                    .attr("x2", margin.left + graphWidth)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
  }

