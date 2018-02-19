﻿// language.js

var langNum;
var nLanguage = 4;
var nString   = 60;
var appStr    = new Array(nString);
var svgStr    = new Array(nString);
var svgStrU   = new Array(nString);
var alertMsg  = new Array(nString);
for (var j = 0; j < nString; j++) {
  appStr[j]   = new Array(nLanguage);
  svgStr[j]   = new Array(nLanguage);
  svgStrU[j]  = new Array(nLanguage);
  alertMsg[j] = new Array(nLanguage);
}

// Language Selector
languageNumber = {
    'ko': 0,
    'en': 1,
    'jp': 2,
    'cn': 3,
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
        $this.html($.message[lang][$this.data('msgid')]);
    });
}
// 언어 컨트롤
var lang = localStorage.getItem("lang");
if (lang == null) lang = "en";
if (lang == "ko") langNum = 0;
else if (lang == "en") langNum = 1;
else if (lang == "jp") langNum = 2;
else if (lang == "cn") langNum = 3;
// console.log("eStatU.js langNum="+langNum);

$.message = {}

// Korean
$.message.ko = {
    "eStat : Stat Education SW" : "eStat: 통계교육SW",
    "Filename" : "파일이름",
    "Selected Variables" : "선택변량",
    "Cancel" : "취소",
    "Edit Variables" : "변량편집",
    "Level" : "수준",
    "ElementaryLevel" : "초",
    "MiddleLevel" : "중",
    "UniversityLevel" : "대",
    "Example" : "예제 불러오기",
    "New Sheets" : "새시트",
    "csv Open" : "csv 불러오기",
    "www Open" : "www 불러오기",
    "json Open" : "json 불러오기",
    "csv Save" : "csv 저장",
    "json Save" : "json 저장",
    "Print Sheet" : "시트 Print",
    "Bar Graph" : "막대그래프",
    "Pie Chart" : "원그래프",
    "Band Graph" : "띠그래프",
    "Line Graph" : "꺽은선그래프",
    "Dot Graph" : "점그래프",
    "Histogram" : "히스토그램",
    "Stem & Leaf Plot" : "줄기와 잎그림",
    "Box-Whisker Plot" : "상자그래프",
    "Scatterplot" : "산점도",
    "Frequency Table" : "도수분포표",
    "Basic Statistics" : "기초통계량",
    "Testing Hypothesis &mu;" : "추검정 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "추검정 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "검정 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "검정 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "분산분석",
    "High School Stat Education" : "고등 통계교육",
    "University Stat Education" : "대학 통계교육",
    "Elem Stat Graph Example" : "초중그래프 예",
    "Learning eStat w Example" : "eStat 예제학습",
    "Vertical Separated Bar" : "수직 분리형",
    "Vertical Stacked Bar" : "수직 쌓는형",
    "Vertical Ratio Bar" : "수직 비율형",
    "Vertical Side by Side Bar" : "수직 나란형",
    "Vertical Two Sided Bar" : "수직 양쪽형",
    "Horizontal Separated Bar" : "수평 분리형",
    "Horizontal Stacked Bar" : "수평 쌓는형",
    "Horizontal Ratio Bar" : "수평 비율형",
    "Horizontal Side by Side Bar" : "수평 나란형",
    "Horizontal Two Sided Bar" : "수평 양쪽형",
    "Doughnut Graph" : "도넛그래프",
    "Two Sided Stem & Leaf Plot" : "양쪽형 줄기",
    "Graph Save" : "그래프 저장",
    "Graph Print" : "그래프 Print",
    "Move to Table" : "테이블로 이동",
    "Edit Title" : "제목편집",
    "Table Save" : "테이블 저장",
    "Table Print" : "테이블 인쇄",
    "Frequency" : "도수표시",
    "(Sorting)" : "(정렬)",
    "Raw Data" : "원자료",
    "Descending" : "내림차순",
    "Ascending" : "올림차순",
    "Mean" : "평균",
    "Std Deviation" : "표준편차",
    "Regression" : "회귀선",
    "Frequency Polygon" : "도수분포다각형",
    "Frequency Table" : "도수분포표",
    "Execute New Interval" : "새 구간으로 실행",
    "Interval Start" : "구간시작",
    "Interval Width" : "구간너비",
    "t-test" : "t-검정",
    "Z-test" : "Z-검정",
    "(if Z-test, enter &sigma;)" : "(Z-검정이면 입력)",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "(Confidence Interval)" : "(신뢰구간)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(Z-검정이면, Z<sub>1-&alpha;/2 </sub> 이용)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> 검정",
    "Variance Assumption" : "분산가정",
    "F test" : "F 검정",
    "At least one pair of means is different" : "적어도 한쌍 이상의 평균이 다름",
    "Main Title : " : "주 제목 : ",
    "y title : " : "y축제목 : ",
    "x title : " : "x축제목 : ",
    "Modify" : "수정",
    "Confirm" : "확인",
    "Variable Name" : "변량명",
    "Variable Value" : "변량값",
    "Value Label" : "변량값명",
    "* Less than nine value labels allowed." : "* 9개 이하의 변량값명을 지정할 수 있음",
    "Save" : "저장",
    "Exit" : "나가기",
    "eStatU UnivStatEdu" : "eStatU - 대학 통계교육 SW",
    "eStatH HighStatEdu" : "eStatH - 고등 통계교육 SW",
    "Menu" : "메뉴",
    "Binomial Experiment" : "이항분포실험",
    "Binomial Distribution" : "이항분포",
    "Binomial Prob Table" : "이항분포표",
    "Poisson Distribution" : "포아송분포",
    "Poisson Prob Table" : "포아송분포표",
    "Geometric Distribution" : "기하분포",
    "Geometric Prob Table" : "기하분포표",
    "HyperGeometric Distribution" : "초기하분포",
    "HyperGeometric Prob Table" : "초기하분포표",
    "Exponential Distribution" : "지수분포",
    "Normal Experiment" : "정규분포실험",
    "Normal Distribution" : "정규분포",
    "Normal Approx" : "정규분포근사",
    "t Distribution" : "t 분포",
    "ChiSquare Distribution" : "카이제곱분포",
    "F Distribution" : "F 분포",
    "Sampling" : "표본추출",
    "Population vs Sample" : "모집단과 표본",
    "Population" : "모집단",
    "Sample" : "표본",
    "Exponential" : "지수분포(0.3)",
    "Uniform" : "균등분포(0,1)",    
    "Sample05" : "5% 표본추출",
    "Sample10" : "10% 표본추출",
    "Sample20" : "20% 표본추출",
    "Statistics/BoxPlot" : "통계량/상자그림",
    "Law of Large Number" : "대수의 법칙",
    "Dist of Sample Means" : "표본평균의 표집분포",
    "Sample Size" : "표본크기",
    "Confidence Interval" : "신뢰구간",
    "Estimation Accuracy" : "추정 정확도",
    "Repetition" : "반복수",
    "Confidence Level" : "신뢰수준",
    "Testing Hypothesis mu_title" : "추검정 모평균",
    "Testing Hypothesis mu_title" : "추검정 모평균",
    "Testing Hypothesis sigma_title" : "추검정 모분산",
    "Testing Hypothesis P_title" : "추검정 모비율",
    "Testing Hypothesis mu12_title" : "두 모평균 가설검정",
    "Testing Hypothesis sigma12_title" : "두 모분산 가설검정",
    "Testing Hypothesis P12_title" : "두 모비율 검정",
    "Testing Hypothesis mu" : "추정 및 가설검정 : 모평균 &mu;",
    "Testing Hypothesis sigma" : "추정 및 가설검정 : 모분산 &sigma;<sup>2</sup>",
    "Testing Hypothesis P" : "추정 및 가설검정 : 모비율 P",
    "Testing Hypothesis mu12" : "가설검정 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12" : "가설검정 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12" : "가설검정 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA" : "분산분석",
    "Testing Independence" : "독립성 검정",
    "Correlation Coefficient" : "상관계수",
    "Regression Experiment" : "회귀실험",
    "Hypothesis" : "가  설",
    "Test Type" : "검정형태",
    "Z-test" : "Z-검정",
    "t-test" : "t-검정",
    "Chi-test" : "&chi;<sup>2</sup>-검정",
    "F-test" : "F-검정",
    "Significance Level" : "유의수준",
    "Sample Data" : "표본자료",
    "input either sample data" : "(표본자료를 여기 입력, 아니면 다음 표본통계량을 입력(공란, 콤마로 구분)",
    "Sample Statistics" : "표본통계량",
    "Sample Mean" : "표본평균",
    "Sample Variance" : "표본분산",
    "Sample Proportion" : "표본비율",
    "Confidence Interval" : "신뢰구간",
    "if Z-test-1" : "(Z-검정이면, 모분산 입력)",
    "if Z-test-2" : "(Z-검정이면, Z<sub>1-&alpha;/2 </sub> 이용)",
    "Execute" : "실행",
    "Variance Assumption" : "분산가정",
    "At least one pair" : "적어도 한쌍 이상의 평균이 다름",
    "Row-Col-0" : "행변량과 열변량이 독립",
    "Row-Col-1" : "행변량과 열변량이 독립 아님",
    "Enter any number of row" : "(왼쪽 위 셀부터 행과 열의 관측도수 입력)",
    "Row" : "행",
    "Column" : "열",
    "Show Probability" : "확률표시",
    "Regression Line" : "회귀선",
    "Erase All" : "화면 지우기",
    "Add Point" : "점 더하기",
    "Erase Point" : "점 지우기",
    "Reference Site" : "참고사이트",
    "Lot Size" : "로트 개수",
    "Defect Size" : "불량 개수",
    "If typed" : "(숫자입력한 경우)",
    "Stat/BoxPlot" : "통계량/상자그림",
    "Mean" : "평균",
    "Std Dev" : "표준편차",
}
// Korean
appStr[1][0] = "../eStatH/index.html";
appStr[2][0] = "../eStatU/index.html";
appStr[3][0] = "../eStatE/index.html";
appStr[4][0] = "../ExLearning/index.html";
appStr[5][0] = "index_en.html";

