// KNN Classification
      var chart     = d3.select("#chart"); 
      var titleStr    = " - (Total data)";
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, kk, str1, str2, temp, tindex;
      var yobs, x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, testobs, numVar;
      var ngroup, training, repeat, numK;
      var ngroupMax  = 9;
      var fontsize  = "1em";
      var rowMax    = 200;
      var colMax    = 6;
      var istandard = 0;
      var iprior    = 0;      // 1: for Bayes classification
      var linearFunction = 0; // 1: for Bayes classification when numVar = 2
      var maxnumK24 = 20;
      var accuracy24    = new Array(maxnumK24);
      var sensitivity24 = new Array(maxnumK24);
      var specificity24 = new Array(maxnumK24);
      var xdata     = new Array(rowMax);
      var ydata     = new Array(rowMax);
      var yydata    = new Array(rowMax);
      var yydataN   = new Array(rowMax);
      var ytrain    = new Array(rowMax);
      var ytest     = new Array(rowMax);
      var ytrainN   = new Array(rowMax);
      var ytestN    = new Array(rowMax);
      var x1data    = new Array(rowMax);
      var x2data    = new Array(rowMax);
      var x3data    = new Array(rowMax);
      var x4data    = new Array(rowMax);
      var x5data    = new Array(rowMax);
      var D         = new Array(colMax);
      var Dnormal   = new Array(colMax);
      var DDtrain   = new Array(colMax);
      var DDtest    = new Array(colMax);
      var Dtrain    = new Array(colMax);
      var Dtest     = new Array(colMax);
      var tavg      = new Array(colMax);
      var tstd      = new Array(colMax);
      var gobsD     = new Array(colMax);
      var gavg      = new Array(colMax);
      var gstd      = new Array(colMax);
      var gcov      = new Array(colMax);
      var gcorr     = new Array(colMax);
      var ginv      = new Array(colMax);
      var Davg      = new Array(ngroupMax);
      var Dcov      = new Array(ngroupMax);
      var Dcorr     = new Array(ngroupMax);
      var coeff     = new Array(ngroupMax);
      var classValue= new Array(ngroupMax);
      var prior     = new Array(ngroupMax);
      var classTrain= new Array(ngroupMax+1);
      var classTest = new Array(ngroupMax+1);
      for (j = 0; j < colMax; j++) {
        D[j]        = new Array(rowMax);
        Dnormal[j]  = new Array(rowMax);
        DDtrain[j]  = new Array(rowMax);
        DDtest[j]   = new Array(rowMax);
        Dtrain[j]   = new Array(rowMax);
        Dtest[j]    = new Array(rowMax);
        gcov[j]     = new Array(colMax);
        gcorr[j]    = new Array(colMax);
        ginv[j]     = new Array(colMax);
      }
      for (k = 0; k < ngroupMax; k++) {
        Davg[k]     = new Array(colMax);
        Dcov[k]     = new Array(colMax);
        Dcorr[k]    = new Array(colMax);
        coeff[k]    = new Array(ngroupMax);
        classValue[k] = new Array(ngroupMax);
      }

      for (k = 0; k < ngroupMax; k++) {
        classTrain[k] = new Array(ngroupMax+1);
        classTest[k]  = new Array(ngroupMax+1);
        for (j = 0; j < colMax; j++) {
          Dcov[k][j] = new Array(colMax);
          Dcorr[k][j]= new Array(colMax);
        }
      }
      for (k = 0; k < ngroupMax; k++) 
        for (j = 0; j < ngroupMax; j++) coeff[k][j] = new Array(colMax+1); 

      var tdvarName    = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085"];
      var tdvarNameSub = ["Y", "X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
      var svarName     = new Array(colMax);
      var dataA        = new Array(rowMax);
      var dataValue    = new Array(rowMax);
      var dvalueFreq   = new Array(rowMax);
      var gdataValue   = new Array(rowMax);
      var yclass       = new Array(rowMax);
      var yclassTrain  = new Array(rowMax);
      var yclassTest   = new Array(rowMax);

      // nearest K selection method
      var method240 = document.myForm240.type240;
      var methodType240 = method240.value; 
      document.getElementById("numK").disabled       = true;
      document.getElementById("training24").disabled = true;
      document.getElementById("testing24").disabled  = true;
      document.getElementById("classificationTable").disabled  = true;
      method240[0].onclick = function() { // Search K
        methodType240 = method240.value; 
        document.getElementById("numK").disabled       = true;
        document.getElementById("training24").disabled = true;
        document.getElementById("testing24").disabled  = true;
        document.getElementById("classificationTable").disabled  = true;
      }  
      method240[1].onclick = function() { // Fixed K
        methodType240 = method240.value; 
        document.getElementById("numK").disabled       = false;
        document.getElementById("training24").disabled = false;
        document.getElementById("testing24").disabled  = false;
        document.getElementById("classificationTable").disabled  = false;
      }  

      // distance selection method
      var method24 = document.myForm24.type24;
      var methodType24 = method24.value; 
      method24[0].onclick = function() { methodType24 = method24.value; }  // Euclid^2
      method24[1].onclick = function() { methodType24 = method24.value; }  // Manhattan
//          repeat   = document.getElementById("repeat").value;


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
          if (document.getElementById("istandard").checked == true) istandard = 1
          else istandard = 0

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

          // 입력행이 같은지 체크
          if (yobs == 0 || x1obs == 0 ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text("No input data").style("stroke","red").style("font-size","1em");
            return;
          }
          // 입력 데이터에 숫자 문자 빈칸 있나 체크
          for (j = 0; j < yobs; j++) {
            if ( isNaN(x1data[j]) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          // y var statistics
          for (j = 0; j < yobs; j++) {
            dataA[j] = yydata[j];
          }
          ngroup = datavalueDM(yobs, dataA, dataValue, dvalueFreq);
          for (j = 0; j < ngroup; j++) {
            gdataValue[j] = dataValue[j];
          }
          for (i = 0; i < yobs; i++) {
            for (j = 0; j < ngroup; j++) {
              if( yydata[i] == dataValue[j] ) {yydataN[i] = j; break;}
            }
          }
          numVar = 1; // num of indep var
          for (j = 0; j < yobs; j++) D[0][j] = x1data[j];
          if (x2obs > 0) {
            if (yobs != x2obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < yobs; j++) {
              if ( isNaN(x2data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 2;
            for (j = 0; j < yobs; j++) D[1][j] = x2data[j];
          }
          if (x3obs > 0) {
            if (yobs != x3obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < yobs; j++) {
              if ( isNaN(x3data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 3;
            for (j = 0; j < yobs; j++) D[2][j] = x3data[j];
          }
          if (x4obs > 0) {
            if (yobs != x4obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < yobs; j++) {
              if ( isNaN(x4data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 4;
            for (j = 0; j < yobs; j++) D[3][j] = x4data[j];
          }
          if (x5obs > 0) {
            if (yobs != x5obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < yobs; j++) {
              if ( isNaN(x5data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 300).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 5;
            for (j = 0; j < yobs; j++) D[4][j] = x5data[j];
          }

          for (i = 0; i < numVar; i++) svarName[i] = tdvarName[i+1];
          // Data standardization 
          if (istandard == 1) {
            for (i = 0; i < numVar; i++) {
              tavg[i] = 0;
              for (j = 0; j < yobs; j++) tavg[i] += parseFloat(D[i][j]);
              tavg[i] /= yobs;
            }
            for (i = 0; i < numVar; i++) {
              tstd[i] = 0;
              for (j = 0; j < yobs; j++) {
                temp = (parseFloat(D[i][j]) - tavg[i]);
                tstd[i] += temp * temp;
              }
              tstd[i] = Math.sqrt(tstd[i] / (yobs-1));
            }
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < yobs; j++) Dnormal[i][j] = (parseFloat(D[i][j]) - tavg[i]) / tstd[i];
            }
          }
          else {
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < yobs; j++) Dnormal[i][j] = parseFloat(D[i][j]);
            }
          }

        if (methodType240 == 1) { // search K
            training = 1; // use 100% training
            tobs = yobs;
            testobs = yobs;
            for (j = 0; j < yobs; j++) {
              ytrain[j]  = yydata[j];
              ytrainN[j] = yydataN[j];
              ytestN[j]  = yydataN[j];
              gobsD[yydataN[j]]++;
              for (i = 0; i < numVar; i++) {
                Dtrain[i][j]  = Dnormal[i][j];
                Dtest[i][j]   = Dnormal[i][j];
                DDtrain[i][j] = D[i][j]; // original data
                DDtest[i][j]  = D[i][j]; // original data
              }
            }
            tnumVar = numVar;
            maxnumK24 = Math.ceil(tobs/2) + 1;
            if (maxnumK24 > 20) maxnumK24 = 20; 
            for (k = 0; k < maxnumK24; k++) { 
              numK = k + 1;
              kNN(tnumVar, tobs, testobs, ngroup);
              accuracy24[k] = 0;
              for (i = 0; i < ngroup; i++) {
                accuracy24[k] += classTest[i][i];
              }
              accuracy24[k] /= classTest[ngroup][ngroup]
              if (ngroup == 2) {
                sensitivity24[k] = classTest[0][0] / classTest[0][ngroup]
                specificity24[k] = classTest[1][1] / classTest[1][ngroup]
              }
//console.log("K="+numK+" "+f3(accuracy24[k])+" "+f3(sensitivity24[k])+" "+f3(specificity24[k]))
//              for (i=0; i<=ngroup; i++) {
//                console.log(classTest[i][0]+" "+classTest[i][1]+" "+classTest[i][2])
//              }

            }
            drawKmeanSearch();
            printAccuracyKNN();
        }
        else { // fixed K
          training = parseFloat(document.getElementById("training24").value) / 100;
          numK = document.getElementById("numK").value
          // Data partition
          for (k = 0; k < ngroup; k++) gobsD[k] = 0;
          if (training == 1) { // 100% training
            tobs = yobs;
            testobs = yobs;
            for (j = 0; j < yobs; j++) {
              ytrain[j]  = yydata[j];
              ytrainN[j] = yydataN[j];
              ytestN[j]  = yydataN[j];
              gobsD[yydataN[j]]++;
              for (i = 0; i < numVar; i++) {
                Dtrain[i][j]  = Dnormal[i][j];
                Dtest[i][j]   = Dnormal[i][j];
                DDtrain[i][j] = D[i][j]; // original data
                DDtest[i][j]  = D[i][j]; // original data
              }
//console.log("j="+(j+1).toString()+" "+D[0][j]+" "+D[1][j]+" "+f3(Dtrain[0][j])+" "+f3(Dtrain[1][j])+" "+f3(Dtest[0][j])+" "+f3(Dtest[1][j]))
            }
          }
          else { // data partitian - training : testing
            tobs = 0;
            testobs = 0;
            for (j = 0; j < yobs; j++) {
              if (Math.random() < training) {
                ytrain[tobs]    = yydata[j];
                ytrainN[tobs] = yydataN[j];
                for (i = 0; i < numVar; i++) {
                  Dtrain[i][tobs]  = Dnormal[i][j];
                  DDtrain[i][tobs] = D[i][j];
                }
                tobs++
                gobsD[yydataN[j]]++;
              }
              else {
                ytest[testobs] = yydata[j];
                ytestN[testobs] = yydataN[j];
                for (i = 0; i < numVar; i++) {
                  Dtest[i][testobs]  = Dnormal[i][j] 
                  DDtest[i][testobs] = D[i][j] 
                }
                testobs++
              }
            }    
          }
          tnumVar = numVar;
          statMultivariateDM(ngroup, tnumVar, tobs);
          kNN(tnumVar, tobs, testobs, ngroup);
          titleStr    = " - (Training Data)";
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
          printMultivariate(iprior);
          printClassification();
        }
      })

      // scatter plot cluster
      d3.select("#scatterPlot").on("click", function() {
          if (tobs < 1) return;
          titleStr    = " - (Training Data)";
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          titleStr    = " - (Training Data)";
          parallelGraphByGroup(numVar, svarName, tobs, ngroup, gdataValue);
      })
      // classificationr table
      d3.select("#classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableKNN(numVar, tobs, testobs); 
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
