      var bar = d3.select("#chart");
      var svgWidth, svgHeight, svgWidth2, svgHeight2, margin, graphWidth, graphHeight; 
      var margin = {top: 90, bottom: 90, left: 100, right: 120};
      svgWidth   = 600;
      svgHeight  = 400;
      svgWidth2  = svgWidth;
      svgHeight2 = svgHeight;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;   

      var i,j,k,sum, temp, tempi, checkData;
      var ngroup, tobs, nvalue, T, H;
      var hypoType, h1Type, df, info, f, g, h, pvalue, stat;
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
      var w = [];
      var x = [];
      var y = [];
      var u = []
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("nn71").disabled   = true;
      document.getElementById("nn72").disabled   = true;
      document.getElementById("nn73").disabled   = true;
      document.getElementById("nn74").disabled   = true;
      document.getElementById("xbar71").disabled = true;
      document.getElementById("xbar72").disabled = true;
      document.getElementById("xbar73").disabled = true;
      document.getElementById("xbar74").disabled = true;
      document.getElementById("kgroup").disabled = true;
      document.getElementById("statH").disabled  = true;

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        w = data;
        if (document.getElementById("data1").value == "") nobs[1] = 0;
        else nobs[1] = w.length;
        document.getElementById("nn71").value   = nobs[1];    
        updateData(); 
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        x = data; 
        if (document.getElementById("data2").value == "") nobs[2] = 0;
        else nobs[2] = x.length;
        document.getElementById("nn72").value   = nobs[2];    
        updateData(); 
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");  
        y = data;
        if (document.getElementById("data3").value == "") nobs[3] = 0;
        else nobs[3] = y.length;
        document.getElementById("nn73").value   = nobs[3];   
        updateData(); 
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");  
        u = data;
        if (document.getElementById("data4").value == "") nobs[4] = 0;
        else nobs[4] = u.length;
        document.getElementById("nn74").value   = nobs[4];    
        updateData(); 
      });

      function updateData() {
        document.getElementById("xbar71").value = "";
        document.getElementById("xbar72").value = "";
        document.getElementById("xbar73").value = "";
        document.getElementById("xbar74").value = "";
        document.getElementById("kgroup").value = "";
        document.getElementById("statH").value  = "";
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("data3").value  = "";
        document.getElementById("data4").value  = "";
        document.getElementById("nn71").value   = "";
        document.getElementById("nn72").value   = "";
        document.getElementById("nn73").value   = "";
        document.getElementById("nn74").value   = "";
        document.getElementById("xbar71").value = "";
        document.getElementById("xbar72").value = "";
        document.getElementById("xbar73").value = "";
        document.getElementById("xbar74").value = "";
        document.getElementById("kgroup").value = "";
        document.getElementById("statH").value  = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
      })

    // Testing Hypothesis ===========================================================
    d3.select("#executeTH4").on("click",function() {
        checkExecute = true;
        // alpha
        alpha = parseFloat(d3.select("#alpha").node().value);
        if (alpha < 0.001) {
          alpha = 0.001;
          document.getElementById("alpha").value = alpha;
        }
        else if (alpha > 0.499) {
          alpha = 0.499;
          document.getElementById("alpha").value = alpha;
        }
        document.getElementById("alpha2").value = alpha;
        document.getElementById("rangeAlpha").value = alpha*1000;
 
        // check data
        nobs[1] = w.length;
        nobs[2] = x.length;
        nobs[3] = y.length;
        nobs[4] = u.length;
        if (nobs[1] == 0 || nobs[2] == 0 || nobs[3] == 0) { // 세 sample 이상 체크
          alert("Wrong input!  Each n1, n2, n3 should be greater than 0 for Kruskal-Wallis Test");
          return;
        }
        // ngroup 수
        if (nobs[1] > 0 && nobs[2] > 0 && nobs[3] > 0 && nobs[4] == 0) ngroup = 3
        else if (nobs[1] > 0 && nobs[2] >0 && nobs[3] > 0 && nobs[4] > 0) ngroup = 4
        nobs[0] = nobs[1] + nobs[2] + nobs[3] + nobs[4];         

        var z = new Array(nobs[0]);
        z = w.concat(x);
        z = z.concat(y);
        z = z.concat(u);
        // Calculate rank Sum of each sample
        T = statRankSum(ngroup, nobs, z, ranksum )
        document.getElementById("xbar71").value = ranksum[1];
        document.getElementById("xbar72").value = ranksum[2];
        document.getElementById("xbar73").value = ranksum[3];
        if (nobs[4] == 0) document.getElementById("xbar74").value = "";
        else document.getElementById("xbar74").value = ranksum[4];

        testingKruskal();
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
         str = "P(X \u2264 H) = "+f4(sum1);
         bar.append("text").attr("x", x2-5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","end")
         str = "P(X \u2265 H) = "+f4(sum2);
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
          row.style.height ="30px";
          for (j=0; j<2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = "<h3>"+svgStrU[64][langNum]+"</h3>";
          cell[1].innerHTML = "k = "+ngroup;

          row  = table.insertRow(++nrow);
          row.style.height ="30px";
          for (j=0; j<ngroup; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = "n<sub>1</sub> = "+nobs[1];
          cell[1].innerHTML = "n<sub>2</sub> = "+nobs[2];
          cell[2].innerHTML = "n<sub>3</sub> = "+nobs[3];
          if (ngroup == 4) {
            cell[3].innerHTML = "n<sub>4</sub> = "+nobs[4];
          }

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
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
            }
            cell[0].style.backgroundColor = "#eee";
            cell[0].innerHTML = f3(dataValue[i]);
            cell[1].innerHTML = f4(dvalueP[i]);
            sum += dvalueP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + dvalueP[i]);
          }
}
// testing kruskal-Wallis
function testingKruskal() {
      bar.selectAll("*").remove();
      // Calculate Kruskal H statitic
      sum = 0;
      for (j=1; j<=ngroup; j++) sum += ranksum[j]*ranksum[j]/nobs[j]
      sum = 12*sum/(nobs[0]*(nobs[0]+1)) - 3*(nobs[0]+1);
      H = sum / (1 - T/(nobs[0]*nobs[0]*nobs[0] - nobs[0]) )
      document.getElementById("kgroup").value = f0(ngroup); 
      document.getElementById("statH").value = f3(H); 

      // check n <= 10 for exact distribution
      if (nobs[0] < 11) {      // KruskalDistribution
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
        var title  = svgStrU[65][langNum] ;
        var sub1 = "H\u2080: M\u2081 = M\u2082 = ... = M\u2096" ;
        var sub2 = svgStrU[67][langNum];
        drawKruskalBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, H, alpha, h1Type, checkData) 
      }
      else {    // chisq-test
        df = ngroup - 1;
        h = alpha;  
        if (df < 10) f = 0;
        else f = chisq_inv(0.0001, df, info);
        g = chisq_inv(1-h, df, info);
        pvalue = 1 - chisq_cdf(sum, df, info)
        drawChisqGraphTH(hypoType, h1Type, statT, H, df, f, g, h, pvalue);
      }  
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingKruskal();
} 
