      var svg     = d3.select("#chart"); 
      var i, r;
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle, xobs, yobs, tobs;
      var fontsize = "1em";
      var stat      = new Array(30);
      var rowmax    = 200;
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var teststat, pvalue, df, info, pvalue;
      var hypoType = 1;
      document.getElementById("nn41").disabled    = true;    
      document.getElementById("nn42").disabled    = true;    
      document.getElementById("xbar41").disabled  = true;    
      document.getElementById("xbar42").disabled  = true;    
      document.getElementById("var41").disabled   = true;       
      document.getElementById("var42").disabled   = true;       
      document.getElementById("var43").disabled   = true;       
      document.getElementById("std41").disabled   = true;       
      document.getElementById("std42").disabled   = true;       
      document.getElementById("std43").disabled   = true;    
      document.getElementById("testStat").disabled= true;    
      document.getElementById("pvalue").disabled  = true;    
      document.getElementById("msgMean").innerHTML       = svgStr[34][langNum];    
      document.getElementById("msgCovariance").innerHTML = svgStr[121][langNum]; 
      document.getElementById("msgCorr").innerHTML       = svgStr[60][langNum]; 
      document.getElementById("msgTestStat").innerHTML   = svgStrU[23][langNum]; 
      document.getElementById("msgPvalue").innerHTML     = svgStrU[27][langNum]; 

      svg.selectAll("*").remove();
      // input data control ===================================================
      d3.select("#data301").on("input", function() {
        stat = simplestat("#data301");  
        xdata = data;  
        xobs = stat.n;
      });

      d3.select("#data302").on("input", function() {
        stat = simplestat("#data302");  
        ydata = data; 
        yobs = stat.n;
      });

      updateData = function() {
        document.getElementById("data301").value = '';
        document.getElementById("data302").value = '';    
      }
      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; }    // 좌측검정

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        svg.selectAll("*").remove();
        document.myForm0.type0[0].checked = true;
        document.getElementById("data301").value  = "";
        document.getElementById("data302").value  = "";
        document.getElementById("nn41").value  = ""; 
        document.getElementById("nn42").value  = "";   
        document.getElementById("xbar41").value  = "";    
        document.getElementById("xbar42").value  = "";   
        document.getElementById("var41").value  = "";       
        document.getElementById("var42").value  = "";       
        document.getElementById("var43").value  = "";       
        document.getElementById("std41").value  = "";      
        document.getElementById("std42").value  = "";       
        document.getElementById("std43").value  = "";   
        document.getElementById("testStat").value  = "";    
        document.getElementById("pvalue").value  = "";;   
      })

      d3.select("#redrawCorr").on("click", function(){  
          svg.selectAll("*").remove();  // 전화면 제거
          document.getElementById("regress2").checked = false;
          // 입력행이 같은지 체크
          if (xobs != yobs ) {
            svg.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
          }
          tobs = xobs;
          // 입력 도수에 숫자 문자 빈칸 있나 체크
          for (i=0; i<tobs; i++) {
            if (isNaN(xdata[i]) || isNaN(ydata[i]) ) {
              svg.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          // title
          mTitle = d3.select("#mtitle").node().value;
          yTitle = d3.select("#ytitle").node().value;
          xTitle = d3.select("#xtitle").node().value;
          // 통계량, p-value
          basicScatterStat(tobs, xdata, ydata, stat);
          teststat = Math.sqrt(tobs-2) * stat[9] / Math.sqrt(1-stat[9]*stat[9]);
          df = tobs - 2;
          if (h1Type == 1) {
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else  pvalue = 2 * (1 - t_cdf(teststat, df, info));
          }
          else if (h1Type == 2) {
            pvalue = 1 - t_cdf(teststat, df, info);
//            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu);
          }
          else {
            pvalue = t_cdf(teststat, df, info);
//            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu);
          }

          document.getElementById("nn41").value   = tobs;    
          document.getElementById("nn42").value   = tobs;    
          document.getElementById("xbar41").value = f2(stat[1]);
          document.getElementById("xbar42").value = f2(stat[11]);
          document.getElementById("var41").value  = f2(stat[17]); 
          document.getElementById("var42").value  = f2(stat[18]);    
          document.getElementById("var43").value  = f2(stat[19]);    
          document.getElementById("std41").value  = f2(stat[2]); 
          document.getElementById("std42").value  = f2(stat[12]);    
          document.getElementById("std43").value  = f3(stat[9]);    
          document.getElementById("testStat").value = f3(teststat);    
          document.getElementById("pvalue").value   = f4(pvalue);    
          showScatterPlot(tobs, xdata, ydata, stat[5], stat[6], stat[15], stat[16], graphWidth, graphHeight, checkTitle);
      })

      // 회귀선 그리기
      d3.select("#regress2").on("click",function() {
          if(this.checked) {
            showRegression2(stat[7], stat[8], stat[9], stat[10], stat[5], stat[6], stat[15], stat[16], checkTitle);
          } else {
	    removeRegression2();
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

// Two variable Basic Statistics
function basicScatterStat(nobs, xdata, ydata, stat) {
        var tempx, tempy;
        var xsum = 0;
        var ysum = 0;
        for (i=0; i<nobs; i++) {
          xsum += xdata[i];
          ysum += ydata[i];
        }
        var xavg = xsum / nobs;
        var yavg = ysum / nobs;
        var sxx = 0;
        var sxy = 0;
        var syy = 0;
        for (i=0; i<nobs; i++) {
          tempx = xdata[i] - xavg;
          tempy = ydata[i] - yavg;
          sxx += tempx*tempx;
          syy += tempy*tempy;
          sxy += tempx*tempy; 
        }
        var xvar = sxx / (nobs-1);
        var xstd = Math.sqrt(xvar);
        var yvar = syy / (nobs-1);
        var ystd = Math.sqrt(yvar);
        var beta    = sxy / sxx;
        var alpha   = yavg - beta*xavg;
        var cov     = sxy / (nobs-1);
        var corr    = sxy / Math.sqrt(sxx * syy);
        var rsquare = corr * corr;
        var xmin = xdata[0];
        var xmax = xdata[0];
        var ymin = ydata[0];
        var ymax = ydata[0];
        for (i=1; i<nobs; i++) {
          if (xmin > xdata[i]) xmin = xdata[i];
          if (xmax < xdata[i]) xmax = xdata[i];
          if (ymin > ydata[i]) ymin = ydata[i];
          if (ymax < ydata[i]) ymax = ydata[i];
        } 
        // 그래프 화면 정의 
        var xgap    = (xmax - xmin) / 8;
        var ygap    = (ymax - ymin) / 8;
        var gxmin   = xmin - xgap;
        var gxmax   = xmax + xgap;
        var gymin   = ymin - ygap;
        var gymax   = ymax + ygap;
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;
        // save statistic
        stat[0]  = nobs;
        stat[1]  = xavg;    stat[11] = yavg;
        stat[2]  = xstd;    stat[12] = ystd;
        stat[3]  = xmin;    stat[13] = ymin;
        stat[4]  = xmax;    stat[14] = ymax;
        stat[5]  = gxmin;   stat[15] = gymin
        stat[6]  = gxmax;   stat[16] = gymax;
        stat[7]  = alpha;   stat[17] = xvar;
        stat[8]  = beta;    stat[18] = yvar;
        stat[9]  = corr;    stat[19] = cov;
        stat[10] = rsquare;    
}
// 산점도 그리기 함수 -------------------------------------------------------------
function showScatterPlot(nobs, xdata, ydata, gxmin, gxmax, gymin, gymax, graphWidth, graphHeight, checkTitle) {
     var gxrange = gxmax - gxmin;
     var gyrange = gymax - gymin;
     var xgrid    = new Array(nobs);
     var ygrid    = new Array(nobs);

     var i, tx, ty;
         // 주제목
         svg.append("text")
            .attr("x", margin.left + graphWidth/2)
            .attr("y", margin.top / 2 + 10)
            .style("font-size", "1.8em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .text(mTitle)
         // X축 제목
         svg.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", margin.left + graphWidth / 2)
            .attr("y", margin.top + graphHeight + margin.bottom / 2 + 15)
            .text(xTitle)
         // Y축 제목
         tx = margin.left / 2 - 30;
         ty = margin.top + 15;
         svg.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "end")
            .attr("x", tx)
            .attr("y", ty)
            .text(yTitle)
            .attr("transform", "rotate(-90 30 100)")

        // x축 그리기
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        xgrid = xScale.ticks();
        // x축 그리드
        for (i = 1; i < xgrid.length; i++) {
          tx = margin.left + xScale(xgrid[i]);
          svg.append("line")
           .attr("x1", tx)
           .attr("x2", tx)
           .attr("y1", margin.top)
           .attr("y2", margin.top + graphHeight)
           .style("stroke", "lightgrey")
        }
        ty = margin.top + graphHeight;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisBottom(xScale)) 
        svg.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
	     .attr("class", "main axis date")
             .call(d3.axisTop(xScale)) 
        // y축 그리기
        var yScale = d3.scaleLinear().domain([gymin,gymax]).range([graphHeight, 0])
        ygrid = yScale.ticks();
        // Y축 그리드
        for (i = 1; i < ygrid.length; i++) {
          ty = margin.top + yScale(ygrid[i]);
          svg.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
        }
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisLeft(yScale)) 
        var tx = margin.left + graphWidth;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScale)) 
        // 산점도 점 그리기
        svg.selectAll("circle")
             .data(xdata)
             .enter()
             .append("circle")
             .attr("cx", function(d,i){ return margin.left + graphWidth*Math.random() })
             .attr("cy", margin.top + 20)
             .transition()                           // 애니매이션 효과 지정
             .delay(function(d,i) {return i*50;})   // 0.5초마다 그리도록 대기시간 설정
             .duration(500) 
             .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/gxrange;})
             .attr("cy", function(d,i){ return margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange;})         
             .attr("r", 5)
             .attr("class","circle")
             .style("fill",function(d,i){return myColor[i] })
}

// 회귀선 그리기 함수
function showRegression2(alpha, beta, corr, rsquare, gxmin, gxmax, gymin, gymax, checkTitle) {
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;
        var x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
        var y1  = margin.top  + graphHeight - graphHeight*((alpha+beta*stat[3])-gymin)/gyrange;
        var x2  = margin.left + graphWidth*(stat[4]-gxmin)/gxrange;
        var y2  = margin.top  + graphHeight - graphHeight*((alpha+beta*stat[4])-gymin)/gyrange;
        svg.append("line").attr("class","reglabel2")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke","green") 
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  20)
                .text(svgStrU[31][langNum]+" :  y = ("+f2(alpha)+") + ("+f2(beta)+ ") x")
        
        svg.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 80)
                .attr("y", margin.top +  40)
                .text("r = "+f2(corr)+" r\u00B2 = "+f2(rsquare))
      }
}// Remove Regression Line of Simulation
function removeRegression2() {
	 svg.selectAll("line.reglabel2").remove();
         svg.selectAll("text.reglabel2").remove();
}

