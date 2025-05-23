// ScatterMatrix - Parallel Graph
      var chart     = d3.select("#chart"); 
      var titleStr    = "";
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, kk, str1, str2, temp, tindex;
      var yobs, x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, numVar, tnumVar;
      var ngroup, training, linearFunction;
      var ngroupMax  = 9;
      var fontsize  = "1em";
      var rowMax    = 200;
      var colMax    = 6;
      var xdata     = new Array(rowMax);
      var ydata     = new Array(rowMax);
      var yydata    = new Array(rowMax);
      var yydataN      = new Array(rowMax);
      var ytrain    = new Array(rowMax);
      var ytrainN   = new Array(rowMax);
      var x1data    = new Array(rowMax);
      var x2data    = new Array(rowMax);
      var x3data    = new Array(rowMax);
      var x4data    = new Array(rowMax);
      var x5data    = new Array(rowMax);
      var D         = new Array(colMax);
      var Dtrain    = new Array(colMax);
      var gobsD     = new Array(colMax);
      var gavg      = new Array(colMax);
      var gstd      = new Array(colMax);
      var gcov      = new Array(colMax);
      var gcorr     = new Array(colMax);
      var Davg      = new Array(ngroupMax);
      var Dcov      = new Array(ngroupMax);
      var Dcorr     = new Array(ngroupMax);
      var prior     = new Array(ngroupMax);
      var iprior  = 0;       // no prior needed

      for (j = 0; j < colMax; j++) {
        D[j]        = new Array(rowMax);
        Dtrain[j]   = new Array(rowMax);
        gcov[j]     = new Array(colMax);
        gcorr[j]    = new Array(colMax);
      }
      for (k = 0; k < ngroupMax; k++) {
        Davg[k]      = new Array(colMax);
        Dcov[k]      = new Array(colMax);
        Dcorr[k]     = new Array(colMax);
      }

      for (k = 0; k < ngroupMax; k++) {
        for (j = 0; j < colMax; j++) {
          Dcov[k][j] = new Array(colMax);
          Dcorr[k][j]= new Array(colMax);
        }
      }

      var tdvarName    = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085"];
      var tdvarNameSub = ["Y", "X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
      var svarName     = new Array(colMax);
      var dataA        = new Array(rowMax);
      var dataValue    = new Array(rowMax);
      var dvalueFreq   = new Array(rowMax);
      var gdataValue   = new Array(rowMax);
      var yclass       = new Array(rowMax);

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        yydata = data;  
        yobs = stat.n;
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        x1data = data; 
        x1obs = stat.n;
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");  
        x2data = data; 
        x2obs = stat.n;
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");  
        x3data = data; 
        x3obs = stat.n;
      });
      d3.select("#data5").on("input", function() {
        stat = simplestat("#data5");  
        x4data = data; 
        x4obs = stat.n;
      });
      d3.select("#data6").on("input", function() {
        stat = simplestat("#data6");  
        x5data = data; 
        x5obs = stat.n;
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
          chart.selectAll("*").remove();  // 전화면 제거
          // variable name
          tdvarName[0] = document.getElementById("name1").value;
          tdvarName[1] = document.getElementById("name2").value;
          tdvarName[2] = document.getElementById("name3").value;
          tdvarName[3] = document.getElementById("name4").value;
          tdvarName[4] = document.getElementById("name5").value;
          tdvarName[5] = document.getElementById("name6").value;
          for (i = 0; i < colMax; i++) {
            if (tdvarName[i] == "") tdvarName[i] = Xvarname[i];
          } 

          // y var statistics
          if (yobs == 1) {
            ngroup = 1;
            for (i = 0; i < x1obs; i++) yydataN[i] = 0;
          }
          else {
            for (j = 0; j < yobs; j++) dataA[j] = yydata[j];
            ngroup = datavalueDM(yobs, dataA, dataValue, dvalueFreq);
            for (j = 0; j < ngroup; j++) {
              gdataValue[j] = dataValue[j];
            }
            for (i = 0; i < yobs; i++) {
              for (j = 0; j < ngroup; j++) {
                if( yydata[i] == dataValue[j] ) {yydataN[i] = j; break;}
              }
            }
          }

          if (x1obs > 0) {
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < x1obs; j++) {
              if ( isNaN(x1data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 1; // num of indep var
            for (j = 0; j < x1obs; j++) D[0][j] = x1data[j];
          }
          if (x2obs > 0) {
            if (x1obs != x2obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < x1obs; j++) {
              if ( isNaN(x2data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 2;
            for (j = 0; j < x1obs; j++) D[1][j] = x2data[j];
          }
          if (x3obs > 0) {
            if (x1obs != x3obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < x1obs; j++) {
              if ( isNaN(x3data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 3;
            for (j = 0; j < x1obs; j++) D[2][j] = x3data[j];
          }
          if (x4obs > 0) {
            if (x1obs != x4obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < x1obs; j++) {
              if ( isNaN(x4data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 4;
            for (j = 0; j < x1obs; j++) D[3][j] = x4data[j];
          }
          if (x5obs > 0) {
            if (x1obs != x5obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < x1obs; j++) {
              if ( isNaN(x5data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 300).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 5;
            for (j = 0; j < x1obs; j++) D[4][j] = x5data[j];
          }

          tobs = x1obs;
          for (i = 0; i < numVar; i++) svarName[i] = tdvarName[i+1];
          // Data partition
          training = 1;

          for (k = 0; k < ngroup; k++) gobsD[k] = 0;
          training = 1;
          if (training == 1) { // 100% training
            tobs = x1obs;
            for (j = 0; j < x1obs; j++) {
              ytrain[j]    = yydata[j];
              ytrainN[j] = yydataN[j];
              gobsD[yydataN[j]]++;
              for (i = 0; i < numVar; i++) Dtrain[i][j] = D[i][j];
            }
          }

          tnumVar = numVar; 
          linearFunction = 0; // no linear function needed
          statMultivariateDM(ngroup, numVar, tobs);
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })

      // scatter plot cluster
      d3.select("#scatterPlot").on("click", function() {
          if (tobs < 1) return;
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          parallelGraphByGroup(numVar, svarName, tobs, ngroup, gdataValue);
      })
      // print multivariate statistics
      d3.select("#statMultivariate").on("click", function() {
          if (tobs < 1) return;
          printMultivariate(iprior);
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

