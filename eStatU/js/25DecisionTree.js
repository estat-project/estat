// Decision Tree
    var chart = d3.select("#chart"); 
    chart.selectAll("*").remove();

    var i, r, str0, str1, str2;
    var titleStr    = " - (Training Data)";
    var svgWidth    = 600;
    var svgHeight   = 600;
    var margin      = {top: 80, bottom: 80, left: 80, right: 80};
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
    var maxlevel   = 9; 
    var mindata    = 5;
    var rulenum    = 0;
    var xdata     = new Array(rowMax);
    var ydata     = new Array(rowMax);
    var yydata    = new Array(rowMax);
    var yydataN   = new Array(rowMax);
    var ytrain    = new Array(rowMax);
    var ytrainN   = new Array(rowMax); // numbered
    var ytrainH   = new Array(rowMax); // estimated
    var ytest     = new Array(rowMax);
    var ytestN    = new Array(rowMax); // numbered
    var ytestH    = new Array(rowMax); // estimated
    var yclassTrain = new Array(rowMax); // estimated
    var yclassTest  = new Array(rowMax); // estimated
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
    var workD        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work2        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work3        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work4        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work5        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work6        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work7        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work8        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var work9        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    var mdvalue      = new Array(colMax); // 2차원 배열로 아래에 정의
    var mdvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
    var mdvalueFreq  = new Array(colMax); // 2차원 배열로 아래에 정의
    var dim2Freq     = new Array(colMax);
    var entropy      = new Array(colMax);
    var jjold        = new Array(colMax);
    var gobsD        = new Array(colMax);
    var gobsH        = new Array(colMax);
    var X            = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
    for (j = 0; j < colMax; j++) {
       D[j]            = new Array(rowMax);
       Dtrain[j]       = new Array(rowMax);
       Dtest[j]        = new Array(rowMax);
       mdvar[j]        = new Array(rowMax); //***** mdvar[j][i], j=0,colMax, i=0,rowMax 2차원 배열로 tdvar에서 missing 제거한 배열 
       workD[j]        = new Array(rowMax);
       work2[j]        = new Array(rowMax);
       work3[j]        = new Array(rowMax);
       work4[j]        = new Array(rowMax);
       work5[j]        = new Array(rowMax);
       work6[j]        = new Array(rowMax);
       work7[j]        = new Array(rowMax);
       work8[j]        = new Array(rowMax);
       work9[j]        = new Array(rowMax);
       mdvalue[j]      = new Array(rowMax);
       mdvalueLabel[j] = new Array(rowMax);
       mdvalueFreq[j]  = new Array(rowMax);
       dim2Freq[j]     = new Array(colMax);
    };

    var dataA       = new Array(rowMax);
    var dataValue   = new Array(rowMax);
    var gdataValue  = new Array(rowMax);
    var dvalueFreq  = new Array(rowMax);
    var groupFreq   = new Array(rowMax); 
    var tree        = new Array(rowMax);
    var tidx        = new Array(rowMax);
    var coeff       = new Array(rowMax);
    for (j = 0; j < rowMax; j++) {
      tree[j]  = new Array(2*maxlevel);
      tidx[j]  = new Array(2*maxlevel);
      coeff[j] = new Array(2*maxlevel);
    }
    for (j = 0; j < rowMax; j++) {
      for (k = 0; k < 2*maxlevel; k++) tidx[j][k] = 0;
    }
    var ngroupMax  = 9;
    var classTrain= new Array(ngroupMax+1);
    var classTest = new Array(ngroupMax+1);

    for (k = 0; k < ngroupMax; k++) {
      classTrain[k] = new Array(ngroupMax+1);
      classTest[k]  = new Array(ngroupMax+1);
    }
/*
    var workD4      = new Array(colMax); //***** 4차원 배열로 tdvar에서 missing 제거한 배열 
    for (i = 0; i < colMax; i++) { 
      workD4[i] = new Array(colMax); 
      for (j = 0; j < colMax; j++) {
        workD4[i][j] = new Array(ngroupMax); 
        for (k = 0; k < ngroupMax; k++) workD4[i][j][k] = new Array(ngroupMax);
      }
    }
*/
    document.getElementById("testing25").disabled = true;   

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

      // Variable selection method
        var method25 = document.myForm25.type25;
        methodType25 = method25.value; 
        method25[0].onclick = function() { methodType25 = method25.value; }  // Entropy
        method25[1].onclick = function() { methodType25 = method25.value; }  // Gini
        method25[2].onclick = function() { methodType25 = method25.value; }  // Classification error
        method25[3].onclick = function() { methodType25 = method25.value; }  // Chi-square

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

          // training %, max depth and min data of branch
          maxlevel = parseInt(document.getElementById("maxlevel").value);
          mindata  = parseInt(document.getElementById("mindata").value);
          training = document.getElementById("training25").value / 100;
//          repeat   = document.getElementById("repeat").value;
         
          // Data partician
          dataPartitionDT();
          tnumVar = numVar;

          // draw barchart matrix
          drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
          decisionTree(numVar, tobs);
          decisionTreeTable();
      })

      // decision rule
      d3.select("#decisionRule").on("click", function() {
          decisionRule();
          classificationDT(ngroup, rulenum);
      })

      // classificationr table
      d3.select("#classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableDT(numVar, tobs, testobs); 
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