alertMsg[1][0]  = "선택된 변량중에 자료가 없는 것이 있습니다!";
alertMsg[2][0]  = "시트에서 분석을 원하는 변량를 선택(변량번호 클릭)한 후 버튼을 눌러주세요!  변량이 2개 이상일 경우 첫 선택변량는 그룹변량이 됩니다. ";
alertMsg[3][0]  = "선택된 열에 결측치가 있습니다.";
alertMsg[4][0]  = "각 열의 자료수가 다르거나 결측치가 있으면 처리를 할 수 없습니다.";
alertMsg[5][0]  = "그룹의 수가 너무 많으면 화면의 사이즈가 작아 그래프가 겹처보일 수 있습니다.";
alertMsg[6][0]  = "요약자료의 분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[7][0]  = "원시자료에서 두 개이상 선택된 변량에 대해서는 그래프를 그리거나 표를 만들 수 없습니다.";
alertMsg[8][0]  = "점그림은 데이터 수가 200개 이하일때 가능합니다.";
alertMsg[9][0]  = "줄기와 잎 그림은 데이터 수가 100개 이하일때 가능합니다.";
alertMsg[12][0] = "분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[14][0] = "요약자료는 연속형 그래프나 가설검정에 적합치 않습니다";
alertMsg[16][0] = "두 개의 그룹에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[17][0] = "산점도는 최소 x축변량 y축량이 필요합니다."; 
alertMsg[18][0] = "네 개이상 선택된 변량에 대해서는 산점도를 그릴 수 없습니다.";
alertMsg[19][0] = "X축데이터에 문자가 있어 산점도를 처리할수 없습니다";
alertMsg[20][0] = "Y축데이터에 문자가 있어 산점도를 처리할수 없습니다";
alertMsg[21][0] = "자료에 결측치가 있으면 저장할 수 없습니다.";
alertMsg[22][0] = "음수자료의 막대그래프는 그릴 수 없습니다."; 
alertMsg[25][0] = "한그룹의 경우 쌓는형 막대그래프는 그릴 수 없습니다."; 
alertMsg[27][0] = "한그룹의 경우 비율형 막대그래프는 그릴 수 없습니다."; 
alertMsg[29][0] = "한그룹의 경우 나란형 막대그래프는 그릴 수 없습니다."; 
alertMsg[31][0] = "한그룹의 경우 양쪽형 막대그래프는 그릴 수 없습니다."; 
alertMsg[32][0] = "음수자료의 원그래프는 그릴 수 없습니다."; 
alertMsg[33][0] = "음수자료의 도넛그래프는 그릴 수 없습니다."; 
alertMsg[34][0] = "음수자료의 띠그래프는 그릴 수 없습니다."; 
alertMsg[35][0] = "음수자료의 도수분포표는 표시할 수 없습니다."; 
alertMsg[36][0] = "두 그룹에 대해서만 양쪽형 그래프를 그릴 수 있습니다.";
alertMsg[37][0] = "한 (분석변량)에 대해서만 가설검정을 할 수 있습니다."; 
alertMsg[38][0] = "mu is NaN . Ener value and then retry!";
alertMsg[39][0] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][0] = "input variance is NaN . Ener value and then retry!";
alertMsg[41][0] = "두 변량 (그룹변량과 분석변량)에 대해서만 가설검정을 할 수 있습니다."; 
alertMsg[42][0] = "가설검정의 제목은 편집할 수 없습니다! ";

svgStr[1][0]  = " 막대그래프";        	
svgStr[2][0]  = " 원그래프";   		
svgStr[3][0]  = " 도넛그래프";       	
svgStr[4][0]  = " 띠그래프";          	
svgStr[5][0]  = " 꺽은선그래프";       	
svgStr[6][0]  = " 점그래프";         	
svgStr[7][0]  = " 상자그래프";         	
svgStr[8][0]  = " 줄기와 잎 그림";     	
svgStr[9][0]  = " 히스토그램";         	
svgStr[10][0] = " 산점도";           	
svgStr[11][0] = " 모평균 가설검정";      
svgStr[12][0] = " 모분산 가설검정";    	
svgStr[13][0] = " 두 모평균 가설검정";   
svgStr[14][0] = " 두 모분산 가설검정";   
svgStr[15][0] = " 분산분석"; 
svgStr[16][0] = "도 수"; 
svgStr[17][0] = "비 율";
svgStr[18][0] = "그룹";
svgStr[19][0] = "의 ";
svgStr[20][0] = "<h3>요약자료<br>도수분포표</h3>";
svgStr[21][0] = "그룹변량";
svgStr[22][0] = "행변량";
svgStr[23][0] = "합계";   
svgStr[24][0] = "합  계";
svgStr[25][0] = "<h3>도수분포표</h3>";
svgStr[26][0] = "분석변량";
svgStr[27][0] = "변량값";
svgStr[28][0] = "변량값명";
svgStr[29][0] = "도수";
svgStr[30][0] = "백분률(%)"; 
svgStr[31][0] = "<h3>교차표</h3>";
svgStr[32][0] = "열변량";
svgStr[33][0] = "행변량";
svgStr[34][0] = "평균"
svgStr[35][0] = "표준편차"
svgStr[36][0] = "<h3> 구간별<br>도수분포표</h3>";
svgStr[37][0] = "그룹명";
svgStr[38][0] = "계급구간";
svgStr[39][0] = "줄기";
svgStr[40][0] = " 잎";
svgStr[41][0] = "그룹 1  잎";
svgStr[42][0] = "그룹 2  잎"
svgStr[43][0] = "<h3>기초통계량</h3>";
svgStr[44][0] = "자료수";  
svgStr[45][0] = "최솟값";  
svgStr[46][0] = "중앙값"; 
svgStr[47][0] = "최댓값";  
svgStr[48][0] = "전체";

svgStrU[1][0]  = "이항분포";        	
svgStrU[2][0]  = "반복수";   		
svgStrU[3][0]  = "평균";       	
svgStrU[4][0]  = "표준편차";          	
svgStrU[5][0]  = "포아송분포";       	
svgStrU[6][0]  = "기하분포";         	
svgStrU[7][0]  = "초기하분포";         	
svgStrU[8][0]  = "모집단";     	
svgStrU[9][0]  = "표본의 분포";         	
svgStrU[10][0] = "대수의 법칙";           	
svgStrU[11][0] = "뒷면";      
svgStrU[12][0] = "앞면";    	
svgStrU[13][0] = "동전 앞면";   
svgStrU[14][0] = "  앞면의 수  ";   
svgStrU[15][0] = "  시행 횟수  "; 
svgStrU[16][0] = "표본평균들의 분포"; 
svgStrU[17][0] = "반복";
svgStrU[18][0] = "표준오차";
svgStrU[19][0] = "모평균";
svgStrU[20][0] = "신뢰구간";
svgStrU[21][0] = "추정정확도";
svgStrU[22][0] = "표본평균";
svgStrU[23][0] = "[검정통계량] = ";   
svgStrU[24][0] = "분포";
svgStrU[25][0] = "기각 Ho";
svgStrU[26][0] = "채택 Ho";
svgStrU[27][0] = "p-값 = ";
svgStrU[28][0] = "[의사결정] ";
svgStrU[29][0] = "[분산분석]";
svgStrU[30][0] = "상관계수를 입력하고 실행버튼을 누르세요."; 
svgStrU[31][0] = "회귀선";
svgStrU[32][0] = "열변량";
svgStrU[33][0] = "행변량";
svgStrU[34][0] = "평균"
svgStrU[35][0] = "표준편차"
svgStrU[36][0] = "<h3> 구간별<br>도수분포표</h3>";
svgStrU[37][0] = "그룹명";
svgStrU[38][0] = "계급구간";
svgStrU[39][0] = "줄기";
svgStrU[40][0] = " 잎";
svgStrU[41][0] = "그룹 1  잎";
svgStrU[42][0] = "그룹 2  잎"
svgStrU[43][0] = "<h3>기초통계량</h3>";
svgStrU[44][0] = "자료수";  
svgStrU[45][0] = "최솟값";  
svgStrU[46][0] = "중앙값"; 
svgStrU[47][0] = "최댓값";  
svgStrU[48][0] = "전체";
svgStrU[49][0] = "지수분포";
svgStrU[50][0] = "균등분포";
svgStrU[51][0] = "추정 정확도";
svgStrU[52][0] = "- 마우스 클릭으로 점을 세 개 이상 만들면 회귀선이 그려짐";
svgStrU[53][0] = "- 마우스로 한 점을 이동/지우기 하면서 회귀선 변화를 관측";
svgStrU[54][0] = "[표본 통계량] ";
svgStrU[55][0] = "[표본 1 통계량] "
svgStrU[56][0] = "[표본 2 통계량] "
svgStrU[57][0] = "신뢰수준";
svgStrU[58][0] = "";
svgStrU[59][0] = "";

