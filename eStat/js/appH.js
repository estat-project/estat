﻿/*
* app control
* using URL Parameters
*/

var estatapp = {
    example : undefined,        // legacy
    dataURL : undefined,
    analysisVar : undefined,
    groupVars : undefined,
    graphNum : undefined,
};

$(document).ready(function() {
    checkURLParameters();
})

function getURLParameters() {
    var url_param_str = document.location.search.substring(1);
    if (url_param_str == "") return null;
    
    var params = {};
    decodeURIComponent(url_param_str)
	.split("&")
	.forEach(function(paramstr) {
	    param_key_val_pair = paramstr.split("=");
	    param_key = param_key_val_pair[0];
	    param_val = param_key_val_pair[1];
	    params[param_key] = param_val;
	});
    return params;
}


function checkURLParameters() {
    url_params = getURLParameters();
    if (url_params == null) return false;
	
    json = JSON.parse(url_params["json"]);
	
    var dataURL = json["dataURL"];
    var example = json["example"];
    var analysisVar = json["analysisVar"];
    var groupVars = json["groupVars"];
    var graphNum = json["graphNum"];
    
    if (dataURL === undefined) {
	if (example === undefined) {
	    return false;
	} else {
	    dataURL = "../Example/" + example;
	};
    }
    
    readFromURL(dataURL, function() {
	if (analysisVar !== undefined) selectAnalysisVariable(analysisVar);
	if (groupVars !== undefined) groupVars.forEach(function(v) { selectGroupVariable(v) });
	if (graphNum !== undefined) document.getElementById(strGraph[graphNum]).click();
	window.history.replaceState({}, "", "/estat/eStat/");
    });

}


$("#copylink").click(function() {
    estatapp.graphNum = graphNum;
    var baseurl = document.location.href.split("?")[0];
    var copylinkText = baseurl + "?json=" + JSON.stringify(estatapp);
    var el = document.createElement('textarea');
    el.id = "copylinkText";
    el.value = copylinkText;
    el.select();
    document.execCommand('copy');
//    navigator.clipboard.writeText(copyText);
    el.readOnly = true;
    el.setAttribute("style", "font-size: 12pt; font-family: Monospace; font-color: lightgray; title: none; height: auto; width : 600px; resize: none; overflow-x: hidden; overflow-y: hidden; outline: none; border-style : none; border-color: Transparent");
    $("#copylinkPopup").html(el);
    $("#copylinkPopup").dialog({
	dialogClass: 'no-titlebar',
	show: { effect: "blind", duration: 1000},
	hide: { effect: "blind", duration: 1000},
	width: "640px",
	height: "auto",
	overflow: "hidden",
	resize: "none",
	buttons: { 'Close' : function(event) {
	    $("#copylinkPopup").dialog('close');
	    setTimeout(function() { $(".ui-dialog-titlebar").css("display", "block");}, 1000);    
	}
		}
    });

    $(".ui-dialog-titlebar").css("display", "none");
    $("#copylinkText").height($("#copylinkText").prop("scrollHeight")+12);    
    $("#copylinkPopup").dialog('open');
});


/*
* Data point Highlighting
*/

function highlight_datapoint() {
//	console.log("Click Here!");
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;
          
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
}


