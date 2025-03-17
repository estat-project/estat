// PCA
      var chart       = d3.select("#chart"); 
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, kk, str1, str2, temp, tindex;
      var x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, numVar;
      var ngroup  = 1;
      var fontsize  = "1em";
      var linearFunction = 0;
      var rowMax    = 200;
      var colMax    = 7;
      var gdataValue= new Array(rowMax);
      var xdata     = new Array(rowMax);
      var ydata     = new Array(rowMax);
      var x1data    = new Array(rowMax);
      var x2data    = new Array(rowMax);
      var x3data    = new Array(rowMax);
      var x4data    = new Array(rowMax);
      var x5data    = new Array(rowMax);
      var x6data    = new Array(rowMax);
      var mdvar     = new Array(colMax);
      var Y         = new Array(colMax);
      var Dtrain    = new Array(colMax);
      var gavg      = new Array(colMax);
      var gstd      = new Array(colMax);
      var gcov      = new Array(colMax);
      var gcorr     = new Array(colMax);
      var Yavg      = new Array(colMax);
      var Ystd      = new Array(colMax);
      var Ycov      = new Array(colMax);
      var Ycorr     = new Array(colMax);
      var A         = new Array(colMax);
      var V         = new Array(colMax);
      var curS      = new Array(colMax);
      var eigen     = new Array(colMax);
      var index     = new Array(colMax);
      var vector    = new Array(colMax);
      for (j = 0; j < colMax; j++) {
        mdvar[j]    = new Array(rowMax);
        Y[j]        = new Array(rowMax);
        Dtrain[j]   = new Array(rowMax);
      }

      for (j = 0; j < colMax; j++) {
        gcov[j]     = new Array(colMax);
        gcorr[j]    = new Array(colMax);
        Ycov[j]     = new Array(colMax);
        Ycorr[j]    = new Array(colMax);
        A[j]        = new Array(colMax);
        V[j]        = new Array(colMax);
        curS[j]     = new Array(colMax);
        vector[j]   = new Array(colMax);
      }

      var tdvarName = new Array(colMax);
      var svarName  = new Array(colMax);
      var tdvarNameSub = ["X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>", "X<sub>6</sub>"];
      var XvarNameSub  = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
      var YvarNameSub  = ["Y\u2081", "Y\u2082", "Y\u2083", "Y\u2084", "Y\u2085", "Y\u2086"];
      var evarNameSub  = ["e\u2081", "e\u2082", "e\u2083", "e\u2084", "e\u2085", "e\u2086"];

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        x1data = data;  
        x1obs = stat.n;
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        x2data = data; 
        x2obs = stat.n;
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");  
        x3data = data; 
        x3obs = stat.n;
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");  
        x4data = data; 
        x4obs = stat.n;
      });
      d3.select("#data5").on("input", function() {
        stat = simplestat("#data5");  
        x5data = data; 
        x5obs = stat.n;
      });
      d3.select("#data6").on("input", function() {
        stat = simplestat("#data6");  
        x6data = data; 
        x6obs = stat.n;
      });

      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
        document.getElementById("data3").value = '';    
        document.getElementById("data4").value = '';    
        document.getElementById("data5").value = '';    
        document.getElementById("data6").value = '';    
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("name1").value = "";
        document.getElementById("name2").value = "";
        document.getElementById("name3").value = "";
        document.getElementById("name4").value = "";
        document.getElementById("name5").value = "";
        document.getElementById("name6").value = "";
        document.getElementById("data1").value = "";
        document.getElementById("data2").value = "";
        document.getElementById("data3").value = "";
        document.getElementById("data4").value = "";
        document.getElementById("data5").value = "";
        document.getElementById("data6").value = "";
      })

      d3.select("#executeKmeans").on("click", function(){  
          // variable name
          tdvarName[0] = document.getElementById("name1").value;
          tdvarName[1] = document.getElementById("name2").value;
          tdvarName[2] = document.getElementById("name3").value;
          tdvarName[3] = document.getElementById("name4").value;
          tdvarName[4] = document.getElementById("name5").value;
          tdvarName[5] = document.getElementById("name6").value;
          for (i = 0; i < colMax; i++) {
            if (tdvarName[i] == "") tdvarName[i] = XvarNameSub[i];
          } 

          tobs = x1obs;
          // 입력행이 같은지 체크
          if (tobs == 0 || x2obs == 0 ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text("No input data").style("stroke","red").style("font-size","1em");
            return;
          }
          // 입력 데이터에 숫자 문자 빈칸 있나 체크
          for (j = 0; j < tobs; j++) {
            if ( isNaN(x1data[j]) || isNaN(x2data[j]) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          numVar = 2;
          for (j = 0; j < tobs; j++) {
            mdvar[0][j] = x1data[j];
            mdvar[1][j] = x2data[j];
          }
          if (x3obs > 0) {
            if (tobs != x3obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < tobs; j++) {
              if ( isNaN(x3data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 3;
            for (j = 0; j < tobs; j++) mdvar[2][j] = x3data[j];
          }
          if (x4obs > 0) {
            if (tobs != x4obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < tobs; j++) {
              if ( isNaN(x4data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 4;
            for (j = 0; j < tobs; j++) mdvar[3][j] = x4data[j];
          }
          if (x5obs > 0) {
            if (tobs != x5obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < tobs; j++) {
              if ( isNaN(x5data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 5;
            for (j = 0; j < tobs; j++) mdvar[4][j] = x5data[j];
          }
          if (x6obs > 0) {
            if (tobs != x6obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < tobs; j++) {
              if ( isNaN(x6data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 6;
            for (j = 0; j < tobs; j++) mdvar[5][j] = x6data[j];
          }

          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 

          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
          statPCA(numVar, tobs);
          pcaStatTable();
      })

      // scatter plot 
      d3.select("#scatterCluster").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          parallelGraphByGroup(numVar, svarName, tobs, ngroup, gdataValue);
      })

      // eigenvalue plot 
      d3.select("#eigenPlot").on("click", function() {
          if (tobs < 1) return;
          drawEigenvalue();
      })

      // pca scatter plot 
      d3.select("#pcScatterPlot").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = YvarNameSub[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = Y[i][j];
          } 
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })

      // cluster table
      d3.select("#pcTable").on("click", function() {
          pcaTable(numVar, tobs);
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var chart = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(chart.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

