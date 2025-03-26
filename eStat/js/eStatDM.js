// ******************************************************
// Data Mining Modules
// ******************************************************
// group 있는 데이터마이닝 데이터 분류 - 점을 그룹으로 구분
function dataClassifyDMbyGroup() {
    var i, j, k, m;
    //***** Check Missing ***** 
    dobs = 0; // 데이터수
    mobs = 0; // Missing수
    for (i = 0; i < tdobs[0]; i++) {
        checkMissing = false;
        for (k = 0; k < numVar; k++) {
            if (tdvar[k][i] == "99999999") {
                checkMissing = true;
                break;
            }
        }
        if (checkMissing) mobs++; //***** missing 수 증가
        else { //***** 데이터 수 증가
            for (k = 0; k < numVar; k++) {
                mdvar[k][dobs] = tdvar[k][i]
            }
            dobs++;
        }
    }
    // 결측이 없는 행의 수 입력
    for (k = 0; k < numCol; k++) mdobs[k] = dobs;
    // 결측행 제외 각 변량별 값 계산
    for (k = 0; k < numVar; k++) {
        for (i = 0; i < dobs; i++) dataA[i] = mdvar[k][i];
        mdvalueNum[k] = datavalueDM(dobs, dataA, dataValue, dvalueFreq);
        for (j = 0; j < mdvalueNum[k]; j++) {
            mdvalue[k][j] = dataValue[j];
            mdvalueFreq[k][j] = dvalueFreq[j];
            for (m = 0; m < tdvalueNum[k]; m++) {
                if (mdvalue[k][j] == tdvalue[k][m]) {
                    mdvalueLabel[k][j] = tdvalueLabel[k][m];
                    break;
                }
            }
        }
    }
    // group values
    ngroup = mdvalueNum[0];
    for (m = 0; m < ngroup; m++) gdataValue[m] = mdvalue[0][m];
    // Data standardization 
    if (istandard == 1) {
            for (i = 0; i < numVar; i++) {
              tavg[i] = 0;
              for (j = 0; j < dobs; j++) tavg[i] += parseFloat(mdvar[i][j]);
              tavg[i] /= dobs;
            }
            for (i = 0; i < numVar; i++) {
              tstd[i] = 0;
              for (j = 0; j < dobs; j++) {
                temp = (parseFloat(mdvar[i][j]) - tavg[i]);
                tstd[i] += temp * temp;
              }
              tstd[i] = Math.sqrt(tstd[i] / (dobs-1));
            }
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < dobs; j++) Dnormal[i][j] = (parseFloat(mdvar[i][j]) - tavg[i]) / tstd[i];
            }
    }
    else {
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < dobs; j++) Dnormal[i][j] = parseFloat(mdvar[i][j]);
            }
    }

    // max freq 
    freqMaxDM = 0;
    for (k = 0; k < numVar; k++) {
      for (j = 0; j < mdvalueNum[k]; j++) {
        if (mdvalueFreq[k][j] > freqMaxDM) freqMaxDM = mdvalueFreq[k][j];
      }
    }
    freqMaxDM += Math.floor(freqMaxDM / 8 + 1);
}

// Data partition with total var
function dataPartitionTotal() {
          var i, j, k
          // D[i][j] : index numbered data
          for (j = 0; j < yobs; j++) {
              for (i = 0; i < numVar; i++) {
                Dtrain[i][j] = mdvar[i+1][j];
                for (k = 0; k < mdvalueNum[i]; k++) {
                  if (mdvar[i][j] == mdvalue[i][k]) {
                    D[i][j] = k;    
                    break;
                  }
                }
              }
          }
}
// Data partition with group and dependent var
function dataPartition() {
          var i, j, k;
          // yydata[] and numeric yydataN[]
          for (j = 0; j < yobs; j++) { // give number to yydata
            yydata[j] = mdvar[0][j];
            for (k = 0; k < ngroup; k++) {
              if (yydata[j] == mdvalue[0][k]) {
                yydataN[j] = k;
                break;
              }
            }
          }
          // data partition
          for (i = 0; i < numVar; i++) {
            for (j = 0; j < yobs; j++) { 
              Dtrain[i][j] = null;
              Dtest[i][j]  = null;
            }
          }

          for (k = 0; k < ngroup; k++) gobsD[k] = 0;

          if (training == 1) { // 100% training
            tobs = yobs;
            testobs = yobs;
            for (j = 0; j < yobs; j++) {
              ytrain[j]  = yydata[j];
              ytrainN[j] = yydataN[j];
              ytestN[j]  = yydataN[j];
              gobsD[ytrainN[j]]++;
              for (i = 0; i < numVar-1; i++) {
                DDtrain[i][j] = mdvar[i+1][j];
                DDtest[i][j]  = mdvar[i+1][j];
                if (istandard == 0) {
                  Dtrain[i][j] = mdvar[i+1][j];
                  Dtest[i][j]  = mdvar[i+1][j];
                }
                else {
                  Dtrain[i][j] = Dnormal[i+1][j];
                  Dtest[i][j]  = Dnormal[i+1][j];
                }
              } 
            } 
          }
          else { 
            tobs = 0;
            testobs = 0;
            for (j = 0; j < yobs; j++) {
              if (Math.random() < training) { // training data
                ytrain[tobs]  = yydata[j];
                ytrainN[tobs] = yydataN[j];
                for (i = 0; i < numVar-1; i++) {
                  DDtrain[i][tobs] = mdvar[i+1][j];
                  if (istandard == 0 ) Dtrain[i][tobs] = mdvar[i+1][j]
                  else Dtrain[i][tobs] = Dnormal[i+1][j];
                }
                gobsD[ytrainN[tobs]]++;
                tobs++;
              }
              else { // testing data
                ytest[testobs]  = yydata[j];
                ytestN[testobs] = yydataN[j];
                for (i = 0; i < numVar-1; i++) { 
                  DDtest[i][testobs] = mdvar[i+1][j];
                  if (istandard == 0 ) Dtest[i][testobs] = mdvar[i+1][j]
                  else Dtest[i][testobs] = Dnormal[i+1][j];
                }
                testobs++;
              }
            }
          }

          // max freq 
          freqMaxDM = 0;
          for (k = 0; k < numVar; k++) {
            for (j = 0; j < mdvalueNum[k]; j++) {
              if (mdvalueFreq[k][j] > freqMaxDM) freqMaxDM = mdvalueFreq[k][j];
            }
          }
          freqMaxDM += Math.floor(freqMaxDM / 8 + 1);
}

// Data partition for decision tree with group and independent var
function dataPartitionDT() {
          var i, j, k;
          // yydata[] and numeric yydataN[]
          for (j = 0; j < yobs; j++) { // give number to yydata
            yydata[j] = mdvar[0][j];
            for (k = 0; k < ngroup; k++) {
              if (yydata[j] == mdvalue[0][k]) {
                yydataN[j] = k;
                break;
              }
            }
          }
          // data partition
          for (i = 0; i < numVar; i++) {
            for (j = 0; j < yobs; j++) { 
              Dtrain[i][j] = null;
              Dtest[i][j]  = null;
            }
          }
          for (k = 0; k < ngroup; k++) { // group observation of training & testing data
            gobsD[k] = 0;
            gobsH[k] = 0;
          }
          if (training == 1) { // 100% training
            tobs = yobs;
            testobs = 0;
            for (j = 0; j < yobs; j++) {
              ytrain[j]  = yydata[j];
              ytrainN[j] = yydataN[j];
              gobsD[ytrainN[j]]++;
              for (i = 0; i < numVar; i++) {
                Dtrain[i][j] = mdvar[i][j]
              }
            }
          }
          else { // data partician - training : testing
            tobs = 0;
            testobs = 0;
            for (j = 0; j < yobs; j++) {
              if (Math.random() < training) {
                ytrain[tobs]  = yydata[j];
                ytrainN[tobs] = yydataN[j];
                for (i = 0; i < numVar; i++) {
                  Dtrain[i][tobs] = mdvar[i][j]
                }
                gobsD[ytrainN[tobs]]++;
                tobs++;
              }
              else { // testing
                ytest[testobs]  = yydata[j];
                ytestN[testobs] = yydataN[j];
                for (i = 0; i < numVar; i++) { 
                  Dtest[i][testobs] = mdvar[i][j]
                }
                gobsH[ytestN[testobs]]++;
                testobs++;
              }
            }
          }

          // max freq 
          freqMaxDM = 0;
          for (k = 0; k < numVar; k++) {
            for (j = 0; j < mdvalueNum[k]; j++) {
              if (mdvalueFreq[k][j] > freqMaxDM) freqMaxDM = mdvalueFreq[k][j];
            }
          }
          freqMaxDM += Math.floor(freqMaxDM / 8 + 1);
}

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
function datavalueDM(dobs, dataA, dataValue, dvalueFreq) {
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

// two dimension frequency for bar matrix
function twodimFreq(tobs, rowvar, colvar, rowdata, coldata, dim2Freq) {
   var i, j, k, m, n;
   for (i = 0; i < colMax; i++) {
     for (j = 0; j < colMax; j++) {
       dim2Freq[i][j] = 0;
     }
   }
//console.log("coldata="+coldata+" mdvalue[colvar]="+mdvalue[colvar])
//console.log("rowdata="+rowdata+" mdvalue[rowvar]="+mdvalue[rowvar])
   for (k = 0; k < tobs; k++) {
     for (i = 0; i < mdvalueNum[rowvar]; i++) {
       if (rowdata[k] == mdvalue[rowvar][i]) {m = i; break}
     }
     for (j = 0; j < mdvalueNum[colvar]; j++) {
       if (coldata[k] == mdvalue[colvar][j]) {n = j; break}
     }
//console.log(k+" rowvar="+rowvar+" m="+m+" colvar="+colvar+" n="+n+" rowdata="+rowdata[k]+" //coldata="+coldata[k])
     dim2Freq[m][n]++;
   }
}

// multidim frequency calculation for bar matrix
function multidimFreq(numVar, tobs) {
    var i, j, k, loc;
    var t = new Array(numVar);
    t[numVar-1] = mdvalueNum[numVar-1];
    for (j = numVar-2; j >= 0; j--) t[j] = mdvalueNum[j] * t[j+1];
    for (k = 0; k < t[0]; k++) freqDM[k] = 0;
    for (i = 0; i < tobs; i++) {
      loc = D[numVar-1][i];
      for (j = numVar-2; j >= 0; j--) loc += D[j][i] * t[j+1];
//console.loc
      freqDM[loc]++;
    }
    return t[0];
}

// print multidim Frequency Table for bar matrix
function multidimFreqTable(numVar, tobs, numfreqDM, freqDM) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, m, n, temp;
    var num = 0;
    var ncol = numVar + 3;
    var cell = new Array(ncol);
    var t    = new Array(numVar);
    var tn   = new Array(numVar);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";    
    row = table.insertRow(num++);
    row.style.height = "20px";

    // heading 
    for (j = 0; j < ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "80px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStr[133][langNum]// multidimension freq - cell 
    cell[0].style.width = "100px";
    for (j = 0; j < numVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[ncol-2].innerHTML = svgStr[16][langNum]; // frequency
    cell[ncol-1].innerHTML = "%";

    // frequency of each row
    for (k = 0; k < numVar; k++) tn[k] = 0;
    m = 0;
    while (tn[0] < mdvalueNum[0]) {
//console.log(m+" "+tn)
        for (k = 0; k < numVar; k++) t[k] = mdvalue[k][tn[k]];

        row = table.insertRow(num++);
        for (j = 0; j < ncol; j++) {
              cell[j] = row.insertCell(j);
              cell[j].style.border = "1px solid black";
              cell[j].style.width = "80px";
              cell[j].style.textAlign = "center";
        }
        cell[0].style.backgroundColor = "#eee";
        cell[0].innerHTML = (m+1).toString(); 
        for (j = 0; j < numVar; j++) cell[j+1].innerHTML = t[j];
        temp = 100 * freqDM[m] / tobs;
        cell[ncol-2].innerHTML = freqDM[m];
        cell[ncol-2].style.textAlign = "right";
        cell[ncol-2].style.backgroundColor = "#eee";
        cell[ncol-1].innerHTML = f2(temp);
        cell[ncol-1].style.backgroundColor = "#eee";
        cell[ncol-1].style.textAlign = "right";

        k = numVar-1;
        tn[k]++;
        if (tn[k] > mdvalueNum[k]-1) { 
          while (tn[k] > mdvalueNum[k]-1) {
               tn[k] = 0;
               k--;
               tn[k]++;
               if (k == 0) break;
          }
        }
        m++;
    }

    // footer
    row = table.insertRow(num++);
    for (j = 0; j < ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "80px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    cell[ncol-2].innerHTML = tobs;
    cell[ncol-1].innerHTML = f2(100);
    cell[ncol-2].style.textAlign = "right";
    cell[ncol-1].style.textAlign = "right";

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";

}

// Cross Table for Bar matrix ----------------------------------------------------------------
function crossTable(numVar) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var h, i, j, k, m, temp;
    var row;
    var num = 0;
    var ncol = 1;
    for (i = 0; i < numVar; i++) ncol += mdvalueNum[i];

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";

    // heading line 1
      row = table.insertRow(num++);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
      }
      temp = 1;
      for (k = 0; k < numVar; k++) {
        for (m = 0; m < mdvalueNum[k]; m++) {
          if (m == 0) {
//            cell[temp].colSpan = mdvalueNum[k];
            cell[temp].innerHTML = tdvarName[k];
          }
          temp++ 
        }
      }
      cell[0].rowSpan = 2;
      cell[0].innerHTML = svgStr[31][langNum];

    // heading line 2
      row = table.insertRow(num++);
      for (j = 0; j < ncol-1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
      }
      temp = 0;
      for (k = 0; k < numVar; k++) {
        for (m = 0; m < mdvalueNum[k]; m++) {
          cell[temp].innerHTML = mdvalue[k][m];
          temp++ 
        }
      }


    for (h = 0; h < numVar; h++) {
      for (k = 0; k < mdvalueNum[h]; k++) {
        row = table.insertRow(num++);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "center";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "80px";
        }
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.width = "120px";
        cell[0].innerHTML = tdvarName[h]+": "+mdvalue[h][k];
        temp = 1;
        for (i = 0; i < numVar; i++) {
          for (m = 0; m < mdvalueNum[i]; m++) {
              cell[temp].innerHTML = workD4[h][i][k][m];
              temp++ 
          }
        }
      }
      row = table.insertRow(num++);
      row.style.height = "10px";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";
}

// 막대그래프행렬 그리기 ----------------------------------------------------------------------------------------------
function drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable) {
    var i, j, k, m, tx, ty;
    var ii, jj, str, x1, y1, temp;
    var tfreqRatioV;
    var ngroup, ndvalue;  
    var py    = new Array(rowMax);
    var tdata = new Array(rowMax);
    var subWidth, subHeight;
    var labelWidth, labelGap, fontSize, fontGap;
    if (numVar <= 6) {labelWidth = 8; labelGap = 2*labelWidth; fontSize = "12px"; fontGap = labelWidth;}
    else if (numVar <= 12) {labelWidth = 6; labelGap = 1.5*labelWidth; fontSize = "10px"; fontGap = labelWidth;}
    else if (numVar <= 18) {labelWidth = 4; labelGap = 1.2*labelWidth; fontSize = "8px"; fontGap = labelWidth+1;}
    else if (numVar <= 24) {labelWidth = 3; labelGap = labelWidth; fontSize = "6px"; fontGap = labelWidth-1;}
    else {labelWidth = 2; labelGap = 0.9*labelWidth; fontSize = "4px"; fontGap = labelWidth+1;}
    margin = {
        top: 80,
        bottom: 50,
        left: 80,
        right: 80
    };

    graphWidth = svgWidth - margin.left - margin.right;
    graphHeight = svgHeight - margin.top - margin.bottom;
    subWidth = graphWidth / numVar;
    subHeight = graphHeight / numVar;
    var bufferLegend = 20;
    var betweenbarWidth; // 막대와 막대 사이의 너비
    var barWidth; // 막대의 너비
    var gapWidth; 

    chart.selectAll("*").remove();  // 전화면 제거

    // 주제목
    chart.append("text")
        .style("stroke", "black")
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("text-anchor", "middle")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2)
        .text(svgStr[129][langNum]+titleStr)
    // y제목
    for (i = 0; i < numVar; i++) {
        chart.append("text") // y 왼쪽
            .style("stroke", myColor[0])
            .style("font-size", fontSize)
            .style("font-family", "sans-seirf")
            .style("text-anchor", "end")
            .attr("x", margin.left - 5)
            .attr("y", margin.top + i * subHeight + subHeight / 2)
            .text(tdvarName[i])
    }
    // x제목
    for (j = 0; j < numVar; j++) {
        chart.append("text") // x 위에 
            .style("stroke", myColor[0])
            .style("font-size", fontSize)
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", margin.left + j * subWidth + subWidth / 2)
            .attr("y", margin.top - 10)
            .text(tdvarName[j])
    }
    var numcolor = 0;

    for (ii = 0; ii < numVar; ii++) {
      ngroup = mdvalueNum[ii];
      for (jj = 0; jj < numVar; jj++) {
          ndvalue = mdvalueNum[jj];
          for (k = 0; k < tobs; k++) {
                ydata[k] = Dtrain[ii][k];
                xdata[k] = Dtrain[jj][k];
          }
          twodimFreq(tobs, jj, ii, xdata, ydata, dim2Freq)
//console.log("ii="+ii+" jj="+jj+" ydata="+ydata+" xdata="+xdata)
//console.log(dim2Freq[0][0]+" "+dim2Freq[0][1])
//console.log(dim2Freq[1][0]+" "+dim2Freq[1][1])
//console.log(dim2Freq[2][0]+" "+dim2Freq[2][1])

          if (icrossTable == 1) {   // it is for crosstable output
            for (k = 0; k < ndvalue; k++) {
              for (m = 0; m < ngroup; m++) {
                workD4[ii][jj][m][k] = dim2Freq[k][m];
              }
            }
          }  
          tfreqRatioV = subHeight / freqMaxDM;
          betweenbarWidth = subWidth / ndvalue; // 막대와 막대 사이의 너비
          barWidth = betweenbarWidth * 0.6; // 막대의 너비
          gapWidth = betweenbarWidth * 0.2;

          // 그해프 행렬 박스
          tx = margin.left + jj * subWidth;
          ty = margin.top + ii * subHeight;
          chart.append("rect")
               .attr("x", tx)
               .attr("y", ty)
               .attr("width", subWidth)
               .attr("height", subHeight)
               .attr("fill", "white")
               .style("stroke", "black")
               .style("stroke-width", "1px")

          y1 = margin.top + subHeight;
          chart.append("line")
               .attr("x1", margin.left)
               .attr("x2", margin.left + subWidth)
               .attr("y1", y1)
               .attr("y2", y1)
               .style("stroke", "black")
          chart.append("line")
               .attr("x1", margin.left)
               .attr("x2", margin.left + subWidth)
               .attr("y1", margin.top)
               .attr("y2", margin.top)
               .style("stroke", "black")

          for (k = 0; k < ngroup; k++) {
              for (j = 0; j < ndvalue; j++) tdata[j] = dim2Freq[j][k];
// console.log("k="+k+" tdata[]="+tdata)
              if (k == 0) { // 첫 그룹의 막대
                for (j = 0; j < ndvalue; j++) {
                    py[j] = ty + subHeight - tdata[j] * tfreqRatioV
                    chart.append("rect")
                        .attr("class", "bar")
                        .style("fill", myColor[numcolor+k])
                        .attr("height", 0)
                        .attr("width", barWidth)
                        .attr("x", tx + gapWidth + j * betweenbarWidth)
                        .attr("y", ty + subHeight)
                        .transition() // 애니매이션 효과 지정
                        .delay(function(d, i) {
                            return i * 500;
                        }) // 0.5초마다 그리도록 대기시간 설정
                        .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
                        .attr("y", py[j])
                        .attr("height", tdata[j] * tfreqRatioV)
                } // endof j
              } 
              else { // 둘째 그룹 이하의 막대   
                for (j = 0; j < ndvalue; j++) {
                   chart.append("rect")
                        .attr("class", "bar")
                        .style("fill", myColor[numcolor+k])
                        .attr("height", 0)
                        .attr("width", barWidth)
                        .attr("x", tx + gapWidth + j * betweenbarWidth)
                        .attr("y", py[j])
                        .transition() // 애니매이션 효과 지정
                        .delay(function(d, i) {
                            return i * 500;
                        }) // 0.5초마다 그리도록 대기시간 설정
                        .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
                        .attr("y", py[j] - tdata[j] * tfreqRatioV)
                        .attr("height", tdata[j] * tfreqRatioV)
                   py[j] = py[j] - tdata[j] * tfreqRatioV;
                } // endof j
            } // endof else

            // 범례
            str = mdvalue[ii][k];
            chart.append("rect")
                .style("fill", myColor[numcolor+k])
                .attr("x", margin.left + graphWidth + bufferLegend - 5)
                .attr("y", ty + labelWidth + k * 2*labelWidth)
                .attr("width", labelWidth)
                .attr("height", labelWidth)
            chart.append("text")
                .style("font-size", fontSize)
                .style("font-family", "sans-seirf")
                .style("stroke", "black")
                .style("text-anchor", "start")
                .style("stroke", myColor[numcolor+k])
                .attr("x", margin.left + graphWidth + bufferLegend + 10)
                .attr("y", ty + labelWidth + k * 2*labelWidth + fontGap)
                .text(str);
          } // endof k
//console.log("ii="+ii+" jj="+jj+" tdata="+tdata)

      } // endof jj
      numcolor += ngroup;

    } // endof ii

    // x축 value label
    ty = margin.top + graphHeight + 15;
    for (jj = 0; jj < numVar; jj++) {
      tx = margin.left + jj*subWidth;
      betweenbarWidth = subWidth / mdvalueNum[jj]; // 막대와 막대 사이의 너비
      for (k = 0; k < mdvalueNum[jj]; k++) {
            str = mdvalue[jj][k];
            barWidth = betweenbarWidth * 0.6; // 막대의 너비
            gapWidth = betweenbarWidth * 0.2;
            temp = tx + (k+0.5)*betweenbarWidth;
            chart.append("text")
                .style("font-size", fontSize)
                .style("font-family", "sans-seirf")
                .style("stroke", "black")
                .style("text-anchor", "middle")
                .style("stroke", myColor[k])
                .attr("x", temp)
                .attr("y", ty)
                .text(str);
      } 
    }
}
// naive bayes classification -----------------------------------------------------------------
function naiveBayesClassification() {
    var i, j, k, m, g, ii, jj, temp, sum, tmax;

    ii = 0; 
    ngroup = mdvalueNum[ii];
    for (jj = 0; jj < numVar; jj++) {
          ndvalue = mdvalueNum[jj];
          for (k = 0; k < tobs; k++) {
            ydata[k] = Dtrain[ii][k];
            xdata[k] = Dtrain[jj][k];
          }
          twodimFreq(tobs, jj, ii, xdata, ydata, dim2Freq)
//console.log("ii="+ii+" jj="+jj+" ydata="+ydata+" xdata="+xdata)
//console.log(dim2Freq[0][0]+" "+dim2Freq[0][1])
//console.log(dim2Freq[1][0]+" "+dim2Freq[1][1])
//console.log(dim2Freq[2][0]+" "+dim2Freq[2][1])

          for (m = 0; m < ndvalue; m++) {
            for (g = 0; g < ngroup; g++) {
              likelihood[jj][m][g] = dim2Freq[m][g];
            }
          }

    } // endof jj

    // classify training data
    for (i = 0; i < ngroup+1; i++) {
      for (j = 0; j < ngroup+1; j++) {
        classTrain[i][j] = 0;
        classTest[i][j]   = 0;
      }
    }
    for (k = 0; k < tobs; k++) {
      sum = 0;
      for (g = 0; g < ngroup; g++) {
        temp = 1;
        for (jj = 1; jj < numVar; jj++) {
//console.log(Dtrain[jj][k]+" "+mdvalue[jj])
          for (m = 0; m < mdvalueNum[jj]; m++) {
              if (Dtrain[jj][k] == mdvalue[jj][m]) {
                temp = temp * likelihood[jj][m][g] / likelihood[0][g][g];
//console.log(Dtrain[jj][k]+" "+likelihood[jj][m][g]+" "+likelihood[0][g][g])
                break;
              }
          }
        }
        posterior[k][g] = prior[g] * temp;
        sum += posterior[k][g];
      } // endof g
      for (g = 0; g < ngroup; g++) {
        posterior[k][g] /= sum;
        posteriorPrintTrain[k][g] = posterior[k][g];
      } 
      tmax = posterior[k][0];
      ytrainH[k] = 0;
      for (g = 1; g < ngroup; g++) {
        if (posterior[k][g] > tmax) {
          tmax = posterior[k][g];
          ytrainH[k] = g;
        }
      } // endof g
      posteriorTrain[k] = tmax;
      yclassTrain[k]    = mdvalue[0][ytrainH[k]];
      classTrain[ytrainN[k]][ytrainH[k]]++;
//console.log(k+" "+ytrain[k]+" "+f3(posterior[k][0])+" "+f3(posterior[k][1]) +" "+ yclassTrain[k])
    } // endof k

    // classify testing data
    for (k = 0; k < testobs; k++) {
      sum = 0;
      for (g = 0; g < ngroup; g++) {
        temp = 1;
        for (jj = 1; jj < numVar; jj++) {
          for (m = 0; m < mdvalueNum[jj]; m++) {
              if (Dtest[jj][k] == mdvalue[jj][m]) {
              temp = temp * likelihood[jj][m][g] / likelihood[0][g][g];
//console.log(Dtest[jj][k]+" "+likelihood[jj][m][g])
              break;
            }
          }
        }
        posterior[k][g] = prior[g] * temp;
        sum += posterior[k][g];
      } // endof g
      for (g = 0; g < ngroup; g++) {
        posterior[k][g] /= sum;
        posteriorPrintTest[k][g] = posterior[k][g];
      }
      tmax = posterior[k][0];
      ytestH[k] = 0;
      for (g = 1; g < ngroup; g++) {
        if (posterior[k][g] > tmax) {
          tmax = posterior[k][g];
          ytestH[k] = g;
        }
      }
      posteriorTest[k] = tmax;
      yclassTest[k]    = mdvalue[0][ytestH[k]]
      classTest[ytestN[k]][ytestH[k]]++;
//console.log(k+" "+ytest[k]+" "+f3(posterior[k][0])+" "+f3(posterior[k][1]) +" "+ yclassTest[k])
    } // endof k

    // calcualte row and col sum of classification
    for (i = 0; i < ngroup; i++) {
      for (j = 0; j < ngroup; j++) {
        classTrain[i][ngroup] += classTrain[i][j];
        classTest[i][ngroup]  += classTest[i][j];
      }
      classTrain[ngroup][ngroup] += classTrain[i][ngroup];
      classTest[ngroup][ngroup]  += classTest[i][ngroup];
    }
    for (j = 0; j < ngroup; j++) {
      for (i = 0; i < ngroup; i++) {
        classTrain[ngroup][j] += classTrain[i][j];
        classTest[ngroup][j]  += classTest[i][j];
      }
    }

    // marginal freq of each variable
    for (jj = 1; jj < numVar; jj++) {
      likelihood[jj][mdvalueNum[jj]][ngroup] = 0;
      for (m = 0; m < mdvalueNum[jj]; m++) likelihood[jj][m][ngroup] = 0;
      for (g = 0; g < ngroup; g++) likelihood[jj][mdvalueNum[jj]][g] = 0;
    }
    for (jj = 1; jj < numVar; jj++) {
      for (m = 0; m < mdvalueNum[jj]; m++) {
        for (g = 0; g < ngroup; g++) {
           likelihood[jj][m][ngroup] += likelihood[jj][m][g];
        }
      }
      for (g = 0; g < ngroup; g++) {
        for (m = 0; m < mdvalueNum[jj]; m++) {
           likelihood[jj][mdvalueNum[jj]][g] += likelihood[jj][m][g];
//console.log(g+" "+m+" "+likelihood[jj][m][g]+" "+likelihood[jj][mdvalueNum[jj]][g])
        }
      }
      for (g = 0; g < ngroup; g++) likelihood[jj][mdvalueNum[jj]][ngroup] += likelihood[jj][mdvalueNum[jj]][g];
    }

   naiveBayesTable();
}

