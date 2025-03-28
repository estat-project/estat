      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 65, right: 5};
      var svgWidth    = 600;
      var svgHeight   = 460;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, nn, xx;
      var nfact, rfact;
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var rowMax   = 10;
      var colMax   = 11;
      // binomial coefficient
      var binomial = new Array(rowMax);
      for (i=0; i<rowMax; i++) {
        for (j=0; j<colMax; j++) {
          binomial[i] = new Array(colMax);
        }
      }
      binomial[0][0] = 1;
      binomial[0][1] = 1;
      binomial[1][0] = 2;
      binomial[1][1] = 1;
      binomial[1][2] = 1;
      for (i = 2; i < rowMax; i++) {
        binomial[i][0] = i + 1;
        binomial[i][1] = 1;
        for (j = 2; j <= i; j++) {
          binomial[i][j] = binomial[i-1][j-1] + binomial[i-1][j];
        }
        binomial[i][j] = 1;
      }
      nn = parseFloat(d3.select("#nn").node().value);
      drawPascal(nn);

      // Draw Pascal Triangle ======================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        // input value
        nn = parseFloat(d3.select("#nn").node().value);

        if ( isNaN(nn) ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("Wrong input!  Enter number, not character!   Try again.")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        if ( nn < 1 || nn > 9 ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("Enter n between 1 and 9 !!   Try again.")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        drawPascal(nn);   
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

      // n slidebar
      function showValueN(newValue) {
        document.getElementById("nn").value = newValue;
        nn = parseFloat(d3.select("#nn").node().value);
        drawPascal(nn);
      }

      // draw Pascal Triangle
      function drawPascal(nn) {
        chart.selectAll("*").remove();
        var i, j, tx, ty, cx, cy, x1, y1, x2, y2, str1, str2, str3;
        var radius = 15;
        var xgap   = 30;
        var ygap   = 45;
        var temp   = 7;
        var fontsize  = "1em";
        var fontsize2 = "0.8em";
        // Pascal Triangle
        str1 = svgStr[122][langNum];
        chart.append("text").attr("x", "15px").attr("y", "40px").text(str1)
             .style("font-size","1.8em").style("stroke","black").style("text-anchor","start");
        cx = margin.left + graphWidth / 2;
        cy = margin.top + 20;
        str1 = binomial[0][1].toString();
        chart.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radius).style("fill",colr[0]);
        chart.append("text").attr("x", cx).attr("y", cy+5).text(str1)
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","middle");
        for (i = 1; i <= nn; i++) {
          if (i > 1) {
            x1 = cx - (i-1)*xgap;
            y1 = cy;
            x2 = cx - i*xgap + 2*xgap;
            y2 = cy + ygap;
            for (j = 2; j < i+1; j++) {
              chart.append("line").attr("x1",x1+temp).attr("y1",y1+temp).attr("x2",x2-temp).attr("y2",y2-temp)
                   .style("stroke",colr[i-1]).style("stroke-width","3");
              x1 += 2*xgap;
              x2 += 2*xgap;
            }
            x1 = cx - (i-1)*xgap + 2*xgap;
            x2 = cx - i*xgap + 2*xgap;         
            for (j = 2; j < i+1; j++) {
              chart.append("line").attr("x1",x1-temp).attr("y1",y1+temp).attr("x2",x2+temp).attr("y2",y2-temp)
                   .style("stroke",colr[i-1]).style("stroke-width","3");;
              x1 += 2*xgap;
              x2 += 2*xgap;
            }
          }
          cy = cy + ygap; 
          ty = cy;
          tx = cx - (i+1.4)*xgap;
          str2 = "(a + b)";
          chart.append("text").attr("x", tx).attr("y", ty).text(str2)
               .style("font-size",fontsize).style("stroke","black").style("text-anchor","end");
          chart.append("text").attr("x", tx+5).attr("y", ty-5).text(i)
               .style("font-size",fontsize2).style("stroke","black").style("text-anchor","start");

          tx = cx - i*xgap;
          for (j = 1; j <= i+1; j++) {
            str1 = binomial[i][j].toString();
            chart.append("circle").attr("cx",tx).attr("cy",ty).attr("r",radius).style("fill",colr[i]);
            chart.append("text").attr("x", tx).attr("y", ty+5).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","middle");
            tx += 2*xgap;
          }
        }
        // binomial theorem
        cy = cy + ygap;
        ty = cy
        tx = cx - nn*xgap - xgap;
        chart.append("text").attr("x", tx).attr("y", ty).text("a")
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","end");
        chart.append("text").attr("x", tx).attr("y", ty-5).text(nn)
             .style("font-size",fontsize2).style("stroke","black").style("text-anchor","start");
        tx += 1.5*xgap;
        for (j = 2; j <= nn; j++) {
            str1 = " + " + binomial[nn][j].toString();
            str2 = (nn-j+1).toString();
            str3 = (j-1).toString()
            chart.append("text").attr("x", tx).attr("y", ty).text(str1)
                 .style("font-size",fontsize).style("stroke","black").style("text-anchor","end");
            chart.append("text").attr("x", tx+5).attr("y", ty).text("a")
                 .style("font-size",fontsize).style("stroke","black").style("text-anchor","start");
            chart.append("text").attr("x", tx+12).attr("y", ty-5).text(str2)
                 .style("font-size",fontsize2).style("stroke","black").style("text-anchor","start");
            chart.append("text").attr("x", tx+20).attr("y", ty).text("b")
                 .style("font-size",fontsize).style("stroke","black").style("text-anchor","start");
            chart.append("text").attr("x", tx+30).attr("y", ty-5).text(str3)
                 .style("font-size",fontsize2).style("stroke","black").style("text-anchor","start");
            tx += 2.3*xgap;
        }
        str1 = " + " + "b";
        chart.append("text").attr("x", tx).attr("y", ty).text(str1)
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","end");
        chart.append("text").attr("x", tx).attr("y", ty-5).text(nn)
             .style("font-size",fontsize2).style("stroke","black").style("text-anchor","start");
      }

