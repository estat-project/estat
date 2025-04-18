      var chart     = d3.select("#chart"); 
      var i, r;
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle, yobs, x1obs, x2obs, x3obs, x4obs, x5obs, tobs, numVar;
      var ngroup  = 1;
      var fontsize  = "1em";
      var linearFunction = 0;
      var statF     = new Array(30);
      var rowMax    = 200;
      var colMax    = 6;
      var gdataValue= new Array(rowMax);
      var xdata     = new Array(rowMax);
      var ydata     = new Array(rowMax);
      var yydata    = new Array(rowMax);
      var x1data    = new Array(rowMax);
      var x2data    = new Array(rowMax);
      var x3data    = new Array(rowMax);
      var x4data    = new Array(rowMax);
      var x5data    = new Array(rowMax);
      var avgX      = new Array(colMax);
      var Cov       = new Array(colMax);
      var Corr      = new Array(colMax);
      var D         = new Array(colMax);
      var Dtrain    = new Array(colMax);
      for (j = 0; j < colMax; j++) {
        D[j]      = new Array(rowMax);
        Cov[j]    = new Array(colMax);
        Corr[j]   = new Array(colMax);
        Dtrain[j]   = new Array(rowMax);
      }
      var yhat     = new Array(rowMax);
      var stdResidual = new Array(rowMax);
      var Hii      = new Array(rowMax);
      var T        = new Array(colMax);
      var Beta     = new Array(colMax);
      var Cii      = new Array(colMax);
      var svarName = new Array(colMax);
      var tdvarName = ["Y", "X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085"];
      var tdvarNameSub = ["Y", "X<sub>1</sub>", "X<sub>2</sub>", "X<sub>3</sub>", "X<sub>4</sub>", "X<sub>5</sub>"];
      var Xvarname     = ["X\u2081", "X\u2082", "X\u2083", "X\u2084", "X\u2085", "X\u2086"];

      chart.selectAll("*").remove();
      // input data control ===================================================
      d3.select("#data321").on("input", function() {
        stat = simplestat("#data321");  
        yydata = data;  
        yobs = stat.n;
      });
      d3.select("#data322").on("input", function() {
        stat = simplestat("#data322");  
        x1data = data; 
        x1obs = stat.n;
      });
      d3.select("#data323").on("input", function() {
        stat = simplestat("#data323");  
        x2data = data; 
        x2obs = stat.n;
      });
      d3.select("#data324").on("input", function() {
        stat = simplestat("#data324");  
        x3data = data; 
        x3obs = stat.n;
      });
      d3.select("#data325").on("input", function() {
        stat = simplestat("#data325");  
        x4data = data; 
        x4obs = stat.n;
      });
      d3.select("#data326").on("input", function() {
        stat = simplestat("#data326");  
        x5data = data; 
        x5obs = stat.n;
      });

      updateData = function() {
        document.getElementById("data321").value = '';
        document.getElementById("data322").value = '';    
        document.getElementById("data323").value = '';    
        document.getElementById("data324").value = '';    
        document.getElementById("data325").value = '';    
        document.getElementById("data326").value = '';    
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("name321").value = "";
        document.getElementById("name322").value = "";
        document.getElementById("name323").value = "";
        document.getElementById("name324").value = "";
        document.getElementById("name325").value = "";
        document.getElementById("name326").value = "";
        document.getElementById("data321").value = "";
        document.getElementById("data322").value = "";
        document.getElementById("data323").value = "";
        document.getElementById("data324").value = "";
        document.getElementById("data325").value = "";
        document.getElementById("data326").value = "";
      })

      d3.select("#executeRegression").on("click", function(){  
          chart.selectAll("*").remove();  // 전화면 제거
          // variable name
          tdvarName[0] = document.getElementById("name321").value;
          tdvarName[1] = document.getElementById("name322").value;
          tdvarName[2] = document.getElementById("name323").value;
          tdvarName[3] = document.getElementById("name324").value;
          tdvarName[4] = document.getElementById("name325").value;
          tdvarName[5] = document.getElementById("name326").value;
          if (tdvarName[0] == "") tdvarName[0] = "Y";
          for (i = 1; i < colMax; i++) {
            if (tdvarName[i] == "") tdvarName[i] = Xvarname[i-1];
          } 

          // 입력행이 같은지 체크
          if (yobs == 0 || x1obs == 0 ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text("No input data").style("stroke","red").style("font-size","1em");
            return;
          }
          // 입력 데이터에 숫자 문자 빈칸 있나 체크
          for (j = 0; j < tobs; j++) {
            if ( isNaN(yydata[j]) || isNaN(x1data[j]) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          numVar = 2;
          for (j = 0; j < yobs; j++) {
            D[0][j] = yydata[j];
            D[1][j] = x1data[j];
          }
          if (x2obs > 0) {
            if (yobs != x2obs ) { // data size should be the same
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            // 입력 데이터에 숫자 문자 빈칸 있나 체크
            for (j = 0; j < tobs; j++) {
              if ( isNaN(x2data[j]) ) {
                chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
                return;
              }
            }
            numVar = 3;
            for (j = 0; j < yobs; j++) D[2][j] = x2data[j];
          }
          if (x3obs > 0) {
            if (yobs != x3obs ) { // data size should be the same
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
            numVar = 4;
            for (j = 0; j < yobs; j++) D[3][j] = x3data[j];
          }
          if (x4obs > 0) {
            if (yobs != x4obs ) { // data size should be the same
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
            numVar = 5;
            for (j = 0; j < yobs; j++) D[4][j] = x4data[j];
          }
          if (x5obs > 0) {
            if (yobs != x5obs ) { // data size should be the same
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
            numVar = 6;
            for (j = 0; j < yobs; j++) D[5][j] = x5data[j];
          }
          // observation < var number이면 해를 구할수 없음
          if (yobs < numVar ) { // obs < var
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text("observations < number of variable ???").style("stroke","red").style("font-size","1em");
              return;
          }
          tobs = yobs;

          // scatterplot matrix
          var iter = 0; // for group color
//          var numgroup = 1;
//          drawScatterMatrixByGroup(numVar, tobs, iter, numgroup);
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = D[i][j];
          } 
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
          statRegression(numVar, tobs);
          statMultivariate(numVar, tobs);
          multivariateTable(numVar, tobs);
          regressionTable2(numVar, tobs);
      })

       // scatter plot matrix
      d3.select("#scatterplotMatrix").on("click", function() {
          if (tobs < 1) return;
          chart.selectAll("*").remove();  // 전화면 제거
//          drawScatterMatrixByGroup(numVar, tobs, iter, numgroup);
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
       // 회귀분석 잔차와 예측값
      d3.select("#regressResidual").on("click", function() {
          if (tobs < 1) return;
//          title = svgStr[95][langNum]; // "잔차와 예측값의 산점도"
          regressionResidual(tobs, yhat, stdResidual);
      })
      // 회귀분석 잔차 Q-Q Plot
      d3.select("#regressQQ").on("click", function() {
          if (tobs < 1) return;
          regressionQQ(tobs, yhat, stdResidual);
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

// 회귀분석 통계량 ----------------------------------------------------------------------------------------------
function statRegression(numVar, tobs) {
    var i, j, k, nAug;
    var temp, tempx, tempy, sum;
    var SSR, SSE, SST, MSE, info, multpleR, stdErr;
    var avgY, avgYhat, avgResid, SSYH;

    prow = tobs; 
    nAug = 2 * numVar;
    var X = new Array(prow); // 2차원 행렬
    var Y = new Array(prow);
//    var yhat     = new Array(prow);
    var residual = new Array(prow);
    var Cook     = new Array(prow);
    var T = new Array(numVar);
//    var Beta     = new Array(numVar);
    var XP = new Array(numVar); // 2차원 행렬
    var XPX = new Array(numVar); // 2차원 행렬
    var XPY = new Array(numVar);
    var L = new Array(numVar); // 2차원 행렬
    var U = new Array(numVar); // 2차원 행렬
    var invL = new Array(numVar); // 2차원 행렬
    var invU = new Array(numVar); // 2차원 행렬
    var invXPX = new Array(numVar); // 2차원 행렬
    for (i = 0; i < prow; i++) {
        X[i] = new Array(numVar);
    }
    for (j = 0; j < numVar; j++) {
        XP[j]   = new Array(prow);
        XPX[j]  = new Array(numVar);
        L[j]    = new Array(nAug);
        U[j]    = new Array(nAug);
        invL[j] = new Array(numVar);
        invU[j] = new Array(numVar);
        invXPX[j] = new Array(numVar);
    }

    // vector Y, matrix X
    for (i = 0; i < prow; i++) {
        Y[i] = D[0][i];
        X[i][0] = 1;
        for (j = 1; j < numVar; j++) {
            X[i][j] = D[j][i];
        } // endof j
    } // endof i
    // matrix XP
    for (i = 0; i < prow; i++) {
        for (j = 0; j < numVar; j++) {
            XP[j][i] = X[i][j];
        } // endof j
    } // endof i
    // matrix XPX
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            temp = 0;
            for (k = 0; k < prow; k++) {
                temp += XP[i][k] * X[k][j];
            }
            XPX[i][j] = temp;
            L[i][j] = temp;
        }
    }
    // vector XPY
    for (i = 0; i < numVar; i++) {
        sum = 0;
        for (k = 0; k < prow; k++) {
            sum += XP[i][k] * Y[k];
        }
        XPY[i] = sum;
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

    // Solve linear Eq  Lt = XPY by forward substitution
    for (k = 0; k < numVar; k++) {
        sum = 0;
        for (j = 0; j < k; j++) sum += L[k][j] * T[j];
        T[k] = (XPY[k] - sum) / L[k][k];
    }
    // Solve linear Eq  Ub = T by forward substitution
    for (k = numVar - 1; k >= 0; k--) {
        sum = 0;
        for (j = numVar - 1; j > k; j--) sum += U[k][j] * Beta[j];
        Beta[k] = (T[k] - sum) / U[k][k];
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
    // inverse of XPX = (invU)(invL)
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += invU[i][k] * invL[k][j];
            invXPX[i][j] = sum;
            if (i == j) Cii[i] = invXPX[i][j];
        }
    }
    // Final Test for identity
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += XPX[i][k] * invXPX[k][j];
        }
    }
    // residual, multiple correlation
    avgY = 0;
    avgYhat = 0;
    for (i = 0; i < prow; i++) {
        sum = Beta[0];
        for (j = 1; j < numVar; j++) {
            sum += Beta[j] * X[i][j];
        } // endof j
        yhat[i] = sum;
        residual[i] = Y[i] - yhat[i];
        avgY += Y[i];
        avgYhat += yhat[i];
    } // endof i
    avgY /= prow;
    avgYhat /= prow;
    // ANOVA Statistics
    SSR = 0;
    SSE = 0;
    SST = 0;
    SSYH = 0;
    for (i = 0; i < prow; i++) {
        tempx = Y[i] - avgY;
        tempy = yhat[i] - avgY;
        SST += tempx * tempx;
        SSR += tempy * tempy;
        SSYH += tempx * tempy;
        SSE += residual[i] * residual[i];
    } // endof i
    MSE = SSE / (prow - numVar);
    stdErr = Math.sqrt(MSE);
    multipleR = SSYH / Math.sqrt(SST * SSR);
    // Hii Leverage : x_i' inv(X'X) x_i
    for (i = 0; i < prow; i++) {
        for (k = 0; k < numVar; k++) {
            T[k] = 0;
            for (j = 0; j < numVar; j++) {
                T[k] += X[i][j] * invXPX[j][k]
            }
        } // endof k
        Hii[i] = 0;
        for (j = 0; j < numVar; j++) {
            Hii[i] += T[j] * X[i][j]
        }
        stdResidual[i] = residual[i] / (stdErr * Math.sqrt(1 - Hii[i]));
        Cook[i] = stdResidual[i] * stdResidual[i] * Hii[i] / ((numVar - 1) * (1 - Hii[i]));
    } // endof i

    statF[0] = prow;
    statF[1] = SSR;
    statF[2] = SSE;
    statF[3] = SST;
    statF[4] = numVar - 1;
    statF[5] = prow - numVar;
    statF[6] = prow - 1;
    statF[7] = SSR / statF[4]; // MSR
    statF[8] = MSE; // MSE
    statF[9] = statF[7] / statF[8]; // Fobs
    statF[10] = 1 - f_cdf(statF[9], statF[4], statF[5], info);
    statF[11] = stdErr;
    statF[12] = multipleR;

 /*
    console.log("i=0 "+invXPX[0][0]+" "+invXPX[0][1]+" "+invXPX[0][2]);  
    console.log("i=1 "+invXPX[1][0]+" "+invXPX[1][1]+" "+invXPX[1][2]);  
    console.log("i=2 "+invXPX[2][0]+" "+invXPX[2][1]+" "+invXPX[2][2]);  

    console.log("i="+i+" "+L[i][0]+" "+L[i][1]+" "+L[i][2]+" "+L[i][3]+" "+L[i][4]+" "+L[i][5]);
    console.log("k="+k+" "+L[k][0]+" "+L[k][1]+" "+L[k][2]+" "+L[k][3]+" "+L[k][4]+" "+L[k][5]);  
    console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
    console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
    console.log("k="+k+" "+L[2][0]+" "+L[2][1]+" "+L[2][2]+" "+L[2][3]+" "+L[2][4]+" "+L[2][5]);  
 */


}

// 다변량 통계표 --------------------------------------------------------------------------------------------------
function multivariateTable(numVar, tobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, pvalue, temp, df, info, t95, stderr, tleft, tright;
    var row;
    var num = 0;
    var ncol = 22;
    var ncol2 = 7;

    var cell = new Array(ncol);
    df = tobs - 1;
    t95 = t_inv(0.975, df, info);

    table.style.fontSize = "13px";
    table.style.cellPadding = "10";
    // 헤더
    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = svgStr[43][langNum]; // "<h3>기초통계량</h3>"; 
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].style.width = "130px";
    // 변량별 평균 및 분산
    row = table.insertRow(++num);
    for (j = 0; j < ncol2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[6].style.width = "150px";
    cell[0].innerHTML = svgStr[63][langNum]; // "변량";
    cell[1].innerHTML = svgStr[64][langNum]; // "변량명";
    cell[2].innerHTML = svgStr[44][langNum]; // "자료수";  
    cell[3].innerHTML = svgStr[34][langNum]; // "평균";  
    cell[4].innerHTML = svgStr[35][langNum]; // "표준편차";  
    cell[5].innerHTML = svgStrU[18][langNum]; // "표준오차";  
    cell[6].innerHTML = "95% " + svgStrU[20][langNum]; // 95% 신뢰구간                 

    for (k = 0; k < numVar; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
        }
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        cell[1].style.textAlign = "center";
        cell[6].style.textAlign = "center";
        cell[0].innerHTML = svgStr[63][langNum] + " " + (k + 1).toString(); // "변량";
        cell[1].innerHTML = tdvarNameSub[k];
        cell[2].innerHTML = tobs;
        cell[3].innerHTML = f3(avgX[k]).toString();
        temp = Math.sqrt(Cov[k][k]); // std dev
        stderr = temp / Math.sqrt(tobs); // std err
        tleft = avgX[k] - t95 * stderr;
        tright = avgX[k] + t95 * stderr;
        cell[4].innerHTML = f3(temp).toString();
        cell[5].innerHTML = f3(stderr).toString();
        cell[6].innerHTML = "(" + f3(tleft) + ", " + f3(tright) + ")";
    }

    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);

    // 상관계수 행렬
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = "<h3>" + svgStr[108][langNum] + "</h3>"; // "<h3>상관계수행렬</h3>"
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].style.width = "130px";

    row = table.insertRow(++num);
    for (j = 0; j < numVar + 2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "90px";
    }
    cell[0].innerHTML = svgStr[60][langNum] + "<br>H<sub>0</sub>: &rho;=0 &rho;&ne;0 &nbsp;t-" + svgStr[69][langNum] + "<br>p-" + svgStr[69][langNum]; // "상관계수"
    cell[1].innerHTML = svgStr[64][langNum]; // "변량명";              
    for (k = 0; k < numVar; k++) {
        cell[k + 2].innerHTML = svgStr[63][langNum] + " " + (k + 1); // "변수 "
    }

    for (i = 0; i < numVar; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < numVar + 2; j++) cell[j] = row.insertCell(j);
        for (j = 0; j < 2; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = svgStr[63][langNum] + " " + (i + 1).toString(); // "변량";
        cell[1].innerHTML = tdvarNameSub[i];
        for (k = 0; k < numVar; k++) {
            if (i == k || Corr[i][k] == 1) str = "1";
            else {
                temp = Corr[i][k] * Math.sqrt((tobs - 2) / (1 - Corr[i][k] * Corr[i][k]));
                pvalue = t_cdf(temp, tobs-2, info);
                if (pvalue < 0.5) pvalue = 2 * pvalue;
                else pvalue = 2 * (1 - pvalue);
                if (pvalue < 0.0001) str = "< 0.0001";
                else str = f4(pvalue).toString();
                str = f3(Corr[i][k]).toString() + "<br>t-" + svgStr[69][langNum] + " = " + f3(tobs) + "<br>p-" + svgStr[69][langNum] + " " + str;
            }
            cell[k + 2].innerHTML = str;
            cell[k + 2].style.textAlign = "right";
            cell[k + 2].style.border = "1px solid black";
        }
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

// 다중 선형 회귀분석표 --------------------------------------------------------------------------------------------------
function regressionTable2(numVar, tobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, stderr, tobs, pvalue, temp, df, info, tleft, tright, str;
    var row;
    var num = 0;
    var ncol = numVar + 1;
    if (ncol < 6) ncol = 6;

    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "10";

    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = svgStr[79][langNum]; // "<h3>회귀분석</h3>";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].style.width = "130px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.width = "90px";
    }
    cell[0].innerHTML = svgStrU[31][langNum] + " y ="; // "회귀선";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].style.border = "1px solid black";
    cell[1].innerHTML = "(" + f3(Beta[0]).toString() + ")";
    cell[1].style.textAlign = "right";
    for (k = 1; k < numVar; k++) {
        cell[k + 1].innerHTML = "+ &nbsp; (" + f3(Beta[k]).toString() + ")" + " X<sub>" + k + "</sub>";
        cell[k + 1].style.textAlign = "center";
    }

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[106][langNum]; // "중상관계수"
    cell[1].innerHTML = f3(statF[12]);
    cell[2].innerHTML = svgStr[61][langNum]; // "결정계수";  
    cell[3].innerHTML = f3(statF[12] * statF[12]);
    cell[4].innerHTML = svgStr[62][langNum]; // "추정오차"   
    cell[5].innerHTML = f3(statF[11]);
    // 공백
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    // 회귀 추정 모수
    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[67][langNum]; // "모수";
    cell[1].innerHTML = svgStr[68][langNum]; // "추정치";  
    cell[2].innerHTML = svgStrU[18][langNum]; // "표준오차";  
    cell[3].innerHTML = "t " + svgStr[69][langNum]; // "t관찰값";  
    cell[4].innerHTML = "p " + svgStr[69][langNum]; // "p-값 =";   
    cell[5].innerHTML = "95% " + svgStrU[20][langNum]; // 신뢰구간
    cell[5].style.width = "130px";
    df = statF[5];
    temp = t_inv(0.95, df, info);

    for (k = 0; k < numVar; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < 6; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
            cell[j].style.textAlign = "right";
        }
        cell[0].style.textAlign = "left";
        cell[0].style.backgroundColor = "#eee";
        cell[5].style.textAlign = "center";
        if (k == 0) cell[0].innerHTML = "&beta;<sub>" + k + "</sub>";
        else cell[0].innerHTML = "&beta;<sub>" + k + "</sub> " + " " + tdvarNameSub[k];
        cell[1].innerHTML = f3(Beta[k]).toString();
        stderr = Math.sqrt(Cii[k] * statF[8]);
        tobs = Beta[k] / stderr;
        pvalue = t_cdf(tobs, df, info);
        if (pvalue < 0.5) pvalue = 2 * pvalue;
        else pvalue = 2 * (1 - pvalue);
        tleft = Beta[k] - temp * stderr;
        tright = Beta[k] + temp * stderr;
        cell[2].innerHTML = f3(stderr).toString();
        cell[3].innerHTML = f3(tobs).toString();
        if (pvalue < 0.0001) str = "< 0.0001";
        else str = f4(pvalue).toString();
        cell[4].innerHTML = str;
        cell[5].innerHTML = "(" + f3(tleft) + " ," + f3(tright) + ")";
    }
    // 공백
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    // 분산분석표
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = svgStrU[29][langNum]; // "분산분석표";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[72][langNum]; // "요인";
    cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
    cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
    cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
    cell[4].innerHTML = "F " + svgStr[69][langNum]; // "F관찰값";   
    cell[5].innerHTML = "p " + svgStr[69][langNum]; // "p-값 =";    

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[76][langNum]; // "회귀";
    cell[1].innerHTML = f4(statF[1]).toString();
    cell[2].innerHTML = f0(statF[4]).toString();
    cell[3].innerHTML = f4(statF[7]).toString();
    cell[4].innerHTML = f4(statF[9]).toString();
    if (statF[10] < 0.0001) str = "< 0.0001"
    else str = f4(statF[10]).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[77][langNum]; // "오차";
    cell[1].innerHTML = f4(statF[2]).toString();
    cell[2].innerHTML = f0(statF[5]).toString();
    cell[3].innerHTML = f4(statF[8]).toString();
    cell[0].style.backgroundColor = "#eee";

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[78][langNum]; // "전체";
    cell[1].innerHTML = f4(statF[3]).toString();
    cell[2].innerHTML = f0(statF[6]).toString();

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