// naive Bayes clasification table
function naiveBayesTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, temp3, str1;
    var num = 0;
    var ncol = tnumVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";    

    // marginal distribution of training data
    for (i = 1; i < numVar; i++) {
      row = table.insertRow(num++);
      row.style.height = "20px";
      for (j = 0; j < ngroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "center";
      }  
      cell[0].innerHTML = "<b>"+tdvarName[i]+"</b> : "+svgStr[29][langNum]+"<br>"+svgStr[128][langNum]+"<br>"+svgStr[126][langNum]+"<br>"+svgStr[127][langNum]; //  svgStr[31][langNum] Cross table
      for (k = 0; k < ngroup; k++) { //  decision
        cell[k+1].innerHTML = svgStr[21][langNum]+"<br>"+tdvarName[0]+" : "+gdataValue[k]; //  decision
      }
      cell[ngroup+1].innerHTML = svgStrU[48][langNum]; // Total
      for (k = 0; k < mdvalueNum[i]; k++) {
        row = table.insertRow(num++);
        for (j = 0; j < ngroup+2; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "120px";
          cell[j].style.textAlign = "right";
        }
        cell[0].style.textAlign = "left";
        cell[0].style.backgroundColor = "#eee";
        cell[0].innerHTML = tdvarName[i]+" : "+mdvalue[i][k]; 
        for (j = 0; j < ngroup; j++) {
          temp1 = 100 * likelihood[i][k][j] / likelihood[i][ngroup][ngroup];
          temp2 = 100 * likelihood[i][k][j] / likelihood[i][k][ngroup];
          temp3 = 100 * likelihood[i][k][j] / likelihood[i][ngroup][k];
          cell[j+1].innerHTML = likelihood[i][k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %<br>"+f2(temp3)+" %"; 
        }
        temp1 = 100 * likelihood[i][k][ngroup] / likelihood[i][ngroup][ngroup];
        temp2 = 100 * likelihood[i][k][ngroup] / likelihood[i][k][ngroup];
        temp3 = 100 * likelihood[i][k][ngroup] / likelihood[i][ngroup][ngroup];
        cell[ngroup+1].style.backgroundColor = "#eee";
        cell[ngroup+1].innerHTML = likelihood[i][k][ngroup]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %<br>"+f2(temp3)+" %";  // Total
      }
      row = table.insertRow(num++);
      for (j = 0; j < ngroup+2; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "120px";
          cell[j].style.textAlign = "right";
          cell[j].style.backgroundColor = "#eee";
      }
      cell[0].style.textAlign = "left";
      cell[0].innerHTML = svgStrU[48][langNum]; 
      for (j = 0; j < ngroup; j++) {
          temp1 = 100 * likelihood[i][mdvalueNum[i]][j] / likelihood[i][mdvalueNum[i]][ngroup];
          cell[j+1].innerHTML = likelihood[i][mdvalueNum[i]][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; 
      }
      cell[ngroup+1].style.backgroundColor = "#eee";
      cell[ngroup+1].innerHTML = likelihood[i][mdvalueNum[i]][ngroup]+"<br>"+f2(100)+" %<br>"+f2(100)+" %<br>"+f2(100)+" %"; // Total
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";
}


// lift chart
function liftChart(tobs, testobs) {
  var i, j, k, temp0, temp1, dataCategory;
  dataCategory = Math.round(tobs / numResponseCategory);
  for (i = 0; i < tobs; i++) {
    yyposteriorTrain[i][0] = yydataN[i];
    yyposteriorTrain[i][1] = posterior[i][0];
  }
  // sort by posterior in descending
  for (i = 0; i < tobs-1; i++) {
    for (j = i+1; j < tobs; j++) {
      if (yyposteriorTrain[j][1] > yyposteriorTrain[i][1]) {
        temp0 = yyposteriorTrain[i][0];
        temp1 = yyposteriorTrain[i][1];
        yyposteriorTrain[i][0] = yyposteriorTrain[j][0];
        yyposteriorTrain[i][1] = yyposteriorTrain[j][1];
        yyposteriorTrain[j][0] = temp0;
        yyposteriorTrain[j][1] = temp1;
      }
    }
  }
  // response rate
  for (k = 0; k < numResponseCategory; k++) {
    responseTrain[k][0] = k*10;
    responseTrain[k][1] = 0;
    responseTrain[k][2] = 0;
  }
  k = -1;
  for (i = 0; i < tobs; i++) {
// console.log("i="+i+" "+yyposteriorTrain[i][0]+" "+ yyposteriorTrain[i][1]);
    if ( (i % dataCategory) == 0) k++; 
    responseTrain[k][1]++; // num of data
    if (yyposteriorTrain[i][0] == 0) responseTrain[k][2]++ ; // num of group 1 data
  }
  responseTrain[0][3] = responseTrain[0][1]; // cumulated num of data
  responseTrain[0][4] = responseTrain[0][2]; // cumulated num of group 1 data
  for (k = 1; k < numResponseCategory; k++) {
    responseTrain[k][3] = responseTrain[k-1][3] + responseTrain[k][1]; // cumulated num of data
    responseTrain[k][4] = responseTrain[k-1][4] + responseTrain[k][2]; // cumulated num of group 1 data
  }
  temp0 = responseTrain[numResponseCategory-1][4] / responseTrain[numResponseCategory-1][3];
  for (k = 0; k < numResponseCategory; k++) {
    responseTrain[k][5] = temp0; // base response
    responseTrain[k][6] = responseTrain[k][2] / responseTrain[k][1]; // response
    responseTrain[k][7] = responseTrain[k][4] / responseTrain[k][3]; // cumulated response 
    responseTrain[k][8] = responseTrain[k][6] / temp0; // lift
// console.log("k="+k +" "+responseTrain[k][0] +" "+responseTrain[k][1]+ " " + responseTrain[k][2]+ " " + responseTrain[k][3]+ " " + responseTrain[k][4]+" "+responseTrain[k][5] +" "+responseTrain[k][6]+ " " + responseTrain[k][7]+ " " + responseTrain[k][8])
  }
}

// confusion matrix
function confusion(tobs, testobs) {
  var i, j, k, temp0, temp1, cdataCategory;
  // confusion matrix
  for (k = 0; k < numConfusionCategory+1; k++) {
    confusionTrain[k][0] = k / numConfusionCategory;
    for (j = 1; j <= 4; j++) confusionTrain[k][j] = 0;
  }
  // count f11, f12, f21, f22
  for (k = 0; k < numConfusionCategory+1; k++) {
    for (i = 0; i < tobs; i++) {
      if (yydataN[i] == 0 && posterior[i][0] > confusionTrain[k][0])       confusionTrain[k][1]++;
      else if (yydataN[i] == 0 && posterior[i][0] <= confusionTrain[k][0]) confusionTrain[k][2]++;
      else if (yydataN[i] == 1 && posterior[i][0] > confusionTrain[k][0])  confusionTrain[k][3]++;
      else confusionTrain[k][4]++;
// console.log(confusionTrain[k][0]+" i="+i+" "+yydataN[i]+" "+f2(posterior[i][0]) +" "+confusionTrain[k][1]+ " " + confusionTrain[k][2]+ " " + confusionTrain[k][3]+ " " + confusionTrain[k][4] ) 
    }
    confusionTrain[k][5] = (confusionTrain[k][1] + confusionTrain[k][4]) / tobs; // accuracy
    confusionTrain[k][6] = confusionTrain[k][1] / (confusionTrain[k][1] + confusionTrain[k][2]); // sensitivity
    confusionTrain[k][7] = confusionTrain[k][4] / (confusionTrain[k][3] + confusionTrain[k][4]); // specificity
// console.log("k="+k +" "+f2(confusionTrain[k][0]) +" "+confusionTrain[k][1]+ " " + confusionTrain[k][2]+ " " + confusionTrain[k][3]+ " " + confusionTrain[k][4]+ " " + f2(confusionTrain[k][5])+ " " + f2(confusionTrain[k][6])+ " " + f2(confusionTrain[k][7]))
  }
}

// ROC chart
function roc(tobs, testobs) {
  var i, j, k, temp0, temp1;
  for (i = 0; i < tobs; i++) {
    yyposteriorTrain[i][0] = yydataN[i];
    yyposteriorTrain[i][1] = posterior[i][0];
  }
  // sort by posterior in ascending
  for (i = 0; i < tobs-1; i++) {
    for (j = i+1; j < tobs; j++) {
      if (yyposteriorTrain[j][1] < yyposteriorTrain[i][1]) {
        temp0 = yyposteriorTrain[i][0];
        temp1 = yyposteriorTrain[i][1];
        yyposteriorTrain[i][0] = yyposteriorTrain[j][0];
        yyposteriorTrain[i][1] = yyposteriorTrain[j][1];
        yyposteriorTrain[j][0] = temp0;
        yyposteriorTrain[j][1] = temp1;
      }
    }
  }
  // table for ROC chart
  for (i = 0; i < tobs+1; i++) {
    rocTrain[i][0] = yyposteriorTrain[i][0];
    rocTrain[i][1] = yyposteriorTrain[i][1];
    for (j = 2; j <= 5; j++) rocTrain[i][j] = 0;
  }
  // count f11, f12, f21, f22
  // 모든 데이터를 0 집단으로 분류해 rocTrain[0]에 결과 저장
  for (k = 0; k < tobs; k++) {
    if (rocTrain[k][0] == 0) {rocTrain[0][2]++;}  // f00
    else {rocTrain[0][4]++;}  // f10
  }
  rocTrain[0][3] = 0; // f01
  rocTrain[0][5] = 0; // f11 
  rocTrain[0][6] = rocTrain[0][2] / (rocTrain[0][2] + rocTrain[0][3]); // sensitivity, TPR
  rocTrain[0][7] = rocTrain[0][4] / (rocTrain[0][4] + rocTrain[0][5]); // 1 - specificity, FPR
// console.log("i=0"+" "+rocTrain[0][0]+" "+f2(rocTrain[0][1])+ " " + rocTrain[0][2]+ " " + rocTrain[0][3]+ " " + rocTrain[0][4]+ " " + rocTrain[0][5]+ " " + f2(rocTrain[0][6])+ " " + f2(rocTrain[0][7]))
  // 각 데이터 [i]를 포함하여 왼쪽은 1, 오른쪽은 0 집단으로 분류해 rocTrain[i]에 결과 저장
  for (i = 0; i < tobs; i++) {
    for (k = 0; k <=i; k++) {
      if (rocTrain[k][0] == 0) {rocTrain[i+1][3]++;}  // f01
      else {rocTrain[i+1][5]++;} // f11
    }
    for (k = i+1; k < tobs; k++) {
      if (rocTrain[k][0] == 0) {rocTrain[i+1][2]++;}  // f00
      else {rocTrain[i+1][4]++;}  // f10
    }
    rocTrain[i+1][6] = rocTrain[i+1][2] / (rocTrain[i+1][2] + rocTrain[i+1][3]); // sensitivity, TPR
    rocTrain[i+1][7] = rocTrain[i+1][4] / (rocTrain[i+1][4] + rocTrain[i+1][5]); // 1 - specificity, FPR
// console.log("i="+(i+1).toString()+" "+rocTrain[i][0]+" "+f2(rocTrain[i][1])+ " " + rocTrain[i+1][2]+ " " + rocTrain[i+1][3]+ " " + rocTrain[i+1][4]+ " " + rocTrain[i+1][5]+ " " + f2(rocTrain[i+1][6])+ " " + f2(rocTrain[i+1][7]))
  }
}

// Draw Lift Chart
function drawLiftChart() {
    chart.selectAll("*").remove();  // 전화면 제거
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var nrow = numResponseCategory + 1;
    var betweenbarWidth = graphWidth / (nrow - 1); // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = 1;
    var freqMin  = 0;
    var tbuffer  = (freqMax - freqMin) * 0.05;
    freqMax = freqMax + tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = "Lift chart for training data"; 
    var yTitle = "1st group response rate"; 
    var xTitle = "data group (upper data %)";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisBayesChart(freqMin, freqMax);

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    for (j = 0; j < numResponseCategory; j++) {
        x1 = margin.left + gapWidth + j*betweenbarWidth;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        str = (responseTrain[j][0]+10)+"%";
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "12px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(str)
    }
    // line graph for response
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - responseTrain[0][6] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=1; i<numResponseCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - responseTrain[i][6] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 20;
      chart.append("circle").style("fill", "blue").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "blue").style("text-anchor", "begin")
           .text("response")

    // line graph for cumulated response
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - responseTrain[0][7] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "red")
      for (i=1; i<numResponseCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - responseTrain[i][7] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "red")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 40;
      chart.append("circle").style("fill", "red").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "red").style("text-anchor", "begin")
           .text("cum response")

    // line graph for baseline response
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - responseTrain[0][5] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "limegreen")
      for (i=1; i<numResponseCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - responseTrain[i][5] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "limegreen")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "limegreen")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 60;
      chart.append("circle").style("fill", "limegreen").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "limegreen").style("text-anchor", "begin")
           .text("base response")

}

// Draw confusion matrix
function drawConfusion() {
    chart.selectAll("*").remove();  // 전화면 제거
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var nrow = numConfusionCategory + 1;
    var betweenbarWidth = graphWidth / (nrow - 1); // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = 1;
    var freqMin  = 0;
    var tbuffer  = (freqMax - freqMin) * 0.05;
    freqMax = freqMax + tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = "Confusion matrix for training data"; 
    var yTitle = "rate"; 
    var xTitle = "posterior probability cut point";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisBayesChart(freqMin, freqMax);

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    for (j = 0; j < numConfusionCategory; j++) {
        x1 = margin.left + gapWidth + j*betweenbarWidth;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "12px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(confusionTrain[j][0])
    }
    // line graph for accuracy
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - confusionTrain[0][5] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=1; i<numConfusionCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - confusionTrain[i][5] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 20;
      chart.append("circle").style("fill", "blue").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "blue").style("text-anchor", "begin")
           .text("accuracy")

    // line graph for cumulated response
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - confusionTrain[0][6] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "red")
      for (i=1; i<numConfusionCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - confusionTrain[i][6] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "red")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 40;
      chart.append("circle").style("fill", "red").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "red").style("text-anchor", "begin")
           .text("sensitivity")

    // line graph for baseline response
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - confusionTrain[0][7] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "limegreen")
      for (i=1; i<numConfusionCategory; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - confusionTrain[i][7] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "limegreen")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "limegreen")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 60;
      chart.append("circle").style("fill", "limegreen").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "limegreen").style("text-anchor", "begin")
           .text("specificity")
}

// Draw ROC curve
function drawROC() {
    chart.selectAll("*").remove();  // 전화면 제거
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy, temp;
    var nrow = tobs+1;
    var betweenbarWidth = graphWidth / (nrow - 1); // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = 1;
    var freqMin  = 0;
    var tbuffer  = (freqMax - freqMin) * 0.05;
    freqMax = freqMax + tbuffer;
//    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = "Receiver operating characteric (ROC) plot for training data"; 
    var yTitle = "true positive rate (TPR)"; 
    var xTitle = "false positive rate (FPR: 1 - specificity)";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
         .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisBayesChart(freqMin, freqMax);

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    temp = (graphWidth - 2*gapWidth) / 10;
    for (j = 0; j < 11; j++) {
        x1 = margin.left + gapWidth + j*temp;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        str = f2(j/10).toString();
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "12px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(str)
    }
    // ROC graph
      temp = (1/freqMax)*graphHeight; // actual graph height
      x1 = margin.left + gapWidth + rocTrain[0][7]*(graphWidth - betweenbarWidth);
      y1 = margin.top + graphHeight - rocTrain[0][6] * temp ; 
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=0; i<=tobs; i++) {
        x2 = margin.left + gapWidth + rocTrain[i][7]*(graphWidth - betweenbarWidth);
        y2 = margin.top + graphHeight - rocTrain[i][6]*temp;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 20;
      chart.append("circle").style("fill", "blue").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "blue").style("text-anchor", "begin")
           .text("ROC")

      // line graph for baseline response (0,0) - (1,1)
      // (1,1)
      x1 = margin.left + graphWidth - gapWidth;
      y1 = margin.top + graphHeight - temp; 
      // (0,0) 
      x2 = margin.left + gapWidth;
      y2 = margin.top + graphHeight;
      chart.append("line").attr("class", "line")
           .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
           .style("stroke", "limegreen")
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 40;
      chart.append("circle").style("fill", "limegreen").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "limegreen").style("text-anchor", "begin")
           .text("baseline")
}

// line그래프 축 그리기
function drawAxisBayesChart(freqMin, freqMax) {
    var i, j, tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);
    yScale = d3.scaleLinear().domain([freqMin, freqMax]).range([graphHeight, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("transform", "translate(" + tx + "," + ty + ")")
         .call(d3.axisLeft(yScale)) // 눈금을 표시할 함수 호출
    // Y축 그리드
    for (i = 0; i < ygrid.length; i++) {
      ty = margin.top + yScale(ygrid[i]);
      chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
    }
    // left y축
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left)
                    .attr("x2", margin.left)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
    // right y축
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left + graphWidth)
                    .attr("x2", margin.left + graphWidth)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")

/*
        tx = margin.left + graphWidth;
        chart.append("g")
             .attr("transform","translate("+tx+","+ty+")")
             .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출
*/
}

