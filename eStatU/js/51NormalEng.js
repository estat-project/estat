﻿      var dot = d3.select("#chart");
      var svgWidth,  svgHeight,  graphWidth,  graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth    = 600;
      svgHeight   = 510;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var margin  = {top: 20, bottom: 100, left: 20, right: 20};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var avg, std, min, Q1, median, Q3, max, freqMaxP, gxmin, gxmax, gymin, gymax;
      var stat = new Array(30);
      var title;
      var mu, sigma, a, b, c, d, e, f, g, h;
      var nobs = 500;

      title  = "N(0,1) "+svgStrU[24][langNum]+"   n="+nobs;
      dot.append("text").attr("class","title").attr("x", margin.left).attr("y", margin.top).text(title) 
      showDotGraphNormalP(nobs, stat);

      // 시뮬레이션 실행버튼 클릭 ------------------------------------------------------------------
      d3.select("#btn1Normal").on("click",function() {
        dot.selectAll("*").remove();
        document.getElementById("meanNormal").checked = false;

        title  = "N(0,1) Dist"+" n="+nobs;
        dot.append("text").attr("class","title").attr("x", margin.left).attr("y", margin.top).text(title) 
        showDotGraphNormalP(nobs, stat);
      })

      // 통계량 및 상자그림 표시
      d3.select("#meanNormal").on("click",function() {
        if(this.checked) {
          var start = 0;
          drawStatNormal(stat, start);
          drawBoxNormal(stat, start);
        } else {
	  removeMeanNormal();
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

