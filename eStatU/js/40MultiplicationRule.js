      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top:90, bottom:50, left:80, right:160};
      var svgWidth    = 640;
      var svgHeight   = 500;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var i, temp, tmin, tmax, str1, str2, str3;
      var p11, p12, p21, p22, p1dot, p2dot, pdot1, pdot2, ptotal, p11max;
      var c11, c12, c21, c22;
      var mTitle, yTitle, xTitle;
      var freqMax, freqMaxC, barColor;
      var fontsize    = "1em";
      var ndvalue     = 2;
      var rowMax      = 5;
      var dvalueLabel = new Array(rowMax);
      var dataSet     = new Array(rowMax);
      var dataSet1    = new Array(rowMax);
      var dataSet2    = new Array(rowMax);
      var dataSet3    = new Array(rowMax);
      var dataSet4    = new Array(rowMax);
      dvalueLabel[0]  = "B1";
      dvalueLabel[1]  = "B2";
      // initial value
      p11 = 0.4;
      p12 = 0.2;
      p21 = 0.1;
      p22 = 0.3;
      p1dot  = p11 + p12;
      p2dot  = p21 + p22;
      pdot1  = p11 + p21;
      pdot2  = p12 + p22;
      ptotal = p1dot + p2dot;
      if (p1dot > pdot1) p11max = pdot1;
      else p11max = p1dot;
      document.getElementById("p11max").innerHTML = f2(p11max);
      document.getElementById("rangeP11").value = f0(20*p11/p11max);
      calculate();

      // Draw conditional distribution ======================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        p11   = d3.select("#p11").node().value;
        p1dot = d3.select("#p1dot").node().value;
        pdot1 = d3.select("#pdot1").node().value;
        // input value
        if ( isNaN(p11) || isNaN(p1dot) || isNaN(pdot1) ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text(alertMsg[48][langNum])
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        p11   = parseFloat(p11);
        p1dot = parseFloat(p1dot);
        pdot1 = parseFloat(pdot1);
        p12   = p1dot - p11;
        p21   = pdot1 - p11;
        p2dot = 1 - p1dot;
        p22   = p2dot - p21;
        pdot2 = 1 - pdot1;
        if ( p11 < 0 || p11 > p11max ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("0 < p11 < min( P(A1), P(B1) )")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        if ( p1dot < 0 || p1dot > 1 || pdot1 < 0 || pdot1 > 1 ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("0 < P(B1) < 1, 0 < P(A1) < 1")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        calculate();
      })

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

      // Calculate 
      function calculate() {
        if (p1dot > pdot1) p11max = pdot1;
        else p11max = p1dot;
        if (p11 > p11max) {
           p11 = p11max;
           p12 = p1dot - p11;
           p21 = pdot1 - p11;
           p22 = p2dot - p21;
        }
        
        c11   = p11 / p1dot;
        c12   = p12 / p1dot;
        c21   = p21 / p2dot;
        c22   = p22 / p2dot;

        dataSet1[0] = p11;
        dataSet1[1] = p12;
        dataSet2[0] = p21;
        dataSet2[1] = p22;
        dataSet3[0] = c11;
        dataSet3[1] = c12;
        dataSet4[0] = c21;
        dataSet4[1] = c22;
        if (p11 > p12) freqMax = p11;
        else freqMax = p12;
        if (p21 > freqMax) freqMax = p21;
        if (p22 > freqMax) freqMax = p22;
        // freq max for conditional
        if (c11 > c12) freqMaxC = c11;
        else freqMaxC = c12;
        if (c21 > freqMaxC) freqMaxC = c21;
        if (c22 > freqMaxC) freqMaxC = c22;
        document.getElementById("p11").value = f2(p11);
        document.getElementById("p12").innerHTML = f2(p12);
        document.getElementById("p21").innerHTML = f2(p21);
        document.getElementById("p22").innerHTML = f2(p22);
        document.getElementById("p1dot").value   = f2(p1dot);
        document.getElementById("p2dot").innerHTML = f2(p2dot);
        document.getElementById("pdot1").value     = f2(pdot1);
        document.getElementById("pdot2").innerHTML = f2(pdot2);
        document.getElementById("ptotal").innerHTML = f2(ptotal);
        document.getElementById("p11max").innerHTML = f2(p11max);
        document.getElementById("rangeP11").value = f0(20*p11/p11max);

//        if (ptotal != 1) document.getElementById("ptotal").style.color = "red";
//        else document.getElementById("ptotal").style.color = "black";
        document.getElementById("c11").innerHTML = f2(c11);
        document.getElementById("c12").innerHTML = f2(c12);
        document.getElementById("c21").innerHTML = f2(c21);
        document.getElementById("c22").innerHTML = f2(c22);
        chart.selectAll("*").remove();
        // line graph
        margin      = {top:90, bottom:50, left:60, right:240};   
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;
        mTitle = svgStr[123][langNum]; // 결합확률
        drawLineGraph(ndvalue, dataSet1, dataSet2, dvalueLabel, freqMax) 
        // conditional A1 bar graph
        margin      = {top:100, bottom:280, left:440, right:20};   
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;
        mTitle = "";
        xTitle = svgStr[124][langNum] + " P(B | A1)"; // 조건부확률
        barColor = colr[0];
        drawBarGraph(ndvalue, dataSet3, dvalueLabel, freqMaxC, barColor) 
        // Conditional A2 bar graph
        margin      = {top:300, bottom:80, left:440, right:20};   
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;
        xTitle = svgStr[124][langNum] + " P(B | A2)"; // 조건부확률
        barColor = colr[7];
        drawBarGraph(ndvalue, dataSet4, dvalueLabel, freqMaxC, barColor) 
      }

      // p11 slidebar
      function showValueP11(newValue) {
        p11 = p11max * newValue * 0.05;
        p12 = p1dot - p11;
        p21 = pdot1 - p11;
        p22 = p2dot - p21
        calculate();       
      }
      // p1dot slidebar
      function showValueP1dot(newValue) {
        p1dot = newValue * 0.05;
        p2dot = 1- p1dot;
        p12   = p1dot - p11;
        if (p12 > pdot2) p12 = pdot2;
        p22   = pdot2 - p12;
        p21   = p2dot - p22;
        calculate();       
      }
      // pdot1 slidebar
      function showValuePdot1(newValue) {
        pdot1 = newValue * 0.05;
        pdot2 = 1 - pdot1;
        p21   = pdot1 - p11;
        if (p21 > p2dot) p21 = p2dot;
        p22   = p2dot - p21;
        p12   = pdot2 - p22;
        calculate();       
      }

  // Draw Line Graph
  function drawLineGraph(ndvalue, dataSet, dataSet2, dvalueLabel, freqMax) {
    var i, j, str, tx, ty;
    var betweenbarWidth = graphWidth / ndvalue; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth * 0.6; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.2;
    var ybuffer  = graphHeight * 0.1;
    var yheight  = graphHeight * 0.8;
    var freqRatioV = yheight / freqMax; // 그래프 영역과 데이터 영역의 비율
    var iconsize = barWidth / 2;

    xTitle = "";
    drawTitle(mTitle, yTitle, xTitle);
    drawLabel(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth);
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
    // draw line
    x1 = margin.left + gapWidth + barWidth / 2;
    x2 = margin.left + gapWidth + barWidth / 2 +betweenbarWidth;
    y1 = margin.top + graphHeight - dataSet[0] * freqRatioV;
    y2 = margin.top + graphHeight - dataSet[1] * freqRatioV;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", x1)
         .attr("x2", x2)
         .attr("y1", y1)
         .attr("y2", y2)
         .style("stroke", colr[0])
         .style("stroke-width", "3")
    y1 = margin.top + graphHeight - dataSet2[0] * freqRatioV + 2;
    y2 = margin.top + graphHeight - dataSet2[1] * freqRatioV + 2;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", x1)
         .attr("x2", x2)
         .attr("y1", y1)
         .attr("y2", y2)
         .style("stroke", colr[7])
         .style("stroke-width", "3")
  }
  // Draw Bar Graph
  function drawBarGraph(ndvalue, dataSet, dvalueLabel, freqMax, barColor) {
    var i, j, str, tx, ty;
    var betweenbarWidth = graphWidth / ndvalue; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth * 0.6; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.2;
    var ybuffer  = graphHeight * 0.1;
    var yheight  = graphHeight * 0.8;
    var freqRatioV = yheight / freqMax; // 그래프 영역과 데이터 영역의 비율
    var iconsize = barWidth / 2;

//    drawTitle(mTitle, yTitle, xTitle);
    drawLabel(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth);
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
    // 막대
    for (j=0; j<ndvalue; j++) {
      chart.append("rect")
           .attr("class", "bar")
           .style("fill", barColor)
           .attr("height", 0)
           .attr("width", barWidth)
           .attr("x", margin.left + gapWidth + j * betweenbarWidth)
           .attr("y", margin.top + graphHeight)
           .transition() // 애니매이션 효과 지정
           .delay(function(d, i) {return i * 500;}) // 0.5초마다 그리도록 대기시간 설정
           .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
           .attr("y", margin.top + graphHeight - dataSet[j] * freqRatioV)
           .attr("height", dataSet[j] * freqRatioV);
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
    angle = 0;
    str = "middle";
    y1 = ty + 20;
 
    for (j = 0; j < ndvalue; j++) {
      tx = margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth;
      x1 = margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth;
      chart.append("line") // tick
                    .attr("x1", tx)
                    .attr("x2", tx)
                    .attr("y1", ty)
                    .attr("y2", ty + 5)
                    .style("stroke", "black")
                    .style("stroke-width", "0.5")
      chart.append("text")
                    .style("text-anchor", str)
                    .style("font-family", "sans-serif")
                    .style("font-size", fontsize)
                    .attr("x", x1)
                    .attr("y", y1)
                    .attr("transform", "rotate(" + angle + "," + x1 + "," + y1 + ")  ")
                    .text(label[j])
    }
    y1 += 20;
    // X축 제목
    chart.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", margin.left + graphWidth / 2)
            .attr("y", y1)
            .text(xTitle)
  }
  // 막대그래프 축 그리기
  function drawAxis(freqMax, height) {
    var tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);
//    var graphMax = freqMax / 0.8;
    yScale = d3.scaleLinear().domain([0, freqMax/0.8]).range([height, 0]);
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