// Lift chart table
function liftTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = 10;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // title
    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].colSpan = "2";
    cell[0].innerHTML = "<h3>Lift Table<h3>";
    // heading
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.width = "50px";
    cell[1].style.width = "100px";
    cell[0].innerHTML = "number";
    cell[1].innerHTML = "Data category<br>upper %";
    cell[2].innerHTML = "Number of data";
    cell[3].innerHTML = "Number of 1st group";
    cell[4].innerHTML = "Cumulated num. of data";
    cell[5].innerHTML = "Cumulated num. of 1st group";
    cell[6].innerHTML = "% Captured";
    cell[7].innerHTML = "% Response";
    cell[8].innerHTML = "Cumulated % response";
    cell[9].innerHTML = "Lift";
    // response
    for (i = 0; i < 10; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        temp = "( "+(responseTrain[i][0]).toString()+" , "+(responseTrain[i][0]+10).toString()+" % ]";
        cell[1].innerHTML = temp;
        for (j = 1; j < 5; j++) cell[j+1].innerHTML = responseTrain[i][j];
        cell[6].innerHTML = f2(100*responseTrain[i][2]/responseTrain[i][1])+"%";
        for (j = 6; j < 9; j++) cell[j+1].innerHTML = f2(100*responseTrain[i][j])+"%";
        cell[9].innerHTML = f2(responseTrain[i][8]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// confusion matrix table
function confusionTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = 10;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // title
    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].colSpan = "2";
    cell[0].innerHTML = "<h3>Confusion Matrix<h3>";
    // heading
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.width = "50px";
    cell[1].style.width = "100px";
    cell[0].innerHTML = "number";
    cell[1].innerHTML = "Posterior probability cut-off";
    cell[2].innerHTML = "Number of data";
    cell[3].innerHTML = "f<sub>11</sub>";
    cell[4].innerHTML = "f<sub>12</sub>";
    cell[5].innerHTML = "f<sub>21</sub>";
    cell[6].innerHTML = "f<sub>22</sub>";
    cell[7].innerHTML = "Accuracy";
    cell[8].innerHTML = "Sensitivity";
    cell[9].innerHTML = "Specificity";
    // classification
    for (i = 0; i < 11; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
//        temp = "( "+(f2(confusionTrain[i][0])).toString()+" , "+(f2(confusionTrain[i][0]+0.1)).toString()+" ]";
        cell[1].innerHTML = f2(confusionTrain[i][0]).toString();
        cell[2].innerHTML = tobs;
        for (j = 1; j < 5; j++) cell[j+2].innerHTML = confusionTrain[i][j];
        for (j = 5; j < 8; j++) cell[j+2].innerHTML = f3(confusionTrain[i][j]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// confusion matrix table
function rocTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = 9;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // title
    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].colSpan = "2";
    cell[0].innerHTML = "<h3>ROC Table<h3>";
    // heading
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.width = "50px";
    cell[0].innerHTML = "number";
    cell[1].innerHTML = "Group";
    cell[2].innerHTML = "Posterior probability";
    cell[3].innerHTML = "f<sub>11</sub>";
    cell[4].innerHTML = "f<sub>12</sub>";
    cell[5].innerHTML = "f<sub>21</sub>";
    cell[6].innerHTML = "f<sub>22</sub>";
    cell[7].innerHTML = "TPR";
    cell[8].innerHTML = "FPR";
    // classification
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = 0;
    for (j = 2; j < 6; j++) cell[j+1].innerHTML = rocTrain[0][j];
    for (j = 6; j < 8; j++) cell[j+1].innerHTML = f3(rocTrain[0][j]);
    for (i = 1; i <= tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i;
        cell[1].innerHTML = gdataValue[rocTrain[i-1][0]];
        cell[2].innerHTML = f3(rocTrain[i-1][1]);
        for (j = 2; j < 6; j++) cell[j+1].innerHTML = rocTrain[i][j];
        for (j = 6; j < 8; j++) cell[j+1].innerHTML = f3(rocTrain[i][j]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// 산점도행렬 by Group그리기 ----------------------------------------------------------------------------------------------
function drawScatterMatrixByGroup(tnumVar,svarName, tobs, ngroup, gdataValue, linearFunction) {
    var i, j, k, m, p, q, tx, ty, str1, str2;
    var subWidth, subHeight;
    var temp, tempx, tempy, tempw, temph, xstep, maxNormal;
    var tminy, tmaxy;
    var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax, tobs;
    var tstat = new Array(20);
    var tdata = new Array(rowMax);
    var dataValueH = new Array(rowMax);
    var ninterval = 101;
    margin = {
        top: 80,
        bottom: 50,
        left: 80,
        right: 80
    };

    // 히스토그램 bins    
    nvalueH = 17;
    graphWidth = svgWidth - margin.left - margin.right;
    graphHeight = svgHeight - margin.top - margin.bottom;
    subWidth = graphWidth / tnumVar;
    subHeight = graphHeight / tnumVar;
    var bufferLegend = 20;
    // 산점도 label
    var labelWidth, labelGap, fontSize, fontGap, dotSize;
    if (numVar <= 6) {labelWidth = 8; labelGap = 2*labelWidth; fontSize = "12px"; fontGap = labelWidth; dotSize = "4px";}
    else if (numVar <= 12) {labelWidth = 6; labelGap = 1.5*labelWidth; fontSize = "10px"; fontGap = labelWidth; dotSize = "3px";}
    else if (numVar <= 18) {labelWidth = 4; labelGap = 1.2*labelWidth; fontSize = "8px"; fontGap = labelWidth+1; dotSize = "2px";}
    else {labelWidth = 2; labelGap = labelWidth; fontSize = "4px"; fontGap = labelWidth+1; dotSize = "2px";}

    chart.selectAll("*").remove();  // 전화면 제거
    // 주제목
    chart.append("text")
        .style("stroke", "black")
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("text-anchor", "middle")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2)
        .text(svgStr[89][langNum]+titleStr)
    // y제목
    for (i = 0; i < tnumVar; i++) {
        chart.append("text") // y 왼쪽
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "end")
            .attr("x", margin.left - 5)
            .attr("y", margin.top + i * subHeight + subHeight / 2)
            .text(svarName[i])
        if (ngroup == 1) {
          chart.append("text") // y 오른쪽
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "start")
            .attr("x", margin.left + graphWidth + 5)
            .attr("y", margin.top + i * subHeight + subHeight / 2)
            .text(svarName[i])
        }
        else { // 범례
          for (k = 0; k < ngroup; k++) {
           ty = margin.top + i * subHeight;
           str1 = gdataValue[k];
           if (ngroup == 1) str2 = myColor[0];
           else str2 = myColor[k];
           chart.append("rect")
                .style("fill", str2)
                .attr("x", margin.left + graphWidth + bufferLegend - 5)
                .attr("y", ty + labelWidth + k*2*labelWidth)
                .attr("width", labelWidth)
                .attr("height", labelWidth)
            chart.append("text")
                .style("font-size", fontSize)
                .style("font-family", "sans-seirf")
                .style("stroke", "black")
                .style("text-anchor", "start")
                .style("stroke",str2)
                .attr("x", margin.left + graphWidth + bufferLegend + 10)
                .attr("y", ty + labelWidth + k*2*labelWidth + fontGap)
                .text(str1);
         }
       }
    }
 
    // x제목
    for (j = 0; j < tnumVar; j++) {
        chart.append("text") // x 아래
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", margin.left + j * subWidth + subWidth / 2)
            .attr("y", margin.top + graphHeight + 15)
            .text(svarName[j])
        chart.append("text") // x 위에 
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", margin.left + j * subWidth + subWidth / 2)
            .attr("y", margin.top - 10)
            .text(svarName[j])
    }
    // scatterplot matrix
    for (i = 0; i < tnumVar; i++) {
        for (k = 0; k < tobs; k++) ydata[k] = parseFloat(Dtrain[i][k]);
        ymin = gmin(tobs, ydata);
        ymax = gmax(tobs, ydata);
        ybuffer = (ymax - ymin) / 3; // 경계점이 보이기위한 완충거리
        gymin = ymin - ybuffer;
        gymax = ymax + ybuffer;
        gyrange = gymax - gymin;
        for (j = 0; j < tnumVar; j++) {
            for (k = 0; k < tobs; k++) xdata[k] = parseFloat(Dtrain[j][k]);
            // 그래프 화면 정의 
            xmin = gmin(tobs, xdata);
            xmax = gmax(tobs, xdata);
            xbuffer = (xmax - xmin) / 5; // 경계점이 보이기위한 완충거리
            gxmin = xmin - xbuffer;
            gxmax = xmax + xbuffer;
            gxrange = gxmax - gxmin;
            // 산점도 행렬 박스
            tx = margin.left + i * subWidth;
            ty = margin.top + j * subHeight;
            chart.append("rect")
                .attr("x", tx)
                .attr("y", ty)
                .attr("width", subWidth)
                .attr("height", subHeight)
                .attr("fill", "white")
                .style("stroke", "black")
                .style("stroke-width", "1px")

            if (i == j) { // 히스토그램
                TotalStat(tobs, xdata, tstat);
                // 히스토그램 bins    
                gxminH = tstat[1] - 4 * tstat[2];
                gxmaxH = tstat[1] + 4 * tstat[2];
                gxrangeH = gxmaxH - gxminH;
                xstep = (gxmaxH - gxminH) / (nvalueH - 1);
                for (m = 0; m < nvalueH + 1; m++) {
                    dataValueH[m] = gxminH + m * xstep;
                }
                // 구간별 도수구하기
                for (m = 1; m < nvalueH; m++) tdata[m] = 0;
                for (k = 0; k < tobs; k++) {
                    for (m = 1; m < nvalueH; m++) {
                        if (xdata[k] < dataValueH[m]) {
                            tdata[m]++;
                            break;
                        }
                    } // endof m
                } // endof k
                freqmax = 0;
                for (m = 1; m < nvalueH; m++) { // 최대도수
                    if (tdata[m] > freqmax) freqmax = tdata[m];
                }
                gyminH = 0;
                gymaxH = freqmax / (tobs * xstep); // 확률 히스토그램 높이
                maxNormal = 1 / (tstat[2] * Math.sqrt(2 * Math.PI))
//                maxNormal = 1 / (std[0] * Math.sqrt(2 * Math.PI))
                if (maxNormal > gymaxH) gymaxH = maxNormal;
                gymaxH = gymaxH + (gymaxH / 8);
                gyrangeH = gymaxH - gyminH;
                // 정규성 검정을 위한 히스토그램
                for (m = 0; m < nvalueH - 1; m++) {
                    temp = tdata[m + 1] / (tobs * xstep);
                    tempx = tx + subWidth * (dataValueH[m] - gxminH) / gxrangeH;
                    tempy = ty + subHeight - subHeight * (temp - gyminH) / gyrangeH;
                    tempw = subWidth * xstep / gxrangeH;
                    temph = subHeight * (temp - gyminH) / gyrangeH;
                    chart.append("rect")
                        .style("fill", myColor[i * tnumVar + j])
                        .style("fill", myColor[i * tnumVar + j])
                        .attr("class", "bar")
                        .style("stroke", "black")
                        .style("stroke-width", "1px")
                        .attr("x", tempx)
                        .attr("y", tempy)
                        .attr("width", tempw)
                        .attr("height", temph)
                } // endof m
                // Normal curve
                var step = (dataValueH[nvalueH - 1] - dataValueH[0]) / ninterval;
                tx1 = dataValueH[0];
                ty1 = normal_pdf(tstat[1], tstat[2], tx1);
                gx1 = tx + subWidth * (tx1 - gxminH) / gxrangeH;
                gy1 = ty + subHeight - subHeight * (ty1 - gyminH) / gyrangeH;
                for (k = 1; k < ninterval; k++) {
                    tx2 = tx1 + step;
                    ty2 = normal_pdf(tstat[1], tstat[2], tx2);
                    gx2 = tx + subWidth * (tx2 - gxminH) / gxrangeH;
                    gy2 = ty + subHeight - subHeight * (ty2 - gyminH) / gyrangeH;
                    chart.append("line")
                        .attr("x1", gx1)
                        .attr("x2", gx2)
                        .attr("y1", gy1)
                        .attr("y2", gy2)
                        .style("stroke", "red")
                    tx1 = tx2;
                    ty1 = ty2;
                    gx1 = gx2;
                    gy1 = gy2;
                } // endof k
            } else { // 산점도
                for (k = 0; k < tobs; k++) {
                    str1 = "(" + xdata[k] + "," + ydata[k] + ")";
                    if (ngroup == 1) str2 = myColor[0];
                    else str2 = myColor[ytrainN[k]];
                    chart.append("circle")
                        .attr("data-sheetrowid", k)
                        .attr("class", "datapoint")
                        .style("fill", str2)
                        .style("stroke", "black")
                        .attr("r", dotSize)
                        .attr("cx", tx + subWidth * (xdata[k] - gxmin) / gxrange)
                        .attr("cy", ty + subHeight - subHeight * (ydata[k] - gymin) / gyrange)
                        .append("title")
                        .text(str1)
                } // endof k
                if (linearFunction == 1) { // draw classification function
                  tminy = -(Bcoeff[0][1][j]*xmin + Bcoeff[0][1][2]) / Bcoeff[0][1][i];
                  temp = gxrange / 20;
                  while ( (tminy > gymax || tminy < gymin) && xmin < xmax) {
                     xmin += temp;
                     tminy = -(Bcoeff[0][1][j]*xmin + Bcoeff[0][1][2]) / Bcoeff[0][1][i];
                  }
                  tmaxy = -(Bcoeff[0][1][j]*xmax + Bcoeff[0][1][2]) / Bcoeff[0][1][i];
                  while ( (tmaxy > gymax || tmaxy < gymin) && xmax > xmin) {
                     xmax -= temp;
                     tmaxy = -(Bcoeff[0][1][j]*xmax + Bcoeff[0][1][2]) / Bcoeff[0][1][i];
                  }

                  x1    = tx + subWidth * (xmin - gxmin) / gxrange;
                  x2    = tx + subWidth * (xmax - gxmin) / gxrange;
                  y1    = ty + subHeight - subHeight * (tminy - gymin) / gyrange;
                  y2    = ty + subHeight - subHeight * (tmaxy - gymin) / gyrange;
                  chart.append("line")
                       .attr("x1",x1)
                       .attr("y1",y1)
                       .attr("x2",x2)
                       .attr("y2",y2)
                       .style("stroke","red")
                }
            }
        } // endof j
    } // endof i
}

// parallel graph by Group그리기 ----------------------------------------------------------------------------------------------
function parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue) {
    var i, j, k, tx, ty, x1, y1, x2, y2, str1, str2;
    var subWidth, subHeight, tempy;
    var ymin   = new Array(colMax);
    var ymax   = new Array(colMax)
    var yrange = new Array(colMax)

    margin = {
        top: 80,
        bottom: 50,
        left: 40,
        right: 80
    };

    var bufferLegend = 20;
    var bufferx = 40;
    var buffery = 30;
    graphWidth  = svgWidth - margin.left - margin.right;
    graphHeight = svgHeight - margin.top - margin.bottom;
    subWidth    = (graphWidth - 2*bufferx) / (tnumVar-1);
    subHeight   = graphHeight - 2*buffery;

    chart.selectAll("*").remove();  // 전화면 제거
    // 주제목
    chart.append("text")
        .style("stroke", "black")
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("text-anchor", "middle")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2)
        .text(svgStrU[141][langNum]+titleStr)
    // 범례
    if (ngroup > 1) {
        for (k = 0; k < ngroup; k++) {
           ty = margin.top;
           str1 = gdataValue[k];
           str2 = myColor[k];
           chart.append("rect")
                .style("fill", str2)
                .attr("x", margin.left + graphWidth + bufferLegend - 5)
                .attr("y", ty + 20 + k * 20)
                .attr("width", 8)
                .attr("height", 8)
            chart.append("text")
                .style("font-size", "12px")
                .style("font-family", "sans-seirf")
                .style("stroke", "black")
                .style("text-anchor", "start")
                .style("stroke",str2)
                .attr("x", margin.left + graphWidth + bufferLegend + 10)
                .attr("y", ty + 20 + k * 20 + 10)
                .text(str1);
        }
    }

    // x제목
    for (j = 0; j < tnumVar; j++) {
        tx = margin.left + bufferx + j * subWidth;
        chart.append("text") // x 아래
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", tx)
            .attr("y", margin.top + graphHeight + 15)
            .text(svarName[j])
        chart.append("text") // x 위에 
            .style("stroke", myColor[0])
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", tx)
            .attr("y", margin.top - 10)
            .text(svarName[j])
    }
    // 전체 그래프 사각형
        chart.append("rect")
             .attr("x",margin.left)
             .attr("y",margin.top)
             .attr("width",graphWidth)
             .attr("height",graphHeight)
             .attr("fill", "white")
             .style("stroke", "black")
             .style("stroke-width", "1px")

    // y parallel line for each variable
    // find min and max of each variable
    for (j = 0; j < tnumVar; j++) {
      for (k = 0; k < tobs; k++) {
        ydata[k] = parseFloat(Dtrain[j][k]);
      }
      ymin[j] = gmin(tobs, ydata);
      ymax[j] = gmax(tobs, ydata);
      yrange[j] = ymax[j] - ymin[j];
    }
    for (j = 0; j < tnumVar; j++) {
        x1 = margin.left + bufferx + j * subWidth;
        y1 = margin.top  + buffery;
        y2 = margin.top  + graphHeight - buffery;
        chart.append("line")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x1)
             .attr("y2",y2)
             .style("stroke",myColor[0]) 
        chart.append("text") // y 왼쪽
            .style("stroke", "black")
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", x1)
            .attr("y", y2+10)
            .text(f2(ymin[j]))
        chart.append("text") // y 왼쪽
            .style("stroke", "black")
            .style("font-size", "8px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "middle")
            .attr("x", x1)
            .attr("y", y1-10)
            .text(f2(ymax[j]))
    }

    tempy = graphHeight - 2*buffery;  // 그래프 y width
    for (k = 0; k < tobs; k++) {
        if (ngroup == 1) str2 = myColor[0];
        else str2 = myColor[ytrainN[k]];
        x1 = margin.left + bufferx;
        y1 = margin.top + graphHeight - buffery - tempy * (parseFloat(Dtrain[0][k]) - ymin[0]) / yrange[0];
        for (j = 1; j < tnumVar; j++) {
            x2 = margin.left + bufferx + j * subWidth;
            y2 = margin.top + graphHeight - buffery - tempy * (parseFloat(Dtrain[j][k]) - ymin[j]) / yrange[j];
            chart.append("line")
                 .attr("x1",x1)
                 .attr("y1",y1)
                 .attr("x2",x2)
                 .attr("y2",y2)
                 .style("stroke",str2)
            x1 = x2;
            y1 = y2;
        } // endof j
    } // endof k

}

// Statistics for array in tdata[i], i=0,..,tobs-1 
function TotalStat(tobs, tdata, tstat) {
    var i, j;
    var sum, sqsum, tavg, tvarn, tvarnm1, tstdn, tstdnm1, tmini, tQ1, tmedian, tQ3, tmaxi;
    var dataA = new Array(tobs);
    // sorting
    for (i = 0; i < tobs; i++) dataA[i] = tdata[i];
    for (i = 0; i < tobs - 1; i++) {
        for (j = i; j < tobs; j++) {
            if (dataA[i] > dataA[j]) {
                temp = dataA[i];
                dataA[i] = dataA[j];
                dataA[j] = temp;
            }
        }
    }    
    for (i = 0; i < tobs; i++) dataA[i] = parseFloat(dataA[i]);

    sum = dataA[0];
    for (i = 1; i < tobs; i++) {
        sum += dataA[i];
    }
    if (tobs == 0) tavg = NaN;
    else tavg = sum / tobs;
    sqsum = 0;
    for (i = 0; i < tobs; i++) {
        temp = dataA[i] - tavg;
        sqsum += temp * temp;
    } // endof i
    if (tobs < 1) {      tvarn = NaN;   tstdn = NaN;              tvarnm1 = NaN; tstdnm1 = NaN;}
    else if (tobs < 2) { tvarn = sqsum; tstdn = Math.sqrt(tvarn); tvarnm1 = NaN; tstdnm1 = NaN;} 
    else {tvarn = sqsum / tobs; tstdn = Math.sqrt(tvarn);  tvarnm1 = sqsum / (tobs - 1); tstdnm1 = Math.sqrt(tvarnm1); }
 
    tmini    = dataA[0];
    tmaxi    = dataA[tobs - 1];
    tQ1      = d3.quantile(dataA, 0.25);
    tmedian  = d3.quantile(dataA, 0.5);
    tQ3      = d3.quantile(dataA, 0.75);
    tstat[0] = tobs;
    tstat[1] = tavg;
    tstat[2] = tstdnm1;
    tstat[3] = tmini;
    tstat[4] = tQ1;
    tstat[5] = tmedian;
    tstat[6] = tQ3;
    tstat[7] = tmaxi;
    tstat[8] = tvarn;
    tstat[9] = tstdn;
    tstat[10]= tvarnm1;
}

// show % for testing data
function showTestData24(newValue) { // k nearest
    document.getElementById("testing24").value  = 100 - newValue;
} 
function showTestData25(newValue) { // decision tree
    document.getElementById("testing25").value  = 100 - newValue;
} 
function showTestData26(newValue) { // bayes classificatio
    document.getElementById("testing26").value  = 100 - newValue;
} 
function showTestData261(newValue) { // naive bayes classificatio
    document.getElementById("testing261").value  = 100 - newValue;
} 
function showTestData27(newValue) { // logistic
    document.getElementById("testing27").value  = 100 - newValue;
} 
// stat Multivariate ----------------------------------------------------------------------------------------------
function statMultivariateDM(ngroup, tnumVar, tobs) {
    var i, j, k, temp, t1, t2;
    // group means
    for (k = 0; k < ngroup; k++) {
      for (j = 0; j < tnumVar; j++) {
        Davg[k][j] = 0;
      }
    } 
    for (i = 0; i < tobs; i++) {
      for (j = 0; j < tnumVar; j++) {
        Davg[ytrainN[i]][j] += parseFloat(Dtrain[j][i]);
      }
    }
    for (j = 0; j < tnumVar; j++) {
      gavg[j] = 0;
      for (k = 0; k < ngroup; k++) {
        gavg[j] += Davg[k][j];
      }
      gavg[j] /= tobs;
    } 
    // group cross product
    for (k = 0; k < ngroup; k++) {
      for (i = 0; i < tnumVar; i++) {
        Davg[k][i] /= gobsD[k];
        for (j= 0; j < tnumVar; j++) {
          Dcov[k][i][j] = 0;
        }
      }
    }
    for (k = 0; k < tobs; k++) {
      for (i = 0; i < tnumVar; i++) {
        t1 = parseFloat(Dtrain[i][k]) - Davg[ytrainN[k]][i];
        for (j = 0; j < tnumVar; j++) {
          t2 = parseFloat(Dtrain[j][k]) - Davg[ytrainN[k]][j];
          Dcov[ytrainN[k]][i][j] += t1 * t2;
        }
      }
    }
    // group correlation
    for (k = 0; k < ngroup; k++) {
      for (i = 0; i < tnumVar; i++) {
        for (j= 0; j < tnumVar; j++) {
          Dcorr[k][i][j] = Dcov[k][i][j] / Math.sqrt(Dcov[k][i][i] * Dcov[k][j][j]);
        }
      }
    }
    // total covariance
    for (i = 0; i < tnumVar; i++) {
      for (j = 0; j < tnumVar; j++) {
        gcov[i][j] = 0;
      }
    }
    for (k = 0; k < tobs; k++) {
      for (i = 0; i < tnumVar; i++) {
        t1 = parseFloat(Dtrain[i][k]) - gavg[i];
        for (j = 0; j < tnumVar; j++) {
          t2 = parseFloat(Dtrain[j][k]) - gavg[j];
          gcov[i][j] += t1 * t2;
        }
      }
    }
    // total std dev
    for (i = 0; i < tnumVar; i++) {
      for (j = 0; j < tnumVar; j++) {
        gcov[i][j] /= (tobs - 1);
        if ( i == j ) gstd[j] = Math.sqrt(gcov[i][j]);
      }
    }
    // total correlation
      for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) {
          gcorr[i][j] = gcov[i][j] / Math.sqrt(gcov[i][i] * gcov[j][j]);
        }
      }
    // group covariance
    for (k = 0; k < ngroup; k++) {
      for (i = 0; i < tnumVar; i++) { 
        for (j= 0; j < tnumVar; j++) {
          Dcov[k][i][j] /= (gobsD[k] - 1);
        }
      }
    }
}
// print multivariate statistics
function printMultivariate(iprior) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, str1;
    var num = 0;
    var ncol = tnumVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // print mean (std)
    row = table.insertRow(num);
    if (iprior == 0) temp = ncol + 1;
    else temp = ncol + 2;
    for (j = 0; j < temp; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[0].innerHTML = svgStr[34][langNum]+" ("+svgStr[35][langNum]+")"; // Mean (Std Dev)
    cell[1].innerHTML = svgStr[44][langNum]; // Observation
    if (iprior == 0) {
      for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = tdvarName[j+1];
    }
    else {
      cell[2].innerHTML = svgStr[130][langNum]; // Prior pro
      for (j = 0; j < tnumVar; j++) cell[j+3].innerHTML = tdvarName[j+1];
    }
    if (ngroup > 1) {
      for (k = 0; k < ngroup; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < temp; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "right";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "100px";
        }
        cell[0].style.width = "120px";
        cell[0].style.textAlign = "left";
        cell[0].innerHTML = svgStr[18][langNum]+" "+(k+1).toString()+"<br>"+tdvarName[0]+" : "+gdataValue[k]; // group
        cell[1].innerHTML = gobsD[k];
        if (iprior == 0) {
          for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = f3(Davg[k][j]) +" ("+ f3(Math.sqrt(Dcov[k][j][j]))+")";
        }
        else {
          cell[2].innerHTML = f2(prior[k]);
          for (j = 0; j < tnumVar; j++) cell[j+3].innerHTML = f3(Davg[k][j]) +" ("+ f3(Math.sqrt(Dcov[k][j][j]))+")";
        }
      }
    }
    row = table.insertRow(++num);
    for (j = 0; j < temp; j++) {
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
    if (iprior == 0) {
      for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = f3(gavg[j]) +" ("+ f3(Math.sqrt(gstd[j]))+")";
    }
    else {
      for (j = 0; j < tnumVar; j++) cell[j+3].innerHTML = f3(gavg[j]) +" ("+ f3(Math.sqrt(gstd[j]))+")";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    if (ngroup > 1) {
      // print group covariance matrix
      for (k = 0; k < ngroup; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "center";
          cell[j].style.backgroundColor = "#eee";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "100px";
        }
        if (ngroup == 1) str1 = "";
        else str1 = svgStr[18][langNum]+" "+(k+1).toString()+" : "+gdataValue[k];
        cell[0].innerHTML = svgStr[121][langNum]+"<br>"+str1; // covariance
        for (j = 0; j < tnumVar; j++) {
          cell[j+1].innerHTML = tdvarName[j+1];
        }
        for (i = 0; i < tnumVar; i++) {
          row = table.insertRow(++num);
          for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
            cell[j].style.width = "80px";
          }
          cell[0].style.textAlign = "center";
          cell[0].innerHTML = tdvarName[i+1];
          for (j = 0; j < tnumVar; j++) {
            cell[j+1].innerHTML = f3(Dcov[k][i][j]);
          }
        } // endof i
      } // endof k
    }
    // print total covariance
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "center";
          cell[j].style.backgroundColor = "#eee";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "100px";
        }
        cell[0].innerHTML = svgStr[23][langNum] + " " + svgStr[121][langNum]; // total covariance
        for (j = 0; j < tnumVar; j++) {
          cell[j+1].innerHTML = tdvarName[j+1];
        }
        for (i = 0; i < tnumVar; i++) {
          row = table.insertRow(++num);
          for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
            cell[j].style.width = "80px";
          }
          cell[0].style.textAlign = "center";
          cell[0].innerHTML = tdvarName[i+1];
          for (j = 0; j < tnumVar; j++) {
            cell[j+1].innerHTML = f3(gcov[i][j]);
          }
        } // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
    if (ngroup > 1) {
      // print group correlation matrix
      for (k = 0; k < ngroup; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "center";
          cell[j].style.backgroundColor = "#eee";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "100px";
        }
        if (ngroup == 1) str1 = "";
        else str1 = svgStr[18][langNum]+" "+(k+1).toString()+" : "+gdataValue[k];
        cell[0].innerHTML = svgStr[108][langNum]+"<br>"+str1; // correlation matrix
        for (j = 0; j < tnumVar; j++) {
          cell[j+1].innerHTML = tdvarName[j+1];
        }
        for (i = 0; i < tnumVar; i++) {
          row = table.insertRow(++num);
          for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
            cell[j].style.width = "80px";
          }
          cell[0].style.textAlign = "center";
          cell[0].innerHTML = tdvarName[i+1];
          for (j = 0; j < tnumVar; j++) {
            cell[j+1].innerHTML = f3(Dcorr[k][i][j]);
          }
        } // endof i
      } // endof k
    }
    // print total correlation
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
          cell[j] = row.insertCell(j);
          cell[j].style.textAlign = "center";
          cell[j].style.backgroundColor = "#eee";
          cell[j].style.border = "1px solid black";
          cell[j].style.width = "100px";
        }
        cell[0].innerHTML = svgStr[23][langNum] + " " + svgStr[108][langNum]; // total correlation
        for (j = 0; j < tnumVar; j++) {
          cell[j+1].innerHTML = tdvarName[j+1];
        }
        for (i = 0; i < tnumVar; i++) {
          row = table.insertRow(++num);
          for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
            cell[j].style.width = "80px";
          }
          cell[0].style.textAlign = "center";
          cell[0].innerHTML = tdvarName[i+1];
          for (j = 0; j < tnumVar; j++) {
            cell[j+1].innerHTML = f3(gcorr[i][j]);
          }
        } // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// classification statistics table
