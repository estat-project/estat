// K-means clustering
      var chart       = d3.select("#chart"); 
      var titleStr    = "";
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, kk, str1, str2, temp, tindex;
      var x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, numVar;
      var Kgroup, maxiter, iter, epsi;
      var nclusterMax = 10;
      var iterMax   = 11;
      var SSE       = new Array(iterMax);
      var kSSE      = new Array(nclusterMax);
      var BIC       = new Array(nclusterMax);
      var fontsize  = "1em";
      var istandard = 0;
      var iprior    = 0;      // 1: for Bayes classification
      var linearFunction = 0; // 1: for Bayes classification when numVar = 2
      var rowMax    = 200;
      var colMax    = 10;
      var gdataValue= new Array(rowMax);
      var xdata     = new Array(rowMax);
      var ydata     = new Array(rowMax);
      var x1data    = new Array(rowMax);
      var x2data    = new Array(rowMax);
      var x3data    = new Array(rowMax);
      var x4data    = new Array(rowMax);
      var x5data    = new Array(rowMax);
      var x6data    = new Array(rowMax);
      var ytrainN = new Array(rowMax);
      var mdvar     = new Array(colMax);
      var Dnormal   = new Array(colMax);
      var Dtrain    = new Array(colMax);
      var distance  = new Array(colMax);
      var gobsD     = new Array(colMax);
      var gavg      = new Array(colMax);
      var gstd      = new Array(colMax);
      var tavg      = new Array(colMax);
      var tstd      = new Array(colMax);
      var Kavg       = new Array(nclusterMax);
      var Kcov       = new Array(nclusterMax);
      var Kcorr      = new Array(nclusterMax);
      for (j = 0; j < colMax; j++) {
        mdvar[j]        = new Array(rowMax);
        Dnormal[j]  = new Array(rowMax);
        Dtrain[j]   = new Array(rowMax);
        distance[j] = new Array(rowMax);
      }
      for (k = 0; k < nclusterMax; k++) {
        gdataValue[k] = svgStrU[136][langNum]+" "+(k+1).toString(); //Cluster
        Kavg[k]      = new Array(colMax);
        Kcov[k]      = new Array(colMax);
        Kcorr[k]     = new Array(colMax);
      }

      for (k = 0; k < nclusterMax; k++) {
        for (j = 0; j < colMax; j++) {
          Kcov[k][j] = new Array(colMax);
          Kcorr[k][j]= new Array(colMax);
        }
      }

      var tdvarName = new Array(colMax);
      var svarName  = new Array(colMax);
      var tdvarNameSub = ["X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>", "X<sub>6</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];

      // distance selection method
      var method29 = document.myForm29.type29;
      var idistance = method29.value; 
      method29[0].onclick = function() { idistance = method29.value; }  // Euclid^2
      method29[1].onclick = function() { idistance = method29.value; }  // Manhattan

      // number of clusters
      var method292 = document.myForm292.type292;
      var icluster = method292.value; 
      document.getElementById("scatterCluster").disabled = true; 
      document.getElementById("parallelGraph").disabled = true; 
      document.getElementById("clusterTable").disabled = true; 
      method292[0].onclick = function() { icluster = method292.value; }  // Find K
      method292[1].onclick = function() { icluster = method292.value; }  // Fixed K
     
      // data standardization
      d3.select("#istandard").on("click",function() {
          if(this.checked) istandard = 1
          else istandard = 0;
      })

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
            if (tdvarName[i] == "") tdvarName[i] = Xvarname[i];
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

          maxiter  = parseInt(document.getElementById("maxiter").value);
          epsi     = parseFloat(document.getElementById("epsi").value);
          for (i = 0; i < numVar; i++) svarName[i] = tdvarName[i];

          // Data standardization 
          if (istandard == 1) { // standardize data
            for (i = 0; i < numVar; i++) {
              tavg[i] = 0;
              for (j = 0; j < tobs; j++) tavg[i] += parseFloat(mdvar[i][j]);
              tavg[i] /= tobs;
            }
            for (i = 0; i < numVar; i++) {
              tstd[i] = 0;
              for (j = 0; j < tobs; j++) {
                temp = (parseFloat(mdvar[i][j]) - tavg[i]);
                tstd[i] += temp * temp;
              }
              tstd[i] = Math.sqrt(tstd[i] / (tobs-1));
            }
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < tobs; j++) {
                Dnormal[i][j] = (parseFloat(mdvar[i][j]) - tavg[i]) / tstd[i];
                Dtrain[i][j]  = Dnormal[i][j];
              }
            }
          }
          else { // no data standardization
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < tobs; j++) {
                Dnormal[i][j] = parseFloat(mdvar[i][j]);
                Dtrain[i][j]  = Dnormal[i][j];
              }
            }
          }

          if (icluster == 1) { // Observe ESS by K
            document.getElementById("scatterCluster").disabled = true; 
            document.getElementById("parallelGraph").disabled  = true; 
            document.getElementById("clusterTable").disabled   = true; 
            for (Kgroup = 2; Kgroup < nclusterMax; Kgroup++) {
              iter = kmeansCluster(numVar, tobs)
              kmeansProcessTable(iter);
              kmeansTable();
            }
            drawLineESS();
            kmeansESS();
          }
          else {
            Kgroup   = parseInt(document.getElementById("numK").value);
            document.getElementById("scatterCluster").disabled = false; 
            document.getElementById("parallelGraph").disabled  = false; 
            document.getElementById("clusterTable").disabled   = false; 
            iter = kmeansCluster(numVar, tobs)
            drawScatterMatrixByGroup(numVar, svarName, tobs, Kgroup, gdataValue, linearFunction);
            kmeansProcessTable(iter);
            kmeansTable();
          }
      })

      // scatter plot cluster
      d3.select("#scatterCluster").on("click", function() {
          if (tobs < 1) return;
          drawScatterMatrixByGroup(numVar, svarName, tobs, Kgroup, gdataValue, linearFunction);

      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          parallelGraphByGroup(numVar, svarName, tobs, Kgroup, gdataValue);
      })
      // cluster table
      d3.select("#clusterTable").on("click", function() {
          kmeansClusterTable(numVar, tobs);
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
