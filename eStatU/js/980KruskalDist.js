      var bar = d3.select("#chart");
      var svgWidth, svgHeight, svgWidth2, svgHeight2, margin, graphWidth, graphHeight; 
      var margin = {top: 90, bottom: 50, left: 60, right: 40};
      svgWidth   = 600;
      svgHeight  = 400;
      svgWidth2  = svgWidth;
      svgHeight2 = svgHeight;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;   

      var i,j,k,sum, temp, tempi, checkData;
      var ngroup, tobs, nvalue, T, H;
      var hypoType, h1Type, df, info, f, g, h, pvalue, stat, alpha;
      var nobs      = new Array(5);
      var ranksum   = new Array(5);
      var R         = new Array(20);  
      hypoType  = 98;  // 크루스칼검정
      h1Type    = 2;   // 우측검정

      var maxCell   = 1000  // H distribution 값의 최대수 
      var dataValue = new Array(maxCell);
      var dvalueP   = new Array(maxCell);
      for (i=0; i<maxCell; i++) {
        dataValue[i] = 0;
        dvalueP[i]   = 0;
      }
      var title = svgStrU[66][langNum] ;
      var sub1  = "";
      ngroup = 3;
      // initial graph
      nobs[1] = parseInt(document.getElementById("nn41").value);
      nobs[2] = parseInt(document.getElementById("nn42").value);
      nobs[3] = parseInt(document.getElementById("nn43").value);
      nobs[0] = nobs[1] + nobs[2] + nobs[3];  
        tobs = 0;
        nvalue = 0;
        for (i=0; i<nobs[0]; i++) R[i] = i+1;
        // All possible permutation and H statistics
        permKruskal(R, 0, nobs[0], nobs[0]) ;  
        // Sorting and indexing data in ascending order
        for (i=0; i<nvalue-1; i++) {
          for (j=i; j<nvalue; j++) {
            if(dataValue[i] > dataValue[j]) {
                temp         = dataValue[i];  tempi      = dvalueP[i];
                dataValue[i] = dataValue[j];  dvalueP[i] = dvalueP[j];
                dataValue[j] = temp;          dvalueP[j] = tempi;  
            }
          }
        } 
        // rank sum의 distribution 계산
        for (j=0; j<nvalue; j++) {
          dvalueP[j] = dvalueP[j] / tobs;
          dataValue[j] = f3(dataValue[j]);
        }
      var sub2  = "n\u2081 = "+nobs[1]+", n\u2082 = "+nobs[2]+", n\u2083 = "+nobs[3];
      drawKruskalBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, H, alpha, h1Type, checkData) 

    // Testing Hypothesis ===========================================================
    d3.select("#executeTH4").on("click",function() {
      nobs[1] = parseInt(document.getElementById("nn41").value);
      nobs[2] = parseInt(document.getElementById("nn42").value);
      nobs[3] = parseInt(document.getElementById("nn43").value);
      nobs[0] = nobs[1] + nobs[2] + nobs[3];  
      // check n <= 10 for exact distribution
      if (nobs[0] < 11) {      // KruskalDistribution
        bar.selectAll("*").remove();
        tobs = 0;
        nvalue = 0;
        for (i=0; i<nobs[0]; i++) R[i] = i+1;
        // All possible permutation and H statistics
        permKruskal(R, 0, nobs[0], nobs[0]) ;  
        // Sorting and indexing data in ascending order
        for (i=0; i<nvalue-1; i++) {
          for (j=i; j<nvalue; j++) {
            if(dataValue[i] > dataValue[j]) {
                temp         = dataValue[i];  tempi      = dvalueP[i];
                dataValue[i] = dataValue[j];  dvalueP[i] = dvalueP[j];
                dataValue[j] = temp;          dvalueP[j] = tempi;  
            }
          }
        } 
        // rank sum의 distribution 계산
        for (j=0; j<nvalue; j++) {
          dvalueP[j] = dvalueP[j] / tobs;
          dataValue[j] = f3(dataValue[j]);
        }
        // draw graph
        var sub2  = "n\u2081 = "+nobs[1]+", n\u2082 = "+nobs[2]+", n\u2083 = "+nobs[3];
        drawKruskalBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, H, alpha, h1Type, checkData) 
      }
      else {
        alert("n1+n2+n3 <= 10 ???");
        return;
      }
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

    // 크루스칼 통계표 버튼 클릭
    d3.select("#ranksumBtn").on("click",function() {
      if (nobs[0] < 11) {
        KruskalDistTable(ngroup, nvalue, nobs, dataValue, dvalueP);
      }
      else alert("No Exact Distribution if n > 10")
    })
    // save Table
    d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
    });