// English
$.message.en = {
    "eStat : Stat Education SW" : "eStat : Stat Education SW",
    "Filename" : "File Name",
    "Selected Variables" : "Var Select",
    "Cancel" : "Cancel",
    "Edit Variables" : "EditVar",
    "Level" : "Level",
    "ElementaryLevel" : "E",
    "MiddleLevel" : "M",
    "UniversityLevel" : "U",
    "Example" : "Example",
    "New Sheets" : "New Sheets",
    "csv Open" : "csv Open",
    "www Open" : "www Open",
    "json Open" : "json Open",
    "csv Save" : "csv Save",
    "json Save" : "json Save",
    "Print Sheet" : "Print Sheet",
    "Bar Graph" : "Bar Graph",
    "Pie Chart" : "Pie Chart",
    "Band Graph" : "Band Graph",
    "Line Graph" : "Line Graph",
    "Dot Graph" : "Dot Graph",
    "Histogram" : "Histogram",
    "Stem & Leaf Plot" : "Stem & Leaf Plot",
    "Box-Whisker Plot" : "Box-Whisker Plot",
    "Scatterplot" : "Scatterplot",
    "Frequency Table" : "Frequency Table",
    "Basic Statistics" : "Basic Statistics",
    "Testing Hypothesis &mu;" : "Testing Hypothesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "Testing Hypothesis &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "Analysis of Variance",
    "High School Stat Education" : "High School Stat Education",
    "University Stat Education" : "University Stat Education",
    "Elem Stat Graph Example" : "Elem Stat Graph Example",
    "Learning eStat w Example" : "Learning eStat w Example",
    "Vertical Separated Bar" : "Vertical Separated Bar",
    "Vertical Stacked Bar" : "Vertical Stacked Bar",
    "Vertical Ratio Bar" : "Vertical Ratio Bar",
    "Vertical Side by Side Bar" : "Vertical Side by Side Bar",
    "Vertical Two Sided Bar" : "Vertical Two Sided Bar",
    "Horizontal Separated Bar" : "Horizontal Separated Bar",
    "Horizontal Stacked Bar" : "Horizontal Stacked Bar",
    "Horizontal Ratio Bar" : "Horizontal Ratio Bar",
    "Horizontal Side by Side Bar" : "Horizontal Side by Side Bar",
    "Horizontal Two Sided Bar" : "Horizontal Two Sided Bar",
    "Doughnut Graph" : "Doughnut Graph",
    "Two Sided Stem & Leaf Plot" : "Two Sided Stem & Leaf Plot",
    "Graph Save" : "Graph Save",
    "Graph Print" : "Graph Print",
    "Move to Table" : "Move to Table",
    "Edit Title" : "Edit Title",
    "Table Save" : "Table Save",
    "Table Print" : "Table Print",
    "Frequency" : "Frequency",
    "(Sorting)" : "(Sorting)",
    "Raw Data" : "Raw Data",
    "Descending" : "Descending",
    "Ascending" : "Ascending",
    "Mean" : "Mean",
    "Std Deviation" : "Std Deviation",
    "Regression" : "Regression",
    "Frequency Polygon" : "Frequency Polygon",
    "Frequency Table" : "Frequency Table",
    "Execute New Interval" : "Execute New Interval",
    "Interval Start" : "Interval Start",
    "Interval Width" : "Interval Width",
    "t-test" : "t-test",
    "Z-test" : "Z-test",
    "(if Z-test, enter &sigma;)" : "(if Z-test, enter &sigma;)",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "(Confidence Interval)" : "(Confidence Interval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> test",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "Variance Assumption" : "Variance Assumption",
    "F test" : "F test",
    "Significance Level" : "Significance Level",
    "At least one pair of means is different" : "At least one pair of means is different",
    "Main Title : " : "Main Title : ",
    "y title : " : "y title : ",
    "x title : " : "x title : ",
    "Modify" : "Modify",
    "Confirm" : "Confirm",
    "Variable Name" : "Variable Name",
    "Variable Value" : "Variable Value",
    "Value Label" : "Value Label",
    "* Less than nine value labels allowed." : "* Less than nine value labels allowed.",
    "Save" : "Save",
    "Exit" : "Exit",

    "eStatU UnivStatEdu" : "eStatU - University Statistics Education SW",
    "eStatH HighStatEdu" : "eStatH - High School Statistics Education SW",
    "Menu" : "Menu",
    "Binomial Experiment" : "Binomial Experiment",
    "Binomial Distribution" : "Binomial Distribution",
    "Binomial Prob Table" : "Binomial Prob Table",
    "Poisson Distribution" : "Poisson Distribution",
    "Poisson Prob Table" : "Poisson Prob Table",
    "Geometric Distribution" : "Geometric Distribution",
    "Geometric Prob Table" : "Geometric Prob Table",
    "HyperGeometric Distribution" : "HyperGeometric Distribution",
    "HyperGeometric Prob Table" : "HyperGeometric Prob Table",
    "Exponential Distribution" : "Exponential Distribution",
    "Normal Experiment" : "Normal Experiment",
    "Normal Distribution" : "Normal Distribution",
    "Normal Approx" : "Normal Approx",
    "t Distribution" : "t Distribution",
    "ChiSquare Distribution" : "ChiSquare Distribution",
    "F Distribution" : "F Distribution",
    "Sampling" : "Sampling",
    "Population vs Sample" : "Population vs Sample",
    "Population" : "Population",
    "Sample" : "Sample",
    "Exponential" : "Exponential(0.3)",
    "Uniform" : "Uniform(0,1)",    
    "Sample05" : "Sampling 5%",
    "Sample10" : "Sampling 10%",
    "Sample20" : "Sampling 20%",
    "Statistics/BoxPlot" : "Statistics/BoxPlot",
    "Law of Large Number" : "Law of Large Number",
    "Dist of Sample Means" : "Dist of Sample Means",
    "Sample Size" : "Sample Size",
    "Confidence Interval" : "Confidence Interval",
    "Estimation Accuracy" : "Estimation Accuracy",
    "Repetition" : "Repetition",
    "Confidence Level" : "Confidence Level",
    "Testing Hypothesis mu_title" : "Testing Mean",
    "Testing Hypothesis sigma_title" : "Testing Variance",
    "Testing Hypothesis P_title" : "Testing Proportion",
    "Testing Hypothesis mu12_title" : "Testing Two Means",
    "Testing Hypothesis sigma12_title" : "Testing Two Variances",
    "Testing Hypothesis P12_title" : "Testing Two Proportions",
    "Testing Hypothesis mu" : "Testing Hypothesis &mu;",
    "Testing Hypothesis sigma" : "Testing Hypothesis &sigma;<sup>2</sup>",
    "Testing Hypothesis P" : "Testing Hypothesis P",
    "Testing Hypothesis mu12" : "Testing Hypothesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12" : "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12" : "Testing Hypothesis P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA" : "Testing Hypothesis ANOVA",
    "Testing Independence" : "Testing Independence",
    "Correlation Coefficient" : "Correlation Coeff",
    "Regression Experiment" : "Regression Experiment",
    "Hypothesis" : "Hypothesis",
    "Test Type" : "Test Type",
    "Z-test" : "Z-test",
    "t-test" : "t-test",
    "Chi-test" : "&chi;<sup>2</sup>-test",
    "F-test" : "F-test",
    "Significance Level" : "Significance Level",
    "Sample Data" : "Sample Data",
    "input either sample data" : "Input either sample data, or sample statistics at the next boxes usign csv/bsv",
    "Sample Statistics" : "Sample Statistics",
    "Sample Mean" : "Sample Mean",
    "Sample Variance" : "Sample Variance",
    "Sample Proportion" : "Sample Proportion",
    "Confidence Interval" : "Confidence Interval",
    "if Z-test-1" : "(if Z-test, enter population variance &sigma;<sup>2</sup>)",
    "if Z-test-2" : "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used.)",
    "Execute" : "Execute",
    "Variance Assumption" : "Variance Assumption",
    "Significance Level" : "Significance Level",
    "At least one pair" : "At least one pair of means is different",
    "Row-Col-0" : "Row and column variables are independent",
    "Row-Col-1" : "Row and column variables are not independent",
    "Enter any number of row" : "(Enter observation from upper left cell)",
    "Row" : "Row",
    "Column" : "Column",
    "Show Probability" : "Show Probability",
    "Regression Line" : "Regression Line",
    "Erase All" : "Erase Screen",
    "Add Point" : "Add Point",
    "Erase Point" : "Erase Point",
    "Reference Site" : "Reference Site",
    "Lot Size" : "Lot Size",
    "Defect Size" : "Defect Size",
    "If typed" : "(If number is typed)",
    "Stat/BoxPlot" : "Stat/BoxPlot",
    "Mean" : "Mean",
    "Std Dev" : "Std Dev",
}