//
// Global variables
//
var chart = d3.select("#SVG");
// 기본 버튼 칼러색 설정
var buttonColorB = "#E0FFFF";
var buttonColorH = "#FF4500";
var iconB1   = "40px"
var iconB2   = "25px"
var iconH1   = "50px"
var iconH2   = "30px"
// log 스크린 컨트롤
var screenTablePixelHeight = 10000;
// 메뉴 칼러
var exampleDataNo = 10
var menuColor = new Array(exampleDataNo + 1);
var i, j, k, m, temp, tempi;
var freqMin, freqMax, freqMaxDM, numVar, numVarY, numVarX, rawData, checkNumeric;
var svgWidth, svgHeight, margin, graphWidth, graphHeight;
var svgWidth2, svgHeight2;
var title, graphNum;
var str, gstr, xstr, ystr, varListStr;
var str1, str2, str3, str4;
var titleStr = "";
var langNum = 0;
var rowMax = 9999; // 시트행 최대
var colMax = 30; // 시트열 최대
var buffer = 20; // 우측 y선과 범례와  간격
var bothBarGap = 35; // 양쪽막대의 갭
var maxNumEdit = 9; // 변량편집시 최대 변량값 수
var jj = 0; // 변량편집시 초기 컬럼 번호
var graphNumMax = 40; // 그래프 종류의 최대 개수  현재 25개
// 그래프별 초기제목, 주제목, x제목, y제목
var iTitle = new Array(graphNumMax);
var mTitle = new Array(graphNumMax);
var yTitle = new Array(graphNumMax);
var xTitle = new Array(graphNumMax);
// datasheet raw variable
var MISSING = "99999999"; 
var numCol, numRow;
var robs        = new Array(colMax);
var rvarName    = new Array(colMax);
var defaultColHeaders = Array(colMax).fill(1).map((x,y) => "V" + (x+y));
var rvarDeci    = new Array(colMax);
var rvalueNum   = new Array(colMax);
var rvar        = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalue      = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
// 분석-그룹변수 변수리스트
var analysisSelectMain, groupSelectMain, option;    // top1
var groupSelect, sizeSelect;                        // scatter plot
// selected variable for analysis
var selected, selected_point, numOfSelectedColumns, selectedVars;
var tdobs        = new Array(colMax);
var missing      = new Array(colMax); // missing data
var mdobs        = new Array(colMax); // missing data 제거후 obs
var tdvarNumber  = new Array(colMax);
var svarName     = new Array(colMax);
var tdvarName    = new Array(colMax);
var tdvalueNum   = new Array(colMax);
var tdvar        = new Array(colMax); // 2차원 배열로 아래에 정의
var tdvalue      = new Array(colMax); // 2차원 배열로 아래에 정의
var tdvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
var mdvalueNum   = new Array(colMax);
var mdvar        = new Array(colMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
var mdvalue      = new Array(colMax); // 2차원 배열로 아래에 정의
var mdvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
var mdvalueFreq  = new Array(colMax); // 2차원 배열로 아래에 정의
for (j = 0; j < colMax; j++) {
    rvarName[j] = "V" + (j + 1).toString();
    rvar[j]         = new Array(rowMax);
    rvalue[j]       = new Array(rowMax);
    rvalueLabel[j]  = new Array(rowMax);
    tdvar[j]        = new Array(rowMax);
    tdvalue[j]      = new Array(rowMax);
    tdvalueLabel[j] = new Array(rowMax);
    mdvar[j]        = new Array(rowMax); //***** 2차원 배열로 tdvar에서 missing 제거한 배열 
    mdvalue[j]      = new Array(rowMax);
    mdvalueLabel[j] = new Array(rowMax);
    mdvalueFreq[j]  = new Array(rowMax);
    for (i = 0; i < rowMax; i++) {
        rvalueLabel[j][i] = null;
        tdvalueLabel[j][i] = null;
    }
};
// Sorting freq and Ascend/Descend Indexing Label
var dataR   = new Array(rowMax);
var dataA   = new Array(rowMax);
var dataD   = new Array(rowMax);
var indexR  = new Array(rowMax);
var indexA  = new Array(rowMax);
var indexD  = new Array(rowMax);
var vlabelR = new Array(rowMax);
var vlabelA = new Array(rowMax);
var vlabelD = new Array(rowMax);
// dependent variable
var dobs, dvarNumber, dvarName, ndvalue;
var dvar    = new Array(rowMax);
var dvalueNum = new Array(rowMax);
var dataValue = new Array(rowMax);
var dvalueLabel = new Array(rowMax);
var dvalueFreq = new Array(rowMax);
var dataY = new Array(rowMax);
var dvalueP = new Array(rowMax);
// group variable
var gobs, gvarNumber, gvarName, ngvalue, ngroup, ngroup1;
var gvar = new Array(rowMax);
var gvalueNum = new Array(rowMax);
var gdataValue = new Array(rowMax);
var gvalueLabel = new Array(rowMax);
var gvalueFreq = new Array(rowMax);
var currentDataSet = new Array(rowMax);
var currentLabel = new Array(rowMax);
// group2 variable
var gobs2, gvarNumber2, gvarName2, ngvalue2, ngroup2;
var gvar2 = new Array(rowMax);
var gvalueNum2 = new Array(rowMax);
var gdataValue2 = new Array(rowMax);
var gvalueLabel2 = new Array(rowMax);
var gvalueFreq2 = new Array(rowMax);
// 연속형 그래프 변량 정의
var tobs, ttobs, ttnvalue; // Kruskal-Wallis 에서 사용
var mobs; // missing observation
var tdata = new Array(rowMax);
var tdataG2 = new Array(rowMax);
var tstat = new Array(20);
var stat = new Array(30);
var xmin, xmax, ymin, ymax, xbuffer, ybuffer;
var gxmin, gxmax, gxrange, gymin, gymax, gyrange;
// 그룹 변량 정의
var ngroupMax   = 50;
var nclusterMax = 10;
var nobs        = new Array(ngroupMax);
var nobs2       = new Array(ngroupMax);
var dataSet     = new Array(ngroupMax);
var dataSetG2   = new Array(ngroupMax);
var groupFreq   = new Array(ngroupMax);
var nobsTwoWay  = new Array(ngroupMax);
var robsTwoWay  = new Array(ngroupMax);
var cobsTwoWay  = new Array(ngroupMax);
var meanTwoWay  = new Array(ngroupMax);
var rmeanTwoWay = new Array(ngroupMax);
var cmeanTwoWay = new Array(ngroupMax);
var stdTwoWay   = new Array(ngroupMax);
var rstdTwoWay  = new Array(ngroupMax);
var cstdTwoWay  = new Array(ngroupMax);
for (k = 0; k < ngroupMax; k++) {
    nobsTwoWay[k] = new Array(ngroupMax);
    meanTwoWay[k] = new Array(ngroupMax);
    stdTwoWay[k]  = new Array(ngroupMax);
    dataSet[k]    = new Array(rowMax);
    dataSetG2[k]  = new Array(rowMax);
}
var mini   = new Array(ngroupMax);
var Q1     = new Array(ngroupMax);
var median = new Array(ngroupMax);
var Q3     = new Array(ngroupMax);
var maxi   = new Array(ngroupMax);
var avg    = new Array(ngroupMax);
var stdnm1 = new Array(ngroupMax);
var varnm1 = new Array(ngroupMax);
var stdn   = new Array(ngroupMax);
var varn   = new Array(ngroupMax);
var ranksum = new Array(ngroupMax);
// 산점도 변량 정의
var xobs, xvarNumber, xvarName, yobs, yvarNumber, yvarName, nwvalue, wobs, wvarNumber, wvarName;
var scatterS = new Array(20);
var gdata  = new Array(rowMax);
var gcolor = new Array(rowMax);
var xdata  = new Array(rowMax);
var xvalueLabel = new Array(rowMax);
var xavg   = new Array(ngroupMax);
var xstd   = new Array(ngroupMax);
var ydata  = new Array(rowMax);
var yvalueLabel = new Array(rowMax);
var yavg   = new Array(ngroupMax);
var ystd   = new Array(ngroupMax);
var alphaR = new Array(ngroupMax);
var betaR  = new Array(ngroupMax);
var corr   = new Array(ngroupMax);
var rsquare= new Array(ngroupMax);
var sxx    = new Array(ngroupMax);
var syy    = new Array(ngroupMax);
var sxy    = new Array(ngroupMax);
var ssr    = new Array(ngroupMax);
var sse    = new Array(ngroupMax);
var stderr = new Array(ngroupMax);
var wdata  = new Array(rowMax);
var wdataValue = new Array(rowMax);
// 히스토그램 변량
var nint, xstep, freqmax;
var gxminH, gxmaxH, gyminH, gymaxH;
var dataValueH = new Array(rowMax); // 히스토그램 각 구간값: 최대 구간의 수 =199개
var freq = new Array(ngroupMax);
for (k = 0; k < ngroupMax; k++) freq[k] = new Array(rowMax);
// 가설검정 변량
var df, info, alpha, pvalue, b, c, d, e, f, g, h;
var mu, nn, xbar, stdev, vari, variS, teststat, left, right;
var confidence = 0.95;
var hypoType, h1Type;
var df1, df2, t1, t2;
var nn1, nn2, xbar1, xbar2, var1, var2, varPooled, varAdd;
var statT = new Array(30);
var statF = new Array(30);
var ntot, mtot, ssb, ssw, msb, msw, temp;
// 분산분석/회귀분석 변량
var yhat     = new Array(rowMax);
var residual = new Array(rowMax);
var stdResidual = new Array(rowMax);
var Cook     = new Array(rowMax);
var Hii      = new Array(rowMax); // leverage (nx1) 벡터
// 다중회귀분석 변량
var Beta     = new Array(colMax);
var avgX     = new Array(colMax);
var Cii      = new Array(colMax); // invXPX의 대각원소 (px1) 벡터
// 다변량분석 변량
var Cov      = new Array(colMax); // 2차원 행렬
var Corr     = new Array(colMax); // 2차원 행렬
var invXPX   = new Array(colMax); // 2차원 행렬
for (j=0; j<colMax; j++) {
   Cov[j]    = new Array(colMax);
   Corr[j]   = new Array(colMax);
   invXPX[j] = new Array(colMax);
}

// 그래프 종류, 체크버튼	블린 변량들
var VerticalBar, HorizontalBar;
var SeparateBar, StackBar, RatioBar, SideBar, BothBar;
var PieChart, DonutGraph, BandGraph, LineGraph, FreqTable;
var DotGraph, Histogram, BoxGraph, StemLeaf, StemBoth, StatTable, Scatter;
var THmean1, THmean12, THsigma1, THsigma12, THanova;
var comparison;
var checkFreq, checkBandFreq, checkMissing, checkSave;
var checkDotMean, checkDotStd, checkHistMean, checkHistFreq, checkHistLine;
var checkPairedT; // Paired T-test
var checkRegress;
var checkMouseSelection = false;
var checkPastColSelection = false;
var EditGraph = false;
var checkVarSame; // 같은 변수 선택했는지 check
var checkNumVar;
var checkAlphabetic;
var checkRBD, checkDataRBD; // Radomized Block Design
var checkScatterMatrix;

// 그래프 초기화
graphNum = 1;
document.getElementById("separate1").click();
/*
variableSelectClear();
document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
*/

// =================================================================
// 시트 컨트롤
// =================================================================
// sheet 초기화 및 만들기
var colWidth = [];
var data = [
    []
];
numVar = 0;
for (j = 0; j < colMax; j++) colWidth[j] = 50;
document.getElementById("loadFileName").value = "Untitled.csv";
container = document.getElementById('datasheet');
datasheet = new Handsontable(container, {
    data: data,
    autoWrapRow: false,
    autoWrapCol: false,
    minRows: rowMax,
    minCols: colMax,
    minSpareRows: 1,
    colWidths: colWidth,
    colHeaders: rvarName,
    className: "htRight",
    rowHeaders: true,
    rowHeaderWidth: 30,
    contextMenu: true,
    outsideClickDeselects: false,
    multiSelect: true,
    fragmentSelection: false,
});
initEventControl(datasheet);

// 새 시트
d3.select("#new").on("click", function() {
    try {
        datasheet.destroy();
    } catch (e) {
        // alert("");
    }
    numVar = 0;
    numRow = 0;
    numCol = 0;
    for (j = 0; j < colMax; j++) {
        colWidth[j] = 50;
        rvarName[j] = "V" + (j + 1).toString();
    }
    datasheet = new Handsontable(container, {
        minRows: rowMax,
        minCols: colMax,
        minSpareRows: 1,
	autoWrapRow: false,
	autoWrapCol: false,
        colWidths: colWidth,
        colHeaders: rvarName,
        className: "htRight",
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
    document.getElementById("loadFileName").value = "Untitled.csv";
    for (j = 0; j < colMax; j++) {
        robs[j] = 0;
        for (i = 0; i < rowMax; i++) {
            rvar[j][i] = null;
            rvalue[j][i] = null;
            rvalueLabel[j][i] = null;
        }
        tdvarNumber[j] = null;
        tdvarName[j] = null;
        tdvalueLabel[j] = [];
        tdvar[j] = [];
    }
    graphNum = 1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById(strGraph[graphNum]).click();  
    initEventControl(datasheet);
}) // endof new sheet

/*
 *  Common functions for initializing the handsontable
 *  when the datasheet is updated
 *
 */
//
// Hook Handsontable Events
//
function initEventControl(datasheet) {
    isDatasheetChanged = false;
    // 시트 셀 어느 이벤트 발생하든 cell alignment : 문자 left, 숫자 right
    datasheet.addHook('afterChange',    turnOnDatasheetChangeFlag);
    datasheet.addHook('afterRemoveCol', turnOnDatasheetChangeFlag);
    datasheet.addHook('afterRemoveRow', turnOnDatasheetChangeFlag);
    datasheet.addHook('afterCreateRow', turnOnDatasheetChangeFlag);
    datasheet.addHook('afterCreateCol', turnOnDatasheetChangeFlag);
    datasheet.addHook('afterCut',       turnOnDatasheetChangeFlag);

    function turnOnDatasheetChangeFlag() {
	isDatasheetChanged = true;
        syncDatasheetWithInternalDataArray();
    }
    
    function syncDatasheetWithInternalDataArray(change, source) {
        //  console.log(change.length);
        // var row = change[0][0];
        // var col = change[0][1];
        // if (isNaN(change[0][3])) {
        //     datasheet.setCellMeta(row, col, "className", "htLeft");
        // } else {
        //     datasheet.setCellMeta(row, col, "className", "htRight");
        // }
	
        for (j = 0; j < colMax; j++) {
            rvar[j]  = datasheet.getDataAtCol(j);
            robs[j]  = 0;
            for (i = 0; i < rowMax; i++) {
                if (rvar[j][i] == null || rvar[j][i] == "") rvar[j][i] = null;
                else robs[j]++;
            }
            // 소수점이하 자리수 체크
            rvarDeci[j] = 0;
            for (i = 0; i < robs[j]; i++) {
                if (rvar[j][i] == null) continue;
                m = rvar[j][i].indexOf(".");
                if (m > -1) {
                    k = rvar[j][i].length - (m + 1);
                    if (k > rvarDeci[j]) rvarDeci[j] = k;
                }
            } // endof i
        }
        // 각 변량별 최대 관찰값
        numRow = robs[0];
        for (j = 1; j < colMax; j++) { // numRow는 각행의 최대
          if (numRow < robs[j]) numRow = robs[j];
        }
        // 한 열의 모든 값이 missing이나 null이면 null 처리
        for (j = 0; j < colMax; j++) {
            k = 0
            for (i = 0; i < numRow; i++) {
              if (rvar[j][i] == MISSING || rvar[j][i] == null) k++;
            }
            if (numRow == k) {
              for (i=0; i < numRow; i++) rvar[j][i] = null;
            }
        }
        // Recalculate 행의 수
        for (j = 0; j < colMax; j++) {
            robs[j] = 0;
            for (i = 0; i < numRow; i++) {
              if (rvar[j][i] != null) robs[j]++;
            }
        }
        // 사각형 열의 수 계산 : 
        for (j = 0; j < colMax; j++) {
            if (robs[j] > 0) numCol = j+1;  
        }
        // 사각형 범위에서 Missing count
        for (j = 0; j < numCol; j++) {
            missing[j] = 0;
            for (i = 0; i < numRow; i++) {
                if ( rvar[j][i] == "" || rvar[j][i] == undefined || rvar[j][i] == null) {
                    rvar[j][i] = MISSING; 
                    missing[j]++;  // missing count
                }  
            }
        }
        // empty column check
        for (j = 0; j < numCol; j++) { 
            if (robs[j] == 0) {
                alert("Empty columns is not allowed !!!");
                return;
            }
        }
        // 각 변량별 값 계산
        for (j = 0; j < numCol; j++) {
            for (i = 0; i < numRow; i++) dataA[i] = rvar[j][i];
            rvalueNum[j] = sortAscendAlpha(robs[j], dataA, dataValue, dvalueFreq);
            for (k = 0; k < rvalueNum[j]; k++) rvalue[j][k] = dataValue[k];
        }
        datasheet.render();
        // 선택된 변수 초기화 -- 데이터의 변화가 있을때만 집행 
	if(checkPastColSelection == false) { // 만일 마우스로 변수 선택만 했을 경우는 초기화 안함 2019.5.12
          document.getElementById("selectedVars").value = "";
          numVar = 0;
          checkPastColSelection = false;
          updateVarList();
        }
    }
    
    // 시트 컬럼 및 행 이벤트 컨트롤
    datasheet.addHook('afterOnCellMouseUp', function(event, coords) {
        //	  console.log(coords);
        //	  console.log(coords.row+" "+coords.col);
	if(isDatasheetChanged) {
	    syncDatasheetWithInternalDataArray();
	    isDataSheetChanged = false;
	}
        if (coords.row == -1) { // 컬럼번호 클릭
            checkMouseSelection = true;
            selected = datasheet.getSelected();
            numOfSelectedColumns = selected[0][3] - selected[0][1] + 1;
            if (checkPastColSelection == false) {
              numVar = 0;
              checkPastColSelection = true;
            }
            for (j = 0; j < numOfSelectedColumns; j++) {
                k = j + parseInt(selected[0][1]);
                tdvarNumber[numVar + j] = k + 1;
                // 그룹과 분석이 같은 변수가 선택되었는지 체크
                checkVarSame = false;
                if (numVar > 0) {
                  for (i=0; i < numVar; i++) {
                    if ( tdvarNumber[i] == (k+1) ) {
                      alert(alertMsg[46][langNum]);  // 같은 변수 선택
                      checkVarSame = true;
                      break;
                    }
                  }
                }
                if (checkVarSame) break;
                // 변수수 제한 체크
                validateNumVar(graphNum, numVar+1);
                if (checkNumVar == false) break;
                tdobs[numVar + j] = robs[k];
                tdvalueNum[numVar + j] = rvalueNum[k];
                tdvarName[numVar + j]  = rvarName[k];
                // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
                for (m = 0; m < robs[k]; m++) {
                    tdvalue[numVar + j][m] = rvalue[k][m];
                    tdvalueLabel[numVar + j][m] = rvalueLabel[k][m];
                    tdvar[numVar + j][m] = rvar[k][m];
                }
            }
            if (checkVarSame == false && checkNumVar == true) {
              numVar += numOfSelectedColumns;

              if (graphNum == 43 || graphNum == 49) {
                  // 분석변량
                  document.getElementById("groupSelectMain").value = tdvarNumber[0];
		  estatapp.groupVars = tdvarNumber.slice(0, numVar);
                  // 선택변수 리스트
                  varListStr = "V" + tdvarNumber[0].toString() + ",";
                  for (i = 1; i < numVar; i++) varListStr += "V" + tdvarNumber[i].toString() + ",";
                  d3.select("#selectedVars").node().value = varListStr;
              }
              // Select box에 표시
              else if (numVar == 1) {
                  // 분석변량
                  document.getElementById("analysisSelectMain").value = tdvarNumber[0];
		  estatapp.analysisVar = tdvarNumber[0];
                  // 선택변수 리스트
                  varListStr = "V" + tdvarNumber[numVar-1].toString();
                  d3.select("#selectedVars").node().value = varListStr;
              }
              else {
                  // 그룹변량
                  document.getElementById("groupSelectMain").value = tdvarNumber[numVar-1];
		  estatapp.groupVars = tdvarNumber.slice(1, numVar);
                  // 선택변수 리스트
                  if (numVar == 2) varListStr += "  "+svgStrU[84][langNum]+"  ";
                  varListStr += "V" + tdvarNumber[numVar-1].toString() + ",";
                  d3.select("#selectedVars").node().value = varListStr;
              }
              // Redraw Graph
              document.getElementById(strGraph[graphNum]).click();  
            }
        } 
	if (checkScatterMatrix == false && coords.col == -1) { // 행번호 클릭		
	    k = coords.row;			
	    d3.selectAll(".highlight_datapoint")
	      .attr("class", "datapoint")
	      .attr("r", wdata[k])
	      .style("stroke", "black")
	      .style("stroke-width", 1) 					  
	    selected_point = $("[data-sheetrowid=" + k + "]")[0];
	    d3.select(selected_point)
	      .attr("class", "datapoint highlight_datapoint")
	      .attr("r", wdata[k] + 5)
	      .style("stroke", "orange")
	      .style("stroke-width", 5) 			 
        }					
    });
}
// 데이터시트 이벤트 초기화 함수 끝 --------------------------------------------
// automatically set alignment and colWidth
// according to the data types (string, numeric)
//
function updateCellMeta() {
    var colCharMax = [];
    var m, strRead;
    for (j = 0; j < datasheet.countCols(); j++) {
        colCharMax[j] = 0;
        rvarDeci[j] = 0;
        for (i = 0; i < datasheet.countRows(); i++) {
            strRead = datasheet.getDataAtCell(i, j);
            if (strRead == null) continue;
            // count # of char, 영어 1, 한글 2
            k = 0;
            for (m = 0; m < strRead.length; m++) {
                if (is_hangul_char(strRead[m])) k = k + 2;
                else k++;
            }
            if (k > colCharMax[j]) colCharMax[j] = k;
            // 문자 왼쪽정렬, 숫자 오른쪽정렬
            if (isNaN(datasheet.getDataAtCell(i, j))) {
                datasheet.setCellMeta(i, j, "className", "htLeft");
            } else {
                datasheet.setCellMeta(i, j, "className", "htRight");
            }
            // 소수점이하 자리수 체크
            m = strRead.indexOf(".");
            if (m > -1) {
                k = strRead.length - (m + 1);
                if (k > rvarDeci[j]) rvarDeci[j] = k;
            }
        } // endof i
        if (colCharMax[j] < 6) colWidth[j] = 55;
        else colWidth[j] = 5 + colCharMax[j] * 8;
    } // endof j
    datasheet.getSettings().colWidths = colWidth;
    datasheet.render();
}

/*
 * open an example
 *
*/
d3.select("#icon_openExample").on("click", function() {
    $("#exampleFileListing").dialog("open");
});
$(document).ready(function() {
    $("#exampleFileListing").fileTree({
        root: '../Example/'
    }, function(file) {
	examplePath = file.substring(11);
	openExample(examplePath);
        $("#exampleFileListing").dialog("close");
    });
});
function openExample(examplePath, callback = undefined) {
    url = "../Example/" + examplePath;
    estatapp.dataURL = url;
    readFromURL(url, callback);
}
//
//  read data from URL
//
$("#button_readFromURL").click(function() {
    $("#dialog_readFromURL").dialog("open");
});
$("#button_readFromURLSubmit").click(function() {
    $("#dialog_readFromURL").dialog("close");
    var url = $("#text_readFromURL").val();
    $("#text_readFromURL").val("");
    readFromURL(url);
});
function readFromURL(url, callback = undefined) {
    estatapp.dataURL = url;
    document.getElementById("loadFileName").value = url.split('/').pop();
    d3.csv(url, function(csvdata) {
        data = csvdata.map(Object.values);
        updateDatasheetWithArrayOfRows(data, csvdata.columns);
	if (callback !== undefined) callback();
    });
}
//
// import a CSV file
//
$("#icon_importCSV").click(function() {
    $("#input_importCSV").click();
});
$("#input_importCSV").change(importCSV);
function importCSV(evt) {
    var fr = new FileReader();
    str = evt.target.files[0].name;
    document.getElementById("loadFileName").value = str;
    fr.onload = function(e) {
        csvdata = d3.csvParse(fr.result); // parse csv into [{}, {}, .., {}]
        data = csvdata.map(Object.values); // convert it to [[], [], ..., []]
        updateDatasheetWithArrayOfRows(data, csvdata.columns);
    }
    fr.readAsText(evt.target.files[0]);
    $("#input_importCSV").val("");
}

function updateDatasheetWithArrayOfRows(data, colHeaders) {
    datasheet.destroy();
    datasheet = new Handsontable(container, {
        data: data,
        minRows: rowMax, // 파일 읽을때는 데이터 개수만큼만 되어야
        minCols: colMax,
        minSpareRows: 0,
	autoWrapRow: false,
	autoWrapCol: false,
        colWidths: colWidth,
        colHeaders: colHeaders.concat(defaultColHeaders.slice(colHeaders.length)),
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    // initialize
    updateCellMeta();
    for ( j = 0; j < colMax; j++) {
      rvarName[j] = datasheet.getColHeader(j);
      for ( i = 0; i < rowMax; i++) rvar[j][i] = data[i][j];
    }
    updateInternalArray();
    variableSelectClear();
    graphTitle(); // set default graph title
    document.getElementById("separate1").click();  // defalut는 막대그래프
    initEventControl(datasheet);
    updateVarList();
}
//
// update global variables using rvar
// =>   robs, numRow, numCol, rvalue
function updateInternalArray(){
        // 각 변수별 observation
        for (j = 0; j < colMax; j++) {
            robs[j]  = 0;
            for (i = 0; i < rowMax; i++) {
                if (rvar[j][i] != null) {
                  robs[j]++;
                }
            }
            // 소수점이하 자리수 체크
            rvarDeci[j] = 0;
            for (i = 0; i < robs[j]; i++) {
                if (rvar[j][i] == null) continue;
                m = rvar[j][i].indexOf(".");
                if (m > -1) {
                    k = rvar[j][i].length - (m + 1);
                    if (k > rvarDeci[j]) rvarDeci[j] = k;
                }
            } // endof i
        }
        // 각 변량별 최대 관찰값
        numRow = robs[0];
        for (j = 1; j < colMax; j++) { // numRow는 각행의 최대
          if (numRow < robs[j]) numRow = robs[j];
        }
        // 데이터 사각형 열의 수 계산 : 
        for (j = 0; j < colMax; j++) {
            if (robs[j] > 0) numCol = j+1;  
        }
        // Missing 지정
        for (j = 0; j < numCol; j++) {
            missing[j] = 0;
            for (i = 0; i < numRow; i++) {
                //***** missing
                if ( rvar[j][i] == "" || rvar[j][i] == undefined || rvar[j][i] == null) {
                    rvar[j][i] = MISSING; 
                    missing[j]++;  // missing count
                }  
            }
        }
        // Recalculate 행의 수
        for (j = 0; j < numCol; j++) {
            robs[j] = 0;
            for (i = 0; i < numRow; i++) {
              if (rvar[j][i] != MISSING) robs[j]++;
            }
            if (robs[j] == 0) {  // empty column check
                alert("Empty columns is not allowed !!!");
                return;
            }
        }
        // 각 변량별 값 계산
        for (j = 0; j < numCol; j++) {
            for (i = 0; i < robs[j]; i++) dataA[i] = rvar[j][i];
            rvalueNum[j] = sortAscendAlpha(robs[j], dataA, dataValue, dvalueFreq);
            for (k = 0; k < rvalueNum[j]; k++) rvalue[j][k] = dataValue[k];
        }
}

function updateVarList() {
    // top1 분석변수 선택리스트
    analysisSelectMain = document.getElementById("analysisSelectMain");
    analysisSelectMain.innerHTML = '<option value="0" selected> --- </option>'	
    for (i=0; i<numCol; i++) {
        option = document.createElement("option");
        option.text  = (i+1).toString() + ": "+ rvarName[i];
        option.value = i+1;
        analysisSelectMain.options.add(option);
    }
    // top1 그룹변수 선택리스트
    groupSelectMain = document.getElementById("groupSelectMain");
    groupSelectMain.innerHTML = '<option value="0" selected> --- </option>'
    for (i=0; i<numCol; i++) {
        option = document.createElement("option");
        option.text  = (i+1).toString() + ": "+ rvarName[i];
        option.value = i+1;
        groupSelectMain.options.add(option);
    }
    // 산점도 그룹변수 선택리스트
    groupSelect = document.getElementById("groupSelect");
    groupSelect.innerHTML = '<option value="0" selected> --- </option>'
    for (i=0; i<numCol; i++) {
        option = document.createElement("option");
        option.text  = (i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        groupSelect.options.add(option);
    }
    // 산점도 크기변수 선택리스트
    sizeSelect = document.getElementById("sizeSelect");
    sizeSelect.innerHTML = '<option value="0" selected> --- </option>'	
    for (var i=0; i<numCol; i++) {
        var option = document.createElement("option");
        option.text  = (i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        sizeSelect.options.add(option);
    }
}

/*
 * open a data file (JSON)
*/
$("#icon_openFile").click(function() {
    $("#input_openFile").click();
})
$("#input_openFile").change(openFile);
function openFile(evt) {
    var fr = new FileReader();
    str = evt.target.files[0].name;
    document.getElementById("loadFileName").value = str;
    fr.onload = function(e) {
        var dataobj = JSON.parse(fr.result);
        updateDatasheetWith(dataobj);
    }
    fr.readAsText(evt.target.files[0]);
    $("#input_openFile").val("");
}
function updateDatasheetWith(dataobj) {
    datasheet.destroy();
    datasheet = new Handsontable(container, {
        data: dataobj.data,
        minRows: rowMax,
        minCols: colMax,
        minSpareRows: 1,	
	autoWrapRow: false,
	autoWrapCol: false,
        colWidths: colWidth,
        colHeaders: dataobj.colHeaders.concat(defaultColHeaders.slice(dataobj.colHeaders.length)),
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    // initialize
    updateCellMeta();
    rvarName = dataobj.rvarName;
    rvalueLabel = dataobj.rvalueLabel;   // inserted Sep 30, 2022
    for (j = 0; j < colMax; j++) {
        rvar[j] = datasheet.getDataAtCol(j);
    }
    updateInternalArray();
    variableSelectClear();
    document.getElementById("separate1").click();  // defalut는 막대그래프
    graphTitle(); // set default graph title
    initEventControl(datasheet);
}
// crop a sheet data with empty cells to a complete rectangular data
function cropData(data) {
    var newdata = [];
    data.forEach(function(row) {
        var i = row.findIndex(function(x) {
            return x == null || x == '';
        });
        if (i > 0) {
            newdata.push(row.slice(0, i));
        } else if (i == -1) {
            newdata.push(row);
        }
    });
    return newdata;
} 
// export datasheet to csv ------------------------------------------
d3.select("#exportCSV").on("click", function() {
    checkDataSave();
    if (checkSave == false) return;
    var croppedData = cropData(datasheet.getData());
    var csvhead = datasheet
        .getColHeader()
        .slice(0, croppedData[0].length)
        .map(function(s) {
            return "\"" + s + "\"";
        });
    var csvbody = croppedData.reduce(function(a, b) {
        return a + "\n" + b;
    });
    var text = csvhead + "\n" + csvbody;
    var filename = $("#loadFileName").val().replace(/\.json$/, ".csv");
    if (!filename.endsWith(".csv")) { filename = filename + ".csv"; }
    $("#loadFileName").val(filename);
    var blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filename);
}) 
//----------------------------------------------------------------
// save file ---------------------------------------------------------
d3.select("#save").on("click", function() {
    checkDataSave();
    if (checkSave == false) return;
    var croppedData = cropData(datasheet.getData());
    var croppedColHeader = datasheet.getColHeader()
        .slice(0, data[0].length);
    // rvar, rvarName, robs, rvalueNum, rvalue, rvalueLabel
    var dataobj = {
        data: croppedData,
        colHeaders: croppedColHeader,
        rvarName: rvarName,
        robs: robs,
        rvalueNum: rvalueNum,
        rvalue: rvalue,
        rvalueLabel: rvalueLabel,
        numCol: numCol,
        numRow: numRow,
    }
    var jsonstr = JSON.stringify(dataobj);
    var filename = $("#loadFileName").val().replace(/\.csv$/, ".json");
    if(!filename.endsWith(".json")) { filename = filename + ".json"; }
    $("#loadFileName").val(filename);
    var blob = new Blob([jsonstr], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filename);
}) 
// ------------------------------------------------------------------
// Data Save 가능여부 체크
function checkDataSave() {
    checkSave = true;
    for (j = 0; j < numCol; j++) {
        for (i = 0; i < numRow; i++) {
            if (rvar[j][i] == null || rvar[0][i] == "") {
                alert(alertMsg[21][0]);
                checkSave = false;
                return;
            }
        }
    }
} 
// From https://milooy.wordpress.com/2017/03/28/javascript-print-page/
// sheet Print
d3.select("#printSheet").on("click", function() {
    const html = document.querySelector('html');
    //	const printContents = document.querySelector('#datasheet').innerHTML;
    const printContents = dataTable().innerHTML;
    const printDiv = document.createElement('table');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// svg Graph Save
d3.select("#saveGraph").on("click", function() {
    var svg = d3.select("#SVG");
    var width = svgWidth;
    var height = svgHeight;
    var svgString = getSVGString(svg.node());
    svgString2Image(svgString, width, height, 'png', save);
    function save(dataBlob, filesize) {
        saveAs(dataBlob, 'eStatGraph.png');
    }
});
// svg Graph Print
d3.select("#printGraph").on("click", function() {
    const html = document.querySelector('html');
    const printContents = document.querySelector('#graph-main-container').innerHTML;
    const printDiv = document.createElement('DIV');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// svg Graph Move
d3.select("#moveGraph").on("click", function() {
    var svg = d3.select("#SVG");
    var width = svgWidth;
    var height = svgHeight;
    var txt = "<br><p>";
    var svgString = getSVGString(svg.node());
    $("#loc").append(svgString);
    $("#loc").append(txt, txt);
//    screenTablePixelHeight = svgHeight + 100;
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
    // var imgsrc = 'data:image/svg+xml;utf8,'+svgString;
    //	  $("#screenTable").append(svgString);
    //	$("<img>").attr("src", imgsrc)
    //			     .attr("width", width)
    //			     .attr("height", height));
});
// save Table
d3.select("#saveTable").on("click", function() {
    head = '<html><head><meta charset="UTF-8"></head><body>';
    tail = '</body></html>';
    saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatLog.html");
});
// print Table
d3.select("#printTable").on("click", function() {
    const html = document.querySelector('html');
    const printContents = document.querySelector('#screenTable').innerHTML;
    const printDiv = document.createElement('DIV');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// 분석변량 선택   
document.getElementById("analysisSelectMain").onchange = function() {
      j = parseInt(document.getElementById("analysisSelectMain").value);
    selectAnalysisVariable(j);
    document.getElementById(strGraph[graphNum]).click();  // Redraw Graph - defalut는 막대그래프        
}
function selectAnalysisVariable(varid) {
      chart.selectAll("*").remove();
      document.getElementById("groupSelectMain").options[0].selected = true
      checkPastColSelection = true;
    document.getElementById("analysisSelectMain").value = varid    
    j = varid;
      k = j - 1;
      if (k < 0) return;
      numVar = 0;
      tdvarNumber[numVar] = j;
      tdobs[numVar] = robs[k];
      tdvalueNum[numVar] = rvalueNum[k];
      tdvarName[numVar] = rvarName[k];
      // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
      for (m = 0; m < robs[k]; m++) {
        tdvalue[numVar][m] = rvalue[k][m];
        tdvalueLabel[numVar][m] = rvalueLabel[k][m];
        tdvar[numVar][m] = rvar[k][m];
        if (tdvar[numVar][m] == "") tdvar[numVar][m] = "99999999";  // missing
      }
      numVar = 1;
      // 변수선택 표시
      varListStr = "V"+tdvarNumber[0].toString();
      d3.select("#selectedVars").node().value = varListStr;

    estatapp.analysisVar = tdvarNumber[0];

}

// 그룹변량 선택 
document.getElementById("groupSelectMain").onchange = function() {
    j = parseInt(document.getElementById("groupSelectMain").value);
    selectGroupVariable(j);
    if(checkNumVar) {
        document.getElementById(strGraph[graphNum]).click();  // Redraw Graph - defalut는 막대그래프
    }

}
function selectGroupVariable(varid) {
    document.getElementById("groupSelectMain").value = varid;
    j = varid;
      // 그룹과 분석이 같은 변수가 선택되었는지 체크
      for (var i=0; i < numVar; i++) {
        if ( tdvarNumber[i] == j ) {
          k = tdvarNumber[numVar-1];
          if (numVar == 1) document.getElementById("groupSelectMain").options[0].selected = true;
          else document.getElementById("groupSelectMain").options[k].selected = true;
          alert(alertMsg[46][langNum]);  // 같은 변수 선택
          return;
        }
      }
      k = j - 1;
      if (k < 0) {
        numVar = 1;
        document.getElementById(strGraph[graphNum]).click();  // Redraw Graph - defalut는 막대그래프
        // 변수선택 표시
        varListStr = "V"+tdvarNumber[0].toString();
        d3.select("#selectedVars").node().value = varListStr;
        return;
      }
      validateNumVar(graphNum, numVar+1);
      if (checkNumVar) {
        tdvarNumber[numVar] = k+1;
        tdobs[numVar] = robs[k];
        tdvalueNum[numVar] = rvalueNum[k];
        tdvarName[numVar] = rvarName[k];
        // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
        for (m = 0; m < robs[k]; m++) {
          tdvalue[numVar][m] = rvalue[k][m];
          tdvalueLabel[numVar][m] = rvalueLabel[k][m];
          tdvar[numVar][m] = rvar[k][m];
          if (tdvar[numVar][m] == "") tdvar[numVar][m] = "99999999";  // missing
        }
        // 선택변수 리스트
        if (numVar == 1) varListStr += "  "+svgStrU[84][langNum]+"  ";
        varListStr += "V" + tdvarNumber[numVar].toString()+",";
        d3.select("#selectedVars").node().value = varListStr;
        numVar++;
      }

    estatapp.groupVars = tdvarNumber.slice(1, numVar);
}

// 산점도 그룹변량 선택 
document.getElementById("groupSelect").onchange = function() {
    j = parseInt(document.getElementById("groupSelect").value);
    gvarNumber = j; 
    wvarNumber = parseInt(document.getElementById("sizeSelect").value);
    k = j - 1;
    if (k < 0) {
      document.getElementById(strGraph[graphNum]).click();  // Redraw Graph 
      return;
    }
    // 같은 변수 입력 체크
    if (tdvarNumber[0] == j || tdvarNumber[1] == j) {
      document.getElementById("groupSelect").options[0].selected = true
      alert(alertMsg[46][langNum]);  // 같은 변수 선택
      return;
    }
    // 그룹변수 복사
    tdvarNumber[2] = gvarNumber;
    tdobs[2]       = robs[k];
    tdvalueNum[2]  = rvalueNum[k];
    tdvarName[2]   = rvarName[k];
    // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
    for (m = 0; m < robs[k]; m++) {
        tdvalue[2][m]      = rvalue[k][m];
        tdvalueLabel[2][m] = rvalueLabel[k][m];
        tdvar[2][m]        = rvar[k][m];
        if (tdvar[2][m] == "") tdvar[2][m] = "99999999";  // missing
    }
    document.getElementById(strGraph[graphNum]).click();  // Redraw Graph 
}
// 산점도 원크기변량 선택 
document.getElementById("sizeSelect").onchange = function() {
    j = parseInt(document.getElementById("sizeSelect").value);
    gvarNumber = parseInt(document.getElementById("groupSelect").value); 
    wvarNumber = j;
    k = j - 1;
    if (k < 0) {
      document.getElementById(strGraph[graphNum]).click();  // Redraw Graph 
      return;
    }
    // numeric check : 문자 데이터 방지
    for (i=0; i<robs[0]; i++) {
      if (isNaN(rvar[k][i])) {
        checkNumeric = false;
        alert(alertMsg[19][langNum]);
        return;
      } // endof if
    } // endof i

    // 사이즈변수 복사
    tdvarNumber[3] = wvarNumber;
    tdobs[3]       = robs[k];
    tdvalueNum[3]  = rvalueNum[k];
    tdvarName[3]   = rvarName[k];
    // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
    for (m = 0; m < robs[k]; m++) {
        tdvalue[3][m]      = rvalue[k][m];
        tdvalueLabel[3][m] = rvalueLabel[k][m];
        tdvar[3][m]        = rvar[k][m];
        if (tdvar[3][m] == "") tdvar[3][m] = "99999999";  // missing
    }
    document.getElementById(strGraph[graphNum]).click();  // Redraw Graph 
}

// 변량 선택 취소
d3.select("#debugBtn").on("click", function() {
    variableSelectClear();
})
// =================================================================
// 버튼, 라디오버튼, 체크박스 클릭
// =================================================================
// 학습수준 버튼
/*
var rad1 = document.myForm1.type1;
rad1[0].onclick = function() { // 초등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "none"; // 연속형 그래프 감추기
    document.getElementById("bothstem2").style.display = "none"; // 양쪽형 줄기잎 감추기
    document.getElementById("statTable").style.display = "none"; // 기초통계량 감추기
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatM").style.display = "none"; // 중둥 모듈 감추기
    document.getElementById("estatH").style.display = "none"; // 고등 모듈 감추기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[1].onclick = function() { // 중등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatM").style.display = "block"; // 중둥 모듈
    document.getElementById("estatH").style.display = "none"; // 고등 모듈
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[2].onclick = function() { // 고등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatM").style.display = "block"; // 중둥 모듈
    document.getElementById("estatH").style.display = "block"; // 고등 모듈 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[3].onclick = function() { // 대학
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "inline-block"; // 가설검정
    document.getElementById("estatM").style.display = "block"; // 중둥 모듈
    document.getElementById("estatH").style.display = "block"; // 고등 모듈 보이기
    document.getElementById("estatU").style.display = "block"; // 대학 모듈
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
*/
// 분리형 막대그래프 : 주메뉴
d3.select("#separate1").on("click", function() {
    graphNum = 1;
    buttonColorChange();
    document.getElementById("separate1").style.backgroundColor = buttonColorH;
    document.getElementById("separate1").style.width  = iconH1;
    document.getElementById("separate1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) { // 데이터에 음수가 있는 경우
       alert(alertMsg[22][langNum]); // 음수
       return;
    }
    SeparateBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    if (ngroup == 1) {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
    else {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    }
})
// 분리형 수직 막대그래프 : 부메뉴
d3.select("#separate2V").on("click", function() {
    graphNum = 1;
    buttonColorChange();    // graphSubHide 포함
    document.getElementById("separate2V").style.backgroundColor = buttonColorH;
    document.getElementById("separate2V").style.width  = iconH2;
    document.getElementById("separate2V").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0 && SeparateBar) {
        alert(alertMsg[22][langNum]);
        return;
    };
    SeparateBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    if (ngroup == 1) {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
    else {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    }
})
// 분리형 수평 막대그래프 : 부메뉴
d3.select("#separate2H").on("click", function() {
    graphNum = 6;
    buttonColorChange();
    document.getElementById("separate2H").style.backgroundColor = buttonColorH;
    document.getElementById("separate2H").style.width  = iconH2;
    document.getElementById("separate2H").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0 && HorizontalBar) {
        alert(alertMsg[23][langNum]);
        return;
    };
    SeparateBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    if (ngroup == 1) {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
    else {
        document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    }
})
// 막대그래프 도수표시 버튼 클릭
d3.select("#freq").on("click", function() {
    if (SeparateBar) {
        if (this.checked) {
            checkFreq = true;
            drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
                freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
        } else {
            checkFreq = false;
            removeFreq();
        }
    }
})
// 그룹이 없을 경우 막대그래프 내림차순, 올림차순 버튼
var rad2 = document.myForm2.type2;
rad2[0].onclick = function() { // 원자료
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataR;
        currentLabel = vlabelR;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
rad2[1].onclick = function() { // 내림차순
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataD;
        currentLabel = vlabelD;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
rad2[2].onclick = function() { // 올림차순
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataA;
        currentLabel = vlabelA;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
// 쌓는형 수직 막대 버튼 클릭
d3.select("#stack2V").on("click", function() {
    graphNum = 2;
    buttonColorChange();
    document.getElementById("stack2V").style.backgroundColor = buttonColorH;
    document.getElementById("stack2V").style.width  = iconH2;
    document.getElementById("stack2V").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[24][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[25][langNum]);
        return;
    };
    StackBar = true
    VerticalBar = true;
    HorizontalBar = false;
    chart.selectAll("*").remove();
    drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 쌓는형 수평 막대 버튼 클릭
d3.select("#stack2H").on("click", function() {
    graphNum = 7;
    buttonColorChange();
    document.getElementById("stack2H").style.backgroundColor = buttonColorH;
    document.getElementById("stack2H").style.width  = iconH2;
    document.getElementById("stack2H").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[24][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[25][langNum]);
        return;
    };
    StackBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    chart.selectAll("*").remove();
    drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 비율형 수직 막대 버튼 클릭
d3.select("#ratio2V").on("click", function() {
    graphNum = 3;
    buttonColorChange();
    document.getElementById("ratio2V").style.backgroundColor = buttonColorH;
    document.getElementById("ratio2V").style.width  = iconH2;
    document.getElementById("ratio2V").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[26][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[27][langNum]);
        return;
    };
    RatioBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    chart.selectAll("*").remove();
    drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 비율형 수평 막대 버튼 클릭
d3.select("#ratio2H").on("click", function() {
    graphNum = 8;
    buttonColorChange();
    document.getElementById("ratio2H").style.backgroundColor = buttonColorH;
    document.getElementById("ratio2H").style.width  = iconH2;
    document.getElementById("ratio2H").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[26][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[27][langNum]);
        return;
    };
    RatioBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    chart.selectAll("*").remove();
    drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 나란형 수직 막대그래프
d3.select("#side2V").on("click", function() {
    graphNum = 4;
    buttonColorChange();
    document.getElementById("side2V").style.backgroundColor = buttonColorH;
    document.getElementById("side2V").style.width  = iconH2;
    document.getElementById("side2V").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[28][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[29][langNum]);
        return;
    };
    SideBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    chart.selectAll("*").remove();
    drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 나란형 수평 막대그래프
d3.select("#side2H").on("click", function() {
    graphNum = 9;
    buttonColorChange();
    document.getElementById("side2H").style.backgroundColor = buttonColorH;
    document.getElementById("side2H").style.width  = iconH2;
    document.getElementById("side2H").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[28][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[29][langNum]);
        return;
    };
    SideBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    chart.selectAll("*").remove();
    drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 양쪽형 수직 막대 버튼 클릭
d3.select("#bothbar2V").on("click", function() {
    graphNum = 5;
    buttonColorChange();
    document.getElementById("bothbar2V").style.backgroundColor = buttonColorH;
    document.getElementById("bothbar2V").style.width  = iconH2;
    document.getElementById("bothbar2V").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[30][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[31][langNum]);
        return;
    };
    if (ngroup == 2) {
        BothBar = true;
        VerticalBar = true;
        HorizontalBar = false;
        chart.selectAll("*").remove();
        drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
    }
})
// 양쪽형 수평 막대 버튼 클릭
d3.select("#bothbar2H").on("click", function() {
    graphNum = 10;
    buttonColorChange();
    document.getElementById("bothbar2H").style.backgroundColor = buttonColorH;
    document.getElementById("bothbar2H").style.width  = iconH2;
    document.getElementById("bothbar2H").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[30][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[31][langNum]);
        return;
    };
    if (ngroup == 2) {
        BothBar = true;
        VerticalBar = false;
        HorizontalBar = true;
        chart.selectAll("*").remove();
        drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
    }
})
// 원그래프 버튼 클릭 : 주메뉴
d3.select("#pie1").on("click", function() {
    graphNum = 11;
    buttonColorChange();
    document.getElementById("pie1").style.backgroundColor = buttonColorH;
    document.getElementById("pie1").style.width  = iconH1;
    document.getElementById("pie1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[32][langNum]);
        return;
    };
    PieChart = true;
    chart.selectAll("*").remove();
    drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 도넛그래프 버튼 클릭
d3.select("#donut2").on("click", function() {
    graphNum = 12;
    buttonColorChange();
    document.getElementById("donut2").style.backgroundColor = buttonColorH;
    document.getElementById("donut2").style.width  = iconH2;
    document.getElementById("donut2").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[33][langNum]);
        return;
    };
    document.getElementById("mean").checked = false;
    DonutGraph = true;
    chart.selectAll("*").remove();
    drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 띠그래프 버튼 클릭 : 주메뉴
d3.select("#band1").on("click", function() {
    graphNum = 13;
    buttonColorChange();
    document.getElementById("band1").style.backgroundColor = buttonColorH;
    document.getElementById("band1").style.width  = iconH1;
    document.getElementById("band1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    document.getElementById("sub3").style.display = "block"; //띠그래프 도수표시
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[34][langNum]);
        return;
    };
    document.getElementById("mean").checked = false;
    BandGraph = true;
    chart.selectAll("*").remove();
    drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 띠그래프 도수표시 버튼 클릭
d3.select("#mean").on("click", function() {
    if (!BandGraph) return;
    if (this.checked) {
        if (BandGraph) {
            checkBandFreq = true;
            chart.selectAll("*").remove();
            drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
        }
    } else {
        checkBandFreq = false;
        removeBandFreq();
    }
})
// 꺽은선그래프 클릭 : 주메뉴
d3.select("#line1").on("click", function() {
    graphNum = 14;
    buttonColorChange();
    document.getElementById("line1").style.backgroundColor = buttonColorH;
    document.getElementById("line1").style.width  = iconH1;
    document.getElementById("line1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStrU[82][langNum]; // X변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassifyLine();
    if (checkNumeric == false) return;
    LineGraph = true;
    chart.selectAll("*").remove();
    currentLabel = dvalueLabel;
    drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
})

// 그룹이 없을 경우 꺽은선그래프 내림차순, 올림차순 버튼
var rad3 = document.myForm3.type3;
rad3[0].onclick = function() { // 원자료
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataR;
        currentLabel = vlabelR;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
}
rad3[1].onclick = function() { // 내림차순
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataD;
        currentLabel = vlabelD;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
}
rad3[2].onclick = function() { // 올림차순
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataA;
        currentLabel = vlabelA;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
} 
// 도수분포표 버튼 클릭
d3.select("#freqTable").on("click", function() {
    graphNum = 22;
    buttonColorChange();
    document.getElementById("freqTable").style.backgroundColor = buttonColorH;
    document.getElementById("freqTable").style.width  = iconH1;
    document.getElementById("freqTable").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[79][langNum]+": "+svgStrU[80][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[35][langNum]);
        return;
    };
    document.getElementById("mean").checked = false;
    FreqTable = true;
//    ngvalue = ngroup;
//    chart.selectAll("*").remove();
//    drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    freqTable(numVar, tdvarNumber, ndvalue, dvarName, dataValue, dvalueLabel, ngroup, gvarName, gvalueLabel);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// ==========================================================================================
// 연속형 변량 그래프 ========================================================================
//===========================================================================================
// 그룹 점그래프 : 주메뉴
d3.select("#dot1").on("click", function() {
    graphNum = 15;
    buttonColorChange();
    document.getElementById("dot1").style.backgroundColor = buttonColorH;
    document.getElementById("dot1").style.width  = iconH1;
    document.getElementById("dot1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    DotGraph = true;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    chart.selectAll("*").remove();
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    document.getElementById("sub5").style.display = "block"; //점그래프 평균, 표준편차표시
})
// 점그래프 평균 표준편차표시
d3.select("#DotMean").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotMean = true;
            showDotMean(ngroup, nobs, avg, stdnm1, tstat);
            showDotStd3(ngroup, nobs, avg, stdnm1, tstat);
        } else {
            checkDotMean = false;
            removeDotMean();
            removeDotStd();
        }
    }
})
/*
// 점그래프 95%신뢰구간표시
d3.select("#DotStd").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotStd = true;
            gxmin = tstat[11];
            gxmax = tstat[12];
            showDotStd(ngroup, nobs, avg, stdnm1, gxmin, gxmax, tstat[13], tstat[14]);
        } else {
            checkDotStd = false;
            removeDotStd();
        }
    }
})
*/

// 히스토그램 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#hist1").on("click", function() {
    graphNum = 19;
    buttonColorChange();
    document.getElementById("hist1").style.backgroundColor = buttonColorH;
    document.getElementById("hist1").style.width  = iconH1;
    document.getElementById("hist1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;
    dataClassifyM();
    if (checkNumeric == false) return;
    Histogram = true;
    chart.selectAll("*").remove();
//    enableHist();
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    nint = 7;
    xstep = (tstat[7] - tstat[3]) / nint; // (전체 최대 - 최소) / 인터발수	: 양쪽 그래프 buffer
    gxminH = tstat[3] - xstep;
    var para = drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
    document.getElementById("sub7").style.display = "block"; //히스토그램 선택사항 표시
    gxmaxH = para.a;
    gyminH = para.b;
    gymaxH = para.c;
})
// 히스토그램 평균표시
d3.select("#HistMean").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistMean = true;
        showHistMean(ngroup, avg, gxminH, gxmaxH);
    } else {
        checkHistMean = false;
        removeHistMean();
    }
})
// 히스토그램 Y축 도수 or % 표시
var checkFreqPercentY = true;
var checkDensity = false
var a = document.myFormH.typeH;
a[0].onclick = function() { 
    checkFreqPercentY = true;  
    checkDensity = false;
    drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
}  
a[1].onclick = function() { 
    checkFreqPercentY = false; 
    checkDensity = false;
    drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
} 
a[2].onclick = function() { 
    checkFreqPercentY = false; 
    checkDensity = true;
    drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
} 
// 히스토그램 도수 또는 % 표시
d3.select("#HistFreq").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistFreq = true;
        showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH);
    } else {
        checkHistFreq = false;
        removeHistFreq();
    }
})
// 히스토그램 꺽은선그래프 표시
d3.select("#HistLine").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistLine = true;
        showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH);
    } else {
        checkHistLine = false;
        removeHistLine()
    }
})
// 히스토그램 도수분포표 표시
d3.select("#HistTable").on("click", function() {;
    if (Histogram == false) return;
    showHistTable(ngroup, nvalueH, freq, dataValueH, dvarName, gvarName, gvalueLabel)
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 새 구간으로 히스토그램 업데이트
d3.select("#HistRedraw").on("click", function() {
    if (Histogram == false) return;
//    chart.selectAll("*").remove(); // 전화면 제거
    var start = parseFloat(d3.select("#HistInit").node().value); // 시작값
    xstep = parseFloat(d3.select("#HistStep").node().value); // 구간너비
    if (start > tstat[3]) start = tstat[3];
    if (xstep <= 0) xstep = (tstat[7] - tstat[3]) / nint;
    gxminH = start - xstep;
    var para = drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
    gxmaxH = para.a;
    gyminH = para.b;
    gymaxH = para.c;
    if (checkHistMean) showHistMean(ngroup, avg, gxminH, gxmaxH); // 평균 표시
    if (checkHistFreq) showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH); // 도수 표시
    if (checkHistLine) showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH); // 꺽은선 표시
})
// 상자그래프 : 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#box1").on("click", function() {
    graphNum = 16;
    buttonColorChange();
    document.getElementById("box1").style.backgroundColor = buttonColorH;
    document.getElementById("box1").style.width  = iconH1;
    document.getElementById("box1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    BoxGraph = true;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    chart.selectAll("*").remove();
    //	  chart.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top/2).text(title);
    drawBoxGraphH(ngroup, gvalueLabel, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, tstat);
    document.getElementById("sub52").style.display = "block"; //상자그래프 선택사항
    rad52[0].click(); // 상자그래프 수평형 선택
})
// 상자그래프 수평/수직형 선택 버튼
var rad52 = document.myForm52.type2;
rad52[0].onclick = function() { // 수평형
    chart.selectAll("*").remove(); // 전화면 제거
    drawBoxGraphH(ngroup, gvalueLabel, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, tstat);
}
rad52[1].onclick = function() { // 수직형
    chart.selectAll("*").remove(); // 전화면 제거
    drawBoxGraphV(ngroup, gvalueLabel, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, tstat);
}
// 상자그래프 기초통계량 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#statBox").on("click", function() {
    statTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, varnm1, stdn, varn, mini, Q1, median, Q3, maxi, tstat);
})
// 줄기잎그래프 : 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#stem1").on("click", function() {
    graphNum = 17;
    buttonColorChange();
    document.getElementById("stem1").style.backgroundColor = buttonColorH;
    document.getElementById("stem1").style.width  = iconH1;
    document.getElementById("stem1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    StemLeaf = true;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    chart.selectAll("*").remove();
    drawStemLeaf(ngroup, nobs, dataSet, tstat, graphWidth, buffer);
})
// 양쪽형 줄기와 잎 그림 버튼 클릭
d3.select("#bothstem2").on("click", function() {
    graphNum = 18;
    buttonColorChange();
    document.getElementById("bothstem2").style.backgroundColor = buttonColorH;
    document.getElementById("bothstem2").style.width  = iconH2;
    document.getElementById("bothstem2").style.height = iconH2;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (ngroup != 2) {
        alert(alertMsg[36][langNum]);
        return;
    }
    if (checkNumeric == false) return;
    StemBoth = true;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    chart.selectAll("*").remove();
    drawStemLeafBoth(ngroup, nobs, dataSet, tstat, graphWidth, buffer);
})
// 기초통계량 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#statTable").on("click", function() {
    graphNum = 23;
    buttonColorChange();
    document.getElementById("statTable").style.backgroundColor = buttonColorH;
    document.getElementById("statTable").style.width  = iconH1;
    document.getElementById("statTable").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[81][langNum]+")";
    // check numVar   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    if (numVar <= 2) {
      dataClassifyM();
      if (rawData == false) return;
      if (checkNumeric == false) return;
      StatTable = true;
      TotalStat(dobs, dvar, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
      statTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, varnm1, stdn, varn, mini, Q1, median, Q3, maxi, tstat);
    }
    else if (numVar == 3) {
      dataClassifyANOVA2();
      if (checkNumeric == false) return;
      TotalStat(dobs, dvar, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
      stat2Table(ngroup, ngroup2, dvarName, gvarName, gvalueLabel, gvarName2, gvalueLabel2);
    }
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 산점도 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#scatter1").on("click", function() {
    graphNum = 20;
    buttonColorChange();
    document.getElementById("scatter1").style.backgroundColor = buttonColorH;
    document.getElementById("scatter1").style.width  = iconH1;
    document.getElementById("scatter1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStrU[83][langNum]; // Y변량
    document.getElementById("groupVar").innerHTML    = svgStrU[82][langNum]; // X변량
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar   
    if (numVar < 2) return;
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    gvarNumber = parseInt(document.getElementById("groupSelect").value); 
    wvarNumber = parseInt(document.getElementById("sizeSelect").value);
    dataClassifyS();
    if (checkNumeric == false) return;
    document.getElementById("regress").checked = false;
    document.getElementById("regress").disabled = false;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    Scatter = true;
    document.getElementById("sub6").style.display = "block"; //회귀선 표시
    if (ngroup > 10) document.getElementById("regress").disabled = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
      if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;        
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
})
// 산점도 회귀선 그리기
d3.select("#regress").on("click", function() {
    if (Scatter == false) return;
    if (this.checked) {
        showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    } else {
        removeRegression();
    }
})
// 산점도 Redraw
d3.select("#scatterRedraw").on("click", function() {
    graphNum = 21;
    gvarNumber = parseInt(document.getElementById("groupSelect").value) - 1; 
    wvarNumber = parseInt(document.getElementById("sizeSelect").value) - 1;
    dataClassifyS();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    document.getElementById("regress").checked = false;
    document.getElementById("regress").disabled = false;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    if (ngroup > 10) document.getElementById("regress").disabled = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;        
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
})
// GIS 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#gis").on("click", function() {
    buttonColorChange();
    document.getElementById("gis").style.backgroundColor = buttonColorH;
    dataClassifyGIS();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    drawGIS(gobs,gdata,xdata,ydata,wdata)    
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
       var projection = d3.geoMercator()
          .center([126.9895, 37.5651])
          .scale(120000)
          .translate([svgWidth/2, svgHeight/2]);

	datasheet.selectRows($(this).data('sheetrowid'));
        k = $(this).data('sheetrowid');
        str = gdata[k];
        chart.append("circle")
   	     .attr("data-sheetrowid", k)
             .attr("class","datapoint")
             .attr("stroke","black")
             .style("fill",gcolor[k])     
             .attr("cx", function(d) { return projection([xdata[k], ydata[k]])[0]; })
             .attr("cy", function(d) { return projection([xdata[k], ydata[k]])[1]; })
             .attr("r", wdata[k]*2)
             .append("title")
             .text(str)
    })
})


// 모평균 가설검정
d3.select("#testM1").on("click", function() {
    graphNum = 25;
    buttonColorChange();
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    document.getElementById("testM1").style.width  = iconH1;
    document.getElementById("testM1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[85][langNum]+")";
    document.getElementById("groupSelectMain").disabled = true;
    // check numVar > 1   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    THmean1 = true;
    document.myForm82.type3.value = 1;
    confidence = 0.95;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    if (dobs <= 200) {
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);  
      showDotMean(ngroup, nobs, avg, stdnm1, tstat);
      showDotStd(ngroup, nobs, avg, stdnm1, tstat);
    }
    else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    document.getElementById("sub8").style.display = "block"; //가설검정 선택사항표시
    if (dobs > 200)  document.getElementById("DotMu1").disabled = true;
})
// 모평균 가설검정 실행
d3.select("#executeTH8").on("click", function() {
    graphNum = 26;
    // input value mu0
    mu = parseFloat(d3.select("#mu8").node().value);
    if (isNaN(mu)) {
        alert(alertMsg[38][langNum]);
        return;
    }
    chart.selectAll("*").remove();
    THmean1 = true;
    hypoType = 1;
    // 대립가설 Type
    if (document.myForm80.type0.value == "1")      h1Type = 1;
    else if (document.myForm80.type0.value == "2") h1Type = 2;
    else if (document.myForm80.type0.value == "3") h1Type = 3;
    // Test Type 1: t-test 2: Z-test
    if (document.myForm81.type1.value == "2")      {testType = 2}
    else if (document.myForm81.type1.value == "1") {testType = 1}
    // alpha
    alpha = parseFloat(d3.select("#alpha8").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha8").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha8").value = alpha;
    }
    // confidence
    if (document.myForm82.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    // Test Statistics Calculation
    nn = tstat[0];
    df = nn - 1;
    xbar = tstat[1];
    stdev = tstat[2];
    if (testType == 1) {
        stdev = parseFloat(d3.select("#std8").node().value);
        if (stdev == 0. || isNaN(stdev)) {
            alert(alertMsg[39][langNum]);
            return;
        }
    }
    // confidence interval
    if (testType == 1) temp = stdnormal_inv(1 - mconfidence / 2, info) * stdev / Math.sqrt(nn);
    else temp = t_inv(1 - mconfidence / 2, df, info) * stdev / Math.sqrt(nn);
    left = xbar - temp;
    right = xbar + temp;
    // test statistics
    teststat = (xbar - mu) / (stdev / Math.sqrt(nn));
    statT[0] = mu; // 초기 mu
    statT[1] = stdev; // Z test 경우 sigma
    statT[2] = alpha;
    statT[3] = nn;
    statT[4] = xbar;
    statT[5] = tstat[2];

    chart.selectAll("*").remove();
    if (isNaN(mu) || isNaN(nn) || isNaN(xbar) || isNaN(stdev) || nn < 2 || stdev <= 0) { // wrong input
        chart.append("text").attr("class", "mean")
            .attr("x", 150)
            .attr("y", 100)
            .text("No input or wrong input !!	 Try again.")
            .style("stroke", "red")
    } else if (testType == 1) { // Z-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = stdnormal_inv(h, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * stdnormal_cdf(teststat);
            else pvalue = 2 * (1 - stdnormal_cdf(teststat));
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            f = -5
            g = stdnormal_inv(1 - h, info);
            pvalue = 1 - stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        } else {
            h = alpha;
            f = stdnormal_inv(h, info);
            g = 5;
            pvalue = stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        }
    } else { // t-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = t_inv(h, df, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            f = -5; //t_inv(0.0001, df, info);
            g = t_inv(1 - h, df, info);
            pvalue = 1 - t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            f = t_inv(h, df, info);
            g = 5; //t_inv(0.9999, df, info);
            pvalue = t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        }
    }
    statT[9]  = teststat;
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[12] = testType;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
    // 모수적 검정결과표
    statTableMu(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 윌콕슨 부호순위 가설검정 실행
d3.select("#executeTH8NP").on("click", function() {
    graphNum = 25;
    // input value mu0
    mu = parseFloat(d3.select("#mu8").node().value);
    if (isNaN(mu)) {
        alert(alertMsg[38][langNum]);
        return;
    }
    chart.selectAll("*").remove();
    hypoType = 95;
    // 대립가설 Type
    if (document.myForm80.type0.value == "1")      h1Type = 1;
    else if (document.myForm80.type0.value == "2") h1Type = 2;
    else if (document.myForm80.type0.value == "3") h1Type = 3;
    // alpha
    alpha = parseFloat(d3.select("#alpha8").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha8").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha8").value = alpha;
    }
    // confidence
    if (document.myForm82.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    var ngroupNP = 2;
    var ranksum   = new Array(5);
    var dataValue = new Array(rowMax);
    var dvalueP   = new Array(rowMax);
    var w = [];
    var x = [];
    var y = [];
    var z = [];
    var checkData = true;
    var T, mean, std, info;

    for (i = 0; i < dobs; i++) w[i] = dvar[i];
    nobs[1] = 0;
    nobs[2] = 0;
    for (i=0; i<w.length; i++) {
    if (w[i] < mu) {
          x[nobs[1]] = Math.abs(w[i]-mu); 
          nobs[1]++;
    }
    else if (w[i] > mu) {
          y[nobs[2]] = Math.abs(w[i] - mu);
          nobs[2]++;
        }
    }
    nobs[0] = nobs[1] + nobs[2]; 
    z = x.concat(y);        
    // Calculate signed rank sum
    T = statRankSum(ngroupNP, nobs, z, ranksum);
    // check exact or approximation
    if (nobs[0] < 21) { // Wilcoxon Signed Rank Test
        // Wilcoxon Rank Sum Distribution
        var checkRankSum = false;
        nvalue = rankSumDist(0, nobs[0], dataValue, dvalueP, checkRankSum);
        // draw graph
        var title  = svgStrU[68][langNum]; // "Wilcoxon Rank Sum Test" 
        var sub1 = "H\u2080: M = M\u2080  " + " , H\u2081: M "+ symbol[h1Type-1] + " M\u2080" ;
        var sub2 = svgStrU[23][langNum]+ " (R+) ~ Wilcoxson Sign (n = "+nobs[0]+") "+svgStrU[24][langNum];
        drawSignedRankGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, ranksum[2], alpha, h1Type, statT) 
    }
    else {  // Z-test
        mean  = nobs[0]*(nobs[0]+1)/4;
        std   = Math.sqrt( (nobs[0]*(nobs[0]+1)*(2*nobs[0]+1) - 0.5*T) / 24 ); 
        teststat = ranksum[2];
        zobs = (ranksum[2] - mean) / std;
        
        if (h1Type == 1) {
            h = alpha / 2;  
            f = mean + stdnormal_inv(h, info)*std;
            g = mean + stdnormal_inv(1-h, info)*std;
            if (zobs < 0) pvalue = 2 * stdnormal_cdf(zobs);
            else  pvalue = 2 * (1 - stdnormal_cdf(zobs));
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = mean - 5*std
            g = mean + stdnormal_inv(1-h, info)*std;
            pvalue = 1 - stdnormal_cdf(zobs);
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
        else {
            h = alpha;  
            f = mean + stdnormal_inv(h, info)*std;
            g = mean + 5*std;
            pvalue = stdnormal_cdf(zobs);
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
    }  
    statT[0] = mu; // 초기 mu
    statT[9]  = ranksum[2];
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
    // 윌콕슨 부호순위검정 결과표
    statTableMuNP(ngroupNP, dvarName, statT);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})

// 평균점그래프 
d3.select("#DotMu1").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, stdnm1, tstat);
    showDotStd(ngroup, nobs, avg, stdnm1, tstat);
})
// 확률 히스토그램 
d3.select("#HistNormal").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
})
// 정규성 카이제곱검정 
d3.select("#HistChisq").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    showHistNormalTable(nobs, avg, stdnm1, nvalueH, freq, dataValueH, dvarName);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 정규성 Q-Q Plot 
d3.select("#HistNormalQQ").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    for (i=0; i<nobs[0]; i++) tdata[i] = dataSet[0][i];
    drawHistQQ(nobs[0], tdata, dvarName,0)
})

