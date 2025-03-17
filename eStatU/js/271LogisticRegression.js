// Logistic Regression
      var chart       = d3.select("#chart"); 
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, kk, str1, str2, temp, tindex;
      var yobs, x1obs, x2obs, x3obs, x4obs, x5obs, x6obs, tobs, sobs, numVar;
      var numgroup, training, repeat;
      var maxgroup  = 9;
      var fontsize  = "1em";
      var rowmax    = 200;
      var colmax    = 6;
      var linearFunction = 0;
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var yydata    = new Array(rowmax);
      var ytrain    = new Array(rowmax);
      var ytest     = new Array(rowmax);
      var yhat      = new Array(rowmax);
      var yhatTrain = new Array(rowmax);
      var yhatTest  = new Array(rowmax);
      var x1data    = new Array(rowmax);
      var x2data    = new Array(rowmax);
      var x3data    = new Array(rowmax);
      var x4data    = new Array(rowmax);
      var x5data    = new Array(rowmax);
      var D         = new Array(colmax);
      var Dtrain    = new Array(colmax);
      var Dtest     = new Array(colmax);
      var gobs      = new Array(colmax);
      var gavg      = new Array(colmax);
      var gstd      = new Array(colmax);
      var gcov      = new Array(colmax);
      var ginv      = new Array(colmax);
      var avg       = new Array(maxgroup);
      var cov       = new Array(maxgroup);
      var corr      = new Array(maxgroup);
      var coeff     = new Array(maxgroup);
      var classValue= new Array(maxgroup);
      var prior     = new Array(maxgroup);
      var classTrain= new Array(maxgroup+1);
      var classTest = new Array(maxgroup+1);
      for (j = 0; j < colmax; j++) {
        D[j]        = new Array(rowmax);
        Dtrain[j]   = new Array(rowmax);
        Dtest[j]    = new Array(rowmax);
        gcov[j]     = new Array(colmax);
        ginv[j]     = new Array(colmax);
      }
      for (k = 0; k < maxgroup; k++) {
        avg[k]      = new Array(colmax);
        cov[k]      = new Array(colmax);
        corr[k]     = new Array(colmax);
        coeff[k]    = new Array(maxgroup);
        classValue[k] = new Array(maxgroup);
      }

      for (k = 0; k < maxgroup; k++) {
        classTrain[k] = new Array(maxgroup+1);
        classTest[k]  = new Array(maxgroup+1);
        for (j = 0; j < colmax; j++) {
          cov[k][j] = new Array(colmax);
          corr[k][j]= new Array(colmax);
        }
      }
      for (k = 0; k < maxgroup; k++) 
        for (j = 0; j < maxgroup; j++) coeff[k][j] = new Array(colmax+1); 

      var tdvarName    = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085"];
      var tdvarNameSub = ["Y", "X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];
      var svarName     = new Array(colmax);
      var dataA        = new Array(rowmax);
      var dataValue    = new Array(rowmax);
      var dvalueFreq   = new Array(rowmax);
      var gdataValue   = new Array(rowmax);
      var yclass       = new Array(rowmax);
      var yclassTrain  = new Array(rowmax);
      var yclassTest   = new Array(rowmax);

// basic data input function ============================================
simpledata = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
//	         .map(parseFloat);                      // [8.0, 8.0, 9.0]
        n = data.length;
        return {'n' : n};
}

// Sorting in ascend depending on data, and count each value frequency
function datavalue(dobs, dataA, dataValue, dvalueFreq) {
    var i, j, temp;
    var nvalue = 0;
    // sorting
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (dataA[i] > dataA[j]) {
                temp = dataA[i];
                dataA[i] = dataA[j];
                dataA[j] = temp;
            }
        }
    }
    for (i = 0; i < dobs; i++) {
        dvalueFreq[i] = 0;
    }
    dataValue[nvalue] = dataA[0];
    dvalueFreq[nvalue] = 1;
    for (i = 1; i < dobs; i++) {
        if (dataA[i] == dataA[i - 1]) {
            dvalueFreq[nvalue]++;
        } else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
        }
    }
    nvalue++;
    return nvalue;
}
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
          training = document.getElementById("training").value / 100;
          // prior prob selection method
          var method = document.myForm0.type0;
          var methodType = method.value; 
          method[0].onclick = function() { methodType = method.value; }  // sample prop
          method[1].onclick = function() { methodType = method.value; }  // equal prop