// English
appStr[1][1] = "../eStatH/index.html";
appStr[2][1] = "../eStatU/index.html";
appStr[3][1] = "../eStatE/index_en.html";
appStr[4][1] = "../ExLearning/index_en.html";
appStr[5][1] = "index.html";

alertMsg[1][1]  = "One of the selected variables does not have data.";
alertMsg[2][1]  = "Select variables for analysis (clicking column names) one by one. If two variables, first one is group variable. ";
alertMsg[3][1]  = "Missing data on the selected variable.";
alertMsg[4][1]  = "If observations of the selected variables are different or observations are different, analysis is not allowed.";
alertMsg[5][1]  = "Too many groups! Graphs may be overlapped due to size of the screen.";
alertMsg[6][1]  = "If the analysis variable in summary data includes character, analysis or creating table is not allowed.";
alertMsg[7][1]  = "If more than three variables are selected on raw data, analysis or creating table is not allowed.";
alertMsg[8][1]  = "Dot Graph is allowd if the number of observation is less than 200.";
alertMsg[9][1]  = "Stem & Leaf Plot is allowd if the number of observation is less than 100.";
alertMsg[12][1] = "If the analysis variable includes characters, analysis or creating table is not allowed.";
alertMsg[14][1] = "Summary data is not allowed for continuous graphs and testing hypothesis.";
alertMsg[16][1] = "Only two groups are allowed for this tesitng hypothesis.";
alertMsg[17][1] = "Scatter plot requires at least x variable and y variable."; 
alertMsg[18][1] = "More than three variables are not allowed for scatter plot.";
alertMsg[19][1] = "If there is a character on X variable, scatter plot cannot be drawn.";
alertMsg[20][1] = "If there is a character on Y variable, scatter plot cannot be drawn.";
alertMsg[21][1] = "If there is a missing data, save is not allowed.";
alertMsg[22][1] = "If there is a negative number, bargraph cannot be drawn."; 
alertMsg[25][1] = "If there is only one group, stacked bar graph is not allowed."; 
alertMsg[27][1] = "If there is only one group, ratio bar graph is not allowed."; 
alertMsg[29][1] = "If there is only one group, side-by-side bar graph is not allowed."; 
alertMsg[31][1] = "If there is only one group, both-side bar graph is not allowed."; 
alertMsg[32][1] = "If there is a negative number, piechart cannot be drawn."; 
alertMsg[33][1] = "If there is a negative number, donut graph cannot be drawn."; 
alertMsg[34][1] = "If there is a negative number, band graph cannot be drawn."; 
alertMsg[35][1] = "If there is a negative number, frequency table cannot be drawn."; 
alertMsg[36][1] = "This bar graph is allowed only for two groups.";
alertMsg[37][1] = "This testing hypothesis is allowed only for one variable."; 
alertMsg[38][1] = "mu is NaN . Ener value and then retry!";
alertMsg[39][1] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][1] = "input variance is NaN . Ener value and then retry!";
alertMsg[41][1] = "This testing hypothesis is allowed only for two variable. Group variable should have only two groups";  
alertMsg[42][1] = "Title editing of testing hypothesis is not allowed! ";

svgStr[1][1]  = " Bar Graph";        	
svgStr[2][1]  = " Pie Chart";   		
svgStr[3][1]  = " Doughnut Graph";       	
svgStr[4][1]  = " Band Graph";          	
svgStr[5][1]  = " Line Graph";       	
svgStr[6][1]  = " Dot Graph";         	
svgStr[7][1]  = " Box-Whisker Plot";         	
svgStr[8][1]  = " Stem and Leaf Plot";     	
svgStr[9][1]  = " Histogram";         	
svgStr[10][1] = " Scatter Plot";           	
svgStr[11][1] = " Testing Hypothesis: Population Mean";      
svgStr[12][1] = " Testing Hypothesis: Population Variance";    	
svgStr[13][1] = " Testing Hypothesis: Two Population Means";   
svgStr[14][1] = " Testing Hypothesis: Two Population Variances";   
svgStr[15][1] = " Analysis of Variance"; 
svgStr[16][1] = "Frequency"; 
svgStr[17][1] = "Ratio";
svgStr[18][1] = "Group ";
svgStr[19][1] = " ";
svgStr[20][1] = "<h3>Summary Data<br>Frequency Table</h3>";
svgStr[21][1] = "Group Variable";
svgStr[22][1] = "Row Variable";
svgStr[23][1] = "Total";   
svgStr[24][1] = "Total";
svgStr[25][1] = "<h3>Frequency Table</h3>";
svgStr[26][1] = "Analysis Variable";
svgStr[27][1] = "Var Value";
svgStr[28][1] = "Value Label";
svgStr[29][1] = "Frequency";
svgStr[30][1] = "Percent(%)"; 
svgStr[31][1] = "<h3>Cross Table</h3>";
svgStr[32][1] = "Col Variable";
svgStr[33][1] = "Row Variable";
svgStr[34][1] = "Mean"
svgStr[35][1] = "Std Dev"
svgStr[36][1] = "<h3> Histogram<br>Frequency Table</h3>";
svgStr[37][1] = "Group Name";
svgStr[38][1] = "Interval";
svgStr[39][1] = "Stem";
svgStr[40][1] = " Leaf";
svgStr[41][1] = "Group 1  Leaf";
svgStr[42][1] = "Group 2  Leaf"
svgStr[43][1] = "<h3>Basic Statistics</h3>";
svgStr[44][1] = "Observation";  
svgStr[45][1] = "Minimum";  
svgStr[46][1] = "Median"; 
svgStr[47][1] = "Maximum";  
svgStr[48][1] = "Total";

svgStrU[1][1]  = "Binomial Distribution";        	
svgStrU[2][1]  = "repetition";   		
svgStrU[3][1]  = "Mean";       	
svgStrU[4][1]  = "Std Dev";          	
svgStrU[5][1]  = "Poissson Distribution";       	
svgStrU[6][1]  = "Geometric Distribution";         	
svgStrU[7][1]  = "HyperGeometric Distribution";         	
svgStrU[8][1]  = "Populaton";     	
svgStrU[9][1]  = "Sample Dist";         	
svgStrU[10][1] = "Law of Large Number";           	
svgStrU[11][1] = "Tail";      
svgStrU[12][1] = "Head";    	
svgStrU[13][1] = "Coin Head";   
svgStrU[14][1] = "Number of Heads";   
svgStrU[15][1] = "Number of Trials"; 
svgStrU[16][1] = "Dist of Sample Means"; 
svgStrU[17][1] = "repetition";
svgStrU[18][1] = "std err";
svgStrU[19][1] = "Population Mean";
svgStrU[20][1] = "Confidence Interval";
svgStrU[21][1] = "Estimation Accuracy";
svgStrU[22][1] = "sample mean";
svgStrU[23][1] = "[TestStat] = ";   
svgStrU[24][1] = "Distribution";
svgStrU[25][1] = "Reject Ho";
svgStrU[26][1] = "Accept Ho";
svgStrU[27][1] = " p-value  = ";
svgStrU[28][1] = "[Decision] ";
svgStrU[29][1] = "[ANOVA]";
svgStrU[30][1] = "Enter Correlation Coefficient and click Execute button"; 
svgStrU[31][1] = "Regression";
svgStrU[32][1] = "Row Var";
svgStrU[33][1] = "Col Var";
svgStrU[34][1] = "Mean"
svgStrU[35][1] = "Std Dev"
svgStrU[36][1] = "<h3> Histogram<br>Frequency Table</h3>";
svgStrU[37][1] = "Group Name";
svgStrU[38][1] = "Interval";
svgStrU[39][1] = "Stem";
svgStrU[40][1] = " Leaf";
svgStrU[41][1] = "Group 1  Leaf";
svgStrU[42][1] = "Group 2  Leaf"
svgStrU[43][1] = "<h3>Basic Statistics</h3>";
svgStrU[44][1] = "Observation";  
svgStrU[45][1] = "Minimum";  
svgStrU[46][1] = "Median"; 
svgStrU[47][1] = "Maximum";  
svgStrU[48][1] = "Total";
svgStrU[49][1] = "Exponential";
svgStrU[50][1] = "Uniform";
svgStrU[51][1] = "Estimation Accuracy";
svgStrU[52][1] = "- Create points by click, then eStat finds a regression line.";
svgStrU[53][1] = "- Move or erase a point. Watch change of the regression line.";
svgStrU[54][1] = "[Sample Statistics] ";
svgStrU[55][1] = "[Sample 1 Statistics] ";
svgStrU[56][1] = "[Sample 2 Statistics] ";
svgStrU[57][1] = "confidence level";
svgStrU[58][1] = "";
svgStrU[59][1] = "";


