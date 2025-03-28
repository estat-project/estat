      var bar = d3.select("#chart");
      var svgWidth, svgHeight, svgWidth2, svgHeight2, margin, graphWidth, graphHeight; 
      var margin = {top: 90, bottom: 50, left: 60, right: 40};
      svgWidth   = 600; svgWidth2 = svgWidth;
      svgHeight  = 400; svgHeight2 = svgHeight;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;   

      var nvalue, checkData, mu, std, alpha;
      var hypoType, h1Type, df, info, f, g, h, pvalue, stat, T;
      hypoType = 96;
      var ngroup  = 2;
      var maxCell   = 1000;
      var nobs      = new Array(5);
      var ranksum   = new Array(5);
      var dataValue = new Array(maxCell);
      var dvalueP   = new Array(maxCell);
      var i,j,k;
      var checkRankSum = true;  // rank sum인 경우 true, signed rank sum인 경우 false
      var title = svgStrU[64][langNum] ;
      var sub1  = "";
      // initial graph
      nobs[1] = parseInt(document.getElementById("nn41").value);
      nobs[2] = parseInt(document.getElementById("nn42").value);
      nobs[0] = nobs[1] + nobs[2];         
      // Wilcoxon Rank Sum Distribution
      nvalue = rankSumDist(nobs[1], nobs[2], dataValue, dvalueP, checkRankSum);
      var sub2  = "n\u2081 = "+nobs[1]+", n\u2082 = "+nobs[2];
      drawBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, ranksum[2], alpha, h1Type, checkData) 

    // Testing Hypothesis ===========================================================
    d3.select("#executeTH4").on("click",function() {
      nobs[1] = parseInt(document.getElementById("nn41").value);
      nobs[2] = parseInt(document.getElementById("nn42").value);
      nobs[0] = nobs[1] + nobs[2];         
      // check exact or approximation
      if (nobs[0] < 26) { // exact distribution
        bar.selectAll("*").remove();
        // Wilcoxon Rank Sum Distribution
        nvalue = rankSumDist(nobs[1], nobs[2], dataValue, dvalueP, checkRankSum);
        // draw graph
        var sub2  = "n\u2081 = "+nobs[1]+", n\u2082 = "+nobs[2];
        drawBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, ranksum[2], alpha, h1Type, checkData) 
      }
      else {
        alert("n1+n2 <= 25 ???");
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

    // 순위합통계표 버튼 클릭
    d3.select("#ranksumBtn").on("click",function() {
      if (nobs[0] < 25) {
        nobs[1] = parseInt(document.getElementById("nn41").value);
        nobs[2] = parseInt(document.getElementById("nn42").value);
        nobs[0] = nobs[1] + nobs[2];
        nvalue = rankSumDist(nobs[1], nobs[2], dataValue, dvalueP, checkRankSum);
        WilcoxonRankSumTable(nvalue, nobs, dataValue, dvalueP);
      }
      else alert("No Exact Distribution if n > 25")
    })
    // save Table
    d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
    });

//******************************************************************
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
function drawBarGraph(title,sub1,sub2, nvalue, dataValue, dvalueP, ranksum, alpha, h1Type, checkData) {
         var i, k, sum1, sum2, str, x1, y1, x2, y2;
         var sum11, sum12, sum21, sum32, loc11, loc12, loc21, loc32;
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
           else if (dataValue[i] == ranksum) {
             sum1 += dvalueP[i];
             sum2 += dvalueP[i];
           }
           else sum2 += dvalueP[i];
         }
         x1 = margin.left +barMargin + (ranksum-dataValue[0])*betweenbarWidth + barWidth/2;
         x2 = x1;
         y1 = margin.top + 20;
         y2 = margin.top + graphHeight + 45;
         bar.append("line").style("stroke","green").style("stroke-width","2px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         str = "R\u2082 = "+ranksum;
         bar.append("text").attr("x", x2).attr("y", y2+15).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","middle")
         str = "P(X <= R\u2082) = "+f4(sum1);
         bar.append("text").attr("x", x2-5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","end")
         str = "P(X >= R\u2082) = "+f4(sum2);
         bar.append("text").attr("x", x2+5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","start")

         // 기준선 표시            
         sum11 = 0;
         for (i=0; i<nvalue; i++) {
           sum11 += dvalueP[i];
           if (sum11 > alpha/2) {loc11 = dataValue[i]; break;}
         }
         sum12 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum12 += dvalueP[i];
           if (sum12 > alpha/2) {loc12 = dataValue[i]; break;}
         } 
         sum21 = 0;
         for (i=0; i<nvalue; i++) {
           sum21 += dvalueP[i];
           if (sum21 > alpha) {loc21 = dataValue[i]; break;}
         }
         sum32 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum32 += dvalueP[i];
           if (sum32 > alpha) {loc32 = dataValue[i]; break;}
         } 
         y1 = margin.top + graphHeight/2 + 20;
         y2 = margin.top + graphHeight + 30 ;
         if (h1Type == 1) {
           x1 = margin.left +barMargin + (loc11-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc11)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2-5).attr("y", y2-50).text(f4(sum11))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","end")
           x1 = margin.left +barMargin + (loc12-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc12)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2+5).attr("y", y2-50).text(f4(sum12))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","start")
         }
         else if (h1Type == 2) {
           x1 = margin.left +barMargin + (loc21-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc21)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2-5).attr("y", y2-50).text(f4(sum21))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","end")
         }
         else {
           x1 = margin.left +barMargin + (loc32-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc32)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2+5).attr("y", y2-50).text(f4(sum32))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","start")
         }
*/
}

// 윌콕슨분포표
function WilcoxonRankSumTable(nvalue, nobs, dataValue, dvalueP) {
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
          for (j=0; j<3; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
          cell[0].innerHTML = "<h3>"+svgStrU[64][langNum]+"</h3>";
          cell[1].innerHTML = "n<sub>1</sub> = "+nobs[1];
          cell[2].innerHTML = "n<sub>2</sub> = "+nobs[2];

          row  = table.insertRow(++nrow);
          row.style.height ="30px";
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
            cell[0].innerHTML = dataValue[i];
            cell[1].innerHTML = f4(dvalueP[i]);
            sum += dvalueP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + dvalueP[i]);
            cell[0].style.backgroundColor = "#eee";
          }
}