// 모분산 가설검정
d3.select("#testS1").on("click", function() {
    graphNum = 27;
    buttonColorChange();
    document.getElementById("testS1").style.backgroundColor = buttonColorH;
    document.getElementById("testS1").style.width  = iconH1;
    document.getElementById("testS1").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량 
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹 // 그룹
    document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[85][langNum]+")";
    document.getElementById("groupSelectMain").disabled = true;
    // check numVar > 1   
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    THsigma1 = true;
    document.myForm92.type3.value = 1;
    confidence = 0.95;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    if (dobs <= 200) {
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);  
      showDotMean(ngroup, nobs, avg, stdnm1, tstat);
      showDotStd3(ngroup, nobs, avg, stdnm1, tstat);
    }
    else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    document.getElementById("sub9").style.display = "block"; //가설검정 선택사항표시
    if (dobs > 200)  document.getElementById("DotSigma1").disabled = true;
})

// 모분산 가설검정 실행
d3.select("#executeTH9").on("click", function() {
    graphNum = 28;
    // input value sigma0
    vari = parseFloat(d3.select("#vari9").node().value);
    if (isNaN(vari)) {
        alert(alertMsg[40][langNum]);
        return;
    }
    chart.selectAll("*").remove();
    THsigma1 = true;
    testType =1
    hypoType = 2;
    // 대립가설 Type
    if (document.myForm90.type0.value == "1")      h1Type = 1;
    else if (document.myForm90.type0.value == "2") h1Type = 2;
    else if (document.myForm90.type0.value == "3") h1Type = 3;
    // alpha
    alpha = parseFloat(d3.select("#alpha9").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha9").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha9").value = alpha;
    }
    // confidence
    if (document.myForm92.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    // confidence interval
    h = alpha / 2;
    nn = tstat[0];
    df = nn - 1;
    stdev = tstat[2];
    variS  = stdev * stdev
    left = df * variS / chisq_inv(1 - mconfidence/2, df, info)
    right = df * variS / chisq_inv(mconfidence/2, df, info)
    // test statistics
    teststat = df * variS / vari;
    statT[0] = vari; // 초기 variance
    statT[2] = alpha;
    statT[3] = tstat[0]; // nn
    statT[4] = tstat[1]; // xbar
    statT[5] = tstat[2]; // stdev
    statT[6] = left;
    statT[7] = right;
    chart.selectAll("*").remove();
    df = statT[3] - 1;
    if (isNaN(vari) || isNaN(nn) || isNaN(variS) || vari <= 0 || nn < 2 || variS <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // chisq-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = chisq_inv(h, df, info);
            g = chisq_inv(1 - h, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            if (pvalue > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (df < 10) f = 0;
            else f = chisq_inv(0.0001, df, info);
            g = chisq_inv(1 - h, df, info);
            pvalue = 1 - chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            f = chisq_inv(h, df, info);
            if (df < 5) g = 12;
            else if (df < 10) g = 30;
            else g = chisq_inv(0.9999, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        }
    }
    statT[9]  = teststat;
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[12] = testType;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
    // 분산 검정결과표 그리기
    statTableSigma(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight)
})
// 평균점그래프 
d3.select("#DotSigma1").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, stdnm1, tstat);
    showDotStd3(ngroup, nobs, avg, stdnm1, tstat);
})
// 분산 검정결과표 그리기
d3.select("#executeTH9Table").on("click", function() {
    // confidence
    if (document.myForm92.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    statTableSigma(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
})
// 정규성 카이제곱검정 
d3.select("#HistChisqS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    showHistNormalTable(nobs, avg, stdnm1, nvalueH, freq, dataValueH, dvarName);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 정규성 Q-Q Plot 
d3.select("#HistNormalQQS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    for (i=0; i<nobs[0]; i++) tdata[i] = dataSet[0][i];
    drawHistQQ(nobs[0], tdata, dvarName,0)
})

// 두 모평균 가설검정
d3.select("#testM12").on("click", function() {
    graphNum = 29;
    buttonColorChange();
    document.getElementById("testM12").style.backgroundColor = buttonColorH;
    document.getElementById("testM12").style.width  = iconH1;
    document.getElementById("testM12").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량 
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "(or "+svgStrU[95][langNum]+")";
    document.getElementById("executeTH10NP").disabled = false;
    // check numVar <= 1 && numVar > 2    
    if (numVar <= 1) return;
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  

    dataClassifyM12();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    THmean12 = true;
    document.myForm102.type3.value = 1;
    confidence = 0.95;
    if (checkPairedT == false) {
      TotalStat(dobs, dvar, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
      if (dobs <= 200) {
        drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);  
        showDotMean(ngroup, nobs, avg, stdnm1, tstat);
        showDotStd(ngroup, nobs, avg, stdnm1, tstat);
      }
      else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    }
    else {  // paired t-test 
      document.getElementById("executeTH10NP").disabled = true;
      TotalStat(dobs, tdata, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
      str = "d = ("+tdvarName[0] + " - " + tdvarName[1]+")";
      if (dobs <= 200) {
        drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, str);
        showDotMean(ngroup, nobs, avg, stdnm1, tstat);
        showDotStd(ngroup, nobs, avg, stdnm1, tstat);
      }
      else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);      
    } 
    document.getElementById("sub10").style.display = "block"; //가설검정 선택사항표시 
    if (dobs > 200)  document.getElementById("DotMu12").disabled = true;
})
// 가설검정 Mu 12 재실행
d3.select("#executeTH10").on("click", function() {
    graphNum = 30;
    // mu0 입력
    mu = parseFloat(d3.select("#mu10").node().value);
    // 대립가설
    if (document.myForm100.type0.value == "1")      h1Type = 1;
    else if (document.myForm100.type0.value == "2") h1Type = 2;
    else if (document.myForm100.type0.value == "3") h1Type = 3;
    // 분산 가정 1: same variance 2: diff variance
    if (document.myForm101.type1.value == "1")      {testType = 1; hypoType = 41}
    else if (document.myForm101.type1.value == "2") {testType = 2; hypoType = 42}
    // alpha
    alpha = parseFloat(d3.select("#alpha10").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha10").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha10").value = alpha;
    }
    // confidence
    if (document.myForm102.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    chart.selectAll("*").remove();
  if (checkPairedT == false) { // independent T-test
    nn1 = nobs[0];
    xbar1 = avg[0];
    var1 = stdnm1[0] * stdnm1[0];
    nn2 = nobs[1];
    xbar2 = avg[1];
    var2 = stdnm1[1] * stdnm1[1];
    // test statistics
    df = nn1 + nn2 - 2;
    df1 = nn1 - 1;
    df2 = nn2 - 1;
    varPooled = (df1 * var1 + df2 * var2) / df;
    t1 = var1 / nn1;
    t2 = var2 / nn2;
    varAdd = t1 + t2;
    df3 = varAdd * varAdd / ((t1*t1/df1) + (t2*t2/df2));
    if (testType == 1) { // 등분산
      temp = Math.sqrt(varPooled / nn1 + varPooled / nn2)
      teststat = (xbar1 - xbar2 - mu) / temp;
      left  = (xbar1 - xbar2) + mu + temp*t_inv(mconfidence/2, df, info);
      right = (xbar1 - xbar2) + mu + temp*t_inv(1-(mconfidence/2), df, info);
    }
    else { // 이분산
      temp = Math.sqrt(varAdd)
      teststat = (xbar1 - xbar2 - mu) / temp;
      left  = (xbar1 - xbar2) + mu + temp*t_inv(mconfidence/2, df3, info);
      right = (xbar1 - xbar2) + mu + temp*t_inv(1-(mconfidence/2), df3, info);
    }
    statT[0] = mu; // 초기 D
    if (testType == 1) statT[1] = Math.sqrt(varPooled / nn1 + varPooled / nn2);
    else statT[1] = Math.sqrt(varAdd);
    statT[2] = alpha;
    statT[3] = nn1;
    statT[4] = xbar1;
    statT[5] = stdnm1[0];
    statT[6] = nn2;
    statT[7] = xbar2;
    statT[8] = stdnm1[1];
    if (isNaN(nn1) || isNaN(nn2) || isNaN(xbar1) || isNaN(xbar2) || isNaN(var1) || isNaN(var2) ||
        nn1 < 2 || nn2 < 2 || var1 <= 0 || var2 <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // t-test
        if (h1Type == 1) {
            h = alpha / 2;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = -f;
                if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
                else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            } else if (testType == 2) {
                f = t_inv(h, df3, info);
                g = -f;
                if (teststat < 0) pvalue = 2 * t_cdf(teststat, df3, info);
                else pvalue = 2 * (1 - t_cdf(teststat, df3, info));
/*
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = -f;
                if (teststat < 0) pvalue = 2 * (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
                else pvalue = 2 * (1 - (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (testType == 1) {
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = t_inv(0.0001, df3, info);
                g = t_inv(1 - h, df3, info);
                pvalue = 1 - t_cdf(teststat, df3, info);
/*
                f = t_inv(0.0001, df, info);
                g = (t1 * t_inv(1 - h, df1, info) + t2 * t_inv(1 - h, df2, info)) / varAdd;
                pvalue = 1 - ((t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = t_inv(h, df3, info);
                g = t_inv(0.9999, df3, info);
                pvalue = t_cdf(teststat, df3, info);
/*
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = t_inv(0.9999, df, info);
                pvalue = (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);        }
    }
    statT[9]  = teststat;
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[12] = testType;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
  } 
  else {// Paired T-test
      hypoType = 43;
      df = dobs - 1;
      teststat = (tstat[1] - mu) / (tstat[2] / Math.sqrt(dobs));
      temp  = t_inv(1 - mconfidence / 2, df, info) * tstat[2] / Math.sqrt(tstat[0]);
      left  = tstat[1] - temp;
      right = tstat[1] + temp;
      statT[0] = mu; // 초기 D
      statT[2] = alpha;
      statT[3] = tstat[0];
      statT[4] = tstat[1];
      statT[5] = tstat[2];
      statT[6] = left;
      statT[7] = right;

      if (h1Type == 1) {
            h = alpha / 2;
            f = t_inv(h, df, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      } else if (h1Type == 2) {
            h = alpha;
            f = -5; //t_inv(0.0001, df, info);
            g = t_inv(1 - h, df, info);
            pvalue = 1 - t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      } else {
            h = alpha;
            f = t_inv(h, df, info);
            g = 5; //t_inv(0.9999, df, info);
            pvalue = t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      }
    statT[9]  = teststat;
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[12] = testType;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
  }
  // 두모평균 검정결과표 그리기
    statTableMu12(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);

})
// 그룹별 평균점그래프 
d3.select("#DotMu12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, stdnm1, tstat);
    showDotStd(ngroup, nobs, avg, stdnm1, tstat);
})
// 확률 히스토그램 
d3.select("#HistNormalMu12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
})
// 윌콕슨 순위합 가설검정 실행
d3.select("#executeTH10NP").on("click", function() {
    graphNum = 29;
    // input value mu0
    mu = parseFloat(d3.select("#mu10").node().value);
    chart.selectAll("*").remove();
    hypoType = 96;
    // 대립가설 Type
    if (document.myForm100.type0.value == "1")      h1Type = 1;
    else if (document.myForm100.type0.value == "2") h1Type = 2;
    else if (document.myForm100.type0.value == "3") h1Type = 3;
    // alpha
    alpha = parseFloat(d3.select("#alpha10").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha10").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha10").value = alpha;
    }
    // confidence
    if (document.myForm102.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    var ranksum   = new Array(5);
    var dataValue = new Array(rowMax);
    var dvalueP   = new Array(rowMax);
    var x = [];
    var y = [];
    var z = [];
    var checkData = true;
    var checkRankSum = true;  // rank sum인 경우 true, signed rank sum인 경우 false
    var T, mean, std, zobs, info;
    var nn1 = nobs[0];
    var nn2 = nobs[1];
    var tobs = new Array(3);
    tobs[0] = dobs;
    tobs[1] = nobs[0];
    tobs[2] = nobs[1];

    for (i = 0; i < nn1; i++) x[i] = dataSet[0][i];
    for (i = 0; i < nn2; i++) y[i] = dataSet[1][i];
    z = x.concat(y);        
    // Calculate rank sum
    T = statRankSum(ngroup, tobs, z, ranksum);
    // check exact or approximation
    if (dobs < 25) { // exact distribution
        // Wilcoxon Rank Sum Distribution
        nvalue = rankSumDist(nn1, nn2, dataValue, dvalueP, checkRankSum);
        // draw graph
        var title= svgStrU[63][langNum] ;
        var sub1 = "H\u2080: M\u2081 = M\u2082  " + " , H\u2081: M\u2081 "+ symbol[h1Type-1] + " M\u2082" ;
        var sub2 = svgStrU[23][langNum]+" R\u2082 ~ Wilcoxson (n\u2081 = "+nn1+", n\u2082 = "+nn2+") "+svgStrU[24][langNum];
        drawBarGraphNP(title, sub1, sub2, nvalue, dataValue, dvalueP, ranksum[2], alpha, h1Type, statT) 
    }
    else {  // Z-test
        if (checkData == false) return;
        mean     = nn2*(dobs+1)/2;
        std      = Math.sqrt(nn1*nn2*(dobs+1 - T/(dobs*(dobs+1)) ) / 12); 
        teststat = ranksum[2];
        zobs     = (ranksum[2] - mean) / std;
        
        if (h1Type == 1) {
            h = alpha / 2;  
            f = mean + stdnormal_inv(h, info)*std;
            g = mean + stdnormal_inv(1-h, info)*std;
            if (zobs < 0) pvalue = 2 * stdnormal_cdf(zobs);
            else  pvalue = 2 * (1 - stdnormal_cdf(zobs));
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = mean - 5*std
            g = mean + stdnormal_inv(1-h, info)*std;
            pvalue = 1 - stdnormal_cdf(zobs);
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
        else {
            h = alpha;  
            f = mean + stdnormal_inv(h, info)*std;
            g = mean + 5*std;
            pvalue = stdnormal_cdf(zobs);
            drawNormalGraphTHNP(hypoType, h1Type, teststat, mean, std, f, g, h, pvalue, mu);
        }
    }  

    statT[0]  = mu;
    statT[9]  = ranksum[2];
    statT[10] = pvalue;
    statT[11] = h1Type;
    statT[13] = hypoType;
    statT[14] = left;
    statT[15] = right;
    // 윌콕슨 순위합검정 결과표
    statTableMu12NP(ngroup, dvarName, statT);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})

// 두 모분산 가설검정
d3.select("#testS12").on("click", function() {
    graphNum = 31;
    buttonColorChange();
    document.getElementById("testS12").style.backgroundColor = buttonColorH;
    document.getElementById("testS12").style.width  = iconH1;
    document.getElementById("testS12").style.height = iconH1;
    document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
    document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
    document.getElementById("groupVarMsg").innerHTML = "";
    // check numVar <= 1 && numVar > 2    
    if (numVar <= 1) return;
    validateNumVar(graphNum, numVar);
    if (checkNumVar == false) return;  
    dataClassifyM();
    if (checkNumeric == false) return;
    chart.selectAll("*").remove();
    THsigma12 = true;
    document.myForm112.type3.value = 1;
    confidence = 0.95;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    if (dobs <= 200) {
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);  
      showDotMean(ngroup, nobs, avg, stdnm1, tstat);
      showDotStd3(ngroup, nobs, avg, stdnm1, tstat);
    }
    else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    document.getElementById("sub11").style.display = "block"; //가설검정 선택사항표시
    if (dobs > 200)  document.getElementById("DotSigma12").disabled = true;
})
// 두 모분산 가설검정 실행
d3.select("#executeTH11").on("click", function() {
    graphNum = 32;
    hypoType = 5;

    // 대립가설
    if (document.myForm110.type0.value == "1")      h1Type = 1;  // 양측
    else if (document.myForm110.type0.value == "2") h1Type = 2;  // 우측
    else if (document.myForm110.type0.value == "3") h1Type = 3;  // 좌측
    // alpha
    alpha = parseFloat(d3.select("#alpha11").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha11").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha11").value = alpha;
    }
    // confidence
    if (document.myForm112.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var mconfidence = 1 - confidence;
    nn1 = nobs[0];
    nn2 = nobs[1];
    df1 = nn1 - 1;
    df2 = nn2 - 1;
    var1 = stdnm1[0] * stdnm1[0];
    var2 = stdnm1[1] * stdnm1[1];
    // test statistics
    teststat = var1 / var2;
    left  = teststat / f_inv(1-(mconfidence/2), df1, df2, info);
    right = teststat / f_inv(mconfidence/2, df1, df2, info);
    statF[0] = teststat;
    statF[2] = alpha;
    statF[3] = nobs[0]; // nn1
    statF[4] = avg[0]; // xbar1
    statF[5] = stdnm1[0]; // std1
    statF[6] = nobs[1]; // nn2
    statF[7] = avg[1]; // xbar2
    statF[8] = stdnm1[1]; // std2
    chart.selectAll("*").remove();
    if (isNaN(nn1) || isNaN(nn2) || isNaN(var1) || isNaN(var2) ||
        nn1 < 2 || nn2 < 2 || var1 <= 0 || var2 <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // F-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = f_inv(h, df1, df2, info);
            g = f_inv(1 - h, df1, df2, info);
            pvalue = f_cdf(teststat, df1, df2, info);
            if (teststat > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            if (pvalue > 1.0) pvalue = 1.0;
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, stdnm1);
        } else if (h1Type == 2) {
            h = alpha;
            f = 0;
            g = f_inv(1 - h, df1, df2, info);
            pvalue = 1 - f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, stdnm1);
        } else {
            h = alpha;
            f = f_inv(h, df1, df2, info);
            g = 10;
            pvalue = f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, stdnm1);
        }
    }
    statF[9]  = teststat;
    statF[10] = pvalue;
    statF[11] = h1Type;
    statF[13] = hypoType;
    statF[14] = left;
    statF[15] = right;
    // 두그룹 분산 검정결과표 그리기
    statTableSigma12(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 그룹별 평균점그래프 
d3.select("#DotSigma12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, stdnm1, tstat);
    showDotStd3(ngroup, nobs, avg, stdnm1, tstat);
})
// 두그룹 분산 검정결과표 그리기
d3.select("#executeTH11Table").on("click", function() {
    // confidence
    if (document.myForm112.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    statTableSigma12(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalSigma12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
})
// 분산분석
d3.select("#anova").on("click", function() {
  graphNum = 33;
  buttonColorChange();
  document.getElementById("anova").style.backgroundColor = buttonColorH;
  document.getElementById("anova").style.width  = iconH1;
  document.getElementById("anova").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVar").innerHTML    = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[81][langNum]+")";
  // check numVar <= 1 && numVar > 3    
  if (numVar <= 1) return;
  validateNumVar(graphNum, numVar);
  if (checkNumVar == false) return;  
  chart.selectAll("*").remove();
  document.myForm122.type3.value = 1;
  confidence = 0.95;
  if (numVar == 2) { // 1원 분산분석
    dataClassifyM();
    if (checkNumeric == false) return;
    if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
    }
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    if (dobs <= 200) {
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);  
      showDotMean(ngroup, nobs, avg, stdnm1, tstat);
      showDotStd(ngroup, nobs, avg, stdnm1, tstat);
    }
    else drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
    anovaStat(ngroup,gobs,nobs,avg,stdnm1,statF,gvar,dvar,yhat,residual);
    document.getElementById("sub12").style.display = "block"; // ANOVA 선택사항표시
    if (dobs > 200)  document.getElementById("DotANOVA").disabled = true;
  }
  else { // 2원 분산분석
    dataClassifyANOVA2();
    if (checkNumeric == false) return;
    if (checkDataRBD == false) {
      variableSelectClear();
      return;
    }
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    chart.selectAll("*").remove();
    drawDotGraph3(ngroup, ngroup2, gvalueLabel, gvalueLabel2, dvarName, nobs, avg, stdnm1, gvar, gvar2, dvar, tstat);
    showDotStd4(ngroup, ngroup2, graphWidth, graphHeight);
//    if (!checkRBD) showDotStd4(ngroup, ngroup2, graphWidth, graphHeight);
    document.getElementById("sub15").style.display = "block"; // ANOVA2 선택사항표시
  }
})
// 1원분산분석 실행
d3.select("#executeTH12").on("click", function() {
    graphNum = 34;
    chart.selectAll("*").remove();
    // siginificancelevel
    alpha = parseFloat(d3.select("#alpha12").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha12").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha12").value = alpha;
    }
    // confidence
    if (document.myForm122.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;

    hypoType = 7;
    h1Type = 2;
    df1 = statF[6];
    df2 = statF[7];
    pvalue = statF[9]
    h = alpha;
    f = 0;
    g = f_inv(1 - h, df1, df2, info);
    drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, stdnm1);
    // 1원분산분석표 그리기
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    AnovaTable(gvarName,dvarName,nobs,avg,stdnm1,statF);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
    graphNum = 33;
})
// 1원분산분석 다중비교 실행
d3.select("#multipleComparison1").on("click", function() {
    // siginificancelevel
    alpha = parseFloat(d3.select("#alpha12").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha12").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha12").value = alpha;
    }
    // confidence
    if (document.myForm122.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    // LSD=1 or HSD5%=2 or HSD1%=3
    if (document.myForm123.type4.value == "1") comparison = 1;
    else if (document.myForm123.type4.value == "2") comparison = 2;
    else comparison = 3;
    // 1원분산분석표 그리기
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, stdnm1, mini, Q1, median, Q3, maxi, tstat);
    if (comparison == 1) multipleComparisonTableLSD(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg);
    else if (comparison == 2) {alpha=0.05; multipleComparisonTableHSD(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg);}
    else {alpha=0.01; multipleComparisonTableHSD(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg)};
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})

// Kruskal-Wallis 1원분산분석 실행
d3.select("#executeTH12NP").on("click", function() {
    graphNum = 34;
    chart.selectAll("*").remove();
    hypoType  = 98;  // 크루스칼검정
    h1Type    = 2;   // 우측검정
    // siginificancelevel
    alpha = parseFloat(d3.select("#alpha12").node().value);
    if (alpha < 0.0001) {
      alpha = 0.0001;
      document.getElementById("alpha12").value = alpha;
    }
    else if (alpha > 0.9999) {
      alpha = 0.9999;
      document.getElementById("alpha12").value = alpha;
    }
    // confidence
    if (document.myForm122.type3.value == "1") confidence = 0.95;
    else confidence = 0.99;
    var T, H, nvalue, mean, std, zobs, df, info, sum, temp ;
    var ranksumT = new Array(ngroup+1);
    var tobs    = new Array(ngroup+1);
    var R       = new Array(rowMax);
    var z = new Array(dobs);
    for (i=0; i<rowMax; i++) {
        dataValue[i] = 0;
        dvalueP[i]   = 0;
    }
    // 데이터 재조정 z에 그룹 순서대로 넣기
    tobs[0] = dobs;
    j = 0;
    for (k=0; k<ngroup; k++) {
      tobs[k+1] = nobs[k];
      for (i = 0; i < nobs[k]; i++) {
        z[j] = dataSet[k][i];
        j++;
      }
    } 
    // Calculate rank sum
    T = statRankSum(ngroup, tobs, z, ranksumT);
    ranksumT[0] = dobs * (dobs+1) / 2;   // 전체 순위합
    // Calculate Kruskal H statitic
    sum = 0;
    for (j=1; j<=ngroup; j++) sum += ranksumT[j]*ranksumT[j]/tobs[j]
    sum = 12*sum/(dobs*(dobs+1)) - 3*(dobs+1);
    H = sum / (1 - T/(dobs*dobs*dobs - dobs) )
    statF[9] = H;
    // check n <= 10 for exact distribution
    if (dobs < 11) {      // KruskalDistribution
        ttobs = 0;
        tnvalue = 0;
        for (i=0; i<dobs; i++) R[i] = i+1;
        // All possible permutation and H statistics
        permKruskal(R, 0, dobs, dobs) ;  
        // Sorting and indexing data in ascending order
        for (i=0; i<tnvalue-1; i++) {
          for (j=i; j<tnvalue; j++) {
            if(dataValue[i] > dataValue[j]) {
                temp         = dataValue[i];  tempi      = dvalueP[i];
                dataValue[i] = dataValue[j];  dvalueP[i] = dvalueP[j];
                dataValue[j] = temp;          dvalueP[j] = tempi;  
            }
          }
        } 
        // rank sum의 distribution 계산
        for (j=0; j<tnvalue; j++) {
          dvalueP[j] = dvalueP[j] / ttobs;
          dataValue[j] = f3(dataValue[j]);
        }
        // draw graph
        var title  = svgStrU[65][langNum] ;
        var sub1, sub2;
        if (ngroup == 2) sub1 = "H\u2080: M\u2081 = M\u2082";
        else if (ngroup == 3) sub1 = "H\u2080: M\u2081 = M\u2082 = M\u2083" ;
        else sub1 = "H\u2080: M\u2081 = M\u2082 = ... = M\u2096" ;
        sub2 = svgStrU[67][langNum];
        drawKruskalBarGraph(title, sub1, sub2, tnvalue, dataValue, dvalueP, H, alpha, h1Type, checkData) 
    }
    else {    // chisq-test
        df = ngroup - 1;
        h = alpha;  
        if (df < 10) f = 0;
        else f = chisq_inv(0.0001, df, info);
        g = chisq_inv(1-h, df, info);
        pvalue = 1 - chisq_cdf(sum, df, info)
        drawChisqGraphTHNP(hypoType, h1Type, H, df, f, g, h, pvalue, temp );
    }  

    statF[10] = pvalue;
    statF[11] = h1Type;
    statF[13] = hypoType;
    statF[14] = left;
    statF[15] = right;
    // 윌콕슨 순위합검정 결과표
    statTableANOVANP(gvarName,dvarName, ranksumT, statF);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})

// 그룹별 평균점그래프 
d3.select("#DotANOVA").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, stdnm1, tstat);
    showDotStd(ngroup, nobs, avg, stdnm1, tstat);
})
// 확률 히스토그램 
d3.select("#HistNormalANOVA").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, stdnm1, dataSet, freq, dvarName);
})
// 1원분산분석 잔차 Plot
d3.select("#anovaResidual").on("click", function() {
    AnovaResidual(ngroup,gobs,yhat,residual)
})
// 1원분산분석 잔차 Q-Q Plot
d3.select("#anovaQQ").on("click", function() {
    drawHistQQ(gobs,residual,svgStr[87][langNum],1)
})
// 2원 그룹별 평균점그래프 
d3.select("#DotANOVA2").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph2(ngroup, ngroup2, gvalueLabel, gvalueLabel2, dvarName, nobs, avg, stdnm1, gvar, gvar2, dvar, tstat);
    if (!checkRBD) showDotStd2(ngroup, ngroup2, graphWidth, graphHeight)
})
// 2원분산분석표 
d3.select("#anova2Table").on("click", function() {
    stat2Table(ngroup, ngroup2, dvarName, gvarName, gvalueLabel, gvarName2, gvalueLabel2);
    Anova2Table(gvarName,dvarName,nobs,avg,stdnm1,statF);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 2원분산분석 다중비교표
d3.select("#multipleComparison2").on("click", function() {
    // 행 요인
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, stdnm1, varnm1, stdn, varn);
    multipleComparisonTable2(ngroup,ngroup2, dvarName,gvarName,gvarName2, gvalueLabel,gvalueLabel2, nobs, avg, cobsTwoWay, cmeanTwoWay);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 2원분산분석 잔차 Plot
d3.select("#anova2Residual").on("click", function() {
    AnovaResidual(ngroup,gobs,yhat,residual)
})
// 2원분산분석 잔차 Q-Q Plot
d3.select("#anova2QQ").on("click", function() {
    for (j=0; j<gobs; j++) tdata[j] = residual[j];
    drawHistQQ(gobs,tdata,svgStr[87][langNum],1)
})
// 회귀분석 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#regression").on("click", function() {
  graphNum = 35;
  buttonColorChange();
  document.getElementById("regression").style.backgroundColor = buttonColorH;
  document.getElementById("regression").style.width  = iconH1;
  document.getElementById("regression").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStrU[83][langNum]; // Y변량
  document.getElementById("groupVar").innerHTML    = svgStrU[82][langNum]; // X변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  // check numVar <= 1 && numVar > 2    
  if (numVar <= 1) return;
  document.getElementById("sub16").style.display = "block"; // 회귀선 옵션 표시
  if (numVar == 2) { // 단순선형회귀
    gvarNumber = 0;
    wvarNumber = 0;
    dataClassifyS();
    if (checkNumeric == false) return;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = false;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    chart.selectAll("*").remove();
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    // missing이 없을때 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)           
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
  } 
  else { // 다중선형회귀
    dataClassifyRegression();
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    document.getElementById("regression").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    tobs = mdobs[0];
    drawScatterMatrix(tdvarName,mdobs,mdvar);
    checkScatterMatrix = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)          
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
  }
  statRegression(numVar, mdobs, mdvar);
  statMultivariate(numVar, mdobs, mdvar);
})

// 회귀신뢰대 그리기
d3.select("#regressBand").on("click", function() {
    if (ngroup > 1) return;
    if (this.checked) {
        showRegressionBand(nobs, alphaR, betaR, xavg, sxx, stderr, scatterS);
    } else {
        removeRegressionBand();
    }
})
// 회귀산점도 그래프 
d3.select("#ScatterRegression").on("click", function() {
  if (numVar == 2) { // 산점도
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = false;
  } 
  else { // 산점도행렬
    chart.selectAll("*").remove();
    drawScatterMatrix(tdvarName,tdobs,tdvar);
    checkScatterMatrix = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5)
    })
  }
})

// 회귀분석표 그리기
d3.select("#regressTable").on("click", function() {
  if (numVar < 3) 
    regressionTable(xvarName,yvarName,nobs,xavg,xstd,yavg,ystd,alphaR,betaR,corr,rsquare,sxx,ssr,sse,stderr);
  else {
    multivariateTable(numVar, tdobs, tdvar);
    regressionTable2(numVar, tdobs, tdvar);
  }
  document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 회귀분석 잔차와 예측값
d3.select("#regressResidual").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    title = svgStr[95][langNum]; // "잔차와 예측값의 산점도"
    xstr  = svgStr[84][langNum]; // "예측값
    regressionResidual(tobs,yhat,stdResidual,title);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 잔차와 지렛값(leverage)
d3.select("#regressResidualLeverage").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    title = svgStr[96][langNum]; // "잔차와 지렛값의 산점도"
    xstr  = svgStr[110][langNum]; // "지렛값
    regressionResidual(tobs,Hii,stdResidual,title);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 Cook's distance
d3.select("#regressCook").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    regressionCook(tobs,Cook);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 잔차 Q-Q Plot
d3.select("#regressQQ").on("click", function() {
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    regressionQQ(tobs,yhat,stdResidual);
})
// Data Mining modules
// bar matrix 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#barMatrix").on("click", function() {
  graphNum = 41;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub21").style.display = "block"; // 옵션 표시
  document.getElementById("barMatrix").style.backgroundColor = buttonColorH;
  document.getElementById("barMatrix").style.width  = iconH1;
  document.getElementById("barMatrix").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  dataClassifyDMbyGroup();
  tobs = dobs;
  // check numVar <= 1    
  if (numVar < 2) return;
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  // data copy
  for (j = 0; j < tobs; j++) {
   for (i = 0; i < numVar; i++) {
       Dtrain[i][j] = mdvar[i][j];
       for (k = 0; k < mdvalueNum[i]; k++) {
         if (mdvar[i][j] == mdvalue[i][k]) {
           D[i][j] = k;    
           break;
         }
       } // endof 
    } // endof i
  } // endof j

  // draw barchart matrix
  var icrossTable = 1;  // to print cross table
  chart.selectAll("*").remove();
  drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
})
      // cross table matrix
      d3.select("#dm21crossTable").on("click", function() {
          crossTable(numVar);
      })

      // multidimension frequency table
      d3.select("#dm21freqTable").on("click", function() {
          numfreqDM = multidimFreq(numVar, tobs);
          multidimFreqTable(numVar, tobs, numfreqDM, freqDM); 
      })

// scatter matrix 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#scatterMatrix").on("click", function() {
  graphNum = 42;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub22").style.display = "block"; // 회귀선 옵션 표시
  document.getElementById("scatterMatrix").style.backgroundColor = buttonColorH;
  document.getElementById("scatterMatrix").style.width  = iconH1;
  document.getElementById("scatterMatrix").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  dataClassifyDMbyGroup();
  yobs = dobs;
  tobs = dobs;
  if (numVar < 1) return; // no data
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  training = 1;
  dataPartition();
  tnumVar = numVar;
  if (yobs == tobs) tnumVar = numVar - 1; 
  iprior = 0;       // no prior needed
  linearFunction = 0; // no linear function needed
  for (i = 0; i < numVar-1; i++) svarName[i] = tdvarName[i+1];
  statMultivariateDM(ngroup, tnumVar, tobs);
  chart.selectAll("*").remove();
  drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);

/*
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        if (mobs > 0) return;
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)          
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
*/
})

      // print multivariate statistics
      d3.select("#dm22statMultivariate").on("click", function() {
          if (tobs < 1) return;
          printMultivariate(iprior);
      })
      // scatter plot 
      d3.select("#dm22scatterPlot").on("click", function() {
          if (tobs < 1) return;
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#dm22parallelGraph").on("click", function() {
          if (tobs < 1) return;
          parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue);
      })

// PCA 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#pca").on("click", function() {
  graphNum = 43;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("analysisSelectMain").disabled = true;
  document.getElementById("sub23").style.display = "block"; // 회귀선 옵션 표시
  document.getElementById("pca").style.backgroundColor = buttonColorH;
  document.getElementById("pca").style.width  = iconH1;
  document.getElementById("pca").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  dataClassifyDMbyGroup();
  if (numVar < 1) return; // no data
  ngroup = 1;
  yobs = dobs;
  tobs = dobs;
  istandard = 0;
  tnumVar = numVar;
  iprior = 0;       // no prior needed
  linearFunction = 0; // no linear function needed
  for (i = 0; i < numVar; i++) {
     svarName[i] = tdvarName[i];
     for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
  } 
  chart.selectAll("*").remove();
  drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
})
      // scatter plot 
      d3.select("#dm23scatterPlot").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#dm23parallelGraph").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue);
      })
      // PCA statistics
      d3.select("#dm23pcaStatTable").on("click", function() {
          if (tobs < 1) return;
          statPCA(numVar, tobs);
          pcaStatTable();
      })
      // eigenvalue plot 
      d3.select("#dm23eigenvaluePlot").on("click", function() {
          if (tobs < 1) return;
          drawEigenvalue();
      })
      // PCA Scatterplot
      d3.select("#dm23pcaScatterPlot").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < numVar; i++) {
            svarName[i] = YvarNameSub[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = Y[i][j];
          } 
          drawScatterMatrixByGroup(numVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // PCA table
      d3.select("#dm23pcaTable").on("click", function() {
          if (tobs < 1) return;
          pcaTable(numVar, tobs);
      })

//  버튼 클릭 -------------------------------------------------------------------------------
d3.select("#knearest").on("click", function() {
  graphNum = 44;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub24").style.display = "block"; // 옵션 표시
  document.getElementById("knearest").style.backgroundColor = buttonColorH;
  document.getElementById("knearest").style.width  = iconH1;
  document.getElementById("knearest").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  training = 1;
  istandard = 1;
  // data classify
  dataClassifyDMbyGroup();
  yobs = dobs;
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  dataPartition();
  tnumVar = numVar - 1; 
  if (numVar < 2) return;
  // if gobsD[] < 2, cannot calculte covariance matrix
  for (k = 0; k < ngroup; k++) {
      if (gobsD[k] < 2) {
         chart.append("text").attr("x", 50).attr("y", margin.top + 40)
              .text(alertMsg[64][langNum]).style("stroke","red").style("font-size","1em");
         return;
      }
  }

  linearFunction = 0; // no linear function needed
  for (i = 0; i < tnumVar; i++) svarName[i] = tdvarName[i+1];
  statMultivariateDM(ngroup, tnumVar, tobs);
  chart.selectAll("*").remove();
  titleStr = " - (Total Data)";
  drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
})
      // scatter plot 
      d3.select("#dm24scatterPlot").on("click", function() {
          if (tobs < 1) return;
          tnumVar = numVar - 1; 
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#dm24parallelGraph").on("click", function() {
          if (tobs < 1) return;
          tnumVar = numVar - 1; 
          parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue);
      })
      // print multivariate statistics
      d3.select("#dm24statMultivariate").on("click", function() {
          if (tobs < 1) return;
          iprior = 0;
          printMultivariate(iprior);
      })
      // knn classification
      d3.select("#dm24knnClassification").on("click", function() {
        if (tobs < 1) return;
        if (methodType240 == 1) { // search K
            training = 1; // use 100% training
            istandard = 1;
            tobs = yobs;
            testobs = yobs;
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
            }
            drawKmeanSearch();
            printAccuracyKNN();
        }
        else { // fixed K
          training = parseFloat(document.getElementById("training24").value) / 100;
          numK = parseInt(document.getElementById("numK").value);
          // standardization
          if (document.getElementById("istandard").checked == true) istandard = 1
          else istandard = 0;
          dataClassifyDMbyGroup();
          dataPartition();
          tnumVar = numVar - 1;
          titleStr = " - (Training Data)";
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
          kNN(tnumVar, tobs, testobs, ngroup);
          printClassification();
        }
      })
      // classification table
      d3.select("#dm24classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableKNN(tnumVar, tobs, testobs); 
      })