//          repeat   = document.getElementById("repeat").value;
          // variable name
          tdvarName[0] = document.getElementById("name1").value;
          tdvarName[1] = document.getElementById("name2").value;
          tdvarName[2] = document.getElementById("name3").value;
          tdvarName[3] = document.getElementById("name4").value;
          tdvarName[4] = document.getElementById("name5").value;
          tdvarName[5] = document.getElementById("name6").value;
          for (i = 0; i < colmax; i++) {
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
          numgroup = datavalue(yobs, dataA, dataValue, dvalueFreq);
          for (j = 0; j < numgroup; j++) {
//            gobs[j] = dvalueFreq[j];
            gdataValue[j] = dataValue[j];
          }
          for (i = 0; i < yobs; i++) {
            for (j = 0; j < numgroup; j++) {
              if( yydata[i] == dataValue[j] ) yhat[i] = j;
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
          // Data partician
          for (k = 0; k < numgroup; k++) gobs[k] = 0;
          if (training == 1) { // 100% training
            tobs = yobs;
            sobs = yobs;
            for (j = 0; j < yobs; j++) {
              ytrain[j]    = yydata[j];
              yhatTrain[j] = yhat[j];
              yhatTest[j]  = yhat[j];
              gobs[yhat[j]]++;
              for (i = 0; i < numVar; i++) Dtrain[i][j] = D[i][j];
            }
          }
          else { // data partician - training : testing
            tobs = 0;
            sobs = 0;
            for (j = 0; j < yobs; j++) {
              if (Math.random() < training) {
                ytrain[tobs]    = yydata[j];
                yhatTrain[tobs] = yhat[j];
                for (i = 0; i < numVar; i++) Dtrain[i][tobs] = D[i][j] 
                tobs++
                gobs[yhat[j]]++;
              }
              else {
                ytest[sobs] = yydata[j];
                yhatTest[sobs] = yhat[j];
                for (i = 0; i < numVar; i++) Dtest[i][sobs] = D[i][j] 
                sobs++
              }
            }
            for (i = 0; i < numVar; i++)
              for (j = 0; j < tobs; j++) D[i][j] = Dtrain[i][j]      
          }
          // if gobs[] < 2, cannot calculte covariance matrix
          for (k = 0; k < numgroup; k++) {
            if (gobs[k] < 2) {
                chart.append("text").attr("x", 50).attr("y", margin.top + 40)
                   .text(alertMsg[64][langNum]).style("stroke","red").style("font-size","1em");
                return;
            }
            if (methodType == 0) prior[k] = gobs[k] / tobs;
            else prior[k] = 1 / numgroup;
          }

          discriminant(numVar, tobs, sobs);
          if (numVar == 2 && numgroup == 2) linearFunction = 1;
          drawScatterMatrixByGroup(numVar, svarName, tobs, numgroup, gdataValue, linearFunction);
          statClassification();
      })

      // scatter plot cluster
      d3.select("#scatterPlot").on("click", function() {
          if (tobs < 1) return;
          drawScatterMatrixByGroup(numVar, svarName, tobs, numgroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#parallelGraph").on("click", function() {
          if (tobs < 1) return;
          parallelGraphByGroup(numVar, svarName, tobs, numgroup, gdataValue);
      })
      // classificationr table
      d3.select("#classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTable(numVar, tobs, sobs); 
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

// Discriminant ----------------------------------------------------------------------------------------------
function discriminant(numVar, tobs, sobs) {
    var g, h, i, j, k, gg, temp, t1, t2;
    var T0 = new Array(numVar); 
    var T1 = new Array(numVar); 
    // group means
    for (k = 0; k < numgroup; k++) {
      for (j = 0; j < numVar; j++) {
        avg[k][j] = 0;
      }
    } 
    for (i = 0; i < tobs; i++) {
      for (j = 0; j < numVar; j++) {
        avg[yhatTrain[i]][j] += parseFloat(Dtrain[j][i]);
      }
    }
    for (j = 0; j < numVar; j++) {
      gavg[j] = 0;
      for (k = 0; k < numgroup; k++) {
        gavg[j] += avg[k][j];
      }
      gavg[j] /= tobs;
    } 
    // group cross product
    for (k = 0; k < numgroup; k++) {
      for (i = 0; i < numVar; i++) {
        avg[k][i] /= gobs[k];
        for (j= 0; j < numVar; j++) {
          cov[k][i][j] = 0;
        }
      }
    }
    for (k = 0; k < tobs; k++) {
      for (i = 0; i < numVar; i++) {
        t1 = parseFloat(Dtrain[i][k]) - avg[yhatTrain[k]][i];
        for (j = 0; j < numVar; j++) {
          t2 = parseFloat(Dtrain[j][k]) - avg[yhatTrain[k]][j];
          cov[yhatTrain[k]][i][j] += t1 * t2;
        }
      }
    }
    // correlation
    for (k = 0; k < numgroup; k++) {
      for (i = 0; i < numVar; i++) {
        for (j= 0; j < numVar; j++) {
          corr[k][i][j] = cov[k][i][j] / Math.sqrt(cov[k][i][i] * cov[k][j][j]);
        }
      }
    }
    // total covariance
    for (i = 0; i < numVar; i++) {
      for (j = 0; j < numVar; j++) {
        gcov[i][j] = 0;
      }
    }
    for (k = 0; k < tobs; k++) {
      for (i = 0; i < numVar; i++) {
        t1 = parseFloat(Dtrain[i][k]) - gavg[i];
        for (j = 0; j < numVar; j++) {
          t2 = parseFloat(Dtrain[j][k]) - gavg[j];
          gcov[i][j] += t1 * t2;
        }
      }
    }
    for (i = 0; i < numVar; i++) {
      for (j = 0; j < numVar; j++) {
        gcov[i][j] /= (tobs - 1);
        if ( i == j ) gstd[j] = Math.sqrt(gcov[i][j]);
      }
    }
    // group covariance
    for (k = 0; k < numgroup; k++) {
      for (i = 0; i < numVar; i++) { 
        for (j= 0; j < numVar; j++) {
          cov[k][i][j] /= (gobs[k] - 1);
        }
      }
    }
    // inverse of total covariance gcov
    covarianceInv(numVar) ;

    // discriminant function 
    // (mu[i] - mu[j])' ginv
    for (g = 0; g < numgroup-1; g++) {
      for (h = g+1; h < numgroup; h++) {
          for (j = 0; j < numVar; j++) {
            T0[j] = avg[g][j] - avg[h][j];
            T1[j] = (-0.5)*(avg[g][j] + avg[h][j]);
          }
// console.log(T0)
// console.log(T1)
          for (j = 0; j < numVar; j++) {
            coeff[g][h][j] = 0;  // linear discriminant coefficient
            for (k = 0; k < numVar; k++) {
              coeff[g][h][j] += T0[k]*ginv[k][j];
            }
          }
          temp = 0;
          for (k = 0; k < numVar; k++) {
              temp += coeff[g][h][k]*T1[k];
          }
          coeff[g][h][numVar] = temp - Math.log(prior[h]/prior[g]);
// console.log(coeff[g][h])
      } // endof h
    } // endof g

    // determine class of training data
    for (i = 0; i < numgroup; i++) 
      for (j = 0; j < numgroup; j++) classTrain[i][j] = 0;
    for (k = 0; k < tobs; k++) {
      for (g = 0; g < numgroup-1; g++) {
        for (h = g+1; h < numgroup; h++) {
          classValue[g][h] = 0
          for (i = 0; i < numVar; i++) classValue[g][h] += coeff[g][h][i] * Dtrain[i][k];
          classValue[g][h] += coeff[g][h][numVar];
          classValue[h][g] = (-1)*classValue[g][h];
        } // endof h
      } // endof g
      // find group
      for (g = 0; g < numgroup; g++) {
        gg = 0;
        for (h = 0; h < numgroup; h++) {
          if (g == h) continue;
          if (classValue[g][h] > 0) gg++;
        }
        if (gg == (numgroup-1)) {
          yclassTrain[k] = gdataValue[g];
          classTrain[yhatTrain[k]][g]++;
          break;
        }
      } // endof g
    } // endof k
    // total
    for (j = 0; j < numgroup; j++) {
        classTrain[numgroup][j] = 0;
        for (i = 0; i < numgroup; i++) classTrain[numgroup][j] += classTrain[i][j];
    }
    classTrain[numgroup][numgroup] = 0;
    for (i = 0; i < numgroup; i++){
        classTrain[i][numgroup] = 0;
        for (j = 0; j < numgroup; j++) classTrain[i][numgroup] += classTrain[i][j];
        classTrain[numgroup][numgroup] += classTrain[i][numgroup];
    }
    
    // determine class of testing data
  if (training < 1) {
    for (i = 0; i < numgroup; i++) 
      for (j = 0; j < numgroup; j++) classTest[i][j] = 0;
    for (k = 0; k < sobs; k++) {
      for (g = 0; g < numgroup-1; g++) {
        for (h = g+1; h < numgroup; h++) {
          classValue[g][h] = 0
          for (i = 0; i < numVar; i++) classValue[g][h] += coeff[g][h][i] * Dtest[i][k];
          classValue[g][h] += coeff[g][h][numVar];
          classValue[h][g] = (-1)*classValue[g][h];
        } // endof h
      } // endof g
      // find all cij > 0
      for (g = 0; g < numgroup; g++) {
        gg = 0;
        for (h = 0; h < numgroup; h++) {
          if (g == h) continue;
          if (classValue[g][h] > 0) gg++;
        }
        if (gg == (numgroup-1)) {
          yclassTest[k] = gdataValue[g];
          classTest[yhatTest[k]][g]++;
          break;
        }
      }
    } // endof k

    // total
    for (j = 0; j < numgroup; j++) {
      classTest[numgroup][j] = 0;
      for (i = 0; i < numgroup; i++) classTest[numgroup][j] += classTest[i][j];
    }
    classTest[numgroup][numgroup] = 0;
    for (i = 0; i < numgroup; i++){
      classTest[i][numgroup] = 0;
      for (j = 0; j < numgroup; j++) classTest[i][numgroup] += classTest[i][j];
      classTest[numgroup][numgroup] += classTest[i][numgroup];
    }
  }
}

// inverse of total covariance ----------------------------------------------------------------------
function covarianceInv(numVar) {
    var i, j, k;
    var temp, tempx, tempy, sum;
    var nAug = 2 * numVar;
    var L = new Array(numVar); // 2차원 행렬
    var U = new Array(numVar); // 2차원 행렬
    var invL = new Array(numVar); // 2차원 행렬
    var invU = new Array(numVar); // 2차원 행렬
    for (j = 0; j < numVar; j++) {
        L[j]    = new Array(nAug);
        U[j]    = new Array(nAug);
        invL[j] = new Array(numVar);
        invU[j] = new Array(numVar);
    }
    // L matrix 
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            L[i][j] = gcov[i][j];
        }
    }
    // Cholesky Decomposition LU
    for (k = 0; k < numVar; k++) {
        for (i = 0; i <= k - 1; i++) {
            sum = 0;
            for (j = 0; j <= i - 1; j++) {
                sum += L[i][j] * L[k][j];
            }
            L[k][i] = (L[k][i] - sum) / L[i][i];
        }
        sum = 0;
        for (j = 0; j <= k - 1; j++) sum += L[k][j] * L[k][j];
        L[k][k] = Math.sqrt(L[k][k] - sum);
    }
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            if (j > i) L[i][j] = 0;
            U[j][i] = L[i][j];
        }
    }
    // Augment matrix
    for (i = 0; i < numVar; i++) {
        for (k = numVar; k < nAug; k++) {
            if (k == i + numVar) {
                L[i][k] = 1;
                U[i][k] = 1;
            } else {
                L[i][k] = 0;
                U[i][k] = 0;
            }
        }
    }
    // inverse of L by Gauss Elimination
    for (k = 0; k < numVar; k++) {
        temp = L[k][k];
        for (j = k; j < nAug; j++) L[k][j] = L[k][j] / temp;
        for (i = k + 1; i < numVar; i++) {
            temp = L[i][k];
            for (j = k; j < nAug; j++) {
                L[i][j] = L[i][j] - temp * L[k][j];
            }
        }
    }
    for (i = 0; i < numVar; i++) {
        for (j = numVar; j < nAug; j++) invL[i][j - numVar] = L[i][j];
    }
    // inverse of U = (invL)^T
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) invU[i][j] = invL[j][i];
    }
    // inverse of ginv = (invU)(invL)
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += invU[i][k] * invL[k][j];
            ginv[i][j] = sum;
        }
    }
    // Final Test for identity
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += gcov[i][k] * ginv[k][j];
        }
    }

 /*
    console.log("i=0 "+ginv[0][0]+" "+ginv[0][1]+" "+ginv[0][2]);  
    console.log("i=1 "+ginv[1][0]+" "+ginv[1][1]+" "+ginv[1][2]);  
    console.log("i=2 "+ginv[2][0]+" "+ginv[2][1]+" "+ginv[2][2]);  

    console.log("i="+i+" "+L[i][0]+" "+L[i][1]+" "+L[i][2]+" "+L[i][3]+" "+L[i][4]+" "+L[i][5]);
    console.log("k="+k+" "+L[k][0]+" "+L[k][1]+" "+L[k][2]+" "+L[k][3]+" "+L[k][4]+" "+L[k][5]);  
    console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
    console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
    console.log("k="+k+" "+L[2][0]+" "+L[2][1]+" "+L[2][2]+" "+L[2][3]+" "+L[2][4]+" "+L[2][5]);  
 */


}


