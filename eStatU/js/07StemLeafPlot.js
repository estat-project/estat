      var chart = d3.select("#chart")
      var svgWidth    = 640;
      var svgHeight   = 560;  
      var margin, graphWidth, graphHeight;
      margin      = {top: 60, bottom: 20, left: 20, right: 20};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, ith;
      var x1, x2, y1, y2, cx, cy, ty;
      var nint, step, buffer, nvalue; 
      var nobs, mini, maxi;
      var maxrow = 100;
      var tdata = new Array(maxrow);
      var mTitle;

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat2("#data1");  
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      // erase Stem and Leaf Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("mtitle").value = "";
        document.getElementById("data1").value = "";
      })

      // Draw Stem and Leaf Graph ======================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        nobs  = stat.n;  
        for (i=0; i<nobs; i++) {
            if (isNaN(data[i]) ) { //문자 데이터 체크
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
        }
        mTitle = d3.select("#mtitle").node().value;
        mini  = stat.mini;  
        maxi  = stat.maxi;    
        for (i=0; i<nobs; i++) tdata[i] = data[i];
        drawStemLeaf(nobs, mini, maxi, tdata);
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
        v = (sumsq - n*xbar*xbar) / (n-1);
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

  // 줄기잎그림 함수 -----------------------------------------------------------------------------
  function drawStemLeaf(nobs, mini, maxi, dataSet) {
    var colr = ["#FF0000","#FF8000","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF","#0000FF"];
    var i, j, k, kk, digitMax, digitDeci, digit10, len, pos, temp, temp1, temp2, ty, x1, y1, x2, y2;
    var tempstr;
    var nvalue;
    var lineSpace  = 15;
    var tdata      = new Array(maxrow);
    var stem       = new Array(maxrow);
    var stemStr    = new Array(maxrow);
    var leaf       = new Array(maxrow);
    var dataValue  = new Array(maxrow);
    var dvalueFreq = new Array(maxrow);

    // 소수아래 자리수 계산
    digitDeci = 0;
    for (i = 0; i < nobs; i++) {
       temp = dataSet[i].toString();
       pos = temp.indexOf(".");
       if (pos < 0) len = 0;
       else len = temp.length - pos - 1;
       if (len > digitDeci) digitDeci = len;
    }
    if (digitDeci < 0) digitDeci = 0;
    digit10 = 1;
    if (digitDeci > 0) {
        for (j = 0; j < digitDeci; j++) digit10 *= 10;
    }

    // Counting Stem 
    temp1 = mini * digit10 - mini * digit10 % 10;
    temp2 = maxi * digit10 - maxi * digit10 % 10;
    nvalue = temp2 / 10 - temp1 / 10 + 2;

    svgHeight = margin.top + margin.bottom + 40 + nvalue * lineSpace;
    if (svgHeight < 560) svgHeight = 560;
    graphHeight = svgHeight - margin.top - margin.bottom;
    margin.left = 20;
    margin.right = 20;
    graphWidth = svgWidth - margin.left - margin.right;
    document.getElementById("chart").style.height = svgHeight;

    stem[0] = temp1;
    for (j = 1; j < nvalue; j++) {
        stem[j] = stem[j - 1] + 10;
    }

    for (j = 0; j < nvalue; j++) {
        temp = stem[j].toFixed(0);
        len = temp.length;
        if (temp == 0) {
            stemStr[j] = "0";
        } else {
            stemStr[j] = temp.substr(0, len - 1);
        }
        if (stemStr[j] == null) stemStr[j] = "0";
        dvalueFreq[j] = 0;
        leaf[j] = new Array(100);
    }

    ty = 20;
    for (i = 0; i < nobs; i++) {
        tdata[i] = dataSet[i] * digit10;
    }
    // Determine Leaf
    CountLeaf(nvalue, nobs, tdata, dataValue, dvalueFreq, stem, leaf);
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "20px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    chart.append("text").attr("class", "titleStem").attr("x", margin.left + 20).attr("y", margin.top + ty)
         .text(svgStr[39][langNum]).style("stroke", myColor[0]);
    temp = svgStr[40][langNum];
    chart.append("text").attr("class", "titleStem").attr("x", margin.left + 90).attr("y", margin.top + ty)
         .text(temp).style("stroke", myColor[0]);
    chart.append("line").attr("x1", margin.left).attr("x2", margin.left + graphWidth)
         .attr("y1", margin.top + 10 + ty).attr("y2", margin.top + 10 + ty).style("stroke", "black")

    for (j = 0; j < nvalue - 1; j++) {
            x1 = margin.left + 50;
            y1 = ty + margin.top + 30 + j * lineSpace;
            temp = stemStr[j];
            if (digitDeci > 1) temp = (parseInt(stemStr[j]) / (digit10 / 10)).toFixed(digitDeci - 1);
            chart.append("text").attr("class", "stem").attr("x", x1).attr("y", y1).text(temp).style("stroke", myColor[0]);
            for (k = 1; k <= dvalueFreq[j]; k++) {
                x2 = x1 + 40 + k * 16;
                temp = leaf[j][k].toFixed(0);
                chart.append("text")
                    .attr("class", "leaf")
                    .attr("x", x2)
                    .attr("y", y1)
                    .text(temp.toString())
                    .transition() // 애니매이션 효과 지정
                    .delay(function(d, i) {
                        return i * 100;
                    }) // 0.5초마다 그리도록 대기시간 설정
                    .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
                    .style("stroke", colr[temp])
            } // endfof k
    } // endof j 

    for (j = 0; j < nvalue - 1; j++) {
            for (k = 1; k <= dvalueFreq[j]; k++) {
                leaf[j][k] = 0;
            }
    } // endof j  
  }
  // Sorting freq in ascending order and determine leaf
  function CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf) {
    var i, j, k;
    var dataA = new Array(tobs);
    var dataY = new Array(tobs);

    for (i = 0; i < tobs; i++) dataA[i] = tdata[i];
    sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);
    for (j = 0; j < nvalue; j++) dvalueFreq[j] = 0;
    for (i = 0; i < tobs; i++) {
      if (dataA[i] < 0) {  // 음수
          for (j = 0; j < nvalue; j++) {
            if (dataA[i] < stem[j]) {
                dvalueFreq[j]++;
                leaf[j][dvalueFreq[j]] = -dataA[i] % 10;
                break;
            } 
          } // endof i
      }
      else { // 양수
          for (j = 0; j < nvalue; j++) {
            if (dataA[i] < stem[j+1]) {
                dvalueFreq[j]++;
                leaf[j][dvalueFreq[j]] = dataA[i] % 10;
                break;
            } 
          } // endof i
      }
    }
  }
  // Sorting in ascending and count each value frequency
  function sortAscendM(dobs, dataA, dataValue, dvalueFreq, dataY) {
    var i, j, temp;
    var nvalue = 0;
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (dataA[i] > dataA[j]) {
                temp = dataA[i];
                dataA[i] = dataA[j];
                dataA[j] = temp;
            }
        }
    }
    for (i = 0; i < dobs; i++) {
        dvalueFreq[i] = 0;
    }
    dataValue[nvalue] = dataA[0];
    dvalueFreq[nvalue] = 1;
    nvalue = 0;
    dataY[nvalue] = 1;
    for (i = 1; i < dobs; i++) {
        if (dataA[i] == dataA[i - 1]) {
            dvalueFreq[nvalue]++;
        } else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
        }
        dataY[i] = dvalueFreq[nvalue];
    }
    nvalue++;
    return nvalue;
  }