// Japanese
$.message.jp = {
    "eStat : Stat Education SW" : "eStat: 統計教育SW",
    "Filename" : "ファイル名",
    "Selected Variables" : "選択変量",
    "Cancel" : "キャンセル",
    "Edit Variables" : "変量編集",
    "Level" : "レベル",
    "ElementaryLevel" : "小学",
    "MiddleLevel" : "中学",
    "UniversityLevel" : "大学",
    "Example" : "例題データ読み込み",
    "New Sheets" : "新規シート",
    "csv Open" : "csv読み込み",
    "www Open" : "wwwから読み込み",
    "json Open" : "json読み込み",
    "csv Save" : "csv保存",
    "json Save" : "json保存",
    "Print Sheet" : "シートPrint",
    "Bar Graph" : "棒グラフ",
    "Pie Chart" : "円グラフ",
    "Band Graph" : "帯グラフ",
    "Line Graph" : "折れ線グラフ",
    "Dot Graph" : "点グラフ",
    "Histogram" : "ヒストグラム",
    "Stem & Leaf Plot" : "幹葉図",
    "Box-Whisker Plot" : "箱ひげ図",
    "Scatterplot" : "散布図",
    "Frequency Table" : "度数分布表",
    "Basic Statistics" : "基礎統計量",
    "Testing Hypothesis &mu;" : "点推定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "推・検定 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "検定 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "検定 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "分散分析",
    "High School Stat Education" : "高校統計教育",
    "University Stat Education" : "大学統計教育",
    "Elem Stat Graph Example" : "小中学グラフの例",
    "Learning eStat w Example" : "eStat例題学習",
    "Vertical Separated Bar" : "縦分離型",
    "Vertical Stacked Bar" : "縦積み重ね型",
    "Vertical Ratio Bar" : "縦比率型",
    "Vertical Side by Side Bar" : "縦並び型",
    "Vertical Two Sided Bar" : "縦両側型",
    "Horizontal Separated Bar" : "横分離型",
    "Horizontal Stacked Bar" : "横積み重ね型",
    "Horizontal Ratio Bar" : "横比率型",
    "Horizontal Side by Side Bar" : "横並び型",
    "Horizontal Two Sided Bar" : "横両側型",
    "Doughnut Graph" : "ドーナツグラフ",
    "Two Sided Stem & Leaf Plot" : "両側葉図",
    "Graph Save" : "グラフ保存",
    "Graph Print" : "グラフ印刷",
    "Move to Table" : "テーブルへ移動",
    "Edit Title" : "タイトル編集",
    "Table Save" : "テーブル保存",
    "Table Print" : "テーブル印刷",
    "Frequency" : "度数表示",
    "(Sorting)" : "(並べ替え)",
    "Raw Data" : "元データ",
    "Descending" : "降順",
    "Ascending" : "昇順",
    "Mean" : "平均",
    "Std Deviation" : "標準偏差",
    "Regression" : "回帰直線",
    "Frequency Polygon" : "度数分布多角形",
    "Frequency Table" : "度数分布表",
    "Execute New Interval" : "区間を変えた実行",
    "Interval Start" : "区間始点",
    "Interval Width" : "区間の幅",
    "t-test" : "t-検定",
    "Z-test" : "Z-検定",
    "(if Z-test, enter &sigma;)" : "(Z-検定のとき入力)",
    "Significance Level" : "有意水準",
    "Execute" : "実行",
    "(Confidence Interval)" : "(信頼区間)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(Z-検定のとき, Z<sub>1-&alpha;/2 </sub> 利用)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> 検定",
    "Variance Assumption" : "分散仮定",
    "F test" : "F 検定",
    "At least one pair of means is different" : "少なくとも一つ以上のペアの平均が異なる",
    "F test" : "F 検定",
    "Main Title : " : "タイトル : ",
    "y title : " : "y軸タイトル : ",
    "x title : " : "x軸タイトル : ",
    "Modify" : "修正",
    "Confirm" : "確認",
    "Variable Name" : "変数名",
    "Variable Value" : "変数値",
    "Value Label" : "変数ラベル",
    "* Less than nine value labels allowed." : "* 9個以下の変数名を指定することができます.",
    "Save" : "保存",
    "Exit" : "閉じる",
    "eStatU UnivStatEdu" : "eStatU - 大学統計教育 SW",
    "eStatH HighStatEdu" : "eStatH - 高校統計教育 SW",
    "Menu" : "メニュー",
    "Binomial Experiment" : "二項分布実験",
    "Binomial Distribution" : "二項分布",
    "Binomial Prob Table" : "二項分布テーブル",
    "Poisson Distribution" : "ポアソン分布",
    "Poisson Prob Table" : "ポアソン分布テーブル",
    "Geometric Distribution" : "幾何分布",
    "Geometric Prob Table" : "幾何分布テーブル",
    "HyperGeometric Distribution" : "超幾何分布",
    "HyperGeometric Prob Table" : "超幾何分布テーブル",
    "Exponential Distribution" : "指数分布",
    "Normal Experiment" : "正規分布実験",
    "Normal Distribution" : "正規分布",
    "Normal Approx" : "正規分布近似",
    "t Distribution" : "t 分布",
    "ChiSquare Distribution" : "カイ二乗分布",
    "F Distribution" : "F 分布",
    "Sampling" : "サンプル抽出",
    "Population vs Sample" : "母集団とサンプル",
    "Population" : "母集団",
    "Sample" : "サンプル",
    "Exponential" : "指数分布(0.3)",
    "Uniform" : "一様分布(0,1)",    
    "Sample05" : "5% 標本抽出",
    "Sample10" : "10% 標本抽出",
    "Sample20" : "20% 標本抽出",
    "Statistics/BoxPlot" : "統計量/箱ひげ図",
    "Law of Large Number" : "大数の法則",
    "Dist of Sample Means" : "標本平均の標本分布",
    "Sample Size" : "サンプルサイズ",
    "Confidence Interval" : "信頼区間",
    "Estimation Accuracy" : "推定精度",
    "Repetition" : "反復数",
    "Confidence Level" : "信頼水準",
    "Testing Hypothesis mu_title" : "母平均の推定・検定",
    "Testing Hypothesis mu_title" : "母平均の推定・検定",
    "Testing Hypothesis sigma_title" : "母分散の推定・検定",
    "Testing Hypothesis P_title" : "母比率の推定・検定",
    "Testing Hypothesis mu12_title" : "２集団 母平均の仮説検定",
    "Testing Hypothesis sigma12_title" : "２集団母分散仮説検定",
    "Testing Hypothesis P12_title" : "２集団比率検定",
    "Testing Hypothesis mu" : "区間推定/仮説検定:母平均&mu;",
    "Testing Hypothesis sigma" : "区間推定/仮説検定:母分散&sigma;<sup>2</sup>",
    "Testing Hypothesis P" : "区間推定/仮説検定:母比率 P",
    "Testing Hypothesis mu12" : "仮説検定 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12" : "仮説検定 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12" : "仮説検定 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA" : "分散分析",
    "Testing Independence" : "独立性検定",
    "Correlation Coefficient" : "相関係数",
    "Regression Experiment" : "回帰シミュレーション",
    "Hypothesis" : "仮  説",
    "Test Type" : "検定名",
    "Z-test" : "Z-検定",
    "t-test" : "t-検定",
    "Chi-test" : "&chi;<sup>2</sup>-検定",
    "F-test" : "F-検定",
    "Significance Level" : "有意水準",
    "Sample Data" : "標本データ",
    "input either sample data" : "(標本データをここに入力(空白, カンマで区分),又は[標本統計量]欄に直接入力",
    "Sample Statistics" : "標本統計量",
    "Sample Mean" : "標本平均",
    "Sample Variance" : "標本分散",
    "Sample Proportion" : "標本比率",
    "Confidence Interval" : "信頼区間",
    "if Z-test-1" : "(Z-検定の場合, 母分散を入力)",
    "if Z-test-2" : "(Z-検定の場合, Z<sub>1-&alpha;/2 </sub> 使用)",
    "Execute" : "実行",
    "Variance Assumption" : "分散仮定",
    "At least one pair" : "少なくとも一つのペアーの平均が異なる",
    "Row-Col-0" : "行変量と列変量は独立である",
    "Row-Col-1" : "行変量と列変量は独立ではない",
    "Enter any number of row" : "(左上のセルから行と列の観測度数入力)",
    "Row" : "行",
    "Column" : "列",
    "Show Probability" : "確率表示",
    "Regression Line" : "回帰直線",
    "Erase All" : "画面クリア",
    "Add Point" : "点追加",
    "Erase Point" : "点クリア",
    "Reference Site" : "参考サイト",
    "Lot Size" : "ロットの数",
    "Defect Size" : "不良品の数",
    "If typed" : "(数字を入力した場合)",
    "Stat/BoxPlot" : "統計量/箱ひげ図",
    "Mean" : "平均",
    "Std Dev" : "標準偏差",
}

