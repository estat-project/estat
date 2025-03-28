      function showValueP(newValue) {document.getElementById("pp").value = f2(newValue/100); initialize();}
      function showValueE(newValue) {document.getElementById("epsi").value = f2(newValue/100);  initialize();}

      var chart = d3.select("#chart")
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var svgWidth    = 600;
      var svgHeight   = 400;  
      var margin      = {top: 50, bottom: 50, left: 50, right: 30};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var mTitle, yTitle, xTitle;
      mTitle = "";
      yTitle = "";
      xTitle = "n";
      var i, j, k; 
      var nn, pp, epsi, nint, step, buffer, nvalue, gxmin, gxmax; 
      var maxN      = 1000;
      var ngap      = 4;
      var ninterval = maxN / ngap;
      var maxrow    = ninterval + 1;
      var statP     = new Array(maxrow);
      var gxmin, gxmax, gymin, gymax, gxrange, gyrange;
      gxmin = 0;
      gxmax = maxN;
      gymin = 0;
      gymax = 1;
      gxrange = gxmax - gxmin;
      gyrange = gymax - gymin;
      initialize()

      // 대수의 법칙 버튼 클릭
      d3.select("#execute").on("click",function() {
        initialize();
      }) 
      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = 600;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
    // initialize
    function initialize(){
        chart.selectAll("*").remove();  
        pp   = parseFloat(d3.select("#pp").node().value);       
        epsi = parseFloat(d3.select("#epsi").node().value);  
        mTitle = "P( | (X/n) - p | < ε )" + "\u2800\u2800 p = "+f4(pp) + ",\u2800 ε = "+ f2(epsi);   
        // slider control
        document.getElementById("rangeP").value  = 100 * pp;
        document.getElementById("rangeE").value  = 100 * epsi;
        lawLargeBinomial();
    }
    // 대수의 법칙 함수
    function lawLargeBinomial() {
        var i, k, avg, std, temp, left, right, info;
        var x1, x2, y1, y2;
        var yheight = graphHeight;
        var xgap    = graphWidth / ninterval;

        // Calculate binomial probability
        for (i = 1; i < ninterval+1; i++) {
          nn = ngap * i;
          left  = nn * (pp - epsi);
          right = nn * (pp + epsi);
          if (nn < 1000) { // Binomial
            left  = Math.trunc(left) ;
            right = Math.trunc(right);
            statP[i] = binomial_cdf( right, nn, pp, info ) - binomial_cdf( left, nn, pp, info )
          }
          else { // Normal approx
            avg = nn * pp;
            std = Math.sqrt( nn * pp * (1-pp));
            left  = (left - avg) / std;
            right = (right - avg) / std;
            statP[i] = stdnormal_cdf(right) - stdnormal_cdf(left);
          }
        }
        // draw axis
        drawAxis();
        drawTitle(mTitle, yTitle, xTitle);
        // probability graph 
        x1 = margin.left + ngap;
        y1 = margin.top + graphHeight - yheight * (statP[1] - gymin) / gyrange;
        for (i = 2; i < ninterval+1; i++) {
          x2 = x1 + xgap;
          y2 = margin.top + graphHeight - yheight * (statP[i] - gymin) / gyrange;
          chart.append("line")
               .attr("class", "line")
               .attr("x1", x1)
               .attr("x2", x2)
               .attr("y1", y1)
               .attr("y2", y2)
               .style("stroke", colr[0])
               .style("stroke-width", "3")
          x1 = x2;
          y1 = y2;
        }
    }

