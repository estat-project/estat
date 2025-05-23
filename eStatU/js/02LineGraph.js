      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      margin = {top:90, bottom:70, left:80, right:80};
      svgWidth    = 640;
      svgHeight   = 540;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, nrow, num; 
      var gxmin, gxmax, gymin, gymax, temp, freqMin, freqMax;
      var mTitle, yTitle, xTitle;
      var checkInput = false;
      var rowMax = 201;
      var fontsize = "1em";
      var colr = ["#32CD32", "#FF0000","#FF8000","#0080FF"];
      var nline = 4+1;
      var ncolr = new Array(nline);
      var nobs  = new Array(nline);
      var vname = new Array(nline);

      document.getElementById("colr1").value = colr[0];
      document.getElementById("colr2").value = colr[1];
      document.getElementById("colr3").value = colr[2];
      document.getElementById("colr4").value = colr[3];
      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat    = simplestat("#data1");  
        data1   = data;  
        nobs[1] = stat.n;
      });
      d3.select("#data2").on("input", function() {
        stat    = simplestat("#data2");  
        data2   = data;  
        nobs[2] = stat.n;
      });
      d3.select("#data3").on("input", function() {
        stat    = simplestat("#data3");  
        data3   = data;  
        nobs[3] = stat.n;
      });
      d3.select("#data4").on("input", function() {
        stat    = simplestat("#data4");  
        data4   = data;  
        nobs[4] = stat.n;
      });
      d3.select("#datax").on("input", function() {
        stat    = simpletext("#datax");  
        datax   = data;  
        nobs[0] = stat.n;
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
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
        document.getElementById("data3").value = '';    
        document.getElementById("data4").value = '';    
        document.getElementById("datax").value = '';    
      }

      // erase Line Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        // title
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("xtitle").value = "";
        // category
        document.getElementById("data1").value = "";
        document.getElementById("data2").value = "";
        document.getElementById("data3").value = "";
        document.getElementById("data4").value = "";
        document.getElementById("datax").value = "";    
        // line name
        document.getElementById("line1").value = "";
        document.getElementById("line2").value = "";
        document.getElementById("line3").value = "";
        document.getElementById("line4").value = "";
        // default color
        document.getElementById("colr1").value = colr[0];
        document.getElementById("colr2").value = colr[1];
        document.getElementById("colr3").value = colr[2];
        document.getElementById("colr4").value = colr[3];
      })


      // Draw Line Graph ======================================
      d3.select("#execute").on("click",function() {
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
        if (nobs[2] > 0) {
          if (nobs[0] != nobs[2] ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
          }
        }
        if (nobs[3] > 0) {
          if (nobs[0] != nobs[3] ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
          }
        }
        if (nobs[4] > 0) {
          if (nobs[0] != nobs[4] ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
          }
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
        if (nobs[2] > 0) {
          for (i=0; i<nrow; i++) {
            if (isNaN(isNaN(data2[i]) ) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
        }
        if (nobs[3] > 0) {
          for (i=0; i<nrow; i++) {
            if (isNaN(isNaN(data3[i]) ) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
        }
        if (nobs[4] > 0) {
          for (i=0; i<nrow; i++) {
            if (isNaN(isNaN(data4[i]) ) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
        }
        initialize();
        drawLineGraph();
      })
      // 초기 작업
      function initialize() {
        chart.selectAll("*").remove();
        // title
        mTitle = d3.select("#mtitle").node().value;
        yTitle = d3.select("#ytitle").node().value;
        xTitle = d3.select("#xtitle").node().value;
        // get var name
        vname[0] = d3.select("#line1").node().value;
        vname[1] = d3.select("#line2").node().value;
        vname[2] = d3.select("#line3").node().value;
        vname[3] = d3.select("#line4").node().value;
        for (i=0; i<nline; i++) { 
          if (vname[i] == svgStr[64][langNum]) vname[i] = svgStrU[114][langNum]+(i+1).toString();
        }
        // get new color
        ncolr[0] = d3.select("#colr1").node().value;
        ncolr[1] = d3.select("#colr2").node().value;
        ncolr[2] = d3.select("#colr3").node().value;
        ncolr[3] = d3.select("#colr4").node().value;
        // 입력값 최대도수 계산
        freqMin = data1[0];
        freqMax = data1[0];
        for (i=1; i<nrow; i++) { 
            if (data1[i] > freqMax) freqMax = data1[i];
            if (data1[i] < freqMin) freqMin = data1[i];
        }
        if (nobs[2] > 0) {
          for (i=0; i<nrow; i++) { 
            if (data2[i] > freqMax) freqMax = data2[i];
            if (data2[i] < freqMin) freqMin = data2[i];
          }
        }
        if (nobs[3] > 0) {
          for (i=0; i<nrow; i++) { 
            if (data3[i] > freqMax) freqMax = data3[i];
            if (data3[i] < freqMin) freqMin = data3[i];
          }
        }
        if (nobs[4] > 0) {
          for (i=0; i<nrow; i++) { 
            if (data4[i] > freqMax) freqMax = data4[i];
            if (data4[i] < freqMin) freqMin = data4[i];
          }
        }
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
 
  // Change Color
  function changeColor(num){
      var strid;
      switch (num) {
        case 1: strid = "colr1"; break;
        case 2: strid = "colr2"; break;
        case 3: strid = "colr3"; break;
        case 4: strid = "colr4"; break;
      }
      ncolr[num-1] = document.getElementById(strid).value ;
  }

  // Draw Line Graph
  function drawLineGraph() {
    var i, j, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var betweenbarWidth = graphWidth / nrow; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var tbuffer  = (freqMax - freqMin) * 0.1;
    freqMax = freqMax + tbuffer;
    freqMin = freqMin - tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율

    drawTitle(mTitle, yTitle, xTitle);
    drawLabel(nrow, datax, betweenbarWidth, barWidth, gapWidth);
    drawAxis(freqMax, graphHeight);

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

    // line 1
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (data1[0] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("stroke", ncolr[0])
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (data1[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", ncolr[0])
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("stroke", ncolr[0])
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 30;
      chart.append("circle").style("fill", ncolr[0]).style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", ncolr[0]).style("text-anchor", "begin")
           .text(vname[0])
    // line 2
    if (nobs[2] > 0) {
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (data2[0] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("stroke", ncolr[1])
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (data2[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", ncolr[1])
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("stroke", ncolr[1])
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy += 20;
      chart.append("circle").style("fill", ncolr[1]).style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", ncolr[1]).style("text-anchor", "begin")
           .text(vname[1])
    }
    // line 3
    if (nobs[3] > 0) {
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (data3[0] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("stroke", ncolr[2])
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (data3[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", ncolr[2])
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("stroke", ncolr[2])
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy += 20;
      chart.append("circle").style("fill", ncolr[2]).style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", ncolr[2]).style("text-anchor", "begin")
           .text(vname[2])
    }
    // line 4
    if (nobs[4] > 0) {
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (data4[0] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("stroke", ncolr[3])
      for (i=1; i<nrow; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (data4[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", ncolr[3])
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("stroke", ncolr[3])
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy += 20;
      chart.append("circle").style("fill", ncolr[3]).style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", ncolr[3]).style("text-anchor", "begin")
           .text(vname[3])
    }
  }

  // 그래프 제목 쓰기 함수
  function drawTitle(mTitle, yTitle, xTitle) {
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "1.8em")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", margin.left + graphWidth / 2)
            .attr("y", margin.top + graphHeight + margin.bottom / 2 + 15)
            .text(xTitle)
     // Y축 제목
     var tx = margin.left / 2 - 30;
     var ty = margin.top + 15;
     chart.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "end")
            .attr("x", tx)
            .attr("y", ty)
            .text(yTitle)
            .attr("transform", "rotate(-90 30 100)")
  }
  // 변량값명 쓰기 함수
  function drawLabel(ndvalue, label, betweenbarWidth, barWidth, gapWidth) {
    var i, j, k, x1, y1, tx, ty, str, strAnchor;
    var angle;

    ty = margin.top + graphHeight;
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

  // 막대그래프 축 그리기
  function drawAxis(freqMax, height) {
    var tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);

    yScale = d3.scaleLinear().domain([freqMin, freqMax]).range([graphHeight, 0]);
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

     //   tx = margin.left + graphWidth;
     //   chart.append("g")
     //        .attr("transform","translate("+tx+","+ty+")")
     //        .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출
  }