// Japanese
appStr[1][2] = "../eStatH/index.html";
appStr[2][2] = "../eStatU/index.html";
appStr[3][2] = "../eStatE/index_en.html";
appStr[4][2] = "../ExLearning/index_en.html";
appStr[5][2] = "index.html";

alertMsg[1][2]  = "選択した変数の中、欠損値が含まれています!";
alertMsg[2][2]  = "シートから変数を選んで(変数番号クリック)ボタンを押してください! 変数が2つ以上の場合は1番目の変数がグループ変数と指定されます. ";
alertMsg[3][2]  = "選択した列に欠損値があります.";
alertMsg[4][2]  = "各列のデータ数が異なるか欠損値が存在すると処理できません.";
alertMsg[5][2]  = "グループの数が多すぎると画面の都合によりグラフが被ることがあります.";
alertMsg[6][2]  = "要約データの変数に文字が入ってうので、グラフの作成と度数分布表の出力ができません.";
alertMsg[7][2]  = "元データから2以上の変数を選択した場合はグラフや表を作成できません.";
alertMsg[8][2]  = "点プロットはデータの数が200個以下のとき可能です.";
alertMsg[9][2]  = "幹葉図はデータ数が100個以下のときのみ可能です.";
alertMsg[12][2] = "選択変数が文字を含んているためグラフや度数分布表が出力できません.";
alertMsg[14][2] = "要約データの形式は連続型グラフおよび仮説検定に適用できません";
alertMsg[16][2] = "二つのグループのみに対して仮説検定することができます.";
alertMsg[17][2] = "散布図を作成するためにはx軸変数とy軸変数が必要です."; 
alertMsg[18][2] = "4つ以上の変数については散布図を描けることができません.";
alertMsg[19][2] = "X軸データの中に文字が入っているため散布図を描けません";
alertMsg[20][2] = "Y軸データの中に文字が入っているため散布図を描けません";
alertMsg[21][2] = "データに欠損値があると保存できません.";
alertMsg[22][2] = "負の値での棒グラフは描けません."; 
alertMsg[25][2] = "１つのグループの場合, 積み重ね型棒グラフは描けません."; 
alertMsg[27][2] = "１つのグループの場合, 比率型グラフは描けません."; 
alertMsg[29][2] = "１つのグループの場合, 並び型グラフは描けません."; 
alertMsg[31][2] = "１つのグループの場合, 両側型ラフは描けません."; 
alertMsg[32][2] = "負の値での円グラフは描けません."; 
alertMsg[33][2] = "負の値でのドーナツグラフは描けません."; 
alertMsg[34][2] = "負の値での帯グラフは描けません."; 
alertMsg[35][2] = "負の値での度数分布表は表示できません."; 
alertMsg[36][2] = "2グループに対する両側型グラフは描けません.";
alertMsg[37][2] = "一つの変数のみ仮説検定することが可能です."; 
alertMsg[38][2] = "mu is NaN . Ener value and then retry!";
alertMsg[39][2] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][2] = "input variance is NaN . Ener value and then retry!";
alertMsg[41][2] = "2つの変数(グループ変数と解析変数)のみ仮説検定することができます."; 
alertMsg[42][2] = "仮説検定のタイトルは編集できません! ";

svgStr[1][2]  = " 棒グラフ";        	
svgStr[2][2]  = " 円グラフ";   		
svgStr[3][2]  = " ドーナツグラフ";       	
svgStr[4][2]  = " 帯グラフ";          	
svgStr[5][2]  = " 折れ線グラフ";       	
svgStr[6][2]  = " 点グラフ";         	
svgStr[7][2]  = " 箱ひげ図";         	
svgStr[8][2]  = " 幹葉図";     	
svgStr[9][2]  = " ヒストグラム";         	
svgStr[10][2] = " 散布図";           	
svgStr[11][2] = " 母平均仮説検定";      
svgStr[12][2] = " 母分散仮説検定";    	
svgStr[13][2] = " 2群 母平均仮説検定";   
svgStr[14][2] = " 2群 母分散仮説検定";   
svgStr[15][2] = " 分散分析"; 
svgStr[16][2] = "度数"; 
svgStr[17][2] = "比率";
svgStr[18][2] = "グループ";
svgStr[19][2] = "の ";
svgStr[20][2] = "<h3>要約データ<br>度数分布表</h3>";
svgStr[21][2] = "グループ変数";
svgStr[22][2] = "行変数";
svgStr[23][2] = "合計";   
svgStr[24][2] = "合計";
svgStr[25][2] = "<h3>度数分布表</h3>";
svgStr[26][2] = "分析変数";
svgStr[27][2] = "変数値";
svgStr[28][2] = "変数値ラベル";
svgStr[29][2] = "度数";
svgStr[30][2] = "百分率(%)"; 
svgStr[31][2] = "<h3>クロス表</h3>";
svgStr[32][2] = "列変数";
svgStr[33][2] = "行変数";
svgStr[34][2] = "平均"
svgStr[35][2] = "標準偏差"
svgStr[36][2] = "<h3> 区間別<br>度数分布表</h3>";
svgStr[37][2] = "グループ名";
svgStr[38][2] = "階級区間";
svgStr[39][2] = "幹";
svgStr[40][2] = "葉";
svgStr[41][2] = "グループ1の葉";
svgStr[42][2] = "グループ2の葉"
svgStr[43][2] = "<h3>基礎統計量</h3>";
svgStr[44][2] = "データ数";  
svgStr[45][2] = "最小値";  
svgStr[46][2] = "中央値"; 
svgStr[47][2] = "最大値";  
svgStr[48][2] = "全体";

svgStrU[1][2]  = "二項分布";        	
svgStrU[2][2]  = "反復数";   		
svgStrU[3][2]  = "平均";       	
svgStrU[4][2]  = "標準偏差";          	
svgStrU[5][2]  = "ポアソン分布";       	
svgStrU[6][2]  = "幾何分布";         	
svgStrU[7][2]  = "超幾何分布";         	
svgStrU[8][2]  = "母集団";     	
svgStrU[9][2]  = "標本分布";         	
svgStrU[10][2] = "大数の法則";           	
svgStrU[11][2] = "裏";      
svgStrU[12][2] = "表";    	
svgStrU[13][2] = "コイン表";   
svgStrU[14][2] = "  表の数  ";   
svgStrU[15][2] = "  試行回数  "; 
svgStrU[16][2] = "標本平均たちの分布"; 
svgStrU[17][2] = "反復";
svgStrU[18][2] = "標準誤差";
svgStrU[19][2] = "母平均";
svgStrU[20][2] = "信頼区間";
svgStrU[21][2] = "推定精度";
svgStrU[22][2] = "標本平均";
svgStrU[23][2] = "[検定統計量] = ";   
svgStrU[24][2] = "分布";
svgStrU[25][2] = "棄却 Ho";
svgStrU[26][2] = "採択 Ho";
svgStrU[27][2] = "p-値 = ";
svgStrU[28][2] = "[意思決定] ";
svgStrU[29][2] = "[分散分析]";
svgStrU[30][2] = "相関係数を入力し、実行ボタンをクリックしてください."; 
svgStrU[31][2] = "回帰直線";
svgStrU[32][2] = "列変量";
svgStrU[33][2] = "行変量";
svgStrU[34][2] = "平均"
svgStrU[35][2] = "標準偏差"
svgStrU[36][2] = "<h3> 区間別<br>度数分布表</h3>";
svgStrU[37][2] = "グループ名";
svgStrU[38][2] = "階級区間";
svgStrU[39][2] = "幹";
svgStrU[40][2] = " 葉";
svgStrU[41][2] = "グループ 1  葉";
svgStrU[42][2] = "グループ 2  葉";
svgStrU[43][2] = "<h3>基本統計量</h3>";
svgStrU[44][2] = "データの数";  
svgStrU[45][2] = "最小値";  
svgStrU[46][2] = "中央値"; 
svgStrU[47][2] = "最大値";  
svgStrU[48][2] = "全体";
svgStrU[49][2] = "指数分布";
svgStrU[50][2] = "一様分布";
svgStrU[51][2] = "推定の精度";
svgStrU[52][2] = "- マウスクリックして3個以上の点を配置すると回帰直線が作成される";
svgStrU[53][2] = "- マウスクリックして1つの点を移動/削除しながら回帰直線の変動を観察";
svgStrU[54][2] = "[標本統計量] ";
svgStrU[55][2] = "[標本 1 統計量] ";
svgStrU[56][2] = "[標本 2 統計量] ";
svgStrU[57][2] = "信頼水準";
svgStrU[58][2] = "";
svgStrU[59][2] = "";

