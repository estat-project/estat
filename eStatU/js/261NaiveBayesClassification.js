// Naive Bayes Classification
//
    var chart = d3.select("#chart"); 
    chart.selectAll("*").remove();

    var i, r, str0, str1, str2;
    var titleStr    = " - (Training Data)";
    var svgWidth    = 600;
    var svgHeight   = 600;
    var margin      = {top: 80, bottom: 80, left: 20, right: 140};
    var buffer      = 40;
    var graphWidth  = svgWidth - margin.left - margin.right;
    var graphHeight = svgHeight - margin.top - margin.bottom;
    var yobs, x1obs, x2obs, x3obs, x4obs, x5obs, tobs, dobs, testobs, numVar, nrow;
    var freqMaxDM, training, repeat, ngroup, tnumVar;
    var fontsize   = "1em";
    var rowMax     = 200;
    var colMax     = 6;
    var istandard  = 0;
    var icrossTable= 0;
    var rulenum    = 0;
    var xdata      = new Array(rowMax);
    var ydata      = new Array(rowMax);
    var yydata     = new Array(rowMax);
    var yydataN    = new Array(rowMax);
    var ytrain     = new Array(rowMax);
    var ytrainN    = new Array(rowMax); // numbered
    var ytrainH    = new Array(rowMax); // estimated
    var ytest      = new Array(rowMax);
    var ytestN     = new Array(rowMax); // numbered
    var ytestH     = new Array(rowMax); // estimated
    var yclassTrain      = new Array(rowMax); // estimated
    var yclassTest       = new Array(rowMax); // estimated
    var posteriorTrain   = new Array(rowMax);
    var posteriorTest    = new Array(rowMax);

    // Lift chart
    var yyposteriorTrain = new Array(rowMax);
    for (i = 0; i < rowMax; i++) {
      yyposteriorTrain[i] = new Array(3);
    }
    var responseTrain = new Array(rowMax);
    var numResponseCategory   = 10;
    for (i = 0; i < rowMax; i++) {
      responseTrain[i] = new Array(numResponseCategory);
    }  
    // Confusion table  
    var confusionTrain = new Array(rowMax);
    var numConfusionCategory  = 10;
    for (i = 0; i < rowMax; i++) {
      confusionTrain[i] = new Array(numResponseCategory);
    }
    // ROC chart
    var rocTrain = new Array(rowMax);
    var numRocCategory  = 10;
    for (i = 0; i < rowMax; i++) {
      rocTrain[i] = new Array(numRocCategory);
    }

    var gobsD     = new Array(rowMax); // group observation of training data
    var gobsH     = new Array(rowMax); // group observation of testing data
    var x1data    = new Array(rowMax);
    var x2data    = new Array(rowMax);
    var x3data    = new Array(rowMax);
    var x4data    = new Array(rowMax);
    var x5data    = new Array(rowMax);
    var D         = new Array(colMax);
    var Dtrain    = new Array(colMax);
    var Dtest     = new Array(colMax);
    var tdvarName    = new Array(colMax);
    var mdobs        = new Array(colMax); // missing data 제거후 obs
    var mdvalueNum   = new Array(colMax);
    var mdvar        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var mdvalue      = new Array(colMax); // 2차원 배열로 아래에 정의
    var mdvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
    var mdvalueFreq  = new Array(colMax); // 2차원 배열로 아래에 정의
    var X            = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
    for (j = 0; j < colMax; j++) {
       D[j]            = new Array(rowMax);
       Dtrain[j]       = new Array(rowMax);
       Dtest[j]        = new Array(rowMax);
       mdvar[j]        = new Array(rowMax); //***** mdvar[j][i], j=0,colMax, i=0,rowMax 2차원 배열로 tdvar에서 missing 제거한 배열 
       mdvalue[j]      = new Array(rowMax);
       mdvalueLabel[j] = new Array(rowMax);
       mdvalueFreq[j]  = new Array(rowMax);
    };

    var dataA       = new Array(rowMax);
    var dataValue   = new Array(rowMax);
    var gdataValue  = new Array(rowMax);
    var dvalueFreq  = new Array(rowMax);
    var groupFreq   = new Array(rowMax); 
    var ngroupMax   = 10;
    var prior       = new Array(ngroupMax);
    var dim2Freq    = new Array(ngroupMax);
    var likelihood  = new Array(colMax); // 3차원 likelihood prob numvar*ngropMax*ngroupMax
    var classTrain  = new Array(ngroupMax+1);
    var classTest   = new Array(ngroupMax+1);
    var posterior   = new Array(rowMax);
    var posteriorPrintTrain   = new Array(rowMax);
    var posteriorPrintTest    = new Array(rowMax);
    for (k = 0; k < ngroupMax; k++) {
      classTrain[k] = new Array(ngroupMax+1);
      classTest[k]  = new Array(ngroupMax+1);
      dim2Freq[k]   = new Array(ngroupMax);
    }
    for (j = 0; j < colMax; j++) {
      likelihood[j] = new Array(ngroupMax+1);
      for (k = 0; k < ngroupMax+1; k++) likelihood[j][k] = new Array(ngroupMax+1);
    }
    for (i = 0; i < rowMax; i++) {
      posterior[i] = new Array(ngroupMax)
      posteriorPrintTrain[i] = new Array(ngroupMax)
      posteriorPrintTest[i]  = new Array(ngroupMax)
    }

    document.getElementById("testing261").disabled = true;   
    // prior prob selection method
    var method = document.myForm261.type261;
    var methodType = method.value; 
    method[0].onclick = function() { methodType = method.value; }  // sample prop
    method[1].onclick = function() { methodType = method.value; }  // equal prop

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simpledata("#data1");  
        yydata = data;  
        yobs = stat.n;
      });
      d3.select("#data2").on("input", function() {
        stat = simpledata("#data2");  
        x1data = data; 
        x1obs = stat.n;
      });
      d3.select("#data3").on("input", function() {
        stat = simpledata("#data3");  
        x2data = data; 
        x2obs = stat.n;
      });
      d3.select("#data4").on("input", function() {
        stat = simpledata("#data4");  
        x3data = data; 
        x3obs = stat.n;
      });
      d3.select("#data5").on("input", function() {
        stat = simpledata("#data5");  
        x4data = data; 
        x4obs = stat.n;
      });
      d3.select("#data6").on("input", function() {
        stat = simpledata("#data6");  
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

      d3.select("#executeDT").on("click", function(){  
          chart.selectAll("*").remove();  // 전화면 제거
          // variable name
          tdvarName[0] = document.getElementById("name1").value;
          tdvarName[1] = document.getElementById("name2").value;
          tdvarName[2] = document.getElementById("name3").value;
          tdvarName[3] = document.getElementById("name4").value;
          tdvarName[4] = document.getElementById("name5").value;
          tdvarName[5] = document.getElementById("name6").value;
          for (i = 0; i < colMax; i++) {
            if (tdvarName[i] == "") tdvarName[i] = X[i];
          } 
          training = parseFloat(document.getElementById("training261").value) / 100;
          // prior prob selection method
          methodType = parseInt(method.value); 

          // 입력행이 같은지 체크
          if (yobs == 0 || x1obs == 0 ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text("No input data").style("stroke","red").style("font-size","1em");
            return;
          }
          // y var statistics
          for (j = 0; j < yobs; j++) {
            dataA[j] = yydata[j];
            mdvar[0][j] = yydata[j];
          }
          mdvalueNum[0] = datavalueDM(yobs, dataA, dataValue, dvalueFreq);
          ngroup = mdvalueNum[0];
          for (k = 0; k < mdvalueNum[0]; k++) {
            gdataValue[k]     = dataValue[k];
            mdvalue[0][k]     = dataValue[k];
            mdvalueFreq[0][k] = dvalueFreq[k];
          }
          for (j = 0; j < yobs; j++) { // give number to yydata
            for (k = 0; k < ngroup; k++) {
              if (yydata[j] == mdvalue[0][k]) {
                yydataN[j] = k;
                break;
              }
            }
          }
          numVar = 1; 

          // x1 var statistics
          for (j = 0; j < yobs; j++) {
            dataA[j] = x1data[j];
            mdvar[1][j] = x1data[j];
          }
          mdvalueNum[1] = datavalueDM(yobs, dataA, dataValue, dvalueFreq)
          for (j = 0; j < mdvalueNum[1]; j++) {
            mdvalue[1][j]     = dataValue[j];
            mdvalueFreq[1][j] = dvalueFreq[j];
          }
          numVar = 2;

          // x2 var statistics          
          if (x2obs > 0) {
            if (yobs != x2obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            for (j = 0; j < yobs; j++) {
              dataA[j] = x2data[j];
              mdvar[2][j] = x2data[j];
            }
            mdvalueNum[2] = datavalueDM(yobs, dataA, dataValue, dvalueFreq)
            for (j = 0; j < mdvalueNum[2]; j++) {
              mdvalue[2][j]     = dataValue[j];
              mdvalueFreq[2][j] = dvalueFreq[j];
            }
            numVar = 3;
          }
          // x3 var statistics
          if (x3obs > 0) {
            if (yobs != x3obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            for (j = 0; j < yobs; j++) {
              dataA[j] = x3data[j];
              mdvar[3][j] = x3data[j];
            }
            mdvalueNum[3] = datavalueDM(yobs, dataA, dataValue, dvalueFreq)
            for (j = 0; j < mdvalueNum[3]; j++) {
              mdvalue[3][j]     = dataValue[j];
              mdvalueFreq[3][j] = dvalueFreq[j];
            }
            numVar = 4;
          }
          // x4 var statistics
          if (x4obs > 0) {
            if (yobs != x4obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            for (j = 0; j < yobs; j++) {
              dataA[j] = x4data[j];
              mdvar[4][j] = x4data[j];
            }
            mdvalueNum[4] = datavalueDM(yobs, dataA, dataValue, dvalueFreq)
            for (j = 0; j < mdvalueNum[4]; j++) {
              mdvalue[4][j]     = dataValue[j];
              mdvalueFreq[4][j] = dvalueFreq[j];
            }
            numVar = 5;
          }
          // x5 var statistics
          if (x5obs > 0) {
            if (yobs != x5obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            for (j = 0; j < yobs; j++) {
              dataA[j] = x5data[j];
              mdvar[5][j] = x5data[j];
            }
            mdvalueNum[5] = datavalueDM(yobs, dataA, dataValue, dvalueFreq)
            for (j = 0; j < mdvalueNum[5]; j++) {
              mdvalue[5][j]     = dataValue[j];
              mdvalueFreq[5][j] = dvalueFreq[j];
            }
            numVar = 6;
          }

          // training %
          training = document.getElementById("training261").value / 100;
//          repeat   = document.getElementById("repeat").value;
         
          // Data partician
          dataPartitionDT();
          tnumVar = numVar;
          // prior probability
          for (k = 0; k < ngroup; k++) {
            if (methodType == 1) prior[k] = gobsD[k] / tobs;  // tobs; training obs
            else prior[k] = 1 / ngroup;
          }
          // draw barchart matrix
          drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
          naiveBayesClassification();
          printClassification();
      })

      // lift chart
      d3.select("#liftChart261").on("click", function() {
          if (tobs < 1) return;
          liftChart(tobs, testobs); 
          liftTable();
          drawLiftChart();
      })

      // confusion matrix
      d3.select("#confusion261").on("click", function() {
          if (tobs < 1) return;
          confusion(tobs, testobs); 
          confusionTable();
          drawConfusion();
      })

      // ROC chart
      d3.select("#roc261").on("click", function() {
          if (tobs < 1) return;
          roc(tobs, testobs); 
          rocTable();
          drawROC();
      })

      // classificationr table
      d3.select("#classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableNaiveBayes(numVar, tobs, testobs); 
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