//*******************************************************************
function showValueRangeN1(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn41").value = newValue;
        document.getElementById("executeTH4").click();
}
function showValueRangeN2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn42").value = newValue;
        document.getElementById("executeTH4").click();
}
function showValueRangeN3(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn43").value = newValue;
        document.getElementById("executeTH4").click();
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];	
  arr[j] = temp;
}

function permKruskal(arr, depth, n, k) { 
  if (depth == k) { // 한번 depth 가 k로 도달하면 사이클이 돌았음. 출력함. 
    var i,j,sum;
    for (j=1; j<=ngroup; j++) ranksum[j] = 0;
    for (i=0; i<n; i++) { 
      if (ngroup == 3) {
        if (i<nobs[1]) ranksum[1] += arr[i];
        else if (i<nobs[1]+nobs[2]) ranksum[2] += arr[i];
        else ranksum[3] += arr[i];
      }
      else {
        if (i<nobs[1]) ranksum[1] += arr[i];
        else if (i<nobs[1]+nobs[2]) ranksum[2] += arr[i];
        else if (i<nobs[1]+nobs[2]+nobs[3]) ranksum[3] += arr[i];
        else ranksum[4] += arr[i];
      }
    }

    // Calculate Kruskal H statitic
    sum = 0;
    for (j=1; j<=ngroup; j++) sum += ranksum[j]*ranksum[j]/nobs[j]
    sum = 12*sum/(nobs[0]*(nobs[0]+1)) - 3*(nobs[0]+1);

    checkDuplicate = false;
    for (j=0; j<nvalue; j++) {
        if (sum == dataValue[j]) {
          dvalueP[j]++;
          checkDuplicate = true;
          break;
        }
    }
    if (checkDuplicate == false) {
        dataValue[nvalue] = sum;
        dvalueP[nvalue]++;
// console.log (sum+" "+nvalue+" "+dataValue[nvalue]+" "+dvalueP[nvalue])
        nvalue++;
    }
    tobs++;
  
  } 
  for (var i = depth; i < n; i++) {
    swap(arr, i, depth); 
    permKruskal(arr, depth + 1, n, k); 
    swap(arr, i, depth); 
  } 
}
// draw Kruskal Bar Graph
function drawKruskalBarGraph(title,sub1,sub2, nvalue, dataValue, dvalueP, ranksum, alpha, h1Type, checkData) {
         var i, k, sum1, sum2, str, x1, y1, x2, y2;
         var sum32, loc32, loc;
         var xmin      = dataValue[0];
         var xmax      = dataValue[nvalue-1];
         var ymin      = d3.min(dvalueP);
         var ymax      = d3.max(dvalueP);
         var gymin     = ymin;
         var gymax     = ymax + ymax/5;  
         var yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         var betweenbarWidth = graphWidth / nvalue;   // 막대와 막대 사이의 너비
         var barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         // draw title
         x1 = margin.left + graphWidth/2;
         y1 = margin.top/2;
         bar.append("text").attr("x",x1).attr("y",y1).text(title)
            .style("font-family","sans-serif").style("font-size","12pt").style("stroke","black").style("text-anchor","middle")         
         bar.append("text").attr("x",x1).attr("y",y1+15).text(sub1)
            .style("font-family","sans-serif").style("font-size","9pt").style("stroke","black").style("text-anchor","middle")
         bar.append("text").attr("x",x1).attr("y",y1+30).text(sub2)
            .style("font-family","sans-serif").style("font-size","9pt").style("stroke","green").style("text-anchor","middle")

         // draw Y and X axis
         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue, dataValue, betweenbarWidth);
         // 분포함수 막대그래프
         for (var k=0; k<nvalue; k++) {
           bar.append("rect")
            .style("fill",myColor[0])
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - dvalueP[k]*yRatio)
            .attr("height", dvalueP[k]*yRatio)
         }