function printClassification() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, str1;
    var num = 0;
    var ncol = tnumVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // print mean (std)
    row = table.insertRow(num++);
    row.style.height = "20px";

    // classification result of training data
    row = table.insertRow(num++);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[148][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < ngroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+gdataValue[k]; //  decision
    }
    cell[ngroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < ngroup; k++) {
      row = table.insertRow(num++);
      for (j = 0; j < ngroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+gdataValue[k]; 
      for (j = 0; j < ngroup; j++) {
        temp1 = 100 * classTrain[k][j] / classTrain[ngroup][ngroup];
        temp2 = 100 * classTrain[k][j] / classTrain[k][ngroup];
        cell[j+1].innerHTML = classTrain[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTrain[k][ngroup] / classTrain[ngroup][ngroup];
      cell[ngroup+1].style.backgroundColor = "#eee";
      cell[ngroup+1].innerHTML = classTrain[k][ngroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(num++);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < ngroup; j++) { //  decision
      temp1 = 100 * classTrain[ngroup][j] / classTrain[ngroup][ngroup];
      cell[j+1].innerHTML = classTrain[ngroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[ngroup+1].innerHTML = classTrain[ngroup][ngroup]+"<br>"+f2(100)+" %"; // Total
    row = table.insertRow(num++);
    for (j = 0; j < 4; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[51][langNum]; // Accuracy
    temp = 0;
    for (k = 0; k < ngroup; k++) temp += classTrain[k][k];
    temp /= classTrain[ngroup][ngroup];
    cell[1].innerHTML = f2(100 * temp) + " %"; // Accuracy
    cell[1].style.textAlign = "right";
    cell[2].innerHTML = svgStrU[146][langNum]; // Misclassification
    cell[3].innerHTML = f2(100 * (1-temp)) + " %"; // Misclassification
    cell[3].style.textAlign = "right";

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";

  if (training < 1) {
    // classification result of testing data
    row = table.insertRow(num++);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[149][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < ngroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+gdataValue[k]; //  decision
    }
    cell[ngroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < ngroup; k++) {
      row = table.insertRow(num++);
      for (j = 0; j < ngroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+gdataValue[k]; 
      for (j = 0; j < ngroup; j++) {
        temp1 = 100 * classTest[k][j] / classTest[ngroup][ngroup];
        temp2 = 100 * classTest[k][j] / classTest[k][ngroup];
        cell[j+1].innerHTML = classTest[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTest[k][ngroup] / classTest[ngroup][ngroup];
      cell[ngroup+1].style.backgroundColor = "#eee";
      cell[ngroup+1].innerHTML = classTest[k][ngroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(num++);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < ngroup; j++) { //  decision
      temp1 = 100 * classTest[ngroup][j] / classTest[ngroup][ngroup];
      cell[j+1].innerHTML = classTest[ngroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[ngroup+1].innerHTML = classTest[ngroup][ngroup]+"<br>"+f2(100)+" %"; // Total
    row = table.insertRow(num++);
    for (j = 0; j < 4; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[51][langNum]; // Accuracy
    temp = 0;
    for (k = 0; k < ngroup; k++) temp += classTest[k][k];
    temp /= classTest[ngroup][ngroup];
    cell[1].innerHTML = f2(100 * temp) + " %"; // Accuracy
    cell[1].style.textAlign = "right";
    cell[2].innerHTML = svgStrU[146][langNum]; // Misclassification
    cell[3].innerHTML = f2(100 * (1-temp)) + " %"; // Misclassification
    cell[3].style.textAlign = "right";
  }
    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";

}

// Classification output data for Data Mining-----------------------------------
function classificationTableDT(tnumVar, tobs, testobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = tnumVar + 2;

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
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = Dtrain[j][i];
        cell[tnumVar+1].innerHTML = yclassTrain[i];
    }
  if (training < 1) {
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
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification

    for (i = 0; i < testobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = Dtest[j][i];
        cell[tnumVar+1].innerHTML = yclassTest[i];
    }
  }
    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// Classification output data for Naive Bayes -----------------------------------
function classificationTableNaiveBayes(tnumVar, tobs, testobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = tnumVar + 2 + ngroup;

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
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification
    for (j = 0; j < ngroup; j++) cell[tnumVar+2+j].innerHTML = "Posterior<br>"+"Group "+(j+1).toString()+": "+gdataValue[j];

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = Dtrain[j][i];
        cell[tnumVar+1].innerHTML = yclassTrain[i];
        for (j = 0; j < ngroup; j++) cell[tnumVar+2+j].innerHTML = f3(posteriorPrintTrain[i][j]);
    }
    // testing 헤더
    if (testobs == 0) return;
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStrU[149][langNum];
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification
    for (j = 0; j < ngroup; j++) cell[tnumVar+2+j].innerHTML = "Posterior<br>"+"Group "+(j+1).toString()+": "+gdataValue[j];

    for (i = 0; i < testobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = Dtest[j][i];
        cell[tnumVar+1].innerHTML = yclassTest[i];
        for (j = 0; j < ngroup; j++) cell[tnumVar+2+j].innerHTML = f3(posteriorPrintTest[i][j]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// Draw kmeans search
function drawKmeanSearch() {
    chart.selectAll("*").remove();  // 전화면 제거
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var nrow = maxnumK24+1;
    var betweenbarWidth = graphWidth / (nrow - 1); // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = 1;
    var freqMin  = 0;
    var tbuffer  = (freqMax - freqMin) * 0.05;
    freqMax = freqMax + tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = "Accuracy for each k-nearest neighbor classification"; 
    var yTitle = "Accuracy rate"; 
    var xTitle = "number of k";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisBayesChart(freqMin, freqMax);

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    for (j = 0; j < maxnumK24; j++) {
        x1 = margin.left + gapWidth + j*betweenbarWidth;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        str = (j+1).toString();
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "12px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(str)
    }
    // line graph for accuracy
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - accuracy24[0] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=1; i<maxnumK24; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - accuracy24[i] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 20;
      chart.append("circle").style("fill", "blue").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "blue").style("text-anchor", "begin")
           .text("accuracy")

    if (ngroup == 2) {
      // line graph for sensitivity
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - sensitivity24[0] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "red")
      for (i=1; i<maxnumK24; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - sensitivity24[i] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "red")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 40;
      chart.append("circle").style("fill", "red").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "red").style("text-anchor", "begin")
           .text("sensitivity")

      // line graph for specificity
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - specificity24[0] * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "limegreen")
      for (i=1; i<maxnumK24; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - specificity24[i] * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "limegreen")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "limegreen")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 60;
      chart.append("circle").style("fill", "limegreen").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+3)
           .style("font-size", "0.7em").style("font-family", "sans-seirf").style("stroke", "limegreen").style("text-anchor", "begin")
           .text("specificity")
    }
}
// accracy output for searching K in KNN -----------------------------------
function printAccuracyKNN() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k;
    var row, ncol;
    var num = 0;
    if (ngroup == 2) ncol = 4;
    else ncol = 2;

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
    cell[0].innerHTML = "K";
    cell[1].innerHTML = "Accuracy";
    if (ngroup == 2) {
      cell[2].innerHTML = "Sensitivity";
      cell[3].innerHTML = "Specificity";
    }

    for (k = 0; k < maxnumK24; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = k+1;
        cell[1].innerHTML = f3(accuracy24[k]);
        if (ngroup == 2) {
          cell[2].innerHTML = f3(sensitivity24[k]);
          cell[3].innerHTML = f3(specificity24[k]);
        }
    }
    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// Classification output data for KNN -----------------------------------
function classificationTableKNN(tnumVar, tobs, testobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row, ncol;
    var num = 0;
    if (istandard == 0) ncol = tnumVar + 3;
    else ncol = 2*tnumVar + 3;

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
    for (j = 0; j < tnumVar+1; j++) cell[j+1].innerHTML = tdvarName[j];
    if (istandard == 0) {
      cell[tnumVar+2].innerHTML = svgStrU[142][langNum]; // Classification
    }
    else {
      for (j = 1; j < tnumVar+1; j++) cell[tnumVar+j+1].innerHTML = "Standardized<br>"+tdvarName[j];
      cell[2*tnumVar+2].innerHTML = svgStrU[142][langNum]; // Classification
    }

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        cell[1].innerHTML = ytrain[i];
        for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = DDtrain[j][i];
        if (istandard == 0) {
          cell[tnumVar+2].innerHTML = gdataValue[yclassTrain[i]];
        }
        else {
          for (j = 0; j < tnumVar; j++) cell[tnumVar+j+2].innerHTML = f3(Dtrain[j][i]);
          cell[2*tnumVar+2].innerHTML = gdataValue[yclassTrain[i]];
        }
    }
    // testing 헤더
    if (training == 1) return;
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStrU[149][langNum];
    for (j = 0; j < tnumVar+1; j++) cell[j+1].innerHTML = tdvarName[j];
    if (istandard == 0) {
      cell[tnumVar+2].innerHTML = svgStrU[142][langNum]; // Classification
    }
    else {
      for (j = 1; j < tnumVar+1; j++) cell[tnumVar+j+1].innerHTML = "Standardized<br>"+tdvarName[j];
      cell[2*tnumVar+2].innerHTML = svgStrU[142][langNum]; // Classification
    }
    for (i = 0; i < testobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
        }
        cell[0].innerHTML = i+1;
        cell[1].innerHTML = ytest[i];
        for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = DDtest[j][i];
        if (istandard == 0) {
          cell[tnumVar+2].innerHTML = gdataValue[yclassTest[i]];
        }
        else {
          for (j = 0; j < tnumVar; j++) cell[tnumVar+j+2].innerHTML = f3(Dtest[j][i]);
          cell[2*tnumVar+2].innerHTML = gdataValue[yclassTest[i]];
        }
   }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// Classification output data -----------------------------------
function classificationTable(tnumVar, tobs, testobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp;
    var row;
    var num = 0;
    var ncol = tnumVar + 2;

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
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification

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
        for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = f3(Dtrain[j][i]);
        cell[tnumVar+1].style.textAlign = "center";
        cell[tnumVar+1].innerHTML = gdataValue[yclassTrain[i]];
    }
  if (training < 1) {
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
    for (j = 0; j < tnumVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[tnumVar+1].innerHTML = svgStrU[142][langNum]; // Classification

    for (i = 0; i < testobs; i++) {
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
        for (j = 0; j < tnumVar; j++) cell[j+2].innerHTML = f3(Dtest[j][i]);
        cell[tnumVar+1].style.textAlign = "center";
        cell[tnumVar+1].innerHTML = gdataValue[yclassTest[i]];
    }
  }
    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// Expected entropy of two dimension frequency
function expectEntropy(rowvar, colvar, dim2Freq) {
   var i, j, temp, totsum, rowEntropy, expEntropy;
   var rowsum = new Array(rowMax);
   var colsum = new Array(colMax);
   totsum = 0;
   for (j = 0; j < mdvalueNum[colvar]; j++) colsum[j] = 0;
   for (i = 0; i < mdvalueNum[rowvar]; i++) {
     rowsum[i] = 0;
     for (j = 0; j < mdvalueNum[colvar]; j++) {
       rowsum[i] += dim2Freq[i][j];
       colsum[j] += dim2Freq[i][j];
     }
     totsum += rowsum[i];
   }  
   for (j = 0; j < mdvalueNum[colvar]; j++) {
     colsum[j] = colsum[j] / totsum;
   }
   if (methodType25 == 1) { // Entropy method
     expEntropy = 0;
     for (i = 0; i < mdvalueNum[rowvar]; i++) {
       if (rowsum[i] > 0) {
         rowEntropy = 0;
         for (j = 0; j < mdvalueNum[colvar]; j++) {
           if (dim2Freq[i][j] > 0) {
             temp = dim2Freq[i][j] / rowsum[i];
             rowEntropy -= temp * Math.log2(temp);
           }
         }
         expEntropy += rowEntropy * rowsum[i] / totsum;
       }
     }
   }
   else if (methodType25 == 2) { // Gini method
     expEntropy = 0;
     for (i = 0; i < mdvalueNum[rowvar]; i++) {
       if (rowsum[i] > 0) {
         rowEntropy = 1;
         for (j = 0; j < mdvalueNum[colvar]; j++) {
           if (dim2Freq[i][j] > 0) {
             temp = dim2Freq[i][j] / rowsum[i];
             rowEntropy -= temp * temp;
           }
         }
         expEntropy += rowEntropy * rowsum[i] / totsum;
       }
     }
   }
   else if (methodType25 == 3) { // Classification error
     expEntropy = 0;
     for (i = 0; i < mdvalueNum[rowvar]; i++) {
       if (rowsum[i] > 0) {
         temp = dim2Freq[i][0];
         for (j = 1; j < mdvalueNum[colvar]; j++) {
           if (dim2Freq[i][j] > temp) {
             temp = dim2Freq[i][j];
           }
         }
         rowEntropy = 1 - temp / rowsum[i];
         expEntropy += rowEntropy * rowsum[i] / totsum;
       }
     }
   }
   else if (methodType25 == 4) { // Chi-square method
     expEntropy = 0;
     for (i = 0; i < mdvalueNum[rowvar]; i++) {
       if (rowsum[i] > 0) {
         for (j = 0; j < mdvalueNum[colvar]; j++) {
           temp = dim2Freq[i][j] - rowsum[i]*colsum[j];
           expEntropy -= temp * temp / (rowsum[i]*colsum[j]);
         }
       }
     }
   }
   return expEntropy;    
}
// entropy of each variable
function entropyVar(jj, sobs) {
    var i, j, k;   
      // entropy of each variable
      for (j = 1; j < numVar; j++) entropy[j] = 0;
      for (j = 1; j < numVar; j++) {
        for (k = 0; k < sobs; k++) {ydata[k] = 0; xdata[k] = 0;}
        for (i = 1; i < jj; i++) { 
          if (j == jjold[i]) {entropy[j] = 9999;}
        } // endof i
        if (entropy[j] != 9999) {
            for (k = 0; k < sobs; k++) {
              ydata[k] = workD[0][k];
              xdata[k] = workD[j][k];
            }
            twodimFreq(sobs, j, 0, xdata, ydata, dim2Freq);
            entropy[j] = expectEntropy(j, 0, dim2Freq);
// console.log(entropy[j])
        } // endof if
      } // endof j

/*
 for (var m=0; m<mdvalueNum[j]; m++) {
   var str = "V"+j+" "+mdvalue[j][m]+ "   ";
   console.log(str+dim2Freq[m][0] +" "+dim2Freq[m][1]);
 }
console.log("i=0"+" j="+j+" ydata="+ydata+" xdata="+xdata)
console.log(dim2Freq[0][0]+" "+dim2Freq[0][1])
console.log(dim2Freq[1][0]+" "+dim2Freq[1][1])
*/
}

// majority voting
function voting(sobs){
    var j, k, tmax, tindex;
    for (j = 0; j < mdvalueNum[0]; j++) groupFreq[j] = 0;
    for (k = 0; k < sobs; k++) {
      for (j = 0 ; j < mdvalueNum[0]; j++) {
        if (workD[0][k] == mdvalue[0][j]) groupFreq[j]++;
      }
    }
    // find majority
    tmax = groupFreq[0];
    tindex = 0;
    for (j = 1; j < mdvalueNum[0]; j++) {
      if (groupFreq[j] > tmax) {
        tmax = groupFreq[j];
        tindex = j;
      }
    }
    return tindex;
}
// find min entropy var
function minEntropyVar(entropy) {
    var j, tmin, tindex;
    tmin   = entropy[1];
    tindex = 1;
    for (j = 2; j < numVar; j++) {
      if (entropy[j] < tmin) {
        tindex = j;
        tmin   = entropy[j];
      }
    }
    return tindex;
}
// Sorting in ascending 
function sortAscendDM(dobs, dataA) {
    var i, j, temp;
    var nvalue = 0;
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (dataA[i] > dataA[j]) {
                temp = dataA[i];
                dataA[i] = dataA[j];
                dataA[j] = temp;
            }
        }
    }
}

// decision tree
function decisionTree(numVar, tobs) {
    var i, j, k, ii, kk, level, temp;
    var k1, k2, k3, k4, k5, k6, k7, k8, k9;
    var j1, j2, j3, j4, j5, j6, j7, j8, j9;
    var n1, n2, n3, n4, n5, n6, n7, n8, n9;
    // tidx[][] 0: Nothing 1:Node 2:1eaf 3:decision 4:vertilcalLine
    // level 1 : root node variable selcetion
    ii = 0;
    for (j = 0; j < numVar; j++) {
      for (k = 0; k < tobs; k++) {
        workD[j][k] = Dtrain[j][k];
      }
//console.log(workD[0])
//console.log(workD[1])
    }
    nrow = 1;
    // find min entropy var
    level = 1;
    entropyVar(level, tobs);
    j1   = minEntropyVar(entropy);
    jjold[level] = j1;
    tree[nrow][0] = 1;
    tree[nrow][1] = j1;
    tidx[nrow][1] = 1;
    level = 1;    
 console.log("root selectedVar="+j1); 

    // 2nd level node
    n2    = tobs;
    for (k2 = 0; k2 < mdvalueNum[j1]; k2++) {
      nrow++;
      tree[nrow][2] = mdvalue[j1][k2];
      tidx[nrow][2] = 2;
      // subdata selection
      sobs = 0;
      for (k = 0; k < n2; k++) {
        if (Dtrain[j1][k] == mdvalue[j1][k2]) {
          for (j = 0; j < numVar; j++) {
            workD[j][sobs] = Dtrain[j][k];
          }
          sobs++;
        }
      }
// console.log("j1="+j1+" k2="+k2+" "+mdvalue[j1][k2]+" sobs="+sobs+" level="+level); 

      if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
        temp = voting(sobs);
        tree[nrow][0] = 3;
        tree[nrow][3] = mdvalue[0][temp];
        tidx[nrow][3] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
      }
      else {
        // level 2
        level = 2;
        entropyVar(level, sobs);
        j2 = minEntropyVar(entropy);
        jjold[level]  = j2;
        tree[nrow][0] = 3;
        tree[nrow][3] = j2;
        tidx[nrow][3] = 1;
// console.log("     continue selectedVar="+j2); 
// console.log(entropy);
        n3 = sobs;
        // data copy of previous level
        for (j = 0; j < numVar; j++) {
          for (k = 0; k < n3; k++) {
              work3[j][k] = workD[j][k];
          }
        }
     
        for (k3 = 0; k3 < mdvalueNum[j2]; k3++) {
          nrow++;
          tree[nrow][4] = mdvalue[j2][k3];
          tidx[nrow][4] = 2;
          if (k2 < mdvalueNum[j1]-1) tidx[nrow][2] = 4;
          // subdata selection
          sobs = 0;
          for (k = 0; k < n3; k++) {
            if (work3[j2][k] == mdvalue[j2][k3]) {
              for (j = 0; j < numVar; j++) {
                workD[j][sobs] = work3[j][k];
              }
              sobs++;
            }
          }
// console.log("j2="+j2+" k3="+k3+" "+mdvalue[j2][k3]+" sobs="+sobs+" level="+level); 

          if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
            temp = voting(sobs);
            tree[nrow][0] = 5;
            tree[nrow][5] = mdvalue[0][temp];
            tidx[nrow][5] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
          }
          else {
            // level 3
            level = 3;
            entropyVar(level, sobs);
            j3 = minEntropyVar(entropy);
            jjold[level] = j3;
            tree[nrow][0] = 5;
            tree[nrow][5] = j3;
            tidx[nrow][5] = 1;
// console.log("     continue selectedVar="+j3); 
// console.log(entropy);
            n4 = sobs;
            // data copy of previous level
            for (j = 0; j < numVar; j++) {
              for (k = 0; k < n4; k++) {
                  work4[j][k] = workD[j][k];
              }
            }
     
            for (k4 = 0; k4 < mdvalueNum[j3]; k4++) {
              nrow++;
              tree[nrow][6] = mdvalue[j3][k4];
              tidx[nrow][6] = 2;
              if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
              if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;

              // subdata selection
              sobs = 0;
              for (k = 0; k < n4; k++) {
                if (work4[j3][k] == mdvalue[j3][k4]) {
                  for (j = 0; j < numVar; j++) {
                    workD[j][sobs] = work4[j][k];
                  }
                  sobs++;
                }
              }

// console.log("j3="+j3+" k4="+k4+" "+mdvalue[j3][k4]+" sobs="+sobs+" level="+level); 
              if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
                temp = voting(sobs);
                tree[nrow][0] = 7;
                tree[nrow][7] = mdvalue[0][temp];
                tidx[nrow][7] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
              }
              else {
                // level 4
                level = 4;
                entropyVar(level, sobs);
                j4 = minEntropyVar(entropy);
                jjold[level] = j4;
                tree[nrow][0] = 7;
                tree[nrow][7] = j4;
                tidx[nrow][7] = 1;
// console.log("     continue selectedVar="+j4); 
// console.log(entropy);
                n5 = sobs;
                // data copy of previous level
                for (j = 0; j < numVar; j++) {
                  for (k = 0; k < n5; k++) {
                      work5[j][k] = workD[j][k];
                  }
                }
     
                for (k5 = 0; k5 < mdvalueNum[j4]; k5++) {
                  nrow++;
                  tree[nrow][8] = mdvalue[j4][k5];
                  tidx[nrow][8] = 2;
                  if (k4 < mdvalueNum[j3]-1) tidx[nrow][6]  = 4;
                  if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
                  if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;
                  // subdata selection
                  sobs = 0;
                  for (k = 0; k < n5; k++) {
                    if (work5[j4][k] == mdvalue[j4][k5]) {
                      for (j = 0; j < numVar; j++) {
                        workD[j][sobs] = work5[j][k];
                      }
                      sobs++;
                    }
                  }

// console.log("j4="+j4+" k5="+k5+" "+mdvalue[j4][k5]+" sobs="+sobs+" level="+level); 
                  if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
                    temp = voting(sobs);
                    tree[nrow][0] = 9;
                    tree[nrow][9] = mdvalue[0][temp];
                    tidx[nrow][9] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
                  }
                  else {
                    // level 5
                    level = 5;
                    entropyVar(level, sobs);
                    j5 = minEntropyVar(entropy);
                    jjold[level]  = j5;
                    tree[nrow][0] = 9;
                    tree[nrow][9] = j5;
                    tidx[nrow][9] = 1;
// console.log("     continue selectedVar="+j5); 
// console.log(entropy);
                    n6 = sobs;
                    // data copy of previous level
                    for (j = 0; j < numVar; j++) {
                      for (k = 0; k < n6; k++) {
                          work6[j][k] = workD[j][k];
                      }
                    }
     
                    for (k6 = 0; k6 < mdvalueNum[j5]; k6++) {
                      nrow++;
                      tree[nrow][10] = mdvalue[j5][k6];
                      tidx[nrow][10] = 2;
                      if (k5 < mdvalueNum[j4]-1) tidx[nrow][8]  = 4;
                      if (k4 < mdvalueNum[j3]-1) tidx[nrow][6]  = 4;
                      if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
                      if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;
                      // subdata selection
                      sobs = 0;
                      for (k = 0; k < n6; k++) {
                        if (work6[j5][k] == mdvalue[j5][k6]) {
                          for (j = 0; j < numVar; j++) {
                            workD[j][sobs] = work6[j][k];
                          }
                          sobs++;
                        }
                      }

// console.log("j5="+j5+" k6="+k6+" "+mdvalue[j5][k6]+" sobs="+sobs+" level="+level); 
                      if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
                        temp = voting(sobs);
                        tree[nrow][0] = 11;
                        tree[nrow][11] = mdvalue[0][temp];
                        tidx[nrow][11] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
                      }
                      else {
                        // level 6
                        level = 6;
                        entropyVar(level, sobs);
                        j6 = minEntropyVar(entropy);
                        jjold[level]   = j6;
                        tree[nrow][0]  = 11;
                        tree[nrow][11] = j6;
                        tidx[nrow][11] = 1;
// console.log("     continue selectedVar="+j6); 
// console.log(entropy);
                        n7 = sobs;
                        // data copy of previous level
                        for (j = 0; j < numVar; j++) {
                          for (k = 0; k < n7; k++) {
                              work7[j][k] = workD[j][k];
                          }
                        }
     
                        for (k7 = 0; k7 < mdvalueNum[j6]; k7++) {
                          nrow++;
                          tree[nrow][12] = mdvalue[j6][k7];
                          tidx[nrow][12] = 2;
                          if (k6 < mdvalueNum[j5]-1) tidx[nrow][10] = 4;
                          if (k5 < mdvalueNum[j4]-1) tidx[nrow][8]  = 4;
                          if (k4 < mdvalueNum[j3]-1) tidx[nrow][6]  = 4;
                          if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
                          if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;
                          // subdata selection
                          sobs = 0;
                          for (k = 0; k < n7; k++) {
                            if (work7[j6][k] == mdvalue[j6][k7]) {
                              for (j = 0; j < numVar; j++) {
                                workD[j][sobs] = work7[j][k];
                              }
                              sobs++;
                            }
                          }

// console.log("j6="+j6+" k7="+k7+" "+mdvalue[j6][k7]+" sobs="+sobs+" level="+level); 
                          if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
                            temp = voting(sobs);
                            tree[nrow][0] = 13;
                            tree[nrow][13] = mdvalue[0][temp];
                            tidx[nrow][13] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
                          }
                          else {
                            // level 7
                            level = 7;
                            entropyVar(level, sobs);   
                            j7 = minEntropyVar(entropy);
                            jjold[level]   = j7;
                            tree[nrow][0]  = 13;
                            tree[nrow][13] = j7;
                            tidx[nrow][13] = 1;
// console.log("     continue selectedVar="+j7); 
// console.log(entropy);
                            n8 = sobs;
                            // data copy of previous level
                            for (j = 0; j < numVar; j++) {
                                  for (k = 0; k < n8; k++) {
                                  work8[j][k] = workD[j][k];
                              }
                            }
     
                            for (k8 = 0; k8 < mdvalueNum[j7]; k8++) {
                              nrow++;
                              tree[nrow][14] = mdvalue[j7][k8];
                              tidx[nrow][14] = 2;
                              if (k7 < mdvalueNum[j6]-1) tidx[nrow][12] = 4;
                              if (k6 < mdvalueNum[j5]-1) tidx[nrow][10] = 4;
                              if (k5 < mdvalueNum[j4]-1) tidx[nrow][8]  = 4;
                              if (k4 < mdvalueNum[j3]-1) tidx[nrow][6]  = 4;
                              if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
                              if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;

                              // subdata selection
                              sobs = 0;
                              for (k = 0; k < n8; k++) {
                                if (work8[j7][k] == mdvalue[j7][k8]) {
                                  for (j = 0; j < numVar; j++) {
                                    workD[j][sobs] = work8[j][k];
                                  }
                                  sobs++;
                                }
                              }

// console.log("j7="+j7+" k8="+k8+" "+mdvalue[j7][k8]+" sobs="+sobs+" level="+level); 
                              if (sobs <= mindata || level >= (numVar-1) || level >= maxlevel) { // stopping and vote
                                temp = voting(sobs);
                                tree[nrow][0] = 15;
                                tree[nrow][15] = mdvalue[0][temp];
                                tidx[nrow][15] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
                              }
                              else {
                                // level 8
                                level = 8;
                                entropyVar(level, sobs);
                                j8 = minEntropyVar(entropy);
                                jjold[level] = j8;
                                tree[nrow][0] = 15;
                                tree[nrow][15] = j8;
                                tidx[nrow][15] = 1;
// console.log("     continue selectedVar="+j8); 
// console.log(entropy);
                                n9 = sobs;
                                // data copy of previous level
                                for (j = 0; j < numVar; j++) {
                                      for (k = 0; k < n9; k++) {
                                      work9[j][k] = workD[j][k];
                                  }
                                }
     
                                for (k9 = 0; k9 < mdvalueNum[j8]; k9++) {
                                  nrow++;
                                  tree[nrow][16] = mdvalue[j8][k9];
                                  tidx[nrow][16] = 2;
                                  if (k8 < mdvalueNum[j7]-1) tidx[nrow][14] = 4;
                                  if (k7 < mdvalueNum[j6]-1) tidx[nrow][12] = 4;
                                  if (k6 < mdvalueNum[j5]-1) tidx[nrow][10] = 4;
                                  if (k5 < mdvalueNum[j4]-1) tidx[nrow][8]  = 4;
                                  if (k4 < mdvalueNum[j3]-1) tidx[nrow][6]  = 4;
                                  if (k3 < mdvalueNum[j2]-1) tidx[nrow][4]  = 4;
                                  if (k2 < mdvalueNum[j1]-1) tidx[nrow][2]  = 4;

                                  // subdata selection
                                  sobs = 0;
                                  for (k = 0; k < n9; k++) {
                                    if (work9[j8][k] == mdvalue[j8][k9]) {
                                      for (j = 0; j < numVar; j++) {
                                        workD[j][sobs] = work9[j][k];
                                      }
                                      sobs++;
                                    }
                                  }

// console.log("j8="+j8+" k9="+k9+" "+mdvalue[j8][k9]+" sobs="+sobs+" level="+level); 
                                  // reached max level, voting decision
                                    temp = voting(sobs);
                                    tree[nrow][0] = 17;
                                    tree[nrow][17] = mdvalue[0][temp];
                                    tidx[nrow][17] = 3;
// console.log(groupFreq[0]+" "+groupFreq[1]+"     stopping decision = "+" "+mdvalue[0][temp] );
                                } // endof k9

                              } // endof else
                              
                              if (k8 < mdvalueNum[j7]-1) {nrow++; tidx[nrow][14] = 4; tree[nrow][0] = 14;}
                              if (k7 < mdvalueNum[j6]-1) {tidx[nrow][12] = 4;}
                              if (k6 < mdvalueNum[j5]-1) {tidx[nrow][10] = 4;}
                              if (k5 < mdvalueNum[j4]-1) {tidx[nrow][8]  = 4;}
                              if (k4 < mdvalueNum[j3]-1) {tidx[nrow][6]  = 4;}
                              if (k3 < mdvalueNum[j2]-1) {tidx[nrow][4]  = 4;}
                              if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2]  = 4;}
                            } // endof k8

                          } // endof else
                         
                          if (k7 < mdvalueNum[j6]-1) {nrow++; tidx[nrow][12] = 4; tree[nrow][0] = 12; }
                          if (k6 < mdvalueNum[j5]-1) {tidx[nrow][10] = 4;}
                          if (k5 < mdvalueNum[j4]-1) {tidx[nrow][8]  = 4;}
                          if (k4 < mdvalueNum[j3]-1) {tidx[nrow][6]  = 4;}
                          if (k3 < mdvalueNum[j2]-1) {tidx[nrow][4]  = 4;}
                          if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2]  = 4;}
                        } // endof k7

                      } // endof else
                    
                      if (k6 < mdvalueNum[j5]-1) {nrow++; tidx[nrow][10] = 4; tree[nrow][0] = 10; }
                      if (k5 < mdvalueNum[j4]-1) {tidx[nrow][8]  = 4;}
                      if (k4 < mdvalueNum[j3]-1) {tidx[nrow][6]  = 4;}
                      if (k3 < mdvalueNum[j2]-1) {tidx[nrow][4]  = 4;}
                      if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2]  = 4;}
                    } // endof k6

                  } // endof else
                 
                  if (k5 < mdvalueNum[j4]-1) {nrow++; tidx[nrow][8] = 4; tree[nrow][0] = 8; }
                  if (k4 < mdvalueNum[j3]-1) {tidx[nrow][6] = 4;}
                  if (k3 < mdvalueNum[j2]-1) {tidx[nrow][4] = 4;}
                  if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2] = 4;}
                } // endof k5

              } // endof else
              
              if (k4 < mdvalueNum[j3]-1) {nrow++; tidx[nrow][6] = 4; tree[nrow][0] = 6; }
              if (k3 < mdvalueNum[j2]-1) {tidx[nrow][4] = 4;}
              if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2] = 4;}
            } // endof k4

          } // endof else
         
          if (k3 < mdvalueNum[j2]-1) {nrow++; tidx[nrow][4] = 4; tree[nrow][0] = 4; }
          if (k2 < mdvalueNum[j1]-1) {tidx[nrow][2] = 4;}

        } // endof k3

      } // endof else
      
      if (k2 < mdvalueNum[j1]-1) {nrow++; tidx[nrow][2] = 4; tree[nrow][0] = 2; }
    } // endof k2
}