// Chinese
$.message.cn = {
    "eStat : Stat Education SW" : "eStat: 統計教育軟體",
    "Filename" : "檔名",
    "Selected Variables" : "選擇變數",
    "Cancel" : "取消",
    "Edit Variables" : "編輯變數",
    "Level" : "級別",
    "ElementaryLevel" : "小學",
    "MiddleLevel" : "中學",
    "UniversityLevel" : "大學",
    "Example" : "例題",
    "New Sheets" : "新工作表",
    "csv Open" : "開啟csv檔",
    "www Open" : "開啟網頁",
    "json Open" : "開啟json檔",
    "csv Save" : "儲存csv",
    "json Save" : "儲存json",
    "Print Sheet" : "列印工作表",
    "Bar Graph" : "長條圖",
    "Pie Chart" : "圓餅圖",
    "Band Graph" : "帶狀圖",
    "Line Graph" : "折線圖",
    "Dot Graph" : "點圖",
    "Histogram" : "直方圖",
    "Stem & Leaf Plot" : "莖葉圖",
    "Box-Whisker Plot" : "盒形圖",
    "Scatterplot" : "散佈圖",
    "Frequency Table" : "次數分佈表",
    "Basic Statistics" : "基本統計量",
    "Testing Hypothesis &mu;" : "假設檢定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "假設檢定 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "假設檢定 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "假設檢定 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "變異數分析",
    "High School Stat Education" : "高級中學統計教育",
    "University Stat Education" : "大學統計教育",
    "Elem Stat Graph Example" : "小中學圖表例題",
    "Learning eStat w Example" : "eStat例題學習",
    "Vertical Separated Bar" : "縱向分離長條圖",
    "Vertical Stacked Bar" : "縱向堆壘長條圖",
    "Vertical Ratio Bar" : "縱向比率長條圖",
    "Vertical Side by Side Bar" : "縱向並排長條圖",
    "Vertical Two Sided Bar" : "縱向雙邊長條圖圖",
    "Horizontal Separated Bar" : "橫向分離長條圖",
    "Horizontal Stacked Bar" : "橫向堆壘長條圖",
    "Horizontal Ratio Bar" : "橫向比率長條圖",
    "Horizontal Side by Side Bar" : "橫向並排長條圖",
    "Horizontal Two Sided Bar" : "横向雙邊長條圖",
    "Doughnut Graph" : "圓環圖",
    "Two Sided Stem & Leaf Plot" : "雙邊莖葉圖",
    "Graph Save" : "儲存圖形",
    "Graph Print" : "列印圖形",
    "Move to Table" : "移動至表格",
    "Edit Title" : "編輯標題",
    "Table Save" : "儲存表格",
    "Table Print" : "列印表格",
    "Frequency" : "次數",
    "(Sorting)" : "(排序)",
    "Raw Data" : "原始資料",
    "Descending" : "下降的",
    "Ascending" : "上昇的",
    "Mean" : "平均數",
    "Std Deviation" : "標準差",
    "Regression" : "回歸",
    "Frequency Polygon" : "次數分佈多邊形",
    "Frequency Table" : "次數分佈表",
    "Execute New Interval" : "執行新區間",
    "Interval Start" : "區間起點",
    "Interval Width" : "區間間幅",
    "t-test" : "t-檢定",
    "Z-test" : "Z-檢定",
    "(if Z-test, enter &sigma;)" : "(Z-檢定, enter &sigma)",
    "Significance Level" : "顯著水準",
    "Execute" : "執行",
    "(Confidence Interval)" : "(信頼區間)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(Z-檢定, Z<sub>1-&alpha;/2 </sub> 使用)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> 檢定",
    "Variance Assumption" : "變異數假設",
    "F test" : "F 檢定",
    "At least one pair of means is different" : "至少有一對平均數不相等",
    "Main Title : " : "主標題 : ",
    "y title : " : "y軸標題 : ",
    "x title : " : "x軸標題 : ",
    "Modify" : "修正",
    "Confirm" : "確認",
    "Variable Name" : "變數名",
    "Variable Value" : "變數値",
    "Value Label" : "變數標號",
    "* Less than nine value labels allowed." : "* 准許9個以下變數標號。",
    "Save" : "儲存",
    "Exit" : "離開",
    "eStatU UnivStatEdu" : "eStatU - 大學統計教育軟體",
    "eStatH HighStatEdu" : "eStatH - 中學統計教育軟體",
    "Menu" : "選單",
    "Binomial Experiment" : "二項式分佈實驗",
    "Binomial Distribution" : "二項式分佈",
    "Binomial Prob Table" : "二項分佈機率表",
    "Poisson Distribution" : "卜瓦松分佈",
    "Poisson Prob Table" : "卜瓦松機率分佈表",
    "Geometric Distribution" : "幾何分佈",
    "Geometric Prob Table" : "幾何機率分佈表",
    "HyperGeometric Distribution" : "超幾何分佈",
    "HyperGeometric Prob Table" : "超幾何機率分佈表",
    "Exponential Distribution" : "指數分佈",
    "Normal Experiment" : "常態分佈實驗",
    "Normal Distribution" : "常態分佈",
    "Normal Approx" : "常態分佈逼近",
    "t Distribution" : "t 分佈",
    "ChiSquare Distribution" : "卡方分佈",
    "F Distribution" : "F 分佈",
    "Sampling" : "抽樣",
    "Population vs Sample" : "母體 vs 樣本",
    "Population" : "母體",
    "Sample" : "樣本",
    "Exponential" : "指數分佈(0.3)",
    "Uniform" : "均勻分佈(0,1)",    
    "Sample05" : "5% 樣本抽出",
    "Sample10" : "10% 樣本抽出",
    "Sample20" : "20% 樣本抽出",
    "Statistics/BoxPlot" : "統計量/盒形圖",
    "Law of Large Number" : "大數法則",
    "Dist of Sample Means" : "樣本平均的分佈",
    "Sample Size" : "樣本數",
    "Confidence Interval" : "信頼區間",
    "Estimation Accuracy" : "估計準確率",
    "Repetition" : "重覆數",
    "Confidence Level" : "信頼水準",
    "Testing Hypothesis mu_title" : "平均數檢定",
    "Testing Hypothesis sigma_title" : "變異數檢定",
    "Testing Hypothesis P_title" : "比例檢定",
    "Testing Hypothesis mu12_title" : "兩母體平均數檢定",
    "Testing Hypothesis sigma12_title" : "兩母體變異數檢定",
    "Testing Hypothesis P12_title" : "兩母體比例檢定",
    "Testing Hypothesis mu" : "區間估計/假設檢定: 平均數&mu;",
    "Testing Hypothesis sigma" : "區間估計/假設檢定: 變異數&sigma;<sup>2</sup>",
    "Testing Hypothesis P" : "區間估計/假設檢定: 比例 P",
    "Testing Hypothesis mu12" : "假設檢定 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12" : "假設檢定 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12" : "假設檢定 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA" : "變異數分析",
    "Testing Independence" : "獨立性檢定",
    "Correlation Coefficient" : "相關係數",
    "Regression Experiment" : "迴歸實驗",
    "Hypothesis" : "假設",
    "Test Type" : "檢定型式",
    "Z-test" : "Z-檢定",
    "t-test" : "t-檢定",
    "Chi-test" : "卡方檢定",
    "F-test" : "F-檢定",
    "Significance Level" : "顯著水準",
    "Sample Data" : "樣本資料",
    "input either sample data" : "於接下來的對話視窗，使用csv/bsv格式輸入樣本資料或樣本統計量",
    "Sample Statistics" : "樣本統計量",
    "Sample Mean" : "樣本平均",
    "Sample Variance" : "樣本變異數",
    "Sample Proportion" : "樣本比例",
    "Confidence Interval" : "信頼區間",
    "if Z-test-1" : "(Z-檢定, 母分散入力)",
    "if Z-test-2" : "(Z-檢定, Z<sub>1-&alpha;/2 </sub> 使用)",
    "Execute" : "執行",
    "Variance Assumption" : "變異數假設",
    "At least one pair" : "至少有一對平均數不相等",
    "Row-Col-0" : "列變數與行變數獨立",
    "Row-Col-1" : "列變數與行變數不獨立",
    "Enter any number of row" : "(由左上角儲存格輸入數字)",
    "Row" : "列",
    "Column" : "行",
    "Show Probability" : "顯示機率",
    "Regression Line" : "迴歸線",
    "Erase All" : "清除營幕",
    "Add Point" : "增加點",
    "Erase Point" : "刪除點",
    "Reference Site" : "参考站",
    "Lot Size" : "Lot數",
    "Defect Size" : "不良品數",
    "If typed" : "(若數字已輸入)",
    "Stat/BoxPlot" : "統計量/盒形圖",
    "Mean" : "平均",
    "Std Dev" : "標準差",
}