// classification statistics table
function statClassification() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, str1;
    var num = 0;
    var ncol = numVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // print mean (std)
    row = table.insertRow(num);
    for (j = 0; j < ncol+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[0].innerHTML = svgStr[34][langNum]+" ("+svgStr[35][langNum]+")"; // Mean (Std Dev)
    cell[1].innerHTML = svgStr[44][langNum]; // Observation
    cell[2].innerHTML = svgStr[129][langNum]; // Prior pro
    for (j = 0; j < numVar; j++) {
        cell[j+3].innerHTML = tdvarName[j+1];
    }

    for (k = 0; k < numgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ncol+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
      }
      cell[0].style.width = "120px";
      cell[0].style.textAlign = "left";
      cell[0].innerHTML = tdvarName[0]+" : "+dataValue[k]; // group
      cell[1].innerHTML = gobs[k];
      cell[2].innerHTML = f2(prior[k]);
      for (j = 0; j < numVar; j++) {
         cell[j+3].innerHTML = f3(avg[k][j]) +" ("+ f3(Math.sqrt(cov[k][j][j]/(tobs-1)))+")";
      }
    }
    row = table.insertRow(++num);
    for (j = 0; j < ncol+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.width = "120px";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[23][langNum]; // Total
    cell[1].innerHTML = tobs;
    for (j = 0; j < numVar; j++) {
         cell[j+3].innerHTML = f3(gavg[j]) +" ("+ f3(Math.sqrt(gstd[j]))+")";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    // print correlation matrix
    for (k = 0; k < numgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
      }
      cell[0].innerHTML = svgStr[108][langNum]+"<br>"+svgStr[18][langNum]+" "+(k+1).toString()+" : "+dataValue[k]; // correlation matrix
      for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = tdvarName[j+1];
      }
      for (i = 0; i < numVar; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "right";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "80px";
        }
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = tdvarName[i+1];
        for (j = 0; j < numVar; j++) {
          cell[j+1].innerHTML = f3(corr[k][i][j]);
        }
      } // endof i
    } // endof k

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    // print classification function
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].style.width = "120px";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[143][langNum]; // Classification function
    for (g = 0; g < numgroup-1; g++) {
      for (h = g+1; h < numgroup; h++) {
        row = table.insertRow(++num);
        cell[0] = row.insertCell(0);
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.border = "1px solid black";
        cell[0].style.width = "120px";
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = "C<sub>"+(g+1).toString()+(h+1).toString()+"</sub> = "
        cell[1] = row.insertCell(1);
        cell[1].style.border = "1px solid black";
        cell[1].style.width = "300px";
        cell[1].style.textAlign = "left";
        str1 = " ";
        for (i = 0; i < numVar; i++) {
          str1 += "("+f3(coeff[g][h][i]).toString()+") ("+tdvarName[i+1]+") +";
        }
        str1 += "("+f3(coeff[g][h][numVar]).toString()+") = 0";
        cell[1].innerHTML = str1;
        cell[1].colSpan = "6";
      }
    }

    row = table.insertRow(++num);
    row.style.height = "20px";

    // classification result of training data
    row = table.insertRow(++num);
    for (j = 0; j < numgroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[148][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < numgroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+dataValue[k]; //  decision
    }
    cell[numgroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < numgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < numgroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+dataValue[k]; 
      for (j = 0; j < numgroup; j++) {
        temp1 = 100 * classTrain[k][j] / classTrain[numgroup][numgroup];
        temp2 = 100 * classTrain[k][j] / classTrain[k][numgroup];
        cell[j+1].innerHTML = classTrain[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTrain[k][numgroup] / classTrain[numgroup][numgroup];
      cell[numgroup+1].style.backgroundColor = "#eee";
      cell[numgroup+1].innerHTML = classTrain[k][numgroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(++num);
    for (j = 0; j < numgroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < numgroup; j++) { //  decision
      temp1 = 100 * classTrain[numgroup][j] / classTrain[numgroup][numgroup];
      cell[j+1].innerHTML = classTrain[numgroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[numgroup+1].innerHTML = classTrain[numgroup][numgroup]+"<br>"+f2(100)+" %"; // Total
    row = table.insertRow(++num);
    for (j = 0; j < 4; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[51][langNum]; // Accuracy
    temp = 0;
    for (k = 0; k < numgroup; k++) temp += classTrain[k][k];
    temp /= classTrain[numgroup][numgroup];
    cell[1].innerHTML = f2(100 * temp) + "%"; // Accuracy
    cell[1].style.textAlign = "right";
    cell[2].innerHTML = svgStrU[146][langNum]; // Misclassification
    cell[3].innerHTML = f2(100 * (1-temp)) + "%"; // Misclassification
    cell[3].style.textAlign = "right";

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

  if (training < 1) {
    // classification result of testing data
    row = table.insertRow(++num);
    for (j = 0; j < numgroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[149][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < numgroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+dataValue[k]; //  decision
    }
    cell[numgroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < numgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < numgroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+dataValue[k]; 
      for (j = 0; j < numgroup; j++) {
        temp1 = 100 * classTest[k][j] / classTest[numgroup][numgroup];
        temp2 = 100 * classTest[k][j] / classTest[k][numgroup];
        cell[j+1].innerHTML = classTest[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTest[k][numgroup] / classTest[numgroup][numgroup];
      cell[numgroup+1].style.backgroundColor = "#eee";
      cell[numgroup+1].innerHTML = classTest[k][numgroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(++num);
    for (j = 0; j < numgroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < numgroup; j++) { //  decision
      temp1 = 100 * classTest[numgroup][j] / classTest[numgroup][numgroup];
      cell[j+1].innerHTML = classTest[numgroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[numgroup+1].innerHTML = classTest[numgroup][numgroup]+"<br>"+f2(100)+" %"; // Total
    row = table.insertRow(++num);
    for (j = 0; j < 4; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[51][langNum]; // Accuracy
    temp = 0;
    for (k = 0; k < numgroup; k++) temp += classTest[k][k];
    temp /= classTest[numgroup][numgroup];
    cell[1].innerHTML = f2(100 * temp) + "%"; // Accuracy
    cell[1].style.textAlign = "right";
    cell[2].innerHTML = svgStrU[146][langNum]; // Misclassification
    cell[3].innerHTML = f2(100 * (1-temp)) + "%"; // Misclassification
    cell[3].style.textAlign = "right";
  }
    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

// Classification output --------------------------------------------------------------------------------------------------
function classificationTable(numVar, tobs, sobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = numVar + 3;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // training 헤더
    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStrU[148][langNum];
    for (j = 0; j < numVar+1; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[numVar+2].innerHTML = svgStrU[142][langNum]; // Classification

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
        }
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = i+1;
        cell[1].style.textAlign = "center";
        cell[1].innerHTML = ytrain[i];
        for (j = 0; j < numVar; j++) cell[j+2].innerHTML = f3(Dtrain[j][i]);
        cell[numVar+2].style.textAlign = "center";
        cell[numVar+2].innerHTML = yclassTrain[i];
    }
    // testing 헤더
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStrU[149][langNum];
    for (j = 0; j < numVar+1; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[numVar+2].innerHTML = svgStrU[142][langNum]; // Classification

    for (i = 0; i < sobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
        }
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = i+1;
        cell[1].style.textAlign = "center";
        cell[1].innerHTML = ytest[i];
        for (j = 0; j < numVar; j++) cell[j+2].innerHTML = f3(Dtest[j][i]);
        cell[numVar+2].style.textAlign = "center";
        cell[numVar+2].innerHTML = yclassTest[i];
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}