// decision rule table
function decisionRule() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp, check;
    var temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9;
    var temp10, temp11, temp12, temp13, temp14, temp15, temp16;
    var ncol = 3;
    var rstr = new Array(20);
    var row  = new Array(nrow+1);
    var cell = new Array(ncol);
    for (i = 0; i < nrow+1; i++) {
      cell[i] = new Array(ncol);
    }

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";

    // 헤더
    row[0] = table.insertRow(0);
    for (j = 0; j < ncol; j++) {
      cell[0][j] = row[0].insertCell(j);
      cell[0][j].style.backgroundColor = "#eeee";
      cell[0][j].style.height = "30px";
      cell[0][j].style.border = "1px solid black";
      cell[0][j].style.textAlign = "center";
    }
    cell[0][0].style.width = "40px";
    cell[0][0].innerHTML   = "<h3>id</h3>";  
    cell[0][1].style.width = "480px";
    cell[0][1].innerHTML   = "<h3>"+svgStrU[138][langNum]+"</h3>";  
    cell[0][2].style.width = "80px";
    cell[0][2].innerHTML   = "<h3>"+svgStrU[139][langNum]+"</h3>";  

    // decision rule
    rstr[1] = " ("+tdvarName[tree[1][1]]; // root node
    for (i = 2; i < nrow+1; i++) {
      check = 0;
      for (j = 0; j < tree[i][0]; j++) {
        if (tidx[i][j+1] == 1 || tidx[i][j+1] == 2 || tidx[i][j+1] == 3) { // 1:node 2:leaf 3:decision
          check = 1;
          break;
        }
      }
      if (check == 1) {
        if (tidx[i][2] == 2) { 
          rstr[2] = rstr[1]+" = "+tree[i][2]+")";
          temp2   = tree[i][2];
          if (tidx[i][3] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[2];
            cell[rulenum][2].innerHTML = tree[i][3];
            coeff[rulenum][0] = 3; 
            coeff[rulenum][1] = tree[1][1];
            coeff[rulenum][2] = tree[i][2];
            coeff[rulenum][3] = tree[i][3];
            continue;
          }
          else if (tidx[i][3] == 1) {
            rstr[3] = rstr[2] + " and " + "("+tdvarName[tree[i][3]];
            temp3   = tree[i][3];
          }
        }
        if (tidx[i][4] == 2) {
          rstr[4] = rstr[3]+" = "+tree[i][4]+")";
          temp4   = tree[i][4]; 
          if (tidx[i][5] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[4];
            cell[rulenum][2].innerHTML = tree[i][5];
            coeff[rulenum][0] = 5; 
            coeff[rulenum][1] = tree[1][1]; // if (node ==
            coeff[rulenum][2] = temp2;      // leaf)
            coeff[rulenum][3] = temp3;      // and (node ==
            coeff[rulenum][4] = temp4;      // leaf)
            coeff[rulenum][5] = tree[i][5]; // decision
            continue;
          }
          else if (tidx[i][5] == 1) {
            rstr[5] = rstr[4] + " and " + "("+tdvarName[tree[i][5]];
            temp5   = tree[i][5];
          }
        }
        if (tidx[i][6] == 2) {
          rstr[6] = rstr[5]+" = "+tree[i][6]+")";  
          temp6   = tree[i][6];
          if (tidx[i][7] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[6];
            cell[rulenum][2].innerHTML = tree[i][7];
            coeff[rulenum][0] = 7; 
            coeff[rulenum][1] = tree[1][1]; // if (node ==
            coeff[rulenum][2] = temp2;      // leaf)
            coeff[rulenum][3] = temp3;      // and (node ==
            coeff[rulenum][4] = temp4;      // leaf)
            coeff[rulenum][5] = temp5;      // and (node ==
            coeff[rulenum][6] = temp6;      // leaf)
            coeff[rulenum][7] = tree[i][7]; // decision
            continue;
          }
          else if (tidx[i][7] == 1) {
            rstr[7] = rstr[6] + " and " + "("+tdvarName[tree[i][7]];
            temp7   = tree[i][7];
          }
        }
        if (tidx[i][8] == 2) {
          rstr[8] = rstr[7]+" = "+tree[i][8]+")"; 
          temp8   = tree[i][8]; 
          if (tidx[i][9] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[8];
            cell[rulenum][2].innerHTML = tree[i][9];
            coeff[rulenum][0] = 9; 
            coeff[rulenum][1] = tree[1][1]; // if (node ==
            coeff[rulenum][2] = temp2;      // leaf)
            coeff[rulenum][3] = temp3;      // and (node ==
            coeff[rulenum][4] = temp4;      // leaf)
            coeff[rulenum][5] = temp5;      // and (node ==
            coeff[rulenum][6] = temp6;      // leaf)
            coeff[rulenum][7] = temp7;      // and (node ==
            coeff[rulenum][8] = temp8;      // leaf)
            coeff[rulenum][9] = tree[i][9]; // decision
            continue;
          }
          else if (tidx[i][9] == 1) {
            rstr[9] = rstr[8] + " and " + "("+tdvarName[tree[i][9]];
            temp9   = tree[i][9];
          }
        }
        if (tidx[i][10] == 2) {
          rstr[10] = rstr[9]+" = "+tree[i][10]+")";
          temp10   = tree[i][10];
          if (tidx[i][11] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[10];
            cell[rulenum][2].innerHTML = tree[i][11];
            coeff[rulenum][0]  = 11; 
            coeff[rulenum][1]  = tree[1][1]; // if (node ==
            coeff[rulenum][2]  = temp2;      // leaf)
            coeff[rulenum][3]  = temp3;      // and (node ==
            coeff[rulenum][4]  = temp4;      // leaf)
            coeff[rulenum][5]  = temp5;      // and (node ==
            coeff[rulenum][6]  = temp6;      // leaf)
            coeff[rulenum][7]  = temp7;      // and (node ==
            coeff[rulenum][8]  = temp8;      // leaf)
            coeff[rulenum][9]  = temp9;      // and (node == 
            coeff[rulenum][10] = temp10;     // leaf)
            coeff[rulenum][11] = tree[i][11]; // decision
            continue;
          }
          else if (tidx[i][11] == 1) {
            rstr[11] = rstr[10] + " and " + "("+tdvarName[tree[i][11]];
            temp11   = tree[i][11];
          }
        }
        if (tidx[i][12] == 2) {
          rstr[12] = rstr[11]+" = "+tree[i][12]+")";
          temp12   = tree[i][12];
          if (tidx[i][13] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[12];
            cell[rulenum][2].innerHTML = tree[i][13];
            coeff[rulenum][0]  = 13; 
            coeff[rulenum][1]  = tree[1][1]; // if (node ==
            coeff[rulenum][2]  = temp2;      // leaf)
            coeff[rulenum][3]  = temp3;      // and (node ==
            coeff[rulenum][4]  = temp4;      // leaf)
            coeff[rulenum][5]  = temp5;      // and (node ==
            coeff[rulenum][6]  = temp6;      // leaf)
            coeff[rulenum][7]  = temp7;      // and (node ==
            coeff[rulenum][8]  = temp8;      // leaf)
            coeff[rulenum][9]  = temp9;      // and (node == 
            coeff[rulenum][10] = temp10;     // leaf)
            coeff[rulenum][11] = temp11;     // and (node == 
            coeff[rulenum][12] = temp12;     // leaf)
            coeff[rulenum][13] = tree[i][13]; // decision
            continue;
          }
          else if (tidx[i][13] == 1) {
            rstr[13] = rstr[12] + " and " + "("+tdvarName[tree[i][13]];
            temp13   = tree[i][13];
          }
        }
        if (tidx[i][14] == 2) {
          rstr[14] = rstr[13]+" = "+tree[i][14]+")";
          temp14   = tree[i][14];
          if (tidx[i][15] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[14];
            cell[rulenum][2].innerHTML = tree[i][15];
            coeff[rulenum][0]  = 15; 
            coeff[rulenum][1]  = tree[1][1]; // if (node ==
            coeff[rulenum][2]  = temp2;      // leaf)
            coeff[rulenum][3]  = temp3;      // and (node ==
            coeff[rulenum][4]  = temp4;      // leaf)
            coeff[rulenum][5]  = temp5;      // and (node ==
            coeff[rulenum][6]  = temp6;      // leaf)
            coeff[rulenum][7]  = temp7;      // and (node ==
            coeff[rulenum][8]  = temp8;      // leaf)
            coeff[rulenum][9]  = temp9;      // and (node == 
            coeff[rulenum][10] = temp10;     // leaf)
            coeff[rulenum][11] = temp11;     // and (node == 
            coeff[rulenum][12] = temp12;     // leaf)
            coeff[rulenum][13] = temp13;     // and (node == 
            coeff[rulenum][14] = temp14;     // leaf)
            coeff[rulenum][15] = tree[i][15]; // decision
            continue;
          }
          else if (tidx[i][15] == 1) {
            rstr[15] = rstr[14] + " and " + "("+tdvarName[tree[i][15]];
            temp15   = tree[i][15];
          }
        }
        if (tidx[i][16] == 2) {
          rstr[16] = rstr[15]+" = "+tree[i][16]+")";
          temp16   = tree[i][16];
          if (tidx[i][17] == 3) {
            rulenum++;
            row[rulenum] = table.insertRow(rulenum);
            for (j = 0; j < ncol; j++) {
              cell[rulenum][j] = row[rulenum].insertCell(j);
              cell[rulenum][j].style.backgroundColor = "white";
              cell[rulenum][j].style.height = "30px";
              cell[rulenum][j].style.border = "1px solid black";
            }
            cell[rulenum][0].style.width = "40px";
            cell[rulenum][0].style.textAlign = "center";
            cell[rulenum][1].style.width = "480px";
            cell[rulenum][1].style.textAlign = "left";
            cell[rulenum][2].style.width = "80px";
            cell[rulenum][2].style.textAlign = "center";
            cell[rulenum][0].innerHTML = rulenum;
            cell[rulenum][1].innerHTML = rstr[16];
            cell[rulenum][2].innerHTML = tree[i][17];
            coeff[rulenum][0]  = 17; 
            coeff[rulenum][1]  = tree[1][1]; // if (node ==
            coeff[rulenum][2]  = temp2;      // leaf)
            coeff[rulenum][3]  = temp3;      // and (node ==
            coeff[rulenum][4]  = temp4;      // leaf)
            coeff[rulenum][5]  = temp5;      // and (node ==
            coeff[rulenum][6]  = temp6;      // leaf)
            coeff[rulenum][7]  = temp7;      // and (node ==
            coeff[rulenum][8]  = temp8;      // leaf)
            coeff[rulenum][9]  = temp9;      // and (node == 
            coeff[rulenum][10] = temp10;     // leaf)
            coeff[rulenum][11] = temp11;     // and (node == 
            coeff[rulenum][12] = temp12;     // leaf)
            coeff[rulenum][13] = temp13;     // and (node == 
            coeff[rulenum][14] = temp14;     // leaf)
            coeff[rulenum][15] = temp15;     // and (node == 
            coeff[rulenum][16] = temp16;     // leaf)
            coeff[rulenum][17] = tree[i][17]; // decision
            continue;
          }
        }

      } // endof check

    }  // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++rulenum);
    row.style.height = "20px";
}

// classification of Decision Tree training and testing data
function classificationDT(ngroup, rulenum) {
    var i, j, k, g, h;
    // determine class of training data
    for (i = 0; i < ngroup; i++) 
      for (j = 0; j < ngroup; j++) classTrain[i][j] = 0;

    for (k = 0; k < tobs; k++) {
//   console.log("k="+k+" "+Dtrain[0][k]+" "+Dtrain[1][k]+" "+Dtrain[2][k]+" "+Dtrain[3][k]+" "+Dtrain[4][k]);
      // classify each training data
      for (g = 1; g < rulenum; g++) {

        if (coeff[g][0] == 3) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][3]; 
            break;
          }
        }
        else if (coeff[g][0] == 5) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][5]; 
            break;
          }
        }
        else if (coeff[g][0] == 7) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][7]; 
            break;
          }
        }
        else if (coeff[g][0] == 9) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6] && Dtrain[coeff[g][7]][k] == coeff[g][8]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][9];
            break;
          }
        }
        else if (coeff[g][0] == 11) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6] && Dtrain[coeff[g][7]][k] == coeff[g][8] && Dtrain[coeff[g][9]][k] == coeff[g][10]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][11]; 
            break;
          }
        }
        else if (coeff[g][0] == 13) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6] && Dtrain[coeff[g][7]][k] == coeff[g][8] && Dtrain[coeff[g][9]][k] == coeff[g][10] && Dtrain[coeff[g][11]][k] == coeff[g][12]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][13]; 
            break;
          }
        }
        else if (coeff[g][0] == 15) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6] && Dtrain[coeff[g][7]][k] == coeff[g][8] && Dtrain[coeff[g][9]][k] == coeff[g][10] && Dtrain[coeff[g][11]][k] == coeff[g][12] && Dtrain[coeff[g][13]][k] == coeff[g][14]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][15]; 
            break;        
          }
        }
        else if (coeff[g][0] == 17) {
          if (Dtrain[coeff[g][1]][k] == coeff[g][2] && Dtrain[coeff[g][3]][k] == coeff[g][4] && Dtrain[coeff[g][5]][k] == coeff[g][6] && Dtrain[coeff[g][7]][k] == coeff[g][8] && Dtrain[coeff[g][9]][k] == coeff[g][10] && Dtrain[coeff[g][11]][k] == coeff[g][12] && Dtrain[coeff[g][13]][k] == coeff[g][14] && Dtrain[coeff[g][15]][k] == coeff[g][16]) {
// console.log("g="+g+" "+coeff[g])
            ytrainH[k] = coeff[g][17]; 
            break;
          }
        }
      } // endof g

      for (j = 0; j < ngroup; j++) {
        if (ytrainH[k] == mdvalue[0][j]) {
           classTrain[ytrainN[k]][j]++;
           break;
        }
      }    

      yclassTrain[k] = ytrainH[k];
    } // endof k

    // total
    for (j = 0; j < ngroup; j++) { // column total
        classTrain[ngroup][j] = 0;
        for (i = 0; i < ngroup; i++) classTrain[ngroup][j] += classTrain[i][j];
    }
    classTrain[ngroup][ngroup] = 0;
    for (i = 0; i < ngroup; i++){ // row total
        classTrain[i][ngroup] = 0;
        for (j = 0; j < ngroup; j++) classTrain[i][ngroup] += classTrain[i][j];
        classTrain[ngroup][ngroup] += classTrain[i][ngroup];
    }

    
    // determine class of testing data
  if (training < 1) {
    for (i = 0; i < ngroup; i++) 
      for (j = 0; j < ngroup; j++) classTest[i][j] = 0;
    for (k = 0; k < testobs; k++) {
      // classify each testing data
      for (g = 1; g < rulenum; g++) {

        if (coeff[g][0] == 3) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2]) {
            ytestH[k] = coeff[g][3]; 
            break;
          }
        }
        else if (coeff[g][0] == 5) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4]) {
            ytestH[k] = coeff[g][5]; 
            break;
          }
        }
        else if (coeff[g][0] == 7) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6]) {
            ytestH[k] = coeff[g][7]; 
            break;
          }
        }
        else if (coeff[g][0] == 9) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6] && Dtest[coeff[g][7]][k] == coeff[g][8]) {
            ytestH[k] = coeff[g][9];
            break;
          }
        }
        else if (coeff[g][0] == 11) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6] && Dtest[coeff[g][7]][k] == coeff[g][8] && Dtest[coeff[g][9]][k] == coeff[g][10]) {
            ytestH[k] = coeff[g][11]; 
            break;
          }
        }
        else if (coeff[g][0] == 13) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6] && Dtest[coeff[g][7]][k] == coeff[g][8] && Dtest[coeff[g][9]][k] == coeff[g][10] && Dtest[coeff[g][11]][k] == coeff[g][12]) {
            ytestH[k] = coeff[g][13]; 
            break;
          }
        }
        else if (coeff[g][0] == 15) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6] && Dtest[coeff[g][7]][k] == coeff[g][8] && Dtest[coeff[g][9]][k] == coeff[g][10] && Dtest[coeff[g][11]][k] == coeff[g][12] && Dtest[coeff[g][13]][k] == coeff[g][14]) {
            ytestH[k] = coeff[g][15]; 
            break;        
          }
        }
        else if (coeff[g][0] == 17) {
          if (Dtest[coeff[g][1]][k] == coeff[g][2] && Dtest[coeff[g][3]][k] == coeff[g][4] && Dtest[coeff[g][5]][k] == coeff[g][6] && Dtest[coeff[g][7]][k] == coeff[g][8] && Dtest[coeff[g][9]][k] == coeff[g][10] && Dtest[coeff[g][11]][k] == coeff[g][12] && Dtest[coeff[g][13]][k] == coeff[g][14] && Dtest[coeff[g][15]][k] == coeff[g][16]) {
            ytestH[k] = coeff[g][17]; 
            break;
          }
        }
      } // endof g

      for (j = 0; j < ngroup; j++) {
        if (ytestH[k] == mdvalue[0][j]) {
           classTest[ytestN[k]][j]++;
           break;
        }
      }    

      yclassTest[k] = ytestH[k];
    } // endof k

    // total
    for (j = 0; j < ngroup; j++) {
      classTest[ngroup][j] = 0;
      for (i = 0; i < ngroup; i++) classTest[ngroup][j] += classTest[i][j];
    }
    classTest[ngroup][ngroup] = 0;
    for (i = 0; i < ngroup; i++){
      classTest[i][ngroup] = 0;
      for (j = 0; j < ngroup; j++) classTest[i][ngroup] += classTest[i][j];
      classTest[ngroup][ngroup] += classTest[i][ngroup];
    }
  }

  printClasssificationResult() 
}

// print classification result
function printClasssificationResult() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, str1;
    var num = 0;
    var ncol = tnumVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";    
    row = table.insertRow(num);
    row.style.height = "20px";

    // classification result of training data
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[148][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < ngroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+gdataValue[k]; //  decision
    }
    cell[ngroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < ngroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ngroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+gdataValue[k]; 
      for (j = 0; j < ngroup; j++) {
        temp1 = 100 * classTrain[k][j] / classTrain[ngroup][ngroup];
        temp2 = 100 * classTrain[k][j] / classTrain[k][ngroup];
        cell[j+1].innerHTML = classTrain[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTrain[k][ngroup] / classTrain[ngroup][ngroup];
      cell[ngroup+1].style.backgroundColor = "#eee";
      cell[ngroup+1].innerHTML = classTrain[k][ngroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(++num);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < ngroup; j++) { //  decision
      temp1 = 100 * classTrain[ngroup][j] / classTrain[ngroup][ngroup];
      cell[j+1].innerHTML = classTrain[ngroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[ngroup+1].innerHTML = classTrain[ngroup][ngroup]+"<br>"+f2(100)+" %"; // Total
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
    for (k = 0; k < ngroup; k++) temp += classTrain[k][k];
    temp /= classTrain[ngroup][ngroup];
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
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "center";
    }
    cell[0].innerHTML = svgStrU[149][langNum]+" "+ svgStrU[142][langNum]+"<br>"+svgStrU[147][langNum]+" %<br>"+svgStr[126][langNum]; 
    for (k = 0; k < ngroup; k++) { //  decision
      cell[k+1].innerHTML = svgStrU[145][langNum]+"<br>"+tdvarName[0]+" : "+dataValue[k]; //  decision
    }
    cell[ngroup+1].innerHTML = svgStrU[48][langNum]; // Total
    for (k = 0; k < ngroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ngroup+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
        cell[j].style.textAlign = "right";
      }
      cell[0].style.textAlign = "left";
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = tdvarName[0]+" : "+dataValue[k]; 
      for (j = 0; j < ngroup; j++) {
        temp1 = 100 * classTest[k][j] / classTest[ngroup][ngroup];
        temp2 = 100 * classTest[k][j] / classTest[k][ngroup];
        cell[j+1].innerHTML = classTest[k][j]+"<br>"+f2(temp1)+" %<br>"+f2(temp2)+" %"; 
      }
      temp1 = 100 * classTest[k][ngroup] / classTest[ngroup][ngroup];
      cell[ngroup+1].style.backgroundColor = "#eee";
      cell[ngroup+1].innerHTML = classTest[k][ngroup]+"<br>"+f2(temp1)+" %<br>"+f2(100)+" %"; // Total
    }
    row = table.insertRow(++num);
    for (j = 0; j < ngroup+2; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.border = "1px solid black";
      cell[j].style.width = "120px";
      cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[48][langNum]; // Total
    for (j = 0; j < ngroup; j++) { //  decision
      temp1 = 100 * classTest[ngroup][j] / classTest[ngroup][ngroup];
      cell[j+1].innerHTML = classTest[ngroup][j]+"<br>"+f2(temp1)+" %"; // Total
    }
    cell[ngroup+1].innerHTML = classTest[ngroup][ngroup]+"<br>"+f2(100)+" %"; // Total
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
    for (k = 0; k < ngroup; k++) temp += classTest[k][k];
    temp /= classTest[ngroup][ngroup];
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

// decision tree table
function decisionTreeTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp;
    var ncol = 20;
    var row  = new Array(nrow+1);
    var cell = new Array(ncol);
    for (i = 0; i < nrow+1; i++) {
      cell[i] = new Array(ncol);
    }

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    for (i = 0; i < nrow+1; i++) {
      row[i] = table.insertRow(i);
      for (j = 0; j < ncol; j++) {
        cell[i][j] = row[i].insertCell(j);
        cell[i][j].style.textAlign = "center";
        cell[i][j].style.width = "90px";
        cell[i][j].style.height= "15px";
      }
    }
    // 헤더
    cell[0][0].innerHTML = "<h3>"+svgStrU[137][langNum]+"</h3>"; // decision tree
    cell[0][0].style.textAlign = "left";
    cell[0][0].style.backgroundColor = "white";
    cell[0][0].style.width = "100px";
    cell[0][0].colSpan = "2";

    // tree
    for (i = 1; i < nrow+1; i++) {
      for (j = 0; j < tree[i][0]; j++) {
          if (tidx[i][j+1] == 1) { // node
            cell[i][j].innerHTML = tdvarName[tree[i][j+1]];
            cell[i][j].style.backgroundColor = "yellow";
            cell[i][j].style.border = "1px solid black";
            cell[i][j].style.borderRadius = "30px";
            cell[i][j].style.padding = "5px";
          }
          else if (tidx[i][j+1] == 2) { // vertical line + arrow
            cell[i][j].innerHTML = "&vert;&#10230; "+tree[i][j+1]; // +"↦ ⤇⟹ &#x2502;&#10230;&vert;
            cell[i][j].style.textAlign = "left";
          }
          else if (tidx[i][j+1] == 3) { // decision group
            cell[i][j].innerHTML = tree[i][j+1];
            cell[i][j].style.color = "white";
            for (k = 0; k < ngroup; k++) {
              if (tree[i][j+1] == gdataValue[k]) {
                cell[i][j].style.backgroundColor = myColor[k];
                break;
              }
            }
            cell[i][j].style.border = "1px solid black";
            cell[i][j].style.padding = "5px";
          }
          else if (tidx[i][j+1] == 4) { // vertical line
            cell[i][j].innerHTML = "&vert;";
            cell[i][j].style.textAlign = "left";
          }
      } // endof j
    }  // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(nrow+1);
    row.style.height = "20px";
}
// ----------------------------------------------------------------------
// Bayes classification -------------------------------------------------
// Discriminant ---------------------------------------------------------
function discriminant(tnumVar, tobs, testobs) {
    var g, h, i, j, k, gg, temp, t1, t2;
    var T0 = new Array(tnumVar); 
    var T1 = new Array(tnumVar); 

    // inverse of total covariance gcov
    covarianceInv(tnumVar) ;
    // inverse of group covariance Dcov
//    DcovInv(tnumVar);

    // linear discriminant function 
    // (mu[i] - mu[j])' ginv
    for (g = 0; g < ngroup-1; g++) {
      for (h = g+1; h < ngroup; h++) {
          for (j = 0; j < tnumVar; j++) {
            T0[j] = Davg[g][j] - Davg[h][j];
            T1[j] = (-0.5)*(Davg[g][j] + Davg[h][j]);
          }
// console.log(T0)
// console.log(T1)
          for (j = 0; j < tnumVar; j++) {
            Bcoeff[g][h][j] = 0;  // linear discriminant coefficient
            for (k = 0; k < tnumVar; k++) {
              Bcoeff[g][h][j] += T0[k]*ginv[k][j];
            }
          }
          temp = 0;
          for (k = 0; k < tnumVar; k++) {
              temp += Bcoeff[g][h][k]*T1[k];
          }
          Bcoeff[g][h][tnumVar] = temp - Math.log(prior[h]/prior[g]);
// console.log(Bcoeff[g][h])
      } // endof h
    } // endof g

    // determine class of training data
    for (i = 0; i < ngroup; i++) 
      for (j = 0; j < ngroup; j++) classTrain[i][j] = 0;
    for (k = 0; k < tobs; k++) {
      for (g = 0; g < ngroup-1; g++) {
        for (h = g+1; h < ngroup; h++) {
          classValue[g][h] = 0
          for (i = 0; i < tnumVar; i++) classValue[g][h] += Bcoeff[g][h][i] * Dtrain[i][k];
          classValue[g][h] += Bcoeff[g][h][tnumVar];
          classValue[h][g] = (-1)*classValue[g][h];
        } // endof h
      } // endof g
      // find group
      for (g = 0; g < ngroup; g++) {
        gg = 0;
        for (h = 0; h < ngroup; h++) {
          if (g == h) continue;
          if (classValue[g][h] > 0) gg++;
        }
        if (gg == (ngroup-1)) {
          yclassTrain[k] = g; // gdataValue[g]
          classTrain[ytrainN[k]][g]++;
          break;
        }
      } // endof g
    } // endof k
    // total
    for (j = 0; j < ngroup; j++) {
        classTrain[ngroup][j] = 0;
        for (i = 0; i < ngroup; i++) classTrain[ngroup][j] += classTrain[i][j];
    }
    classTrain[ngroup][ngroup] = 0;
    for (i = 0; i < ngroup; i++){
        classTrain[i][ngroup] = 0;
        for (j = 0; j < ngroup; j++) classTrain[i][ngroup] += classTrain[i][j];
        classTrain[ngroup][ngroup] += classTrain[i][ngroup];
    }
    
    // determine class of testing data
  if (training < 1) {
    for (i = 0; i < ngroup; i++) 
      for (j = 0; j < ngroup; j++) classTest[i][j] = 0;
    for (k = 0; k < testobs; k++) {
      for (g = 0; g < ngroup-1; g++) {
        for (h = g+1; h < ngroup; h++) {
          classValue[g][h] = 0
          for (i = 0; i < tnumVar; i++) classValue[g][h] += Bcoeff[g][h][i] * Dtest[i][k];
          classValue[g][h] += Bcoeff[g][h][tnumVar];
          classValue[h][g] = (-1)*classValue[g][h];
        } // endof h
      } // endof g
      // find all cij > 0
      for (g = 0; g < ngroup; g++) {
        gg = 0;
        for (h = 0; h < ngroup; h++) {
          if (g == h) continue;
          if (classValue[g][h] > 0) gg++;
        }
        if (gg == (ngroup-1)) {
          yclassTest[k] = g; // gdataValue[g]
          classTest[ytestN[k]][g]++;
          break;
        }
      }
    } // endof k

    // total
    for (j = 0; j < ngroup; j++) {
      classTest[ngroup][j] = 0;
      for (i = 0; i < ngroup; i++) classTest[ngroup][j] += classTest[i][j];
    }
    classTest[ngroup][ngroup] = 0;
    for (i = 0; i < ngroup; i++){
      classTest[i][ngroup] = 0;
      for (j = 0; j < ngroup; j++) classTest[i][ngroup] += classTest[i][j];
      classTest[ngroup][ngroup] += classTest[i][ngroup];
    }
  }
}

// inverse of total covariance ----------------------------------------------------------------------
function covarianceInv(tnumVar) {
    var i, j, k;
    var temp, tempx, tempy, sum;
    var nAug = 2 * tnumVar;
    var L    = new Array(tnumVar); // 2차원 행렬
    var U    = new Array(tnumVar); // 2차원 행렬
    var invL = new Array(tnumVar); // 2차원 행렬
    var invU = new Array(tnumVar); // 2차원 행렬
    for (j = 0; j < tnumVar; j++) {
        L[j]    = new Array(nAug);
        U[j]    = new Array(nAug);
        invL[j] = new Array(tnumVar);
        invU[j] = new Array(tnumVar);
    }
    // L matrix 
    for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) {
            L[i][j] = gcov[i][j];
        }
    }
    // Cholesky Decomposition LU
    for (k = 0; k < tnumVar; k++) {
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
// console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
// console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
    for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) {
            if (j > i) L[i][j] = 0;
            U[j][i] = L[i][j];
        }
    }
    // Augment matrix
    for (i = 0; i < tnumVar; i++) {
        for (k = tnumVar; k < nAug; k++) {
            if (k == i + tnumVar) {
                L[i][k] = 1;
                U[i][k] = 1;
            } else {
                L[i][k] = 0;
                U[i][k] = 0;
            }
        }
    }
    // inverse of L by Gauss Elimination
    for (k = 0; k < tnumVar; k++) {
        temp = L[k][k];
        for (j = k; j < nAug; j++) L[k][j] = L[k][j] / temp;
        for (i = k + 1; i < tnumVar; i++) {
            temp = L[i][k];
            for (j = k; j < nAug; j++) {
                L[i][j] = L[i][j] - temp * L[k][j];
            }
        }
    }
    for (i = 0; i < tnumVar; i++) {
        for (j = tnumVar; j < nAug; j++) invL[i][j - tnumVar] = L[i][j];
    }
// console.log(invL)
    // inverse of U = (invL)^T
    for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) invU[i][j] = invL[j][i];
    }
