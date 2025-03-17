// 28HierarchicalClsuster clustering
      var chart       = d3.select("#chart"); 
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, str1, str2, temp;
      var x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, numVar;
      var dmax, maxiter;
      var fontsize  = "1em";
      var rowMax    = 100;
      var colMax    = 6;
      var ngroup  = 1;
      var linearFunction = 0;
      var xdata   = new Array(rowMax);
      var ydata   = new Array(rowMax);
      var x1data  = new Array(rowMax);
      var x2data  = new Array(rowMax);
      var x3data  = new Array(rowMax);
      var x4data  = new Array(rowMax);
      var x5data  = new Array(rowMax);
      var x6data  = new Array(rowMax);

      var mindist = new Array(rowMax);
      var windex  = new Array(rowMax);
      var yindex  = new Array(rowMax);

      var px1 = new Array(rowMax);
      var px2 = new Array(rowMax);
      var py1 = new Array(rowMax);
      var py2 = new Array(rowMax); 
      var rx1 = new Array(rowMax);
      var rx2 = new Array(rowMax);
      var ry1 = new Array(rowMax);
      var ry2 = new Array(rowMax); 
      var qx1 = new Array(rowMax);
      var qx2 = new Array(rowMax);
      var qy1 = new Array(rowMax);
      var qy2 = new Array(rowMax); 
      for (j = 0; j < rowMax; j++) {
        qx1[j] = new Array(rowMax); 
        qx2[j] = new Array(rowMax); 
        qy1[j] = new Array(rowMax); 
        qy2[j] = new Array(rowMax); 
      }

      var distorgi  = new Array(rowMax);  // rowMax * rowMax distance 
      var distance  = new Array(rowMax);  // rowMax * rowMax distance 
      var workdist  = new Array(rowMax);  // rowMax * rowMax distance 
      for (i = 0; i < rowMax; i++) {
        distorgi[i] = new Array(rowMax);
        distance[i] = new Array(rowMax);
        workdist[i] = new Array(rowMax);
      }
      var tavg      = new Array(colMax);
      var tstd      = new Array(colMax);
      var mdvar         = new Array(colMax);
      var Dtrain    = new Array(colMax);
      var Dnormal   = new Array(colMax);
      var Dwork     = new Array(colMax);
      for (j = 0; j < colMax; j++) {
        mdvar[j]        = new Array(rowMax);
        Dtrain[j]   = new Array(rowMax);
        Dnormal[j]  = new Array(rowMax);
        Dwork[j]    = new Array(rowMax);
      }
      var tdvarName    = new Array(colMax);
      var svarName     = new Array(colMax);
      var wvarName     = new Array(colMax);
      var tdvarNameSub = ["X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>", "X<sub>6</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
//      var obsName      = ["A","B","C","D","E"];
      var obsName      = new Array(rowMax);  
      var gdataValue   = new Array(rowMax)

      // distance selection method
      var method28 = document.myForm280.type280;
      var idistance = method28.value; 
      method28[0].onclick = function() { idistance = method28.value; }  // Euclid^2
      method28[1].onclick = function() { idistance = method28.value; }  // Manhattan

      // data standardization
      d3.select("#istandard").on("click",function() {
          if(this.checked) istandard = 1
          else istandard = 0;
      })

      // linkage selection 
      var linkage = document.myForm281.type281;
      var ilinkage = linkage.value; 
      linkage[0].onclick = function() { ilinkage = linkage.value; }  // single
      linkage[1].onclick = function() { ilinkage = linkage.value; }  // complete
      linkage[2].onclick = function() { ilinkage = linkage.value; }  // average
      linkage[3].onclick = function() { ilinkage = linkage.value; }  // centroid
      linkage[4].onclick = function() { ilinkage = linkage.value; }  // ward

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
          if (tobs > 50) { // max obs is 50
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text("max number of observation is 100").style("stroke","red").style("font-size","1em");
              return;
          }
          // 입력행이 같은지 체크
          if (tobs != x2obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
          }
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
                Dwork[i][j]   = Dtrain[i][j];      
              }
            }
          }
          else { // no data standardization
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < tobs; j++) {
                Dnormal[i][j] = parseFloat(mdvar[i][j]);
                Dtrain[i][j]  = Dnormal[i][j];
                Dwork[i][j]   = Dtrain[i][j];
              }
            }
          }

          for (i = 0; i < tobs; i++) {
            obsName[i]  = "("+(i+1).toString()+")";
            svarName[i] = obsName[i];
          }
          dmax = hierarchyCluster(numVar, tobs)
          hierarchyClusterGraph(tobs, svarName, dmax);
      })

      // hierarchy graph
      d3.select("#hierarchyGraph").on("click", function() {
          if (tobs < 1) return;
          if (tobs > 20 && tobs <=30) {
            svgHeight = 30 * tobs; // 30px for each observation
            str1 = (svgHeight).toString();
            document.getElementById("chart").setAttribute("height", str1);
          }
          hierarchyClusterGraph(tobs, svarName, dmax);
      })
      // scatter plot cluster
      d3.select("#scatterCluster").on("click", function() {
          if (tobs < 1) return;
          svgHeight = 30 * tobs; // 30px for each observation
          str1 = (svgHeight).toString();
          document.getElementById("chart").setAttribute("height", str1);
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          svgHeight = 30 * tobs; // 30px for each observation
          str1 = (svgHeight).toString();
          document.getElementById("chart").setAttribute("height", str1);
          parallelGraphByGroup(numVar, svarName, tobs, ngroup, gdataValue);
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


