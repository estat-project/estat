      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      margin = {top:90, bottom:50, left:80, right:60};
      svgWidth    = 640;
      svgHeight   = 540;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, nobs, nrow, num, ndvalue; 
      var gxmin, gxmax, gymin, gymax, temp, freqMax;
      var mTitle, yTitle, xTitle;
      var checkIcon = false;
      var checkFreq = false;
      var checkInput = false;
      var rowMax = 9;
      var fontsize = "1em";
      var strPath;
      var colr = ["#FF0000","#FF8000","#FFFF00","#32CD32","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var catg  = new Array(rowMax);
      var freq  = new Array(rowMax);
      var perc  = new Array(rowMax);
      var dcolr = new Array(rowMax);
      var ncolr = new Array(rowMax);
      var dicon = ["👨","👩","⚽","🏀","⚾","🏐","🏌","🎾","🖥","📲",
                   "📚","💰","🛩","🚢","🏠","🌭","🥕","🥬","🥦","🍆",
                   "🥒","🌽","🍓","🍎","🍌","🍇","🍊","🍅","🍉","🍍",
                   "🖍","🎹","👗","👑","💎","🎮","🎈","🌟","🌈","⭐",
                   "☀","⌛","⏱","🚲","🎡","🏰","🪐","🌿","🧡","🚲"];
      var nicon = new Array(rowMax);
      for (i=1; i<rowMax; i++) nicon[i] = 0;

      var dvalueLabel = new Array(rowMax);
      var dataSet     = new Array(rowMax);
      var indexA      = new Array(rowMax);
      var indexD      = new Array(rowMax);

      document.getElementById("data13").disabled = true;
      document.getElementById("data23").disabled = true;
      document.getElementById("data33").disabled = true;
      document.getElementById("data43").disabled = true;
      document.getElementById("data53").disabled = true;
      document.getElementById("data63").disabled = true;
      document.getElementById("data73").disabled = true;
      document.getElementById("data83").disabled = true;
      document.getElementById("data93").disabled = true;
      document.getElementById("data102").disabled = true;
      document.getElementById("data103").disabled = true;

      document.getElementById("data14").value = colr[0];
      document.getElementById("data24").value = colr[1];
      document.getElementById("data34").value = colr[2];
      document.getElementById("data44").value = colr[3];
      document.getElementById("data54").value = colr[4];
      document.getElementById("data64").value = colr[5];
      document.getElementById("data74").value = colr[6];
      document.getElementById("data84").value = colr[7];
      document.getElementById("data94").value = colr[8];
      document.getElementById("ytitle").value = svgStr[16][langNum];

      // default Color 버튼 클릭
      d3.select("#defaultColor").on("click", function() {
        defaultColor();
      })
      function defaultColor() {
        for (i=0; i<colr.length; i++) ncolr[i] = colr[i];
        document.getElementById("data14").value = colr[0];
        document.getElementById("data24").value = colr[1];
        document.getElementById("data34").value = colr[2];
        document.getElementById("data44").value = colr[3];
        document.getElementById("data54").value = colr[4];
        document.getElementById("data64").value = colr[5];
        document.getElementById("data74").value = colr[6];
        document.getElementById("data84").value = colr[7];
        document.getElementById("data94").value = colr[8];
       }
      // Erase Bar Data ======================================
      d3.select("#erase").on("click",function() {
        document.getElementById("showicon").disabled = false;
        document.getElementById("showfreq").disabled = false;
        document.getElementById("raw").disabled      = false;
        document.getElementById("raw").checked       = true;
        document.getElementById("descend").disabled  = false;
        document.getElementById("ascend").disabled   = false;
        chart.selectAll("*").remove();
        // title
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("xtitle").value = "";
        // category
        document.getElementById("data11").value = "";
        document.getElementById("data21").value = "";
        document.getElementById("data31").value = "";
        document.getElementById("data41").value = "";
        document.getElementById("data51").value = "";
        document.getElementById("data61").value = "";
        document.getElementById("data71").value = "";
        document.getElementById("data81").value = "";
        document.getElementById("data91").value = "";
        // freq data
        document.getElementById("data12").value = "";
        document.getElementById("data22").value = "";
        document.getElementById("data32").value = "";
        document.getElementById("data42").value = "";
        document.getElementById("data52").value = "";
        document.getElementById("data62").value = "";
        document.getElementById("data72").value = "";
        document.getElementById("data82").value = "";
        document.getElementById("data92").value = "";
        // relative freq data
        document.getElementById("data13").value = "";
        document.getElementById("data23").value = "";
        document.getElementById("data33").value = "";
        document.getElementById("data43").value = "";
        document.getElementById("data53").value = "";
        document.getElementById("data63").value = "";
        document.getElementById("data73").value = "";
        document.getElementById("data83").value = "";
        document.getElementById("data93").value = "";
        document.getElementById("data102").value = "";
        document.getElementById("data103").value = "";
        // initial icon
        document.getElementById("data15").selectedIndex = 0;
        document.getElementById("data25").selectedIndex = 0;
        document.getElementById("data35").selectedIndex = 0;
        document.getElementById("data45").selectedIndex = 0;
        document.getElementById("data55").selectedIndex = 0;
        document.getElementById("data65").selectedIndex = 0;
        document.getElementById("data75").selectedIndex = 0;
        document.getElementById("data85").selectedIndex = 0;
        document.getElementById("data95").selectedIndex = 0;
        defaultColor();
      })
      // Draw Bar Graph ======================================
      d3.select("#executeBar").on("click",function() {
        document.getElementById("showicon").disabled = false;
        document.getElementById("showfreq").disabled = false;
        document.getElementById("raw").disabled      = false;
        document.getElementById("raw").checked       = true;
        document.getElementById("descend").disabled  = false;
        document.getElementById("ascend").disabled   = false;
        initialize();
        if (checkInput) return;
        drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
      })
      // Draw Pie Chart ======================================
      d3.select("#executePie").on("click",function() {
        document.getElementById("showicon").disabled = true;
        document.getElementById("showfreq").disabled = true;
        document.getElementById("raw").disabled      = true;
        document.getElementById("descend").disabled  = true;
        document.getElementById("ascend").disabled   = true;
        initialize();
        if (checkInput) return;
        drawPieChart(nrow, perc, catg, freqMax);
      })
      // Draw Rainbow Chart ======================================
      d3.select("#executeRainbow").on("click",function() {
        document.getElementById("showicon").disabled = true;
        document.getElementById("showfreq").disabled = true;
        document.getElementById("raw").disabled      = true;
        document.getElementById("descend").disabled  = true;
        document.getElementById("ascend").disabled   = true;
        initialize();
        if (checkInput) return;
        drawRainbowChart(nrow, freq, catg, freqMax);
      })
      // Draw Band Graph ======================================
      d3.select("#executeBand").on("click",function() {
        document.getElementById("showicon").disabled = true;
        document.getElementById("showfreq").disabled = true;
        document.getElementById("raw").disabled      = true;
        document.getElementById("descend").disabled  = true;
        document.getElementById("ascend").disabled   = true;
        initialize();
        if (checkInput) return;
        drawBandGraph(nrow, freq, catg, freqMax);
      })
      // 초기 작업
      function initialize() {
        chart.selectAll("*").remove();
        // title
        mTitle = d3.select("#mtitle").node().value;
        yTitle = d3.select("#ytitle").node().value;
        xTitle = d3.select("#xtitle").node().value;
        if (yTitle == "") yTitle = svgStr[16][langNum];
        // category
        catg[0] = d3.select("#data11").node().value;
        catg[1] = d3.select("#data21").node().value;
        catg[2] = d3.select("#data31").node().value;
        catg[3] = d3.select("#data41").node().value;
        catg[4] = d3.select("#data51").node().value;
        catg[5] = d3.select("#data61").node().value;
        catg[6] = d3.select("#data71").node().value;
        catg[7] = d3.select("#data81").node().value;
        catg[8] = d3.select("#data91").node().value;
        // freq data
        freq[0] = parseFloat(d3.select("#data12").node().value);
        freq[1] = parseFloat(d3.select("#data22").node().value);
        freq[2] = parseFloat(d3.select("#data32").node().value);
        freq[3] = parseFloat(d3.select("#data42").node().value);
        freq[4] = parseFloat(d3.select("#data52").node().value);
        freq[5] = parseFloat(d3.select("#data62").node().value);
        freq[6] = parseFloat(d3.select("#data72").node().value);
        freq[7] = parseFloat(d3.select("#data82").node().value);
        freq[8] = parseFloat(d3.select("#data92").node().value);
        // get new color
        ncolr[0] = d3.select("#data14").node().value;
        ncolr[1] = d3.select("#data24").node().value;
        ncolr[2] = d3.select("#data34").node().value;
        ncolr[3] = d3.select("#data44").node().value;
        ncolr[4] = d3.select("#data54").node().value;
        ncolr[5] = d3.select("#data64").node().value;
        ncolr[6] = d3.select("#data74").node().value;
        ncolr[7] = d3.select("#data84").node().value;
        ncolr[8] = d3.select("#data94").node().value;
        // get new icon
        nicon[0] = document.getElementById("data15").selectedIndex;
        nicon[1] = document.getElementById("data25").selectedIndex;
        nicon[2] = document.getElementById("data35").selectedIndex;
        nicon[3] = document.getElementById("data45").selectedIndex;
        nicon[4] = document.getElementById("data55").selectedIndex;
        nicon[5] = document.getElementById("data65").selectedIndex;
        nicon[6] = document.getElementById("data75").selectedIndex;
        nicon[7] = document.getElementById("data85").selectedIndex;
        nicon[8] = document.getElementById("data95").selectedIndex;

        // 도수 입력한 행의 수 카운트
        nrow = 0;
        for (i=0; i<rowMax; i++) { // 입력 행의 수
            if (!isNaN(freq[i]) ) nrow = i+1;
        }
        // 입력행이 하나 이상인지 체크
        if (nrow < 2 ) {
          checkInput = true;
          chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
             .text(alertMsg[46][langNum]).style("stroke","red").style("font-size",fontsize);
          return;
        }
        for (i=0; i<nrow; i++) {
            if (isNaN(freq[i]) ) { //문자 데이터 체크
              checkInput = true;
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[47][langNum]).style("stroke","red").style("font-size",fontsize);
              return;
            }
        }
        checkInput = false;
        // 입력값 합계, 최대도수 계산
        ntot = 0;
        freqMax = 0;
        for (i=0; i<nrow; i++) { 
            ntot += freq[i];
            if (freq[i] > freqMax) freqMax = freq[i];
            dvalueLabel[i-1] = catg[i]
        }
        // 상대도수 계산
        for (i=0; i<nrow; i++) { 
            perc[i] = freq[i] / ntot;
            temp = "data"+(i+1).toString()+"3";
            document.getElementById(temp).value = f3(perc[i]);
        }
        // 원자료 복사
        for (i=0; i<nrow; i++) {
          dataSet[i]     = freq[i];
          dvalueLabel[i] = catg[i];
          dcolr[i]       = ncolr[i];
        }
        // Sort index
        sortIndex(nrow, freq, indexA, indexD)
        document.getElementById("data102").value = ntot;
        document.getElementById("data103").value = f3(1);
      }
      // 막대그래프 이모티표시 버튼 클릭
      d3.select("#showicon").on("click", function() {
        if (this.checked) {
            checkIcon = true;
            drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
        } else {
            checkIcon = false;
            removeIcon();
        }
      })
      // 막대그래프 도수표시 버튼 클릭
      d3.select("#showfreq").on("click", function() {
        if (this.checked) {
            checkFreq = true;
            drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
        } else {
            checkFreq = false;
            removeFreq();
        }
      })      // 그룹이 없을 경우 막대그래프 내림차순, 올림차순 버튼
      var rad2 = document.myForm2.type2;
      rad2[0].onclick = function() { // 원자료
        chart.selectAll("*").remove();
        for (i=0; i<nrow; i++) {
          dataSet[i]     = freq[i];
          dvalueLabel[i] = catg[i];
          dcolr[i]       = ncolr[i];
        }
        drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
      }
      rad2[1].onclick = function() { // 내림차순
        chart.selectAll("*").remove();
        for (i=0; i<nrow; i++) {
          dataSet[i]     = freq[indexD[i]];
          dvalueLabel[i] = catg[indexD[i]];
          dcolr[i]       = ncolr[indexD[i]];
        }
        drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
      }
      rad2[2].onclick = function() { // 올림차순
        chart.selectAll("*").remove();
        for (i=0; i<nrow; i++) {
          dataSet[i]     = freq[indexA[i]];
          dvalueLabel[i] = catg[indexA[i]];
          dcolr[i]       = ncolr[indexA[i]];
        }
        drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
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
        case 1: strid = "data14"; break;
        case 2: strid = "data24"; break;
        case 3: strid = "data34"; break;
        case 4: strid = "data44"; break;
        case 5: strid = "data54"; break;
        case 6: strid = "data64"; break;
        case 7: strid = "data74"; break;
        case 8: strid = "data84"; break;
        case 9: strid = "data94"; break;
      }
      ncolr[num-1] = document.getElementById(strid).value ;
  }
  // Change Color
  function changeIcon(num){
      var strid;
      switch (num) {
        case 1: strid = "data15"; break;
        case 2: strid = "data25"; break;
        case 3: strid = "data35"; break;
        case 4: strid = "data45"; break;
        case 5: strid = "data55"; break;
        case 6: strid = "data65"; break;
        case 7: strid = "data75"; break;
        case 8: strid = "data85"; break;
        case 9: strid = "data95"; break;
      }
      nicon[num-1] = document.getElementById(strid).selectedIndex;
  }
  // Draw Bar Graph
  function drawBarGraph(ndvalue, dataSet, dvalueLabel, dcolr, freqMax, checkFreq) {
    var i, j, str, tx, ty;
    var betweenbarWidth = graphWidth / ndvalue; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth * 0.6; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.2;
    var ybuffer  = graphHeight * 0.1;
    var yheight  = graphHeight * 0.8;
    var freqRatioV = yheight / freqMax; // 그래프 영역과 데이터 영역의 비율
    var iconsize = barWidth / 2;

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
    // 막대
    for (j=0; j<ndvalue; j++) {
      chart.append("rect")
           .attr("class", "bar")
           .style("fill", dcolr[j])
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

    if (checkFreq) {
        showFreq(ndvalue, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth);
    }
    // icon 그리기
    if (checkIcon) {
      for (j = 0; j < ndvalue; j++) {
        chart.append("text")
             .attr("class", "iconfont")
             .style("font-size", iconsize)
             .style("stroke", dcolr[i])
             .attr("x", margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth)
             .attr("y", margin.top + graphHeight - dataSet[j] * freqRatioV - 10)
             .text(dicon[nicon[j]]);
      }
    }

  }

  // 분리형 막대그래프 도수 쓰기 함수
  function showFreq(ndvalue, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth) {
    for (var j = 0; j < ndvalue; j++) {
      if (dataSet[i] == 0) continue;
      chart.append("text")
           .style("text-anchor", "middle")
           .style("font-size", "0.8em")
           .attr("x", margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth)
           .attr("y", margin.top + graphHeight - dataSet[j] * freqRatioV + 15)
           .text(dataSet[j]);
    }
  }

  // 아이콘 제거 함수
  function removeIcon() {
    chart.selectAll("text.iconfont").remove();
  }
  // 막대그래프 도수 제거 함수
  function removeFreq() {
    chart.selectAll("text.freqfont").remove();
  }

  // Sorting and find index
  function sortIndex(dobs, data, indexA, indexD) {
    var i, j, temp, tempi;
    var tdata = new Array(dobs);
    // Ascending index
    for (i = 0; i < dobs; i++) {
      tdata[i]  = data[i];
      indexA[i] = i;
    }
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (tdata[i] > tdata[j]) {
                temp      = tdata[i];
                tempi     = indexA[i];
                tdata[i]  = tdata[j];
                indexA[i] = indexA[j];
                tdata[j]  = temp;
                indexA[j] = tempi;
            }
        }
    }
    // Descending index
    for (i = 0; i < dobs; i++) {
      tdata[i]  = data[i];
      indexD[i] = i;
    }
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (tdata[i] < tdata[j]) {
                temp      = tdata[i];
                tempi     = indexD[i];
                tdata[i]  = tdata[j];
                indexD[i] = indexD[j];
                tdata[j]  = temp;
                indexD[j] = tempi;
            }
        }
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
  }

  // 막대그래프 축 그리기
  function drawAxis(freqMax, height) {
    var tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);

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


  // 원그래프 함수 --------------------------------------------------------------
  function drawPieChart(ndvalue, datafreq, dvalueLabel, freqMax) {
    var i, j, tx, ty, str;
    var radiusIn, radiusOut;
    radiusIn = 0;
    radiusOut = graphHeight / 2;
    var tdata = new Array(ndvalue);
    for (i=0; i<ndvalue; i++) tdata[i] = 100*datafreq[i];    

    var pie = d3.pie();
    var arc = d3.arc().innerRadius(radiusIn).outerRadius(radiusOut);
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "1.8em")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    tx = margin.left + graphWidth / 2;
    ty = margin.top + graphHeight / 2;
    var piechart = chart.append("g")
            .attr("class", "piechart")
    var pieSlice = piechart.selectAll("g")
            .data(pie(tdata))
            .enter()
            .append("g")
            .attr("transform", "translate(" + tx + "," + ty + ")")
    pieSlice.append("path")
            .attr("class", "pie")
            .attr("d", arc)
            .style("fill", function(d, i) {
                return ncolr[i];
            })
            .transition()
            .delay(function(d, i) {
                return i * 200;
            })
            .duration(1000)
            //  .easeLinear(0.5)
            .attrTween("d", function(d, i) {
                var interpolate = d3.interpolate({
                    startAngle: d.startAngle,
                    endAngle: d.startAngle
                }, {
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
                return function(t) {
                    return arc(interpolate(t));
                }
            })
    pieSlice.append("text")
            .style("font-size", "1.1em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("transform", function(d, i) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function(d, i) {
                return dvalueLabel[i] + ": " + f1(d.value)+"%";
            })
  }

  // 무지개그래프 함수
  function drawRainbowChart(ndvalue, datafreq, dvalueLabel, freqMax) {
    var i, j, k, sum, tx, ty, tr, str;
    var tratio     = new Array(ndvalue);
    var bandWidth  = new Array(ndvalue);
    var bandX      = new Array(ndvalue);
    var oneLine    = 30; // pixel
    var bandHeight = graphHeight * 0.75;
    // 전체 그래프 영역 지우기 1px 문제
    chart.append("rect")
             .attr("x", margin.left)
             .attr("y", margin.top)
             .attr("width", graphWidth) // 최초 막대의 너비를 0 px 로 지정
             .attr("height", graphHeight)
             .style("fill", "white")
    // 주제목
    chart.append("text")
         .attr("x", margin.left + graphWidth/2)
         .attr("y", margin.top / 2 + 10)
         .style("font-size", "1.8em")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(mTitle)

    sum = 0;
    for (i = 0; i < ndvalue; i++) {
            sum += datafreq[i];
    }
    for (i = 0; i < ndvalue; i++) {
            tratio[i] = 100 * datafreq[i] / sum;
            bandWidth[i] = Math.floor(0.5 + graphWidth * datafreq[i] / sum);
    }
    bandX[0] = 10;
    for (i = 1; i < ndvalue; i++) {
            bandX[i] = bandX[i - 1] + bandWidth[i - 1];
    }

    ty = margin.top + 10; 
    t2 = ty + bandHeight + oneLine;
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2)
         .text(svgStr[119][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2 + oneLine)
         .text(svgStr[16][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2 + 2*oneLine)
         .text(svgStr[17][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    // draw rainbow
    tx = margin.left + graphWidth / 2;
    ty = margin.top + bandHeight ;
    k  = svgHeight - ty;
    for (j = 0; j < ndvalue; j++) {
        tr = (graphWidth - bandX[j]) / 2;            
        chart.append("circle")
             .attr("cx", tx)
             .attr("cy", ty)
             .attr("r",  0)
             .transition() // 애니매이션 효과 지정
                .delay(function(d, i) {
                     return i * 500;
                 }) // 0.5초마다 그리도록 대기시간 설정
                .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
             .attr("r",  tr)
//             .style("stroke","black")
             .style("fill", ncolr[j])
    }
    // 아래 반원 지우기
    chart.append("rect")
             .attr("x", margin.left)
             .attr("y", ty)
             .attr("width", graphWidth) // 최초 막대의 너비를 0 px 로 지정
             .attr("height", k)
             .style("fill", "white")
    // 도수 쓰기
    for (j = 0; j < ndvalue; j++) {
        tx = bandX[j] + bandWidth[j] / 2;
        str = dvalueLabel[j];
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2)
             .text(dvalueLabel[j])
             .style("font-size", fontsize)
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke", ncolr[j])
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2 + oneLine)
             .text(datafreq[j])
             .style("font-size", fontsize)
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke","black")
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2 + 2*oneLine)
             .text(f1(tratio[j]) + "%")
             .style("font-size", "1em")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke", "black")
    }

  }
  // 띠그래프 함수
  function drawBandGraph(ndvalue, datafreq, dvalueLabel, freqMax) {
    var i, j, k, sum, tx, ty, t2, str;
    var tratio     = new Array(ndvalue);
    var bandWidth  = new Array(ndvalue);
    var bandX      = new Array(ndvalue);
    var oneLine    = 30; // pixel
    var bandHeight = graphHeight * 0.75;

    // 주제목
    chart.append("text")
         .attr("x", margin.left + graphWidth/2)
         .attr("y", margin.top / 2 + 10)
         .style("font-size", "1.8em")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(mTitle)

    sum = 0;
    for (i = 0; i < ndvalue; i++) {
            sum += datafreq[i];
    }
    for (i = 0; i < ndvalue; i++) {
            tratio[i] = 100 * datafreq[i] / sum;
            bandWidth[i] = Math.floor(0.5 + graphWidth * datafreq[i] / sum);
    }
    bandX[0] = margin.left+5;
    for (i = 1; i < ndvalue; i++) {
            bandX[i] = bandX[i - 1] + bandWidth[i - 1];
    }

    ty = margin.top + 10; 
    t2 = ty + bandHeight + oneLine;
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2)
         .text(svgStr[119][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2 + oneLine)
         .text(svgStr[16][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    chart.append("text")
         .attr("x", margin.left)
         .attr("y", t2 + 2*oneLine)
         .text(svgStr[17][langNum])
         .style("font-size", fontsize)
         .style("font-family", "sans-seirf")
         .style("text-anchor", "end")
         .style("stroke", "black")
    for (j = 0; j < ndvalue; j++) {
        tx = bandX[j] + bandWidth[j] / 2;
        str = dvalueLabel[j];
        chart.append("rect")
                .attr("x", bandX[j])
                .attr("y", ty)
                .attr("width", "0px") // 최초 막대의 너비를 0 px 로 지정
                .transition() // 애니매이션 효과 지정
                .delay(function(d, i) {
                     return i * 500;
                 }) // 0.5초마다 그리도록 대기시간 설정
                .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
                .attr("width", bandWidth[j])
                .attr("height", bandHeight)
                .style("fill", ncolr[j])
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2)
             .text(dvalueLabel[j])
             .style("font-size", fontsize)
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke", "black")
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2 + oneLine)
             .text(datafreq[j])
             .style("font-size", fontsize)
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke", "black")
        chart.append("text")
             .attr("x", tx)
             .attr("y", t2 + 2*oneLine)
             .text(f1(tratio[j]) + "%")
             .style("font-size", "1em")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .style("stroke", "black")
    } // endof j

  }