// console.log(invU)
    // inverse of ginv = (invU)(invL)
    for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) {
            sum = 0;
            for (k = 0; k < tnumVar; k++) {
              sum += invU[i][k] * invL[k][j];
//console.log("i="+i+" j="+j+" k="+k+" "+sum+" invU[i][k]="+invU[i][k]+" invL[k][j]="+invL[k][j])
            }
            ginv[i][j] = sum;
        }
    }
//console.log(ginv)
    // Final Test for identity
    for (i = 0; i < tnumVar; i++) {
        for (j = 0; j < tnumVar; j++) {
            sum = 0;
            for (k = 0; k < tnumVar; k++) sum += gcov[i][k] * ginv[k][j];
        }
    }


//    console.log("i=0 "+ginv[0][0]+" "+ginv[0][1]+" "+ginv[0][2]);  
//    console.log("i=1 "+ginv[1][0]+" "+ginv[1][1]+" "+ginv[1][2]);  
//    console.log("i=2 "+ginv[2][0]+" "+ginv[2][1]+" "+ginv[2][2]);  

//    console.log("i="+i+" "+L[i][0]+" "+L[i][1]+" "+L[i][2]+" "+L[i][3]+" "+L[i][4]+" "+L[i][5]);
//    console.log("k="+k+" "+L[k][0]+" "+L[k][1]+" "+L[k][2]+" "+L[k][3]+" "+L[k][4]+" "+L[k][5]);  
//    console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
//    console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
//    console.log("k="+k+" "+L[2][0]+" "+L[2][1]+" "+L[2][2]+" "+L[2][3]+" "+L[2][4]+" "+L[2][5]);  
 
}

// print Bayes classification function
function printBayesClassificationFunction() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, temp, temp1, temp2, str1;
    var num = 0;
    var ncol = tnumVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";

    // print classification function
    row = table.insertRow(num++);
    cell[0] = row.insertCell(0);
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].style.width = "50px";
    cell[0].style.height = "20px";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[143][langNum]; // Classification function
    cell[0].colSpan = 2;
    for (g = 0; g < ngroup-1; g++) {
      for (h = g+1; h < ngroup; h++) {
        row = table.insertRow(num++);
        cell[0] = row.insertCell(0);
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.border = "1px solid black";
        cell[0].style.width = "50px";
        cell[0].style.height = "40px";
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = "C<sub>"+(g+1).toString()+(h+1).toString()+"</sub>"
        cell[1] = row.insertCell(1);
        cell[1].style.border = "1px solid black";
        cell[1].style.width = "600px";
        cell[1].style.textAlign = "left";
        str1 = " ";
        for (i = 0; i < tnumVar; i++) {
          str1 += "("+f3(Bcoeff[g][h][i]).toString()+") ("+tdvarName[i+1]+") +";
        }
        str1 += "("+f3(Bcoeff[g][h][tnumVar]).toString()+") = 0";
        cell[1].innerHTML = str1;
        cell[1].colSpan = "6";
      }
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";
}

// kNN
function kNN(tnumVar, tobs, testobs, ngroup) {
   var i, j, k, g, h, sum, temp, tempi, maxf, maxi;
   var index    = new Array(rowMax);
   var distance = new Array(rowMax);
   var count    = new Array(ngroup); 

   for (g = 0; g < ngroup; g++) {
     for (h = 0; h < ngroup; h++) {
       classTrain[g][h] = 0;
       classTest[g][h]  = 0;
     }
   }
   // calculate distance from test to training
//   console.log(methodType24)
   for (i = 0; i < testobs; i++) {
      for (k = 0; k < tobs; k++) {
        sum = 0
        for (j = 0; j < tnumVar; j++) { // Euclid square
          if (methodType24 == 1) {
            temp = Dtest[j][i] - Dtrain[j][k];
            sum += temp * temp;
          }
          else if (methodType24 == 2) {
            sum += Math.abs(Dtest[j][i] - Dtrain[j][k]);
          }
//console.log(Dtest[j][i] +" "+ Dtrain[j][k]+" "+ sum)
        }
        distance[k] = sum;
//console.log("i="+(i+1).toString()+" "+distance[k])
//console.log(Dtest[i])
      }

      // Sorting ascending and indexing data in ascending order
      for (k = 0; k < tobs; k++) index[k] = ytrainN[k];
      for (k = 0; k < tobs-1; k++) {
        for (j = k+1; j < tobs; j++) {
          if (distance[k] > distance[j]) {
              temp        = distance[k];  tempi    = index[k];
              distance[k] = distance[j];  index[k] = index[j];
              distance[j] = temp;         index[j] = tempi;  
          }
        }
      } 
//console.log(distance)
//console.log(index)
      // voting and assign group with hightest distance
      for (j = 0; j < ngroup; j++) count[j] = 0;
      for (k = 0; k < numK; k++) count[index[k]]++;
      maxf = count[0];
      maxi = 0;
      for (j = 1; j < ngroup; j++) {
        if (count[j] > maxf) {
          maxf = count[j];
          maxi = j;
        }
      } 
//console.log(count)
//console.log(maxi)
      yclassTest[i] = maxi;
      classTest[ytestN[i]][yclassTest[i]]++;
// console.log(i+" "+ytestN[i]+" "+yclassTest[i])
   } // endof i   
   // total
   for (j = 0; j < ngroup; j++) {
      classTest[ngroup][j] = 0;
      for (i = 0; i < ngroup; i++) classTest[ngroup][j] += classTest[i][j];
   }
   classTest[ngroup][ngroup] = 0;
   for (i = 0; i < ngroup; i++){
      classTest[i][ngroup] = 0;
      for (j = 0; j < ngroup; j++) classTest[i][ngroup] += classTest[i][j];
      classTest[ngroup][ngroup] += classTest[i][ngroup];
   }

   // calculate distance from training to test
   for (i = 0; i < tobs; i++) {
     
      for (k = 0; k < testobs; k++) {
        sum = 0
        for (j = 0; j < tnumVar; j++) { // Euclid square
          temp = Dtest[j][i] - Dtrain[j][k];
          sum += temp * temp;
        }
        distance[k] = sum;
      }

      // Sorting ascending and indexing data in ascending order
      for (k = 0; k < testobs; k++) index[k] = ytestN[k];
      for (k = 0; k < testobs-1; k++) {
        for (j = k+1; j < testobs; j++) {
          if (distance[k] > distance[j]) {
              temp        = distance[k];  tempi    = index[k];
              distance[k] = distance[j];  index[k] = index[j];
              distance[j] = temp;         index[j] = tempi;  
          }
        }
      } 
      // voting and assign group with hightest distance
      for (j = 0; j < ngroup; j++) count[j] = 0;
      for (k = 0; k < numK; k++) count[index[k]]++;
      maxf = count[0];
      maxi = 0;
      for (j = 1; j < ngroup; j++) {
        if (count[j] > maxf) {
          maxf = count[j];
          maxi = j;
        }
      } 
      yclassTrain[i] = maxi;
      classTrain[ytrainN[i]][yclassTrain[i]]++;
// console.log(i+" "+ytrainN[i]+" "+yclassTrain[i])
   } // endof i   

   // total
   for (j = 0; j < ngroup; j++) {
        classTrain[ngroup][j] = 0;
        for (i = 0; i < ngroup; i++) classTrain[ngroup][j] += classTrain[i][j];
   }
   classTrain[ngroup][ngroup] = 0;
   for (i = 0; i < ngroup; i++){
        classTrain[i][ngroup] = 0;
        for (j = 0; j < ngroup; j++) classTrain[i][ngroup] += classTrain[i][j];
        classTrain[ngroup][ngroup] += classTrain[i][ngroup];
   }
}

//---------------------------------------------------------
// PCA ----------------------------------------------------
//---------------------------------------------------------
function statPCA(numVar, tobs) {
        var i, j, k, temp, tempi, t1, t2;

        // means
        for (j = 0; j < numVar; j++) {
              gavg[j] = 0;
              for (i = 0; i < tobs; i++) {
                gavg[j] += parseFloat(mdvar[j][i]);
              }
              gavg[j] /= tobs;
        }
        // covariance
        for (i = 0; i < numVar; i++) {
              for (j= 0; j < numVar; j++) {
                gcov[i][j] = 0;
              }
        }
        for (k = 0; k < tobs; k++) {
                for (i = 0; i < numVar; i++) {
                  t1 = parseFloat(mdvar[i][k]) - gavg[i];
                  for (j= 0; j < numVar; j++) {
                    t2 = parseFloat(mdvar[j][k]) - gavg[j];
                    gcov[i][j] += t1 * t2;
                  }
                }
        }
        // correlation
        for (i = 0; i < numVar; i++) {
                for (j= 0; j < numVar; j++) {
                  gcorr[i][j] = gcov[i][j] / Math.sqrt(gcov[i][i] * gcov[j][j]);
                  A[i][j]     = gcorr[i][j];     // copy correlation to A matrix
                  curS[i+1][j+1] = gcorr[i][j]; 
                }
                gstd[i] = Math.sqrt(gcov[i][i]/(tobs-1));
        }

        // eigenvalues, eigenvectors of correlation by Givens
        // A: correlation matrix => A[i][i]: eigenvalues ; V[i][j]: eigenvectors
        var Nrun=31;
        var tol=1.0E-22;
//        Givens(numVar,A,V,Nrun,tol);
//        for (i = 0; i < numVar; i++) {eigen[i] = A[i][i]; index[i] = i;}

// -----------------------------------------------------------------
//  compute eigenvalues & eigenvectors of curS, and sort them in descending order by G. S. Kang
//  curS : covariance matrix or correlation matrix   
//  curS    = (double **)Alloc2D( (nvar+1), sizeof( double ) * (nvar+1) );  i,j=1,2,..., nvar
//  tempv : working vector
//  tempv  = (double  *)Alloc1D(sizeof( double ) * (nvar+1) );
//  isp_trdi( curS, nvar, eigen, tempv, 1 );
//  isp_eigen( eigen, tempv, nvar, curS, &ierror, 1 ); // eigenvectors: curS[i][j]: i,j=1,2,..., nvar

    var tempv = new Array(numVar+1);  
    var info  = 0
    var ierror = 0;
    isp_trdi( curS, numVar, eigen, tempv, 1 );
    ierror = isp_eigen( eigen, tempv, numVar, curS, ierror, 1 );
// console.log(eigen)
// for (i=1; i<numVar+1; i++) console.log(i+" "+curS[i])

        // descending sort by eigenvalues
        for (i = 0; i < numVar; i++) {eigen[i] = eigen[i+1]; index[i] = i+1;}
        for (i = 0; i < numVar-1; i++) {
          for (j = i+1; j < numVar; j++) {
            if (eigen[j] > eigen[i]) {
              temp     = eigen[i]; tempi    = index[i];
              eigen[i] = eigen[j]; index[i] = index[j];
              eigen[j] = temp;     index[j] = tempi;
            }
          }
        }
        for (i = 0; i < numVar; i++){
          for (j = 0; j < numVar; j++) {
            vector[i][j] = curS[i+1][index[j]];
          }
        }
        // principal components Y
        for (i = 0; i < tobs; i++) {
          for (j = 0; j < numVar; j++){
            Y[j][i] = 0;
            for (k = 0; k < numVar; k++) {
              Y[j][i] += mdvar[k][i] * vector[j][k] ;
            }
          }
        }

        // PC means
        for (j = 0; j < numVar; j++) {
              Yavg[j] = 0;
              for (i = 0; i < tobs; i++) {
                Yavg[j] += parseFloat(Y[j][i]);
              }
              Yavg[j] /= tobs;
        }
        // PC covariance
        for (i = 0; i < numVar; i++) {
              for (j= 0; j < numVar; j++) {
                Ycov[i][j] = 0;
              }
        }
        for (k = 0; k < tobs; k++) {
                for (i = 0; i < numVar; i++) {
                  t1 = parseFloat(Y[i][k]) - Yavg[i];
                  for (j= 0; j < numVar; j++) {
                    t2 = parseFloat(Y[j][k]) - Yavg[j];
                    Ycov[i][j] += t1 * t2;
                  }
                }
        }
        // PC correlation
        for (i = 0; i < numVar; i++) {
                for (j= 0; j < numVar; j++) {
                  Ycorr[i][j] = Ycov[i][j] / Math.sqrt(Ycov[i][i] * Ycov[j][j]);
                }
                Ystd[i] = Math.sqrt(Ycov[i][i]/(tobs-1));
        }

}

