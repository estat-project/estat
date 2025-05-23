      var chart = d3.select("#chart")
      var svgWidth    = 640;
      var svgHeight   = 500;  
      var margin, graphWidth, graphHeight;
      margin      = {top: 80, bottom: 60, left: 80, right: 40};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;
      var histColor = "#00FFFF";

      var i, j, k, ith;
      var x1, x2, y1, y2, cx, cy, ty;
      var nint, step, buffer, nvalue; 
      var nobs, mean, varS, stdS, mini, maxi, start, xstep;
      var nvalueH, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth, Histogram;
      var mTitle, yTitle, xTitle;
      var rowMax = 100;
      var dint = new Array(rowMax);
      var freq = new Array(rowMax);

      document.getElementById("data104").value      = histColor;
      document.getElementById("msgMed").innerHTML   = svgStr[46][langNum]; 
      document.getElementById("msgMin").innerHTML   = svgStr[45][langNum]; 
      document.getElementById("msgMax").innerHTML   = svgStr[47][langNum]; 
      document.getElementById("msgRange").innerHTML = svgStr[112][langNum]; 
      document.getElementById("msgVariance").innerHTML = svgStr[117][langNum]; 
      yTitle = svgStr[16][langNum];
      document.getElementById("ytitle").value       = svgStr[16][langNum];
      document.getElementById("ytitle").disabled = true;
      document.getElementById("nn").disabled    = true;    
      document.getElementById("xbar").disabled  = true; 
      document.getElementById("medi").disabled  = true;   
      document.getElementById("mini").disabled  = true;  
      document.getElementById("maxi").disabled  = true;  
      document.getElementById("range").disabled = true; 
      document.getElementById("varS").disabled  = true; 
      document.getElementById("stdS").disabled  = true; 

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat2("#data1");  
        document.getElementById("nn").value    = stat.n;    
        document.getElementById("xbar").value  = f2(stat.xbar);
        document.getElementById("medi").value  = f2(stat.medi);  
        document.getElementById("range").value = f2(stat.range);  
        document.getElementById("mini").value  = f2(stat.mini);  
        document.getElementById("medi").value  = f2(stat.medi);  
        document.getElementById("maxi").value  = f2(stat.maxi);  
        document.getElementById("varS").value  = f2(stat.var);  
        document.getElementById("stdS").value  = f2(stat.std);  
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      // Frequency or % check
      var a = document.myForm2.type2;
      var checkFreqPercentY = true;
      var checkDensity = false
      a[0].onclick = function() { 
        checkFreqPercentY = true;  
        checkDensity = false;
        document.getElementById("ytitle").value = svgStr[16][langNum];
        yTitle = svgStr[16][langNum];
        drawHistogram(nobs, start, xstep, data, dint, freq);
      }  
      a[1].onclick = function() { 
        checkFreqPercentY = false; 
        checkDensity = false;
        document.getElementById("ytitle").value = svgStr[30][langNum];
        yTitle = svgStr[30][langNum];
        drawHistogram(nobs, start, xstep, data, dint, freq);
      } 
      a[2].onclick = function() { 
        checkFreqPercentY = false; 
        checkDensity = true;
        document.getElementById("ytitle").value = "";
        yTitle = "";
        drawHistogram(nobs, start, xstep, data, dint, freq);
      } 

      // erase Hist data input =====================================
      d3.select("#erase").on("click", function() {
        chart.selectAll("*").remove();
        document.getElementById("mtitle").value = ""; 
        document.getElementById("ytitle").value = "";  
        document.getElementById("xtitle").value = "";  
        document.getElementById("data1").value   = "";    
        document.getElementById("nn").value    = "";    
        document.getElementById("xbar").value  = "";    
        document.getElementById("medi").value  = "";     
        document.getElementById("varS").value  = "";      
        document.getElementById("mini").value  = "";    
        document.getElementById("maxi").value  = "";     
        document.getElementById("range").value = "";      
        document.getElementById("stdS").value  = "";     
        document.getElementById("start").value = "";
        document.getElementById("xstep").value = "";
        document.getElementById("HistMean").checked = false;
        document.getElementById("HistFreq").checked = false;
        document.getElementById("HistLine").checked = false;
      });
      // Draw Histogram ======================================
      d3.select("#execute").on("click",function() {
        nobs  = stat.n;  
        for (i=0; i<nobs; i++) {
            if (isNaN(data[i]) ) { //문자 데이터 체크
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
        }
        mean  = stat.xbar;  
        mini  = stat.mini;  
        maxi  = stat.maxi;    
        start = d3.select("#start").node().value;
        xstep = d3.select("#xstep").node().value;
        histColor = document.getElementById("data104").value;
        // input check
        if ( nobs > 100) {
           chart.append("text").attr("class","mean").attr("x", 250).attr("y", 100)
                .text(alertMsg[49][langNum]).style("stroke","red").style("font-size", "1em")
           return;
        }
        if ( start == "" || xstep == "" || isNaN(start) || isNaN(xstep) ) {
           chart.append("text").attr("class","mean").attr("x", 250).attr("y", 100)
                .text(alertMsg[50][langNum]).style("stroke","red").style("font-size", "1em")
           return;
        }
        else {
          start = parseFloat(start);
          xstep = parseFloat(xstep);
        }
        mTitle = d3.select("#mtitle").node().value;
        xTitle = d3.select("#xtitle").node().value;

        if (start > mini) start = mini
        var para = drawHistogram(nobs, start, xstep, data, dint, freq);
        Histogram = true;
        nvalueH = para.a;
        gxminH  = start;
        gxmaxH  = para.b;
        gyminH  = para.c;
        gymaxH  = para.d;
        xgap    = para.e;
        xwidth  = para.f;
      })

      // 히스토그램 평균표시
      d3.select("#HistMean").on("click", function() {
        if (Histogram == false) return;
        if (this.checked) {
          checkHistMean = true;
          showHistMean(mean, gxminH, gxmaxH, xgap, xwidth);
        } else {
          checkHistMean = false;
          removeHistMean();
        }
      })
      // 히스토그램 도수표시
      d3.select("#HistFreq").on("click", function() {
        if (Histogram == false) return;
        if (this.checked) {
          checkHistFreq = true;
          showHistFreq(nvalueH, xstep, dint, freq, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth);
        } else {
          checkHistFreq = false;
          removeHistFreq();
        }
      })
      // 히스토그램 꺽은선그래프 표시
      d3.select("#HistLine").on("click", function() {
        if (Histogram == false) return;
        if (this.checked) {
          checkHistLine = true;
          showHistLine(nvalueH, xstep, dint, freq, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth);
        } else {
          checkHistLine = false;
          removeHistLine()
        }
      })
      // 히스토그램 도수분포표 표시
      d3.select("#HistTable").on("click", function() {;
        if (Histogram == false) return;
        showHistTable(nvalueH, dint, freq)
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

    // basic statistics function ============================================
    simplestat2 = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
	         .map(parseFloat);                      // [8.0, 8.0, 9.0]
	if(isNaN(data[0])) data = [];
        n = data.length;
        sum = 0;
        sumsq = 0;
        data.forEach(function(d) {
          sum += d;
          sumsq += d*d;
        });
        xbar = sum / n;
        v = (sumsq - n*xbar*xbar) / (n);
        s = Math.sqrt(v)
        data.sort(function(a, b) { return a - b; });
        mini  = data[0];
        maxi  = data[n-1];
        range = maxi - mini;
        medi = medianCalc(n,data);
        var tdata = new Array(n);
        var ntemp; 
        if (n%2 == 1) { // odd
          ntemp = (n+1)/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp-1; i<n; i++) tdata[i-ntemp+1] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        else {
          ntemp = n/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp; i<n; i++) tdata[i-ntemp] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        iqr = q3 - q1;
        return {'n':n, 'xbar':xbar, 'var':v, 'std':s, 'mini':mini, 'q1':q1, 'medi':medi, 'q3':q3, 'maxi':maxi, 'range':range, 'iqr':iqr};
  }
  // median calculation
  function medianCalc(n, data) {
        if (n < 2) return;
        if (n%2 == 1) { // odd
          return data[(n+1)/2 -1];
        }
        else { // even
          return ( data[n/2 -1] + data[(n+2)/2 -1] ) / 2.;
        }
  }

  // Counting frequency of each histogram interval
  function HistIntervalFreq(tobs, nvalueH, dataA, dataValueH, dvalueFreq) {
    var i, j, k;
    for (i = 0; i <= nvalueH ; i++) {
        dvalueFreq[i] = 0;
    }
    for (i = 0; i < tobs; i++) {
        k = 1;
        for (j = k; j <= nvalueH; j++) {
            if (dataA[i] < dataValueH[j]) {
                dvalueFreq[j]++;
                break;
            } else {
                k++;
            }
        } // endof j
    } // endof i
  }

  // 히스토그램 그리기 함수 -----------------------------------------------------------------------------------------------
  function drawHistogram(nobs, gxminH, xstep, data, dataValueH, dvalueFreq) {
    chart.selectAll("*").remove();
    document.getElementById("HistMean").checked = false; 
    document.getElementById("HistFreq").checked = false; 
    document.getElementById("HistLine").checked = false; 
    checkHistMean = false;
    checkHistFreq = false;
    checkHistLine = false;
    var i, j, k;
    var label, tempx, tempy, tempw, temph, xgap, xwidth;
    var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax;

    var dataA = new Array(rowMax);
//    var dataValueH = new Array(rowMax); // 각 구간값: 최대 구간의 수 =199개
//    var dvalueFreq = new Array(rowMax); // 각 구간도수  

    // 히스토그램 bins, 전체 데이터 최소 최대 계산
    nvalueH = 0;
    dataValueH[0] = gxminH;
    while (dataValueH[nvalueH] <= maxi) {
        nvalueH++;
        dataValueH[nvalueH] = dataValueH[nvalueH - 1] + xstep;
    }
    gxmaxH   = dataValueH[nvalueH];
    gxrangeH = gxmaxH - gxminH;
    xgap     = graphWidth / (nvalueH + 2); // 좌우갭
    xwidth   = graphWidth - 2 * xgap; // 좌우 갭을 뺀 실제 x 너비

    // 히스토그램 그리기
    freqmax = 0;
    HistIntervalFreq(nobs, nvalueH, data, dataValueH, dvalueFreq);

    for (j = 0; j <= nvalueH; j++) {
        if (dvalueFreq[j] > freqmax) freqmax = dvalueFreq[j];
    }
    gyminH = 0;
    gymaxH = freqmax + Math.floor(freqmax / 8 + 1);
    gyrangeH = gymaxH - gyminH;

    // 전체 제목
    drawTitle(mTitle, yTitle, xTitle);
    // 아래 축그리기
    drawHistAxis(nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);
    // 히스토그램
    tempw = xwidth * xstep / gxrangeH; // 막대 너비
    for (i = 1; i <= nvalueH; i++) {
           tempx = margin.left + xgap + xwidth * (dataValueH[i - 1] - gxminH) / gxrangeH;
           tempy = margin.top + graphHeight - graphHeight * (dvalueFreq[i] - gyminH) / gyrangeH;
           temph = graphHeight * (dvalueFreq[i] - gyminH) / gyrangeH;
           chart.append("rect")
                .style("fill", histColor)
                .attr("class", "bar")
                .style("stroke", "black")
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

    return { a: nvalueH, b: gxmaxH, c: gyminH, d: gymaxH, e: xgap, f: xwidth };
  }
  // 히스토그램 y축, x축 그리기
  function drawHistAxis(nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight) {
    var i, j, k;
    var tx, ty, x1, x2, y1, y2, z1, z2, temp, yScale;
    var gxrangeH = gxmaxH - gxminH;
    var xgap     = graphWidth / (nvalueH + 2); // 좌우갭
    var xwidth   = graphWidth - 2 * xgap; // 좌우 갭을 뺀 실제 x 너비
    var ygrid    = new Array(rowMax);


    // Y축 그리기
    if (checkFreqPercentY) {
      yScale = d3.scaleLinear().domain([gyminH, gymaxH]).range([graphHeight, 0]);
    }
    else {
      if (!checkDensity) {
        temp = gymaxH / nobs;
        yScale = d3.scaleLinear().domain([gyminH, temp]).range([graphHeight, 0]);
      }
      else {
        temp = gymaxH / nobs / xstep;
        yScale = d3.scaleLinear().domain([gyminH, temp]).range([graphHeight, 0]);
      }
    }
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
            .attr("x", margin.left + graphWidth / 2 + 10)
            .attr("y", margin.top + graphHeight + margin.bottom*0.8 )
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

  // 히스토그램 평균 표시 함수
  function showHistMean(avg, gxminH, gxmaxH, xgap, xwidth) {
    var tempx, tempy;
    var gxrangeH = gxmaxH - gxminH;

    if (isNaN(avg)) return;
    tempx = margin.left + xgap + xwidth * (avg - gxminH) / gxrangeH;
    tempy = margin.top + 5;
    chart.append("line")
         .attr("class", "histmean")
         .attr("x1", tempx)
         .attr("y1", tempy + 30)
         .attr("x2", tempx)
         .attr("y2", tempy + graphHeight)
    chart.append("text")
         .attr("class", "histmean")
         .style("stroke", "red")
         .style("text-anchor", "middle")
         .style("font-family", "sans-serif")
         .style("font-size", "0.7em")
         .attr("x", tempx)
         .attr("y", tempy + graphHeight + 5)
         .text(svgStr[34][langNum] + "=" + f2(avg))
  }

  // 히스토그램 평균표시 제거 함수
  function removeHistMean() {
    chart.selectAll("line.histmean").remove();
    chart.selectAll("circle.histmean").remove();
    chart.selectAll("text.histmean").remove();
  }
  
  // 히스토그램 도수 표시 함수
  function showHistFreq(nvalueH, xstep, dataValueH, freq, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth) {
    var x1, y1, temp;
    var gxrangeH = gxmaxH - gxminH;
    var gyrangeH = gymaxH - gyminH;

    for (var i = 1; i <= nvalueH; i++) {
        x1 = margin.left + xgap + xwidth * (dataValueH[i - 1] + xstep / 2 - gxminH) / gxrangeH;
        y1 = margin.top + graphHeight - graphHeight * (freq[i] - gyminH) / gyrangeH;
        if (checkFreqPercentY) temp = freq[i];
        else temp = f2( freq[i] / nobs );
        chart.append("text")
             .attr("class", "histfreq")
             .style("stroke", "red")
             .style("text-anchor", "middle")
             .style("font-family", "sans-serif")
             .style("font-size", "0.8em")
             .attr("x", x1)
             .attr("y", y1 - 4)
             .text(temp)
    }
  }

  // 히스토그램 도수 제거 함수
  function removeHistFreq() {
    chart.selectAll("text.histfreq").remove();
  }


  // 히스토그램 도수분포다각형 표시 함수
  function showHistLine(nvalueH, xstep, dataValueH, freq, gxminH, gxmaxH, gyminH, gymaxH, xgap, xwidth) {
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
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x1)
             .attr("cy", y1)
             .attr("r", 3)
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
    // main polygon
    for (i = 1; i < nvalueH; i++) {
        x1 = margin.left + xgap + xwidth * (dataValueH[i - 1] + xstep / 2 - gxminH) / gxrangeH;
        y1 = margin.top  + graphHeight - graphHeight * (freq[i] - gyminH) / gyrangeH;
        x2 = margin.left + xgap + xwidth * (dataValueH[i] + xstep / 2 - gxminH) / gxrangeH;
        y2 = margin.top  + graphHeight - graphHeight * (freq[i + 1] - gyminH) / gyrangeH;
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x1)
             .attr("cy", y1)
             .attr("r", 3)
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
    }
    // right gap part
        x1 = margin.left + xgap + xwidth * (dataValueH[nvalueH - 1] + xstep / 2 - gxminH) / gxrangeH;
        y1 = margin.top  + graphHeight - graphHeight * (freq[nvalueH] - gyminH) / gyrangeH;
        x2 = margin.left + xgap + xwidth * (dataValueH[nvalueH] + xstep / 2 - gxminH) / gxrangeH;
        y2 = margin.top  + graphHeight;
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x1)
             .attr("cy", y1)
             .attr("r", 3)
        chart.append("line")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
        chart.append("circle")
             .attr("class", "histline")
             .style("stroke", "red")
             .style("stroke-width", "2px")
             .attr("cx", x2)
             .attr("cy", y2)
             .attr("r", 3)
  }

  // 히스토그램 도수분포다각형 제거
  function removeHistLine() {
    chart.selectAll("line.histline").remove();
    chart.selectAll("circle.histline").remove();
  }

  // 히스토그램 도수분포표 
  function showHistTable(nvalueH, dataValueH, freq) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, totsum, avgH, temp, row;
    var cell = new Array(5);
    var ncol = 4;

    totsum = 0;
    for (i = 0; i < nvalueH; i++) {
       totsum += freq[i+1];
    }

    table.style.fontSize = "13px";
    k = 0;
    row = table.insertRow(k);
    row.style.height = "35px";
    for (j = 0; j < 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.textAlign = "center";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.width = "200px";
    cell[0].innerHTML = svgStr[36][langNum];  //  Histogram Frequency Table

    k++;
    row = table.insertRow(k);
    row.style.height = "30px";
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[38][langNum] ; // 계급구간
    cell[1].innerHTML = svgStr[118][langNum]; // 계급값
    cell[2].innerHTML = svgStr[16][langNum];  // 도수
    cell[3].innerHTML = svgStr[30][langNum];  // 상대도수

    avgH = 0;
    for (i = 0; i < nvalueH; i++) {
        k++;
        row = table.insertRow(k);
        row.style.height = "30px";
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.width = "110px";
          cell[j].style.textAlign = "right";
          cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML =  f2(dataValueH[i]) + " &le; x &lt; " + f2(dataValueH[i + 1]);
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        temp  = (dataValueH[i]+dataValueH[i + 1])/2;
        avgH += temp * freq[i+1];
        cell[1].innerHTML = f2(temp) ;
        cell[2].innerHTML = freq[i + 1].toString();
        cell[3].innerHTML = f2(freq[i + 1] / totsum);
    }
    avgH = avgH / totsum; // 도수분포에 의한 평균
    // 합계 출력
    k++;
    row = table.insertRow(k);
    row.style.height = "30px";
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[23][langNum];  //합계 
    cell[2].innerHTML = totsum;
    cell[3].innerHTML = f2(1);
    // 도수분포 평균 출력
    k++;
    row = table.insertRow(k);
    row.style.height = "30px";
    for (j = 0; j < 2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[118][langNum] +" " + svgStr[34][langNum];  // 계급값 평균 
    cell[1].innerHTML = f2(avgH);

    // 다음 표와의 공백을 위한 것
    k++;
    row = table.insertRow(k);
    row.style.height = "20px";
  }

  // Change Color
  function changeColor(){
     histColor = document.getElementById("data104").value ;
  }