// Decision Tree 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#decisionTree").on("click", function() {
  graphNum = 45;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub25").style.display = "block"; // 옵션 표시
  document.getElementById("decisionTree").style.backgroundColor = buttonColorH;
  document.getElementById("decisionTree").style.width  = iconH1;
  document.getElementById("decisionTree").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";

  training = 1;
  // data classify
  dataClassifyDMbyGroup();
  yobs = dobs;
  // check numVar <= 1    
  if (numVar < 2) return;
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  // data copy
  for (j = 0; j < tobs; j++) {
   for (i = 0; i < numVar; i++) {
       for (k = 0; k < mdvalueNum[i]; k++) {
         if (mdvar[i][j] == mdvalue[i][k]) {
           D[i][j] = k;    
           break;
         }
       } // endof 
    } // endof i
  } // endof j
  // Data partician
  dataPartitionDT();
  tnumVar = numVar;
  // draw barchart matrix
  var icrossTable = 0;  // to print cross table
  chart.selectAll("*").remove();
  titleStr = " - (Total Data)";
  drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
  titleStr = "";
})
      // decision tree
      d3.select("#dm25decisionTree").on("click", function() {
          // Variable selection method
          method25 = document.myForm25.type25;
          methodType25 = method25.value; 
          method25[0].onclick = function() { methodType25 = method25.value; }  // Entropy
          method25[1].onclick = function() { methodType25 = method25.value; }  // Gini
          method25[2].onclick = function() { methodType25 = method25.value; }  // Classification error
          method25[3].onclick = function() { methodType25 = method25.value; }  // Chi-square
          // training %, max depth and min data of branch
          maxlevel = parseInt(document.getElementById("maxlevel").value);
          mindata  = parseInt(document.getElementById("mindata").value);
          training = parseFloat(document.getElementById("training25").value) / 100;
          dataPartitionDT();
          tnumVar = numVar;
          // draw barchart matrix
          var icrossTable = 0;  // to print cross table
          chart.selectAll("*").remove();
          titleStr = " - (Training Data)";
          drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
          titleStr = "";
          decisionTree(numVar, tobs);
          decisionTreeTable();
          decisionRule();
          classificationDT(ngroup, rulenum);
      })
      // decision rule and classification results
      d3.select("#dm25decisionRule").on("click", function() {
          decisionRule();
          classificationDT(ngroup, rulenum);
      })
      // classificationr table
      d3.select("#dm25classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableDT(numVar, tobs, testobs); 
      })