// pca statistics table
function pcaStatTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, str1;
    var num = 0;
    var ncol = numVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";

    row = table.insertRow(num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[1].style.width = "60px";
    cell[0].innerHTML = svgStr[34][langNum]+" ("+svgStr[35][langNum]+")"; // Mean (Std Dev)
    cell[1].innerHTML = svgStr[44][langNum]; // Observation;
    for (j = 0; j < numVar; j++) {
        cell[j+2].innerHTML = tdvarName[j];
    }

    row = table.insertRow(++num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.width = "120px";
    cell[0].style.textAlign = "center";
    cell[1].style.textAlign = "center";
    cell[0].innerHTML = svgStr[23][langNum]; // Total
    cell[1].innerHTML = tobs;
    for (j = 0; j < numVar; j++) {
         cell[j+2].innerHTML = f3(gavg[j]) +" ("+ f3(Math.sqrt(gstd[j]))+")";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    if (ngroup == 1) str1 = svgStr[108][langNum];  // correlation matrix
    else svgStr[108][langNum]+"<br>Cluster"+(k+1).toString();
    cell[0].innerHTML = str1;
    for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = tdvarName[j];
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
        cell[0].innerHTML = tdvarName[i];
        for (j = 0; j < numVar; j++) {
          cell[j+1].innerHTML = f3(gcorr[i][j]);
        }
    } // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    // Eigenvalues 
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[0].innerHTML = svgStr[131][langNum]; // eigenvalues
    for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = YvarNameSub[j];
    }
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    for (j = 0; j < numVar; j++) {
        cell[j+1].style.textAlign = "right";
        temp = 100 * eigen[j] / numVar;
        cell[j+1].innerHTML = f3(eigen[j]) + " ("+f2(temp)+"%)";
    }

    // Eigenvectors 
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[0].innerHTML = svgStr[132][langNum]; // eigenvector
    for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = evarNameSub[j];
    }
    for (k = 0; k < numVar; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
      }
      cell[0].style.width = "120px";
      cell[0].style.textAlign = "center";
      cell[0].innerHTML = XvarNameSub[k]; // X
      for (j = 0; j < numVar; j++) {
         cell[j+1].innerHTML = f3(vector[k][j]); // eigenvectors
      }
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
    // PCA stat
    row = table.insertRow(++num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[1].style.width = "60px";
    cell[0].innerHTML = "Y "+svgStr[34][langNum]+" ("+svgStr[35][langNum]+")"; // Mean (Std Dev)
    cell[1].innerHTML = svgStr[44][langNum]; // Observation;
    for (j = 0; j < numVar; j++) {
        cell[j+2].innerHTML = YvarNameSub[j];
    }

    row = table.insertRow(++num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.width = "120px";
    cell[0].style.textAlign = "center";
    cell[1].style.textAlign = "center";
    cell[0].innerHTML = svgStr[23][langNum]; // Total
    cell[1].innerHTML = tobs;
    for (j = 0; j < numVar; j++) {
         cell[j+2].innerHTML = f3(Yavg[j]) +" ("+ f3(Math.sqrt(Ystd[j]))+")";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    str1 = "Y "+svgStr[108][langNum];  // correlation matrix
    cell[0].innerHTML = str1;
    for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = YvarNameSub[j];
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
        cell[0].innerHTML = YvarNameSub[i];
        for (j = 0; j < numVar; j++) {
          cell[j+1].innerHTML = f3(Ycorr[i][j]);
        }
    } // endof i

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

// pca output --------------------------------------------------------------------------------------------------
function pcaTable(numVar, tobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j;
    var row;
    var num = 0;
    var ncol = numVar + 1;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // 헤더
    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.width = "40px";
    cell[0].innerHTML = "id";
    for (j = 0; j < numVar; j++) cell[j+1].innerHTML = YvarNameSub[j];

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
        }
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = i+1;
        for (j = 0; j < numVar; j++) cell[j+1].innerHTML = f3(Y[j][i]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

// void isp_trdi( double **a, int n, double *d, double *e, int unit)
function isp_trdi( a, n, d, e, unit)
{
/*
	Reduce a real symmetric matrix to a symmetric tridiagonal matrix.

	a : symmetric matrix of order n to be reduced to tridiag. form,
	    On output, it contains orthogonal transformation matrix
	    producing the reduction.
	n : order of matrix a
	d : vector of dim. n. On output, it contains diagonal elements
		of tridiag. matrix
	e : vector of dim. n. On output, it contains subdiagonal elements.
	unit : indicator of unit-offset.
*/

	var l,k,j,i;
	var scale,hh,h,g,f;

	if ( !unit ) {
		d = d - 1;
		e = e - 1;
		a = a - 1;
		for (i=1; i<=n; i++)  a[i] = a[i] - 1;
	}

	for (i=n;i>=2;i--) {
		l=i-1;
		h=scale=0.0;
		if (l > 1) {
			for(k=1;k<=l;k++) scale += Math.abs(a[i][k]);
			if (scale == 0.0) e[i]=a[i][l];
			else {
				for (k=1;k<=l;k++) {
					a[i][k] /= scale;
					h += a[i][k]*a[i][k];
				}
				f=a[i][l];
				g = f>0 ? -Math.sqrt(h) : Math.sqrt(h);
				e[i]=scale*g;
				h -= f*g;
				a[i][l]=f-g;
				f=0.0;
				for (j=1;j<=l;j++) {
				/* Next statement can be omitted if eigenvectors not wanted */
					a[j][i]=a[i][j]/h;
					g=0.0;
					for (k=1;k<=j;k++) g += a[j][k]*a[i][k];
					for (k=j+1;k<=l;k++) g += a[k][j]*a[i][k];
					e[j]=g/h;
					f += e[j]*a[i][j];
				}
				hh=f/(h+h);
				for (j=1;j<=l;j++) {
					f=a[i][j];
					e[j]=g=e[j]-hh*f;
					for (k=1;k<=j;k++) a[j][k] -= (f*e[k]+g*a[i][k]);
				}
			}
		} else
			e[i]=a[i][l];
		d[i]=h;
	}
	/* Next statement can be omitted if eigenvectors not wanted */
	d[1]=0.0;
	e[1]=0.0;
	/* Contents of this loop can be omitted if eigenvectors not
			wanted except for statement d[i]=a[i][i]; */
	for (i=1;i<=n;i++) {
		l=i-1;
		if (d[i]) {
			for (j=1;j<=l;j++) {
				g=0.0;
				for (k=1;k<=l;k++) g += a[i][k]*a[k][j];
				for (k=1;k<=l;k++) a[k][j] -= g*a[k][i];
			}
		}
		d[i]=a[i][i];
		a[i][i]=1.0;
		for (j=1;j<=l;j++) a[j][i]=a[i][j]=0.0;
	}
	if ( !unit ) {
		d = d + 1;
		e = e + 1;
		a = a + 1;
		for (i=0; i<n; i++)  a[i] = a[i] + 1;
	}
}

function isp_eigen(d, e, n, z, ierror, unit)
{
	var m,l,iter,i,k;
	var s,r,p,g,f,dd,c,b;

	if ( !unit ) {
		d = d - 1;
		e = e - 1;
		z = z - 1;
		for (i=1; i<=n; i++)  z[i] = z[i] - 1;
	}

	for (i=2;i<=n;i++) e[i-1]=e[i];
	e[n]=0.0;
	for (l=1;l<=n;l++) {
		iter=0;
		do {  
			for (m=l;m<=n-1;m++) {
				dd=Math.abs(d[m])+Math.abs(d[m+1]);
				if ((Math.abs(e[m])+dd) == dd) break;
			}
			if (m != l) {
				if (iter++ == 40 ) { /* error("Too many iterations in EIGEN"); */ 
                                  ierror = 1;
                                  return ierror;
                                }
				g=(d[l+1]-d[l])/(2.0*e[l]);
				r=Math.sqrt((g*g)+1.0);
				if (g < 0.0) g=d[m]-d[l]+e[l]/ ( g - Math.abs(r) );
				else g=d[m]-d[l]+e[l]/ ( g + Math.abs(r) );
				s=c=1.0;
				p=0.0;
				for (i=m-1;i>=l;i--) {
					f=s*e[i];
					b=c*e[i];
					if (Math.abs(f) >= Math.abs(g)) {
						c=g/f;
						r=Math.sqrt((c*c)+1.0);
						e[i+1]=f*r;
						c *= (s=1.0/r);
					} else {
						s=f/g;
						r=Math.sqrt((s*s)+1.0);
						e[i+1]=g*r;
						s *= (c=1.0/r);
					}
					g=d[i+1]-p;
					r=(d[i]-g)*s+2.0*c*b;
					p=s*r;
					d[i+1]=g+p;
					g=c*r-b;
					/* Next loop can be omitted if eigenvectors not wanted */
					for (k=1;k<=n;k++) {
						f=z[k][i+1];
						z[k][i+1]=s*z[k][i]+c*f;
						z[k][i]=c*z[k][i]-s*f;
					}
				}
				d[l]=d[l]-p;
				e[l]=g;
				e[m]=0.0;
			}
		} while (m != l);
	}
	if ( !unit ) {
		d = d + 1;
		e = e + 1;
		z = z + 1;
		for (i=0; i<n; i++)  z[i] = z[i] + 1;
	}
}

/*--------------------------------------------------------------------------*/
/* Givens rotations to compute eigenvalues of a real symmetric matrix */
/*--------------------------------------------------------------------------*/
// https://gist.github.com/lh3/c280b2ac477e85c5c666

function Givens(n, A, V, Nrun, tol)
{ 
  var i,j,k, p,q,r;
  var c,s,t,tau, tmax, alpha, xp,xq, eps=1.0E-22;
  var sum;

  for (i=0; i<n; i++)
    for (j=0; j<n; j++)
      if (i==j) V[i][j]=1.0;  else V[i][j]=0.0;

  for (k=0; k<Nrun; k++) {
    tmax=-1; 
    sum=0.0;
    for (i=0; i<n; i++)
      for (j=i+1; j<n; j++) {
        t=Math.abs(A[i][j]);
        sum+=(t*t);
        if (t > tmax) {tmax=t; p=i; q=j;}
    }
    sum=Math.sqrt(2.0*sum);
    if (sum < tol)  return;
    alpha=(A[q][q]-A[p][p])/2.0/A[p][q]; 
    t=((alpha>eps)? 1.0/(alpha+Math.sqrt(1.0+alpha*alpha)) : 
       (alpha<eps)? 1.0/(alpha-Math.sqrt(1.0+alpha*alpha)) : 1.0);

    c=1.0/Math.sqrt(1.0+t*t);
    s=c*t;
    tau=s/(1.0+c);

    /*--------------------------------------------------------------------------*/
    /*  A^(k+1)  \leftarrow J_k^t A^k J_k                                       */
    /*--------------------------------------------------------------------------*/
    for (r=0; r<p; r++)     A[p][r]=c*A[r][p]-s*A[r][q];
    for (r=p+1; r<n; r++)   if (r!=q) A[r][p]=c*A[p][r]-s*A[q][r];

    for (r=0; r<p; r++)     A[q][r]=s*A[r][p]+c*A[r][q];
    for (r=p+1; r<q; r++)   A[q][r]=s*A[p][r]+c*A[r][q];
    for (r=q+1; r<n; r++)   A[r][q]=s*A[p][r]+c*A[q][r];

    A[p][p]=A[p][p]-t*A[p][q];
    A[q][q]=A[q][q]+t*A[p][q];
    A[q][p]=0.0;

    for (i=0; i<n; i++)
      for (j=i+1; j<n; j++)
        A[i][j]=A[j][i];
    /*--------------------------------------------------------------------------*/
    /* Eigenvalue are in A[i][i], Eigenvectors are stored in the columns of V                              */
    /*--------------------------------------------------------------------------*/
    for (i=0; i<n; i++) {
      xp=V[i][p];
      xq=V[i][q];
      V[i][p]=c*xp-s*xq;
      V[i][q]=s*xp+c*xq;
    }
  }
}

// Draw Eigenvalue Graph 
function drawEigenvalue() {
    chart.selectAll("*").remove();
//    var margin  = {top: 80, bottom: 80, left: 80, right: 80};
//    graphWidth  = svgWidth - margin.left - margin.right;
//    graphHeight = svgHeight - margin.top - margin.bottom;
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var nrow = numVar;
    var betweenbarWidth = graphWidth / nrow; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = eigen[0];
    var freqMin  = eigen[numVar-1];
    var tbuffer  = (freqMax - freqMin) * 0.1;
    freqMax = freqMax + tbuffer;
    freqMin = freqMin - tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = "Line graph of eigenvalues"; 
    var yTitle = "Eigenvalue"; 
    var xTitle = "Principle component";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
         .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisLineEigen();

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    for (j = 0; j < numVar; j++) {
        x1 = margin.left + gapWidth + j*betweenbarWidth;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "15px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(j+1)
    }
    // line graph for eigenvalues
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (eigen[0] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=1; i<numVar; i++) {
        x2 = margin.left + gapWidth + i*betweenbarWidth;
        y2 = margin.top + graphHeight - (eigen[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
}
// Eigenvalue line그래프 축 그리기
function drawAxisLineEigen() {
    var i, j, tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);
    var freqMax  = eigen[0];
    var freqMin  = eigen[numVar-1];
    yScale = d3.scaleLinear().domain([freqMin, freqMax]).range([graphHeight, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("transform", "translate(" + tx + "," + ty + ")")
         .call(d3.axisLeft(yScale)) // 눈금을 표시할 함수 호출
    // Y축 그리드
    for (i = 0; i < ygrid.length; i++) {
      ty = margin.top + yScale(ygrid[i]);
      chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
    }
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left)
                    .attr("x2", margin.left)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left + graphWidth)
                    .attr("x2", margin.left + graphWidth)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
}

// Hierarchy Clustering ----------------------------------------------------------------------------------------------
function hierarchyCluster(numVar, tobs) {
    var i, j, k, l, m, ki, kj, temp, tempi, tempj, tempy;
    var ii, jj, kk, mm, nn, sobs, dmin, dmax, di, dj, ti, tj;
    var gmax, icheck, istop, tnp, nline, mline, ncluster;
    var numlink; // go with yindex[numlink]
    var tt   = new Array(rowMax);
    var tn   = new Array(rowMax); // total number of clusters tn[i], i=0, ..., numVar
    var td   = new Array(rowMax); // clusters,       td[i][j],j=0,...,tn[i]-1
    var ty   = new Array(rowMax); // y coordinates,  ty[i][j],j=0,...,tn[i]-1 
    var tc   = new Array(rowMax); // 각 iteration의 노드 두개씩  tc[i][j],j=0,1, i=0, maxiter 
    var tk   = new Array(rowMax); // iteraton number of ii tk[ii][j],j=0,...,maxiter
    var kidx = new Array(rowMax); // ii in each iteration 
    var cluster = new Array(rowMax); // cluster number, i=0,1, ncluster
    var tnc  = new Array(rowMax); // number of clustering for ii only to find graph location 
    var tnk  = new Array(rowMax); // number of clustering for ii only 
    var yloc = new Array(rowMax); // for graph +-0.5 yloc
    var tavg = new Array(rowMax);
    var savg = new Array(rowMax);
    var rank = new Array(rowMax);
    var ytmp = new Array(rowMax);
    for (k = 0; k < rowMax; k++) {
      td[k]  = new Array(rowMax);
      ty[k]  = new Array(rowMax);
      tk[k]  = new Array(rowMax);
    }

    // calculate initial distance
    sobs = tobs;
    gmax = 0;
    for (i = 0; i < sobs; i++) {
      rank[i] = 0;
      tt[i]   = i;
      tn[i]   = 0;
      tnc[i]  = 0;
      tnk[i]  = 0;
      wvarName[i] = obsName[i];
      for (j = 0; j < sobs; j++) {
        distance[i][j] = 0;
        for (k = 0; k < numVar; k++) {
          if (idistance == 1) { // Euclid square distance
            temp = Dtrain[k][i] - Dtrain[k][j]; 
            distance[i][j] += temp * temp;
          }
          else { // Manhattan distance
            temp = Dtrain[k][i] - Dtrain[k][j]; 
            distance[i][j] += Math.abs(temp);
          }
        }
        distorgi[i][j] = distance[i][j];
        if (distance[i][j] > gmax) gmax = distance[i][j];
      }
    }

    kk = 0; // iteration
    nn = 0; // line location
    numlink = 0; // number of observations linked 
    ncluster = 0; // current number of clusters

    // repeat until it becomes two rows
    while (sobs > 1) {

        // find minimum and index
        if (sobs == 2) {
          di = 0;
          dj = 1;
          dmin = distance[1][0];
        }
        else {
          dmin = gmax;
          for (i = 1; i < sobs; i++) {
            for (j = 0; j < i; j++) {
              if (distance[i][j] < dmin) {
                dmin = distance[i][j];
                di   = i;
                dj   = j;
              }
            } // endof j
          } // endof i
        }
        mindist[kk] = dmin;

//console.log("di="+di+" dj="+dj+" dmin="+dmin);
//console.log("rank="+rank)
        // find higher rank
        if (rank[tt[di]] == rank[tt[dj]]) {
          // find min row number
          if (di > dj) {ti = dj; tj = di;} 
          else {ti = di; tj = dj;}
        }
        else if (rank[tt[di]] > rank[tt[dj]]) {
             ti = di; tj = dj;
        }
        else {
             ti = dj; tj = di;
        };
// console.log("ti="+tt[ti]+" tj="+tt[tj]);
        if (tobs-kk > rank[tt[ti]]) rank[tt[ti]] = tobs - kk;
        ii = tt[ti];
        jj = tt[tj];
        // save ti, tj in the list
        if (tn[ii] == 0 && tn[jj] == 0) {
          yloc[ii]        = nn;
          td[ii][tn[ii]]  = ii;
          ty[ii][tn[ii]]  = nn;
          tk[ii][tnk[ii]] = kk;
          tn[ii]++;
          tnk[ii]++;
          tnp = tn[ii];
          nn++;
          cluster[ncluster] = ii;
          ncluster++;
          yloc[jj]        = nn;
          td[jj][tn[jj]]  = jj;
          ty[jj][tn[jj]]  = nn;
          tk[jj][tnk[jj]] = kk;
          tn[jj]++;
          tnk[jj]++;
          td[ii][tn[ii]]  = jj;
          ty[ii][tn[ii]]  = nn;
          tn[ii]++;
          nn++;
        }
        else if (tn[ii] > 0 && tn[jj] == 0) {
          td[jj][tn[jj]]  = jj;
          ty[jj][tn[jj]]  = nn;
          tk[jj][tnk[jj]] = kk;
          tn[jj]++;
          tnk[jj]++;
          td[ii][tn[ii]]  = jj;
          ty[ii][tn[ii]]  = nn;  // interupt는 밑에서
          tk[ii][tnk[ii]] = kk;  
          tnp = tn[ii];
          tn[ii]++;
          tnk[ii]++;
          nn++;
        }
        else { // copy list of td[jj] to the list of tt[ti]
          tnp = tn[ii];
          for (k = 0; k < tn[jj]; k++) { 
            td[ii][tn[ii]+k] = td[jj][k];
            ty[ii][tn[ii]+k] = ty[jj][k];  // interupt는 밑에서
          }
          tn[ii] += tn[jj];
          for (k = 0; k < tnk[jj]; k++) {
            tk[ii][tnk[ii]+k] = tk[jj][k]; 
          }
          tnk[ii] += tnk[jj];
          tk[ii][tnk[ii]] = kk;
          tnk[ii]++;
          // remove jj cluster set from cluster list
          for (k = 0; k < tn[jj]; k++) {
            m = 0;
            while (m < ncluster) {
              if (td[jj][k] == cluster[m]) {
                for (j = m; j < ncluster-1; j++) cluster[j] = cluster[j+1]
                cluster[ncluster-1] = null;
                ncluster--;
                break;
              }
              else m++;
            }
          }
        } // ednof else

console.log("kk="+kk+" ii="+ii+" jj="+jj+" tn[ii]="+tn[ii]+" tn[jj]="+tn[jj])
console.log("ncluster="+ncluster+" cluster="+cluster)

        // print current distance matrix
        processTable(kk, sobs, wvarName, ti, tj)

        // calcualte coordiate of the hierarchical graph 

        kidx[kk] = ii;
        if (tn[ii] == 2 && tn[jj] == 1) {
          yindex[numlink] = ii;
          numlink++;
          yindex[numlink] = jj;
          numlink++;
console.log("yindex="+yindex)
console.log("yloc="+yloc)
          // upper line
          px1[kk] = 0;   
          px2[kk] = dmin;
          py1[kk] = yloc[ii];
          py2[kk] = yloc[ii];
          qx1[ii][tnc[ii]] = px2[kk];
          qx2[ii][tnc[ii]] = px2[kk];
          qy1[ii][tnc[ii]] = py1[kk];
          qy2[ii][tnc[ii]] = py2[kk];
          tnc[ii]++;
          // lower line
          rx1[kk] = 0;
          rx2[kk] = dmin;
          ry1[kk] = yloc[jj];
          ry2[kk] = yloc[jj];
          qx1[jj][tnc[jj]] = rx2[kk];
          qx2[jj][tnc[jj]] = rx2[kk];
          qy1[jj][tnc[jj]] = ry1[kk];
          qy2[jj][tnc[jj]] = ry2[kk];
          tnc[jj]++;
 console.log("kk="+kk+" ii="+ii+" p("+f2(px1[kk])+", "+f2(px2[kk])+", "+py1[kk]+", "+py2[kk]+")")
 console.log("kk="+kk+" jj="+jj+" r("+f2(rx1[kk])+", "+f2(rx2[kk])+", "+ry1[kk]+", "+ry2[kk]+")")
        }
        else if (tn[ii] > 2 && tn[jj] == 1) {
          yloc[ii] += 0.5;
          temp = ty[ii][tn[ii]-2] + 1;
console.log("tn[ii]="+tn[ii]+" td[ii]="+td[ii])
console.log("ty[ii]="+ty[ii])
console.log("tnk[ii]="+tnk[ii]+" tk[ii]="+tk[ii])
console.log("tn[jj]="+tn[jj]+" td[jj]="+td[jj])
console.log("ty[jj]="+ty[jj])
console.log("ty[2]="+ty[2])
console.log("tnk[jj]="+tnk[jj]+" tk[jj]="+tk[jj])

          if (ty[ii][tn[ii]-2]+1 < nn) { // interupt case
            ty[ii][tn[ii]-1] = ty[ii][tn[ii]-2] + 1;
            // increase one line for jj space
            for (k = numlink; k >= ty[ii][tn[ii]-2] + 1; k--) {
              yindex[k] = yindex[k-1];
              yloc[yindex[k]]++;
            }
            for (j = 1; j < ncluster; j++) {
              if (cluster[j] == ii) continue; // current cluster 제외
console.log("cluster[j]="+cluster[j]+" ty[cluster[j][0]="+ty[cluster[j]][0]+" temp="+temp)
              if (ty[cluster[j]][0] < temp) continue; // jj가 위치할 곳 아래여서 제외
console.log(" tnk[clsuter[j]]="+tnk[cluster[j]])
              for (n = 0; n < tnk[cluster[j]]; n++) {
                  k = tk[cluster[j]][n];
                  py1[k] = py1[k] + 1;
                  py2[k] = py2[k] + 1;
                  ry1[k] = ry1[k] + 1;
                  ry2[k] = ry2[k] + 1;
                  qy1[kidx[k]][n]++;
                  qy2[kidx[k]][n]++;  
console.log("k="+k+" p("+f2(px1[k])+", "+f2(px2[k])+", "+f2(py1[k])+", "+f2(py2[k])+")")
console.log("k="+k+" r("+f2(rx1[k])+", "+f2(rx2[k])+", "+f2(ry1[k])+", "+f2(ry2[k])+")")
              } // endof n
              k = tk[cluster[j]][0];
              for (m = 0; m < tn[kidx[k]]; m++) ty[kidx[k]][m]++;
//console.log(kidx)
console.log("kidx[k]"+kidx[k]+" ty[kidx[k]]"+ty[kidx[k]])
console.log("ty[2]="+ty[2])
            } // endof j

            // put jj into the correct space 
            // upper line
            px1[kk] = qx1[ii][tnc[ii]-1];  
            px2[kk] = dmin;
            py1[kk] = yloc[ii];
            py2[kk] = yloc[ii];
            qx1[ii][tnc[ii]] = px2[kk];
            qx2[ii][tnc[ii]] = px2[kk];
            qy1[ii][tnc[ii]] = py1[kk];
            qy2[ii][tnc[ii]] = py2[kk];
            tnc[ii]++
            // lower line
            rx1[kk] = 0;  
            rx2[kk] = dmin;
            ry1[kk] = ty[ii][tn[ii]-2]+1;
            ry2[kk] = ry1[kk];
            qx1[jj][tnc[jj]] = rx2[kk];
            qx2[jj][tnc[jj]] = rx2[kk];
            qy1[jj][tnc[jj]] = ry1[kk];
            qy2[jj][tnc[jj]] = ry2[kk];
            tnc[jj]++;
            temp = ty[ii][tn[ii]-2]+1;
            yindex[temp] = jj;
            yloc[jj]  = temp;
            ty[ii][tn[ii]-1]  = ty[ii][tn[ii]-2]+1;
console.log("kidx="+kidx)
console.log("tnk[ii]="+tnk[ii]+" tk[ii]="+tk[ii])
console.log("kk="+kk+" p("+f2(px1[kk])+", "+f2(px2[kk])+", "+f2(py1[kk])+", "+f2(py2[kk])+")")
console.log("kk="+kk+" r("+f2(rx1[kk])+", "+f2(rx2[kk])+", "+f2(ry1[kk])+", "+f2(ry2[kk])+")")
console.log("ty[ii]="+ty[ii])
console.log("ty[2]="+ty[2])
console.log("yloc[ii]="+yloc[ii]+" yloc[jj]="+yloc[jj])

          }
          else { // no interupt of jj 
            yindex[numlink] = jj;
            numlink++;
            yloc[jj]  = nn-1;
console.log("nn="+nn)
            ty[jj][0] = yloc[jj];
            ty[ii][tn[ii]-1] = ty[jj][0];
            // upper line
            px1[kk] = qx1[ii][tnc[ii]-1];   
            px2[kk] = dmin;
            py1[kk] = yloc[ii];
            py2[kk] = yloc[ii];
            qx1[ii][tnc[ii]] = px2[kk];
            qx2[ii][tnc[ii]] = px2[kk];
            qy1[ii][tnc[ii]] = py1[kk];
            qy2[ii][tnc[ii]] = py2[kk];
            tnc[ii]++;
            // lower line
            rx1[kk] = 0;  
            rx2[kk] = dmin;
            ry1[kk] = yloc[jj];
            ry2[kk] = yloc[jj];
            qx1[jj][tnc[jj]] = rx2[kk];
            qx2[jj][tnc[jj]] = rx2[kk];
            qy1[jj][tnc[jj]] = ry1[kk];
            qy2[jj][tnc[jj]] = ry2[kk];
            tnc[jj]++;
 console.log("kk="+kk+" ii="+ii+" p("+f2(px1[kk])+", "+f2(px2[kk])+", "+py1[kk]+", "+py2[kk]+")")
 console.log("kk="+kk+" jj="+jj+" r("+f2(rx1[kk])+", "+f2(rx2[kk])+", "+ry1[kk]+", "+ry2[kk]+")")
console.log("ty[2]="+ty[2])
          }
          numlink++;
        }
        else if (tn[ii] > 2 && tn[jj] > 1) {  // two cluster combine
          yloc[ii] += 0.5;
          tempi = ty[ii][tn[ii]-tn[jj]-1]+1; // jj 의 possible loc
          tempj = ty[jj][0];
console.log("tn[ii]="+tn[ii]+" td[ii]="+td[ii])
console.log("ty[ii]="+ty[ii])
console.log("tnk[ii]="+tnk[ii]+" tk[ii]="+tk[ii])
console.log("tn[jj]="+tn[jj]+" td[jj]="+td[jj])
console.log("ty[jj]="+ty[jj])
console.log("tnk[jj]="+tnk[jj]+" tk[jj]="+tk[jj])
console.log(" ty[ii][tn[ii]-tn[jj]-1]+1="+tempi)
console.log(" ty[jj][0]="+tempj)
          if (tempi ==  tempj) { // 두 cluster가 인접
            yloc[jj] += 0.5;
            // upper line
console.log("tnc[ii]"+tnc[ii]+" qx1[ii]"+qx1[ii])
console.log("tnc[jj]"+tnc[jj]+" qx1[jj]"+qx1[jj])
            px1[kk] = qx1[ii][tnc[ii]-1];   
            px2[kk] = dmin;
            py1[kk] = yloc[ii];
            py2[kk] = yloc[ii];
            qx1[ii][tnc[ii]] = px2[kk];
            qx2[ii][tnc[ii]] = px2[kk];
            qy1[ii][tnc[ii]] = py1[kk];
            qy2[ii][tnc[ii]] = py2[kk];
            tnc[ii]++;
            // lower line
            rx1[kk] = qx1[jj][tnc[jj]-1];  
            rx2[kk] = dmin;
            ry1[kk] = yloc[jj];
            ry2[kk] = yloc[jj];
            qx1[jj][tnc[jj]] = rx2[kk];
            qx2[jj][tnc[jj]] = rx2[kk];
            qy1[jj][tnc[jj]] = ry1[kk];
            qy2[jj][tnc[jj]] = ry2[kk];
            tnc[jj]++;
console.log(tk[ii])
console.log("tnc[ii]"+tnc[ii]+" qx1[ii]"+qx1[ii])
console.log("tnc[jj]"+tnc[jj]+" qx1[jj]"+qx1[jj])
console.log("k="+kk+" p("+f2(px1[kk])+", "+f2(px2[kk])+", "+f2(py1[kk])+", "+f2(py2[kk])+")")
console.log("k="+kk+" r("+f2(rx1[kk])+", "+f2(rx2[kk])+", "+f2(ry1[kk])+", "+f2(ry2[kk])+")")
          }
          else {  // switch two clusters
            // change node index 
            nline = ty[jj][tn[jj]-1] - ty[jj][0] + 1;
            mline = ty[jj][0] - ty[ii][tn[ii]-tn[jj]-1] - 1;
            temp  = ty[ii][tn[ii]-tn[jj]-1] + 1;
console.log("numlink"+numlink+" nline="+nline+" mline"+mline )
            for (m = 0; m < numlink; m++)     ytmp[m] = yindex[m];
            for (m = 0; m < nline; m++) yindex[temp+m] = ytmp[ty[jj][0]+m];
            for (m = 0; m < mline; m++) yindex[temp+nline+m] = ytmp[temp+m];
console.log("numlink"+numlink+" yindex[temp]="+yindex[temp]+" yindex"+yindex )

            // increase nline for non jj space
            for (j = 1; j < ncluster; j++) {
              if (cluster[j] == ii || cluster[j] == jj) continue; // current cluster 제외
console.log("cluster[j]="+cluster[j]+" ty[cluster[j]][0]="+ty[cluster[j]][0]+" temp="+temp+" ty[jj][tn[jj]-1]"+ty[jj][tn[jj]-1])
              if (ty[cluster[j]][0] < temp) continue; // jj cluster가 위치할 곳 아래여서 제외
              if (ty[cluster[j]][0] > ty[jj][tn[jj]-1]) continue; // jj cluster 다음 위치라 제외
              for (n = 0; n < tnk[cluster[j]]; n++) {
                k = tk[cluster[j]][n];
console.log("k="+k+" ry1[k]="+ry1[k]+" temp="+temp+" ty[jj][tn[jj]-1]="+ty[jj][tn[jj]-1])
//                if (ry1[k] < temp) continue;   // jj cluster 위치보다 작은 cluster
//                if (k == tk[jj][0]) continue;  // jj cluster
//                if (ry1[k] > ty[jj][tn[jj]-1]) continue; // jj cluster 다음 위치
                py1[k] += nline;
                py2[k] += nline;
                ry1[k] += nline;
                ry2[k] += nline;
                qy1[kidx[k]][n] += nline;
                qy2[kidx[k]][n] += nline;
console.log("tn[kidx[k]]="+tn[kidx[k]]+" ty[jj]="+ty[jj])
console.log("k="+k+" p("+f2(px1[k])+", "+f2(px2[k])+", "+f2(py1[k])+", "+f2(py2[k])+")")
console.log("k="+k+" r("+f2(rx1[k])+", "+f2(rx2[k])+", "+f2(ry1[k])+", "+f2(ry2[k])+")")
console.log("k="+k+" kidx[k]="+kidx[k]+" ty[kidx[k]]]="+ty[kidx[k]]+" ty[jj]="+ty[jj])
              } // endof n
              k = tk[cluster[j]][0];
              yloc[kidx[k]] += nline;
              for (m = 0; m < tn[kidx[k]]; m++) {
                  ty[kidx[k]][m] += nline; 
              }
console.log("ty[6]="+ty[6])
            } // endof j

            // decrese mline number of jj cluster
            for (n = 0; n < tnk[jj] ; n++) {
               k = tk[jj][n];
 console.log("k="+k+" tnk[jj]="+tnk[jj]+" mline="+mline)
               py1[k] -= mline;
               py2[k] -= mline;
               ry1[k] -= mline;
               ry2[k] -= mline;
               for (m = 0; m < tnk[kidx[k]]; m++) {
                 qy1[kidx[k]][m] -= mline;
                 qy2[kidx[k]][m] -= mline;
               }
 console.log("k="+k+" p("+f2(px1[k])+", "+f2(px2[k])+", "+f2(py1[k])+", "+f2(py2[k])+")")
 console.log("k="+k+" r("+f2(rx1[k])+", "+f2(rx2[k])+", "+f2(ry1[k])+", "+f2(ry2[k])+")")
            } // endof n
            for (m = 0; m < tn[jj]; m++) ty[jj][m] -= mline; 

            // connect two clusters
            yloc[jj] = yloc[jj] - mline + 0.5;
console.log("yloc[jj]="+yloc[jj])
            // upper line
console.log("tnc[ii]"+tnc[ii]+" qx1[ii]"+qx1[ii])
console.log("tnc[jj]"+tnc[jj]+" qx1[jj]"+qx1[jj])
            px1[kk] = qx1[ii][tnc[ii]-1];   
            px2[kk] = dmin;
            py1[kk] = yloc[ii];
            py2[kk] = yloc[ii];
            qx1[ii][tnc[ii]] = px2[kk];
            qx2[ii][tnc[ii]] = px2[kk];
            qy1[ii][tnc[ii]] = py1[kk];
            qy2[ii][tnc[ii]] = py2[kk];
            tnc[ii]++;
            // lower line
            rx1[kk] = qx1[jj][tnc[jj]-1];  
            rx2[kk] = dmin;
            ry1[kk] = yloc[jj];
            ry2[kk] = yloc[jj];
            qx1[jj][tnc[jj]] = rx2[kk];
            qx2[jj][tnc[jj]] = rx2[kk];
            qy1[jj][tnc[jj]] = ry1[kk];
            qy2[jj][tnc[jj]] = ry2[kk];
            tnc[jj]++;
            for (m = 0; m < tn[jj]; m++) { // interupt case
              ty[ii][tn[ii]-tn[jj]+m] = ty[jj][m];  
            }
console.log(tk[ii])
console.log("tnc[ii]"+tnc[ii]+" qx1[ii]"+qx1[ii])
console.log("tnc[jj]"+tnc[jj]+" qx1[jj]"+qx1[jj])
console.log("k="+kk+" p("+f2(px1[kk])+", "+f2(px2[kk])+", "+f2(py1[kk])+", "+f2(py2[kk])+")")
console.log("k="+kk+" r("+f2(rx1[kk])+", "+f2(rx2[kk])+", "+f2(ry1[kk])+", "+f2(ry2[kk])+")")
console.log("ty[ii]="+ty[ii])
console.log("ty[jj]="+ty[jj])
          } // endof else
        } // endof else if

        // combine two observations, make new distance matrix
        wvarName[ti] = wvarName[ti] + wvarName[tj];
        for (i = 0; i < sobs; i++) {
          for (j = 0; j < sobs; j++) {
            workdist[i][j] = distance[i][j];
          }
        }

        // data linkage
        if (ilinkage <= 2) {
          for (j = 0; j < sobs; j++) { // min num row for combined
            if (j == ti || j == tj) continue;
            if (ilinkage == 1) { // single linkage : min distance
              if (ti > j) {tempi = workdist[ti][j]} else {tempi = workdist[j][ti]}
              if (tj > j) {tempj = workdist[tj][j]} else {tempj = workdist[j][tj]}
              if (tempi < tempj) {
                if (ti > j) {workdist[ti][j] = tempi; workdist[j][ti] = workdist[ti][j]} 
                else {workdist[j][ti] = tempi; workdist[ti][j] = workdist[j][ti]}
              } 
              else {
                if (ti > j) {workdist[ti][j] = tempj; workdist[j][ti] = workdist[ti][j]} 
                else {workdist[j][ti] = tempj; workdist[ti][j] = workdist[j][ti]}
              }
            }
            else if (ilinkage == 2) { // complete linkage : max distance
              if (ti > j) {tempi = workdist[ti][j]} else {tempi = workdist[j][ti]}
              if (tj > j) {tempj = workdist[tj][j]} else {tempj = workdist[j][tj]}
              if (tempi > tempj) {
                if (ti > j) {workdist[ti][j] = tempi; workdist[j][ti] = workdist[ti][j]} 
                else {workdist[j][ti] = tempi; workdist[ti][j] = workdist[j][ti]}
              } 
              else {
                if (ti > j) {workdist[ti][j] = tempj; workdist[j][ti] = workdist[ti][j]} 
                else {workdist[j][ti] = tempj; workdist[ti][j] = workdist[j][ti]}
              }
            }  
          } // endof j
        } // endof if
        else if (ilinkage == 3) { // average linkage 
//console.log("ii="+ii+" tn[ii]="+tn[ii]+" "+td[ii])
//console.log("jj="+jj+" tn[jj]="+tn[jj]+" "+td[jj])
    
          for (j = 0; j < sobs; j++) {
            if (tt[j] == ii || tt[j] == jj) continue;
            temp = 0;
            if (tn[tt[j]] == 0) {
              for (i = 0; i < tn[ii]; i++) {
                temp += distorgi[td[ii][i]][tt[j]];
//console.log("td[ii][i]="+td[ii][i]+" j="+j+" "+distorgi[td[ii][i]][tt[j]])
              }
              temp /= tn[ii];
            }
            else {
              for (k = 0; k < tn[tt[j]]; k++) {
                for (i = 0; i < tn[ii]; i++) {
                  temp += distorgi[td[ii][i]][td[tt[j]][k]];
//console.log("td[ii][i]="+td[ii][i]+" td[j][k]="+td[j][k]+" "+distorgi[td[ii][i]][td[tt[j]][k]])
                }
              }
              temp /= (tn[ii]*tn[tt[j]]);
//console.log("kk="+kk+" sobs="+sobs+" ii="+ii+" jj="+jj+" tt[j]="+tt[j]+" "+temp)
            }
            workdist[ti][j] = temp; 
            workdist[j][ti] = workdist[ti][j]; 
          }
        }
        else if (ilinkage == 4) { // centroid linkage 
            for (k = 0; k < numVar; k++) {
                tavg[k] = (tnp*Dwork[k][ii] + tn[jj]*Dwork[k][jj]) / (tnp + tn[jj]);
//console.log("kk="+kk+" k="+k+" "+tnp+" "+Dwork[k][ii]+" "+tn[jj]+" "+Dwork[k][jj])
                Dwork[k][ii] = tavg[k];
            }
//console.log("kk="+kk+" sobs="+sobs+" ii="+ii+" jj="+jj+" "+tavg)
       
            for (j = 0; j < sobs; j++) {
              if (tt[j] == ii || tt[j] == jj) continue;
              temp = 0;
              for (k = 0; k < numVar; k++) {
                tempj = Dwork[k][tt[j]] - tavg[k];
                temp += tempj * tempj;
              }
//console.log("tt[j]="+tt[j]+" "+temp)
              workdist[ti][j] = temp; 
              workdist[j][ti] = workdist[ti][j]; 
            }
        }
        else if (ilinkage == 5) { // Ward linkage 
            for (k = 0; k < numVar; k++) {
                tavg[k] = (tnp*Dwork[k][ii] + tn[jj]*Dwork[k][jj]) / (tnp + tn[jj]);
// console.log("kk="+kk+" k="+k+" "+tnp+" "+Dwork[k][ii]+" "+tn[jj]+" "+Dwork[k][jj])
                Dwork[k][ii] = tavg[k];
            }
// console.log("kk="+kk+" sobs="+sobs+" ii="+ii+" jj="+jj+" "+tavg)
       
            for (j = 0; j < sobs; j++) {
              if (tt[j] == ii || tt[j] == jj) continue;
              temp = 0;
              for (k = 0; k < numVar; k++) {
//console.log(tavg[k]+" "+Dwork[k][tt[j]])
                tempj = tavg[k] - Dwork[k][tt[j]];
                temp += tempj * tempj;
              }
// console.log(tn[ii]+" "+tn[tt[j]])
              if (tn[tt[j]] == 0) temp /= (1/tn[ii] + 1);
              else temp /= ( 1/tn[ii] + 1/tn[tt[j]] ) ; 
// console.log("tt[j]="+tt[j]+" "+f2(temp))
              workdist[ti][j] = temp; 
              workdist[j][ti] = workdist[ti][j]; 
            }
        }

// console.log("kk="+kk+" ii="+ii+" "+tn[ii]+" "+td[ii])
// console.log("kk="+kk+" "+distance[1])

//      if (ilinkage >= 3 && sobs == 2) sobs--
//      else {  // tj 행과 열 remove
        ii = 0;
        for (i = 0; i < sobs; i++) {
          if (i == tj) continue;
//console.log("i="+i+" "+workdist[i][0]+" "+workdist[i][1]+" "+workdist[i][2]+" "+workdist[i][3]+" "+workdist[i][4])
          tt[ii] = tt[i];
          wvarName[ii] = wvarName[i];
          jj = 0;
          for (j = 0; j < sobs; j++) {
            if (j == tj) continue;
            distance[ii][jj] = workdist[i][j];
            jj++
          } // endof j
          ii++;
        } // endof i
        sobs = ii;
console.log(" ")
console.log("sobs="+sobs)
//      }
      
      kk++;

    } // end of while

    maxiter = kk;
    dmax = mindist[0];
    for (k = 1; k < maxiter; k++) if (mindist[k] > dmax) dmax = mindist[k];    
    return dmax;
}

// hierarchy cluster graph ------------------------------------------------------------
function hierarchyClusterGraph(tobs, svarName, dmax) {
    var i, j, k, delta, temp, tx, ty, cx, cy, x1, y1, x2, y2, str1, str2;
    var subWidth, subHeight;
    var ymin   = new Array(colMax);
    var ymax   = new Array(colMax);
    var yrange = new Array(colMax);
    var ninterval = 10;  // number of distance interval
    var radius, ygap, fontsize;
    margin = {
        top: 80,
        bottom: 10,
        left: 50,
        right: 40
    };
    if (tobs > 50 && tobs <= 100) {
        svgHeight = margin.top + margin.bottom + 10 + 10 * tobs; // 10px for each observation
        str1 = (svgHeight).toString();
        document.getElementById("chart").setAttribute("height", str1);
    }
    graphWidth  = svgWidth - margin.left - margin.right;
    graphHeight = svgHeight - margin.top - margin.bottom;
    
    if (tobs <= 17) { radius = 10; ygap = 30; fontsize = "1em"}
    else if (tobs <= 34) {radius = 5; ygap = 15; fontsize = "0.7em"}
    else if (tobs < 100) {radius = 4; ygap = 10; fontsize = "0.5em"}

    chart.selectAll("*").remove();  // 전화면 제거
    // 주제목
    chart.append("text")
         .style("stroke", "black")
         .style("font-size", "17px")
         .style("font-family", "sans-seirf")
         .style("text-anchor", "middle")
         .attr("x", margin.left + graphWidth / 2)
         .attr("y", margin.top / 2)
         .text(svgStr[134][langNum])

    // draw observations
    for (i = 0; i < tobs; i++) {
        cx = margin.left;
        cy = margin.top + 20 + i * ygap;
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", fontsize)
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", cx-20)
             .attr("y", cy+3)
             .text(svarName[yindex[i]])
        chart.append("circle")
             .attr("cx",cx)
             .attr("cy",cy)
             .attr("r",radius)
             .style("fill","yellow")
             .style("stroke","black")
    }

    // distance scale
    x1 = margin.left + 20;
    x2 = margin.left + graphWidth;
    y1 = margin.top + 10;
    y2 = y1;
    subWidth = x2 - x1;
    chart.append("line")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke","black") 
    chart.append("text")
             .style("stroke", "black")
             .style("font-size", "12px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", margin.left + graphWidth/2)
             .attr("y", margin.top-10)
             .text(svgStr[135][langNum])
    // tic mark
    temp  = subWidth / ninterval;
    delta = dmax / ninterval;
    ty = y1 - 7;
    for (j = 0; j < ninterval+1; j++) {
        tx   = x1 + j*temp;
        chart.append("line")
             .attr("x1",tx)
             .attr("y1",ty+5)
             .attr("x2",tx)
             .attr("y2",ty+10)
             .style("stroke","black") 
        if (dmax <= 1) str1 = f2(j * delta)
        else if (dmax <= 10) str1 = f1(j * delta);
        else f0(j * delta);
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "10px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", tx)
             .attr("y", ty)
             .text(str1)
    }


    // draw clustering line
    k = 0;
    for (k = 0; k < maxiter; k++) {
        // line above
        x1 = margin.left + 20 + subWidth * px1[k] / dmax;
        x2 = x1 + subWidth * (px2[k]-px1[k]) / dmax;
        y1 = margin.top + 20 + ygap * py1[k];
        y2 = y1;
        chart.append("line").style("stroke",myColor[k]).style("stroke-width","3") 
             .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
        // line bottom   
        x1 = margin.left + 20 + subWidth * rx1[k] / dmax;
        x2 = x1 + subWidth * (rx2[k]-rx1[k]) / dmax;
        y1 = margin.top + 20 + ygap * ry1[k];
        y2 = y1;
        chart.append("line").style("stroke",myColor[k]).style("stroke-width","3")  
             .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
        // line side
        x1 = x2;
        y1 = margin.top + 20 + ygap * py1[k];
        y2 = margin.top + 20 + ygap * ry1[k];
        chart.append("line").style("stroke",myColor[k]).style("stroke-width","3")  
             .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
    }
}

// cluster process table
function processTable(iter, sobs, wvarName, ti, tj) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j;
    var num = 0;
    var ncol = sobs + 1;
    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";

    // heading
    row = table.insertRow(num++);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[135+parseInt(ilinkage)][langNum]+" "+svgStr[141][langNum]+"<br>"+svgStrU[140][langNum]+" "+iter; // iteration
    for (j = 0; j < sobs; j++) cell[j+1].innerHTML = wvarName[j];

    for (i = 0; i < sobs; i++) {
      row = table.insertRow(num++);
      for (j = 0; j <= i+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
      }
      cell[0].style.backgroundColor = "#eee";
      cell[0].innerHTML = wvarName[i];
      for (j = 0; j <= i; j++) {
        cell[j+1].innerHTML = f2(distance[i][j]);
        if (i == tj && j == ti) cell[j+1].style.backgroundColor = "yellow"
        else if (i == ti && j == tj) cell[j+1].style.backgroundColor = "yellow";
      }
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";
}

// -------------------------------------------------------------------
// kmeans Clustering -------------------------------------------------
// -------------------------------------------------------------------
function kmeansCluster(numVar, tobs) {
        var i, j, k, temp, t1, t2;
        var checkgobs = 0;

        while (checkgobs == 0) { // check group data numeber == 0
          // 초기 그룹 assign
          for (k = 0; k < Kgroup; k++) {
            temp = Math.floor(tobs * Math.random());
            for (j = 0; j < numVar; j++) Kavg[k][j] = parseFloat(Dtrain[j][temp]);
          }

          for (kk = 0; kk < maxiter; kk++) {          

            for (i = 0; i < tobs; i++) {
              for (k = 0; k < Kgroup; k++) {
                distance[k][i] = 0;
                for (j = 0; j < numVar; j++) {
                  if (idistance == 1) { // Euclid square distance
                    temp = parseFloat(Dtrain[j][i]) - Kavg[k][j];
                    distance[k][i] += temp * temp;
                  }
                  else if (idistance == 2) { // Manhattan distance
                    temp = parseFloat(Dtrain[j][i]) - Kavg[k][j];
                    distance[k][i] += Math.abs(temp);                   
                  }
                }
              } 
            }
            for (i = 0; i < tobs; i++) {
              temp = distance[0][i];
              tindex = 0;
              for (k = 1; k < Kgroup; k++) {
                if (temp > distance[k][i]) {
                  temp   = distance[k][i];
                  tindex = k;
                }
              } 
              ytrainN[i] = tindex;
            }
            // cluster means
            for (k = 0; k < Kgroup; k++) {
                gobsD[k] = 0;
                for (j = 0; j < numVar; j++) {
                  Kavg[k][j] = 0;
                }
            } 
            for (i = 0; i < tobs; i++) {
              gobsD[ytrainN[i]]++; 
              for (j = 0; j < numVar; j++) {
                Kavg[ytrainN[i]][j] += parseFloat(Dtrain[j][i]);
              }
            }
            checkgobs = 1;
            for (k = 0; k < Kgroup; k++) {
                if (gobsD[k] == 0) {
                  checkgobs == 0;
                  break;
                }
            } 
            if (checkgobs == 0) break;
            for (j = 0; j < numVar; j++) {
              gavg[j] = 0;
              for (k = 0; k < Kgroup; k++) {
                gavg[j] += Kavg[k][j];
              }
              gavg[j] /= tobs;
            } 

            for (k = 0; k < Kgroup; k++) {
                for (i = 0; i < numVar; i++) {
                  Kavg[k][i] /= gobsD[k];
                  for (j= 0; j < numVar; j++) {
                    Kcov[k][i][j] = 0;
                  }
                }
            }
            for (k = 0; k < tobs; k++) {
                for (i = 0; i < numVar; i++) {
                  t1 = parseFloat(Dtrain[i][k]) - Kavg[ytrainN[k]][i];
                  for (j= 0; j < numVar; j++) {
                    t2 = parseFloat(Dtrain[j][k]) - Kavg[ytrainN[k]][j];
                    Kcov[ytrainN[k]][i][j] += t1 * t2;
                  }
                }
            }
            for (k = 0; k < Kgroup; k++) {
                for (i = 0; i < numVar; i++) {
                  for (j= 0; j < numVar; j++) {
                    Kcorr[k][i][j] = Kcov[k][i][j] / Math.sqrt(Kcov[k][i][i] * Kcov[k][j][j]);
                  }
                }
            }
            for (j = 0; j < numVar; j++) {
              gstd[j] = 0;
              for (k = 0; k < Kgroup; k++) {
                gstd[j] += Kcov[k][j][j];
              }
              gstd[j] = Math.sqrt(gstd[j]/(tobs-1));
            } 

            // cluster ESS
            SSE[kk] = 0;            
            for (i = 0; i < tobs; i++) {
                for (j = 0; j < numVar; j++) {
                  temp = Kavg[ytrainN[i]][j] - Dtrain[j][i];
                  SSE[kk] += temp * temp;
                }
            } 
// console.log("iter = "+kk+" "+f4(SSE[kk])) ;
            if (kk == 0) continue;
            temp = Math.abs(SSE[kk-1] - SSE[kk]);
            if ( temp < epsi ) {
              break;
            }

          } // endof kk
          if (kk == maxiter) kSSE[Kgroup] = SSE[kk-1];
          else kSSE[Kgroup] = SSE[kk];
          BIC[Kgroup] = kSSE[Kgroup] + Kgroup*numVar*Math.log(tobs)
console.log(Kgroup+" "+kSSE[Kgroup] +" "+BIC[Kgroup])
          iter = kk;
          return iter;

        } // endof while
}

// Draw Line Graph for WithinSS and BIC
function drawLineESS() {
    var i, j, k, str, x1, y1, x2, y2, tx, ty, cx, cy;
    var nrow = nclusterMax - 1;
    var betweenbarWidth = graphWidth / (nrow - 1); // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.5;
    var freqMax  = kSSE[2];
    var freqMin  = kSSE[9];
    for (k = 2; k < nclusterMax; k++) {
      if (BIC[k] > freqMax) freqMax = BIC[k];
      if (BIC[k] < freqMin) freqMin = BIC[k];
    }
    var tbuffer  = (freqMax - freqMin) * 0.1;
    freqMax = freqMax + tbuffer;
    freqMin = freqMin - tbuffer;
    var freqRatioV = graphHeight / (freqMax - freqMin); // 그래프 영역과 데이터 영역의 비율
    var mTitle = svgStr[144][langNum] +" (WSS), "+svgStr[143][langNum]+" (BIC)"; //Within Sum of Squares, Bayes Information Criteria"
    var yTitle = svgStr[144][langNum]; // "Within Sum of Squares ";
    var xTitle = "Number of clusters (K)";
    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(mTitle)
    // X축 제목
    chart.append("text")
         .attr("x", margin.left + graphWidth / 2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "middle")
         .text(xTitle)
    // Y축 제목
    tx = margin.left / 2 - 30;
    ty = margin.top + 15;
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("stroke", "black")
         .style("text-anchor", "end")
         .attr("x", margin.left / 2 - 15)
         .attr("y", margin.top + 15)
         .text(yTitle)
         .attr("transform", "rotate(-90 30 100)")
    // draw Axis
    drawAxisLineESS();

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 ticks
    y1 = margin.top + graphHeight - 5;
    y2 = margin.top + graphHeight + 5;
    for (j = 2; j < nclusterMax; j++) {
        x1 = margin.left + gapWidth + (j-2)*betweenbarWidth;
        x2 = x1;
        chart.append("line").attr("class", "line")
             .attr("x1", x1)
             .attr("x2", x2)
             .attr("y1", y1)
             .attr("y2", y2)
             .style("stroke", "black")
        chart.append("text")
             .style("stroke", "black")
             .style("font-size", "15px")
             .style("font-family", "sans-seirf")
             .style("text-anchor", "middle")
             .attr("x", x2)
             .attr("y", y2+15)
             .text(j)
    }
    // line graph for WithinSS
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (kSSE[2] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "blue")
      for (i=3; i<nclusterMax; i++) {
        x2 = margin.left + gapWidth + (i-2)*betweenbarWidth;
        y2 = margin.top + graphHeight - (kSSE[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "blue")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "blue")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 20;
      chart.append("circle").style("fill", "blue").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", "blue").style("text-anchor", "begin")
           .text("WSS")
    // line graph for BIC
      x1 = margin.left + gapWidth;
      y1 = margin.top + graphHeight - (BIC[2] - freqMin) * freqRatioV;
      chart.append("circle").attr("class", "line")
           .attr("cx", x1).attr("cy", y1).attr("r","4")
           .style("fill", "red")
      for (i=3; i<nclusterMax; i++) {
        x2 = margin.left + gapWidth + (i-2)*betweenbarWidth;
        y2 = margin.top + graphHeight - (BIC[i] - freqMin) * freqRatioV;
        chart.append("line").attr("class", "line")
             .attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2)
             .style("stroke", "red")
        chart.append("circle").attr("class", "line")
             .attr("cx", x2).attr("cy", y2).attr("r","4")
             .style("fill", "red")
        x1 = x2;
        y1 = y2;
      }
      // 레이블
      cx = margin.left + graphWidth + 10;
      cy = margin.top + 40;
      chart.append("circle").style("fill", "red").style("stroke-width", "2px")
             .attr("cx", cx).attr("cy", cy).attr("r", 3)
      chart.append("text").attr("x", cx+10).attr("y", cy+7)
           .style("font-size", "0.8em").style("font-family", "sans-seirf").style("stroke", "red").style("text-anchor", "begin")
           .text("BIC")

}
// line그래프 축 그리기
function drawAxisLineESS() {
    var i, j, tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);
    var freqMax  = kSSE[2];
    var freqMin  = kSSE[9];
    yScale = d3.scaleLinear().domain([freqMin, freqMax]).range([graphHeight, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("transform", "translate(" + tx + "," + ty + ")")
         .call(d3.axisLeft(yScale)) // 눈금을 표시할 함수 호출
    // Y축 그리드
    for (i = 0; i < ygrid.length; i++) {
      ty = margin.top + yScale(ygrid[i]);
      chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
    }
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left)
                    .attr("x2", margin.left)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left + graphWidth)
                    .attr("x2", margin.left + graphWidth)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")

/*
        tx = margin.left + graphWidth;
        chart.append("g")
             .attr("transform","translate("+tx+","+ty+")")
             .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출
*/
}

// cluster process table
function kmeansProcessTable(iter) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j;
    var num = 0;
    var ncol = 3;
    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
    }
    cell[0].style.width = "100px";
    cell[0].innerHTML = "K = "+Kgroup+"<br>"+svgStrU[140][langNum]; // iteration
    cell[1].innerHTML = svgStr[77][langNum]+" "+svgStr[73][langNum]+"<br>(ESS)"; // Error Sum of Squares
    cell[2].innerHTML = svgStrU[118][langNum]+" of ESS"; // Difference

    for (i = 0; i < iter+1; i++) {
      if (i >= maxiter) break;
      row = table.insertRow(++num);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
      }
      cell[0].style.width = "100px";
      cell[0].style.textAlign = "center";
      cell[0].innerHTML = i+1;
      cell[1].innerHTML = f4(SSE[i]);
      if (i > 0) cell[2].innerHTML = f4(SSE[i-1] - SSE[i]);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

// cluster ESS summary able
function kmeansESS() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k;
    var num = 0;
    var ncol = 3;
    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    row = table.insertRow(num++);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
    }
    cell[0].style.width = "100px";
    cell[0].innerHTML = svgStr[142][langNum]; // "Number of Cluster"
    cell[1].innerHTML = svgStr[144][langNum]; // Total Within Sum of Squares
    cell[2].innerHTML = svgStr[143][langNum]; // Bayes Information Creteria
//    cell[3].innerHTML = svgStr[145][langNum]; // Akaike Information Creteria

    for (k = 2; k < nclusterMax; k++) {
      row = table.insertRow(num++);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "120px";
      }
      cell[0].style.width = "100px";
      cell[0].style.textAlign = "center";
      cell[0].innerHTML = k;
      cell[1].innerHTML = f4(kSSE[k]);
      cell[2].innerHTML = f4(BIC[k]);
//      cell[3].innerHTML = f4(kSSE[k] + 2*k*numVar);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(num++);
    row.style.height = "20px";
}