appStr[1][3] = "../eStatH/index.html";
appStr[2][3] = "../eStatU/index.html";
appStr[3][3] = "../eStatE/index_en.html";
appStr[4][3] = "../ExLearning/index_en.html";
appStr[5][3] = "index.html";

alertMsg[1][3]  = "所選擇的變數，其中之一沒有包含資料。";
alertMsg[2][3]  = "逐一選取變數進行分析(選按欄位名稱)。若是同時選取兩變數，則第一個視為群組變數。";
alertMsg[3][3]  = "所選的變數有缺失值。";
alertMsg[4][3]  = "若選取的變數觀察值不同，則無法進行分析。";
alertMsg[5][3]  = "群組數太多! 圖形可能因營幕太小而互相重疊。";
alertMsg[6][3]  = "若摘要資料中要進行分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[7][3]  = "若原始資料有超過3個變數被選擇，則無法進行分析及製作圖表。";
alertMsg[8][3]  = "點圖可使用於觀察值個數少於200的資料。";
alertMsg[9][3]  = "莖葉圖可使用於觀察值個數少於100的資料。";
alertMsg[12][3] = "若分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[14][3] = "連續型圖形及假設檢定無法進行摘要資料。";
alertMsg[16][3] = "此假設檢定僅限定於兩群母體。";
alertMsg[17][3] = "繪製散佈圖至少需要橫軸變數及縱軸變數。"; 
alertMsg[18][3] = "繪製散佈圖不得超過3個變數。";
alertMsg[19][3] = "若X變數包含文字，則散佈圖無法繪製。";
alertMsg[20][3] = "若Y變數包含文字，則散佈圖無法繪製。";
alertMsg[21][3] = "若資料有缺失值，則無法儲存。";
alertMsg[22][3] = "若資料有負值，長條圖無法繪製。"; 
alertMsg[25][3] = "若資料只有一個群組，則堆壘長條圖無法繪製。"; 
alertMsg[27][3] = "若資料只有一個群組，則比例長條圖無法繪製。"; 
alertMsg[29][3] = "若資料只有一個群組，則並排長條圖無法繪製。"; 
alertMsg[31][3] = "若資料只有一個群組，則雙邊長條圖無法繪製。"; 
alertMsg[32][3] = "若資料有負值，則圓餅圖無法繪製。"; 
alertMsg[33][3] = "若資料有負值，則圓環圖無法繪製。"; 
alertMsg[34][3] = "若資料有負值，則帶狀圖無法繪製。"; 
alertMsg[35][3] = "若資料有負值，則次數分配表格無法繪製。"; 
alertMsg[36][3] = "此長條圖僅限於兩群組。";
alertMsg[37][3] = "此假設檢定僅限於單一變數。"; 
alertMsg[38][3] = "mu 不是一個數字。請輸入一數值並重新執行!";
alertMsg[39][3] = "標準差為0或不是一個數字，請重新執行!";
alertMsg[40][3] = "輸入的變異數不是一個數字，請輸入一數值並重新執行!";
alertMsg[41][3] = "此假設檢定僅限於兩變數。群組變數則需包含兩群。";  
alertMsg[42][3] = "假設檢定的標題不可編輯! ";

svgStr[1][3]  = " 長條圖";        	
svgStr[2][3]  = " 圓餅圖";   		
svgStr[3][3]  = " 圓環圖";       	
svgStr[4][3]  = " 帶狀圖";          	
svgStr[5][3]  = " 折線圖";       	
svgStr[6][3]  = " 點圖";         	
svgStr[7][3]  = " 盒形圖";         	
svgStr[8][3]  = " 莖葉圖";     	
svgStr[9][3]  = " 直方圖";         	
svgStr[10][3] = " 散佈圖";           	
svgStr[11][3] = " 假設檢定: 母體平均數";      
svgStr[12][3] = " 假設檢定: 母體變異數";    	
svgStr[13][3] = " 假設檢定: 兩母體平均數";   
svgStr[14][3] = " 假設檢定: 兩母體變異數";   
svgStr[15][3] = " 變異數分析"; 
svgStr[16][3] = "次數"; 
svgStr[17][3] = "比例";
svgStr[18][3] = "群組";
svgStr[19][3] = " ";
svgStr[20][3] = "<h3>摘要資料<br>次數分配表</h3>";
svgStr[21][3] = "群組變數";
svgStr[22][3] = "列變數";
svgStr[23][3] = "總和";   
svgStr[24][3] = "總和";
svgStr[25][3] = "<h3>次數分配表</h3>";
svgStr[26][3] = "變異數分析";
svgStr[27][3] = "變數値";
svgStr[28][3] = "變數值標號";
svgStr[29][3] = "次數";
svgStr[30][3] = "百分比(%)"; 
svgStr[31][3] = "<h3>交叉表</h3>";
svgStr[32][3] = "行變數";
svgStr[33][3] = "列變數";
svgStr[34][3] = "平均"
svgStr[35][3] = "標準差"
svgStr[36][3] = "<h3> 直方圖<br>次數分配表</h3>";
svgStr[37][3] = "群組名稱";
svgStr[38][3] = "階級區間";
svgStr[39][3] = "莖";
svgStr[40][3] = "葉";
svgStr[41][3] = "群組一 葉";
svgStr[42][3] = "群組二 葉"
svgStr[43][3] = "<h3>基本統計量</h3>";
svgStr[44][3] = "觀察值";  
svgStr[45][3] = "最小値";  
svgStr[46][3] = "中位値"; 
svgStr[47][3] = "最大値";  
svgStr[48][3] = "全體";
svgStrU[1][3]  = "二項式分佈";        	
svgStrU[2][3]  = "重覆數";   		
svgStrU[3][3]  = "平均";       	
svgStrU[4][3]  = "標準差";          	
svgStrU[5][3]  = "卜瓦松分佈";       	
svgStrU[6][3]  = "幾何分佈";         	
svgStrU[7][3]  = "超幾何分佈";         	
svgStrU[8][3]  = "母體";     	
svgStrU[9][3]  = "樣本分佈";         	
svgStrU[10][3] = "大數法則";           	
svgStrU[11][3] = "反面";      
svgStrU[12][3] = "正面";    	
svgStrU[13][3] = "硬幣正面";   
svgStrU[14][3] = "  正面個數  ";   
svgStrU[15][3] = "  試驗次數  "; 
svgStrU[16][3] = "樣本平均分佈"; 
svgStrU[17][3] = "重覆";
svgStrU[18][3] = "標準誤差";
svgStrU[19][3] = "母體平均";
svgStrU[20][3] = "信頼區間";
svgStrU[21][3] = "估計準確率";
svgStrU[22][3] = "樣本平均";
svgStrU[23][3] = "[檢定統計量] = ";   
svgStrU[24][3] = "分佈";
svgStrU[25][3] = "拒絕虛無假設";
svgStrU[26][3] = "接受虛無假設";
svgStrU[27][3] = "p-値 = ";
svgStrU[28][3] = "[決策] ";
svgStrU[29][3] = "[變異數分析]";
svgStrU[30][3] = "輸入相關係數後按執行"; 
svgStrU[31][3] = "迴歸分析";
vgStrU[32][3] = "列變量";
svgStrU[33][3] = "行變量";
svgStrU[34][3] = "平均"
svgStrU[35][3] = "標準差"
svgStrU[36][3] = "<h3> 直方圖<br>次數分佈表</h3>";
svgStrU[37][3] = "群組名稱";
svgStrU[38][3] = "階級區間";
svgStrU[39][3] = "莖";
svgStrU[40][3] = " 葉";
svgStrU[41][3] = "群組1  葉";
svgStrU[42][3] = "群組2  葉";
svgStrU[43][3] = "<h3>基本統計量</h3>";
svgStrU[44][3] = "資料數";  
svgStrU[45][3] = "最小値";  
svgStrU[46][3] = "中位數"; 
svgStrU[47][3] = "最大値";  
svgStrU[48][3] = "全體";
svgStrU[49][3] = "指數分佈";
svgStrU[50][3] = "均勻分佈";
svgStrU[51][3] = "估計準確率";
svgStrU[52][3] = "- 按一下滑鼠來制造觀察點，eStat會計算出回歸線。";
svgStrU[53][3] = "- 移動或刪除一個觀察點，觀看迴歸線的變化。";
svgStrU[54][3] = "[樣本統計量] ";
svgStrU[55][3] = "[樣本 1 統計量] ";
svgStrU[56][3] = "[樣本 2 統計量] ";
svgStrU[57][3] = "信頼水準";
svgStrU[58][3] = "";
svgStrU[59][3] = "";
