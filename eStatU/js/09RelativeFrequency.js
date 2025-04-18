      var chart = d3.select("#chart")
      var svgWidth    = 680;
      var svgHeight   = 450;  
      var margin, graphWidth, graphHeight;
      margin      = {top: 80, bottom: 60, left: 80, right: 80};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;
      var colr = ["#FF0000","#FF8000","#FFFF00","#00FF00","#00FFFF","#0080FF","#0000FF","#8000FF","#FF00FF","#0000FF"];
      var rowMax = 100;
      var dint  = new Array(rowMax);
      var catg1 = new Array(rowMax);
      var catg2 = new Array(rowMax);
      var catgm = new Array(rowMax);
      var freq1 = new Array(rowMax);
      var freq2 = new Array(rowMax);
      var perc1 = new Array(rowMax);
      var perc2 = new Array(rowMax);
      var ncolr = new Array(10);
      var maxcol = 4;
      var nrow = new Array(maxcol);
      var i, j, k, ith;
      var x1, x2, y1, y2, cx, cy, tx, ty;
      var nobs, sum1, sum2, mean1, mean2, vari1, vari2, stdv1, stdv2, start, xstep, temp;
      var nvalueH, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth, Histogram;
      var mTitle, yTitle, xTitle;
      var freq1Name, freq2Name;

      document.getElementById("data11").disabled = true;
      document.getElementById("data21").disabled = true;
      document.getElementById("data31").disabled = true;
      document.getElementById("data41").disabled = true;
      document.getElementById("data51").disabled = true;
      document.getElementById("data61").disabled = true;
      document.getElementById("data71").disabled = true;
      document.getElementById("data81").disabled = true;
      document.getElementById("data91").disabled = true;
      document.getElementById("data14").disabled = true;
      document.getElementById("data24").disabled = true;
      document.getElementById("data34").disabled = true;
      document.getElementById("data44").disabled = true;
      document.getElementById("data54").disabled = true;
      document.getElementById("data64").disabled = true;
      document.getElementById("data74").disabled = true;
      document.getElementById("data84").disabled = true;
      document.getElementById("data94").disabled = true;
      document.getElementById("data15").disabled = true;
      document.getElementById("data25").disabled = true;
      document.getElementById("data35").disabled = true;
      document.getElementById("data45").disabled = true;
      document.getElementById("data55").disabled = true;
      document.getElementById("data65").disabled = true;
      document.getElementById("data75").disabled = true;
      document.getElementById("data85").disabled = true;
      document.getElementById("data95").disabled = true;
      document.getElementById("data102").disabled = true;
      document.getElementById("data103").disabled = true;
      document.getElementById("data104").disabled = true;
      document.getElementById("data105").disabled = true;
      document.getElementById("data112").disabled = true;
      document.getElementById("data113").disabled = true;
      document.getElementById("data122").disabled = true;
      document.getElementById("data123").disabled = true;
      document.getElementById("data132").disabled = true;
      document.getElementById("data133").disabled = true;

      document.getElementById("data02").value = colr[2]; // Yellow
      document.getElementById("data04").value = colr[0]; // red
      document.getElementById("data05").value = colr[6]; // blue
      document.getElementById("ytitle").value = svgStr[30][langNum];
      document.getElementById("freq1").value  = svgStr[16][langNum]+ " 1";
      document.getElementById("freq2").value  = svgStr[16][langNum]+ " 2";

      // erase data input =====================================
      d3.select("#erase").on("click", function() {
        chart.selectAll("*").remove();
        // title
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("xtitle").value = "";
        // color
        document.getElementById("data02").value = colr[2]; 
        document.getElementById("data04").value = colr[0];
        document.getElementById("data05").value = colr[6]; 
        document.getElementById("data02").value = colr[2]; // Yellow
        document.getElementById("data04").value = colr[0]; // red
        document.getElementById("data05").value = colr[6]; // blue
        document.getElementById("ytitle").value = svgStr[30][langNum];
        document.getElementById("freq1").value  = svgStr[16][langNum]+ " 1";
        document.getElementById("freq2").value  = svgStr[16][langNum]+ " 2";
        // category
        document.getElementById("data10").value = "";
        document.getElementById("data20").value = "";
        document.getElementById("data30").value = "";
        document.getElementById("data40").value = "";
        document.getElementById("data50").value = "";
        document.getElementById("data60").value = "";
        document.getElementById("data70").value = "";
        document.getElementById("data80").value = "";
        document.getElementById("data90").value = "";
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
        document.getElementById("data12").value  = "";
        document.getElementById("data22").value  = "";
        document.getElementById("data32").value  = "";
        document.getElementById("data42").value  = "";
        document.getElementById("data52").value  = "";
        document.getElementById("data62").value  = "";
        document.getElementById("data72").value  = "";
        document.getElementById("data82").value  = "";
        document.getElementById("data92").value  = "";
        document.getElementById("data102").value = "";
        document.getElementById("data112").value = "";
        document.getElementById("data122").value = "";
        document.getElementById("data122").value = "";
        document.getElementById("data132").value = "";
        document.getElementById("data13").value  = "";
        document.getElementById("data23").value  = "";
        document.getElementById("data33").value  = "";
        document.getElementById("data43").value  = "";
        document.getElementById("data53").value  = "";
        document.getElementById("data63").value  = "";
        document.getElementById("data73").value  = "";
        document.getElementById("data83").value  = "";
        document.getElementById("data93").value  = "";
        document.getElementById("data103").value = "";
        document.getElementById("data113").value = "";
        document.getElementById("data123").value = "";
        document.getElementById("data133").value = "";
        // clean up relative frequency
        document.getElementById("data14").value = ""; 
        document.getElementById("data24").value = ""; 
        document.getElementById("data34").value = ""; 
        document.getElementById("data44").value = ""; 
        document.getElementById("data54").value = ""; 
        document.getElementById("data64").value = ""; 
        document.getElementById("data74").value = ""; 
        document.getElementById("data84").value = ""; 
        document.getElementById("data94").value = ""; 
        document.getElementById("data104").value = "";
        document.getElementById("data15").value = ""; 
        document.getElementById("data25").value = ""; 
        document.getElementById("data35").value = ""; 
        document.getElementById("data45").value = ""; 
        document.getElementById("data55").value = ""; 
        document.getElementById("data65").value = ""; 
        document.getElementById("data75").value = ""; 
        document.getElementById("data85").value = ""; 
        document.getElementById("data95").value = ""; 
        document.getElementById("data105").value = "";
      });

      // Draw Histogram ======================================
      d3.select("#execute").on("click",function() {
        initialize();
        if ( wrongInput ) return;
        drawHistogramRel(nvalueH, dint, perc1, perc2);
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width  = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
  // intitalize histogram
  function initialize() {
        chart.selectAll("*").remove();
        // title
        mTitle = d3.select("#mtitle").node().value;
        yTitle = d3.select("#ytitle").node().value;
        xTitle = d3.select("#xtitle").node().value;
        if (yTitle == "") yTitle = svgStr[30][langNum];
        // color
        ncolr[2] = document.getElementById("data02").value; 
        ncolr[0] = document.getElementById("data04").value;
        ncolr[6] = document.getElementById("data05").value; 

        // category
        catg1[0] = d3.select("#data10").node().value;
        catg1[1] = d3.select("#data20").node().value;
        catg1[2] = d3.select("#data30").node().value;
        catg1[3] = d3.select("#data40").node().value;
        catg1[4] = d3.select("#data50").node().value;
        catg1[5] = d3.select("#data60").node().value;
        catg1[6] = d3.select("#data70").node().value;
        catg1[7] = d3.select("#data80").node().value;
        catg1[8] = d3.select("#data90").node().value;
        // freq data
        freq1Name= document.getElementById("freq1").value; 
        freq2Name= document.getElementById("freq2").value; 
        freq1[1] = parseFloat(d3.select("#data12").node().value);
        freq1[2] = parseFloat(d3.select("#data22").node().value);
        freq1[3] = parseFloat(d3.select("#data32").node().value);
        freq1[4] = parseFloat(d3.select("#data42").node().value);
        freq1[5] = parseFloat(d3.select("#data52").node().value);
        freq1[6] = parseFloat(d3.select("#data62").node().value);
        freq1[7] = parseFloat(d3.select("#data72").node().value);
        freq1[8] = parseFloat(d3.select("#data82").node().value);
        freq1[9] = parseFloat(d3.select("#data92").node().value);
        freq2[1] = parseFloat(d3.select("#data13").node().value);
        freq2[2] = parseFloat(d3.select("#data23").node().value);
        freq2[3] = parseFloat(d3.select("#data33").node().value);
        freq2[4] = parseFloat(d3.select("#data43").node().value);
        freq2[5] = parseFloat(d3.select("#data53").node().value);
        freq2[6] = parseFloat(d3.select("#data63").node().value);
        freq2[7] = parseFloat(d3.select("#data73").node().value);
        freq2[8] = parseFloat(d3.select("#data83").node().value);
        freq2[9] = parseFloat(d3.select("#data93").node().value);
        // clean up relative frequency
        document.getElementById("data14").value = ""; 
        document.getElementById("data24").value = ""; 
        document.getElementById("data34").value = ""; 
        document.getElementById("data44").value = ""; 
        document.getElementById("data54").value = ""; 
        document.getElementById("data64").value = ""; 
        document.getElementById("data74").value = ""; 
        document.getElementById("data84").value = ""; 
        document.getElementById("data94").value = ""; 
        document.getElementById("data15").value = ""; 
        document.getElementById("data25").value = ""; 
        document.getElementById("data35").value = ""; 
        document.getElementById("data45").value = ""; 
        document.getElementById("data55").value = ""; 
        document.getElementById("data65").value = ""; 
        document.getElementById("data75").value = ""; 
        document.getElementById("data85").value = ""; 
        document.getElementById("data95").value = ""; 
        // get new color
        colr[2] = d3.select("#data02").node().value;
        colr[0] = d3.select("#data04").node().value;
        colr[6] = d3.select("#data05").node().value;

        // 입력한 행의 수 카운트
        nrow[0] = 0;
        for (i=0; i<rowMax; i++) {
          if ( isNaN(catg1[i]) || catg1[i] == "" ) break;
          else nrow[0]++;
        }
        // freq1 행의 수 카운트
        nrow[2] = 0;
        for (i=1; i<rowMax; i++) {
          if ( isNaN(freq1[i]) || freq1[i] == "" ) break;
          else nrow[2]++;
        }
        // freq2 행의 수 카운트
        nrow[3] = 0;
        for (i=1; i<rowMax; i++) {
          if ( isNaN(freq2[i]) || freq2[i] == "" ) break;
          else nrow[3]++;
        }
        nvalueH = nrow[0];  
        // 입력행이 하나 이상인지 체크
        tx = margin.left+100;
        ty = margin.top;
        if (nvalueH < 2 ) {
          chart.append("text").attr("class","mea1n").attr("x", tx).attr("y", ty)
               .text(alertMsg[46][langNum]).style("stroke","red").style("font-size", "1em")
          wrongInput = true;
          return;
        }
        // catg과 freq1 입력행의 수가 다른지 체크 
        if (nvalueH != nrow[2]) {
          chart.append("text").attr("class","mea1n").attr("x", tx).attr("y", ty)
               .text(alertMsg[51][langNum]).style("stroke","red").style("font-size", "1em")
          wrongInput = true;
          return;
        }
        // catg와 freq2 입력행의 수가 다른지 체크 
        if (nrow[3] > 0) {
          if (nvalueH != nrow[3] ) {
            chart.append("text").attr("class","mea1n").attr("x", tx).attr("y", ty)
                 .text(alertMsg[51][langNum]).style("stroke","red").style("font-size", "1em")
            wrongInput = true;
            return;
          }
        }
        // catg1, freq2에 문자 빈칸 있나 체크
        for (i=0; i<nvalueH; i++) {
            if (isNaN(catg1[i]) || isNaN(freq1[i+1]) ) {
              chart.append("text").attr("class","mean").attr("x", tx).attr("y", ty)
                   .text(alertMsg[52][langNum]).style("stroke","red").style("font-size", "1em")
              wrongInput = true;
              return;
            }
        }
        // freq2에 문자 빈칸 있나 체크
        if (nrow[3] > 0) {  
          for (i=0; i<nvalueH; i++) {
            if ( isNaN(freq2[i+1]) ) {
              chart.append("text").attr("class","mean").attr("x", tx).attr("y", ty)
                   .text(alertMsg[52][langNum]).style("stroke","red").style("font-size", "1em")
              wrongInput = true;
              return;
            }
          }
        }
        // catg1의 interval size가 같은지 
        xstep = parseFloat(catg1[1]) - parseFloat(catg1[0]);
        if (nrow[0] > 2) {
          for (i=2; i<nvalueH; i++) {
            temp = parseFloat(catg1[i]) - parseFloat(catg1[i-1]);
            if (temp != xstep ) {
              chart.append("text").attr("class","mean").attr("x", tx).attr("y", ty)
                   .text(alertMsg[53][langNum]).style("stroke","red").style("font-size", "1em")
              wrongInput = true;
              return;
            }
          }
        }
        wrongInput = false;
        // Right Interval Calculation
        xstep = parseFloat(catg1[1]) - parseFloat(catg1[0]);
        dint[0] = parseFloat(catg1[0]);
        for (i = 0; i < nvalueH; i++) {
          catg2[i]   = parseFloat(catg1[i]) + xstep; 
          catgm[i]   = (parseFloat(catg1[i]) + parseFloat(catg2[i])) / 2;
          dint[i+1]  = catg2[i];
        } 
        if( catg1[0] != "" ) document.getElementById("data11").value = f2(catg2[0]);
        if( catg1[1] != "" ) document.getElementById("data21").value = f2(catg2[1]);
        if( catg1[2] != "" ) document.getElementById("data31").value = f2(catg2[2]);
        if( catg1[3] != "" ) document.getElementById("data41").value = f2(catg2[3]);
        if( catg1[4] != "" ) document.getElementById("data51").value = f2(catg2[4]);
        if( catg1[5] != "" ) document.getElementById("data61").value = f2(catg2[5]);
        if( catg1[6] != "" ) document.getElementById("data71").value = f2(catg2[6]);
        if( catg1[7] != "" ) document.getElementById("data81").value = f2(catg2[7]);
        if( catg1[8] != "" ) document.getElementById("data91").value = f2(catg2[8]);
        // Mean, Std Dev, Relative Frequency Calculation
        sum1 = 0;
        sum2 = 0;
        mean1 = 0;
        mean2 = 0;      
        for (i = 0; i < nvalueH; i++) {
            sum1  += freq1[i+1];
            mean1 += catgm[i] * freq1[i+1];
            if (nrow[3] > 0) {
              sum2  += freq2[i+1];
              mean2 += catgm[i] * freq2[i+1]; 
            }
        }
        mean1 = mean1 / sum1;
        if (nrow[3] > 0) mean2 = mean2 / sum2;
        vari1 = 0;
        vari2 = 0;      
        for (i = 0; i < nvalueH; i++) {
            vari1 += (catgm[i] - mean1) * (catgm[i] - mean1) * freq1[i+1];
            if (nrow[3] > 0) {
              vari2 += (catgm[i] - mean2) * (catgm[i] - mean2) * freq2[i+1]; 
            }
        }
        vari1 = vari1 / sum1;
        stdv1 = Math.sqrt(vari1);
        if (nrow[3] > 0) {
          vari2 = vari2 / sum2;
          stdv2 = Math.sqrt(vari2);
        }
        for (i = 0; i < nvalueH; i++) {
            perc1[i+1] = freq1[i+1] / sum1;
            if (nrow[3] > 0) perc2[i+1] = freq2[i+1] / sum2;
        } 
        if( !isNaN(perc1[1]) ) document.getElementById("data14").value = f3(perc1[1]);
        if( !isNaN(perc2[1]) ) document.getElementById("data15").value = f3(perc2[1]);
        if( !isNaN(perc1[2]) ) document.getElementById("data24").value = f3(perc1[2]);
        if( !isNaN(perc2[2]) ) document.getElementById("data25").value = f3(perc2[2]);
        if( !isNaN(perc1[3]) ) document.getElementById("data34").value = f3(perc1[3]);
        if( !isNaN(perc2[3]) ) document.getElementById("data35").value = f3(perc2[3]);
        if( !isNaN(perc1[4]) ) document.getElementById("data44").value = f3(perc1[4]);
        if( !isNaN(perc2[4]) ) document.getElementById("data45").value = f3(perc2[4]);
        if( !isNaN(perc1[5]) ) document.getElementById("data54").value = f3(perc1[5]);
        if( !isNaN(perc2[5]) ) document.getElementById("data55").value = f3(perc2[5]);
        if( !isNaN(perc1[6]) ) document.getElementById("data64").value = f3(perc1[6]);
        if( !isNaN(perc2[6]) ) document.getElementById("data65").value = f3(perc2[6]);
        if( !isNaN(perc1[7]) ) document.getElementById("data74").value = f3(perc1[7]);
        if( !isNaN(perc2[7]) ) document.getElementById("data75").value = f3(perc2[7]);
        if( !isNaN(perc1[8]) ) document.getElementById("data84").value = f3(perc1[8]);
        if( !isNaN(perc2[8]) ) document.getElementById("data85").value = f3(perc2[8]);
        if( !isNaN(perc1[9]) ) document.getElementById("data94").value = f3(perc1[9]);
        if( !isNaN(perc2[9]) ) document.getElementById("data95").value = f3(perc2[9]);
        // write total
        document.getElementById("data102").value = sum1;
        document.getElementById("data104").value = f3(1);
        document.getElementById("data112").value = f2(mean1);
        document.getElementById("data122").value = f2(vari1);
        document.getElementById("data132").value = f2(stdv1);
        if (nrow[3] > 0) {
          document.getElementById("data103").value = sum2;
          document.getElementById("data105").value = f3(1);
          document.getElementById("data113").value = f2(mean2);
          document.getElementById("data123").value = f2(vari2);
          document.getElementById("data133").value = f2(stdv2);
        }
  }

  // 히스토그램 그리기 함수 -----------------------------------------------------------------------------------------------
  function drawHistogramRel(nvalueH, dataValueH, dvalueFreq1, dvalueFreq2) {
    var i, j, k, str, cx, cy;
    var label, tempx, tempy, tempw, temph, xgap, xwidth, xstep, color1, colr2;
    var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax;

    // 히스토그램 bins, 전체 데이터 최소 최대 계산
    gxminH   = dataValueH[0];
    gxmaxH   = dataValueH[nvalueH];
    gxrangeH = gxmaxH - gxminH;
    xgap     = graphWidth / (nvalueH + 2); // 좌우갭
    xwidth   = graphWidth - 2 * xgap; // 좌우 갭을 뺀 실제 x 너비
    xstep    = dataValueH[1] - dataValueH[0]; // Assume equal interval length
    // 히스토그램 그리기
    freqmax = 0;
    for (j = 0; j <= nvalueH; j++) {
        if (dvalueFreq1[j] > freqmax) freqmax = dvalueFreq1[j];
        if (nrow[3] > 0) {
          if (dvalueFreq2[j] > freqmax) freqmax = dvalueFreq2[j];
        }
    }
    gyminH = 0;
    gymaxH = freqmax * 1.2;  // Y축 버퍼
    gyrangeH = gymaxH - gyminH;

    // 전체 제목
    drawTitle(mTitle, yTitle, xTitle);
    // 아래 축그리기
    drawHistAxis(nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);   
    // 히스토그램 freq1[]
    tempw = xwidth * xstep / gxrangeH; // 막대 너비
    for (i = 1; i <= nvalueH; i++) {
            tempx = margin.left + xgap + xwidth * (dataValueH[i - 1] - gxminH) / gxrangeH;
            tempy = margin.top + graphHeight - graphHeight * (dvalueFreq1[i] - gyminH) / gyrangeH;
            temph = graphHeight * (dvalueFreq1[i] - gyminH) / gyrangeH;
            chart.append("rect")
                .style("fill", colr[2])
                .attr("class", "bar")
                .style("stroke", "lightgrey")
                .style("stroke-width", "1px")
                .attr("x", tempx)
                .attr("width", tempw)
                .attr("height", 0)
                .attr("y", margin.top + graphHeight)
                .transition() // 애니매이션 효과 지정
                .delay(function(d, i) {
                    return i * 250;
                }) // 0.5초마다 그리도록 대기시간 설정
                .duration(1000) // 2초동안 애니매이션이 진행되도록 설정
                .attr("y", tempy)
                .attr("height", temph)
    } // endof i
    color1 = colr[0];
    showHistLineRel(nvalueH, xstep, dataValueH, dvalueFreq1, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth, color1);

    if (nrow[3] > 0) {
      color2 = colr[6];
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 30;
      chart.append("circle").attr("class", "histline").style("fill", color1)
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", color1).style("text-anchor", "begin")
           .text(freq1Name)
      cy += 30;
      chart.append("circle").attr("class", "histline").style("fill", color2)
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", color2).style("text-anchor", "begin")
           .text(freq2Name)
      // freq2 상대도수다각형
      showHistLineRel(nvalueH, xstep, dataValueH, dvalueFreq2, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth, color2);
    }
  }
  // 히스토그램 y축, x축 그리기
  function drawHistAxis(nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight) {
    var i, j, k;
    var tx, ty, x1, x2, y1, y2, z1, z2;
    var gxrangeH = gxmaxH - gxminH;
    var xgap     = graphWidth / (nvalueH + 2); // 좌우갭
    var xwidth   = graphWidth - 2 * xgap; // 좌우 갭을 뺀 실제 x 너비
    var ygrid    = new Array(rowMax);

    // Y축 그리기
    var yScale = d3.scaleLinear().domain([gyminH, gymaxH]).range([graphHeight, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("class", "axis")
         .attr("transform", "translate(" + tx + ", " + ty + ") ")
         .call(d3.axisLeft(yScale))
    chart.append("line")
         .attr("x1", margin.left + graphWidth)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", margin.top)
         .attr("y2", margin.top + graphHeight)
         .style("stroke", "black")
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
    // 히스토그램의 x축 선
    tx = margin.left;
    ty = margin.top;
    chart.append("line")
         .attr("x1", tx)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", ty)
         .attr("y2", ty)
         .style("stroke", "black")
    ty = margin.top + graphHeight;
    chart.append("line")
         .attr("x1", tx)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", ty)
         .attr("y2", ty)
         .style("stroke", "black")
    // 히스토그램의 x축 아래 tick, value 값선
    y1 = margin.top + graphHeight;
    y2 = y1 + 5;
    for (i = 0; i <= nvalueH; i++) {
        x1 = margin.left + xgap + xwidth * (dataValueH[i] - gxminH) / gxrangeH;
        x2 = x1;
        chart.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .style("stroke", "black")
        // x 그리드
        chart.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", margin.top)
            .style("stroke", "lightgrey")
        chart.append("text")
            .attr("class", "myaxis")
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "0.7em")
            .style("font-family", "sans-serif")
            .style("stroke", "#0055FF")
            .attr("x", x1)
            .attr("y", y2 + 15)
            .text(f2(dataValueH[i]))
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
            .style("font-size", "1em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", margin.left + graphWidth / 2)
            .attr("y", margin.top + graphHeight + margin.bottom * 0.8)
            .text(xTitle)
     // Y축 제목
     var tx = margin.left / 2 - 30;
     var ty = margin.top + 15;
     chart.append("text")
            .style("font-size", "1em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "end")
            .attr("x", tx)
            .attr("y", ty)
            .text(yTitle)
            .attr("transform", "rotate(-90 30 100)")
  }


  // 히스토그램 도수분포다각형 표시 함수
  function showHistLineRel(nvalueH, xstep, dataValueH, freq, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth, colStr) {
    var i, k;
    var gxrangeH = gxmaxH - gxminH;
    var gyrangeH = gymaxH - gyminH;
        // left gap part
        x1 = margin.left + xgap + xwidth * (dataValueH[0] - xstep / 2 - gxminH) / gxrangeH;
        y1 = margin.top  + graphHeight;
        x2 = margin.left + xgap + xwidth * (dataValueH[0] + xstep / 2 - gxminH) / gxrangeH;
        y2 = margin.top  + graphHeight - graphHeight * (freq[1] - gyminH) / gyrangeH;
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("cx", x1)
             .attr("cy", y1)
             .attr("r", 3)
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        str = f3(freq[1]);
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
             .append("title")
             .text(str)
    // main polygon
    for (i = 1; i < nvalueH; i++) {
        x1 = x2;
        y1 = y2;
        x2 = margin.left + xgap + xwidth * (dataValueH[i] + xstep / 2 - gxminH) / gxrangeH;
        y2 = margin.top  + graphHeight - graphHeight * (freq[i + 1] - gyminH) / gyrangeH;
        str = f3(freq[i+1]);
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
             .append("title")
             .text(str)
    }
        // right gap part
        x1 = x2;
        y1 = y2;
        x2 = margin.left + xgap + xwidth * (dataValueH[nvalueH] + xstep / 2 - gxminH) / gxrangeH;
        y2 = margin.top  + graphHeight;
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", colStr)
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
  }

  // Change Color
  function changeColor(){
    colr[2] = d3.select("#data02").node().value;
    colr[0] = d3.select("#data04").node().value;
    colr[6] = d3.select("#data05").node().value;
  }