// cluster statistics table
function kmeansTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k;
    var num = 0;
    var ncol = numVar + 1;
    var cell = new Array(ncol+1);

    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    row = table.insertRow(num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
    }
    cell[0].style.width = "120px";
    cell[1].style.width = "60px";
    cell[0].innerHTML = svgStr[34][langNum]+" ("+svgStr[35][langNum]+")"; // Mean (Std Dev)
    cell[1].innerHTML = svgStr[44][langNum]; // Observation;
    for (j = 0; j < numVar; j++) {
        cell[j+2].innerHTML = tdvarName[j];
    }

    for (k = 0; k < Kgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
      }
      cell[0].style.width = "120px";
      cell[0].style.textAlign = "center";
      cell[1].style.textAlign = "center";
      cell[0].innerHTML = svgStrU[136][langNum]+" "+(k+1).toString(); // cluster
      cell[1].innerHTML = gobsD[k];
      for (j = 0; j < numVar; j++) {
         cell[j+2].innerHTML = f3(Kavg[k][j]) +" ("+ f3(Math.sqrt(Kcov[k][j][j]/(tobs-1)))+")";
      }
    }
    row = table.insertRow(++num);
    for (j = 0; j < ncol+1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.width = "120px";
    cell[0].style.textAlign = "center";
    cell[1].style.textAlign = "center";
    cell[0].innerHTML = svgStr[23][langNum]; // Total
    cell[1].innerHTML = tobs;
    for (j = 0; j < numVar; j++) {
         cell[j+2].innerHTML = f3(gavg[j]) +" ("+ f3(Math.sqrt(gstd[j]))+")";
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

    for (k = 0; k < Kgroup; k++) {
      row = table.insertRow(++num);
      for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "100px";
      }
      cell[0].innerHTML = svgStr[108][langNum]+"<br>Cluster"+(k+1).toString(); // Kcorrelation matrix
      for (j = 0; j < numVar; j++) {
        cell[j+1].innerHTML = tdvarName[j];
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
        cell[0].innerHTML = tdvarName[i];
        for (j = 0; j < numVar; j++) {
          cell[j+1].innerHTML = f3(Kcorr[k][i][j]);
        }
      } // endof i
    } // endof k

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

// Cluster output --------------------------------------------------------------------------------------------------
function kmeansClusterTable(numVar, tobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j;
    var row;
    var num = 0;
    var ncol = numVar + 2;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "5";
    // 헤더
    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
        cell[j].innerHTML = tdvarName[j];
    }
    cell[0].style.width = "40px";
    cell[0].innerHTML = "id";
    for (j = 0; j < numVar; j++) cell[j+1].innerHTML = tdvarName[j];
    cell[numVar+1].innerHTML = svgStrU[136][langNum]; // Cluster

    for (i = 0; i < tobs; i++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.border = "1px solid black";
        }
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = i+1;
        for (j = 0; j < numVar; j++) cell[j+1].innerHTML = f3(Dtrain[j][i]);
        cell[numVar+1].style.textAlign = "center";
        cell[numVar+1].innerHTML = f0(ytrainN[i]+1);
    }

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}