// Naive Bayes Classification 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#naiveBayesClassification").on("click", function() {
  graphNum = 50;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub261").style.display = "block"; // 옵션 표시
  document.getElementById("naiveBayesClassification").style.backgroundColor = buttonColorH;
  document.getElementById("naiveBayesClassification").style.width  = iconH1;
  document.getElementById("naiveBayesClassification").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  document.getElementById("testing261").disabled = true;   
  // prior prob selection method
  method261 = document.myForm261.type261;
  methodType261 = method261.value; 
  method261[0].onclick = function() { methodType261 = method.value; }  
  method261[1].onclick = function() { methodType261 = method.value; }  

  training = 1;
  // data classify
  dataClassifyDMbyGroup();
  yobs = dobs;
  // check numVar <= 1    
  if (numVar < 2) return;
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  // data copy
  for (j = 0; j < tobs; j++) {
   for (i = 0; i < numVar; i++) {
       for (k = 0; k < mdvalueNum[i]; k++) {
         if (mdvar[i][j] == mdvalue[i][k]) {
           D[i][j] = k;    
           break;
         }
       } // endof 
    } // endof i
  } // endof j
  // Data partician
  dataPartitionDT();
  tnumVar = numVar;
  // draw barchart matrix
  var icrossTable = 0;  // to print cross table
  chart.selectAll("*").remove();
  titleStr = " - (Total Data)";
  drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
  titleStr = "";
})
      // execute naive Bayes classification
      d3.select("#dm261naiveBayesClassification").on("click", function() {
          training = parseFloat(document.getElementById("training261").value) / 100;
          dataPartitionDT();
          tnumVar = numVar;
          if (numVar < 2) return;
          for (k = 0; k < ngroup; k++) {
            if (gobsD[k] < 2) {
              chart.append("text").attr("x", 50).attr("y", margin.top + 40)
                   .text(alertMsg[64][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
            if (methodType261 == 1) prior[k] = gobsD[k] / tobs;
            else prior[k] = 1 / ngroup;
          }
          // draw barchart matrix
          var icrossTable = 0;  // to print cross table
          chart.selectAll("*").remove();
          titleStr = " - (Training Data)";
          drawBarChartMatrix(numVar, tobs, freqMaxDM, icrossTable);
          titleStr = "";
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
      d3.select("#dm261classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTableNaiveBayes(numVar, tobs, testobs); 
      })

//  Bayes Classification 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#bayesClassification").on("click", function() {
  graphNum = 46;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub26").style.display = "block"; // 옵션 표시
  document.getElementById("bayesClassification").style.backgroundColor = buttonColorH;
  document.getElementById("bayesClassification").style.width  = iconH1;
  document.getElementById("bayesClassification").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  document.getElementById("testing26").disabled = true;   

  // data classify
  training = 1;
  // prior prob selection method
  method26 = document.myForm26.type26;
  methodType26 = method26.value; 
  method26[0].onclick = function() { methodType26 = method26.value; }  // sample prop
  method26[1].onclick = function() { methodType26 = method26.value; }  // equal prop

  dataClassifyDMbyGroup();
  yobs = dobs;
  if (ngroup > 9) { // too many groups
       alert(alertMsg[5][langNum]);
       return;
  }
  dataPartition();
          for (k = 0; k < ngroup; k++) {
            if (gobsD[k] < 2) {
               chart.append("text").attr("x", 50).attr("y", margin.top + 40)
                    .text(alertMsg[64][langNum]).style("stroke","red").style("font-size","1em");
               return;
            }
            if (methodType26 == 1) prior[k] = gobsD[k] / tobs;
            else prior[k] = 1 / ngroup;
          }

  tnumVar = numVar - 1; 
  linearFunction = 0; // no linear function needed
  for (i = 0; i < tnumVar; i++) svarName[i] = tdvarName[i+1];
  statMultivariateDM(ngroup, tnumVar, tobs);
  chart.selectAll("*").remove();
  titleStr = " - (Total Data)";
  drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
})
      // scatter plot 
      d3.select("#dm26scatterPlot").on("click", function() {
          if (tobs < 1) return;
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#dm26parallelGraph").on("click", function() {
          if (tobs < 1) return;
          parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue);
      })
      // print multivariate statistics
      d3.select("#dm26statMultivariate").on("click", function() {
          if (tobs < 1) return;
          iprior = 1;
          printMultivariate(iprior);
      })
      // bayes classification
      d3.select("#dm26bayesClassification").on("click", function() {
          if (tobs < 1) return;
          tnumVar = numVar - 1; 

          // data classify
          training = parseFloat(document.getElementById("training26").value) / 100;
          // prior prob selection method
          method26 = document.myForm26.type26;
          methodType26 = method26.value; 
          method26[0].onclick = function() { methodType26 = method26.value; }  // sample prop
          method26[1].onclick = function() { methodType26 = method26.value; }  // equal prop

          dataClassifyDMbyGroup();
          yobs = dobs;
          if (ngroup > 9) { // too many groups
            alert(alertMsg[5][langNum]);
            return;
          }
          dataPartition();
          for (k = 0; k < ngroup; k++) {
            if (gobsD[k] < 2) {
               chart.append("text").attr("x", 50).attr("y", margin.top + 40)
                    .text(alertMsg[64][langNum]).style("stroke","red").style("font-size","1em");
               return;
            }
            if (methodType26 == 1) prior[k] = gobsD[k] / tobs;
            else prior[k] = 1 / ngroup;
          }

          discriminant(tnumVar, tobs, testobs);
          if (tnumVar == 2 && ngroup == 2) linearFunction = 1;
          chart.selectAll("*").remove();
          titleStr = " - (Training Data)";
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
          printBayesClassificationFunction()
          printClassification();
      })
      // classification table
      d3.select("#dm26classificationTable").on("click", function() {
          if (tobs < 1) return;
          classificationTable(tnumVar, tobs, testobs); 
      })

//  버튼 클릭 -------------------------------------------------------------------------------
d3.select("#logistic").on("click", function() {
  graphNum = 47;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("sub27").style.display = "block"; // 회귀선 옵션 표시
  document.getElementById("logistic").style.backgroundColor = buttonColorH;
  document.getElementById("logistic").style.width  = iconH1;
  document.getElementById("logistic").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  training = parseFloat(document.getElementById("training27").value) / 100;
  document.getElementById("testing27").disabled = true;   
  dataClassifyRegression();
  // check numVar <= 1 && numVar > 2    
  if (numVar < 1) return;
  chart.selectAll("*").remove();
  tobs = mdobs[0];
})

//  버튼 클릭 -------------------------------------------------------------------------------
d3.select("#kmeans").on("click", function() {
  graphNum = 49;
  buttonColorChange();
//  variableSelectClear();
  document.getElementById("analysisSelectMain").disabled = true;
  document.getElementById("sub29").style.display = "block"; // 옵션 표시
  document.getElementById("kmeans").style.backgroundColor = buttonColorH;
  document.getElementById("kmeans").style.width  = iconH1;
  document.getElementById("kmeans").style.height = iconH1;
  document.getElementById("analysisVar").innerHTML = svgStr[18][langNum]; // 그룹
  document.getElementById("groupVar").innerHTML    = svgStr[26][langNum]; // 분석변량
  document.getElementById("groupVarMsg").innerHTML = "("+svgStrU[80][langNum]+")";
  document.getElementById("dm29scatterPlot").disabled  = false; 
  document.getElementById("dm29parallelGraph").disabled  = false; 
  document.getElementById("dm29kmeansScatterPlot").disabled = true; 
  document.getElementById("dm29kmeansTable").disabled   = true; 

  dataClassifyDMbyGroup();
  if (numVar < 1) return; // no data
  ngroup = 1;
  yobs = dobs;
  tobs = dobs;
  tnumVar = numVar;

  linearFunction = 0; // no linear function needed
  for (i = 0; i < numVar; i++) {
     svarName[i] = tdvarName[i];
     for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
  } 
  chart.selectAll("*").remove();
  drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
})
      // scatter plot 
      d3.select("#dm29scatterPlot").on("click", function() {
          if (tobs < 1) return;
          chart.selectAll("*").remove();
          ngroup = 1;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          drawScatterMatrixByGroup(tnumVar, svarName, tobs, ngroup, gdataValue, linearFunction);
      })
      // parallel graph
      d3.select("#dm29parallelGraph").on("click", function() {
          if (tobs < 1) return;
          chart.selectAll("*").remove();
          ngroup = 1;
          for (i = 0; i < numVar; i++) {
            svarName[i] = tdvarName[i];
            for (j = 0; j < tobs; j++) Dtrain[i][j] = mdvar[i][j];
          } 
          parallelGraphByGroup(tnumVar, svarName, tobs, ngroup, gdataValue);
      })
      // kmeans classification
      d3.select("#dm29kmeansCluster").on("click", function() {
          if (tobs < 1) return;

  // distance selection method
  method29 = document.myForm29.type29;
  idistance = method29.value; 
  method29[0].onclick = function() { idistance = method29.value; }  // Euclid^2
  method29[1].onclick = function() { idistance = method29.value; }  // Manhattan
  // number of clusters
  method292 = document.myForm292.type292;
  icluster = method292.value; 
  method292[0].onclick = function() { icluster = method292.value; }  // Find K
  method292[1].onclick = function() { icluster = method292.value; }  // Fixed K
  maxiter  = parseInt(document.getElementById("maxiter").value);
  epsi     = parseFloat(document.getElementById("epsi").value);
  iprior = 0;       // no prior needed

  // data standardization
  d3.select("#istandard").on("click",function() {
      if(this.checked) istandard = 1
      else istandard = 0;
  })
          // Data standardization 
          if (istandard == 1) { // standardize data
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < tobs; j++) {
                Dtrain[i][j]  = Dnormal[i][j];
              }
            }
          }
          else { // no data standardization
            for (i = 0; i < numVar; i++) {
              for (j = 0; j < tobs; j++) {
                Dtrain[i][j]  = Dnormal[i][j];
              }
            }
          }
          chart.selectAll("*").remove();
          if (icluster == 1) { // Observe ESS by K
            document.getElementById("dm29scatterPlot").disabled  = false; 
            document.getElementById("dm29parallelGraph").disabled  = false; 
            document.getElementById("dm29kmeansScatterPlot").disabled = true; 
            document.getElementById("dm29kmeansTable").disabled   = true; 
            for (Kgroup = 2; Kgroup < nclusterMax; Kgroup++) {
              iter = kmeansCluster(numVar, tobs)
              kmeansProcessTable(iter);
              kmeansTable();
            }
            drawLineESS();
            kmeansESS();
          }
          else { // fixed K
            Kgroup   = parseInt(document.getElementById("Kgroup").value);
            document.getElementById("dm29scatterPlot").disabled  = true; 
            document.getElementById("dm29parallelGraph").disabled  = true; 
            document.getElementById("dm29kmeansScatterPlot").disabled = false; 
            document.getElementById("dm29kmeansTable").disabled   = false; 
            iter = kmeansCluster(numVar, tobs)
            for (i = 0; i < Kgroup; i++) gdataValue[i] = "Cluster " + (i+1).toString();
            drawScatterMatrixByGroup(numVar, svarName, tobs, Kgroup, gdataValue, linearFunction);
            kmeansProcessTable(iter);
            kmeansTable();
          }

/*

          iter = kmeansCluster(numVar, tobs)
          kmeansProcessTable(iter);
          kmeansTable();
          for (i = 0; i < Kgroup; i++) gdataValue[i] = "Cluster " + (i+1).toString();
          drawScatterMatrixByGroup(numVar, svarName, tobs, Kgroup, gdataValue, linearFunction);
*/
      })
      // kmeans Cluster Scatterplot
      d3.select("#dm29kmeansScatterPlot").on("click", function() {
          if (tobs < 1) return;
          for (i = 0; i < Kgroup; i++) gdataValue[i] = "Cluster " + (i+1).toString();
          drawScatterMatrixByGroup(numVar, svarName, tobs, Kgroup, gdataValue, linearFunction);
      })
      // cluster table
      d3.select("#dm29kmeansTable").on("click", function() {
          if (tobs < 1) return;
          kmeansClusterTable(numVar, tobs);
      })