/*
         if (checkData == false) return; 
         // 표본통계량 위치 표시
         sum1 = 0;
         sum2 = 0;
         for (i=0; i<nvalue; i++) {
           if (dataValue[i] < ranksum) sum1 += dvalueP[i];
           else if (Math.abs(dataValue[i] - ranksum) < 0.001 ) {
             loc = i;
             sum1 += dvalueP[i]; 
             break;
           }
           else {
             loc = i - 0.5;
             break;
           }
         }
         for (i=0; i<nvalue; i++) {
           if (dataValue[i] == ranksum) {
             sum2 += dvalueP[i];
           }
           else if (dataValue[i] > ranksum)  sum2 += dvalueP[i];
         }
         if (dataValue[nvalue-1] < ranksum) loc = nvalue-1;
         x1 = margin.left +barMargin + loc*betweenbarWidth + barWidth/2;
         x2 = x1;
         y1 = margin.top + 20;
         y2 = margin.top + graphHeight + 45;
         bar.append("line").style("stroke","green").style("stroke-width","2px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         str = "H = "+f3(ranksum);
         bar.append("text").attr("x", x2).attr("y", y2+15).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","middle")
         str = "P(X <= H) = "+f4(sum1);
         bar.append("text").attr("x", x2-5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","end")
         str = "P(X >= H) = "+f4(sum2);
         bar.append("text").attr("x", x2+5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","start")

         // 기준선 표시            
         sum32 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum32 += dvalueP[i];
           if (sum32 > alpha) {loc32 = i; break;}
         } 
         y1 = margin.top + graphHeight/2 + 20;
         y2 = margin.top + graphHeight + 30 ;
         x1 = margin.left + barMargin + loc32*betweenbarWidth + barWidth/2;
         x2 = x1;
         bar.append("line").style("stroke","red").style("stroke-width","1px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         bar.append("text").attr("x", x2).attr("y", y2+15).text(f3(dataValue[loc32]))
            .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
         bar.append("text").attr("x", x2+5).attr("y", y1+25).text(f4(sum32))
            .style("font-size","9pt").style("stroke","red").style("text-anchor","start")
*/
}

// 윌콕슨분포표
function KruskalDistTable(ngroup, nvalue, nobs, dataValue, dvalueP) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var row, header;
        var i, j, sum;
        var nrow = 0;
        var ncol = 4;
        var cell = new Array(4);

         table.style.fontSize = "13px";
    
          row = table.insertRow(nrow);
          row.style.height ="40px";
          for (j=0; j<2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
          cell[0].innerHTML = "<h3>"+svgStrU[66][langNum]+"</h3>";
          cell[1].innerHTML = "k = "+ngroup;

          row  = table.insertRow(++nrow);
          row.style.height ="30px";
          for (j=0; j<ngroup+1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[1].innerHTML = "n<sub>1</sub> = "+nobs[1];
          cell[2].innerHTML = "n<sub>2</sub> = "+nobs[2];
          cell[3].innerHTML = "n<sub>3</sub> = "+nobs[3];
          if (ngroup == 4) {
            cell[4].innerHTML = "n<sub>4</sub> = "+nobs[4];
          }

          row  = table.insertRow(++nrow);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X &leq; x)";
          cell[3].innerHTML = "P(X &geq; x)";
          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
            }
            cell[0].innerHTML = f3(dataValue[i]);
            cell[1].innerHTML = f4(dvalueP[i]);
            sum += dvalueP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + dvalueP[i]);
            cell[0].style.backgroundColor = "#eee";
          }
}