// eStatM 메뉴
d3.select("#estatM").on("click", function() {
    window.open("../eStatM/index.html");
})
// eStatH 메뉴
d3.select("#estatH").on("click", function() {
    window.open("../eStatH/index.html");
})
// eStatU 메뉴
d3.select("#estatU").on("click", function() {
/*
   var eStatVersion = localStorage['installDate'];
   var tempStorage = localStorage['temp'];
   let currentDate = new Date();  // 날짜
   console.log(currentDate);
   if (tempStorage === undefined) console.log("tempStorage is undefined");
   console.log(eStatVersion);
*/
   window.open(appStr[2][langNum]);
})
// eStatE 메뉴
d3.select("#estatE").on("click", function() {
    window.open(appStr[3][langNum]);
})
// eStat 메뉴
d3.select("#estat").on("click", function() {
    window.open(appStr[4][langNum]);
})
// eStat Home 메뉴v
d3.select("#home").on("click", function() {
    window.open(appStr[0][langNum], "_self");
})
// eStat Lecture 메뉴
d3.select("#estatLecture").on("click", function() {
var levelNum = localStorage.getItem("level");
    if (levelNum == "2") {window.open(appStr[6][langNum]);}
    else if (levelNum == "3") {window.open(appStr[7][langNum]);}
    else {window.open(appStr[8][langNum]);}
})
// eDataScience Lecture 메뉴
d3.select("#eDataLecture").on("click", function() {
    window.open(appStr[9][langNum]);
})
// language Button
d3.select("#langBtn").on("click", function() {
    window.open(appStr[5][langNum], "_self");
})
// Example Download Button
d3.select("#downBtn").on("click", function() {
    // to be done
})

// 그래프 제목편집
d3.select("#editGraph").on("click", function() {
    if (graphNum > 20) {
        alert(alertMsg[42][langNum]);
        return;
    }
    buttonColorChange();
    document.getElementById("editGraph").style.backgroundColor = buttonColorH;
    document.getElementById("sub13").style.display = "block"; //그래프 제목편집 선택사항표시
    // 현재 제목 쓰기
    d3.select("#titleMain").node().value = mTitle[graphNum];
    d3.select("#titleY").node().value = yTitle[graphNum];
    d3.select("#titleX").node().value = xTitle[graphNum];
})
// 그래프 제목편집 실행
d3.select("#executeTH13").on("click", function() {
    EditGraph = true;
    mTitle[graphNum] = d3.select("#titleMain").node().value;
    yTitle[graphNum] = d3.select("#titleY").node().value;
    xTitle[graphNum] = d3.select("#titleX").node().value;
    document.getElementById(strGraph[graphNum]).click();  // Redraw Graph - defalut는 막대그래프
    EditGraph = false;
})
// jQuery 대화상자 초기화?
$(".dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 'auto',
});
// 시트 EditVar - ValueLabel 버튼 : V1 (jj=0) 만 해당
// 각 모듈 varlist 생성
d3.select("#variableBtn").on("click", function() {
    jj = 0;
    // dialog open
    $("#sub14").dialog("open");
    openEditVar('valueLabel')
    selectVarInit();
})

// 편집창 EditVar - ValueLabel varlist에 이벤트 발생시 update 처리 함수 --------------------------
$("#varlist").change(selectVarUpdate);
function selectVarUpdate() {
    // 변량값명을 rvaluelabel에 입력  : rvalueNum[jj]가 증가할 수도 있음
    if (rvalueNum[jj] <= maxNumEdit ) { 
      for (k = 0; k < rvalueNum[jj]; k++) {
        str2 = "#cell" + (k + 1).toString() + (2).toString();
        rvalueLabel[jj][k] = d3.select(str2).node().value;
      }
    }
    else { 
      for (k = 0; k < maxNumEdit; k++) {
        str2 = "#cell" + (k + 1).toString() + (2).toString();
        rvalueLabel[jj][k] = d3.select(str2).node().value;
      }
    }
    // 변량명을 rvarName에 입력
    rvarName[jj] = d3.select("#vname").node().value;
    // 앞의 것 저장하고 새 varlist 준비
    jj = parseInt(document.getElementById("varlist").value) - 1;
    selectVarInit();
} // endof selectVarUpdate()  ---------------------------------------------
// 편집창 EditVar - ValueLabel varlist에 초기값 표시 함수 ---------------------------------------
function selectVarInit() {
    if (numRow == 0 || typeof(numRow) == 'undefined') return;
    // 변량명 초기화
    d3.select("#vname").node().value = rvarName[jj];
    // 편집창 셀에 변량값 입력
    for (k = 0; k < maxNumEdit; k++) {
        str1 = "#cell" + (k + 1).toString() + (1).toString();
        str2 = "#cell" + (k + 1).toString() + (2).toString();
        if (rvalue[jj][k] == MISSING) { // missing
            d3.select(str1).node().value = null;           
            d3.select(str2).node().value = null;           
            continue; 
        }
        if (k < rvalueNum[jj]) {
            d3.select(str1).node().value = rvalue[jj][k];
            d3.select(str2).node().value = rvalueLabel[jj][k];
        } else {
            d3.select(str1).node().value = null;
            d3.select(str2).node().value = null;
        }
    }
} // endof selectVarInit -------------------------------------------------
// 변량편집 EditVar - ValueLabel 저장 (최종 편집 변량에 적용)
d3.select("#vconfirm").on("click", function() {
    if (numRow == 0 || typeof(numRow) == 'undefined') return;
    selectVarUpdate();
    datasheet.updateSettings({
        colHeaders: rvarName
    });
})
// 변량편집 EditVar - ValueLabel 나가기
d3.select("#vcancel").on("click", function() {
    var j, k, m;
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    selectVarUpdate();
    datasheet.updateSettings({
        colHeaders: rvarName
    });
    // redraw Graph
    for (j = 0; j < numVar; j++) {
      k = tdvarNumber[j] - 1;
      tdvarName[j] = rvarName[k];
      // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
      for (m = 0; m < tdvalueNum[j]; m++) {
         tdvalue[j][m] = rvalue[k][m];
         tdvalueLabel[j][m] = rvalueLabel[k][m];
      }
    }
    updateVarList();
    var list = document.getElementById("varlist");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    document.getElementById(strGraph[graphNum]).click();  // Redraw Graph - defalut는 막대그래프
    $("#sub14").dialog("close");
})
// Edit Variable - Sorting ------------------------------------------------------------
// varlistSorting1,2,3에 이벤트 발생시 update 처리 함수 
var sortVar1 = -1;
var sortVar2 = -1;
var sortVar3 = -1;
var maxNumber1, maxNumber2, maxNumber3;
$("#varlistSorting1").change(selectVarUpdateSorting1);
$("#varlistSorting2").change(selectVarUpdateSorting2);
$("#varlistSorting3").change(selectVarUpdateSorting3);
function selectVarUpdateSorting1() {
    sortVar1 = parseInt(document.getElementById("varlistSorting1").value) - 1;
    // maximum digit of the variable
    maxDigit = 0;
    for (i = 0; i < numRow; i++) {
      if (rvar[sortVar1][i] == MISSING) continue;
      if (rvar[sortVar1][i].length > maxDigit) maxDigit = rvar[sortVar1][i].length;
    }
    maxNumber1 = "";
    for (k = 0; k < maxDigit; k++) maxNumber1 = "9" + maxNumber1;
} 
function selectVarUpdateSorting2() {
    sortVar2 = parseInt(document.getElementById("varlistSorting2").value) - 1;
    // maximum digit of the variable
    var maxDigit = 0;
    for (i = 0; i < numRow; i++) {
      if (rvar[sortVar2][i] == MISSING) continue;
      if (rvar[sortVar2][i].length > maxDigit) maxDigit = rvar[sortVar2][i].length;
    }
    maxNumber2 = "";
    for (k = 0; k < maxDigit; k++) maxNumber2 = "9" + maxNumber2;
} 
function selectVarUpdateSorting3() {
    sortVar3 = parseInt(document.getElementById("varlistSorting3").value) - 1;
    // maximum digit of the variable
    var maxDigit = 0;
    for (i = 0; i < numRow; i++) {
      if (rvar[sortVar3][i] == MISSING) continue;
      if (rvar[sortVar3][i].length > maxDigit) maxDigit = rvar[sortVar3][i].length;
    }
    maxNumber3 = "";
    for (k = 0; k < maxDigit; k++) maxNumber3 = "9" + maxNumber3;
} 
// Sorting Method
var sortMethod1  = 0;
var sort1        = document.sortingForm1.sortingType1;
sort1[0].onclick = function() { sortMethod1 = 0; }  
sort1[1].onclick = function() { sortMethod1 = 1; }  
// Sorting Method
var sortMethod2  = 0;
var sort2        = document.sortingForm2.sortingType2;
sort2[0].onclick = function() { sortMethod2 = 0; }  
sort2[1].onclick = function() { sortMethod2 = 1; }  
// Sorting Method
var sortMethod3  = 0;
var sort3        = document.sortingForm3.sortingType3;
sort3[0].onclick = function() { sortMethod3 = 0; }  
sort3[1].onclick = function() { sortMethod3 = 1; }  
// 숫자인 경우 왼쪽에 0을 넣어 string화
function formatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
// Execute Sorting by index
d3.select("#executeSorting").on("click", function() {
    // sort by index
    var reverse1, reverse2, reverse3;
    document.getElementById("sortingWarning").innerHTML = "";
    document.getElementById("sortingWarning").style.display = "none"; 
    // No selection or no value
    if ( sortVar1 < 0  && sortVar2 < 0 && sortVar3 < 0 ) {
      document.getElementById("sortingWarning").innerHTML = alertMsg[56][langNum];
      document.getElementById("sortingWarning").style.display = "block"; 
      return;  
    }
    for (i = 0; i < numRow; i++) {
      for (j = 0; j < numCol; j++) {
        if (rvar[j][i] == MISSING) tdvar[j][i] = null
        else tdvar[j][i] = rvar[j][i];
      }
    }
    if (sortVar1 >= 0 && sortVar2 < 0 && sortVar3 < 0) {  
       if (sortMethod1 == 0) {     
         for (i = 0; i < numRow; i++) dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1); 
       }
       else {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1); 
         }
       }
    }
    else if (sortVar1 >= 0 && sortVar2 >= 0 && sortVar3 < 0) {
       if (sortMethod1 == 0 && sortMethod2 == 0) {     
         for (i = 0; i < numRow; i++) dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2); 
       }
       else if (sortMethod1 == 0 && sortMethod2 == 1) {
         for (i = 0; i < numRow; i++) {
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(reverse2,maxNumber2); 
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 0) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2); 
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 1) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(reverse2,maxNumber2); 
         }
       }
    }
    else if (sortVar1 >= 0 && sortVar2 >= 0 && sortVar3 >= 0) {
       if (sortMethod1 == 0 && sortMethod2 == 0 && sortMethod3 == 0) {     
         for (i = 0; i < numRow; i++) dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2) + formatNumberLength(tdvar[sortVar3][i],maxNumber3); 
       }
       else if (sortMethod1 == 0 && sortMethod2 == 1 && sortMethod3 == 0) {
         for (i = 0; i < numRow; i++) {
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(reverse2,maxNumber2) + formatNumberLength(tdvar[sortVar3][i],maxNumber3);  
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 0 && sortMethod3 == 0) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2) + formatNumberLength(tdvar[sortVar3][i],maxNumber3);  
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 1 && sortMethod3 == 0) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(reverse2,maxNumber2) + formatNumberLength(tdvar[sortVar3][i],maxNumber3); ; 
         }
       }
       else if (sortMethod1 == 0 && sortMethod2 == 0 && sortMethod3 == 1) {     
         for (i = 0; i < numRow; i++) {
           reverse3 = (parseFloat(maxNumber3)- parseFloat(tdvar[sortVar3][i])).toString();
           dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2) + formatNumberLength(reverse3,maxNumber3); 
         }
       }
       else if (sortMethod1 == 0 && sortMethod2 == 1 && sortMethod3 == 1) {
         for (i = 0; i < numRow; i++) {
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           reverse3 = (parseFloat(maxNumber3)- parseFloat(tdvar[sortVar3][i])).toString();
           dataA[i] = formatNumberLength(tdvar[sortVar1][i],maxNumber1) + formatNumberLength(reverse2,maxNumber2) + formatNumberLength(reverse3,maxNumber3); ; 
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 0 && sortMethod3 == 1) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           reverse3 = (parseFloat(maxNumber3)- parseFloat(tdvar[sortVar3][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(tdvar[sortVar2][i],maxNumber2) + formatNumberLength(reverse3,maxNumber3); ; 
         }
       }
       else if (sortMethod1 == 1 && sortMethod2 == 1 && sortMethod3 == 1) {
         for (i = 0; i < numRow; i++) {
           reverse1 = (parseFloat(maxNumber1)- parseFloat(tdvar[sortVar1][i])).toString();
           reverse2 = (parseFloat(maxNumber2)- parseFloat(tdvar[sortVar2][i])).toString();
           reverse3 = (parseFloat(maxNumber3)- parseFloat(tdvar[sortVar3][i])).toString();
           dataA[i] = formatNumberLength(reverse1,maxNumber1) + formatNumberLength(reverse2,maxNumber2) + formatNumberLength(reverse3,maxNumber3);  
         }
       }
    }
    sortAscendIndex(numRow, dataA, indexA) 
    for (j = 0; j < numCol; j++) {
        for (i = 0; i < numRow; i++) {
            if (tdvar[j][indexA[i]] == null) rvar[j][i] = MISSING;
            else rvar[j][i] = tdvar[j][indexA[i]];
        }
    }
    // dump tdvar[][] => rvar[][]
    for (j = 0; j < numCol; j++) {
      for (i = 0; i < numRow; i++) {
        if (rvar[j][i] == MISSING) data[i][j] = null;
        else data[i][j] = rvar[j][i];
      }
    }
    // 시트 업데이트
    datasheet.updateSettings({
        data: data, 
        colHeaders: rvarName,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
    document.getElementById("loadFileName").value = "Untitled.csv";
}) // endof sorting
// EditVar - Sorting 나가기
d3.select("#cancelSorting").on("click", function() {
    clearSortingBox();
    if (typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    openEditVar('valueLabel')
    $("#sub14").dialog("close");
})
function clearSortingBox() {
    document.getElementById("varlistSorting1").value = 0;
    document.getElementById("varlistSorting2").value = 0;
    document.getElementById("varlistSorting3").value = 0;
    sort1[0].click();
    sort2[0].click();
    sort3[0].click();
    document.getElementById("sortingWarning").innerHTML = "";
    document.getElementById("sortingWarning").style.display = "none"; 
    var list = document.getElementById("varlistSorting1");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    list = document.getElementById("varlistSorting2");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    list = document.getElementById("varlistSorting3");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
}
// Edit Variable - Category ------------------------------------------------------------
// varlistCategory에 이벤트 발생시 update 처리 함수 
var categoryVar = -1;
var maxNoInterval = 9;
var numInterval;
var intervalBegin = new Array(maxNoInterval);
var intervalEnd   = new Array(maxNoInterval);
document.getElementById("newCategoryVar").disabled  = true;
for (i = 0; i < 9; i++) {
      str1 = "category"+(i+1).toString()+"1";
      str2 = "category"+(i+1).toString()+"2";
      str3 = "category"+(i+1).toString()+"3";
      document.getElementById(str1).disabled = true;
      document.getElementById(str2).disabled = true;
      document.getElementById(str3).disabled = true;
}
$("#varlistCategory").change(selectVarUpdateCategory);
function selectVarUpdateCategory() {
    categoryVar = parseInt(document.getElementById("varlistCategory").value) - 1;
    tobs = 0;
    for (i = 0; i < numRow; i++) {
      if (rvar[categoryVar][i] != MISSING ) {
         tdata[tobs] = parseFloat(rvar[categoryVar][i]);
         tobs++;
      }
    }
    TotalStat(tobs, tdata, tstat); 
    document.getElementById("minimumValue").value = tstat[3]; // mini
    document.getElementById("maximumValue").value = tstat[7]; // maxi
    document.getElementById("minimumValue").disabled = true;
    document.getElementById("maximumValue").disabled = true;
} 

// Category List Check
d3.select("#categoryList").on("click", function() {
   for (i = 0; i < maxNoInterval; i++) {
      str1 = "category"+(i+1).toString()+"1";
      str2 = "category"+(i+1).toString()+"2";
      str3 = "category"+(i+1).toString()+"3";
      str4 = "category"+(i+1).toString()+"4";
      document.getElementById(str1).value = "";
      document.getElementById(str2).value = "";
      document.getElementById(str3).value = "";
      document.getElementById(str4).value = "";
   }
   var minValue = tstat[3]; // mini
   var maxValue = tstat[7]; // maxi
   var intervalStart =  document.getElementById("intervalStart").value;
   var intervalWidth =  document.getElementById("intervalWidth").value;
   if ( intervalStart == "" || intervalWidth == "" ) {
      document.getElementById("categoryListWarning").innerHTML = alertMsg[57][langNum];
      document.getElementById("categoryListWarning").style.display = "block"; 
      return;
   }
   if ( isNaN(intervalStart) || isNaN(intervalWidth) ) {
      document.getElementById("categoryListWarning").innerHTML = alertMsg[58][langNum]; // Enter numeric Interval Start and Interval Width"
      document.getElementById("categoryListWarning").style.display = "block"; 
      return;
   }
   intervalStart =  parseFloat(intervalStart);
   intervalWidth =  parseFloat(intervalWidth);
   if ( intervalStart > minValue ) {
      document.getElementById("intervalStart").value = minValue;
      intervalStart = minValue;
   }
   for (i = 1; i < maxNoInterval; i++) {
     intervalBegin[i] = "";
     intervalEnd[i]   = "";     
   }
   intervalBegin[0]  = intervalStart;
   intervalEnd[0]    = intervalBegin[0] + intervalWidth;
   for (i = 1; i < maxNoInterval; i++) {
     intervalBegin[i] = intervalBegin[i-1] + intervalWidth;
     intervalEnd[i]   = intervalEnd[i-1] + intervalWidth;
     numInterval = i+1;
     if (intervalEnd[i] > maxValue) break;
   }
   document.getElementById("categoryListWarning").innerHTML = "";
   document.getElementById("categoryListWarning").style.display = "none"; 
   if (numInterval == 9 && intervalEnd[8] < maxValue ) {
      document.getElementById("categoryListWarning").innerHTML = alertMsg[59][langNum]; // More than 9 interval - change Interval Width
      document.getElementById("categoryListWarning").style.display = "block"; 
   }
   var temp = "V"+(categoryVar+1).toString();
   for (i = 0; i < numInterval; i++) {
      str1 = "category"+(i+1).toString()+"1";
      str2 = "category"+(i+1).toString()+"2";
      str3 = "category"+(i+1).toString()+"3";
      str4 = "category"+(i+1).toString()+"4";
      document.getElementById(str1).value = intervalBegin[i];
      document.getElementById(str2).value = temp;
      document.getElementById(str3).value = intervalEnd[i];
      document.getElementById(str4).value = "["+intervalBegin[i]+", "+intervalEnd[i]+")";
      rvalueLabel[numCol][i] = document.getElementById(str4).value;
   }
})

// Execute Category
d3.select("#executeCategory").on("click", function() {
    document.getElementById("categoryWarning").innerHTML = "";
    document.getElementById("categoryWarning").style.display = "none"; 
    // No selection or no value
    if ( categoryVar < 0 ) {
      document.getElementById("categoryWarning").innerHTML = alertMsg[56][langNum]; // No variable selected
      document.getElementById("categoryWarning").style.display = "block"; 
      return;  
    }
    for (i = 0; i < numRow; i++) {
      for (j = 0; j < numCol; j++) tdvar[j][i] = rvar[j][i];
      if ( tdvar[categoryVar][i] == MISSING ) {
        tdvar[numCol][i] = MISSING;
      }
      else {
        for (k = 0; k < numInterval; k++) {
          if ( tdvar[categoryVar][i] < intervalEnd[k] )  { tdvar[numCol][i] = (k+1).toString(); break;}
        }
      }
    }
    str2 = document.getElementById("newCategoryVarName").value;
    if (str2 == "") rvarName[numCol] = "V"+(numCol+1).toString();
    else rvarName[numCol] = str2;
    // find new rvalue[numCol] 
    for (i = 0; i < numRow; i++) dataA[i] = tdvar[numCol][i];
    rvalueNum[numCol] = sortAscendAlpha(numRow, dataA, dataValue, dvalueFreq);
    for (k = 0; k < rvalueNum[numCol]; k++) rvalue[numCol][k] = dataValue[k];
    robs[numCol] = numRow;

    // 새 category 변수 dump to rvar[][]
    for (i = 0; i < numRow; i++) {
        rvar[numCol][i] = tdvar[numCol][i];
        if (rvar[numCol][i] == MISSING) data[i][numCol] = null;
        else data[i][numCol] = rvar[numCol][i];
    }
    numCol++;
    // 시트 업데이트
    datasheet.updateSettings({
        data: data, 
        colHeaders: rvarName,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
}) // endof Category
// Category 나가기
d3.select("#cancelCategory").on("click", function() {
    clearCategoryBox()
    if (typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    openEditVar('valueLabel')
    $("#sub14").dialog("close");
})
function clearCategoryBox(){
    document.getElementById("categoryWarning").innerHTML = "";
    document.getElementById("categoryWarning").style.display = "none"; 
    document.getElementById("categoryListWarning").innerHTML = "";
    document.getElementById("categoryListWarning").style.display = "none"; 
    document.getElementById("newCategoryVar").value = "";
    document.getElementById("newCategoryVarName").value = "";
    document.getElementById("varlistCategory").value = 0;
    var list = document.getElementById("varlistCategory");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    document.getElementById("minimumValue").value  = "";
    document.getElementById("maximumValue").value  = "";
    document.getElementById("intervalStart").value = "";
    document.getElementById("intervalWidth").value = "";
    for (i = 0; i < numInterval; i++) {
      str1 = "category"+(i+1).toString()+"1";
      str2 = "category"+(i+1).toString()+"2";
      str3 = "category"+(i+1).toString()+"3";
      str4 = "category"+(i+1).toString()+"4";
      document.getElementById(str1).value = "";
      document.getElementById(str2).value = "";
      document.getElementById(str3).value = "";
      document.getElementById(str4).value = "";
    }
}
// Edit Variable - Recode ------------------------------------------------------------
// varlistRecode에 이벤트 발생시 update 처리 함수 
var recodeVar = -1;
var newValue = new Array(colMax);
for (i = 0; i < 9; i++) {
    str1 = "recode"+(i+1).toString()+"1";
    document.getElementById(str1).disabled = true;
}
$("#varlistRecode").change(selectVarUpdateRecode);
function selectVarUpdateRecode() {
    document.getElementById("recodeVarWarning").innerHTML = "";
    document.getElementById("recodeVarWarning").style.display = "none"; 
    recodeVar = parseInt(document.getElementById("varlistRecode").value) - 1;
    if (rvalueNum[recodeVar] > 9) {
      document.getElementById("recodeVarWarning").innerHTML = alertMsg[60][langNum]; // This variable has more than 9 values
      document.getElementById("recodeVarWarning").style.display = "block"; 
      return;
    }
    for (i = 0; i < 9; i++) {
      str1 = "recode"+(i+1).toString()+"1";
      str2 = "recode"+(i+1).toString()+"2";
      document.getElementById(str1).value = "";
      document.getElementById(str2).value = "";
    }    
    for (i = 0; i < rvalueNum[recodeVar]; i++) {
      str1 = "recode"+(i+1).toString()+"1";
      if (rvalue[recodeVar][i] == MISSING) document.getElementById(str1).value = "";
      else document.getElementById(str1).value = rvalue[recodeVar][i];
    }
} 

// Execute Recode
d3.select("#executeRecode").on("click", function() {
    document.getElementById("recodeWarning").innerHTML = "";
    document.getElementById("recodeWarning").style.display = "none"; 
    // No selection or no value
    if ( recodeVar < 0 ) {
      document.getElementById("recodeWarning").innerHTML = alertMsg[56][langNum]; // No variable selected
      document.getElementById("recodeWarning").style.display = "block"; 
      return;  
    }
    var checkBlank = true;
    for (i = 0; i < rvalueNum[recodeVar]; i++) {
      str2 = "recode"+(i+1).toString()+"2";
      newValue[i] = document.getElementById(str2).value 
      if (newValue[i] != "") checkBlank = false;
    }
    if (checkBlank) {
      document.getElementById("recodeWarning").innerHTML = alertMsg[61][langNum]; // No value entered
      document.getElementById("recodeWarning").style.display = "block"; 
      return;  
    }
    for (i = 0; i < numRow; i++) {
      for (j = 0; j < numCol; j++) tdvar[j][i] = rvar[j][i];
      if ( tdvar[recodeVar][i] == MISSING ) {
        tdvar[numCol][i] = MISSING;
      }
      else {
        for (k = 0; k < rvalueNum[recodeVar]; k++) {
          if ( tdvar[recodeVar][i] == rvalue[recodeVar][k] )  { tdvar[numCol][i] = newValue[k]; break;}
        }
      }
    }
    str2 = document.getElementById("newRecodeVarName").value;
    if (str2 == "") rvarName[numCol] = "V"+(numCol+1).toString();
    else rvarName[numCol] = str2;
    // values of recode var
    for (i = 0; i < numRow; i++) dataA[i] = tdvar[numCol][i];
    rvalueNum[numCol] = sortAscendAlpha(numRow, dataA, dataValue, dvalueFreq);
    for (k = 0; k < rvalueNum[numCol]; k++) rvalue[numCol][k] = dataValue[k];
    // 새 recode 변수 dump to rvar[][]
    for (i = 0; i < numRow; i++) {
        rvar[numCol][i] = tdvar[numCol][i];
        if (rvar[numCol][i] == MISSING || rvar[numCol][i] == 'MISSING' ) data[i][numCol] = null;
        else data[i][numCol] = rvar[numCol][i];
    }
    numCol++;
    // 시트 업데이트
    datasheet.updateSettings({
        data: data, 
        colHeaders: rvarName,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
}) // endof Recode
// EditVar - Recode 나가기
d3.select("#cancelRecode").on("click", function() {
    clearRecodeBox();
    if (typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    openEditVar('valueLabel')
    $("#sub14").dialog("close");
})
function clearRecodeBox(){
    document.getElementById("recodeVarWarning").innerHTML = "";
    document.getElementById("recodeVarWarning").style.display = "none"; 
    document.getElementById("recodeWarning").innerHTML = "";
    document.getElementById("recodeWarning").style.display = "none"; 
    document.getElementById("newRecodeVar").value = "";
    document.getElementById("newRecodeVarName").value = "";
    document.getElementById("varlistRecode").value = 0;
    var list = document.getElementById("varlistRecode");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    for (i = 0; i < 9; i++) {
      str1 = "recode"+(i+1).toString()+"1";
      str2 = "recode"+(i+1).toString()+"2";
      document.getElementById(str1).value = "";
      document.getElementById(str2).value = "";
    }    
}

// Edit Variable - Compute ------------------------------------------------------------
var numComputeVar = 0;
// varlistCategory에 이벤트 발생시 update 처리 함수 
$("#varlistCompute").change(selectVarUpdateCompute);
function selectVarUpdateCompute() {
    var computeVar = document.getElementById("varlistCompute").value;
    newValue[numComputeVar] = computeVar;
    numComputeVar++;
    str1 = str1 + "V" + computeVar;
    for (j = 0; j < numCol; j++) {
      if (computeVar == (j+1)) { str2 = str2 + "parseFloat(rvar["+j+"][i])"; break; }
    }
    document.getElementById("computeFormula").value = str1;
} 
// button들에 이벤트 발생시
d3.select("#n1").on("click", function() {
    str1 = str1 + "1";
    str2 = str2 + "1";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n2").on("click", function() {
    str1 = str1 + "2";
    str2 = str2 + "2";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n3").on("click", function() {
    str1 = str1 + "3";
    str2 = str2 + "3";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n4").on("click", function() {
    str1 = str1 + "4";
    str2 = str2 + "4";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n5").on("click", function() {
    str1 = str1 + "5";
    str2 = str2 + "5";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n6").on("click", function() {
    str1 = str1 + "6";
    str2 = str2 + "6";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n7").on("click", function() {
    str1 = str1 + "7";
    str2 = str2 + "7";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n8").on("click", function() {
    str1 = str1 + "8";
    str2 = str2 + "8";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n9").on("click", function() {
    str1 = str1 + "9";
    str2 = str2 + "9";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#n0").on("click", function() {
    str1 = str1 + "0";
    str2 = str2 + "0";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#ndot").on("click", function() {
    str1 = str1 + ".";
    str2 = str2 + ".";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nplus").on("click", function() {
    str1 = str1 + "+";
    str2 = str2 + "+";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nminus").on("click", function() {
    str1 = str1 + "-";
    str2 = str2 + "-";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nmult").on("click", function() {
    str1 = str1 + "*";
    str2 = str2 + "*";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#ndivide").on("click", function() {
    str1 = str1 + "/";
    str2 = str2 + "/";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nopen").on("click", function() {
    str1 = str1 + "(";
    str2 = str2 + "(";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nclose").on("click", function() {
    str1 = str1 + ")";
    str2 = str2 + ")";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nlog").on("click", function() {
    str1 = str1 + "LOG";
    str2 = str2 + "Math.log";
    document.getElementById("computeFormula").value = str1;
})
d3.select("#nexp").on("click", function() {
    str1 = str1 + "EXP";
    str2 = str2 + "Math.exp";
})
d3.select("#nsqrt").on("click", function() {
    str1 = str1 + "SQRT";
    str2 = str2 + "Math.sqrt";
    document.getElementById("computeFormula").value = str1;
})
// Execute Compute
d3.select("#executeCompute").on("click", function() {
    document.getElementById("computeWarning").innerHTML = "";
    document.getElementById("computeWarning").style.display = "none"; 
    // No selection or no value
    if ( document.getElementById("computeFormula").value == "" ) {
      document.getElementById("computeWarning").innerHTML = alertMsg[62][langNum]; // Enter formula
      document.getElementById("computeWarning").style.display = "block"; 
      return;  
    }
    for (i = 0; i < numRow; i++) {
      for (j = 0; j < numCol; j++) tdvar[j][i] = rvar[j][i];
      var checkMissing = false;
      for (j = 0; j < numComputeVar; j++) {
         if(tdvar[newValue[j]][i] == MISSING) {checkMissing = true; break;}
      }
      if (checkMissing) tdvar[numCol][i] = MISSING;
      else tdvar[numCol][i] = (eval(str2)).toString();
    }
    str2 = document.getElementById("newComputeVarName").value;
    if (str2 == "") rvarName[numCol] = "V"+(numCol+1).toString();
    else rvarName[numCol] = str2;
    // find new rvalue[numCol] 
    for (i = 0; i < numRow; i++) dataA[i] = tdvar[numCol][i];
    rvalueNum[numCol] = sortAscendAlpha(numRow, dataA, dataValue, dvalueFreq);
    for (k = 0; k < rvalueNum[numCol]; k++) rvalue[numCol][k] = dataValue[k];
    // 새 compute 변수 dump to rvar[][]
    for (i = 0; i < numRow; i++) {
        rvar[numCol][i] = tdvar[numCol][i];
        if (rvar[numCol][i] == MISSING) data[i][numCol] = null;
        else data[i][numCol] = rvar[numCol][i];
    }
    numCol++;
    // 시트 업데이트
    datasheet.updateSettings({
        data: data, 
        colHeaders: rvarName,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
}) // endof Compute
// EditVar - Compute 나가기
d3.select("#cancelCompute").on("click", function() {
    clearComputeBox();
    if (typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    openEditVar('valueLabel')
    $("#sub14").dialog("close");
})
function clearComputeBox(){
    document.getElementById("computeFormula").value = "";
    document.getElementById("varlistCompute").value = 1;
    document.getElementById("computeWarning").innerHTML = "";
    document.getElementById("computeWarning").style.display = "none"; 
    document.getElementById("newComputeVar").value     = "";
    document.getElementById("newComputeVarName").value = "";
    document.getElementById("computeFormula").value    = "";
    var list = document.getElementById("varlistCompute");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
}
// Edit Variable - Select If ------------------------------------------------------------
// varlistSelectIf1,2,3에 이벤트 발생시 update 처리 함수 
var selectVar1 = -1;
var selectVar2 = -1;
var selectVar3 = -1;
$("#varlistSelectIf1").change(selectVarUpdateSelectIf1);
$("#varlistSelectIf2").change(selectVarUpdateSelectIf2);
$("#varlistSelectIf3").change(selectVarUpdateSelectIf3);
function selectVarUpdateSelectIf1() {
    selectVar1 = parseInt(document.getElementById("varlistSelectIf1").value) - 1;
} 
function selectVarUpdateSelectIf2() {
    selectVar2 = parseInt(document.getElementById("varlistSelectIf2").value) - 1;
} 
function selectVarUpdateSelectIf3() {
    selectVar3 = parseInt(document.getElementById("varlistSelectIf3").value) - 1;
} 
// Execute Select If
d3.select("#executeSelectIf").on("click", function() {
    var selectOperator1 = parseInt(document.getElementById("varlistOperatorSelectIf1").value);
    var selectOperator2 = parseInt(document.getElementById("varlistOperatorSelectIf2").value);
    var selectOperator3 = parseInt(document.getElementById("varlistOperatorSelectIf3").value);
    var selectIfValue1  = document.getElementById("selectIf1").value;
    var selectIfValue2  = document.getElementById("selectIf2").value;
    var selectIfValue3  = document.getElementById("selectIf3").value;
    var check1, check2, check3;
    document.getElementById("selectIfWarning").innerHTML = "";
    document.getElementById("selectIfWarning").style.display = "none"; 
    // No selection or no value
    if ( selectVar1 < 0  && selectVar2 < 0 && selectVar3 < 0 ) {
      document.getElementById("selectIfWarning").innerHTML = alertMsg[56][langNum]; // No variable selected
      document.getElementById("selectIfWarning").style.display = "block"; 
      return;  
    }
    var tnumRow = 0;
    if (selectVar1 >= 0 && selectVar2 < 0 && selectVar3 < 0) {  
      if ( selectIfValue1 == "" ) {
        document.getElementById("selectIfWarning").innerHTML = alertMsg[61][langNum]; // No value entered
        document.getElementById("selectIfWarning").style.display = "block"; 
        return;  
      }
      for (i = 0; i < numRow; i++) {
        if (rvar[selectVar1][i] == MISSING) continue;
        check1 = false;
        switch (selectOperator1) {
          case 1:
            if (rvar[selectVar1][i] == selectIfValue1) check1 = true;
            break;
          case 2:
            if (rvar[selectVar1][i] < selectIfValue1)  check1 = true;
            break;
          case 3:
            if (rvar[selectVar1][i] <= selectIfValue1) check1 = true;
            break;
          case 4:
            if (rvar[selectVar1][i] > selectIfValue1)  check1 = true;
            break;
          case 5:
            if (rvar[selectVar1][i] >= selectIfValue1) check1 = true;
            break;
          case 6:
            if (rvar[selectVar1][i] != selectIfValue1) check1 = true;
            break;
        }
        if (check1) {
            for (j = 0; j < numCol; j++) tdvar[j][tnumRow] = rvar[j][[i]];
            tnumRow++
        }
      }  // endof for i      
    }
    else if (selectVar1 >= 0 && selectVar2 >= 0 && selectVar3 < 0) {
      if ( selectIfValue1 == "" || selectIfValue2 == "" ) {
        document.getElementById("selectIfWarning").innerHTML = alertMsg[61][langNum]; // No value entered
        document.getElementById("selectIfWarning").style.display = "block"; 
        return;  
      }
      for (i = 0; i < numRow; i++) {
        if (rvar[selectVar1][i] == MISSING || rvar[selectVar2][i] == MISSING) continue;
        check1 = false;
        switch (selectOperator1) {
          case 1:
            if (rvar[selectVar1][i] == selectIfValue1) check1 = true;
            break;
          case 2:
            if (rvar[selectVar1][i] <  selectIfValue1) check1 = true;
            break;
          case 3:
            if (rvar[selectVar1][i] <= selectIfValue1) check1 = true;
            break;
          case 4:
            if (rvar[selectVar1][i] >  selectIfValue1) check1 = true;
            break;
          case 5:
            if (rvar[selectVar1][i] >= selectIfValue1) check1 = true;
            break;
          case 6:
            if (rvar[selectVar1][i] != selectIfValue1) check1 = true;
            break;
        }
        check2 = false;
        switch (selectOperator2) {
          case 1:
            if (rvar[selectVar2][i] == selectIfValue2) check2 = true;
            break;
          case 2:
            if (rvar[selectVar2][i] <  selectIfValue2) check2 = true;
            break;
          case 3:
            if (rvar[selectVar2][i] <= selectIfValue2) check2 = true;
            break;
          case 4:
            if (rvar[selectVar2][i] >  selectIfValue2) check2 = true;
            break;
          case 5:
            if (rvar[selectVar2][i] >= selectIfValue2) check2 = true;
            break;
          case 6:
            if (rvar[selectVar2][i] != selectIfValue2) check2 = true;
            break;
        }
        if (check1 && check2) {
            for (j = 0; j < numCol; j++) tdvar[j][tnumRow] = rvar[j][[i]];
            tnumRow++
        }
      }  // endof for i      
    }
    else if (selectVar1 >= 0 && selectVar2 >= 0 && selectVar3 >= 0) {
      if ( selectIfValue1 == "" || selectIfValue2 == "" || selectIfValue3 == "" ) {
        document.getElementById("selectIfWarning").innerHTML = alertMsg[61][langNum]; // No value entered
        document.getElementById("selectIfWarning").style.display = "block"; 
        return;  
      }
      for (i = 0; i < numRow; i++) {
        if (rvar[selectVar1][i] == MISSING || rvar[selectVar2][i] == MISSING || rvar[selectVar3][i] == MISSING) continue;
        check1 = false;
        switch (selectOperator1) {
          case 1:
            if (rvar[selectVar1][i] == selectIfValue1) check1 = true;
            break;
          case 2:
            if (rvar[selectVar1][i] <  selectIfValue1) check1 = true;
            break;
          case 3:
            if (rvar[selectVar1][i] <= selectIfValue1) check1 = true;
            break;
          case 4:
            if (rvar[selectVar1][i] >  selectIfValue1) check1 = true;
            break;
          case 5:
            if (rvar[selectVar1][i] >= selectIfValue1) check1 = true;
            break;
          case 6:
            if (rvar[selectVar1][i] != selectIfValue1) check1 = true;
            break;
        }
        check2 = false;
        switch (selectOperator2) {
          case 1:
            if (rvar[selectVar2][i] == selectIfValue2) check2 = true;
            break;
          case 2:
            if (rvar[selectVar2][i] <  selectIfValue2) check2 = true;
            break;
          case 3:
            if (rvar[selectVar2][i] <= selectIfValue2) check2 = true;
            break;
          case 4:
            if (rvar[selectVar2][i] >  selectIfValue2) check2 = true;
            break;
          case 5:
            if (rvar[selectVar2][i] >= selectIfValue2) check2 = true;
            break;
          case 6:
            if (rvar[selectVar2][i] != selectIfValue2) check2 = true;
            break;
        }
        check3 = false;
        switch (selectOperator2) {
          case 1:
            if (rvar[selectVar3][i] == selectIfValue3) check3 = true;
            break;
          case 2:
            if (rvar[selectVar3][i] <  selectIfValue3) check3 = true;
            break;
          case 3:
            if (rvar[selectVar3][i] <= selectIfValue3) check3 = true;
            break;
          case 4:
            if (rvar[selectVar3][i] >  selectIfValue3) check3 = true;
            break;
          case 5:
            if (rvar[selectVar3][i] >= selectIfValue3) check3 = true;
            break;
          case 6:
            if (rvar[selectVar3][i] != selectIfValue3) check3 = true;
            break;
        }
        if (check1 && check2 && check3) {
            for (j = 0; j < numCol; j++) tdvar[j][tnumRow] = rvar[j][[i]];
            tnumRow++
        }
      }  // endof for i      
    }
    // select if 에 맞는 데이터가 없으면
    if (tnumRow == 0) {
      document.getElementById("selectIfWarning").innerHTML = alertMsg[63][langNum]; // No data which satisfies conditions.
      document.getElementById("selectIfWarning").style.display = "block"; 
      return;
    }
    // Clear data
    for (j = 0; j < numCol; j++) { 
      for (i = 0; i < numRow; i++) {
        data[i][j] = null;
      }
    }
    numRow = tnumRow;
    // find new rvalue[j]
    for (j = 0; j < numCol; j++) { 
      for (i = 0; i < rvalueNum[j]; i++) {
        rvalue[j][i] = null;
      }
      for (i = 0; i < numRow; i++) {
        dataA[i] = tdvar[j][i];
      }
      rvalueNum[j] = sortAscendAlpha(numRow, dataA, dataValue, dvalueFreq);
      for (k = 0; k < rvalueNum[j]; k++) rvalue[j][k] = dataValue[k];
    }
    // dump tdvar[][] => rvar[][]
    for (j = 0; j < numCol; j++) {
      for (i = 0; i < numRow; i++) {
        rvar[j][i] = tdvar[j][i]
        if (rvar[j][i] == MISSING) data[i][j] = null;
        else data[i][j] = rvar[j][i];
      }
    }
    // 시트 업데이트
    datasheet.updateSettings({
        data: data, 
        colHeaders: rvarName,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    updateVarList();
    document.getElementById("loadFileName").value = "Untitled.csv";
}) // endof select If
// EditVar - SelectIf 나가기
d3.select("#cancelSelectIf").on("click", function() {
    clearSelectIfBox();
    if (typeof(numRow) == 'undefined') {
      $("#sub14").dialog("close");
    }
    openEditVar('valueLabel')
    $("#sub14").dialog("close");
})
function clearSelectIfBox() {
    document.getElementById("varlistSelectIf1").value = 0;
    document.getElementById("varlistSelectIf2").value = 0;
    document.getElementById("varlistSelectIf3").value = 0;
    document.getElementById("selectIf1").value = "";
    document.getElementById("selectIf2").value = "";
    document.getElementById("selectIf3").value = "";
    document.getElementById("selectIfWarning").innerHTML = "";
    document.getElementById("selectIfWarning").style.display = "none"; 
    var list = document.getElementById("varlistSelectIf1");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    list = document.getElementById("varlistSelectIf2");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    list = document.getElementById("varlistSelectIf3");
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    document.getElementById("varlistOperatorSelectIf1").value = "";
    document.getElementById("varlistOperatorSelectIf2").value = "";
    document.getElementById("varlistOperatorSelectIf3").value = "";
    document.getElementById("selectIf1").value = "";
    document.getElementById("selectIf2").value = "";
    document.getElementById("selectIf3").value = "";
}
// EditVar Tab 처리
function openEditVar(eventName) {
  var opt, temp, tempStr; 
  if (eventName == 'valueLabel') {
    document.getElementById('valueLabel').style.display = "block";
    document.getElementById('sorting').style.display    = "none";
    document.getElementById('compute').style.display    = "none";
    document.getElementById('category').style.display   = "none";
    document.getElementById('recode').style.display     = "none";
    document.getElementById('selectIf').style.display   = "none";
    document.getElementById('valueLabelBtn').style.background = "#dad8d8";
    document.getElementById('sortingBtn').style.background    = "#f1f1f1";
    document.getElementById('categoryBtn').style.background   = "#f1f1f1";
    document.getElementById('recodeBtn').style.background     = "#f1f1f1";
    document.getElementById('computeBtn').style.background    = "#f1f1f1";
    document.getElementById('selectIfBtn').style.background   = "#f1f1f1";
    document.getElementById("valueLabelWarning").innerHTML = "";
    document.getElementById("valueLabelWarning").style.display = "none"; 
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("valueLabelWarning").innerHTML = alertMsg[55][langNum];
      document.getElementById("valueLabelWarning").style.display = "block"; 
    }
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlist").appendChild(opt);
    }
    document.getElementById("varlist").value = 1;
  }
  else if (eventName == 'sorting') {
    document.getElementById('valueLabel').style.display = "none";
    document.getElementById('sorting').style.display    = "block";
    document.getElementById('compute').style.display    = "none";
    document.getElementById('category').style.display   = "none";
    document.getElementById('recode').style.display     = "none";
    document.getElementById('selectIf').style.display   = "none";
    document.getElementById('valueLabelBtn').style.background = "#f1f1f1";
    document.getElementById('sortingBtn').style.background    = "#dad8d8";
    document.getElementById('categoryBtn').style.background   = "#f1f1f1";
    document.getElementById('recodeBtn').style.background     = "#f1f1f1";
    document.getElementById('computeBtn').style.background    = "#f1f1f1";
    document.getElementById('selectIfBtn').style.background   = "#f1f1f1";
    document.getElementById("sortingWarning0").innerHTML = "";
    document.getElementById("sortingWarning0").style.display = "none"; 
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("sortingWarning0").innerHTML = alertMsg[55][langNum];
      document.getElementById("sortingWarning0").style.display = "block"; 
    }
    // Sorting 1
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSorting1").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSorting1").appendChild(opt);
    }
    document.getElementById("varlistSorting1").value = 0;
    // Sorting 2
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSorting2").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSorting2").appendChild(opt);
    }
    document.getElementById("varlistSorting2").value = 0;
    // Sorting 3
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSorting3").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSorting3").appendChild(opt);
    }
    document.getElementById("varlistSorting3").value = 0;
  }
  else if (eventName == 'category') {
    document.getElementById('valueLabel').style.display = "none";
    document.getElementById('sorting').style.display    = "none";
    document.getElementById('compute').style.display    = "none";
    document.getElementById('category').style.display   = "block";
    document.getElementById('recode').style.display     = "none";
    document.getElementById('selectIf').style.display   = "none";
    document.getElementById('valueLabelBtn').style.background = "#f1f1f1";
    document.getElementById('sortingBtn').style.background    = "#f1f1f1";
    document.getElementById('categoryBtn').style.background   = "#dad8d8";
    document.getElementById('recodeBtn').style.background     = "#f1f1f1";
    document.getElementById('computeBtn').style.background    = "#f1f1f1";
    document.getElementById('selectIfBtn').style.background   = "#f1f1f1";
    document.getElementById("categoryWarning0").innerHTML = "";
    document.getElementById("categoryWarning0").style.display = "none"; 
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("categoryWarning0").innerHTML = alertMsg[55][langNum];
      document.getElementById("categoryWarning0").style.display = "block"; 
    }
    document.getElementById("newCategoryVar").value     = "V" + (numCol+1).toString();
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistCategory").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistCategory").appendChild(opt);
    }
    document.getElementById("varlistCategory").value = 0;
  }
  else if (eventName == 'recode') {
    document.getElementById('valueLabel').style.display = "none";
    document.getElementById('sorting').style.display    = "none";
    document.getElementById('compute').style.display    = "none";
    document.getElementById('category').style.display   = "none";
    document.getElementById('recode').style.display     = "block";
    document.getElementById('selectIf').style.display   = "none";
    document.getElementById("newRecodeVar").value       = "V" + (numCol+1).toString();
    document.getElementById("newRecodeVar").disabled    = true;
    document.getElementById('valueLabelBtn').style.background = "#f1f1f1";
    document.getElementById('sortingBtn').style.background    = "#f1f1f1";
    document.getElementById('categoryBtn').style.background   = "#f1f1f1";
    document.getElementById('recodeBtn').style.background     = "#dad8d8";
    document.getElementById('computeBtn').style.background    = "#f1f1f1";
    document.getElementById('selectIfBtn').style.background   = "#f1f1f1";
    document.getElementById("recodeWarning0").innerHTML = "";
    document.getElementById("recodeWarning0").style.display = "none"; 
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("recodeWarning0").innerHTML = alertMsg[55][langNum];
      document.getElementById("recodeWarning0").style.display = "block"; 
    }
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistRecode").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistRecode").appendChild(opt);
    }
    document.getElementById("varlistRecode").value = 0;
  }
  else if (eventName == 'compute') {
    str1 = "";
    str2 = "";
    document.getElementById('valueLabel').style.display = "none";
    document.getElementById('sorting').style.display    = "none";
    document.getElementById('compute').style.display    = "block";
    document.getElementById('category').style.display   = "none";
    document.getElementById('recode').style.display     = "none";
    document.getElementById('selectIf').style.display   = "none";
    document.getElementById("newComputeVar").value      = "V" + (numCol+1).toString();
    document.getElementById("newComputeVar").disabled   = true;
    document.getElementById("computeFormula").value     = str1;
    document.getElementById('valueLabelBtn').style.background = "#f1f1f1";
    document.getElementById('sortingBtn').style.background    = "#f1f1f1";
    document.getElementById('categoryBtn').style.background   = "#f1f1f1";
    document.getElementById('recodeBtn').style.background     = "#f1f1f1";
    document.getElementById('computeBtn').style.background    = "#dad8d8";
    document.getElementById('selectIfBtn').style.background   = "#f1f1f1";
    document.getElementById("computeWarning0").innerHTML = "";
    document.getElementById("computeWarning0").style.display = "none"; 
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("computeWarning0").innerHTML = alertMsg[55][langNum];
      document.getElementById("computeWarning0").style.display = "block"; 
    }
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("variable");
    opt.appendChild(temp);
    document.getElementById("varlistCompute").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistCompute").appendChild(opt);
    }
    document.getElementById("varlistCompute").value = 0;
  }
  else if (eventName == 'selectIf') {
    document.getElementById('valueLabel').style.display = "none";
    document.getElementById('sorting').style.display    = "none";
    document.getElementById('compute').style.display    = "none";
    document.getElementById('category').style.display   = "none";
    document.getElementById('recode').style.display     = "none";
    document.getElementById('selectIf').style.display   = "block";
    document.getElementById('valueLabelBtn').style.background = "#f1f1f1";
    document.getElementById('sortingBtn').style.background    = "#f1f1f1";
    document.getElementById('categoryBtn').style.background   = "#f1f1f1";
    document.getElementById('recodeBtn').style.background     = "#f1f1f1";
    document.getElementById('computeBtn').style.background    = "#f1f1f1";
    document.getElementById('selectIfBtn').style.background   = "#dad8d8";
    document.getElementById("selectIfWarning0").innerHTML = "";
    document.getElementById("selectIfWarning0").style.display = "none"; 
    document.getElementById("varlistOperatorSelectIf1").value = 0;
    document.getElementById("varlistOperatorSelectIf2").value = 0;
    document.getElementById("varlistOperatorSelectIf3").value = 0;
    if (numRow == 0 || typeof(numRow) == 'undefined') {
      document.getElementById("selectIfWarning0").innerHTML = alertMsg[55][langNum];
      document.getElementById("selectIfWarning0").style.display = "block"; 
    }
    // Select If 1
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSelectIf1").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSelectIf1").appendChild(opt);
    }
    document.getElementById("varlistSelectIf1").value = 0;
    // SelectIf 2
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSelectIf2").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSelectIf2").appendChild(opt);
    }
    document.getElementById("varlistSelectIf2").value = 0;
    // SelectIf 3
    opt = document.createElement("option")
    opt.setAttribute("value", "0"); 
    temp = document.createTextNode("--");
    opt.appendChild(temp);
    document.getElementById("varlistSelectIf3").appendChild(opt);
    for ( i = 0; i < numCol; i++) { 
      opt = document.createElement("option")
      tempStr = (i+1).toString();
      opt.setAttribute("value", tempStr); 
      tempStr = "V"+(i+1).toString();
      if (rvarName[i] != tempStr) tempStr = tempStr+": "+rvarName[i];
      temp = document.createTextNode(tempStr);
      opt.appendChild(temp);
      document.getElementById("varlistSelectIf3").appendChild(opt);
    }
    document.getElementById("varlistSelectIf3").value = 0;
  }
}

// Language Selector
languageNumber = {
    'ko': 0,    'en': 1,    'ja': 2,    'zh': 10,
    'zhTW': 3,
    'fr': 4,
    'de': 5,
    'es': 6,
    'vi': 7,
    'id': 8,
    'mn': 9,
    'pt': 11,
    'gr': 12,
    'ro': 13,
    'th': 14,
    'pl': 15,
    'az': 16,
    'uz': 17,
    'ru': 18,
    'tr': 19,
}
$(document).ready(function() {
    var lang = localStorage.getItem("lang");
    if(lang == null) {
	var navLang = navigator.language || navigator.userLanguage;
	lang = navLang.split("-")[0];
    }
    $('#select_language').val(lang);
    setLanguage(lang);
});
$('#select_language').change(function() {
    var lang = $("#select_language option:selected").val();
    setLanguage(lang);
});
function setLanguage(lang) {
    langNum = languageNumber[lang];
    localStorage.setItem("lang", lang);
    $('[data-msgid]').each(function() {
        var $this = $(this);
        $this.html($message[lang][$this.data('msgid')]);
    });
    graphTitle()
}
