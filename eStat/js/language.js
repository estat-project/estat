﻿// language.js
var langNum;
var nLanguage = 20;
var nString = 150;
var appStr = new Array(nString);
var svgStr = new Array(nString);
var svgStrU = new Array(nString);
var alertMsg = new Array(nString);
for (var j = 0; j < nString; j++) {
    appStr[j] = new Array(nLanguage);
    svgStr[j] = new Array(nLanguage);
    svgStrU[j] = new Array(nLanguage);
    alertMsg[j] = new Array(nLanguage);
}
// 언어 코드
languageNumber = {
    'ko': 0,
    'en': 1,
    'ja': 2,
    'zhTW': 3,
    'fr': 4,
    'de': 5,
    'es': 6,
    'vi': 7,
    'id': 8,
    'mn': 9,
    'zh': 10,
    'pt': 11,
    'gr': 12,
    'ro': 13,
    'th': 14,
    'pl': 15,
    'az': 16,
    'uz': 17,
    'ru': 18,
    'tr': 19,
};
// 언어 컨트롤
var lang = localStorage.getItem("lang");
if (lang == null) lang = 'en';
langNum = languageNumber[lang];

$(document).ready(function() {
    var lang = localStorage.getItem("lang");
    if (lang == null) {
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
};

$message = {}
// Korean
$message.ko = {
    "eStat : Stat Education SW": "eStat: 통계교육SW",
    "Home": "홈",
    "Filename": "파일",
    "Selected Variables": "선택변량",
    "Cancel": "취소",
    "Edit Variables": "변량편집",
    "Level": "수준",
    "ElementaryLevel": "초",
    "MiddleLevel": "중",
    "HighLevel": "고",
    "UniversityLevel": "대",
    "Example": "예제 불러오기",
    "New Sheets": "새시트",
    "csv Open": "csv 불러오기",
    "www Open": "www 불러오기",
    "json Open": "json 불러오기",
    "csv Save": "csv 저장",
    "json Save": "json 저장",
    "Print Sheet": "시트 Print",
    "Bar Graph": "막대그래프",
    "Pie Chart": "원그래프",
    "Rainbow Chart": "무지개그래프",
    "Band Graph": "띠그래프",
    "Line": "꺾은선",
    "Line Graph": "꺾은선그래프",
    "Dot Graph": "점그래프",
    "Histogram": "히스토그램",
    "Stem & Leaf Plot": "줄기와 잎 그림",
    "maxStem": "** 최대 줄기 수 &le; 30 **",
    "Box-Whisker Plot": "상자그래프",
    "Scatterplot": "산점도",
    "ScatterplotMatrix": "산점도행렬",
    "Frequency Table": "도수분포표",
    "Basic Statistics": "기초통계량",
    "Testing Hypothesis &mu;": "가설검정 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "가설검정 &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "검정 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "검정 &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "분산분석",
    "MiddleSchool": "중학통계",
    "HighSchool":   "고등통계",
    "University":   "대학통계",
    "eStatHeading": "eStat은 통계교육을 위한 무료 소프트웨어로서 웹기반의 다이나믹 데이터시각화와 그래프를 이용한 통계분석을 할 수 있습니다.",
    "Support":      "후원",
    "Donation":     "기부",
    "Middle School Stat Education": "중학통계교육",
    "High School Stat Education": "고등통계교육",
    "University Stat Education": "대학통계교육",
    "Elem Stat Graph Example": "초중그래프 예",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "수직형",
    "Horizontal": "수평형",
    "Vertical Separated Bar": "수직 분리형",
    "Vertical Stacked Bar": "수직 쌓는형",
    "Vertical Ratio Bar": "수직 비율형",
    "Vertical Side by Side Bar": "수직 나란형",
    "Vertical Two Sided Bar": "수직 양쪽형",
    "Horizontal Separated Bar": "수평 분리형",
    "Horizontal Stacked Bar": "수평 쌓는형",
    "Horizontal Ratio Bar": "수평 비율형",
    "Horizontal Side by Side Bar": "수평 나란형",
    "Horizontal Two Sided Bar": "수평 양쪽형",
    "Doughnut Graph": "도넛그래프",
    "Two Sided Stem & Leaf Plot": "양쪽형 줄기",
    "Graph Save": "그래프 저장",
    "Graph Print": "그래프 Print",
    "Move to Table": "테이블로 이동",
    "Edit Title": "제목편집",
    "Table Save": "테이블 저장",
    "Table Print": "테이블 인쇄",
    "Frequency": "도수",
    "Sorting": "정렬",
    "SortData": "정렬자료",
    "Raw Data": "원자료",
    "Descending": "내림차순",
    "Ascending": "올림차순",
    "Mean": "평균",
    "Std Deviation": "표준편차",
    "MeanStd": "평균/표준편차",
    "DotMeanStd": "점그래프 - 평균/표준편차",
    "95CI": "95%신뢰구간",
    "CorrelationAnalysis": "상관분석",
    "RegressionAnalysis": "회귀분석",
    "RegressionAnalysis1": "단순선형회귀분석",
    "RegressionAnalysis2": "중회귀분석",
    "ANOVA2": "2원 분산분석",
    "Regression": "회귀선",
    "RegressionLine": "회귀선",
    "Frequency Polygon": "도수분포다각형",
    "Execute New Interval": "새 구간으로 실행",
    "Interval Start": "구간시작",
    "Interval Width": "구간너비",
    "t-test": "t 검정",
    "Z-test": "Z 검정",
    "(if Z-test, enter &sigma;)": "(Z 검정이면 &sigma;입력)",
    "Significance Level": "유의수준",
    "Execute": "실행",
    "(Confidence Interval)": "(신뢰구간)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z 검정이면, Z<sub>&alpha;/2</sub> )",
    "&chi;<sup>2</sup> test": "&chi;&#178; 검정",
    "Variance Assumption": "분산가정",
    "Variance": "분산",
    "F test": "F 검정",
    "At least one pair of means is different": "적어도 한쌍 이상의 평균이 다름",
    "Main Title" : "주 제목",
    "y title": "세로축 제목",
    "x title": "가로축 제목",
    "yAxis": "Y 축",
    "Modify": "수정",
    "Confirm": "확인",
    "Variable Name": "변량명",
    "Variable Value": "변량값",
    "Value Label": "변량값명",
    "* Less than nine value labels allowed.": "* 9개 이하의 변량값명을 지정할 수 있음",
    "Save": "저장",
    "Exit": "나가기",
    "eStatU UnivStatEdu": "eStatU - 대학 통계교육 SW",
    "eStatH HighStatEdu": "eStatH - 고등 통계교육 SW",
    "eStatM MiddleStatEdu": "eStatM - 초/중 통계교육 SW",
    "MiddleStat": "초등/중학: 통계",
    "HighStat":   "고등: 확률 및 통계",
    "UnivStat":   "통계 데이터과학",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using 『eStat』 and R",
    "ebookLink":  "전자책 링크",
    "Menu": "메뉴",
    "Binomial Experiment": "이항분포실험",
    "Binomial Distribution": "이항분포",
    "Binomial Prob Table": "이항분포표",
    "Poisson Distribution": "포아송분포",
    "Poisson Prob Table": "포아송분포표",
    "Geometric Distribution": "기하분포",
    "Geometric Prob Table": "기하분포표",
    "HyperGeometric Distribution": "초기하분포",
    "HyperGeometric Prob Table": "초기하분포표",
    "Exponential Distribution": "지수분포",
    "Normal Experiment": "정규분포실험",
    "Normal Distribution": "정규분포",
    "Normal Approx": "정규분포근사",
    "t Distribution": "t 분포",
    "ChiSquare Distribution": "&chi;&#178; 분포",
    "F Distribution": "F 분포",
    "Sampling": "표본추출",
    "Population vs Sample": "모집단과 표본 시뮬레이션",
    "Population": "모집단",
    "Sample": "표본",
    "Exponential": "지수분포(0.3)",
    "Uniform": "균등분포(0,1)",
    "UniformDist": "균등분포",
    "Sample05": "5% 표본추출",
    "Sample10": "10% 표본추출",
    "Sample20": "20% 표본추출",
    "Statistics/BoxPlot": "통계량/상자그림",
    "StatisticalProb":     "통계적 확률",
    "Law of Large Number": "큰수의 법칙",
    "Dist of Sample Means": "표본평균의 분포 시뮬레이션",
    "Sampling Distribution": "표집분포",
    "Sample Size": "표본크기",
    "Confidence Interval": "신뢰구간",
    "Confidence Interval Simulation": "모평균 신뢰구간 시뮬레이션",
    "Simulation": "시뮬레이션",
    "Confidence Interval Mu": "추정 : 모평균 &mu;",
    "Mu Confidence Interval": "모평균 신뢰구간",
    "Confidence Interval Sigma": "추정 : 모분산 &sigma;&#178; ",
    "Confidence Interval P": "추정 : 모비율 p",
    "Estimation Accuracy": "추정 정확도",
    "Repetition": "반복수",
    "Confidence Level": "신뢰도",
    "Testing Hypothesis mu_titleAB": "가설검정 모평균",
    "Testing Hypothesis mu_title": "가설검정 모평균",
    "Testing Hypothesis sigma_title": "가설검정 모분산",
    "Testing Hypothesis P_title": "가설검정 모비율",
    "Testing Hypothesis mu12_title": "두 모평균 가설검정",
    "Testing Hypothesis sigma12_title": "두 모분산 가설검정",
    "Testing Hypothesis P12_title": "두 모비율 검정",
    "Testing Hypothesis muA":  "가설검정 &mu; 실험 ; C, &beta; 계산",
    "Testing Hypothesis muAB": "가설검정 &mu; 실험 : C, n 계산",
    "Testing Hypothesis mu": "가설검정 : 모평균 &mu;",
    "Testing Hypothesis sigma": "가설검정 : 모분산 &sigma;&#178;",
    "Testing Hypothesis P": "가설검정 : 모비율 p",
    "Testing Hypothesis mu12": "가설검정 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "가설검정 : &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "가설검정 : p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1인자 분산분석 ANOVA",
    "Testing Hypothesis ANOVA2": "2인자 분산분석 ANOVA",
    "SameSampleSize": "각 셀의 표본크기는 동일해야 합니다.",
    "Testing Independence": "범주형 : 독립성검정",
    "CategoryD": "범주",
    "Category": "계급",
    "Correlation Coefficient": "상관계수",
    "Regression Experiment": "회귀선 실험",
    "Hypothesis": "가  설",
    "Test Type": "검정형태",
    "Z-test": "Z 검정",
    "t-test": "t 검정",
    "Chi-test": "&chi;&#178; 검정",
    "F-test": "F 검정",
    "Sampling Type": "표본",
    "Independent Sample": "독립표본",
    "Paired Sample": "대응표본",
    "Sample Data": "표본자료",
    "input either sample data": "(자료를 공란으로 구분), ([표본통계량]만 입력도 가능)",
    "input data": "자료 입력",
    "Sample Statistics": "표본통계량",
    "Sample Mean": "표본평균",
    "Sample Variance": "표본분산",
    "Sample Proportion": "표본비율",
    "sample range": "표본범위",
    "control chart": "관리도",
    "if Z-test-1": "(Z 검정이면, 모분산 입력)",
    "if Z-test-2": "(Z 검정이면, z<sub>&alpha;/2 </sub> 이용)",
    "At least one pair": "적어도 한쌍 이상의 평균이 다름",
    "Row-Col-0": "행변량과 열변량이 독립",
    "Row-Col-1": "행변량과 열변량이 독립 아님",
    "Enter any number of row": "(왼쪽 위 셀부터 자료 입력)",
    "Row": "행",
    "Column": "열",
    "Show Probability": "확률표시",
    "Probability": "확률",
    "Regression Line": "회귀선",
    "Erase All": "새 데이터",
    "Add Point": "점 더하기",
    "Erase Point": "점 지우기",
    "Reference Site": "참고사이트",
    "Lot Size": "로트 개수",
    "Defect Size": "불량 개수",
    "Defect Rate": "불량률",
    "If typed": "숫자 입력 후 [실행] 또는 [Enter] 클릭",
    "Stat/BoxPlot": "통계량/상자그림",
    "Mean": "평균",
    "Std Dev": "표준편차",
    "SimulationWarning": "(시뮬레이션이 끝나기 전에 다른 실험을 위한 '실행' 버튼을 누르면 에러가 발생함)",
    "OneGroup": "(한그룹)",
    "AnalysisVar": "분석변량",
    "AnalysisVar2": "Y변량",
    "GroupVar": "그룹",
    "GroupVar2": "X변량",
    "GroupVar3": "인자1",
    "GroupVar4": "인자2",
    "AnalysisVarMu12": "분석(or X1)변량",
    "GroupVarMu12": "그룹(or X2)변량",
    "PairedMu12": " X1 or X2는 대응자료 경우",
    "SizeVar": "크기변량",
    "RegressionBand": "신뢰대",
    "RegressionTable": "상관 및 회귀분석",
    "RegressionResidual": "잔차와 예측값",
    "RegressionResidualLeverage": "잔차와 지렛값",
    "RegressionCook": "Cook 거리 그래프",
    "RegressionQQ": "잔차 Q-Q 산점도",
    "HistogramNormal": "히스토그램",
    "HistogramChisq": "정규 적합성검정",
    "HistogramNormalQQ": "정규 Q-Q 산점도",
    "PopulationStd": "모표준편차",
    "Type1Error": "1종오류",
    "Type2Error": "2종오류",
    "AnovaTable": "분산분석표",
    "AnovaMeanGraph": "평균신뢰구간도",
    "MultipleComparison": "다중비교",
    "ComparisonGraph": "비교",
    "AnovaResidual": "표준화 잔차와 예측값 산점도",
    "AnovaQQ": "잔차 Q-Q 산점도",
    "TestingFit": "범주형 : 적합성검정",
    "FitTest0": "표본분포가 이론분포를 따름",
    "FitTest1": "표본분포와 이론분포가 다름",
    "ObservedFreq": "관찰도수 O<sub>i</sub>",
    "ExpectedProb": "기대확률 p<sub>i</sub>",
    "ExpectedFreq": "기대도수 E<sub>i</sub> (>5)",
    "InputFitData": "왼쪽 위부터 관찰도수, 기대확률 입력",
    "ExecuteTable": "통계량",
    "MeanDotGraph": "평균점그래프",
    "ScatterRegression": "산점도",
    "Factor": "인자",
    "Interaction": "교호작용",
    "NoInteraction": "교호작용 없음",
    "ExistInteraction": "교호작용 있음",
    "eStatLecture": "eStat 책/강의",
    "eDataLecture": "eDataScience 책/강의",
    "NonParametricMu12_title": "비모수 : 윌콕슨 순위합검정", 
    "NonParametricMu12": "비모수 : 윌콕슨 순위합검정 : 위치모수 M<sub>1</sub>, M<sub>2</sub>", 
    "Sample Range": "표본순위합",
    "DistributionTable": "분포표",
    "SignedRankTestDist": "윌콕슨 부호순위합분포",
    "WilcoxonTestDist": "윌콕슨 순위합분포",
    "KruskalTestDist": "크루스칼-왈리스 H분포",
    "FriedmanTestDist": "프리드만 S분포",
    "SignedRankTest": "비모수 : 윌콕슨 부호순위합검정",
    "SignTest": "비모수 : 부호검정",
    "SignCount": "부호 수",
    "WilcoxonTest": "비모수 : 윌콕슨 순위합검정",
    "KruskalTest": "비모수 : 크루스칼-왈리스 검정",
    "KruskalTestANOVA": "비모수 : 크루스칼-왈리스 검정",
    "Total": "합계",
    "FriedmanTest": "비모수 : 프리드만 검정",
    "FriedmanTestANOVA": "비모수 : 프리드만 검정",
    "Block": "블록",
    "Treatment": "처리",
    "At least one locations is different": "적어도 한쌍 이상의 위치모수가 다름",
    "SignCondition": "(n ≤ 100) 이항분포, (n > 100) 정규분포근사검정",
    "WilcoxonSignCondition": "(n ≤ 20) 부호순위검정, (n > 20) 정규분포근사검정",
    "WilcoxonRankCondition": "(n=n<sub>1</sub>+n<sub>2</sub> ≤ 25) 순위합검정,  (n > 25) 정규분포근사검정",
    "KruskalCondition": "(n ≤ 10) H분포검정,  (n>10) 카이제곱근사검정",
    "VariableSelect":  "* 자료분석 : 파일불러오기 >> 변량선택 >> 분석 아이콘 클릭",
    "VariableSelect2": "* 변량선택 : 변량명을 클릭하거나 우측의 선택박스 이용",
    "VariableSelect3": "변량선택",
    "VariableSelect4": "분석변량 추가 선택 가능",
    "VariableSelect5": "X변량 추가 선택 가능",
    "SummaryData": "요약자료",
    "RawData": "원시자료",
    "MultiSelect": "",
    "DataType": "(시트의 변량명 클릭으로 선택 가능)",
    "by": "by",
    "NameVar": "이름변량",
    "n_variance": "n-1 공식",
    "RandomNumber":   "확률난수 생성",
    "RealNumber":     "실수형",
    "IntegerNumber":  "정수형",
    "NumberData":     "자료수",
    "NumberDigit":    "소수 자릿수",
    "NormalTable":    "정규분포표",
    "Percentile":     "백분위수표",
    "PercentileValue":"백분위수",
    "StudentRangeDist": "HSD 표준화범위분포",
    "copy link": "링크 복사",
    "WithReplacement":    "복원추출",
    "WithoutReplacement": "비복원추출",
    "Replacement":    "중복",
    "NonReplacement": "비중복",
    "WordCloud":       "Word Cloud",
    "WordCloud":       "단어 구름",
    "oneColor":        "색",
    "defaultColor":    "기본색",
    "RelativeFreq":    "상대도수",
    "Density":         "밀도",
    "MarginOfError":   "오차의 한계",
    "Permutation":     "순열",
    "PermutationSame": "같은 것이 있는 순열",
    "Combination":     "조합",
    "NumberOfCase":    "경우의 수",
    "BinomialTheorem": "이항정리",
    "PascalTriangle":  "파스칼의 삼각형",
    "Character":       "이모티콘",
    "AdditionRule":      "확률의 덧셈정리",
    "MultiplicationRule": "확률의 곱셈정리",
    "ConditionalProb":   "조건부확률",
    "JointProb":         "결합확률",
    "DiscreteDist":      "이산확률변량의 분포",
    "Categorize":        "범주화",
    "Recode":            "변량값 재지정",
    "Compute":           "새변량 계산",
    "SelectIf":          "데이터 선택",
    "InfoValueLabel":    "*** 변량을 선택하고 변량명이나 변량값명을 입력하고 실행 버튼을 누르세요.",
    "InfoSorting":       "*** 정렬할 변량을 3개까지 선택하고, 정렬방법을 선택한 후 실행 버튼을 누르세요.",
    "InfoCategorize":    "*** 범주화 할 변량을 선택한 후, 구간시작과 구간너비를 입력하고, '범주리스트 확인' 후 실행 버튼을 누르세요.",
    "InfoRecode":        "*** 변량값 재지정할 변량을 선택하고, 새 변량값을 입력하고 실행 버튼을 누르세요.",
    "InfoRecode2":       "* 9개까지의 값을 재지정할 수 있습니다.",
    "InfoCompute":       "*** 새로운 변량 계산을 위한 계산식을 아래의 버튼들을 이용해 만들고 실행 버튼을 누르세요.",
    "InfoSelectIf":      "*** 데이터 선택을 위한 세 개까지의 변량을 선택하고, 각 변량의 조건식을 입력한 후 실행 버튼을 누르세요.",
    "SortingVariable":   "정렬변량",
    "SortingMethod":     "정렬방법",
    "NewVariable":       "새변량",
    "CategoryVariable":  "범주화 변량",
    "CategoryListCheck": "범주리스트 확인",
    "CategoryInterval":  "범주 구간",
    "CategoryLabel":     "범주 이름",
    "RecodeVariable":    "변량값 재지정 변량",
    "CurrentValue":      "현재 변량값",
    "NewValue":          "새 변량값",
    "ComputeFormula":    "계산식",
    "SelectVariable":    "선택변량",
    "RelationOperator":  "관계연산자",
    "SelectValue":       "값",
    "MissingValue":      "결측값",
    "option":            "선택",
    "TimeSeries":        "시계열",
    "Smoothing":         "평활",
    "Filtering":         "필터링",
    "Transformation":    "변환",
    "Weight":            "가중값",
    "PercentChange":     "증감백분율",
    "WeightedIndex":     "단순지수",
    "BaseTime":          "기준시",
    "LagTime":           "시차",
    "Lag":               "시차",
    "Forecasting":       "예측",
    "SeasonalModel":     "계절모형",
    "HoltWinter":        "홀트-윈터스 승법계절모형",
    "Trend":             "추세",
    "Seasonal":          "계절",
    "Deseasonal":        "비계절시계열",
    "Nseason":           "계절주기",
    "Irregular":         "비규칙",
    "TrendModel":        "비계절 시계열의 추세모형",
    "RegressionModel":   "회귀모형",
    "ForecastingPeriod": "예측기간",
    "CreateTable":       "데이터 테이블",
    "SaveTable":         "테이블 저장",
    "MA":                "이동평균",
    "EWMA":              "지수평활모형",
    "CenterMA":          "중심이동평균",
    "MovingMedian":      "중심이동중앙값",
    "ES":                "지수평활",
    "Default":           "기본값",
    "Linear":            "선형",
    "Quadratic":         "이차식",
    "Cubic":             "삼차식",
    "SquareRoot":        "제곱근",
    "Log":               "로그",
    "Exponent":          "지수",
    "Power":             "멱함수",
    "BoxCox":            "박스-콕스",
    "SingleMA":          "단순이동평균",
    "SingleES":          "단순지수평활",
    "DoubleMA":          "이중이동평균",
    "DoubleES":          "이중이동평균",
    "HoltLinear":        "홀트 이중지수평활",
    "DeseasonIntercept": "비계절 절편",
    "DeseasonSlope":     "비계절 기울기",
    "SeasonalIndex":     "계절지수",
    "Diff":              "차분",
    "DiffTime":          "차분",
    "AR":                "자기회귀모형",
    "ResultTable":       "회귀결과표",
    "ForecastTable":     "예측표",
    "HoltLevel":         "수평",
    "HoltTrend":         "추세",
    "AutoCorrTable":     "자기상관표",
    "DiffSeries":        "차분시계열",
    "RawSeries":         "원 시계열",
    "RBD":               "확률화블록계획법",
    "Latin":             "라틴방격법",
    "Chapter01":         "&nbsp;1장 통계 데이터과학",
    "Chapter02":         "&nbsp;2장 질적 데이터 시각화",
    "Chapter03":         "&nbsp;3장 양적 데이터 시각화",
    "Chapter04":         "&nbsp;4장 표/측도를 이용한 데이터 정리",
    "Chapter05":         "&nbsp;5장 확률 및 확률분포함수",
    "Chapter06":         "&nbsp;6장 표본 통계량의 분포와 추정",
    "Chapter07":         "&nbsp;7장 한 모집단 모수의 가설검정",
    "Chapter08":         "&nbsp;8장 두 모집단 모수의 가설검정",
    "Chapter09":         "&nbsp;9장 여러 모평균의 가설검정",
    "Chapter10":         "10장 비모수적 가설검정",
    "Chapter11":         "11장 범주형 데이터의 가설검정",
    "Chapter12":         "12장 상관 및 회귀분석",
    "Chapter13":         "13장 시계열분석",
    "Distribution":      "확률분포",
    "DecisionTree":      "의사결정나무",
    "MaxDepth":          "최대나무수준x",
    "MinData":           "최소가지데이터수",
    "Discriminant":      "판별분석",
    "BayesTable":        "분류분석표",
    "ScatterBarGraph":   "막대그래프행렬",
    "MultiCrossTable":   "교차표행렬",
    "MultiFreqTable":    "다차원도수분포표",
    "ParallelGraph":     "평행좌표그래프",
    "DataPartition":     "데이터분할",
    "Training":          "훈련용",
    "Testing":           "시험용",
    "PriorProb":         "사전확률",
    "SampleProp":        "표본비율",
    "EqualProp":         "등비율",
    "KNN":               "K-인접이웃분류",
    "numKNN":            "인접이웃",
    "PCA":               "주성분분석",
    "PCgraph":           "주성분산점도",
    "PCtable":           "주성분표",
    "Logistic":          "로지스틱회귀분석",
    "KmeansCluster":     "K-평균군집분석",
    "KmeansGraph":       "K-평균군집산점도",
    "KmeansTable":       "K-평균군집표",
    "NumberOfGroup":     "군집수",
    "MaxIteration":      "최대반복수",
    "StopEpsi":          "오차한계",
    "StatCluster":       "군집통계",
    "ClusterTable":      "군집표",
    "StatClassification": "분류통계",
    "HierarchyCluster":  "계층적군집분석",
    "MaxObs":            "최대데이터수",
    "HierarchyGraph":    "계층적군집그래프",
    "Distance":          "거리측도",
    "Euclid":            "유클리드",
    "Manhattan":         "맨하탄",
    "Linkage":           "연결법",
    "Single":            "최단거리",
    "Complete":          "최장거리",
    "Average":           "평균거리",
    "Centroid":          "중심거리",
    "Ward":              "와드거리",
    "Standardization":   "표준화",
    "StatMultivariate":  "다변량통계",
    "NaiveBayes":        "단순베이즈분류",

};  

// Korean
appStr[0][0] = "/estat/eStat/index.html";
appStr[1][0] = "/estat/eStatH/index.html";
appStr[2][0] = "/estat/eStatU/index.html";
appStr[3][0] = "/estat/eStatE/index.html";
appStr[4][0] = "/estat/eHelp/index.html";
appStr[5][0] = "index_en.html";
appStr[6][0] = "/estat/eLearning/kr/eStatM/index.html";
appStr[7][0] = "/estat/eLearning/kr/eStatH/index.html";
appStr[8][0] = "/estat/eLearning/kr/eStatU/index.html";
appStr[9][0] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][0] = "";
appStr[11][0] = "인구 많은 나라";
appStr[12][0] = "기대수명 (OECD)";
appStr[13][0] = "인구피라미드 (한국)";
appStr[14][0] = "국민총생산 / 인 (OECD)";
appStr[15][0] = "셰계 상위 수출 국가";
appStr[16][0] = "인구중 비만도 비율";
appStr[17][0] = "주요 도시의 온도";
appStr[18][0] = "세계 상위 CO2 배출 국가";
appStr[19][0] = "연간 알콜소비량 (OECD)";
appStr[20][0] = "연속형 그래프";
appStr[21][0] = "수달의 길이";
appStr[22][0] = "선생님 나이";
appStr[23][0] = "성별 선생님 나이";
appStr[24][0] = "치아 청결도";
appStr[25][0] = "수학성적";
appStr[26][0] = "햄버거별 칼로리";
appStr[27][0] = "성별 신장과 체중";
appStr[28][0] = "이산형 그래프";
appStr[29][0] = "";
appStr[30][0] = "";
appStr[31][0] = "단위";
appStr[32][0] = "국가";
appStr[33][0] = "남자";
appStr[34][0] = "여자";
appStr[35][0] = "나이";
appStr[36][0] = "명";
appStr[37][0] = "10억불";
appStr[38][0] = "수출액";
appStr[39][0] = "비만%";
appStr[40][0] = "섭씨:도";
appStr[41][0] = "도시";
appStr[42][0] = "1월최고";
appStr[43][0] = "7월최고";
appStr[44][0] = "백만톤";
appStr[45][0] = "리터/연";
appStr[46][0] = "알콜";
appStr[47][0] = "바스법";
appStr[48][0] = "회전법";
appStr[49][0] = "칫솔방법";
appStr[50][0] = "성별";
appStr[51][0] = "지역";
appStr[52][0] = "점수";
appStr[53][0] = "햄버거";
appStr[54][0] = "칼로리";
appStr[55][0] = "소고기";
appStr[56][0] = "돼지고기";
appStr[57][0] = "닭고기";
appStr[58][0] = "신장";
appStr[59][0] = "체중";

alertMsg[1][0] = "자료가 없습니다!";
alertMsg[2][0] = "분석을 원하는 변량명을 클릭하고 아이콘 버튼을 누르거나 또는 변량선택 박스에서 변량을 선택하세요!";
alertMsg[3][0] = "선택된 열에 결측치가 있습니다.";
alertMsg[4][0] = "각 열의 자료수가 다르거나 결측치가 있으면 처리를 할 수 없습니다.";
alertMsg[5][0] = "그룹의 수가 너무 많습니다. ";
alertMsg[6][0] = "요약자료의 분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[7][0] = "원시자료에서 두 개이상 선택된 변량에 대해서는 그래프를 그리거나 표를 만들 수 없습니다.";
alertMsg[8][0] = "점그림은 자료 수가 200개 이하일때 가능합니다.";
alertMsg[9][0] = "줄기와 잎 그림은 자료 수가 100개 이하일때 가능합니다.";
alertMsg[10][0] = "분석변량이 선택되지 않았습니다.";
alertMsg[11][0] = "분석변량/그룹변량이 선택되지 않았습니다.";
alertMsg[12][0] = "분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[13][0] = "";
alertMsg[14][0] = "요약자료는 연속형 그래프나 가설검정에 적합치 않습니다";
alertMsg[16][0] = "두 개의 그룹에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[17][0] = "산점도는 Y축변량과 X축변량을 선택하여야 합니다.";
alertMsg[18][0] = "세 개 이상 선택된 변량에 대해서는 처리를 할 수 없습니다.";
alertMsg[19][0] = "자료에 문자가 있어 처리할수 없습니다";
alertMsg[20][0] = "자료에 문자가 있어 회귀분석을 처리할수 없습니다";
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
alertMsg[38][0] = "mu를 입력하고 다시 실행하세요!";
alertMsg[39][0] = "표준편차가 0이거나 숫자가 아닙니다. 다시 입력하고 실행하세요!";
alertMsg[40][0] = "입력된 분산이 숫자가 아닙니다. 다시 입력하고 실행하세요!";
alertMsg[41][0] = "두 변량 (분석변량과 그룹변량) 자료에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[42][0] = "가설검정의 제목은 편집할 수 없습니다! ";
alertMsg[43][0] = "단순 선형 회귀분석은 그룹이 없는 경우에 분석할 수 있습니다";
alertMsg[44][0] = "분석변량에서 1st:지역명, 2nd:위도(latitude), 3rd:경도(longitude), 4th:분석값(선택)을 선택";
alertMsg[45][0] = "GIS그래프를 그릴 수 없습니다. ";
alertMsg[46][0] = "같은 변량번호를 선택하였습니다.";
alertMsg[46][0] = "적어도 두 행의 자료가 필요합니다.";        // Bar Chart,  도수분포다각형
alertMsg[47][0] = "도수에 문자 자료는 허용이 안됩니다.";      // Bar Chart
alertMsg[48][0] = "문자 자료는 허용이 안됩니다.";             // Stem and Leaf Plot
alertMsg[49][0] = "자료수는 100개 미만만 허용합니다.";        // Histogram
alertMsg[50][0] = "구간시작과 구간너비에 숫자를 입력하세요."; // Histogram
alertMsg[51][0] = "계급과 도수는 숫자이어야 하고 자료수가 동일해야 합니다.";  // 도수분포다각형
alertMsg[52][0] = "계급과 도수에 문자는 허용이 안됩니다.";    // 도수분포다각형
alertMsg[53][0] = "계급구간의 크기는 동일해야 합니다.";       // 도수분포다각형
alertMsg[54][0] = "각 변수의 자료수는 동일해야 합니다.";
alertMsg[55][0] = "!!! 시트에 데이터가 없습니다.";
alertMsg[56][0] = "!!! 변수가 선택되지 않았습니다.";
alertMsg[57][0] = "!!! 구간시작과 구간너비를 입력하세요.";
alertMsg[58][0] = "!!! 구간시작과 구간너비는 숫자이어야 합니다.";
alertMsg[59][0] = "!!! 9개이상의 구간은 허용되지 않습니다. - 구간너비를 조절하세요";
alertMsg[60][0] = "!!! 9개 이상의 변수값은 재지정할 수 없습니다.";
alertMsg[61][0] = "!!! 값이 입력되지 않았습니다.";
alertMsg[62][0] = "!!! 계산식을 입력하세요.";
alertMsg[63][0] = "!!! 조건식을 만족하는 데이터가 없습니다.";
alertMsg[64][0] = "";
alertMsg[65][0] = ""; 
alertMsg[66][0] = "";
alertMsg[67][0] = "";
alertMsg[68][0] = "";
alertMsg[69][0] = "";
        
svgStr[1][0] = " 막대그래프";
svgStr[2][0] = " 원그래프";
svgStr[3][0] = " 도넛그래프";
svgStr[4][0] = " 띠그래프";
svgStr[5][0] = " 꺾은선그래프";
svgStr[6][0] = " 점그래프";
svgStr[7][0] = " 상자그래프";
svgStr[8][0] = " 줄기와 잎 그림";
svgStr[9][0] = " 히스토그램";
svgStr[10][0] = " 산점도";
svgStr[11][0] = " 모평균 가설검정";
svgStr[12][0] = " 모분산 가설검정";
svgStr[13][0] = " 두 모평균 가설검정";
svgStr[14][0] = " 두 모분산 가설검정";
svgStr[15][0] = " 분산분석";
svgStr[16][0] = "도수";
svgStr[17][0] = "백분율";
svgStr[18][0] = "그룹";
svgStr[19][0] = "의 ";
svgStr[20][0] = "<h3>요약자료<br>도수분포표</h3>";
svgStr[21][0] = "그룹변량";
svgStr[22][0] = "행변량";
svgStr[23][0] = "합계";
svgStr[24][0] = "크기";
svgStr[25][0] = "<h3>도수분포표</h3>";
svgStr[26][0] = "분석변량";
svgStr[27][0] = "변량값";
svgStr[28][0] = "변량값명";
svgStr[29][0] = "도수";
svgStr[30][0] = "상대도수";
svgStr[31][0] = "<h3>교차표</h3>";
svgStr[32][0] = "열변량";
svgStr[33][0] = "행변량";
svgStr[34][0] = "평균";
svgStr[35][0] = "표준편차";
svgStr[36][0] = "<h3> 히스토그램<br>도수분포표</h3>";
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
svgStr[49][0] = "<h3>정규성 검정</h3>";
svgStr[50][0] = "적합성검정은<br> 기대도수가<br> 5보다 클때 권장";
svgStr[51][0] = "카이제곱 적합성검정<br>구간 i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][0] = "자료<br>관찰도수<br>(O<sub>i</sub>)";
svgStr[53][0] = "정규분포<br>기대확률<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][0] = "정규분포<br>기대도수<br>(E<sub>i</sub>)";
svgStr[55][0] = "각 구간<br>카이제곱값<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][0] = "카이제곱값";
svgStr[57][0] = "확률 히스토그램과 정규분포";
svgStr[58][0] = "정규 Q-Q 산점도";
svgStr[59][0] = "정규 백분위수";
svgStr[60][0] = "상관계수";
svgStr[61][0] = "결정계수";
svgStr[62][0] = "추정오차";
svgStr[63][0] = "변량";
svgStr[64][0] = "변량명";
svgStr[65][0] = "독립변량";
svgStr[66][0] = "종속변량";
svgStr[67][0] = "모수";
svgStr[68][0] = "추정값";
svgStr[69][0] = "값";
svgStr[70][0] = "절편";
svgStr[71][0] = "기울기";
svgStr[72][0] = "요인";
svgStr[73][0] = "제곱합";
svgStr[74][0] = "자유도";
svgStr[75][0] = "평균제곱";
svgStr[76][0] = "회귀";
svgStr[77][0] = "오차";
svgStr[78][0] = "전체";
svgStr[79][0] = "<h3>회귀분석</h3>";
svgStr[80][0] = "표준화 잔차의 Q-Q Plot";
svgStr[81][0] = "표준화 잔차";
svgStr[82][0] = "정규 분위수";
svgStr[83][0] = "잔차 산점도";
svgStr[84][0] = "예측값";
svgStr[85][0] = "2원 분산분석";
svgStr[86][0] = "평균-신뢰구간 그래프";
svgStr[87][0] = "잔차";
svgStr[88][0] = "2차원 통계량";
svgStr[89][0] = "산점도 행렬";
svgStr[90][0] = "다중비교";
svgStr[91][0] = "통계량";
svgStr[92][0] = "인자";
svgStr[93][0] = "수준";
svgStr[94][0] = "대응비교 자료 점그래프";
svgStr[95][0] = "표준화 잔차와 예측값 산점도";
svgStr[96][0] = "표준화 잔차와 지렛값 산점도";
svgStr[97][0] = "Cook 거리 그래프";
svgStr[98][0] = "Cook 거리";
svgStr[99][0] = "자료 순서";
svgStr[100][0]= "평균차";
svgStr[101][0]= "평균차검정";
svgStr[102][0]= "처리";
svgStr[103][0]= "교호작용";
svgStr[104][0]= "행 합";
svgStr[105][0]= "열 합";
svgStr[106][0]= "중상관계수";
svgStr[107][0]= "상관계수";
svgStr[108][0]= "상관계수행렬";
svgStr[109][0]= "인자A - 인자B 평균 그래프";
svgStr[110][0]= "지렛값(Leverage)";
svgStr[111][0]= "지리정보그래프";
svgStr[112][0]= "범위";
svgStr[113][0]= "평균-표준편차 그래프";
svgStr[114][0]= "모분산";
svgStr[115][0]= "가설";
svgStr[116][0]= "검정";
svgStr[117][0]= "분산";
svgStr[118][0]= "계급값";
svgStr[119][0]= "범주";
svgStr[120][0]= "최빈값";
svgStr[121][0]= "공분산";
svgStr[122][0]= "파스칼의 삼각형";
svgStr[123][0]= "결합확률";
svgStr[124][0]= "조건부확률";
svgStr[125][0]= "이산확률변량의 확률분포";
svgStr[126][0]= "행 %";
svgStr[127][0]= "열 %";
svgStr[128][0]= "전체 %";
svgStr[129][0] = "막대그래프행렬";
svgStr[130][0] = "사전확률";
svgStr[131][0] = "고유값";
svgStr[132][0] = "고유벡터";
svgStr[133][0] = "다차원도수분포표";
svgStr[134][0] = "계층적군집그래프";
svgStr[135][0] = "거리";
svgStr[136][0] = "최단연결법";
svgStr[137][0] = "최장연결법";
svgStr[138][0] = "평균연결법";
svgStr[139][0] = "중심연결법";
svgStr[140][0] = "와드(Ward)법";
svgStr[141][0] = "군집연결";
svgStr[142][0] = "군집수 (K)";
svgStr[143][0] = "Bayes 정보기준";
svgStr[144][0] = "총급내제곱합";
svgStr[145][0] = "Akaike 정보기준";

svgStrU[1][0] = "이항분포";
svgStrU[2][0] = "반복수";
svgStrU[3][0] = "평균";
svgStrU[4][0] = "표준편차";
svgStrU[5][0] = "포아송분포";
svgStrU[6][0] = "기하분포";
svgStrU[7][0] = "초기하분포";
svgStrU[8][0] = "모집단";
svgStrU[9][0] = "표본의 분포";
svgStrU[10][0] = "통계적 확률";
svgStrU[11][0] = "뒷면";
svgStrU[12][0] = "앞면";
svgStrU[13][0] = " 동전 앞면 ";
svgStrU[14][0] = "앞면 나온 횟수  ";
svgStrU[15][0] = "동전 던진 횟수";
svgStrU[16][0] = "표본평균들의 분포";
svgStrU[17][0] = "반복";
svgStrU[18][0] = "표준오차";
svgStrU[19][0] = "모평균";
svgStrU[20][0] = "신뢰구간";
svgStrU[21][0] = "추정정확도";
svgStrU[22][0] = "표본평균";
svgStrU[23][0] = "[검정통계량]";
svgStrU[24][0] = "분포";
svgStrU[25][0] = "기각 H\u2080";
svgStrU[26][0] = "채택 H\u2080";
svgStrU[27][0] = "p-값";
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
svgStrU[55][0] = "[표본 1 통계량] ";
svgStrU[56][0] = "[표본 2 통계량] ";
svgStrU[57][0] = "신뢰수준";
svgStrU[58][0] = "행변량과 열변량이 독립";
svgStrU[59][0] = "행변량과 열변량이 독립 아님";
svgStrU[60][0] = "표본분포";
svgStrU[61][0] = "이론분포";
svgStrU[62][0] = "관찰분포 적합성검정";
svgStrU[63][0] = "윌콕슨 순위합 검정";
svgStrU[64][0] = "윌콕슨 순위합 분포";
svgStrU[65][0] = "크루스칼-왈리스 검정";
svgStrU[66][0] = "크루스칼-왈리스 H 분포";
svgStrU[67][0] = "크루스칼-왈리스 H 통계량";
svgStrU[68][0] = "윌콕슨 부호순위합 검정";
svgStrU[69][0] = "부호검정";
svgStrU[70][0] = "프리드만 검정";
svgStrU[71][0] = "프리드만 S 통계량";
svgStrU[72][0] = "프리드만 S 분포";
svgStrU[73][0] = "t 값(or Z)";
svgStrU[74][0] = "ChiSq-값";
svgStrU[75][0] = "표본분산";
svgStrU[76][0] = "표본평균차";
svgStrU[77][0] = "표본분산비";
svgStrU[78][0] = "분산가정";
svgStrU[79][0] = "요약자료";
svgStrU[80][0] = "여러 변량 선택 가능";
svgStrU[81][0] = "두 그룹까지 선택 가능";
svgStrU[82][0] = "X변량";
svgStrU[83][0] = "Y변량";
svgStrU[84][0] = "by";
svgStrU[85][0] = "그룹 선택 없음";
svgStrU[86][0] = "선택된 자료는 ";
svgStrU[87][0] = "원시자료 ";
svgStrU[88][0] = "시트의 변량명 클릭으로 선택 가능";
svgStrU[89][0] = "결측수";
svgStrU[90][0] = "순위합";
svgStrU[91][0] = "경도";
svgStrU[92][0] = "위도";
svgStrU[93][0] = "적어도 한쌍 이상의 위치모수가 다름";
svgStrU[94][0] = "윌콕슨 부호순위합 분포";
svgStrU[95][0] = "대응변량";
svgStrU[96][0] = "대응비교";
svgStrU[97][0] = "독립성검정";
svgStrU[98][0] = "시뮬레이션";
svgStrU[99][0] = "확률난수";
svgStrU[100][0] = "정규분포";
svgStrU[101][0] = "t 분포";
svgStrU[102][0] = "&chi;&#178; 분포";
svgStrU[103][0] = "F 분포";
svgStrU[104][0] = "HSD 표준화범위분포";
svgStrU[105][0] = "1사분위수";
svgStrU[106][0] = "3사분위수";
svgStrU[107][0] = "사분위수범위";
svgStrU[108][0] = "변위계수";
svgStrU[109][0] = "누적상대도수 (%)";
svgStrU[110][0] = "균등분포의 최대 정수 수";
svgStrU[111][0] = "마우스로 한 점을 이동";
svgStrU[112][0] = "복원추출";
svgStrU[113][0] = "비복원추출"; 
svgStrU[114][0] = "꺽은선";
svgStrU[115][0] = "증감백분율";
svgStrU[116][0] = "단순지수";
svgStrU[117][0] = "시차";
svgStrU[118][0] = "차분";
svgStrU[119][0] = "자기상관함수";
svgStrU[120][0] = "로그변환";
svgStrU[121][0] = "제곱근변환";
svgStrU[122][0] = "박스-콕스변환";
svgStrU[123][0] = "기준시"; 
svgStrU[124][0] = "중심이동평균";
svgStrU[125][0] = "지수평활";
svgStrU[126][0] = "중심이동중앙값";
svgStrU[127][0] = "모형";
svgStrU[128][0] = "이동평균";
svgStrU[129][0] = "이중이동평균";
svgStrU[130][0] = "Holt 이중지수평활";
svgStrU[131][0] = "계절지수";
svgStrU[132][0] = "Holt-Winters 승법계절모형";
svgStrU[133][0] = "비계절시계열";
svgStrU[134][0] = "블록";
svgStrU[135][0] = "군집분석";
svgStrU[136][0] = "군집";
svgStrU[137][0] = "의사결정나무";
svgStrU[138][0] = "의사결정규칙조건";
svgStrU[139][0] = "의사결정";
svgStrU[140][0] = "반복";
svgStrU[141][0] = "평형좌표그래프";
svgStrU[142][0] = "분류분석";
svgStrU[143][0] = "분류함수";
svgStrU[144][0] = "분류결과";
svgStrU[145][0] = "의사결정";
svgStrU[146][0] = "오분류율";
svgStrU[147][0] = "셀";
svgStrU[148][0] = "훈련데이터";
svgStrU[149][0] = "시험데이터";


// English
$message.en = {
    "eStat : Stat Education SW": "eStat : Stat Education SW",
    "Home": "Home",
    "Filename": "File",
    "Selected Variables": "SelectedVar",
    "Cancel": "Cancel",
    "Edit Variables": "EditVar",
    "Level": "Level",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Example",
    "New Sheets": "New Sheets",
    "csv Open": "csv Open",
    "www Open": "www Open",
    "json Open": "json Open",
    "csv Save": "csv Save",
    "json Save": "json Save",
    "Print Sheet": "Print Sheet",
    "Bar Graph": "Bar Graph",
    "Pie Chart": "Pie Graph",
    "Rainbow Chart": "Rainbow Graph",
    "Band Graph": "Band Graph",
    "Line": "Line",
    "Line Graph": "Line Graph",
    "Dot Graph": "Dot Graph",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Stem & Leaf Plot",
    "maxStem": "** max number of stems &le; 30 **",
    "Box-Whisker Plot": "Box Plot",
    "Scatterplot": "Scatter Plot",
    "ScatterplotMatrix": "Scatter Plot Matrix",
    "Frequency Table": "Frequency Table",
    "Basic Statistics": "Descriptive Statistics",
    "Testing Hypothesis &mu;": "Testing Hypothesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Testing Hypothesis &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Testing Hypothesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Analysis of Variance",
    "MiddleSchool": "Middle School",
    "HighSchool":   "High School",
    "University":   "University",
    "eStatHeading": "eStat is a web-based freeware for better Statistics Education using dynamic data visualization and graphical statistical analysis.",
    "Support":      "Support",
    "Donation":     "Donation",
    "Middle School Stat Education": "Middle School Stat Education",
    "High School Stat Education": "High School Stat Education",
    "University Stat Education": "University Stat Education",
    "Elem Stat Graph Example": "Elem Stat Graph Example",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Vertical",
    "Horizontal": "Horizontal",
    "Vertical Separated Bar": "Vertical Separated Bar",
    "Vertical Stacked Bar": "Vertical Stacked Bar",
    "Vertical Ratio Bar": "Vertical Ratio Bar",
    "Vertical Side by Side Bar": "Vertical Side by Side Bar",
    "Vertical Two Sided Bar": "Vertical Two Sided Bar",
    "Horizontal Separated Bar": "Horizontal Separated Bar",
    "Horizontal Stacked Bar": "Horizontal Stacked Bar",
    "Horizontal Ratio Bar": "Horizontal Ratio Bar",
    "Horizontal Side by Side Bar": "Horizontal Side by Side Bar",
    "Horizontal Two Sided Bar": "Horizontal Two Sided Bar",
    "Doughnut Graph": "Doughnut Graph",
    "Two Sided Stem & Leaf Plot": "Two Sided Stem & Leaf Plot",
    "Graph Save": "Graph Save",
    "Graph Print": "Graph Print",
    "Move to Table": "Move to Table",
    "Edit Title": "Edit Title",
    "Table Save": "Table Save",
    "Table Print": "Table Print",
    "Frequency": "Frequency",
    "Sorting": "Sorting",
    "SortData": "Sorted Data",
    "Raw Data": "Raw Data",
    "Descending": "Descending",
    "Ascending": "Ascending",
    "Mean": "Mean",
    "Std Deviation": "Std Deviation",
    "MeanStd": "Mean/StdDev",
    "DotMeanStd": "Dot Graph - Mean/StdDev",
    "95CI": "95% Confidence Interval",
    "CorrelationAnalysis": "Correlation Analysis",
    "RegressionAnalysis": "Regression Analysis",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Two way ANOVA",
    "Regression": "Regression",
    "RegressionLine": "Regression Line",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Regression Analysis",	
    "Frequency Polygon": "Frequency Polygon",
    "Execute New Interval": "Execute New Interval",
    "Interval Start": "Interval Start",
    "Interval Width": "Interval Width",
    "t-test": "t test",
    "Z-test": "Z test",
    "(if Z-test, enter &sigma;)": "(if Z test, enter &sigma;)",
    "Significance Level": "Significance Level",
    "Execute": "Execute",
    "(Confidence Interval)": "(Confidence Interval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(if Z test, Z<sub>&alpha;/2</sub>is used)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Variance Assumption",
    "Variance": "Variance",
    "F test": "F test",
    "At least one pair of means is different": "At least one pair of means is different",
    "Main Title": "Main Title",
    "y title": "y title",
    "x title": "x title",
    "yAxis": "Y Axis",
    "Modify": "Modify",
    "Confirm": "Confirm",
    "Variable Name": "Variable Name",
    "Variable Value": "Variable Value",
    "Value Label": "Value Label",
    "* Less than nine value labels allowed.": "* Less than nine value labels allowed.",
    "Save": "Save",
    "Exit": "Exit",
    "eStatU UnivStatEdu": "eStatU - University Statistics Education SW",
    "eStatH HighStatEdu": "eStatH - High School Statistics SW",
    "eStatM MiddleStatEdu": "eStatM - Elementary / Middle School Statistics SW",
    "MiddleStat": "Elementary / Middle School",
    "HighStat":   "High School Statistics",
    "UnivStat":   "Introduction to Statistics using 『eStat』",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using 『eStat』 and R",
    "ebookLink":  "webBook",
    "Menu": "Menu",
    "Binomial Experiment": "Binomial Experiment",
    "Binomial Distribution": "Binomial Distribution",
    "Binomial Prob Table": "Binomial Prob Table",
    "Poisson Distribution": "Poisson Distribution",
    "Poisson Prob Table": "Poisson Prob Table",
    "Geometric Distribution": "Geometric Distribution",
    "Geometric Prob Table": "Geometric Prob Table",
    "HyperGeometric Distribution": "HyperGeometric Distribution",
    "HyperGeometric Prob Table": "HyperGeometric Prob Table",
    "Exponential Distribution": "Exponential Distribution",
    "Normal Experiment": "Normal Experiment",
    "Normal Distribution": "Normal Distribution",
    "Normal Approx": "Normal Approx",
    "t Distribution": "t Distribution",
    "ChiSquare Distribution": "&chi;&#178; Distribution",
    "F Distribution": "F Distribution",
    "Sampling": "Sampling",
    "Population vs Sample": "Population vs Sample",
    "Population": "Population",
    "Sample": "Sample",
    "Exponential": "Exponential(0.3)",
    "Uniform": "Uniform(0,1)",
    "UniformDist": "Uniform",
    "Sample05": "Sampling 5%",
    "Sample10": "Sampling 10%",
    "Sample20": "Sampling 20%",
    "Statistics/BoxPlot": "Statistics/BoxPlot",
    "StatisticalProb":     "Statistical Probability",
    "Law of Large Number": "Law of Large Number",
    "Dist of Sample Means": "Dist of Sample Means",
    "Sampling Distribution": "Sampling Distribution",
    "Sample Size": "Sample Size",
    "Confidence Interval": "Confidence Interval",
    "Confidence Interval Simulation": "Confidence Interval Simulation",
    "Simulation": "Simulation",
    "Confidence Interval Mu": "Estimation : &mu;",
    "Mu Confidence Interval": "Population Mean Confidence Interval",
    "Confidence Interval Sigma": "Estimation : &sigma;&#178; ",
    "Confidence Interval P": "Estimation : p",
    "Estimation Accuracy": "Estimation Accuracy",
    "Repetition": "repetition",
    "Confidence Level": "Confidence Level",
    "Testing Hypothesis mu_titleAB": "Testing Hypothesis Mean",
    "Testing Hypothesis mu_title": "Testing Mean",
    "Testing Hypothesis sigma_title": "Testing Variance",
    "Testing Hypothesis P_title": "Testing Proportion",
    "Testing Hypothesis mu12_title": "Testing Two Means",
    "Testing Hypothesis sigma12_title": "Testing Two Variances",
    "Testing Hypothesis P12_title": "Testing Two Proportions",
    "Testing Hypothesis muA":  "Testing Hypothesis &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Testing Hypothesis &mu; - C, n",
    "Testing Hypothesis mu": "Testing Hypothesis &mu;",
    "Testing Hypothesis sigma": "Testing Hypothesis &sigma;&#178;",
    "Testing Hypothesis P": "Testing Hypothesis p",
    "Testing Hypothesis mu12": "Testing Hypothesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Testing Hypothesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Testing Hypothesis p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Single Factor ANOVA",
    "Testing Hypothesis ANOVA2": "Two Factors ANOVA",
    "SameSampleSize": "Sample size of each cell should be the same.",
    "Testing Independence": "Categorical: Independence Test",
    "CategoryD": "Category",
    "Category": "Category",
    "Correlation Coefficient": "Correlation Coefficient",
    "Regression Experiment": "Regression Experiment",
    "Hypothesis": "Hypothesis",
    "Test Type": "Test Type",
    "Z-test": "Z test",
    "t-test": "t test",
    "Chi-test": "&chi;&#178; test",
    "F-test": "F test",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent sample",
    "Paired Sample": "paired sample",
    "Sample Data": "Sample Data",
    "input either sample data": "Input either sample data using BSV or sample statistics at the next boxes",
    "input data": "Data Input",
    "Sample Statistics": "Sample Statistics",
    "Sample Mean": "Sample Mean",
    "Sample Variance": "Sample Variance",
    "Sample Proportion": "Sample Proportion",
    "sample range": "Sample Range",
    "control chart": "Control Chart",
    "if Z-test-1": "(if Z test, enter population variance &sigma;&#178;)",
    "if Z-test-2": "(if Z test, z<sub>&alpha;/2 </sub> is used.)",
    "At least one pair": "At least one pair of means is different",
    "Row-Col-0": "Row and column variables are independent",
    "Row-Col-1": "Row and column variables are not independent",
    "Enter any number of row": "(Enter observation from upper left cell)",
    "Row": "Row",
    "Column": "Column",
    "Probability": "Probability",
    "Show Probability": "Show Probability",
    "Regression Line": "Regression Line",
    "Erase All": "Erase Data",
    "Add Point": "Add Point",
    "Erase Point": "Erase Point",
    "Reference Site": "Reference Site",
    "Lot Size": "Lot Size",
    "Defect Size": "Defectives",
    "Defect Rate": "Defective Rate",
    "If typed": "After typing number, click [Execute] or [Enter]",
    "Stat/BoxPlot": "Stat/BoxPlot",
    "Mean": "Mean",
    "Std Dev": "Std Dev",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(one group)",
    "AnalysisVar": "Analysis Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Group",
    "GroupVar2": "X Var",
    "GroupVar3": "Factor1",
    "GroupVar4": "Factor2",
    "AnalysisVarMu12": "Analysis(or X1) Variable",
    "GroupVarMu12": "Group(or X2) Variable",
    "PairedMu12": " X1, X2 : Paired Variables",
    "SizeVar": "Size Var",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Regression Analysis",
    "RegressionResidual": "Residual Plot",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Residual Q-Q Plot",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Normality Test",
    "HistogramNormalQQ": "Normal Q-Q Plot",
    "PopulationStd": "Population Standard Deviation",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mean Confidence Interval",
    "MultipleComparison": "Multiple Comparison",
    "ComparisonGraph": "Comparison",
    "AnovaResidual": "Residual Plot",
    "AnovaQQ": "Residual Q-Q Plot",
    "TestingFit": "Categorical : Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Dist. are the same",
    "FitTest1": "Observed & theoretical Dist. are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Learning",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Rank Sum Test",
    "Sample Range": "Rank Sum",
    "DistributionTable": "Distribution Table",
    "SignedRankTestDist": "Wilcoxon Signed Rank Sum Dist.",
    "WilcoxonTestDist": "Wilcoxon Rank Sum Distribution",
    "KruskalTestDist": "Kruskal-Wallis H Distribution",
    "FriedmanTestDist": "Friedman S Distribution",
    "SignedRankTest": "Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "(n ≤ 100) Binomial Test,  (n > 100) Normal Approximation Test",
    "WilcoxonSignCondition": "(n ≤ 20) Signed Rank Sum Test, (n > 20) Normal Approximation Test",
    "WilcoxonRankCondition": "(n=n<sub>1</sub>+n<sub>2</sub> ≤ 25) Rank Sum Test, (n>25) Normal Approximation Test",
    "KruskalCondition": "(n ≤ 10) H Distribution Test,  (n > 10) &chi;&#178; approximation test",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Variable Selection",
    "VariableSelect4": "More Analysis Variable can be selected.",
    "VariableSelect5": "More X Variable can be selected.",
    "SummaryData": "Summary Data",
    "RawData": "Raw Data",
    "MultiSelect": "",
    "DataType": "(Select variables by click var name)",
    "by": "by",
    "NameVar": "Name Var",
    "n_variance": "n-1 formula",
    "RandomNumber":   "Random Number Generator",
    "RealNumber":     "Real",
    "IntegerNumber":  "Integer",
    "NumberData":     "Number of Data",
    "NumberDigit":    "Decimal Digit",
    "NormalTable":    "Normal Distribution Table",
    "Percentile":     "Percentile Table",
    "PercentileValue": "Percentile",
    "StudentRangeDist": "HSD Studentized Range Dist.",
    "copy link": "link copy",
    "WithReplacement":    "with replacement",
    "WithoutReplacement": "without replacement",
    "Replacement":     "with replacement",
    "NonReplacement":  "without replacement",
    "WordCloud":       "Word Cloud",
    "oneColor":        "Color",
    "defaultColor":    "Default Color",
    "RelativeFreq":    "Relative Freq",
    "Density":         "Density",
    "MarginOfError":   "Margin of Error",
    "Permutation":     "Permutation",
    "PermutationSame": "Permutation with same objects",
    "Combination":     "Combination",
    "NumberOfCase":    "Number of cases",
    "BinomialTheorem": "Binomial Theorem",
    "PascalTriangle":  "Pascal Triangle",
    "Character":        "Emoji",
    "AdditionRule":      "Addition Rule of Probability",
    "MultiplicationRule": "Multiplication Rule of Probability",
    "ConditionalProb":   "Conditional Probability",
    "JointProb":         "Joint Probability",
    "DiscreteDist":      "Discrete Distribution",
    "Categorize":        "Recode: Category",
    "Recode":            "Recode: Value",
    "Compute":           "Compute",
    "SelectIf":          "Select If",
    "InfoValueLabel":    "*** Select variable, enter variable name and / or value label.",
    "InfoSorting":       "*** Select sorting variable, enter sorting method up to 3 variables.",
    "InfoCategorize":    "*** Select variable for Category, enter 'Interval Start' and 'Interval Width'.",
    "InfoRecode":        "*** Select variable for Recode, enter 'New Value'.",
    "InfoRecode2":       "* Allow recoding up to 9 values.",
    "InfoCompute":       "*** Create computing formula using buttons below.",
    "InfoSelectIf":      "*** Select up to 3 variables, enter their conditions.",
    "SortingVariable":   "Sorting Variable",
    "SortingMethod":     "Sorting Method",
    "NewVariable":       "New Variable",
    "CategoryVariable":  "Categorize Variable",
    "CategoryListCheck": "Category List Check",
    "CategoryInterval":  "Category Interval",
    "CategoryLabel":     "Category Label",
    "RecodeVariable":    "Recode Variable",
    "CurrentValue":      "Current Value",
    "NewValue":          "New Value",
    "ComputeFormula":    "Formula",
    "SelectVariable":    "Variable<br>for Select",
    "RelationOperator":  "Relation<br>Operator",
    "SelectValue":       "Value",
    "MissingValue":      "Missing value",
    "option":            "option",
    "TimeSeries":        "Time Series",
    "Smoothing":         "Smoothing",
    "Filtering":         "Filtering",
    "Transformation":    "Transformation",
    "Weight":            "Weight",
    "PercentChange":     "Change Percent",
    "WeightedIndex":     "Simple Index",
    "BaseTime":          "Base Time",
    "LagTime":           "Lag Time",
    "Lag":               "Time Lag",
    "Forecasting":       "Forecasting",
    "SeasonalModel":     "Seasonal Model",
    "HoltWinter":        "Holt-Winters Seasonal Model",
    "Trend":             "Trend",
    "Seasonal":          "Seasonal",
    "Deseasonal":        "Deseasonal Series",
    "Nseason":           "Times in Season",
    "Irregular":         "Irregular",
    "TrendModel":        "Trend Model on Deseasonal",
    "RegressionModel":   "Regression Model",
    "ForecastingPeriod": "Forecasting Period",
    "CreateTable":       "Data Table",
    "SaveTable":         "Save Table",
    "MA":                "Moving Average",
    "EWMA":              "EWMA Model",
    "CenterMA":          "Centered Moving Average",
    "MovingMedian":      "Centered Moving Median",
    "ES":                "Exponential Smoothing",
    "Default":           "Default",
    "Linear":            "Linear",
    "Quadratic":         "Quadratic",
    "Cubic":             "Cubic",
    "SquareRoot":        "Square Root",
    "Log":               "Logarithmic",
    "Exponent":          "Exponential",
    "Power":             "Power",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Single Moving Average",
    "SingleES":          "Single Exponential Smoothing",
    "DoubleMA":          "Double Moving Average",
    "DoubleES":          "Double Exponential Smoothing",
    "HoltLinear":        "Holt Exponential Smoothing",
    "DeseasonIntercept": "Deseasonal intercept",
    "DeseasonSlope":     "Deseasonal slope",
    "SeasonalIndex":     "Seasonal Index",
    "Diff":              "Difference",
    "DiffTime":          "Diff Time",
    "AR":                "Autoregressive Model",
    "ResultTable":       "Regression Result",
    "ForecastTable":     "Forecast Table",
    "HoltLevel":         "Level",
    "HoltTrend":         "Trend",
    "AutoCorrTable":     "Autocorrelation Table",
    "DiffSeries":        "Difference Series",
    "RawSeries":         "Raw Series",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         " 1&nbsp; Statistics and Data Science",
    "Chapter02":         " 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         " 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         " 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         " 5&nbsp; Probability Distribution",
    "Chapter06":         " 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         " 7&nbsp; Testing Hypothesis for Single Population",
    "Chapter08":         " 8&nbsp; Testing Hypothesis for Two Population",
    "Chapter09":         " 9&nbsp; Testing Hypothesis for Several Population",
    "Chapter10":         "10      Nonparametric Testing Hypothesis",
    "Chapter11":         "11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "12      Correlation and Regression Analysis",
    "Chapter13":         "13      Time Series Analysis",
    "Distribution":      "Distribution",
    "DecisionRule":      "Decision Rule",
    "DecisionTree":      "Decision Tree",
    "VarSelect":         "Variable selelection",
    "MaxDepth":          "Tree depth max",
    "MinData":           "Branch data min",
    "Entropy":           "Entropy",
    "Gini":              "Gini",
    "ClassError":        "Classification Error",
    "Chisquare":         "Chi-square",
    "Discriminant":      "Bayes Classification Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// English
appStr[0][1] = "/estat/eStat/index.html";
appStr[1][1] = "/estat/eStatH/index.html";
appStr[2][1] = "/estat/eStatU/index.html";
appStr[3][1] = "/estat/eStatE/index.html";
appStr[4][1] = "/estat/eHelp/index_en.html";
appStr[5][1] = "index.html";
appStr[6][1] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][1] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][1] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][1] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][1] = "";
appStr[11][1] = "Large Population Country";
appStr[12][1] = "Life Expectancy (OECD)";
appStr[13][1] = "Population Pyramid (Korea)";
appStr[14][1] = "GNP per Capita (OECD)";
appStr[15][1] = "Top World Export Country";
appStr[16][1] = "Obesity % of Population";
appStr[17][1] = "Temperature of Major City";
appStr[18][1] = "Top CO2 Emission Country";
appStr[19][1] = "Alcohol Consume (OECD)";
appStr[20][1] = "Continuous Data Graph";
appStr[21][1] = "Length of Otter";
appStr[22][1] = "Age of Teacher";
appStr[23][1] = "Age of Teacher by Sex";
appStr[24][1] = "Cleanliness of Tooth";
appStr[25][1] = "Math Exam Scores";
appStr[26][1] = "Calorie of Hamberger";
appStr[27][1] = "Height vs Weight by Sex";
appStr[28][1] = "Discrete Data Graphs";
appStr[29][1] = "";
appStr[30][1] = "";
appStr[31][1] = "unit";
appStr[32][1] = "Country";
appStr[33][1] = "Male";
appStr[34][1] = "Female";
appStr[35][1] = "Age";
appStr[36][1] = "Person";
appStr[37][1] = "billion $";
appStr[38][1] = "Export";
appStr[39][1] = "Obesity %";
appStr[40][1] = "Celsius";
appStr[41][1] = "City";
appStr[42][1] = "Jan High";
appStr[43][1] = "Jul High";
appStr[44][1] = "million ton";
appStr[45][1] = "liter/year";
appStr[46][1] = "Alcohol";
alertMsg[1][1] = "One of the selected variables does not have data.";
alertMsg[2][1] = "Select variables for analysis (click column name or select var at the selection box ) one by one. If two variables for raw data are selected, the first one is analysis(or Y) variable and the 2nd one is group (or X) variable. ";
alertMsg[3][1] = "Missing data on the selected variable.";
alertMsg[4][1] = "If the number of observations in each column are different, analysis is not allowed.";
alertMsg[5][1] = "Too many groups! Graphs may be overlapped due to size of the screen.";
alertMsg[6][1] = "If the analysis variable in summary data includes character, analysis or creating table is not allowed.";
alertMsg[7][1] = "If more than three variables are selected for raw data, analysis or creating table is not allowed.";
alertMsg[8][1] = "Dot Graph is allowed if the number of observation is less than 200.";
alertMsg[9][1] = "Stem & Leaf Plot is allowed if the number of observation is less than 100.";
alertMsg[10][1] = "Analysis variable is not selected.";
alertMsg[11][1] = "Analysis/Group variables are not selected.";
alertMsg[12][1] = "If the analysis variable includes characters, analysis or creating table is not allowed.";
alertMsg[13][1] = "";
alertMsg[14][1] = "Summary data is not allowed for continuous graphs and testing hypothesis.";
alertMsg[16][1] = "Only two groups are allowed for this testing hypothesis.";
alertMsg[17][1] = "Scatter plot requires Y variable and X variable.";
alertMsg[18][1] = "More than three variables are not allowed.";
alertMsg[19][1] = "If there is a character on data, analysis cannot be done.";
alertMsg[20][1] = "If there is a character on data, regression analysis cannot be done.";
alertMsg[21][1] = "If there is a missing data, save is not allowed.";
alertMsg[22][1] = "If there is a negative number, bar graph cannot be drawn.";
alertMsg[25][1] = "If there is only one group, stacked bar graph is not allowed.";
alertMsg[27][1] = "If there is only one group, ratio bar graph is not allowed.";
alertMsg[29][1] = "If there is only one group, side-by-side bar graph is not allowed.";
alertMsg[31][1] = "If there is only one group, both-side bar graph is not allowed.";
alertMsg[32][1] = "If there is a negative number, pie chart cannot be drawn.";
alertMsg[33][1] = "If there is a negative number, doughnut graph cannot be drawn.";
alertMsg[34][1] = "If there is a negative number, band graph cannot be drawn.";
alertMsg[35][1] = "If there is a negative number, frequency table cannot be drawn.";
alertMsg[36][1] = "This bar graph is allowed only for two groups.";
alertMsg[37][1] = "This testing hypothesis is allowed only for one variable.";
alertMsg[38][1] = "mu is NaN . Enter value and then retry!";
alertMsg[39][1] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][1] = "input variance is NaN . Enter value and then retry!";
alertMsg[41][1] = "This testing hypothesis is allowed only for two variables. 1st one is an Analysis Variable and 2nd one is a Group Variable. Group variable should have only two groups";
alertMsg[42][1] = "Title editing of testing hypothesis is not allowed! ";
alertMsg[43][1] = "Simple Linear Regression is only for one group";
alertMsg[44][1] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][1] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][1] = "At least two rows are required !!   Try again.";  // Bar Chart
alertMsg[47][1] = "Character data in Frequency are not allowed !!   Try again."; // Bar Chart
alertMsg[48][1] = "Character data are not allowed !!   Try again."; // Stem and Leaf Plot
alertMsg[49][1] = "Number of observations should be less than 100 !!   Try again.";
alertMsg[50][1] = "Enter numbers in interval start or step.";
alertMsg[51][1] = "Enter numbers / Number of rows should be the same!!   Try again.";
alertMsg[52][1] = "Enter numbers in category and frequency.";
alertMsg[53][1] = "Interval size is not the same !!   Try again.";
alertMsg[54][1] = "Observation of each variable should be the same !!   Try again.";
alertMsg[55][1] = "!!! No data on sheet.";
alertMsg[56][1] = "!!! No variable selected";
alertMsg[57][1] = "!!! Enter Interval Start and Interval Width";
alertMsg[58][1] = "!!! Enter numeric Interval Start and Interval Width";
alertMsg[59][1] = "!!! More than 9 interval - change Interval Width";
alertMsg[60][1] = "!!! This variable has more than 9 values";
alertMsg[61][1] = "!!! No value entered";
alertMsg[62][1] = "!!! Enter formula";
alertMsg[63][1] = "!!! No data which satisfies conditions.";
alertMsg[64][1] = "Number of observations in each group should be greater than 1 !!   Try again.";
alertMsg[65][1] = ""; 
alertMsg[66][1] = "";
alertMsg[67][1] = "";
alertMsg[68][1] = "";
alertMsg[69][1] = "";

svgStr[1][1] = " Bar Graph";
svgStr[2][1] = " Pie Chart";
svgStr[3][1] = " Doughnut Graph";
svgStr[4][1] = " Band Graph";
svgStr[5][1] = " Line Graph";
svgStr[6][1] = " Dot Graph";
svgStr[7][1] = " Box-Whisker Plot";
svgStr[8][1] = " Stem and Leaf Plot";
svgStr[9][1] = " Histogram";
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
svgStr[24][1] = "CircleSize";
svgStr[25][1] = "<h3>Frequency Table</h3>";
svgStr[26][1] = "Analysis Var";
svgStr[27][1] = "Var Value";
svgStr[28][1] = "Value Label";
svgStr[29][1] = "Frequency";
svgStr[30][1] = "Relative Frequency";
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
svgStr[43][1] = "<h3>Descriptive Statistics</h3>";
svgStr[44][1] = "Observation";
svgStr[45][1] = "Minimum";
svgStr[46][1] = "Median";
svgStr[47][1] = "Maximum";
svgStr[48][1] = "Total";
svgStr[49][1] = "<h3>Normality Test</h3>";
svgStr[50][1] = "Expected frequency > 5 <br> is recommended";
svgStr[51][1] = "&chi;&#178; Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][1] = "Data<br>Observed Frequency<br>(O<sub>i</sub>)";
svgStr[53][1] = "Normal Distribution<br>Expected Probability<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][1] = "Normal Distribution<br>Expected Frequency<br>(E<sub>i</sub>)";
svgStr[55][1] = "Each interval<br>&chi;&#178; value<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][1] = "Sum of &chi;&#178; value";
svgStr[57][1] = "Probability Histogram and Normal Distribution";
svgStr[58][1] = "Normal Q-Q Plot";
svgStr[59][1] = "Normal Quantile";
svgStr[60][1] = "Correlation Coefficient";
svgStr[61][1] = "Coefficient of Determination";
svgStr[62][1] = "Standard Error";
svgStr[63][1] = "Variable";
svgStr[64][1] = "Variable Name";
svgStr[65][1] = "Independent Variable";
svgStr[66][1] = "Dependent Variable";
svgStr[67][1] = "Parameter";
svgStr[68][1] = "Estimated Value";
svgStr[69][1] = "value";
svgStr[70][1] = "Intercept";
svgStr[71][1] = "Slope";
svgStr[72][1] = "Factor";
svgStr[73][1] = "Sum of Squares";
svgStr[74][1] = "deg of freedom";
svgStr[75][1] = "Mean Squares";
svgStr[76][1] = "Regression";
svgStr[77][1] = "Error";
svgStr[78][1] = "Total";
svgStr[79][1] = "<h3>Regression Analysis</h3>";
svgStr[80][1] = "Standardized Residual Q-Q Plot";
svgStr[81][1] = "Standardized Residual";
svgStr[82][1] = "Normal Quantile";
svgStr[83][1] = "Residual Plot";
svgStr[84][1] = "Prediction";
svgStr[85][1] = "Two way ANOVA";
svgStr[86][1] = "Confidence Interval Graph";
svgStr[87][1] = "Residual";
svgStr[88][1] = "Two-dimension Statistics";
svgStr[89][1] = "Scatter Plot Matrix";
svgStr[90][1] = "Multiple Comparison";
svgStr[91][1] = "Statistics";
svgStr[92][1] = "Factor";
svgStr[93][1] = "Level";
svgStr[94][1] = "Paired Sample Data Graph";
svgStr[95][1] = "Standardized Residual vs Forecasting Plot";
svgStr[96][1] = "Standardized Residual vs Leverage Plot";
svgStr[97][1] = "Cook's Distance Graph";
svgStr[98][1] = "Cook's Distance";
svgStr[99][1] = "Data Order";
svgStr[100][1] = "Mean Difference";
svgStr[101][1] = "Testing Means";
svgStr[102][1] = "Treatment";
svgStr[103][1] = "Interaction";
svgStr[104][1] = "Row Total";
svgStr[105][1] = "Column Total";
svgStr[106][1] = "Multiple Correlation Coeff";
svgStr[107][1] = "<h3>Correlation Analysis</h3>";
svgStr[108][1] = "Correlation Matrix";
svgStr[109][1] = "Factor A - Factor B Mean Graph";
svgStr[110][1] = "Leverage";
svgStr[111][1] = "Geographic Information Graph";
svgStr[112][1] = "Range";
svgStr[113][1] = "Mean - Standard Deviation Graph";
svgStr[114][1] = "Population Variance";
svgStr[115][1] = "Hypothesis";
svgStr[116][1] = "Test";
svgStr[117][1] = "Variance";
svgStr[118][1] = "Interval Value";
svgStr[119][1] = "Category";
svgStr[120][1] = "Mode";
svgStr[121][1] = "Covariance";
svgStr[122][1] = "Pascal Triangle";
svgStr[123][1] = "Joint Probability";
svgStr[124][1] = "Conditional";
svgStr[125][1] = "Discrete Distribution";
svgStr[126][1] = "Row %";
svgStr[127][1] = "Col %";
svgStr[128][1] = "Tot %";
svgStr[129][1] = "Bar Graph Matrix";
svgStr[130][1] = "Prior Prob";
svgStr[131][1] = "Eigenvalue";
svgStr[132][1] = "Eigenvector";
svgStr[133][1] = "Multidimension Frequency Table";
svgStr[134][1] = "Hierarchical Cluster Graph";
svgStr[135][1] = "Distance";
svgStr[136][1] = "Single";
svgStr[137][1] = "Complete";
svgStr[138][1] = "Average";
svgStr[139][1] = "Centroid";
svgStr[140][1] = "Ward";
svgStr[141][1] = "Linkage";
svgStr[142][1] = "Number of Clusters <br>K";
svgStr[143][1] = "Bayes Information Criteria";
svgStr[144][1] = "Within Sum of Squares";
svgStr[145][1] = "Akaike Information Criteria";

svgStrU[1][1] = "Binomial Distribution";
svgStrU[2][1] = "repetition";
svgStrU[3][1] = "Mean";
svgStrU[4][1] = "Std Dev";
svgStrU[5][1] = "Poisson Distribution";
svgStrU[6][1] = "Geometric Distribution";
svgStrU[7][1] = "HyperGeometric Distribution";
svgStrU[8][1] = "Population";
svgStrU[9][1] = "Sample Dist";
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
svgStrU[21][1] = "Accuracy";
svgStrU[22][1] = "sample mean";
svgStrU[23][1] = "[TestStat]";
svgStrU[24][1] = "Distribution";
svgStrU[25][1] = "Reject H\u2080";
svgStrU[26][1] = "Accept H\u2080";
svgStrU[27][1] = "p-value";
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
svgStrU[43][1] = "<h3>Descriptive Statistics</h3>";
svgStrU[44][1] = "Observation";
svgStrU[45][1] = "Minimum";
svgStrU[46][1] = "Median";
svgStrU[47][1] = "Maximum";
svgStrU[48][1] = "Total";
svgStrU[49][1] = "Exponential";
svgStrU[50][1] = "Uniform";
svgStrU[51][1] = "Accuracy";
svgStrU[52][1] = "- Create points by click, then eStat finds a regression line.";
svgStrU[53][1] = "- Move or erase a point. Watch change of the regression line.";
svgStrU[54][1] = "[Sample Statistics] ";
svgStrU[55][1] = "[Sample 1 Statistics] ";
svgStrU[56][1] = "[Sample 2 Statistics] ";
svgStrU[57][1] = "confidence level";
svgStrU[58][1] = "Row & Col Independent";
svgStrU[59][1] = "Row & Col Dependent";
svgStrU[60][1] = "Observed Dist";
svgStrU[61][1] = "Theoretical Dist";
svgStrU[62][1] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][1] = "Wilcoxon Rank Sum Test";
svgStrU[64][1] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][1] = "Kruskal-Wallis Test";
svgStrU[66][1] = "Kruskal-Wallis H Distribution";
svgStrU[67][1] = "Kruskal-Wallis H Statistic";
svgStrU[68][1] = "Wilcoxon Signed Rank Sum Test";
svgStrU[69][1] = "Sign Test";
svgStrU[70][1] = "Friedman Test";
svgStrU[71][1] = "Friedman S Statistic";
svgStrU[72][1] = "Friedman S Distribution";
svgStrU[73][1] = "t value (or Z)";
svgStrU[74][1] = "ChiSq value";
svgStrU[75][1] = "Sample Variance";
svgStrU[76][1] = "Difference of Sample Means";
svgStrU[77][1] = "Ratio of Sample Variances";
svgStrU[78][1] = "Variance Assumption";
svgStrU[79][1] = "Summary Data";
svgStrU[80][1] = "Multiple Selection";
svgStrU[81][1] = "Select up to two groups";
svgStrU[82][1] = "X Var";
svgStrU[83][1] = "Y Var";
svgStrU[84][1] = "by";
svgStrU[85][1] = "No Group Variable";
svgStrU[86][1] = "Selected data: ";
svgStrU[87][1] = "Raw Data";
svgStrU[88][1] = "Select variables by click var name";
svgStrU[89][1] = "Missing Observations";
svgStrU[90][1] = "Rank Sum";
svgStrU[91][1] = "Longitude";
svgStrU[92][1] = "Latitude";
svgStrU[93][1] = "At least one pair of locations is different";
svgStrU[94][1] = "Wilcoxon Signed Rank Sum Distribution";
svgStrU[95][1] = "Paired Var";
svgStrU[96][1] = "Paired Data";
svgStrU[97][1] = "Independence Test";
svgStrU[98][1] = "Simulation";
svgStrU[99][1] = "Random Number";
svgStrU[100][1] = "Normal Distribution";
svgStrU[101][1] = "t Distribution";
svgStrU[102][1] = "&chi;&#178; Distribution";
svgStrU[103][1] = "F Distribution";
svgStrU[104][1] = "HSD Studentized Range Distribution";
svgStrU[105][1] = "1st Quartile";
svgStrU[106][1] = "3rd Quartile";
svgStrU[107][1] = "Interquartile Range";
svgStrU[108][1] = "Coefficient of Variation";
svgStrU[109][1] = "Cumulated Relative Frequency (%)";
svgStrU[110][1] = "Max number of integers of Uniform Dist";
svgStrU[111][1] = "Move a point using mouse";
svgStrU[112][1] = "with replacement";
svgStrU[113][1] = "without replacement"; 
svgStrU[114][1] = "Line"; 
svgStrU[115][1] = "Percent Change";
svgStrU[116][1] = "Simple Index";
svgStrU[117][1] = "Time Lag";
svgStrU[118][1] = "Difference";
svgStrU[119][1] = "Autocorrelation";
svgStrU[120][1] = "Log";
svgStrU[121][1] = "Square Root";
svgStrU[122][1] = "Box-Cox";
svgStrU[123][1] = "Base time"; 
svgStrU[124][1] = "Centered Moving Average";
svgStrU[125][1] = "Exponential Smoothing";
svgStrU[126][1] = "Centered Moving Median";
svgStrU[127][1] = "Model";
svgStrU[128][1] = "Moving Average";
svgStrU[129][1] = "Double Moving Average";
svgStrU[130][1] = "Holt Double Exponential Smoothing";
svgStrU[131][1] = "Seasonal Index";
svgStrU[132][1] = "Holt-Winters Multiplicative Seasonal Model";
svgStrU[133][1] = "Deseasonal Series";
svgStrU[134][1] = "Block";
svgStrU[135][1] = "Cluster Analysis";
svgStrU[136][1] = "Cluster";
svgStrU[137][1] = "Decision Tree";
svgStrU[138][1] = "Decision Rule Condition";
svgStrU[139][1] = "Decision";
svgStrU[140][1] = "Iteration";
svgStrU[141][1] = "Parallel Graph";
svgStrU[142][1] = "Classification";
svgStrU[143][1] = "Classification Function";
svgStrU[144][1] = "Classification Result";
svgStrU[145][1] = "Decision";
svgStrU[146][1] = "Misclassification Rate";
svgStrU[147][1] = "Cell";
svgStrU[148][1] = "Training Data";
svgStrU[149][1] = "Testing Data";

// Japanese
$message.ja = {
    "eStat : Stat Education SW": "eStat: 統計教育SW",
    "Home": "ホームページ",
    "Filename": "ファイル",
    "Selected Variables": "選択変数",
    "Cancel": "キャンセル",
    "Edit Variables": "変数編集",
    "Level": "レベル",
    "ElementaryLevel": "小学生",
    "MiddleLevel": "中学生",
    "HighLevel": "高学生",
    "UniversityLevel": "大学生",
    "Example": "例題データ読み込み",
    "New Sheets": "新規シート",
    "csv Open": "csv読み込み",
    "www Open": "wwwから読み込み",
    "json Open": "json読み込み",
    "csv Save": "csv保存",
    "json Save": "json保存",
    "Print Sheet": "シートプリント",
    "Bar Graph": "棒グラフ",
    "Pie Chart": "円グラフ",
    "Band Graph": "帯グラフ",
    "Line": "折れ線",
    "Line Graph": "折れ線グラフ",
    "Dot Graph": "ドットグラフ",
    "Histogram": "ヒストグラム",
    "Stem & Leaf Plot": "幹葉図",
    "maxStem": "** 最大幹数 <= 30 **",
    "Box-Whisker Plot": "箱ひげ図",
    "Scatterplot": "散布図",
    "ScatterplotMatrix": "散布図行列",
    "Frequency Table": "度数分布表",
    "Basic Statistics": "基礎統計量",
    "Testing Hypothesis &mu;": "推定・検定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "推定・検定 &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "母平均の仮説検定 (2集団) &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "母分散の仮説検定 (2集団) &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "分散分析",
    "MiddleSchool": "中学統計",
    "HighSchool":   "高校統計",
    "University":   "大学統計",
    "eStatHeading": "eStat は、動的なデータの視覚化とグラフィカルな統計分析を使用して、より良い統計教育を行うための Web ベースのフリーウェアです。",
    "Support":      "サポート",
    "Donation":     "寄付",
    "Middle School Stat Education": "中学統計教育",
    "High School Stat Education": "高校統計教育",
    "University Stat Education": "大学統計教育",
    "Elem Stat Graph Example": "小中学グラフの例",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "縦型",
    "Horizontal": "横型",
    "Vertical Separated Bar": "縦分離型",
    "Vertical Stacked Bar": "縦積み重ね型",
    "Vertical Ratio Bar": "縦比率型",
    "Vertical Side by Side Bar": "縦並び型",
    "Vertical Two Sided Bar": "縦両側型",
    "Horizontal Separated Bar": "横分離型",
    "Horizontal Stacked Bar": "横積み重ね型",
    "Horizontal Ratio Bar": "横比率型",
    "Horizontal Side by Side Bar": "横並び型",
    "Horizontal Two Sided Bar": "横両側型",
    "Doughnut Graph": "ドーナツグラフ",
    "Two Sided Stem & Leaf Plot": "両側幹葉図",
    "Graph Save": "グラフ保存",
    "Graph Print": "グラフ印刷",
    "Move to Table": "テーブルへ移動",
    "Edit Title": "タイトル編集",
    "Table Save": "テーブル保存",
    "Table Print": "テーブル印刷",
    "Frequency": "度数",
    "Sorting": "並べ替え",
    "SortData": "並べ替えデータ",
    "Raw Data": "元データ",
    "Descending": "降順",
    "Ascending": "昇順",
    "Mean": "平均",
    "Std Deviation": "標準偏差",
    "MeanStd": "平均/標準偏差",
    "DotMeanStd": "ドットグラフ - 平均/標準偏差",
    "95CI": "95%信頼区間",
    "CorrelationAnalysis": "相関分析",
    "RegressionAnalysis": "回帰分析",
    "RegressionAnalysis1": "線形回帰分析",
    "RegressionAnalysis2": "多数線形回帰分析",
    "ANOVA2": "2元分散分析",
    "Regression": "回帰直線",
    "RegressionLine": "回帰直線",
    "RegressionBand": "信賴帶",
    "RegressionTable": "回帰分析表",		
    "Frequency Polygon": "度数分布多角形",
    "Execute New Interval": "区間を変えて実行",
    "Interval Start": "区間始点",
    "Interval Width": "区間の幅",
    "t-test": "t 検定",
    "Z-test": "Z 検定",
    "(if Z-test, enter &sigma;)": "(Z 検定のとき入力)",
    "Significance Level": "有意水準",
    "Execute": "実行",
    "(Confidence Interval)": "(信頼区間)",
    "(if Z-test, Z<sub>&alpha;/2 </sub> is used)": "(Z 検定のとき, Z &sigma;利用)",
    "&chi;<sup>2</sup> test": "&chi;&#178; 検定",
    "Variance Assumption": "分散の仮定",
    "Variance": "分散",
    "F test": "F 検定",
    "At least one pair of means is different": "少なくとも一つ以上のペアの平均が異なる",
    "Main Title": "タイトル",
    "y title": "y軸タイトル",
    "x title": "x軸タイトル",
    "yAxis": "Y軸",
    "Modify": "修正",
    "Confirm": "確認",
    "Variable Name": "変数名",
    "Variable Value": "変数値",
    "Value Label": "変数ラベル",
    "* Less than nine value labels allowed.": "* 9個以下の変数名を指定することができます.",
    "Save": "保存",
    "Exit": "閉じる",
    "eStatU UnivStatEdu":   "eStatU - 大学統計教育",
    "eStatH HighStatEdu":   "eStatH - 高校統計教育",
    "eStatM MiddleStatEdu": "eStatM - 中学統計教育",
    "MiddleStat": "中統計",
    "HighStat":   "高統計",
    "UnivStat":   "統計データサイエンス",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "電子書籍リンク (English)",
    "Menu": "メニュー",
    "Binomial Experiment": "二項分布シミュレーション",
    "Binomial Distribution": "二項分布",
    "Binomial Prob Table": "二項分布表",
    "Poisson Distribution": "ポアソン分布",
    "Poisson Prob Table": "ポアソン分布表",
    "Geometric Distribution": "幾何分布",
    "Geometric Prob Table": "幾何分布表",
    "HyperGeometric Distribution": "超幾何分布",
    "HyperGeometric Prob Table": "超幾何分布表",
    "Exponential Distribution": "指数分布",
    "Normal Experiment": "正規分布シミュレーション",
    "Normal Distribution": "正規分布",
    "Normal Approx": "正規近似",
    "t Distribution": "t 分布",
    "ChiSquare Distribution": "カイ二乗分布",
    "F Distribution": "F 分布",
    "Sampling": "サンプル抽出",
    "Population vs Sample": "母集団とサンプル",
    "Population": "母集団",
    "Sample": "サンプル",
    "Exponential": "指数分布(0.3)",
    "Uniform": "一様分布(0,1)",
    "UniformDist": "一様分布",
    "Sample05": "5% 標本抽出",
    "Sample10": "10% 標本抽出",
    "Sample20": "20% 標本抽出",
    "Statistics/BoxPlot": "統計量/箱ひげ図",
    "StatisticalProb":     "統計的確率",
    "Law of Large Number": "大数の法則",
    "Dist of Sample Means": "標本平均の標本分布",
    "Sampling Distribution": "標本分布",
    "Sample Size": "サンプルサイズ",
    "Confidence Interval": "信頼区間",
    "Confidence Interval Simulation": "信頼区間シミュレーション",
    "Simulation": "シミュレーション",
    "Confidence Interval Mu": "推定 : &mu;",
    "Mu Confidence Interval": "信頼区間 &mu;",
    "Confidence Interval Sigma": "推定 : &sigma;&#178; ",
    "Confidence Interval P": "推定 : p",
    "Estimation Accuracy": "推定精度",
    "Repetition": "反復数",
    "Confidence Level": "信頼水準",
    "Testing Hypothesis mu_titleAB": "仮説検定母平均",
    "Testing Hypothesis mu_title": "仮説検定母平均",
    "Testing Hypothesis sigma_title": "仮説検定母分散",
    "Testing Hypothesis P_title": "仮説検定母比率",
    "Testing Hypothesis mu12_title": "母平均の仮説検定 (2集団)",
    "Testing Hypothesis sigma12_title": "母分散の仮説検定 (2集団)",
    "Testing Hypothesis P12_title": "母比率の仮説検定 (2集団)",
    "Testing Hypothesis muA":  "仮説検定母平均 - C, &beta;",
    "Testing Hypothesis muAB": "仮説検定母平均 - C, n",
    "Testing Hypothesis mu": "仮説検定母平均&mu;",
    "Testing Hypothesis sigma": "仮説検定母分散&sigma;&#178;",
    "Testing Hypothesis P": "仮説検定母比率p",
    "Testing Hypothesis mu12": "仮説検定母平均 (2集団) : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "仮説検定母分散 (2集団) : &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "仮説検定母比率 (2集団) : p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1因子分散分析",
    "Testing Hypothesis ANOVA2": "2因子分散分析",
    "SameSampleSize": "各セルのサンプル サイズは同じにする必要があります。",
    "Testing Independence": "カテゴリ型独立性検定",
    "CategoryD": "カテゴリ",
    "Category": "カテゴリ",
    "Correlation Coefficient": "相関係数",
    "Regression Experiment": "回帰シミュレーション",
    "Hypothesis": "仮説",
    "Test Type": "検定タイプ",
    "Z-test": "Z 検定",
    "t-test": "t 検定",
    "Chi-test": "カイ2乗検定",
    "F-test": "F 検定",
    "Sampling Type": "標本",
    "Independent Sample": "獨立標本",
    "Paired Sample": "対応のある２標本",
    "Sample Data": "標本データ",
    "input either sample data": "(標本データをここに入力, あるいは 次の標本統計量を入力(空白またはカンマ区切り)",
    "input data": "データを入力",
    "Sample Statistics": "標本統計量",
    "Sample Mean": "標本平均",
    "Sample Variance": "標本分散",
    "Sample Proportion": "標本比率",
    "sample range": "標本範囲",
    "control chart": "範囲管理図",
    "if Z-test-1": "(Z 検定の場合, 母分散を入力)",
    "if Z-test-2": "(Z 検定の場合, z<sub>&alpha;/2 </sub> 使用)",
    "At least one pair": "少なくとも一つのペアの平均が異なる",
    "Row-Col-0": "行変数と列変数は独立である",
    "Row-Col-1": "行変数と列変数は独立ではない",
    "Enter any number of row": "(左上のセルから行と列の観測度数入力)",
    "Row": "行",
    "Column": "列",
    "Probability": "確率",
    "Show Probability": "確率表示",
    "Regression Line": "回帰直線",
    "Erase All": "データの消去",
    "Add Point": "点追加",
    "Erase Point": "点クリア",
    "Reference Site": "参考サイト",
    "Lot Size": "ロットの数",
    "Defect Size": "不良品の数",
    "Defect Rate": "不良率",
    "If typed": "番号を入力したら、[実行]/[入力]をクリック",
    "Stat/BoxPlot": "統計量/箱ひげ図",
    "Mean": "平均",
    "Std Dev": "標準偏差",
    "SimulationWarning": "(現在シミュレーションが終わるまで、お待ちください。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;シミュレーション途中で設定を変更して実行すると正しく表示されません。)",
    "OneGroup": "(1 グループ)",
    "AnalysisVar": "分析変数",
    "AnalysisVar2": "Y変数",
    "GroupVar": "グループ",
    "GroupVar2": "X変数",
    "GroupVar3": "因子1",
    "GroupVar4": "因子2",
    "AnalysisVarMu12": "分析(or X1)変数",
    "GroupVarMu12": "グループ(or X2)変数",
    "PairedMu12": " X1,X2 : 対応データ",
    "SizeVar": "大小変数",
    "RegressionBand": "信頼帯",
    "RegressionTable": "回帰分析",
    "RegressionResidual": "殘差プロット",
    "RegressionResidualLeverage": "殘差-レバレッジ",
    "RegressionCook": "Cook 距離グラフ",
    "RegressionQQ": "殘差Q-Qプロット",
    "HistogramNormal": "ヒストグラム",
    "HistogramChisq": "正規性検定",
    "HistogramNormalQQ": "正規Q-Qプロット",
    "PopulationStd": "母標準偏差",
    "Type1Error": "第一種過誤",
    "Type2Error": "第二種過誤",
    "AnovaTable": "分散分析表",
    "AnovaMeanGraph": "信賴區間圖",
    "MultipleComparison": "多重比較",
    "ComparisonGraph": "比較グラフ",
    "AnovaResidual": "殘差プロット",
    "AnovaQQ": "殘差Q-Qプロット",
    "TestingFit": "カテゴリ型適合性檢定",
    "FitTest0": "観測分布 = 理論分布",
    "FitTest1": "観測分布 != 理論分布",
    "ObservedFreq": "観測度數 O",
    "ExpectedProb": "期待確率 p",
    "ExpectedFreq": "期待度數 E(>5)",
    "InputFitData": "左上のセルから入力",
    "ExecuteTable": "統計量",
    "MeanDotGraph": "信頼区間図",
    "ScatterRegression": "散布図",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "交互作用無",
    "ExistInteraction": "交互作用有",
    "eStatLecture": "eStat 講義",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "ウィルコクソン順位合檢定", 
    "NonParametricMu12": "ウィルコクソン順位合檢定 : 位置母數 M<sub>1</sub>, M<sub>2</sub>", 
    "Sample Range": "標本順位合",
    "DistributionTable": "分布表",
    "SignedRankTestDist": "ウィルコクソン符號順位合分布",
    "WilcoxonTestDist": "ウィルコクソン順位合分布",
    "KruskalTestDist": "クルスカル-ウォリス H分布",
    "FriedmanTestDist": "フリードマン S分布",
    "SignedRankTest": "ウィルコクソン符號順位合檢定",
    "SignTest": "ウィルコクソン符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "ウィルコクソン順位合檢定",
    "KruskalTest": "ウィルコクソンクルスカル-ウォリス檢定",
    "KruskalTestANOVA": "ウィルコクソンクルスカル-ウォリス檢定",
    "Total": "全体",
    "FriedmanTest": "ウィルコクソンフリードマン檢定",
    "FriedmanTestANOVA": "ウィルコクソンフリードマン檢定",
    "Block": "ブロック",
    "Treatment": "處理",
    "At least one locations is different": "位置母数 !=",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 正規近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 ウィルコクソン順位合檢定,  n > 20 正規近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  順位合檢定,  n>25 正規近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;&#178;近似檢定",
    "VariableSelect": "* データ分析 : 変数選択 >> クリックアイコン *",
    "VariableSelect2": "* 変数選択 : クリック変数名 / 右側選択はこ利用 ",
    "VariableSelect3": "変数選択",
    "VariableSelect4": "より多くの分析変数を選択できます",
    "VariableSelect5": "より多くのX変数を選択できます",
    "SummaryData": "要約データ",
    "RawData": "原データ",
    "MultiSelect": "",
    "DataType": "(変数名をクリックして変数を選択)",
    "by": "by",
    "NameVar": "名前変数",
    "n_variance": "n式",
    "RandomNumber": "乱数",
    "RealNumber":     "実数",
    "IntegerNumber":  "整数",
    "NumberData":     "データ数",
    "NumberDigit":    "小数桁数",
    "NormalTable":    "正規分布表",
    "Percentile":     "百分位数表",
    "PercentileValue": "百分位数",
    "StudentRangeDist": "HSDスチューデント化範囲分布",
    "copy link": "リンクをコピー",
    "WithReplacement":    "復元抽出",
    "WithoutReplacement": "非復元抽出",
    "Replacement":     "復元",
    "NonReplacement":  "非復元",
    "WordCloud":       "ワードクラウド（英語のみ）",
    "oneColor":        "色",
    "defaultColor":    "デフォルトの色",
    "RelativeFreq":    "相対度数",
    "Density":         "密度",
    "MarginOfError":   "誤差の範囲",
    "Permutation":     "順列",
    "PermutationSame": "同じものがある順列",
    "Combination":     "組合",
    "NumberOfCase":    "場合の数",
    "BinomialTheorem": "二項定理",
    "PascalTriangle":  "パスカルトライアングル",
    "Character":       "絵文字",
    "AdditionRule":      "確率加法規則",
    "MultiplicationRule": "確率乗法規則",
    "ConditionalProb":   "条件付確率",
    "JointProb":         "結合確率",
    "DiscreteDist":      "離散確率分布",
    "Categorize":        "カテゴリー化",
    "Recode":            "変量値の再指定",
    "Compute":           "新しい変量の計算",
    "SelectIf":          "データ選択",
    "InfoValueLabel":    "*** 変量を選択し、変量名または変量値名を。",
    "InfoSorting":       "*** ソートする変量を3つまで選択し、ソート方法を選択して実行ボタンを押します。",
    "InfoCategorize":    "*** カテゴリー化する変量を選択したら、区間開始と区間幅を入力し、「カテゴリーリストを確認」して実行ボタンを押します。",
    "InfoRecode":        "*** 変量値再割り当てする変数を選択し、新しい変量値を入力して実行ボタンを押します。",
    "InfoRecode2":       "* 9つまでの値を上書きできます。",
    "InfoCompute":       "*** 新しい変量計算のための計算式を下のボタンを使って作成し、実行ボタンを押してください。",
    "InfoSelectIf":      "*** データ選択のための3つまでの変量を選択し、各変量の条件式を入力して実行ボタンを押してください。",
    "SortingVariable":   "並べ替え",
    "SortingMethod":     "ソート方法",
    "NewVariable":       "新しい変量",
    "CategoryVariable":  "カテゴリー化変量",
    "CategoryListCheck": "カテゴリリストの確認",
    "CategoryInterval":  "カテゴリ区間",
    "CategoryLabel":     "カテゴリ名",
    "RecodeVariable":    "変量値再指定変量",
    "CurrentValue":      "現在の変量値",
    "NewValue":          "新しい変量値",
    "ComputeFormula":    "計算式",
    "SelectVariable":    "選択変数",
    "RelationOperator":  "関係演算子",
    "SelectValue":       "値",
    "MissingValue":      "缺測値",
    "option":            "選択",
    "TimeSeries":        "時系列",
    "Smoothing":         "平滑",
    "Filtering":         "フィルタリング",
    "Transformation":    "変換",
    "Weight":            "加重",
    "WeightedIndex":     "加重指数",
    "BaseTime":          "基準時",
    "LagTime":           "時差",
    "Lag":               "時差",
    "Forecasting":       "予測",
    "SeasonalModel":     "季節モデル",
    "HoltWinter":        "ホルト - ウィンターズ乗法季節モデル",
    "Trend":             "傾向",
    "Seasonal":          "季節",
    "Deseasonal":        "非季節時系列",
    "Nseason":           "季節サイクル",
    "Irregular":         "非規則",
    "TrendModel":        "非季節の傾向モデル",
    "RegressionModel":   "回帰モデル",
    "ForecastingPeriod": "予測期間",
    "CreateTable":       "データテーブル",
    "SaveTable":         "テーブル保存",
    "MA":                "移動平均",
    "EWMA":              "指數平滑",
    "CenterMA":          "中心移動平均",
    "MovingMedian":      "中心移動中央値",
    "ES":                "指数平滑",
    "Default":           "デフォルト",
    "Linear":            "線形",
    "Quadratic":         "二次式",
    "Cubic":             "三茶式",
    "SquareRoot":        "平方根",
    "Log":               "ログ",
    "Exponent":          "指数",
    "Power":             "べき関数",
    "BoxCox":            "ボックス - コックス",
    "SingleMA":          "単純移動平均",
    "SingleES":          "単純指数平滑",
    "DoubleMA":          "二重移動平均",
    "DoubleES":          "二重指数平滑",
    "HoltLinear":        "ホルト線形傾向",
    "DeseasonIntercept": "非季節切片",
    "DeseasonSlope":     "非季節の傾き",
    "SeasonalIndex":     "季節指数",
    "Diff":              "差分",
    "DiffTime":          "差分時間",
    "AR":                "自己回帰モデル",
    "ResultTable":       "回帰結果表",
    "ForecastTable":     "予測表",
    "HoltLevel":         "水平",
    "HoltTrend":         "トレン",
    "AutoCorrTable":     "自己相関表",
    "DiffSeries":        "差分時系列",
    "RawSeries":         "原始時系列",
    "RBD":               "確率化ブロック計画法",
    "Latin":             "ラテン防撃法",
    "Chapter01":         "&nbsp;第1章 統計データ科学",
    "Chapter02":         "&nbsp;第2章 定性データの可視化",
    "Chapter03":         "&nbsp;第3章 定量データの可視化",
    "Chapter04":         "&nbsp;第4章 表測度を使用したデータの整理",
    "Chapter05":         "&nbsp;第5章 確率と確率分布",
    "Chapter06":         "&nbsp;第6章 サンプル統計量の分布と推定",
    "Chapter07":         "&nbsp;第7章 ある母集団変数の仮説検定",
    "Chapter08":         "&nbsp;第8章 2母集団パラメータの仮説検定",
    "Chapter09":         "&nbsp;第9章 複数の母平均の仮説検定",
    "Chapter10":         "第10章 非パラメトリック仮説検定",
    "Chapter11":         "第11章 カテゴリー型データの仮説検定",
    "Chapter12":         "第12章 相関と回帰分析",
    "Chapter13":         "第13章 時系列分析",
    "Distribution":      "確率分布",
    "DecisionTree":      "デシジョンツリー",
    "MaxDepth":          "ツリーの最大深さ",
    "MinData":           "ブランチデータの最小値",
    "Discriminant":      "判別分析",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Japanese
appStr[0][2] = "/estat/eStat/index.html";
appStr[1][2] = "/estat/eStatH/index.html";
appStr[2][2] = "/estat/eStatU/index.html";
appStr[3][2] = "/estat/eStatE/index_en.html";
appStr[4][2] = "/estat/eHelp/index_en.html";
appStr[5][2] = "index.html";
appStr[6][2] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][2] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][2] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][2] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][2] = "";
appStr[11][2] = "Large Population Country";
appStr[12][2] = "Life Expectancy (OECD)";
appStr[13][2] = "Population Pyramid (Korea)";
appStr[14][2] = "GNP per Capita (OECD)";
appStr[15][2] = "Top World Export Country";
appStr[16][2] = "Obesity % of Population";
appStr[17][2] = "Temperature of Major City";
appStr[18][2] = "Top CO2 Emission Country";
appStr[19][2] = "Alcohol Consume (OECD)";
appStr[20][2] = "Continuous Data Graph";
appStr[21][2] = "Length of Otter";
appStr[22][2] = "Age of Teacher";
appStr[23][2] = "Age of Teacher by Sex";
appStr[24][2] = "Cleanliness of Tooth";
appStr[25][2] = "Math Exam Scores";
appStr[26][2] = "Calorie of Hamberger";
appStr[27][2] = "Height vs Weight by Sex";
appStr[28][2] = "Discrete Data Graphs";
appStr[29][2] = "";
appStr[30][2] = "";
appStr[31][2] = "unit";
appStr[32][2] = "Country";
appStr[33][2] = "Male";
appStr[34][2] = "Female";
appStr[35][2] = "Age";
appStr[36][2] = "Person";
appStr[37][2] = "billion $";
appStr[38][2] = "Export";
appStr[39][2] = "Obesity %";
appStr[40][2] = "Celsius";
appStr[41][2] = "City";
appStr[42][2] = "Jan High";
appStr[43][2] = "Jul High";
appStr[44][2] = "million ton";
appStr[45][2] = "liter/year";
appStr[46][2] = "Alcohol";
alertMsg[1][2] = "選択した変数の中に、欠損値が含まれています!";
alertMsg[2][2] = "変数の番号をクリックし，シートから変数を選んでください. 変数が2つ以上の場合は，1番目の変数がグループ変数として指定されます. ";
alertMsg[3][2] = "選択した列に欠損値があります.";
alertMsg[4][2] = "各列のデータ数が異なるか欠損値が存在すると処理できません.";
alertMsg[5][2] = "グループの数が多すぎると画面の都合によりグラフが重なることがあります.";
alertMsg[6][2] = "要約データの変数に文字が入っているので、グラフの作成と度数分布表の出力ができません.";
alertMsg[7][2] = "元データから2個以上の変数を選択した場合はグラフや表を作成できません.";
alertMsg[8][2] = "ドットプロットはデータの数が200個以下のとき可能です.";
alertMsg[9][2] = "幹葉図はデータ数が100個以下のときのみ可能です.";
alertMsg[10][2] = "分析変数選択選択ならなかった";
alertMsg[11][2] = "分析/グループ変数選択選択ならなかった";
alertMsg[12][2] = "選択変数が文字を含んでいるためグラフや度数分布表が出力できません.";
alertMsg[13][2] = "";
alertMsg[14][2] = "要約データの形式は連続型グラフおよび仮説検定に適用できません";
alertMsg[16][2] = "仮説検定が可能なのは，グループが2つの場合のみです.";
alertMsg[17][2] = "散布図を作成するためにはx軸変数とy軸変数が必要です.";
alertMsg[18][2] = "3つ以上の変数は許可されません.";
alertMsg[19][2] = "データに文字がある場合、分析はできません";
alertMsg[20][2] = "データの中に文字が入っているため回帰分析ません";
alertMsg[21][2] = "データに欠損値があると保存できません.";
alertMsg[22][2] = "負の値での棒グラフは描けません.";
alertMsg[25][2] = "１つのグループの場合, 積み重ね型棒グラフは描けません.";
alertMsg[27][2] = "１つのグループの場合, 比率型グラフは描けません.";
alertMsg[29][2] = "１つのグループの場合, 並び型グラフは描けません.";
alertMsg[31][2] = "１つのグループの場合, 両側型グラフは描けません.";
alertMsg[32][2] = "負の値での円グラフは描けません.";
alertMsg[33][2] = "負の値でのドーナツグラフは描けません.";
alertMsg[34][2] = "負の値での帯グラフは描けません.";
alertMsg[35][2] = "負の値での度数分布表は表示できません.";
alertMsg[36][2] = "2グループに対する両側型グラフは描けません.";
alertMsg[37][2] = "一つの変数のみ仮説検定することが可能です.";
alertMsg[38][2] = "mu の値がはいっていません。値を入力してから再度おこなってください.";
alertMsg[39][2] = "標準偏差が0かはいっていません。再度おこなってください.";
alertMsg[40][2] = "分散の値がはいっていません。値を入力してから再度おこなってください.";
alertMsg[41][2] = "仮説検定を行うには，2つの変数(グループ変数と解析する変数)を指定します.";
alertMsg[42][2] = "仮説検定のタイトルは編集できません! ";
alertMsg[43][2] = "單純線形回歸1グループ";
alertMsg[44][2] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][2] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][2] = "同一変数名選擇";
alertMsg[47][2] = "周波数の文字データは許可されません!!!   もう一度やってみて。"; 
alertMsg[48][2] = "文字データは許可されません!!!   もう一度やってみて。"; 
alertMsg[49][2] = "観測回数は100回未満にすべきだ！   もう一度やってみてください。";
alertMsg[50][2] = "開始間隔またはステップ間隔に数字を入力してください。";
alertMsg[51][2] = "数字を入力してください。行数は同じでなければなりません。   もう一度やってみてください。";
alertMsg[52][2] = "カテゴリと頻度に数字を入力してください」";
alertMsg[53][2] = "インターバルサイズが同じではありません。   もう一度やってみてください。";
alertMsg[54][2] = "Xの観測はYの観測と等しくない！！   もう一度やってみてください。";
alertMsg[55][2] = "!!!シートにデータがありません。";
alertMsg[56][2] = "!!!変数が選択されていません。";
alertMsg[57][2] = "!!!開始間隔と幅を入力してください。";
alertMsg[58][2] = "!!!インターバル開始とインターバル幅を数値で入力してください。";
alertMsg[59][2] = "!!!9インターバル以上-インターバル幅を変更する";
alertMsg[60][2] = "!!!この変数の値は9を超えます。";
alertMsg[61][2] = "!!!値が入力されていません。";
alertMsg[62][2] = "!!!数式を入力してください。";
alertMsg[63][2] = "!!!条件を満たすデータがありません。";
alertMsg[64][2] = "";
alertMsg[65][2] = ""; 
alertMsg[66][2] = "";
alertMsg[67][2] = "";
alertMsg[68][2] = "";
alertMsg[69][2] = "";

svgStr[1][2] = " 棒グラフ";
svgStr[2][2] = " 円グラフ";
svgStr[3][2] = " ドーナツグラフ";
svgStr[4][2] = " 帯グラフ";
svgStr[5][2] = " 折れ線グラフ";
svgStr[6][2] = " 点グラフ";
svgStr[7][2] = " 箱ひげ図";
svgStr[8][2] = " 幹葉図";
svgStr[9][2] = " ヒストグラム";
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
svgStr[24][2] = "大小";
svgStr[25][2] = "<h3>度数分布表</h3>";
svgStr[26][2] = "分析変数";
svgStr[27][2] = "変数値";
svgStr[28][2] = "変数値ラベル";
svgStr[29][2] = "度数";
svgStr[30][2] = "相対度数";
svgStr[31][2] = "<h3>クロス表</h3>";
svgStr[32][2] = "列変数";
svgStr[33][2] = "行変数";
svgStr[34][2] = "平均";
svgStr[35][2] = "標準偏差";
svgStr[36][2] = "<h3> 区間別<br>度数分布表</h3>";
svgStr[37][2] = "グループ名";
svgStr[38][2] = "階級区間";
svgStr[39][2] = "幹";
svgStr[40][2] = "葉";
svgStr[41][2] = "グループ1の葉";
svgStr[42][2] = "グループ2の葉";
svgStr[43][2] = "<h3>基礎統計量</h3>";
svgStr[44][2] = "データ数";
svgStr[45][2] = "最小値";
svgStr[46][2] = "中央値";
svgStr[47][2] = "最大値";
svgStr[48][2] = "全体";
svgStr[49][2] = "<h3>正規性檢定</h3>";
svgStr[50][2] = "期待度数 > 5 <br> 推奨";
svgStr[51][2] = "&chi;&#178; 檢定<br>區間 i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][2] = "データ<br>観測度数<br>(O<sub>i</sub>)";
svgStr[53][2] = "正規分布<br>期待確率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][2] = "正規分布<br>期待度数<br>(E<sub>i</sub>)";
svgStr[55][2] = "&chi;&#178; 値<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][2] = "総&chi;&#178;値";
svgStr[57][2] = "確率ヒストグラム, 正規分布";
svgStr[58][2] = "正規Q-Qプロット";
svgStr[59][2] = "正規分位数";
svgStr[60][2] = "相關係数";
svgStr[61][2] = "決定係数";
svgStr[62][2] = "標準誤差";
svgStr[63][2] = "變数";
svgStr[64][2] = "變数名";
svgStr[65][2] = "獨立變数";
svgStr[66][2] = "從屬變数";
svgStr[67][2] = "母数";
svgStr[68][2] = "推定値";
svgStr[69][2] = "値";
svgStr[70][2] = "切片";
svgStr[71][2] = "傾き";
svgStr[72][2] = "要因";
svgStr[73][2] = "二乗和";
svgStr[74][2] = "自由度";
svgStr[75][2] = "偏差二乗和";
svgStr[76][2] = "回帰";
svgStr[77][2] = "誤差";
svgStr[78][2] = "全体";
svgStr[79][2] = "<h3>回帰分析</h3>";
svgStr[80][2] = "標準化残差Q-Qプロット";
svgStr[81][2] = "標準化残差";
svgStr[82][2] = "正規分位數";
svgStr[83][2] = "残差プロット";
svgStr[84][2] = "豫測値";
svgStr[85][2] = "二元分散分析";
svgStr[86][2] = "信頼区間プロット";
svgStr[87][2] = "残差";
svgStr[88][2] = "二元統計量";
svgStr[89][2] = "散布図行列";
svgStr[90][2] = "多重比較";
svgStr[91][2] = "統計量";
svgStr[92][2] = "因子";
svgStr[93][2] = "水準";
svgStr[94][2] = "対応標本差プロット";
svgStr[95][2] = "残差-豫測";
svgStr[96][2] = "残差-レバレッジ";
svgStr[97][2] = "クック距離図";
svgStr[98][2] = "クック距離";
svgStr[99][2] = "資料順序";
svgStr[100][2]= "平均差";
svgStr[101][2]= "平均差檢定";
svgStr[102][2]= "處理";
svgStr[103][2]= "交互作用";
svgStr[104][2]= "行合";
svgStr[105][2]= "列合";
svgStr[106][2]= "重相關係數";
svgStr[107][2]= "<h3>相關分析</h3>";
svgStr[108][2]= "相關係數行列";
svgStr[109][2]= "因子A-因子B 平均図";
svgStr[110][2]= "レバレッジ";
svgStr[111][2]= "地理情報グラフ";
svgStr[112][2]= "範囲";
svgStr[113][2]= "平均 - 標準偏差図";
svgStr[114][2]= "母分散";
svgStr[115][2]= "仮説";
svgStr[116][2]= "檢定";
svgStr[117][2]= "分散";
svgStr[118][2] = "階級区間値";
svgStr[119][2] = "カテゴリ";
svgStr[120][2] = "最頻値";
svgStr[121][2] = "共分散";
svgStr[122][2] = "パスカル三角形";
svgStr[123][2] = "結合確率";
svgStr[124][2] = "条件付き";
svgStr[125][2] = "離散型分布";
svgStr[126][2] = "行 %";
svgStr[127][2] = "列 %";
svgStr[128][2] = "全体 %";
svgStr[129][2] = "棒グラフ マトリックス";
svgStr[130][2] = "事前確率";
svgStr[131][2] = "固有値";
svgStr[132][2] = "固有ベクトル";
svgStr[133][2] = "多次元頻度テーブル";
svgStr[134][2] = "階層型クラスター グラフ";
svgStr[135][2] = "距離";
svgStr[136][2] = "単一";
svgStr[137][2] = "完了";
svgStr[138][2] = "平均";
svgStr[139][2] = "重心";
svgStr[140][2] = "ワード";
svgStr[141][2] = "リンケージ";
svgStr[142][2] = "Number of Clusters <br>K";
svgStr[143][2] = "Bayes Information Criteria";
svgStr[144][2] = "Within Sum of Squares";
svgStr[145][2] = "Akaike Information Criteria";

svgStrU[1][2] = "二項分布";
svgStrU[2][2] = "反復数";
svgStrU[3][2] = "平均";
svgStrU[4][2] = "標準偏差";
svgStrU[5][2] = "ポアソン分布";
svgStrU[6][2] = "幾何分布";
svgStrU[7][2] = "超幾何分布";
svgStrU[8][2] = "母集団";
svgStrU[9][2] = "標本分布";
svgStrU[10][2] = "大数の法則";
svgStrU[11][2] = "裏";
svgStrU[12][2] = "表";
svgStrU[13][2] = "コイン表";
svgStrU[14][2] = "  表の数  ";
svgStrU[15][2] = "  試行回数  ";
svgStrU[16][2] = "標本平均の分布";
svgStrU[17][2] = "反復";
svgStrU[18][2] = "標準誤差";
svgStrU[19][2] = "母平均";
svgStrU[20][2] = "信頼区間";
svgStrU[21][2] = "推定精度";
svgStrU[22][2] = "標本平均";
svgStrU[23][2] = "[検定統計量]";
svgStrU[24][2] = "分布";
svgStrU[25][2] = "棄却 H\u2080";
svgStrU[26][2] = "採択 H\u2080";
svgStrU[27][2] = "p-値";
svgStrU[28][2] = "[意思決定] ";
svgStrU[29][2] = "[分散分析]";
svgStrU[30][2] = "相関係数を入力し、実行ボタンをクリックしてください.";
svgStrU[31][2] = "回帰直線";
svgStrU[32][2] = "列変数";
svgStrU[33][2] = "行変数";
svgStrU[34][2] = "平均";
svgStrU[35][2] = "標準偏差";
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
svgStrU[53][2] = "- クリックして1つの点を移動/削除しながら回帰直線の変化を観察";
svgStrU[54][2] = "[標本統計量] ";
svgStrU[55][2] = "[標本 1 統計量] ";
svgStrU[56][2] = "[標本 2 統計量] ";
svgStrU[57][2] = "信頼水準";
svgStrU[58][2] = "行列独立";
svgStrU[59][2] = "行列独立ない";
svgStrU[60][2] = "観測分布";
svgStrU[61][2] = "理論分布";
svgStrU[62][2] = "観測分布適合性檢定";
svgStrU[63][2] = "ウィルコクソン順位合檢定";
svgStrU[64][2] = "ウィルコクソン順位合檢定分布";
svgStrU[65][2] = "クルスカル-ウォリス檢定";
svgStrU[66][2] = "クルスカル-ウォリス H分布";
svgStrU[67][2] = "クルスカルl-ウォリス H統計量";
svgStrU[68][2] = "ウィルコクソン符號順位合檢定";
svgStrU[69][2] = "符號檢定";
svgStrU[70][2] = "フリードマン檢定";
svgStrU[71][2] = "フリードマン S統計量";
svgStrU[72][2] = "フリードマン S分布";
svgStrU[73][2] = "t 値 (Z)";
svgStrU[74][2] = "ChiSq-値";
svgStrU[75][2] = "標本分散";
svgStrU[76][2] = "標本平均差";
svgStrU[77][2] = "標本分散比";
svgStrU[78][2] = "分散の仮定";
svgStrU[79][2] = "要約データ";
svgStrU[80][2] = "複数選択";
svgStrU[81][2] = "最大2つのグループを選択";
svgStrU[82][2] = "X変数";
svgStrU[83][2] = "Y変数";
svgStrU[84][2] = "by";
svgStrU[85][2] = "グループ変数なし";
svgStrU[86][2] = "選択したデータ: ";
svgStrU[87][2] = "生データ";
svgStrU[88][2] = "変数名をクリックして変数を選択";
svgStrU[89][2] = "缺測數";
svgStrU[90][2] = "順位合";
svgStrU[91][2] = "経度";
svgStrU[92][2] = "緯度";
svgStrU[93][2] = "位置母数 !=";
svgStrU[94][2] = "ウィルコクソン符號順位合分布";
svgStrU[95][2] = "対応変数";
svgStrU[96][2] = "対応データ";
svgStrU[97][2] = "独立性検定";
svgStrU[98][2] = "シミュレーション";
svgStrU[99][2] = "乱数";
svgStrU[100][2] = "正規分布";
svgStrU[101][2] = "t 分布";
svgStrU[102][2] = "&chi;&#178; 分布";
svgStrU[103][2] = "F 分布";
svgStrU[104][2] = "HSD 分布";
svgStrU[105][2] = "1四分位数";
svgStrU[106][2] = "3四分位数";
svgStrU[107][2] = "四分位数範囲";
svgStrU[108][2] = "決定係数";
svgStrU[109][2] = "累積相対度数 (%)";
svgStrU[110][2] = "均等分布の最大整数";
svgStrU[111][2] = "一点をマウスで移動";
svgStrU[112][2] = "復元抽出";
svgStrU[113][2] = "非復元抽出"; 
svgStrU[114][2] = "折れ線"; 
svgStrU[115][2] = "増減率";
svgStrU[116][2] = "単純指数";
svgStrU[117][2] = "視差";
svgStrU[118][2] = "差分";
svgStrU[119][2] = "自己相関関数";
svgStrU[120][2] = "ログ変換";
svgStrU[121][2] = "平方根変換";
svgStrU[122][2] = "ボックスからコックスへの変換";
svgStrU[123][2] = "基準時";
svgStrU[124][2] = "中心移動平均";
svgStrU[125][2] = "指数平滑";
svgStrU[126][2] = "中心移動中央値";
svgStrU[127][2] = "モデル";
svgStrU[128][2] = "移動平均";
svgStrU[129][2] = "二重移動平均";
svgStrU[130][2] = "Holt二重指数平滑";
svgStrU[131][2] = "季節指数";
svgStrU[132][2] = "Holt-Winters乗法季節モデル";
svgStrU[133][2] = "非季節時系列";
svgStrU[134][2] = "ブロック";
svgStrU[135][2] = "クラスター分析";
svgStrU[136][2] = "クラスター";
svgStrU[137][2] = "デシジョン ツリー";
svgStrU[138][2] = "決定ルール条件";
svgStrU[139][2] = "決定";
svgStrU[140][2] = "反復";
svgStrU[141][2] = "並列グラフ";
svgStrU[142][2] = "分類";
svgStrU[143][2] = "分類関数";
svgStrU[144][2] = "分類結果";
svgStrU[145][2] = "決定";
svgStrU[146][2] = "誤分類率";
svgStrU[147][2] = "セル";
svgStrU[148][2] = "トレーニング データ";
svgStrU[149][2] = "データのテスト";


// Chinese
$message.zhTW = {
    "eStat : Stat Education SW": "eStat: 統計教育軟體",
    "Home": "首頁",
    "Filename": "檔名",
    "Selected Variables": "選擇變數",
    "Cancel": "取消",
    "Edit Variables": "編輯變數",
    "Level": "級別",
    "ElementaryLevel": "小學",
    "MiddleLevel": "中學",
    "HighLevel": "高中",
    "UniversityLevel": "大學",
    "Example": "例題",
    "New Sheets": "新工作表",
    "csv Open": "開啟csv檔",
    "www Open": "開啟網頁",
    "json Open": "開啟json檔",
    "csv Save": "儲存csv",
    "json Save": "儲存json",
    "Print Sheet": "列印工作表",
    "Bar Graph": "長條圖",
    "Pie Chart": "圓餅圖",
    "Band Graph": "帶狀圖",
    "Line": "折線",
    "Line Graph": "折線圖",
    "Dot Graph": "點圖",
    "Histogram": "直方圖",
    "Stem & Leaf Plot": "莖葉圖",
    "maxStem": "** 最大莖數 <= 30 **",
    "Box-Whisker Plot": "盒形圖",
    "Scatterplot": "散佈圖",
    "ScatterplotMatrix": "散佈圖矩陣",
    "Frequency Table": "次數分佈表",
    "Basic Statistics": "基本統計量",
    "Testing Hypothesis &mu;": "假設檢定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "假設檢定 &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "假設檢定 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "假設檢定 &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "變異數分析",
    "MiddleSchool": "中學統計",
    "HighSchool":   "高級中學統計",
    "University":   "大學統計",
    "eStatHeading": "eStat 是一款基於網路的免費軟體，使用動態資料視覺化和圖形統計分析來實現更好的統計教育。",
    "Support":      "支援",
    "Donation":     "捐款",
    "Middle School Stat Education": "中學統計教育",
    "High School Stat Education": "高級中學統計教育",
    "University Stat Education": "大學統計教育",
    "Elem Stat Graph Example": "中小學圖表例題",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "縦向",
    "Horizontal": "横向",
    "Vertical Separated Bar": "縱向分離長條圖",
    "Vertical Stacked Bar": "縱向堆壘長條圖",
    "Vertical Ratio Bar": "縱向比率長條圖",
    "Vertical Side by Side Bar": "縱向並排長條圖",
    "Vertical Two Sided Bar": "縱向雙邊長條圖圖",
    "Horizontal Separated Bar": "橫向分離長條圖",
    "Horizontal Stacked Bar": "橫向堆壘長條圖",
    "Horizontal Ratio Bar": "橫向比率長條圖",
    "Horizontal Side by Side Bar": "橫向並排長條圖",
    "Horizontal Two Sided Bar": "横向雙邊長條圖",
    "Doughnut Graph": "圓環圖",
    "Two Sided Stem & Leaf Plot": "雙邊莖葉圖",
    "Graph Save": "儲存圖形",
    "Graph Print": "列印圖形",
    "Move to Table": "移動至表格",
    "Edit Title": "編輯標題",
    "Table Save": "儲存表格",
    "Table Print": "列印表格",
    "Frequency": "次數",
    "Sorting": "排序",
    "SortData": "排序資料",
    "Raw Data": "原資料",
    "Descending": "下降的",
    "Ascending": "上昇的",
    "Mean": "平均數",
    "Std Deviation": "標準差",
    "MeanStd": "平均/標準差",
    "DotMeanStd": "點圖 - 平均/標準差",
    "95CI": "95%信頼区間",
    "CorrelationAnalysis": "相關分析",
    "RegressionAnalysis": "回歸分析",
    "RegressionAnalysis1": "線形回歸分析",
    "RegressionAnalysis2": "多数線形回歸分析",
    "ANOVA2": "二因子變異數分析",
    "Regression": "回歸",
    "Frequency Polygon": "次數分佈多邊形",
    "Execute New Interval": "執行新區間",
    "Interval Start": "區間起點",
    "Interval Width": "區間間幅",
    "t-test": "t 檢定",
    "Z-test": "Z 檢定",
    "(if Z-test, enter &sigma;)": "(Z 檢定, &sigma)",
    "Significance Level": "顯著水準",
    "Execute": "執行",
    "(Confidence Interval)": "(信頼區間)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z 檢定, Z<sub>&alpha;/2</sub>使用)",
    "&chi;<sup>2</sup> test": "&chi;&#178; 檢定",
    "Variance Assumption": "變異數假設",
    "Variance": "變異數",
    "F test": "F 檢定",
    "At least one pair of means is different": "至少有一對平均數不相等",
    "Main Title": "主標題",
    "y title": "y軸標題",
    "x title": "x軸標題",
    "yAxis": "Y軸",
    "Modify": "修正",
    "Confirm": "確認",
    "Variable Name": "變數名",
    "Variable Value": "變數値",
    "Value Label": "變數標號",
    "* Less than nine value labels allowed.": "* 准許9個以下變數標號。",
    "Save": "儲存",
    "Exit": "離開",
    "eStatU UnivStatEdu": "eStatU - 大學統計教育軟體",
    "eStatH HighStatEdu": "eStatH - 中學統計教育軟體",
    "eStatM MiddleStatEdu": "eStatM - 初中學統計教育軟體",
    "MiddleStat": "中統計",
    "HighStat":   "高統計",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "電子書連結 (English)",
    "Menu": "選單",
    "Binomial Experiment": "二項式分佈實驗",
    "Binomial Distribution": "二項式分佈",
    "Binomial Prob Table": "二項分佈機率表",
    "Poisson Distribution": "卜瓦松分佈",
    "Poisson Prob Table": "卜瓦松機率分佈表",
    "Geometric Distribution": "幾何分佈",
    "Geometric Prob Table": "幾何機率分佈表",
    "HyperGeometric Distribution": "超幾何分佈",
    "HyperGeometric Prob Table": "超幾何機率分佈表",
    "Exponential Distribution": "指數分佈",
    "Normal Experiment": "常態分佈實驗",
    "Normal Distribution": "常態分佈",
    "Normal Approx": "常態分佈逼近",
    "t Distribution": "t 分佈",
    "ChiSquare Distribution": "卡方分佈",
    "F Distribution": "F 分佈",
    "Sampling": "抽樣",
    "Population vs Sample": "母體 vs 樣本",
    "Population": "母體",
    "Sample": "樣本",
    "Exponential": "指數分佈(0.3)",
    "Uniform": "均勻分佈(0,1)",
    "UniformDist": "均勻分佈",
    "Sample05": "5% 樣本抽出",
    "Sample10": "10% 樣本抽出",
    "Sample20": "20% 樣本抽出",
    "Statistics/BoxPlot": "統計量/盒形圖",
    "StatisticalProb":     "統計概率",
    "Law of Large Number": "大數法則",
    "Dist of Sample Means": "樣本平均的分佈",
    "Sampling Distribution": "樣本分佈",
    "Sample Size": "樣本數",
    "Confidence Interval": "信頼區間",
    "Confidence Interval Simulation": "信頼區間實驗",
    "Simulation": "實驗",
    "Confidence Interval Mu": "估計 : &mu;",
    "Mu Confidence Interval": "信頼區間 &mu;",
    "Confidence Interval Sigma": "估計 : &sigma;&#178; ",
    "Confidence Interval P": "估計 : p",
    "Estimation Accuracy": "估計準確率",
    "Repetition": "重覆數",
    "Confidence Level": "信頼水準",
    "Testing Hypothesis mu_titleAB": "假設檢定平均數",
    "Testing Hypothesis mu_title": "假設檢定平均數檢定",
    "Testing Hypothesis sigma_title": "假設檢定變異數",
    "Testing Hypothesis P_title": "假設檢定比例",
    "Testing Hypothesis mu12_title": "假設檢定兩母體平均數",
    "Testing Hypothesis sigma12_title": "假設檢定兩母體變異數",
    "Testing Hypothesis P12_title": "假設檢定兩母體比例",
    "Testing Hypothesis muA":  "假説検定 &mu; - C, &beta;",
    "Testing Hypothesis muAB": "假説検定 &mu; - C, n",
    "Testing Hypothesis mu": "假設檢定: 平均數&mu;",
    "Testing Hypothesis sigma": "假設檢定: 變異數&sigma;&#178;",
    "Testing Hypothesis P": "假設檢定: 比例 p",
    "Testing Hypothesis mu12": "假設檢定 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "假設檢定 : &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "假設檢定 : p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1因子變異數分析",
    "Testing Hypothesis ANOVA2": "2因子變異數分析",
    "SameSampleSize": "每個單元格的樣本大小應該相同。",
    "Testing Independence": "分類的獨立性檢定",
    "CategoryD": "分類",
    "Category": "分類",
    "Correlation Coefficient": "相關係數",
    "Regression Experiment": "回歸實驗",
    "Hypothesis": "假設",
    "Test Type": "檢定型式",
    "Z-test": "Z 檢定",
    "t-test": "t 檢定",
    "Chi-test": "卡方檢定",
    "F-test": "F 檢定",
    "Sampling Type": "樣本型式",
    "Independent Sample": "獨立雙樣本",
    "Paired Sample": "配對樣本",
    "Sample Data": "樣本資料",
    "input either sample data": "於接下來的對話視窗，使用csv/bsv格式輸入樣本資料或樣本統計量",
    "input data": "輸入數據",
    "Sample Statistics": "樣本統計量",
    "Sample Mean": "樣本平均",
    "Sample Variance": "樣本變異數",
    "Sample Proportion": "樣本比例",
    "sample range": "樣本範圍",
    "control chart": "控製圖",
    "if Z-test-1": "(Z 檢定, 母分散入力)",
    "if Z-test-2": "(Z 檢定, z<sub>&alpha;/2 </sub> 使用)",
    "At least one pair": "至少有一對平均數不相等",
    "Row-Col-0": "列變數與行變數獨立",
    "Row-Col-1": "列變數與行變數不獨立",
    "Enter any number of row": "(由左上角儲存格輸入數字)",
    "Row": "列",
    "Column": "行",
    "Probability": "機率",
    "Show Probability": "顯示機率",
    "Regression Line": "回歸線",
    "Erase All": "刪除數據",
    "Add Point": "增加點",
    "Erase Point": "刪除點",
    "Reference Site": "参考站",
    "Lot Size": "批量數",
    "Defect Size": "不良品數",
    "Defect Rate": "缺陷率",
    "If typed": "輸入數字後，單擊[執行]或[輸入]",
    "Stat/BoxPlot": "統計量/盒形圖",
    "Mean": "平均",
    "Std Dev": "標準差",
    "SimulationWarning": "(在開始下一次模擬之前，應完成當前模擬)",
    "OneGroup": "(1群)",
    "AnalysisVar": "分析變數",
    "AnalysisVar2": "Y變數",
    "GroupVar": "群",
    "GroupVar2": "X變數",
    "GroupVar3": "因子1",
    "GroupVar4": "因子2",
    "AnalysisVarMu12": "分析(or X1)變數",
    "GroupVarMu12": "群(or X2)變數",
    "PairedMu12": " X1, X2 : 配對變數",
    "SizeVar": "變數大小",
    "RegressionBand": "信頼帯",
    "RegressionTable": "回歸分析",
    "RegressionResidual": "殘差図",
    "RegressionResidualLeverage": "殘差 - 槓桿量",
    "RegressionCook": "Cook距離図",
    "RegressionQQ": "殘差Q-Q図",
    "HistogramNormal": "直方圖",
    "HistogramChisq": "常態分佈檢定",
    "HistogramNormalQQ": "常態Q-Q図",
    "PopulationStd": "母體標準差",
    "Type1Error": "型一誤差",
    "Type2Error": "型二誤差",
    "AnovaTable": "變異數分析表",
    "AnovaMeanGraph": "信賴區間圖",
    "MultipleComparison": "多重比較",
    "ComparisonGraph": "比較圖",
    "AnovaResidual": "殘差図",
    "AnovaQQ": "殘差Q-Q図",
    "TestingFit": "分類的適合性檢定",
    "FitTest0": "觀察分布與理論分布相同",
    "FitTest1": "觀察分布與理論分布不同",
    "ObservedFreq": "觀察次數 O",
    "ExpectedProb": "期望機率 p",
    "ExpectedFreq": "期望次數 E(>5)",
    "InputFitData": "從左上角儲存格輸",
    "ExecuteTable": "統計量",
    "MeanDotGraph": "信賴區間圖",
    "ScatterRegression": "散布図",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "無交互作用",
    "ExistInteraction": "有交互作用",
    "eStatLecture": "eStat 講義",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "非參數Wilcoxon 等級和檢定", 
    "NonParametricMu12": "非參數Wilcoxon 等級和檢定 : 位置參數 M<sub>1</sub>, M<sub>2</sub>", 
    "Sample Range": "秩和",
    "DistributionTable": "分布表",
    "SignedRankTestDist": "Wilcoxon 符號等級和分布",
    "WilcoxonTestDist": "Wilcoxon 等級和分布",
    "KruskalTestDist": "Kruskal-Wallis H分布",
    "FriedmanTestDist": "Friedman S分布",
    "SignedRankTest": "非參數符號等級和檢定",
    "SignTest": "非參數符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "非參數等級和檢定",
    "KruskalTest": "非參數Kruskal-Wallis 檢定",
    "KruskalTestANOVA": "非參數Kruskal-Wallis 檢定",
    "Total": "全體",
    "FriedmanTest": "非參數Friedman檢定",
    "FriedmanTestANOVA": "非參數Friedman檢定",
    "Block": "塊",
    "Treatment": "處理",
    "At least one locations is different": "至少一個位置參數不相同",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 常態近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon 等級和檢定,  n > 20 常態近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  等級和檢定,  n>25 常態近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;&#178;近似檢定",
    "VariableSelect":  "* 資料分析 : 変数選択 >>  點擊圖示",
    "VariableSelect2": "* 変数選択 : 點擊變數名或利用右側選択箱",
    "VariableSelect3": "変数選択",
    "VariableSelect4": "可以選擇更多分析變量",
    "VariableSelect5": "可以選擇更多X變量",
    "SummaryData": "摘要資料",
    "RawData": "原始資料",
    "MultiSelect": "",
    "DataType": "(通過單擊變數名稱選擇變數)",
    "by": "by",
    "NameVar": "名稱變數",
    "n_variance": "n-1 式",
    "RandomNumber": "隨機數",
    "RealNumber":     "實數",
    "IntegerNumber":  "整数",
    "NumberData":     "數據數量",
    "NumberDigit":    "小數位數",
    "NormalTable":    "常態分佈表",
    "Percentile":     "百分表",
    "PercentileValue": "百分",
    "StudentRangeDist": "HSD範圍分佈",
    "copy link": "複製鏈接",
    "WithReplacement":    "修復抽樣",
    "WithoutReplacement": "非復原抽樣",
    "Replacement":     "修復",
    "NonReplacement":  "非復原",
    "WordCloud":       "詞云（僅英語）",
    "oneColor":        "色",
    "defaultColor":    "默認顏色",
    "RelativeFreq":    "相對頻率",
    "Density":         "密度",
    "MarginOfError":   "誤差範圍",
    "Permutation":     "排列",
    "PermutationSame": "等次序列",
    "Combination":     "組合",
    "NumberOfCase":    "案件數",
    "BinomialTheorem": "二項式定理",
    "PascalTriangle":  "帕斯卡三角形",
    "Character":       "表情符號",
    "AdditionRule":      "確率加法規則",
    "MultiplicationRule": "確率乗法規則",
    "ConditionalProb":   "条件付確率",
    "JointProb":         "結合確率",
    "DiscreteDist":      "離散確率分布",
    "Categorize":        "分類",
    "Recode":            "覆蓋隨機值",
    "Compute":           "新變體計算",
    "SelectIf":          "數據選擇",
    "InfoValueLabel":    "*** 選擇一個變量，輸入變量名稱或變量值名稱，然後單擊運行按鈕。",
    "InfoSorting":       "*** 最多選擇 3 個要排序的變量，選擇一種排序方法，然後單擊運行按鈕。",
    "InfoCategorize":    "*** 選擇要分類的變量後，輸入區間開始和區間寬度，檢查類別列表並單擊運行按鈕。",
    "InfoRecode":        "*** 選擇一個要重新分配的變量，輸入一個新的隨機值，然後單擊運行按鈕。",
    "InfoRecode2":       "* 您最多可以覆蓋九個值。",
    "InfoCompute":       "*** 使用下面的按鈕創建用於計算新方差的公式，然後單擊運行按鈕。",
    "InfoSelectIf":      "*** 最多選擇三個變量進行數據選擇，為每個變量輸入條件表達式，然後單擊運行按鈕。",
    "SortingVariable":   "對齊方式",
    "SortingMethod":     "排序方式",
    "NewVariable":       "新變量",
    "CategoryVariable":  "分類方差",
    "CategoryListCheck": "檢查類別列表",
    "CategoryInterval":  "類別區間",
    "CategoryLabel":     "分類名稱",
    "RecodeVariable":    "隨機值覆蓋變體",
    "CurrentValue":      "當前隨機值",
    "NewValue":          "新的隨機值",
    "ComputeFormula":    "公式",
    "SelectVariable":    "可選變量",
    "RelationOperator":  "關係運算符",
    "SelectValue":       "價值",
    "MissingValue":      "缺失值",
    "option":           "選擇",
    "TimeSeries":       "時間序列",
    "Smoothing":        "光滑的",
    "Filtering":        "過濾",
    "Transformation":   "轉換",
    "Weight":           "重量",
    "WeightedIndex":    "加權指數",
    "BaseTime":         "基準時間",
    "LagTime":          "視差",
    "Lag":              "視差",
    "Forecasting":      "預言",
    "SeasonalModel":    "季節模型",
    "HoltWinter":       "Holt-Winters 乘法季節性模型",
    "Trend":            "趨勢",
    "Seasonal":         "季節",
    "Deseasonal":       "非季節性時間序列",
    "Nseason":          "季節性週期",
    "Irregular":        "不規律的",
    "TrendModel":       "非季節性趨勢模型",
    "RegressionModel":  "回歸模型",
    "ForecastingPeriod": "預測期",
    "CreateTable":       "資料表",
    "SaveTable":        "保存表",
    "MA":               "移動平均線",
    "EWMA":              "EWMA Model",
    "CenterMA":         "中心移動平均線",
    "MovingMedian":     "中心偏移中位數",
    "ES":               "指數平滑",
    "Default":          "默認",
    "Linear":           "線性的",
    "Quadratic":        "二次方",
    "Cubic":            "第三",
    "SquareRoot":       "平方根",
    "Log":              "Log",
    "Exponent":         "指數",
    "Power":            "冪函數",
    "BoxCox":           "盒子考克斯",
    "SingleMA":         "簡單移動平均線",
    "SingleES":         "簡單指數平滑",
    "DoubleMA":         "雙移動平均線",
    "DoubleES":         "雙移指數平滑",
    "HoltLinear":       "霍爾特線性趨勢",
    "DeseasonIntercept":"淡季",
    "DeseasonSlope":    "非季節性梯度",
    "SeasonalIndex":    "季節性指數",
    "Diff":              "時間差",
    "DiffTime":          "時差",
    "AR":                "自回歸模型",
    "ResultTable":       "回歸結果表",
    "ForecastTable":     "預測表",
    "HoltLevel":         "水平",
    "HoltTrend":         "趨勢",
    "AutoCorrTable":     "自相關表",
    "DiffSeries":        "差分時間序列",
    "RawSeries":         "原始時間序列",
    "RBD":               "隨機塊編程",
    "Latin":             "拉丁文語法n",
    "Chapter01":         "&nbsp;第1章 統計數據科學",
    "Chapter02":         "&nbsp;第2章 定性數據可視化",
    "Chapter03":         "&nbsp;第3章 定量數據可視化",
    "Chapter04":         "&nbsp;第4章 使用表格/度量組織數據",
    "Chapter05":         "&nbsp;第5章 概率和概率分佈函數",
    "Chapter06":         "&nbsp;第6章 樣本統計數據的分佈和估計",
    "Chapter07":         "&nbsp;第7章 總體參數的假設檢驗",
    "Chapter08":         "&nbsp;第8章 兩個總體參數的假設檢驗",
    "Chapter09":         "&nbsp;第9章 多種總體均值的假設檢驗",
    "Chapter10":         "第10章 非參數假設檢驗",
    "Chapter11":         "第11章 分類數據的假設檢驗",
    "Chapter12":         "第12章 相關性和回歸",
    "Chapter13":         "第13章 時間序列分析",
    "Distribution":      "概率分佈",
    "DecisionTree":      "決策樹",
    "MaxDepth":          " 樹最大深度",
    "MinData":           "分支資料最小值",
    "Discriminant":      "判別分析",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Chinese 
appStr[1][3] = "/estat/eStat/index.html";
appStr[2][3] = "/estat/eStatH/index.html";
appStr[2][3] = "/estat/eStatU/index.html";
appStr[3][3] = "/estat/eStatE/index_en.html";
appStr[4][3] = "/estat/eHelp/index_en.html";
appStr[5][3] = "index.html";
appStr[6][3] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][3] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][3] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][3] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][3] = "";
appStr[11][3] = "Large Population Country";
appStr[12][3] = "Life Expectancy (OECD)";
appStr[13][3] = "Population Pyramid (Korea)";
appStr[14][3] = "GNP per Capita (OECD)";
appStr[15][3] = "Top World Export Country";
appStr[16][3] = "Obesity % of Population";
appStr[17][3] = "Temperature of Major City";
appStr[18][3] = "Top CO2 Emission Country";
appStr[19][3] = "Alcohol Consume (OECD)";
appStr[20][3] = "Continuous Data Graph";
appStr[21][3] = "Length of Otter";
appStr[22][3] = "Age of Teacher";
appStr[23][3] = "Age of Teacher by Sex";
appStr[24][3] = "Cleanliness of Tooth";
appStr[25][3] = "Math Exam Scores";
appStr[26][3] = "Calorie of Hamberger";
appStr[27][3] = "Height vs Weight by Sex";
appStr[28][3] = "Discrete Data Graphs";
appStr[29][3] = "";
appStr[30][3] = "";
appStr[31][3] = "unit";
appStr[32][3] = "Country";
appStr[33][3] = "Male";
appStr[34][3] = "Female";
appStr[35][3] = "Age";
appStr[36][3] = "Person";
appStr[37][3] = "billion $";
appStr[38][3] = "Export";
appStr[39][3] = "Obesity %";
appStr[40][3] = "Celsius";
appStr[41][3] = "City";
appStr[42][3] = "Jan High";
appStr[43][3] = "Jul High";
appStr[44][3] = "million ton";
appStr[45][3] = "liter/year";
appStr[46][3] = "Alcohol";
alertMsg[1][3] = "所選擇的變數，其中之一沒有包含資料。";
alertMsg[2][3] = "逐一選取變數進行分析(選按欄位名稱)。若是同時選取兩變數，則第一個視為群組變數。";
alertMsg[3][3] = "所選的變數有缺失值。";
alertMsg[4][3] = "若選取的變數觀察值不同，則無法進行分析。";
alertMsg[5][3] = "群組數太多! 圖形可能因營幕太小而互相重疊。";
alertMsg[6][3] = "若摘要資料中要進行分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[7][3] = "若原始資料有超過3個變數被選擇，則無法進行分析及製作圖表。";
alertMsg[8][3] = "點圖可使用於觀察值個數少於200的資料。";
alertMsg[9][3] = "莖葉圖可使用於觀察值個數少於100的資料。";
alertMsg[10][3] = "未選擇分析變數";
alertMsg[11][3] = "未選擇分析/群變數";
alertMsg[12][3] = "若分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[13][3] = "";
alertMsg[14][3] = "連續型圖形及假設檢定無法進行摘要資料。";
alertMsg[16][3] = "此假設檢定僅限定於兩群母體。";
alertMsg[17][3] = "繪製散佈圖至少需要橫軸變數及縱軸變數。";
alertMsg[18][3] = "不允許使用三個以上的變量。";
alertMsg[19][3] = "如果數據中存在字符，則無法進行分析。";
alertMsg[20][3] = "變數包含文字，則回帰分析無法繪製。";
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
alertMsg[43][3] = "簡單線性回歸僅適用於一組";
alertMsg[44][3] = "輸入1st:名稱, 2nd:緯度, 3rd:經度, 4th:分析變數(選項)";
alertMsg[45][3] = "超過5個變數，不能繪製GIS圖。";
alertMsg[46][3] = "同一変数名選擇";
alertMsg[47][3] = "不允許使用頻率的文字數據！！   再試一次"; 
alertMsg[48][3] = "不允許文字數據！！   再試一次"; 
alertMsg[49][3] = "觀測次數應該少於100次！！   請再試一次。";
alertMsg[50][3] = "在間隔開始或步驟中輸入數字。";
alertMsg[51][3] = "輸入編號/行數必須相同！！   請再試一次。";
alertMsg[52][3] = "在類別和頻率中輸入數字。";
alertMsg[53][3] = "間隔大小不一樣！！   請再試一次。";
alertMsg[54][3] = "X觀測不等於Y觀測！！   請再試一次。";
alertMsg[55][3] = "!! 紙張上沒有數據。";
alertMsg[56][3] = "!! 未選擇變量";
alertMsg[57][3] = "!! 輸入間隔開始和間隔寬度";
alertMsg[58][3] = "!! 輸入數字間隔的起始和間隔寬度";
alertMsg[59][3] = "!! 大於 9 間隔 - 更改間隔寬度";
alertMsg[60][3] = "!! 該變量具有超過 9 個值";
alertMsg[61][3] = "!! 未輸入值";
alertMsg[62][3] = "!! 輸入公式";
alertMsg[63][3] = "!! 沒有滿足條件的數據。";
alertMsg[64][3] = "";
alertMsg[65][3] = ""; 
alertMsg[66][3] = "";
alertMsg[67][3] = "";
alertMsg[68][3] = "";
alertMsg[69][3] = "";

svgStr[1][3] = " 長條圖";
svgStr[2][3] = " 圓餅圖";
svgStr[3][3] = " 圓環圖";
svgStr[4][3] = " 帶狀圖";
svgStr[5][3] = " 折線圖";
svgStr[6][3] = " 點圖";
svgStr[7][3] = " 盒形圖";
svgStr[8][3] = " 莖葉圖";
svgStr[9][3] = " 直方圖";
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
svgStr[24][3] = "大小";
svgStr[25][3] = "<h3>次數分配表</h3>";
svgStr[26][3] = "分析變數";
svgStr[27][3] = "變數値";
svgStr[28][3] = "變數值標號";
svgStr[29][3] = "次數";
svgStr[30][3] = "相對頻率";
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
svgStr[49][3] = "<h3>正規性檢定</h3>";
svgStr[50][3] = "期待度數 > 5 <br> 勸獎";
svgStr[51][3] = "&chi;&#178; 檢定<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][3] = "資料<br>觀察度數<br>(O<sub>i</sub>)";
svgStr[53][3] = "正規分布<br>期待確率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][3] = "正規分布<br>期待度數<br>(E<sub>i</sub>)";
svgStr[55][3] = "各區間l<br>&chi;&#178; 値<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][3] = "合&chi;&#178;値";
svgStr[57][3] = "確率直方圖,常態分布";
svgStr[58][3] = "常態Q-Q圖";
svgStr[59][3] = "常態分位數";
svgStr[60][3] = "相関係数";
svgStr[61][3] = "決定係數";
svgStr[62][3] = "標準誤差";
svgStr[63][3] = "變數";
svgStr[64][3] = "變數名";
svgStr[65][3] = "独立變數";
svgStr[66][3] = "従属變數";
svgStr[67][3] = "參數";
svgStr[68][3] = "推計値";
svgStr[69][3] = "値";
svgStr[70][3] = "截距";
svgStr[71][3] = "斜率";
svgStr[72][3] = "因子";
svgStr[73][3] = "平方和";
svgStr[74][3] = "自由度";
svgStr[75][3] = "均方";
svgStr[76][3] = "回歸";
svgStr[77][3] = "誤差";
svgStr[78][3] = "全體";
svgStr[79][3] = "<h3>回歸分析</h3>";
svgStr[80][3] = "標準化残差 Q-Q圖";
svgStr[81][3] = "標準化残差";
svgStr[82][3] = "常態分位數";
svgStr[83][3] = "残差圖";
svgStr[84][3] = "預測値";
svgStr[85][3] = "二因子變異數分析";
svgStr[86][3] = "信頼區間圖";
svgStr[87][3] = "残差";
svgStr[88][3] = "二元統計量";
svgStr[89][3] = "散佈圖矩陣";
svgStr[90][3] = "多重比較";
svgStr[91][3] = "統計量";
svgStr[92][3] = "因子";
svgStr[93][3] = "水準";
svgStr[94][3] = "配對樣本資料圖";
svgStr[95][3] = "残差-預測圖";
svgStr[96][3] = "残差-槓桿圖";
svgStr[97][3] = "Cook距離圖";
svgStr[98][3] = "Cook距離";
svgStr[99][3] = "資料順序";
svgStr[100][3]= "平均差";
svgStr[101][3]= "平均差檢定";
svgStr[102][3]= "處理";
svgStr[103][3]= "交互作用";
svgStr[104][3]= "行和";
svgStr[105][3]= "列和";
svgStr[106][3]= "多重相關係數";
svgStr[107][3]= "<h3>相關分析</h3>";
svgStr[108][3]= "相關係數矩陣";
svgStr[109][3]= "因子A-因子B 平均圖";
svgStr[110][3]= "槓桿量";
svgStr[111][3]= "地理訊息圖";
svgStr[112][3]= "範圍";
svgStr[113][3]= "平均 - 標準誤差圖";
svgStr[114][3]= "母體變異數";
svgStr[115][3]= "假設";
svgStr[116][3]= "檢定";
svgStr[117][3]= "變異數";
svgStr[118][3]= "階級區間値";
svgStr[119][3] = "分類";
svgStr[120][3] = "最頻值";
svgStr[121][3] = "公分散";
svgStr[122][3] = "帕斯卡爾三角形";
svgStr[123][3] = "結合概率";
svgStr[124][3] = "有條件";
svgStr[125][3] = "離散型分佈";
svgStr[126][3] = "行 %";
svgStr[127][3] = "列 %";
svgStr[128][3] = "總計 %";
svgStr[129][3] = "長條圖矩陣";
svgStr[130][3] = "先驗機率";
svgStr[131][3] = "特徵值";
svgStr[132][3] = "特徵向量";
svgStr[133][3] = "多維頻率表";
svgStr[134][3] = "層次聚類圖";
svgStr[135][3] = "距離";
svgStr[136][3] = "單一";
svgStr[137][3] = "完成";
svgStr[138][3] = "平均";
svgStr[139][3] = "質心";
svgStr[140][3] = "病房";
svgStr[141][3] = "連動";
svgStr[142][3] = "Number of Clusters <br>K";
svgStr[143][3] = "Bayes Information Criteria";
svgStr[144][3] = "Within Sum of Squares";
svgStr[145][3] = "Akaike Information Criteria";

svgStrU[1][3] = "二項式分佈";
svgStrU[2][3] = "重覆數";
svgStrU[3][3] = "平均";
svgStrU[4][3] = "標準差";
svgStrU[5][3] = "卜瓦松分佈";
svgStrU[6][3] = "幾何分佈";
svgStrU[7][3] = "超幾何分佈";
svgStrU[8][3] = "母體";
svgStrU[9][3] = "樣本分佈";
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
svgStrU[23][3] = "[檢定統計量]";
svgStrU[24][3] = "分佈";
svgStrU[25][3] = "拒絕虛無假設";
svgStrU[26][3] = "接受虛無假設";
svgStrU[27][3] = "p-値";
svgStrU[28][3] = "[決策] ";
svgStrU[29][3] = "[變異數分析]";
svgStrU[30][3] = "輸入相關係數後按執行";
svgStrU[31][3] = "回歸分析";
svgStrU[32][3] = "列變數";
svgStrU[33][3] = "行變數";
svgStrU[34][3] = "平均"
svgStrU[35][3] = "標準差"
svgStrU[36][3] = "<h3> 直方圖<br>次數分佈表</h3>";
svgStrU[37][3] = "群組名稱";
svgStrU[38][3] = "階級區間";
svgStrU[39][3] = "莖";
svgStrU[40][3] = " 葉";
svgStrU[41][3] = "群組1 葉";
svgStrU[42][3] = "群組2 葉";
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
svgStrU[53][3] = "- 移動或刪除一個觀察點，觀看回歸線的變化。";
svgStrU[54][3] = "[樣本統計量] ";
svgStrU[55][3] = "[樣本 1 統計量] ";
svgStrU[56][3] = "[樣本 2 統計量] ";
svgStrU[57][3] = "信頼水準";
svgStrU[58][3] = "列行獨立";
svgStrU[59][3] = "列行不獨立";
svgStrU[60][3] = "觀察分布";
svgStrU[61][3] = "理論分布";
svgStrU[62][3] = "觀察分布 適合性檢定";
svgStrU[63][3] = "Wilcoxon 等級和檢定";
svgStrU[64][3] = "Wilcoxon 等級和檢定 分布";
svgStrU[65][3] = "Kruskal-Wallis 檢定";
svgStrU[66][3] = "Kruskal-Wallis H 分布";
svgStrU[67][3] = "Kruskal-Wallis H 統計量";
svgStrU[68][3] = "Wilcoxon 符號等級檢定";
svgStrU[69][3] = "符號檢定";
svgStrU[70][3] = "Friedman檢定";
svgStrU[71][3] = "Friedman S 統計量";
svgStrU[72][3] = "Friedman S 分布";
svgStrU[73][3] = "t 値 (Z)";
svgStrU[74][3] = "ChiSq-値";
svgStrU[75][3] = "樣本變異數";
svgStrU[76][3] = "標本平均差";
svgStrU[77][3] = "樣本變異數比";
svgStrU[78][3] = "變異數假設";
svgStrU[79][3] = "摘要數據";
svgStrU[80][3] = "多項選擇";
svgStrU[81][3] = "最多選擇兩個組";
svgStrU[82][3] = "X變數";
svgStrU[83][3] = "Y變數";
svgStrU[84][3] = "by";
svgStrU[85][3] = "沒有組變數";
svgStrU[86][3] = "選定的資料: ";
svgStrU[87][3] = "原始資料";
svgStrU[88][3] = "通過單擊變數名稱選擇變數";
svgStrU[89][3] = "缺失觀察數";
svgStrU[90][3] = "順位合";
svgStrU[91][3] = "經度";
svgStrU[92][3] = "緯度";
svgStrU[93][3] = "至少一個位置參數不相同";
svgStrU[94][3] = "Wilcoxon 符號等級分布";
svgStrU[95][3] = "配對變數";
svgStrU[96][3] = "配對資料";
svgStrU[97][3] = "獨立性檢定";
svgStrU[98][3] = "模擬";
svgStrU[99][3] = "隨機數";
svgStrU[100][3] = "正態分佈";
svgStrU[101][3] = "t 分布";
svgStrU[102][3] = "&chi;&#178; 分布";
svgStrU[103][3] = "F 分布";
svgStrU[104][3] = "HSD 分布";
svgStrU[105][3] = "第一個四分位數";
svgStrU[106][3] = "第三個四分位數";
svgStrU[107][3] = "四分位數範圍";
svgStrU[108][3] = "確定係數";
svgStrU[109][3] = "累積相對頻率 (%)";
svgStrU[110][3] = "均勻分佈的最大整數";
svgStrU[111][3] = "用鼠標移動點";
svgStrU[112][3] = "修復抽樣";
svgStrU[113][3] = "非復原抽樣"; 
svgStrU[114][3] = "折線"; 
svgStrU[115][3] = "% 增加或減少";
svgStrU[116][3] = "簡單指數";
svgStrU[117][3] = "視差";
svgStrU[118][3] = "差異";
svgStrU[119][3] = "自相關函數";
svgStrU[120][3] = "對數變換";
svgStrU[121][3] = "平方根變換";
svgStrU[122][3] = "Box-Cox 變換";
svgStrU[123][3] = "基準時間";
svgStrU[124][3] = "中心移動平均線";
svgStrU[125][3] = "指數平滑";
svgStrU[126][3] = "中位數中心偏移";
svgStrU[127][3] = "模型";
svgStrU[128][3] = "移動平均線";
svgStrU[129][3] = "雙移動平均線";
svgStrU[130][3] = "Holt雙指數平滑";
svgStrU[131][3] = "季節性指數";
svgStrU[132][3] = "Holt-Winters 乘法季節性模型";
svgStrU[133][3] = "非季節性時間序列";
svgStrU[134][3] = "塊";
svgStrU[135][3] = "聚類分析";
svgStrU[136][3] = "集群";
svgStrU[137][3] = "決策樹";
svgStrU[138][3] = "決策規則條件";
svgStrU[139][3] = "決定";
svgStrU[140][3] = "迭代";
svgStrU[141][3] = "平行圖";
svgStrU[142][3] = "分類";
svgStrU[143][3] = "分類函數";
svgStrU[144][3] = "分類結果";
svgStrU[145][3] = "決定";
svgStrU[146][3] = "誤分類率";
svgStrU[147][3] = "儲存格";
svgStrU[148][3] = "訓練資料";
svgStrU[149][3] = "測試資料";

// French
$message.fr = {
    "eStat : Stat Education SW": "eStat : Stat éducation SW",
    "Home": "Page d'accueil",
    "Filename": "Fichier",
    "Selected Variables": "Var Sélectionnées",
    "Cancel": "Annuler",
    "Edit Variables": "EditVar",
    "Level": "Niveau",
    "ElementaryLevel": "E",
    "MiddleLevel": "I",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Exemple",
    "New Sheets": "Nouvelles feuilles de calcul",
    "csv Open": "csv Ouvert",
    "www Open": "www Ouvert",
    "json Open": "json Ouvert",
    "csv Save": "csv Sauvegarder",
    "json Save": "json Sauvegarder",
    "Print Sheet": "Imprimer la page",
    "Bar Graph": "Diagramme en barres",
    "Pie Chart": "Camembert",
    "Band Graph": "Graphique à bandes",
    "Lineh": "Courbe",
    "Line Graph": "Graphique en courbe",
    "Dot Graph": "Graphique à points",
    "Histogram": "Histogramme",
    "Stem & Leaf Plot": "Diagramme tige-feuille",
    "maxStem": "** nombre maximum de tiges <= 30 **",
    "Box-Whisker Plot": "Boîte à moustaches",
    "Scatterplot": "Diagramme de dispersion",
    "ScatterplotMatrix": "Scatter Plot Matrice",
    "Frequency Table": "Tableau des fréquences",
    "Basic Statistics": "Statistiques élémentaires",
    "Testing Hypothesis &mu;": "Test d'hypothèse &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Test d'hypothèse &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Test d'hypothèse &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Test d'hypothèse &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Analyse de la variance",
    "MiddleSchool": "École intermédiaire",
    "HighSchool":   "Lycée",
    "University":   "Université",
    "eStatHeading": "eStat est un logiciel gratuit basé sur le Web pour une meilleure éducation statistique utilisant la visualisation dynamique des données et l'analyse statistique graphique.",
    "Support":      "Soutien",
    "Donation":     "Don",
    "Middle School Stat Education": "Enseignement des statistiques au collège",
    "High School Stat Education": "L'enseignement de la statistique au lycée",
    "University Stat Education": "Enseignement de la statistique à l'université",
    "Elem Stat Graph Example": "élémentaire Statistiques graphique Exemple",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Verticale",
    "Horizontal": "Horizontal",
    "Vertical Separated Bar": "Barre verticale séparée",
    "Vertical Stacked Bar": "Barre verticale empiléer",
    "Vertical Ratio Bar": "Barre verticale de ratio",
    "Vertical Side by Side Bar": "Barre verticale accolée",
    "Vertical Two Sided Bar": "Barre verticale double face",
    "Horizontal Separated Bar": "Barre horizontal séparée",
    "Horizontal Stacked Bar": "Barre horizontal empiléer",
    "Horizontal Ratio Bar": "Barre horizontale de ratio",
    "Horizontal Side by Side Bar": "Barre horizontal accolée",
    "Horizontal Two Sided Bar": "Barre horizontal double face",
    "Doughnut Graph": "Graphique en anneau",
    "Two Sided Stem & Leaf Plot": "Diagramme tige-feuille double face",
    "Graph Save": "Sauvegarder le graphique",
    "Graph Print": "Imprimer le graphique",
    "Move to Table": "Aller à la table",
    "Edit Title": "éditer le titre",
    "Table Save": "Sauvegarder le tableau",
    "Table Print": "Imprimer le tableau",
    "Frequency": "Fréquence",
    "Sorting": "Tri",
    "SortData": "Tri",
    "Raw Data": "Donnée brute",
    "Descending": "Descendant",
    "Ascending": "Ascendant",
    "Mean": "Moyenne",
    "Std Deviation": "Ecart-type",
    "MeanStd": "Moyenne/Ecart-type",
    "DotMeanStd": "Graphique à points - Moyenne/Ecart-type",
    "95CI": "95% Intervalle de confinace",
    "CorrelationAnalysis": "Analyse de corrélation",
    "RegressionAnalysis": "Régression Analyse",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Two way ANOVA",
    "Regression": "Régression",
    "Frequency Polygon": "Polygone des fréquences",
    "Execute New Interval": "Faire un nouvel intervallel",
    "Interval Start": "Début de l'intervalle",
    "Interval Width": "Largeur de l'intervalle",
    "t-test": "t test",
    "Z-test": "Z test",
    "(if Z-test, enter &sigma;)": "(Pour le Z test entrez &sigma;)",
    "Significance Level": "Niveau de signification",
    "Execute": "Exécuter",
    "(Confidence Interval)": "(Intervalle de confinace)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Pour le Z test, Z<sub>&alpha;/2</sub>utilisé)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Hypothèse de variance",
    "Variance": "Variance",
    "F test": "F test",
    "At least one pair of means is different": "Au moins deux moyennes sont différentes",
    "Main Title": "Titre principal",
    "y title": "y Titre",
    "x title": "x Titre",
    "yAxis": "Y Axe",
    "Modify": "Modifiez",
    "Confirm": "Confirmer",
    "Variable Name": "Nom de variable",
    "Variable Value": "Valeur de la variable",
    "Value Label": "Libellé  d'une valeurl",
    "* Less than nine value labels allowed.": "* Il faut moins de neuf libellésd.",
    "Save": "Sauvegarder",
    "Exit": "Terminer",
    "eStatU UnivStatEdu": "eStatU - Enseignement de la statistique à l'université SW",
    "eStatH HighStatEdu": "eStatH - L'enseignement de la statistique au lycée SW",
    "eStatM MiddleStatEdu": "eStatM - Primaire / Statistiques du collège SW",
    "MiddleStat": "Statistiques du collège",
    "HighStat":   "Statistiques du lycée",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menu",
    "Binomial Experiment": "Essai binomialt",
    "Binomial Distribution": "Loi binomiale",
    "Binomial Prob Table": "Table de la loi binomiale",
    "Poisson Distribution": "Loi Poisson",
    "Poisson Prob Table": "Table de la loi de Poisson",
    "Geometric Distribution": "Loi géométrique",
    "Geometric Prob Table": "Table de la loi géométrique",
    "HyperGeometric Distribution": "Loi hypergéométrique",
    "HyperGeometric Prob Table": "Table de la loi hypergéométrique",
    "Exponential Distribution": "Loi exponentielle",
    "Normal Experiment": "Expérience gaussienne",
    "Normal Distribution": "Loi normale",
    "Normal Approx": "Approximation normale",
    "t Distribution": "t Distribution",
    "ChiSquare Distribution": "&chi;&#178; Distribution",
    "F Distribution": "F Distribution",
    "Sampling": "Echantillonnage",
    "Population vs Sample": "Population vs Echantillon",
    "Population": "Population",
    "Sample": "Echantillon",
    "Exponential": "Exponentiellel(0.3)",
    "Uniform": "Uniforme(0,1)",
    "UniformDist": "Uniforme Distribution",
    "Sample05": "Echantillonnage 5%",
    "Sample10": "Echantillonnage 10%",
    "Sample20": "Echantillonnage 20%",
    "Statistics/BoxPlot": "Statistiques/Boîte à moustaches",
    "StatisticalProb":     "Probabilité statistique",
    "Law of Large Number": "Loi des grands nombres",
    "Dist of Sample Means": "Distribution des moyennes d'échantillon",
    "Sampling Distribution": "Distribution d'échantillonnage",
    "Sample Size": "Taille de l'échantillon",
    "Confidence Interval": "Intervalle de confinace",
    "Confidence Interval Simulation": "Essai Intervalle de confinace",
    "Simulation": "Essai",
    "Confidence Interval Mu": "Estimation : &mu;",
    "Mu Confidence Interval": "Estimation : &mu;",
    "Confidence Interval Sigma": "Estimation : &sigma;&#178; ",
    "Confidence Interval P": "Estimation : p",
    "Estimation Accuracy": "Précision de l'estimation",
    "Repetition": "Répétition",
    "Confidence Level": "Niveau de confiance",
    "Testing Hypothesis mu_titleAB": "Test d'hypothèse : &mu;",
    "Testing Hypothesis mu_title": "Test moyenne",
    "Testing Hypothesis sigma_title": "Test variance",
    "Testing Hypothesis P_title": "Test proportion",
    "Testing Hypothesis mu12_title": "Test deux moyennes de population",
    "Testing Hypothesis sigma12_title": "Test deux variances de population",
    "Testing Hypothesis P12_title": "Test deux proportion de population",
    "Testing Hypothesis muA":  "Test d'hypothèse &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Test d'hypothèse &mu; - C, n",
    "Testing Hypothesis mu": "Test d'hypothèse &mu;",
    "Testing Hypothesis sigma": "Test d'hypothèse &sigma;&#178;",
    "Testing Hypothesis P": "Test d'hypothèse p",
    "Testing Hypothesis mu12": "Test d'hypothèse &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Test d'hypothèse &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Test d'hypothèse p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Facteur ANOVA",
    "Testing Hypothesis ANOVA2": "2 Facteur ANOVA",
    "SameSampleSize": "La taille de l'échantillon de chaque cellule doit être la même.",
    "Testing Independence": "Test d'indépendance",
    "CategoryD": "Catégorie",
    "Category": "Catégorie",
    "Correlation Coefficient": "Coefficient de corrélation",
    "Regression Experiment": "Essai de régression",
    "Hypothesis": "Hypothèse",
    "Test Type": "Type de test",
    "Z-test": "Z test",
    "t-test": "t test",
    "Chi-test": "&chi;&#178; test",
    "F-test": "F test",
    "Sampling Type": "type d'échantillonnage",
    "Independent Sample": "indépendant",
    "Paired Sample": "jumelé",
    "Sample Data": "Données échantillonnées",
    "input either sample data": "Entrez soit la taille de l'échantillon, soit  les statistiques de l'échantillon dans les cases suivantes en séparant par  des virgules ou des blancs",
    "input data": "Entrer des données",
    "Sample Statistics": "Statistiques de l'échantillon",
    "Sample Mean": "Moyenne de l'échantillon",
    "Sample Variance": "Variance de l'échantillon",
    "Sample Proportion": "Pourcentage de l'échantillon",
    "sample range": "plage d'échantillon",
    "control chart": "carte de contrôle",
    "if Z-test-1": "(if Z test, Pour le Z test, entrez la variance de la population &sigma;&#178;)",
    "if Z-test-2": "(if Z test, z<sub>&alpha;/2 </sub> utilisé.)",
    "At least one pair": "Au moins deux moyennes sont différentes ",
    "Row-Col-0": "Les variables en ligne et en colonne sont indépendantes",
    "Row-Col-1": "Les variables en ligne et en colonne ne sont pas indépendantes",
    "Enter any number of row": "(Entrez les observations à partir de la case en haut à gauche)",
    "Row": "Ligne",
    "Column": "Colonne",
    "Probability": "Probabilité",
    "Show Probability": "Montrez la probabilité",
    "Regression Line": "Droite de régressione",
    "Erase All": "Effacer tout",
    "Add Point": "Ajouter un point",
    "Erase Point": "Effacer le point",
    "Reference Site": "Site de référence",
    "Lot Size": "Taille du lot",
    "Defect Size": "Taille du défaute",
    "Defect Rate": "taux de défauts",
    "If typed": "Après avoir tapé le numéro, cliquez [Exécuter] / [Entrée]",
    "Stat/BoxPlot": "Statistiques/Boîte à moustaches",
    "Mean": "Moyenne",
    "Std Dev": "Ecart-type",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 groupe)",
    "AnalysisVar": "Analyse Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Groupe",
    "GroupVar2": "X Var",
    "GroupVar3": "Facteur1",
    "GroupVar4": "Facteur2",
    "AnalysisVarMu12": "Analyse(or X1) Var",
    "GroupVarMu12": "Groupe(or X2) Var",
    "PairedMu12": "X1, X2 : données appariées",
    "SizeVar": "Taille Var",
    "RegressionBand": "Confinace Bandes",
    "RegressionTable": "Régressione Analyse",
    "RegressionResidual": "Résiduel Diagramme",
    "RegressionResidualLeverage": "Résiduel vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Résiduel Q-Q Diagramme",
    "HistogramNormal": "Histogramme",
    "HistogramChisq": "Normale Test",
    "HistogramNormalQQ": "Normale Q-Q Diagramme",
    "PopulationStd": "Population Ecart-type",
    "Type1Error": "Type 1 Erreur",
    "Type2Error": "Type 2 Erreur",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "MoyenneIntervalle de confiance",
    "MultipleComparison": "Comparaison multiple",
    "ComparisonGraph": "graphique de comparaison",
    "AnovaResidual": "Résiduel Diagramme",
    "AnovaQQ": "Résiduel Q-Q Diagramme",
    "TestingFit": "Qualité de l'ajustement Test",
    "FitTest0": "Les dist observées et théoriques sont les mêmes",
    "FitTest1": "Les dist observées et théoriques sont différentes",
    "ObservedFreq": "Fréquence observée O",
    "ExpectedProb": "Probabilité attendue p",
    "ExpectedFreq": "Fréquence attendue E(>5)",
    "InputFitData": "Entrez la cellule de la cellule supérieure gauche",
    "ExecuteTable": "Statistiquess",
    "MeanDotGraph": "Graphique d'intervalle de confiance",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Facteur",
    "Interaction": "Interaction",
    "NoInteraction": "Aucune Interaction",
    "ExistInteraction": "Exister Interaction",
    "eStatLecture": "eStat eConférence",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Rang Sum Tester", 
    "NonParametricMu12": "Wilcoxon Rang Sum Tester : Paramètre d'emplacement M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Rang Sum Tester",
    "Sample Range": "Rang Sum",
    "DistributionTable": "Distribution Table",
    "SignedRankTestDist": "Wilcoxon Signed Rang Sum Distribution",
    "WilcoxonTestDist": "Wilcoxon Rang Sum Distribution",
    "KruskalTestDist": "Kruskal-Wallis H Distribution",
    "FriedmanTestDist": "Friedman S Distribution",
    "SignedRankTest": "Signed Rang Sum Tester",
    "SignTest": "Test Signé",
    "SignCount": "Signe Compter",
    "KruskalTest": "Kruskal-Wallis Tester",
    "KruskalTestANOVA": "Kruskal-Wallis Tester",
    "Total": "Total",
    "FriedmanTest": "Friedman Tester",
    "FriedmanTestANOVA": "Friedman Tester",
    "Block": "Bloc",
    "Treatment": "Traitement",
    "At least one locations is different": "Au moins une paire d'emplacements est différente",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rang Sum Test,  n > 20 Normal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Normal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;&#178; approximation test",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Sélection de variables",
    "VariableSelect4": "Plus de variables d'analyse peuvent être sélectionnées",
    "VariableSelect5": "Plus de variables X peuvent être sélectionnées",
    "SummaryData": "Données récapitulatives",
    "RawData": "Données brutes",
    "MultiSelect": "",
    "DataType": "(Sélectionnez variable par clic nom de variable)",
    "by": "par",
    "NameVar": "Nom Var",
    "n_variance": "n-1 formule",
    "RandomNumber": "Nombre aléatoire",
    "RealNumber":     "Nombre réel",
    "IntegerNumber":  "Nombre entier",
    "NumberData":     "Nombre de données",
    "NumberDigit":    "Chiffre décimal",
    "NormalTable":    "Table de distribution normale",
    "Percentile":     "Tableau des centiles",
    "PercentileValue": "Centiles",
    "StudentRangeDist": "HSD Répartition de la gamme",
    "copy link": "copiar enlace",
    "WithoutReplacement": "Extraction non restaurée",
    "WithReplacement":    "Récupération",
    "Replacement":     "Récupération",
    "NonReplacement":  "Extraction non restaurée",
    "WordCloud":       "Nuage de mots (en anglais uniquement)",
    "oneColor":        "couleur",
    "defaultColor":    "couleur par défaut",
    "RelativeFreq":    "Fréquence relative",
    "Density":         "Densité",
    "MarginOfError":   "Margines błędu",
    "Permutation":     "Permutation",
    "PermutationSame": "la même rangée de colonnes",
    "Combination":     "Combinaison",
    "NumberOfCase":    "Nombre de cas",
    "BinomialTheorem": "binôme de Newton",
    "PascalTriangle":  "Triangle de Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Règle de probabilité d'addition",
    "MultiplicationRule":"Règle de probabilité de multiplication",
    "ConditionalProb":   "Probabilite conditionnelle",
    "JointProb":         "Probabilité conjointe",
    "DiscreteDist":      "Distribution discrète",
    "Categorize":        "Classer par catégories",
    "Recode":            "Recoder",
    "Compute":           "Calculer",
    "SelectIf":          "Sélectionner si",
    "InfoValueLabel":    "*** Sélectionnez la variable, entrez le nom de la variable et/ou le libellé de la valeur.",
    "InfoSorting":       "*** Sélectionnez la variable de tri, entrez la méthode de tri jusqu'à 3 variables.",
    "InfoCategorize":    "*** Sélectionnez la variable pour la catégorie, entrez 'Interval Start' et 'Interval Width'.",
    "InfoRecode":        "*** Sélectionnez la variable pour le recodage, entrez 'Nouvelle valeur'.",
    "InfoRecode2":       "* Autoriser l'enregistrement jusqu'à 9 valeurs.",
    "InfoCompute":       "*** Créez une formule de calcul à l'aide des boutons ci-dessous.",
    "InfoSelectIf":      "*** Sélectionnez jusqu'à 3 variables, saisissez leurs conditions.",
    "SortingVariable":   "Tri des variables",
    "SortingMethod":     "Méthode de tri",
    "NewVariable":       "Nouvelle variable",
    "CategoryVariable":  "Catégoriser la variable",
    "CategoryListCheck": "Vérification de la liste des catégories",
    "CategoryInterval":  "Intervalle de catégorie",
    "CategoryLabel":     "Étiquette de catégorie",
    "RecodeVariable":    "Recoder la variable",
    "CurrentValue":      "Valeur actuelle",
    "NewValue":          "Nouvelle valeur",
    "ComputeFormula":    "Formule",
    "SelectVariable":    "Variable<br>pour Select",
    "RelationOperator":  "Relation<br>Opérateur",
    "SelectValue":       "Valeur",
    "MissingValue":      "valeur manquante",
    "option":            "option",
    "TimeSeries":        "Des séries chronologiques",                      
    "Smoothing":         "Lissage",
    "Filtering":         "Filtration",
    "Transformation":    "Transformation",
    "Weight":            "Masse",
    "PercentChange":     "Modifier le pourcentage",
    "WeightedIndex":     "Index simplifié",
    "BaseTime":          "Base de temps",
    "LagTime":           "Temps de latence",
    "Lag":               "Décalage horaire",
    "Forecasting":       "Prévision",
    "SeasonalModel":     "Modèle saisonnier",
    "HoltWinter":        "Modèle saisonnier Holt-Winters",
    "Trend":             "Tendance",
    "Seasonal":          "Saisonnier",
    "Deseasonal":        "Série désaisonnalisée",
    "Nseason":           "Heures en saison",
    "Irregular":         "Irrégulier",
    "TrendModel":        "Modèle de tendance sur la désaisonnalisation",
    "RegressionModel":   "Modèle de régression",
    "ForecastingPeriod": "Période de prévision",
    "CreateTable":       "Tableau de données",
    "SaveTable":         "Enregistrer le tableau",
    "MA":                "Moyenne mobile",
    "EWMA":              "Modèle EWMA",
    "CenterMA":          "Moyenne mobile centrée",
    "MovingMedian":      " Médiane mobile centrée ",
    "ES":                "Lissage exponentiel",
    "Default":           "Défaut",
    "Linear":            "Linéaire",
    "Quadratic":         "Quadratique",
    "Cubic":             "Cubique",
    "SquareRoot":        "Racine carrée",
    "Log":               "Logarithmique",
    "Exponent":          "Exponentiel",
    "Power":             "Pouvoir",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Moyenne mobile unique",
    "SingleES":          "Lissage exponentiel simple",
    "DoubleMA":          "Double moyenne mobile",
    "DoubleES":          "Lissage double exponentiel",
    "HoltLinear":        "Lissage exponentiel Holt",
    "DeseasonIntercept": "Interception désaisonnalisée",
    "DeseasonSlope":     "Pente désaisonnalisée",
    "SeasonalIndex":     "Index saisonnier",
    "Diff":              "Différence",
    "DiffTime":          "Temps Différent",
    "AR":                "Modèle autorégressif",
    "ResultTable":       "Résultat de la régression",
    "ForecastTable":     "Tableau de prévisions",
    "HoltLevel":         "Niveau",
    "HoltTrend":         "Tendance",
    "AutoCorrTable":     "Table d'autocorrélation",
    "DiffSeries":        "Série Différence",
    "RawSeries":         "Série brute",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// French
appStr[0][4] = "/estat/eStat/index.html";
appStr[1][4] = "/estat/eStatH/index.html";
appStr[2][4] = "/estat/eStatU/index.html";
appStr[3][4] = "/estat/eStatE/index_en.html";
appStr[4][4] = "/estat/eHelp/index_en.html";
appStr[5][4] = "index.html";
appStr[6][4] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][4] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][4] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][4] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][4] = "";
appStr[11][4] = "Large Population Country";
appStr[12][4] = "Life Expectancy (OECD)";
appStr[13][4] = "Population Pyramid (Korea)";
appStr[14][4] = "GNP per Capita (OECD)";
appStr[15][4] = "Top World Export Country";
appStr[16][4] = "Obesity % of Population";
appStr[17][4] = "Temperature of Major City";
appStr[18][4] = "Top CO2 Emission Country";
appStr[19][4] = "Alcohol Consume (OECD)";
appStr[20][4] = "Continuous Data Graph";
appStr[21][4] = "Length of Otter";
appStr[22][4] = "Age of Teacher";
appStr[23][4] = "Age of Teacher by Sex";
appStr[24][4] = "Cleanliness of Tooth";
appStr[25][4] = "Math Exam Scores";
appStr[26][4] = "Calorie of Hamberger";
appStr[27][4] = "Height vs Weight by Sex";
appStr[28][4] = "Discrete Data Graphs";
appStr[29][4] = "";
appStr[30][4] = "";
appStr[31][4] = "unit";
appStr[32][4] = "Country";
appStr[33][4] = "Male";
appStr[34][4] = "Female";
appStr[35][4] = "Age";
appStr[36][4] = "Person";
appStr[37][4] = "billion $";
appStr[38][4] = "Export";
appStr[39][4] = "Obesity %";
appStr[40][4] = "Celsius";
appStr[41][4] = "City";
appStr[42][4] = "Jan High";
appStr[43][4] = "Jul High";
appStr[44][4] = "million ton";
appStr[45][4] = "liter/year";
appStr[46][4] = "Alcohol";
alertMsg[1][4] = "L'une des variables sélectionnées ne contient pas de données.";
alertMsg[1][4] = "Une des variables sélectionnées ne contient pas de données.";
alertMsg[2][4] = "Selectionnez une par une les variables à analyser en cliquant sur chaque nom de colonne. Pour deux variables, la premiere est la variable de groupe. ";
alertMsg[3][4] = "Données manquantes dans la variable sélectionnée.";
alertMsg[4][4] = "Les observations correspondants aux variables sélectionnées doivent être identiques.";
alertMsg[5][4] = "Trop de groupes! Les graphiques risquent de se superposer à cause de lataille de l'écran.";
alertMsg[6][4] = "La variable d'analyse ne doit pas contenir de valeurs non numériques.";
alertMsg[7][4] = "On ne peut pas sélectionner plus de trois variables dans les données brutes ou dans des tableaux.";
alertMsg[8][4] = "Un graphique à points est traçable si le nombre d'observations ne dépasse pas 200.";
alertMsg[9][4] = "Le diagramme tige-feuille n'est autorisé que si le nombre d'observations est inférieur à 100.";
alertMsg[10][4] = "La variable d'analyse n'est pas sélectionnée.";
alertMsg[11][4] = "La variable d'analyse/groupe n'est pas sélectionnée.";
alertMsg[12][4] = "La variable d'analyse ne doit pas contenir de valeurs non numériques.";
alertMsg[13][4] = "";
alertMsg[14][4] = "Les résumés ne sont pas acceptés pour les graphiques continus et les tests.";
alertMsg[16][4] = "Pour ce test , il faut uniquement deux groupes.";
alertMsg[17][4] = "Un diagramme de dispersion nécessite au moins une variable x et une variable y.";
alertMsg[18][4] = "Plus de trois variables ne sont pas autorisées.";
alertMsg[19][4] = "S'il y a un caractère sur les données, l'analyse ne peut pas être faite.";
alertMsg[20][4] = "Si X/Y contient une valeur non numérique, le regression ne peut pas être tracé.";
alertMsg[21][4] = "La sauvegarde n'est pas autorisée s'il y a une donnée manquante.";
alertMsg[22][4] = "Diagramme en barres n'est pas autorisée s'il y a une donnée manquante.";
alertMsg[25][4] = "S'il n'ya qu'un seul groupe on ne peut pas tracer des diagrammes en barre empilés.";
alertMsg[27][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer un graphique de ratio.";
alertMsg[29][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer des graphiques en barre accolés.";
alertMsg[31][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer des graphiques en barre double face.";
alertMsg[32][4] = "Un camembert ne peut pas être tracé si une valeur est négative.";
alertMsg[33][4] = "Le graphique en anneau ne peut pas être tracé s'il y a des valeurs négatives.";
alertMsg[34][4] = "Le graphique à bandes ne peut pas être tracé si une valeur est négative.";
alertMsg[35][4] = "S'il y a une valeur négative, on ne peut pas calculer un tableau de fréquences.";
alertMsg[36][4] = "Ce diagramme en barres ne s'utilise que pour deux groupes.";
alertMsg[37][4] = "Ce test d'hypothese n'est valable que pour une seule variable.";
alertMsg[38][4] = "mu n'est pas un nombre. Entrer une valeur et recommencez!!";
alertMsg[39][4] = "L'écart-type est soit nul ou n'est pas un nombre. Recommencez!!";
alertMsg[40][4] = "La variance saisie n'est pas un nombre. Entrez une valeur et recommencez!";
alertMsg[41][4] = "Ce test d'hypothese n'est valable que pour deux variables. La variable de groupe ne doit avoir que deux  modalités";
alertMsg[42][4] = "Modifier le titre du test n'est pas autorisé! ";
alertMsg[43][4] = "La régression linéaire simple est seulement pour un groupe";
alertMsg[44][4] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][4] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][4] = "Le même numéro de variable est sélectionné.";
alertMsg[47][4] = "Les données de caractères en fréquence ne sont pas autorisées !!   Essayez encore."; 
alertMsg[48][4] = "Les données de caractère ne sont pas autorisées !!   Essayez encore."; 
alertMsg[49][4] = "Le nombre d'observations devrait être inférieur à 100 !!   Essayez encore une fois.";
alertMsg[50][4] = "Entrez les nombres dans l'intervalle de début ou d'étape.";
alertMsg[51][4] = "Entrez les nombres / Le nombre de lignes devrait être le même !!   Essayez encore une fois.";
alertMsg[52][4] = "Inscrire les numéros dans la catégorie et la fréquence.";
alertMsg[53][4] = "La taille de l'interval n'est pas la même !!   Essayez encore une fois.";
alertMsg[54][4] = "X observation n'est pas égale Y observation !!   Essayez encore une fois.";
alertMsg[55][4] = "!!! Pas de données sur la feuille.";
alertMsg[56][4] = "!!! Aucune variable choisie";
alertMsg[57][4] = "!!! Entrez l'intervalle de début et la largeur de l'intervalle";
alertMsg[58][4] = "!!! Inscrire l'intervalle numérique de démarrage et la largeur de l'intervalle"
alertMsg[59][4] = "!!! Plus de 9 intervalles - changer la largeur de l'intervalle";
alertMsg[60][4] = "!!! Cette variable a plus de 9 valeurs";
alertMsg[61][4] = "!!! Aucune valeur inscrite";
alertMsg[62][4] = "!!! Inscrire la formule";
alertMsg[63][4] = "!!! Aucune donnée satisfaisant aux conditions.";
alertMsg[64][4] = "";
alertMsg[65][4] = ""; 
alertMsg[66][4] = "";
alertMsg[67][4] = "";
alertMsg[68][4] = "";
alertMsg[69][4] = "";

svgStr[1][4] = " Diagramme en barres";
svgStr[2][4] = " Camembert";
svgStr[3][4] = " Graphique en anneau";
svgStr[4][4] = " Graphique à bandes";
svgStr[5][4] = " Graphique en courbe";
svgStr[6][4] = " Graphique à points";
svgStr[7][4] = " Boîte à moustaches ";
svgStr[8][4] = " Diagramme tige-feuille";
svgStr[9][4] = " Histogramme";
svgStr[10][4] = " Diagramme de dispersion ";
svgStr[11][4] = " Test d'hypothèse: Population moyenne";
svgStr[12][4] = " Test d'hypothèse: Population variance";
svgStr[13][4] = " Test d'hypothèses: Deux moyennes de population";
svgStr[14][4] = " Test d'hypothèses: Deux variances de population";
svgStr[15][4] = " Analyse de la variance";
svgStr[16][4] = "Fréquence";
svgStr[17][4] = "Ratio";
svgStr[18][4] = "Groupe";
svgStr[19][4] = " ";
svgStr[20][4] = "<h3>Les résumés<br>Tableau des fréquences</h3>";
svgStr[21][4] = "Variable de groupe";
svgStr[22][4] = "Variable ligne";
svgStr[23][4] = "Total";
svgStr[24][4] = "CircleSize";
svgStr[25][4] = "<h3>Tableau des fréquences</h3>";
svgStr[26][4] = "Analyse Var";
svgStr[27][4] = "valeur de la variable";
svgStr[28][4] = "Libellé  d'une valeur";
svgStr[29][4] = "Fréquence";
svgStr[30][4] = "Fréquence relative";
svgStr[31][4] = "<h3>Tableau croisé</h3>";
svgStr[32][4] = "Variable colonne";
svgStr[33][4] = "Ligne Variable";
svgStr[34][4] = "Moyenne"
svgStr[35][4] = "Ecart-type"
svgStr[36][4] = "<h3> Histogramme<br>Tableau des fréquences</h3>";
svgStr[37][4] = "Nom de groupe";
svgStr[38][4] = "Intervalle";
svgStr[39][4] = "Tige";
svgStr[40][4] = " Feuille";
svgStr[41][4] = "Groupe 1  Feuille";
svgStr[42][4] = "Groupe 2  Feuille"
svgStr[43][4] = "<h3>Statistiques élémentairess</h3>";
svgStr[44][4] = "Observation";
svgStr[45][4] = "Minimum";
svgStr[46][4] = "Médiane";
svgStr[47][4] = "Maximum";
svgStr[48][4] = "Total";
svgStr[49][4] = "<h3>Normale Test</h3>";
svgStr[50][4] = "*** E<sub>i</sub> > 5";
svgStr[51][4] = "&chi;&#178; Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][4] = "Données<br>Fréquence<br>(O<sub>i</sub>)";
svgStr[53][4] = "Normal Distribution<br>Expected Probability<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][4] = "Normal Distribution<br>Expected Frequency<br>(E<sub>i</sub>)";
svgStr[55][4] = "&chi;&#178; valeur<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][4] = "résumés &chi;&#178; value";
svgStr[57][4] = "Probabilité Histogramme and Loi normale";
svgStr[58][4] = "Normale Q-Q Plot";
svgStr[59][4] = "Normale Quantile";
svgStr[60][4] = "Coefficient de Corrélation";
svgStr[61][4] = "Coefficient of Determination";
svgStr[62][4] = "Erreur standard";
svgStr[63][4] = "Variable";
svgStr[64][4] = "Nom de variable";
svgStr[65][4] = "Indépendantes Variable";
svgStr[66][4] = "Dépendantes Variable";
svgStr[67][4] = "Parameter";
svgStr[68][4] = "Estimated Valeur";
svgStr[69][4] = "valeur";
svgStr[70][4] = "Intercepter";
svgStr[71][4] = "Pente";
svgStr[72][4] = "Facteur";
svgStr[73][4] = "Somme des carrés";
svgStr[74][4] = "deg de liberté";
svgStr[75][4] = "Carrés moyens";
svgStr[76][4] = "Régression";
svgStr[77][4] = "Erreur";
svgStr[78][4] = "Total";
svgStr[79][4] = "<h3>Régression Analyse</h3>";
svgStr[80][4] = "Standardized Résiduel Q-Q Diagramme";
svgStr[81][4] = "Standardized Résiduel";
svgStr[82][4] = "Normal Quantile";
svgStr[83][4] = "Résiduel Diagramme";
svgStr[84][4] = "Predicted Valeur";
svgStr[85][4] = "Deux voies ANOVA";
svgStr[86][4] = "Graphique d'intervalle de confiance";
svgStr[87][4] = "Résiduel";
svgStr[88][4] = "Statistiques à deux dimensions";
svgStr[89][4] = "Scatter Plot Matrice";
svgStr[90][4] = "Comparaison multiple";
svgStr[91][4] = "Statistiques";
svgStr[92][4] = "Facteur";
svgStr[93][4] = "Niveau";
svgStr[94][4] = "Diagramme de données d'échantillons appariés";
svgStr[95][4] = "Résiduel vs Prévision Diagramme";
svgStr[96][4] = "Résiduel vs Influence Diagramme";
svgStr[97][4] = "Cook's Distance Diagramme";
svgStr[98][4] = "Cook's Distance";
svgStr[99][4] = "Ordre des données";
svgStr[100][4]= "Différence moyenne";
svgStr[101][4]= "Moyens de test";
svgStr[102][4]= "Traitement";
svgStr[103][4]= "Interaction";
svgStr[104][4]= "Total de ligne";
svgStr[105][4]= "Total de colonne";
svgStr[106][4]= "Coefficient de corrélation multiple";
svgStr[107][4]= "<h3>Analyse de corrélation</h3>";
svgStr[108][4]= "Matrice de corrélation";
svgStr[109][4]= "Facteur A - Facteur B Graphique moyen";
svgStr[110][4]= "Influence";
svgStr[111][4]= "Graphique d'information géographique";
svgStr[112][4]= "Gamme";
svgStr[113][4]= "Moyenne - Ecart-type Diagramme";
svgStr[114][4]= "Population variance";
svgStr[115][4]= "d'hypothèse";
svgStr[116][4]= "test";
svgStr[117][4]= "Variance";
svgStr[118][4]= "Valeur d'intervalle";
svgStr[119][4]= "Catégorie";
svgStr[120][4] = "Mode";
svgStr[121][4] = "Covariance";
svgStr[122][4] = "Triangle Pascal";
svgStr[123][4] = "Probabilité conjointe";
svgStr[124][4] = "Conditionnel";
svgStr[125][4] = "Distribution discrète";
svgStr[126][4] = "ligne %";
svgStr[127][4] = "colonne %";
svgStr[128][4] = "total %";
svgStr[129][4] = "Matrice de graphique à barres";
svgStr[130][4] = "Prob préalable" ;
svgStr[131][4] = "Valeur propre";
svgStr[132][4] = "Vecteur propre";
svgStr[133][4] = "Tableau de fréquences multidimensionnelles" ;
svgStr[134][4] = "Graphique de cluster hiérarchique";
svgStr[135][4] = "Distance";
svgStr[136][4] = "Unique";
svgStr[137][4] = "Complet";
svgStr[138][4] = "Moyenne";
svgStr[139][4] = "Centroïde";
svgStr[140][4] = "Quartier";
svgStr[141][4] = "Lien";
svgStr[142][4] = "Number of Clusters <br>K";
svgStr[143][4] = "Bayes Information Criteria";
svgStr[144][4] = "Within Sum of Squares";
svgStr[145][4] = "Akaike Information Criteria";

svgStrU[1][4] = "Loi binomiale";
svgStrU[2][4] = "Répétition";
svgStrU[3][4] = "Moyenne";
svgStrU[4][4] = "Ecart-type";
svgStrU[5][4] = "Loi de Poisson";
svgStrU[6][4] = "Loi géométrique";
svgStrU[7][4] = "Loi hypergéométrique";
svgStrU[8][4] = "Population";
svgStrU[9][4] = "Distribution d'échantillonnage";
svgStrU[10][4] = "Loi des grands nombres";
svgStrU[11][4] = "Queue";
svgStrU[12][4] = "Face";
svgStrU[13][4] = "Face d'une pièce";
svgStrU[14][4] = "Nombre de faces";
svgStrU[15][4] = "Nombre d'essais";
svgStrU[16][4] = "Distribution des moyennes d'échantillon";
svgStrU[17][4] = "Répétition";
svgStrU[18][4] = "Erreur standard";
svgStrU[19][4] = "Moyenne de la population";
svgStrU[20][4] = "Intervalle de confinace";
svgStrU[21][4] = "Précision de l'estimation";
svgStrU[22][4] = "Moyenne de l'échantillon";
svgStrU[23][4] = "[TestStat]";
svgStrU[24][4] = "Distribution";
svgStrU[25][4] = "Rejeter H\u2080";
svgStrU[26][4] = "Accepter H\u2080";
svgStrU[27][4] = "p-valeur";
svgStrU[28][4] = "[Décision] ";
svgStrU[29][4] = "[ANOVA]";
svgStrU[30][4] = "Entrer le coefficient de corrélation et cliquer sur le bouton Executer";
svgStrU[31][4] = "Régression";
svgStrU[32][4] = "Ligne Var";
svgStrU[33][4] = "Colonne Var";
svgStrU[34][4] = "Moyenne"
svgStrU[35][4] = "Ecart-type"
svgStrU[36][4] = "<h3> Histogramme<br>Tableau des fréquences</h3>";
svgStrU[37][4] = "Nom de groupe";
svgStrU[38][4] = "Intervalle";
svgStrU[39][4] = "Tige";
svgStrU[40][4] = " Feuille";
svgStrU[41][4] = "Groupe 1 Feuille";
svgStrU[42][4] = "Groupe 2 Feuille"
svgStrU[43][4] = "<h3>Statistiques élémentaires</h3>";
svgStrU[44][4] = "Observation";
svgStrU[45][4] = "Minimum";
svgStrU[46][4] = "Médiane";
svgStrU[47][4] = "Maximum";
svgStrU[48][4] = "Total";
svgStrU[49][4] = "Exponentielle";
svgStrU[50][4] = "Uniforme";
svgStrU[51][4] = "Précision de l'estimation";
svgStrU[52][4] = "- Ajouter des points en cliquant et eStat trouve la droite de régression.";
svgStrU[53][4] = "- Déplacez ou enlevez un point. Regardez comment change la droite de régression.";
svgStrU[54][4] = "[Statistiques de l'échantillon] ";
svgStrU[55][4] = "[Statistiques de l'échantillon 1] ";
svgStrU[56][4] = "[Statistiques de l'échantillon 2] ";
svgStrU[57][4] = "intervalle de confinace";
svgStrU[58][4] = "Ligne Colonne indépendantes;";
svgStrU[59][4] = "Ligne Colonne ne indépendantes";
svgStrU[60][4] = "Distribution observée";
svgStrU[61][4] = "Distribution théorique";
svgStrU[62][4] = "Test de validité de l'ajustement pour la fréquence observée";
svgStrU[63][4] = "Wilcoxon Test de somme de classement";
svgStrU[64][4] = "Wilcoxon Test de somme de classementTable";
svgStrU[65][4] = "Kruskal-Wallis Test";
svgStrU[66][4] = "Kruskal-Wallis H Distribution";
svgStrU[67][4] = "Kruskal-Wallis H Statistic";
svgStrU[68][4] = "Wilcoxon Test de rang signé";
svgStrU[69][4] = "Test signé";
svgStrU[70][4] = "Friedman Test";
svgStrU[71][4] = "Friedman S Statistic";
svgStrU[72][4] = "Friedman S Distribution";
svgStrU[73][4] = "t-valeur (Z)";
svgStrU[74][4] = "ChiSq-valeur";
svgStrU[75][4] = "Variance de l'échantillon";
svgStrU[76][4] = "Diferença de médias amostrais";
svgStrU[77][4] = "Rapport de variance de l'échantillon";
svgStrU[78][4] = "Hypothèse de variance";
svgStrU[79][4] = "Données récapitulatives";
svgStrU[80][4] = "Sélection multiple";
svgStrU[81][4] = "Sélectionnez jusqu'à deux groupes";
svgStrU[82][4] = "Var X";
svgStrU[83][4] = "Var Y";
svgStrU[84][4] = "par";
svgStrU[85][4] = "Pas de variable de groupe";
svgStrU[86][4] = "Données sélectionnées: ";
svgStrU[87][4] = "Données brutes";
svgStrU[88][4] = "Sélectionnez variable par clic nom de variable";
svgStrU[89][4] = "Valeurs manquantes";
svgStrU[90][4] = "somme de classement";
svgStrU[91][4] = "Longitude";
svgStrU[92][4] = "Latitude";
svgStrU[93][4] = "Au moins une paire d'emplacements est différente";
svgStrU[94][4] = "Wilcoxon Test de rang signé";
svgStrU[95][4] = "Variable appariée";
svgStrU[96][4] = "Données Appariées";
svgStrU[97][4] = "Test d'indépendance";
svgStrU[98][4] = "Simulation";
svgStrU[99][4] = "Nombre aléatoire";
svgStrU[100][4] = "Distribution normale";
svgStrU[101][4] = "Distribution t";
svgStrU[102][4] = "Distribution &chi;&#178;";
svgStrU[103][4] = "Distribution F";
svgStrU[104][4] = "Distribution HSD";
svgStrU[105][4] = "1er quartile";
svgStrU[106][4] = "3ème quartile";
svgStrU[107][4] = "Gamme interquartile";
svgStrU[108][4] = "Coefficient de détermination";
svgStrU[109][4] = "Fréquence relative cumulée (%)";
svgStrU[110][4] = "Nombre maximum d'entiers de la distribution uniforme";
svgStrU[111][4] = "Déplacer un point avec la souris";
svgStrU[112][4] = "Récupération";
svgStrU[113][4] = "Extraction non restaurée"; 
svgStrU[114][4] = "Courbe"; 
svgStrU[115][4] = "Pourcentage de changement" ;
svgStrU[116][4] = "Index simple" ;
svgStrU[117][4] = "Décalage" ;
svgStrU[118][4] = "Différence" ;
svgStrU[119][4] = "Autocorrélation" ;
svgStrU[120][4] = "Journal" ;
svgStrU[121][4] = "Racine carrée" ;
svgStrU[122][4] = "Box-Cox" ;
svgStrU[123][4] = "Temps de base" ;
svgStrU[124][4] = "Moyenne mobile centrée" ;
svgStrU[125][4] = "Lissage exponentiel" ;
svgStrU[126][4] = "Médiane mobile centrée" ;
svgStrU[127][4] = "Modèle" ;
svgStrU[128][4] = "Moyenne mobile" ;
svgStrU[129][4] = "Moyenne mobile double" ;
svgStrU[130][4] = "Lissage exponentiel double Holt" ;
svgStrU[131][4] = "Index saisonnier" ;
svgStrU[132][4] = "Modèle saisonnier multiplicatif de Holt-Winters" ;
svgStrU[133][4] = "Séries désaisonnalisées" ;
svgStrU[134][4] = "Bloc";
svgStrU[135][4] = "Analyse de cluster" ;
svgStrU[136][4] = "Cluster" ;
svgStrU[137][4] = "Arbre de décision" ;
svgStrU[138][4] = "Condition de règle de décision" ;
svgStrU[139][4] = "Décision";
svgStrU[140][4] = "Itération";
svgStrU[141][4] = "Graphique parallèle";
svgStrU[142][4] = "Classification";
svgStrU[143][4] = "Fonction de classification" ;
svgStrU[144][4] = "Résultat de la classification" ;
svgStrU[145][4] = "Décision";
svgStrU[146][4] = "Taux d'erreurs de classification" ;
svgStrU[147][4] = "Cellule";
svgStrU[148][4] = "Données d'entraînement" ;
svgStrU[149][4] = "Données de test" ;


// German
$message.de = {
    "eStat : Stat Education SW": "eStat : Statistikausbildung SW",
    "Home": "Startseite",
    "Filename": "Datei",
    "Selected Variables": "Wähle Variablen aus",
    "Cancel": "Entfernen",
    "Edit Variables": "Editiere Variablen",
    "Level": "Niveau",
    "ElementaryLevel": "Basis",
    "MiddleLevel": "mittleres",
    "HighLevel": "H",
    "UniversityLevel": "Universitäres",
    "Example": "Beispiel",
    "New Sheets": "Neue Blätter",
    "csv Open": "csv Offen",
    "www Open": "www Offen",
    "json Open": "json Offen",
    "csv Save": "csv Speichern",
    "json Save": "json Speichern",
    "Print Sheet": "Blatt drucken",
    "Bar Graph": "Balkendiagramm",
    "Pie Chart": "Kreisdiagramm",
    "Band Graph": "Banddiagramm",
    "Line": "Linen",
    "Line Graph": "Gerade",
    "Dot Graph": "eindimensionales Streudiagramm",
    "Histogram": "Histogramm",
    "Stem & Leaf Plot": "Stamm-Blatt-Diagramm",
    "maxStem": "** maximale Anzahl von Stamm <= 30 **",
    "Box-Whisker Plot": "Box-Whisker-Plot",
    "Scatterplot": "Streudiagramm",
    "ScatterplotMatrix": "Streudiagramm-Matrix",
    "Frequency Table": "Häufigkeitstabelle",
    "Basic Statistics": "Basisstatistik",
    "Testing Hypothesis &mu;": "Hypothesen testen  &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Hypothesen testen  &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Hypothesen testen  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Hypothesen testen &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Varianzanalyse",
    "MiddleSchool": "Mittelschule",
    "HighSchool":   "Weiterführende Schule",
    "University":   "Universität",
    "eStatHeading": "eStat ist eine webbasierte Freeware für eine bessere Statistikausbildung mit dynamischer Datenvisualisierung und grafischer statistischer Analyse.",
    "Support":      "Unterstützung",
    "Donation":     "Spende",
    "Middle School Stat Education": "Statistische Bildung in der Mittelstufe",
    "High School Stat Education": "Statistikausbildung an High Schools",
    "University Stat Education": "Statistikausausbildung an Universitäten",
    "Elem Stat Graph Example": "Diagramm Beispiel",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Vertikal",
    "Horizontal": "Horizontal",
    "Vertical Separated Bar": "getrennte Balkendiagramme",
    "Vertical Stacked Bar": "Diagramm mit vertikal gestapelten Balken",
    "Vertical Ratio Bar": "Verhaeltniss-Balkendiagramm",
    "Vertical Side by Side Bar": "Nebeneinander-Balkendiagramme",
    "Vertical Two Sided Bar": "Doppel-Balkendiagramm",
    "Horizontal Separated Bar": "Horizontal getrennte Balkendiagramme",
    "Horizontal Stacked Bar": "Diagramm mit horizontal gestapelten Balken",
    "Horizontal Ratio Bar": "Horizontal Verhaeltniss-Balkendiagramm",
    "Horizontal Side by Side Bar": "Horizontal Nebeneinander-Balkendiagramme",
    "Horizontal Two Sided Bar": "Horizontal Nebeneinander-Balkendiagramme",
    "Doughnut Graph": "Ringdiagramm",
    "Two Sided Stem & Leaf Plot": "zweiseitiges Stamm-Blatt-Diagramm",
    "Graph Save": "Graph speichern",
    "Graph Print": "Graph drucken",
    "Move to Table": "Bewege zur Tabelle",
    "Edit Title": "Titel editieren",
    "Table Save": "Tabelle speichern",
    "Table Print": "Tabelle drucken",
    "Frequency": "Häufigkeit",
    "Sorting": "Sortieren",
    "SortData": "Sortieren",
    "Raw Data": "Rohdaten",
    "Descending": "absteigend",
    "Ascending": "aufsteigend",
    "Mean": "Mittelwert",
    "Std Deviation": "Standardabweichung",
    "MeanStd": "Mittelwert/Standardabweichung",
    "DotMeanStd": "eindimensionales Streudiagramm - Mittelwert/Standardabweichung",
    "95CI": "95% Konfidenzintervall",
    "CorrelationAnalysis": "Korrelationsanalyse",
    "RegressionAnalysis": "Regressionanalyse",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Zweiweg ANOVA",
    "Regression": "Regression",
    "Frequency Polygon": "Häufigkeitspolygon",
    "Execute New Interval": "Erzeuge ein neues Intervall",
    "Interval Start": "linke Intervallgrenze",
    "Interval Width": "Intervallbreite",
    "t-test": "t test",
    "Z-test": "Z test",
    "(if Z-test, enter &sigma;)": "(Fall Z Test vorliegt, gib &sigma; ein)",
    "Significance Level": "Signifikanzniveau",
    "Execute": "Führe aus",
    "(Confidence Interval)": "(Konfidenzintervall)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Fall Z Test vorliegt, Z, &sigma)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Annahme für die Varianz",
    "Variance": "Varianz",
    "F test": "F test",
    "At least one pair of means is different": "mindestens ein Paar von Mittelwerten ist verschieden",
    "Main Title": "Hauptüberschrift",
    "y title": "y titel",
    "x title": "x titel",
    "yAxis": "Y-Achse",
    "Modify": "Verändern",
    "Confirm": "Bestätige",
    "Variable Name": "Variablenname",
    "Variable Value": "Variablenwert",
    "Value Label": "Wertname",
    "* Less than nine value labels allowed.": "* weniger als neun Werte zulässig.",
    "Save": "Speichern",
    "Exit": "Exit",
    "eStatU UnivStatEdu": "eStatU - Statistikausausbildung an Universitäten",
    "eStatH HighStatEdu": "eStatH - Statistikausbildung an High Schools",
    "eStatM MiddleStatEdu": "eStatM - Grundschule / Statistik Mittelschule SW",
    "MiddleStat": "Statistik Mittelschule",
    "HighStat":   "Statistik des Gymnasiums",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menü",
    "Binomial Experiment": "Binomialexperiment",
    "Binomial Distribution": "Binomialverteilung",
    "Binomial Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der Binomialverteilung",
    "Poisson Distribution": "Poisson-Verteilung",
    "Poisson Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der Poisson-Verteilung",
    "Geometric Distribution": "geometrische Verteilung",
    "Geometric Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der geometrischen Verteilung",
    "HyperGeometric Distribution": "Hypergeometrische Verteilung ",
    "HyperGeometric Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der hypergeometrischen Verteilung",
    "Exponential Distribution": "Exponentailverteilung",
    "Normal Experiment": "Normalverteilungsexperiment",
    "Normal Distribution": "Normalverteilung",
    "Normal Approx": "Normalapproximation",
    "t Distribution": "t Verteilung",
    "ChiSquare Distribution": "&chi;&#178; Verteilung",
    "F Distribution": "F Verteilung",
    "Sampling": "Ziehen von Stichproben",
    "Population vs Sample": "Population vs Stichproben",
    "Population": "Grundgesamtheit",
    "Sample": "Stichproben",
    "Exponential": "Exponentail(0.3)",
    "Uniform": "Gleichverteilung(0,1)",
    "UniformDist": "Gleichverteilung Verteilung",
    "Sample05": "Stichproben 5%",
    "Sample10": "Stichproben 10%",
    "Sample20": "Stichproben 20%",
    "Statistics/BoxPlot": "Statistik/BoxPlot",
    "StatisticalProb":     "Statistische Wahrscheinlichkeit",
    "Law of Large Number": "Gesetz der Großen Zahlen",
    "Dist of Sample Means": "Verteilung der Stichprobenmittelwerte",
    "Sampling Distribution": "Stichprobenverteilung",
    "Sample Size": "Stichprobenumfang",
    "Confidence Interval": "Konfidenzintervall",
    "Confidence Interval Simulation": "Konfidenzintervallexperiment",
    "Simulation": "Experiment",
    "Confidence Interval Mu": "Einschätzung : &mu;",
    "Mu Confidence Interval": "Einschätzung : &mu;",
    "Confidence Interval Sigma": "Einschätzung : &sigma;&#178; ",
    "Confidence Interval P": "Einschätzung : p",
    "Estimation Accuracy": "Schätzgenauigkeit",
    "Repetition": "Wiederholung",
    "Confidence Level": "Konfidenzniveau",
    "Testing Hypothesis mu_titleAB": "Hypothesen testen &mu",
    "Testing Hypothesis mu_title": "Hypothesen testen &mu;",
    "Testing Hypothesis sigma_title": "Hypothesen testen &sigma;&#178;",
    "Testing Hypothesis P_title": "Hypothesen testen p",
    "Testing Hypothesis mu12_title": "Hypothesen testen &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12_title": "Hypothesen testen  &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12_title": "Hypothesen testen p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis muA":  "Hypothesen testen &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Hypothesen testen &mu; - C, n",
    "Testing Hypothesis mu": "Hypothesen testen &mu;",
    "Testing Hypothesis sigma": "Hypothesen testen &sigma;&#178;",
    "Testing Hypothesis P": "Hypothesen testen p",
    "Testing Hypothesis mu12": "Hypothesen testen &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Hypothesen testen  &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Hypothesen testen  p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Faktor ANOVA",
    "Testing Hypothesis ANOVA2": "2 Faktor ANOVA",
    "SameSampleSize": "Die Stichprobengröße jeder Zelle sollte gleich sein.",
    "Testing Independence": "Hypothesen testen auf Unabhängigkeit",
    "CategoryD": "Kategorie",
    "Category": "Kategorie",
    "Correlation Coefficient": "Korrelationskoeffizient",
    "Regression Experiment": "Regressionsexperiment",
    "Hypothesis": "Hypothese",
    "Test Type": "Testtyp",
    "Chi-test": "&chi;&#178; test",
    "Sampling Type": "Beispielstyp",
    "Independent Sample": "unabhängig",
    "Paired Sample": "gepaart",
    "Sample Data": "Stichprobendaten",
    "input either sample data": "Gib entweder Stichprobenwerte oder Stichprobenstatistik ein.",
    "input data": "Daten eingeben",
    "Sample Statistics": "Stichprobenstatistik",
    "Sample Mean": "Stichprobenmittelwert",
    "Sample Variance": "Stichprobenvarianz",
    "Sample Proportion": "Stichprobenanteil",
    "sample range": "Beispielbereich",
    "control chart": "Kontrolldiagramm",
    "if Z-test-1": "(Falls Z Test vorliegt, gib Varianz ein)",
    "if Z-test-2": "(Falls Z Test vorliegt, z<sub>&alpha;/2 </sub>)",
    "At least one pair": "mindestens ein Paar von Mittelwerten ist verschieden",
    "Row-Col-0": "Zeilen- und  Spaltenvariablen sind unabhängig",
    "Row-Col-1": "Zeilen- und  Spaltenvariablen sind nicht unabhängig",
    "Enter any number of row": "(Füge den Wert aus der oberen licnken Zelle ein)",
    "Row": "Zeile",
    "Column": "Spalte",
    "Probability": "Wahrscheinlichkeit",
    "Show Probability": "Zeige Wahrscheinlichkeit an",
    "Regression Line": "Regressionsgerade",
    "Erase All": "alles löschen",
    "Add Point": "Füge einen Punkt hinzu",
    "Erase Point": "Punkt löschen",
    "Reference Site": "Referenzseite",
    "Lot Size": "Losgröße",
    "Defect Size": "Defektzahl",
    "Defect Rate": "Fehlerrate",
    "If typed": "Klicken Sie nach der Nummer auf [Ausführen] / [Eingeben]",
    "Stat/BoxPlot": "Statistik/BoxPlot",
    "Mean": "Mittelwert",
    "Std Dev": "Standardabweichung",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 grouppe)",
    "AnalysisVar": "Analyse Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Grouppe",
    "GroupVar2": "X Var",
    "GroupVar3": "Faktor1",
    "GroupVar4": "Faktor2",
    "AnalysisVarMu12": "Analyse(or X1) Var",
    "GroupVarMu12": "Grouppe(or X2) Var",
    "PairedMu12": " X1, X2 : gepaarte Daten",
    "SizeVar": "Größe Var",
    "RegressionBand": "Konfidenzband",
    "RegressionTable": "Regressionanalyse",
    "RegressionResidual": "Restwertdiagramm",
    "RegressionResidualLeverage": "Restwert vs Hebelwirkung",
    "RegressionCook": "Cook's Entfernungdiagramm",
    "RegressionQQ": "Restwert Q-Q-diagramm",
    "HistogramNormal": "Histogramm",
    "HistogramChisq": "Normal Test",
    "HistogramNormalQQ": "Normal-Q-Q-diagramm",
    "PopulationStd": "Grundgesamtheit Standardabweichung",
    "Type1Error": "Typ 1 Error",
    "Type2Error": "Typ 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mittleres Konfidenzintervall",
    "MultipleComparison": "Mehrfacher Vergleich",
    "ComparisonGraph": "Vergleichsgraph",
    "AnovaResidual": "Restwertdiagramm",
    "AnovaQQ": "Restwert Q-Q Diagramm",
    "TestingFit": "Anpassungsgüte Test",
    "FitTest0": "Beobachtete und theoretische Verteilungen sind gleich",
    "FitTest1": "Beobachtete und theoretische Verteilungen sind unterschiedlich",
    "ObservedFreq": "Beobachtete Häufigkeit O",
    "ExpectedProb": "Erwartete Wahrscheinlichkeit p",
    "ExpectedFreq": "Erwartete Häufigkeit E(>5)",
    "InputFitData": "Geben Sie die Zelle von der oberen linken Zelle ein",
    "ExecuteTable": "Statistiken",
    "MeanDotGraph": "Konfidenzintervall Graph",
    "ScatterRegression": "Streudiagramm",
    "Factor": "Faktor",
    "Interaction": "Interaktion",
    "NoInteraction": "Keine Interaktion",
    "ExistInteraction": "Interaction existiert",
    "eStatLecture": "eStat eVorlesung",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Rangsum Test",
    "Sample Range": "Rangsum",
    "DistributionTable": "Verteilungstabelle",
    "SignedRankTestDist": "Wilcoxon Signed Rangsumme Verteilung",
    "WilcoxonTestDist": "Wilcoxon Rangsumme Verteilung",
    "KruskalTestDist": "Kruskal-Wallis H Verteilung",
    "FriedmanTestDist": "Friedman S Verteilung",
    "SignedRankTest": "Signed Rangsummetest",
    "SignTest": "Zeichentest",
    "SignCount": "Anzahl der Zeichen",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test",
    "Block": "Block",
    "Treatment": "Behandlung",
    "At least one locations is different": "Mindestens ein Standortpaar ist unterschiedlich",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Annäherung Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Normal Annäherung Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rangsum Test,  n>25 Normal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;&#178; Annäherung test",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Auswahl : Click var name or use RHS selection box ",
    "VariableSelect3": "Variable Auswahl",
    "VariableSelect4": "Weitere Analysevariablen können ausgewählt werden",
    "VariableSelect5": "Weitere X variablen können ausgewählt werden",
    "SummaryData": "Zusammenfassungsdaten",
    "RawData": "Rohdaten",
    "MultiSelect": "",
    "DataType": "(Wählen Sie die Variable anhand des Variablennamens aus)",
    "by": "durch",
    "NameVar": "Name Var",
    "n_variance": "n-1 formel",
    "RandomNumber": "Zufallszahl",
    "RealNumber":     "Reelle Zahl",
    "IntegerNumber":  "Ganzzahl",
    "NumberData":     "Anzahl der Daten",
    "NumberDigit":    "Dezimalstelle",
    "NormalTable":    "Normal Distribution Table",
    "Percentile":     "Perzentil-Tabellee",
    "PercentileValue": "Perzentil",
    "StudentRangeDist": "HSD Bereichsverteilung",
    "copy link": "Link kopieren",
    "WithoutReplacement": "ohne Ersatz",
    "WithReplacement":    "Wiederherstellungs-Extraktion",
    "Replacement":     "Wiederherstellungs-Extraktion",
    "NonReplacement":  "ohne Ersatz",
    "WordCloud":       "Wortwolke (Englisch)",
    "oneColor":        "Farbe",
    "defaultColor":    "Standardfarbe",
    "RelativeFreq":    "Relative Frequenz",
    "Density":         "Dichte",
    "MarginOfError":   "Fehlermarge",
    "Permutation":     "Permutation",
    "PermutationSame": "Die gleiche Reihenfolge.",
    "Combination":     "Kombination",
    "NumberOfCase":    "Zahl der Fälle",
    "BinomialTheorem": "Zweistellige Logik",
    "PascalTriangle":  "Pascal-Dreieck",
    "Character":       "Emoji",
    "AdditionRule":      "Additionsregel der Wahrscheinlichkeit",
    "MultiplicationRule":"Multiplikationsregel der Wahrscheinlichkeit",
    "ConditionalProb":   "Bedingte Wahrscheinlichkeit",
    "JointProb":         "Gemeinsame Wahrscheinlichkeit",
    "DiscreteDist":      "Diskrete Verteilung",
    "Categorize":        "Kategorisieren",
    "Recode":            "Umcodieren",
    "Compute":           "Berechnen",
    "SelectIf":          "Wählen Sie wenn",
    "InfoValueLabel":    "*** Variable auswählen, Variablennamen und / oder Wertelabel eingeben.",
    "InfoSorting":       "*** Sortiervariable auswählen, Sortiermethode bis zu 3 Variablen eingeben.",
    "InfoCategorize":    "*** Variable für Kategorie auswählen, 'Intervallstart' und 'Intervallbreite' eingeben.",
    "InfoRecode":        "*** Variable für Recode auswählen, 'Neuer Wert' eingeben.",
    "InfoRecode2":       "* Aufzeichnung von bis zu 9 Werten zulassen.",
    "InfoCompute":       "*** Erstellen Sie eine Berechnungsformel mithilfe der Schaltflächen unten.",
    "InfoSelectIf":      "*** Wählen Sie bis zu 3 Variablen aus, geben Sie ihre Bedingungen ein.",
    "SortingVariable":   "Variablen sortieren",
    "SortingMethod":     "Sortiermethode",
    "NewVariable":       "Neue Variable",
    "CategoryVariable":  "Variable kategorisieren",
    "CategoryListCheck": "Kategorielistenprüfung",
    "CategoryInterval":  "Kategorie Intervall",
    "CategoryLabel":     "Kategorie-Label",
    "RecodeVariable":    "Variable umcodieren",
    "CurrentValue":      "Aktueller Wert",
    "NewValue":          "Neuer Wert",
    "ComputeFormula":    "Formel",
    "SelectVariable":    "Variable<br>für Auswählen",
    "RelationOperator":  "Beziehung<br>Betreiber",
    "SelectValue":       "Wert",
    "MissingValue":      "fehlender Wert",
    "option":            "Möglichkeit",                  
    "TimeSeries":        "Zeitfolgen",
    "Smoothing":         "Glättung",
    "Filtering":         "Filtern",
    "Transformation":    "Transformation",
    "Weight":            "Gewicht",
    "PercentChange":     "Prozent ändern",
    "WeightedIndex":     "Einfacher Index",
    "BaseTime":          "Basiszeit",
    "LagTime":           "Verzögerungszeit",
    "Lag":               "Zeitverzögerung",
    "Forecasting":       "Prognose",
    "SeasonalModel":     "Saisonmodell",
    "HoltWinter":        "Holt-Winters Saisonmodell",
    "Trend":             "Trend",
    "Seasonal":          "Saisonal",
    "Deseasonal":        "Saisonale Serie",
    "Nseason":           "Zeiten in der Saison",
    "Irregular":         "Irregulär",
    "TrendModel":        "Trendmodell auf Deseasonal",
    "RegressionModel":   "Regressionsmodell",
    "ForecastingPeriod": "Prognosezeitraum",
    "CreateTable":       "Datentabelle",
    "SaveTable":         "Tabelle speichern",
    "MA":                "Gleitender Durchschnitt",
    "EWMA":              "EWMA-Modell",
    "CenterMA":          "Zentrierter gleitender Durchschnitt",
    "MovingMedian":      "Zentrierter gleitender Median",
    "ES":                "Exponentielle Glättung",
    "Default":           "Standard",
    "Linear":            "Linear",
    "Quadratic":         "Quadratisch",
    "Cubic":             "kubisch",
    "SquareRoot":        "Quadratwurzel",
    "Log":               "Logarithmisch",
    "Exponent":          "Exponentiell",
    "Power":             "Leistung",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Einfacher gleitender Durchschnitt",
    "SingleES":          "Einzelne exponentielle Glättung",
    "DoubleMA":          "Doppelter gleitender Durchschnitt",
    "DoubleES":          "Doppelte exponentielle Glättung",
    "HoltLinear":        "Holt Exponentielle Glättung",
    "DeseasonIntercept": "Saisonales Abfangen",
    "DeseasonSlope":     "Nebensaison",
    "SeasonalIndex":     "Saisonindex",
    "Diff":              "Unterschied",
    "DiffTime":          "Diff-Zeit",
    "AR":                "Autoregressives Modell",
    "ResultTable":       "Regressionsergebnis",
    "ForecastTable":     "Prognosetabelle",
    "HoltLevel":         "Stufe",
    "HoltTrend":         "Trend",
    "AutoCorrTable":     "Autokorrelationstabelle",
    "DiffSeries":        "Unterschiedsserie",
    "RawSeries":         "Raw-Serie",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// German 
appStr[0][5] = "/estat/eStat/index.html";
appStr[1][5] = "/estat/eStatH/index.html";
appStr[2][5] = "/estat/eStatU/index.html";
appStr[3][5] = "/estat/eStatE/index_en.html";
appStr[4][5] = "/estat/eHelp/index_en.html";
appStr[5][5] = "index.html";
appStr[6][5] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][5] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][5] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][5] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][5] = "";
appStr[11][5] = "Large Population Country";
appStr[12][5] = "Life Expectancy (OECD)";
appStr[13][5] = "Population Pyramid (Korea)";
appStr[14][5] = "GNP per Capita (OECD)";
appStr[15][5] = "Top World Export Country";
appStr[16][5] = "Obesity % of Population";
appStr[17][5] = "Temperature of Major City";
appStr[18][5] = "Top CO2 Emission Country";
appStr[19][5] = "Alcohol Consume (OECD)";
appStr[20][5] = "Continuous Data Graph";
appStr[21][5] = "Length of Otter";
appStr[22][5] = "Age of Teacher";
appStr[23][5] = "Age of Teacher by Sex";
appStr[24][5] = "Cleanliness of Tooth";
appStr[25][5] = "Math Exam Scores";
appStr[26][5] = "Calorie of Hamberger";
appStr[27][5] = "Height vs Weight by Sex";
appStr[28][5] = "Discrete Data Graphs";
appStr[29][5] = "";
appStr[30][5] = "";
appStr[31][5] = "unit";
appStr[32][5] = "Country";
appStr[33][5] = "Male";
appStr[34][5] = "Female";
appStr[35][5] = "Age";
appStr[36][5] = "Person";
appStr[37][5] = "billion $";
appStr[38][5] = "Export";
appStr[39][5] = "Obesity %";
appStr[40][5] = "Celsius";
appStr[41][5] = "City";
appStr[42][5] = "Jan High";
appStr[43][5] = "Jul High";
appStr[44][5] = "million ton";
appStr[45][5] = "liter/year";
appStr[46][5] = "Alcohol";
alertMsg[1][5] = "Eine der ausgewählten Variablen enthält keine Daten.";
alertMsg[2][5] = "Wähle Variablen durch Ankliken für die  Analyse aus.  If two variables, first one is group variable. ";
alertMsg[3][5] = "Wähle Variablen durch Ankliken für die  Analyse aus.";
alertMsg[4][5] = "Falls die Werte der ausgewählten Variablen oder die Beobachtungen verschieden sind, ist keine Analyse möglich .";
alertMsg[5][5] = "Zu viele Gruppen! Grafiken können sich aufgrund der Bildschirmgröße überlappen.";
alertMsg[6][5] = "Falls die Analysis-Variable in den zusammengefassten Daten Charaktere einschliesst, ist Analyse, oder Tabelle nicht moeglich.";
alertMsg[7][5] = "Falls mehr als drei Variablen aus den Rohdaten ausgewählt sind.";
alertMsg[8][5] = "Ein dimensionales Streudiagramm ist  möglich, wenn die Anzahl der  Beobachtungen kleiner als 200 ist.";
alertMsg[9][5] = "Stamm-Blatt-Diagramm ist nicht möglich, wenn die Anzahl der Beobachtungen.";
alertMsg[10][5] = "Analysevariable ist nicht ausgewählt";
alertMsg[11][5] = "Analyse/gruppe variable ist nicht ausgewählt";
alertMsg[12][5] = "Falls die Analysis-Variable Charaktere einschliesst, ist Analyse, oder Tabelle nicht moeglich.";
alertMsg[13][5] = "";
alertMsg[14][5] = "Im Falle zusammengefasster Daten sind weder Dauerdiagramme noch Hypothesen Testen moeglich.";
alertMsg[16][5] = "Nur zwei Gruppen soind für diesen Hypothesentest zugelassen.";
alertMsg[17][5] = "Streudiagramm erfordert mindestens Variablen x und y.";
alertMsg[18][5] = "Mehr als drei Variablen sind nicht erlaubt.";
alertMsg[19][5] = "Wenn Daten ein Zeichen enthalten, kann keine Analyse durchgeführt werden. ";
alertMsg[20][5] = "Falls die Variable X/Y ein charakter, kann kein Regression gezeichnet werden. ";
alertMsg[21][5] = "Bei fehlenden Daten kann nicht gespeichert werden.";
alertMsg[22][5] = "Falls der Wert negativ ist, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[25][5] = "Falls es nur eine Gruppe gibt, kann kein gestapeltes Balkendiagramm gezeichnet werden.";
alertMsg[27][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[29][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[31][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[32][5] = "Falls Anzahl negativ ist, kann kein Kreisdiagramm gezeicnet werden.";
alertMsg[33][5] = "Falls der Wert negativ ist, kann kein Ringdiagramm gezeichnet werden.";
alertMsg[34][5] = "Falls der Wert negativ ist, kann kein Bandediagramm gezeichnet werden.";
alertMsg[35][5] = "Falls der Wert negativ ist, kann keine Häufigkeitstabelle angegeben werden.";
alertMsg[36][5] = "Dieses Balkendiagramm ist nur für zwei Gruppen erklärt.";
alertMsg[37][5] = "Diese Hypothese bezieht sich auf nur eine Variable.";
alertMsg[38][5] = "µ ist nicht-numerisch. Füge Zahlenwert ein und versuche erneut!";
alertMsg[39][5] = "Standardabweichung ist entweder Null oder  ";
alertMsg[40][5] = "Eingegebene Varianz ist nicht-numerisch. Gib Zahlenwert ein und versuche erneut!";
alertMsg[41][5] = "Diese Hypothese kann sich auf zwei Variablen beziehen. Gruppenvariable darf nur zwei Gruppen umfassen.";
alertMsg[42][5] = "Editieren der Bezeichnung der zu testenden Hypothesen ist nicht zulässig. ";
alertMsg[43][5] = "Einfache lineare Regression ist nur für eine Gruppe";
alertMsg[44][5] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][5] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][5] = "Die gleiche Variablennummer ist ausgewählt.";
alertMsg[47][5] = "Zeichendaten in Häufigkeit sind nicht zulässig !! Versuchen Sie es erneut.";
alertMsg[48][5] = "Zeichendaten sind nicht erlaubt !! Versuchen Sie es erneut.";
alertMsg[49][5] = "Anzahl der Beobachtungen sollte unter 100 liegen!! Versuchen Sie es erneut.";
alertMsg[50][5] = "Geben Sie Zahlen in Intervallstart oder -schritt ein.";
alertMsg[51][5] = "Zahlen eingeben / NZeilen sollten gleich sein!! Versuchen Sie es erneut.";
alertMsg[52][5] = "Geben Sie Zahlen in Kategorie und Häufigkeit ein.";
alertMsg[53][5] = "Intervallgröße ist nicht gleich !! Versuchen Sie es erneut.";
alertMsg[54][5] = "X-Beobachtung ist nicht gleich Y-Beobachtung !! Versuchen Sie es erneut.";
alertMsg[55][5] = "!!! Keine Daten auf dem Blatt.";
alertMsg[56][5] = "!!! Keine Variable ausgewählt";
alertMsg[57][5] = "!!! Intervallstart und Intervallbreite eingeben";
alertMsg[58][5] = "!!! Geben Sie den numerischen Intervallstart und die Intervallbreite ein";
alertMsg[59][5] = "!!! Mehr als 9 Intervalle - Intervallbreite ändern";
alertMsg[60][5] = "!!! Diese Variable hat mehr als 9 Werte";
alertMsg[61][5] = "!!! Kein Wert eingegeben";
alertMsg[62][5] = "!!! Formel eingeben";
alertMsg[63][5] = "!!! Keine Daten, die Bedingungen erfüllen.";
alertMsg[64][5] = "";
alertMsg[65][5] = ""; 
alertMsg[66][5] = "";
alertMsg[67][5] = "";
alertMsg[68][5] = "";
alertMsg[69][5] = "";

svgStr[1][5] = " Balkendiagramm";
svgStr[2][5] = " Kreisdiagramm";
svgStr[3][5] = " Doughnut Graph";
svgStr[4][5] = " Bandediagramm";
svgStr[5][5] = " Gerade";
svgStr[6][5] = " eindimensionales Streudiagramm";
svgStr[7][5] = " Boxdiagramm";
svgStr[8][5] = " Stamm-Blatt-Diagramm";
svgStr[9][5] = " Histogramm";
svgStr[10][5] = " Streudiagramm";
svgStr[11][5] = " Hypothesen testen : Grundgesamtheit Mittelwert";
svgStr[12][5] = " Hypothesen testen : Grundgesamtheit Varianz";
svgStr[13][5] = " Hypothesen testen : Zwei Grundgesamtheit Mittelwert";
svgStr[14][5] = " Hypothesen testen : Zwei Grundgesamtheit Varianz";
svgStr[15][5] = " Varianzanalyse";
svgStr[16][5] = "Häufigkeit";
svgStr[17][5] = "Verhältnis";
svgStr[18][5] = "Gruppe ";
svgStr[19][5] = " ";
svgStr[20][5] = "<h3>Summarischdatan<br>Häufigkeitstabelle</h3>";
svgStr[21][5] = "Variable gruppieren";
svgStr[22][5] = "Zeilenvariable";
svgStr[23][5] = "Total";
svgStr[24][5] = "CircleSize";
svgStr[25][5] = "<h3>Häufigkeitstabelle</h3>";
svgStr[26][5] = "Analyse Var";
svgStr[27][5] = "Variablenwert";
svgStr[28][5] = "Wertname";
svgStr[29][5] = "Häufigkeit";
svgStr[30][5] = "Relative Frequenz";
svgStr[31][5] = "<h3>Zweidimensionentabelle</h3>";
svgStr[32][5] = "Spaltenvariable";
svgStr[33][5] = "Zeilenvariable";
svgStr[34][5] = "Mittelwert"
svgStr[35][5] = "Standardabweichung"
svgStr[36][5] = "<h3> Histogramm<br>Häufigkeitstabelle</h3>";
svgStr[37][5] = "Gruppe benennen";
svgStr[38][5] = "Intervall";
svgStr[39][5] = "Stamm";
svgStr[40][5] = " Blatt";
svgStr[41][5] = "Gruppe 1  Blatt";
svgStr[42][5] = "Gruppe 2  Blatt"
svgStr[43][5] = "<h3>Basisstatistik</h3>";
svgStr[44][5] = "Beobachtung";
svgStr[45][5] = "Minimum";
svgStr[46][5] = "Median";
svgStr[47][5] = "Maximum";
svgStr[48][5] = "Total";
svgStr[49][5] = "<h3>Normal Test</h3>";
svgStr[50][5] = "*** E<sub>i</sub> > 5";
svgStr[51][5] = "&chi;&#178; Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][5] = "Daten<br>Observed Häufigkeit<br>(O<sub>i</sub>)";
svgStr[53][5] = "Normalverteilung<br>Expected Wahrscheinlichkeit<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][5] = "Normalverteilung<br>Expected Häufigkeit<br>(E<sub>i</sub>)";
svgStr[55][5] = "&chi;&#178; wert<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][5] = "Total &chi;&#178; wert";
svgStr[57][5] = "Wahrscheinlichkeit Histogramm, Normalverteilung";
svgStr[58][5] = "Normal Q-Q Diagramm";
svgStr[59][5] = "Normal Quantile";
svgStr[60][5] = "Korrelationskoeffizient";
svgStr[61][5] = "Determinationkoeffizient";
svgStr[62][5] = "Standardfehler";
svgStr[63][5] = "Variable";
svgStr[64][5] = "Variablenname";
svgStr[65][5] = "Unabhängigvariable";
svgStr[66][5] = "Abhängigvariable";
svgStr[67][5] = "Parameter";
svgStr[68][5] = "Estimated wert";
svgStr[69][5] = "wert";
svgStr[70][5] = "Abschneiden";
svgStr[71][5] = "Steigung";
svgStr[72][5] = "Faktor";
svgStr[73][5] = "Quadratsumme";
svgStr[74][5] = "Grad der Freiheit";
svgStr[75][5] = "Mittlere Quadrate";
svgStr[76][5] = "Regression";
svgStr[77][5] = "Fehler";
svgStr[78][5] = "Total";
svgStr[79][5] = "<h3>Regressionanalyse</h3>";
svgStr[80][5] = "Standardisiert Residual Q-Q Diagramm";
svgStr[81][5] = "Standardisiert Residual";
svgStr[82][5] = "Normal Quantil";
svgStr[83][5] = "Residual diagramm";
svgStr[84][5] = "Predicted wert";
svgStr[85][5] = "Zweiweg ANOVA";
svgStr[86][5] = "Konfidenzintervall Graph";
svgStr[87][5] = "Residual";
svgStr[88][5] = "Zweidimensionale Statistik";
svgStr[89][5] = "Streudiagramm-Matrix";
svgStr[90][5] = "Mehrfacher Vergleich";
svgStr[91][5] = "Statistiken";
svgStr[92][5] = "Faktor";
svgStr[93][5] = "Niveau";
svgStr[94][5] = "Gepaarte Beispieldatengrafik";
svgStr[95][5] = "Residual vs Prognoseplot";
svgStr[96][5] = "Residual vs Hebelwirkungplot";
svgStr[97][5] = "Cook's Entfernungdiagramm";
svgStr[98][5] = "Cook's Entfernung";
svgStr[99][5] = "Datenreihenfolge";
svgStr[100][5]= "Mittlere Differenz";
svgStr[101][5]= "Testmittel";
svgStr[102][5]= "Behandlung";
svgStr[103][5]= "Interaktion";
svgStr[104][5]= "Zeilensumme";
svgStr[105][5]= "Spalte Gesamt";
svgStr[106][5]= "Mehrfacher Korrelationskoeffizient";
svgStr[107][5]= "<h3>Korrelationsanalyse</h3>";
svgStr[108][5]= "Korrelationsmatrix";
svgStr[109][5]= "Faktor A - Faktor B Mittlerer Graph";
svgStr[110][5]= "Hebelwirkung";
svgStr[111][5]= "Geografisches Informationsdiagramm";
svgStr[112][5]= "Angebot";
svgStr[113][5]= "Mittelwert - Standardabweichung Diagramm";
svgStr[114][5]= "Grundgesamtheit Varianz";
svgStr[115][5]= "Hypothesen";
svgStr[116][5]= "test";
svgStr[117][5]= "Varianz";
svgStr[118][5]= "Intervallwert";
svgStr[119][5] = "Kategorie";
svgStr[120][5] = "Modus";
svgStr[121][5] = "Kovarianz";
svgStr[122][5] = "Pascal-Dreieck";
svgStr[123][5] = "Gemeinsame Wahrscheinlichkeit";
svgStr[124][5] = "Bedingt";
svgStr[125][5] = "Diskrete Verteilung";
svgStr[126][5] = "Reihe %";
svgStr[127][5] = "Säule %";
svgStr[128][5] = "Gesamt %";
svgStr[129][5] = "Balkendiagramm-Matrix";
svgStr[130][5] = "Prior Prob";
svgStr[131][5] = "Eigenwert";
svgStr[132][5] = "Eigenvektor";
svgStr[133][5] = "Multidimension-Häufigkeitstabelle";
svgStr[134][5] = "Hierarchisches Clusterdiagramm";
svgStr[135][5] = "Entfernung";
svgStr[136][5] = "Single";
svgStr[137][5] = "Abgeschlossen";
svgStr[138][5] = "Durchschnitt";
svgStr[139][5] = "Schwerpunkt";
svgStr[140][5] = "Ward";
svgStr[141][5] = "Verknüpfung";
svgStr[142][5] = "Number of Clusters <br>K";
svgStr[143][5] = "Bayes Information Criteria";
svgStr[144][5] = "Within Sum of Squares";
svgStr[145][5] = "Akaike Information Criteria";

svgStrU[1][5] = "Binomialverteilung";
svgStrU[2][5] = "Wiederholung";
svgStrU[3][5] = "Mittelwert";
svgStrU[4][5] = "Standardabweichung";
svgStrU[5][5] = "Poisson-Verteilung";
svgStrU[6][5] = "Geometrische Verteilung";
svgStrU[7][5] = "Hypergeometrische Verteilung ";
svgStrU[8][5] = "Grundgesamtheit";
svgStrU[9][5] = "Stichprobenverteilung";
svgStrU[10][5] = "Gesetz der Großen Zahlen";
svgStrU[11][5] = "Flanke";
svgStrU[12][5] = "Kopf";
svgStrU[13][5] = "Kopf einer Münze";
svgStrU[14][5] = "Anzahl Kopf";
svgStrU[15][5] = "Anzahl der Versuche";
svgStrU[16][5] = "Verteilung der Stichprobenmittelwerte";
svgStrU[17][5] = "Wiederholung";
svgStrU[18][5] = "Standardfehler";
svgStrU[19][5] = "Mittelwert der Grundgesamtheit";
svgStrU[20][5] = "Konfidenzintervall";
svgStrU[21][5] = "Schätzgenauigkeit";
svgStrU[22][5] = "Stichprobenmittelwert";
svgStrU[23][5] = "[TestStat]";
svgStrU[24][5] = "Verteilung";
svgStrU[25][5] = "lehne H\u2080 ab";
svgStrU[26][5] = "Akzeptiere H\u2080";
svgStrU[27][5] = "p-Wert";
svgStrU[28][5] = "[Entscheidung] ";
svgStrU[29][5] = "[ANOVA]";
svgStrU[30][5] = "Gib den Korrelationskoeffizienten ein und klicke auf den Button Ausführen";
svgStrU[31][5] = "Regression";
svgStrU[32][5] = "Zeilenvariable";
svgStrU[33][5] = "Spaltenvariable";
svgStrU[34][5] = "Mittelwert"
svgStrU[35][5] = "Standardabweichung"
svgStrU[36][5] = "<h3> Histogramm<br>Häufigkeitstabelle</h3>";
svgStrU[37][5] = "Gruppe benennen";
svgStrU[38][5] = "Intervall";
svgStrU[39][5] = "Stamm";
svgStrU[40][5] = " Blatt";
svgStrU[41][5] = "Gruppe 1 Blatt";
svgStrU[42][5] = "Gruppe 2 Blatt"
svgStrU[43][5] = "<h3>Basisstatistik</h3>";
svgStrU[44][5] = "Beobachtung";
svgStrU[45][5] = "Minimum";
svgStrU[46][5] = "Median";
svgStrU[47][5] = "Maximum";
svgStrU[48][5] = "Total";
svgStrU[49][5] = "Exponentail";
svgStrU[50][5] = "Gleichverteilung";
svgStrU[51][5] = "Schätzgenauigkeit";
svgStrU[52][5] = "- Erzeuge Punkt per Mausklick. eStat ermittelt dann die Regressiongerade.";
svgStrU[53][5] = "- Erzeuge Punkt per Mausklick. eStat ermittelt dann die Regressiongerade.";
svgStrU[54][5] = "[Stichprobenstatistik] ";
svgStrU[55][5] = "[Stichproben 1 statistik] ";
svgStrU[56][5] = "[Stichproben 2 statistik] ";
svgStrU[57][5] = "Konfidenzniveau";
svgStrU[58][5] = "Zeilen Spalten unabhängig";
svgStrU[59][5] = "Zeilen Spalten nicht unabhängig";
svgStrU[60][5] = "Beobachtete Verteilung";
svgStrU[61][5] = "Theoretische Verteilung";
svgStrU[62][5] = "Anpassungsgüte Test für beobachtete Häufigkeit";
svgStrU[63][5] = "Wilcoxon Rangsummetest";
svgStrU[64][5] = "Wilcoxon Rangsummetesttabelle";
svgStrU[65][5] = "Kruskal-Wallis Test";
svgStrU[66][5] = "Kruskal-Wallis H Distribution";
svgStrU[67][5] = "Kruskal-Wallis H Statistik";
svgStrU[68][5] = "Wilcoxon Vorzeichenhafter Rang Test";
svgStrU[69][5] = "Sign Test";
svgStrU[70][5] = "Friedman Test";
svgStrU[71][5] = "Friedman S Statistik";
svgStrU[72][5] = "Friedman S Distribution";
svgStrU[73][5] = "t-Wert (Z)";
svgStrU[74][5] = "ChiSq-Wert";
svgStrU[75][5] = "Stichprobenvarianz";
svgStrU[76][5] = "Unterschied der Stichprobe bedeutet";
svgStrU[77][5] = "Verhältnis der Stichprobenvarianz";
svgStrU[78][5] = "Annahme für die Varianz";
svgStrU[79][5] = "Zusammenfassungsdaten";
svgStrU[80][5] = "Mehrfachauswahl";
svgStrU[81][5] = "Wählen Sie bis zu zwei Gruppen";
svgStrU[82][5] = "X variable";
svgStrU[83][5] = "Y variable";
svgStrU[84][5] = "durch";
svgStrU[85][5] = "Keine Gruppenvariable";
svgStrU[86][5] = "Ausgewählte Daten: ";
svgStrU[87][5] = "Rohdaten";
svgStrU[88][5] = "Wählen Sie die Variable anhand des Variablennamens aus";
svgStrU[89][5] = "Fehlende Werte";
svgStrU[90][5] = "Rangesomme";
svgStrU[91][5] = "Längengrad";
svgStrU[92][5] = "Breite";
svgStrU[93][5] = "Mindestens ein Standortpaar ist unterschiedlich";
svgStrU[94][5] = "Wilcoxon Vorzeichenhafter Rang Distribution";
svgStrU[95][5] = "Gepaarte Variable";
svgStrU[96][5] = "Gepaarte Daten";
svgStrU[97][5] = "Hypothesen testen auf Unabhängigkeit";
svgStrU[98][5] = "Simulation";
svgStrU[99][5] = "Zufallszahl";
svgStrU[100][5] = "Normalverteilung";
svgStrU[101][5] = "t Verteilung";
svgStrU[102][5] = "&chi;&#178; Verteilung";
svgStrU[103][5] = "F Verteilung";
svgStrU[104][5] = "HSD Verteilung";
svgStrU[105][5] = "1. Quartil";
svgStrU[106][5] = "3. Quartil";
svgStrU[107][5] = "Interquartilsabstand";
svgStrU[108][5] = "Bestimmtheitsmaß";
svgStrU[109][5] = "Kumulierte relative Häufigkeit (%)";
svgStrU[110][5] = "Maximale Anzahl von Ganzzahlen der Gleichverteilung";
svgStrU[111][5] = "Bewegen Sie einen Punkt mit der Maus";
svgStrU[112][5] = "Wiederherstellungs-Extraktion";
svgStrU[113][5] = "ohne Ersatz"; 
svgStrU[114][5] = "Linen"; 
svgStrU[115][5] = "Prozentänderung";
svgStrU[116][5] = "Einfacher Index";
svgStrU[117][5] = "Zeitverzögerung";
svgStrU[118][5] = "Unterschied";
svgStrU[119][5] = "Autokorrelation";
svgStrU[120][5] = "Protokoll";
svgStrU[121][5] = "Quadratwurzel";
svgStrU[122][5] = "Box-Cox";
svgStrU[123][5] = "Basiszeit";
svgStrU[124][5] = "Zentrierter gleitender Durchschnitt";
svgStrU[125][5] = "Exponentielle Glättung";
svgStrU[126][5] = "Zentrierter beweglicher Median";
svgStrU[127][5] = "Modell";
svgStrU[128][5] = "Gleitender Durchschnitt";
svgStrU[129][5] = "Doppelter gleitender Durchschnitt";
svgStrU[130][5] = "Holt doppelte exponentielle Glättung";
svgStrU[131][5] = "Saisonaler Index";
svgStrU[132][5] = "Multiplikatives Saisonmodell von Holt-Winters";
svgStrU[133][5] = "Seasonal Series";
svgStrU[134][5] = "Block";
svgStrU[135][5] = "Clusteranalyse";
svgStrU[136][5] = "Cluster";
svgStrU[137][5] = "Entscheidungsbaum";
svgStrU[138][5] = "Bedingung der Entscheidungsregel";
svgStrU[139][5] = "Entscheidung";
svgStrU[140][5] = "Iteration";
svgStrU[141][5] = "Paralleldiagramm";
svgStrU[142][5] = "Klassifizierung";
svgStrU[143][5] = "Klassifizierungsfunktion";
svgStrU[144][5] = "Klassifizierungsergebnis";
svgStrU[145][5] = "Entscheidung";
svgStrU[146][5] = "Fehlklassifizierungsrate";
svgStrU[147][5] = "Zelle";
svgStrU[148][5] = "Trainingsdaten";
svgStrU[149][5] = "Daten testen";

// Spanish
$message.es = {
    "eStat : Stat Education SW": "eStat : Software para Educación Estadística",
    "Home": "Página de inicio",
    "Filename": "Archivo",
    "Selected Variables": "Var seleccionadas",
    "Cancel": "Cancelar",
    "Edit Variables": "Editar Variables",
    "Level": "Nivel",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Ejemplo",
    "New Sheets": "Nuevas hojas",
    "csv Open": "csv Abierto",
    "www Open": "www Abierto",
    "json Open": "json Abierto",
    "csv Save": "csv Grabar",
    "json Save": "json Grabar",
    "Print Sheet": "Imprimir hoja",
    "Bar Graph": "Diagrama de barras",
    "Pie Chart": "Diagrama de tarta",
    "Band Graph": "Gráfico de partes componentes",
    "Line": "Líneas",
    "Line Graph": "Gráfico de líneas",
    "Dot Graph": "Gráfico de puntos",
    "Histogram": "Histograma",
    "Stem & Leaf Plot": "Diagrama de Tallo y Hojas",
    "maxStem": "** número máximo de tallo <= 30 **",
    "Box-Whisker Plot": "Box-Whisker Plot",
    "Scatterplot": "Diagrama de dispersión",
    "ScatterplotMatrix": "Matriz de trazado de dispersión",
    "Frequency Table": "Tabla de frecuencias",
    "Basic Statistics": "Estadística básica",
    "Testing Hypothesis &mu;": "Prueba de hipótesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Prueba de hipótesis &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Prueba de hipótesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Prueba de hipótesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Análisis de Varianza",
    "MiddleSchool": "Escuela intermedia",
    "HighSchool":   "Escuela secundaria",
    "University":   "Universidad",
    "eStatHeading": "eStat es un software gratuito basado en web para una mejor educación estadística que utiliza visualización dinámica de datos y análisis estadístico gráfico.",
    "Support":      "Apoyo",
    "Donation":     "Donación",
    "Middle School Stat Education": "Educación estadística de la escuela secundaria",
    "High School Stat Education": "Educación Estadística de Bachillerato",
    "University Stat Education": "Educación Estadística Universitaria",
    "Elem Stat Graph Example": "Estadística Gráfico Ejemplo",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Vertical",
    "Horizontal": "Horizontal",
    "Vertical Separated Bar": "Barra vertical separada",
    "Vertical Stacked Bar": "Barra vertical apilada",
    "Vertical Ratio Bar": "Barra vertical de proporciones",
    "Vertical Side by Side Bar": "Barra vertical lateral",
    "Vertical Two Sided Bar": "Barra vertical bilateral",
    "Horizontal Separated Bar": "Barra horizontal separada",
    "Horizontal Stacked Bar": "Barra horizontal apilada",
    "Horizontal Ratio Bar": "Barra horizontal de proporciones",
    "Horizontal Side by Side Bar": "Barra horizontal lateral",
    "Horizontal Two Sided Bar": "Barra horizontal bilateral",
    "Doughnut Graph": "Gráfico de dónut",
    "Two Sided Stem & Leaf Plot": "Diagrama de Tallo y Hojas Bilateral",
    "Graph Save": "Grabar Gráfico",
    "Graph Print": "Imprimir Gráfico",
    "Move to Table": "Mover  a la Tabla",
    "Edit Title": "Editar titulo",
    "Table Save": "Grabar Tabla",
    "Table Print": "Imprimir Tabla",
    "Frequency": "Frecuencia",
    "Sorting": "Ordenar",
    "SortData": "Ordenar",
    "Raw Data": "Datos crudos",
    "Descending": "Descendiente",
    "Ascending": "Ascendiente",
    "Mean": "Media",
    "Std Deviation": "Desviación estándar",
    "MeanStd": "Media/Desviación estándar",
    "DotMeanStd": "Gráfico de puntos - Mean/StdDev",
    "95CI": "95% Nivel de confianza",
    "CorrelationAnalysis": "Análisis de correlación",
    "RegressionAnalysis": "Regresión Análisis",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Bidireccional ANOVA",
    "Regression": "Regresión",
    "Frequency Polygon": "Polígono de frecuencias",
    "Execute New Interval": "Ejecutar Nuevo Intervalo",
    "Interval Start": "Origen Intervalo",
    "Interval Width": "Ancho del Intervalo",
    "t-test": "Prueba t",
    "Z-test": "Prueba Z",
    "(if Z-test, enter &sigma;)": "(Si prueba Z entrar &sigma;)",
    "Significance Level": "Nivel de significación",
    "Execute": "Ejecutar",
    "(Confidence Interval)": "(Intervalo de confianza)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Si prueba Z  Z, &sigma)",
    "&chi;<sup>2</sup> test": "Prueba &chi;&#178;",
    "Variance Assumption": "Premisa sobre la varianza",
    "Variance": "Varianza",
    "F test": "Prueba F",
    "At least one pair of means is different": "Al menos un par de medias es diferente",
    "Main Title": "Titulo principal",
    "y title": "y titulo",
    "x title": "x titulo",
    "yAxis": "Y Eje",
    "Modify": "Modificar",
    "Confirm": "Confirmar",
    "Variable Name": "Nombre de la Variable",
    "Variable Value": "Valor de la Variable",
    "Value Label": "Valor de la etiqueta",
    "* Less than nine value labels allowed.": "* Menos de nueve etiquetas permitidas",
    "Save": "Grabar",
    "Exit": "Salir",
    "eStatU UnivStatEdu": "eStatU - Educación Estadística Universitaria SW",
    "eStatH HighStatEdu": "eStatH - Educación Estadística de Bachillerato SW",
    "eStatM MiddleStatEdu": "eStatM - elemental / Estadísticas de la escuela intermedia SW",
    "MiddleStat": "Estadísticas de la escuela intermedia",
    "HighStat":   "Estadísticas de la escuela secundaria",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menú",
    "Binomial Experiment": "Experimento Binomial",
    "Binomial Distribution": "Distribución Binomial",
    "Binomial Prob Table": "Tabla de Probabilidad Binomial",
    "Poisson Distribution": "Distribución Poisson",
    "Poisson Prob Table": "Tabla de Probabilidad Poisson",
    "Geometric Distribution": "Distribución Geométrica",
    "Geometric Prob Table": "Tabla de Probabilidad Geométrica",
    "HyperGeometric Distribution": "Distribución Hipergeométrica",
    "HyperGeometric Prob Table": "Tabla de Probabilidad Hipergeométrica",
    "Exponential Distribution": "Distribución Exponencial",
    "Normal Experiment": "Experimento Normal",
    "Normal Distribution": "Distribución Normal",
    "Normal Approx": "Aproximación Normal",
    "t Distribution": "Distribución t ",
    "ChiSquare Distribution": "Distribución &chi;&#178;",
    "F Distribution": "Distribución F",
    "Sampling": "Muestreo",
    "Population vs Sample": "Población vs Muestra",
    "Population": "Población",
    "Sample": "Muestra",
    "Exponential": "Exponencial(0.3)",
    "Uniform": "Uniforme(0,1)",
    "UniformDist": "Distribución Uniforme",
    "Sample05": "Muestreo 5%",
    "Sample10": "Muestreo 10%",
    "Sample20": "Muestreo 20%",
    "Statistics/BoxPlot": "Estadísticos/Diagrama de Box",
    "StatisticalProb":     "Probabilidad estadística",
    "Law of Large Number": "Ley de los Grandes Números",
    "Dist of Sample Means": "Distribución de Medias Muestrales",
    "Sampling Distribution": "Distribución muestral",
    "Sample Size": "Tamaño muestral",
    "Confidence Interval": "Nivel de confianza",
    "Confidence Interval Simulation": "Experimento Nivel de confianza",
    "Simulation": "Experimento",
    "Confidence Interval Mu": "Estimación : &mu;",
    "Mu Confidence Interval": "Estimación : &mu;",
    "Confidence Interval Sigma": "Estimación : &sigma;&#178; ",
    "Confidence Interval P": "Estimación : p",
    "Estimation Accuracy": "Precisión de la estimación",
    "Repetition": "Repetición",
    "Confidence Level": "Nivel de confianza",
    "Testing Hypothesis mu_titleAB": "Prueba de hipótesis media",
    "Testing Hypothesis mu_title": "Prueba de hipótesis media",
    "Testing Hypothesis sigma_title": "Prueba de hipótesis varianza",
    "Testing Hypothesis P_title": "Prueba de hipótesis proporción",
    "Testing Hypothesis mu12_title": "Prueba de hipótesis dos medias",
    "Testing Hypothesis sigma12_title": "Prueba de hipótesis dos varianza",
    "Testing Hypothesis P12_title": "Prueba de hipótesis dos proporción",
    "Testing Hypothesis muA":  "Prueba de hipótesis &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Prueba de hipótesis &mu; - C, n",
    "Testing Hypothesis mu": "Prueba de hipótesis &mu;",
    "Testing Hypothesis sigma": "Prueba de hipótesis &sigma;&#178;",
    "Testing Hypothesis P": "Prueba de hipótesis p",
    "Testing Hypothesis mu12": "Prueba de hipótesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Prueba de hipótesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Prueba de hipótesis p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Factor ANOVA",
    "Testing Hypothesis ANOVA2": "2 Factor ANOVA",
    "SameSampleSize": "El tamaño de la muestra de cada celda debe ser el mismo.",
    "Testing Independence": "Prueba de independencia",
    "CategoryD": "Categoria",
    "Category": "Categoría",
    "Correlation Coefficient": "Coeficiente de correlación",
    "Regression Experiment": "Experimento de Regresión",
    "Hypothesis": "Hipótesis",
    "Test Type": "Tipo de prueba",
    "Z-test": " Prueba Z",
    "t-test": " Prueba t",
    "Chi-test": "Prueba &chi;&#178;",
    "F-test": "Prueba F",
    "Sampling Type": "Tipo de muestreo",
    "Independent Sample": "independiente",
    "Paired Sample": "emparejado",
    "Sample Data": "Datos muestrales",
    "input either sample data": "Introducir datos muestrales o estadísticos muestrales en las siguientes cajas usando csv/bsv",
    "input data": "Introducir datos",
    "Sample Statistics": "Estadísticos muestrales",
    "Sample Mean": "Media muestral",
    "Sample Variance": "Varianza muestral",
    "Sample Proportion": "Proporción muestral",
    "sample range": "Rango de muestra",
    "control chart": "Tabla de control",
    "if Z-test-1": "(Si test Z entrar la varianza de la población &sigma;&#178;)",
    "if Z-test-2": "(Si test Z z<sub>&alpha;/2 </sub> )",
    "At least one pair": "Al menos un par de medias es diferente",
    "Row-Col-0": "La variables fila y columna son independientes",
    "Row-Col-1": "La variables fila y columna no  son independientes",
    "Enter any number of row": "(Entrar observación de la casilla superior izquierda)",
    "Row": "Fila",
    "Column": "Columna",
    "Probability": "Probabildad",
    "Show Probability": "Muestra probabildad",
    "Regression Line": "Recta de Regresión",
    "Erase All": "Borrar todo",
    "Add Point": "Añadir punto",
    "Erase Point": "Borrar punto",
    "Reference Site": "Enlace de referencia",
    "Lot Size": "Tamaño del lote",
    "Defect Size": "Tamaño del defecto",
    "Defect Rate": "tasa de defectos",
    "If typed": "Después de escribir el número, clic [Ejecutar] o [Entrar]",
    "Stat/BoxPlot": "Estadísticos/Diagrama de Box",
    "Mean": "Media",
    "Std Dev": "Desviación estándar",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 groupo)",
    "AnalysisVar": "Análisis Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Groupo",
    "GroupVar2": "X Var",
    "GroupVar3": "Factor1",
    "GroupVar4": "Factor2",
    "AnalysisVarMu12": "Análisis(o X1) Var",
    "GroupVarMu12": "Grupo(o X2) Var",
    "PairedMu12": " X1, X2 : Datos vinculados",
    "SizeVar": "tamaño del círculo Var",
    "RegressionBand": "Confianza Bandes",
    "RegressionTable": "Regresión Análisis",
    "RegressionResidual": "Residual Diagrama",
    "RegressionResidualLeverage": "Residual vs Apalancamiento",
    "RegressionCook": "Cook's Gráfico de distancia",
    "RegressionQQ": "Residual Q-Q Diagrama",
    "HistogramNormal": "Histograma",
    "HistogramChisq": "Normal Prueba",
    "HistogramNormalQQ": "Normal Q-Q Diagrama",
    "PopulationStd": "Población Desviación estándar",
    "Type1Error": "Tipo 1 Error",
    "Type2Error": "Tipo 2 Error",
    "AnovaTable": "ANOVA Tabla",
    "AnovaMeanGraph": "Intervalo de confianza promedio",
    "MultipleComparison": "Comparación múltiple",
    "ComparisonGraph": "Gráfico de comparación",
    "AnovaResidual": "Residual Trama",
    "AnovaQQ": "Residual Q-Q Trama",
    "TestingFit": "Prueba de bondad de ajuste",
    "FitTest0": "Distr. observadas y teóricas son las mismas",
    "FitTest1": "Distr. observadas y teóricas son diferentes",
    "ObservedFreq": "Frecuencia observada O",
    "ExpectedProb": "Probabilidad esperada p",
    "ExpectedFreq": "Frecuencia esperada E(>5)",
    "InputFitData": "Ingrese la celda de la celda superior izquierda",
    "ExecuteTable": "estadística",
    "MeanDotGraph": "Gráfico de intervalo de confianza",
    "ScatterRegression": "gráfico de dispersión",
    "Factor": "Factor",
    "Interaction": "Interacción",
    "NoInteraction": "Sin Interaction",
    "ExistInteraction": "Interacción existente",
    "eStatLecture": "eStat eConferencia",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "prueba de suma de rango",
    "Sample Range": "suma de rango",
    "DistributionTable": "Mesa de Distribución",
    "SignedRankTestDist": "Wilcoxon de suma de rango firmadao Distribución",
    "WilcoxonTestDist": "Wilcoxon de suma de rango Distribución",
    "KruskalTestDist": "Kruskal-Wallis H Distribución",
    "FriedmanTestDist": "Friedman S Distribución",
    "SignedRankTest": "prueba de suma de rango firmada",
    "SignTest": "El signo prueba",
    "SignCount": "Recuento de signos",
    "KruskalTest": "Kruskal-Wallis prueba",
    "KruskalTestANOVA": "Kruskal-Wallis prueba",
    "Total": "Total",
    "FriedmanTest": "Friedman prueba",
    "FriedmanTestANOVA": "Friedman prueba",
    "Block": "Bloquear",
    "Treatment": "Tratamiento",
    "At least one locations is different": "Al menos un par de ubicaciones es diferente",
    "SignCondition": "Si n ≤ 100 Binomial prueba,  n > 100 Normal prueba de aproximación",
    "WilcoxonSignCondition": "Si n≤ 20 Wilcoxon prueba de suma de rango,  n > 20 Normal prueba de aproximación",
    "WilcoxonRankCondition": "Si n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon prueba de suma de rango,  n>25 Normal prueba de aproximación",
    "KruskalCondition": "Si n≤ 10 H prueba de distribución,  no &chi;&#178; prueba de aproximación",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Selección de Variables : Click var name or use RHS selection box ",
    "VariableSelect3": "Selección de Variables",
    "VariableSelect4": "Se pueden seleccionar más variables de análisis",
    "VariableSelect5": "Se pueden seleccionar más variables X",
    "SummaryData": "Datos resumidos",
    "RawData": "Datos brutos",
    "MultiSelect": "",
    "DataType": "(Seleccione la variable haciendo clic en el nombre de la variable)",
    "by": "por",
    "NameVar": "Nombre Var",
    "n_variance": "n-1 fórmula",
    "RandomNumber": "Número aleatorio",
    "RealNumber":     "Número Real",
    "IntegerNumber":  "Número entero",
    "NumberData":     "Numero de datos",
    "NumberDigit":    "Dígito decimal",
    "NormalTable":    "Tabla de distribución normal",
    "Percentile":     "Tabla percentil",
    "PercentileValue": "Percentil",
    "StudentRangeDist": "HSD Distribución de rango",
    "copy link": "copiar link",
    "WithoutReplacement": "sin reemplazo",
    "WithReplacement":    "desmovilización",
    "Replacement":     "desmovilización",
    "NonReplacement":  "sin reemplazo",
    "WordCloud":       "Nube de palabras (inglés)",
    "oneColor":        "color",
    "defaultColor":    "color predeterminado",
    "RelativeFreq":    "Frecuencia relativa",
    "Density":         "Densidad",
    "MarginOfError":   "Margen de error",
    "Permutation":     "Permutación",
    "PermutationSame": "Permutación con lo mismo",
    "Combination":     "Combinación",
    "NumberOfCase":    "Numero de casos",
    "BinomialTheorem": "Teorema de la transposición",
    "PascalTriangle":  "Triángulo de Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Regla de probabilidad de la suma",
    "MultiplicationRule":"Regla de probabilidad de la multiplicación",
    "ConditionalProb":   "La probabilidad condicional",
    "JointProb":         "Probabilidad conjunta",
    "DiscreteDist":      "Distribución discreta",
    "Categorize":        "Clasificar por categorías",
    "Recode":            "Recodificar",
    "Compute":           "Calcular",
    "SelectIf":          "Seleccionar si",
    "InfoValueLabel":    "*** Seleccione la variable, ingrese el nombre de la variable y / o la etiqueta del valor.",
    "InfoSorting":       "*** Seleccione la variable de clasificación, ingrese el método de clasificación hasta 3 variables.",
    "InfoCategorize":    "*** Seleccione la variable para Categoría, ingrese 'Inicio del intervalo' y 'Ancho del intervalo'.",
    "InfoRecode":        "*** Seleccione la variable para Recodificar, ingrese 'Nuevo valor'.",
    "InfoRecode2":       "* Permitir grabar hasta 9 valores.",
    "InfoCompute":       "*** Cree fórmulas informáticas con los botones siguientes.",
    "InfoSelectIf":      "*** Seleccione hasta 3 variables, ingrese sus condiciones.",
    "SortingVariable":   "Clasificación de variables",
    "SortingMethod":     "Método de clasificación",
    "NewVariable":       "Nueva variable",
    "CategoryVariable":  "Categorizar variable",
    "CategoryListCheck": "Verificación de lista de categorías",
    "CategoryInterval":  "Intervalo de categoría",
    "CategoryLabel":     "Etiqueta de categoría",
    "RecodeVariable":    "Recodificar variable",
    "CurrentValue":      "Valor actual",
    "NewValue":          "Nuevo valor",
    "ComputeFormula":    "Fórmula",
    "SelectVariable":    "Variable <br> para seleccionar",
    "RelationOperator":  "Relación <br> operador",
    "SelectValue":       "Valor",
    "MissingValue":      "valor que falta",
    "option":            "opción",                                      
    "TimeSeries":        "Series de tiempo",
    "Smoothing":         "Suavizado",
    "Filtering":         "Filtración",
    "Transformation":    "Transformación",
    "Weight":            "Peso",
    "PercentChange":     "Cambiar porcentaje",
    "WeightedIndex":     "Índice simple",
    "BaseTime":          "Tiempo básico",
    "LagTime":           "Tiempo de retraso",
    "Lag":               "Lapso de tiempo",
    "Forecasting":       "Pronóstico",
    "SeasonalModel":     "Modelo de temporada",
    "HoltWinter":        "Modelo estacional de Holt-Winters",
    "Trend":             "Tendencia",
    "Seasonal":          "Estacional",
    "Deseasonal":        "Serie de temporada",
    "Nseason":           "Tiempos en temporada",
    "Irregular":         "Irregular",
    "TrendModel":        "Modelo de tendencia en desestacionalizado",
    "RegressionModel":   "Modelo de regresión",
    "ForecastingPeriod": "Período de previsión",
    "CreateTable":       "Tabla de datos",
    "SaveTable":         "Guardar tabla",
    "MA":                "Media móvil",
    "EWMA":              "Modelo EWMA",
    "CenterMA":          "Promedio móvil centrado",
    "MovingMedian":      "Mediana Móvil Centrada",
    "ES":                "Suavizado exponencial",
    "Default":           "Defecto",
    "Linear":            "Lineal",
    "Quadratic":         "Cuadrático",
    "Cubic":             "Cúbico",
    "SquareRoot":        "Raíz cuadrada",
    "Log":               "Logarítmico",
    "Exponent":          "Exponencial",
    "Power":             "Energía",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Promedio móvil único",
    "SingleES":          "Suavizado exponencial único",
    "DoubleMA":          "Promedio móvil doble",
    "DoubleES":          "Suavizado exponencial doble",
    "HoltLinear":        "Suavizado exponencial de Holt",
    "DeseasonIntercept": "Intercepción estacional",
    "DeseasonSlope":     "Pendiente estacional",
    "SeasonalIndex":     "Índice estacional",
    "Diff":              "Diferencia",
    "DiffTime":          "Tiempo de diferencia",
    "AR":                "Modelo autorregresivo",
    "ResultTable":       "Resultado de regresión",
    "ForecastTable":     "Tabla de pronóstico",
    "HoltLevel":         "Nivel",
    "HoltTrend":         "Tendencia",
    "AutoCorrTable":     "Tabla de autocorrelación",
    "DiffSeries":        "Serie de diferencias",
    "RawSeries":         "Serie cruda",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Spanish
appStr[0][6] = "/estat/eStat/index.html";
appStr[1][6] = "/estat/eStatH/index.html";
appStr[2][6] = "/estat/eStatU/index.html";
appStr[3][6] = "/estat/eStatE/index_en.html";
appStr[4][6] = "/estat/eHelp/index_en.html";
appStr[5][6] = "index.html";
appStr[6][6] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][6] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][6] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][6] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][6] = "";
appStr[11][6] = "Large Population Country";
appStr[12][6] = "Life Expectancy (OECD)";
appStr[13][6] = "Population Pyramid (Korea)";
appStr[14][6] = "GNP per Capita (OECD)";
appStr[15][6] = "Top World Export Country";
appStr[16][6] = "Obesity % of Population";
appStr[17][6] = "Temperature of Major City";
appStr[18][6] = "Top CO2 Emission Country";
appStr[19][6] = "Alcohol Consume (OECD)";
appStr[20][6] = "Continuous Data Graph";
appStr[21][6] = "Length of Otter";
appStr[22][6] = "Age of Teacher";
appStr[23][6] = "Age of Teacher by Sex";
appStr[24][6] = "Cleanliness of Tooth";
appStr[25][6] = "Math Exam Scores";
appStr[26][6] = "Calorie of Hamberger";
appStr[27][6] = "Height vs Weight by Sex";
appStr[28][6] = "Discrete Data Graphs";
appStr[29][6] = "";
appStr[30][6] = "";
appStr[31][6] = "unit";
appStr[32][6] = "Country";
appStr[33][6] = "Male";
appStr[34][6] = "Female";
appStr[35][6] = "Age";
appStr[36][6] = "Person";
appStr[37][6] = "billion $";
appStr[38][6] = "Export";
appStr[39][6] = "Obesity %";
appStr[40][6] = "Celsius";
appStr[41][6] = "City";
appStr[42][6] = "Jan High";
appStr[43][6] = "Jul High";
appStr[44][6] = "million ton";
appStr[45][6] = "liter/year";
appStr[46][6] = "Alcohol";
alertMsg[1][6] = "Una de las variables seleccionadas no contiene datos";
alertMsg[2][6] = "Seleccionar una a una las  variables para el análisis (clicando los nombres de las columnas). Si hay dos variables, la primera es la variable grupo";
alertMsg[3][6] = "Datos faltantes en la variable seleccionada";
alertMsg[4][6] = "Si observaciones de las variables seleccionadas son diferentes o las observaciones son diferentes el análisis no está permitido";
alertMsg[5][6] = "Demasiados grupos! Los gráficos pueden solaparse debido al tamaño de la pantalla";
alertMsg[6][6] = "No están permitidos análisis estadísticos o crear tablas si la variable de análisisen el resumen de datos incluye datos de tipo carácter";
alertMsg[7][6] = "Si más de tres variables son seleccionadas en el análsisi de datos crudo o crear una tabla no está permitido";
alertMsg[8][6] = "Gráfico de puntos permitido si el número de observaciones es menor que 200";
alertMsg[9][6] = "Se permite el Diagrama de Tallo y Hojas  si el número de observaciones es menor que 100";
alertMsg[10][6] = "Analysis variable is not selected.";
alertMsg[11][6] = "Analysis/Group variables are not selected.";
alertMsg[12][6] = "No están permitidos análisis o crear tablas si la variable de análisis incluye datos de tipo carácter";
alertMsg[13][6] = "";
alertMsg[14][6] = "No están permitidos los datos resumidos  para gráficos continuos y pruebas de hipótesis";
alertMsg[16][6] = "Solo dos grupos permitidos";
alertMsg[17][6] = "El diagrama de dispersión requiere al menos la variable x y la variable y";
alertMsg[18][6] = "No se permiten más de tres variables en el diagrama de dispersión";
alertMsg[19][6] = "Si hay un personaje en los datos, el análisis no se puede hacer";
alertMsg[20][6] = "No se permiten más de tres variables";
alertMsg[21][6] = "Si hay datos no observados grabar no está permitido";
alertMsg[22][6] = "Si hay un número negativo, no se puede dibujar un Diagrama de barras";
alertMsg[25][6] = "Si hay un solo grupo el diagrama de barras apilado no está permitido";
alertMsg[27][6] = "Si hay un solo grupo el diagrama de barras de proporciones no está permitido";
alertMsg[29][6] = "Si hay un solo grupo el diagrama de barras lateral no está permitido";
alertMsg[31][6] = "Si hay un solo grupo el diagrama de barras bilateral no está permitido";
alertMsg[32][6] = "Si hay un número negativo, no se puede dibujar un diagrama de tarta";
alertMsg[33][6] = "Si hay un número negativo, no se puede dibujar un diagrama de dónut";
alertMsg[34][6] = "Si hay un número negativo, no se puede dibujar un gráfico de partes componentes";
alertMsg[35][6] = "Si hay un número negativo, no se puede calcular una tabla de frecuencias";
alertMsg[36][6] = "Este diagrama de barras solo se permite para dos grupos";
alertMsg[37][6] = "Este prueba de hipótesis  solo se permite para una variable";
alertMsg[38][6] = "mu es NaN. Entrar valor y reintentar!";
alertMsg[39][6] = "Desviación estándar o bien es cero o NaN. Reintentalo!";
alertMsg[40][6] = "Varianza de entrada es NaN. Entrar valor y reintentar!";
alertMsg[41][6] = "Esta prueba de hipótesis solo es posible para dos variables. La variable grupo solo debe tenir dos grupos";
alertMsg[42][6] = "No se permite la edición del titulo de la prueba de hipótesis! ";
alertMsg[43][6] = "La regresión lineal simple es solo para un grupo";
alertMsg[44][6] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][6] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][6] = "Se selecciona el mismo número de variable.";
alertMsg[47][6] = "¡No se permiten datos de caracteres en Frecuencia! Inténtelo de nuevo.";
alertMsg[48][6] = "¡No se permiten datos de caracteres! Inténtelo de nuevo.";
alertMsg[49][6] = "¡¡El número de observaciones debe ser inferior a 100 !! Inténtelo de nuevo.";
alertMsg[50][6] = "Introduzca números en el inicio del intervalo o en el paso.";
alertMsg[51][6] = "¡Ingrese números / Nnúmero de filas debe ser el mismo! Vuelva a intentarlo.";
alertMsg[52][6] = "Ingrese números en categoría y frecuencia";
alertMsg[53][6] = "¡El tamaño del intervalo no es el mismo! Inténtelo de nuevo.";
alertMsg[54][6] = "¡La observación X no es igual a la observación Y! Inténtalo de nuevo.";
alertMsg[55][6] = "!!! No hay datos en la hoja.";
alertMsg[56][6] = "!!! Ninguna variable seleccionada";
alertMsg[57][6] = "!!! Ingrese el inicio del intervalo y el ancho del intervalo";
alertMsg[58][6] = "!!! Ingrese el inicio del intervalo numérico y el ancho del intervalo";
alertMsg[59][6] = "!!! Más de 9 intervalos - cambiar el ancho del intervalo";
alertMsg[60][6] = "!!! Esta variable tiene más de 9 valores";
alertMsg[61][6] = "!!! No se ha introducido ningún valor";
alertMsg[62][6] = "!!! Ingrese la fórmula";
alertMsg[63][6] = "!!! Ningún dato que cumpla las condiciones.";
alertMsg[64][6] = "";
alertMsg[65][6] = ""; 
alertMsg[66][6] = "";
alertMsg[67][6] = "";
alertMsg[68][6] = "";
alertMsg[69][6] = "";

svgStr[1][6] = " Diagrama de barras";
svgStr[2][6] = " Diagrama de tarta";
svgStr[3][6] = " Gráfico tipo dónut";
svgStr[4][6] = " Diagrama de bandas";
svgStr[5][6] = " Gráfico de líneas";
svgStr[6][6] = " Gráfico de puntos";
svgStr[7][6] = " Diagrama de Box-Whisker";
svgStr[8][6] = " Diagrama de Tallo y Hojas";
svgStr[9][6] = " Histograma";
svgStr[10][6] = " Diagrama de dispersión";
svgStr[11][6] = " Prueba de hipótesis: Media Poblacional";
svgStr[12][6] = " Prueba de hipótesis: Varianza Poblacional";
svgStr[13][6] = " Prueba de hipótesis: Dos Medias Poblacional";
svgStr[14][6] = " Prueba de hipótesis: Dos Varianzas Poblacional";
svgStr[15][6] = " Análisis de Varianza";
svgStr[16][6] = "Frecuencia";
svgStr[17][6] = "Proporción";
svgStr[18][6] = "Grupo ";
svgStr[19][6] = " ";
svgStr[20][6] = "<h3>Datos Resumidos<br>Tabla de frecuencias</h3>";
svgStr[21][6] = "Variable de Grupo";
svgStr[22][6] = "Variable Fila";
svgStr[23][6] = "Total";
svgStr[24][6] = "CircleSize";
svgStr[25][6] = "<h3>Tabla de frecuencias</h3>";
svgStr[26][6] = "Análisis Var";
svgStr[27][6] = "Valor de la Variable";
svgStr[28][6] = "Valor de la etiqueta";
svgStr[29][6] = "Frecuencia";
svgStr[30][6] = "Frecuencia relativa";
svgStr[31][6] = "<h3>Tabla cruzada</h3>";
svgStr[32][6] = "Variable columna";
svgStr[33][6] = "Variable fila";
svgStr[34][6] = "Media"
svgStr[35][6] = "Desviación estándar"
svgStr[36][6] = "<h3> Histograma<br>Tabla de frecuencias</h3>";
svgStr[37][6] = "Nombre del Grupo";
svgStr[38][6] = "Intervalo";
svgStr[39][6] = "Tallo";
svgStr[40][6] = " Hoja";
svgStr[41][6] = "Grupo 1  Hoja";
svgStr[42][6] = "Grupo 2  Hoja"
svgStr[43][6] = "<h3>Estadística básica</h3>";
svgStr[44][6] = "Observación";
svgStr[45][6] = "Mínimo";
svgStr[46][6] = "Mediana";
svgStr[47][6] = "Máximo";
svgStr[48][6] = "Total";
svgStr[49][6] = "<h3>Normal prueba</h3>";
svgStr[50][6] = "*** E<sub>i</sub> > 5";
svgStr[51][6] = "&chi;&#178; prueba<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][6] = "Data<br>Observed Frecuencias<br>(O<sub>i</sub>)";
svgStr[53][6] = "Normal Distribución<br>Expected Probabilidad<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][6] = "Normal Distribución<br>Expected Frecuencias<br>(E<sub>i</sub>)";
svgStr[55][6] = "&chi;&#178; valor<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][6] = "Total &chi;&#178; valor";
svgStr[57][6] = "Probabilidad Hitograma, Normal Distribución";
svgStr[58][6] = "Normal Q-Q Diagrama";
svgStr[59][6] = "Normal Quantile";
svgStr[60][6] = "Coeficiente de correlación";
svgStr[61][6] = "Coeficiente of Determination";
svgStr[62][6] = "Error estándar";
svgStr[63][6] = "Variable";
svgStr[64][6] = "Nombre de la Variable";
svgStr[65][6] = "Independientes Variable";
svgStr[66][6] = "Dependientes Variable";
svgStr[67][6] = "Parameter";
svgStr[68][6] = "Estimated valor";
svgStr[69][6] = "valor";
svgStr[70][6] = "Interceptar";
svgStr[71][6] = "cuesta abajo";
svgStr[72][6] = "Factor";
svgStr[73][6] = "suma de cuadrados";
svgStr[74][6] = "grado de libertad";
svgStr[75][6] = "cuadrados medios";
svgStr[76][6] = "Regresión";
svgStr[77][6] = "Error";
svgStr[78][6] = "Total";
svgStr[79][6] = "<h3>Regresión Análisis</h3>";
svgStr[80][6] = "estandarizado Residual Q-Q Diagrama";
svgStr[81][6] = "estandarizado Residual";
svgStr[82][6] = "Normal cuantil";
svgStr[83][6] = "Residual Diagrama";
svgStr[84][6] = "Predicted valor";
svgStr[85][6] = "bidireccional ANOVA";
svgStr[86][6] = "Gráfico de intervalo de confianza";
svgStr[87][6] = "Residual";
svgStr[88][6] = "dos dimensiones estadísticas";
svgStr[89][6] = "Matriz de trazado de dispersión";
svgStr[90][6] = "Comparación múltiple";
svgStr[91][6] = "estadística";
svgStr[92][6] = "Factor";
svgStr[93][6] = "Nivel";
svgStr[94][6] = "Gráfico de datos de muestra apareados";
svgStr[95][6] = "Residual vs Predicción Parcela";
svgStr[96][6] = "Residual vs Parcela de apalancamiento";
svgStr[97][6] = "Cook's Distancia el gráfico";
svgStr[98][6] = "Cook's Distancia";
svgStr[99][6] = "orden de datos";
svgStr[100][6]= "Diferencia significativa";
svgStr[101][6]= "Medios de prueba";
svgStr[102][6]= "Tratamiento";
svgStr[103][6]= "Interacción";
svgStr[104][6]= "Total de la fila";
svgStr[105][6]= "Columna total";
svgStr[106][6]= "Correlación múltiple Coeff";
svgStr[107][6]= "<h3>Correlation Analysis</h3>";
svgStr[108][6]= "Análisis de correlación";
svgStr[109][6]= "Factor A - Factor B Gráfico medio";
svgStr[110][6]= "apalancamiento";
svgStr[111][6]= "Gráfico de información geográfica";
svgStr[112][6]= "Distancia";
svgStr[113][6]= "Media - Desviación estándar Grafico";
svgStr[114][6]= "Varianza Poblacional";
svgStr[115][6]= "hipótesis";
svgStr[116][6]= "prueba";
svgStr[117][6]= "Varianza";
svgStr[118][6]= "Valor de intervalo";
svgStr[119][6]= "Categoria";
svgStr[120][6] = "Modo";
svgStr[121][6] = "Covarianza";
svgStr[122][6] = "Triángulo de Pascal";
svgStr[123][6] = "Probabilidad conjunta";
svgStr[124][6] = "Condicional";
svgStr[125][6] = "Distribución discreta";
svgStr[126][6] = "hilera %";
svgStr[127][6] = "columna %";
svgStr[128][6] = "total %";
svgStr[129][6] = "Matriz de gráfico de barras";
svgStr[130][6] = "Problema anterior";
svgStr[131][6] = "Valor propio";
svgStr[132][6] = "Vector propio";
svgStr[133][6] = "Tabla de frecuencias multidimensionales";
svgStr[134][6] = "Gráfico de conglomerados jerárquicos";
svgStr[135][6] = "Distancia";
svgStr[136][6] = "Único";
svgStr[137][6] = "Completo";
svgStr[138][6] = "Promedio";
svgStr[139][6] = "Centroide";
svgStr[140][6] = "Pupilo";
svgStr[141][6] = "Vinculación";
svgStr[142][6] = "Number of Clusters <br>K";
svgStr[143][6] = "Bayes Information Criteria";
svgStr[144][6] = "Within Sum of Squares";
svgStr[145][6] = "Akaike Information Criteria";

svgStrU[1][6] = "Distribución Binomial";
svgStrU[2][6] = "Repetición";
svgStrU[3][6] = "Media";
svgStrU[4][6] = "Desviación estándar";
svgStrU[5][6] = "Distribución Poisson";
svgStrU[6][6] = "Distribución Geométrica";
svgStrU[7][6] = "Distribución Hipergeométrica";
svgStrU[8][6] = "Población";
svgStrU[9][6] = "Distribución muestral";
svgStrU[10][6] = "Ley de los Grandes Números";
svgStrU[11][6] = "Cruz";
svgStrU[12][6] = "Cara";
svgStrU[13][6] = "Cara";
svgStrU[14][6] = "Número de caras";
svgStrU[15][6] = "Número de ensayos";
svgStrU[16][6] = "Distribución de Medias Muestrales";
svgStrU[17][6] = "Repetición";
svgStrU[18][6] = "Error estándar";
svgStrU[19][6] = "Media Poblacional";
svgStrU[20][6] = "Intervalo de confianza";
svgStrU[21][6] = "Precisión de la estimación";
svgStrU[22][6] = "Media muestral";
svgStrU[23][6] = "[Prueba Estadísticos]";
svgStrU[24][6] = "Distribución";
svgStrU[25][6] = "Rechazar H\u2080";
svgStrU[26][6] = "Aceptar H\u2080";
svgStrU[27][6] = "p-valor";
svgStrU[28][6] = "[Decisión] ";
svgStrU[29][6] = "[ANOVA]";
svgStrU[30][6] = "Entrar el coeficiente de correlación y clicar el botón ejecutar";
svgStrU[31][6] = "Regresión";
svgStrU[32][6] = "Variable Fila";
svgStrU[33][6] = "Variable columna";
svgStrU[34][6] = "Media"
svgStrU[35][6] = "Desviación estándar"
svgStrU[36][6] = "<h3> Histograma<br>Tabla de frecuencias</h3>";
svgStrU[37][6] = "Nombre del Grupo";
svgStrU[38][6] = "Intervalo";
svgStrU[39][6] = "Tallo";
svgStrU[40][6] = " Hoja";
svgStrU[41][6] = "Grupo 1  Hoja";
svgStrU[42][6] = "Grupo 2  Hoja";
svgStrU[43][6] = "<h3>Estadística básica</h3>";
svgStrU[44][6] = "Observación";
svgStrU[45][6] = "Mínimo";
svgStrU[46][6] = "Mediana";
svgStrU[47][6] = "Máximo";
svgStrU[48][6] = "Total";
svgStrU[49][6] = "Exponencial";
svgStrU[50][6] = "Uniforme";
svgStrU[51][6] = "Precisión de la estimación";
svgStrU[52][6] = "- Crear puntos clicándolos y eStat encuentra una recta de regresión";
svgStrU[53][6] = "- Mover o borrar un punto. Observar cambio en la recta de regresión";
svgStrU[54][6] = "[Estadísticos muestrales] ";
svgStrU[55][6] = "[Estadísticos muestrales 1] ";
svgStrU[56][6] = "[Estadísticos muestrales 2] ";
svgStrU[57][6] = "Nivel de confianza";
svgStrU[58][6] = "Fila y columna independientes";
svgStrU[59][6] = "Fila y columna no independientes";
svgStrU[60][6] = "Distribución observada";
svgStrU[61][6] = "Distribución Teórica";
svgStrU[62][6] = "Prueba de bondad de ajuste para la frecuencia observada";
svgStrU[63][6] = "Wilcoxon Prueba de suma de rango";
svgStrU[64][6] = "Wilcoxon Tabla de prueba de suma de rango";
svgStrU[65][6] = "Kruskal-Wallis Prueba";
svgStrU[66][6] = "Kruskal-Wallis H Distribución";
svgStrU[67][6] = "Kruskal-Wallis H Estadística ";
svgStrU[68][6] = "Wilcoxon Prueba de Rango Firmado";
svgStrU[69][6] = "Prueba firmada";
svgStrU[70][6] = "Friedman Prueba";
svgStrU[71][6] = "Friedman S Estadística ";
svgStrU[72][6] = "Friedman S Distribución";
svgStrU[73][6] = "t-valor (Z)";
svgStrU[74][6] = "ChiSq-valor";
svgStrU[75][6] = "Varianza de la muestra";
svgStrU[76][6] = "Diferencia de la muestra significa";
svgStrU[77][6] = "Relación de la varianza de la muestra";
svgStrU[78][6] = "Premisa sobre la varianza";
svgStrU[79][6] = "Datos resumidos";
svgStrU[80][6] = "selección múltiple";
svgStrU[81][6] = "Seleccione hasta dos grupos";
svgStrU[82][6] = "Var X";
svgStrU[83][6] = "Var Y";
svgStrU[84][6] = "por";
svgStrU[85][6] = "Sin grupo variable";
svgStrU[86][6] = "Datos seleccionados: ";
svgStrU[87][6] = "Datos brutos";
svgStrU[88][6] = "Seleccione la variable haciendo clic en el nombre de la variable";
svgStrU[89][6] = "Valores faltantes";
svgStrU[90][6] = "Suma de Rango";
svgStrU[91][6] = "Longitud";
svgStrU[92][6] = "Latitud";
svgStrU[93][6] = "Al menos un par de ubicaciones es diferente";
svgStrU[94][6] = "Wilcoxon Distribución de Rango Firmado";
svgStrU[95][6] = "Variable emparejada";
svgStrU[96][6] = "Datos emparejada";
svgStrU[97][6] = "Prueba de independencia";
svgStrU[98][6] = "Simulación";
svgStrU[99][6] = "Número aleatorio";
svgStrU[100][6] = "Distribución normal";
svgStrU[101][6] = "Distribución t";
svgStrU[102][6] = "Distribución &chi;&#178;";
svgStrU[103][6] = "Distribución F";
svgStrU[104][6] = "Distribución HSD";
svgStrU[105][6] = "1er cuartil";
svgStrU[106][6] = "3er cuartil";
svgStrU[107][6] = "Gama intercuartil";
svgStrU[108][6] = "Coeficiente de determinación";
svgStrU[109][6] = "Frecuencia relativa acumulada (%)";
svgStrU[110][6] = "Número máximo de enteros de distribución uniforme";
svgStrU[111][6] = "Mueve un punto con el mouse";
svgStrU[112][6] = "desmovilización";
svgStrU[113][6] = "sin reemplazo"; 
svgStrU[114][6] = "Líneas"; 
svgStrU[115][6] = "Cambio porcentual";
svgStrU[116][6] = "Índice simple";
svgStrU[117][6] = "Lapso de tiempo";
svgStrU[118][6] = "Diferencia";
svgStrU[119][6] = "Autocorrelación";
svgStrU[120][6] = "Registro";
svgStrU[121][6] = "Raíz cuadrada";
svgStrU[122][6] = "Box-Cox";
svgStrU[123][6] = "Hora base";
svgStrU[124][6] = "Promedio móvil centrado";
svgStrU[125][6] = "Suavizado exponencial";
svgStrU[126][6] = "Mediana móvil centrada";
svgStrU[127][6] = "Modelo";
svgStrU[128][6] = "Promedio móvil";
svgStrU[129][6] = "Promedio móvil doble";
svgStrU[130][6] = "Suavizado exponencial doble Holt";
svgStrU[131][6] = "Índice estacional";
svgStrU[132][6] = "Modelo estacional multiplicativo de Holt-Winters";
svgStrU[133][6] = "Serie estacional";
svgStrU[134][6] = "Bloquear";
svgStrU[135][6] = "Análisis de conglomerados";
svgStrU[136][6] = "Clúster";
svgStrU[137][6] = "Árbol de decisión";
svgStrU[138][6] = "Condición de regla de decisión";
svgStrU[139][6] = "Decisión";
svgStrU[140][6] = "Iteración";
svgStrU[141][6] = "Gráfico paralelo";
svgStrU[142][6] = "Clasificación";
svgStrU[143][6] = "Función de clasificación";
svgStrU[144][6] = "Resultado de la clasificación";
svgStrU[145][6] = "Decisión";
svgStrU[146][6] = "Tasa de clasificación errónea";
svgStrU[147][6] = "Celda";
svgStrU[148][6] = "Datos de entrenamiento";
svgStrU[149][6] = "Datos de prueba";

// Vietnamese
$message.vi = {
    "eStat : Stat Education SW": "eStat : Phần mềm thống kê giáo dục",
    "Home": "Trang chủ",
    "Filename": "Tên tệp",
    "Selected Variables": "Biến đã chọn",
    "Cancel": "Thoát",
    "Edit Variables": "Sửa biến",
    "Level": "Level",
    "ElementaryLevel": "Cơ bản",
    "MiddleLevel": "Trung cấp",
    "HighLevel": "Cao Cấp",
    "UniversityLevel": "Đại học",
    "Example": "Ví dụ",
    "New Sheets": "Tạo bảng mới",
    "csv Open": "Mở csv",
    "www Open": "Mở www",
    "json Open": "Mở json",
    "csv Save": "Lưu csv",
    "json Save": "Lưu json",
    "Print Sheet": "In bảng",
    "Bar Graph": "Biểu đồ cột",
    "Pie Chart": "Biểu đồ tròn",
    "Band Graph": "Biểu đồ thanh",
    "Line": "đường",
    "Line Graph": "Biểu đồ đường",
    "Dot Graph": "Biểu đồ điểm ",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Đồ thị Stem-Leaf",
    "maxStem": "** số lượng thân cây tối đa <= 30 **",
    "Box-Whisker Plot": "Biểu đồ Box-Whisker",
    "Scatterplot": "Biểu đồ phân tán",
    "ScatterplotMatrix": "Ma trận đồ thị phân tán",
    "Frequency Table": "Bảng tần số",
    "Basic Statistics": "Thống kê cơ bản",
    "Testing Hypothesis &mu;": "Kiểm định giả thuyết &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Kiểm định giả thuyết &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Kiểm định giả thuyết &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Kiểm định giả thuyết &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Phân tích ANOVA",
    "MiddleSchool": "Trường trung học cơ sở",
    "HighSchool":   "Trung học phổ thông",
    "University":   "Trường đại học",
    "eStatHeading": "eStat là phần mềm miễn phí dựa trên web để Giáo dục Thống kê tốt hơn bằng cách sử dụng trực quan hóa dữ liệu động và phân tích thống kê đồ họa.",
    "Support":      "Ủng hộ",
    "Donation":     "Quyên góp",
    "Middle School Stat Education": "Giáo dục thống kê trung học cơ sở",
    "High School Stat Education": "Thống kê trung học",
    "University Stat Education": "Thống kê Đại học",
    "Elem Stat Graph Example": "biểu đồ Ví dụ",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "theo chiều dọc",
    "Horizontal": "Theo chiều ngang",
    "Vertical Separated Bar": "Biểu đồ cột dọc (phân tách)",
    "Vertical Stacked Bar": "Biểu đồ cột dọc (chồng)",
    "Vertical Ratio Bar": "Thanh tỉ số dọc",
    "Vertical Side by Side Bar": "Biểu đồ cột ghép",
    "Vertical Two Sided Bar": "Biểu đồ cột hai bên",
    "Horizontal Separated Bar": "Biểu đồ cột ngang (phân tách)",
    "Horizontal Stacked Bar": "Biểu đồ cột ngang (chồng)",
    "Horizontal Ratio Bar": "Thanh tỉ số ngang",
    "Horizontal Side by Side Bar": "Biểu đồ cột ghép (ngang)",
    "Horizontal Two Sided Bar": "Biểu đồ cột ghép hai bên (ngang)",
    "Doughnut Graph": "Biểu đồ doughnut",
    "Two Sided Stem & Leaf Plot": "Biểu đồ Stem-Leaf kép",
    "Graph Save": "Lưu biểu đồ",
    "Graph Print": "In biểu đồ",
    "Move to Table": "Chuyển đến bảng",
    "Edit Title": "Sửa tiêu đề",
    "Table Save": "Lưu bảng",
    "Table Print": "In bảng",
    "Frequency": "Tần số",
    "Sorting": "Sắp xếp",
    "SortData": "Sắp xếp",
    "Raw Data": "Dữ liệu thô",
    "Descending": "S/x giảm dần",
    "Ascending": "S/x tăng dần",
    "Mean": "Trung bình",
    "Std Deviation": "Độ lệch chuẩn",
    "Regression": "Hồi quy",
    "MeanStd": "Trung bình/Độ lệch chuẩn",
    "DotMeanStd": "Biểu đồ điểm - Trung bình/Độ lệch chuẩn",
    "95CI": "Khoảng tin cậy 95%",
    "CorrelationAnalysis": "Phân tích tương quan",
    "RegressionAnalysis": "Phân tích hồi quy",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "ANOVA 2",
    "Frequency Polygon": "Miền tần số",
    "Execute New Interval": "Thực thi khoảng mới",
    "Interval Start": "Đầu khoảng",
    "Interval Width": "Độ rộng khoảng",
    "t-test": "Kiểm định t",
    "Z-test": "Kiểm định Z",
    "(if Z-test, enter &sigma;)": "(Nếu kiểm định Z, hãy nhập &sigma;)",
    "Significance Level": "Mức ý nghĩa",
    "Execute": "Thực thi",
    "(Confidence Interval)": "(Khoảng tin cậy)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Nếu kiểm định Z, Z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "Kiểm định &chi;&#178;",
    "Variance Assumption": "Giả thiết về phương sai",
    "Variance": "phương sai",
    "F test": "Kiểm định F",
    "At least one pair of means is different": "Có ít nhất một cặp trung bình khác nhau",
    "Main Title": "Tiêu đề chính",
    "y title": "Tên y",
    "x title": "Tên x",
    "yAxis": "Y trục",
    "Modify": "Chỉnh sửa",
    "Confirm": "Xác nhận",
    "Variable Name": "Tên biến",
    "Variable Value": "Giá trị biến",
    "Value Label": "Nhãn giá trị",
    "* Less than nine value labels allowed.": "* Chỉ cho phép ít hơn 9 nhãn giá trị.",
    "Save": "Lưu",
    "Exit": "Thoát",
    "eStatU UnivStatEdu": "eStatU - T/kê Đại học",
    "eStatH HighStatEdu": "eStatH - T/kê Trung học",
    "eStatM MiddleStatEdu": "eStatM - tiểu học / Trường trung học thống kê SW",
    "MiddleStat": "Trường trung học thống kê",
    "HighStat":   "thống kê trường trung học",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menu",
    "Binomial Experiment": "Thí nghiệm nhị thức",
    "Binomial Distribution": "Phân phối nhị thức",
    "Binomial Prob Table": "Xác suất nhị thức",
    "Poisson Distribution": "Phân phối Poisson",
    "Poisson Prob Table": "Xác suất Poisson",
    "Geometric Distribution": "Phân phối hình học",
    "Geometric Prob Table": "Xác suất p/p hình học",
    "HyperGeometric Distribution": "Phân phối siêu hình học",
    "HyperGeometric Prob Table": "Xác suất p/p Siêu hình học",
    "Exponential Distribution": "Phân phối mũ",
    "Normal Experiment": "Thí nghiệm p/p chuẩn",
    "Normal Distribution": "Phân phối chuẩn",
    "Normal Approx": "Xấp xỉ chuẩn",
    "t Distribution": "Phân phối t",
    "ChiSquare Distribution": "Phân phối &chi;&#178;",
    "F Distribution": "Phân phối F",
    "Sampling": "Lấy mẫu",
    "Population vs Sample": "Tổng thể vs mẫu",
    "Population": "Tổng thể",
    "Sample": "mẫu",
    "Exponential": "Thí nghiệm p/p chuẩn(0.3)",
    "Uniform": "P/p Đều(0,1)",
    "UniformDist": "P/p Đều",
    "Sample05": "Lấy mẫu 5%",
    "Sample10": "Lấy mẫu 10%",
    "Sample20": "Lấy mẫu 20%",
    "Statistics/BoxPlot": "Thống kê/Biểu đồ Box",
    "StatisticalProb":     "Xác suất thống kê",
    "Law of Large Number": "Luật số lớn",
    "Dist of Sample Means": "P/p của trung bình mẫu",
    "Sampling Distribution": "Phân phối lấy mẫu",
    "Sample Size": "Cỡ mẫu",
    "Confidence Interval": "Khoảng tin cậy",
    "Confidence Interval Simulation": "Thí Khoảng tin cậy",
    "Simulation": "Thi",
    "Confidence Interval Mu": "Ước lượng : &mu;",
    "Mu Confidence Interval": "Ước lượng : &mu;",
    "Confidence Interval Sigma": "Ước lượng : &sigma;&#178; ",
    "Confidence Interval P": "Ước lượng : p",
    "Estimation Accuracy": "Độ chính xác của ước lượng",
    "Repetition": "Sự lặp lại",
    "Confidence Level": "Độ tin cậy",
    "Testing Hypothesis mu_titleAB": "Kiểm định Trung bình",
    "Testing Hypothesis mu_title": "Kiểm định Trung bình",
    "Testing Hypothesis sigma_title": "Kiểm định Phương sai",
    "Testing Hypothesis P_title": "Kiểm định Tỉ lệ ",
    "Testing Hypothesis mu12_title": "Kiểm định Trung bình hai tổng thể",
    "Testing Hypothesis sigma12_title": "Kiểm định Phương sai hai tổng thể",
    "Testing Hypothesis P12_title": "Kiểm định p1, p2",
    "Testing Hypothesis muA":  "Kiểm định giả thuyết &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Kiểm định giả thuyết &mu; - C, n",
    "Testing Hypothesis mu": "Kiểm định giả thuyết &mu;",
    "Testing Hypothesis sigma": "Kiểm định giả thuyết &sigma;&#178;",
    "Testing Hypothesis P": "Kiểm định p",
    "Testing Hypothesis mu12": "Kiểm định giả thuyết &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Kiểm định giả thuyết &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Kiểm định giả thuyết p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Hệ số ANOVA",
    "Testing Hypothesis ANOVA2": "2 Hệ số ANOVA",
    "SameSampleSize": "Kích thước mẫu của mỗi ô phải giống nhau.",
    "Testing Independence": "Kiểm định độc lập",
    "CategoryD": "thể loại",
    "Category": "thể loại",
    "Correlation Coefficient": "Hệ số tương quan",
    "Regression Experiment": "Thí nghiệm hồi quy",
    "Hypothesis": "Giả thuyết",
    "Test Type": "Loại kiểm định",
    "Z-test": "Kiểm định Z",
    "t-test": "Kiểm định t",
    "Chi-test": "kiểm định &chi;&#178;",
    "F-test": "Kiểm định F",
    "Sampling Type": "Kiểu lấy mẫu",
    "Independent Sample": "độc lập",
    "Paired Sample": "mẫu ghép",
    "Sample Data": "Dữ liệu mẫu",
    "input either sample data": "Nhập dữ vào bảng kế tiếp bằng file csv/bsv",
    "input data": "Nhập dữ liệu",
    "Sample Statistics": "Thống kê mẫu",
    "Sample Mean": "Trung bình mẫu",
    "Sample Variance": " Phương sai mẫu",
    "Sample Proportion": "Tỉ lệ mẫu",
    "sample range": "Phạm vi mẫu",
    "control chart": "Biểu đồ kiểm soát",
    "if Z-test-1": "(Nếu kiểm định Z, nhập phương sai tổng thể &sigma;&#178;)",
    "if Z-test-2": "(Nếu kiểm định Z, z<sub>&alpha;/2 </sub>.)",
    "At least one pair": "Có ít nhất một cặp trung bình khác nhau",
    "Row-Col-0": "Biến cột và biến dòng độc lập ",
    "Row-Col-1": "Biến cột và biến dòng độc lập ",
    "Enter any number of row": "(Nhập số vào ô trên cùng bên trái)",
    "Row": "Dòng",
    "Column": "Cột",
    "Probability": "Xác suất",
    "Show Probability": "Xem xác suất",
    "Regression Line": "Đường hồi quy",
    "Erase All": "Xóa tất cả",
    "Add Point": "Thêm điểm",
    "Erase Point": "Xóa điểm",
    "Reference Site": "Tham khảo",
    "Lot Size": "Kích thước lô",
    "Defect Size": "Có vấn đề về cỡ mẫu",
    "Defect Rate": "tỷ lệ lỗi",
    "If typed": "Sau khi nhập số, nhấp vào [Thực thi] / [Enter]",
    "Stat/BoxPlot": "Thống kê / Biểu đồ Box",
    "Mean": "Trung bình",
    "Std Dev": "Độ lệch chuẩn",
    "SimulationWarning": "Kết thúc giả lập trước khi tiếp tục",
    "OneGroup": "(Một nhóm)",
    "AnalysisVar": "Phân tích Biến",
    "AnalysisVar2": "Biến Y",
    "GroupVar": "Nhóm",
    "GroupVar2": "X Biến",
    "GroupVar3": "Hệ số1",
    "GroupVar4": "Hệ số2",
    "AnalysisVarMu12": "Phân tích(hoặc là X1) Biến",
    "GroupVarMu12": "Nhóm(hoặc là X2) Biến",
    "PairedMu12": " X1, X2 : Đã ghép nối Biến",
    "SizeVar": "Biến kích thước vòng kết nối",
    "RegressionBand": "Khoảng tin cậy",
    "RegressionTable": "Phân Tích hồi quy",
    "RegressionResidual": "Đồ thị phần dư",
    "RegressionResidualLeverage": "Dư so với Đòn bẩy",
    "RegressionCook": "Cook Biểu đồ khoảng cách",
    "RegressionQQ": "Đồ thị Q-Q lot cho phần dư",
    "HistogramNormal": "Biểu đồ",
    "HistogramChisq": "Kiểm định chuẩn và phương",
    "HistogramNormalQQ": "Đồ thị Q-Q Plot pp chuẩn",
    "PopulationStd": "Độ lệch chuẩn tổng thể",
    "Type1Error": "Sai lầm loại 1",
    "Type2Error": "Sai lầm loại 2",
    "AnovaTable": "Bảng ANOVA",
    "AnovaMeanGraph": "Khoảng tin cậy cho trung bình",
    "MultipleComparison": "So sánh kép",
    "ComparisonGraph": "Biểu đồ so sánh",
    "AnovaResidual": "Biểu đồ phần dư",
    "AnovaQQ": "Biểu đồ Q-Q Plot cho phần dư",
    "TestingFit": "Kiểm định độ phù hợp của mô hình",
    "FitTest0": " Phân phối thực và lý thuyết giống nhau ",
    "FitTest1": " Phân phối thực và lý thuyết khác nhau ",
    "ObservedFreq": "Tần số quan sát O",
    "ExpectedProb": "Xác suất kì vọng p",
    "ExpectedFreq": "Tần số kì vọng E(>5)",
    "InputFitData": "Điền giá trị vào ô trên cùng bên trái",
    "ExecuteTable": "Thống kê",
    "MeanDotGraph": "Đồ thị khoảng tin cậy",
    "ScatterRegression": "Ma trận đồ thị phân tán",
    "Factor": "Hệ số",
    "Interaction": "Sự tương tác",
    "NoInteraction": "Không tương tác",
    "ExistInteraction": "Tương tác hiện tại",
    "eStatLecture": "Bài giảng eStat ",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": " Kiểm định hạng Wilconxon ", 
    "NonParametricMu12": "Wilcoxon Xếp hạng Tổng kiểm tra : Thông số thống kê M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Kiểm định hạng",
    "Sample Range": "Phạm vi mẫu",
    "DistributionTable": "Bảng phân phối",
    "SignedRankTest": "Kiểm định dấu và hạng",
    "SignTest": "Kiểm định dấu",
    "SignCount": "Số lượng dấu",
    "KruskalTest": "Kiểm định Kruskal-Wallis",
    "KruskalTestANOVA": "Kiểm định Kruskal-Wallis",
    "Total": "Toàn bộ",
    "FriedmanTest": "Kiểm định Friedman",
    "FriedmanTestANOVA": "Kiểm định Friedman",
    "Block": "Khối",
    "Treatment": "Điều trị",
    "At least one locations is different": "Ít nhất một cặp vị trí khác nhau",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Kiểm định xấp xỉ chuẩn",
    "WilcoxonSignCondition": "Nếu n≤ 20 Wilcoxon Xếp hạng Tổng kiểm tra,  n > 20 Kiểm định xấp xỉ",
    "WilcoxonRankCondition": "Nếu n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Kiểm định xấp xỉ chuẩn",
    "KruskalCondition": "Nếu n≤ 10 H Kiểm tra phân phối,  else &chi;&#178; Kiểm định xấp xỉ",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Lựa chọn biến",
    "VariableSelect4": "Có thể chọn các biến phân tích khác",
    "VariableSelect5": "Có thể chọn nhiều biến X hơn",
    "SummaryData": "Dữ liệu tóm tắt",
    "RawData": "Dữ liệu thô",
    "MultiSelect": "",
    "DataType": "(Chọn biến theo tên biến lần nhấp)",
    "by": "bởi",
    "NameVar": "Biến tên",
    "n_variance": "n-1 công thức",
    "RandomNumber": "Số ngẫu nhiên",
    "RealNumber":     "Số thực",
    "IntegerNumber":  "Số nguyên",
    "NumberData":     "Số lượng dữ liệu",
    "NumberDigit":    "Chữ số thập phân",
    "NormalTable":    "Bảng phân phối bình thường",
    "Percentile":     "Bảng tỷ lệ phần trăm",
    "PercentileValue": "phân vị",
    "StudentRangeDist": "HSD Phân phối phạm vi",
    "copy link": "sao chép đường dẫn",
    "WithoutReplacement": "không có vật thay thế",
    "WithReplacement":    "Khai thác phục hồi",
    "Replacement":     "Khai thác phục hồi",
    "NonReplacement":  "không có vật thay thế",
    "WordCloud":       "Word Cloud (tiếng Anh)",
    "oneColor":        "màu đơn",
    "defaultColor":    "màu mặc định",
    "RelativeFreq":    "Tần số tương đối",
    "Density":         "Tỉ trọng",
    "MarginOfError":   "Biên độ của lỗi",
    "Permutation":     "Hoán vị",
    "PermutationSame": "Hoán vị với cùng một thứ",
    "Combination":     "Sự phối hợp",
    "NumberOfCase":    "Số trường hợp",
    "BinomialTheorem": "sự sắp xếp lại hai điều",
    "PascalTriangle":  "Tam giác Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Quy tắc bổ sung của xác suất",
    "MultiplicationRule":"Quy tắc nhân của xác suất",
    "ConditionalProb":   "Xác suất có điều kiện",
    "JointProb":         "Xác suất chung",
    "DiscreteDist":      "Phân phối rời rạc",
    "Categorize":        "Phân loại",
    "Recode":            "Mã hóa",
    "Compute":           "Máy tính",
    "SelectIf":          "Chọn Nếu",
    "InfoValueLabel":    "*** Chọn biến, nhập tên biến và / hoặc nhãn giá trị.",
    "InfoSorting":       "*** Chọn biến sắp xếp, nhập phương pháp sắp xếp tối đa 3 biến.",
    "InfoCategorize":    "*** Chọn biến cho Danh mục, nhập 'Bắt ​​đầu khoảng thời gian' và 'Chiều rộng khoảng thời gian'.",
    "InfoRecode":        "*** Chọn biến cho Mã hóa, nhập 'Giá trị Mới'.",
    "InfoRecode2":       "* Cho phép ghi lên đến 9 giá trị.",
    "InfoCompute":       "*** Tạo công thức tính toán bằng các nút bên dưới.",
    "InfoSelectIf":      "*** Chọn tối đa 3 biến, nhập điều kiện của chúng.",
    "SortingVariable":   "Sắp xếp các biến",
    "SortingMethod":     "Phương pháp sắp xếp",
    "NewVariable":       "Biến mới",
    "CategoryVariable":  "Phân loại biến",
    "CategoryListCheck": "Kiểm tra Danh sách Danh mục",
    "CategoryInterval":  "Khoảng thời gian danh mục",
    "CategoryLabel":     "Nhãn danh mục",
    "RecodeVariable":    "Biến Recode",
    "CurrentValue":      "Giá trị hiện tại",
    "NewValue":          "Giá trị mới",
    "ComputeFormula":    "Công thức",
    "SelectVariable":    "Biến <br> cho Chọn",
    "RelationOperator":  "Mối quan hệ <br> Nhà điều hành",
    "SelectValue":       "Giá trị",
    "MissingValue":      "thiếu giá trị",
    "option":            "lựa chọn",                                  
    "TimeSeries":        "Chuỗi thời gian",
    "Smoothing":         "Làm mịn",
    "Filtering":         "Lọc",
    "Transformation":    "Chuyển đổi",
    "Weight":            "Cân nặng",
    "PercentChange":     "Phần trăm thay đổi",
    "WeightedIndex":     "Chỉ mục đơn giản",
    "BaseTime":          "Giờ gốc",
    "LagTime":           "Thời gian trễ",
    "Lag":               "Thời gian trễ",
    "Forecasting":       "Dự báo",
    "SeasonalModel":     "Mô hình theo mùa",
    "HoltWinter":        "Mô hình theo mùa Holt-Winters",
    "Trend":             "Xu hướng",
    "Seasonal":          "Theo mùa",
    "Deseasonal":        "Deseasonal Series",
    "Nseason":           "Times in Season",
    "Irregular":         "Không thường xuyên",
    "TrendModel":        "Mô hình xu hướng trên Deseasonal",
    "RegressionModel":   "Mô hình hồi quy",
    "ForecastingPeriod": "Khoảng thời gian dự báo",
    "CreateTable":       "Bảng dữ liệu",
    "SaveTable":         "Lưu bảng",
    "MA":                "Đường trung bình động",
    "EWMA":              "Mô hình EWMA",
    "CenterMA":          "Đường trung bình động ở giữa",
    "MovingMedian":      "Trung vị Di chuyển Căn giữa",
    "ES":                "Làm mịn theo cấp số nhân",
    "Default":           "Mặc định",
    "Linear":            "Tuyến tính",
    "Quadratic":         "Bậc hai",
    "Cubic":             "Khối",
    "SquareRoot":        "Căn bậc hai",
    "Log":               "Lôgarit",
    "Exponent":          "Số mũ",
    "Power":             "Quyền lực",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Đường trung bình trượt đơn",
    "SingleES":          "Làm trơn theo cấp số nhân đơn",
    "DoubleMA":          "Đường trung bình động kép",
    "DoubleES":          "Làm mịn theo cấp số nhân kép",
    "HoltLinear":        "Holt Exponential Smoothing",
    "DeseasonIntercept": "Đánh chặn trái chiều",
    "DeseasonSlope":     "Độ dốc trái mùa",
    "SeasonalIndex":     "Chỉ số theo mùa",
    "Diff":              "Sự khác biệt",
    "DiffTime":          "Thời gian chênh lệch",
    "AR":                "Mô hình tự phục hồi",
    "ResultTable":       "Kết quả hồi quy",
    "ForecastTable":     "Bảng Dự báo",
    "HoltLevel":         "Cấp độ",
    "HoltTrend":         "Xu hướng",
    "AutoCorrTable":     "Bảng tự tương quan",
    "DiffSeries":        "Chuỗi sự khác biệt",
    "RawSeries":         "Dòng thô",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis",  
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Vietnamese
appStr[0][7] = "/estat/eStat/index.html";
appStr[1][7] = "/estat/eStatH/index.html";
appStr[2][7] = "/estat/eStatU/index.html";
appStr[3][7] = "/estat/eStatE/index_en.html";
appStr[4][7] = "/estat/eHelp/index_en.html";
appStr[5][7] = "index.html";
appStr[6][7] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][7] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][7] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][7] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][7] = "";
appStr[11][7] = "Large Population Country";
appStr[12][7] = "Life Expectancy (OECD)";
appStr[13][7] = "Population Pyramid (Korea)";
appStr[14][7] = "GNP per Capita (OECD)";
appStr[15][7] = "Top World Export Country";
appStr[16][7] = "Obesity % of Population";
appStr[17][7] = "Temperature of Major City";
appStr[18][7] = "Top CO2 Emission Country";
appStr[19][7] = "Alcohol Consume (OECD)";
appStr[20][7] = "Continuous Data Graph";
appStr[21][7] = "Length of Otter";
appStr[22][7] = "Age of Teacher";
appStr[23][7] = "Age of Teacher by Sex";
appStr[24][7] = "Cleanliness of Tooth";
appStr[25][7] = "Math Exam Scores";
appStr[26][7] = "Calorie of Hamberger";
appStr[27][7] = "Height vs Weight by Sex";
appStr[28][7] = "Discrete Data Graphs";
appStr[29][7] = "";
appStr[30][7] = "";
appStr[31][7] = "unit";
appStr[32][7] = "Country";
appStr[33][7] = "Male";
appStr[34][7] = "Female";
appStr[35][7] = "Age";
appStr[36][7] = "Person";
appStr[37][7] = "billion $";
appStr[38][7] = "Export";
appStr[39][7] = "Obesity %";
appStr[40][7] = "Celsius";
appStr[41][7] = "City";
appStr[42][7] = "Jan High";
appStr[43][7] = "Jul High";
appStr[44][7] = "million ton";
appStr[45][7] = "liter/year";
appStr[46][7] = "Alcohol";
alertMsg[1][7] = "Đã chọn biến không chứa dữ liệu";
alertMsg[2][7] = "Chọn từng biến để phân tích (click tên cột). Nếu chọn 2 biến, biến đầu tiên là biến định tính";
alertMsg[3][7] = "Biến đã chọn thiếu số liệu";
alertMsg[4][7] = "Nếu số liệu của biến đã chọn khác nhau, không thể phân tích";
alertMsg[5][7] = "Quá nhiều nhóm! Các đồ thị sẽ chồng lên nhau do kích thước của màn hình";
alertMsg[6][7] = "Nếu biến có chứa chuỗi (chữ cái),không thể phân tích/tạo bảng";
alertMsg[7][7] = "Nếu chọn hơn 3 biến, việc phân tích hoặc tạo bảng sẽ không thực thi";
alertMsg[8][7] = "Biểu đồ chấm chỉ cho cỡ mẫu nhỏ hơn 200";
alertMsg[9][7] = "Đồ thị Stem and Leaf chỉ cho cỡ mẫu nhỏ hơn 100";
alertMsg[10][7] = "Biến phân tích không được chọn.";
alertMsg[11][7] = "Các biến Phân tích / Nhóm không được chọn.";
alertMsg[12][7] = "Nếu biến chứa chuỗi, không thể phân tích hay tạo bảng";
alertMsg[13][7] = "";
alertMsg[14][7] = "Bảng tóm tắt không thể tạo cho đồ thị liên tục và kiểm định giả thuyết";
alertMsg[16][7] = "Kiểm định này chỉ cho phép 2 nhóm";
alertMsg[17][7] = "Biểu đồ phân tán cần ít nhất biến x và biến y";
alertMsg[18][7] = "Không cho phép nhiều hơn ba biến";
alertMsg[19][7] = "Nếu có một nhân vật trên dữ liệu, không thể thực hiện phân tích";
alertMsg[20][7] = "Không thể vẽ biều đồ phân tán nếu biến X/Y chứa chuỗi";
alertMsg[21][7] = "Nếu dữ liệu bị thiếu, không thể lưu";
alertMsg[22][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ cột";
alertMsg[25][7] = "Nếu chỉ có 1 nhóm, không thể vẽ biểu đồ cột chồng ";
alertMsg[27][7] = "Nếu chỉ chọn 1 nhóm, không thể vẽ biểu đồ cột tỉ lệ";
alertMsg[29][7] = "Nếu chỉ có 1 nhóm, không thể vẽ biểu đồ cột ghép";
alertMsg[31][7] = "Nếu chỉ chọn 1 nhóm, không thể vẽ biểu đồ cột hai bên ";
alertMsg[32][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ Pie";
alertMsg[33][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ doughnut)";
alertMsg[34][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ Band";
alertMsg[35][7] = "Nếu có giá trị âm, không thể tạo bảng tần số";
alertMsg[36][7] = "Biểu đồ cột chỉ cho phép 2 nhóm";
alertMsg[37][7] = "Chỉ có thể kiểm định cho 1 biến";
alertMsg[38][7] = "Giá trị trung bình là NaN. Hãy nhập giá trị khác và thử lại!";
alertMsg[39][7] = "Độ lệch chuẩn là 0 hoặc NaN. Hãy thử lại!!";
alertMsg[40][7] = "Phương sai đã nhập là NaN. Hãy nhập giá trị khác và thử lại!!";
alertMsg[41][7] = "Chỉ có thể kiểm định giả thuyết thống kê cho 2 biến";
alertMsg[42][7] = "Không thể thay đổi tên của kiểm định! ";
alertMsg[43][7] = "Hồi quy tuyến tính đơn giản chỉ dành cho một nhóm";
alertMsg[44][7] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][7] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][7] = "Cùng một số biến được chọn";
alertMsg[47][7] = "Dữ liệu ký tự trong Tần suất không được phép !! Hãy thử lại.";
alertMsg[48][7] = "Dữ liệu ký tự không được phép !! Hãy thử lại.";
alertMsg[49][7] = "Số lượng quan sát phải nhỏ hơn 100 !! Hãy thử lại.";
alertMsg[50][7] = "Nhập các số trong khoảng thời gian bắt đầu hoặc bước.";
alertMsg[51][7] = "Nhập số / Số hàng phải giống nhau !! Hãy thử lại.";
alertMsg[52][7] = "Nhập số vào danh mục và tần suất.";
alertMsg[53][7] = "Kích thước khoảng thời gian không giống nhau !! Hãy thử lại.";
alertMsg[54][7] = "Quan sát X không bằng quan sát Y !! Hãy thử lại.";
alertMsg[55][7] = "!!! Không có dữ liệu trên trang tính.";
alertMsg[56][7] = "!!! Không có biến nào được chọn";
alertMsg[57][7] = "!!! Nhập Khoảng thời gian Bắt đầu và Chiều rộng Khoảng thời gian";
alertMsg[58][7] = "!!! Nhập khoảng thời gian bắt đầu bằng số và độ rộng khoảng cách";
alertMsg[59][7] = "!!! Hơn 9 khoảng - thay đổi Chiều rộng Khoảng";
alertMsg[60][7] = "!!! Biến này có nhiều hơn 9 giá trị";
alertMsg[61][7] = "!!! Không có giá trị nào được nhập";
alertMsg[62][7] = "!!! Nhập công thức";
alertMsg[63][7] = "!!! Không có dữ liệu nào thỏa mãn điều kiện.";
alertMsg[64][7] = "";
alertMsg[65][7] = ""; 
alertMsg[66][7] = "";
alertMsg[67][7] = "";
alertMsg[68][7] = "";
alertMsg[69][7] = "";

svgStr[1][7] = " B/đồ cột";
svgStr[2][7] = " B/đồ Pie";
svgStr[3][7] = " B/đồ doughnut";
svgStr[4][7] = " B/đồ Band";
svgStr[5][7] = " B/đồ Line";
svgStr[6][7] = " B/đồ Dot";
svgStr[7][7] = " B/đồ Box-Whisker";
svgStr[8][7] = " B/đồ Stem-Leaf";
svgStr[9][7] = " Histogram";
svgStr[10][7] = " B/đồ phân tán";
svgStr[11][7] = " Kiểm định: Trung bình tổng thể";
svgStr[12][7] = " Kiểm định: Phương sai tổng thể";
svgStr[13][7] = " Kiểm định: Trung bình 2 tổng thể";
svgStr[14][7] = " Kiểm định: Phương sai 2 tổng thể";
svgStr[15][7] = " Phân tích ANOVA";
svgStr[16][7] = "Tần số";
svgStr[17][7] = "Tỉ số";
svgStr[18][7] = "Nhóm";
svgStr[19][7] = " ";
svgStr[20][7] = "<h3>Bảng tóm tắt <br> Bảng tần số</h3>";
svgStr[21][7] = "Biến nhóm";
svgStr[22][7] = "Biến dòng";
svgStr[23][7] = "Tổng cộng";
svgStr[24][7] = "Kích thước vòng tròn";
svgStr[25][7] = "<h3>Bảng tần số</h3>";
svgStr[26][7] = "Biến phân tích";
svgStr[27][7] = "Giá trị biến";
svgStr[28][7] = "Nhãn giá trị";
svgStr[29][7] = "Tần số";
svgStr[30][7] = "Tần số tương đối";
svgStr[31][7] = "<h3>Bảng chéo</h3>";
svgStr[32][7] = "Biến cột";
svgStr[33][7] = "Biến dòng";
svgStr[34][7] = "Trung bình"
svgStr[35][7] = "Độ lệch chuẩn"
svgStr[36][7] = "<h3> Histogram<br>Bảng tần số</h3>";
svgStr[37][7] = "Tên nhóm";
svgStr[38][7] = "Khoảng";
svgStr[39][7] = "Thân cây";
svgStr[40][7] = " Leaf";
svgStr[41][7] = "Nhóm 1  Lá";
svgStr[42][7] = "Nhóm 2  Lá"
svgStr[43][7] = "<h3>Thống kê cơ bản</h3>";
svgStr[44][7] = "Quan trắc";
svgStr[45][7] = "Giá trị nhỏ nhất";
svgStr[46][7] = "Trung vị";
svgStr[47][7] = "Lớn nhất";
svgStr[48][7] = "Tổng cộng";
svgStr[49][7] = "<h3>Kiểm định chuẩn</h3>";
svgStr[50][7] = "Tần số kì vọng nên > 5 <br>";
svgStr[51][7] = "&chi;&#178; Kiểm tra<br>Khoảng thời gian i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][7] = "Dữ liệu<br>Tần số quan sát<br>(O<sub>i</sub>)";
svgStr[53][7] = "P/p Chuẩn<br>Xác suất kì vọng<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][7] = "P/p Chuẩn<br>Tần số kì vọng<br>(E<sub>i</sub>)";
svgStr[55][7] = "Khoảng thời gian<br>&chi;&#178; giá trị<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][7] = "Tổng của &chi;&#178; giá trị";
svgStr[57][7] = "Biểu đồ x/suất và p/p chuẩn";
svgStr[58][7] = "Đồ thị Q-Q Plot p/p chuẩn";
svgStr[59][7] = "Phân vị chuẩn";
svgStr[60][7] = "Hệ số tương quan";
svgStr[61][7] = "Hệ số xác định";
svgStr[62][7] = "Sai số chuẩn";
svgStr[63][7] = "Biến";
svgStr[64][7] = "Tên biến";
svgStr[65][7] = "Biến độc lập";
svgStr[66][7] = "Biến phụ thuộc";
svgStr[67][7] = "Tham số";
svgStr[68][7] = "Giá trị ước lượng";
svgStr[69][7] = "Giá trị";
svgStr[70][7] = "Chặn";
svgStr[71][7] = "Độ dốc";
svgStr[72][7] = "Hệ số";
svgStr[73][7] = "Tổng bình phươngs";
svgStr[74][7] = "Bậc tự do";
svgStr[75][7] = "Hình vuông trung bìnhs";
svgStr[76][7] = "Hồi quy";
svgStr[77][7] = "Lỗi";
svgStr[78][7] = "Tổng cộng";
svgStr[79][7] = "<h3>Phân tích hồi quy</h3>";
svgStr[80][7] = "Đồ thị Q-Q Âm mưu phần dư chuẩn hóa";
svgStr[81][7] = "Phần dư chuẩn hóa";
svgStr[82][7] = "Phân vị chuẩn";
svgStr[83][7] = "Đồ thị phần dư";
svgStr[84][7] = "Giá trị dự báo";
svgStr[85][7] = "ANOVA 2 chiều";
svgStr[86][7] = "Đồ thị khoảng tin cậy";
svgStr[87][7] = "Phần dư";
svgStr[88][7] = "hai thống kê thứ nguyên";
svgStr[89][7] = "Ma trận đồ thị phân tán";
svgStr[90][7] = "So sánh kép";
svgStr[91][7] = "Thống kê";
svgStr[92][7] = "Nhân tố";
svgStr[93][7] = "Cấp độ";
svgStr[94][7] = "Đồ thị cho dữ liệu mẫu cặp";
svgStr[95][7] = "Dư so với Dự báo Lô đất";
svgStr[96][7] = "Dư so với Đòn bẩy Lô đất";
svgStr[97][7] = "Cook Khoảng cách đất";
svgStr[98][7] = "Cook Khoảng cách";
svgStr[99][7] = "Thứ tự dữ liệu";
svgStr[100][7]= "Nghĩa khác";
svgStr[101][7]= "Phương tiện kiểm tra";
svgStr[102][7]= "Điều trị";
svgStr[103][7]= "Sự tương tác";
svgStr[104][7]= "Tổng số hàng";
svgStr[105][7]= "Tổng số cột";
svgStr[106][7]= "Hệ số tương quan nhiều";
svgStr[107][7]= "<h3>Phân tích tương quan</h3>";
svgStr[108][7]= "Ma trận tương quan";
svgStr[109][7]= "Hệ số A - Hệ số B Đồ thị trung bình";
svgStr[110][7]= "Đòn bẩy";
svgStr[111][7]= "Biểu đồ thông tin địa lý";
svgStr[112][7]= "Phạm vi";
svgStr[113][7]= "Trung bình - Độ lệch chuẩn đồ thị";
svgStr[114][7]= "Phương sai tổng thể";
svgStr[115][7]= "giả thuyết";
svgStr[116][7]= "kiểm tra";
svgStr[117][7]= "phương sai";
svgStr[118][7]= "Giá trị khoảng thời gian";
svgStr[119][7]= "thể loại";
svgStr[120][7] = "Chế độ";
svgStr[121][7] = "Hiệp phương sai";
svgStr[122][7] = "Tam giác Pascal";
svgStr[123][7] = "Xác suất chung";
svgStr[124][7] = "Có điều kiện";
svgStr[125][7] = "Phân phối rời rạc";
svgStr[126][7] = "hàng ngang %";
svgStr[127][7] = "cột%";
svgStr[128][7] = "toàn bộ %";
svgStr[129][7] = "Ma trận biểu đồ thanh";
svgStr[130][7] = "Kiểm tra trước";
svgStr[131][7] = "Giá trị riêng";
svgStr[132][7] = "Vector riêng";
svgStr[133][7] = "Bảng tần số đa chiều";
svgStr[134][7] = "Biểu đồ cụm phân cấp";
svgStr[135][7] = "Khoảng cách";
svgStr[136][7] = "Đơn";
svgStr[137][7] = "Hoàn thành";
svgStr[138][7] = "Trung bình";
svgStr[139][7] = "Trung tâm";
svgStr[140][7] = "Phường";
svgStr[141][7] = "Liên kết";
svgStr[142][7] = "Number of Clusters <br>K";
svgStr[143][7] = "Bayes Information Criteria";
svgStr[144][7] = "Within Sum of Squares";
svgStr[145][7] = "Akaike Information Criteria";

svgStrU[1][7] = "Phân phối nhị thức";
svgStrU[2][7] = "Lặp lại";
svgStrU[3][7] = "Trung bình";
svgStrU[4][7] = "Độ lệch chuẩn";
svgStrU[5][7] = "Phân phối Poisson";
svgStrU[6][7] = "Phân phối hình học";
svgStrU[7][7] = "Phân phối siêu hình học";
svgStrU[8][7] = "Tổng thể";
svgStrU[9][7] = "Phân phối mẫu";
svgStrU[10][7] = "Luật số lớn";
svgStrU[11][7] = "Đuôi";
svgStrU[12][7] = "Mặt sấp";
svgStrU[13][7] = "Đồng xu xuất hiện mặt sấp";
svgStrU[14][7] = "Số lần xuất hiện mặt sấp";
svgStrU[15][7] = "Số lần thử";
svgStrU[16][7] = "Phân phối của trung bình mẫu";
svgStrU[17][7] = "Sự lặp lại";
svgStrU[18][7] = "Sai số chuẩn";
svgStrU[19][7] = "Trung bình tổng thể";
svgStrU[20][7] = "Khoảng tin cậy";
svgStrU[21][7] = "Độ chính xác của ước lượng";
svgStrU[22][7] = "Trung bình mẫu";
svgStrU[23][7] = "[Thống kê kiểm định]";
svgStrU[24][7] = "Phân phối";
svgStrU[25][7] = "Bác bỏ H\u2080";
svgStrU[26][7] = "Chấp nhận H\u2080";
svgStrU[27][7] = "Giá trị p";
svgStrU[28][7] = "[Quyết định] ";
svgStrU[29][7] = "[ANOVA]";
svgStrU[30][7] = "Nhập hệ số tương quan và nhấn Thực thi";
svgStrU[31][7] = "Hồi quy";
svgStrU[32][7] = "Biến dòng";
svgStrU[33][7] = "Biến cột";
svgStrU[34][7] = "Trung bình"
svgStrU[35][7] = "Độ lệch chuẩn"
svgStrU[36][7] = "<h3> Histogram<br>Bảng tần số</h3>";
svgStrU[37][7] = "Tên nhóm";
svgStrU[38][7] = "Khoảng";
svgStrU[39][7] = "Thân cây";
svgStrU[40][7] = " Lá";
svgStrU[41][7] = "Nhóm 1  Lá";
svgStrU[42][7] = "Nhóm 2  Lá"
svgStrU[43][7] = "<h3>Thống kê cơ bản</h3>";
svgStrU[44][7] = "Quan trắc";
svgStrU[45][7] = "Giá trị nhỏ nhất";
svgStrU[46][7] = "Trung vị";
svgStrU[47][7] = "Lớn nhất";
svgStrU[48][7] = "Tổng cộng";
svgStrU[49][7] = "Phân phối mũ";
svgStrU[50][7] = "Phân phối đều";
svgStrU[51][7] = "Độ chính xác của ước lượng";
svgStrU[52][7] = "- đi đôi chuột trên hệ tọa độ, eStat sẽ tìm đường hồi quy.";
svgStrU[53][7] = "- Di chuyển/xóa bớt số liệu, đường hồi quy sẽ thay đổi .";
svgStrU[54][7] = "[Thống kê mẫu] ";
svgStrU[55][7] = "[Thống kê mẫu 1] ";
svgStrU[56][7] = "[Thống kê mẫu 2] ";
svgStrU[57][7] = "Độ tin cậy";
svgStrU[58][7] = "Biến cột và biến dòng độc lập";
svgStrU[59][7] = "Biến cột và biến dòng độc lập";
svgStrU[60][7] = "Phân phối thực";
svgStrU[61][7] = "Phân phối lý thuyết";
svgStrU[62][7] = "Kiểm định độ phù hợp cho tần số quan sát";
svgStrU[63][7] = "Wilcoxon Xếp hạng Tổng kiểm tra";
svgStrU[64][7] = "Wilcoxon Bảng xếp hạng tổng kiểm tra";
svgStrU[65][7] = "Kruskal-Wallis Kiểm tra";
svgStrU[66][7] = "Kruskal-Wallis H Bảng kiểm tra";
svgStrU[67][7] = "Kruskal-Wallis H Thống kê";
svgStrU[68][7] = "Wilcoxon Kiểm tra xếp hạng đã ký";
svgStrU[69][7] = "Đăng ký kiểm tra";
svgStrU[70][7] = "Friedman Kiểm tra";
svgStrU[71][7] = "Friedman S Thống kê";
svgStrU[72][7] = "Friedman S Bảng phân phối";
svgStrU[73][7] = "t value (Z)";
svgStrU[74][7] = "ChiSq value";
svgStrU[75][7] = "phương sai mẫu";
svgStrU[76][7] = "sự khác biệt của phương tiện mẫu";
svgStrU[77][7] = "tỷ số của phương sai mẫu";
svgStrU[78][7] = "Giả thiết về phương sai";
svgStrU[79][7] = "Tóm tắt dữ liệu";
svgStrU[80][7] = "Nhiều lựa chọn";
svgStrU[81][7] = "Chọn tối đa hai nhóm";
svgStrU[82][7] = "Biến X";
svgStrU[83][7] = "Biến Y";
svgStrU[84][7] = "bởi";
svgStrU[85][7] = "Không có biến nhóm";
svgStrU[86][7] = "Dữ liệu đã chọn: ";
svgStrU[87][7] = "Dữ liệu thô";
svgStrU[88][7] = "Chọn biến theo tên biến lần nhấp";
svgStrU[89][7] = "Giá trị bị mất";
svgStrU[90][7] = "Xếp hạng tổng";
svgStrU[91][7] = "Kinh độ";
svgStrU[92][7] = "Vĩ độ";
svgStrU[93][7] = "Ít nhất một cặp vị trí khác nhau";
svgStrU[94][7] = "Wilcoxon Kiểm tra xếp hạng đã ký";
svgStrU[95][7] = "Biến cặp";
svgStrU[96][7] = "dữ liệu được ghép nối";
svgStrU[97][7] = "Kiểm định độc lậ";
svgStrU[98][7] = "Mô phỏng";
svgStrU[99][7] = "Số ngẫu nhiên";
svgStrU[100][7] = "Phân phối bình thường";
svgStrU[101][7] = "Phân phối t";
svgStrU[102][7] = "Phân phối &chi;&#178;";
svgStrU[103][7] = "Phân phối F";
svgStrU[104][7] = "Phân phối HSD";
svgStrU[105][7] = "Phần tư thứ nhất";
svgStrU[106][7] = "Phần tư thứ 3";
svgStrU[107][7] = "Phạm vi liên vùng";
svgStrU[108][7] = "Hệ số xác định";
svgStrU[109][7] = "Tần số tương đối tích lũy (%)";
svgStrU[110][7] = "Số lượng tối đa của số nguyên phân phối đồng đều";
svgStrU[111][7] = "Di chuyển một điểm bằng chuột";
svgStrU[112][7] = "Khai thác phục hồi";
svgStrU[113][7] = "không có vật thay thế"; 
svgStrU[114][7] = "đường"; 
svgStrU[115][7] = "Phần trăm thay đổi";
svgStrU[116][7] = "Chỉ mục đơn giản";
svgStrU[117][7] = "Trễ thời gian";
svgStrU[118][7] = "Chênh lệch";
svgStrU[119][7] = "Tự tương quan";
svgStrU[120][7] = "Nhật ký";
svgStrU[121][7] = "Căn bậc hai";
svgStrU[122][7] = "Hộp-Cox";
svgStrU[123][7] = "Giờ gốc";
svgStrU[124][7] = "Đường trung bình động ở giữa";
svgStrU[125][7] = "Làm trơn theo cấp số nhân";
svgStrU[126][7] = "Trung vị Di chuyển Căn giữa";
svgStrU[127][7] = "Kiểu máy";
svgStrU[128][7] = "Trung bình động";
svgStrU[129][7] = "Trung bình động kép";
svgStrU[130][7] = "Holt Double Exponential Smoothing";
svgStrU[131][7] = "Chỉ số theo mùa";
svgStrU[132][7] = "Mô hình theo mùa đa số Holt-Winters";
svgStrU[133][7] = "Dòng Deseasonal";
svgStrU[134][7] = "Khối";
svgStrU[135][7] = "Phân tích cụm";
svgStrU[136][7] = "Cụm";
svgStrU[137][7] = "Cây quyết định";
svgStrU[138][7] = "Điều kiện quy tắc quyết định";
svgStrU[139][7] = "Quyết định";
svgStrU[140][7] = "Lặp lại";
svgStrU[141][7] = "Đồ thị song song";
svgStrU[142][7] = "Phân loại";
svgStrU[143][7] = "Hàm phân loại";
svgStrU[144][7] = "Kết quả phân loại";
svgStrU[145][7] = "Quyết định";
svgStrU[146][7] = "Tỷ lệ phân loại sai";
svgStrU[147][7] = "Ô";
svgStrU[148][7] = "Dữ liệu huấn luyện";
svgStrU[149][7] = "Dữ liệu thử nghiệm";

// Indonesian
$message.id = {
    "eStat : Stat Education SW": "eStat : Stat Education SW",
    "Home": "Halaman Beranda",
    "Filename": "File",
    "Selected Variables": "Variabel terpilih",
    "Cancel": "Batal",
    "Edit Variables": "Edit Variabel",
    "Level": "Level",
    "ElementaryLevel": "Dasar",
    "MiddleLevel": "Menengah",
    "HighLevel": "Tinggi",
    "UniversityLevel": "Universitas",
    "Example": "Contoh",
    "New Sheets": "Lembar Baru",
    "csv Open": "Buka csv",
    "www Open": "Buka www",
    "json Open": "Buka json",
    "csv Save": "Simpan csv",
    "json Save": "Simpan json",
    "Print Sheet": "Cetak Lembar",
    "Bar Graph": "Diagram Batang",
    "Pie Chart": "Diagram Pai",
    "Band Graph": "Diagram Band",
    "Line": "Garis",
    "Line Graph": "Diagram Garis",
    "Dot Graph": "Diagram Dot",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": " Diagram Dahan dan Daun",
    "maxStem": "** jumlah batang maksimal <= 30 **",
    "Box-Whisker Plot": "Diagram Kotak Garis",
    "Scatterplot": "Diagram Pencar",
    "ScatterplotMatrix": "Matriks Diagram Pencar",
    "Frequency Table": "Tabel Frekuensi",
    "Basic Statistics": "Statistika Dasar",
    "Testing Hypothesis &mu;": "Pengujian Hipotesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": " Pengujian Hipotesis &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": " Pengujian Hipotesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": " Pengujian Hipotesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Analisis Varians",
    "MiddleSchool": "Sekolah Menengah",
    "HighSchool":   "Sekolah menengah atas",
    "University":   "Universitas",
    "eStatHeading": "eStat adalah perangkat lunak gratis berbasis web untuk Pendidikan Statistika yang lebih baik menggunakan visualisasi data dinamis dan analisis statistik grafis.",
    "Support":      "Mendukung",
    "Donation":     "Sumbangan",
    "Middle School Stat Education": "Pendidikan Statistik Sekolah Menengah",
    "High School Stat Education": "Pelajaran Statistika tingkat Sekolah Menengah Atas",
    "University Stat Education": "Pelajaran Statistika tingkat Universitas",
    "Elem Stat Graph Example": "Contoh Diagram Statistik Dasar",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Vertikal",
    "Horizontal": "Horisontal",
    "Vertical Separated Bar": "Batang Terpisah Vertikal",
    "Vertical Stacked Bar": "Batang Bertumpuk Vertikal",
    "Vertical Ratio Bar": "Batang Rasio Vertikal",
    "Vertical Side by Side Bar": "Batang Vertikal Besebelahan",
    "Vertical Two Sided Bar": "Batang Vertikal Dua Arah",
    "Horizontal Separated Bar": "Batang Terpisah Horisontal",
    "Horizontal Stacked Bar": "Batang Bertumpuk Horisontal",
    "Horizontal Ratio Bar": "Batang Rasio Horisontal",
    "Horizontal Side by Side Bar": "Batang Vertikal Bersebelahan",
    "Horizontal Two Sided Bar": "Batang Horisontal Dua Arah",
    "Doughnut Graph": "Diagram Donat",
    "Two Sided Stem & Leaf Plot": "Diagram Dahan dan Daun Dua Arah",
    "Graph Save": "Simpan Diagram",
    "Graph Print": "Cetak Diagram",
    "Move to Table": "Pindah ke Tabel",
    "Edit Title": "Edit Judul",
    "Table Save": "Simpan Tabel",
    "Table Print": "Cetak Tabel",
    "Frequency": "Frekuensi",
    "Sorting": "Mengurutkan",
    "SortData": "Mengurutkan",
    "Raw Data": "Data Mentah",
    "Descending": "Mengurutkan dari Besar ke Kecil",
    "Ascending": "Mengurutkan dari Kecil ke Besar",
    "Mean": "Rata-rata",
    "Std Deviation": "Standar Deviasi",
    "MeanStd": "Rata-rata/Standar Deviasi",
    "DotMeanStd": "Diagram Dot - Rata-rata/Standar Deviasi",
    "95CI": "95% Selang Kepercayaan",
    "CorrelationAnalysis": "Analisis korelasi",
    "RegressionAnalysis": "Analisis regresi",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "dua arah ANOVA",
    "Regression": "Regresi",
    "Frequency Polygon": "Frekuensi Poligon",
    "Execute New Interval": "Jalankan Interval Baru",
    "Interval Start": "Mulai Interval",
    "Interval Width": "Lebar Interval",
    "t-test": "uji t",
    "Z-test": "uji Z",
    "(if Z-test, enter &sigma;)": "(jika uji Z, masukkan &sigma;)",
    "Significance Level": "Taraf Nyata",
    "Execute": "Jalankan",
    "(Confidence Interval)": "(Selang Kepercayaan)",
    "(jika Z-uji, Z<sub>1-&alpha;/2 </sub> digunakan)": "(jika uji-Z, Z<sub>&alpha;/2</sub>digunakan)",
    "&chi;<sup>2</sup> test": "uji &chi;&#178;",
    "Variance Assumption": "Asumsi Varians",
    "Variance": "Varians",
    "F test": "Uji F",
    "At least one pair of means is different": "Setidaknya ada satu pasang Rata-rata yang berbeda",
    "Main Title": "Judul Utama",
    "y title": "Judul y",
    "x title": "Judul x",
    "yAxis": "Y Sumbu",
    "Modify": "Modifikasi",
    "Confirm": "Konfirmasi",
    "Variable Name": "Nama Variabel",
    "Variable Value": "Nilai Variabel",
    "Value Label": "Label Nilai",
    "* Less than nine value labels allowed.": "* Kurang dari sembilan label nilai diperbolehkan.",
    "Save": "Simpan",
    "Exit": "Keluar",
    "eStatU UnivStatEdu": "eStatU - Pelajaran Statistika Tingkat Universitas SW",
    "eStatH HighStatEdu": "eStatH - Pelajaran Statistika Tingkat Sekolah Menengah Atas SW",
    "eStatM MiddleStatEdu": "eStatM - Dasar / Statistik Sekolah Menengah SW",
    "MiddleStat": "Statistik Sekolah Menengah",
    "HighStat":   "Statistik SMA",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menu",
    "Binomial Experiment": "Percobaan Binomial",
    "Binomial Distribution": "Distribusi Binomial ",
    "Binomial Prob Table": "Tabel Peluang Binomial ",
    "Poisson Distribution": "Distribusi Poisson ",
    "Poisson Prob Table": "Tabel Peluang Poisson",
    "Geometric Distribution": "Distribusi Geometri",
    "Geometric Prob Table": "Tabel Peluang Geometri",
    "HyperGeometric Distribution": "Distribusi Hipergeometri",
    "HyperGeometric Prob Table": "Tabel Peluang Hipergeometri",
    "Exponential Distribution": "Distribusi Eksponensial",
    "Normal Experiment": "Percobaan Normal",
    "Normal Distribution": "Distribusi Normal",
    "Normal Approx": "Pendekatan Normal",
    "t Distribution": "Distribusi t",
    "ChiSquare Distribution": "Distribusi &chi;&#178;",
    "F Distribution": "Distribusi F",
    "Sampling": "Pengambilan Sampel",
    "Population vs Sample": "Populasi vs Sampel",
    "Population": "Populasi",
    "Sample": "Sampel",
    "Exponential": "Eksponensial(0.3)",
    "Uniform": "Seragam(0,1)",
    "UniformDist": "Distribusi Seragam",
    "Sample05": "Pengambilan Sampel 5%",
    "Sample10": "Pengambilan Sampel 10%",
    "Sample20": "Pengambilan Sampel 20%",
    "Statistics/BoxPlot": "Statistik/Diagram Kotak Garis",
    "StatisticalProb":     "Probabilitas Statistik",
    "Law of Large Number": "Hukum Bilangan Besar",
    "Dist of Sample Means": "Distribusi dari Rata-rata Sampel",
    "Sampling Distribution": "Distribusi Pengambilan Sampel",
    "Sample Size": "Ukuran Sampel",
    "Confidence Interval": "Selang Kepercayaan",
    "Confidence Interval Simulation": "Percobaan Selang Kepercayaan",
    "Simulation": "Percobaan",
    "Confidence Interval Mu": "Estimasi : &mu;",
    "Mu Confidence Interval": "Estimasi : &mu;",
    "Confidence Interval Sigma": "Estimasi : &sigma;&#178; ",
    "Confidence Interval P": "Estimasi : p",
    "Estimation Accuracy": "Keakurasian Nilai Estimasi",
    "Repetition": "Ulangan",
    "Confidence Level": "Taraf Nyata",
    "Testing Hypothesis mu_titleAB": "Uji Hipotesis Rata-rata Satu Populasi",
    "Testing Hypothesis mu_title": "Uji Hipotesis Rata-rata Satu Populasi",
    "Testing Hypothesis sigma_title": "Uji Hipotesis Varians Satu Populasi",
    "Testing Hypothesis P_title": "Uji Hipotesis Proporsi Satu Populasi",
    "Testing Hypothesis mu12_title": "Uji Hipotesis Rata-rata Dua Populasi",
    "Testing Hypothesis sigma12_title": "Uji Hipotesis Varians Dua Populasi",
    "Testing Hypothesis P12_title": "Uji Hipotesis Proporsi Dua Populasi",
    "Testing Hypothesis muA":  "Pengujian Hipotesis &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Pengujian Hipotesis &mu; - C, n",
    "Testing Hypothesis mu": "Pengujian Hipotesis &mu;",
    "Testing Hypothesis sigma": "Pengujian Hipotesis &sigma;&#178;",
    "Testing Hypothesis P": "Pengujian Hipotesis p",
    "Testing Hypothesis mu12": "Pengujian Hipotesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Pengujian Hipotesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Pengujian Hipotesis p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Faktor ANOVA",
    "Testing Hypothesis ANOVA2": "2 Faktor ANOVA",
    "SameSampleSize": "Ukuran sampel setiap sel harus sama.",
    "Testing Independence": "Uji Independensi",
    "CategoryD": "kategori",
    "Category": "kategori",
    "Correlation Coefficient": "Koefisien Korelasi",
    "Regression Experiment": "Percobaan Regresi",
    "Hypothesis": "Hipotesis",
    "Test Type": "Tipe Uji",
    "Z-test": "uji Z ",
    "t-test": "uji t",
    "Chi-test": "uji &chi;&#178;",
    "F-test": "uji F",
    "Sampling Type": "Jenis Sampling",
    "Independent Sample": "independen",
    "Paired Sample": "data yang dipasangkan",
    "Sample Data": "Data Sampel",
    "input either sample data": " Masukan Data Sampel atau Statistik Sampel di Kotak Selanjutnya menggunakan csv/bsv ",
    "input data": "Masukkan Data",
    "Sample Statistics": "Statistik Sampel",
    "Sample Mean": "Rata-rata Sampel",
    "Sample Variance": "Varians Sampel",
    "Sample Proportion": "Proporsi Sampel",
    "sample range": "Rentang Sampel",
    "control chart": "Bagan Kendali",
    "if Z-test-1": "(if uji Z, Masukkan Varians Populasi &sigma;&#178;)",
    "if Z-test-2": "(if uji Z, z<sub>&alpha;/2 </sub> digunakan.)",
    "At least one pair": " Setidaknya Ada Satu Pasang Rata-rata yang Berbeda",
    "Row-Col-0": "Baris dan Kolom Variabel saling bebas/independen",
    "Row-Col-1": " Baris dan Kolom Variabel tidak saling bebas/independen",
    "Enter any number of row": "( Masukkan amatan dari entri pojok kiri atas)",
    "Row": "Baris",
    "Column": "Kolom",
    "Probability": "Kemungkinan",
    "Show Probability": "Tampilkan Peluang",
    "Regression Line": "Garis Regresi",
    "Erase All": "Hapus Layar",
    "Add Point": "Tambahkan Titik",
    "Erase Point": "Hapus Titik",
    "Reference Site": "Situs Referensi",
    "Lot Size": "Jumlah Lot",
    "Defect Size": "Jumlah Cacat",
    "Defect Rate": "tingkat cacat",
    "If typed": "Setelah mengetik nomor, klik [Jalankan] / [Enter]",
    "Stat/BoxPlot": "Stat/Diagram Kotak Garis",
    "Mean": "Rata-rata",
    "Std Dev": "Standar Deviasi",
    "SimulationWarning": "( Simulasi yang sekarang harus terlebih dahulu diselesaikan sebelum anda memulai simulasi yang selanjutnya)",
    "OneGroup": "(Satu Grup)",
    "AnalysisVar": "Analisis Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Grup",
    "GroupVar2": "X Var",
    "GroupVar3": "Faktor1",
    "GroupVar4": "Faktor2",
    "AnalysisVarMu12": "Analisis(or X1) Var",
    "GroupVarMu12": "Grup(or X2) Var",
    "PairedMu12": " X1, X2 : Dipasangkan Var",
    "SizeVar": "Ukuran Var",
    "RegressionBand": "Selang Kepercayaan",
    "RegressionTable": "Analisis Regresi",
    "RegressionResidual": "Sisa Merencanakan",
    "RegressionResidualLeverage": "Residual vs Pengaruh",
    "RegressionCook": "Cook's Jarak Merencanakan",
    "RegressionQQ": "Sisa Q-Q Merencanakan",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Uji Normal",
    "HistogramNormalQQ": "Q-Q Merencanakan Normal",
    "PopulationStd": "Standar Deviasi dari Populasi",
    "Type1Error": "Eror Tipe 1",
    "Type2Error": "Eror Tipe 2",
    "AnovaTable": "Tabel ANOVA",
    "AnovaMeanGraph": "Selang kepercayaan dari Rata-rata",
    "MultipleComparison": "Perbandingan Berganda",
    "ComparisonGraph": "Grafik Perbandingan",
    "AnovaResidual": "Sisa Merencanaka",
    "AnovaQQ": "Q-Q dari Sisa Merencanaka",
    "TestingFit": "Uji Kebaikan/kelayakan Model",
    "FitTest0": "Distribusi empirik sama dengan distribusi teoritik",
    "FitTest1": " Distribusi empirik berbeda dengan distribusi teoritik",
    "ObservedFreq": "Frekuensi amatan O",
    "ExpectedProb": "Peluang harapan p",
    "ExpectedFreq": "Frekuensi harapan E(>5)",
    "InputFitData": "Masukkan sel dari sel kiri atas",
    "ExecuteTable": "Statistik",
    "MeanDotGraph": "Grafik Selang Kepercayaan",
    "ScatterRegression": "Diagram Pencar",
    "Factor": "Faktor",
    "Interaction": "Interaksi",
    "NoInteraction": "Tanpa Interaction",
    "ExistInteraction": "Ada Interaction",
    "eStatLecture": "eStat Pengantar Kuliahe",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Tes Jumlah Peringkat", 
    "NonParametricMu12": "Wilcoxon Tes Jumlah Peringkatt : Parameter Lokasi M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Uji Jumlah Peringkat",
    "Sample Range": "Jumlah Pangkat",
    "DistributionTable": "Tabel Distribusi",
    "SignedRankTestDist": "Wilcoxon Distribusi Jumlah Peringkat Ditandatangani",
    "WilcoxonTestDist": "Wilcoxon Distribusi Jumlah Taruhan",
    "KruskalTestDist": "Kruskal-Wallis H Distribusi ",
    "FriedmanTestDist": "Friedman S Distribusi ",
    "SignedRankTest": "Uji Jumlah Peringkat Bertanda",
    "SignTest": "Uji Tanda",
    "SignCount": "Hitung Tanda",
    "KruskalTest": "Uji Kruskal-Wallis",
    "KruskalTestANOVA": "Uji Kruskal-Wallis",
    "Total": "Total",
    "FriedmanTest": "Uji Friedman",
    "FriedmanTestANOVA": "Uji Friedman",
    "Block": "Blok",
    "Treatment": "Pengobatan",
    "At least one locations is different": "Setidaknya terdapat satu pasang lokasi yang berbeda",
    "SignCondition": "Jika n ≤ 100 Uji Binomial,  n > 100 Pendekatan Normal",
    "WilcoxonSignCondition": "jika n≤ 20 Wilcoxon Tes Jumlah Peringkat,  n > 20 Normal Uji Approximation",
    "WilcoxonRankCondition": "jika n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Uji Jumlah Peringkat Wilcoxon, n>25 Pendekatan Normal",
    "KruskalCondition": "jika n≤ 10 Uji Distribusi H,  else &chi;&#178; Uji Aproksimasi",
    "VariableSelect":  "* Analisis Data : Muat File >> Pilih Variabel >>  Klik Ikon",
    "VariableSelect2": "* Pemilihan Variabel : Klik nama variabel atau gunakan kotak pemilihan RHS",
    "VariableSelect3": "Seleksi Variabel",
    "VariableSelect4": "Lebih banyak variabel analisis dapat dipilih",
    "VariableSelect5": "Lebih banyak variabel X dapat dipilih",
    "SummaryData": "Data Ringkasan",
    "RawData": "Data mentah",
    "MultiSelect": "",
    "DataType": "(Pilih variabel dengan mengklik nama variabel)",
    "by": "oleh",
    "NameVar": "Var Nama",
    "n_variance": "n-1 rumus",
    "RandomNumber": "Angka acak",
    "RealNumber":     "Bilangan asli",
    "IntegerNumber":  "Nomor Integer",
    "NumberData":     "Jumlah Data",
    "NumberDigit":    "Digit desimal",
    "NormalTable":    "Tabel Distribusi Normal",
    "Percentile":     "Tabel Persentil",
    "PercentileValue":"Persentil",
    "StudentRangeDist": "HSD Distribusi Rentang",
    "copy link": "Salin tautan",
    "WithoutReplacement": "tanpa penggantian",
    "WithReplacement":    "Ekstraksi restorasi",
    "Replacement":     "Ekstraksi restorasi",
    "NonReplacement":  "tanpa penggantian",
    "WordCloud":       "Word Cloud (Inggris)",
    "oneColor":        "warna",
    "defaultColor":    "warna default",
    "RelativeFreq":    "Frekuensi relatif",
    "Density":         "Kepadatan",
    "MarginOfError":   "Margin of Error",
    "Permutation":     "Permutasi",
    "PermutationSame": "Permutasi dengan hal yang sama",
    "Combination":     "Kombinasi",
    "NumberOfCase":    "Jumlah kasus",
    "BinomialTheorem": "Teorema binomial",
    "PascalTriangle":  "Segitiga Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Aturan Penjumlahan Probabilitas",
    "MultiplicationRule":"Aturan Probabilitas Perkalian",
    "ConditionalProb":   "Probabilitas Bersyarat",
    "JointProb":         "Probabilitas Bersama",
    "DiscreteDist":      "Distribusi Diskrit",
    "Categorize":        "Mengkategorikan",
    "Recode":            "Kode ulang",
    "Compute":           "Menghitung",
    "SelectIf":          "Pilih Jika",
    "InfoValueLabel":    "*** Pilih variabel, masukkan nama variabel dan / atau label nilai.",
    "InfoSorting":       "*** Pilih variabel pengurutan, masukkan metode pengurutan hingga 3 variabel.",
    "InfoCategorize":    "*** Pilih variabel untuk Kategori, masukkan 'Interval Start' dan 'Interval Width'.",
    "InfoRecode":        "*** Pilih variabel untuk Recode, masukkan 'Nilai Baru'.",
    "InfoRecode2":       "* Izinkan perekaman hingga 9 nilai.",
    "InfoCompute":       "*** Buat rumus komputasi menggunakan tombol di bawah ini.",
    "InfoSelectIf":      "*** Pilih hingga 3 variabel, masukkan kondisinya.",
    "SortingVariable":   "Pengurutan Variabel",
    "SortingMethod":     "Metode Penyortiran",
    "NewVariable":       "Variabel Baru",
    "CategoryVariable":  "Kategorikan Variabel",
    "CategoryListCheck": "Pemeriksaan Daftar Kategori",
    "CategoryInterval":  "Interval Kategori",
    "CategoryLabel":     "Label Kategori",
    "RecodeVariable":    "Pengodean Ulang Variabel",
    "CurrentValue":      "Nilai sekarang",
    "NewValue":          "Nilai baru",
    "ComputeFormula":    "Rumus",
    "SelectVariable":    "Variabel<br>untuk Pilihan",
    "RelationOperator":  "Hubungan<br>Operator",
    "SelectValue":       "Nilai",
    "MissingValue":      "nilai yang hilang",
    "option":            "pilihan",                                   
    "TimeSeries":        "Seri Waktu",
    "Smoothing":         "Menghaluskan",
    "Filtering":         "Penyaringan",
    "Transformation":    "Transformasi",
    "Weight":            "Bobot",
    "PercentChange":     "Ubah Persen",
    "WeightedIndex":     "Indeks Sederhana",
    "BaseTime":          "Waktu Dasar",
    "LagTime":           "Jeda waktu",
    "Lag":               "Jeda waktu",
    "Forecasting":       "Peramalan",
    "SeasonalModel":     "Model Musiman",
    "HoltWinter":        "Model Musiman Holt-Winters",
    "Trend":             "Kecenderungan",
    "Seasonal":          "Musiman",
    "Deseasonal":        "Seri Demusiman",
    "Nseason":           "Waktu dalam Musim",
    "Irregular":         "Tidak teratur",
    "TrendModel":        "Model Tren di Deseasonal",
    "RegressionModel":   "Model Regresi",
    "ForecastingPeriod": "Periode Peramalan",
    "CreateTable":       "Tabel data",
    "SaveTable":         "Simpan Tabel",
    "MA":                "Rata-rata Bergerak",
    "EWMA":              "Model EWMA",
    "CenterMA":          "Rata-Rata Pergerakan Terpusat",
    "MovingMedian":      "Median Bergerak Tengah",
    "ES":                "Perataan Eksponensial",
    "Default":           "Bawaan",
    "Linear":            "Linier",
    "Quadratic":         "Kuadrat",
    "Cubic":             "Kubik",
    "SquareRoot":        "Akar pangkat dua",
    "Log":               "Logaritma",
    "Exponent":          "Eksponensial",
    "Power":             "Kekuatan",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Rata-rata Pergerakan Tunggal",
    "SingleES":          "Perataan Eksponensial Tunggal",
    "DoubleMA":          "Rata-rata Pergerakan Ganda",
    "DoubleES":          "Perataan Eksponensial Ganda",
    "HoltLinear":        "Perataan Eksponensial Holt",
    "DeseasonIntercept": "Intersepsi deseasonal",
    "DeseasonSlope":     "Kemiringan demusim",
    "SeasonalIndex":     "Indeks Musiman",
    "Diff":              "Perbedaan",
    "DiffTime":          "Waktu Berbeda",
    "AR":                "Model Autoregresif",
    "ResultTable":       "Hasil Regresi",
    "ForecastTable":     "Tabel Prakiraan",
    "HoltLevel":         "Tingkat",
    "HoltTrend":         "Kecenderungan",
    "AutoCorrTable":     "Tabel Autokorelasi",
    "DiffSeries":        "Seri Perbedaan",
    "RawSeries":         "Seri Mentah",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Indonesian 
appStr[0][8] = "/estat/eStat/index.html";
appStr[1][8] = "/estat/eStatH/index.html";
appStr[2][8] = "/estat/eStatU/index.html";
appStr[3][8] = "/estat/eStatE/index_en.html";
appStr[4][8] = "/estat/eHelp/index_en.html";
appStr[5][8] = "index.html";
appStr[6][8] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][8] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][8] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][8] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][8] = "";
appStr[11][8] = "Large Population Country";
appStr[12][8] = "Life Expectancy (OECD)";
appStr[13][8] = "Population Pyramid (Korea)";
appStr[14][8] = "GNP per Capita (OECD)";
appStr[15][8] = "Top World Export Country";
appStr[16][8] = "Obesity % of Population";
appStr[17][8] = "Temperature of Major City";
appStr[18][8] = "Top CO2 Emission Country";
appStr[19][8] = "Alcohol Consume (OECD)";
appStr[20][8] = "Continuous Data Graph";
appStr[21][8] = "Length of Otter";
appStr[22][8] = "Age of Teacher";
appStr[23][8] = "Age of Teacher by Sex";
appStr[24][8] = "Cleanliness of Tooth";
appStr[25][8] = "Math Exam Scores";
appStr[26][8] = "Calorie of Hamberger";
appStr[27][8] = "Height vs Weight by Sex";
appStr[28][8] = "Discrete Data Graphs";
appStr[29][8] = "";
appStr[30][8] = "";
appStr[31][8] = "unit";
appStr[32][8] = "Country";
appStr[33][8] = "Male";
appStr[34][8] = "Female";
appStr[35][8] = "Age";
appStr[36][8] = "Person";
appStr[37][8] = "billion $";
appStr[38][8] = "Export";
appStr[39][8] = "Obesity %";
appStr[40][8] = "Celsius";
appStr[41][8] = "City";
appStr[42][8] = "Jan High";
appStr[43][8] = "Jul High";
appStr[44][8] = "million ton";
appStr[45][8] = "liter/year";
appStr[46][8] = "Alcohol";
alertMsg[1][8] = "Salah satu variabel yang dipilih tidak memiliki data.";
alertMsg[2][8] = "Pilih variabel untuk analisis (klik nama kolom) satu per satu. Jika dua variabel, maka yang pertama adalah variabel grup. ";
alertMsg[3][8] = "Data hilang pada variabel yang dipilih.";
alertMsg[4][8] = "Jika amatan dari variabel yang dipilih berbeda atau amatan berbeda, analisis tidak diperbolehkan.";
alertMsg[5][8] = "Terlalu banyak grup! Grafik mungkin tumpang tindih karena ukuran layar.";
alertMsg[6][8] = "Jika analisis variabel di data ringkasan mengandung karakter, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[7][8] = "Jika terdapat lebih dari tiga variabel terpilih dari data awal, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[8][8] = "Diagram Dot dapat dibuat jika jumlah amatan kurang dari 200.";
alertMsg[9][8] = "Diagram Dahan dan Daun dapat dibuat jika banyak amatan kurang dari 100.";
alertMsg[10][8] = "Variabel analisis tidak dipilih";
alertMsg[11][8] = "Analisis/Variabel Grup tidak dipilih.";
alertMsg[12][8] = "Jika analisis variabel mengandung karakter, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[13][8] = "";
alertMsg[14][8] = "Data ringkasan tidak dapat digunakan untuk grafik kontinu dan uji hipotesis.";
alertMsg[16][8] = "Hanya dua grup yang diperbolehkan untuk uji hipotesis ini.";
alertMsg[17][8] = "Diagram pencar membutuhkan setidaknya variabel X dan variabel Y.";
alertMsg[18][8] = "Lebih dari tiga variabel tidak diizinkan.";
alertMsg[19][8] = "Jika ada karakter pada data, analisa tidak bisa dilakukan.";
alertMsg[20][8] = "Jika terdapat karakter di variabel X/Y, diagram pencar tidak dapat digambar.";
alertMsg[21][8] = "Jika terdapat data hilang, menyimpan tidak dapat dilakukan.";
alertMsg[22][8] = "Jika terdapat angka negatif, diagram batang tidak dapat digambar.";
alertMsg[25][8] = "Jika hanya terdapat satu grup, diagram batang bertumpuk tidak dapat dilakukan.";
alertMsg[27][8] = "Jika hanya terdapat satu grup, diagram batang rasio tidak dapat dilakukan.";
alertMsg[29][8] = "Jika hanya terdapat satu grup, diagram batang bersebelahan tidak dapat dilakukan.";
alertMsg[31][8] = "Jika hanya terdapat satu grup, diagram batang dua arah tidak dapat dilakukan.";
alertMsg[32][8] = "Jika terdapat angka negatif, diagram pai tidak dapat digambar.";
alertMsg[33][8] = "Jika terdapat angka negatif, diagram donat tidak dapat digambar.";
alertMsg[34][8] = "Jika terdapat angka negatif, diagram band tidak dapat digambar.";
alertMsg[35][8] = "Jika terdapat angka negatif, tabel frekuensi tidak dapat dibangun.";
alertMsg[36][8] = "Diagram batang ini hanya diperbolehkan untuk dua grup.";
alertMsg[37][8] = "Uji Hipotesis ini hanya diperbolehkan untuk satu variabel.";
alertMsg[38][8] = "mu bukan angka. Masukkan angka dan coba lagi!";
alertMsg[39][8] = "Standar deviasi bernilai nol atau bukan angka. Coba lagi!";
alertMsg[40][8] = "Input varians bukan angka. Masukkan angka dan coba lagi!";
alertMsg[41][8] = "Uji Hipotesis ini hanya diperbolehkan untuk dua variabel. Variabel grup harus hanya memiliki dua grup";
alertMsg[42][8] = "Mengubah judul dari uji hipotesis tidak diperbolehkan!";
alertMsg[43][8] = "Regresi Linear Sederhana hanya untuk satu grup";
alertMsg[44][8] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][8] = "Tidak dapat menggambar Grafik GIS jika terdapat lebih dari lima variabel.";
alertMsg[46][8] = "Nomor variabel yang sama dipilih.";
alertMsg[47][8] = "Data karakter di Frekuensi tidak diperbolehkan!! Coba lagi.";
alertMsg[48][8] = "Data karakter tidak diperbolehkan!! Coba lagi.";
alertMsg[49][8] = "Jumlah pengamatan harus kurang dari 100!! Coba lagi.";
alertMsg[50][8] = "Masukkan angka di awal interval atau langkah.";
alertMsg[51][8] = "Masukkan angka / Njumlah baris harus sama!! Coba lagi.";
alertMsg[52][8] = "Masukkan angka dalam kategori dan frekuensi.";
alertMsg[53][8] = "Ukuran interval tidak sama!! Coba lagi.";
alertMsg[54][8] = "Pengamatan X tidak sama dengan pengamatan Y!! Coba lagi.";
alertMsg[55][8] = "!!! Tidak ada data di lembar.";
alertMsg[56][8] = "!!! Tidak ada variabel yang dipilih";
alertMsg[57][8] = "!!! Masukkan Awal Interval dan Lebar Interval";
alertMsg[58][8] = "!!! Masukkan Numerik Interval Start dan Interval Width";
alertMsg[59][8] = "!!! Lebih dari 9 interval - ubah Lebar Interval";
alertMsg[60][8] = "!!! Variabel ini memiliki lebih dari 9 nilai";
alertMsg[61][8] = "!!! Tidak ada nilai yang dimasukkan";
alertMsg[62][8] = "!!! Masukkan rumus";
alertMsg[63][8] = "!!! Tidak ada data yang memenuhi kondisi.";
alertMsg[64][8] = "";
alertMsg[65][8] = ""; 
alertMsg[66][8] = "";
alertMsg[67][8] = "";
alertMsg[68][8] = "";
alertMsg[69][8] = "";

svgStr[1][8] = " Diagram Batang";
svgStr[2][8] = " Diagram Pai";
svgStr[3][8] = " Diagram Donat";
svgStr[4][8] = " Diagram Band";
svgStr[5][8] = " Diagram Garis";
svgStr[6][8] = " Diagram Dot";
svgStr[7][8] = " Diagram Box-Whisker";
svgStr[8][8] = " Diagram Dahan dan Daun";
svgStr[9][8] = " Histogram";
svgStr[10][8] = " Diagram Pencar";
svgStr[11][8] = " Pengujian hipotesis: Rata-rata Satu Populasi ";
svgStr[12][8] = " Pengujian Hipotesis: Varians Satu Populasi";
svgStr[13][8] = " Pengujian Hipotesis: Rata-rata Dua Populasi ";
svgStr[14][8] = " Pengujian Hipotesis: Varians Dua Populasi ";
svgStr[15][8] = " Analisis Varians";
svgStr[16][8] = "Frekuensi";
svgStr[17][8] = "Rasio";
svgStr[18][8] = "Grup ";
svgStr[19][8] = " ";
svgStr[20][8] = "<h3>Data Ringkasan<br>Tabel Frekuensi </h3>";
svgStr[21][8] = "Variabel Grup";
svgStr[22][8] = "Variabel Baris";
svgStr[23][8] = "Total";
svgStr[24][8] = "Ukuran Lingkaran";
svgStr[25][8] = "<h3>Tabel Frekuensi</h3>";
svgStr[26][8] = "Var Analisis";
svgStr[27][8] = "Nilai Var";
svgStr[28][8] = "Label Nilai";
svgStr[29][8] = "Frekuensi";
svgStr[30][8] = "Frekuensi relatif";
svgStr[31][8] = "<h3>Tabel Silang</h3>";
svgStr[32][8] = "Variabel Kolom";
svgStr[33][8] = "Variabel Baris";
svgStr[34][8] = "Rata-rata"
svgStr[35][8] = "Standar Deviasi"
svgStr[36][8] = "<h3> Histogram<br>Tabel Frekuensi</h3>";
svgStr[37][8] = "Nama Grup";
svgStr[38][8] = "Selang";
svgStr[39][8] = "Dahan";
svgStr[40][8] = " Daun";
svgStr[41][8] = "Daun Grup 1";
svgStr[42][8] = "Daun Grup 2"
svgStr[43][8] = "<h3>Statistika Dasar</h3>";
svgStr[44][8] = "Amatan";
svgStr[45][8] = "Minimum";
svgStr[46][8] = "Median";
svgStr[47][8] = "Maksimum";
svgStr[48][8] = "Total";
svgStr[49][8] = "<h3>Uji Kenormalan</h3>";
svgStr[50][8] = "Frekuensi harapan > 5 <br> disarankan";
svgStr[51][8] = "&chi;&#178; Tes<br>Selang i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][8] = "Data<br>Frekuensi Amatan<br>(O<sub>i</sub>)";
svgStr[53][8] = "Distribusi Normal<br>Peluang Harapan<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][8] = "Distribusi Normal<br>Frekuensi Harapan<br>(E<sub>i</sub>)";
svgStr[55][8] = "Setiap interval<br>&chi;&#178; nilai<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][8] = "Jumlah dari nilai &chi;&#178;";
svgStr[57][8] = "Histogram Peluang dan Distribusi Normal";
svgStr[58][8] = "Q-Q Plot Normal";
svgStr[59][8] = "Kuantil Normal";
svgStr[60][8] = "Koefisien Korelasi";
svgStr[61][8] = "Koefisien Determinasi";
svgStr[62][8] = "Standar Eror";
svgStr[63][8] = "Variabel";
svgStr[64][8] = "Nama Variabel";
svgStr[65][8] = "Variable bebas";
svgStr[66][8] = "Variabel tak bebas";
svgStr[67][8] = "Parameter";
svgStr[68][8] = "Nilai Harapan";
svgStr[69][8] = "Nilai";
svgStr[70][8] = "Intersep";
svgStr[71][8] = "Slope";
svgStr[72][8] = "Faktor";
svgStr[73][8] = "Jumlah Kuadrat";
svgStr[74][8] = "Derajat Bebas";
svgStr[75][8] = "Kuadrat Tengah";
svgStr[76][8] = "Regresi";
svgStr[77][8] = "Eror";
svgStr[78][8] = "Total";
svgStr[79][8] = "<h3>Analisis Regresi</h3>";
svgStr[80][8] = "Q-Q Plot Residual terbakukan";
svgStr[81][8] = "Residual Terbakukan";
svgStr[82][8] = "Kuantil Normal";
svgStr[83][8] = "Plot Residual";
svgStr[84][8] = "Nilai Prediksi";
svgStr[85][8] = "ANOVA dua arah";
svgStr[86][8] = "Grafik Selang Kepercayaan";
svgStr[87][8] = "Residual";
svgStr[88][8] = "statistik dua dimensi";
svgStr[89][8] = "Matriks Diagram Pencar";
svgStr[90][8] = "Perbandingan Berganda";
svgStr[91][8] = "Statistik";
svgStr[92][8] = "Faktor";
svgStr[93][8] = "Level";
svgStr[94][8] = "Grafik Data Sampel Berpasangan";
svgStr[95][8] = "Plot Residual vs Ramalan";
svgStr[96][8] = "Plot Residual vs Pengaruh";
svgStr[97][8] = "Grafik Jarak Cook";
svgStr[98][8] = "Jarak Cook";
svgStr[99][8] = "Urutan Data";
svgStr[100][8]= "Beda rata-rata";
svgStr[101][8]= "Pengujian Rata-rata";
svgStr[102][8]= "Perlakuan";
svgStr[103][8]= "Interaksi";
svgStr[104][8]= "Total Baris";
svgStr[105][8]= "Total Kolom";
svgStr[106][8]= "Koefisien Korelasi Berganda";
svgStr[107][8]= "<h3>Analisis korelasi</h3>";
svgStr[108][8]= "Matriks Korelasi";
svgStr[109][8]= "Faktor A - Faktor B Grafik Berartih";
svgStr[110][8]= "Pengaruh";
svgStr[111][8]= "Grafik Informasi Geografis";
svgStr[112][8]= "Jarak";
svgStr[113][8]= "Rata-rata Standar Deviasi Grafik";
svgStr[114][8]= "Varians Satu Populasi";
svgStr[115][8]= "Hipotesis";
svgStr[116][8]= "Uji";
svgStr[117][8]= "Varians";
svgStr[118][8]= "Nilai interval";
svgStr[119][8]= "kategori";
svgStr[120][8] = "Mode";
svgStr[121][8] = "Kovarians";
svgStr[122][8] = "Segitiga Pascal";
svgStr[123][8] = "Probabilitas Bersama";
svgStr[124][8] = "Bersyarat";
svgStr[125][8] = "Distribusi Diskrit";
svgStr[126][8] = "baris %";
svgStr[127][8] = "kolom %";
svgStr[128][8] = "jumlah %";
svgStr[129][8] = "Matriks Grafik Batang";
svgStr[130][8] = "Masalah Sebelumnya";
svgStr[131][8] = "Nilai Eigen";
svgStr[132][8] = "Vektor Eigen";
svgStr[133][8] = "Tabel Frekuensi Multidimensi";
svgStr[134][8] = "Grafik Cluster Hierarki";
svgStr[135][8] = "Jarak";
svgStr[136][8] = "Tunggal";
svgStr[137][8] = "Selesai";
svgStr[138][8] = "Rata-rata";
svgStr[139][8] = "Pusat Tengah";
svgStr[140][8] = "Bangsal";
svgStr[141][8] = "Tautan";
svgStr[142][8] = "Number of Clusters <br>K";
svgStr[143][8] = "Bayes Information Criteria";
svgStr[144][8] = "Within Sum of Squares";
svgStr[145][8] = "Akaike Information Criteria";

svgStrU[1][8] = "Distribusi Binomial";
svgStrU[2][8] = "Ulangan";
svgStrU[3][8] = "Rata-rata";
svgStrU[4][8] = "Standar Deviasi";
svgStrU[5][8] = "Distribusi Poisson";
svgStrU[6][8] = "Distribusi Geometri";
svgStrU[7][8] = "Distribusi Hipergeometri";
svgStrU[8][8] = "Populasi";
svgStrU[9][8] = "Distribusi Sampel";
svgStrU[10][8] = " Hukum Bilangan Besar";
svgStrU[11][8] = "Angka";
svgStrU[12][8] = "Gambar";
svgStrU[13][8] = "Gambar Koin";
svgStrU[14][8] = "Banyaknya Gambar";
svgStrU[15][8] = "Banyaknya Ulangan";
svgStrU[16][8] = "Distribusi dari Rataan Sampel";
svgStrU[17][8] = "Ulangan";
svgStrU[18][8] = "Standar Eror";
svgStrU[19][8] = "Rata-rata Populasi";
svgStrU[20][8] = "Selang Kepercayaan";
svgStrU[21][8] = "Keakurasian Nilai Estimasi";
svgStrU[22][8] = "Rata-rata Sampel";
svgStrU[23][8] = "[TestStat]";
svgStrU[24][8] = "Distribusi";
svgStrU[25][8] = "Tolak H\u2080";
svgStrU[26][8] = "Terima H\u2080";
svgStrU[27][8] = "nilai-p";
svgStrU[28][8] = "[Keputusan] ";
svgStrU[29][8] = "[ANOVA]";
svgStrU[30][8] = "Masukkan Koefisien Korelasi dan klik Tombol Jalankan";
svgStrU[31][8] = "Regresi";
svgStrU[32][8] = "Variabel Baris";
svgStrU[33][8] = "Variabel Kolom";
svgStrU[34][8] = "Rata-rata"
svgStrU[35][8] = "Standar Deviasi"
svgStrU[36][8] = "<h3> Histogram<br>Tabel Frekuensi</h3>";
svgStrU[37][8] = "Nama Grup";
svgStrU[38][8] = "Interval";
svgStrU[39][8] = "Dahan";
svgStrU[40][8] = " Daun";
svgStrU[41][8] = "Daun Grup 1";
svgStrU[42][8] = "Daun Grup 2"
svgStrU[43][8] = "<h3>Statistika Dasar</h3>";
svgStrU[44][8] = "Amatan";
svgStrU[45][8] = "Minimum";
svgStrU[46][8] = "Median";
svgStrU[47][8] = "Maksimum";
svgStrU[48][8] = "Total";
svgStrU[49][8] = "Eksponensial";
svgStrU[50][8] = "Seragam";
svgStrU[51][8] = "Keakurasian Nilai Estimasi";
svgStrU[52][8] = "Buat titik dengan klik, lalu eStat menemukan garis regresi. ";
svgStrU[53][8] = "Pindahkan atau hapus titik. Perhatikan perubahan pada garis regresi.";
svgStrU[54][8] = "[Statistik Sampel] ";
svgStrU[55][8] = "[Sampel 1 Statistik] ";
svgStrU[56][8] = "[Sampel 2 Statistik] ";
svgStrU[57][8] = "Selang Kepercayaan";
svgStrU[58][8] = "Baris dan Kolom saling bebas/independen";
svgStrU[59][8] = "Baris dan Kolom tidak saling bebas/tidak independen";
svgStrU[60][8] = "Distribusi Empirik";
svgStrU[61][8] = "Distribusi Teoritik";
svgStrU[62][8] = "Uji Kebaikan Model untuk Frekuensi Amatan";
svgStrU[63][8] = "Uji Jumlah Peringkat Wilcoxon";
svgStrU[64][8] = "Tabel Uji Jumlah Peringkat Wilcoxon";
svgStrU[65][8] = "Uji Kruskal-Wallis";
svgStrU[66][8] = "Tabel Uji H Kruskal-Wallis";
svgStrU[67][8] = "Statistik H Kruskal-Wallis";
svgStrU[68][8] = "Uji Peringkat Bertanda Wilcoxon";
svgStrU[69][8] = "Uji Tanda";
svgStrU[70][8] = "Uji Friedman";
svgStrU[71][8] = "Statistik S Friedman";
svgStrU[72][8] = "Tabel Distribusi S Friedman";
svgStrU[73][8] = "nilai-t (atau Z)";
svgStrU[74][8] = "nilai-ChiSq";
svgStrU[75][8] = "varians sampel";
svgStrU[76][8] = "Selisih sampel rata-rata";
svgStrU[77][8] = "Rasio varians sampel";
svgStrU[78][8] = "Asumsi Varians";
svgStrU[79][8] = "Data Ringkasan";
svgStrU[80][8] = "Pilihan Berganda";
svgStrU[81][8] = "Pilih hingga dua grup";
svgStrU[82][8] = "Var X";
svgStrU[83][8] = "Var Y";
svgStrU[84][8] = "oleh";
svgStrU[85][8] = "Tidak ada variabel grup";
svgStrU[86][8] = "Data yang dipilih: ";
svgStrU[87][8] = "Data mentah";
svgStrU[88][8] = "Pilih variabel dengan mengklik nama variabel";
svgStrU[89][8] = "Nilai yang hilang";
svgStrU[90][8] = "Jumlah Pangkat";
svgStrU[91][8] = "Garis bujur";
svgStrU[92][8] = "Garis lintang";
svgStrU[93][8] = "Setidaknya terdapat satu pasang lokasi yang berbeda";
svgStrU[94][8] = "Peringkat Bertanda Wilcoxon";
svgStrU[95][8] = "Dipasangkan Var";
svgStrU[96][8] = "Data berpasangan";
svgStrU[97][8] = "Uji Independensi";
svgStrU[98][8] = "Simulasi";
svgStrU[99][8] = "Angka acak";
svgStrU[100][8] = "Distribusi normal";
svgStrU[101][8] = "Distribusi t";
svgStrU[102][8] = "Distribusi &chi;&#178;";
svgStrU[103][8] = "Distribusi F";
svgStrU[104][8] = "Distribusi HSD";
svgStrU[105][8] = "Kuartil 1";
svgStrU[106][8] = "Kuartil ke-3";
svgStrU[107][8] = "Rentang Interkuartil";
svgStrU[108][8] = "Koefisien Determinasi";
svgStrU[109][8] = "Frekuensi Relatif terakumulasi (%)";
svgStrU[110][8] = "Jumlah maksimum bilangan bulat dari Distribusi Seragam";
svgStrU[111][8] = "Pindahkan satu titik dengan mouse";
svgStrU[112][8] = "Ekstraksi restorasi";
svgStrU[113][8] = "tanpa penggantian"; 
svgStrU[114][8] = "Garis"; 
svgStrU[115][8] = "Persen Perubahan";
svgStrU[116][8] = "Indeks Sederhana";
svgStrU[117][8] = "Jeda Waktu";
svgStrU[118][8] = "Perbedaan";
svgStrU[119][8] = "Otokorelasi";
svgStrU[120][8] = "Masuk";
svgStrU[121][8] = "Akar Kuadrat";
svgStrU[122][8] = "Kotak-Cox";
svgStrU[123][8] = "Waktu dasar";
svgStrU[124][8] = "Rata-Rata Pergerakan Terpusat";
svgStrU[125][8] = "Penghalusan Eksponensial";
svgStrU[126][8] = "Median Bergerak Tengah";
svgStrU[127][8] = "Model";
svgStrU[128][8] = "Rata-rata Bergerak";
svgStrU[129][8] = "Rata-rata Pergerakan Ganda";
svgStrU[130][8] = "Holt Penghalusan Eksponensial Ganda";
svgStrU[131][8] = "Indeks Musiman";
svgStrU[132][8] = "Model Musiman Perkalian Holt-Winters";
svgStrU[133][8] = "Seri Deseasonal";
svgStrU[134][8] = "Blok";
svgStrU[135][8] = "Analisis Klaster";
svgStrU[136][8] = "Kluster";
svgStrU[137][8] = "Pohon Keputusan";
svgStrU[138][8] = "Kondisi Aturan Keputusan";
svgStrU[139][8] = "Keputusan";
svgStrU[140][8] = "Iterasi";
svgStrU[141][8] = "Grafik Paralel";
svgStrU[142][8] = "Klasifikasi";
svgStrU[143][8] = "Fungsi Klasifikasi";
svgStrU[144][8] = "Hasil Klasifikasi";
svgStrU[145][8] = "Keputusan";
svgStrU[146][8] = "Tingkat Kesalahan Klasifikasi";
svgStrU[147][8] = "Sel";
svgStrU[148][8] = "Data Pelatihan";
svgStrU[149][8] = "Pengujian Data";

// Mongolian
$message.mn = {
    "eStat : Stat Education SW": "eStat : Статистикийн боловсролын програм хангамж",
    "Home": "Нүүр хуудас",
    "Filename": "Файл",
    "Selected Variables": "Сонгогдсон хувьсагч",
    "Cancel": "Цуцлах",
    "Edit Variables": "Хувьсагчийг засварлах",
    "Level": "Түвшин",
    "ElementaryLevel": "Анхан шатны",
    "MiddleLevel": "Дунд талын",
    "HighLevel": "H",
    "UniversityLevel": "Их сургуулийн",
    "Example": "Жишээ",
    "New Sheets": "Шинэ хуудас",
    "csv Open": "csv Нээх/ эхлүүлэх",
    "www Open": "www Нээх/ эхлүүлэх",
    "json Open": "json Нээх/ эхлүүлэх",
    "csv Save": "csv Хадаглах",
    "json Save": "json Хадаглах",
    "Print Sheet": "Хуудас хэвлэх",
    "Bar Graph": "Баганан график",
    "Pie Chart": "Бялуун график",
    "Band Graph": "Туузан график",
    "Line": "Шугаман",
    "Line Graph": "Шугаман график",
    "Dot Graph": "Цэгэн график",
    "Histogram": "Гистограм",
    "Stem & Leaf Plot": "Модны их бие ба навчист (Stem & Leaf) график",
    "maxStem": "** ишний хамгийн их тоо <= 30 **",
    "Box-Whisker Plot": "Boxplot график",
    "Scatterplot": "Тархалтын график",
    "ScatterplotMatrix": "Тархалтын график Matrix",
    "Frequency Table": "Давтамжит хүснэгт",
    "Basic Statistics": "Суурь, үндсэн статистик",
    "Testing Hypothesis &mu;": "Тестэн таамаглал &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Тестэн таамаглал &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Тестэн таамаглал &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Тестэн таамаглал &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Дундаж кватрат хазайлтын шинжилгээ",
    "MiddleSchool": "Дунд сургууль",
    "HighSchool":   "Ахлах сургууль",
    "University":   "Их сургууль",
    "eStatHeading": "eStat нь динамик өгөгдлийн дүрслэл, график статистик дүн шинжилгээг ашиглан илүү сайн статистикийн боловсрол олгох вэб дээр суурилсан үнэгүй програм юм.",
    "Support":      "Дэмжлэг",
    "Donation":     "Хандив",
    "Middle School Stat Education": "Дунд сургуулийн статистикийн боловсрол",
    "High School Stat Education": "Ахлах сургуулийн статистикийн боловсрол",
    "University Stat Education": "Их сургуулийн статистикийн боловсрол ",
    "Elem Stat Graph Example": "График жишээ",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "босоо",
    "Horizontal": "хэвтээ",
    "Vertical Separated Bar": "Босоо тусгаарлагдсан багана",
    "Vertical Stacked Bar": "Босоо багц багана ",
    "Vertical Ratio Bar": "Босоо багц багана",
    "Vertical Side by Side Bar": "Босоо зэрэгцээ багана",
    "Vertical Two Sided Bar": "Босоо хоёр талт багана",
    "Horizontal Separated Bar": "Туузан завсартай диаграм",
    "Horizontal Stacked Bar": "Багцын туузан диаграм",
    "Horizontal Ratio Bar": "Харьцангуй үзүүлэлтийн туузан диаграм",
    "Horizontal Side by Side Bar": "Нийлсэн туузан диаграм",
    "Horizontal Two Sided Bar": "Хоёр талт туузан  диаграм",
    "Doughnut Graph": "Цагирган график",
    "Two Sided Stem & Leaf Plot": "Хоёр талт Үүдэл ба навчит газар график",
    "Graph Save": "График хадаглалт",
    "Graph Print": "График хэвлэлт",
    "Move to Table": "Хүснэгт рүү шилжүүлэх",
    "Edit Title": "Гарчигийг засварлах",
    "Table Save": "Хүснэгт хадаглах",
    "Table Print": "Хүснэгт хэвлэх",
    "Frequency": "Давтамж",
    "Sorting": "Эрэмблэх",
    "SortData": "Эрэмблэх",
    "Raw Data": "Бүрэн болоогүй өгөгдөл",
    "Descending": "Буурч буй",
    "Ascending": "өгсөж буй, өгсөх хандлага",
    "Mean": "Дундаж  утга",
    "Std Deviation": "Стандарт хэлбэлзэл ",
    "MeanStd": "Дундаж  утга/Стандарт хэлбэлзэл",
    "DotMeanStd": "Цэгэн график - Дундаж  утга/Стандарт хэлбэлзэл",
    "95CI": "95% Найдварт завсар",
    "CorrelationAnalysis": "Корреляцийн шинжилгээ",
    "RegressionAnalysis": "Регрессийн шинжилгээ",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "2 арга зам ANOVA",
    "Regression": "Регресси",
    "Frequency Polygon": "давтамжит олон өнцөг",
    "Execute New Interval": "Шинэ завсарыг гүйцэтгэх",
    "Interval Start": "Завсарын эхлэл",
    "Interval Width": "Завсарын өргөн",
    "t-test": "t Тестийн",
    "Z-test": "Z Тестийнт",
    "(if Z-test, enter &sigma;)": "(Хэрэв Z тест байвал сигмаг оруул &sigma;)",
    "Significance Level": "Утга учиртай түвшин",
    "Execute": "Гүйцэтгэл",
    "(Confidence Interval)": "(Найдварт завсар)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Хэрэв Z тест байвал z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178; Тест",
    "Variance Assumption": "Дундаж кватратын хазайлтын таамаглал ",
    "Variance": "хэлбэлзэл",
    "F test": "F Тестийн",
    "At least one pair of means is different": "Хамгийн багадаа л гэхэд утгын нэг хос нь өөр өөр. ",
    "Main Title": "Үндсэн гарчиг",
    "y title": "У хувьсагч",
    "x title": "Х хувьсагч",
    "yAxis": "Y тэнхлэг",
    "Modify": "Өөрчлөн сайжруулах",
    "Confirm": "Батлах ",
    "Variable Name": "Хувьсагчийн нэр",
    "Variable Value": "Хувьсагчийн утга",
    "Value Label": "Утгын нэр хаяг",
    "* Less than nine value labels allowed.": "* 9-өөс бага утгын шошго нь зөвшөөрөгдөнө",
    "Save": "Хадаглах",
    "Exit": "гарах",
    "eStatU UnivStatEdu": "eStatU - Их сургуулийн статистикийн боловсрол",
    "eStatH HighStatEdu": "eStatH - Ахлах сургуулийн статистикийн боловсрол",
    "eStatM MiddleStatEdu": "eStatM - Бага анги / Дунд сургуулийн статистик SW",
    "MiddleStat": "Дунд сургуулийн статистик",
    "HighStat":   "Ахлах сургуулийн статистик",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Цэс",
    "Binomial Experiment": "Бином туршилт",
    "Binomial Distribution": "Бином тархалт",
    "Binomial Prob Table": "Пойсоны магадлалын хүснэгт",
    "Poisson Distribution": "Пойсоны тархалт ",
    "Poisson Prob Table": "Пойсоны магадлалын хүснэгт",
    "Geometric Distribution": "Геометрийн тархалт",
    "Geometric Prob Table": "Геометрийн магадлалын хүснэгт",
    "HyperGeometric Distribution": "Хайпер геометрийн тархалт",
    "HyperGeometric Prob Table": "Хайпер геометрийн магадлалын хүснэгт",
    "Exponential Distribution": "Илтгэгчийн функцийн тархалт",
    "Normal Experiment": "Хэвийн туршилт",
    "Normal Distribution": "Хэвийн тархац",
    "Normal Approx": "Хэвийн ойролцоо утга",
    "t Distribution": "t Тархалт",
    "ChiSquare Distribution": "&chi;&#178; тархалт",
    "F Distribution": "F Тархалт",
    "Sampling": "Түүвэрлэлт",
    "Population vs Sample": "Хүн амын тооны эсрэг жишээ ",
    "Population": "Хүн ам",
    "Sample": "Жишээ",
    "Exponential": "Экспоненциал(0.3)",
    "Uniform": "Нэг төрлийн/ байнгын (0,1)",
    "UniformDist": "Нэг төрлийн/ байнгын",
    "Sample05": "Түүвэрлэлт 5%",
    "Sample10": "Түүвэрлэлт 10%",
    "Sample20": "Түүвэрлэлт 20%",
    "Statistics/BoxPlot": "Статистик/BoxPlot",
    "StatisticalProb":     "Statistical Probability",
    "Law of Large Number": "Их тооны хууль",
    "Dist of Sample Means": "Жишээ дундаж утгуудын тархалт ",
    "Sampling Distribution": "Дээж авах түгээлт",
    "Sample Size": "Жишээ хэмжээ ",
    "Confidence Interval": "Найдварт завсар ",
    "Confidence Interval Simulation": "Найдварт завсар туршилт",
    "Simulation": "туршилт",
    "Confidence Interval Mu": "Тооцоолол : &mu;",
    "Mu Confidence Interval": "Тооцоолол : &mu;",
    "Confidence Interval Sigma": "Тооцоолол : &sigma;&#178; ",
    "Confidence Interval P": "Тооцоолол : p",
    "Estimation Accuracy": "нарийвчлалыг үнэлэх",
    "Repetition": "Давтамж",
    "Confidence Level": "Найдварт түвшинl",
    "Testing Hypothesis mu_titleAB": "Дундажийн тухай таамаглалын тест",
    "Testing Hypothesis mu_title": "Дундажийн тухай таамаглалын тест",
    "Testing Hypothesis sigma_title": "Вариацийн (дисперсийн) тест",
    "Testing Hypothesis P_title": "Түүвэр тархалтын харьцангуй хэмжигдэхүүн (пропорци)-йн тухай таамаглалын тест",
    "Testing Hypothesis mu12_title": "Хоёр дундажийн тухай таамаглалын тест",
    "Testing Hypothesis sigma12_title": "Хоёр вариацийн тухай таамаглалын тест",
    "Testing Hypothesis P12_title": "Хоёр хувийн жин буюу пропорцийн тухай таамаглалын тест",
    "Testing Hypothesis muA":  "Тестэн таамаглал &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Тестэн таамаглал &mu; - C, n",
    "Testing Hypothesis mu": "Тестэн таамаглал &mu;",
    "Testing Hypothesis sigma": "Тестэн таамаглал &sigma;&#178;",
    "Testing Hypothesis P": "Тестэн таамаглал p",
    "Testing Hypothesis mu12": "Тестэн таамаглал &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Тестэн таамаглал &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Тестэн таамаглал p<sub>1</sub>, <sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Фактор ANOVA",
    "Testing Hypothesis ANOVA2": "2 Фактор ANOVA",
    "SameSampleSize": "Нүд бүрийн дээжийн хэмжээ ижил байх ёстой.",
    "Testing Independence": "Тестэн хамааралгүй байдал",
    "CategoryD": "ангилал",
    "Category": "ангилал",
    "Correlation Coefficient": "Хамаарлын коэфцеэнт ",
    "Regression Experiment": "Хамаарлын туршилт",
    "Hypothesis": "Таамаглал",
    "Test Type": "Тестийн төрөл",
    "Z-test": "Z Тестийн",
    "t-test": "t Тестийн",
    "Chi-test": "&chi;&#178; Тестийн",
    "F-test": "F Тестийн",
    "Sampling Type": "Түүвэрлэлт",
    "Independent Sample": "Үл хамааран",
    "Paired Sample": "хосолсон",
    "Sample Data": "Жишээ өгөгдөл",
    "input either sample data": "Энгийн өгөгдөл, энгийн статистикийн аль алийг нь cvs/bsv-ийг ашигласан дараагийн хайрцагт нэмж оруулах",
    "input data": "Өгөгдөл оруулах",
    "Sample Statistics": "Жишээ статистик",
    "Sample Mean": "Жишээ дундаж утга",
    "Sample Variance": "Түүврийн вариаци",
    "Sample Proportion": "жишээ харьцаа",
    "sample range": "Дээжийн хүрээ",
    "control chart": "Хяналтын диаграм",
    "if Z-test-1": "(Хэрэв Z тест байвал хүн амын дундаж кватрат хазайлтыг оруул &sigma;&#178;)",
    "if Z-test-2": "(Хэрэв Z тест z<sub>&alpha;/2 </sub> ашиглагдсан.)",
    "At least one pair": "Хамгийн багадаа л гэхэд утгын нэг хос нь өөр өөр.",
    "Row-Col-0": "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй ",
    "Row-Col-1": "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй биш",
    "Enter any number of row": "(Зүүнд дээд хэсгээс шинжилгээг оруулах)",
    "Row": "Мөр",
    "Column": "Багана",
    "Probability": "Магадлал",
    "Show Probability": "Магадлалыг харуулах",
    "Regression Line": "Хамаарлын шулуун",
    "Erase All": "Бүгдийг устгах",
    "Add Point": "санал нэмэх",
    "Erase Point": "Цэгийг устгах",
    "Reference Site": "Иш татсан цахим хуудас",
    "Lot Size": "Их хэмжээ",
    "Defect Size": "Алдаатай хэмжээ",
    "Defect Rate": "согогийн түвшин",
    "If typed": "Дугаар оруулсны дараа [Гүйцэтгэх] / [Enter]",
    "Stat/BoxPlot": "Статистик/Шигтгээ зураг",
    "Mean": "Дундаж  утга",
    "Std Dev": "Стандарт хэлбэлзэл",
    "OneGroup": "(Нэг бүлэг)",
    "AnalysisVar": "Шинжилгээ Хувьсагч",
    "AnalysisVar2": "Y Хувьсагч",
    "GroupVar": "Груп",
    "GroupVar2": "X Хувьсагчr",
    "GroupVar3": "Фактор1",
    "GroupVar4": "Фактор2",
    "AnalysisVarMu12": "Шинжилгээ(X1) Хувьсагч",
    "GroupVarMu12": "Группp(X2Хосолсон Хувьсагчs",
    "SizeVar": "Хүрээлэн буй орчин Хувьсагч",
    "RegressionBand": "Итгэх түвшин",
    "RegressionTable": "Регрессийн шинжилгээ",
    "RegressionResidual": "Үлдэгдлийн диаграм/дүрслэл",
    "RegressionResidualLeverage": "Үлдсэн -  Хөшүүрэг",
    "RegressionCook": "Cook Зай",
    "RegressionQQ": "Үлдэгдлийн диаграм/дүрслэл Q-Q",
    "HistogramNormal": "Магадлал Гистограм ",
    "HistogramChisq": "Нормал Тест",
    "HistogramNormalQQ": "Нормал Q-Q диаграм",
    "PopulationStd": "Эх олонлого Стандарт хэлбэлзэл ",
    "Type1Error": "1-р төрлийн алдаа",
    "Type2Error": "2-р төрлийн алдаа",
    "AnovaTable": "ANOVA Хүснэг",
    "AnovaMeanGraph": "Дундаж  утга Итгэх интервалl",
    "MultipleComparison": "Олон харьцуулалт",
    "ComparisonGraph": "Харьцуулах график",
    "AnovaResidual": "Үлдэгдлийн диаграм/дүрслэл",
    "AnovaQQ": "Үлдэгдлийн диаграм/дүрслэл Q-Q ",
    "TestingFit": "Fit Test-ийн сайн сайхан байдал",
    "FitTest0": "Ажиглагдсан & онолын тархалт нь адил байна",
    "FitTest1": "Ажиглагдсан & онолын тархалт нь өөр өөр байдагt",
    "ObservedFreq": "Ажиглагдсан давтамж O",
    "ExpectedProb": "Хүлээгдэж буй магадлал p",
    "ExpectedFreq": "Хүлээгдэж буй давтамж E(>5)",
    "InputFitData": "Зүүн дээд нүднээс эсийг оруулна уу",
    "ExecuteTable": "Статистик",
    "MeanDotGraph": "Итгэмжлэлийн интервалын график",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Фактор",
    "Interaction": "Харилцаа холбоо",
    "NoInteraction": "Харилцан яриа үгүй",
    "ExistInteraction": "Харилцан холбоо үүсгэх",
    "eStatLecture": "eStat Лекцийн танилцуулга",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Wilcoxon Дундаж дүн шинжилгээt", 
    "NonParametricMu12": "Wilcoxon Дундаж дүн шинжилгээ : Байршлын параметрr M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Дундаж дүн шинжилгээ",
    "Sample Range": "Дугаар Сар",
    "DistributionTable": "Түгээлт Хүснэгтe",
    "SignedRankTestDist": "Wilcoxon Гарын үсгийн нийт дүнгийн жагсаалт",
    "WilcoxonTestDist": "Wilcoxon Сумын түгээлтийн зэрэглэл",
    "KruskalTestDist": "Kruskal-Wallis H Түгээлт",
    "FriedmanTestDist": "Friedman S Түгээлт",
    "SignedRankTest": "Нэвтрэв Дундаж дүн шинжилгээ",
    "SignTest": "Тестийн тэмдэгt",
    "SignCount": "Дугаар тэмдэгt",
    "KruskalTest": "Kruskal-Wallis Туршилт",
    "KruskalTestANOVA": "Kruskal-Wallis Туршилт",
    "Total": "Нийт",
    "FriedmanTest": "Friedman Туршилт",
    "FriedmanTestANOVA": "Friedman Туршилт",
    "Block": "Блок",
    "Treatment": "Эмчилгээ",
    "At least one locations is different": "Наад зах нь нэг хос байршил өөр байна",
    "SignCondition": "хэрэв n ≤ 100 Binomial Туршилт,  n > 100 Normal Тооцоолол",
    "WilcoxonSignCondition": "хэрэв n≤ 20 Wilcoxon Дундаж дүн шинжилгээ,  n > 20 Normal Тооцоолол",
    "WilcoxonRankCondition": "v n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Дундаж дүн шинжилгээ,  n>25 Normal Тооцоолол",
    "KruskalCondition": "хэрэв n≤ 10 H Түгээлт Тест,  else &chi;&#178; Тооцоолол",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Хувьсах сонголт",
    "VariableSelect4": "Илүү их дүн шинжилгээ хийх хувьсагчдыг сонгож болно",
    "VariableSelect5": "Илүү олон X хувьсагчийг сонгож болно",
    "SummaryData": "Хураангуй мэдээлэл",
    "RawData": "Түүхий мэдээлэл",
    "MultiSelect": "",
    "DataType": "(Хувьсагчийн нэр дээр дарж хувьсагч сонго)",
    "by": "by",
    "NameVar": "Хувьсах нэр",
    "n_variance": "n-1 томъёо",
    "RandomNumber": "санамсаргүй тоо",
    "RealNumber":     "Бодит тоо",
    "IntegerNumber":  "Бүхэл тоо",
    "NumberData":     "Өгөгдлийн тоо",
    "NumberDigit":    "Дижитал тоо",
    "NormalTable":    "Хэвийн хуваарилах хүснэгт",
    "Percentile":     "Хувь Хүснэгт",
    "PercentileValue": "Хувь Хүснэгт",
    "StudentRangeDist": "HSD Range тархац",
    "copy link": "хуулбар холбоос",
    "WithoutReplacement": "орлуулахгүйгээр",
    "WithReplacement":    "Сэргээлтийн олборлолт",
    "Replacement":     "Сэргээлтийн олборлолт",
    "NonReplacement":  "орлуулахгүйгээр",
    "WordCloud":       "Word Cloud (Англи)",
    "oneColor":        "өнгө",
    "defaultColor":    "анхдагч өнгө",
    "RelativeFreq":    "Харьцангуй давтамж",
    "Density":         "Нягт",
    "MarginOfError":   "Алдааны хэмжээ",
    "Permutation":     "Зөвшөөрөл",
    "PermutationSame": "Үүнтэй ижил зүйл хийх",
    "Combination":     "Хослол",
    "NumberOfCase":    "Хэргийн тоо",
    "BinomialTheorem": "Хоёртын теорем",
    "PascalTriangle":  "Паскаль гурвалжин",
    "Character":       "Emoji",
    "AdditionRule":      "Магадлалын нэмэх дүрэм",
    "MultiplicationRule":"Магадлалын үржүүлэх дүрэм",
    "ConditionalProb":   "Нөхцөлт магадлал",
    "JointProb":         "Хамтарсан магадлал",
    "DiscreteDist":      "Дискрет хуваарилалт",
    "Categorize":        "Ангилах",
    "Recode":            "Дахин кодлох",
    "Compute":           "Тооцоолох",
    "SelectIf":          "Хэрэв сонгоно уу",
    "InfoValueLabel":    "*** Хувьсагчийг сонгоод, хувьсагчийн нэр ба/эсвэл утгын шошгыг оруулна уу.",
    "InfoSorting":       "*** Эрэмбэлэх хувьсагчийг сонгоод 3 хүртэлх хувьсагчийг эрэмбэлэх аргыг оруулна уу.",
    "InfoCategorize":    "*** Ангилалд хувьсагчийг сонгоод Интервалын эхлэл болон Интервалын өргөн-г оруулна уу.",
    "InfoRecode":        "*** Дахин кодлох хувьсагчийг сонгоод 'Шинэ утга'-г оруулна уу.",
    "InfoRecode2":       "* 9 хүртэлх утгыг бичихийг зөвшөөрөх.",
    "InfoCompute":       "*** Доорх товчлууруудыг ашиглан тооцоолох томъёо үүсгэ.",
    "InfoSelectIf":      "*** 3 хүртэлх хувьсагчийг сонгоод нөхцөлийг нь оруулна уу.",
    "SortingVariable":   "Хувьсагчдыг эрэмбэлэх",
    "SortingMethod":     "Ангилах арга",
    "NewVariable":       "Шинэ хувьсагч",
    "CategoryVariable":  "Хувьсагчийг ангилах",
    "CategoryListCheck": "Ангиллын жагсаалтыг шалгах",
    "CategoryInterval":  "Ангиллын интервал",
    "CategoryLabel":     "Ангиллын шошго",
    "RecodeVariable":    "Хувьсагчийг дахин кодлох",
    "CurrentValue":      "Одоогийн үнэ цэнэ",
    "NewValue":          "Шинэ үнэ цэнэ",
    "ComputeFormula":    "Томъёо",
    "SelectVariable":    "Сонгох хувьсагч<br>",
    "RelationOperator":  "Харилцаа<br>оператор",
    "SelectValue":       "Үнэ цэнэ",
    "MissingValue":      "утга алга",
    "option":            "сонголт",                                             
    "TimeSeries":        "Цагийн цуврал",
    "Smoothing":         "гөлгөр болгох",
    "Filtering":         "Шүүх",
    "Transformation":    "Өөрчлөлт",
    "Weight":            "Жин",
    "PercentChange":     "Өөрчлөлтийн хувь",
    "WeightedIndex":     "Энгийн индекс",
    "BaseTime":          "Үндсэн цаг",
    "LagTime":           "Хоцрох хугацаа",
    "Lag":               "Цаг хугацааны хоцрогдол",
    "Forecasting":       "Урьдчилан мэдээлэх",
    "SeasonalModel":     "Улирлын загвар",
    "HoltWinter":        "Холт-Өвлийн улирлын загвар",
    "Trend":             "Тренд",
    "Seasonal":          "Улирлын чанартай",
    "Deseasonal":        "Улиралгүй цуврал",
    "Nseason":           "Улиралын цаг",
    "Irregular":         "Тогтмол бус",
    "TrendModel":        "Тренд загвар улирлын бус",
    "RegressionModel":   "Регрессийн загвар",
    "ForecastingPeriod": "Урьдчилан таамаглах хугацаа",
    "CreateTable":       "Өгөгдлийн хүснэгт",
    "SaveTable":         "Хүснэгтийг хадгалах",
    "MA":                "Хөдөлгөөнт дундаж",
    "EWMA":              "EWMA загвар",
    "CenterMA":          "Төвлөрсөн хөдөлгөөнт дундаж",
    "MovingMedian":      "Төвлөсөн хөдөлгөөнт медиан",
    "ES":                "Экспоненциал тэгшитгэх",
    "Default":           "Өгөгдмөл",
    "Linear":            "шугаман",
    "Quadratic":         "Квадрат",
    "Cubic":             "куб",
    "SquareRoot":        "Квадрат язгуур",
    "Log":               "Логарифм",
    "Exponent":          "Экспоненциал",
    "Power":             "Хүч",
    "BoxCox":            "Бокс-Кокс",
    "SingleMA":          "Нэг хөдөлгөөнт дундаж",
    "SingleES":          "Нэг экспоненциал тэгшитгэх",
    "DoubleMA":          "Давхар хөдөлгөөнтэй дундаж",
    "DoubleES":          "Давхар экспоненциал тэгшитгэх",
    "HoltLinear":        "Холт экспоненциал тэгшитгэх",
    "DeseasonIntercept": "Улирлын бус тасалдал",
    "DeseasonSlope":     "Улирлын бус налуу",
    "SeasonalIndex":     "Улирлын индекс",
    "Diff":              "Ялгаа",
    "DiffTime":          "Өөр цаг",
    "AR":                "Авторегрессив загвар",
    "ResultTable":       "Регрессийн үр дүн",
    "ForecastTable":     "Урьдчилан таамаглах хүснэгт",
    "HoltLevel":         "Түвшин",
    "HoltTrend":         "Тренд",
    "AutoCorrTable":     "Автокорреляцийн хүснэгт",
    "DiffSeries":        "Ялгаатай цуврал",
    "RawSeries":         "Түүхий цуврал",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Mongolian
appStr[0][9] = "/estat/eStat/index.html";
appStr[1][9] = "/estat/eStatH/index.html";
appStr[2][9] = "/estat/eStatU/index.html";
appStr[3][9] = "/estat/eStatE/index_en.html";
appStr[4][9] = "/estat/eHelp/index_en.html";
appStr[5][9] = "index.html";
appStr[6][9] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][9] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][9] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][9] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][9] = "";
appStr[11][9] = "Large Population Country";
appStr[12][9] = "Life Expectancy (OECD)";
appStr[13][9] = "Population Pyramid (Korea)";
appStr[14][9] = "GNP per Capita (OECD)";
appStr[15][9] = "Top World Export Country";
appStr[16][9] = "Obesity % of Population";
appStr[17][9] = "Temperature of Major City";
appStr[18][9] = "Top CO2 Emission Country";
appStr[19][9] = "Alcohol Consume (OECD)";
appStr[20][9] = "Continuous Data Graph";
appStr[21][9] = "Length of Otter";
appStr[22][9] = "Age of Teacher";
appStr[23][9] = "Age of Teacher by Sex";
appStr[24][9] = "Cleanliness of Tooth";
appStr[25][9] = "Math Exam Scores";
appStr[26][9] = "Calorie of Hamberger";
appStr[27][9] = "Height vs Weight by Sex";
appStr[28][9] = "Discrete Data Graphs";
appStr[29][9] = "";
appStr[30][9] = "";
appStr[31][9] = "unit";
appStr[32][9] = "Country";
appStr[33][9] = "Male";
appStr[34][9] = "Female";
appStr[35][9] = "Age";
appStr[36][9] = "Person";
appStr[37][9] = "billion $";
appStr[38][9] = "Export";
appStr[39][9] = "Obesity %";
appStr[40][9] = "Celsius";
appStr[41][9] = "City";
appStr[42][9] = "Jan High";
appStr[43][9] = "Jul High";
appStr[44][9] = "million ton";
appStr[45][9] = "liter/year";
appStr[46][9] = "Alcohol";
alertMsg[1][9] = "Нэг сонгогдсон хувьсагч нь өгөгдөл байхгүй ";
alertMsg[2][9] = "Судалгаа шинжилгээнд хувьсагчуудыг нэг нэгээр сонгох. Хэрэв эхнийх нь 2 хувьсагч бол групп хувьсагч болно.";
alertMsg[3][9] = "Сонгогдсон хувьсагчаас өгөгдөл орхигдсон.";
alertMsg[4][9] = "Хэрэв сонгогдсон хувьсагчуудын туршилтууд / үр дүнгүүд/ өөр өөр бол шинжилгээ зөвшөөрөгдөхгүй";
alertMsg[5][9] = "Маш их группууд! Графикууд нь дэлгэцийн хэмжээнд хэт давхцсан байж магадгүй.";
alertMsg[6][9] = "Хэрэв хураангуйлсан өгөгдлийн шинжилгээний хувьсагч нь тэмдэгт, статистикийн судалгаа, эсвэл байгуулсан хүснэгт агуулсан бол хүлээн зөвшөөрөгдөхгүй";
alertMsg[7][9] = "Нэг мөрөн дэх өгөгдөлөөс хэрэв гурваас илүү хувьсагч сонгогдвол шинжилгээ болон хүснэгт үүсгэх нь зөвшөөрөгдөхгүй";
alertMsg[8][9] = "Хэрэв шинжилгээний тоо нь 200 гаас баг үед цэгэн график зөвшөөрөгдөнө ";
alertMsg[9][9] = "Хэрэв ажиглалтын тоо 100-аас бага болStem & Leaf Plot график нь зөвшөөрөгдөнө";
alertMsg[10][9] = "Шинжилгээний хувьсагч сонгогдоогүй байна..";
alertMsg[11][9] = "Шинжилгээ / Бүлгийн хувьсагч сонгогдоогүй байна.";
alertMsg[12][9] = "Хэрэв судалгааны хувьсагч нь тэмдэгт, судалгаа, хүснэгт агуулсан бол хүлээн зөвшөөрөгдөхгүй";
alertMsg[13][9] = "";
alertMsg[14][9] = "Үргэлжилсэн график болон тестийн таамаглалын хувьд хураангуй өгөгдөл нь зөвшөөрөгдөхгүй ";
alertMsg[16][9] = "Энэ туршилтын таамаглалд зөвхөн 2 групп зөвшөөрөгдөнө";
alertMsg[17][9] = "Тархалтын график нь хамгийн багадаа х болон у хувьсагч шаардана";
alertMsg[18][9] = "Гурван хувьсагчийг зөвшөөрөхгүй";
alertMsg[19][9] = "Хэрэв өгөгдөлд шинж чанар байгаа бол шинжилгээг хийх боломжгүй ";
alertMsg[20][9] = "Хэрэв X/Y хувьсагч дээр тэмдэгт байвал тархалтын график зурагдахгүй ";
alertMsg[21][9] = "Хэрэв өгөгдөл орхигдсон бол хадаглах нь зөвшөөрөгдөхгүй ";
alertMsg[22][9] = "Хэрэв сөрөг тоо байвал bargraph зурж болохгүй.";
alertMsg[25][9] = "Хэрэв зөвхөн нэг групп байвал овоорсон /бүгд багтсан/ баганан график зөвшөөрөгдөхгүй";
alertMsg[27][9] = "Хэрэв зөвхөн нэг групп байвал харьцаатай баганан график зөвшөөрөгдөхгүй ";
alertMsg[29][9] = "Хэрэв зөвхөн нэг групп байвал зэрэгцээ баганан график зөвшөөрөгдөхгүй";
alertMsg[31][9] = "Хэрэв зөвхөн нэг групп байвал хоёр талт баганан график зөвшөөрөгдөхгүй ";
alertMsg[32][9] = "Хэрэв сөрөг тоо байвал бялуу хүснэгт зурагдаж чадахгүй ";
alertMsg[33][9] = "Хэрэв сөрөг тоо байвал цагирган график зурагдаж чадахгүй";
alertMsg[34][9] = "Хэрэв сөрөг тоо байвал band график зурагдаж чадахгүй";
alertMsg[35][9] = "Хэрэв сөрөг тоо байвал давтамжийн хүснэгт зурагдаж чадахгүй ";
alertMsg[36][9] = "Энэ баганан график нь зөвхөн хоёр группын тухайд зөвшөөрөгдөнө";
alertMsg[37][9] = "Энэ тестэн таамаглал нь зөвхөн нэг хувьсагчийн тухайд зөвшөөрөгдөнө ";
alertMsg[38][9] = ".. бол NAN. Утгыг оруулаад дахин оролд.";
alertMsg[39][9] = "Стандарт хэлбэлзэл нь 0 эсвэл NAN-ийн аль аль нь. Дахин оролд!";
alertMsg[40][9] = "Дундаж кватратын хазайлтын орц нь NAN. Утгыг оруулаад дахин оролд. ";
alertMsg[41][9] = "Энэ тестэн таамаглал нь зөвхөн хоёр хувьсагчийн хувьд зөвшөөрөгдөнө. Групп хувьсагч нь зөвхөн хоёр групптэй байсан дээр. ";
alertMsg[42][9] = "Тестэн таамаглалын гарчигийг засварлах нь зөвшөөрөгдөхгүй";
alertMsg[43][9] = "Энгийн шугаман регресс нь зөвхөн нэг гуйлт юм";
alertMsg[44][9] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][9] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][9] = "Ижил хувьсагчийн дугаар сонгогдсон байна.";
alertMsg[47][9] = "Давтамж дахь тэмдэгтийн өгөгдлийг зөвшөөрөхгүй !! Дахин оролдоно уу.";
alertMsg[48][9] = "Тэмдэгтийн өгөгдлийг зөвшөөрөхгүй !! Дахин оролдоно уу.";
alertMsg[49][9] = "Ажиглалтын тоо 100-аас бага байх ёстой !! Дахин оролдоно уу.";
alertMsg[50][9] = "Интервалын эхлэл эсвэл алхамд тоо оруулна уу.";
alertMsg[51][9] = "Тоо оруулна уу / Мөрний тоо ижил байх ёстой!! Дахин оролдоно уу.";
alertMsg[52][9] = "Ангилал, давтамжийн дугаарыг оруулна уу.";
alertMsg[53][9] = "Интервалын хэмжээ ижил биш байна !! Дахин оролдоно уу.";
alertMsg[54][9] = "X ажиглалт нь Y ажиглалттай тэнцүү биш юм !! Дахин оролдоно уу.";
alertMsg[55][9] = "!!! Хуудас дээр өгөгдөл байхгүй.";
alertMsg[56][9] = "!!! Ямар ч хувьсагч сонгогдоогүй";
alertMsg[57][9] = "!!! Интервалын эхлэл ба өргөнийг оруулна уу";
alertMsg[58][9] = "!!! Тоон интервалын эхлэл ба интервалын өргөнийг оруулна уу";
alertMsg[59][9] = "!!! 9-өөс дээш интервал - Интервалын өргөнийг өөрчлөх";
alertMsg[60][9] = "!!! Энэ хувьсагч нь 9-өөс дээш утгатай байна";
alertMsg[61][9] = "!!! Ямар ч утга оруулаагүй";
alertMsg[62][9] = "!!! Томъёо оруулна уу";
alertMsg[63][9] = "!!! Нөхцөлийг хангасан өгөгдөл байхгүй.";
alertMsg[64][9] = ""; 
alertMsg[65][9] = ""; 
alertMsg[66][9] = ""; 
alertMsg[67][9] = ""; 
alertMsg[68][9] = "";
alertMsg[69][9] = "";

svgStr[1][9] = " Баганан график";
svgStr[2][9] = " Бялуун график";
svgStr[3][9] = " Цагирган график";
svgStr[4][9] = " Туузан график";
svgStr[5][9] = " Шугаман график";
svgStr[6][9] = " Цэгэн график";
svgStr[7][9] = " Шигтгээ зураг";
svgStr[8][9] = " Иш болон навчит газар";
svgStr[9][9] = " Гистограм ";
svgStr[10][9] = " Тархалтын график";
svgStr[11][9] = " Тестэн таамаглал : Хүн амын дундаж утга ";
svgStr[12][9] = " Тестэн таамаглал : Хүн амын дундаж кватрат хазайлт";
svgStr[13][9] = " Тестэн таамаглал : Хоёр хүн амын тооны дундаж";
svgStr[14][9] = " Тестэн таамаглал : Хоёр хүн амын тооны дундаж кватрат хазайлт";
svgStr[15][9] = " Дундаж кватрат хазайлтын шинжилгээ";
svgStr[16][9] = "Давтамж";
svgStr[17][9] = "Харьцаа";
svgStr[18][9] = "Групп ";
svgStr[19][9] = " ";
svgStr[20][9] = "Хураангуй, товч  Өгөгдөл <br> Давтамжит хүснэгт";
svgStr[21][9] = "Группын хувьсагч";
svgStr[22][9] = "Мөрийн хувьсагч ";
svgStr[23][9] = "Нийлбэр ";
svgStr[24][9] = "Хүрээлэн буй орчин";
svgStr[25][9] = "<h3>Давтамжит хүснэгт</h3>";
svgStr[26][9] = "Вариацийн шинжилгээ";
svgStr[27][9] = "Хувьсагчийн утга ";
svgStr[28][9] = "Утгын нэр хаяг";
svgStr[29][9] = "Давтамж ";
svgStr[30][9] = "Харьцангуй давтамж";
svgStr[31][9] = "<h3>Солбисон хүснэгт</h3>";
svgStr[32][9] = "Баганан хувьсагч ";
svgStr[33][9] = "Мөрийн хувьсагч";
svgStr[34][9] = "Дундаж  утга"
svgStr[35][9] = "Стандарт хэлбэлзэл "
svgStr[36][9] = "<h3> Гистограм <br>Давтамжит хүснэгт</h3>";
svgStr[37][9] = "Группын нэр";
svgStr[38][9] = "Завсар";
svgStr[39][9] = "Иш";
svgStr[40][9] = " Навчист /график/";
svgStr[41][9] = "Группp 1  Навчист";
svgStr[42][9] = "Групп 2  Навчист"
svgStr[43][9] = "<h3>Суурь, үндсэн статистик</h3>";
svgStr[44][9] = "Ажиглалт";
svgStr[45][9] = "Хамгийн бага";
svgStr[46][9] = "Гол нь , голийн утга";
svgStr[47][9] = "Хамгийн их ";
svgStr[48][9] = "Нийлбэр ";
svgStr[49][9] = "<h3>Нормал тархалтын тест</h3>";
svgStr[50][9] = "Хүлээгдэж буй давтамж > 5";
svgStr[51][9] = "&chi;&#178; Тест<br>Интервал i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][9] = "Өгөгдөл<br>Ажиглалтын давтамж<br>(O<sub>i</sub>)";
svgStr[53][9] = "Нормал тархалт<br>Хүлээгдэж буй магадлал<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][9] = "Нормал тархалт<br>Хүлээгдэж буй давтамж<br>(E<sub>i</sub>)";
svgStr[55][9] = "Интервал<br>&chi;&#178; Утга<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][9] = "&chi;&#178; Утга";
svgStr[57][9] = "Магадлал Гистограм";
svgStr[58][9] = "Нормал Q-Q диаграм";
svgStr[59][9] = "Нормал Quantile";
svgStr[60][9] = "Хамаарлын коэфцеэнт ";
svgStr[61][9] = "Детерминацийн коэффициент";
svgStr[62][9] = "Стандарт алдаа ";
svgStr[63][9] = "Хувьсагчийн";
svgStr[64][9] = "Хувьсагчийн нэр ";
svgStr[65][9] = "Үл хамааран хувьсагч";
svgStr[66][9] = "Хамааран хувьсагч";
svgStr[67][9] = "Параметр буюу эх олонлогийн утга";
svgStr[68][9] = "Тооцооны утга";
svgStr[69][9] = "Утга";
svgStr[70][9] = "Огтолцоо";
svgStr[71][9] = "Регрессийн шулууны налалт буюу өнцөг";
svgStr[72][9] = "Фактор";
svgStr[73][9] = "Хэлбэлзлийн квадратуудын нийлбэр";
svgStr[74][9] = "Чөлөөний зэргүүд";
svgStr[75][9] = "Квадратуудын дундаж утга";
svgStr[76][9] = "Хамаарал ";
svgStr[77][9] = "Алдаа";
svgStr[78][9] = "Нийлбэр ";
svgStr[79][9] = "<h3>Регрессийн шинжилгээ</h3>";
svgStr[80][9] = "Үлдэгдлийн стандартчилсан утга Q-Q диаграм";
svgStr[81][9] = "Үлдэгдлийн стандартчилсан утга";
svgStr[82][9] = "Нормал Quantile";
svgStr[83][9] = "Үлдэгдлийн диаграм/дүрслэл";
svgStr[84][9] = "Хүлээгдэж/таамаглаж буй утга";
svgStr[85][9] = "Two way ANOVA";
svgStr[86][9] = "Итгэх интервал График";
svgStr[87][9] = "Үлдэгдэл";
svgStr[88][9] = "хоёр хэмжээст статистик";
svgStr[89][9] = "Scatter Plot Matrix";
svgStr[90][9] = "Олон харьцуулалт";
svgStr[91][9] = "Статистикf";
svgStr[92][9] = "Фактор";
svgStr[93][9] = "Түвшин";
svgStr[94][9] = "Хосолсон өгөгдлийн график";
svgStr[95][9] = "Үлдсэн vs Plot таамаглал";
svgStr[96][9] = "Үлдсэн vs Хөшүүрэг plot";
svgStr[97][9] = "Cook Зайн график";
svgStr[98][9] = "Cook Зай";
svgStr[99][9] = "Өгөгдлийн дараалал";
svgStr[100][9]= "Дундаж ялгаа";
svgStr[101][9]= "Тест хийх";
svgStr[102][9]= "Эмчилгээ";
svgStr[103][9]= "Харилцаа холбоо";
svgStr[104][9]= "Бүгд";
svgStr[105][9]= "Багана Нийт";
svgStr[106][9]= "Олон харилцан хамаарлын коэффициент";
svgStr[107][9]= "<h3>Корреляцийн шинжилгээ</h3>";
svgStr[108][9]= "Корреляцийн матриц";
svgStr[109][9]= "Фактор A - Фактор B Mean Graph";
svgStr[110][9]= "Хөшүүрэг";
svgStr[111][9]= "Газар зүйн мэдээллийн график";
svgStr[112][9]= "Хүрээ";
svgStr[113][9]= "Дундаж  утга - Стандарт хэлбэлзэл график";
svgStr[114][9]= "Хүн амын дундаж кватрат хазайлт";
svgStr[115][9]= "таамаглал";
svgStr[116][9]= "Туршилт";
svgStr[117][9]= "хэлбэлзэл";
svgStr[118][9]= "Интервал утга";
svgStr[119][9]= "ангилал";
svgStr[120][9] = "Гэрэм";
svgStr[121][9] = "Ковариац";
svgStr[122][9] = "Паскалын гурвалжин";
svgStr[123][9] = "Хамтарсан магадлал";
svgStr[124][9] = "Нөхцөлт";
svgStr[125][9] = "Дискрет хуваарилалт";
svgStr[126][9] = "мөр %";
svgStr[127][9] = "багана %";
svgStr[128][9] = "нийт %";
svgStr[129][9] = "Бадан график матриц";
svgStr[130][9] = "Өмнө нь шалгах";
svgStr[131][9] = "Өөрийн утга";
svgStr[132][9] = "Өөрийн вектор";
svgStr[133][9] = "Олон хэмжээст давтамжийн хүснэгт";
svgStr[134][9] = "Шаталсан кластер график";
svgStr[135][9] = "Зай";
svgStr[136][9] = "Ганц бие";
svgStr[137][9] = "Бүрэн";
svgStr[138][9] = "Дундаж";
svgStr[139][9] = "Центроид";
svgStr[140][9] = "Тойрог";
svgStr[141][9] = "Холбоос";
svgStr[142][9] = "Number of Clusters <br>K";
svgStr[143][9] = "Bayes Information Criteria";
svgStr[144][9] = "Within Sum of Squares";
svgStr[145][9] = "Akaike Information Criteria";

svgStrU[1][9] = "Бином тархалт ";
svgStrU[2][9] = "Давтамж";
svgStrU[3][9] = "Дундаж  утга";
svgStrU[4][9] = "Стандарт хэлбэлзэл";
svgStrU[5][9] = "Пойсоны тархалт ";
svgStrU[6][9] = "Геометрийн тархалт";
svgStrU[7][9] = "Хайпер геометрийн тархалт";
svgStrU[8][9] = "Хүнам";
svgStrU[9][9] = "Жишээ тархалт";
svgStrU[10][9] = "Их тооны хууль";
svgStrU[11][9] = "Үзүүр сүүл хэсэг";
svgStrU[12][9] = "Дээд, толгой хэсэг";
svgStrU[13][9] = "Зоосны тоо тал";
svgStrU[14][9] = "Эхний хэсгийн тоо";
svgStrU[15][9] = "Туршилтын тоо";
svgStrU[16][9] = "Жишээ дундаж утгуудын тархалт";
svgStrU[17][9] = "Давтамж";
svgStrU[18][9] = "Стандарт алдаа";
svgStrU[19][9] = "Хүн амын дундаж утга";
svgStrU[20][9] = "Найдварт завсар";
svgStrU[21][9] = "нарийвчлалыг үнэлэх";
svgStrU[22][9] = "Жишээ дундаж утга";
svgStrU[23][9] = "[Тестийн статистик]";
svgStrU[24][9] = "Тархалт";
svgStrU[25][9] = "Хүчингүй таамаглалаас татгалзах / Null таамаглал/";
svgStrU[26][9] = "Hull таамаглалыг хүлээн авах ";
svgStrU[27][9] = "п-утга";
svgStrU[28][9] = "[шийдвэр] ";
svgStrU[29][9] = "[Дундаж кватрат хазайлтын шинжилгээ]";
svgStrU[30][9] = "Хамааралын коеффициент оруулах болон гүйцэтгэх товчийг дарах";
svgStrU[31][9] = "Хамаарал";
svgStrU[32][9] = "Мөрийн хувьсагч ";
svgStrU[33][9] = "Баганан хувьсагч";
svgStrU[34][9] = "Дундаж  утга"
svgStrU[35][9] = "Стандарт хэлбэлзэл"
svgStrU[36][9] = "<h3> Гистограм <br>Давтамжит хүснэгт</h3>";
svgStrU[37][9] = "Группын нэр";
svgStrU[38][9] = "Завсар";
svgStrU[39][9] = "Иш";
svgStrU[40][9] = " Навчист /график/";
svgStrU[41][9] = "Групп 1  Навчист /график/";
svgStrU[42][9] = "Групп 2  Навчист /график/"
svgStrU[43][9] = "<h3>Суурь, үндсэн статистик</h3>";
svgStrU[44][9] = "Ажиглалт";
svgStrU[45][9] = "Хамгийн бага";
svgStrU[46][9] = "Гол нь , голийн утга";
svgStrU[47][9] = "Хамгийн их ";
svgStrU[48][9] = "Нийлбэр";
svgStrU[49][9] = "Илтгэгчийн функцийн";
svgStrU[50][9] = "Нэг төрлийн/ байнгын";
svgStrU[51][9] = "нарийвчлалыг үнэлэх";
svgStrU[52][9] = "- Нэг даралтаар цэгүүдийг үүсгээд е-Стат нь хамаарлын шулууныг олно";
svgStrU[53][9] = "- Цэгийг шилжүүлэх болон устгах. Хамаарлын шулууны өөрчлөлийг ажиглах";
svgStrU[54][9] = "[Жишээ статистик] ";
svgStrU[55][9] = "[Жишээ 1 статистик] ";
svgStrU[56][9] = "[Жишээ 2 статистик] ";
svgStrU[57][9] = "Найдварт түвшин ";
svgStrU[58][9] = "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй ";
svgStrU[59][9] = "Мөр ба Кол хамааралтай";
svgStrU[60][9] = "Ажиглагдсан хуваарилалт";
svgStrU[61][9] = "Онолын тархалт";
svgStrU[62][9] = "Ажиглагдсан давтамжийн шалгуурт нийцсэн байдал";
svgStrU[63][9] = "Wilcoxon Дундаж дүн шинжилгээ";
svgStrU[64][9] = "Wilcoxon Дундаж сумын тестийн хүснэгт";
svgStrU[65][9] = "Kruskal-Wallis Туршилт";
svgStrU[66][9] = "Kruskal-Wallis H Туршилтын хүснэгт";
svgStrU[67][9] = "Kruskal-Wallis H Статистик";
svgStrU[68][9] = "Wilcoxon Гарын үсэг зурах шалгуур";
svgStrU[69][9] = "Sign Туршилт";
svgStrU[70][9] = "Friedman Туршилт";
svgStrU[71][9] = "Friedman S Статистик";
svgStrU[72][9] = "Friedman S Түгээлт Хүснэгт";
svgStrU[73][9] = "t-утга (Z)";
svgStrU[74][9] = "ChiSq-утга";
svgStrU[75][9] = "Түүврийн вариаци";
svgStrU[76][9] = "түүврийн аргын ялгаа";
svgStrU[77][9] = "дээжийн хэлбэлзлийн харьцаа";
svgStrU[78][9] = "Дундаж кватратын хазайлтын таамаглал";
svgStrU[79][9] = "Хураангуй мэдээлэл";
svgStrU[80][9] = "Олон сонголт";
svgStrU[81][9] = "Хоёр бүлэг сонгох";
svgStrU[82][9] = "X хувьсагч";
svgStrU[83][9] = "Y хувьсагч";
svgStrU[84][9] = "by";
svgStrU[85][9] = "Бүлгэм хувьсагч байхгүй";
svgStrU[86][9] = "Сонгосон мэдээлэл: ";
svgStrU[87][9] = "Түүхий мэдээлэл";
svgStrU[88][9] = "Хувьсагчийн нэр дээр дарж хувьсагч сонго";
svgStrU[89][9] = "Үнэ цэнэ байхгүй байна";
svgStrU[90][9] = "Дугаар Сар";
svgStrU[91][9] = "Урттай";
svgStrU[92][9] = "өргөрөг";
svgStrU[93][9] = "Наад зах нь нэг хос байршил өөр байна";
svgStrU[94][9] = "Wilcoxon Гарын үсэг зурах шалгуур";
svgStrU[95][9] = "хосолсон";
svgStrU[96][9] = "хосолсон өгөгдөл";
svgStrU[97][9] = "Тестэн хамааралгүй байдал";
svgStrU[98][9] = "Загварчлал";
svgStrU[99][9] = "Санамсаргүй тоо";
svgStrU[100][9] = "Хэвийн тархалт";
svgStrU[101][9] = "t Түгээлт";
svgStrU[102][9] = "&chi;&#178; Түгээлт";
svgStrU[103][9] = "F Түгээлт";
svgStrU[104][9] = "HSD Түгээлт";
svgStrU[105][9] = "1-р Квартет";
svgStrU[106][9] = "3-р Квартет";
svgStrU[107][9] = "Interquartile Range";
svgStrU[108][9] = "Тодорхойлох коэффициент";
svgStrU[109][9] = "Хуримтлагдсан давтамж (%)";
svgStrU[110][9] = "Uniform Distribution бүхэл тоо";
svgStrU[111][9] = "Хулганы тусламжтайгаар цэгийг шилжүүл";
svgStrU[112][9] = "Сэргээлтийн олборлолт";
svgStrU[113][9] = "орлуулахгүйгээр"; 
svgStrU[114][9] = "Шугаман"; 
svgStrU[115][9] = "Хувийн өөрчлөлт";
svgStrU[116][9] = "Энгийн индекс";
svgStrU[117][9] = "Цагийн хоцрогдол";
svgStrU[118][9] = "Ялгаа";
svgStrU[119][9] = "Автокорреляци";
svgStrU[120][9] = "Бүртгэл";
svgStrU[121][9] = "Дөрвөлжин үндэс";
svgStrU[122][9] = "Бокс-Кокс";
svgStrU[123][9] = "Үндсэн хугацаа";
svgStrU[124][9] = "Төвлүүлсэн дундаж";
svgStrU[125][9] = "Экспоненциал тэгшитгэх";
svgStrU[126][9] = "Төвлүүлсэн хөдөлгөөнт медиан";
svgStrU[127][9] = "Загвар";
svgStrU[128][9] = "Хөдөлгөөнт дундаж";
svgStrU[129][9] = "Давхар хөдөлж буй дундаж";
svgStrU[130][9] = "Холт давхар экспоненциал тэгшитгэх";
svgStrU[131][9] = "Улирлын индекс";
svgStrU[132][9] = "Холт-Винтерсийн үржүүлэх улирлын загвар";
svgStrU[133][9] = "Улиралгүй цуврал";
svgStrU[134][9] = "Блок"; 
svgStrU[135][9] = "Кластерын шинжилгээ";
svgStrU[136][9] = "Кластер";
svgStrU[137][9] = "Шийдвэрийн мод";
svgStrU[138][9] = "Шийдвэрийн дүрмийн нөхцөл";
svgStrU[139][9] = "Шийдвэр";
svgStrU[140][9] = "Давталт";
svgStrU[141][9] = "Зэрэгцээ график";
svgStrU[142][9] = "Ангилал";
svgStrU[143][9] = "Ангиллын функц";
svgStrU[144][9] = "Ангиллын үр дүн";
svgStrU[145][9] = "Шийдвэр";
svgStrU[146][9] = "Буруу ангиллын хувь";
svgStrU[147][9] = "Эс";
svgStrU[148][9] = "Сургалтын өгөгдөл";
svgStrU[149][9] = "Туршилтын өгөгдөл";

// Chinese - Simplified
$message.zh = {
    "eStat : Stat Education SW": "eStat: 统计教育软件",
    "Home": "主页",
    "Filename": "文件",
    "Selected Variables": "选择变量",
    "Cancel": "取消",
    "Edit Variables": "编辑变量",
    "Level": "级别",
    "ElementaryLevel": "小学",
    "MiddleLevel": "中学",
    "HighLevel": "高学",
    "UniversityLevel": "大学",
    "Example": "例题",
    "New Sheets": "新工作表",
    "csv Open": "打开csv文档",
    "www Open": "打开网页",
    "json Open": "打开json文档",
    "csv Save": "保存csv",
    "json Save": "保存json",
    "Print Sheet": "打印工作表",
    "Bar Graph": "条形图",
    "Pie Chart": "饼图",
    "Band Graph": "带状图",
    "Line": "折线",
    "Line Graph": "折线图",
    "Dot Graph": "点图",
    "Histogram": "直方图",
    "Stem & Leaf Plot": "茎叶图",
    "maxStem": "** 最大茎数 <= 30 **",
    "Box-Whisker Plot": "箱线图",
    "Scatterplot": "散点图",
    "ScatterplotMatrix": "矩阵散点图",
    "Frequency Table": "频频率分布表",
    "Basic Statistics": "基本统计量",
    "Testing Hypothesis &mu;": "假设检验 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "假设检验 &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "假设检验 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "假设检验 &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "方差分析",
    "MiddleSchool": "中学统计",
    "HighSchool":   "高中统计",
    "University":   "大学统计",
    "eStatHeading": "eStat 是一款基于网络的免费软件，使用动态数据可视化和图形统计分析来实现更好的统计教育",
    "Support":      "支持",
    "Donation":     "捐款",
    "Middle School Stat Education": "中学统计",
    "High School Stat Education": "高中统计",
    "University Stat Education": "大学统计",
    "Elem Stat Graph Example": "小学统计图表示例",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "纵向",
    "Horizontal": "横向",
    "Vertical Separated Bar": "纵向分离条形图",
    "Vertical Stacked Bar": "纵向堆叠条形图",
    "Vertical Ratio Bar": "纵向比率条形图",
    "Vertical Side by Side Bar": "纵向并排条形图",
    "Vertical Two Sided Bar": "纵向双边条形图",
    "Horizontal Separated Bar": "横向分离条形图",
    "Horizontal Stacked Bar": "横向堆叠条形图",
    "Horizontal Ratio Bar": "橫向比率条形图",
    "Horizontal Side by Side Bar": "橫向并排条形图",
    "Horizontal Two Sided Bar": "横向双边条形图",
    "Doughnut Graph": "圆环图",
    "Two Sided Stem & Leaf Plot": "双边茎叶图",
    "Graph Save": "保存图形",
    "Graph Print": "打印图形",
    "Move to Table": "移动至表格",
    "Edit Title": "编辑标题",
    "Table Save": "保存表格",
    "Table Print": "打印表格",
    "Frequency": "频数",
    "Sorting": "排序",
    "SortData": "排序",
    "Raw Data": "原始数据",
    "Descending": "递减的",
    "Ascending": "递增的",
    "Mean": "平均数",
    "Std Deviation": "标准差",
    "Regression": "回归",
    "MeanStd": "平均/标准差",
    "DotMeanStd": "点图 - 平均/标准差",
    "95CI": "95%置信区间",
    "CorrelationAnalysis": "相关分析",
    "RegressionAnalysis": "回归分析",
    "RegressionAnalysis1": "线性回归分析",
    "RegressionAnalysis2": "多线性回归分析",
    "ANOVA2": "2元方差分析",
    "Frequency Polygon": "频数分布多边形",
    "Execute New Interval": "执行新区间",
    "Interval Start": "区间起点",
    "Interval Width": "区间宽度",
    "t-test": "t 检验",
    "Z-test": "Z 检验",
    "(if Z-test, enter &sigma;)": "(Z 检验, 输入 &sigma)",
    "Significance Level": "显著性水平",
    "Execute": "执行",
    "(Confidence Interval)": "(置信区间)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z 检验, Z<sub>&alpha;/2</sub>使用)",
    "&chi;<sup>2</sup> test": "&chi;&#178; 检验",
    "Variance Assumption": "方差假设",
    "Variance": "方差",
    "F test": "F 检验",
    "At least one pair of means is different": "至少有一对平均数不相等",
    "Main Title": "主标题",
    "y title": "y轴标题",
    "x title": "x轴标题",
    "yAxis": "Y轴",
    "Modify": "修改",
    "Confirm": "确认",
    "Variable Name": "变量名",
    "Variable Value": "变量值",
    "Value Label": "变量标签",
    "* Less than nine value labels allowed.": "* 允许9个以下的变量标签。",
    "Save": "保存",
    "Exit": "退出",
    "eStatU UnivStatEdu": "eStatU - 大学统计教育软件",
    "eStatH HighStatEdu": "eStatH - 高中统计教育软件",
    "eStatM MiddleStatEdu": "eStatM - 小学 / 中学统计教育软件",
    "MiddleStat": "中学统计",
    "HighStat":   "高中统计",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "韩文电子书连结",
    "Menu": "选择",
    "Binomial Experiment": "二项式分布试验",
    "Binomial Distribution": "二项式概率分布",
    "Binomial Prob Table": "二项式分布表",
    "Poisson Distribution": "泊松分布",
    "Poisson Prob Table": "泊松概率分布表",
    "Geometric Distribution": "几何分布",
    "Geometric Prob Table": "几何概率分布表",
    "HyperGeometric Distribution": "超几何分布",
    "HyperGeometric Prob Table": "超几何概率分布表",
    "Exponential Distribution": "指数分布",
    "Normal Experiment": "正态试验",
    "Normal Distribution": "正态分布",
    "Normal Approx": "正态分布估计",
    "t Distribution": "t 分布",
    "ChiSquare Distribution": "卡方分布",
    "F Distribution": "F 分布",
    "Sampling": "抽样",
    "Population vs Sample": "总体 vs 样本",
    "Population": "总体",
    "Sample": "样本",
    "Exponential": "指数分布(0.3)",
    "Uniform": "均匀分布(0,1)",
    "UniformDist": "均匀分布",
    "Sample05": "5% 样本抽出",
    "Sample10": "10% 样本抽出",
    "Sample20": "20% 样本抽出",
    "Statistics/BoxPlot": "统计量/箱线图",
    "StatisticalProb":     "统计概率",
    "Law of Large Number": "大数法则",
    "Dist of Sample Means": "样本均值",
    "Sampling Distribution": "抽样分布",
    "Sample Size": "样本数",
    "Confidence Interval": "置信区间",
    "Confidence Interval Simulation": "置信区间试验",
    "Simulation": "试验",
    "Confidence Interval Mu": "估计 : &mu;",
    "Mu Confidence Interval": "估计 : &mu;",
    "Confidence Interval Sigma": "估计 : &sigma;&#178; ",
    "Confidence Interval P": "估计 : p",
    "Estimation Accuracy": "估计准确率",
    "Repetition": "重复数",
    "Confidence Level": "置信水平",
    "Testing Hypothesis mu_titleAB": "假设检验均值",
    "Testing Hypothesis mu_title": "假设检验均值",
    "Testing Hypothesis sigma_title": "假设检验方差",
    "Testing Hypothesis P_title": "假设检验比例",
    "Testing Hypothesis mu12_title": "假设检验两总体均值",
    "Testing Hypothesis sigma12_title": "假设检验两总体方差",
    "Testing Hypothesis P12_title": "假设检验两总体比例",
    "Testing Hypothesis muA":  "假设检验 &mu; - C, &beta;",
    "Testing Hypothesis muAB": "假设检验 &mu; - C, n",
    "Testing Hypothesis mu": "假设检验: 均值&mu;",
    "Testing Hypothesis sigma": "假设检验: 变异数&sigma;&#178;",
    "Testing Hypothesis P": "假设检验: 比例 p",
    "Testing Hypothesis mu12": "假设检验 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "假设检验 : &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "假设检验 : p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1因子方差分析",
    "Testing Hypothesis ANOVA2": "2因子方差分析",
    "SameSampleSize": "每个单元格的样本大小应该相同。",
    "Testing Independence": "分类的独立性检验",
    "CategoryD": "分类",
    "Category": "分类",
    "Correlation Coefficient": "相关系数",
    "Regression Experiment": "回归实验",
    "Hypothesis": "假设",
    "Test Type": "检验类型",
    "Z-test": "Z 检验",
    "t-test": "t 检验",
    "Chi-test": "卡方检验",
    "F-test": "F 检验",
    "Sampling Type": "样本",
    "Independent Sample": "獨立样本",
    "Paired Sample": "対応样本",
    "Sample Data": "样本数据",
    "input either sample data": "接下来的对话视窗，使用csv/bsv格式输入样本资料或样本统计量",
    "input data": "输入数据",
    "Sample Statistics": "样本统计量",
    "Sample Mean": "样本均值",
    "Sample Variance": "样本方差",
    "Sample Proportion": "样本比例",
    "sample range": "样本范围",
    "control chart": "控制图",
    "if Z-test-1": "(Z 检验, 母分散入力)",
    "if Z-test-2": "(Z 检验, z<sub>&alpha;/2 </sub> 使用)",
    "At least one pair": "至少有一对平均数不相等",
    "Row-Col-0": "列变量与行变量独立",
    "Row-Col-1": "列变量与行变量不独立",
    "Enter any number of row": "(由左上角储存格输入数字)",
    "Row": "列",
    "Column": "行",
    "Probability": "概率",
    "Show Probability": "显示概率",
    "Regression Line": "回归线",
    "Erase All": "删除数据",
    "Add Point": "增加点",
    "Erase Point": "刪除点",
    "Reference Site": "参考站",
    "Lot Size": "Lot数",
    "Defect Size": "不良品数",
    "Defect Rate": "缺陷率",
    "If typed": "输入数字后，单击[执行]或[输入]",
    "Stat/BoxPlot": "统计量/箱型图",
    "Mean": "均值",
    "Std Dev": "标准差",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(一组)",
    "AnalysisVar": "分析变量",
    "AnalysisVar2": "Y变量",
    "GroupVar": "组",
    "GroupVar2": "X变量",
    "GroupVar3": "因子1",
    "GroupVar4": "因子2",
    "AnalysisVarMu12": "分析(or X1)変数",
    "GroupVarMu12": "群(or X2)変数",
    "PairedMu12": " X1, X2 : 対応変数",
    "SizeVar": "大小变量",
    "RegressionBand": "置信带",
    "RegressionTable": "回归分析",
    "RegressionResidual": "残差图",
    "RegressionResidualLeverage": "残差 - 杠杆作用",
    "RegressionCook": "Cook距離图",
    "RegressionQQ": "残差Q-Q图",
    "HistogramNormal": "直方图",
    "HistogramChisq": "正态检验",
    "HistogramNormalQQ": "正态Q-Q图",
    "PopulationStd": "人口标准差",
    "Type1Error": "第一类错误",
    "Type2Error": "第二类错误",
    "AnovaTable": "方差分析表",
    "AnovaMeanGraph": "均值置信区间",
    "MultipleComparison": "多重比较过程",
    "ComparisonGraph": "比較图",
    "AnovaResidual": "残差图",
    "AnovaQQ": "残差Q-Q图",
    "TestingFit": "分类的拟合优度检验",
    "FitTest0": "观测和理论分布是一致的",
    "FitTest1": "观测和理论分布是不一致的",
    "ObservedFreq": "观测频率O",
    "ExpectedProb": "期望概率P",
    "ExpectedFreq": "期望频率 E(>5)",
    "InputFitData": "从左上角进入单元格",
    "ExecuteTable": "统计量",
    "MeanDotGraph": "置信区间图",
    "ScatterRegression": "矩阵散点图",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "交互作用無",
    "ExistInteraction": "交互作用有",
    "eStatLecture": "eStat e講義",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "非參數Wilcoxon 順位合檢定", 
    "NonParametricMu12": "非參數Wilcoxon 順位合檢定 : 位置母數 M<sub>1</sub>, M<sub>2</sub>", 
    "Sample Range": "標本順位合",
    "DistributionTable": "分布表",
    "SignedRankTestDist": "Wilcoxon 符號順位合分布",
    "WilcoxonTestDist": "Wilcoxon 順位合分布",
    "KruskalTestDist": "Kruskal-Wallis H 分布",
    "FriedmanTestDist": "Friedman S 分布",
    "SignedRankTest": "非參數符號順位檢定",
    "SignTest": "非參數符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "非參數順位檢定",
    "KruskalTest": "非參數Kruskal-Wallis 檢定",
    "KruskalTestANOVA": "非參數Kruskal-Wallis 檢定",
    "Total": "全体",
    "FriedmanTest": "非參數Friedman檢定",
    "FriedmanTestANOVA": "非參數Friedman 檢定",
    "Block": "堵塞",
    "Treatment": "處理",
    "At least one locations is different": "位置母数 !=",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 正規近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon 順位合檢定t,  n > 20 正規近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  順位合檢定,  n>25 正規近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;&#178;近似檢定",
    "VariableSelect":  "* 資料分析 : 变量選択 >>  Click Icon",
    "VariableSelect2": "* 变量選択 : Click 变量名 / 右側選択箱利用 ",
    "VariableSelect3": "* 变量選択",
    "VariableSelect4": "可以选择更多X变量",
    "SummaryData": "要約資料",
    "RawData": "原資料",
    "MultiSelect": "",
    "DataType": "(通过单击变量名称选择变量)",
    "by": "by",
    "NameVar": "名称变量",
    "n_variance": "n-1 式",
    "RandomNumber": "随机数",
    "RealNumber":     "实数",
    "IntegerNumber":  "整数",
    "NumberData":     "数据数量",
    "NumberDigit":    "小数位数",
    "NormalTable":    "正态分布表",
    "Percentile":     "百分表",
    "PercentileValue": "百分",
    "StudentRangeDist": "HSD 范围分布",
    "copy link": "复制链接",
    "WithoutReplacement": "不可回收提取",
    "WithReplacement":    "恢复提取",
    "Replacement":     "恢复提取",
    "NonReplacement":  "不可回收提取",
    "WordCloud":       "词云（英语",
    "oneColor":        "色",
    "defaultColor":    "默认颜色",
    "RelativeFreq":    "相对频率",
    "Density":         "密度",
    "MarginOfError":   "误差范围",
    "Permutation":     "排列",
    "PermutationSame": "排列相同的东西",
    "Combination":     "組合",
    "NumberOfCase":    "案件數",
    "BinomialTheorem": "二项式定理",
    "PascalTriangle":  "帕斯卡三角形",
    "Character":       "表情符号",
    "AdditionRule":      "確率加法規則",
    "MultiplicationRule": "確率乗法規則",
    "ConditionalProb":   "条件付確率",
    "JointProb":         "Joint Probability",
    "DiscreteDist":      "Discrete Distribution",
    "WithoutReplacement": "不可回收提取",
    "WithReplacement":    "恢复提取",
    "Categorize":        "分类",
    "Recode":            "覆盖随机值",
    "Compute":           "新变体计算",
    "SelectIf":          "数据选择",
    "InfoValueLabel":    "*** 选择一个变量，输入变量名称或变量值名称，然后单击运行按钮。",
    "InfoSorting":       "*** 最多选择 3 个要排序的变量，选择一种排序方法，然后单击运行按钮。",
    "InfoCategorize":    "*** 选择要分类的变量后，输入区间开始和区间宽度，检查类别列表并单击运行按钮。",
    "InfoRecode":        "*** 选择一个要重新分配的变量，输入一个新的随机值，然后单击运行按钮。",
    "InfoRecode2":       "* 您最多可以覆盖九个值。",
    "InfoCompute":       "*** 使用下面的按钮创建用于计算新方差的公式，然后单击运行按钮。",
    "InfoSelectIf":      "*** 多选择三个变量进行数据选择，为每个变量输入条件表达式，然后单击运行按钮。",
    "SortingVariable":   "对齐方式",
    "SortingMethod":     "排序方式",
    "NewVariable":       "新变量",
    "CategoryVariable":  "分类方差",
    "CategoryListCheck": "检查类别列表",
    "CategoryInterval":  "类别区间",
    "CategoryLabel":     "分类名称",
    "RecodeVariable":    "随机值覆盖变体",
    "CurrentValue":      "当前随机值",
    "NewValue":          "新的随机值",
    "ComputeFormula":    "公式",
    "SelectVariable":    "可选变量",
    "RelationOperator":  "关系运算符",
    "SelectValue":       "价值",
    "MissingValue":      "缺失值",
    "option":           "选择",
    "TimeSeries":       "时间序列",
    "Smoothing":        "光滑的",
    "Filtering":        "过滤",
    "Transformation":   "转换",
    "Weight":           "重量",
    "WeightedIndex":    "加权指数",
    "BaseTime":         "基准时间",
    "LagTime":          "视差",
    "Lag":              "视差",
    "Forecasting":      "预言",
    "SeasonalModel":    "季节模型",
    "HoltWinter":       "Holt-Winters 乘法季节性模型",
    "Trend":            "趋势",
    "Seasonal":         "季节",
    "Deseasonal":       "非季节性时间序列",
    "Nseason":          "季节性周期",
    "Irregular":        "不规律的",
    "TrendModel":       "非季节性趋势模型",
    "RegressionModel":  "回归模型",
    "ForecastingPeriod":"预测期",
    "CreateTable":      "预测表",
    "SaveTable":        "保存表",
    "MA":               "移动平均线",
    "EWMA":             "指數平滑 Model",
    "CenterMA":         "中心移动平均线",
    "MovingMedian":     "中心偏移中位数",
    "ES":               "指数平滑",
    "Default":          "默认",
    "Linear":           "线性的",
    "Quadratic":        "二次方",
    "Cubic":            "第三",
    "SquareRoot":       "平方根",
    "Log":              "Log",
    "Exponent":         "指数",
    "Power":            "幂函数",
    "BoxCox":           "盒子考克斯",
    "SingleMA":         "简单移动平均线",
    "SingleES":         "简单指数平滑",
    "DoubleMA":         "双移动平均线",
    "DoubleES":         "双移指数平滑",
    "HoltLinear":       "霍尔特线性趋势",
    "DeseasonIntercept": "反季节拦截",
    "DeseasonSlope":     "淡季坡度",
    "SeasonalIndex":     "季节性指数",
    "Diff":              "差异",
    "DiffTime":          "差异时间",
    "AR":                "自回归模型",
    "ResultTable":       "结果表",
    "ForecastTable":     "预测表",
    "HoltLevel":         "水平",
    "HoltTrend":         "趋势",
    "AutoCorrTable":     "自相关表",
    "DiffSeries":        "差分时间序列",
    "RawSeries":         "原始系列",
    "RBD":               "随机块编程",
    "Latin":             "拉丁文语法",
    "Chapter01":         "&nbsp;第1章 统计数据科学",
    "Chapter02":         "&nbsp;第2章 定性数据可视化",
    "Chapter03":         "&nbsp;第3章 定量数据可视化",
    "Chapter04":         "&nbsp;第4章 使用表格/度量组织数据",
    "Chapter05":         "&nbsp;第5章 概率和概率分布函数",
    "Chapter06":         "&nbsp;第6章 样本统计数据的分布和估计",
    "Chapter07":         "&nbsp;第7章 总体参数的假设检验",
    "Chapter08":         "&nbsp;第8章 两个总体参数的假设检验",
    "Chapter09":         "&nbsp;第9章 多种总体均值的假设检验",
    "Chapter10":         "第10章 非参数假设检验",
    "Chapter11":         "第11章 分类数据的假设检验",
    "Chapter12":         "第12章 相关性和回归",
    "Chapter13":         "第13章 时间序列分析",
    "Distribution":      "概率分布",
    "DecisionTree":      "决策树",
    "MaxDepth":          "树最大深度",
    "MinData":           "分支数据最小值",
    "Discriminant":      "判别分析",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Chinese Simplified
appStr[0][10] = "/estat/eStat/index.html";
appStr[1][10] = "/estat/eStatH/index.html";
appStr[2][10] = "/estat/eStatU/index.html";
appStr[3][10] = "/estat/eStatE/index_en.html";
appStr[4][10] = "/estat/eHelp/index_en.html";
appStr[5][10] = "index.html";
appStr[6][10] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][10] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][10] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][10] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][10] = "";
appStr[11][10] = "Large Population Country";
appStr[12][10] = "Life Expectancy (OECD)";
appStr[13][10] = "Population Pyramid (Korea)";
appStr[14][10] = "GNP per Capita (OECD)";
appStr[15][10] = "Top World Export Country";
appStr[16][10] = "Obesity % of Population";
appStr[17][10] = "Temperature of Major City";
appStr[18][10] = "Top CO2 Emission Country";
appStr[19][10] = "Alcohol Consume (OECD)";
appStr[20][10] = "Continuous Data Graph";
appStr[21][10] = "Length of Otter";
appStr[22][10] = "Age of Teacher";
appStr[23][10] = "Age of Teacher by Sex";
appStr[24][10] = "Cleanliness of Tooth";
appStr[25][10] = "Math Exam Scores";
appStr[26][10] = "Calorie of Hamberger";
appStr[27][10] = "Height vs Weight by Sex";
appStr[28][10] = "Discrete Data Graphs";
appStr[29][10] = "";
appStr[30][10] = "";
appStr[31][10] = "unit";
appStr[32][10] = "Country";
appStr[33][10] = "Male";
appStr[34][10] = "Female";
appStr[35][10] = "Age";
appStr[36][10] = "Person";
appStr[37][10] = "billion $";
appStr[38][10] = "Export";
appStr[39][10] = "Obesity %";
appStr[40][10] = "Celsius";
appStr[41][10] = "City";
appStr[42][10] = "Jan High";
appStr[43][10] = "Jul High";
appStr[44][10] = "million ton";
appStr[45][10] = "liter/year";
appStr[46][10] = "Alcohol";
alertMsg[1][10] = "所选的变量，其中之一没有包含资料。";
alertMsg[2][10] = "逐一选取变量进行分析（选按栏位名称）。若是同事选取两个变量，则第一个视为群组变量。";
alertMsg[3][10] = "所选的变量有缺失值。";
alertMsg[4][10] = "若选取的变量观察值不同，则无法进行分析。";
alertMsg[5][10] = "群组数太多！圆形可能因荧幕太小而重叠！。";
alertMsg[6][10] = "若摘要资料中要进行分析的变量包含文字，则无法进行分析及制作图表。";
alertMsg[7][10] = "若原始资料中有超过3个变量数被选择，则无法进行分析及制作图表。";
alertMsg[8][10] = "点图可用于观察值少于200的样本。";
alertMsg[9][10] = "茎叶图可用于观察值少于100的样本。";
alertMsg[10][10] = "未选择分析变量";
alertMsg[11][10] = "未选择分析/群变量。";
alertMsg[12][10] = "若分析的变量包含文字，则无法进行分析及制作图表。";
alertMsg[13][10] = "";
alertMsg[14][10] = "连续型图形及假设建议无法进行摘要资料。";
alertMsg[16][10] = "此假设检验仅限于两个总体。";
alertMsg[17][10] = "绘制散点图至少需要横轴变量及纵轴变量。";
alertMsg[18][10] = "不允许使用三个以上的变量。";
alertMsg[19][10] = "如果数据中存在字符，则无法进行分析。";
alertMsg[20][10] = "若X/Y变量包含文字，则回帰分析无法绘制。";
alertMsg[21][10] = "若资料有缺失值，则无法储存。";
alertMsg[22][10] = "若资料有负值，条形图无法绘制。";
alertMsg[25][10] = "若资料只有一个群组，则堆叠条形图无法绘制。";
alertMsg[27][10] = "若资料只有一个群组，则比例条形图无法绘制。";
alertMsg[29][10] = "若资料只有一个群组，则并排条形图无法绘制。";
alertMsg[31][10] = "若资料只有一个群组，则双边条形图无法绘制。";
alertMsg[32][10] = "若资料有负值，则饼图无法绘制。";
alertMsg[33][10] = "若资料有负值，则环形图无法绘制。";
alertMsg[34][10] = "若资料有负值，则带状图无法绘制。";
alertMsg[35][10] = "若资料有负值，则频数分布表无法绘制。";
alertMsg[36][10] = "此条形图仅限于两个群组。";
alertMsg[37][10] = "此假设检验仅限于单个变量。";
alertMsg[38][10] = "mu 不是一个数字。请输入一个数值并重新执行!";
alertMsg[39][10] = "标准差为0或不是一个数字，请重新执行!";
alertMsg[40][10] = "输入的方差不是一个数字，请输入一个数值并重新执行!";
alertMsg[41][10] = "此假设检验仅限于两个变量，群组变量则需包含两个群组。";
alertMsg[42][10] = "假设检验的标题不可编辑! ";
alertMsg[43][10] = "简单线性回归仅适用于一组";
alertMsg[44][10] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][10] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][10] = "同一变量名選擇";
alertMsg[47][10] = "频率中的字符数据不允许！！再试一次。";
alertMsg[48][10] = "字符数据不允许！！再试一次。";
alertMsg[49][10] = "观察次数应该小于 100 !!再试一次。";
alertMsg[50][10] = "在间隔开始或步骤中输入数字。";
alertMsg[51][10] = "输入数字/N行数应该是一样的！！再试一次。";
alertMsg[52][10] = "按类别和频率输入数字。";
alertMsg[53][10] = "间隔大小不一样！！再试一次。";
alertMsg[54][10] = "X 观察不等于 Y 观察！！再试一次。";
alertMsg[55][10] = "!!!工作表上没有数据";
alertMsg[55][10] = "!! 纸张上没有数据。";
alertMsg[56][10] = "!! 未选择变量";
alertMsg[57][10] = "!! 输入间隔开始和间隔宽度";
alertMsg[58][10] = "!! 输入数字间隔的起始和间隔宽度";
alertMsg[59][10] = "!! 大于 9 间隔 - 更改间隔宽度";
alertMsg[60][10] = "!! 该变量具有超过 9 个值";
alertMsg[61][10] = "!! 未输入值";
alertMsg[62][10] = "!! 输入公式";
alertMsg[63][10] = "!! 没有满足条件的数据。";
alertMsg[64][10] = "";
alertMsg[65][10] = ""; 
alertMsg[66][10] = "";
alertMsg[67][10] = "";
alertMsg[68][10] = "";
alertMsg[69][10] = "";

svgStr[1][10] = " 条形图";
svgStr[2][10] = " 饼图";
svgStr[3][10] = " 圆环图";
svgStr[4][10] = " 带装图";
svgStr[5][10] = " 折线图";
svgStr[6][10] = " 点图";
svgStr[7][10] = " 箱线图";
svgStr[8][10] = " 茎叶图";
svgStr[9][10] = " 直方图";
svgStr[10][10] = " 散点图";
svgStr[11][10] = " 假设检验: 总体均值";
svgStr[12][10] = " 假设检验: 总体方差";
svgStr[13][10] = " 假设检验: 两总体均值";
svgStr[14][10] = " 假设检验: 两总体方差";
svgStr[15][10] = " 方差分析";
svgStr[16][10] = "次数";
svgStr[17][10] = "比例";
svgStr[18][10] = "群组";
svgStr[19][10] = " ";
svgStr[20][10] = "<h3>摘要资料<br>次数分布表</h3>";
svgStr[21][10] = "群组变量";
svgStr[22][10] = "列变量";
svgStr[23][10] = "总和";
svgStr[24][10] = "大小";
svgStr[25][10] = "<h3>次数分布表</h3>";
svgStr[26][10] = "分析变量";
svgStr[27][10] = "变量值";
svgStr[28][10] = "变量值标号";
svgStr[29][10] = "次数";
svgStr[30][10] = "相对频率";
svgStr[31][10] = "<h3>交叉表</h3>";
svgStr[32][10] = "行变量";
svgStr[33][10] = "列变量";
svgStr[34][10] = "平均"
svgStr[35][10] = "标准差"
svgStr[36][10] = "<h3> 直方图<br>次数分布表</h3>";
svgStr[37][10] = "群组名称";
svgStr[38][10] = "阶级区间";
svgStr[39][10] = "茎";
svgStr[40][10] = "叶";
svgStr[41][10] = "群组一 叶";
svgStr[42][10] = "群组二 叶"
svgStr[43][10] = "<h3>基本统计量</h3>";
svgStr[44][10] = "观察值";
svgStr[45][10] = "最小值";
svgStr[46][10] = "中位数";
svgStr[47][10] = "最大值";
svgStr[48][10] = "全体";
svgStr[49][10] = "<h3>正态性检验</h3>";
svgStr[50][10] = "期望频数> 5 <br> 建议";
svgStr[51][10] = "&chi;&#178; 检验<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][10] = "资料<br>观察频数<br>(O<sub>i</sub>)";
svgStr[53][10] = "正态分布<br>期望概率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][10] = "正态分布<br>期望频数<br>(E<sub>i</sub>)";
svgStr[55][10] = "各区间l<br>&chi;&#178; 值<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][10] = "合&chi;&#178;值";
svgStr[57][10] = "概率直方图, 正态分布";
svgStr[58][10] = "正态Q-Q图";
svgStr[59][10] = "正态分位数";
svgStr[60][10] = "相关系数";
svgStr[61][10] = "决定系数";
svgStr[62][10] = "标准误差";
svgStr[63][10] = "变量";
svgStr[64][10] = "变量名";
svgStr[65][10] = "自变量";
svgStr[66][10] = "应变量";
svgStr[67][10] = "总数";
svgStr[68][10] = "推定值";
svgStr[69][10] = "值";
svgStr[70][10] = "切片";
svgStr[71][10] = "斜率";
svgStr[72][10] = "因素";
svgStr[73][10] = "平方和";
svgStr[74][10] = "自由度";
svgStr[75][10] = "均方";
svgStr[76][10] = "回归";
svgStr[77][10] = "误差";
svgStr[78][10] = "总体";
svgStr[79][10] = "<h3>回归分析</h3>";
svgStr[80][10] = "标准残差Q-Q图";
svgStr[81][10] = "标准残差";
svgStr[82][10] = "正态分位数";
svgStr[83][10] = "残差图";
svgStr[84][10] = "预测值";
svgStr[85][10] = "双向方差分析表";
svgStr[86][10] = "置信区间图";
svgStr[87][10] = "残差";
svgStr[88][10] = "二维统计";
svgStr[89][10] = "矩阵散点图";
svgStr[90][10] = "分组统计量";
svgStr[91][10] = "统计量";
svgStr[92][10] = "因素";
svgStr[93][10] = "水平";
svgStr[94][10] = "成对样本数据图";
svgStr[95][10] = "残差-豫測";
svgStr[96][10] = "残差-Leverage";
svgStr[97][10] = "Cook距離图";
svgStr[98][10] = "Cook距離";
svgStr[99][10] = "資料順序";
svgStr[100][10]= "平均差";
svgStr[101][10]= "平均差檢定";
svgStr[102][10]= "處理";
svgStr[103][10]= "交互作用";
svgStr[104][10]= "行合";
svgStr[105][10]= "列合";
svgStr[106][10]= "重相關係數";
svgStr[107][10]= "<h3>相關分析</h3>";
svgStr[108][10]= "相關係數行列";
svgStr[109][10]= "因子A - 因子B 平均图";
svgStr[110][10]= "杠杆作用";
svgStr[111][10]= "地理信息图";
svgStr[112][10]= "范围";
svgStr[113][10]= "平均 - 标准差图";
svgStr[114][10]= "总体方差";
svgStr[115][10]= "假设";
svgStr[116][10]= "檢定";
svgStr[117][10]= "方差";
svgStr[118][10]= "阶级区间值";
svgStr[119][10]= "分类";
svgStr[120][10] = "最頻值";
svgStr[121][10] = "协方差";
svgStr[122][10] = "帕斯卡三角";
svgStr[123][10] = "联合概率";
svgStr[124][10] = "有条件的";
svgStr[125][10] = "离散分布";
svgStr[126][10] = "行 %";
svgStr[127][10] = "列 %";
svgStr[128][10] = "总计 %";
svgStr[129][10] = "条形图矩阵";
svgStr[130][10] = "先验概率";
svgStr[131][10] = "特征值";
svgStr[132][10] = "特征向量";
svgStr[133][10] = "多维频率表";
svgStr[134][10] = "层次聚类图";
svgStr[135][10] = "距离";
svgStr[136][10] = "单个";
svgStr[137][10] = "完成";
svgStr[138][10] = "平均";
svgStr[139][10] = "质心";
svgStr[140][10] = "病房";
svgStr[141][10] = "联动";
svgStr[142][10] = "Number of Clusters <br>K";
svgStr[143][10] = "Bayes Information Criteria";
svgStr[144][10] = "Within Sum of Squares";
svgStr[145][10] = "Akaike Information Criteria";

svgStrU[1][10] = "二项式分布";
svgStrU[2][10] = "重复数";
svgStrU[3][10] = "平均";
svgStrU[4][10] = "标准差";
svgStrU[5][10] = "泊松分布";
svgStrU[6][10] = "几何分布";
svgStrU[7][10] = "超几何分布";
svgStrU[8][10] = "总体";
svgStrU[9][10] = "样本分布";
svgStrU[10][10] = "大数法则";
svgStrU[11][10] = "反面";
svgStrU[12][10] = "正面";
svgStrU[13][10] = "硬币正面";
svgStrU[14][10] = "  正面个数  ";
svgStrU[15][10] = "  试验次数  ";
svgStrU[16][10] = "样本平均分布";
svgStrU[17][10] = "重复";
svgStrU[18][10] = "标准差";
svgStrU[19][10] = "总体均值";
svgStrU[20][10] = "置信区间";
svgStrU[21][10] = "估计准确率";
svgStrU[22][10] = "样本平均";
svgStrU[23][10] = "[检验统计量]";
svgStrU[24][10] = "分布";
svgStrU[25][10] = "拒绝原假设";
svgStrU[26][10] = "接受原假设";
svgStrU[27][10] = "p-值";
svgStrU[28][10] = "[决策] ";
svgStrU[29][10] = "[方差分析]";
svgStrU[30][10] = "输入相关系数后按确认";
svgStrU[31][10] = "回归分析";
svgStrU[32][10] = "列变量";
svgStrU[33][10] = "行变量";svgStrU[34][10] = "平均"svgStrU[35][10] = "标准差"svgStrU[36][10] = "<h3> 直方图<br>频数分布表</h3>";svgStrU[37][10] = "群组名称";svgStrU[38][10] = "阶级区间";svgStrU[39][10] = "叶";svgStrU[40][10] = "叶";svgStrU[41][10] = "群组1 叶";svgStrU[42][10] = "群组2 叶";svgStrU[43][10] = "<h3>基本统计量</h3>";svgStrU[44][10] = "资料数";  svgStrU[45][10] = "最小值";  svgStrU[46][10] = "中位数"; svgStrU[47][10] = "最大值";  svgStrU[48][10] = "全体";svgStrU[49][10] = "指数分布";svgStrU[50][10] = "均匀分布";svgStrU[51][10] = "估计准确率";svgStrU[52][10] = "- 单击鼠标添加观察点，eStat会计算出回归线。";svgStrU[53][10] = "- 移动或者删除一个观察点，观看回归线的变化。";svgStrU[54][10] = "[样本统计量] ";svgStrU[55][10] = "[样本 1 统计量] ";svgStrU[56][10] = "[样本 2 统计量] ";svgStrU[57][10] = "显著性水平";svgStrU[58][10] = "列行独立";svgStrU[59][10] = "列行不独立";
svgStrU[60][10] = "观测分布";
svgStrU[61][10] = "理论分布";
svgStrU[62][10] = "观测频率的拟合优度检验";
svgStrU[63][10] = "Wilcoxon 順位合檢定";
svgStrU[64][10] = "Wilcoxon 順位合檢定 分布表";
svgStrU[65][10] = "Kruskal-Wallis 檢定";
svgStrU[66][10] = "Kruskal-Wallis H 分布";
svgStrU[67][10] = "Kruskal-Wallis H 統計量";
svgStrU[68][10] = "Wilcoxon 符號順位合檢定";
svgStrU[69][10] = "符號檢定";
svgStrU[70][10] = "Friedman檢定";
svgStrU[71][10] = "Friedman S 統計量";
svgStrU[72][10] = "Friedman S 分布";
svgStrU[73][10] = "t-值 (Z)";
svgStrU[74][10] = "ChiSq-值";
svgStrU[75][10] = "样本方差";
svgStrU[76][10] = "样本平均差";
svgStrU[77][10] = "样本方差比";
svgStrU[78][10] = "方差假设";
svgStrU[79][10] = "要数据";
svgStrU[80][10] = "多项选择";
svgStrU[81][10] = "最多选择两个组";
svgStrU[82][10] = "X变量";
svgStrU[83][10] = "Y变量";
svgStrU[84][10] = "by";
svgStrU[85][10] = "没有组变量";
svgStrU[86][10] = "选定数据: ";
svgStrU[87][10] = "原始数据";
svgStrU[88][10] = "通过单击变量名称选择变量";
svgStrU[89][10] = "缺少观察";
svgStrU[90][10] = "順位合";
svgStrU[91][10] = "经度";
svgStrU[92][10] = "纬度";
svgStrU[93][10] = "位置母数 !=";
svgStrU[94][10] = "Wilcoxon 符號順位合分布";
svgStrU[95][10] = "配对变量";
svgStrU[96][10] = "配对数据";
svgStrU[97][10] = "独立性检验";
svgStrU[98][10] = "模拟";
svgStrU[99][10] = "随机数";
svgStrU[100][10] = "正态分布";
svgStrU[101][10] = "t 分布";
svgStrU[102][10] = "&chi;&#178; 分布";
svgStrU[103][10] = "F 分布";
svgStrU[104][10] = "HSD 分布";
svgStrU[105][10] = "第一个四分位数问题";
svgStrU[106][10] = "第三个四分位数问题";
svgStrU[107][10] = "四分位数范围";
svgStrU[108][10] = "确定系数";
svgStrU[109][10] = "累积相对频率（％）";
svgStrU[110][10] = "分布均匀的最大整数数";
svgStrU[111][10] = "用鼠标移动点";
svgStrU[112][10] = "恢复提取";
svgStrU[113][10] = "不可回收提取";
svgStrU[114][10] = "折线"; 
svgStrU[115][10] = "% 增加或减少";
svgStrU[116][10] = "简单指数";
svgStrU[117][10] = "视差";
svgStrU[118][10] = "差异";
svgStrU[119][10] = "自相关函数";
svgStrU[120][10] = "对数变换";
svgStrU[121][10] = "平方根变换";
svgStrU[122][10] = "Box-Cox 变换";
svgStrU[123][10] = "基准时间";
svgStrU[124][10] = "中心移动平均线";
svgStrU[125][10] = "指数平滑";
svgStrU[126][10] = "中位数中心偏移";
svgStrU[127][10] = "模型";
svgStrU[128][10] = "移动平均线";
svgStrU[129][10] = "双移动平均线";
svgStrU[130][10] = "霍尔特双指数平滑";
svgStrU[131][10] = "季节性指数";
svgStrU[132][10] = "Holt-Winters 乘法季节性模型";
svgStrU[133][10] = "非季节性时间序列";
svgStrU[134][10] = "堵塞";
svgStrU[135][10] = "聚类分析";
svgStrU[136][10] = "集群";
svgStrU[137][10] = "决策树";
svgStrU[138][10] = "决策规则条件";
svgStrU[139][10] = "决定";
svgStrU[140][10] = "迭代";
svgStrU[141][10] = "平行图";
svgStrU[142][10] = "分类";
svgStrU[143][10] = "分类函数";
svgStrU[144][10] = "分类结果";
svgStrU[145][10] = "决定";
svgStrU[146][10] = "误分类率";
svgStrU[147][10] = "单元格";
svgStrU[148][10] = "训练数据";
svgStrU[149][10] = "测试数据";

// Portugese
$message.pt = {
    "eStat : Stat Education SW": "eStat : Educação Estatística SW",
    "Home": "Pagina inicial",
    "Filename": "Arquivo",
    "Selected Variables": "Var Selecionadas",
    "Cancel": "Cancelar",
    "Edit Variables": "Editar Variáveis",
    "Level": "Nível",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Exemplo",
    "New Sheets": "Novas Planilhas",
    "csv Open": "csv Abrir",
    "www Open": "www Abrir",
    "json Open": "json Abrir",
    "csv Save": "csv Salvar",
    "json Save": "json Salvar",
    "Print Sheet": "Imprimir Planilha",
    "Bar Graph": "Gráfico de Barras",
    "Pie Chart": "Gráfico de Setores",
    "Band Graph": "Gráfico de Faixas/Bandas",
    "Line": "Linha",
    "Line Graph": "Gráfico de Linha",
    "Dot Graph": "Gráfico de Pontos",
    "Histogram": "Histograma",
    "Stem & Leaf Plot": "Gráfico Ramo-e-Folhas",
    "maxStem": "** número máximo de haste <= 30 **",
    "Box-Whisker Plot": "Diagrama de Caixas",
    "Scatterplot": "Diagrama de Dispersão",
    "ScatterplotMatrix": "Matriz de Diagramas de Dispersão",
    "Frequency Table": "Tabela de Frequências",
    "Basic Statistics": "Estatísticas Básicas",
    "Testing Hypothesis &mu;": "Teste de Hipóteses &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Teste de Hipóteses &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Teste de Hipóteses  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Testing Hypothesis &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Análise de Variância",
    "MiddleSchool": "Ensino fundamental",
    "HighSchool":   "Ensino médio",
    "University":   "Universidade",
    "eStatHeading": "eStat é um freeware baseado na web para uma melhor educação estatística usando visualização dinâmica de dados e análise estatística gráfica.",
    "Support":      "Apoiar",
    "Donation":     "Doação",
    "Middle School Stat Education": "Ensino Médio Estatística Educação",
    "High School Stat Education": "Educação Estatística no Ensino Médio",
    "University Stat Education": "Educação Estatística Universitária",
    "Elem Stat Graph Example": "Gráfico Exemplo",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Verticais",
    "Horizontal": "Horizontais",
    "Vertical Separated Bar": "Barras Verticais Separadas",
    "Vertical Stacked Bar": "Barras Verticais Empilhadas (frequências absolutas)",
    "Vertical Ratio Bar": "Barras Verticais Empilhadas (porcentagens)",
    "Vertical Side by Side Bar": "Barras Verticais Lado a Lado",
    "Vertical Two Sided Bar": "Barras Verticais Estilo Pirâmide",
    "Horizontal Separated Bar": "Barras Horizontais Separadas",
    "Horizontal Stacked Bar": "Barras Horizontais Empilhadas (frequências absolutas)",
    "Horizontal Ratio Bar": "Barras Horizontais Empilhadas (porcentagens)",
    "Horizontal Side by Side Bar": "Barras Horizontais Lado a Lado",
    "Horizontal Two Sided Bar": "Barras Horizontais Estilo Pirâmide",
    "Doughnut Graph": "Gráfico de Anel/Rosca",
    "Two Sided Stem & Leaf Plot": "Gráfico Ramo-e-Folhas para Dois Grupos",
    "Graph Save": "Salvar o Gráfico",
    "Graph Print": "Imprimir o Gráfico",
    "Move to Table": "Ir para a Tabela",
    "Edit Title": "Editar o Título",
    "Table Save": "Salvar a Tabela",
    "Table Print": "Imprimir a Tabela",
    "Frequency": "Frequência",
    "Sorting": "Ordenando",
    "SortData": "Ordenando",
    "Raw Data": "Dados Brutos",
    "Descending": "Decrescente",
    "Ascending": "Crescente",
    "Mean": "Média",
    "Std Deviation": "Desvio Padrão",
    "MeanStd": "Média/Desvio Padrão",
    "DotMeanStd": "Gráfico de Pontos - Média/Desvio Padrão",
    "95CI": "95% Intervalo de Confiança",
    "CorrelationAnalysis": "Análise de correlação",
    "RegressionAnalysis": "análise de regressão",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Dois sentidos ANOVA",
    "Regression": "Regressão",
    "RegressionLine": "Reta de Regressão",
    "RegressionBand": "banda de confiança",
    "RegressionTable": "análise de regressão",
    "Frequency Polygon": "Polígono de Frequências",
    "Execute New Interval": "Execute com Novos Intervalos",
    "Interval Start": "Início do Intervalo",
    "Interval Width": "Amplitude do Intervalo",
    "t-test": "t teste",
    "Z-test": "Z teste",
    "(if Z-test, enter &sigma;)": "(se teste Z, forneça &sigma;)",
    "Significance Level": "Nível de Significância",
    "Execute": "Execute",
    "(Confidence Interval)": "(Confidence Interval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Se teste Z, use z<sub>&alpha;/2 </sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178; teste",
    "Variance Assumption": "Suposição sobre as variâncias",
    "Variance": "variâncias",
    "F test": "F teste",
    "At least one pair of means is different": "Pelo menos um par de médias difere",
    "Main Title": "Título Principal",
    "y title": "Título da ordenada (y)",
    "x title": "Título da abscissa (x)",
    "yAxis": "Y Eixo",
    "Modify": "Modifique",
    "Confirm": "Confirme",
    "Variable Name": "Nome da Variável",
    "Variable Value": "Valor da Variável",
    "Value Label": "Rótulo do Valor",
    "* Less than nine value labels allowed.": "* É permitido a entrada de, no máximo, 9 rótulos de valores.",
    "Save": "Salvar",
    "Exit": "Sair",
    "eStatU UnivStatEdu": "eStatU - Educação Estatística Universitária SW",
    "eStatH HighStatEdu": "eStatH - Educação Estatística no Ensino Médio SW",
    "eStatM MiddleStatEdu": "eStatM - Elementar / Estatísticas do ensino médio SW",
    "MiddleStat": "Estatísticas do ensino médio",
    "HighStat":   "Estatísticas do ensino médio",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menu",
    "Binomial Experiment": "Experimento Binomial",
    "Binomial Distribution": "Distribuição Binomial",
    "Binomial Prob Table": "Tabela de Probabilidade Binomial",
    "Poisson Distribution": "Distribuição de Poisson",
    "Poisson Prob Table": "Tabela de Probabilidade Poisson",
    "Geometric Distribution": "Distribuição Geométrica",
    "Geometric Prob Table": "Tabela de Probabilidade Geométrica",
    "HyperGeometric Distribution": "Distribuição Hipergeométrica",
    "HyperGeometric Prob Table": "Tabela de Probabilidade Hipergeométrica",
    "Exponential Distribution": "Distribuição Exponencial",
    "Normal Experiment": "Experimento Normal",
    "Normal Distribution": "Distribuição Normal",
    "Normal Approx": "Aproximação Normal",
    "t Distribution": "Distribuição t",
    "ChiSquare Distribution": "Distribuição &chi;&#178;",
    "F Distribution": "Distribuição F",
    "Sampling": "Amostragem",
    "Population vs Sample": "População vs Amostra",
    "Population": "População",
    "Sample": "Amostra",
    "Exponential": "Exponencial(0.3)",
    "Uniform": "Uniforme(0,1)",
    "UniformDist": "Distribuição Uniforme",
    "Sample05": "Amostragem 5%",
    "Sample10": "Amostragem 10%",
    "Sample20": "Amostragem 20%",
    "Statistics/BoxPlot": "Estatística/BoxPlot",
    "StatisticalProb":     "Probabilidade Estatística",
    "Law of Large Number": "Lei dos Grandes Números",
    "Dist of Sample Means": "Distribuição de Médias Amostrais",
    "Sampling Distribution": "Distribuição de amostras",
    "Sample Size": "Tamanho da Amostra",
    "Confidence Interval": "Intervalo de Confiança",
    "Confidence Interval Simulation": "Intervalo de Confiança Experimento",
    "Simulation": "Experimento",
    "Confidence Interval Mu": "Estimativo : &mu;",
    "Mu Confidence Interval": "Estimativo : &mu;",
    "Confidence Interval Sigma": "Estimativo : &sigma;&#178; ",
    "Confidence Interval P": "Estimativo : p",
    "Estimation Accuracy": "Acurácia ",
    "Repetition": "Repetição",
    "Confidence Level": "Coeficiente de Confiança",
    "Testing Hypothesis mu_titleAB": "Teste para uma média",
    "Testing Hypothesis mu_title": "Teste para uma média",
    "Testing Hypothesis sigma_title": "Teste para uma variância",
    "Testing Hypothesis P_title": "Teste para uma proporção",
    "Testing Hypothesis mu12_title": "Teste para duas médias",
    "Testing Hypothesis sigma12_title": "Teste para duas variâncias",
    "Testing Hypothesis P12_title": "Teste para duas proporções",
    "Testing Hypothesis muA":  "Teste Hipótese &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Teste Hipótese &mu; - C, n",
    "Testing Hypothesis mu": "Teste Hipótese &mu;",
    "Testing Hypothesis sigma": "Teste Hipótese &sigma;&#178;",
    "Testing Hypothesis P": "Teste Hipótese p",
    "Testing Hypothesis mu12": "Teste Hipótese &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Teste Hipótese &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Teste Hipótese p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Fator ANOVA",
    "Testing Hypothesis ANOVA2": "2 Fator ANOVA",
    "SameSampleSize": "O tamanho da amostra de cada célula deve ser o mesmo.",
    "Testing Independence": "Teste de Independência",
    "CategoryD": "Categoria",
    "Category": "Categoria",
    "Correlation Coefficient": "Coeficiente de Correlação",
    "Regression Experiment": "Experimento de Regressão",
    "Hypothesis": "Hipótese",
    "Test Type": "Tipo do Teste",
    "Z-test": "Z teste",
    "t-test": "t teste",
    "Chi-test": "&chi;&#178; teste",
    "F-test": "F teste",
    "Sampling Type": "Tipo de Amostragem",
    "Independent Sample": "Independência",
    "Paired Sample": "amostras pareadas",
    "Sample Data": "Dados Amostrais",
    "input either sample data": "entre com o tamanho da amostra ou com a estatística amostral nas próximas caixas usando csv/bsv",
    "input data": "Inserir dados",
    "Sample Statistics": "Estatísticas Amostrais",
    "Sample Mean": "Média Amostral",
    "Sample Variance": "Variância Amostral",
    "Sample Proportion": "Proporção Amostral",
    "sample range": "Faixa de amostra",
    "control chart": "Gráfico de controle",
    "if Z-test-1": "(se Teste Z, entre com a variância populacional)",
    "if Z-test-2": "(se Teste Z, z<sub>&alpha;/2 </sub> usado.)",
    "At least one pair": "Pelo menos um par de médias difere",
    "Row-Col-0": "Variáveis na linha e coluna da tabela são independentes",
    "Row-Col-1": "Variáveis na linha e coluna da tabela não são independentes",
    "Enter any number of row": "(Entre com as observações (frequências) a partir da casela superior à esquerda)",
    "Row": "Linha",
    "Column": "Coluna",
    "Probability": "Probabilidade",
    "Show Probability": "Mostre a Probabilidade",
    "Regression Line": "Reta de Regressão",
    "Erase All": "Apagar tudo",
    "Add Point": "Adicionar um ponto",
    "Erase Point": "Apagar um ponto",
    "Reference Site": "Local de referência",
    "Lot Size": "Tamanho do Lote",
    "Defect Size": "Número com defeitos",
    "Defect Rate": "taxa de defeito",
    "If typed": "Após digitar o número, clique [Execute] / [Enter]",
    "Stat/BoxPlot": "Estatística/BoxPlot",
    "Mean": "Média",
    "Std Dev": "Desvio Padrão",
    "OneGroup": "(um grupo)",
    "AnalysisVar": "Análise Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Grupo",
    "GroupVar2": "X Var",
    "GroupVar3": "Fator1",
    "GroupVar4": "Fator2",
    "AnalysisVarMu12": "Análise(or X1) Var",
    "GroupVarMu12": "Grupo(or X2) Var",
    "PairedMu12": " X1, X2 : Emparelhado Var",
    "SizeVar": "Tamanho da Variável",
    "RegressionBand": "banda de confiança",
    "RegressionTable": "Análise de Regressão",
    "RegressionResidual": "Gráfico de Resíduos",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Gráfico",
    "RegressionQQ": "Residual Gráfico Q-Q",
    "HistogramNormal": "Histograma",
    "HistogramChisq": "Teste de Normalidade",
    "HistogramNormalQQ": "Normal Gráfico Q-Q",
    "PopulationStd": "Desvio Padrão Populacional",
    "Type1Error": "Erro Tipo I",
    "Type2Error": "Erro Tipo II",
    "AnovaTable": "Tabela ANOVA",
    "AnovaMeanGraph": "Intervalo de Confiança para a Média",
    "MultipleComparison": "Comparações Múltiplas",
    "ComparisonGraph": "Gráfico de Comparação",
    "AnovaResidual": "gráfico de resíduos",
    "AnovaQQ": "Residual Gráfico Q-Q",
    "TestingFit": "Teste de Bondade de Ajuste",
    "FitTest0": "Distr. Observadas e Teóricas são diferentes",
    "FitTest1": "Distr. Observadas e Teóricas são equivalentes",
    "ObservedFreq": "Frequência Observada O",
    "ExpectedProb": "Probabilidade Esperada p",
    "ExpectedFreq": "Frequência Esperada E(>5)",
    "InputFitData": "Entre com as observações (frequências) a partir da casela superior à esquerda",
    "ExecuteTable": "Estatística",
    "MeanDotGraph": "Gráfico com Intervalos de Confiança",
    "ScatterRegression": "Diagrama de Dispersão",
    "Factor": "Fator",
    "Interaction": "Interação",
    "NoInteraction": "Sem Interação",
    "ExistInteraction": "Existe Interação",
    "eStatLecture": "Aula eStat",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Teste da Soma dos Postos (Wilcoxon-Mann-Whitney)", 
    "NonParametricMu12": "Teste da Soma dos Postos : Parâmetro de Locação M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Teste da Soma dos Postos",
    "Sample Range": "Amplitude Amostral",
    "DistributionTable": "Tabela de Distribuição",
    "SignedRankTestDist": "Wilcoxon Distribuição da Soma da Classificação Assinada",
    "WilcoxonTestDist": "Wilcoxon Distribuição de soma de posição",
    "KruskalTestDist": "Kruskal-Wallis H Distribuição",
    "FriedmanTestDist": "Friedman S Distribuição",
    "SignedRankTest": "Teste da Soma dos Postos Sinalizados",
    "SignTest": "Teste dos sinais",
    "SignCount": "Contagem dos sinais",
    "KruskalTest": "Teste de Kruskal-Wallis",
    "KruskalTestANOVA": "Teste de Kruskal-Wallis",
    "Total": "Total",
    "FriedmanTest": "Teste de Friedman",
    "FriedmanTestANOVA": "Teste de Friedman",
    "Block": "Bloco",
    "Treatment": "Tratamento",
    "At least one locations is different": "Pelo menos um par de médias difere",
    "SignCondition": "n ≤ 100 Teste Binomial,  n > 100 Teste Aproximado pela Normal",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon Rank Soma Teste,  n > 20 Teste Aproximado pela Normal",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Soma Teste,  n>25 Teste Aproximado pela Normal",
    "KruskalCondition": "n ≤ 10 H Distribuição Teste,  else &chi;&#178; approximado teste",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* seleção de variáveis : Click var name or use RHS selection box ",
    "VariableSelect3": "seleção de variáveis",
    "VariableSelect4": "Mais variáveis ​​de análise podem ser selecionadas",
    "VariableSelect5": "Mais variáveis X podem ser selecionadas",
    "SummaryData": "Dados resumidos",
    "RawData": "Dados não tratados",
    "MultiSelect": "",
    "DataType": "(Selecionar variável por nome da variável de clique)",
    "by": "de",
    "NameVar": "Var de nome",
    "n_variance": "n-1 Fórmula",
    "RandomNumber": "Número aleatório",
    "RealNumber":     "Número real",
    "IntegerNumber":  "Número inteiro",
    "NumberData":     "Número de dados",
    "NumberDigit":    "Dígito Decimal",
    "NormalTable":    "Tabela de Distribuição Normal",
    "Percentile":     "Tabela percentual",
    "PercentileValue": "Percentual",
    "StudentRangeDist": "Distribuição de Faixa",
    "copy link": "link de cópia",
    "WithoutReplacement": "Sem substituição",
    "WithReplacement":    "Extração de restauração",
    "Replacement":     "Extração de restauração",
    "NonReplacement":  "Sem substituição",
    "WordCloud":       "Nuvem de palavras (inglês)",
    "oneColor":        "cor",
    "defaultColor":    "cor padrão",
    "RelativeFreq":    "Frequência relativa",
    "Density":         "Densidade",
    "MarginOfError":   "Margem de erro",
    "Permutation":     "Permutação",
    "PermutationSame": "Permutação com a mesma coisa",
    "Combination":     "Combinação",
    "NumberOfCase":    "Número de casos",
    "BinomialTheorem": "Teorema Binomial",
    "PascalTriangle":  "Triângulo Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Regra de adição de probabilidade",
    "MultiplicationRule":"Regra de probabilidade de multiplicação",
    "ConditionalProb":   "Probabilidade Condicional",
    "JointProb":         "Probabilidade conjunta",
    "DiscreteDist":      "Distribuição Discreta",
    "Categorize":        "Categorizar",
    "Recode":            "Recodificar",
    "Compute":           "Calcular",
    "SelectIf":          "Selecione se",
    "InfoValueLabel":    "*** Selecione a variável, insira o nome da variável e / ou rótulo do valor.",
    "InfoSorting":       "*** Selecione a variável de classificação, insira o método de classificação de até 3 variáveis.",
    "InfoCategorize":    "*** Selecione a variável para a categoria, digite 'Início do intervalo' e 'Largura do intervalo'.",
    "InfoRecode":        "*** Selecione a variável para Recode, digite 'Novo Valor'.",
    "InfoRecode2":       "* Permitir a gravação de até 9 valores.",
    "InfoCompute":       "*** Crie fórmula de computação usando os botões abaixo.",
    "InfoSelectIf":      "*** Selecione até 3 variáveis, insira suas condições.",
    "SortingVariable":   "Variáveis ​​de classificação",
    "SortingMethod":     "Método de Classificação",
    "NewVariable":       "Nova Variável",
    "CategoryVariable":  "Categorizar Variável",
    "CategoryListCheck": "Verificação da lista de categorias",
    "CategoryInterval":  "Intervalo de categoria",
    "CategoryLabel":     "Etiqueta da categoria",
    "RecodeVariable":    "Variável de recodificação",
    "CurrentValue":      "Valor atual",
    "NewValue":          "Novo valor",
    "ComputeFormula":    "Fórmula",
    "SelectVariable":    "Variável <br> para selecionar",
    "RelationOperator":  "Relação <br> Operador",
    "SelectValue":       "Valor",
    "MissingValue":      "valor faltando",
    "option":            "opção",                                       
    "TimeSeries":        "Série Temporal",
    "Smoothing":         "Suavizando",
    "Filtering":         "Filtragem",
    "Transformation":    "Transformação",
    "Weight":            "Peso",
    "PercentChange":     "Alterar Porcentagem",
    "WeightedIndex":     "Índice Simples",
    "BaseTime":          "Hora Base",
    "LagTime":           "Tempo de atraso",
    "Lag":               "Atraso",
    "Forecasting":       "Previsão",
    "SeasonalModel":     "Modelo Sazonal",
    "HoltWinter":        "Modelo Sazonal Holt-Winters",
    "Trend":             "Tendência",
    "Seasonal":          "Sazonal",
    "Deseasonal":        "Série Desazonal",
    "Nseason":           "Tempos na Temporada",
    "Irregular":         "Irregular",
    "TrendModel":        "Modelo de Tendência em Sazonal",
    "RegressionModel":   "Modelo de regressão",
    "ForecastingPeriod": "Período de previsão",
    "CreateTable":       "Tabela de dados",
    "SaveTable":         "Salvar Tabela",
    "MA":                "Média Móvel",
    "EWMA":              "Modelo EWMA",
    "CenterMA":          "Média Móvel Centrada",
    "MovingMedian":      "Media Móvel Centrada",
    "ES":                "Suavização Exponencial",
    "Default":           "Predefinição",
    "Linear":            "Linear",
    "Quadratic":         "Quadrático",
    "Cubic":             "Cúbico",
    "SquareRoot":        "Raiz quadrada",
    "Log":               "Logarítmico",
    "Exponent":          "Exponencial",
    "Power":             "Poder",
    "BoxCox":            "Caixa-Cox",
    "SingleMA":          "Média Móvel Única",
    "SingleES":          "Alisamento Exponencial Simples",
    "DoubleMA":          "Média Móvel Dupla",
    "DoubleES":          "Suavização Exponencial Dupla",
    "HoltLinear":        "Alisamento Exponencial Holt",
    "DeseasonIntercept": "Interceptação dessazonalizada",
    "DeseasonSlope":     "Inclinação dessazonalizada",
    "SeasonalIndex":     "Índice Sazonal",
    "Diff":              "Diferença",
    "DiffTime":          "Tempo Diferencial",
    "AR":                "Modelo Autoregressivo",
    "ResultTable":       "Resultado da regressão",
    "ForecastTable":     "Tabela de Previsão",
    "HoltLevel":         "Nível",
    "HoltTrend":         "Tendência",
    "AutoCorrTable":     "Tabela de Autocorrelação",
    "DiffSeries":        "Série Diferencial",
    "RawSeries":         "Série Bruta",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Portugese
appStr[0][11] = "/estat/eStat/index.html";
appStr[1][11] = "/estat/eStatH/index.html";
appStr[2][11] = "/estat/eStatU/index.html";
appStr[3][11] = "/estat/eStatE/index_en.html";
appStr[4][11] = "/estat/eHelp/index_en.html";
appStr[5][11] = "index.html";
appStr[6][11] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][11] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][11] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][11] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][11] = "";
appStr[11][11] = "Large Population Country";
appStr[12][11] = "Life Expectancy (OECD)";
appStr[13][11] = "Population Pyramid (Korea)";
appStr[14][11] = "GNP per Capita (OECD)";
appStr[15][11] = "Top World Export Country";
appStr[16][11] = "Obesity % of Population";
appStr[17][11] = "Temperature of Major City";
appStr[18][11] = "Top CO2 Emission Country";
appStr[19][11] = "Alcohol Consume (OECD)";
appStr[20][11] = "Continuous Data Graph";
appStr[21][11] = "Length of Otter";
appStr[22][11] = "Age of Teacher";
appStr[23][11] = "Age of Teacher by Sex";
appStr[24][11] = "Cleanliness of Tooth";
appStr[25][11] = "Math Exam Scores";
appStr[26][11] = "Calorie of Hamberger";
appStr[27][11] = "Height vs Weight by Sex";
appStr[28][11] = "Discrete Data Graphs";
appStr[29][11] = "";
appStr[30][11] = "";
appStr[31][11] = "unit";
appStr[32][11] = "Country";
appStr[33][11] = "Male";
appStr[34][11] = "Female";
appStr[35][11] = "Age";
appStr[36][11] = "Person";
appStr[37][11] = "billion $";
appStr[38][11] = "Export";
appStr[39][11] = "Obesity %";
appStr[40][11] = "Celsius";
appStr[41][11] = "City";
appStr[42][11] = "Jan High";
appStr[43][11] = "Jul High";
appStr[44][11] = "million ton";
appStr[45][11] = "liter/year";
appStr[46][11] = "Alcohol";
alertMsg[1][11] = "Uma das variáveis selecionadas não contém observações.";
alertMsg[2][11] = "Selecione as variáveis para a análise uma por uma (clique nos nomes das colunas). Se houverem duas variáveis, a primeira deve ser a de agrupamento.";
alertMsg[3][11] = "Dados faltantes para variável selecionada.";
alertMsg[4][11] = "A análise não será executada se os números de observações das variáveis selecionadas forem diferentes.";
alertMsg[5][11] = "Muitos grupos! Os gráficos podem se sobrepor devido ao tamanho da janela gráfica.";
alertMsg[6][11] = "A análise estatística ou tabela não serão realizadas se os dados resumos da variável em análise incluírem caracteres.";
alertMsg[7][11] = "A análise estatística ou tabela não serão realizadas se mais de três variáveis forem selecionadas..";
alertMsg[8][11] = "O gráfico de pontos só é permitido para número de observações inferior a 200..";
alertMsg[9][11] = "O gráfico Ramo-e-Folhas só é permitido para número de observações inferior a 100.";
alertMsg[10][11] = "Variável de análise não selecionada.";
alertMsg[11][11] = "Variável de análise/grupo não selecionada.";
alertMsg[12][11] = "A análise estatística ou tabela não serão realizadas se a variável selecionada incluir observações tipo caractere.";
alertMsg[13][11] = "";
alertMsg[14][11] = "Gráficos e testes para variáveis contínuas não podem ser realizados se os dados estiverem na forma resumida.";
alertMsg[16][11] = "Apenas dois grupos são permitidos neste tipo de teste.";
alertMsg[17][11] = "Diagrama de dispersão requer duas variáveis (x e y).";
alertMsg[18][11] = "Mais de três variáveis ​​não são permitidas.";
alertMsg[19][11] = "Se houver um caractere nos dados, as análises não podem ser feitas.";
alertMsg[20][11] = "Se a data incluir observação tipo caractere, regression não pode ser construído.";
alertMsg[21][11] = "Se existirem caselas vazias nos dados não será permitido salvar.";
alertMsg[22][11] = "Se existirem valores negativos o gráfico de barras não pode ser construído.";
alertMsg[25][11] = "O gráfico de barras empilhado exige mais de um grupo.";
alertMsg[27][11] = "Se houver apenas um grupo, o gráfico de barras não será permitido.";
alertMsg[29][11] = "Se houver apenas um grupo, o gráfico de barras não será permitido.";
alertMsg[31][11] = "Se houver apenas um grupo, o gráfico de barras não será permitido.";
alertMsg[32][11] = "Se existirem valores negativos o gráfico de setores não pode ser construído.";
alertMsg[33][11] = "Se existirem valores negativos o gráfico em anel não pode ser construído.";
alertMsg[34][11] = "Se existirem valores negativos o gráfico de faixas/bandas não pode ser construído.";
alertMsg[35][11] = "Se existirem valores negativos a tabela de frequências não pode ser construída.";
alertMsg[36][11] = "Esse gráfico de barras exige dois grupos.";
alertMsg[37][11] = "Esse teste de hipótese exige uma única variável.";
alertMsg[38][11] = "mu é NaN. Entre com um valor e repita!";
alertMsg[39][11] = "O desvio padrão é zero ou NaN. Entre com um valor positivo e repita!";
alertMsg[40][11] = "A variância fornecida é NaN. Entre com um valor positivo e repita!";
alertMsg[41][11] = "Esse teste de hipótese exige duas variáveis. A variável de agrupamento deve conter apenas dois grupos.";
alertMsg[42][11] = "Não é permitido editar o título do teste de hipótese!";
alertMsg[43][11] = "Regressão Linear Simples é para um único grupo.";
alertMsg[44][11] = "1o: Nome, 2o: latitude, 3o: longitude; 4o: Variável em Análise(opcional)";
alertMsg[45][11] = "Não é possível desenhar o gráfico GIS para mais de cinco variáveis.";
alertMsg[46][11] = "O mesmo número variável é selecionado.";
alertMsg[47][11] = "Dados de caracteres em frequência não são permitidos !! Tente novamente.";
alertMsg[48][11] = "Dados de personagem não são permitidos !! Tente novamente.";
alertMsg[49][11] = "O número de observações deve ser inferior a 100 !! Tente novamente.";
alertMsg[50][11] = "Insira os números no início ou etapa do intervalo.";
alertMsg[51][11] = "Insira os números / O número de linhas deve ser o mesmo !! Tente novamente.";
alertMsg[52][11] = "Digite os números na categoria e frequência.";
alertMsg[53][11] = "O tamanho do intervalo não é o mesmo !! Tente novamente.";
alertMsg[54][11] = "A observação X não é igual à observação Y !! Tente novamente.";
alertMsg[55][11] = "!!! Não há dados na planilha.";
alertMsg[56][11] = "!!! Nenhuma variável selecionada";
alertMsg[57][11] = "!!! Insira o início do intervalo e a largura do intervalo";
alertMsg[58][11] = "!!! Insira o início do intervalo numérico e a largura do intervalo";
alertMsg[59][11] = "!!! Mais de 9 intervalos - altere a largura do intervalo";
alertMsg[60][11] = "!!! Esta variável tem mais de 9 valores";
alertMsg[61][11] = "!!! Nenhum valor inserido";
alertMsg[62][11] = "!!! Insira a fórmula";
alertMsg[63][11] = "!!! Nenhum dado que satisfaça as condições.";
alertMsg[64][11] = "";
alertMsg[65][11] = ""; 
alertMsg[66][11] = "";
alertMsg[67][11] = "";
alertMsg[68][11] = "";
alertMsg[69][11] = "";

svgStr[1][11] = " Gráfico de Barras";
svgStr[2][11] = " Gráfico de Setores";
svgStr[3][11] = " Gráfico de Anel/Rosca";
svgStr[4][11] = " Gráfico de Faixas/Bandas";
svgStr[5][11] = " Gráfico de Linha";
svgStr[6][11] = " Gráfico de Pontos";
svgStr[7][11] = " Box Plot";
svgStr[8][11] = " Gráfico Ramo-e-Folhas";
svgStr[9][11] = " Histograma";
svgStr[10][11] = " Diagrama de Dispersão";
svgStr[11][11] = " Teste de Hipóteses: Média Populacional";
svgStr[12][11] = " Teste de Hipóteses: Variância Populacional";
svgStr[13][11] = " Teste de Hipóteses: Médias de Duas Populações";
svgStr[14][11] = " Teste de Hipóteses: Variâncias de Duas Populações";
svgStr[15][11] = " Análise de Variância";
svgStr[16][11] = "Frequência";
svgStr[17][11] = "Razão";
svgStr[18][11] = "Grupo ";
svgStr[19][11] = " ";
svgStr[20][11] = "<h3>Resumo dos Dados<br>Tabela de Frequência</h3>";
svgStr[21][11] = "Variável de Agrupamento";
svgStr[22][11] = "Variável na Linha";
svgStr[23][11] = "Total";
svgStr[24][11] = "Tamanho do círculo";
svgStr[25][11] = "<h3>Tabela de Frequências</h3>";
svgStr[26][11] = "Var Resposta";
svgStr[27][11] = "Valor da Variável";
svgStr[28][11] = "Rótulo do Valor";
svgStr[29][11] = "Frequência";
svgStr[30][11] = "Frequência relativa";
svgStr[31][11] = "<h3>Tabela Cruzada</h3>";
svgStr[32][11] = "Variável na Coluna";
svgStr[33][11] = "Variável na Linha";
svgStr[34][11] = "Média"
svgStr[35][11] = "Desvio Padrão"
svgStr[36][11] = "<h3> Histograma<br>Tabela de Frequências</h3>";
svgStr[37][11] = "Nome do Grupo";
svgStr[38][11] = "Intervalo";
svgStr[39][11] = "Ramo";
svgStr[40][11] = " Folha";
svgStr[41][11] = "Grupo 1  Folha";
svgStr[42][11] = "Grupo 2  Folha"
svgStr[43][11] = "<h3>Estatísticas Básicas</h3>";
svgStr[44][11] = "Observação";
svgStr[45][11] = "Minimo";
svgStr[46][11] = "Mediana";
svgStr[47][11] = "Máximo";
svgStr[48][11] = "Total";
svgStr[49][11] = "<h3>Teste de Normalidade</h3>";
svgStr[50][11] = "Frequência Esperada > 5 <br> recomendado";
svgStr[51][11] = "&chi;&#178; Teste<br>Intervalo i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][11] = "Dados<br>Frequência Observada<br>(O<sub>i</sub>)";
svgStr[53][11] = "Distribuição Normal<br>Probabilidade Esperada<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][11] = "Distribuição Normal<br>Frequência Esperada<br>(E<sub>i</sub>)";
svgStr[55][11] = "Intervalo<br>&chi;&#178; valor<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][11] = "Soma of &chi;&#178; valor";
svgStr[57][11] = "Hitograma and Distribuição Normal";
svgStr[58][11] = "Normal Gráfico Q-Q";
svgStr[59][11] = "Normal Quantil";
svgStr[60][11] = "Coeficiente de Correlação";
svgStr[61][11] = "Coeficiente de Determinação";
svgStr[62][11] = "Erro Padrão";
svgStr[63][11] = "Variável";
svgStr[64][11] = "Nome da Variável";
svgStr[65][11] = "Variável Independente";
svgStr[66][11] = "Variável Dependente";
svgStr[67][11] = "parâmetro";
svgStr[68][11] = "valor estimado";
svgStr[69][11] = "valor";
svgStr[70][11] = "Intercepto";
svgStr[71][11] = "Inclinação";
svgStr[72][11] = "Fator";
svgStr[73][11] = "Soma de Quadrados";
svgStr[74][11] = "graus de liberdade";
svgStr[75][11] = "Quadrado Médio";
svgStr[76][11] = "Regressão";
svgStr[77][11] = "Erro";
svgStr[78][11] = "Total";
svgStr[79][11] = "<h3>Análise de Regressão</h3>";
svgStr[80][11] = "Resíduo padronizado Q-Q gráfico";
svgStr[81][11] = "Resíduo padronizado";
svgStr[82][11] = "Quantil Normal";
svgStr[83][11] = "Gráfico de Resíduos";
svgStr[84][11] = "valor predito";
svgStr[85][11] = "ANOVA com dois fatores";
svgStr[86][11] = "Gráfico com Intervalos de Confiança";
svgStr[87][11] = "Residual";
svgStr[88][11] = "Estatísticas de duas dimensões";
svgStr[89][11] = "Matriz de Diagramas de Dispersão";
svgStr[90][11] = "Comparações Múltiplas";
svgStr[91][11] = "Estatística";
svgStr[92][11] = "Fator";
svgStr[93][11] = "Nivel";
svgStr[94][11] = "Amostras pareadas dados gráfico";
svgStr[95][11] = "Residual vs predito gráfico";
svgStr[96][11] = "Residual vs Alavancagem gráfico";
svgStr[97][11] = "Distância de Cook gráfico";
svgStr[98][11] = "Distância de Cook";
svgStr[99][11] = "Ordem dos Dados";
svgStr[100][11]= "Diferença média";
svgStr[101][11]= "Teste para uma média";
svgStr[102][11]= "Tratamento";
svgStr[103][11]= "Interação";
svgStr[104][11]= "Total nas Linhas";
svgStr[105][11]= "Total nas Colunas";
svgStr[106][11]= "Coeficiente de Correlação Múltipla";
svgStr[107][11]= "<h3>Análise de Correlação</h3>";
svgStr[108][11]= "Matriz de Correlação";
svgStr[109][11]= "Fator A - Fator B média gráfico";
svgStr[110][11]= "Alavancagem";
svgStr[111][11]= "Gráfico de Informação Geográfica";
svgStr[112][11]= "Alcance";
svgStr[113][11]= "Média - Desvio Padrão Gráfico";
svgStr[114][11]= "Variância Populacional";
svgStr[115][11]= "Hipótese";
svgStr[116][11]= "Teste";
svgStr[117][11]= "Variância";
svgStr[118][11]= "Valor do intervalo";
svgStr[119][11]= "Categoria";
svgStr[120][11] = "Modo";
svgStr[121][11] = "Covariância";
svgStr[122][11] = "Triângulo de Pascal";
svgStr[123][11] = "Probabilidade conjunta";
svgStr[124][11] = "Condicional";
svgStr[125][11] = "Distribuição Discreta";
svgStr[126][11] = "fileira %";
svgStr[127][11] = "coluna %";
svgStr[128][11] = "total %";
svgStr[129][11] = "Matriz de gráfico de barras";
svgStr[130][11] = "Problema anterior";
svgStr[131][11] = "Autovalor";
svgStr[132][11] = "Vetor próprio";
svgStr[133][11] = "Tabela de frequência multidimensional";
svgStr[134][11] = "Gráfico de cluster hierárquico";
svgStr[135][11] = "Distância";
svgStr[136][11] = "Único";
svgStr[137][11] = "Concluído";
svgStr[138][11] = "Média";
svgStr[139][11] = "Centróide";
svgStr[140][11] = "Ala";
svgStr[141][11] = "Ligação";;
svgStr[142][11] = "Number of Clusters <br>K";
svgStr[143][11] = "Bayes Information Criteria";
svgStr[144][11] = "Within Sum of Squares";
svgStr[145][11] = "Akaike Information Criteria";

svgStrU[1][11] = "Distribuição Binomial";
svgStrU[2][11] = "Repetição";
svgStrU[3][11] = "Média";
svgStrU[4][11] = "Desvio Padrão";
svgStrU[5][11] = "Distribuição de Poisson";
svgStrU[6][11] = "Distribuição Geométrica";
svgStrU[7][11] = "Distribuição Hipergeométrica";
svgStrU[8][11] = "População";
svgStrU[9][11] = "Distribuição Amostral";
svgStrU[10][11] = "Lei dos Grandes Números";
svgStrU[11][11] = "Cauda";
svgStrU[12][11] = "Cara";
svgStrU[13][11] = "Lado Cara da Moeda";
svgStrU[14][11] = "Número de Caras";
svgStrU[15][11] = "Número de Ensaios";
svgStrU[16][11] = "Distribuição de Médias Amostrais";
svgStrU[17][11] = "Repetição";
svgStrU[18][11] = "Erro Padrão";
svgStrU[19][11] = "Média Populacional";
svgStrU[20][11] = "Intervalo de Confiança";
svgStrU[21][11] = "Acurácia ";
svgStrU[22][11] = "Média Amostral";
svgStrU[23][11] = "[Estatística do Teste]";
svgStrU[24][11] = "Distribuição";
svgStrU[25][11] = "Rejeita-se H\u2080";
svgStrU[26][11] = "Não rejeita-se H\u2080";
svgStrU[27][11] = "valor p";
svgStrU[28][11] = "[Decisão] ";
svgStrU[29][11] = "[ANOVA]";
svgStrU[30][11] = "Entre com o Coeficiente de Correlação e clique Executar";
svgStrU[31][11] = "Regressão";
svgStrU[32][11] = "Variável na Linha";
svgStrU[33][11] = "Variável na Coluna";
svgStrU[34][11] = "Média"
svgStrU[35][11] = "Desvio Padrão"
svgStrU[36][11] = "<h3> Histograma<br>Tabela de Frequências</h3>";
svgStrU[37][11] = "Nome do Grupo";
svgStrU[38][11] = "Intervalo";
svgStrU[39][11] = "Ramo";
svgStrU[40][11] = " Folha";
svgStrU[41][11] = "Grupo 1 Folha";
svgStrU[42][11] = "Grupo 2 Folha"
svgStrU[43][11] = "<h3>Estatísticas Básicas</h3>";
svgStrU[44][11] = "Observação";
svgStrU[45][11] = "Minimo";
svgStrU[46][11] = "Mediana";
svgStrU[47][11] = "Máximo";
svgStrU[48][11] = "Total";
svgStrU[49][11] = "Exponencial";
svgStrU[50][11] = "Uniforme";
svgStrU[51][11] = "Acurácia ";
svgStrU[52][11] = "- Crie pontos clicando nas posições desejadas e então eStat encontrará a reta de regressão.";
svgStrU[53][11] = "- Arraste um ponto ou apague-o. Observe a mudança na reta de regressão.";
svgStrU[54][11] = "[Estatísticas Amostrais] ";
svgStrU[55][11] = "[Estatísticas Amostrais 1] ";
svgStrU[56][11] = "[Estatísticas Amostrais 2] ";
svgStrU[57][11] = "Coeficiente de Confiança";
svgStrU[58][11] = "Variáveis na linha e coluna da tabela são independentes";
svgStrU[59][11] = "Dependência entre Linhas e Colunas";
svgStrU[60][11] = "Distribuição Observada";
svgStrU[61][11] = "Distribuição Teórica";
svgStrU[62][11] = "Teste de Bondade de Ajuste";
svgStrU[63][11] = "Teste da Soma dos Postos (Wilcoxon-Mann-Whitney)";
svgStrU[64][11] = "Teste da Soma dos Postos Tabela";
svgStrU[65][11] = "Kruskal-Wallis Teste";
svgStrU[66][11] = "Kruskal-Wallis H Distribuição";
svgStrU[67][11] = "Kruskal-Wallis H Estatistica";
svgStrU[68][11] = "Teste da Soma dos Postos Sinalizados de Wilcoxon";
svgStrU[69][11] = "Teste dos sinais";
svgStrU[70][11] = "Friedman Teste";
svgStrU[71][11] = "Friedman S Estatistica";
svgStrU[72][11] = "Friedman S Distribuição";
svgStrU[73][11] = "valor t (Z)";
svgStrU[74][11] = "valor ChiSq";
svgStrU[75][11] = "Variância Amostral";
svgStrU[76][11] = "diferença de médias amostrais";
svgStrU[77][11] = "proporção de variância da amostra";
svgStrU[78][11] = "Suposição sobre as variâncias";
svgStrU[79][11] = "Dados resumidos";
svgStrU[80][11] = "seleção múltipla";
svgStrU[81][11] = "Selecione até dois grupos";
svgStrU[82][11] = "Var X";
svgStrU[83][11] = "Var Y";
svgStrU[84][11] = "de";
svgStrU[85][11] = "Nenhuma variável de grupo";
svgStrU[86][11] = "Dados selecionados: ";
svgStrU[87][11] = "Dados não tratados";
svgStrU[88][11] = "Selecionar variável por nome da variável de clique";
svgStrU[89][11] = "Observações em falta";
svgStrU[90][11] = "Soma dos Postos";
svgStrU[91][11] = "Longitude";
svgStrU[92][11] = "Latitude";
svgStrU[93][11] = "Pelo menos um par de médias difere";
svgStrU[94][11] = "Distribuição da Soma dos Postos Sinalizados de Wilcoxon";
svgStrU[95][11] = "Emparelhado Var";
svgStrU[96][11] = "Dados Emparelhado";
svgStrU[97][11] = "Teste de Independência";
svgStrU[98][11] = "Simulação";
svgStrU[99][11] = "Número aleatório";
svgStrU[100][11] = "Distribuição normal";
svgStrU[101][11] = "Distribuição t";
svgStrU[102][11] = "Distribuição &chi;&#178;";
svgStrU[103][11] = "Distribuição F";
svgStrU[104][11] = "Distribuição HSD";
svgStrU[105][11] = "primeiro quartil";
svgStrU[106][11] = "Terceiro quartil";
svgStrU[107][11] = "Interquartile Range";
svgStrU[108][11] = "Coeficiente de determinação";
svgStrU[109][11] = "Freqüência Relativa Cumulada (%)";
svgStrU[110][11] = "Número máximo de números inteiros de distribuição uniforme";
svgStrU[111][11] = "Mover um ponto com o mouse";
svgStrU[112][11] = "Extração de restauração";
svgStrU[113][11] = "Sem substituição";
svgStrU[114][11] = "Linha"; 
svgStrU[115][11] = "Percentual de alteração";
svgStrU[116][11] = "Índice simples";
svgStrU[117][11] = "Atraso de tempo";
svgStrU[118][11] = "Diferença";
svgStrU[119][11] = "Autocorrelação";
svgStrU[120][11] = "Log";
svgStrU[121][11] = "Raiz quadrada";
svgStrU[122][11] = "Box-Cox";
svgStrU[123][11] = "Hora base";
svgStrU[124][11] = "Média Móvel Centrada";
svgStrU[125][11] = "Suavização exponencial";
svgStrU[126][11] = "Media móvel centralizada";
svgStrU[127][11] = "Modelo";
svgStrU[128][11] = "Média móvel";
svgStrU[129][11] = "Média Móvel Dupla";
svgStrU[130][11] = "Holt suavização exponencial dupla";
svgStrU[131][11] = "Índice sazonal";
svgStrU[132][11] = "Modelo Sazonal Multiplicativo de Holt-Winters";
svgStrU[133][11] = "Série Fora de Temporada";
svgStrU[134][11] = "Bloco";
svgStrU[135][11] = "Análise de Cluster";
svgStrU[136][11] = "Cluster";
svgStrU[137][11] = "Árvore de Decisão";
svgStrU[138][11] = "Condição da Regra de Decisão";
svgStrU[139][11] = "Decisão";
svgStrU[140][11] = "Iteração";
svgStrU[141][11] = "Gráfico Paralelo";
svgStrU[142][11] = "Classificação";
svgStrU[143][11] = "Função de classificação";
svgStrU[144][11] = "Resultado da Classificação";
svgStrU[145][11] = "Decisão";
svgStrU[146][11] = "Taxa de classificação incorreta";
svgStrU[147][11] = "Célula";
svgStrU[148][11] = "Dados de treinamento";
svgStrU[149][11] = "Dados de teste";


// Greek
$message.gr = {
    "eStat : Stat Education SW": "eStat : Στατιστική Εκπαίδευση SW",
    "Home": "Αρχική Σελίδα",
    "Filename": "Όνομα Φακέλου",
    "Selected Variables": "Επιλεγμένες Μεταβλητές",
    "Cancel": "Ακύρωση",
    "Edit Variables": "Επεξεργασία Μεταβλητών",
    "Level": "Επίπεδο",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Παράδειγμα",
    "New Sheets": "Νέο Φύλλο",
    "csv Open": "csv Άνοιγμα",
    "www Open": "www Άνοιγμα",
    "json Open": "json Άνοιγμα",
    "csv Save": "csv Αποθήκευση",
    "json Save": "json Αποθήκευση",
    "Print Sheet": "Εκτύπωση Φύλλου",
    "Bar Graph": "Ραβδογράφημα ",
    "Pie Chart": "Κυκλικό Διάγραμμα",
    "Band Graph": "Διάγραμμα Ζώνης",
    "Line": "Γραμμικό ",
    "Line Graph": "Γραμμικό Διάγραμμα, ",
    "Dot Graph": "Σημειόγραμμα ",
    "Histogram": "Ιστόγραμμα ",
    "Stem & Leaf Plot": "Δενδροδιάγραμμα",
    "maxStem": "** μέγιστος αριθμός στελεχών <= 30 **",
    "Box-Whisker Plot": "Θηκόγραμμα",
    "Scatterplot": "Διάγραμμα Διασκορπισμού",
    "ScatterplotMatrix": "Πίνακας Διαγράμματος Διασκορπισμού",
    "Frequency Table": "Πίνακας Συχνοτήτων",
    "Basic Statistics": "Βασικά Στατιστικά Χαρακτηριστικά",
    "Testing Hypothesis &mu;": "Έλεγχος Υπόθεσης &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Έλεγχος Υπόθεσης &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Έλεγχος Υπόθεσης &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Έλεγχος Υπόθεσης &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Ανάλυση Μεταβλητών",
    "MiddleSchool": "Γυμνάσιο",
    "HighSchool":   "Λύκειο",
    "University":   "Πανεπιστήμιο",
    "eStatHeading": "Το eStat είναι ένα δωρεάν λογισμικό βασισμένο στο διαδίκτυο για καλύτερη Εκπαίδευση Στατιστικής χρησιμοποιώντας δυναμική οπτικοποίηση δεδομένων και γραφική στατιστική ανάλυση.",
    "Support":      "Υποστήριξη",
    "Donation":     "Δωρεά",
    "Middle School Stat Education": "Εκπαίδευση Στατιστικής Γυμνασίου",
    "High School Stat Education": "Εκπαίδευση Στατιστικής Λυκείου",
    "University Stat Education": "Ακαδημαϊκή Εκπαίδευση Στατιστικής",
    "Elem Stat Graph Example": "παραδείγματος γραφήματος",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Κάθετο",
    "Horizontal": "Οριζόντιο",
    "Vertical Separated Bar": "Κάθετο Ραβδογράφημα Διαχωρισμού",
    "Vertical Stacked Bar": "Κάθετο Διάγραμμα Στοιβαζόμενων Γραμμών",
    "Vertical Ratio Bar": "Κάθετο Ραβδογράφημα Αναλογιών",
    "Vertical Side by Side Bar": "Κάθετο Ραβδογράφημα διπλα-δίπλα",
    "Vertical Two Sided Bar": "Κάθετο Δίπλευρο Ραβδογράφημα",
    "Horizontal Separated Bar": "Οριζόντιο Ραβδογράφημα Διαχωρισμού",
    "Horizontal Stacked Bar": "Οριζόντιο Διάγραμμα Στοιβαζόμενων Γραμμών",
    "Horizontal Ratio Bar": "Οριζόντιο Ραβδογράφημα Αναλογιών",
    "Horizontal Side by Side Bar": "Οριζόντιο Ραβδογράφημα δίπλα-δίπλα",
    "Horizontal Two Sided Bar": "Οριζόντιο Δίπλευρο Ραβδογράφημα",
    "Doughnut Graph": "Γράφημα Ντόνατ",
    "Two Sided Stem & Leaf Plot": "Δίπλευρο Διάγραμμα Μίσχου Φύλλου",
    "Graph Save": "Αποθήκευση Γραφήματος",
    "Graph Print": "Εκτύπωση Γραφήματος",
    "Move to Table": "Μετακίνηση στον Πίνακα",
    "Edit Title": "Επεξεργασία Τίτλου",
    "Table Save": "Αποθήκευση Πίνακα",
    "Table Print": "Εκτύπωση Πίνακα",
    "Frequency": "Συχνότητα",
    "Sorting": "Ταξινόμηση",
    "SortData": "Ταξινόμηση",
    "Raw Data": "Ακατέργαστα Δεδομμένα",
    "Descending": "Φθίνουσα Σειρά",
    "Ascending": "Αύξουσα Σειρά",
    "Mean": "Μέσος",
    "Std Deviation": "Τυπική Απόκλιση",
    "MeanStd": "Μέσος/Τυπική Απόκλιση",
    "DotMeanStd": "Σημειόγραμμα - Μέσος/Τυπική Απόκλιση",
    "95CI": "95% Διάστημα Εμπυστοσύνης",
    "CorrelationAnalysis": "Ανάλυση συσχέτισης",
    "RegressionAnalysis": "Ανάλυση Παλινδρόμησης",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Ανάλυση Διακύμανσης Δύο Παραγόντων",
    "Regression": "Παλινδρόμηση",
    "RegressionLine": "Ευθεία Παλινδρόμησης",
    "RegressionBand": "Ζώνη Εμπιστοσύνης",
    "RegressionTable": "Ανάλυση Παλινδρόμησης",	
    "Frequency Polygon": "Πολύγωννο συχνοτήτων",
    "Execute New Interval": "Εκτελέστε Νέο Διάστημα",
    "Interval Start": "Αρχή Διαστήματος",
    "Interval Width": "Πλάτος Διαστήματος",
    "t-test": "t Έλεγχος",
    "Z-test": "Z Έλεγχος",
    "(if Z-test, enter &sigma;)": "(αν Ζ-τεστ, καταχωρείστε &sigma;)",
    "Significance Level": "Επίπεδο Σημαντικότητας",
    "Execute": "Εκτέλεση",
    "(Confidence Interval)": "(Διάστημα Εμπυστοσύνης)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(αν Ζ-τεστ, χρησιμοποιήστε Z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178; Έλεγχος",
    "Variance Assumption": "Υπόθεση Διασποράς",
    "Variance": "Υπόθεση",
    "F test": "F Έλεγχος",
    "At least one pair of means is different": "Τουλάχιστον ένα ζευγάρι μέσων να είναι διαφορετικοί",
    "Main Title": "Κύριος Τίτλος",
    "y title": "τίτλος y",
    "x title": "τίτλος x",
    "yAxis": "Άξονας Υ",
    "Modify": "Τροποποιείστε",
    "Confirm": "Επιβεβαιώστε",
    "Variable Name": "Όνομα Μεταβλητης",
    "Variable Value": "Τιμή Μεταβλητής",
    "Value Label": "Χαρακτηρισμός Τιμής",
    "* Less than nine value labels allowed.": "* Λιγότερες από εννέα τιμές ετικετών είναι δεκτές.",
    "Save": "Αποθήκευση",
    "Exit": "Έξοδος",
    "eStatU UnivStatEdu": "eStatU - Ακαδημαϊκή Εκπαίδευση Στατιστικής SW",
    "eStatH HighStatEdu": "eStatH - Εκπαίδευση Στατιστικής Λυκείου SW",
    "eStatM MiddleStatEdu": "eStatM - Δημοτικό / Στατιστικά Γυμνασίου SW",
    "MiddleStat": "Στατιστικά Γυμνασίου",
    "HighStat":   "Στατιστικά Λυκείου",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Μενού",
    "Binomial Experiment": "Διωνυμικό Πείραμα",
    "Binomial Distribution": "Διωνυμική Κατανομή",
    "Binomial Prob Table": "Διωνυμικός Πίνακας Πιθανοτήτων",
    "Poisson Distribution": "Poisson Κατανομή",
    "Poisson Prob Table": "Poisson Πίνακας Πιθανοτήτων",
    "Geometric Distribution": "Γεωμετρική Κατανομή",
    "Geometric Prob Table": "Πίνακας Πιθανοτήτων Γεωμετρικής",
    "HyperGeometric Distribution": "Υπεργεωμετρική Κατανομή",
    "HyperGeometric Prob Table": "Πίνακας Πιθανοτήτων Υπεργεωμετρικής",
    "Exponential Distribution": "Εκθετική Κατανομή",
    "Normal Experiment": "Κανονικό Πείραμα",
    "Normal Distribution": "Κανονική Κατανομή",
    "Normal Approx": "Κανονική Προσέγγιση",
    "t Distribution": "Κατανομή t",
    "ChiSquare Distribution": "Κατανομή &chi;&#178;",
    "F Distribution": "Κατανομή F",
    "Sampling": "Δειγματοληψία",
    "Population vs Sample": "Πληθυσμός vs Δείγμα",
    "Population": "Πληθυσμός",
    "Sample": "Δείγμα",
    "Exponential": "Εκθετική(0.3)",
    "Uniform": "Ομοιόμορφη(0,1)",
    "UniformDist": "Ομοιόμορφη",
    "Sample05": "Δείγμα 5%",
    "Sample10": "Δείγμα 10%",
    "Sample20": "Δείγμα 20%",
    "Statistics/BoxPlot": "Στατιστική/Θηκόγραμμα",
    "StatisticalProb":     "Στατιστική πιθανότητα",
    "Law of Large Number": "Νόμος των Μεγάλων Αριθμών",
    "Dist of Sample Means": "Κατανομή των Δειγματικών Μέσων",
    "Sampling Distribution": "Δειγματοληψία Διανομή",
    "Sample Size": "Μέγεθος Δείγματος",
    "Confidence Interval": "Διάστημα Εμπυστοσύνης",
    "Confidence Interval Simulation": "Διάστημα Εμπυστοσύνης προσομοίωση",
    "Simulation": "προσομοίωση",
    "Confidence Interval Mu": "Εκτίμηση : &mu;",
    "Mu Confidence Interval": "Εκτίμηση : &mu;",
    "Confidence Interval Sigma": "Εκτίμηση : &sigma;&#178; ",
    "Confidence Interval P": "Εκτίμηση : p",
    "Estimation Accuracy": "Εκτίμηση Ορθότητας",
    "Repetition": "Επανάληψη",
    "Confidence Level": "Επίπεδο Εμπυστοσύνης",
    "Testing Hypothesis mu_titleAB": "Έλεγχος Μέσων",
    "Testing Hypothesis mu_title": "Έλεγχος Μέσων",
    "Testing Hypothesis sigma_title": "Έλεγχος Διασπορών",
    "Testing Hypothesis P_title": "Έλεγχος Ποσοστών",
    "Testing Hypothesis mu12_title": "Έλεγχος Δύο Μέσων",
    "Testing Hypothesis sigma12_title": "Έλεγχος Δύο Διασπορών",
    "Testing Hypothesis P12_title": "Έλεγχος Δύο Ποσοστών",
    "Testing Hypothesis muA":  "Έλεγχος &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Έλεγχος &mu; - C, n",
    "Testing Hypothesis mu": "Έλεγχος Υπόθεσης &mu;",
    "Testing Hypothesis sigma": "Έλεγχος Υπόθεσης &sigma;&#178;",
    "Testing Hypothesis P": "Έλεγχος Υπόθεσης p",
    "Testing Hypothesis mu12": "Έλεγχος Υπόθεσης &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Έλεγχος Υπόθεσης &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Έλεγχος Υπόθεσης p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Παράγοντας ANOVA",
    "Testing Hypothesis ANOVA2": "2 Παράγοντας ANOVA",
    "SameSampleSize": "Το μέγεθος του δείγματος κάθε κελιού πρέπει να είναι το ίδιο.",
    "Testing Independence": "Έλεγχος Ανεξαρτησίας",
    "CategoryD": "κατηγορία",
    "Category": "κατηγορία",
    "Correlation Coefficient": "Συσχέτισης Συντελεστής",
    "Regression Experiment": "Πείραμα Παλινδρόμησης",
    "Hypothesis": "Υπόθεση",
    "Test Type": "Τύπος Ελέγχου",
    "Z-test": "Z Έλεγχος",
    "t-test": "t Έλεγχος",
    "Chi-test": "&chi;&#178; Έλεγχος",
    "F-test": "F Έλεγχος",
    "Sampling Type": "Τύπος Δειγματοληψίας",
    "Independent Sample": "Ανεξάρτητο Δείγμα",
    "Paired Sample": "δείγμα κατά ζεύγη",
    "Sample Data": "Δεδομένα Δείγματος",
    "input either sample data": "καταχωρείστε ή δειγματικά δεδομένα είτε δειγματικά στατιστικά στα επόμενα κελιά χρησιμοποιώντας αρχεία csv/bsv",
    "input data": "Εισαγάγετε δεδομένα",
    "Sample Statistics": "Δειγματικά Στατιστικά",
    "Sample Mean": "Δειγματικός Μέσος",
    "Sample Variance": "Δειγματική Διασπορά",
    "Sample Proportion": "Δειγματικό Ποσοστό",
    "sample range": "Εύρος δειγμάτων",
    "control chart": "Διάγραμμα ελέγχου",
    "if Z-test-1": "(αν Ζ-τεστ, καταχωρείστε την πλυθισμιακή διασπορά &sigma;&#178;)",
    "if Z-test-2": "(αν Ζ-τεστ, χρησιμοποιήστε z<sub>&alpha;/2 </sub>)",
    "At least one pair": "Τουλάχιστον ένα ζευγάρι μέσων να είναι διαφορετικοί",
    "Row-Col-0": "Γραμμές και στήλες μεταβλητών είναι ανεξάρτητες",
    "Row-Col-1": "Γραμμές και στήλες μεταβλητών δεν είναι ανεξάρτητες",
    "Enter any number of row": "(Καταχωρείστε παρατήρηση από το άνω αριστερά κελί)",
    "Row": "Γραμμή",
    "Column": "Στήλη",
    "Probability": "Πιθανότητα",
    "Show Probability": "Εμφάνιση πιθανότητας",
    "Regression Line": "Ευθεία Παλινδρόμησης",
    "Erase All": "Διαγραφή Όλων",
    "Add Point": "Προσθήκη Σημείου",
    "Erase Point": "Διαγραφή Σημείου",
    "Reference Site": "Θέση Αναφοράς",
    "Lot Size": "Μέγεθος Παρτίδας",
    "Defect Size": "Μέγεθος Ελλατωμάτων",
    "Defect Rate": "ποσοστό ελαττώματος",
    "If typed": "Αφού πληκτρολογήσετε τον αριθμό, [Εκτέλεση] ή [Εισαγωγή])",
    "Stat/BoxPlot": "Στατιστική/Θηκόγραμμα",
    "Mean": "Μέσος",
    "Std Dev": "Τυπική Απόκλιση",
    "OneGroup": "(Μία ομάδα)",
    "AnalysisVar": "Ανάλυση Μεταβλητών",
    "AnalysisVar2": "Y Μεταβλητών",
    "GroupVar": "Ομαδα",
    "GroupVar2": "X Μεταβλητών",
    "GroupVar3": "Παράγοντας 1",
    "GroupVar4": "Παράγοντας2",
    "AnalysisVarMu12": "Ανάλυση Μεταβλητών(or X1)",
    "GroupVarMu12": "Ομαδοποίηση Μεταβλητών(or X2)",
    "PairedMu12": " X1, X2 : ζευγαρωμένο Μεταβλητών",
    "SizeVar": "Μέγεθος Μεταβλητών",
    "RegressionBand": "Ζώνη Εμπιστοσύνης",
    "RegressionTable": "Ανάλυση Παλινδρόμησης",
    "RegressionResidual": "Γράφημα Καταλοίπων",
    "RegressionResidualLeverage": "Γράφημα vs μόχλευση",
    "RegressionCook": "Απόσταση του Cook",
    "RegressionQQ": "Γράφημα Καταλοίπων Q-Q",
    "HistogramNormal": "Ιστόγραμμα ",
    "HistogramChisq": "Έλεγχος Κανονικότητας",
    "HistogramNormalQQ": "Κανονική Κατανομή Q-Q",
    "PopulationStd": "Τυπική Απόκλιση Πληθυσμού",
    "Type1Error": "Σφάλμα Τύπου 1",
    "Type2Error": "Σφάλμα Τύπου 2",
    "AnovaTable": "Πίνακας ANOVA",
    "AnovaMeanGraph": "Διάστημα Εμπιστοσύνης για τον μέσο",
    "MultipleComparison": "Πολλαπλές Συγρίσεις",
    "ComparisonGraph": "Γράφημα σύγκρισης",
    "AnovaResidual": "Τυποποιημένα Κατάλοιπα Γράφημα",
    "AnovaQQ": "Γράφημα Καταλοίπων Q-Q",
    "TestingFit": "Έλεγχος Καλής Προσαρμογής",
    "FitTest0": "Παρατηρηθείσες & Θεωρητικές Κατανομές είναι ίδιες ",
    "FitTest1": "Παρατηρηθείσες & Θεωρητικές Κατανομές είναι διαφορετικές",
    "ObservedFreq": "Παρατηρηθείσα Συχνότητα O",
    "ExpectedProb": "Εκτιμώμενη Πιθανότητα p",
    "ExpectedFreq": "Αναμενόμενη Συχνότητα E(>5)",
    "InputFitData": "Καταχωρείστε παρατήρηση από το άνω αριστερά κελί",
    "ExecuteTable": "Στατιστική",
    "MeanDotGraph": "Διάγραμμα Διαστήματος Εμπιστοσύνης",
    "ScatterRegression": "Διάγραμμα Διασκορπισμού",
    "Factor": "Παράγοντας",
    "Interaction": "Αλληλεπίδραση",
    "NoInteraction": "Χωρίς Αλληλεπίδραση",
    "ExistInteraction": "Υπάρχει Αλληλεπίδραση",
    "eStatLecture": "Εισαγωγική Διάλεξη eStat",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Έλεγχος Αθροίσματος Βαθμίδων του Wilcoxon", 
    "NonParametricMu12": "λεγχος Αθροίσματος Βαθμίδων του Wilcoxon : Θέση Παραμέτρου M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Έλεγχος Αθροίσματος Βαθμίδων του",
    "Sample Range": "αθροιστικό ποσό",
    "DistributionTable": "Πίνακας Κατανομής",
    "SignedRankTestDist": "Προσημικός Έλεγχος Βαθμίδων του Κατανομή",
    "WilcoxonTestDist": "Έλεγχος Αθροίσματος Βαθμίδων  Κατανομή",
    "KruskalTestDist": "Kruskal-Wallis H Κατανομή",
    "FriedmanTestDist": "Friedman S Κατανομή",
    "SignedRankTest": "Προσημικός Έλεγχος Βαθμίδων",
    "SignTest": "Προσημικός Έλεγχος",
    "SignCount": "Προσημική Απαρίθμηση",
    "KruskalTest": "Kruskal-Wallis Έλεγχος",
    "KruskalTestANOVA": "Kruskal-Wallis Έλεγχος",
    "Total": "Ολικό",
    "FriedmanTest": "Friedman Έλεγχος",
    "FriedmanTestANOVA": "Friedman Έλεγχος",
    "Block": "ΟΙΚΟΔΟΜΙΚΟ ΤΕΤΡΑΓΩΝΟ",
    "Treatment": "Θεραπεία",
    "At least one locations is different": "ουλάχιστον ένα ζεύγος τοποθεσιών είναι διαφορετικό",
    "SignCondition": "If n ≤ 100 Διωνυμική,  n > 100 Κανονική Προσέγγιση",
    "WilcoxonSignCondition": "If n ≤ 20 Έλεγχος Αθροίσματος Βαθμίδων του Wilcoxon,  n > 20 Κανονική Προσέγγιση",
    "WilcoxonRankCondition": "If n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Έλεγχος Αθροίσματος Βαθμίδων του Wilcoxon,  n>25 Κανονική Προσέγγιση",
    "KruskalCondition": "If n ≤ 10 H Κατανομή,  αλλού &chi;&#178; προσέγγιση",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "επιλογή μεταβλητών",
    "VariableSelect4": "More Analysis Variable can be selected.",
    "VariableSelect5": "More X Variable can be selected.",
    "SummaryData": "Σύνοψη Δεδομένων",
    "RawData": "Ακατέργαστα Δεδομμένα",
    "MultiSelect": "",
    "DataType": "(Επιλέξτε μεταβλητές για ανάλυση (επιλέξτε ονόματα στηλών) μία προς μία. Αν έχετε δύο μεταβλητές θέστε τη μία ως ομάδα μεταβλητών.)",
    "by": "με",
    "NameVar": "Όνομα μεταβλητή",
    "n_variance": "n-1 τύπος",
    "RandomNumber": "τυχαίο αριθμόr",
    "RealNumber":     "πραγματικός αριθμός",
    "IntegerNumber":  "ακέραιος αριθμός",
    "NumberData":     "Αριθμός δεδομένων",
    "NumberDigit":    "Δεκαδικό ψηφίοt",
    "NormalTable":    "Κανονική προσέγγιση",
    "Percentile":     "Πίνακας ποσοστών",
    "PercentileValue": "εκατοστημόριο",
    "StudentRangeDist": "HSD Εκπαιδευόμενο εύρος διανομής.",
    "copy link": "αντιγραφή συνδέσμου",
    "WithoutReplacement": "χωρίς αντικατάσταση",
    "WithReplacement":    "Εξόρυξη αποκατάστασης",
    "Replacement":     "Εξόρυξη αποκατάστασης",
    "NonReplacement":  "χωρίς αντικατάσταση",
    "WordCloud":       "Word Cloud (Αγγλικά)",
    "oneColor":        "μονόχρωμο",
    "defaultColor":    "προεπιλεγμένο χρώμα",
    "RelativeFreq":    "Σχετική Συχνότητα",
    "Density":         "Πυκνότητα",
    "MarginOfError":   "Περιθώριο σφάλματος",
    "Permutation":     "Μετάθεση",
    "PermutationSame": "Παραλλαγή με το ίδιο πράγμα",
    "Combination":     "Συνδυασμός",
    "NumberOfCase":    "Αριθμός περιπτώσεων",
    "BinomialTheorem": "Διωνυμικό θεώρημα",
    "PascalTriangle":  "Pascal Triangle",
    "Character":       "Emoji",
    "AdditionRule":      "Προσθήκη κανόνας πιθανοτήτων",
    "MultiplicationRule":"Κανόνας πολλαπλασιασμού πιθανοτήτων",
    "ConditionalProb":   "Πιθανότητα υπό όρους",
    "JointProb":         "Κοινή πιθανότητα",
    "DiscreteDist":      "Διακριτή διανομή",
    "Categorize":        "Ταξινομώ",
    "Recode":            "Ανακωδικοποίηση",
    "Compute":           "Υπολογίζω",
    "SelectIf":          "Επιλέξτε εάν",
    "InfoValueLabel":    "*** Επιλέξτε μεταβλητή, εισαγάγετε όνομα μεταβλητής ή/και ετικέτα τιμής.",
    "InfoSorting":       "*** Επιλέξτε μεταβλητή ταξινόμησης, εισαγάγετε μέθοδο ταξινόμησης έως 3 μεταβλητές.",
    "InfoCategorize":    "*** Επιλέξτε μεταβλητή για Κατηγορία, εισαγάγετε Έναρξη Διαστήματος και Πλάτος Διαστήματος.",
    "InfoRecode":        "*** Επιλέξτε μεταβλητή για Recode, πληκτρολογήστε Νέα τιμή.",
    "InfoRecode2":       "* Να επιτρέπεται η εγγραφή έως και 9 τιμών.",
    "InfoCompute":       "*** Δημιουργία υπολογιστικού τύπου χρησιμοποιώντας τα κουμπιά παρακάτω.",
    "InfoSelectIf":      "*** Επιλέξτε έως 3 μεταβλητές, εισαγάγετε τις συνθήκες τους.",
    "SortingVariable":   "Ταξινόμηση μεταβλητών",
    "SortingMethod":     "Μέθοδος ταξινόμησης",
    "NewVariable":       "Νέα μεταβλητή",
    "CategoryVariable":  "Κατηγοριοποίηση μεταβλητής",
    "CategoryListCheck": "Έλεγχος λίστας κατηγορίας",
    "CategoryInterval":  "Διάστημα κατηγορίας",
    "CategoryLabel":     "Ετικέτα κατηγορίας",
    "RecodeVariable":    "Μεταβλητή επανακωδικοποίησης",
    "CurrentValue":      "Τρέχουσα τιμή",
    "NewValue":          "Νέα Αξία",
    "ComputeFormula":    "Τύπος",
    "SelectVariable":    "Μεταβλητή<br>για Επιλογή",
    "RelationOperator":  "Σχέση<br>Χειριστής",
    "SelectValue":       "Αξία",
    "MissingValue":      "λείπει τιμή",
    "option":            "επιλογή",                                        
    "TimeSeries":        "Χρονική σειρά",
    "Smoothing":         "Εξομάλυνση",
    "Filtering":         "Φιλτράρισμα",
    "Transformation":    "Μεταμόρφωση",
    "Weight":            "Βάρος",
    "PercentChange":     "Αλλαγή ποσοστού",
    "WeightedIndex":     "Απλός Ευρετήριο",
    "BaseTime":          "Ώρα βάσης",
    "LagTime":           "Χρόνος καθυστέρησης",
    "Lag":               "Χρονική υστέρηση",
    "Forecasting":       "Πρόβλεψη",
    "SeasonalModel":     "εποχιακό μοντέλο",
    "HoltWinter":        "Holt-Winters Seasonal Model",
    "Trend":             "Τάση",
    "Seasonal":          "Εποχής",
    "Deseasonal":        "Deseasonal Series",
    "Nseason":           "Times in Season",
    "Irregular":         "Ακανόνιστος",
    "TrendModel":        "Trend Model on Deseasonal",
    "RegressionModel":   "Μοντέλο παλινδρόμησης",
    "ForecastingPeriod": "Περίοδος Πρόβλεψης",
    "CreateTable":       "Πίνακας δεδομένων",
    "SaveTable":         "Αποθήκευση πίνακα",
    "MA":                "Κινούμενος μέσος όρος",
    "EWMA":              "Μοντέλο EWMA",
    "CenterMA":          "Κεντρικός κινούμενος μέσος όρος",
    "MovingMedian":      "Κεντρική κινούμενη διάμεσος",
    "ES":                "Εκθετική εξομάλυνση",
    "Default":           "Προκαθορισμένο",
    "Linear":            "Γραμμικός",
    "Quadratic":         "Τετραγωνικός",
    "Cubic":             "Κυβικός",
    "SquareRoot":        "Τετραγωνική ρίζα",
    "Log":               "Λογαριθμική",
    "Exponent":          "Εκθετικός",
    "Power":             "Εξουσία",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Ενιαίος κινούμενος μέσος όρος",
    "SingleES":          "Ενιαία εκθετική εξομάλυνση",
    "DoubleMA":          "Διπλός κινούμενος μέσος όρος",
    "DoubleES":          "Διπλή εκθετική εξομάλυνση",
    "HoltLinear":        "Holt Exponential Smoothing",
    "DeseasonIntercept": "Παρεποχιακή αναχαίτιση",
    "DeseasonSlope":     "Περιοχική πλαγιά",
    "SeasonalIndex":     "Εποχιακός Δείκτης",
    "Diff":              "Διαφορά",
    "DiffTime":          "Ώρα διαφοράς",
    "AR":                "Αυτοπαλινδρομικό μοντέλο",
    "ResultTable":       "Αποτέλεσμα παλινδρόμησης",
    "ForecastTable":     "Πίνακας προβλέψεων",
    "HoltLevel":         "Επίπεδο",
    "HoltTrend":         "Τάση",
    "AutoCorrTable":     "Πίνακας αυτοσυσχέτισης",
    "DiffSeries":        "Σειρά Διαφορά",
    "RawSeries":         "Πρωτότυπη χρονοσειρά",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Greek
appStr[0][12] = "/estat/eStat/index.html";
appStr[1][12] = "/estat/eStatH/index.html";
appStr[2][12] = "/estat/eStatU/index.html";
appStr[3][12] = "/estat/eStatE/index_en.html";
appStr[4][12] = "/estat/eHelp/index_en.html";
appStr[5][12] = "index.html";
appStr[6][12] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][12] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][12] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][12] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][12] = "";
appStr[11][12] = "Large Population Country";
appStr[12][12] = "Life Expectancy (OECD)";
appStr[13][12] = "Population Pyramid (Korea)";
appStr[14][12] = "GNP per Capita (OECD)";
appStr[15][12] = "Top World Export Country";
appStr[16][12] = "Obesity % of Population";
appStr[17][12] = "Temperature of Major City";
appStr[18][12] = "Top CO2 Emission Country";
appStr[19][12] = "Alcohol Consume (OECD)";
appStr[20][12] = "Continuous Data Graph";
appStr[21][12] = "Length of Otter";
appStr[22][12] = "Age of Teacher";
appStr[23][12] = "Age of Teacher by Sex";
appStr[24][12] = "Cleanliness of Tooth";
appStr[25][12] = "Math Exam Scores";
appStr[26][12] = "Calorie of Hamberger";
appStr[27][12] = "Height vs Weight by Sex";
appStr[28][12] = "Discrete Data Graphs";
appStr[29][12] = "";
appStr[30][12] = "";
appStr[31][12] = "unit";
appStr[32][12] = "Country";
appStr[33][12] = "Male";
appStr[34][12] = "Female";
appStr[35][12] = "Age";
appStr[36][12] = "Person";
appStr[37][12] = "billion $";
appStr[38][12] = "Export";
appStr[39][12] = "Obesity %";
appStr[40][12] = "Celsius";
appStr[41][12] = "City";
appStr[42][12] = "Jan High";
appStr[43][12] = "Jul High";
appStr[44][12] = "million ton";
appStr[45][12] = "liter/year";
appStr[46][12] = "Alcohol";
alertMsg[1][12] = "Μία από τις επιλεγμένες μεταβλητές δεν έχει δεδομένα.";
alertMsg[2][12] = "Επιλέξτε μεταβλητές για ανάλυση (επιλέξτε ονόματα στηλών) μία προς μία. Αν έχετε δύο μεταβλητές θέστε τη μία ως ομάδα μεταβλητών.";
alertMsg[3][12] = "Ελλιπείς δεδομένα στις επιλεγμένες μεταβλητές.";
alertMsg[4][12] = "Αν οι παρατηρήσεις των επιλεγμένων μεταβλητών είναι διαφορετικές, η ανάλυση είναι μη επιτρεπτή.";
alertMsg[5][12] = "Πάρα πολλές ομάδες! Τα διαγράμματα ίσως επικαλύπτονται εξαιτίας του μεγέθους της οθόνης.";
alertMsg[6][12] = "Αν η ανάλυση μεταβλητών συνοπτικών δεδομένων περιέχει χαρακτήρες, η στατιστική ανάλυση ή η δημιουργία πίνακα είναι μη επιτεπτή.";
alertMsg[7][12] = "Αν περισσότερες από τρεις μεταβλητές είναι επιλεγμένες πάνω σε ακατέργαστα δεδομένα, η ανάλυση ή η δημιουργία πίνακα είναι μη επιτρεπτή.";
alertMsg[8][12] = "Το κουκκιδιογράφημα είναι επιτρεπτό αν ο αριθμός των παρατηρήσεων είναι μικρότερος του 200.";
alertMsg[9][12] = "Το Διάγραμμα Μίσχου-φύλλου είναι επιτρεπτό αν ο αριθμός των παρατηρήσεων είναι μικρότερος του 100.";
alertMsg[10][12] = "Οι μεταβλητές ανάλυσης δεν έχουν επιλεγεί.";
alertMsg[11][12] = "Οι μεταβλητές Ανάλυση / ομάδα δεν έχουν επιλεγεί";
alertMsg[12][12] = "Αν η ανάλυση μεταβλητών περιέχει χαρακτήρες, η ανάλυση ή η δημιουργία πίνακα είναι μη επιτεπτή.";
alertMsg[13][12] = "";
alertMsg[14][12] = "Συνοπτικά Δεδομένα δεν είναι επιτρεπτά για συνεχή διαγράμματα και για ελέγχους υποθέσεων.";
alertMsg[16][12] = "Μόνο δύο ομάδες είναι επιτρεπτές για αυτόν τον έλεχγο υπόθεσης.";
alertMsg[17][12] = "Το διάγραμμα διασκορπισμού απαιτεί τούλαχιστον μεταβλητη x και μεταβλητή y.";
alertMsg[18][12] = "Αν υπάρχουν περισσότερες από τρεις μεταβλητές το διάγραμμα διασκορπισμού είναι μη επιτρεπτό.";
alertMsg[19][12] = "Αν υπάρχει ένας χαρακτήρας στα δεδομένα, η ανάλυση δεν μπορεί να γίνει.";
alertMsg[20][12] = "Εάν υπάρχει ένας χαρακτήρας στα δεδομένα, η ανάλυση παλινδρόμησης δεν μπορεί να γίνει.";
alertMsg[21][12] = "Αν υπάρχουν ελλιπή δεδομένα, Η αποθήκευση είναι μη επιτρεπτή.";
alertMsg[22][12] = "Αν υπάρχει αρνητικός αριθμός, το ραβδογράφημα δεν μπορεί να αναπαραχθεί.";
alertMsg[25][12] = "Αν υπάρχει μία μονο ομάδα, το διάγραμμα στοιβαζόμενων γραμμών είναι μη επιτρεπτό.";
alertMsg[27][12] = "Αν υπάρχει μία μονο ομάδα, το ραβδογράφημα αναλογιών είναι μη επιτρεπτό.";
alertMsg[29][12] = "Αν υπάρχει μία μονο ομάδα, το ραβδογράφημα δίπλα-δίπλα είναι μη επιτρεπτό.";
alertMsg[31][12] = "Αν υπάρχει μία μονο ομάδα, το αμφίπλευρο ραβδογράφημα είναι μη επιτρεπτό.";
alertMsg[32][12] = "Αν υπάρχει αρνητικός αριθμός, το κυκλικό διάγραμμα δεν μπορεί να αναπαραχθεί.";
alertMsg[33][12] = "IΑν υπάρχει αρνητικός αριθμός, το γράφημα ντόνατ δεν μπορεί να αναπαραχθεί.";
alertMsg[34][12] = "Αν υπάρχει αρνητικός αριθμός, το διάγραμμα ζώνης δεν μπορεί να αναπαραχθεί.";
alertMsg[35][12] = "Αν υπάρχει αρνητικός αριθμός, ο πίνακας συχνοτήτων δεν μπορεί να αναπαραχθεί.";
alertMsg[36][12] = "Αυτό το ραβδογράφημα είναι επιτρεπτό μόνο για δύο ομάδες.";
alertMsg[37][12] = "Αυτός ο Έλεγχος Υπόθεσης είναι επιτρεπτός μόνο για μία μεταβλητές.";
alertMsg[38][12] = "&mu; είναι μη καταχωρημένο. Καταχωρείστε μία τιμή και ξαναπροσπαθείστε!";
alertMsg[39][12] = "Η τυπική απόκλιση είναι είτε μηδέν είτε μή καταχωρημένη. Ξαναπροσπαθείστε!";
alertMsg[40][12] = "Η διασπορά είναι μη καταχωρημένη. Καταχωρείστε μία τιμή και ξαναπροσπαθείστε!";
alertMsg[41][12] = "Αυτός ο Έλεγχος Υπόθεσης είναι επιτρεπτός μόνο για δύο μεταβλητές. Ομάδες μεταβλητών πρέπει να έχουν δύο μόνο ομάδες. ";
alertMsg[42][12] = "Η επεξεργασία τίτλου του Ελέγχου Υπόθεσης είναι μη επιτρεπτή!";
alertMsg[43][12] = "Η απλή γραμμική παλινδρόμηση είναι μόνο για μία ομάδα";
alertMsg[44][12] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][12] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][12] = "The same variable number is selected.";
alertMsg[47][12] = "Δεν επιτρέπονται τα δεδομένα χαρακτήρων στη συχνότητα !! Δοκιμάστε ξανά.";
alertMsg[48][12] = "Δεν επιτρέπονται τα δεδομένα χαρακτήρων !! Δοκιμάστε ξανά.";
alertMsg[49][12] = "Ο αριθμός των παρατηρήσεων θα πρέπει να είναι μικρότερος από 100 !! Δοκιμάστε ξανά.";
alertMsg[50][12] = "Εισαγάγετε αριθμούς στην αρχή ή το βήμα διαστήματος.";
alertMsg[51][12] = "Εισαγάγετε αριθμούς / Ο αριθμός των σειρών πρέπει να είναι ίδιος!! Δοκιμάστε ξανά.";
alertMsg[52][12] = "Εισαγάγετε αριθμούς σε κατηγορία και συχνότητα.";
alertMsg[53][12] = "Το μέγεθος του διαστήματος δεν είναι το ίδιο!! Δοκιμάστε ξανά.";
alertMsg[54][12] = "Η παρατήρηση Χ δεν είναι ίση με την παρατήρηση Υ !! Δοκιμάστε ξανά.";
alertMsg[55][12] = "!!! Δεν υπάρχουν δεδομένα στο φύλλο.";
alertMsg[56][12] = "!!! Δεν έχει επιλεγεί μεταβλητή";
alertMsg[57][12] = "!!! Εισαγάγετε την έναρξη διαστήματος και το πλάτος διαστήματος";
alertMsg[58][12] = "!!! Εισαγάγετε αριθμητική έναρξη διαστήματος και πλάτος διαστήματος";
alertMsg[59][12] = "!!! Περισσότερα από 9 μεσοδιαστήματα - αλλαγή πλάτους διαστήματος";
alertMsg[60][12] = "!!! Αυτή η μεταβλητή έχει περισσότερες από 9 τιμές";
alertMsg[61][12] = "!!! Δεν έχει καταχωρηθεί τιμή";
alertMsg[62][12] = "!!! Εισαγάγετε τον τύπο";
alertMsg[63][12] = "!!! Δεν υπάρχουν δεδομένα που να πληρούν τις προϋποθέσεις.";
alertMsg[64][12] = "";
alertMsg[65][12] = ""; 
alertMsg[66][12] = "";
alertMsg[67][12] = "";
alertMsg[68][12] = "";
alertMsg[69][12] = "";

svgStr[1][12] = " Ραβδογράφημα ";
svgStr[2][12] = " Κυκλικό Διάγραμμα";
svgStr[3][12] = " Γράφημα Ντόνατ";
svgStr[4][12] = " Διάγραμμα Ζώνης";
svgStr[5][12] = " Γραμμικό Διάγραμμα, ";
svgStr[6][12] = " Σημειόγραμμα";
svgStr[7][12] = " Θηκόγραμμα";
svgStr[8][12] = " Διάγραμμα Μίσχου-φύλλου";
svgStr[9][12] = " Ιστόγραμμα ";
svgStr[10][12] = " Διάγραμμα Διασκορπισμού";
svgStr[11][12] = " Έλεγχος Υπόθεσης: Πληθυσμιακός Μέσος";
svgStr[12][12] = " Έλεγχος Υπόθεσης: Πλυθυσμιακή Διασπορά";
svgStr[13][12] = " Έλεγχος Υπόθεσης: Μέσοι Δύο Πληθυσμών";
svgStr[14][12] = " Έλεγχος Υπόθεσης: Διασπορά Δύο Πληθυσμών";
svgStr[15][12] = " Ανάλυση Διακύμανσης";
svgStr[16][12] = "Συχνότητα";
svgStr[17][12] = "Αναλογία";
svgStr[18][12] = "Ομαδα ";
svgStr[19][12] = " ";
svgStr[20][12] = "<h3>Σύνοψη Δεδομένων<br>Πίνακας Συχνοτήτων</h3>";
svgStr[21][12] = "Ομαδοποίηση Μεταβλητών";
svgStr[22][12] = "Μεταβλητή Γραμμής";
svgStr[23][12] = "Ολικό";
svgStr[24][12] = "Μέγεθος κύκλου";
svgStr[25][12] = "<h3>Πίνακας Συχνοτήτων</h3>";
svgStr[26][12] = "Ανάλυση Μεταβλητών";
svgStr[27][12] = "Τιμή Μεταβλητής";
svgStr[28][12] = "Χαρακτηρισμός Τιμής";
svgStr[29][12] = "Συχνότητα";
svgStr[30][12] = "Σχετική Συχνότητα";
svgStr[31][12] = "<h3>Πίνακας Διπλής Εισόδου</h3>";
svgStr[32][12] = "Μεταβλητή Στήλης";
svgStr[33][12] = "Μεταβλητή Γραμμής";
svgStr[34][12] = "Μέσος"
svgStr[35][12] = "Τυπική Απόκλιση"
svgStr[36][12] = "<h3> Ιστόγραμμα <br>Πίνακας Συχνοτήτων</h3>";
svgStr[37][12] = "Όνομα Ομάδας";
svgStr[38][12] = "Διάστημα ";
svgStr[39][12] = "Άθροισμα";
svgStr[40][12] = " Φύλλο";
svgStr[41][12] = "Ομαδα 1  Φύλλο";
svgStr[42][12] = "Ομαδα 2  Φύλλοf"
svgStr[43][12] = "<h3>Βασικά Στατιστικά Χαρακτηριστικά</h3>";
svgStr[44][12] = "Παρατήρηση";
svgStr[45][12] = "Ελαχιστο";
svgStr[46][12] = "Διάμεσος";
svgStr[47][12] = "Μέγιστο";
svgStr[48][12] = "Ολικό";
svgStr[49][12] = "<h3>Έλεγχος Κανονικότητας</h3>";
svgStr[50][12] = "Αναμενόμενη Συχνότητα > 5 <br> προτείνεται";
svgStr[51][12] = "&chi;&#178; Έλεγχος<br>Διάστημα  i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][12] = "Δεδομένα<br>Παρατηρηθείσα Συχνότητα<br>(O<sub>i</sub>)";
svgStr[53][12] = "Κανονική Κατανομή<br>Εκτιμώμενη Πιθανότητα<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][12] = "Κανονική Κατανομή<br>Αναμενόμενη Συχνότητα<br>(E<sub>i</sub>)";
svgStr[55][12] = "κάθε διάστημα<br>&chi;&#178; Τιμή<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][12] = "Άθροισμαf &chi;&#178; Τιμή";
svgStr[57][12] = "το ιστόγραμμα πιθανότητας και η κανονική κατανομή";
svgStr[58][12] = "Κανονική Q-Q Plot";
svgStr[59][12] = "Κανονική Ποσοστημόριο";
svgStr[60][12] = "συντελεστής συσχέτισης";
svgStr[61][12] = "Συντελεστής Προσδιορισμού";
svgStr[62][12] = "Τυπικό Σφάλμα";
svgStr[63][12] = "Μεταβλητης";
svgStr[64][12] = "Όνομα Μεταβλητης";
svgStr[65][12] = "ανεξάρτητη μεταβλητή";
svgStr[66][12] = "εξαρτημένη μεταβλητή";
svgStr[67][12] = "παράμετρος";
svgStr[68][12] = "Εκτιμώμενη Τιμή";
svgStr[69][12] = "Τιμή";
svgStr[70][12] = "Σταθερός Όρος";
svgStr[71][12] = "Κλίση";
svgStr[72][12] = "Παράγοντας";
svgStr[73][12] = "άθροισμα τετραγώνων";
svgStr[74][12] = "βαθμός ελευθερίας";
svgStr[75][12] = "μέσα τετράγωνα";
svgStr[76][12] = "Παλινδρόμηση";
svgStr[77][12] = "Σφάλμα";
svgStr[78][12] = "Ολικό";
svgStr[79][12] = "<h3>Ανάλυση Παλινδρόμησης</h3>";
svgStr[80][12] = "Τυποποιημένα Κατάλοιπα Q-Q ";
svgStr[81][12] = "Τυποποιημένα Κατάλοιπα ";
svgStr[82][12] = "Κανονικό Ποσοστημόριο";
svgStr[83][12] = "Γράφημα Καταλοίπων";
svgStr[84][12] = "Αναμενόμενη Τιμή";
svgStr[85][12] = "Ανάλυση Διακύμανσης Δύο Παραγόντων";
svgStr[86][12] = "Διάγραμμα Διαστήματος Εμπιστοσύνης";
svgStr[87][12] = "Κατάλοιπο";
svgStr[88][12] = "Στατιστικές δύο διαστάσεων";
svgStr[89][12] = "Πίνακας Διαγράμματος Διασκορπισμού";
svgStr[90][12] = "Πολλαπλές Συγρίσεις";
svgStr[91][12] = "Στατιστική";
svgStr[92][12] = "Παράγοντας";
svgStr[93][12] = "Επίπεδο";
svgStr[94][12] = "Ζυγίζεται δείγμα δεδομένων Δείγμα";
svgStr[95][12] = "Τυποποιημένα Κατάλοιπα vs πρόβλεψη";
svgStr[96][12] = "Τυποποιημένα Κατάλοιπα vs Μόχλευση";
svgStr[97][12] = "Απόσταση του Cook";
svgStr[98][12] = "Απόσταση του Cook";
svgStr[99][12] = "Ταξινόμηση Δεδομένων";
svgStr[100][12]= "Διαφορά Μέσων";
svgStr[101][12]= "Έλεγχος Μέσων";
svgStr[102][12]= "Θεραπεία";
svgStr[103][12]= "Αλληλεπίδραση";
svgStr[104][12]= "Ολικό Σειράς";
svgStr[105][12]= "Ολικό Στήλης";
svgStr[106][12]= "Πολλαπλός Συντελεστής Συσχέτισης";
svgStr[107][12]= "<h3>Ανάλυση Συσχέτισης</h3>";
svgStr[108][12]= "Πίνακας Συσχέτισης";
svgStr[109][12]= "Παράγοντας A - Παράγοντας B Μέσος";
svgStr[110][12]= "Μόχλευση";
svgStr[111][12]= "Geographic Information Graph";
svgStr[112][12]= "εύρος";
svgStr[113][12]= "Μέσος - Τυπική Απόκλισηn Γράφημα";
svgStr[114][12]= "Πλυθυσμιακή Διασπορά";
svgStr[115][12]= "Υπόθεση";
svgStr[116][12]= "Έλεγχος";
svgStr[117][12]= "διαφορά";
svgStr[118][12]= "Τιμή διαστήματος";
svgStr[119][12]= "κατηγορία";
svgStr[120][12] = "Τρόπος";
svgStr[121][12] = "Συνδιακύμανση";
svgStr[122][12] = "Πασκάλ Τρίγωνο";
svgStr[123][12] = "Κοινή πιθανότητα";
svgStr[124][12] = "Υποθετικός";
svgStr[125][12] = "Διακριτή Διανομή";
svgStr[126][12] = "σειρά %";
svgStr[127][12] = "στήλη %";
svgStr[128][12] = "σύνολο %";
svgStr[129][12] = "Bar Graph Matrix";
svgStr[130][12] = "Προηγούμενο πρόβλημα";
svgStr[131][12] = "Ιδιοτιμή";
svgStr[132][12] = "Ιδιοδιάνυσμα";
svgStr[133][12] = "Πίνακας συχνοτήτων πολλαπλών διαστάσεων";
svgStr[134][12] = "Γράφημα ιεραρχικού συμπλέγματος";
svgStr[135][12] = "Απόσταση";
svgStr[136][12] = "Single";
svgStr[137][12] = "Ολοκληρώθηκε";
svgStr[138][12] = "Μέσος όρος";
svgStr[139][12] = "Centroid";
svgStr[140][12] = "Ward";
svgStr[141][12] = "Σύνδεση";
svgStr[142][12] = "Number of Clusters <br>K";
svgStr[143][12] = "Bayes Information Criteria";
svgStr[144][12] = "Within Sum of Squares";
svgStr[145][12] = "Akaike Information Criteria";

svgStrU[1][12] = "Διωνυμική Κατανομή";
svgStrU[2][12] = "Επανάληψη";
svgStrU[3][12] = "Μέσος";
svgStrU[4][12] = "Τυπική Απόκλιση";
svgStrU[5][12] = "Poisson Κατανομή";
svgStrU[6][12] = "Γεωμετρική Κατανομή";
svgStrU[7][12] = "Υπεργεωμετρική Κατανομή";
svgStrU[8][12] = "Πληθυσμός ";
svgStrU[9][12] = "Κατανομή Δείγματος";
svgStrU[10][12] = "Νόμος των Μεγάλων Αριθμών";
svgStrU[11][12] = "Γράμματα";
svgStrU[12][12] = "Κεφαλή";
svgStrU[13][12] = "Κεφαλή Νομίσματος";
svgStrU[14][12] = "Αριθμός Κεφαλών";
svgStrU[15][12] = "Αριθμός Γραμμάτων";
svgStrU[16][12] = "Κατανομή των Δειγματικών Μέσων";
svgStrU[17][12] = "Επανάληψη";
svgStrU[18][12] = "Τυπικό Σφάλμα";
svgStrU[19][12] = "Πληθυσμιακός Μέσος";
svgStrU[20][12] = "Διάστημα Εμπυστοσύνης";
svgStrU[21][12] = "Εκτίμηση Ορθότητας";
svgStrU[22][12] = "Δειγματικός Μέσος";
svgStrU[23][12] = "[Κριτήριο Στατιστικού Ελέγχου]";
svgStrU[24][12] = "Κατανομή";
svgStrU[25][12] = "Απορρίπτω H\u2080";
svgStrU[26][12] = "Αποδέχομα H\u2080";
svgStrU[27][12] = "p-Τιμή";
svgStrU[28][12] = "[Απόφαση] ";
svgStrU[29][12] = "[ANOVA]";
svgStrU[30][12] = "Καταχωρείστε τον Συντελεστη Γραμμικής Συσχέτισης και επιλέξτε Εκτέλεση";
svgStrU[31][12] = "Παλινδρόμηση";
svgStrU[32][12] = "Μεταβλητή Γραμμής";
svgStrU[33][12] = "Μεταβλητή Στήλης";
svgStrU[34][12] = "Μέσος";
svgStrU[35][12] = "Τυπική Απόκλιση";
svgStrU[36][12] = "<h3> Ιστόγραμμα <br>Πίνακας Συχνοτήτων</h3>";
svgStrU[37][12] = "Όνομα Ομάδας";
svgStrU[38][12] = "Διάστημα";
svgStrU[39][12] = "Στέλεχος, Μίσχος";
svgStrU[40][12] = " Leaf";
svgStrU[41][12] = "Ομαδα 1  Φύλλο";
svgStrU[42][12] = "Ομαδα 2  Φύλλο"
svgStrU[43][12] = "<h3>Βασικά Στατιστικά Χαρακτηριστικά</h3>";
svgStrU[44][12] = "Παρατήρηση";
svgStrU[45][12] = "Ελαχιστο";
svgStrU[46][12] = "Διάμεσος";
svgStrU[47][12] = "Μέγιστο";
svgStrU[48][12] = "Ολικό";
svgStrU[50][12] = "Ομοιόμορφη";
svgStrU[51][12] = "Εκτίμηση Ορθότητας";
svgStrU[52][12] = "- Δημιουργείστε σημεία κλικάρωντας και μετά το eStat θα βρει την ευθεία παλινδρόμησης.";
svgStrU[53][12] = "- Μετακινήστε ή διαγράψτε ένα σημέιο. Δώστε προσοχή στην αλλαγή στην ευθεία της παλινδρόμησης.";
svgStrU[54][12] = "[Δειγματικά Στατιστικά] ";
svgStrU[55][12] = "[Δειγματικά 1 Στατιστικά] ";
svgStrU[56][12] = "[Δειγματικά 2 Στατιστικά] ";
svgStrU[57][12] = "Επίπεδο Εμπυστοσύνης";
svgStrU[58][12] = "Γραμμές και στήλες μεταβλητών είναι ανεξάρτητες";
svgStrU[59][12] = "Γραμμές και στήλες μεταβλητών δεν είναι ανεξάρτητες";
svgStrU[60][12] = "Παρατηρηθείσα Κατανομή";
svgStrU[61][12] = "Θεωρητική Κατανομή";
svgStrU[62][12] = "Έλεγχος Καλής Προσαρμογής";
svgStrU[63][12] = "Έλεγχος Αθροίσματος Βαθμίδων του Wilcoxon";
svgStrU[64][12] = "Έλεγχος Αθροίσματος Βαθμίδων του Wilcoxon Πίνακα";
svgStrU[65][12] = "Έλεγχος Kruskal-Wallis";
svgStrU[66][12] = "Kruskal-Wallis H Κατανομή";
svgStrU[67][12] = "Kruskal-Wallis H";
svgStrU[68][12] = "Προσημικός Έλεγχος Βαθμίδων του Wilcoxon";
svgStrU[69][12] = "Προσημικός Έλεγχος";
svgStrU[70][12] = "Friedman Έλεγχος";
svgStrU[71][12] = "Friedman S Στατιστική";
svgStrU[72][12] = "Friedman S Κατανομή";
svgStrU[73][12] = "t Τιμή (ή Z)";
svgStrU[74][12] = "ChiSq Τιμή";
svgStrU[75][12] = "Δειγματική Διασπορά";
svgStrU[76][12] = "Διαφορά μέσων δειγμάτων";
svgStrU[77][12] = "Αναλογία των διακυμάνσεων του δείγματος";
svgStrU[78][12] = "Υπόθεση Διασποράς";
svgStrU[79][12] = "Σύνοψη Δεδομένων";
svgStrU[80][12] = "Πολλαπλή επιλογή";
svgStrU[81][12] = "Επιλέξτε μέχρι δύο ομάδες";
svgStrU[82][12] = "X Μεταβλητης";
svgStrU[83][12] = "Y Μεταβλητης";
svgStrU[84][12] = "με";
svgStrU[85][12] = "Καμία μεταβλητή ομάδας";
svgStrU[86][12] = "επιλεγμένα δεδομένα: ";
svgStrU[87][12] = "Ακατέργαστα Δεδομμένα";
svgStrU[88][12] = "Επιλέξτε μεταβλητές κάνοντας κλικ στο όνομα var";
svgStrU[89][12] = "ελλείψεις παρατηρήσεων";
svgStrU[90][12] = "αθροιστικό ποσό";
svgStrU[91][12] = "Γεωγραφικό μήκος";
svgStrU[92][12] = "γεωγραφικό πλάτος";
svgStrU[93][12] = "Τουλάχιστον ένα ζεύγος τοποθεσιών είναι διαφορετικό";
svgStrU[94][12] = "Προσημικός Έλεγχος Βαθμίδων του Wilcoxon";
svgStrU[95][12] = "ζευγαρωμένες μεταβλητές";
svgStrU[96][12] = "δείγμα κατά ζεύγη";
svgStrU[97][12] = "δοκιμή ανεξαρτησίας";
svgStrU[98][12] = "προσομοίωση";
svgStrU[99][12] = "Τυχαίος αριθμός";
svgStrU[100][12] = "Κανονική Κατανομή";
svgStrU[101][12] = "t Κατανομή";
svgStrU[102][12] = "&chi;&#178; Κατανομή";
svgStrU[103][12] = "F Κατανομή";
svgStrU[104][12] = "HSD εύρος Κατανομή";
svgStrU[105][12] = "Πρώτο Τεταρτημόριο";
svgStrU[106][12] = "Τρίτο Τεταρτημόριο";
svgStrU[107][12] = "Ενδοτεταρτημοριακό Εύρος";
svgStrU[108][12] = "Συντελεστής Μεταβλητότητας";
svgStrU[109][12] = "Αθροιστική Συχνότητα (%)";
svgStrU[110][12] = "Μέγιστος αριθμός ακεραίων της Ομοιόμορφης Διανομής";
svgStrU[111][12] = "Μετακινήστε ένα σημείο με το ποντίκι";
svgStrU[112][12] = "Εξόρυξη αποκατάστασης";
svgStrU[113][12] = "χωρίς αντικατάσταση";
svgStrU[114][12] = "Γραμμικό"; 
svgStrU[115][12] = "Ποσοστό αλλαγής";
svgStrU[116][12] = "Απλός Ευρετήριο";
svgStrU[117][12] = "Χρονική καθυστέρηση";
svgStrU[118][12] = "Διαφορά";
svgStrU[119][12] = "Αυτοσυσχέτιση";
svgStrU[120][12] = "Καταγραφή";
svgStrU[121][12] = "Τετράγωνη ρίζα";
svgStrU[122][12] = "Box-Cox";
svgStrU[123][12] = "Βασικός χρόνος";
svgStrU[124][12] = "Κεντρικός κινούμενος μέσος όρος";
svgStrU[125][12] = "Εκθετική εξομάλυνση";
svgStrU[126][12] = "Κεντρική κινούμενη διάμεσος";
svgStrU[127][12] = "Μοντέλο";
svgStrU[128][12] = "Κινούμενος μέσος όρος";
svgStrU[129][12] = "Διπλός κινούμενος μέσος όρος";
svgStrU[130][12] = "Holt Double Exponential Smoothing";
svgStrU[131][12] = "Seasonal Index";
svgStrU[132][12] = "Πολλαπλασιαστικό εποχικό μοντέλο Holt-Winters";
svgStrU[133][12] = "Deseasonal Series";
svgStrU[134][12] = "ΟΙΚΟΔΟΜΙΚΟ ΤΕΤΡΑΓΩΝΟ";
svgStrU[135][12] = "Ανάλυση συμπλέγματος";
svgStrU[136][12] = "Σύμπλεγμα";
svgStrU[137][12] = "Δέντρο αποφάσεων";
svgStrU[138][12] = "Συνθήκη κανόνα απόφασης";
svgStrU[139][12] = "Απόφαση";
svgStrU[140][12] = "Επανάληψη";
svgStrU[141][12] = "Παράλληλο γράφημα";
svgStrU[142][12] = "Ταξινόμηση";
svgStrU[143][12] = "Συνάρτηση ταξινόμησης";
svgStrU[144][12] = "Αποτέλεσμα ταξινόμησης";
svgStrU[145][12] = "Απόφαση";
svgStrU[146][12] = "Ποσοστό εσφαλμένης ταξινόμησης";
svgStrU[147][12] = "Κελί";
svgStrU[148][12] = "Δεδομένα εκπαίδευσης";
svgStrU[149][12] = "Δεδομένα δοκιμής";


// Romanian
$message.ro = {
    "eStat : Stat Education SW": "eStat : Stat Educatie SW",
    "Home": "Pagina principala",
    "Filename": "Nume Fișier",
    "Selected Variables": "Var Selectate",
    "Cancel": "Îinchidere",
    "Edit Variables": "EditVar",
    "Level": "Nivel",
    "ElementaryLevel": "E",
    "MiddleLevel": "G",
    "HighLevel": "L",
    "UniversityLevel": "U",
    "Example": "Exemplu",
    "New Sheets": "Sheet Nou",
    "csv Open": "csv Deschidere",
    "www Open": "www Deschidere",
    "json Open": "json Deschidere",
    "csv Save": "csv Salvare",
    "json Save": "json Salvare",
    "Print Sheet": "Imprimare",
    "Bar Graph": "Diagramă Coloane",
    "Pie Chart": "Diagramă Radială",
    "Band Graph": "Diagrammă Bară",
    "Line": "Liniară",
    "Line Graph": "Diagramă Liniară",
    "Dot Graph": "Diagramă prin Puncte",
    "Histogram": "Histogramă",
    "Stem & Leaf Plot": "Diagramă Rădăcină-Frunză",
    "maxStem": "** numărul maxim de tulpină <= 30 **",
    "Box-Whisker Plot": "Box complot",
    "Scatterplot": "Diagramă prin Puncte",
    "ScatterplotMatrix": "Matricea Diagramei prin Puncte",
    "Frequency Table": "Tabelul Frecvențelor",
    "Basic Statistics": "Bazele Statisticii",
    "Testing Hypothesis &mu;": "Testare Ipoteza &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Testare Ipoteza &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Testare Ipoteza  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Testare Ipoteza &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Analiza Varianței",
    "MiddleSchool": "Gimnaziu",
    "HighSchool":   "Liceu",
    "University":   "Universitate",
    "eStatHeading": "eStat este un program gratuit bazat pe web pentru o mai bună educație statistică, folosind vizualizarea dinamică a datelor și analiza statistică grafică.",
    "Support":      "A sustine",
    "Donation":     "Donare",
    "Middle School Stat Education": "Educație statistică pentru școala medie",
    "High School Stat Education": "Statistică La Nivel Liceal",
    "University Stat Education": "Statistică la Nivel Universitar",
    "Elem Stat Graph Example": "Nivel Gimnazial",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Coloană",
    "Horizontal": "Bară",
    "Vertical Separated Bar": "Diagramă Coloane Separate",
    "Vertical Stacked Bar": "Diagramă Coloane Stivuite",
    "Vertical Ratio Bar": "Diagrame Coloană Stivuite 100%",
    "Vertical Side by Side Bar": "Diagramă Coloane Grupate",
    "Vertical Two Sided Bar": "Diagramă cu Coloane Pozitive și Negative",
    "Horizontal Separated Bar": "Diagramă Bare Separate",
    "Horizontal Stacked Bar": "Diagramă Bare Stivuite",
    "Horizontal Ratio Bar": "Diagrame Bare Stivuite 100%",
    "Horizontal Side by Side Bar": "Diagramă Bare Grupate",
    "Horizontal Two Sided Bar": "Diagramă cu Bare Pozitive și Negative",
    "Doughnut Graph": "Diagramă Inelară",
    "Two Sided Stem & Leaf Plot": "Diagramă Rădăcină-Frunză",
    "Graph Save": "Salvare Diagramă",
    "Graph Print": "Printare Diagramă",
    "Move to Table": "Mută în Tabel",
    "Edit Title": "Editare Titlu",
    "Table Save": "Salvare Tabel",
    "Table Print": "Printare Tabel",
    "Frequency": "Frecvență",
    "Sorting": "Sortare",
    "SortData": "Sortare",
    "Raw Data": "Date Brute",
    "Descending": "Descrescător",
    "Ascending": "Crescător",
    "Mean": "Medie",
    "Std Deviation": "Abatere Standard",
    "MeanStd": "Medie/AbatereStandard",
    "DotMeanStd": "Diagramă prin Puncte - Medie/AbatereStandard",
    "95CI": "95% Interval de Încredere",
    "CorrelationAnalysis": "Analiza corelației",
    "RegressionAnalysis": "Analiza Regresiei",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Two way ANOVA",
    "Regression": "Regresiei",
    "RegressionLine": "Regresiei Line",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Analiza Regresiei",	
    "Frequency Polygon": "Poligonul Frecvențelor",
    "Execute New Interval": "Excută un nou interval",
    "Interval Start": "Capătul de început al intervalului",
    "Interval Width": "Lungimea Intervalului",
    "t-test": "t Testare",
    "Z-test": "Z Testare",
    "(if Z-test, enter &sigma;)": "(în cazul unui Z test, introduceți valoare pentru &sigma;)",
    "Significance Level": "Nivel de Semnificație",
    "Execute": "Execută",
    "(Confidence Interval)": "(Interval de Încredere)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(În cazul unui test Z, utilizați Z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Presupunere asupra Varianței",
    "Variance": "Varianței",
    "F test": "F Testare",
    "At least one pair of means is different": "Cel puțin o pereche de medii este diferită",
    "Main Title": "Titlu Principal",
    "y title": "Axa y",
    "x title": "Axa x",
    "yAxis": "Y Axa",
    "Modify": "Modificați",
    "Confirm": "Confirmare",
    "Variable Name": "Nume Variabilă",
    "Variable Value": "Valoare Variabilă",
    "Value Label": "Etichetă Variabilă",
    "* Less than nine value labels allowed.": "* Sunt permise și mai puțin de de 9 etichete",
    "Save": "Save",
    "Exit": "Leșire",
    "eStatU UnivStatEdu": "eStatU - Statistică la Nivel Universitar SW",
    "eStatH HighStatEdu": "eStatH - Statistică La Nivel Liceal SW",
    "eStatM MiddleStatEdu": "eStatM - elementar / Statistica gimnaziului SW",
    "MiddleStat": "Statistica gimnaziului",
    "HighStat":   "Statistica liceului",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Meniu",
    "Binomial Experiment": "Experiment Binomial",
    "Binomial Distribution": "Distribuție Binomială",
    "Binomial Prob Table": "Tabel Probabilități pentru Distribuție Binomială",
    "Poisson Distribution": "Distribuție Poisson",
    "Poisson Prob Table": "Tabel Probabilități pentru Distribuție Poisson",
    "Geometric Distribution": "Distrbuție Geometrică",
    "Geometric Prob Table": "Tabel Probabilități pentru Distribuție Geometrică",
    "HyperGeometric Distribution": "Distrbuție Hipergeometrică",
    "HyperGeometric Prob Table": "Tabel Probabilități pentru Distribuție Hipergeometrică",
    "Exponential Distribution": "Distrbuție Exponențială",
    "Normal Experiment": "Experiment Normală",
    "Normal Distribution": "Distribuție Normală",
    "Normal Approx": "Aproximație Normală",
    "t Distribution": "Distribuție Student t",
    "ChiSquare Distribution": "Distribuție &chi;&#178;",
    "F Distribution": "Distribuție Fisher F",
    "Sampling": "Sondaj",
    "Population vs Sample": "Populație vs Sondaj",
    "Population": "Populație",
    "Sample": "Sondaj",
    "Exponential": "Exponențială(0.3)",
    "Uniform": "Uniformă(0,1)",
    "UniformDist": "Uniformă",
    "Sample05": "Sondaj 5%",
    "Sample10": "Sondaj 10%",
    "Sample20": "Sondaj 20%",
    "Statistics/BoxPlot": "Statistică/BoxPlot",
    "StatisticalProb":     "Probabilitate statistică",
    "Law of Large Number": "Legea Numerelor Mari",
    "Dist of Sample Means": "Dist of Sondaj Means",
    "Sampling Distribution": "Distribuția eșantionului",
    "Sample Size": "Volumul Eșantionului",
    "Confidence Interval": "Interval de Încredere",
    "Confidence Interval Simulation": "Interval de Încredere Simulare",
    "Simulation": "Simulare",
    "Confidence Interval Mu": "Estimației : &mu;",
    "Mu Confidence Interval": "Estimației : &mu;",
    "Confidence Interval Sigma": "Estimației : &sigma;&#178; ",
    "Confidence Interval P": "Estimației : p",
    "Estimation Accuracy": "Acuretețea Estimației",
    "Repetition": "Repetiție",
    "Confidence Level": "Siguranță Statistică",
    "Testing Hypothesis mu_titleAB": "Testare Ipoteza Medie",
    "Testing Hypothesis mu_title": "Testare Ipoteza Medie",
    "Testare Ipoteza sigma_title": "Testare Ipoteza Varianțe",
    "Testing Hypothesis P_title": "Testare Ipoteza Proporții",
    "Testing Hypothesis mu12_title": "Testare Ipoteza Două Medie",
    "Testing Hypothesis sigma12_title": "Testare Ipoteza Două Varianțe",
    "Testing Hypothesis P12_title": "Testare Ipoteza Două Proporții",
    "Testing Hypothesis muA":  "Testare Ipoteza &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Testare Ipoteza &mu; - C, n",
    "Testing Hypothesis mu": "Testare Ipoteza &mu;",
    "Testing Hypothesis sigma": "Testare Ipoteza &sigma;&#178;",
    "Testing Hypothesis P": "Testare Ipoteza p",
    "Testing Hypothesis mu12": "Testare Ipoteza &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Testare Ipoteza &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Testare Ipoteza p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Factor ANOVA",
    "Testing Hypothesis ANOVA2": "2 Factor ANOVA",
    "SameSampleSize": "Dimensiunea eșantionului pentru fiecare celulă ar trebui să fie aceeași.",
    "Testing Independence": "Testarea Independenței",
    "CategoryD": "Categorie",
    "Category": "Categorie",
    "Correlation Coefficient": "Coeficient de Corelație",
    "Regression Experiment": "Regresiei Experiment",
    "Hypothesis": "Ipoteza",
    "Test Type": "Tipul Testului",
    "Z-test": "Z Testare",
    "t-test": "t Testare",
    "Chi-test": "&chi;&#178;Testare",
    "F-test": "F Testare",
    "Sampling Type": "Sondaj Type",
    "Independent Sample": "independent Sondaj",
    "Paired Sample": "Două Selecții",
    "Sample Data": "Sondaj Date",
    "input either sample data": "Introduceți fie datele unui sondaj, fie date statistice in spațiile următoare ultizând csv/bsv",
    "input data": "Introduceți date",
    "Sample Statistics": "Sondaj Statistică",
    "Sample Mean": "Medie Sondaj",
    "Sample Variance": "Varianță Sondaj",
    "Sample Proportion": "Proporție Sondaj",
    "sample range": "Interval de probă",
    "control chart": "Grafic de control",
    "if Z-test-1": "(În cazul unui test Z, introduceți varianța populației &sigma;&#178;)",
    "if Z-test-2": "(În cazul unui test Z, z<sub>&alpha;/2 </sub> is used.)",
    "At least one pair": "Cel puțin o pereche de medii este diferită",
    "Row-Col-0": "Variabilele de pe rând si de pe coloană sunt independente",
    "Row-Col-1": "Variabilele de pe rând si de pe coloană sunt dependente",
    "Enter any number of row": "(Introduceți observația în celula din stânga sus)",
    "Row": "Rând",
    "Column": "Coloană",
    "Probability": "Probabilitatea",
    "Show Probability": "Afișează Probabilitatea",
    "Regression Line": "Linie Regresie",
    "Erase All": "Șterge tot",
    "Add Point": "Adaugă Punct",
    "Erase Point": "Șterge Punct",
    "Reference Site": "Site de Referință",
    "Lot Size": "Mărime Lot",
    "Defect Size": "Mărime Defect",
    "Defect Rate": "rata defectelor",
    "If typed": "După introducerea numărului, clic [Execute] / [Enter]",
    "Stat/BoxPlot": "Stat/BoxPlot",
    "Mean": "Medie",
    "Std Dev": "Abatere Standard",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(un grup)",
    "AnalysisVar": "Analiza Var",
    "AnalysisVar2": "Y Var",
    "GroupVar": "Grup",
    "GroupVar2": "X Var",
    "GroupVar3": "Factor1",
    "GroupVar4": "Factor2",
    "AnalysisVarMu12": "Analiza(sau X1) Variabilă",
    "GroupVarMu12": "Grup(or X2) Variabilă",
    "PairedMu12": " X1, X2 : Două Variabilă",
    "SizeVar": "Mărimea Var",
    "RegressionBand": "bandă de încredere",
    "RegressionTable": "Analiza Regresiei",
    "RegressionResidual": "Diagrama Reziduurilor",
    "RegressionResidualLeverage": "Reziduu vs Influență",
    "RegressionCook": "Cook distanţă Diagramă",
    "RegressionQQ": "Reziduu Q-Q Diagramăt",
    "HistogramNormal": "Histogramă",
    "HistogramChisq": "Test Normalitate",
    "HistogramNormalQQ": "Normală Q-Q Diagramă",
    "PopulationStd": "Populație Abatere Standard",
    "Type1Error": "Eroare Tip 1",
    "Type2Error": "Eroare Tip 2",
    "AnovaTable": "ANOVA Tabel",
    "AnovaMeanGraph": "Medie Interval de Încredere",
    "MultipleComparison": "Comparație Multiplă",
    "ComparisonGraph": "Grafic comparativ",
    "AnovaResidual": "Standardizat Reziduu Diagramă",
    "AnovaQQ": "Reziduu Q-Q Diagramă",
    "TestingFit": "Test de ajustare",
    "FitTest0": "Distribuția teoretică și cea observată sunt identice",
    "FitTest1": "Distribuția teoretică diferă de cea observată",
    "ObservedFreq": "Frecvență Observată O",
    "ExpectedProb": "Probabilitate Așteptată p",
    "ExpectedFreq": "Frecvență Așteptată E(>5)",
    "InputFitData": "Introduceți observația în celula din stânga sus",
    "ExecuteTable": "Statistică",
    "MeanDotGraph": "Interval de Încredere Diagramă",
    "ScatterRegression": "Diagramă prin Puncte",
    "Factor": "Factor",
    "Interaction": "Interacțiune",
    "NoInteraction": "Fără Interacțiune",
    "ExistInteraction": "Există Interacțiune",
    "eStatLecture": "Introducere eStat",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Testul Wilcoxon al Sumei Rangurilor", 
    "NonParametricMu12": "Testul Wilcoxon al Sumei Rangurilor : Parametru de Localizare M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Testul Rang Suma",
    "Sample Range": "Rang Suma",
    "DistributionTable": "Tabel Distrbuție",
    "SignedRankTestDist": "Wilcoxon Sumei Semnat Rangurilor Distribuție",
    "WilcoxonTestDist": "Wilcoxon al Sumei Rangurilor Distribuție",
    "KruskalTestDist": "Kruskal-Wallis H Distribuție",
    "FriedmanTestDist": "Friedman S Distribuție",
    "SignedRankTest": "Testul Sumei Semnat Rangurilor",
    "SignTest": "Testul Semnat",
    "SignCount": "Semnat Numara",
    "KruskalTest": "Kruskal-Wallis Testul",
    "KruskalTestANOVA": "Kruskal-Wallis Testul",
    "Total": "Total",
    "FriedmanTest": "Friedman Testul",
    "FriedmanTestANOVA": "Friedman Testul",
    "Block": "Bloc",
    "Treatment": "Tratament",
    "At least one locations is different": "Cel puțin o pereche de localizare este diferită",
    "SignCondition": "Dacă n ≤ 100 Binomial Testul,  n > 100 Normală Approximation Testul",
    "WilcoxonSignCondition": "Dacă n ≤ 20 Wilcoxon Sumei Rangurilor Testul,  n > 20 Normală Apropiere Testul",
    "WilcoxonRankCondition": "Dacă n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Sumei Rangurilor Testul,  n>25 Normală Apropiere Testul",
    "KruskalCondition": "Dacă n ≤ 10 H Distribuție Testul,  altfel &chi;&#178; approximation test",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Selecție Variabilă : Faceți clic pe numele var sau utilizați caseta de selecție RHS ",
    "VariableSelect3": "Selecție Variabilă",
    "VariableSelect4": "Se poate selecta mai multe variabile de analiză",
    "VariableSelect5": "Mai multe X variabile pot fi selectate.",
    "SummaryData": "Date Sumare",
    "RawData": "Date Brute",
    "MultiSelect": "",
    "DataType": "(Selectați variabilele prin clic pe numele var)",
    "by": "de",
    "NameVar": "Nume Var",
    "n_variance": "n-1 formulă",
    "RandomNumber": "Număr aleatoriu",
    "RealNumber":     "număr real",
    "IntegerNumber":  "număr întreg",
    "NumberData":     "numărul de date",
    "NumberDigit":    "zecimal",
    "NormalTable":    "Distribuție Normală Tabel",
    "Percentile":     "Percentila Tabel",
    "PercentileValue": "Percentila",
    "StudentRangeDist": "HSD Student Gamă Dist.",
    "copy link": "copiere legătura",
    "WithoutReplacement": "fără înlocuire",
    "WithReplacement":    "Extracția restaurării",
    "Replacement":     "Extracția restaurării",
    "NonReplacement":  "fără înlocuire",
    "WordCloud":       "Word Cloud (engleză)",
    "oneColor":        "culoare",
    "defaultColor":    "culoare implicită",
    "RelativeFreq":    "Frecventa relativa",
    "Density":         "Densitate",
    "MarginOfError":   "Marja de eroare",
    "Permutation":     "Permutare",
    "PermutationSame": "Permutarea cu același lucru",
    "Combination":     "Combinaţie",
    "NumberOfCase":    "Numărul de cazuri",
    "BinomialTheorem": "Teorema binomului",
    "PascalTriangle":  "Triunghiul Pascal",
    "Character":       "Emoji",
    "AdditionRule":      "Regula de adunare a probabilității",
    "MultiplicationRule":"Regula probabilității înmulțirii",
    "ConditionalProb":   "Probabilitate condițională",
    "JointProb":         "Probabilitatea comună",
    "DiscreteDist":      "Distribuție discretă",
    "Categorize":        "Clasificați",
    "Recode":            "Recodificare",
    "Compute":           "Calcula",
    "SelectIf":          "Selectați dacă",
    "InfoValueLabel":    "*** Selectați variabila, introduceți numele variabilei și/sau eticheta valorii.",
    "InfoSorting":       "*** Selectați variabila de sortare, introduceți metoda de sortare până la 3 variabile.",
    "InfoCategorize":    "*** Selectați variabila pentru Categorie, introduceți Interval Start și Interval Width.",
    "InfoRecode":        "*** Selectați variabila pentru Recode, introduceți o valoare nouă.",
    "InfoRecode2":       "* Permite înregistrarea până la 9 valori.",
    "InfoCompute":       "*** Creați o formulă de calcul folosind butoanele de mai jos.",
    "InfoSelectIf":      "*** Selectați până la 3 variabile, introduceți condițiile acestora.",
    "SortingVariable":   "Sortarea variabilelor",
    "SortingMethod":     "Metoda de sortare",
    "NewVariable":       "Variabilă nouă",
    "CategoryVariable":  "Clasificați variabila",
    "CategoryListCheck": "Verificarea listei de categorii",
    "CategoryInterval":  "Intervalul categoriei",
    "CategoryLabel":     "Etichetă de categorie",
    "RecodeVariable":    "Recodificarea variabilă",
    "CurrentValue":      "Valoarea curentă",
    "NewValue":          "Valoare nouă",
    "ComputeFormula":    "Formulă",
    "SelectVariable":    "Variabilă<br>pentru Selectare",
    "RelationOperator":  "Relație<br>Operator",
    "SelectValue":       "Valoare",
    "MissingValue":      "valoare lipsă",
    "option":            "opțiune",                          
    "TimeSeries":        "Serial temporal",
    "Smoothing":         "Netezire",
    "Filtering":         "Filtrare",
    "Transformation":    "Transformare",
    "Weight":            "Greutate",
    "PercentChange":     "Procentul de schimbare",
    "WeightedIndex":     "Index simplu",
    "BaseTime":          "Timp de bază",
    "LagTime":           "Timp de întârziere",
    "Lag":               "Decalaj",
    "Forecasting":       "Prognoză",
    "SeasonalModel":     "Model sezonier",
    "HoltWinter":        "Model sezonier Holt-Winters",
    "Trend":             "Tendinţă",
    "Seasonal":          "Sezonier",
    "Deseasonal":        "Serial de sezon",
    "Nseason":           "Timpurile din sezon",
    "Irregular":         "Neregulat",
    "TrendModel":        "Model de tendință pe desezon",
    "RegressionModel":   "Model de regresie",
    "ForecastingPeriod": "Perioada de prognoză",
    "CreateTable":       "Tabel de date",
    "SaveTable":         "Salvare tabel",
    "MA":                "Media mobilă",
    "EWMA":              "Model EWMA",
    "CenterMA":          "Media mobilă centrată",
    "MovingMedian":      "Median în mișcare centrat",
    "ES":                "Netezire exponențială",
    "Default":           "Mod implicit",
    "Linear":            "Liniar",
    "Quadratic":         "Cadratic",
    "Cubic":             "Cub",
    "SquareRoot":        "Rădăcină pătrată",
    "Log":               "Logaritmic",
    "Exponent":          "Exponential",
    "Power":             "Putere",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Media mobilă unică",
    "SingleES":          "Single Exponential Soothing",
    "DoubleMA":          "Media mobilă dublă",
    "DoubleES":          "Netezire exponențială dublă",
    "HoltLinear":        "Netezirea exponențială Holt",
    "DeseasonIntercept": "Interceptarea sezonieră",
    "DeseasonSlope":     "Panta sezonieră",
    "SeasonalIndex":     "Indexul sezonier",
    "Diff":              "Diferență",
    "DiffTime":          "Timp diferit",
    "AR":                "Model autoregresiv",
    "ResultTable":       "Resultatul regresiei",
    "ForecastTable":     "Tabelul de prognoză",
    "HoltLevel":         "Nivel",
    "HoltTrend":         "Tendinţă",
    "AutoCorrTable":     "Tabelul de autocorelare",
    "DiffSeries":        "Seria diferențe",
    "RawSeries":         "Serial temporal original",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Romanian
appStr[0][13] = "/estat/eStat/index.html";
appStr[1][13] = "/estat/eStatH/index.html";
appStr[2][13] = "/estat/eStatU/index.html";
appStr[3][13] = "/estat/eStatE/index_en.html";
appStr[4][13] = "/estat/eHelp/index_en.html";
appStr[5][13] = "index.html";
appStr[6][13] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][13] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][13] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][13] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][13] = "";
appStr[11][13] = "Large Population Country";
appStr[12][13] = "Life Expectancy (OECD)";
appStr[13][13] = "Population Pyramid (Korea)";
appStr[14][13] = "GNP per Capita (OECD)";
appStr[15][13] = "Top World Export Country";
appStr[16][13] = "Obesity % of Population";
appStr[17][13] = "Temperature of Major City";
appStr[18][13] = "Top CO2 Emission Country";
appStr[19][13] = "Alcohol Consume (OECD)";
appStr[20][13] = "Continuous Data Graph";
appStr[21][13] = "Length of Otter";
appStr[22][13] = "Age of Teacher";
appStr[23][13] = "Age of Teacher by Sex";
appStr[24][13] = "Cleanliness of Tooth";
appStr[25][13] = "Math Exam Scores";
appStr[26][13] = "Calorie of Hamberger";
appStr[27][13] = "Height vs Weight by Sex";
appStr[28][13] = "Discrete Data Graphs";
appStr[29][13] = "";
appStr[30][13] = "";
appStr[31][13] = "unit";
appStr[32][13] = "Country";
appStr[33][13] = "Male";
appStr[34][13] = "Female";
appStr[35][13] = "Age";
appStr[36][13] = "Person";
appStr[37][13] = "billion $";
appStr[38][13] = "Export";
appStr[39][13] = "Obesity %";
appStr[40][13] = "Celsius";
appStr[41][13] = "City";
appStr[42][13] = "Jan High";
appStr[43][13] = "Jul High";
appStr[44][13] = "million ton";
appStr[45][13] = "liter/year";
appStr[46][13] = "Alcohol";
alertMsg[1][13] = "Una dintre variabilele selectate nu are date introduse.";
alertMsg[2][13] = "Selectați variabilele pentru analiză(click pe numele coloanelor) una câte una. În cazul a două variabile, prima este considerată un grup de variabile.";
alertMsg[3][13] = "Date lipsă în variabila selectată.";
alertMsg[4][13] = "Dacă observațiile asupra variabilelor selectate diferă, analiza nu este permisă.";
alertMsg[5][13] = "Prea multe grupuri! Diagramele se pot suprapune din cauza mărimii ecranului.";
alertMsg[6][13] = "Dacă analiza variabilelor include caractere în rezumatul datelor, analiza statistica sau crearea unui tabel nu sunt permise.";
alertMsg[7][13] = "Dacă trei sau mai multe dintre variabilele selectate sunt date brute, analiza sau creare a unui tabel nu sunt permise.";
alertMsg[8][13] = "Diagrama prin Puncte este permisa doar daca numarul de observații nu depășește 200.";
alertMsg[9][13] = "Diagrama Rădăcină-Frunză este permisă doar dacă numărul observațiilor nu depășește 100.";
alertMsg[10][13] = "Variabila de Analizat nu este selectat.";
alertMsg[11][13] = "Analizats/Grup variables nu este selectat.";
alertMsg[12][13] = "Dacă analiza variabilelor include caractere, analiza statistica sau crearea unui tabel nu sunt permise.";
alertMsg[13][13] = "";
alertMsg[14][13] = "Un rezumat al datelor nu este permis în cazul diagramelor continue sau a testării unei ipoteze.";
alertMsg[16][13] = "Doar două grupuri sunt permise pentru acest tip de test.";
alertMsg[17][13] = "Diagrama prin Puncte necesită cel puțin o variabilă x și o variabilă y";
alertMsg[18][13] = "Nu sunt permise mai mult de 3 variabile în cazul diagramei prin punte";
alertMsg[19][13] = "Dacă se regăsesc date de tip caracter în coloana variabilei X, nu se poate realiza o diagramă prin puncte.";
alertMsg[20][13] = "Dacă se regăsesc date de tip caracter în coloana variabilei Y, nu se poate realiza o diagramă prin puncte.";
alertMsg[21][13] = "Dacă lipsesc anumite date, nu este permisă salvarea.";
alertMsg[22][13] = "Dacă apar numere negative, nu se poate realiza o diagramă prin bare.";
alertMsg[25][13] = "Dacă apare doar un singur grup, nu se poate realiza o diagramă prin stivuire, fie aceasta de tip coloană sau bandă.";
alertMsg[27][13] = "Dacă apare doar un singur grup, nu se poate realiza o diagramă prin stivuire cu proporție.";
alertMsg[29][13] = "Dacă apare doar un singur grup, nu se poate realiza o diagramă cu date grupate.";
alertMsg[31][13] = "Dacă apare doar un singur grup, nu se poate realiza o diagramă cu coloane/bande pozitive si negative";
alertMsg[32][13] = "Dacă apare un număr negativ, nu se poate realiza o diagramă radială.";
alertMsg[33][13] = "Dacă apare un număr negativ, nu se poate realiza o diagramă inelară.";
alertMsg[34][13] = "Dacă apare un număr negativ, nu se poate realiza o diagramă cu bande.";
alertMsg[35][13] = "Dacă apare un număr negativ, nu se poate realiza un tabel de frecvență..";
alertMsg[36][13] = "Această diagramă este permisă doar pentru două grupuri.";
alertMsg[37][13] = "Acest test este permis pentru o singură variabilă.";
alertMsg[38][13] = "&mu; is NaN . Introduceți o valoare nouă și încercați din nou!!";
alertMsg[39][13] = "Abaterea standard este fie zero sau este de tip NaN. Încercați din nou!";
alertMsg[40][13] = "Varianța introdusă nu este de tip NaN. Încercați din nou!";
alertMsg[41][13] = "Acest test este permis doar pentru două variabile. Variabila grup ar trebui să includă doar două grupuri.";
alertMsg[42][13] = "Editarea titlului nu este permisă în cazul testării unei ipoteze! ";
alertMsg[43][13] = "Regresia liniară simplă este doar pentru o singură grou";
alertMsg[44][13] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][13] = "Cannot draw GIS Diagramă if more than five variables.";
alertMsg[46][13] = "Același număr variabil este selectat.";
alertMsg[47][13] = "Datele de caractere în frecvență nu sunt permise!! Încercați din nou.";
alertMsg[48][13] = "Datele de caractere nu sunt permise!! Încercați din nou.";
alertMsg[49][13] = "Numărul de observații ar trebui să fie mai mic de 100!! Încercați din nou.";
alertMsg[50][13] = "Introduceți numere în intervalul de început sau pas.";
alertMsg[51][13] = "Introduceți numere/Numărul de rânduri ar trebui să fie același!! Încercați din nou.";
alertMsg[52][13] = "Introduceți numere în categorie și frecvență.";
alertMsg[53][13] = "Dimensiunea intervalului nu este aceeași!! Încercați din nou.";
alertMsg[54][13] = "Observația X nu este egală cu observația Y!! Încercați din nou.";
alertMsg[55][13] = "!!! Fără date pe foaie.";
alertMsg[56][13] = "!!! Nicio variabilă selectată";
alertMsg[57][13] = "!!! Introduceți intervalul de început și lățimea intervalului";
alertMsg[58][13] = "!!! Introduceți intervalul numeric Start și lățimea intervalului";
alertMsg[59][13] = "!!! Mai mult de 9 interval - modificați lățimea intervalului";
alertMsg[60][13] = "!!! Această variabilă are mai mult de 9 valori";
alertMsg[61][13] = "!!! Nicio valoare introdusă";
alertMsg[62][13] = "!!! Introduceți formula";
alertMsg[63][13] = "!!! Fără date care să îndeplinească condiții.";
alertMsg[64][13] = "";
alertMsg[65][13] = ""; 
alertMsg[66][13] = "";
alertMsg[67][13] = "";
alertMsg[68][13] = "";
alertMsg[69][13] = "";

svgStr[1][13] = " Bar Diagramă";
svgStr[2][13] = " Diagramă Radială";
svgStr[3][13] = " Diagramă Inelară";
svgStr[4][13] = " Diagrammă Bară";
svgStr[5][13] = " Diagramă Liniară"; // Simple Linear Regression is only for one group
svgStr[6][13] = " Diagramă prin Puncte";
svgStr[7][13] = " Box Diagramă";
svgStr[8][13] = " Diagramă Rădăcină-Frunză";
svgStr[9][13] = " Histogramăm";
svgStr[10][13] = " Diagramă prin Puncte";
svgStr[11][13] = " Testare Ipoteza: Populație Medie";
svgStr[12][13] = " Testare Ipoteza: Varianța Populației";
svgStr[13][13] = " Testare Ipoteza: Populație cu Două Medii";
svgStr[14][13] = " Testare Ipoteza: Populație cu Două Varianțe";
svgStr[15][13] = " Analiza Varianței";
svgStr[16][13] = "Frecvență";
svgStr[17][13] = "Raport";
svgStr[18][13] = "Grup ";
svgStr[19][13] = " ";
svgStr[20][13] = "<h3>Rezumat Date<br>Tabelul Frecvențelor</h3>";
svgStr[21][13] = "Grup de Variabile";
svgStr[22][13] = "Variabilă pe Rând";
svgStr[23][13] = "Total";
svgStr[24][13] = "Dimensiunea cercului";
svgStr[25][13] = "<h3>Tabelul Frecvențelor</h3>";
svgStr[26][13] = "Analiza Var";
svgStr[27][13] = "Var Valoare";
svgStr[28][13] = "Etichetă Variabilăl";
svgStr[29][13] = "Frecvență";
svgStr[30][13] = "Frecventa relativa";
svgStr[31][13] = "<h3>Tabel transversal</h3>";
svgStr[32][13] = "Variabila pe Coloană";
svgStr[33][13] = "Variabilă pe Rând";
svgStr[34][13] = "Medie"
svgStr[35][13] = "Medie"
svgStr[36][13] = "<h3> Histogramă<br>Tabelul Frecvențelor</h3>";
svgStr[37][13] = "Nume Grup";
svgStr[38][13] = "Interval";
svgStr[39][13] = "Rădăcină";
svgStr[40][13] = " Frunză";
svgStr[41][13] = "Grup 1  Frunză";
svgStr[42][13] = "Grup 2  Frunză"
svgStr[43][13] = "<h3>Bazele Statisticii</h3>";
svgStr[44][13] = "Observație";
svgStr[45][13] = "Minim";
svgStr[46][13] = "Mediană";
svgStr[47][13] = "Maxim";
svgStr[48][13] = "Total";
svgStr[49][13] = "<h3>Test Normalitate</h3>";
svgStr[50][13] = "Frecvență Așteptată > 5 <br> este recomandat";
svgStr[51][13] = "&chi;&#178; Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][13] = "Date<br>Frecvență Observată<br>(O<sub>i</sub>)";
svgStr[53][13] = "Distribuție Normală<br>Probabilitate Așteptată<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][13] = "Distribuție Normală<br>Frecvență Așteptată<br>(E<sub>i</sub>)";
svgStr[55][13] = "interval<br>&chi;&#178; value<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][13] = "Sumă de &chi;&#178; Valoare";
svgStr[57][13] = "Probabilitate Histogramă și Distribuție Normală";
svgStr[58][13] = "Normală Q-Q Diagramă";
svgStr[59][13] = "Normală Quantile";
svgStr[60][13] = "Coeficient de Corelație";
svgStr[61][13] = "Coeficient de Determinare";
svgStr[62][13] = "Eroare Standard";
svgStr[63][13] = "Variabilă";
svgStr[64][13] = "Nume Variabilă";
svgStr[65][13] = "variabilă independentă";
svgStr[66][13] = "variabilă dependentă";
svgStr[67][13] = "parametru";
svgStr[68][13] = "valoare estimată";
svgStr[69][13] = "valoare";
svgStr[70][13] = "Intercept";
svgStr[71][13] = "pantă";
svgStr[72][13] = "Factor";
svgStr[73][13] = "suma pătratelor";
svgStr[74][13] = "grad de libertate";
svgStr[75][13] = "patratele mediei";
svgStr[76][13] = "Regresiei";
svgStr[77][13] = "Eroare";
svgStr[78][13] = "Total";
svgStr[79][13] = "<h3>Analiza Regresiei</h3>";
svgStr[80][13] = "Reziduu Standardizat Q-Q Diagramă";
svgStr[81][13] = "Reziduu Standardizat";
svgStr[82][13] = "Normală Quantile";
svgStr[83][13] = "Reziduu Diagramă";
svgStr[84][13] = "valoare prezisă";
svgStr[85][13] = "Tabel ANOVA Bifactorial";
svgStr[86][13] = "Interval de Încredere Diagramă";
svgStr[87][13] = "Reziduu";
svgStr[88][13] = "două dimensiuni Statistică";
svgStr[89][13] = "Matricea Diagramei prin Puncte";
svgStr[90][13] = "Comparație Multiplă";
svgStr[91][13] = "Statistică";
svgStr[92][13] = "Factor";
svgStr[93][13] = "Nivel";
svgStr[94][13] = "Două Sondaj Date Diagramă";
svgStr[95][13] = "Reziduu Standardizat vs Prognoză Diagramă";
svgStr[96][13] = "Reziduu Standardizat vs Influență Diagramă";
svgStr[97][13] = "Cook Distanţă Diagramă";
svgStr[98][13] = "Cook Distanţă";
svgStr[99][13] = "Date Ordin";
svgStr[100][13]= "Medie Diferență";
svgStr[101][13]= "Testarea Medie";
svgStr[102][13]= "Tratare";
svgStr[103][13]= "Interacțiune";
svgStr[104][13]= "Total Rând";
svgStr[105][13]= "Total pe Coloană";
svgStr[106][13]= "Coeficient de Corelație Multiplă";
svgStr[107][13]= "<h3>Analiza Corelației</h3>";
svgStr[108][13]= "Matricea Corelației";
svgStr[109][13]= "Factor A - Factor B Medie Diagramă";
svgStr[110][13]= "Influență";
svgStr[111][13]= "Geographic Information Diagramă";
svgStr[112][13]= "gamă";
svgStr[113][13]= "Medie - Abatere Standard Diagramă";
svgStr[114][13]= "Varianța Populației";
svgStr[115][13]= "Ipoteză";
svgStr[116][13]= "Test";
svgStr[117][13]= "Varianța";
svgStr[118][13]= "Valoarea intervalului";
svgStr[119][13]= "Categorie";
svgStr[120][13] = "Mod";
svgStr[121][13] = "Covarianță";
svgStr[122][13] = "Triunghiul Pascal";
svgStr[123][13] = "Probabilitatea comună";
svgStr[124][13] = "Condiţional";
svgStr[125][13] = "Distribuție discretă";
svgStr[126][13] = "rând %";
svgStr[127][13] = "coloană %";
svgStr[128][13] = "total %";
svgStr[129][13] = "Matrice grafică cu bare";
svgStr[130][13] = "Proba anterioară";
svgStr[131][13] = "Valoare proprie";
svgStr[132][13] = "Vector propriu";
svgStr[133][13] = "Tabel de frecvență multidimensional";
svgStr[134][13] = "Grafic cluster ierarhic";
svgStr[135][13] = "Distanța";
svgStr[136][13] = "Singur";
svgStr[137][13] = "Complet";
svgStr[138][13] = "Medie";
svgStr[139][13] = "Centroid";
svgStr[140][13] = "Secție";
svgStr[141][13] = "Legătură";
svgStr[142][13] = "Number of Clusters <br>K";
svgStr[143][13] = "Bayes Information Criteria";
svgStr[144][13] = "Within Sum of Squares";
svgStr[145][13] = "Akaike Information Criteria";

svgStrU[1][13] = "Distribuție Binomială";
svgStrU[2][13] = "Repetiție";
svgStrU[3][13] = "Medie";
svgStrU[4][13] = "Medie";
svgStrU[5][13] = "Distribuție Poisson";
svgStrU[6][13] = "Distrbuție Geometrică";
svgStrU[7][13] = "Distrbuție Hipergeometrică";
svgStrU[8][13] = "Populație";
svgStrU[9][13] = "Sondaj Distrbuție";
svgStrU[10][13] = "Legea Numerelor Mari";
svgStrU[11][13] = "Coadă";
svgStrU[12][13] = "Cap";
svgStrU[13][13] = "Capul Monedei";
svgStrU[14][13] = "Număr Cap";
svgStrU[15][13] = "Număr Încercări";
svgStrU[16][13] = "Distribuția Mediilor de Eșantioanelor";
svgStrU[17][13] = "Repetiție";
svgStrU[18][13] = "Eroare Standard";
svgStrU[19][13] = "Populație Medie";
svgStrU[20][13] = "Interval de Încredere";
svgStrU[21][13] = "Acuretețea Estimațieiy";
svgStrU[22][13] = "Sondaj Medie";
svgStrU[23][13] = "[TestStat]";
svgStrU[24][13] = "Distribuție";
svgStrU[25][13] = "Respinge H\u2080";
svgStrU[26][13] = "Acceptă H\u2080";
svgStrU[27][13] = "p-valoare";
svgStrU[28][13] = "[Decizie] ";
svgStrU[29][13] = "[ANOVA]";
svgStrU[30][13] = "Introduceți Coeficientul de Corelație și apăsați execută";
svgStrU[31][13] = "Regresiei";
svgStrU[32][13] = "Variabilă pe Rând";
svgStrU[33][13] = "Variabila pe Coloană";
svgStrU[34][13] = "Medie"
svgStrU[35][13] = "Medie"
svgStrU[36][13] = "<h3> Histogramă<br>Tabelul Frecvențelor</h3>";
svgStrU[37][13] = "Nume Grup";
svgStrU[38][13] = "Interval";
svgStrU[39][13] = "Rădăcină";
svgStrU[40][13] = " Frunză";
svgStrU[41][13] = "Grup 1  Frunză";
svgStrU[42][13] = "Grup 2  Frunză"
svgStrU[43][13] = "<h3>Bazele Statisticii</h3>";
svgStrU[44][13] = "Observație";
svgStrU[45][13] = "Minim";
svgStrU[46][13] = "Mediană";
svgStrU[47][13] = "Maxim";
svgStrU[48][13] = "Total";
svgStrU[49][13] = "Exponențială";
svgStrU[50][13] = "Uniformă";
svgStrU[51][13] = "Acuretețea Estimației";
svgStrU[52][13] = "- Creează punctele apasând, apoi eStat va găsi o linie de regresie.";
svgStrU[53][13] = "- Mută sau Șterge un punct. Observă cum se schimbă linia de regresie..";
svgStrU[54][13] = "[Sondaj Statisticii] ";
svgStrU[55][13] = "[Sondaj 1 Statisticii] ";
svgStrU[56][13] = "[Sondaj 2 Statisticii] ";
svgStrU[57][13] = "Siguranță Statistică";
svgStrU[58][13] = "Variabilele de pe rând si de pe coloană sunt independente";
svgStrU[59][13] = "Variabilele de pe rând si de pe coloană sunt dependente";
svgStrU[60][13] = "Dispersie Observată";
svgStrU[61][13] = "Distribuția Teoretică";
svgStrU[62][13] = "Test de ajustare";
svgStrU[63][13] = "Testul Wilcoxon al Sumei Rangurilor";
svgStrU[64][13] = "Testul Wilcoxon al Sumei Rangurilor Tabel";
svgStrU[65][13] = "Test Kruskal-Wallis";
svgStrU[66][13] = "Kruskal-Wallis H Distribuție";
svgStrU[67][13] = "Kruskal-Wallis H Statistică";
svgStrU[68][13] = "Testul Wilcoxon al Sumei Rangurilor cu Semn";
svgStrU[69][13] = "Testul Semnului";
svgStrU[70][13] = "Testul Friedman";
svgStrU[71][13] = "Friedman S Statistică";
svgStrU[72][13] = "Friedman S Distribuție";
svgStrU[73][13] = "t valoare (sau Z)";
svgStrU[74][13] = "ChiSq valoare";
svgStrU[75][13] = "Sondaj Varianței";
svgStrU[76][13] = "Diferența dintre mijloacele de eșantionare";
svgStrU[77][13] = "Raportul variațiilor eșantionului";
svgStrU[78][13] = "Presupunere asupra Varianței";
svgStrU[79][13] = "Rezumat Date";
svgStrU[80][13] = "Selecție multiplă";
svgStrU[81][13] = "Selectați până la două grupuri";
svgStrU[82][13] = "X Var";
svgStrU[83][13] = "Y Var";
svgStrU[84][13] = "de";
svgStrU[85][13] = "nici o variabilă de grup";
svgStrU[86][13] = "Datele selectate: ";
svgStrU[87][13] = "Date Brute";
svgStrU[88][13] = "Selectați variabilă dând clic pe numele var";
svgStrU[89][13] = "lipsă de observație";
svgStrU[90][13] = "Rang Suma";
svgStrU[91][13] = "Longitude";
svgStrU[92][13] = "Latitude";
svgStrU[93][13] = "Cel puțin o pereche de locații este diferităt";
svgStrU[94][13] = "Wilcoxon Semnat Rang Suma Distribuție";
svgStrU[95][13] = "Două Var";
svgStrU[96][13] = "Două Selecții";
svgStrU[97][13] = "Testul de independență";
svgStrU[98][13] = "Simulare";
svgStrU[99][13] = "Număr aleatoriu";
svgStrU[100][13] = "Distribuție Normală";
svgStrU[101][13] = "t Distribuție";
svgStrU[102][13] = "&chi;&#178; Distribuție";
svgStrU[103][13] = "F Distribuție";
svgStrU[104][13] = "HSD Studentd Gamăe Distribuție";
svgStrU[105][13] = "primul trimestru pentru primul trimestru";
svgStrU[106][13] = "al treilea trimestru din trimestrul";
svgStrU[107][13] = "Intervalul Interquartile";
svgStrU[108][13] = "Coeficient de determinare";
svgStrU[109][13] = "Frecvența relativă cumulată (%)";
svgStrU[110][13] = "Numărul maxim de numere întregi de distribuție uniformă";
svgStrU[111][13] = "Deplasați un punct cu mouse-ul";
svgStrU[112][13] = "Extracția restaurării";
svgStrU[113][13] = "fără înlocuire";
svgStrU[114][13] = "Liniară"; 
svgStrU[115][13] = "Modificare procentuală";
svgStrU[116][13] = "Index simplu";
svgStrU[117][13] = "Decalaj";
svgStrU[118][13] = "Diferență";
svgStrU[119][13] = "Autocorelare";
svgStrU[120][13] = "Jurnal";
svgStrU[121][13] = "Rădăcină pătrată";
svgStrU[122][13] = "Box-Cox";
svgStrU[123][13] = "Timp de bază";
svgStrU[124][13] = "Media mobilă centrată";
svgStrU[125][13] = "Netezire exponențială";
svgStrU[126][13] = "Median în mișcare centrat";
svgStrU[127][13] = "Model";
svgStrU[128][13] = "Media mobilă";
svgStrU[129][13] = "Medie mobilă dublă";
svgStrU[130][13] = "Netezire exponențială dublă Holt";
svgStrU[131][13] = "Index sezonier";
svgStrU[132][13] = "Model sezonier multiplicativ Holt-Winters";
svgStrU[133][13] = "Serial de sezon";
svgStrU[134][13] = "Bloc";
svgStrU[135][13] = "Analiză cluster";
svgStrU[136][13] = "Cluster";
svgStrU[137][13] = "Arborele de decizie";
svgStrU[138][13] = "Condiția regulii deciziei";
svgStrU[139][13] = "Decizie";
svgStrU[140][13] = "Iterație";
svgStrU[141][13] = "Grafic paralel";
svgStrU[142][13] = "Clasificare";
svgStrU[143][13] = "Funcția de clasificare";
svgStrU[144][13] = "Rezultatul clasificării";
svgStrU[145][13] = "Decizie";
svgStrU[146][13] = "Rata de clasificare greșită";
svgStrU[147][13] = "Celula";
svgStrU[148][13] = "Date de antrenament";
svgStrU[149][13] = "Date de testare";


// Thai
$message.th = {
    "eStat : Stat Education SW": "eStat : ซอฟต์แวร์การศึกษาสถิติ",
    "Home": "หน้าแรก",
    "Filename": "ชื่อไฟล์",
    "Selected Variables": "ตัวแปรที่เลือกไว้",
    "Cancel": "ยกเลิก",
    "Edit Variables": "แก้ไขตัวแปร",
    "Level": "ระดับ",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "ตัวอย่าง",
    "New Sheets": "ชีตใหม่",
    "csv Open": "csv เปิด",
    "www Open": "www เปิด",
    "json Open": "json เปิด",
    "csv Save": "csv บันทึก",
    "json Save": "json บันทึก",
    "Print Sheet": "พิมพ์ชีต",
    "Bar Graph": "แผนภูมิแท่ง",
    "Pie Chart": "แผนภูมิรูปวงกลม",
    "Band Graph": "แผนภาพแถบ",
    "Line": "แผนภาพเส้น",
    "Line Graph": "แผนภาพเส้น",
    "Dot Graph": "แผนภาพจุด",
    "Histogram": "ฮิสโทแกรม",
    "Stem & Leaf Plot": "แผนภาพลำต้นและใบ",
    "maxStem": "** จำนวนก้านสูงสุด <= 30 **",
    "Box-Whisker Plot": "แผนภาพกล่อง",
    "Scatterplot": "แผนภาพการกระจาย",
    "ScatterplotMatrix": "เมทริกซ์แผนภาพการกระจาย",
    "Frequency Table": "ตารางแจกแจงความถี่",
    "Basic Statistics": "สถิติพื้นฐาน",
    "Testing Hypothesis &mu;": "ทดสอบสมมติฐาน &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "ทดสอบสมมติฐาน &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "ทดสอบสมมติฐาน  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "ทดสอบสมมติฐาน &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "ตัวแปรวิเคราะห์",
    "MiddleSchool": "โรงเรียนมัธยมต้น",
    "HighSchool":   "มัธยม",
    "University":   "มหาวิทยาลัย",
    "eStatHeading": "eStat เป็นฟรีแวร์บนเว็บสำหรับการศึกษาสถิติที่ดีขึ้น โดยใช้การแสดงภาพข้อมูลแบบไดนามิกและการวิเคราะห์ทางสถิติแบบกราฟิก",
    "Support":      "สนับสนุน",
    "Donation":     "บริจาค",
    "Middle School Stat Education": "การศึกษาสถิติโรงเรียนมัธยม",
    "High School Stat Education": "สถิติระดับมัธยมศึกษา",
    "University Stat Education": "สถิติระดับมหาวิทยาลัย",
    "Elem Stat Graph Example": "ตัวอย่างกราฟเชิงสถิติ",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "แนวตั้ง",
    "Horizontal": "แนวนอน",
    "Vertical Separated Bar": "แผนภูมิแท่งแยกกันในแนวตั้ง",
    "Vertical Stacked Bar": "แผนภูมิแท่งซ้อนกันในแนวตั้ง",
    "Vertical Ratio Bar": "แผนภูมิแท่งแสดงสัดส่วนในแนวตั้ง",
    "Vertical Side by Side Bar": "แผนภูมิแท่งเชิงซ้อนในแนวตั้ง",
    "Vertical Two Sided Bar": "แผนภูมิแท่งสองฝั่งในแนวตั้ง",
    "Horizontal Separated Bar": "แผนภูมิแท่งแยกกันในแนวนอน",
    "Horizontal Stacked Bar": "แผนภูมิแท่งซ้อนกันในแนวนอน",
    "Horizontal Ratio Bar": "แผนภูมิแท่งแสดงสัดส่วนในแนวนอน",
    "Horizontal Side by Side Bar": "แผนภูมิแท่งเชิงซ้อนในแนวนอน",
    "Horizontal Two Sided Bar": "แผนภูมิแท่งสองฝั่งในแนวนอน",
    "Doughnut Graph": "แผนภาพโดนัท",
    "Two Sided Stem & Leaf Plot": "สองด้านแผนภาพลำต้นและใบ",
    "Graph Save": "บันทึกแผนภาพ",
    "Graph Print": "พิมพ์แผนภาพ",
    "Move to Table": "ย้ายไปในตาราง",
    "Edit Title": "แก้ไขหัวข้อ",
    "Table Save": "บันทึกตาราง",
    "Table Print": "พิมพ์ตาราง",
    "Frequency": "ความถี่",
    "Sorting": "เรียงลำดับ",
    "SortData": "เรียงลำดับ",
    "Raw Data": "ข้อมูลดิบ",
    "Descending": "จากมากไปหาน้อย",
    "Ascending": "จากน้อยไปหามาก",
    "Mean": "ค่าเฉลี่ย",
    "Std Deviation": "ส่วนเบี่ยงเบนมาตรฐาน",
    "MeanStd": "ค่าเฉลี่ย/ส่วนเบี่ยงเบนมาตรฐาน",
    "DotMeanStd": "แผนภาพจุด - ค่าเฉลี่ย/ส่วนเบี่ยงเบนมาตรฐาน",
    "95CI": "95% ช่วงความเชื่อมั่น",
    "CorrelationAnalysis": "การวิเคราะห์สหสัมพันธ์",
    "RegressionAnalysis": "การวิเคราะห์การถดถอย",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "การวิเคราะห์ความแปรปรวนแบบสองทาง",
    "Regression": "การถดถอย",
    "RegressionLine": "เส้นการถดถอย",
    "RegressionBand": "แถบความเชื่อมั่น",
    "RegressionTable": "การวิเคราะห์การถดถอย",	
    "Frequency Polygon": "รูปหลายเหลี่ยมความถี่",
    "Execute New Interval": "คำนวณช่วงใหม่",
    "Interval Start": "ค่าเริ่มต้นของช่วง",
    "Interval Width": "ความกว้างของช่วง",
    "t-test": "t การทดสอบ",
    "Z-test": "Z การทดสอบ",
    "(if Z-test, enter &sigma;)": "(สำหรับการทดสอบแซด ระบุส่วนเบี่ยงเบนมาตรฐาน &sigma;)",
    "Significance Level": "ระดับนัยสำคัญ",
    "Execute": "คำนวณ",
    "(Confidence Interval)": "(ช่วงความเชื่อมั่น)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(สำหรับการทดสอบแซด ใช้ Z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178; การทดสอบ",
    "Variance Assumption": "สมมติฐานของความแปรปรวน",
    "Variance": "ความแปรปรวน",
    "F test": "F การทดสอบ",
    "At least one pair of means is different": "ค่าเฉลี่ยอย่างน้อยหนึ่งคู่แตกต่างกัน",
    "Main Title": "หัวข้อหลัก",
    "y title": "ชื่อแกนตั้ง",
    "x title": "ชื่อแกนนอน",
    "yAxis": "แกน Y",
    "Modify": "ปรับเปลี่ยน",
    "Confirm": "ยืนยัน",
    "Variable Name": "ชื่อตัวแปร",
    "Variable Value": "ค่าของตัวแปร",
    "Value Label": "ค่าระดับ",
    "* Less than nine value labels allowed.": "* อนุญาตให้มีไม่เกิน 9 ระดับ",
    "Save": "บันทึก",
    "Exit": "ออก",
    "eStatU UnivStatEdu": "eStatU - สถิติระดับมหาวิทยาลัย",
    "eStatH HighStatEdu": "eStatH - สถิติระดับมัธยมศึกษา",
    "eStatM MiddleStatEdu": "eStatM - ประถมศึกษา / สถิติมัธยมต้น SW",
    "MiddleStat": "สถิติมัธยมต้น",
    "HighStat":   "สถิติมัธยมปลาย",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "เมนู",
    "Binomial Experiment": "การทดลองทวินาม",
    "Binomial Distribution": "การแจกแจงทวินาม",
    "Binomial Prob Table": "ตารางความน่าจะเป็นทวินาม",
    "Poisson Distribution": "การแจกแจงปัวซง",
    "Poisson Prob Table": "ตารางความน่าจะเป็นปัวซง",
    "Geometric Distribution": "การแจกแจงเรขาคณิต",
    "Geometric Prob Table": "ตารางความน่าจะเป็นเรขาคณิต",
    "HyperGeometric Distribution": "การแจกแจงเรขาคณิตไฮเพอร์",
    "HyperGeometric Prob Table": "ตารางความน่าจะเป็นเรขาคณิตไฮเพอร์",
    "Exponential Distribution": "การแจกแจงแบบเลขชี้กำลัง",
    "Normal Experiment": "การทดลองปรกติ",
    "Normal Distribution": "การแจกแจงปรกติ",
    "Normal Approx": "การประมาณด้วยการแจกแจงปกติ",
    "t Distribution": "t การแจกแจง",
    "ChiSquare Distribution": "&chi;&#178; การแจกแจง",
    "F Distribution": "F การแจกแจง",
    "Sampling": "การสุ่ม",
    "Population vs Sample": "ประชากร vs ตัวอย่าง",
    "Population": "ประชากร",
    "Sample": "ตัวอย่าง",
    "Exponential": "เลขชี้กำลัง(0.3)",
    "Uniform": "เอกรูป(0,1)",
    "UniformDist": "เอกรูป",
    "Sample05": "การสุ่ม 5%",
    "Sample10": "การสุ่ม 10%",
    "Sample20": "การสุ่ม 20%",
    "Statistics/BoxPlot": "สถิติ/แผนภาพกล่อง",
    "StatisticalProb":     "ความน่าจะเป็นทางสถิติ",
    "Law of Large Number": "กฎจำนวนมาก",
    "Dist of Sample Means": "การแจกแจงค่าเฉลี่ยตัวอย่าง",
    "Sampling Distribution": "การกระจายตัวตัวอย่าง",
    "Sample Size": "ขนาดตัวอย่าง",
    "Confidence Interval": "ช่วงความเชื่อมั่น",
    "Confidence Interval Simulation": "ช่วงความเชื่อมั่น จำลอง",
    "Simulation": "จำลอง",
    "Confidence Interval Mu": "การประเมิน :  &mu;",
    "Mu Confidence Interval": "การประเมิน :  &mu;",
    "Confidence Interval Sigma": "การประเมิน :  &sigma;&#178; ",
    "Confidence Interval P": "การประเมิน :  p",
    "Estimation Accuracy": "ความแม่นยำของการประมาณ",
    "Repetition": "การทำซ้ำ",
    "Confidence Level": "ช่วงความเชื่อมั่น",
    "Testing Hypothesis mu_titleAB": "การทดสอบเกี่ยวกับค่าเฉลี่ย",
    "Testing Hypothesis mu_title": "การทดสอบเกี่ยวกับค่าเฉลี่ย",
    "Testing Hypothesis sigma_title": "การทดสอบเกี่ยวกับความแปรปรวน",
    "Testing Hypothesis P_title": "การทดสอบเกี่ยวกับค่าสัดส่วน",
    "Testing Hypothesis mu12_title": "การทดสอบเกี่ยวกับค่าเฉลี่ยของสองกลุ่ม",
    "Testing Hypothesis sigma12_title": "การทดสอบเกี่ยวกับความแปรปรวนของสองกลุ่ม",
    "Testing Hypothesis P12_title": "การทดสอบเกี่ยวกับค่าสัดส่วนของสองกลุ่ม",
    "Testing Hypothesis muA":  "ทดสอบสมมติฐาน &mu; - C, &beta;",
    "Testing Hypothesis muAB": "ทดสอบสมมติฐาน &mu; - C, n",
    "Testing Hypothesis mu": "ทดสอบสมมติฐาน &mu;",
    "Testing Hypothesis sigma": "ทดสอบสมมติฐาน &sigma;&#178;",
    "Testing Hypothesis P": "ทดสอบสมมติฐาน p",
    "Testing Hypothesis mu12": "ทดสอบสมมติฐาน &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "ทดสอบสมมติฐาน &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "ทดสอบสมมติฐาน p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 ปัจจัย ANOVA",
    "Testing Hypothesis ANOVA2": "2 ปัจจัย ANOVA",
    "SameSampleSize": "ขนาดตัวอย่างของแต่ละเซลล์ควรเท่ากันขนาดตัวอย่างของแต่ละเซลล์ควรเท่ากัน",
    "Testing Independence": "ทดสอบสมมติฐาน",
    "CategoryD": "ประเภท",
    "Category": "ประเภท",
    "Correlation Coefficient": "สัมประสิทธิ์สหสัมพันธ์",
    "Regression Experiment": "การทดลองการถดถอยt",
    "Hypothesis": "สมมติฐาน",
    "Test Type": "ชนิดของการทดสอบ",
    "Z-test": "Z การทดสอบ",
    "t-test": "t การทดสอบ",
    "Chi-test": "&chi;&#178; การทดสอบ",
    "F-test": "F การทดสอบ",
    "Sampling Type": "ประเภทของการสุ่ม",
    "Independent Sample": "ตัวอย่างอิสระ",
    "Paired Sample": "ตัวอย่างเป็นคู่",
    "Sample Data": "ข้อมูลตัวอย่าง",
    "input either sample data": "ใส่ข้อมูลตัวอย่างหรือค่าสถิติในช่องถัดไปโดยใช้ csv/bsv",
    "input data": "ป้อนข้อมูล",
    "Sample Statistics": "ค่าสถิติตัวอย่าง",
    "Sample Mean": "ค่าเฉลี่ยตัวอย่าง",
    "Sample Variance": "ความแปรปรวนตัวอย่าง",
    "Sample Proportion": "ค่าสัดส่วนตัวอย่าง",
    "sample range": "ช่วงตัวอย่าง",
    "control chart": "แผนภูมิการควบคุม",
    "if Z-test-1": "(สำหรับการทดสอบแซด ระบุส่วนเบี่ยงเบนมาตรฐาน &sigma;&#178;)",
    "if Z-test-2": "(สำหรับการทดสอบแซด ใช้  z<sub>&alpha;/2 </sub>)",
    "At least one pair": "ค่าเฉลี่ยอย่างน้อยหนึ่งคู่แตกต่างกัน",
    "Row-Col-0": "ตัวแปรแถวและคอลัมน์อิสระต่อกัน",
    "Row-Col-1": "ตัวแปรแถวและคอลัมน์ไม่อิสระต่อกัน",
    "Enter any number of row": "(ใส่ค่าสังเกตจากช่องด้านบนซ้าย)",
    "Row": "แถว",
    "Column": "คอลัมน์",
    "Probability": "ความน่าจะเป็น",
    "Show Probability": "แสดงความน่าจะเป็น",
    "Regression Line": "เส้นการถดถอย",
    "Erase All": "ลบทั้งหมด",
    "Add Point": "เพิ่มจุด",
    "Erase Point": "ลบจุด",
    "Reference Site": "ตำแหน่งอ้างอิง",
    "Lot Size": "ขนาดการแบ่งส่วน",
    "Defect Size": "ขนาดความผิดพลาด",
    "Defect Rate": "อัตราข้อบกพร่อง",
    "If typed": "หลังจากพิมพ์หมายเลขคลิก [ดำเนินการ] หรือ [Enter]",
    "Stat/BoxPlot": "สถิติ/แผนภาพกล่อง",
    "Mean": "ค่าเฉลี่ย",
    "Std Dev": "ส่วนเบี่ยงเบนมาตรฐาน",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(หนึ่งกลุ่ม)",
    "AnalysisVar": "ตัวแปรวิเคราะห์",
    "AnalysisVar2": "Y ตัวแปร",
    "GroupVar": "กลุ่ม",
    "GroupVar2": "X ตัวแปร",
    "GroupVar3": "ปัจจัย1",
    "GroupVar4": "ปัจจัย2",
    "AnalysisVarMu12": "ตัวแปรวิเคราะห์(หรือ X1)",
    "GroupVarMu12": "ตัวแปรกลุ่ม(หรือ X2)",
    "PairedMu12": " X1, X2 : ตัวแปรที่ถูกจับคู่",
    "SizeVar": "ขนาดตัวแปร",
    "RegressionBand": "แถบความเชื่อมั่น",
    "RegressionTable": "การวิเคราะห์การถดถอย",
    "RegressionResidual": "พล็อตส่วนเหลือ",
    "RegressionResidualLeverage": "ส่วนเหลือ vs เลฟเวอเรจ",
    "RegressionCook": "ระยะทางของคุก",
    "RegressionQQ": "ส่วนเหลือ คิว-คิวพล็อต",
    "HistogramNormal": "ฮิสโทแกรม",
    "HistogramChisq": "การทดสอบความเป็นปรกติ",
    "HistogramNormalQQ": "การแจกแจงปรกติ คิว-คิวพล็อต",
    "PopulationStd": "ส่วนเบี่ยงเบนมาตรฐานของประชากร",
    "Type1Error": "ความผิดพลาดแบบที่ 1",
    "Type2Error": "ความผิดพลาดแบบที่ 2",
    "AnovaTable": "ตารางวิเคราะห์ความแปรปรวน",
    "AnovaMeanGraph": "ค่าเฉลี่ยช่วงความเชื่อมั่น",
    "MultipleComparison": "การเปรียบเทียบพหุคูณ",
    "ComparisonGraph": "กราฟเปรียบเทียบ",
    "AnovaResidual": "ส่วนเหลือมาตรฐาน พล็อต",
    "AnovaQQ": "ส่วนเหลือ คิว-คิวพล็อต",
    "TestingFit": "การทดสอบภาวะสารูปดี",
    "FitTest0": "การแจกแจงเชิงสังเกตและเชิงทฤษฎีนั้นเหมือนกัน",
    "FitTest1": "การแจกแจงเชิงสังเกตและเชิงทฤษฎีนั้นแตกต่างกัน",
    "ObservedFreq": "ความถี่เชิงสังเกต O",
    "ExpectedProb": "ความน่าจะเป็นคาดหมาย p",
    "ExpectedFreq": "ความถี่คาดหมาย E(>5)",
    "InputFitData": "ใส่ค่าสังเกตจากช่องด้านบนซ้าย",
    "ExecuteTable": "สถิติ",
    "MeanDotGraph": "ช่วงความเชื่อมั่น Graph",
    "ScatterRegression": "แผนภาพการกระจาย",
    "Factor": "ปัจจัย",
    "Interaction": "อิทธิพลร่วม",
    "NoInteraction": "ไม่มีอิทธิพลร่วม",
    "ExistInteraction": "มีอิทธิพลร่วม",
    "eStatLecture": "การบรรยายแนะนำ eStat",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "การทดสอบผลบวกลำดับที่ของวิลค็อกซัน", 
    "NonParametricMu12": "การทดสอบผลบวกลำดับที่ของวิลค็อกซัน : พารามิเตอร์บ่งตำแหน่ง M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "การทดสอบผลบวกลำดับที่ของวิลค็อกซัน",
    "Sample Range": "อันดับผลรวม",
    "DistributionTable": "ตารางแจกแจงความถี่",
    "SignedRankTestDist": "การทดสอบลำดับที่โดยเครื่องหมายของวิลค็อกซันการแจกแจง",
    "WilcoxonTestDist": "การทดสอบผลบวกลำดับที่ของวิลค็อกซัน การแจกแจง",
    "KruskalTestDist": "Kruskal-Wallis H การแจกแจง",
    "FriedmanTestDist": "Friedman S การแจกแจง",
    "SignedRankTest": "การทดสอบลำดับที่โดยเครื่องหมายของวิลค็อกซัน",
    "SignTest": "การทดสอบด้วยเครื่องหมาย",
    "SignCount": "การนับเครื่องหมาย",
    "KruskalTest": "Kruskal-Wallis การทดสอบ",
    "KruskalTestANOVA": "Kruskal-Wallis การทดสอบ",
    "Total": "รวม",
    "FriedmanTest": "Friedman การทดสอบ",
    "FriedmanTestANOVA": "Friedman การทดสอบ",
    "Block": "กลุ่ม",
    "Treatment": "การรักษา",
    "At least one locations is different": "สถานที่ตั้งอย่างน้อยหนึ่งคู่แตกต่างกัน",
    "SignCondition": "ถ้า  n ≤ 100 ทดสอบทวินาม,  n > 100 การประมาณด้วยการแจกแจงปกติ",
    "WilcoxonSignCondition": "ถ้า n ≤ 20 การทดสอบผลบวกลำดับที่ของวิลค็อกซัน,  n > 20 การประมาณด้วยการแจกแจงปกติ",
    "WilcoxonRankCondition": "ถ้า  n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 การทดสอบผลบวกลำดับที่ของวิลค็อกซัน,  n>25 การประมาณด้วยการแจกแจงปกติ",
    "KruskalCondition": "ถ้า  n ≤ 10 H Distribution Test,  else &chi;&#178;การประมาณt",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "การเลือกตัวแปร",
    "VariableSelect4": "สามารถเลือกตัวแปรการวิเคราะห์เพิ่มเติมได้",
    "VariableSelect5": "สามารถเลือกตัวแปร X เพิ่มเติมได้",
    "SummaryData": "ข้อมูลสรุป",
    "RawData": "ข้อมูลดิบ",
    "MultiSelect": "",
    "DataType": "(เลือกตัวแปรโดยคลิกชื่อตัวแปร)",
    "by": "โดย",
    "NameVar": "ชื่อตัวแปร",
    "n_variance": "n-1 สูตร",
    "RandomNumber": "จำนวนสุ่ม",
    "RealNumber":     "เบอร์จริง",
    "IntegerNumber":  "เลขจำนวนเต็ม",
    "NumberData":     "จำนวนข้อมูล",
    "NumberDigit":    "เลขทศนิยม",
    "NormalTable":    "การแจกแจงปรกติ ตาราง",
    "Percentile":     "ตารางเปอร์เซนต์",
    "PercentileValue":     "เปอร์เซ็น",
    "StudentRangeDist": "HSDช่วงที่ได้รับการศึกษา การแจกแจง.",
    "copy link": "คัดลอกลิงค์",
    "WithoutReplacement": "โดยไม่ต้องเปลี่ยน",
    "WithReplacement":    "การสกัดการฟื้นฟู",
    "Replacement":     "การสกัดการฟื้นฟู",
    "NonReplacement":  "โดยไม่ต้องเปลี่ยน",
    "WordCloud":       "Word Cloud (ภาษาอังกฤษ)",
    "oneColor":        "สีเดียว",
    "defaultColor":    "สีเริ่มต้น",
    "RelativeFreq":    "ความถี่สัมพัทธ์",
    "Density":         "ความหนาแน่น",
    "MarginOfError":   "ขอบของข้อผิดพลาด",
    "Permutation":     "การเรียงสับเปลี่ยน",
    "Combination":     "การรวมกัน",
    "NumberOfCase":    "จำนวนกรณี",
    "BinomialTheorem": "ทฤษฎีบททวินาม",
    "PascalTriangle":  "สามเหลี่ยมปาสคาล",
    "Character":       "Emoji",
    "AdditionRule":      "กฎความน่าจะเป็นเพิ่มเติม",
    "MultiplicationRule":"กฎความน่าจะเป็นการคูณ",
    "ConditionalProb":   "ความน่าจะเป็นแบบมีเงื่อนไข",
    "JointProb":         "ความน่าจะเป็นร่วม",
    "DiscreteDist":      "การกระจายแบบไม่ต่อเนื่อง",
    "Categorize":        "จัดหมวดหมู่",
    "Recode":            "ถอดรหัส",
    "Compute":           "คำนวณ",
    "SelectIf":          "เลือกถ้า",
    "InfoValueLabel":    "*** เลือกตัวแปรป้อนชื่อตัวแปรและ / หรือป้ายกำกับค่า",
    "InfoSorting":       "*** เลือกตัวแปรการเรียงลำดับ ป้อนวิธีการเรียงลำดับสูงสุด 3 ตัวแปร",
    "InfoCategorize":    "*** เลือกตัวแปรสำหรับหมวดหมู่ ป้อนช่วงเวลาเริ่มต้นและความกว้างของช่วงเวลา",
    "InfoRecode":        "*** เลือกตัวแปรสำหรับบันทึก ป้อนค่าใหม่",
    "InfoRecode2":       "* อนุญาตให้บันทึกได้ถึง 9 ค่า",
    "InfoCompute":       "*** สร้างสูตรการคำนวณโดยใช้ปุ่มด้านล่าง",
    "InfoSelectIf":      "*** เลือกได้สูงสุด 3 ตัวแปร ป้อนเงื่อนไข",
    "SortingVariable":   "การเรียงลำดับตัวแปร",
    "SortingMethod":     "วิธีการเรียงลำดับ",
    "NewVariable":       "ตัวแปรใหม่",
    "CategoryVariable":  "จำแนกตัวแปร",
    "CategoryListCheck": "ตรวจสอบรายการหมวดหมู่",
    "CategoryInterval":  "ช่วงหมวดหมู่",
    "CategoryLabel":     "ป้ายกำกับหมวดหมู่",
    "RecodeVariable":    "ถอดรหัสตัวแปร",
    "CurrentValue":      "มูลค่าปัจจุบัน",
    "NewValue":          "ค่าใหม่",
    "ComputeFormula":    "สูตร",
    "SelectVariable":    "ตัวแปร<br>สำหรับการเลือก",
    "RelationOperator":  "ความสัมพันธ์<br>โอเปอเรเตอร์",
    "SelectValue":       "ค่า",
    "MissingValue":      "ไม่มีค่า",
    "option":            "ตัวเลือก",                                  
    "TimeSeries":        "ไทม์ซีรีส์",
    "Smoothing":         "เรียบ",
    "Filtering":         "การกรอง",
    "Transformation":    "การเปลี่ยนแปลง",
    "Weight":            "น้ำหนัก",
    "PercentChange":     "เปอร์เซ็นต์การเปลี่ยนแปลง",
    "WeightedIndex":     "ดัชนีอย่างง่าย",
    "BaseTime":          "เวลาพื้นฐาน",
    "LagTime":           "เวลาล่าช้า",
    "Lag":               "เวลาล่าช้า",
    "Forecasting":       "พยากรณ์",
    "SeasonalModel":     "แบบจำลองตามฤดูกาล",
    "HoltWinter":        "แบบจำลองตามฤดูกาลของ Holt-Winters",
    "Trend":             "แนวโน้ม",
    "Seasonal":          "ตามฤดูกาล",
    "Deseasonal":        "ซีรีส์ดีซีซัน",
    "Nseason":           "ครั้งในฤดูกาล",
    "Irregular":         "ผิดปกติ",
    "TrendModel":        "เทรนด์โมเดลเกี่ยวกับดีซีซันอล",
    "RegressionModel":   "แบบจำลองการถดถอย",
    "ForecastingPeriod": "ระยะเวลาพยากรณ์",
    "CreateTable":       "ตารางข้อมูล",
    "SaveTable":         "บันทึกตาราง",
    "MA":                "ค่าเฉลี่ยเคลื่อนที่",
    "EWMA":              "แบบจำลอง EWMA",
    "CenterMA":          "เส้นค่าเฉลี่ยเคลื่อนที่กึ่งกลาง",
    "MovingMedian":      "ค่ามัธยฐานการย้ายศูนย์กลาง",
    "ES":                "การปรับให้เรียบแบบเอ็กซ์โพเนนเชียล",
    "Default":           "ค่าเริ่มต้น",
    "Linear":            "เชิงเส้น",
    "Quadratic":         "กำลังสอง",
    "Cubic":             "ลูกบาศก์",
    "SquareRoot":        "รากที่สอง",
    "Log":               "ลอการิทึม",
    "Exponent":          "เลขชี้กำลัง",
    "Power":             "พลัง",
    "BoxCox":            "บ็อกซ์-ค็อกซ์",
    "SingleMA":          "เส้นค่าเฉลี่ยเคลื่อนที่เดี่ยว",
    "SingleES":          "การปรับให้เรียบแบบเอกซ์โปเนนเชียล",
    "DoubleMA":          "เส้นค่าเฉลี่ยเคลื่อนที่สองเท่า",
    "DoubleES":          "การปรับให้เรียบแบบเอกซ์โพเนนเชียลสองเท่า",
    "HoltLinear":        "โฮลท์เอ็กซ์โปเนนเชียล สมูทติ้ง",
    "DeseasonIntercept": "การสกัดกั้น Deseasonal",
    "DeseasonSlope":     "ความลาดชันตามฤดูกาล",
    "SeasonalIndex":     "ดัชนีตามฤดูกาล",
    "Diff":              "ความแตกต่าง",
    "DiffTime":          "แตกต่างเวลา",
    "AR":                "แบบจำลองการถดถอยอัตโนมัติ",
    "ResultTable":       "ผลการถดถอย",
    "ForecastTable":     "ตารางพยากรณ์",
    "HoltLevel":         "ระดับ",
    "HoltTrend":         "แนวโน้ม",
    "AutoCorrTable":     "ตารางความสัมพันธ์อัตโนมัติ",
    "DiffSeries":        "ชุดความแตกต่าง",
    "RawSeries":         "อนุกรมเวลาเดิม",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Thai
appStr[0][14] = "/estat/eStat/index.html";
appStr[1][14] = "/estat/eStatH/index.html";
appStr[2][14] = "/estat/eStatU/index.html";
appStr[3][14] = "/estat/eStatE/index_en.html";
appStr[4][14] = "/estat/eHelp/index_en.html";
appStr[5][14] = "index.html";
appStr[6][14] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][14] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][14] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][14] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][14] = "";
appStr[11][14] = "Large Population Country";
appStr[12][14] = "Life Expectancy (OECD)";
appStr[13][14] = "Population Pyramid (Korea)";
appStr[14][14] = "GNP per Capita (OECD)";
appStr[15][14] = "Top World Export Country";
appStr[16][14] = "Obesity % of Population";
appStr[17][14] = "Temperature of Major City";
appStr[18][14] = "Top CO2 Emission Country";
appStr[19][14] = "Alcohol Consume (OECD)";
appStr[20][14] = "Continuous Data Graph";
appStr[21][14] = "Length of Otter";
appStr[22][14] = "Age of Teacher";
appStr[23][14] = "Age of Teacher by Sex";
appStr[24][14] = "Cleanliness of Tooth";
appStr[25][14] = "Math Exam Scores";
appStr[26][14] = "Calorie of Hamberger";
appStr[27][14] = "Height vs Weight by Sex";
appStr[28][14] = "Discrete Data Graphs";
appStr[29][14] = "";
appStr[30][14] = "";
appStr[31][14] = "unit";
appStr[32][14] = "Country";
appStr[33][14] = "Male";
appStr[34][14] = "Female";
appStr[35][14] = "Age";
appStr[36][14] = "Person";
appStr[37][14] = "billion $";
appStr[38][14] = "Export";
appStr[39][14] = "Obesity %";
appStr[40][14] = "Celsius";
appStr[41][14] = "City";
appStr[42][14] = "Jan High";
appStr[43][14] = "Jul High";
appStr[44][14] = "million ton";
appStr[45][14] = "liter/year";
appStr[46][14] = "Alcohol";
alertMsg[1][14] = "หนึ่งในตัวแปรที่เลือกไว้ไม่มีข้อมูล";
alertMsg[2][14] = "เลือกตัวแปรเพื่อนำมาวิเคราะห์ (คลิกที่ชื่อคอลัมน์) ทีละตัวแปร หากมีตัวแปรสองตัว ตัวแปรแรกเป็นตัวแปรกลุ่ม";
alertMsg[3][14] = "ตัวแปรที่เลือกไว้มีข้อมูลสูญหาย";
alertMsg[4][14] = "หากจำนวนข้อมูลของแต่ละตัวแปรมีความแตกต่างกัน จะไม่สามารถวิเคราะห์ข้อมูลได้";
alertMsg[5][14] = "มีกลุ่มมากเกินไป! อาจเกิดการซ้อนทับของกราฟเนื่องจากพื้นที่ในการแสดงผลไม่เพียงพอ";
alertMsg[6][14] = "หากตัวแปรที่จะนำมาวิเคราะห์มีตัวอักษรในข้อมูล จะไม่สามารถทำการวิเคราะห์เชิงสถิติ หรือสร้างตารางได้";
alertMsg[7][14] = "หากเลือกตัวแปรมากกว่าสามตัวจากข้อมูลดิบ จะไม่สามารถทำการวิเคราะห์ หรือการสร้างตารางได้";
alertMsg[8][14] = "หากมีจำนวนข้อมูลน้อยกว่า 200 ตัว จะไม่สามารถสร้างแผนภาพจุดได้";
alertMsg[9][14] = "หากมีจำนวนข้อมูลน้อยกว่า 100 ตัว จะไม่สามารถสร้างแผนภาพลำต้นและใบได้";
alertMsg[10][14] = "ไม่ได้เลือกตัวแปรการวิเคราะห์";
alertMsg[11][14] = "ไม่ได้เลือกตัวแปรการวิเคราะห์ / กลุ่ม";
alertMsg[12][14] = "หากตัวแปรที่จะนำมาวิเคราะห์มีตัวอักษรในข้อมูล จะไม่สามารถทำการวิเคราะห์หรือการสร้างตารางได้";
alertMsg[13][14] = "";
alertMsg[14][14] = "ไม่สามารถใช้ข้อมูลที่สรุปมาแล้ว สำหรับแผนภาพแสดงข้อมูลแบบต่อเนื่อง และการทดสอบสมมติฐาน";
alertMsg[16][14] = "การทดสอบสมมติฐานนี้ใช้ได้เฉพาะข้อมูลสองกลุ่มเท่านั้น";
alertMsg[17][14] = "แผนภาพการกระจายจำเป็นต้องมีแกน x และแกน y";
alertMsg[18][14] = "แผนภาพการกระจายไม่สามารถแสดงผลตัวแปรมากกว่า 3 ตัวได้";
alertMsg[19][14] = "ถ้าตัวแปร  มีตัวอักษร จะไม่สามารถสร้างแผนภาพการกระจายได้";
alertMsg[20][14] = "ถ้าตัวแปร  มีตัวอักษร จะไม่สามารถสร้างแผนภาพการกระจายได้";
alertMsg[21][14] = "ถ้ามีข้อมูลสูญหาย ไม่สามารถทำการบันทึกได้";
alertMsg[22][14] = "ถ้ามีจำนวนลบ ไม่สามารถสร้างแผนภูมิแท่งได้";
alertMsg[25][14] = "ถ้ามีเพียงกลุ่มเดียว ไม่สามารถสร้างแผนภูมิแท่งส่วนประกอบได้";
alertMsg[27][14] = "ถ้ามีเพียงกลุ่มเดียว ไม่สามารถสร้างแผนภูมิแท่งเชิงอัตราส่วนได้";
alertMsg[29][14] = "ถ้ามีเพียงกลุ่มเดียว ไม่สามารถสร้างแผนภูมิแท่งเชิงซ้อนได้";
alertMsg[31][14] = "ถ้ามีเพียงกลุ่มเดียว ไม่สามารถสร้างแผนภูมิแท่งสองฝั่งได้";
alertMsg[32][14] = "ถ้ามีจำนวนลบ ไม่สามารถสร้างแผนภูมิรูปวงกลมได้";
alertMsg[33][14] = "ถ้ามีจำนวนลบ ไม่สามารถสร้างแผนภาพโดนัทได้";
alertMsg[34][14] = "ถ้ามีจำนวนลบ ไม่สามารถสร้างแผนภาพแถบได้";
alertMsg[35][14] = "ถ้ามีจำนวนลบ ไม่สามารถสร้างตารางแจกแจงความถี่ได้";
alertMsg[36][14] = "แผนภูมิแท่งนี้สามารถสร้างได้สำหรับข้อมูลที่มีเพียงสองกลุ่มเท่านั้น";
alertMsg[37][14] = "การทดสอบสมมติฐานนี้สามารถทำได้กับตัวแปรหนึ่งตัวเท่านั้น";
alertMsg[38][14] = "ค่าเฉลี่ยประชากรไม่ใช่ตัวเลข ใส่ค่าแล้วลองใหม่อีกครั้ง!";
alertMsg[39][14] = "ส่วนเบี่ยงเบนมาตรฐานไม่ใช่ตัวเลขหรือมีค่าเป็นศูนย์ ลองใหม่อีกครั้ง!";
alertMsg[40][14] = "ค่าความแปรปรวนไม่ใช่ตัวเลข ใส่ค่าแล้วลองใหม่อีกครั้ง!";
alertMsg[41][14] = "การทดสอบสมมติฐานนี้สามารถทำได้กับสองตัวแปรเท่านั้น ตัวแปรกลุ่มต้องมีเพียง 2 กลุ่ม";
alertMsg[42][14] = "ไม่สามารถแก้ไขชื่อของการทดสอบสมมติฐาน!";
alertMsg[43][14] = "การถดถอยเชิงเส้นสำหรับกลุ่มเดียวเท่านั้น";
alertMsg[44][14] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][14] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][14] = "เลือกหมายเลขตัวแปรเดียวกัน";
alertMsg[47][14] = "ไม่อนุญาตให้ใช้ข้อมูลอักขระในความถี่ !! ลองอีกครั้ง";
alertMsg[48][14] = "ไม่อนุญาตให้ใช้ข้อมูลตัวละคร !! ลองอีกครั้ง";
alertMsg[49][14] = "จำนวนการสังเกตควรน้อยกว่า 100 !! ลองอีกครั้ง";
alertMsg[50][14] = "ป้อนตัวเลขในช่วงเริ่มต้นหรือขั้นตอน";
alertMsg[51][14] = "ป้อนตัวเลข / จำนวนแถวควรเท่ากัน!! ลองอีกครั้ง";
alertMsg[52][14] = "ป้อนตัวเลขในหมวดหมู่และความถี่";
alertMsg[53][14] = "ขนาดช่วงไม่เท่ากัน !! ลองอีกครั้ง";
alertMsg[54][14] = "การสังเกต X ไม่เท่ากับการสังเกต Y !! ลองอีกครั้ง";
alertMsg[55][14] = "!!! ไม่มีข้อมูลในชีต";
alertMsg[56][14] = "!!! ไม่ได้เลือกตัวแปร";
alertMsg[57][14] = "!!! ป้อนช่วงเริ่มต้นและความกว้างของช่วงเวลา";
alertMsg[58][14] = "!!! ป้อนตัวเลขเริ่มต้นช่วงและความกว้างของช่วง";
alertMsg[59][14] = "!!! มากกว่า 9 ช่วง - เปลี่ยนความกว้างของช่วง";
alertMsg[60][14] = "!!! ตัวแปรนี้มีมากกว่า 9 ค่า";
alertMsg[61][14] = "!!! ไม่มีการป้อนค่า";
alertMsg[62][14] = "!!! ใส่สูตร";
alertMsg[63][14] = "!!!ไม่มีข้อมูลที่ตรงตามเงื่อนไข";
alertMsg[64][14] = "";
alertMsg[65][14] = ""; 
alertMsg[66][14] = "";
alertMsg[67][14] = "";
alertMsg[68][14] = "";
alertMsg[69][14] = "";

svgStr[1][14] = " แผนภูมิแท่ง";
svgStr[2][14] = " แผนภูมิรูปวงกลม";
svgStr[3][14] = " แผนภาพโดนัท";
svgStr[4][14] = " แผนภาพแถบ";
svgStr[5][14] = " แผนภาพเส้น";
svgStr[6][14] = " แผนภาพจุด";
svgStr[7][14] = " แผนภาพกล่อง";
svgStr[8][14] = " แผนภาพลำต้นและใบ";
svgStr[9][14] = " ฮิสโทแกรม";
svgStr[10][14] = " แผนภาพการกระจาย";
svgStr[11][14] = " ทดสอบสมมติฐาน: ค่าเฉลี่ยประชากร";
svgStr[12][14] = " ทดสอบสมมติฐาน:ความแปรปรวนของประชากร";
svgStr[13][14] = " ทดสอบสมมติฐาน: ประชากรสองคนหมายถึง";
svgStr[14][14] = " ทดสอบสมมติฐาน: ความแปรปรวนของประชากรสองค่า";
svgStr[15][14] = " ตัวแปรวิเคราะห์";
svgStr[16][14] = "ความถี่";
svgStr[17][14] = "สัดส่วน";
svgStr[18][14] = "กลุ่ม ";
svgStr[19][14] = " ";
svgStr[20][14] = "<h3>ข้อมูลสรุป<br>ตารางแจกแจงความถี่</h3>";
svgStr[21][14] = "ตัวแปรกลุ่ม";
svgStr[22][14] = "ตัวแปรแถว";
svgStr[23][14] = "รวม";
svgStr[24][14] = "ขนาดวงกลม";
svgStr[25][14] = "<h3>ตารางแจกแจงความถี่</h3>";
svgStr[26][14] = "ตัวแปรวิเคราะห์";
svgStr[27][14] = "ค่าของตัวแปร";
svgStr[28][14] = "ค่าระดับ";
svgStr[29][14] = "ความถี่";
svgStr[30][14] = "ความถี่สัมพัทธ์ ";
svgStr[31][14] = "<h3>ตารางไขว้</h3>";
svgStr[32][14] = "ตัวแปรคอลัมน์";
svgStr[33][14] = "ตัวแปรแถว";
svgStr[34][14] = "ค่าเฉลี่ย"
svgStr[35][14] = "ส่วนเบี่ยงเบนมาตรฐาน"
svgStr[36][14] = "<h3> ฮิสโทแกรม<br>ตารางแจกแจงความถี่</h3>";
svgStr[37][14] = "ชื่อกลุ่ม";
svgStr[38][14] = "ช่วง";
svgStr[39][14] = "ลำต้น";
svgStr[40][14] = " ใบไม้";
svgStr[41][14] = "กลุ่ม 1  ใบไม้";
svgStr[42][14] = "กลุ่ม 2  ใบไม้"
svgStr[43][14] = "<h3>สถิติพื้นฐาน</h3>";
svgStr[44][14] = "ค่าสังเกต";
svgStr[45][14] = "ค่าต่ำสุด";
svgStr[46][14] = "มัธยฐาน";
svgStr[47][14] = "ค่าสูงสุด";
svgStr[48][14] = "รวม";
svgStr[49][14] = "<h3>การทดสอบความเป็นปรกติ</h3>";
svgStr[50][14] = "ความถี่คาดหมาย > 5 <br>ขอแนะนำ";
svgStr[51][14] = "&chi;&#178; การทดสอบ<br>ระยะห่าง i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][14] = "ข้อมูล<br>ความถี่เชิงสังเกต<br>(O<sub>i</sub>)";
svgStr[53][14] = "การแจกแจงปรกติ<br>ความน่าจะเป็นคาดหมาย<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][14] = "การแจกแจงปรกติ<br>ความถี่คาดหมาย<br>(E<sub>i</sub>)";
svgStr[55][14] = "ระยะห่าง<br>&chi;&#178; ค่า<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][14] = "ผลรวม &chi;&#178; ค่า";
svgStr[57][14] = "ฮิสโทแกรม /  การแจกแจงปรกติ";
svgStr[58][14] = "การแจกแจงปรกติ คิว-คิวพล็อต";
svgStr[59][14] = "การแจกแจงปรกติ ควอนไทล์";
svgStr[60][14] = "สัมประสิทธิ์สหสัมพันธ์";
svgStr[61][14] = "สัมประสิทธิ์การกำหนด";
svgStr[62][14] = "ความคาดเคลื่อนมาตรฐาน";
svgStr[63][14] = "ตัวแปร";
svgStr[64][14] = "ชื่อตัวแปร";
svgStr[65][14] = "ตัวแปรอิสระ";
svgStr[66][14] = "ตัวแปรตาม";
svgStr[67][14] = "พารามิเตอร์";
svgStr[68][14] = "ค่าประมาณ";
svgStr[69][14] = "ค่า";
svgStr[70][14] = "ค่าจุดตัดแกนตั้ง";
svgStr[71][14] = "ความชัน";
svgStr[72][14] = "ปัจจัย";
svgStr[73][14] = "ผลบวกกำลังสอง";
svgStr[74][14] = "องศาอิสระ";
svgStr[75][14] = "กำลังสองเฉลี่ย";
svgStr[76][14] = "การถดถอย";
svgStr[77][14] = "ความคาดเคลื่อน";
svgStr[78][14] = "รวม";
svgStr[79][14] = "<h3>การวิเคราะห์การถดถอย</h3>";
svgStr[80][14] = "ส่วนเหลือมาตรฐาน คิว-คิวพล็อต";
svgStr[81][14] = "ส่วนเหลือมาตรฐาน";
svgStr[82][14] = "การแจกแจงปรกติ ควอนไทล์";
svgStr[83][14] = "พล็อตส่วนเหลือ";
svgStr[84][14] = "ค่าทำนาย";
svgStr[85][14] = "การวิเคราะห์ความแปรปรวนแบบสองทาง";
svgStr[86][14] = "ช่วงความเชื่อมั่น กราฟ";
svgStr[87][14] = "ส่วนเหลือ";
svgStr[88][14] = "ตารางค่าเฉลี่ยแบบสองทาง";
svgStr[89][14] = "เมทริกซ์แผนภาพการกระจาย";
svgStr[90][14] = "การเปรียบเทียบพหุคูณ";
svgStr[91][14] = "สถิติ";
svgStr[92][14] = "ปัจจัย";
svgStr[93][14] = "ระดับ";
svgStr[94][14] = "ตัวอย่างเป็นคู่กราฟข้อมูล";
svgStr[95][14] = "ส่วนเหลือมาตรฐาน vs พล็อตการพยากรณ์";
svgStr[96][14] = "ส่วนเหลือมาตรฐาน vs พล็อตยกระดับ";
svgStr[97][14] = "ระยะทางของคุก";
svgStr[98][14] = "ระยะทางของคุก";
svgStr[99][14] = "ลำดับข้อมูล";
svgStr[100][14] = "หมายถึงความแตกต่าง";
svgStr[101][14] = "การทดสอบหมายถึง";
svgStr[102][14] = "การรักษา";
svgStr[103][14] = "อิทธิพลร่วม";
svgStr[104][14] = "ผลรวมแถว";
svgStr[105][14] = "ผลรวมคอลัมน์";
svgStr[106][14] = "สัมประสิทธิ์สหสัมพันธ์พหุคูณ";
svgStr[107][14] = "<h3>การวิเคราะห์สหสัมพันธ์</h3>";
svgStr[108][14] = "เมทริกซ์สหสัมพันธ์";
svgStr[109][14] = "ปัจจัย A - ปัจจัย B กราฟค่าเฉลี่ย";
svgStr[110][14] = "เลฟเวอเรจ";
svgStr[111][14] = "Geographic Information Graph";
svgStr[112][14] = "พิสัย";
svgStr[113][14] = "ค่าเฉลี่ย - ส่วนเบี่ยงเบนมาตรฐาน กราฟ";
svgStr[114][14] = "ความแปรปรวนของประชากร";
svgStr[115][14] = "สมมติฐาน";
svgStr[116][14] = "การทดสอบ";
svgStr[117][14] = "ความแปรปรวน";
svgStr[118][14] = "ค่าช่วงเวลา";
svgStr[119][14] = "ประเภท";
svgStr[120][14] = "โหมด";
svgStr[121][14] = "ความแปรปรวนร่วม";
svgStr[122][14] = "สามเหลี่ยมปาสกาล";
svgStr[123][14] = "ความน่าจะเป็นร่วม";
svgStr[124][14] = "เงื่อนไข";
svgStr[125][14] = "การกระจายแบบไม่ต่อเนื่อง";
svgStr[126][14] = "แถว %";
svgStr[127][14] = "คอลัมน์%";
svgStr[128][14] = "ทั้งหมด %";
svgStr[129][14] = "เมทริกซ์กราฟแท่ง";
svgStr[130][14] = "ปัญหาก่อนหน้า";
svgStr[131][14] = "ค่าลักษณะเฉพาะ";
svgStr[132][14] = "ไอเกนเวกเตอร์";
svgStr[133][14] = "ตารางความถี่หลายมิติ";
svgStr[134][14] = "กราฟคลัสเตอร์แบบลำดับชั้น";
svgStr[135][14] = "ระยะทาง";
svgStr[136][14] = "เดี่ยว";
svgStr[137][14] = "เสร็จสิ้น";
svgStr[138][14] = "เฉลี่ย";
svgStr[139][14] = "เซนทรอยด์";
svgStr[140][14] = "วอร์ด";
svgStr[141][14] = "การเชื่อมโยง";
svgStr[142][14] = "Number of Clusters <br>K";
svgStr[143][14] = "Bayes Information Criteria";
svgStr[144][14] = "Within Sum of Squares";
svgStr[145][14] = "Akaike Information Criteria";

svgStrU[1][14] = "การแจกแจงทวินาม";
svgStrU[2][14] = "การทำซ้ำ";
svgStrU[3][14] = "ค่าเฉลี่ย";
svgStrU[4][14] = "ส่วนเบี่ยงเบนมาตรฐาน";
svgStrU[5][14] = "Poisson การแจกแจง";
svgStrU[6][14] = "Geometric การแจกแจง";
svgStrU[7][14] = "HyperGeometric การแจกแจง";
svgStrU[8][14] = "ประชากร";
svgStrU[9][14] = "ตัวอย่าง การแจกแจง";
svgStrU[10][14] = "กฎจำนวนมาก";
svgStrU[11][14] = "หางเหรียญ";
svgStrU[12][14] = "หัวเหรียญ";
svgStrU[13][14] = "หัวเหรียญ";
svgStrU[14][14] = "จำนวนหัวเหรียญ";
svgStrU[15][14] = "จำนวนการทดลอง";
svgStrU[16][14] = "การแจกแจงค่าเฉลี่ยตัวอย่าง";
svgStrU[17][14] = "การทำซ้ำ";
svgStrU[18][14] = "ความคาดเคลื่อนมาตรฐาน";
svgStrU[19][14] = "ค่าเฉลี่ยประชากร";
svgStrU[20][14] = "ช่วงความเชื่อมั่น";
svgStrU[21][14] = "ความแม่นยำของการประมาณ";
svgStrU[22][14] = "ค่าเฉลี่ยตัวอย่าง";
svgStrU[23][14] = "[ค่าสถิติทดสอบ]";
svgStrU[24][14] = "การแจกแจง";
svgStrU[25][14] = "ปฏิเสธ H\u2080";
svgStrU[26][14] = "ยอมรับ H\u2080";
svgStrU[27][14] = "p-ค่า";
svgStrU[28][14] = "[การตัดสิน] ";
svgStrU[29][14] = "[ANOVA]";
svgStrU[30][14] = "ใส่ค่าสัมประสิทธิ์สหสัมพันธ์ และกดปุ่มคำนวณ";
svgStrU[31][14] = "การถดถอย";
svgStrU[32][14] = "ตัวแปรแถว";
svgStrU[33][14] = "ตัวแปรคอลัมน์";
svgStrU[34][14] = "ค่าเฉลี่ย"
svgStrU[35][14] = "ส่วนเบี่ยงเบนมาตรฐาน"
svgStrU[36][14] = "<h3> ฮิสโทแกรม<br>ตารางแจกแจงความถี่</h3>";
svgStrU[37][14] = "ชื่อกลุ่ม";
svgStrU[38][14] = "ช่วง";
svgStrU[39][14] = "ลำต้น";
svgStrU[40][14] = " ใบไม้";
svgStrU[41][14] = "กลุ่ม 1  ใบไม้";
svgStrU[42][14] = "กลุ่ม 2  ใบไม้"
svgStrU[43][14] = "<h3>สถิติพื้นฐาน</h3>";
svgStrU[44][14] = "ค่าสังเกต";
svgStrU[45][14] = "ค่าต่ำสุด";
svgStrU[46][14] = "มัธยฐาน";
svgStrU[47][14] = "ค่าสูงสุด";
svgStrU[48][14] = "รวม";
svgStrU[49][14] = "เลขชี้กำลัง";
svgStrU[50][14] = "เอกรูป";
svgStrU[51][14] = "ความแม่นยำของการประมาณ";
svgStrU[52][14] = "- สร้างจุดโดยการคลิก และ eStat จะหาเส้นการถดถอย";
svgStrU[53][14] = "- ขยับหรือลบจุด ดูการเปลี่ยนแปลงของเส้นการถดถอย";
svgStrU[54][14] = "[ค่าสถิติตัวอย่าง] ";
svgStrU[55][14] = "[ตัวอย่าง 1 สถิติ] ";
svgStrU[56][14] = "[ตัวอย่าง 2 สถิติ] ";
svgStrU[57][14] = "ช่วงความเชื่อมั่น";
svgStrU[58][14] = "ตัวแปรแถวและคอลัมน์อิสระต่อกัน";
svgStrU[60][14] = "การแจกแจงเชิงสังเกต";
svgStrU[61][14] = "การแจกแจงเชิงทฤษฎี";
svgStrU[62][14] = "การทดสอบภาวะสารูปดี";
svgStrU[63][14] = "การทดสอบผลบวกลำดับที่ของวิลค็อกซัน";
svgStrU[64][14] = "การทดสอบผลบวกลำดับที่ของวิลค็อกซันตาราง";
svgStrU[65][14] = "Kruskal-Wallis การทดสอบ";
svgStrU[66][14] = "Kruskal-Wallis H การแจกแจง";
svgStrU[67][14] = "Kruskal-Wallis H สถิติ";
svgStrU[68][14] = "การทดสอบลำดับที่โดยเครื่องหมายของวิลค็อกซัน";
svgStrU[69][14] = "การทดสอบด้วยเครื่องหมาย";
svgStrU[70][14] = "Friedman การทดสอบ";
svgStrU[71][14] = "Friedman S สถิติ";
svgStrU[72][14] = "Friedman S การแจกแจง";
svgStrU[73][14] = "t ค่า (หรือ Z)";
svgStrU[74][14] = "ChiSq ค่า";
svgStrU[75][14] = "ความแปรปรวนตัวอย่าง";
svgStrU[76][14] = "ความแตกต่างของตัวอย่างหมายถึง";
svgStrU[77][14] = "อัตราส่วนของผลต่างตัวอย่าง";
svgStrU[78][14] = "สมมติฐานของความแปรปรวน";
svgStrU[79][14] = "ข้อมูลสรุป";
svgStrU[80][14] = "การเลือกหลายรายการ";
svgStrU[81][14] = "เลือกได้สูงสุดสองกลุ่ม";
svgStrU[82][14] = "X ตัวแปร";
svgStrU[83][14] = "Y ตัวแปร";
svgStrU[84][14] = "โดย";
svgStrU[85][14] = "ไม่มีกลุ่มตัวแปร";
svgStrU[86][14] = "ข้อมูลที่เลือก: ";
svgStrU[87][14] = "ข้อมูลดิบ";
svgStrU[88][14] = "เลือกตัวแปรโดยคลิกชื่อตัวแปรe";
svgStrU[89][14] = "ไม่มีการสังเกต";
svgStrU[90][14] = "อันดับผลรวม";
svgStrU[91][14] = "Longitude";
svgStrU[92][14] = "Latitude";
svgStrU[93][14] = "สถานที่ตั้งอย่างน้อยหนึ่งคู่แตกต่างกัน";
svgStrU[94][14] = "การทดสอบลำดับที่โดยเครื่องหมายของวิลค็อกซัน การแจกแจง";
svgStrU[95][14] = "ตัวแปรที่จับคู่";
svgStrU[96][14] = "ข้อมูลที่จับคู่";
svgStrU[97][14] = "การทดสอบความเป็นอิสระ";
svgStrU[98][14] = "การจำลอง";
svgStrU[99][14] = "จำนวนสุ่ม";
svgStrU[100][14] = "การแจกแจงปรกติ";
svgStrU[101][14] = "t การแจกแจง";
svgStrU[102][14] = "&chi;&#178; การแจกแจง";
svgStrU[103][14] = "F การแจกแจง";
svgStrU[104][14] = "HSD ช่วงที่ได้รับการศึกษา การแจกแจง";
svgStrU[105][14] = "ควอไทล์ที่ 1";
svgStrU[106][14] = "ควอไทล์ที่สาม";
svgStrU[107][14] = "ช่วงควอไทล์";
svgStrU[108][14] = "สัมประสิทธิ์การแปรผัน";
svgStrU[109][14] = "ความถี่สัมพัทธ์สะสม (%)";
svgStrU[110][14] = "จำนวนสูงสุดของจำนวนเต็มของการกระจายชุด";
svgStrU[111][14] = "เลื่อนจุดด้วยเมาส์";
svgStrU[112][14] = "การสกัดการฟื้นฟู";
svgStrU[113][14] = "โดยไม่ต้องเปลี่ยน";
svgStrU[114][14] = "แผนภาพเส้น"; 
svgStrU[115][14] = "เปอร์เซ็นต์การเปลี่ยนแปลง";
svgStrU[116][14] = "ดัชนีอย่างง่าย";
svgStrU[117][14] = "เวลาหน่วง";
svgStrU[118][14] = "ความแตกต่าง";
svgStrU[119][14] = "ความสัมพันธ์อัตโนมัติ";
svgStrU[120][14] = "บันทึก";
svgStrU[121][14] = "รากที่สอง";
svgStrU[122][14] = "บ็อกซ์-ค็อกซ์";
svgStrU[123][14] = "เวลาพื้นฐาน";
svgStrU[124][14] = "เส้นค่าเฉลี่ยเคลื่อนที่กึ่งกลาง";
svgStrU[125][14] = "การปรับให้เรียบแบบเอ็กซ์โพเนนเชียล";
svgStrU[126][14] = "ค่ามัธยฐานการเคลื่อนที่ที่กึ่งกลาง";
svgStrU[127][14] = "รุ่น";
svgStrU[128][14] = "เส้นค่าเฉลี่ยเคลื่อนที่";
svgStrU[129][14] = "เส้นค่าเฉลี่ยเคลื่อนที่สองเท่า";
svgStrU[130][14] = "โฮลทดับเบิลเอ็กซ์โพเนนเชียล Smoothing";
svgStrU[131][14] = "ดัชนีตามฤดูกาล";
svgStrU[132][14] = "รูปแบบการคูณตามฤดูกาลของ Holt-Winters";
svgStrU[133][14] = "ซีรีส์ที่ไม่เป็นไปตามฤดูกาล";
svgStrU[134][14] = "กลุ่ม";
svgStrU[135][14] = "การวิเคราะห์คลัสเตอร์";
svgStrU[136][14] = "คลัสเตอร์";
svgStrU[137][14] = "แผนผังการตัดสินใจ";
svgStrU[138][14] = "เงื่อนไขกฎการตัดสินใจ";
svgStrU[139][14] = "การตัดสินใจ";
svgStrU[140][14] = "วนซ้ำ";
svgStrU[141][14] = "กราฟขนาน";
svgStrU[142][14] = "การจำแนกประเภท";
svgStrU[143][14] = "ฟังก์ชันการจำแนกประเภท";
svgStrU[144][14] = "ผลการจำแนกประเภท";
svgStrU[145][14] = "การตัดสินใจ";
svgStrU[146][14] = "อัตราการจำแนกประเภทผิด";
svgStrU[147][14] = "เซลล์";
svgStrU[148][14] = "ข้อมูลการฝึก";
svgStrU[149][14] = "กำลังทดสอบข้อมูล";


// Polish
$message.pl = {
    "eStat : Stat Education SW": "eStat : Stat Edukacja SW",
    "Home": "Strona główna",
    "Filename": "Nazwa pliku",
    "Selected Variables": "Wybrane zmienne",
    "Cancel": "Anuluj",
    "Edit Variables": "Edytuj zmienne",
    "Level": "Poziom",
    "ElementaryLevel": "podstawowy",
    "MiddleLevel": "średni",
    "HighLevel": "wyższy",
    "UniversityLevel": "uniwersytecki",
    "Example": "Przykład",
    "New Sheets": "Nowy Arkusz",
    "csv Open": " Otwórz csv",
    "www Open": "Otwórz www ",
    "json Open": " Otwórz json",
    "csv Save": "Zapisz csv",
    "json Save": " Zapisz json",
    "Print Sheet": "Drukuj arkusz",
    "Bar Graph": "Wykres słupkowy",
    "Pie Chart": "Wykres kołowy",
    "Rainbow Chart": "Wykres tęczowy ",
    "Band Graph": "Wykres pasmowy",
    "Line": "liniowy",
    "Line Graph": "Wykres liniowy",
    "Dot Graph": "Wykres punktowy",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Wykres łodyga i liście",
    "maxStem": "** maksymalna liczba łodyg <= 30 **",
    "Box-Whisker Plot": "Wykres pudełkowy",
    "Scatterplot": "Wykres rozrzutu",
    "ScatterplotMatrix": "Macierz wykresów rozrzutu",
    "Frequency Table": "Tabela częstości",
    "Basic Statistics": "Statystyki opisowe",
    "Testing Hypothesis &mu;": "Hipoteza testowa &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Hipoteza testowa &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Hipoteza testowa  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Hipoteza testowa &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Analiza wariancji",
    "MiddleSchool": "Gimnazjum",
    "HighSchool":   "Liceum",
    "University":   "Uniwersytet",
    "eStatHeading": "eStat to darmowe oprogramowanie internetowe umożliwiające lepszą edukację statystyczną, wykorzystujące dynamiczną wizualizację danych i graficzną analizę statystyczną.",
    "Support":      "Wsparcie",
    "Donation":     "Darowizna",
    "Middle School Stat Education": "Edukacja Statystyczna Liceum",
    "High School Stat Education": "Statystyka - wykształcenie w szkole wyższej",
    "University Stat Education": "Statystyka - edukacja poziom uniwersytecki",
    "Elem Stat Graph Example": "Przykłady elementarnych wykresów statystycznych",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Pionowy",
    "Horizontal": "Poziomy",
    "Vertical Separated Bar": "Wykres kolumnowy dla grup pionowy ",
    "Vertical Stacked Bar": "Wykres kolumnowy skumulowany pionowy ",
    "Vertical Ratio Bar": "Wykres kolumnowy 100% skumulowany pionowy ",
    "Vertical Side by Side Bar": "Wykres kolumnowy grupowany pionowy",
    "Vertical Two Sided Bar": "Wykres kolumnowy dwukierunkowy pionowy",
    "Horizontal Separated Bar": "Wykres kolumnowy dla grup poziomy ",
    "Horizontal Stacked Bar": "Wykres kolumnowy skumulowany poziomy",
    "Horizontal Ratio Bar": "Wykres kolumnowy 100% skumulowany poziomy",
    "Horizontal Side by Side Bar": "Wykres kolumnowy grupowany poziomy",
    "Horizontal Two Sided Bar": "Wykres kolumnowy dwukierunkowy poziomy",
    "Doughnut Graph": "Wykres pierścieniowy",
    "Two Sided Stem & Leaf Plot": "Dwustronny wykres łodyga i liscie",
    "Graph Save": "Zapisz wykres",
    "Graph Print": "Drukuj wykresu",
    "Move to Table": "Przejdź do tabeli",
    "Edit Title": "Edytuj tytuł",
    "Table Save": "Zapisz tabelę",
    "Table Print": "Drukuj tabelę",
    "Frequency": "Częstość",
    "Sorting": "Sortowanie",
    "SortData": "Posortowane dane",
    "Raw Data": "Surowe dane",
    "Descending": "Malejąco",
    "Ascending": "Rosnąco",
    "Mean": "Średnia",
    "Std Deviation": "Odchylenie standardowe",
    "MeanStd": "Średnia/Odchylenie standardowe",
    "DotMeanStd": "Wykres punktowy - Średnia/Odchylenie standardowe",
    "95CI": "95% Przedział ufności",
    "CorrelationAnalysis": "Analiza korelacji",
    "RegressionAnalysis": "Analiza regresji",
    "RegressionAnalysis1": "Liniowa analiza regresji",
    "RegressionAnalysis2": "Wielowymiarowa liniowa analiza regresji",
    "ANOVA2": "Dwuczynnikowa analiza wariancji ",
    "Regression": "Regresja",
    "RegressionLine": "Linia regresji",
    "RegressionBand": "Przedział ufności w analizie regresji",
    "RegressionTable": "Analiza regresji",
    "Frequency Polygon": "Wielobok liczebnosci",
    "Execute New Interval": "Oblicz nowy przedział",
    "Interval Start": "Początek przedziału",
    "Interval Width": "Szerokość przedziału",
    "t-test": "test t",
    "Z-test": "test Z",
    "(if Z-test, enter &sigma;)": "(w przypadku testu Z, wprowadź &sigma;)",
    "Significance Level": "Poziom istotności",
    "Execute": "Wykonaj",
    "(Confidence Interval)": "(Przedział ufności)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Jeśli test Z, Z<sub>&alpha;/2</sub>is used)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Założenie o wariancji",
    "Variance": "wariancji",
    "F test": "test F",
    "At least one pair of means is different": "Co najmniej jedna para średnich jest inna",
    "Main Title": "Główny tytuł",
    "y title": "y tytuł",
    "x title": "x tytuł",
    "yAxis": "Oś Y",
    "Modify": "Modyfikuj",
    "Confirm": "Potwierdź",
    "Variable Name": "Nazwa zmiennej",
    "Variable Value": "Wartość zmiennej",
    "Value Label": "Etykieta wartości",
    "* Less than nine value labels allowed.": "* Dozwolone jest mniej niż dziewięć etykiet wartości.",
    "Save": "Zapisz",
    "Exit": "Wyjście",
    "eStatU UnivStatEdu": "eStatU - Statystyka - edukacja poziom uniwersytecki SW",
    "eStatH HighStatEdu": "eStatH - Statystyka - edukacja w szkole wyższej",
    "eStatM MiddleStatEdu": "eStatM -  Statystyka - edukacja w liceum",
    "MiddleStat": "Statystyka podstawy",
    "HighStat":   "Statystyka szkół wyższych",
    "UnivStat":   "Statystyka i nauka o danych",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menu",
    "Binomial Experiment": "Eksperyment dla rozkładu dwumianowego",
    "Binomial Distribution": "Rozkład dwumianowy",
    "Binomial Prob Table": "Tabela prawdopodobieństwa dwumianowego",
    "Poisson Distribution": "Rozkład Poissona",
    "Poisson Prob Table": "Tabela prawdopodobieństwa Poissona",
    "Geometric Distribution": "Rozkład Geometryczny",
    "Geometric Prob Table": "Tabela prawdopodobieństwa geometrycznego",
    "HyperGeometric Distribution": "Rozkład Hypergeometryczny",
    "HyperGeometric Prob Table": "Tabela prawdopodobieństwa hypergeometrycznego",
    "Exponential Distribution": "Rozkład wykładniczy",
    "Normal Experiment": "Eksperyment dla rozkładu normalnego",
    "Normal Distribution": "Rozkład normalny",
    "Normal Approx": "Aproksymacja rozkładu normalnego",
    "t Distribution": "Rozkład t",
    "ChiSquare Distribution": "&chi;&#178; Rozkład",
    "F Distribution": "Rozkład F",
    "Sampling": "Próbkowanie",
    "Population vs Sample": "Populacja vs próbka",
    "Population": "Populacja",
    "Sample": "Próba",
    "Exponential": "Wykładniczy(0.3)",
    "Uniform": "Jednostajny(0,1)",
    "UniformDist": "Jednostajny",
    "Sample05": "Próbkowanie 5%",
    "Sample10": "Próbkowanie 10%",
    "Sample20": "Próbkowanie 20%",
    "Statistics/BoxPlot": "Statystyka/wykres pudełkowy",
    "StatisticalProb":     "Prawdopodobieństwo statystyczne",
    "Law of Large Number": "Prawo wielkich liczb",
    "Dist of Sample Means": "Rozkład średniej z próby",
    "Sampling Distribution": "Rozkład w próbie",
    "Sample Size": "Wielkość próby",
    "Confidence Interval": "Przedział ufności",
    "Confidence Interval Simulation": "Przedział ufności - symulacja",
    "Simulation": "Symulacja",
    "Confidence Interval Mu": "Oszacowanie : &mu;",
    "Mu Confidence Interval": "Oszacowanie : &mu;",
    "Confidence Interval Sigma": "Oszacowanie : &sigma;&#178; ",
    "Confidence Interval P": "Oszacowanie : p",
    "Estimation Accuracy": "Dokładność szacowania",
    "Repetition": "Powtórzenie",
    "Confidence Level": "Poziom ufności",
    "Testing Hypothesis mu_titleAB": "Testowanie hipotezy dla średniej",
    "Testing Hypothesis mu_title": "Test dla średniej",
    "Testing Hypothesis sigma_title": "Test dla wariancji",
    "Testing Hypothesis P_title": "Test dla wskaźnika struktury",
    "Testing Hypothesis mu12_title": "Test dla dwóch średnich",
    "Testing Hypothesis sigma12_title": "Test dla dwóch wariancji",
    "Testing Hypothesis P12_title": "Test dla dwóch wskaźników struktury",
    "Testing Hypothesis muA":  "Hipoteza testowa &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Hipoteza testowa &mu; - C, n",
    "Testing Hypothesis mu": "Hipoteza testowa &mu;",
    "Testing Hypothesis sigma": "Hipoteza testowa &sigma;&#178;",
    "Testing Hypothesis P": "Hipoteza testowa p",
    "Testing Hypothesis mu12": "Hipoteza testowa &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Hipoteza testowa &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Hipoteza testowa p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Czynnik ANOVA",
    "Testing Hypothesis ANOVA2": "2 Czynnik ANOVA",
    "SameSampleSize": "Rozmiar próbki każdej komórki powinien być taki sam.",
    "Testing Independence": "Test niezależności",
    "CategoryD": "Kategoria/grupa",
    "Category": "Kategoria/grupa",
    "Correlation Coefficient": "Współczynnik korelacji",
    "Regression Experiment": "Eksperyment regresyjny",
    "Hypothesis": "Hipotezy",
    "Test Type": "Rodzaj testu",
    "Z-test": "test Z",
    "t-test": "test t",
    "Chi-test": "&chi;&#178; test",
    "F-test": "test F",
    "Sampling Type": "Rodzaj próbkowania",
    "Independent Sample": "niezależna próbka",
    "Paired Sample": "sparowana próbka",
    "Sample Data": "Dane próbkowe",
    "input either sample data": "Wprowadź dane z próby lub statystyki z próby w kolejnych polach za pomocą BSV lub wprowadź statystyki z próby ",
    "input data": "Wprowadzanie danych",
    "Sample Statistics": "Statystyki z próby",
    "Sample Mean": "Średnia z próby",
    "Sample Variance": "Wariancja z próby",
    "Sample Proportion": "Wskaźnik struktury w próbie ",
    "sample range": "Zakres w próbie",
    "control chart": "Wykres kontrolny",
    "if Z-test-1": "(w przypadku testu Z wprowadź wariancję populacji &sigma;&#178;)",
    "if Z-test-2": "(w przypadku testu Z, z<sub>&alpha;/2 </sub> używany.)",
    "At least one pair": "Co najmniej jedna para średnich jest inna",
    "Row-Col-0": "Zmienne w wierszach i kolumnach są niezależne",
    "Row-Col-1": "Zmienne w wierszach i kolumnach nie są niezależne",
    "Enter any number of row": "(Wprowadź obserwację z lewej górnej komórki)",
    "Row": "Wiersz",
    "Column": "Kolumna",
    "Probability": "Prawdopodobieństwo",
    "Show Probability": "Pokaż prawdopodobieństwo",
    "Regression Line": "Linia regresji",
    "Erase All": "Wymaż wszystko",
    "Add Point": "Dodaj punkt",
    "Erase Point": "Wymaż punkt",
    "Reference Site": "grupa kontrolna",
    "Lot Size": "Wielkość partii",
    "Defect Size": "Rozmiar defektu/wada/brak",
    "Defect Rate": "Wadliwa ocena",
    "If typed": "Po wpisaniu numeru kliknij [Wykonaj] lub [Enter]",
    "Stat/BoxPlot": "Statystyka/wykres pudełkowy",
    "Mean": "Średnia",
    "Std Dev": "Odchylenie standardowe",
    "SimulationWarning": "(Bieżąca symulacja powinna zostać zakończona przed rozpoczęciem następnej symulacji)",
    "OneGroup": "(jedna grupa)",
    "AnalysisVar": "Analizowana zmienna",
    "AnalysisVar2": "Zmienna Y",
    "GroupVar": "Grupa",
    "GroupVar2": "Zmienna X",
    "GroupVar3": "Czynnik1",
    "GroupVar4": "Czynnik2",
    "AnalysisVarMu12": "Zmienna analizy (or X1)",
    "GroupVarMu12": "Zmienna Grupa (or X2)",
    "PairedMu12": " X1, X2 : Sparowane zmienne",
    "SizeVar": "Wielkość zmiennej",
    "RegressionBand": "przedział ufności",
    "RegressionTable": "Analiza regresji",
    "RegressionResidual": "Wykres reszt",
    "RegressionResidualLeverage": "Reszta vs Siła wpływu",
    "RegressionCook": "Wykres odległości Cooka",
    "RegressionQQ": "Wykres Q-Q reszt ",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Normalny Test",
    "HistogramNormalQQ": "Normalny Wykres Q-Q",
    "PopulationStd": "Odchylenie standardowe populacji",
    "Type1Error": "Błąd I rodzaju",
    "Type2Error": "Błąd II rodzaju",
    "AnovaTable": "Tabela ANOVA ",
    "AnovaMeanGraph": "Średnia przedział ufności",
    "MultipleComparison": "Wielokrotne porównania",
    "ComparisonGraph": "Wykres porównawczy",
    "AnovaResidual": " Wykres reszt",
    "AnovaQQ": "Wykres Q-Q reszt",
    "TestingFit": "Test zgodności ",
    "FitTest0": "Rozkłady obserwowany i teoretyczny są takie same",
    "FitTest1": "Rozkłady obserwowany i teoretyczny są różne",
    "ObservedFreq": "Obserwowane częstości O",
    "ExpectedProb": "Oczekiwane prwdopodobieństwa p",
    "ExpectedFreq": "Oczekiwana częstość E(>5)",
    "InputFitData": "Wprowadź obserwację z lewej górnej komórki",
    "ExecuteTable": "Statystyka",
    "MeanDotGraph": "Przedział ufności wykres",
    "ScatterRegression": "Wykres rozrzutu",
    "Factor": "Czynnik",
    "Interaction": "Interakcja",
    "NoInteraction": "Brak interakcji",
    "ExistInteraction": "Występuje interakcja",
    "eStatLecture": "eStat Wykład wprowadzający",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Test sumy rang Wilcoxona", 
    "NonParametricMu12": "Test sumy rang Wilcoxona : Location Parameter M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Test sumy rang ",
    "Sample Range": "Suma rang",
    "DistributionTable": "Tabela rozkład ",
    "SignedRankTestDist": "Rozkład Wilcoxona znaków sumy rang rozkład",
    "WilcoxonTestDist": "Rozkład Wilcoxona sumy rang ",
    "KruskalTestDist": "Rozkład H Kruskala-Wallisa",
    "FriedmanTestDist": "Rozkład S Friedmana",
    "SignedRankTest": "Test znaków sumy rang Wilcoxona",
    "SignTest": "Test znaków",
    "SignCount": "Liczba znaków",
    "KruskalTest": "Test Kruskala-Wallisa",
    "KruskalTestANOVA": "Test Kruskala-Wallisa",
    "Total": "Całkowity",
    "FriedmanTest": "Test Friedmana",
    "FriedmanTestANOVA": "Test Friedmana",
    "Block": "Blok",
    "Treatment": "Interwencja",
    "At least one locations is different": "Co najmniej jedna para lokalizacji jest inna",
    "SignCondition": "Jeśli n ≤ 100 Test dwumianowy,  n > 100 Aproksymacja test rozkładu normalnego",
    "WilcoxonSignCondition": "Jeśli n ≤ 20 Test sumy rang Wilcoxona,  n > 20 Test rozkładu normalnego",
    "WilcoxonRankCondition": "Jeśli n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Test sumy rang Wilcoxona,  n>25 Aproksymacja test rozkładu normalnego",
    "KruskalCondition": "Jeśli n ≤ 10 Test rozkład H,  else &chi;&#178; test",
    "VariableSelect":  "* Analiza Danych : Załaduj plik >> wybierz zmienne >>  Kliknij ikonę",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Zmiennej wybór",
    "VariableSelect4": "Można wybrać większą liczbę Analiz.",
    "VariableSelect5": "Można wybrać większą liczę zmiennych X.",
    "SummaryData": "Dane podsumowujące ",
    "RawData": "Surowe dane",
    "MultiSelect": "",
    "DataType": "(Wybierz zmienne, klikając nazwę zmiennej)",
    "by": "przez",
    "NameVar": "Nazwa zmiennej",
    "n_variance": "n-1 formuła",
    "RandomNumber": "Generator liczb losowych",
    "RealNumber":     "Liczba rzeczywista",
    "IntegerNumber":  "Liczba całkowita",
    "NumberData":     "Liczba danych",
    "NumberDigit":    "Cyfra dziesiętna",
    "NormalTable":    "Tabela Rozkład normalny",
    "Percentile":     "Tabela percentylowa",
    "PercentileValue": "Percentyl",
    "StudentRangeDist": " Rozkład  HSD",
    "copy link": "Skopiuj link",
    "WithoutReplacement": "z wymianą",
    "WithReplacement":    "bez zminany",
    "Replacement":     "zamiana",
    "NonReplacement":  "bez zamiany",
    "WordCloud":       "Word Cloud (angielski)",
    "oneColor":        "kolor",
    "defaultColor":    "domyślny kolor",
    "RelativeFreq":    "Procent",
    "Density":         "Gęstość",
    "MarginOfError":   "Margines błędu",
    "Permutation":     "Permutacja",
    "PermutationSame": "Permutacja z powtórzeniami",
    "Combination":     "Kombinacja",
    "NumberOfCase":    "Liczba przypadków",
    "BinomialTheorem": "Dwumian Newtona",
    "PascalTriangle":  "Trójkąt Pascala",
    "Character":       "Emoji",
    "AdditionRule":      "Zasada dodawania prawdopodobieństwa",
    "MultiplicationRule":"Zasada mnożenia prawdopodobieństwa",
    "ConditionalProb":   "Warunkowe prawdopodobieństwo",
    "JointProb":         "Wspólne prawdopodobieństwo",
    "DiscreteDist":      "Rozkład dyskretny",
    "Categorize":        "Kategoryzować",
    "Recode":            "Przekoduj",
    "Compute":           "Oblicz",
    "SelectIf":          "Wybierz Jeśli",
    "InfoValueLabel":    "*** Wybierz zmienną, wprowadź nazwę zmiennej i/lub etykietę wartości.",
    "InfoSorting":       "*** Wybierz zmienną sortującą, wprowadź metodę sortowania do 3 zmiennych.",
    "InfoCategorize":    "*** Wybierz zmienną dla kategorii, wprowadź początek interwału i szerokość interwału.",
    "InfoRecode":        "*** Wybierz zmienną do zapisu, wprowadź nową wartość.",
    "InfoRecode2":       "* Zezwól na zapis do 9 wartości",
    "InfoCompute":       "*** Utwórz formułę obliczeniową za pomocą przycisków poniżej.",
    "InfoSelectIf":      "*** Wybierz maksymalnie 3 zmienne, wprowadź ich warunki.",
    "SortingVariable":   "Sortowanie Zmiennych",
    "SortingMethod":     "Metoda sortowania",
    "NewVariable":       "Nowa Zmienna",
    "CategoryVariable":  "Kategoryzuj Zmienną",
    "CategoryListCheck": "Sprawdzenie Listy Kategorii",
    "CategoryInterval":  "Przedział kategorii",
    "CategoryLabel":     "Etykieta Kategorii",
    "RecodeVariable":    "Przekoduj Zmienną",
    "CurrentValue":      "Aktualna wartość",
    "NewValue":          "Nowa wartość",
    "ComputeFormula":    "Formuła",
    "SelectVariable":    "Zmienna<br>do wyboru",
    "RelationOperator":  "Relacja<br>Operator",
    "SelectValue":       "Wartość",
    "MissingValue":      "brakująca wartość",
    "option":            "opcja",                                 
    "TimeSeries":        "Szereg czasowy",
    "Smoothing":         "Wygładzanie",
    "Filtering":         "Filtracja",
    "Transformation":    "Transformacja",
    "Weight":            "Waga",
    "PercentChange":     "Zmień procent",
    "WeightedIndex":     "Prosty indeks",
    "BaseTime":          "Czas bazowy",
    "LagTime":           "Czas opóźnienia",
    "Lag":               "Opóźnienie czasowe",
    "Forecasting":       "Prognozowanie",
    "SeasonalModel":     "Model sezonowy",
    "HoltWinter":        "Model sezonowy Holta-Wintersa",
    "Trend":             "Trend",
    "Seasonal":          "Sezonowy",
    "Deseasonal":        "Szereg  bez sezonowości",
    "Nseason":           "Liczba podokresów",
    "Irregular":         "Nieregularny",
    "TrendModel":        "Model trendu z sezonowością",
    "RegressionModel":   "Model regresji",
    "ForecastingPeriod": "Okres Prognozowany",
    "CreateTable":       "Tabela danych",
    "SaveTable":         "Zapisz tabelę",
    "MA":                "Średnia Ruchoma",
    "EWMA":              "Model EWMA",
    "CenterMA":          "Wyśrodkowana Średnia Ruchoma",
    "MovingMedian":      "Centralna Ruchoma Mediana",
    "ES":                "Wygładzanie wykładnicze",
    "Default":           "Domyślna",
    "Linear":            "Liniowy",
    "Quadratic":         "Kwadratowy",
    "Cubic":             "Sześcienny",
    "SquareRoot":        "Pierwiastek kwadratowy",
    "Log":               "logarytmiczna",
    "Exponent":          "Wykładniczy",
    "Power":             "Moc",
    "BoxCox":            "Box-Cox",
    "SingleMA":          "Pojedyncza średnia krocząca",
    "SingleES":          "Pojedyncze wygładzanie wykładnicze",
    "DoubleMA":          "Podwójna średnia krocząca",
    "DoubleES":          "Podwójne wygładzanie wykładnicze",
    "HoltLinear":        "Wygładzanie wykładnicze Holta",
    "DeseasonIntercept": "przesunięcie bez sezonowości",
    "DeseasonSlope":     "nachylenie bez sezonowości",
    "SeasonalIndex":     "Indeks sezonowy",
    "Diff":              "Różnica",
    "DiffTime":          "Różnica Czasu",
    "AR":                "Model autoregresyjny",
    "ResultTable":       "Wynik regresji",
    "ForecastTable":     "Tabela Prognoz",
    "HoltLevel":         "Poziom",
    "HoltTrend":         "Tendencja",
    "AutoCorrTable":     "Tabela Autokorelacji",
    "DiffSeries":        "Seria Różnic",
    "RawSeries":         "Oryginalna seria czasowa",
    "RBD":               "Losowy eksperyment blokowy",
    "Latin":             "Eksperyment Kwadraty Łacińskie ",
    "Chapter01":         "Chapter 1&nbsp; Statystyka i nauka o danych",
    "Chapter02":         "Chapter 2&nbsp; Wizualizacja danych jakościowych",
    "Chapter03":         "Chapter 3&nbsp; Wizualizacja danych ilościowych",
    "Chapter04":         "Chapter 4&nbsp; Podsumowanie danych z tabelami i miarą",
    "Chapter05":         "Chapter 5&nbsp; Rozkład prawdopodobieństwa",
    "Chapter06":         "Chapter 6&nbsp; Rozkłady próbkowania i estymacja",
    "Chapter07":         "Chapter 7&nbsp; Testowanie hipotezy dla parametrów pojedynczej populacji",
    "Chapter08":         "Chapter 8&nbsp; Testowanie hipotezy dla dwóch parametrów populacji",
    "Chapter09":         "Chapter 9&nbsp; Testowanie hipotezy dla kilku średnich populacji",
    "Chapter10":         "Chapter 10      Hipoteza testowania nieparametrycznego",
    "Chapter11":         "Chapter 11      Testowanie hipotezy dla danych kategorycznych",
    "Chapter12":         "Chapter 12      Analiza korelacji i regresji",
    "Chapter13":         "Chapter 13      Analiza szeregów czasowych", 
    "Distribution":      "Rozkład",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};

// Polish
appStr[0][15] = "/estat/eStat/index.html";
appStr[1][15] = "/estat/eStatH/index.html";
appStr[2][15] = "/estat/eStatU/index.html";
appStr[3][15] = "/estat/eStatE/index_en.html";
appStr[4][15] = "/estat/eHelp/index_en.html";
appStr[5][15] = "index.html";
appStr[6][15] = "../eLearning/en/index.html";
appStr[7][15] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][15] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][15] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][15] = "";
appStr[11][15] = "Large Population Country";
appStr[12][15] = "Life Expectancy (OECD)";
appStr[13][15] = "Population Pyramid (Korea)";
appStr[14][15] = "GNP per Capita (OECD)";
appStr[15][15] = "Top World Export Country";
appStr[16][15] = "Obesity % of Population";
appStr[17][15] = "Temperature of Major City";
appStr[18][15] = "Top CO2 Emission Country";
appStr[19][15] = "Alcohol Consume (OECD)";
appStr[20][15] = "Continuous Data Graph";
appStr[21][15] = "Length of Otter";
appStr[22][15] = "Age of Teacher";
appStr[23][15] = "Age of Teacher by Sex";
appStr[24][15] = "Cleanliness of Tooth";
appStr[25][15] = "Math Exam Scores";
appStr[26][15] = "Calorie of Hamberger";
appStr[27][15] = "Height vs Weight by Sex";
appStr[28][15] = "Discrete Data Graphs";
appStr[29][15] = "";
appStr[30][15] = "";
appStr[31][15] = "unit";
appStr[32][15] = "Country";
appStr[33][15] = "Male";
appStr[34][15] = "Female";
appStr[35][15] = "Age";
appStr[36][15] = "Person";
appStr[37][15] = "billion $";
appStr[38][15] = "Export";
appStr[39][15] = "Obesity %";
appStr[40][15] = "Celsius";
appStr[41][15] = "City";
appStr[42][15] = "Jan High";
appStr[43][15] = "Jul High";
appStr[44][15] = "million ton";
appStr[45][15] = "liter/year";
appStr[46][15] = "Alcohol";
alertMsg[1][15] = "Jedna z wybranych zmiennych nie zawiera danych.";
alertMsg[2][15] = "Wybierz zmienne do analizy (klikając nazwy kolumn) jedną po drugiej. Jeśli dwie zmienne to pierwsza zmienna jest grupująca.";
alertMsg[3][15] = "Brak danych dla wybranej zmiennej.";
alertMsg[4][15] = "Jeżeli liczba obserwacji w każdej kolumnie jest inna, analiza jest niedozwolona.";
alertMsg[5][15] = "Za dużo grup! Wykresy mogą się nakładać ze względu na rozmiar ekranu.";
alertMsg[6][15] = "Jeśli zmienna analityczna w danych podsumowujących zawiera znak, analiza statystyczna lub tworzenie tabeli jest niedozwolone.";
alertMsg[7][15] = "Jeśli dla surowych danych wybrano więcej niż trzy zmienne, analiza lub tworzenie tabeli nie jest możliwa.";
alertMsg[8][15] = "Wykres punktowy jest dozwolony, jeśli liczba obserwacji jest mniejsza niż 200.";
alertMsg[9][15] = "Wykres łodyga i liście jest dozwolony, jeśli liczba obserwacji jest mniejsza niż 100.";
alertMsg[10][15] = "Zmienna do analizy nie została zaznaczona.";
alertMsg[11][15] = "Zmienne/grupy do analizy nie są wybrane";
alertMsg[12][15] = "Jeśli zmienna analizy zawiera znak, analiza lub tworzenie tabeli jest niedozwolone.";
alertMsg[13][15] = "";
alertMsg[14][15] = "Dane podsumowujące nie są dozwolone dla ciągłych wykresów i testowania hipotez.";
alertMsg[16][15] = "Dla tej hipotezy dozwolone są tylko dwie grupy.";
alertMsg[17][15] = "Wykres rozrzutu wymaga co najmniej zmiennej x i zmiennej y.";
alertMsg[18][15] = "Więcej niż trzy zmienne nie są dozwolone dla wykresu rozrzutu.";
alertMsg[19][15] = "Jeśli na zmiennej jest znak, nie można narysować wykresu rozrzutu.";
alertMsg[20][15] = "Jeśli w danych znajduje się znak, nie można wykonać analizy";
alertMsg[21][15] = "Jeśli brakuje danych, zapisywanie jest niedozwolone.";
alertMsg[22][15] = "Jeśli jest liczba ujemna, nie można narysować wykresu słupkowego.";
alertMsg[25][15] = "Jeśli istnieje tylko jedna grupa, skumulowany wykres słupkowy jest niedozwolony.";
alertMsg[27][15] = "Jeśli istnieje tylko jedna grupa, 100% skumulowany wykres słupkowy jest niedozwolony.";
alertMsg[29][15] = "Jeśli istnieje tylko jedna grupa, grupowy wykres słupkowy jest niedozwolony.";
alertMsg[31][15] = "If there is only one group, both-side bar graph is not allowed.";
alertMsg[32][15] = "Jeśli jest liczba ujemna, nie można narysować wykresu kołowego.";
alertMsg[33][15] = "Jeśli jest liczba ujemna, nie można narysować wykresu pierścieniowego.";
alertMsg[34][15] = "Jeśli jest liczba ujemna, nie można narysować wykresu pasmowego.";
alertMsg[35][15] = "Jeśli jest liczba ujemna, nie można narysować tabeli częstotliwości.";
alertMsg[36][15] = "Ten wykres słupkowy jest dozwolony tylko dla dwóch grup.";
alertMsg[37][15] = "Ta hipoteza testowania jest dozwolona tylko dla jednej zmiennej.";
alertMsg[38][15] = "mu jest NaN. Wprowadź wartość, a następnie spróbuj ponownie!";
alertMsg[39][15] = "Odchylenie standardowe wynosi zero lub NaN. Spróbowuj ponownie!";
alertMsg[40][15] = "Wariancja wejściowa to NaN. Wprowadź wartość , a następnie spróbuj ponownie!";
alertMsg[41][15] = "Ta hipoteza testowania jest dozwolona tylko dla dwóch zmiennych. Zmienna grupowa powinna mieć tylko dwie grupy";
alertMsg[42][15] = "Edycja tytułu hipotezy testowania jest niedozwolona!";
alertMsg[43][15] = "Prosta regresja liniowa dotyczy tylko jednej grupy";
alertMsg[44][15] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][15] = "Nie można narysować wykresu dla więcej niż 5 zmiennych.";
alertMsg[46][15] = "Wybrano ten sam numer zmiennej.";
alertMsg[47][15] = "Dane znaków w częstotliwości są niedozwolone !! Spróbuj ponownie.";
alertMsg[48][15] = "Dane znakowe są niedozwolone !! Spróbuj ponownie.";
alertMsg[49][15] = "Liczba obserwacji powinna być mniejsza niż 100 !! Spróbuj ponownie.";
alertMsg[50][15] = "Wprowadź liczby na początku przedziału lub kroku.";
alertMsg[51][15] = "Wprowadź liczby / Liczba wierszy powinna być taka sama!! Spróbuj ponownie.";
alertMsg[52][15] = "Wprowadź liczby w kategorii i częstotliwości.";
alertMsg[53][15] = "Rozmiar interwału nie jest taki sam !! Spróbuj ponownie.";
alertMsg[54][15] = "Obserwacja X nie jest równa obserwacji Y !! Spróbuj ponownie.";
alertMsg[55][15] = "!!! Brak danych na arkuszu.";
alertMsg[56][15] = "!!! Nie wybrano zmiennej";
alertMsg[57][15] = "!!! Podaj początek interwału i szerokość interwału";
alertMsg[58][15] = "!!! Wprowadź numeryczny początek interwału i szerokość interwału";
alertMsg[59][15] = "!!! Więcej niż 9 interwałów - zmień szerokość interwału";
alertMsg[60][15] = "!!! Ta zmienna ma więcej niż 9 wartości";
alertMsg[61][15] = "!!! Nie wprowadzono wartości";
alertMsg[62][15] = "!!! Wprowadź formułę";
alertMsg[63][15] = "!!! Brak danych spełniających warunki.";
alertMsg[64][15] = "";
alertMsg[65][15] = ""; 
alertMsg[66][15] = "";
alertMsg[67][15] = "";
alertMsg[68][15] = "";
alertMsg[69][15] = "";

svgStr[1][15] = " Wykres słupkowy";
svgStr[2][15] = " Wykres kołowy";
svgStr[3][15] = " Wykres pierścieniowy";
svgStr[4][15] = " Wykres pasmowy";
svgStr[5][15] = " Wykres liniowy";
svgStr[6][15] = " Wykres punktowy";
svgStr[7][15] = " wykres pudełkowy";
svgStr[8][15] = " Wykres łodyga i liście";
svgStr[9][15] = " Histogram";
svgStr[10][15] = " Wykres rozrzutu";
svgStr[11][15] = " Hipoteza testowa: Średnia populacji";
svgStr[12][15] = " Hipoteza testowa: Wariancja populacji";
svgStr[13][15] = " Hipoteza testowa: Średnie dwóch populacji ";
svgStr[14][15] = " Hipoteza testowa: Wariancje dwóch populacji";
svgStr[15][15] = " Analiza wariancji";
svgStr[16][15] = "Częstotliwość";
svgStr[17][15] = "Iloraz";
svgStr[18][15] = "Grupa ";
svgStr[19][15] = " ";
svgStr[20][15] = "<h3>Dane podsumowujące <br> Tabela częstości</h3>";
svgStr[21][15] = "Grupa Zmiennej";
svgStr[22][15] = "Zmienna wiersza";
svgStr[23][15] = "Całkowity";
svgStr[24][15] = "Rozmiar okręgu";
svgStr[25][15] = "<h3>Tabela częstości</h3>";
svgStr[26][15] = "Zmienna analizy";
svgStr[27][15] = "Wartość zmiennej";
svgStr[28][15] = "Etykieta wartości";
svgStr[29][15] = "Częstotliwość";
svgStr[30][15] = "Procent";
svgStr[31][15] = "<h3>ela krzyżowa</h3>";
svgStr[32][15] = "Zmienna kolumna";
svgStr[33][15] = "Zmienna wiersza";
svgStr[34][15] = "Średnia"
svgStr[35][15] = "Odchylenie standardowe"
svgStr[36][15] = "<h3> Histogram<br>Tabela częstości</h3>";
svgStr[37][15] = "Nazwa grupy";
svgStr[38][15] = "Przedział";
svgStr[39][15] = "Łodyga";
svgStr[40][15] = " Liść";
svgStr[41][15] = "Grupa 1  Liść";
svgStr[42][15] = "Grupa 2  Liść"
svgStr[43][15] = "<h3>Opisowe statystyki</h3>";
svgStr[44][15] = "Obserwacja";
svgStr[45][15] = "Minimum";
svgStr[46][15] = "Mediana";
svgStr[47][15] = "Maksimum";
svgStr[48][15] = "Całkowity";
svgStr[49][15] = "<h3>Normalny Test</h3>";
svgStr[50][15] = "Oczekiwana częstość > 5 <br> jest polecany";
svgStr[51][15] = "&chi;&#178; Test<br>Przedział i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][15] = "Dane<br>Obserwowane częstości<br>(O<sub>i</sub>)";
svgStr[53][15] = "Rozkład normalny<br>Oczekiwane prwdopodobieństwa<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][15] = "Rozkład normalny<br>Oczekiwana częstość<br>(E<sub>i</sub>)";
svgStr[55][15] = "Każdy interwał<br>&chi;&#178; wartość<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][15] = "Suma &chi;&#178; value";
svgStr[57][15] = "Histogram Prawdopodobieństwa  i Rozkład normalny";
svgStr[58][15] = " Wykres Q-Q rozkład Normalny";
svgStr[59][15] = "Kwantyl z rozkładu normalnego";
svgStr[60][15] = "Współczynnik korelacji";
svgStr[61][15] = "Współczynnik determinacji";
svgStr[62][15] = "Błąd standardowy";
svgStr[63][15] = "Zmiennej";
svgStr[64][15] = "Zmiennej Name";
svgStr[65][15] = "Zmienna niezależna";
svgStr[66][15] = "Zmienna zależna";
svgStr[67][15] = "Parametr";
svgStr[68][15] = "estymowna wartość";
svgStr[69][15] = "wartość";
svgStr[70][15] = "przesunięcie";
svgStr[71][15] = "nachylenie";
svgStr[72][15] = "Czynnik";
svgStr[73][15] = "suma kwadratów";
svgStr[74][15] = "stopień swobody";
svgStr[75][15] = "średnia kwadratów";
svgStr[76][15] = "Regresja";
svgStr[77][15] = "błąd";
svgStr[78][15] = "Całkowity";
svgStr[79][15] = "<h3>Analiza regresji</h3>";
svgStr[80][15] = "Standaryzowane reszty Wykres Q-Q";
svgStr[81][15] = "Standaryzowane reszty";
svgStr[82][15] = "Kwantyl  rozkładu normalnego";
svgStr[83][15] = "Wykres reszt";
svgStr[84][15] = "wartość przewidywana ";
svgStr[85][15] = "Dwuczynnikowa analiza wariancji ";
svgStr[86][15] = "wykres Przedział ufności";
svgStr[87][15] = "Reszta";
svgStr[88][15] = "Dwuczynnikowa tabela średnich";
svgStr[89][15] = "Wykres rozrzutu Matrix";
svgStr[90][15] = "Porównanie wielokrotne";
svgStr[91][15] = "Statystyka";
svgStr[92][15] = "Czynnik";
svgStr[93][15] = "Poziom";
svgStr[94][15] = "Wykres danych sparowanych dla prób";
svgStr[95][15] = "Standaryzowane reszty vs Działka prognostyczna";
svgStr[96][15] = "Standaryzowane reszty vs Siła wpływu Wykres";
svgStr[97][15] = "Wykres odległości Cooka";
svgStr[98][15] = "Odległość Cooka";
svgStr[99][15] = "Kolejność danych";
svgStr[100][15] = "Różnica średnich";
svgStr[101][15] = "Test dla średniej";
svgStr[102][15] = "Interwencja";
svgStr[103][15] = "Interakcja";
svgStr[104][15] = "suma w wierszu ";
svgStr[105][15] = "suma w kolumnie";
svgStr[106][15] = "Współczynnik korelacji wielorakiej";
svgStr[107][15] = "<h3>Analiza korelacji</h3>";
svgStr[108][15] = "Macierz korelacji";
svgStr[109][15] = "Wykres średnich Czynnik A - Czynnik B";
svgStr[110][15] = "Siła wpływu";
svgStr[111][15] = "Geographic Information Graph";
svgStr[112][15] = "Zakres";
svgStr[113][15] = " Wykres Średnia - Odchylenie standardowe";
svgStr[114][15] = "Wariancja populacji";
svgStr[115][15] = "Hipotezy";
svgStr[116][15] = "Test";
svgStr[117][15] = "Wariancja";
svgStr[118][15] = "Wartość interwału";
svgStr[119][15] = "Kategoria";
svgStr[120][15] = "Tryb";
svgStr[121][15] = "Kowariancja";
svgStr[122][15] = "Trójkąt Pascala";
svgStr[123][15] = "Wspólne prawdopodobieństwo";
svgStr[124][15] = "Warunkowy";
svgStr[125][15] = "rozkład dyskretny";
svgStr[126][15] = "wiersz %";
svgStr[127][15] = "kolumna %";
svgStr[128][15] = "całkowity %";
svgStr[129][15] = "Macierz wykresów słupkowych";
svgStr[130][15] = "Wcześniejsze prawdopodobieństwo";
svgStr[131][15] = "Wartość własna";
svgStr[132][15] = "Wektor własny";
svgStr[133][15] = "Wielowymiarowa tabela częstości";
svgStr[134][15] = "Hierarchiczny wykres skupień";
svgStr[135][15] = "Odległość";
svgStr[136][15] = "Pojedynczy";
svgStr[137][15] = "Ukończono";
svgStr[138][15] = "Średnia";
svgStr[139][15] = "Centroida";
svgStr[140][15] = "Okręg";
svgStr[141][15] = "Powiązanie";
svgStr[142][15] = "Number of Clusters <br>K";
svgStr[143][15] = "Bayes Information Criteria";
svgStr[144][15] = "Within Sum of Squares";
svgStr[145][15] = "Akaike Information Criteria";

svgStrU[1][15] = "Rozkład dwumianowy";
svgStrU[2][15] = "Powtórzenie";
svgStrU[3][15] = "Śrdenia";
svgStrU[4][15] = "Odchylenie standardowe";
svgStrU[5][15] = "Poisson Dystrybuanta";
svgStrU[6][15] = "Rozkład Geometryczny";
svgStrU[7][15] = "Rozkład Hypergeometryczny";
svgStrU[8][15] = "Populacja";
svgStrU[9][15] = "Rozkład w próbie";
svgStrU[10][15] = "Prawo wielkich liczby";
svgStrU[11][15] = "reszka/rewers";
svgStrU[12][15] = "orzeł/awers";
svgStrU[13][15] = "Awers monety";
svgStrU[14][15] = "Liczba orłów";
svgStrU[15][15] = "Liczba prób";
svgStrU[16][15] = "Rozkład średniej z próby";
svgStrU[17][15] = "Powtórzenie";
svgStrU[18][15] = "Błąd standardowy";
svgStrU[19][15] = "Średnia populacji";
svgStrU[20][15] = "Przedział ufności";
svgStrU[21][15] = "Dokładność szacowania ";
svgStrU[22][15] = "Próba Śrdenia";
svgStrU[23][15] = "[Test Stat]";
svgStrU[24][15] = "Dystrybuanta";
svgStrU[25][15] = "Odrzuć H\u2080";
svgStrU[26][15] = "Akceptuj H\u2080";
svgStrU[27][15] = "wartość p";
svgStrU[28][15] = "[Decyzja] ";
svgStrU[29][15] = "[ANOVA]";
svgStrU[30][15] = "Wprowadź (liniowy) współczynnik korelacji i kliknij przycisk Wykonaj";
svgStrU[31][15] = "Regresja";
svgStrU[32][15] = "Zmienna wiersza";
svgStrU[33][15] = "Zmienna kolumna";
svgStrU[34][15] = "Śrdenia"
svgStrU[35][15] = "Odchylenie standardowe"
svgStrU[36][15] = "<h3> Histogram<br>Tabela częstości</h3>";
svgStrU[37][15] = "Nazwa grupy";
svgStrU[38][15] = "Przedział";
svgStrU[39][15] = "Łodyga";
svgStrU[40][15] = " Liść";
svgStrU[41][15] = "Grupa 1  Liść";
svgStrU[42][15] = "Grupa 2  Liść"
svgStrU[43][15] = "<h3>Podstawowe statystyki</h3>";
svgStrU[44][15] = "Obserwacja";
svgStrU[45][15] = "Minimum";
svgStrU[46][15] = "Mediana";
svgStrU[47][15] = "Maksimum";
svgStrU[48][15] = "Całkowity";
svgStrU[49][15] = "Wykładniczy";
svgStrU[50][15] = "Jednostajny";
svgStrU[51][15] = "Dokładność szacowania";
svgStrU[52][15] = "- Utwórz punkty po kliknięciu, a eStat znajdzie linię regresji.";
svgStrU[53][15] = "- Przenieś lub wymaż punkt. Obserwuj zmianę linii regresji.";
svgStrU[54][15] = "[Próba Statystyka] ";
svgStrU[55][15] = "[Próba 1 Statystyka] ";
svgStrU[56][15] = "[Próba 2 Statystyka] ";
svgStrU[57][15] = "Poziom ufności";
svgStrU[58][15] = "Zmienne w wierszach i kolumnach są niezależne";
svgStrU[59][15] = "zależne wiersz i kolumna";
svgStrU[60][15] = "Obserwowany rozkład";
svgStrU[61][15] = "Rozkład teoretyczny";
svgStrU[62][15] = "Test zgodności CHI2 - Obserwowane częstości";
svgStrU[63][15] = "Test sumy rang Wilcoxona";
svgStrU[64][15] = "Test sumy rang Wilcoxona Table";
svgStrU[65][15] = "Kruskal-Wallis Test";
svgStrU[66][15] = "Rozkład H Kruskala-Wallisa ";
svgStrU[67][15] = "Test H Kruskala-Wallisa ";
svgStrU[68][15] = "Test znaków sumy rang Wilcoxon";
svgStrU[69][15] = "Test znaków";
svgStrU[70][15] = "Test Friedmana ";
svgStrU[71][15] = "Test S Friedmana";
svgStrU[72][15] = "Rozkład S Friedmana ";
svgStrU[73][15] = "t wartość (or Z)";
svgStrU[74][15] = "wartość ChiSq ";
svgStrU[75][15] = "Wariancja w próbie";
svgStrU[76][15] = "Różnica średnich w próbach";
svgStrU[77][15] = "Iloraz wariancji w próbach";
svgStrU[78][15] = "Założenie o wariancji";
svgStrU[79][15] = "Dane podsumowujące";
svgStrU[80][15] = "Wielokrotny wybór";
svgStrU[81][15] = "Wybierz maksymalnie dwie grupy";
svgStrU[82][15] = "X zmiennej";
svgStrU[83][15] = "Y zmiennej";
svgStrU[84][15] = "przez";
svgStrU[85][15] = "Brak zmiennej grupy";
svgStrU[86][15] = "wybrane dane: ";
svgStrU[87][15] = "Surowe dane";
svgStrU[88][15] = "Wybierz zmienne, klikając nazwę var";
svgStrU[89][15] = "brak obserwacji";
svgStrU[90][15] = "Suma rang";
svgStrU[91][15] = "Longitude";
svgStrU[92][15] = "Latitude";
svgStrU[93][15] = "Co najmniej jedna para lokalizacji jest inna";
svgStrU[94][15] = "Rozkład Wilcoxona - sumy rang ";
svgStrU[95][15] = "Sparowane zmienne";
svgStrU[96][15] = "sparowana próbka";
svgStrU[97][15] = "test niezależności";
svgStrU[98][15] = "Symulacja";
svgStrU[99][15] = "Liczba losowa";
svgStrU[100][15] = "Rozkład normalny";
svgStrU[101][15] = "Rozkład t ";
svgStrU[102][15] = "&chi;&#178; Dystrybuanta";
svgStrU[103][15] = "Rozkład F ";
svgStrU[104][15] = "Rozkład HSD Rang ";
svgStrU[105][15] = "Pierwszy kwartyl";
svgStrU[106][15] = "Trzeci kwartyl";
svgStrU[107][15] = "Zakres międzykwartylowy";
svgStrU[108][15] = "Współczynnik zmienności";
svgStrU[109][15] = "Skumulowana częstotliwość względna (%)";
svgStrU[110][15] = "Maksymalna liczba całkowita o jednolitym rozkładzie";
svgStrU[111][15] = "Przesuń punkt za pomocą myszy";
svgStrU[112][15] = "z powtórzeniami ";
svgStrU[113][15] = "bez powtórzeń";
svgStrU[114][15] = "liniowy"; 
svgStrU[115][15] = "indeks w próbie";
svgStrU[116][15] = "Indeks prosty";
svgStrU[117][15] = "Opóźnienie";
svgStrU[118][15] = "Różnica";
svgStrU[119][15] = "Autokorelacja";
svgStrU[120][15] = "Log";
svgStrU[121][15] = "Pierwiastek kwadratowy";
svgStrU[122][15] = "Box-Cox";
svgStrU[123][15] = "Czas bazowy";
svgStrU[124][15] = "Wyśrodkowana średnia ruchoma";
svgStrU[125][15] = "Wygładzanie wykładnicze";
svgStrU[126][15] = "Wyśrodkowana ruchoma mediana";
svgStrU[127][15] = "Model";
svgStrU[128][15] = "Średnia krocząca";
svgStrU[129][15] = "Podwójna średnia krocząca";
svgStrU[130][15] = "Podwójne wygładzanie wykładnicze Holta";
svgStrU[131][15] = "Indeks sezonowy";
svgStrU[132][15] = "Model sezonowy multiplikatywny Holta-Wintersa";
svgStrU[133][15] = "Seria pozasezonowa";
svgStrU[134][15] = "Blok";
svgStrU[135][15] = "Analiza skupień";
svgStrU[136][15] = "Klaster";
svgStrU[137][15] = "Drzewo decyzyjne";
svgStrU[138][15] = "Warunek reguły decyzji";
svgStrU[139][15] = "Decyzja";
svgStrU[140][15] = "Iteracja";
svgStrU[141][15] = "Wykres równoległy";
svgStrU[142][15] = "Klasyfikacja";
svgStrU[143][15] = "Funkcja klasyfikacyjna";
svgStrU[144][15] = "Wynik klasyfikacji";
svgStrU[145][15] = "Decyzja";
svgStrU[146][15] = "Współczynnik błędnych klasyfikacji";
svgStrU[147][15] = "Komórka";
svgStrU[148][15] = "Dane treningowe";
svgStrU[149][15] = "Testowanie danych";
 
// Azerbaijan
$message.az = {
    "eStat : Stat Education SW": "eStat : Stat Təhsil SW",
    "Home": "Əsas Səhifə",
    "Filename": "Faylın adı",
    "Selected Variables": "Seçilmiş dəyişənlər",
    "Cancel": "Ləğv et",
    "Edit Variables": "Dəyişənləri redaktə et",
    "Level": "Səviyyə",
    "ElementaryLevel": "I",
    "MiddleLevel": "O",
    "HighLevel": "A",
    "UniversityLevel": "U",
    "Example": "Nümunə",
    "New Sheets": "Yeni Səhifələr",
    "csv Open": "csv Aç",
    "www Open": "www Aç",
    "json Open": "json Aç",
    "csv Save": "csv Yadda Saxla",
    "json Save": "json Yadda Saxla",
    "Print Sheet": "Səhifəni Çap Et",
    "Bar Graph": "Sütun Qrafiki",
    "Pie Chart": "Dairə Qrafiki",
    "Band Graph": "Zolaq Qrafiki",
    "Line": "Xətt",
    "Line Graph": "Xətti Qrafik",
    "Dot Graph": "Nöqtə Qrafiki",
    "Histogram": "Histoqram",
    "Stem & Leaf Plot": "Gövdə & Yarpaq Qrafiki",
    "maxStem": "** Maksimum Gövdə Sayı <= 30 **",
    "Box-Whisker Plot": "Box-Whisker Qrafiki",
    "Scatterplot": "Səpələnmə Qrafiki",
    "ScatterplotMatrix": "Səpələnmə Qrafiki Matrisi",
    "Frequency Table": "Tezlik Cədvəli",
    "Basic Statistics": "Təsviri Statistika",
    "Testing Hypothesis &mu;": "Fərziyyənin Yoxlanması &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Fərziyyənin Yoxlanması &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Fərziyyənin Yoxlanması  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Fərziyyənin Yoxlanması &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Dispersiya Analizi",
    "MiddleSchool": "Orta məktəb",
    "HighSchool":   "Ali məktəb",
    "University":   "Universitet",
    "eStatHeading": "eStat dinamik məlumatların vizuallaşdırılması və qrafik statistik analizdən istifadə edərək daha yaxşı Statistika Təhsili üçün veb əsaslı pulsuz proqramdır.",
    "Support":      "Dəstək",
    "Donation":     "İanə",
    "Middle School Stat Education": "Orta Məktəb Statistikası",
    "High School Stat Education": "Yuxarı Sinif Statistikası",
    "University Stat Education": "Universitet Statistikası",
    "Elem Stat Graph Example": "Elementar Qrafik Nümunəsi",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Şaquli",
    "Horizontal": "Üfüqi",
    "Vertical Separated Bar": "Şaquli Ayrılmış Sütun Qrafiki",
    "Vertical Stacked Bar": "Şaquli üst-üstə Sütun Qrafiki",
    "Vertical Ratio Bar": "Şaquli Nisbət Sütun Qrafiki",
    "Vertical Side by Side Bar": "Şaquli Yanbayan Sütun Qrafiki",
    "Vertical Two Sided Bar": "Şaquli İki Tərəfli Sütun Qrafiki",
    "Horizontal Separated Bar": "Üfüqi Ayrılmış Sütun Qrafiki",
    "Horizontal Stacked Bar": "Üfüqi Üst-Üstə Sütun Qrafiki",
    "Horizontal Ratio Bar": "Üfüqi Nisbət Sütun Qrafiki",
    "Horizontal Side by Side Bar": "Üfüqi Yanbayan Sütun Qrafiki",
    "Horizontal Two Sided Bar": "Üfüqi iki tərəfli sütun Qrafiki",
    "Doughnut Graph": "Halqa Qrafiki",
    "Two Sided Stem & Leaf Plot": "İki tərəfli Gövdə və Yarpaq Qrafiki",
    "Graph Save": "Qrafiki Yadda Saxla",
    "Graph Print": "Qrafiki Çap Et",
    "Move to Table": "Cədvələ köçürün",
    "Edit Title": "Başlığı Redaktə Et",
    "Table Save": "Cadvəli Yadda Saxla",
    "Table Print": "Cədvəli Çap Et",
    "Frequency": "Tezlik",
    "Sorting": "Sıralama",
    "SortData": "Verilənləri (data) Sırala",
    "Raw Data": "Emal Edilməmiş Verilənlər (Data)",
    "Descending": "Azalan Sıra",
    "Ascending": "Artan Sıra",
    "Mean": "Ədədi Orta",
    "Std Deviation": "Standart Kənarlaşma",
    "MeanStd": "Ədədi Orta/Standart Kənarlaşma",
    "DotMeanStd": "Nöqtə Qrafiki - Ədədi Orta/Standart Kənarlaşma",
    "95CI": "95% Etibarlı interval",
    "CorrelationAnalysis": "Korrelyasiya Analizi",
    "RegressionAnalysis": "Reqressiya Analizi",
    "RegressionAnalysis1": "Sadə Xətti Reqresiya Analizi",
    "RegressionAnalysis2": "Çoxhədli Xətti Reqresiya Analizi",
    "ANOVA2": "ANOVA2",
    "Regression": "Reqressiya",
    "RegressionLine": "Reqressiya Xətti",
    "RegressionBand": "Etibarlılıq Zolağı",
    "RegressionTable": "Reqressiya Analizi",	
    "Frequency Polygon": "Tezlik Çoxbucaqlısı",
    "Execute New Interval": "Yeni İntervalı icra Et",
    "Interval Start": "İntervalın Başlanğıcı",
    "Interval Width": "İntervalın Eni",
    "t-test": "t-test",
    "Z-test": "Z-test",
    "(if Z-test, enter &sigma;)": "(Z-testdirsə, &sigma; daxil edin.)",
    "Significance Level": "Əhəmiyyətlilik Dərəcəsi",
    "Execute": "İcra Et",
    "(Confidence Interval)": "(Etibarlı İnterval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-testidirsə, Z<sub>&alpha;/2</sub> istifadə edilir.)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Dispersiya Fərziyyəsi",
    "Variance": "Dispersiya",
    "F test": "F test",
    "At least one pair of means is different": "Ədədi Ortaların Ən Azı Bir Cütü Fərqlidir",
    "Main Title": "Əsas Başlıq",
    "y title": "Y Dəyişəninin İzahı",
    "x title": "X Dəyişəninin İzahı",
    "yAxis": "Y Oxu",
    "Modify": "Dəyişmək",
    "Confirm": "Təsdiq Et",
    "Variable Name": "Dəyişənin Adı",
    "Variable Value": "Dəyişənin Dəyəri",
    "Value Label": "dəyərin etiketi",
    "* Less than nine value labels allowed.": "* Doqquz dəyər etiketindən daha aza icazə verilir..",
    "Save": "Yadda saxla",
    "Exit": "Çıxmaq",
    "eStatU UnivStatEdu": "eStatU - Universitet Statistika Təhsili SW",
    "eStatH HighStatEdu": "eStatH - Yuxarı Sinif Statistikası SW",
    "eStatM MiddleStatEdu": "eStatM - Orta məktəb Statistikası SW",
    "MiddleStat": "Orta məktəb Statistikası",
    "HighStat":   "Yuxarı Sinif Statistikası",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "menyu",
    "Binomial Experiment": "Binomial Eksperiment",
    "Binomial Distribution": "Binomial Paylanma",
    "Binomial Prob Table": "Binomial Ehtimal Cədvəli",
    "Poisson Distribution": "Puasson Paylanması",
    "Poisson Prob Table": "Puasson Ehtimal Cədvəli",
    "Geometric Distribution": "Həndəsi Paylanma",
    "Geometric Prob Table": "Həndəsi Ehtimal Cədvəli",
    "HyperGeometric Distribution": "Hiper - Həndəsi Paylanma",
    "HyperGeometric Prob Table": "Hiper - Həndəsi Ehtimal Cədvəli",
    "Exponential Distribution": "Üstlü paylanma",
    "Normal Experiment": "Normal Paylanmaya Aid Sınaq",
    "Normal Distribution": "Normal Paylanma",
    "Normal Approx": "Normal Təqribiləşdirmə",
    "t Distribution": "t Paylanması",
    "ChiSquare Distribution": "&chi;&#178; Paylanması",
    "F Distribution": "F Paylanması",
    "Sampling": "Nümunə Seçimi",
    "Population vs Sample": "Populyasiya (Ana Kütlə) vs Nümunə",
    "Population": "Populyasiya (Ana Kütlə)",
    "Sample": "Nümunə",
    "Exponential": "Üst(0.3)",
    "Uniform": "Müntəzəm(0,1)",
    "UniformDist": "Müntəzəm Paylanma",
    "Sample05": "Nümunə Seçimi 5%",
    "Sample10": "Nümunə Seçimi 10%",
    "Sample20": "Nümunə Seçimi 20%",
    "Statistics/BoxPlot": "Statistika/Qutu Qrafiki",
    "StatisticalProb":     "Statistik Ehtimal",
    "Law of Large Number": "Böyük Ədədlər Qanunu",
    "Dist of Sample Means": "Nümunələrin Ədədi Ortasının Nümunə Paylanması",
    "Sampling Distribution": "Nümunə paylanması",
    "Sample Size": "Nümunə Ölçüsü",
    "Confidence Interval": "Etibarlı interval",
    "Confidence Interval Simulation": "Etibarlı İntervalın Simulyasiyası",
    "Simulation": "Simulyasiya",
    "Confidence Interval Mu": "Etibarlı İnterval : &mu;",
    "Mu Confidence Interval": "Populyasiya Ədədi Ortası Üçün Etibarlı İnterval : &mu;",
    "Confidence Interval Sigma": "Etibarlı İnterval : &sigma;&#178; ",
    "Confidence Interval P": "Etibarlı İnterval : p",
    "Estimation Accuracy": "Hesablama Dəqiqliyi",
    "Repetition": "Təkrar",
    "Confidence Level": "Etibarlı İnterval",
    "Testing Hypothesis mu_titleAB": "Ədədi Ortayla Bağlı Fərziyyənin Yoxlanması",
    "Testing Hypothesis mu_title": "Ədədi Ortayla Bağlı Fərziyyənin Yoxlanması",
    "Testing Hypothesis sigma_title": "Dispersiya Haqda Fərziyyənin yoxlanması",
    "Testing Hypothesis P_title": "Nisbət Haqda Fərziyyənin Yoxlanması",
    "Testing Hypothesis mu12_title": "iki Ədədi Ortanın Bərabərliyi Fərziyyəsinin Yoxlanması",
    "Testing Hypothesis sigma12_title": "iki Dispersiyanın Bərabərliyi Fərziyyəsinin Yoxlanması",
    "Testing Hypothesis P12_title": "iki Nisbətin Bərabərliyi Fərziyyəsinin Yoxlanması",
    "Testing Hypothesis muA":  "Fərziyyənin Yoxlanması &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Fərziyyənin Yoxlanması &mu; - C, n",
    "Testing Hypothesis mu": "Fərziyyənin Yoxlanması &mu;",
    "Testing Hypothesis sigma": "Fərziyyənin Yoxlanması &sigma;&#178;",
    "Testing Hypothesis P": "Fərziyyənin Yoxlanması p",
    "Testing Hypothesis mu12": "Fərziyyənin Yoxlanması &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Fərziyyənin Yoxlanması &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Fərziyyənin Yoxlanması p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Fərziyyənin Yoxlanması ANOVA", 
    "Testing Hypothesis ANOVA2": "Fərziyyənin Yoxlanması ANOVA2",
    "SameSampleSize": "Hər bir hüceyrənin nümunə ölçüsü eyni olmalıdır. Hər bir hüceyrənin nümunə ölçüsü eyni olmalıdır.",
    "Testing Independence": "Kateqoriyalara aiddir: Asılı Olmamazlıq Testi",
    "CategoryD": "Kateqoriya",
    "Category": "Kateqoriya",
    "Correlation Coefficient": "Korrelyasiya Əmsalı",
    "Regression Experiment": "Reqressiyaya Aid Sınaq",
    "Hypothesis": "Fərziyyə",
    "Test Type": "Test Növü",
    "Z-test": "Z test",
    "t-test": "t test",
    "Chi-test": "&chi;&#178; test",
    "F-test": "F test",
    "Sampling Type": "Nümunə Seçiminin Növü",
    "Independent Sample": "Asılı Olmayan Nümunə",
    "Paired Sample": "Cütlü Nümunə",
    "Sample Data": "Nümunə Verilənləri",
    "input either sample data": "növbəti qutularda ya csv / bsv istifadə edərək nümunə verilənlərini ya da nümunə statistikasını daxil edin",
    "input data": "Verilənləri Daxil Et",
    "Sample Statistics": "Nümunə Statistikası",
    "Sample Mean": "Nümunə Ədədi Ortası",
    "Sample Variance": "Nümunə Dispersiyası",
    "Sample Proportion": "Nümunə Nisbəti",
    "sample range": "Nümunə Aralığı",
    "control chart": "Nəzarət qrafiki",
    "if Z-test-1": "(Z-testdirsə, populyasiya (ana kütlə) dispersiyasını daxil edin &sigma;&#178;)",
    "if Z-test-2": "(Z-testdirsə, z<sub>&alpha;/2 </sub> istifadə edilir)",
    "At least one pair": "Ədədi ortaların ən az bir cütü fərqlidir",
    "Row-Col-0": "Sətir və Sütun Dəyişənləri Asılı Olmayandır",
    "Row-Col-1": "Sətir və Sütun Dəyişənləri Asılıdır",
    "Enter any number of row": "(Sol üst hücrədən müşahidəni daxil edin)",
    "Row": "Sətir",
    "Column": "Sütun",
    "Probability": "Ehtimal",
    "Show Probability": "Ehtimalı Göstərin",
    "Regression Line": "Reqressiya Xətti",
    "Erase All": "Hamısını Sil",
    "Add Point": "Nöqtə Əlavə Et",
    "Erase Point": "Nöqtəni Sil",
    "Reference Site": "İstinad Saytı",
    "Lot Size": "Lot Ölçüsü",
    "Defect Size": "Qüsur Ölçüsü",
    "Defect Rate": "Qüsurlu Dərəcə",
    "If typed": "Rəqəmi yazdıqdan sonra [Execute] və ya [Enter] vurun",
    "Stat/BoxPlot": "Statistika/Qutu Qrafiki",
    "Mean": "Ədədi orta",
    "Std Dev": "Standart Kənarlaşma",
    "SimulationWarning": "(Növbəti simulyasiyaya başlamazdan öncə mövcud simulyasiya tamamlanmalıdır)",
    "OneGroup": "(Bir Qrup)",
    "AnalysisVar": "Dəyişən Analizi",
    "AnalysisVar2": "Y Dəyişəni",
    "GroupVar": "Qrup",
    "GroupVar2": "X Dəyişəni",
    "GroupVar3": "Faktor 1",
    "GroupVar4": "Faktor 2",
    "AnalysisVarMu12": "Analiz(və ya X1) Dəyişəni",
    "GroupVarMu12": "Grup(və ya X2) Dəyişəni",
    "PairedMu12": " X1, X2 : Cütlü Dəyişənlər",
    "SizeVar": "Dəyişənin Ölçüsü",
    "RegressionBand": "Etibarlı Zolaq",
    "RegressionTable": "Reqressiya Analizi",
    "RegressionResidual": "Qalıqların Qrafiki",
    "RegressionResidualLeverage": "Qalıqlar və Ling (Leverage)",
    "RegressionCook": "Kukun məsafə Qrafiki",
    "RegressionQQ": "Qalıqlar Q-Q Qrafiki",
    "HistogramNormal": "Histoqram",
    "HistogramChisq": "Normallıq Testi",
    "HistogramNormalQQ": "Normal Q-Q Qrafik",
    "PopulationStd": "Populyasiya (Ana Kütlə) Standart Kənarlaşması",
    "Type1Error": "I Tip Xəta",
    "Type2Error": "II Tip Xəta",
    "AnovaTable": "Dispersiya Analizi Cədvəli",
    "AnovaMeanGraph": "Ədədi Orta Üçün Etibarlı İnterval",
    "MultipleComparison": "Çoxhədli Müqayisə",
    "ComparisonGraph": "Müqayisə Qrafiki",
    "AnovaResidual": "Qalıqlar Qrafiki",
    "AnovaQQ": "Qalıqların Q-Q Qrafiki",
    "TestingFit": "kategoriyali : Uyğunluq Dərəcəsi Testi",
    "FitTest0": "Empirik və Nəzəri Paylanmalar Eynidir",
    "FitTest1": "Empirik və Nəzəru Paylanmalar Fərqlidir",
    "ObservedFreq": "Empirik Tezlik O",
    "ExpectedProb": "Ehtimalın Riyazi Gözləməsi p",
    "ExpectedFreq": "Tezliyin Riyazi Gözləməsi E(>5)",
    "InputFitData": "Sol üst hücrədən müşahidəni daxil edin",
    "ExecuteTable": "Statistika",
    "MeanDotGraph": "Etibarlı İnterval Qrafiki",
    "ScatterRegression": "Səpələnmə Diaqramı",
    "Factor": "Faktor",
    "Interaction": "Qarşılıqlı Əlaqə",
    "NoInteraction": "Qarşlıqlı Əlaqə Yoxdur",
    "ExistInteraction": "Qarşılıqlı Əlaqə Mövcuddur",
    "eStatLecture": "eStat eTəhsil",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Vilkokson Cərgələrin Cəmi Testi", 		
    "NonParametricMu12": "Vilkokson Cərgələrin Cəmi Testi: Mövqe Parametri M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Cərgələrin Cəmi Testi",
    "Sample Range": "Cərgələrin Cəmi",
    "DistributionTable": "Paylanma Cədvəli",
    "SignedRankTestDist": "Vilkokson İşarələnmiş Cərgələrin Cəmi Testi Üçün Paylanma",
    "WilcoxonTestDist": "Vilkokson Cərgələrin Cəmi Testi Üçün Paylanma",
    "KruskalTestDist": "Kruskal-Vallis H Paylanması",
    "FriedmanTestDist": "Fridman S Paylanması",
    "SignedRankTest": "İşarələnmiş Cərgələrin Cəmi Testi",
    "SignTest": "İşarə Testi",
    "SignCount": "İşarə Sayı",
    "KruskalTest": "Kruskal-Vallis Testi",
    "KruskalTestANOVA": "Kruskal-Vallis Testi",
    "Total": "Toplam",
    "FriedmanTest": "Fridman Testi",
    "FriedmanTestANOVA": "Fridman Testi",
    "Block": "Blok",
    "Treatment": "Müdaxilə",
    "At least one locations is different": "Mövqelərdən ən azı bir cütü fərqlidir",
    "SignCondition": "(n ≤ 100) Binomial Test,  (n > 100) Normal Təqribiləşdirmə Testi",
    "WilcoxonSignCondition": "(n ≤ 20) İşarələnmiş Cərgələrin Cəmi Testi, (n > 20) Normal Təqribiləşdirmə Testi",
    "WilcoxonRankCondition": "(n=n<sub>1</sub>+n<sub>2</sub> ≤ 25) Cərgələrin Cəmi Testi, (n>25) Normal Təqribiləşdirmə Testi",
    "KruskalCondition": "(n ≤ 10) H Paylanması Testi,  (n > 10) &chi;&#178; Təqribiləşdirmə Testi",
    "VariableSelect":  "* Verilənlərin Analizi : Faylı Yüklə >> Dəyişənləri Seç >>  Kliklə",
    "VariableSelect2": "* Dəyişənləri Seç : Dəyişən adına kliklə və ya sağdakı seçim qutusundan istifadə et",
    "VariableSelect3": "Dəyişənləri Seç",
    "VariableSelect4": "Daha Çox Analiz Dəyişəni Seçilə Bilər.",
    "VariableSelect5": "Daha Çox X Dəyişəni Seçilə Bilər.",
    "SummaryData": "Müxtəsər Verilənlər",
    "RawData": "Emal Edilməmiş Verilənlər",
    "MultiSelect": "",
    "DataType": "(Dəyişən adına klikləyərək seç)",
    "by": "görə",
    "NameVar": "Dəyişən Adı",
    "n_variance": "n-1 formula",
    "RandomNumber":   "Təsadüfi Ədədlər Yarat",
    "RealNumber":     "Real",
    "IntegerNumber":  "Tam",
    "NumberData":     "Verilənlərin Sayı",
    "NumberDigit":    "Onluqlar",
    "NormalTable":    "Normal Paylanma Cədvəli",
    "Percentile":     "Persentil Cədvəli",
    "PercentileValue": "Persentil",
    "StudentRangeDist": "HSD Studentləşdirilmiş İnterval Paylanması",
    "copy link": "linki kopyala",
    "WithReplacement":    "Əvəzetmə ilə",
    "WithoutReplacement": "Əvəzetməsiz",
    "Replacement":     "Əvəzetmə ilə",
    "NonReplacement":  "Əvəzetməsiz",
    "WordCloud":       "Söz Buludu",
    "oneColor":        "Rəng",
    "defaultColor":    "Standart Rəng",
    "RelativeFreq":    "Nisbi Tezlik",
    "Density":         "Sıxlıq",
    "MarginOfError":   "Xəta Həddi",
    "Permutation":     "Permutasiya",
    "PermutationSame": "Eyni obyektlər ilə Permutasiyalar",
    "Combination":     "Kombinasiya",
    "NumberOfCase":    "Halların sayı",
    "BinomialTheorem": "Binomial Teorem",
    "PascalTriangle":  "Paskal Üçbucağı",
    "Character":       "Xarakter",
    "AdditionRule":      "Ehtimalın Toplanması Qaydası",
    "MultiplicationRule":"Ehtimalın Hasili Qaydası",
    "ConditionalProb":   "Şərti Ehtimal",
    "JointProb":         "Birgə Ehtimal",
    "DiscreteDist":      "Diskret Paylanma",
    "Categorize":        "Təsnifləşdir",
    "Recode":            "Yenidən Kodla",
    "Compute":           "Hesablama",
    "SelectIf":          "Əgər Seçin",
    "InfoValueLabel":    "*** Dəyişən seçin, dəyişən adını və/yaxud dəyər etiketini daxil edin.",
    "InfoSorting":       "*** Çeşidləmə dəyişənini seçin, 3 dəyişənə qədər çeşidləmə metodunu daxil edin.",
    "InfoCategorize":    "*** Kateqoriya üçün dəyişəni seçin, interval başlanğıcını və interval enini daxil edin.",
    "InfoRecode":        "*** Yenidən kodlaşdırma üçün dəyişəni seçin, yeni dəyər daxil edin.",
    "InfoRecode2":       "* 9 dəyərə qədər yenidən kodlaşdırmaya icazə verilir",
    "InfoCompute":       "*** Aşağıdakı düymələrdən istifadə edərək hesablama formulunu yaradın.",
    "InfoSelectIf":      "*** 3 dəyişənə qədər seçin, onların şərtlərini daxil edin.",
    "SortingVariable":   "Dəyişənlərin Sıralanması",
    "SortingMethod":     "Sıralama Üsulu",
    "NewVariable":       "Yeni Dəyişən",
    "CategoryVariable":  "Dəyişənləri Təsnifləşdirin",
    "CategoryListCheck": "Siniflərin Siyahısını Yoxla",
    "CategoryInterval":  "Sinif İntervalı",
    "CategoryLabel":     "Sinif Etiketi",
    "RecodeVariable":    "Dəyişənləri yenidən kodla",
    "CurrentValue":      "Cari dəyər",
    "NewValue":          "Yeni dəyər",
    "ComputeFormula":    "Düstur",
    "SelectVariable":    "Seçmək üçün<br>dəyişən",
    "RelationOperator":  "Əlaqə<br>Operator",
    "SelectValue":       "Dəyər",
    "MissingValue":      "Kəm Dəyər",
    "option":            "seçim",                                  
    "TimeSeries":        "Zaman Sırası",
    "Smoothing":         "Hamarlama",
    "Filtering":         "Süzgəcləmə",
    "Transformation":    "Çevrilmə",
    "Weight":            "Çəki",
    "PercentChange":     "Dəyişmə faizi",
    "WeightedIndex":     "Sadə İndeks",
    "BaseTime":          "Əsas vaxt",
    "LagTime":           "Gecikmə vaxtı",
    "Lag":               "Gecikmə",
    "Forecasting":       "Proqnozlaşdırma",
    "SeasonalModel":     "Mövsümi Model",
    "HoltWinter":        "Holt-Vinters Mövsümi Modeli",
    "Trend":             "Trend",
    "Seasonal":          "Mövsümi",
    "Deseasonal":        "Mövsümi Sıra",
    "Nseason":           "Mövsümdə vaxtlar",
    "Irregular":         "Qaydasız",
    "TrendModel":        "Mövsümi Trend Modeli",
    "RegressionModel":   "Reqressiya Modeli",
    "ForecastingPeriod": "Proqnozlaşdırma dövrü",
    "CreateTable":       "Verilənlər cədvəli",
    "SaveTable":         "Cədvəli Yadda Saxla",
    "MA":                "Hərəkətli Orta",
    "EWMA":              "EWMA (Üstlü Çəkiyə Malik Hərəkətli Orta) Modeli",
    "CenterMA":          "Mərkəzləşdirilmiş Hərəkətli Orta",
    "MovingMedian":      "Mərkəzləşdirilmiş Hərəkətli Median",
    "ES":                "Üstlü Hamarlama",
    "Default":           "Standart",
    "Linear":            "Xətti",
    "Quadratic":         "Kvadratik",
    "Cubic":             "Kubik",
    "SquareRoot":        "kvadrat kök",
    "Log":               "Loqarifmik",
    "Exponent":          "Üstlü (eksponensial)",
    "Power":             "Qüvvət",
    "BoxCox":            "Boks-Koks",
    "SingleMA":          "Tək Hərəkətli Orta",
    "SingleES":          "Tək Üstlü Hamarlama",
    "DoubleMA":          "İkiqat Hərəkətli Orta",
    "DoubleES":          "İkiqat Üstlü Hamarlama",
    "HoltLinear":        "Holt Üstlü Hamarlama",
    "DeseasonIntercept": "Mövsümsüz Sabit Hədd",
    "DeseasonSlope":     "Mövsümsüz Əmsal",
    "SeasonalIndex":     "Mövsümi İndeks",
    "Diff":              "Fərq",
    "DiffTime":          "Zaman Fərqi",
    "AR":                "Autoreqressiv Model",
    "ResultTable":       "Reqressiya Nəticəsi",
    "ForecastTable":     "Proqnoz Cədvəli",
    "HoltLevel":         "Səviyyə",
    "HoltTrend":         "Trend",
    "AutoCorrTable":     "Avtokorrelyasiya Cədvəli",
    "DiffSeries":        "Fərqlər sırası",
    "RawSeries":         "Emal Edilməmiş Zaman Sırası",
    "RBD":               "Təsadüfi Blok Dizaynı",
    "Latin":             "Latın Kvadrat Dizaynı",
    "Chapter01":         "Chapter 1&nbsp; Statistika və Məlumat Elmi",
    "Chapter02":         "Chapter 2&nbsp; Kateqorik məlumatın təsviri",
    "Chapter03":         "Chapter 3&nbsp; Ədədi məlumatın təsviri",
    "Chapter04":         "Chapter 4&nbsp; Yekun məlumat, Cədvəl və Ölçülər",
    "Chapter05":         "Chapter 5&nbsp; Ehtimal Paylanması",
    "Chapter06":         "Chapter 6&nbsp; Nümunə paylanması və Təxminetmə",
    "Chapter07":         "Chapter 7&nbsp; Bir populyasiyanın parametrləri üçün hipotez testi",
    "Chapter08":         "Chapter 8&nbsp; İki populyasiyanın parametrləri üçün hipotez testi",
    "Chapter09":         "Chapter 9&nbsp; Bir neçə populyasiyanın ədədi ortası üçün hipotez testi",
    "Chapter10":         "Chapter 10      Qeyri parametrik Hipotez testi",
    "Chapter11":         "Chapter 11      Kateqorik məlumat üçün Hipotez testi",
    "Chapter12":         "Chapter 12      Korrelyasiya və Reqressiya Analizi",
    "Chapter13":         "Chapter 13      Zaman sırası analizi",
    "Distribution":      "Paylanma",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Azerbaijan
appStr[0][16] = "/estat/eStat/index.html";
appStr[1][16] = "/estat/eStatH/index.html";
appStr[2][16] = "/estat/eStatU/index.html";
appStr[3][16] = "/estat/eStatE/index_en.html";
appStr[4][16] = "/estat/eHelp/index_en.html";
appStr[5][16] = "index.html";
appStr[6][16] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][16] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][16] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][16] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][16] = "";
appStr[11][16] = "Large Population Country";
appStr[12][16] = "Life Expectancy (OECD)";
appStr[13][16] = "Population Pyramid (Korea)";
appStr[14][16] = "GNP per Capita (OECD)";
appStr[15][16] = "Top World Export Country";
appStr[16][16] = "Obesity % of Population";
appStr[17][16] = "Temperature of Major City";
appStr[18][16] = "Top CO2 Emission Country";
appStr[19][16] = "Alcohol Consume (OECD)";
appStr[20][16] = "Continuous Data Graph";
appStr[21][16] = "Length of Otter";
appStr[22][16] = "Age of Teacher";
appStr[23][16] = "Age of Teacher by Sex";
appStr[24][16] = "Cleanliness of Tooth";
appStr[25][16] = "Math Exam Scores";
appStr[26][16] = "Calorie of Hamberger";
appStr[27][16] = "Height vs Weight by Sex";
appStr[28][16] = "Discrete Data Graphs";
appStr[29][16] = "";
appStr[30][16] = "";
appStr[31][16] = "unit";
appStr[32][16] = "Country";
appStr[33][16] = "Male";
appStr[34][16] = "Female";
appStr[35][16] = "Age";
appStr[36][16] = "Person";
appStr[37][16] = "billion $";
appStr[38][16] = "Export";
appStr[39][16] = "Obesity %";
appStr[40][16] = "Celsius";
appStr[41][16] = "City";
appStr[42][16] = "Jan High";
appStr[43][16] = "Jul High";
appStr[44][16] = "million ton";
appStr[45][16] = "liter/year";
appStr[46][16] = "Alcohol";
alertMsg[1][16] = "Seçilmiş dəyişənlərdən birində verilənlər yoxdur.";
alertMsg[2][16] = "Təhlil üçün dəyişənləri bir-bir seçin (sütun adına klikləyin və ya seçim qutusunda dəyişəni seçin). Emal Edilməmiş Verilənlər üçün iki dəyişən seçilərsə, birincisi analiz (və ya Y) dəyişəni, ikincisi isə qrup (və ya X) dəyişənidir. ";
alertMsg[3][16] = "Seçilmiş dəyişən haqqında verilənlərin çatışmazlığı.";
alertMsg[4][16] = "Əgər hər bir sütunda muşahidələrin sayı müxtəlifdirsə, analizə icazə verilmir.";
alertMsg[5][16] = "Həddən çox qrup! Ekranın ölçüsünə görə qrafiklər üst-üstə düşə bilər..";
alertMsg[6][16] = "Müxtəsər verilənlərin analiz dəyişəninində simvol varsa, statistik analiz və ya cədvəl yaratmağa icazə verilmir..";
alertMsg[7][16] = "Emal edilməmiş verilənlər üçün üçdən çox dəyişən seçilibsə, analizə və ya cədvəl yaratmağa icazə verilmir.";
alertMsg[8][16] = "Müşahidələrin sayı 200-dən az olduqda nöqtə Qrafikinə icazə verilir.";
alertMsg[9][16] = "Müşahidələrin sayı 100-dən az olduqda gövdə və yarpaq diaqramına icazə verilir.";
alertMsg[10][16] = "Analiz dəyişəni seçilməyib.";
alertMsg[11][16] = "Analiz/Qrup dəyişənləri seçilməyib.";
alertMsg[12][16] = "Analiz dəyişənində simvol varsa, analizə və ya cədvəl yaratmağa icazə verilmir.";
alertMsg[13][16] = "";
alertMsg[14][16] = "Kəsilməz qrafiklər və fərziyyələrin testi üçün müxtəsər verilənlərə icazə verilmir.";
alertMsg[16][16] = "Bu fərziyyəni yoxlamaq üçün yalnız iki qrupa icazə verilir.";
alertMsg[17][16] = "Səpələnmə diaqramı x dəyişənini və y dəyişənini tələb edir.";
alertMsg[18][16] = "Səpələnmə diaqramında üçdən çox dəyişənə icazə verilmir.";
alertMsg[19][16] = "Verilənlərda simvol varsa, analizə icazə verilmir.";
alertMsg[20][16] = "Verilənlərda simvol varsa, reqressiya təhlili edilə bilməz.";
alertMsg[21][16] = "Əgər verilənlərin əksikliyi varsa, yadda saxlamağa icazə verilmir.";
alertMsg[22][16] = "Mənfi rəqəm varsa, sütun Qrafiki çəkilə bilməz.";
alertMsg[25][16] = "Yalnız bir qrup varsa, üst-üstə sütun Qrafikinə icazə verilmir.";
alertMsg[27][16] = "Yalnız bir qrup varsa, nisbət sütun Qrafikinə icazə verilmir.";
alertMsg[29][16] = "Yalnız bir qrup varsa, yanbayan sütun Qrafikinə icazə verilmir.";
alertMsg[31][16] = "Yalnız bir qrup varsa, ikitərəfli sütun Qrafikinə icazə verilmir.";
alertMsg[32][16] = "Mənfi rəqəm varsa, dairə Qrafiki çəkilə bilməz.";
alertMsg[33][16] = "Mənfi rəqəm varsa, halqa Qrafiki çəkilə bilməz.";
alertMsg[34][16] = "Mənfi rəqəm varsa, lent (band) Qrafiki çəkilə bilməz.";
alertMsg[35][16] = "Mənfi rəqəm varsa, tezlik cədvəli çəkilə bilməz.";
alertMsg[36][16] = "Bu sütun Qrafikinə yalnız iki qrup üçün icazə verilir.";
alertMsg[37][16] = "Bu fərziyyə yoxlanışına yalnız bir dəyişən üçün icazə verilir.";
alertMsg[38][16] = "mu rəqəm deyil. Rəqəm daxil edin və yenidən cəhd edin!";
alertMsg[39][16] = "Standart kənarlaşma ya sıfır, ya da rəqəm deyil. Yenidən cəhd edin!";
alertMsg[40][16] = "Giriş dispersiyası rəqəm deyil. Rəqəm daxil edin və yenidən cəhd edin!";
alertMsg[41][16] = "Bu fərziyyə yoxlanışı yalnız iki dəyişən üçündür. Birinci Analiz dəyişənidir, ikinci isə grup dəyişənidir. Qrup dəyişənlərinin yalnız iki qrupu olmalıdır.";
alertMsg[42][16] = "Fərziyyə yoxlanışının başlığının redaktəsinə icazə verilmir.";
alertMsg[43][16] = "Adi xətti reqressiya yalnız bir qrup üçündür.";
alertMsg[44][16] = "Daxil edin Birinci:Ad, İkinci:Enlik, Üçüncü:Uzunluq, Dördüncü:Analiz Dəyişəni(istəyə bağlı)";
alertMsg[45][16] = "beşdən çox dəyişəndirsə, GIS grafik çəkilə bilməz.";
alertMsg[46][16] = "Ən azı iki sıra tələb olunur. Yenidən cəhd edin";
alertMsg[47][16] = "Tezlikdə xarakter verilənlərinə icazə verilmir !! Yenidən cəhd edin.";
alertMsg[48][16] = "Xarakter Verilənlərinə icazə verilmir !! Yenidən cəhd edin.";
alertMsg[49][16] = "Müşahidələrin sayı 100-dən az olmalıdır !! Yenidən cəhd edin.";
alertMsg[50][16] = "İnterval başlanğıcında və ya addımında nömrələri daxil edin.";
alertMsg[51][16] = "Nömrələri daxil edin / Sətirlərin sayı eyni olmalıdır! Yenidən cəhd edin.";
alertMsg[52][16] = "Kateqoriya və tezlikdə nömrələri daxil edin.";
alertMsg[53][16] = "İnterval ölçüsü eyni deyil !! Yenidən cəhd edin.";
alertMsg[54][16] = "X müşahidəsi Y müşahidəsinə bərabər deyil !! Yenidən cəhd edin.";
alertMsg[55][16] = "!!! Vərəqdə verilənlər yoxdur.";
alertMsg[56][16] = "!!! Heç bir dəyişən seçilməyib";
alertMsg[57][16] = "!!! Interval başlanğıcını və interval enini daxil edin";
alertMsg[58][16] = "!!! Rəqəmsal interval başlanğıcını və interval enini daxil edin";
alertMsg[59][16] = "!!! 9-dan çox interval - intervalın enini dəyişdirin";
alertMsg[60][16] = "!!! Bu dəyişənin 9-dan çox qiyməti var";
alertMsg[61][16] = "!!! Heç bir dəyər daxil edilmədi";
alertMsg[62][16] = "!!! Formula daxil edin";
alertMsg[63][16] = "!!! Şərtlərə cavab verən verilənlər yoxdur.";
alertMsg[64][16] = "";
alertMsg[65][16] = ""; 
alertMsg[66][16] = "";
alertMsg[67][16] = "";
alertMsg[68][16] = "";
alertMsg[69][16] = "";

svgStr[1][16] = " Sütun Qrafiki";
svgStr[2][16] = " Dairə Qrafiki";
svgStr[3][16] = " Halqa Qrafiki";
svgStr[4][16] = " Zolaq Qrafiki";
svgStr[5][16] = " Xətti qrafik";
svgStr[6][16] = " Nöqtə Qrafiki";
svgStr[7][16] = " Qutu Qrafiki";
svgStr[8][16] = " Gövdə və yarpaq sahəsi";
svgStr[9][16] = " Histogram";
svgStr[10][16] = " Səpələnmə diaqramı";
svgStr[11][16] = " Fərziyyənin Yoxlanması: Populyasiya ortası";
svgStr[12][16] = " Fərziyyənin Yoxlanması: Populyasiya Dispersiyası";
svgStr[13][16] = " Fərziyyənin Yoxlanması: İki populyasiya ədədi ortası";
svgStr[14][16] = " Fərziyyənin Yoxlanması: İki populyasiya dispersiyası";
svgStr[15][16] = " Dispersiya analizi";
svgStr[16][16] = "Tezlik";
svgStr[17][16] = "Nisbət";
svgStr[18][16] = "Qrup ";
svgStr[19][16] = " ";
svgStr[20][16] = "<h3>Müxtəsər Verilənlərin <br> Tezlik Cədvəli</h3>";
svgStr[21][16] = "Qrup dəyişəni";
svgStr[22][16] = "Sətir dəyişəni";
svgStr[23][16] = "Cəm";
svgStr[24][16] = "Dairə ölçüsü";
svgStr[25][16] = "<h3>tezlik cədvəli</h3>";
svgStr[26][16] = "Analiz dəyişəni";
svgStr[27][16] = "Dəyişən dəyəri";
svgStr[28][16] = "Dəyər etiketi";
svgStr[29][16] = "Tezlik";
svgStr[30][16] = "Nisbi tezlik";
svgStr[31][16] = "<h3>Kəsişən Cədvəl</h3>";
svgStr[32][16] = "Sütun dəyişəni";
svgStr[33][16] = "Sətir dəyişəni";
svgStr[34][16] = "Ədədi orta"
svgStr[35][16] = "Standart kənarlaşma"
svgStr[36][16] = "<h3> Histoqram<br>tezlik cədvəli</h3>";
svgStr[37][16] = "Qrup adı";
svgStr[38][16] = "İnterval";
svgStr[39][16] = "Gövdə";
svgStr[40][16] = "Yarpaq";
svgStr[41][16] = "Qrup 1  yarpaq";
svgStr[42][16] = "Qrup 2  yarpaq"
svgStr[43][16] = "<h3>Təsviri statistika</h3>";
svgStr[44][16] = "Müşahidə";
svgStr[45][16] = "Minimum";
svgStr[46][16] = "Median";
svgStr[47][16] = "Maksimum";
svgStr[48][16] = "Cəm";
svgStr[49][16] = "<h3>Normallıq testi</h3>";
svgStr[50][16] = "Tezliyin riyazi gözləməsi > 5 <br> tövsiyə olunur";
svgStr[51][16] = "&chi;&#178; Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][16] = "Verilənlər<br>Empirik tezlik<br>(O<sub>i</sub>)";
svgStr[53][16] = "Normal paylanma<br>gözlənilən ehtimal<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][16] = "Normal paylanma<br>gözlənilən tezlik<br>(E<sub>i</sub>)";
svgStr[55][16] = "interval<br>&chi;&#178; qiyməti<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][16] = "cəm &chi;&#178; qiyməti";
svgStr[57][16] = "Ehtimal Histoqram va Normal Paylanma";
svgStr[58][16] = "Normal Q-Q Qrafik";
svgStr[59][16] = "Normal Kvantil";
svgStr[60][16] = "Korrelyasiya əmsalı";
svgStr[61][16] = "Təyinetmə əmsalı";
svgStr[62][16] = "Standart xəta";
svgStr[63][16] = "Dəyişənin";
svgStr[64][16] = "Dəyişənin adı";
svgStr[65][16] = "Müstəqil dəyişən";
svgStr[66][16] = "Asılı dəyişən";
svgStr[67][16] = "Parametr";
svgStr[68][16] = "Hesablanmış dəyər";
svgStr[69][16] = "Dəyər";
svgStr[70][16] = "Kəsişmə";
svgStr[71][16] = "Bucaq";
svgStr[72][16] = "Faktor";
svgStr[73][16] = "Kvadratlar cəmi";
svgStr[74][16] = "Sərbəstlik dərəcəsi";
svgStr[75][16] = "Orta kvadratlar";
svgStr[76][16] = "Reqressiya";
svgStr[77][16] = "Xəta";
svgStr[78][16] = "Cəm";
svgStr[79][16] = "<h3>Reqressiya Analizi</h3>";
svgStr[80][16] = "Standart qalıq Q-Q Qrafik";
svgStr[81][16] = "Standart qalıq";
svgStr[82][16] = "Normal Kvantil";
svgStr[83][16] = "Qalıqlar Qrafiki";
svgStr[84][16] = "Təqribiləşdirmə";
svgStr[85][16] = "İki üsulluq Dispersiya analizi";
svgStr[86][16] = "Etibarlı İnterval Qrafiki";
svgStr[87][16] = "Qalıq";
svgStr[88][16] = "iki istiqamətli statistika";
svgStr[89][16] = "Səpələnmə diaqramı matriksi";
svgStr[90][16] = "Çoxhədli müqayisə";
svgStr[91][16] = "Statistika";
svgStr[92][16] = "Faktor";
svgStr[93][16] = "Səviyyə";
svgStr[94][16] = "Cütlü Nümunə Verilənləri Qrafiki";
svgStr[95][16] = "Standart qalıq vs proqnozlaşdırma grafiki";
svgStr[96][16] = "Standart qalıq vs rıçaq grafiki";
svgStr[97][16] = "Kuk məsafəsi grafiki";
svgStr[98][16] = "Kuk məsafəsi";
svgStr[99][16] = "Verilənlərin sıralaması";
svgStr[100][16] = "Ədədi orta fərqi";
svgStr[101][16] = "Ədədi ortaların yoxlanması";
svgStr[102][16] = "Müdaxilə";
svgStr[103][16] = "Qarşılıqlı əlaqə";
svgStr[104][16] = "Sətir cəmi";
svgStr[105][16] = "Sütun cəmi";
svgStr[106][16] = "Çoxhədli korrelyasiya əmsalı";
svgStr[107][16] = "<h3>Korrelyasiya analizi</h3>";
svgStr[108][16] = "Korrelyasiya matrisi";
svgStr[109][16] = "Faktor A - Faktor B Ədədi orta grafiki";
svgStr[110][16] = "Rıçaq";
svgStr[111][16] = "Coğrafi İnformasiya Qrafiki";
svgStr[112][16] = "Təyin intervalı";
svgStr[113][16] = "Ədədi orta - standart kənarlaşma grafiki";
svgStr[114][16] = "Populyasiya Dispersiyası";
svgStr[115][16] = "Fərziyyə";
svgStr[116][16] = "Test";
svgStr[117][16] = "Dispersiya";
svgStr[118][16] = "İnterval dəyəri";
svgStr[119][16] = "Kateqoriya";
svgStr[120][16] = "Rejim";
svgStr[121][16] = "Kovariasiya";
svgStr[122][16] = "Paskal üçbucağı";
svgStr[123][16] = "Birgə Ehtimal";
svgStr[124][16] = "Şərti";
svgStr[125][16] = "Diskret Dağılma";
svgStr[126][16] = "sıra %";
svgStr[127][16] = "sütun %";
svgStr[128][16] = "ümumi %";
svgStr[129][16] = "Ştrix Qrafik Matrisi";
svgStr[130][16] = "Əvvəlki Prob";
svgStr[131][16] = "Xüsusi dəyər";
svgStr[132][16] = "Xüsusi vektor";
svgStr[133][16] = "Çoxölçülü Tezlik Cədvəli";
svgStr[134][16] = "İyerarxik Klaster Qrafiki";
svgStr[135][16] = "Məsafə";
svgStr[136][16] = "Tək";
svgStr[137][16] = "Tamamlandı";
svgStr[138][16] = "Orta";
svgStr[139][16] = "Centroid";
svgStr[140][16] = "Halta";
svgStr[141][16] = "Əlaqə";
svgStr[142][16] = "Number of Clusters <br>K";
svgStr[143][16] = "Bayes Information Criteria";
svgStr[144][16] = "Within Sum of Squares";
svgStr[145][16] = "Akaike Information Criteria";

svgStrU[1][16] = "Binomial paylanma";
svgStrU[2][16] = "Təkrar";
svgStrU[3][16] = "Ədədi orta";
svgStrU[4][16] = "Standart kənarlaşma";
svgStrU[5][16] = "Puasson Paylanma";
svgStrU[6][16] = "Həndəsi paylanma";
svgStrU[7][16] = "Hiper - Həndəsi paylanma";
svgStrU[8][16] = "Populyasiya (Ana Kütlə)";
svgStrU[9][16] = "Nümunə paylanması";
svgStrU[10][16] = "Böyük Ədədlər qanunu";
svgStrU[11][16] = "Quyruq";
svgStrU[12][16] = "baş";
svgStrU[13][16] = "qəpik baş";
svgStrU[14][16] = "Başların sayı";
svgStrU[15][16] = "Sınaqların sayı";
svgStrU[16][16] = "Nümunə ədədi ortalarının paylanması";
svgStrU[17][16] = "Təkrar";
svgStrU[18][16] = "Standart xəta";
svgStrU[19][16] = "Populyasiya ortası";
svgStrU[20][16] = "Etibarlı İnterval";
svgStrU[21][16] = "Hesablama dəqiqliyi";
svgStrU[22][16] = "Nümumənin ədədi ortası";
svgStrU[23][16] = "[TestStat]";
svgStrU[24][16] = "Paylanma";
svgStrU[25][16] = "H\u2080 rədd et";
svgStrU[26][16] = "H\u2080 qəbul et";
svgStrU[27][16] = "p-dəyər";
svgStrU[28][16] = "[Qərar] ";
svgStrU[29][16] = "[Dispersiya analizi]";
svgStrU[30][16] = "Korrelyasiya əmsalını daxil edin və İcra et düyməsini basın";
svgStrU[31][16] = "Reqressiya";
svgStrU[32][16] = "Sətir dəyişəni";
svgStrU[33][16] = "Sütun dəyişəni";
svgStrU[34][16] = "Ədədi orta"
svgStrU[35][16] = "Standart kənarlaşma"
svgStrU[36][16] = "<h3> Histoqram<br>tezlik cədvəli</h3>";
svgStrU[37][16] = "Qrup adı";
svgStrU[38][16] = "Interval";
svgStrU[39][16] = "Gövdə";
svgStrU[40][16] = "Yarpaq";
svgStrU[41][16] = "Qrup 1  yarpaq";
svgStrU[42][16] = "Qrup 2  yarpaq"
svgStrU[43][16] = "<h3>Təsviri statistika</h3>";
svgStrU[44][16] = "Müşahidə ";
svgStrU[45][16] = "Minimum";
svgStrU[46][16] = "Median";
svgStrU[47][16] = "Maksimum";
svgStrU[48][16] = "Cəm";
svgStrU[49][16] = "qüvvət";
svgStrU[50][16] = "Müntəzəm paylanma";
svgStrU[51][16] = "hesablama dəqiqliyi";
svgStrU[52][16] = "- Kliklə nöqtələri yaradın, sonra eStat reqressiya xəttini tapır.";
svgStrU[53][16] = "- Nöqtəni köçürün və ya silin. Reqressiya xəttinin dəyişməsinə baxın.";
svgStrU[54][16] = "[nümunə statistikası] ";
svgStrU[55][16] = "[nümunə 1 statistikası] ";
svgStrU[56][16] = "[nümunə 2 statistikası] ";
svgStrU[57][16] = "Etibarlı İnterval";
svgStrU[58][16] = "Sətir və sütun dəyişənləri asılı olmayandır";
svgStrU[59][16] = "Sətir və sütun dəyişənləri asılıdır";
svgStrU[60][16] = "Empirik paylanma";
svgStrU[61][16] = "Nəzəri paylanma";
svgStrU[62][16] = "Empirik tezlik üçün Uyğunluğun dərəcəsi testi";
svgStrU[63][16] = "Vilcokson Cərgələrin Cəmi Testi";
svgStrU[64][16] = "Vilkokson Cərgələrin Cəmi Testi Cədvəli";
svgStrU[65][16] = "Kruskal-Vallis Testi";
svgStrU[66][16] = "Kruskal-Vallis H paylanması";
svgStrU[67][16] = "Kruskal-Vallis H Statistikası";
svgStrU[68][16] = "Vilkokson İşarələnmiş Cərgələrin Cəmi Testi";
svgStrU[69][16] = "işarə Testi";
svgStrU[70][16] = "Fridman Test";
svgStrU[71][16] = "Fridman S Statistikası";
svgStrU[72][16] = "Fridman S paylanması";
svgStrU[73][16] = "t dəyər (və ya Z)";
svgStrU[74][16] = "ChiSq dəyəri";
svgStrU[75][16] = "Nümunə dispersiyası";
svgStrU[76][16] = "Nümunə ədədi ortalarının fərqi";
svgStrU[77][16] = "Nümunə dispersiyalarının nisbəti";
svgStrU[78][16] = "Dispersiya fərziyyəsi";
svgStrU[79][16] = "Müxtəsər Verilənlər";
svgStrU[80][16] = "Çoxsaylı seçim";
svgStrU[81][16] = "İki qrupa qədər seçin";
svgStrU[82][16] = "X dəyişəni";
svgStrU[83][16] = "Y dəyişəni";
svgStrU[84][16] = "üzrə";
svgStrU[85][16] = "Qrup Dəyişəni yoxdur";
svgStrU[86][16] = "Seçilmiş Verilənlər: ";
svgStrU[87][16] = "Emal Edilməmiş Verilənlər";
svgStrU[88][16] = "Dəyişənin adına klikləyərək dəyişənləri seçin";
svgStrU[89][16] = "Kəm müşahidələr";
svgStrU[90][16] = "Cərgələrin cəmi";
svgStrU[91][16] = "Uzunluq";
svgStrU[92][16] = "Enlik";
svgStrU[93][16] = "Ən azı bir cüt mövqe fərqlidir";
svgStrU[94][16] = "Vilkokson İşarələnmiş Cərgələrin Cəmi Paylanması";
svgStrU[95][16] = "cütlü dəyişən";
svgStrU[96][16] = "Cütlü verilənlər";
svgStrU[97][16] = "Asılı olmama testi";
svgStrU[98][16] = "Simulyasiya";
svgStrU[99][16] = "Təsadüfi Ədəd";
svgStrU[100][16] = "Normal Paylanma";
svgStrU[101][16] = "t Paylanması";
svgStrU[102][16] = "&chi;&#178; Paylanması";
svgStrU[103][16] = "F Paylanması";
svgStrU[104][16] = "HSD Studentləşdirilmiş İnterval Paylanması";
svgStrU[105][16] = "Birinci kvartil";
svgStrU[106][16] = "Üçüncü kvartil";
svgStrU[107][16] = "Kvartillərarası diapazon";
svgStrU[108][16] = "Dəyişmə əmsalı";
svgStrU[109][16] = "Toplanmış Nisbi Tezlik (%)";
svgStrU[110][16] = "Müntəzəm Paylanma tam ədədlərinin maksimum sayı";
svgStrU[111][16] = "Mausu istifadə edərək nöqtəni hərəkət etdirin";
svgStrU[112][16] = "Əvəzetmə ilə";
svgStrU[113][16] = "Əvəzetməsiz";
svgStrU[114][16] = "Xətt"; 
svgStrU[115][16] = "Faiz Dəyişikliyi";
svgStrU[116][16] = "Sadə İndeks";
svgStrU[117][16] = "Vaxt gecikməsi";
svgStrU[118][16] = "Fərq";
svgStrU[119][16] = "Avtokorrelyasiya";
svgStrU[120][16] = "Giriş";
svgStrU[121][16] = "Kvadrat Kök";
svgStrU[122][16] = "Boks-Koks";
svgStrU[123][16] = "Əsas vaxt";
svgStrU[124][16] = "Mərkəzləşdirilmiş Hərəkətli Orta";
svgStrU[125][16] = "Üstlü Hamarlama";
svgStrU[126][16] = "Mərkəzləşdirilmiş Hərəkətli Median";
svgStrU[127][16] = "Model";
svgStrU[128][16] = "Hərəkətli Orta";
svgStrU[129][16] = "İkiqat Hərəkətli Orta";
svgStrU[130][16] = "Holt İkiqat Üstlü Hamarlama";
svgStrU[131][16] = "Mövsümi İndeks";
svgStrU[132][16] = "Holt-Winters Multiplikativ Mövsümi Zaman Sırası Modeli";
svgStrU[133][16] = "Mövsümi Zaman Sırası";
svgStrU[134][16] = "Blok";
svgStrU[135][15] = "Klaster Analizi";
svgStrU[136][15] = "Klaster";
svgStrU[137][15] = "Qərar Ağacı";
svgStrU[138][15] = "Qərar Qaydasının Şərti";
svgStrU[139][15] = "Qərar";
svgStrU[140][15] = "İterasiya";
svgStrU[141][15] = "Paralel Qrafik";
svgStrU[142][15] = "Təsnifat";
svgStrU[143][15] = "Təsnifat funksiyası";
svgStrU[144][15] = "Təsnifat Nəticəsi";
svgStrU[145][15] = "Qərar";
svgStrU[146][15] = "Yanlış Təsnifat dərəcəsi";
svgStrU[147][15] = "Hüceyrə";
svgStrU[148][15] = "Təlim Məlumatı";
svgStrU[149][15] = "Məlumatların sınaqdan keçirilməsi";

// Uzbekistan
$message.uz = {
    "eStat : Stat Education SW": "eStat : statistika ta'limi dasturi",
    "Home": "Bosh sahifa",
    "Filename": "Fayl",
    "Selected Variables": "tanlangan o'zgauvchilar",
    "Cancel": "Bekor qilish",
    "Edit Variables": "Ozgaruvchini tahrirlash",
    "Level": "daraja",
    "ElementaryLevel": "B",
    "MiddleLevel": "O",
    "HighLevel": "M",
    "UniversityLevel": "U",
    "Example": "Misol",
    "New Sheets": "yangi varqlar",
    "csv Open": "csv ochiq",
    "www Open": "www ochiq",
    "json Open": "json ochiq",
    "csv Save": "csv saqlash",
    "json Save": "json saqlash",
    "Print Sheet": "chop etish",
    "Bar Graph": "Bar grafigi",
    "Pie Chart": "pie jadvali",
    "Band Graph": "Tasma grafigi",
    "Line": "chiziq",
    "Line Graph": "chiziq grafigii",
    "Dot Graph": "Nuqta grafigi",
    "Histogram": "Gistogrammai",
    "Stem & Leaf Plot": "poyasi va barglari uchastkasii",
    "maxStem": "** poyaning maksimal soni <= 30 **",
    "Box-Whisker Plot": "Quti uchastkasi",
    "Scatterplot": "tarqatiladigan fitna",
    "ScatterplotMatrix": "tarqatiladigan chizma matritsasi",
    "Frequency Table": "Chastotalar jadvali",
    "Basic Statistics": "tavsif statistikasi",
    "Testing Hypothesis &mu;": "sinov gipotezasi &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "sinov gipotezasi &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "sinov gipotezasi  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "sinov gipotezasi &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Tafovutni tahlil qilish",
    "MiddleSchool": "O'rta maktab",
    "HighSchool":   "O'rta maktab",
    "University":   "Universitet",
    "eStatHeading": "eStat - bu dinamik ma'lumotlarni vizuallashtirish va grafik statistik tahlildan foydalangan holda yaxshiroq Statistika ta'limi uchun veb-ga asoslangan bepul dastur.",
    "Support":      "Qo'llab-quvvatlash",
    "Donation":     "Xayriya",
    "Middle School Stat Education": "O'rta maktab statistikasi ta'limi",
    "High School Stat Education": "Maktab Stat Ta'lim",
    "University Stat Education": "Universitet Stat Ta'lim",
    "Elem Stat Graph Example": "Boshlang'ich maktab Grafik namunasi",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "vertikal",
    "Horizontal": "Gorizontal",
    "Vertical Separated Bar": "Vertikal ajratilgan satr",
    "Vertical Stacked Bar": "Vertikal joylashtirilgan bar",
    "Vertical Ratio Bar": "Vertikal nisbat satri",
    "Vertical Side by Side Bar": "Vertikal yon ma yon ",
    "Vertical Two Sided Bar": "Vertikal ikki tomonlama novda",
    "Horizontal Separated Bar": "Gorizontal ajratilgan satri",
    "Horizontal Stacked Bar": "Gorizontal qiya",
    "Horizontal Ratio Bar": "Gorizontal nisbat satri",
    "Horizontal Side by Side Bar": "Gorizontal yonma-yon joylashgan",
    "Horizontal Two Sided Bar": "Gorizontal ikki tomonlama satri",
    "Doughnut Graph": "Donut grafigi",
    "Two Sided Stem & Leaf Plot": "Ikki tomonlama poyasi va barglari uchastkasi",
    "Graph Save": "grafikni saqlash",
    "Graph Print": "Grafikani bosib chiqarish",
    "Move to Table": "Jadvalga o'ting",
    "Edit Title": "Sarlavhani tahrirlash",
    "Table Save": "Jadvalni saqlash",
    "Table Print": "Jadval bosma",
    "Frequency": "Chastotasi",
    "Sorting": "Tartiblash",
    "SortData": "Tartiblash",
    "Raw Data": "Xom ma'lumot",
    "Descending": "Kamayishi",
    "Ascending": "Borayotgan",
    "Mean": "anglatadi",
    "Std Deviation": "standart o'gish",
    "MeanStd": "anglatadi/standart og'ish",
    "DotMeanStd": "Nuqta grafigi - nglatadi/standart og'ish",
    "95CI": "95% ishonch oralig'i",
    "CorrelationAnalysis": "Korrelyatsiya tahlili",
    "RegressionAnalysis": "Regressiya tahlili",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "tafovutni ikki tomonlama tahlil qilish",
    "Regression": "Regressiya ",
    "RegressionLine": "Regressiya chizigi",
    "RegressionBand": "ishonch guruhi",
    "RegressionTable": "Regressiya tahlili",	
    "Frequency Polygon": "Chastotani Polygon",
    "Execute New Interval": "Yangi oraliqni bajarish",
    "Interval Start": "oraliq boshlash",
    "Interval Width": "Oraliq kengligi",
    "t-test": "t-sinov",
    "Z-test": "Z-sinov",
    "(if Z-test, enter &sigma;)": "(Agar z-sinov bolsa, &sigma; kiriting)",
    "Significance Level": "ahamiyat darajasi",
    "Execute": "Bajarish",
    "(Confidence Interval)": "(ishonch oralig'i)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Agar z-sinov bolsa, Z<sub>&alpha;/2</sub> foydalanishni kiriting)",
    "&chi;<sup>2</sup> test": "&chi;&#178;-sinov",
    "Variance Assumption": "o'zgarish tahmin",
    "Variance": "dispersiya",
    "F test": "F-sinov",
    "At least one pair of means is different": "Hech bolmaganda bita juft vosita farq qiladi",
    "Main Title": "Asosiy sarlavha",
    "y title": "y sarlavha",
    "x title": "x sarlavha",
    "yAxis": "Y o'qi",
    "Modify": "O'zgartiring",
    "Confirm": "Tasdiqlang",
    "Variable Name": "o'zgaruvchan ism",
    "Variable Value": "o'zgaruvchan qiymat",
    "Value Label": "qiymat yorlig'i",
    "* Less than nine value labels allowed.": "* To‘qqizdan kam qiymat yorlig‘iga ruxsat berilgan.",
    "Save": "Saqlash",
    "Exit": "Chiqish",
    "eStatU UnivStatEdu": "eStatU - Universitet Statistika Ta'lim SW",
    "eStatH HighStatEdu": "eStatH - Maktab Statistika Ta'lim SW",
    "eStatM MiddleStatEdu": "eStatM - Boshlang'ich / O'rta maktab statistikasi SW",
    "MiddleStat": "O'rta maktab statistikasi",
    "HighStat":   "Oliy maktab statistikasi",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Menyu",
    "Binomial Experiment": "Binominal tajriba",
    "Binomial Distribution": "Binominal Tarqatish",
    "Binomial Prob Table": "Binominal ehtimollik jadvali",
    "Poisson Distribution": "Poisson Tarqatish",
    "Poisson Prob Table": "Poisson ehtimollik jadvali",
    "Geometric Distribution": "Geometrik Tarqatish",
    "Geometric Prob Table": "Geometrik ehtimollik jadvali",
    "HyperGeometric Distribution": "GiperGeometrik Tarqatish",
    "HyperGeometric Prob Table": "GiperGeometrik ehtimollik jadvali",
    "Exponential Distribution": "Eksponensial  Tarqatish",
    "Normal Experiment": "oddiy tajriba",
    "Normal Distribution": "oddiy taqsimot",
    "Normal Approx": "oddiy yaqinlashish",
    "t Distribution": "t Tarqatish",
    "ChiSquare Distribution": "&chi;&#178; Tarqatish",
    "F Distribution": "F Tarqatish",
    "Sampling": "namuna olish",
    "Population vs Sample": "Aholisi ga qarshi namuna ",
    "Population": "Aholisi",
    "Sample": "namuna ",
    "Exponential": "Eksponensial (0.3)",
    "Uniform": "Formali(0,1)",
    "UniformDist": "Formali",
    "Sample05": "namuna olish 5%",
    "Sample10": "namuna olish 10%",
    "Sample20": "namuna olish 20%",
    "Statistics/BoxPlot": "statistika/Quti uchastkasi",
    "StatisticalProb":     "Statistik ehtimollik",
    "Law of Large Number": "kop sonli qonun",
    "Dist of Sample Means": "Namuna vositalarining tarqatish",
    "Sampling Distribution": "namuna olish Tarqatish",
    "Sample Size": "namuna hajmi",
    "Confidence Interval": "ishonch oralig'i",
    "Confidence Interval Simulation": "ishonch oralig'i simulyatsiya",
    "Simulation": "Simulyatsiya",
    "Confidence Interval Mu": "Hisoblash : &mu;",
    "Mu Confidence Interval": "Hisoblash : &mu;",
    "Confidence Interval Sigma": "Hisoblash : &sigma;&#178; ",
    "Confidence Interval P": "Hisoblash : p",
    "Estimation Accuracy": "Hisoblash Aniqlik",
    "Repetition": "takrorlash",
    "Confidence Level": "ishonch darajasi",
    "Testing Hypothesis mu_titleAB": "sinov gipotezasi anglatadi",
    "Testing Hypothesis mu_title": "sinov gipotezasi anglatadi",
    "Testing Hypothesis sigma_title": "sinov gipotezasi farqi",
    "Testing Hypothesis P_title": "sinov nisbati",
    "Testing Hypothesis mu12_title": "ikki usulni sinab ko'ring",
    "Testing Hypothesis sigma12_title": "ikkita farqni sinab ko'ring",
    "Testing Hypothesis P12_title": "ikki nisbatini sinab ko'rish",
    "Testing Hypothesis muA":  "sinov gipotezasi &mu; - C, &beta;",
    "Testing Hypothesis muAB": "sinov gipotezasi &mu; - C, n",
    "Testing Hypothesis mu": "sinov gipotezasi &mu;",
    "Testing Hypothesis sigma": "sinov gipotezasi &sigma;&#178;",
    "Testing Hypothesis P": "sinov gipotezasi p",
    "Testing Hypothesis mu12": "sinov gipotezasi &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "sinov gipotezasi &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "sinov gipotezasi p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Faktor ANOVA",
    "Testing Hypothesis ANOVA2": "2 Faktor ANOVA",
    "SameSampleSize": "Har bir hujayraning namuna o'lchami bir xil bo'lishi kerak.",
    "Testing Independence": "mustaqillik testi",
    "CategoryD": "toifasi",
    "Category": "toifasi",
    "Correlation Coefficient": "Korrelyatsiya koeffitsienti",
    "Regression Experiment": "Regressiya  eksperimenti",
    "Hypothesis": "Gipotez",
    "Test Type": "sinov turlari",
    "Z-test": "Z-sinov",
    "t-test": "t-sinov",
    "Chi-test": "&chi;&#178;-sinov",
    "F-test": "F-sinov",
    "Sampling Type": "namuna olish turi",
    "Independent Sample": "mustaqillik namunasi",
    "Paired Sample": "ulangan namuna",
    "Sample Data": "namuna malumotlari",
    "input either sample data": "csv/bsv yordamida keyingi malumotlarganamunaviy malumot yoki namunaviy statistikani kiriting",
    "input data": "Ma'lumotni kiriting",
    "Sample Statistics": "namuna statistikasi",
    "Sample Mean": "namuna ortacha",
    "Sample Variance": "namuna o'zgarishi",
    "Sample Proportion": "namuna nisbati",
    "sample range": "Namuna diapazoni",
    "control chart": "Nazorat diagrammasi",
    "sample range": "Sample Range",
    "control chart": "Control Chart",
    "if Z-test-1": "(Agar z-test bolsa,&sigma;&#178; kiritingi )",
    "if Z-test-2": "(Agar z-test bolsa, z<sub>&alpha;/2 </sub> kiritingi.)",
    "At least one pair": "Hech bolmaganda bita juft vosita farq qiladi",
    "Row-Col-0": "satr va ustun o'zgaruvchilari mustaqil",
    "Row-Col-1": "satr va ustun o'zgaruvchilari mustaqil emas",
    "Enter any number of row": "(Yuqori chap kameradan kuzatuvni kuting)",
    "Row": "Satr",
    "Column": "Ustun",
    "Probability": "Ehtimollik",
    "Show Probability": "Ehtimolni ko'rsating",
    "Regression Line": "Regressiya chizigi",
    "Erase All": "Barchasini ochirish",
    "Add Point": "Nuqtani qoshish",
    "Erase Point": "Ochirish nuqtasi",
    "Reference Site": "malumot sayti",
    "Lot Size": "Lot hajmi",
    "Defect Size": "Kamchilik olchami",
    "Defect Rate": "Nosozlik darajasi",
    "If typed": "Raqamni terganingizdan so'ng, bosing [Bajarish] yoki [Kirish]",
    "Stat/BoxPlot": "Stat/Quti uchastkasi",
    "Mean": "anglatadi",
    "Std Dev": "standart o'gish",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(bitta guruh)",
    "AnalysisVar": "Tahlil o'zgaruvcha",
    "AnalysisVar2": "Y o'zgaruvcha",
    "GroupVar": "Guruh",
    "GroupVar2": "X o'zgaruvcha",
    "GroupVar3": "Faktor1",
    "GroupVar4": "Faktor2",
    "AnalysisVarMu12": "Tahlil(or X1) o'zgaruvcha",
    "GroupVarMu12": "Guruh(or X2) o'zgaruvcha",
    "PairedMu12": " X1, X2 : ulangan ozgaruvchilar",
    "SizeVar": "Hajmi o'zgaruvcha",
    "RegressionBand": "ishonch guruhi",
    "RegressionTable": "Regressiya tahlili",
    "RegressionResidual": "qoldiq uchastkasi",
    "RegressionResidualLeverage": "Qoldiq va leverage",
    "RegressionCook": "Cook masofasi Grafigi",
    "RegressionQQ": "Qoldiq Q-Q fitna",
    "HistogramNormal": "Gistogrammai",
    "HistogramChisq": "Oddiy sinov",
    "HistogramNormalQQ": "Normal Q-Q fitna",
    "PopulationStd": "Aholisi standart o'gish",
    "Type1Error": "1- turdagi hato",
    "Type2Error": "2-turdagi hato",
    "AnovaTable": "Tafovutni tahlil qilish jadvali",
    "AnovaMeanGraph": "anglatadi ishonch oralig'i",
    "MultipleComparison": "ko'p taqqoslash",
    "ComparisonGraph": "Taqqoslash grafigi",
    "AnovaResidual": "standart Qoldiq Fitna",
    "AnovaQQ": "Qoldiq Q-Q fitna",
    "TestingFit": "kategoriyali : fit testni yaxshiligi",
    "FitTest0": "kuzatilgan va nazariy taqsimotlar bir xil",
    "FitTest1": "kuzatilgan va nazariy taqsimotlar boshqacha",
    "ObservedFreq": "kuzatilgan chastota O",
    "ExpectedProb": "kutilayotgan  ehtimollik p",
    "ExpectedFreq": "Kutilayotgan chastota E(>5)",
    "InputFitData": "Yuqori chap kameradan kuzatuvni kuting",
    "ExecuteTable": "statistika",
    "MeanDotGraph": "ishonch oralig'i Grafik",
    "ScatterRegression": "tarqatiladigan fitna",
    "Factor": "Faktor",
    "Interaction": "O'zaro tasir",
    "NoInteraction": "shovqin yo'q",
    "ExistInteraction": "mavjud o'zaro ta'sir",
    "eStatLecture": "eStat O'qish",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Parametrik emas : Wilcoxon tartib miqdori sinov", 
    "NonParametricMu12": "Parametrik emas : Wilcoxon tartib miqdori sinov : joylashuv parametrlari M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Parametrik emas : tartib miqdori sinov",
    "Sample Range": "tartib miqdori",
    "DistributionTable": "Tarqatish Jadva",
    "SignedRankTestDist": "Wilcoxon imzo tartib miqdori Dist.",
    "WilcoxonTestDist": "Wilcoxon tartib miqdori Tarqatish",
    "KruskalTestDist": "Kruskal-Wallis H Tarqatish",
    "FriedmanTestDist": "Friedman S Tarqatish",
    "SignedRankTest": "Parametrik bo'lmagan : imzo tartib miqdori sinov",
    "SignTest": "Parametrik bo'lmagan : imzo sinov",
    "SignCount": "imzolar soni",
    "KruskalTest": "Parametrik bo'lmagan : Kruskal-Wallis sinov",
    "KruskalTestANOVA": "Parametrik bo'lmagan : Kruskal-Wallis sinov",
    "Total": "Jami",
    "FriedmanTest": "Parametrik bo'lmagan : Friedman sinov",
    "FriedmanTestANOVA": "Parametrik bo'lmagan : Friedman sinov",
    "Block": "Bloklash",
    "Treatment": "Davolash",
    "At least one locations is different": "Hech bolmganda bita juft joy farq qiladi",
    "SignCondition": "Agar  n ≤ 100 Binominal sinov,  n > 100 oddiy yaqinlashish sinov",
    "WilcoxonSignCondition": "Agar  n ≤ 20 Wilcoxon tartib miqdori sinov,  n > 20 oddiy yaqinlashish sinov",
    "WilcoxonRankCondition": "Agar  n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon tartib miqdori sinov,  n>25 oddiy yaqinlashish sinov",
    "KruskalCondition": "Agar n ≤ 10 H Tarqatish sinov,  else &chi;&#178; yaqinlashish sinov",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* o'zgaruvchan tanlov : Click var name or use RHS selection box ",
    "VariableSelect3": "o'zgaruvchan tanlov",
    "VariableSelect4": "Uchdan ortiq ozgaruvchiga regressiya chiigi uchn ruhsat berilmaydi.",
    "VariableSelect5": "ko'proq x o'zgaruvchini tanlash mumkin.",
    "SummaryData": "qisqa malumotlar",
    "RawData": "Xom ma'lumot",
    "MultiSelect": "",
    "DataType": "(O'zgaruvchilarni chertish nomi bilan tanlang)",
    "by": "tomonidan",
    "NameVar": "nomi o'zgaruvcha",
    "n_variance": "n-1 formula",
    "RandomNumber": "tasodifiy raqam",
    "RealNumber":     "haqiqiy raqam",
    "IntegerNumber":  "butun son",
    "NumberData":     "Ma'lumotlar soni",
    "NumberDigit":    "O'nli raqam",
    "NormalTable":    "oddiy taqsimot jadvali",
    "Percentile":     "foizli jadval",
    "PercentileValue": "foizli",
    "StudentRangeDist": "HSD Talabalar qatorini taqsimlash",
    "copy link": "havola nusxasi",
    "WithoutReplacement": "almashtirishsiz",
    "WithReplacement":    "Qayta tiklash ekstrakti",
    "Replacement":     "Qayta tiklash ekstrakti",
    "NonReplacement":  "almashtirishsiz",
    "WordCloud":       "Word Cloud (inglizcha)",
    "oneColor":        "rang",
    "defaultColor":    "standart rang",
    "RelativeFreq":    "nisbiy chastota",
    "Density":         "Zichlik",
    "MarginOfError":   "Xato chegarasi",
    "Permutation":     "Permutatsiya",
    "PermutationSame": "Xuddi shu narsa bilan ruxsat",
    "Combination":     "Kombinatsiya",
    "NumberOfCase":    "Ishlar soni",
    "BinomialTheorem": "Binomial teorema",
    "PascalTriangle":  "Paskal uchburchagi",
    "Character":       "Emoji",
    "AdditionRule":      "Ehtimollarni qo'shish qoidasi",
    "MultiplicationRule":"Ehtimollarni ko'paytirish qoidasi",
    "ConditionalProb":   "Shartli ehtimollik",
    "JointProb":         "Qo'shma ehtimollik",
    "DiscreteDist":      "Diskret taqsimot",
    "Categorize":        "Kategoriyalash",
    "Recode":            "Qayta kodlash",
    "Compute":           "Hisoblash",
    "SelectIf":          "Agar tanlang",
    "InfoValueLabel":    "*** O'zgaruvchini tanlang, o'zgaruvchi nomini va/yoki qiymat yorlig'ini kiriting.",
    "InfoSorting":       "*** Saralash o'zgaruvchisini tanlang, 3 tagacha o'zgaruvchiga saralash usulini kiriting.",
    "InfoCategorize":    "*** Turkum uchun o'zgaruvchini tanlang, interval boshlanishi va interval kengligini kiriting.",
    "InfoRecode":        "*** Yozuv uchun o'zgaruvchini tanlang, yangi qiymat kiriting.",
    "InfoRecode2":       "* 9 tagacha qiymat yozishga ruxsat bering.",
    "InfoCompute":       "*** Quyidagi tugmalar yordamida hisoblash formulasini yarating.",
    "InfoSelectIf":      "*** 3 tagacha o'zgaruvchini tanlang, ularning shartlarini kiriting.",
    "SortingVariable":   "O'zgaruvchilarni saralash",
    "SortingMethod":     "Saralash usuli",
    "NewVariable":       "Yangi o'zgaruvchi",
    "CategoryVariable":  "O'zgaruvchini turkumlash",
    "CategoryListCheck": "Kategoriyalar ro'yxatini tekshirish",
    "CategoryInterval":  "Kategoriya oralig'i",
    "CategoryLabel":     "Kategoriya yorlig'i",
    "RecodeVariable":    "O'zgaruvchini qayta kodlash",
    "CurrentValue":      "Joriy qiymat",
    "NewValue":          "Yangi qiymat",
    "ComputeFormula":    "Formula",
    "SelectVariable":    "Tanlash uchun<br>o'zgaruvchi",
    "RelationOperator":  "Aloqa<br>operator",
    "SelectValue":       "Qiymat",
    "MissingValue":      "etishmayotgan qiymat",
    "option":            "variant",
    "TimeSeries":        "Vaqt seriyasi",                                 
    "Smoothing":         "Temizlash",
    "Filtering":         "Filtrlash",
    "Transformation":    "Transformatsiya",
    "Weight":            "Og'irlik",
    "PercentChange":     "O'zgarish foizi",
    "WeightedIndex":     "Oddiy indeks",
    "BaseTime":          "Asosiy vaqt",
    "LagTime":           "Kechikish vaqti",
    "Lag":               "Vaqtning kechikishi",
    "Forecasting":       "Prognozlash",
    "SeasonalModel":     "Mavsumiy model",
    "HoltWinter":        "Holt-Winters mavsumiy modeli",
    "Trend":             "Trend",
    "Seasonal":          "Mavsumiy",
    "Deseasonal":        "Mavsumiy seriya",
    "Nseason":           "Mavsumdagi vaqtlar",
    "Irregular":         "tartibsiz",
    "TrendModel":        "Mavsumiy trend modeli",
    "RegressionModel":   "Regressiya modeli",
    "ForecastingPeriod": "Prognoz davri",
    "CreateTable":       "Ma'lumotlar jadvali",
    "SaveTable":         "Jadvalni saqlash",
    "MA":                "Harakatlanuvchi o'rtacha",
    "EWMA":              "EWMA modeli",
    "CenterMA":          "Markazlangan harakatlanuvchi o'rtacha",
    "MovingMedian":      "Markazlangan harakatlanuvchi median",
    "ES":                "Eksponensial tekislash",
    "Default":           "Standart",
    "Linear":            "chiziqli",
    "Quadratic":         "Kvadrat",
    "Cubic":             "Kubik",
    "SquareRoot":        "Kvadrat ildiz",
    "Log":               "Logarifmik",
    "Exponent":          "eksponensial",
    "Power":             "Kuch",
    "BoxCox":            "Boks-Koks",
    "SingleMA":          "Yagona harakatlanuvchi o'rtacha",
    "SingleES":          "Yagona eksponensial tekislash",
    "DoubleMA":          "Ikki marta harakatlanuvchi o'rtacha",
    "DoubleES":          "Ikki eksponensial tekislash",
    "HoltLinear":        "Holt eksponentsial silliqlash",
    "DeseasonIntercept": "Mavsumiy kesish",
    "DeseasonSlope":     "Mavsumiy qiyalik",
    "SeasonalIndex":     "Mavsumiy indeks",
    "Diff":              "Farq",
    "DiffTime":          "Vaqt farqi",
    "AR":                "Autoregressiv model",
    "ResultTable":       "Regressiya natijasi",
    "ForecastTable":     "Prognoz jadvali",
    "HoltLevel":         "Daraja",
    "HoltTrend":         "Trend",
    "AutoCorrTable":     "Avtokorrelyatsiya jadvali",
    "DiffSeries":        "Farqlar seriyasi",
    "RawSeries":         "Xom seriya",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis",    
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Uzbekistan
appStr[0][17] = "/estat/eStat/index.html";
appStr[1][17] = "/estat/eStatH/index.html";
appStr[2][17] = "/estat/eStatU/index.html";
appStr[3][17] = "/estat/eStatE/index_en.html";
appStr[4][17] = "/estat/eHelp/index_en.html";
appStr[5][17] = "index.html";
appStr[6][17] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][17] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][17] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][17] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][17] = "";
appStr[11][17] = "Large Population Country";
appStr[12][17] = "Life Expectancy (OECD)";
appStr[13][17] = "Population Pyramid (Korea)";
appStr[14][17] = "GNP per Capita (OECD)";
appStr[15][17] = "Top World Export Country";
appStr[16][17] = "Obesity % of Population";
appStr[17][17] = "Temperature of Major City";
appStr[18][17] = "Top CO2 Emission Country";
appStr[19][17] = "Alcohol Consume (OECD)";
appStr[20][17] = "Continuous Data Graph";
appStr[21][17] = "Length of Otter";
appStr[22][17] = "Age of Teacher";
appStr[23][17] = "Age of Teacher by Sex";
appStr[24][17] = "Cleanliness of Tooth";
appStr[25][17] = "Math Exam Scores";
appStr[26][17] = "Calorie of Hamberger";
appStr[27][17] = "Height vs Weight by Sex";
appStr[28][17] = "Discrete Data Graphs";
appStr[29][17] = "";
appStr[30][17] = "";
appStr[31][17] = "unit";
appStr[32][17] = "Country";
appStr[33][17] = "Male";
appStr[34][17] = "Female";
appStr[35][17] = "Age";
appStr[36][17] = "Person";
appStr[37][17] = "billion $";
appStr[38][17] = "Export";
appStr[39][17] = "Obesity %";
appStr[40][17] = "Celsius";
appStr[41][17] = "City";
appStr[42][17] = "Jan High";
appStr[43][17] = "Jul High";
appStr[44][17] = "million ton";
appStr[45][17] = "liter/year";
appStr[46][17] = "Alcohol";
alertMsg[1][17] = "Tanlangan ozgaruvchilardan birida malumot yoq.";
alertMsg[2][17] = "o'zgaruvchilarni bir ma bir tahlil qiling.ikkita o'zgaruvchisi birinchi b'olib guruh o'zgaruvchisidir.";
alertMsg[3][17] = "tanlangan o'zgaruvchiga oid m'alumotlar yoq.";
alertMsg[4][17] = "Agar tanlangan ozgaruvchini kuzatish boshqacha bo'lsa,tahlil qilishga yol qoyilmaydi.";
alertMsg[5][17] = "juda k'op guruhlar! Ekranning o'lchamiga qarab grafiklar bir-biriga mos kelishi mumkin.";
alertMsg[6][17] = "Agar xulosa ma'lumotlaridagi tahlil ozgaruvchisi xarakterli bo'lsa, statistik tahlil qilish yoki jadvaltuzishga yol qoyilmaydi.";
alertMsg[7][17] = "Agar Hom malumotlar boyicha ozgaruvchidan koproq parametr tanlansa tahlil qilish yoki jadval tuzishga yol qoyilmaydi.";
alertMsg[8][17] = "Nuqtali grafikada kuzatishlar soni 200 dan kam b'olganda ruhsat etiladi.";
alertMsg[9][17] = "agar kuzatular soni 100 tadan kam bo'lsa,ildiz va barg barglariga ruhsat beriladi.";
alertMsg[10][17] = "Tahlil o'zgaruvchisi tanlanmagan.";
alertMsg[11][17] = "Tahlil/  guruh o'zgaruvchilari tanlanmagan.";
alertMsg[12][17] = "Agar tahlil ozgaruvchisi xarakterli bo'lsa,tahlil qilish yoki jadval yaratish taqiqlanadi.";
alertMsg[13][17] = "";
alertMsg[14][17] = "uzluksiz grafikalar va test gipotezalari uchun xulosa malumotlaridan foydalanishga yol qoyilmaydi.";
alertMsg[16][17] = "Ushbu test gipotezasi uchun faqat ikkita guruhda ruhsat beriladi.";
alertMsg[17][17] = "tarqatladigan chizma matritsasi kamida X o'zgaruvchini va Y o'zgaruvchini talab qiladi.";
alertMsg[18][17] = "Tarqaladgan uchastka uchastka uchun uchdan ortiq o'zgaruvchiga ruhsat berilmaydi.";
alertMsg[19][17] = "Agar X ozgaruvchisida belgi mavjud bolsa,tarqoq uchastka bo'lolmaydi.";
alertMsg[20][17] = "Agar malumotlarni tahlil qilish uchun xarakteristikani bajarish mumkin b'olmasa.";
alertMsg[21][17] = "Agar mavjud bo'lmagan malumotlar bo'lsa saqlashga ruxsat berilmaydi.";
alertMsg[22][17] = "Agar manfiy son bo'lsa,bar grafigini chizib bo'lmaydi.";
alertMsg[25][17] = "Agar bitta guruh bo'lsa,chizilgan grafikka ruhsat berilmaydi.";
alertMsg[27][17] = "Agar faqat bitta guruh bo'lsa,nisbatlar satrida ruxsat berilmaydi.";
alertMsg[29][17] = "Agar bitta guruh bo'lsa,chizilgan grafikka ruxsat berilmaydi.";
alertMsg[31][17] = "Agar bitta guruh bo'lsa,ikkala tomon chizigiga yol qo'yilmaydi.";
alertMsg[32][17] = "Agar manfiy son bolsa,piechart chizib bolmaydi.";
alertMsg[33][17] = "Agar manfiy son bo'lsa,dugnut grafigini chizib bo'lmaydi.";
alertMsg[34][17] = "Agar manfiy son bo'lsa,band tarmoqli grafni chizib bo'lmaydi.";
alertMsg[35][17] = "Agar manfiy son bo'lsa,chastota jadvalini tuzib bo'lmaydi.";
alertMsg[36][17] = "Ushbu diagramma faqat bita o'zgaruvchiga ruhsat berilgan.";
alertMsg[37][17] = "ushbu test gipotezasi faqat bitta o'zgaruvchiga ruhsat beriladi.";
alertMsg[38][17] = "mu bu NaN. energiya qiymatini tanlang va keyin ";
alertMsg[39][17] = "standart o'gish  nol yoki NaN ga  teng.Qayta urinish!";
alertMsg[40][17] = "Nan kirish ozgarishi.Energiya qiymatini tanlang va keyin qayta urinib ko'ring";
alertMsg[41][17] = "ushbu test gipotezasi faqat ikta o'zgaruchiga ruhsat beriladi.Guruh o'zgaruvchisida faqat ikkita guruh bo'lishi kerak.";
alertMsg[42][17] = "sinov gipotezasining sarlavhasini tahrirlashga y'ol qo'yimaydi. ";
alertMsg[43][17] = "Oddiy chiziqli regressiya faqat bitta guruhga tegishli";
alertMsg[44][17] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][17] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][17] = "Xuddi shu o'zgaruvchan raqam tanlangan.";
alertMsg[47][17] = "Chastada belgilar ma'lumotlariga ruxsat berilmagan !! Qayta urinib ko'ring.";
alertMsg[48][17] = "Belgi ma'lumotlariga ruxsat berilmagan !! Qayta urinib ko'ring.";
alertMsg[49][17] = "Kuzatuvlar soni 100 dan kam bo'lishi kerak !! Qayta urinib ko'ring.";
alertMsg[50][17] = "Raqamlarni intervalli boshlash yoki qadamda kiriting.";
alertMsg[51][17] = "Raqamlarni kiriting / Qatorlar soni bir xil bo'lishi kerak! Qayta urinib ko'ring.";
alertMsg[52][17] = "Raqamlarni kategoriya va chastotaga kiriting.";
alertMsg[53][17] = "Interval hajmi bir xil emas !! Qayta urinib ko'ring.";
alertMsg[54][17] = "X kuzatuvi Y kuzatuviga teng emas !! Qayta urinib ko'ring.";
alertMsg[55][17] = "!!! Varaqda ma'lumot yo'q.";
alertMsg[56][17] = "!!! Hech qanday o'zgaruvchi tanlanmagan";
alertMsg[57][17] = "!!! Interval boshlanishi va interval kengligini kiriting";
alertMsg[58][17] = "!!! Raqamli intervalli boshlanish va interval kengligini kiriting";
alertMsg[59][17] = "!!! 9 dan ortiq interval - interval kengligini o'zgartirish";
alertMsg[60][17] = "!!! Bu o'zgaruvchi 9 dan ortiq qiymatga ega";
alertMsg[61][17] = "!!! Hech qanday qiymat kiritilmagan";
alertMsg[62][17] = "!!! Formulani kiriting";
alertMsg[63][17] = "!!! Shartlarga javob beradigan ma'lumotlar yo'q.";
alertMsg[64][17] = "";
alertMsg[65][17] = ""; 
alertMsg[66][17] = "";
alertMsg[67][17] = "";
alertMsg[68][17] = "";
alertMsg[69][17] = "";

svgStr[1][17] = " Bar grafigi";
svgStr[2][17] = " Pie jadvali";
svgStr[3][17] = " Donut grafigi";
svgStr[4][17] = " Tasma grafigi";
svgStr[5][17] = " chiziq grafigi";
svgStr[6][17] = " Nuqta grafigi";
svgStr[7][17] = " Quti uchastkasi";
svgStr[8][17] = " poyasi va barglari uchastkasi";
svgStr[9][17] = " Gistogramma";
svgStr[10][17] = " tarqatiladigan fitna";
svgStr[11][17] = " sinov gipotezasi: Aholining ortacha miqdori";
svgStr[12][17] = " sinov gipotezasi: Aholi tafovuti";
svgStr[13][17] = " sinov gipotezasi: ikki populyatsiya degani ";
svgStr[14][17] = " sinov gipotezasi: Ikkala populyatsion farq";
svgStr[15][17] = " Tafovutni tahlil qilish";
svgStr[16][17] = "Chastotasi";
svgStr[17][17] = "nisbati";
svgStr[18][17] = "Guruh ";
svgStr[19][17] = " ";
svgStr[20][17] = "<h3>Xulosa ma'lumotlari<br>Chastotalar jadvali</h3>";
svgStr[21][17] = "Guruh o'zgaruvchisi";
svgStr[22][17] = "Satr o'zgaruvcha";
svgStr[23][17] = "Jami";
svgStr[24][17] = "Doira hajmi";
svgStr[25][17] = "<h3>Chastotalar jadvali</h3>";
svgStr[26][17] = "Tahlil o'zgaruvcha";
svgStr[27][17] = "o'zgaruvcha qiymati";
svgStr[28][17] = "qiymat yorlig'i";
svgStr[29][17] = "Chastotasi";
svgStr[30][17] = "nisbiy chastota";
svgStr[31][17] = "<h3>O'zaro faoliyat stol</h3>";
svgStr[32][17] = "Col o'zgaruvcha";
svgStr[33][17] = "Satr o'zgaruvcha";
svgStr[34][17] = "anglatadi"
svgStr[35][17] = "standart o'gish"
svgStr[36][17] = "<h3>Gistogramma<br>Chastotalar jadvali</h3>";
svgStr[37][17] = "Guruh nomi";
svgStr[38][17] = "Oraliq";
svgStr[39][17] = "poyasi";
svgStr[40][17] = " barg";
svgStr[41][17] = "Guruh 1  barg";
svgStr[42][17] = "Guruh 2  barg"
svgStr[43][17] = "<h3>Ta'rif statistikasi</h3>";
svgStr[44][17] = "Kuzatuv";
svgStr[45][17] = "eng kam";
svgStr[46][17] = "Mediya";
svgStr[47][17] = "maksimal";
svgStr[48][17] = "Jami";
svgStr[49][17] = "<h3>oddiy sinov</h3>";
svgStr[50][17] = "Kutilayotgan chastota > 5 <br> tavsiya eting";
svgStr[51][17] = "&chi;&#178; sinov<br>Oraliq i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][17] = "Data<br>kuzatilgan chastota<br>(O<sub>i</sub>)";
svgStr[53][17] = "oddiy taqsimot<br>kutilayotgan  ehtimollik<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][17] = "oddiy taqsimot<br>Kutilayotgan chastota<br>(E<sub>i</sub>)";
svgStr[55][17] = "Oraliq<br>&chi;&#178; qiymati<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][17] = "yigindi &chi;&#178; qiymati";
svgStr[57][17] = "Ehtimollik Gistogramma va oddiy taqsimot";
svgStr[58][17] = "Oddiy Q-Q fitna";
svgStr[59][17] = "Oddiy miqdor";
svgStr[60][17] = "Korrelyatsiya koeffitsienti";
svgStr[61][17] = "Aniqlash koeffitsienti";
svgStr[62][17] = "standart hato";
svgStr[63][17] = "o'zgaruvcha";
svgStr[64][17] = "o'zgaruvchan ism";
svgStr[65][17] = "mustaqillik ozgruvchisi";
svgStr[66][17] = "Bogliq o'zgaruvchi";
svgStr[67][17] = "Parametr";
svgStr[68][17] = "Hisoblangan qiymat";
svgStr[69][17] = "qiymati";
svgStr[70][17] = "Tutish";
svgStr[71][17] = "qiyalik";
svgStr[72][17] = "Faktor";
svgStr[73][17] = "kvdratlar yigindisi";
svgStr[74][17] = "Erkinlik darajasi";
svgStr[75][17] = "ortacha kvadratlar";
svgStr[76][17] = "Regressiya ";
svgStr[77][17] = "Xato";
svgStr[78][17] = "Jami";
svgStr[79][17] = "<h3>Regressiya tahlili</h3>";
svgStr[80][17] = "standart Qoldiq Q-Q fitna";
svgStr[81][17] = "standart Qoldiq";
svgStr[82][17] = "Oddiy miqdor";
svgStr[83][17] = "qoldiq uchastkasi";
svgStr[84][17] = "Bashoratli qiymat";
svgStr[85][17] = "ikki tomonlama ANOVA";
svgStr[86][17] = "ishonch oralig'i Grafigi";
svgStr[87][17] = "qoldiq";
svgStr[88][17] = "Ikki o'lchovli Statistika";
svgStr[89][17] = "tarqatiladigan chizma matritsasi";
svgStr[90][17] = "ko'p taqqoslash";
svgStr[91][17] = "statistika";
svgStr[92][17] = "Faktor";
svgStr[93][17] = "daraja";
svgStr[94][17] = "ulangan namuna Malumotlar Grafigi";
svgStr[95][17] = "standart Qoldiq va Prognozlash Fitna";
svgStr[96][17] = "standart Qoldiq va Leverage Fitna";
svgStr[97][17] = "Cook masofa Grafigi";
svgStr[98][17] = "Cook masofa";
svgStr[99][17] = "Malumotlar buyurtma qilish";
svgStr[100][17] = "ortacha farq";
svgStr[101][17] = "sinov manosi";
svgStr[102][17] = "Davolash";
svgStr[103][17] = "O'zaro tasir";
svgStr[104][17] = "Satr Jami";
svgStr[105][17] = "Ustun Jami";
svgStr[106][17] = "Ko'p korrelyatsiyakoeffisienti";
svgStr[107][17] = "<h3>Korrelyatsion Tahlil</h3>";
svgStr[108][17] = "Korrelyatsiya matritsasi";
svgStr[109][17] = "Faktor A - Faktor B Anglatadi Grafigi";
svgStr[110][17] = "Leverage";
svgStr[111][17] = "Geographic Information Graph";
svgStr[112][17] = "qator";
svgStr[113][17] = "anglatadi - standart o'gish Grafigi";
svgStr[114][17] = "Aholi tafovuti";
svgStr[115][17] = "Gipotez";
svgStr[116][17] = "sinov";
svgStr[117][17] = "dispersiya";
svgStr[118][17] = "Interval qiymati";
svgStr[119][17] = "toifasi";
svgStr[120][17] = "Rejim";
svgStr[121][17] = "Kovariatsiya";
svgStr[122][17] = "Paskal uchburchagi";
svgStr[123][17] = "Qo'shma ehtimollik";
svgStr[124][17] = "shartli";
svgStr[125][17] = "Diskret taqsimot";
svgStr[126][17] = "qator %";
svgStr[127][17] = "ustun %";
svgStr[128][17] = "jami %";
svgStr[129][17] = "Strixli grafik matritsasi";
svgStr[130][17] = "Oldin tekshiruv";
svgStr[131][17] = "Xususiy qiymat";
svgStr[132][17] = "Xususiy vektor";
svgStr[133][17] = "Ko'p o'lchovli chastotalar jadvali";
svgStr[134][17] = "Ierarxik klaster grafigi";
svgStr[135][17] = "Masofa";
svgStr[136][17] = "Yagona";
svgStr[137][17] = "To'liq";
svgStr[138][17] = "O'rtacha";
svgStr[139][17] = "Centroid";
svgStr[140][17] = "Bo'lim";
svgStr[141][17] = "Bog'lanish";
svgStr[142][17] = "Number of Clusters <br>K";
svgStr[143][17] = "Bayes Information Criteria";
svgStr[144][17] = "Within Sum of Squares";
svgStr[145][17] = "Akaike Information Criteria";

svgStrU[1][17] = "Binominal Tarqatish";
svgStrU[2][17] = "takrorlash";
svgStrU[3][17] = "anglatadi";
svgStrU[4][17] = "standart o'gish";
svgStrU[5][17] = "Poisson Tarqatish";
svgStrU[6][17] = "Geometrik Tarqatish";
svgStrU[7][17] = "GiperGeometrik Tarqatish";
svgStrU[8][17] = "Aholisi";
svgStrU[9][17] = "namuna Dist";
svgStrU[10][17] = "kop sonli qonun";
svgStrU[11][17] = "tanga dumi";
svgStrU[12][17] = "tanga boshi";
svgStrU[13][17] = "tanga boshi";
svgStrU[14][17] = "tanga boshlarining soni";
svgStrU[15][17] = "sinovlar soni";
svgStrU[16][17] = "Namuna vositalarining tarqatish";
svgStrU[17][17] = "takrorlash";
svgStrU[18][17] = "standart hato";
svgStrU[19][17] = "Aholining ortacha miqdori";
svgStrU[20][17] = "ishonch oralig'i";
svgStrU[21][17] = "Hisoblash Aniqlik";
svgStrU[22][17] = "namuna  mean";
svgStrU[23][17] = "[sinovStat]";
svgStrU[24][17] = "Tarqatish";
svgStrU[25][17] = "rad qiling H\u2080";
svgStrU[26][17] = "qabul qiling H\u2080";
svgStrU[27][17] = "p-qiymati";
svgStrU[28][17] = "[Qaror] ";
svgStrU[29][17] = "[Tafovutni tahlil qilish]";
svgStrU[30][17] = "kiriting Korrelyatsiya koeffitsienti, bosing [Bajarish]";
svgStrU[31][17] = "Regressiya ";
svgStrU[32][17] = "Satr o'zgaruvcha";
svgStrU[33][17] = "Ustun o'zgaruvcha";
svgStrU[34][17] = "anglatadi"
svgStrU[35][17] = "standart o'gish"
svgStrU[36][17] = "<h3> Gistogramma<br>Chastotalar jadvali</h3>";
svgStrU[37][17] = "Guruh nomi";
svgStrU[38][17] = "Oraliq";
svgStrU[39][17] = "poyasi";
svgStrU[40][17] = " barg";
svgStrU[41][17] = "Guruh 1  barg";
svgStrU[42][17] = "Guruh 2  barg"
svgStrU[43][17] = "<h3>Tavsif statistikasi</h3>";
svgStrU[44][17] = "Kuzatuv";
svgStrU[45][17] = "Eng kam";
svgStrU[46][17] = "Mediya";
svgStrU[47][17] = "Maksimal";
svgStrU[48][17] = "Jami";
svgStrU[49][17] = "Eksponensial ";
svgStrU[50][17] = "Formali";
svgStrU[51][17] = "Hisoblash Aniqlik";
svgStrU[52][17] = "- Klik orqali oching va regressni toping.";
svgStrU[53][17] = "- bir nuqtani siljiting yoki ochirib tashlang.";
svgStrU[54][17] = "[namuna Statistika] ";
svgStrU[55][17] = "[namuna 1 Statistika] ";
svgStrU[56][17] = "[namuna 2 Statistika] ";
svgStrU[57][17] = "ishonch darajasi";
svgStrU[58][17] = "Satr & Ustun Independent";
svgStrU[59][17] = "Satr & Ustun Dependent";
svgStrU[60][17] = "kuzatilgan taqsimot";
svgStrU[61][17] = "nazariy taqsimot";
svgStrU[62][17] = "Fit testni yaxshiligi";
svgStrU[63][17] = "Wilcoxon tartib miqdori sinov";
svgStrU[64][17] = "Wilcoxon tartib miqdori sinov Jadva";
svgStrU[65][17] = "Kruskal-Wallis sinov";
svgStrU[66][17] = "Kruskal-Wallis H Tarqatish";
svgStrU[67][17] = "Kruskal-Wallis H Statistic";
svgStrU[68][17] = "Wilcoxon imzo tartib miqdori sinov";
svgStrU[69][17] = "imzo sinov";
svgStrU[70][17] = "Friedman sinov";
svgStrU[71][17] = "Friedman S Statistic";
svgStrU[72][17] = "Friedman S Tarqatish";
svgStrU[73][17] = "t qiymati (or Z)";
svgStrU[74][17] = "ChiSq qiymati";
svgStrU[75][17] = "namuna o'zgarish";
svgStrU[76][17] = "Difference of namuna  Means";
svgStrU[77][17] = "Ratio of namuna  Variances";
svgStrU[78][17] = "Variance Assumption";
svgStrU[79][17] = "Summary Data";
svgStrU[80][17] = "Multiple Selection";
svgStrU[81][17] = "Select up to two groups";
svgStrU[82][17] = "X o'zgaruvcha";
svgStrU[83][17] = "Y o'zgaruvcha";
svgStrU[84][17] = "tomonidan";
svgStrU[85][17] = "Guruh o'zgaruvchisi yo'q";
svgStrU[86][17] = "STanlangan ma'lumotlar: ";
svgStrU[87][17] = "Xom ma'lumot";
svgStrU[88][17] = "O'zgaruvchilarni chertish nomi bilan tanlang";
svgStrU[89][17] = "yoqolga kuzatishlar";
svgStrU[90][17] = "tartib miqdori";
svgStrU[91][17] = "Longitude";
svgStrU[92][17] = "Latitude";
svgStrU[93][17] = "Hech bolmganda bita juft joy farq qiladi";
svgStrU[94][17] = "Wilcoxon imzo tartib miqdori Tarqatish";
svgStrU[95][17] = "ulangan ozgaruvchilar";
svgStrU[96][17] = "ulangan namuna";
svgStrU[97][17] = "mustaqillik sinovi";
svgStrU[98][17] = "simulyatsiya";
svgStrU[99][17] = "tasodifiy raqam";
svgStrU[100][17] = "oddiy taqsimot";
svgStrU[101][17] = "t Tarqatish";
svgStrU[102][17] = "&chi;&#178; Tarqatish";
svgStrU[103][17] = "F Tarqatish";
svgStrU[104][17] = "HSD Talabalar qatori Tarqatish";
svgStrU[105][17] = "birinchi kvartil";
svgStrU[106][17] = "uchinchi kvartil";
svgStrU[107][17] = "kvartil oralig'i Range";
svgStrU[108][17] = "O'zgarish koeffitsienti";
svgStrU[109][17] = "To'plangan nisbiy chastota (%)";
svgStrU[110][17] = "Maksimal butun sonlar Formali Tarqatish";
svgStrU[111][17] = "Sichqoncha yordamida nuqtani siljiting";
svgStrU[112][17] = "Qayta tiklash ekstrakti";
svgStrU[113][17] = "almashtirishsiz";
svgStrU[114][17] = "chiziq"; 
svgStrU[115][17] = "Foiz o'zgarishi";
svgStrU[116][17] = "Oddiy indeks";
svgStrU[117][17] = "Vaqtdagi kechikish";
svgStrU[118][17] = "Farq";
svgStrU[119][17] = "Avtokorrelyatsiya";
svgStrU[120][17] = "Jurnal";
svgStrU[121][17] = "Kvadrat ildiz";
svgStrU[122][17] = "Boks-Koks";
svgStrU[123][17] = "Asosiy vaqt";
svgStrU[124][17] = "Markazlangan harakatlanuvchi o'rtacha";
svgStrU[125][17] = "Eksponensial tekislash";
svgStrU[126][17] = "Markazlangan harakatlanuvchi median";
svgStrU[127][17] = "Model";
svgStrU[128][17] = "Harakatlanuvchi o'rtacha";
svgStrU[129][17] = "Ikki marta harakatlanuvchi o'rtacha";
svgStrU[130][17] = "Holt ikki tomonlama eksponensial tekislash";
svgStrU[131][17] = "Mavsumiy indeks";
svgStrU[132][17] = "Holt-Winters multiplikativ mavsumiy modeli";
svgStrU[133][17] = "Mavsumiy seriya";
svgStrU[134][17] = "Bloklash";
svgStrU[135][17] = "Klaster tahlili";
svgStrU[136][17] = "Klaster";
svgStrU[137][17] = "Qaror daraxti";
svgStrU[138][17] = "Qaror qoidasi sharti";
svgStrU[139][17] = "Qaror";
svgStrU[140][17] = "Iteratsiya";
svgStrU[141][17] = "Parallel grafik";
svgStrU[142][17] = "Tasniflash";
svgStrU[143][17] = "Tasniflash funktsiyasi";
svgStrU[144][17] = "Tasniflash natijasi";
svgStrU[145][17] = "Qaror";
svgStrU[146][17] = "Noto'g'ri tasniflash darajasi";
svgStrU[147][17] = "Hujayra";
svgStrU[148][17] = "O'quv ma'lumotlari";
svgStrU[149][17] = "Sinov ma'lumotlari";

// Russian
$message.ru = {
    "eStat : Stat Education SW": "eStat : Статистическое образование SW",
    "Home": "Домашняя страница",
    "Filename": "файл",
    "Selected Variables": "Выбранные переменные",
    "Cancel": "Отмена",
    "Edit Variables": "Редактировать переменные",
    "Level": "Уровень",
    "ElementaryLevel": "Начальная",
    "MiddleLevel": "Средняя",
    "HighLevel": "старшая",
    "UniversityLevel": "Университет",
    "Example": "Пример",
    "New Sheets": "Новые листы",
    "csv Open": "csv Открыть",
    "www Open": "www Открыть",
    "json Open": "json Открыть",
    "csv Save": "csv Сохранить",
    "json Save": "json Сохранить",
    "Print Sheet": "Печать листа",
    "Bar Graph": "Столбиковая диаграмма",
    "Pie Chart": "Круговая диаграмма",
    "Band Graph": "Полосная диаграмма",
    "Line": "Линейный",
    "Line Graph": "Линейный график",
    "Dot Graph": "Точечный график",
    "Histogram": "Гистограмма",
    "Stem & Leaf Plot": "Диаграмма стебель-лист",
    "maxStem": "** максимальное количество стволов <= 30 **",
    "Box-Whisker Plot": "Коробочный сюжет",
    "Scatterplot": "Точечная диаграмма",
    "ScatterplotMatrix": "Матрица точечных диаграмм",
    "Frequency Table": "Таблица частот",
    "Basic Statistics": "Дескриптивная статистика",
    "Testing Hypothesis &mu;": "Тестирование гипотезы &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Тестирование гипотезы &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Тестирование гипотезы  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Тестирование гипотезы &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Дисперсионный анализ",
    "MiddleSchool": "Средняя школа",
    "HighSchool":   "Средняя школа",
    "University":   "Университет",
    "eStatHeading": "eStat — это бесплатное веб-программное обеспечение для лучшего статистического образования с использованием динамической визуализации данных и графического статистического анализа.",
    "Support":      "Поддерживать",
    "Donation":     "Пожертвование",
    "Middle School Stat Education": "Статистическое образование в средней школе",
    "High School Stat Education": "Статистика для старших классов школы",
    "University Stat Education": "Статистика для высшего образования",
    "Elem Stat Graph Example": "Пример графика",
    "Learning eStat w Example": "eStat ?",
    "Vertical": "Вертикаль",
    "Horizontal": "Горизонталь",
    "Vertical Separated Bar": "Вертикально разделенный столбик",
    "Vertical Stacked Bar": "Вертикальный столбик с накоплением",
    "Vertical Ratio Bar": "Вертикальный столбик соотношений",
    "Vertical Side by Side Bar": "Вертикальные параллельные столбцы бок о бок",
    "Vertical Two Sided Bar": "Вертикальный двухсторонний столбик",
    "Horizontal Separated Bar": "Горизонтально разделенный столбец",
    "Horizontal Stacked Bar": "Горизонтально сложенный столбец",
    "Horizontal Ratio Bar": "Горизонтальный столбец соотношения",
    "Horizontal Side by Side Bar": "Горизонтальные столбцы бок о бок",
    "Horizontal Two Sided Bar": "Горизонтальный двухсторонний столбец",
    "Doughnut Graph": "Пончик",
    "Two Sided Stem & Leaf Plot": "Двухсторонняя диаграмма стебель-лист",
    "Graph Save": "Сохранить график",
    "Graph Print": "Печать графика",
    "Move to Table": "Перенести в таблицу ",
    "Edit Title": "Редактировать заголовок",
    "Table Save": "Сохранение таблицы",
    "Table Print": "Печать таблицы",
    "Frequency": "Частота",
    "Sorting": "Сортировка",
    "SortData": "Сортировка",
    "Raw Data": "Необработанные данные",
    "Descending": "По убыванию",
    "Ascending": "По возрастанию",
    "Mean": "Среднее значение",
    "Std Deviation": "Среднеквадратичное отклонение",
    "MeanStd": "Среднее значение/Среднеквадратичное отклонение",
    "DotMeanStd": "Точечный график - Среднее значение/Среднеквадратичное отклонение",
    "95CI": "95% Доверительный интервал",
    "CorrelationAnalysis": "Корреляционный анализ",
    "RegressionAnalysis": "Регрессионный анализ",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "Двусторонний дисперсионный анализ",
    "Regression": "Регрессия",
    "RegressionLine": "Линия регрессии",
    "RegressionBand": "Доверительная полоса",
    "RegressionTable": "Регрессионный анализ",	
    "Frequency Polygon": "Полигон частот",
    "Execute New Interval": "Выполнить новый интервал",
    "Interval Start": "Начало интервала",
    "Interval Width": "Начало интервала",
    "t-test": "t-Тест",
    "Z-test": "Z-Тест",
    "(if Z-test, enter &sigma;)": "(Если Z-тест, то введите сигму &sigma;)",
    "Significance Level": "Уровень значимости",
    "Execute": "Выполнить",
    "(Confidence Interval)": "(Доверительный интервал)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Если z-тест, то используйте Z<sub>&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;&#178;-Тест",
    "Variance Assumption": "Допущение дисперсии",
    "Variance": "отклонение",
    "F test": "F-Тест",
    "At least one pair of means is different": "Минимум одна пара средних отличается",
    "Main Title": "Основной заголовок",
    "y title": "Заголовок y",
    "x title": "Заголовок х",
    "yAxis": "Ось Y",
    "Modify": "Изменить",
    "Confirm": "Подтверждение",
    "Variable Name": "Название переменной",
    "Variable Value": "Значение переменной",
    "Value Label": "Метка значения",
    "* Less than nine value labels allowed.": "* Допускается менее девяти меток значений.",
    "Save": "Сохранить",
    "Exit": "Выход",
    "eStatU UnivStatEdu": "eStatU - Статистика для высшего образования SW",
    "eStatH HighStatEdu": "eStatH - Статистика для старших классов школы SW",
    "eStatM MiddleStatEdu": "eStatM - Элементарный / Статистика средней школы SW",
    "MiddleStat": "Статистика средней школы",
    "HighStat":   "Статистика средней школы",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "webBook Link (English)",
    "Menu": "Меню",
    "Binomial Experiment": "Биномиальный эксперимент",
    "Binomial Distribution": "Биномиальное распределение",
    "Binomial Prob Table": "Биномиальная таблица вероятностей",
    "Poisson Distribution": "Распределение Пуассона",
    "Poisson Prob Table": "Таблицы вероятностей Пуассона",
    "Geometric Distribution": "Геометрическое распределение",
    "Geometric Prob Table": "Таблица геометрического распределения вероятностей",
    "HyperGeometric Distribution": "Гипергеометрическое распределение",
    "HyperGeometric Prob Table": "Таблица гипергеометрического распределения вероятностей",
    "Exponential Distribution": "Экспоненциальное распределение",
    "Normal Experiment": "Проверка нормальности",
    "Normal Distribution": "Нормальное распределение",
    "Normal Approx": "Нормальное приближение",
    "t Distribution": "t Распределение",
    "ChiSquare Distribution": "&chi;&#178; Распределение",
    "F Distribution": "F Распределение",
    "Sampling": "Формирование выборки",
    "Population vs Sample": "Генеральная совокупность против Выборка",
    "Population": "Генеральная совокупность",
    "Sample": "Выборка",
    "Exponential": "Экспоненциальный(0.3)",
    "Uniform": "Равномерно(0,1)",
    "UniformDist": "Равномерно",
    "Sample05": "Формирование выборки 5%",
    "Sample10": "Формирование выборки 10%",
    "Sample20": "Формирование выборки 20%",
    "Statistics/BoxPlot": "Статистика/BoxPlot",
    "StatisticalProb":     "Статистическая вероятность",
    "Law of Large Number": "Закон больших чисел",
    "Dist of Sample Means": "Выборочное распределение средних значений",
    "Sampling Distribution": "Формирование выборки Распределение",
    "Sample Size": "Размер выборки",
    "Confidence Interval": "Доверительный интервал",
    "Confidence Interval Simulation": "Доверительный интервал Симуляция",
    "Simulation": "Симуляция",
    "Confidence Interval Mu": "Oценки : &mu;",
    "Mu Confidence Interval": "Oценки : &mu;",
    "Confidence Interval Sigma": "Oценки : &sigma;&#178; ",
    "Confidence Interval P": "Oценки : p",
    "Estimation Accuracy": "Точность оценки",
    "Repetition": "Повторение",
    "Confidence Level": "Уровень доверия",
    "Testing Hypothesis mu_titleAB": "Проверка среднего значения",
    "Testing Hypothesis mu_title": "Проверка среднего значения",
    "Testing Hypothesis sigma_title": "Проверка дисперсии",
    "Testing Hypothesis P_title": "Проверка соответствия пропорций ",
    "Testing Hypothesis mu12_title": "Сравнение двух средних",
    "Testing Hypothesis sigma12_title": "Сравнение двух дисперсий",
    "Testing Hypothesis P12_title": "Сравнение двух пропорций",
    "Testing Hypothesis muA":  "Тестирование гипотезы &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Тестирование гипотезы &mu; - C, n",
    "Testing Hypothesis mu": "Тестирование гипотезы &mu;",
    "Testing Hypothesis sigma": "Тестирование гипотезы &sigma;&#178;",
    "Testing Hypothesis P": "Тестирование гипотезы p",
    "Testing Hypothesis mu12": "Тестирование гипотезы &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Тестирование гипотезы &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Тестирование гипотезы p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 фактор ANOVA",
    "Testing Hypothesis ANOVA2": "2 фактор ANOVA",
    "SameSampleSize": "Размер выборки каждой ячейки должен быть одинаковым.",
    "Testing Independence": "категорический: Проверка гипотезы независимости",
    "CategoryD": "категория",
    "Category": "категория",
    "Correlation Coefficient": "Коэффициент корреляции",
    "Regression Experiment": "Регрессионный эксперимент",
    "Hypothesis": "Коэффициент корреляции",
    "Test Type": "Тип теста",
    "Z-test": "Z-Тест",
    "t-test": "t-Тест",
    "Chi-test": "&chi;&#178;-Тест",
    "F-test": "F-Тест",
    "Sampling Type": "Формирование выборки Type",
    "Independent Sample": "Независимая выборка",
    "Paired Sample": "Парные выборки",
    "Sample Data": "Данные выборки",
    "input either sample data": "Введите выборочные данные или выборочную статистику в следующие поля, используя csv / bsv",
    "input data": "Введите данные",
    "Sample Statistics": "Статистика выборки",
    "Sample Mean": "Среднее значение выборки",
    "Sample Variance": "Коэффициент вариации выборки",
    "Sample Proportion": "Пропорция выборки",
    "sample range": "Диапазон выборки",
    "control chart": "Контрольная диаграмма",
    "if Z-test-1": "(Если Z-тест, то введите дисперсию &sigma;&#178;)",
    "if Z-test-2": "(Если z-тест, то используйте z<sub>&alpha;/2 </sub>.)",
    "At least one pair": "Минимум одна пара средних отличается",
    "Row-Col-0": "Переменные строки и столбца независимы",
    "Row-Col-1": "Переменные строки и столбца не являются независимыми",
    "Enter any number of row": "(Ввести наблюдение с верхней левой ячейки)",
    "Row": "Строка",
    "Column": "Столбец",
    "Probability": "Вероятность",
    "Show Probability": "Показать Вероятность",
    "Regression Line": "Линия регрессии",
    "Erase All": "Стереть все",
    "Add Point": "Добавить точку",
    "Erase Point": "Стереть точку",
    "Reference Site": "Справочный сайт",
    "Lot Size": "Размер лота",
    "Defect Size": "Размер дефекта",
    "Defect Rate": "Дефектный процент",
    "If typed": "После ввода номера нажмите [Выполнить] или [Ввести]",
    "Stat/BoxPlot": "Статистика/Коробочный сюжет",
    "Mean": "Среднее значение",
    "Std Dev": "Среднеквадратичное отклонение",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(Одна группа.)",
    "AnalysisVar": "Переменная анализа",
    "AnalysisVar2": "Y переменной",
    "GroupVar": "Группа",
    "GroupVar2": "X переменной",
    "GroupVar3": "фактор 1",
    "GroupVar4": "фактор 2",
    "AnalysisVarMu12": "Анализ(or X1) переменной",
    "GroupVarMu12": "Группа(or X2) переменной",
    "PairedMu12": " X1, X2 : Парные переменной",
    "SizeVar": "Размер переменной",
    "RegressionBand": "Доверительная полоса",
    "RegressionTable": "Регрессионный анализ",
    "RegressionResidual": "Диаграмма рассеяния остатков",
    "RegressionResidualLeverage": "Остаток против Влияние наблюдений",
    "RegressionCook": "Cook's Distance График",
    "RegressionQQ": "Остаток График КК",
    "HistogramNormal": "Гистограмма",
    "HistogramChisq": "Нормальное распределение Тест",
    "HistogramNormalQQ": "Нормальное распределение График КК",
    "PopulationStd": "Генеральная совокупность Среднеквадратичное отклонение",
    "Type1Error": "Ошибка первого рода",
    "Type2Error": "Ошибка второго рода",
    "AnovaTable": "Дисперсионный анализ таблицы",
    "AnovaMeanGraph": "Среднее значение Доверительный интервал",
    "MultipleComparison": "Множественное сравнение",
    "ComparisonGraph": "График сравнения",
    "AnovaResidual": "стандартизированы Диаграмма рассеяния остатков",
    "AnovaQQ": "Остаток График КК",
    "TestingFit": "категорический : Анализ степени согласия гипотетического распределения с наблюдаемыми данными",
    "FitTest0": "Наблюдаемые и теоретические распределения одинаковы",
    "FitTest1": "Наблюдаемые и теоретические распределения различны",
    "ObservedFreq": "Наблюдаемая частота O",
    "ExpectedProb": "Ожидаемая вероятность p",
    "ExpectedFreq": "Ожидаемая частота E(>5)",
    "InputFitData": "Ввести наблюдение с верхней левой ячейки",
    "ExecuteTable": "Статистика",
    "MeanDotGraph": "Доверительный интервал График",
    "ScatterRegression": "Точечная диаграмма",
    "Factor": "фактор",
    "Interaction": "Взаимодействие",
    "NoInteraction": "Нет взаимодействия",
    "ExistInteraction": "Существующее взаимодействие",
    "eStatLecture": "Вводная лекция eStat",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Непараметрические : Критерий суммы рангов Уилкоксона независимых измерений", 
    "NonParametricMu12": "Непараметрические : Критерий суммы рангов Уилкоксона независимых измерений : Location Parameter M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Непараметрические : Сумма рангов Тест",
    "Sample Range": "Сумма рангов",
    "DistributionTable": "Распределение таблицы",
    "SignedRankTestDist": "Распределение суммы рангов Уилкоксона парных измерений",
    "WilcoxonTestDist": "Вилкоксона Сумма рангов Распределение",
    "KruskalTestDist": "Крускала-Уоллиса H Распределение",
    "FriedmanTestDist": "Фридман S Распределение",
    "SignedRankTest": "Непараметрические : Критерий суммы рангов Уилкоксона (Т-критерий Уилкоксона) парных измерений",
    "SignTest": "Непараметрические : Критерий знаков",
    "SignCount": "Количество знаков",
    "KruskalTest": "Непараметрические : Крускала-Уоллиса Тест",
    "KruskalTestANOVA": "Непараметрические : Крускала-Уоллиса Тест",
    "Total": "Итого",
    "FriedmanTest": "Непараметрические : Фридман Тест",
    "FriedmanTestANOVA": "Непараметрические : Фридман Тест",
    "Block": "Блок",
    "Treatment": "Обработка",
    "At least one locations is different": "Минимум одна пара мест отличается",
    "SignCondition": "Если n ≤ 100 Биноминальный тест,  n > 100 Нормальное приближение Тест",
    "WilcoxonSignCondition": "Если n ≤ 20 Вилкоксона Сумма рангов Тест,  n > 20 Нормальное приближение Тест",
    "WilcoxonRankCondition": "Если n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Вилкоксона Сумма рангов Тест,  n>25 Нормальное приближение Тест",
    "KruskalCondition": "Если n ≤ 10 H Распределение Тест, еще &chi;&#178; приближение Тест",
    "VariableSelect":  "* Data Analysis : Load File >> Select Variables >>  Click Icon",
    "VariableSelect2": "* Variable Selection : Click var name or use RHS selection box ",
    "VariableSelect3": "Выбор переменной",
    "VariableSelect4": "Может быть выбрана дополнительная переменная анализа",
    "VariableSelect5": "Больше переменных X может быть выбрано ",
    "SummaryData": "Сводные данные ",
    "RawData": "Необработанные данные",
    "MultiSelect": "",
    "DataType": "(Выберите переменные, кликнув на название переменной)",
    "by": "по",
    "NameVar": "Название переменной",
    "n_variance": "n-1 формула",
    "RandomNumber": "Случайное число",
    "RealNumber":     "настоящий номер",
    "IntegerNumber":  "Целое число",
    "NumberData":     "Количество данных",
    "NumberDigit":    "Десятичная цифра",
    "NormalTable":    "Нормальное распределение таблицы",
    "Percentile":     "Перцентильная таблицы",
    "PercentileValue": "Перцентильная",
    "StudentRangeDist": "Стьюдентизированное распределение диапазонов",
    "copy link": "копия ссылки",
    "WithoutReplacement": "без заменыt",
    "WithReplacement":    "Восстановление извлечения",
    "Replacement":     "Восстановление извлечения",
    "NonReplacement":  "без заменыt",
    "WordCloud":       "Облако слов (английский)",
    "oneColor":        "цветr",
    "defaultColor":    "цвет по умолчанию",
    "RelativeFreq":    "Относительная частота",
    "Density":         "Плотность",
    "MarginOfError":   "Допустимая погрешность",
    "Permutation":     "Перестановка",
    "PermutationSame": "Перестановка с тем же",
    "Combination":     "Комбинация",
    "NumberOfCase":    "Кол-во кейсов",
    "BinomialTheorem": "Биномиальная теорема",
    "PascalTriangle":  "Треугольник Паскаля",
    "Character":       "Эмодзи",
    "AdditionRule":      "Правило сложения вероятности",
    "MultiplicationRule":"Правило умножения вероятности",
    "ConditionalProb":   "Условная возможность",
    "JointProb":         "Совместная вероятность",
    "DiscreteDist":      "Дискретное распределение",
    "Categorize":        "Классифицировать",
    "Recode":            "Перекодировать",
    "Compute":           "Вычислить",
    "SelectIf":          "Выбрать если",
    "InfoValueLabel":    "*** Выберите переменную, введите имя переменной и / или метку значения.",
    "InfoSorting":       "*** Выберите переменную сортировки, введите метод сортировки до 3-х переменных.",
    "InfoCategorize":    "*** Выберите переменную для категории, введите начало интервала и ширину интервала.",
    "InfoRecode":        "*** Выберите переменную для записи, введите новое значение.",
    "InfoRecode2":       "* Разрешить запись до 9 значений.",
    "InfoCompute":       "*** Создайте формулу вычисления с помощью кнопок ниже.",
    "InfoSelectIf":      "*** Выберите до 3 переменных, введите их условия.",
    "SortingVariable":   "Сортировка переменных",
    "SortingMethod":     "Метод сортировки",
    "NewVariable":       "Новая переменная",
    "CategoryVariable":  "Категоризация переменной",
    "CategoryListCheck": "Проверка списка категорий",
    "CategoryInterval":  "Интервал категорий",
    "CategoryLabel":     "Метка категории",
    "RecodeVariable":    "Перекодировать переменную",
    "CurrentValue":      "Текущая стоимость",
    "NewValue":          "Новая ценность",
    "ComputeFormula":    "Формула",
    "SelectVariable":    "Переменная <br> для выбора",
    "RelationOperator":  "Связь <br> Оператор",
    "SelectValue":       "Ценить",
    "MissingValue":      "отсутствующее значение",
    "option":            "вариант",
    "TimeSeries":        "Временная последовательность",   
    "Smoothing":         "Сглаживание",
    "Filtering":         "Фильтрация",
    "Transformation":    "Преображение",
    "Weight":            "Масса",
    "PercentChange":     "Изменить процент",
    "WeightedIndex":     "Простой указатель",
    "BaseTime":          "Базовое время",
    "LagTime":           "Время задержки",
    "Lag":               "Отставание во времени",
    "Forecasting":       "Прогнозирование",
    "SeasonalModel":     "Сезонная модель",
    "HoltWinter":        "Сезонная модель Холт-Уинтерс",
    "Trend":             "Тренд",
    "Seasonal":          "Сезонный",
    "Deseasonal":        "Десезонный сериал",
    "Nseason":           "Время в сезоне",
    "Irregular":         "Нерегулярный",
    "TrendModel":        "Трендовая модель десезонности",
    "RegressionModel":   "Регрессионная модель",
    "ForecastingPeriod": "Период прогнозирования",
    "CreateTable":       "Таблица данных",
    "SaveTable":         "Сохранить таблицу",
    "MA":                "Скользящее среднее",
    "EWMA":              "Модель ЭВМА",
    "CenterMA":          "Центрированная скользящая средняя",
    "MovingMedian":      "Центрированная движущаяся медиана",
    "ES":                "Экспоненциальное сглаживание",
    "Default":           "По умолчанию",
    "Linear":            "Линейный",
    "Quadratic":         "Квадратный",
    "Cubic":             "Кубик",
    "SquareRoot":        "Квадратный корень",
    "Log":               "логарифмический",
    "Exponent":          "Экспоненциальный",
    "Power":             "Власть",
    "BoxCox":            "Бокс-Кокс",
    "SingleMA":          "Единая скользящая средняя",
    "SingleES":          "Однократное экспоненциальное сглажив",
    "DoubleMA":          "Двойная скользящая средняя",
    "DoubleES":          "Двойное экспоненциальное сглаживание",
    "HoltLinear":        "Экспоненциальное сглаживание Холта",
    "DeseasonIntercept": "Десезонный перехват",
    "DeseasonSlope":     "Десезонный склон",
    "SeasonalIndex":     "Сезонные индексы",
    "Diff":              "Разница",
    "DiffTime":          "Разное время",
    "AR":                "Авторегрессионная модель",
    "ResultTable":       "Результат регрессии",
    "ForecastTable":     "Таблица прогнозов",
    "HoltLevel":         "Уровень",
    "HoltTrend":         "Тренд",
    "AutoCorrTable":     "Таблица автокорреляции",
    "DiffSeries":        "Серия отличий",
    "RawSeries":         "Сырая серия",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis",
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};
// Russian
appStr[0][18] = "/estat/eStat/index.html";
appStr[1][18] = "/estat/eStatH/index.html";
appStr[2][18] = "/estat/eStatU/index.html";
appStr[3][18] = "/estat/eStatE/index_en.html";
appStr[4][18] = "/estat/eHelp/index_en.html";
appStr[5][18] = "index.html";
appStr[6][18] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][18] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][18] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][18] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][18] = "";
appStr[11][18] = "Large Population Country";
appStr[12][18] = "Life Expectancy (OECD)";
appStr[13][18] = "Population Pyramid (Korea)";
appStr[14][18] = "GNP per Capita (OECD)";
appStr[15][18] = "Top World Export Country";
appStr[16][18] = "Obesity % of Population";
appStr[17][18] = "Temperature of Major City";
appStr[18][18] = "Top CO2 Emission Country";
appStr[19][18] = "Alcohol Consume (OECD)";
appStr[20][18] = "Continuous Data Graph";
appStr[21][18] = "Length of Otter";
appStr[22][18] = "Age of Teacher";
appStr[23][18] = "Age of Teacher by Sex";
appStr[24][18] = "Cleanliness of Tooth";
appStr[25][18] = "Math Exam Scores";
appStr[26][18] = "Calorie of Hamberger";
appStr[27][18] = "Height vs Weight by Sex";
appStr[28][18] = "Discrete Data Graphs";
appStr[29][18] = "";
appStr[30][18] = "";
appStr[31][18] = "unit";
appStr[32][18] = "Country";
appStr[33][18] = "Male";
appStr[34][18] = "Female";
appStr[35][18] = "Age";
appStr[36][18] = "Person";
appStr[37][18] = "billion $";
appStr[38][18] = "Export";
appStr[39][18] = "Obesity %";
appStr[40][18] = "Celsius";
appStr[41][18] = "City";
appStr[42][18] = "Jan High";
appStr[43][18] = "Jul High";
appStr[44][18] = "million ton";
appStr[45][18] = "liter/year";
appStr[46][18] = "Alcohol";
alertMsg[1][18] = "В одном из выбранных переменных отсутствуют данные.";
alertMsg[2][18] = "Выберите переменные для анализа (щелкнув названия столбцов) поочерёдно. Если имеются два переменных, то первая - это групповая переменная.";
alertMsg[3][18] = "Отсутствуют данные по выбранной переменной.";
alertMsg[4][18] = "Анализ не возможен если наблюдения выбранных переменных отличаются.";
alertMsg[5][18] = "Слишком много групп! Графики могут перекрываться из-за размера экрана.";
alertMsg[6][18] = "Статистический анализ или создание таблицы не возможно если переменная анализа в сводных данных содержит символ.";
alertMsg[7][18] = "Анализ или создание таблицы не возможно при выборе более трёх переменных исходных данных.";
alertMsg[8][18] = "Точечный график применим при количество наблюдений меньше чем 200.";
alertMsg[9][18] = "Диаграмма стебель-лист функционирует при количестве наблюдений меньше чем 100.";
alertMsg[10][18] = "Переменная анализа не выбрана.";
alertMsg[11][18] = "Переменные анализа / групповые переменные не выбраны.";
alertMsg[12][18] = "Статистический анализ или создание таблицы не возможно если переменная анализа содержит символ.";
alertMsg[13][18] = "";
alertMsg[14][18] = "Сводные данные не применимы к непрерывным графикам и для проверки гипотезы.";
alertMsg[16][18] = "Данная проверка гипотезы применима только для двух групп данных.";
alertMsg[17][18] = "Для точечной диаграммы требуется как минимум переменная x и переменная y.";
alertMsg[18][18] = "Более трех переменных не могут быть применены к точечной диаграмме.";
alertMsg[19][18] = "Анализ не возможен если среди данных имеется символ.";
alertMsg[20][18] = "Регрессионный анализ не возможен если среди данных имеется символ.";
alertMsg[21][18] = "Сохранение не возможно если имеются отстутствующие данние.";
alertMsg[22][18] = "Нельзя вывести столбиковую диаграмму при наличии числа с отрицательным значением.";
alertMsg[25][18] = "Нельзя вывести столбиковую диаграмму с накоплением при наличии только одной группы.";
alertMsg[27][18] = "Нельзя вывести столбиковую диаграмму соотношений при наличии только одной группы.";
alertMsg[29][18] = "Нельзя вывести параллельную столбиковую диаграмму бок о бок при наличии только одной группы.";
alertMsg[31][18] = "Нельзя вывести двухстороннюю столбиковую диаграмму при наличии только одной группы.";
alertMsg[32][18] = "Нельзя вывести круговую диаграмму при наличии числа с отрицательным значением.";
alertMsg[33][18] = "Нельзя вывести таблицу частот при наличии числа с отрицательным значением.";
alertMsg[35][18] = "Нельзя вывести пончик диаграмму при наличии числа с отрицательным значением.";
alertMsg[36][18] = "Данная столбчатая диаграмма применима только для двух групп.";
alertMsg[37][18] = "Данная проверка гипотезы применима только для одной переменной.";
alertMsg[38][18] = "мю отсутствует. Введите значение и повторите попытку!";
alertMsg[39][18] = "Среднеквадратичное отклонение равно нулю или отсутствует. Повторить!";
alertMsg[40][18] = "Дисперсионные данные отсутствуют. Введите значение и повторите попытку!";
alertMsg[41][18] = "Данная проверка гипотезы применима только для двух переменных. Групповая переменная должна содержать только две группы.";
alertMsg[42][18] = "Нельзя редактировать заголовок проверки гипотезы!";
alertMsg[43][18] = "Простая линейная регрессия применима только для одной группы";
alertMsg[44][18] = "Enter 1st:Name, 2nd:latitude, 3rd:longitude, 4th:AnalysisVar(optional)";
alertMsg[45][18] = "Cannot draw GIS graph if more than five variables.";
alertMsg[46][18] = "Выбран тот же номер переменной.";
alertMsg[47][18] = "Символьные данные по частоте недопустимы !! Повторите попытку.";
alertMsg[48][18] = "Символьные данные не допускаются !! Повторите попытку.";
alertMsg[49][18] = "Количество наблюдений должно быть меньше 100 !! Попробуйте еще раз.";
alertMsg[50][18] = "Введите числа в начало интервала или шаг.";
alertMsg[51][18] = "Введите числа / Количество строк должно быть одинаковым !! Повторите попытку.";
alertMsg[52][18] = "Введите номера по категории и частоте.";
alertMsg[53][18] = "Размер интервала не тот !! Попробуйте еще раз.";
alertMsg[54][18] = "X наблюдение не равно Y наблюдению !! Попробуйте еще раз.";
alertMsg[55][18] = "!!! Нет данных на листе.";
alertMsg[56][18] = "!!! Переменная не выбрана";
alertMsg[57][18] = "!!! Введите начало интервала и ширину интервала";
alertMsg[58][18] = "!!! Введите числовое начало интервала и ширину интервала";
alertMsg[59][18] = "!!! Больше 9 интервала - изменить ширину интервала";
alertMsg[60][18] = "!!! У этой переменной более 9 значений";
alertMsg[61][18] = "!!! Значение не введено";
alertMsg[62][18] = "!!! Введите формулу";
alertMsg[63][18] = "!!! Нет данных, удовлетворяющих условиям.";
alertMsg[64][18] = "";
alertMsg[65][18] = ""; 
alertMsg[66][18] = "";
alertMsg[67][18] = "";
alertMsg[68][18] = "";
alertMsg[69][18] = "";

svgStr[1][18] = " Столбиковая диаграмма";
svgStr[2][18] = " Круговая диаграмма";
svgStr[3][18] = " Пончик";
svgStr[4][18] = " Полосная диаграмма";
svgStr[5][18] = " Линейный график";
svgStr[6][18] = " Точечный график";
svgStr[7][18] = " Коробочный сюжет";
svgStr[8][18] = " Диаграмма стебель-лист";
svgStr[9][18] = " Гистограмма";
svgStr[10][18] = " Точечная диаграмма";
svgStr[11][18] = " Тестирование гипотезы: Среднее значение совокупности";
svgStr[12][18] = " Тестирование гипотезы: Коэффициент вариации генеральной совокупности";
svgStr[13][18] = " Тестирование гипотезы: Средние значения двух генеральных совокупностей";
svgStr[14][18] = " Тестирование гипотезы: Дисперсии двух генеральных совокупностей";
svgStr[15][18] = " Дисперсионный анализ";
svgStr[16][18] = "Частота";
svgStr[17][18] = "Соотношение";
svgStr[18][18] = "Группа ";
svgStr[19][18] = " ";
svgStr[20][18] = "<h3>Сводные данные <br>Таблица частот</h3>";
svgStr[21][18] = "Группа переменной";
svgStr[22][18] = "Переменная строки";
svgStr[23][18] = "Итого";
svgStr[24][18] = "Размер круга";
svgStr[25][18] = "<h3>Таблица частот</h3>";
svgStr[26][18] = "Анализ переменной";
svgStr[27][18] = "переменной Value";
svgStr[28][18] = "Метка значения";
svgStr[29][18] = "Частота";
svgStr[30][18] = "Относительная частота";
svgStr[31][18] = "<h3>Таблица кросстабуляции</h3>";
svgStr[32][18] = "Переменная столбца";
svgStr[33][18] = "Переменная строки";
svgStr[34][18] = "Среднее значение"
svgStr[35][18] = "Среднеквадратичное отклонение"
svgStr[36][18] = "<h3> Гистограмма<br>Таблица частот</h3>";
svgStr[37][18] = "Группа Name";
svgStr[38][18] = "Интервал";
svgStr[39][18] = "Стебель";
svgStr[40][18] = " Лист";
svgStr[41][18] = "Группа 1  Лист";
svgStr[42][18] = "Группа 2  Лист"
svgStr[43][18] = "<h3>Дескриптивная статистика</h3>";
svgStr[44][18] = "Наблюдение";
svgStr[45][18] = "Minimum";
svgStr[46][18] = "Median";
svgStr[47][18] = "Maximum";
svgStr[48][18] = "Итого";
svgStr[49][18] = "<h3>Нормальное распределение Тест</h3>";
svgStr[50][18] = "Ожидаемая частота > 5 <br> Рекомендовано";
svgStr[51][18] = "&chi;&#178; Тест<br>Интервал i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][18] = "Данные<br>Наблюдаемая частота<br>(O<sub>i</sub>)";
svgStr[53][18] = "Нормальное распределение<br>Ожидаемая вероятность<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][18] = "Нормальное распределение<br>Ожидаемая частота<br>(E<sub>i</sub>)";
svgStr[55][18] = "Интервал<br>&chi;&#178; Значение<br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][18] = "Сумма &chi;&#178; Значение";
svgStr[57][18] = "Вероятность Гистограмма и Нормальное распределение";
svgStr[58][18] = "Нормальное распределение График КК";
svgStr[59][18] = "Нормальное распределение Квантиль";
svgStr[60][18] = "Коэффициент корреляции";
svgStr[61][18] = "Коэффициент детерминации";
svgStr[62][18] = "Стандартная ошибка среднего";
svgStr[63][18] = "переменной";
svgStr[64][18] = "Название переменной";
svgStr[65][18] = "Независимая переменная";
svgStr[66][18] = "Зависимая переменная";
svgStr[67][18] = "Параметр";
svgStr[68][18] = "Расчетное значение";
svgStr[69][18] = "Значение";
svgStr[70][18] = "Пересечение";
svgStr[71][18] = "Уклон";
svgStr[72][18] = "фактор";
svgStr[73][18] = "сумма квадратов отклонения значений параметра от среднего";
svgStr[74][18] = "Степень свободы";
svgStr[75][18] = "Средний квадрат";
svgStr[76][18] = "Регрессия";
svgStr[77][18] = "Ошибка";
svgStr[78][18] = "Итого";
svgStr[79][18] = "<h3>Регрессионный анализ</h3>";
svgStr[80][18] = "стандартизированы Остаток График КК";
svgStr[81][18] = "стандартизированы Остаток";
svgStr[82][18] = "Нормальное распределение Квантиль";
svgStr[83][18] = "Диаграмма рассеяния остатков";
svgStr[84][18] = "Прогнозируемое значение";
svgStr[85][18] = "Двусторонний дисперсионный анализ";
svgStr[86][18] = "Доверительный интервал График";
svgStr[87][18] = "Остаток";
svgStr[88][18] = "двухмерное Статистика";
svgStr[89][18] = "Матрица точечных диаграмм";
svgStr[90][18] = "Множественное сравнение";
svgStr[91][18] = "Статистика";
svgStr[92][18] = "фактор";
svgStr[93][18] = "Уровень";
svgStr[94][18] = "Парные выборки График";
svgStr[95][18] = "стандартизированы Остаток против прогнозный участок";
svgStr[96][18] = "стандартизированы Остаток против Влияние наблюдений участок";
svgStr[97][18] = "Расстояние Кука График";
svgStr[98][18] = "Расстояние Кука";
svgStr[99][18] = "Порядок данных";
svgStr[100][18] = "Средняя разница";
svgStr[101][18] = "Тест Means";
svgStr[102][18] = "Обработка";
svgStr[103][18] = "Взаимодействие";
svgStr[104][18] = "Итого по строке";
svgStr[105][18] = "Итого по столбцу";
svgStr[106][18] = "Коэффициент множественной корреляции";
svgStr[107][18] = "<h3>Корреляционный анализ</h3>";
svgStr[108][18] = "Корреляционная матрица ";
svgStr[109][18] = "фактор A - фактор B Mean График";
svgStr[110][18] = "Влияние наблюдений";
svgStr[111][18] = "Geographic Information Graph";
svgStr[112][18] = "Диапазон";
svgStr[113][18] = "Среднее значение - Среднеквадратичное отклонение График";
svgStr[114][18] = "Коэффициент вариации генеральной совокупности";
svgStr[115][18] = "Коэффициент корреляции";
svgStr[116][18] = "Тест";
svgStr[117][18] = "отклонение";
svgStr[118][18] = "Значение интервала";
svgStr[119][18] = "категория";
svgStr[120][18] = "Режим";
svgStr[121][18] = "Ковариация";
svgStr[122][18] = "Треугольник Паскаля";
svgStr[123][18] = "Совместная вероятность";
svgStr[124][18] = "Условный";
svgStr[125][18] = "Дискретное распределение";
svgStr[126][18] = "ряд %";
svgStr[127][18] = "столбец %";
svgStr[128][18] = "общий %";
svgStr[129][18] = "Матрица гистограммы";
svgStr[130][18] = "Предыдущая проблема";
svgStr[131][18] = "Собственное значение";
svgStr[132][18] = "Собственный вектор";
svgStr[133][18] = "Многомерная таблица частот";
svgStr[134][18] = "Иерархический кластерный график";
svgStr[135][18] = "Расстояние";
svgStr[136][18] = "Одиночный";
svgStr[137][18] = "Завершено";
svgStr[138][18] = "Среднее";
svgStr[139][18] = "Центроид";
svgStr[140][18] = "Опека";
svgStr[141][18] = "Связь";
svgStr[142][18] = "Number of Clusters <br>K";
svgStr[143][18] = "Bayes Information Criteria";
svgStr[144][18] = "Within Sum of Squares";
svgStr[145][18] = "Akaike Information Criteria";

svgStrU[1][18] = "Биномиальное распределение";
svgStrU[2][18] = "Повторение";
svgStrU[3][18] = "Среднее значение";
svgStrU[4][18] = "Среднеквадратичное отклонение";
svgStrU[5][18] = "Распределение Пуассона";
svgStrU[6][18] = "Геометрическое распределение";
svgStrU[7][18] = "Гипергеометрическое распределение";
svgStrU[8][18] = "Генеральная совокупность";
svgStrU[9][18] = "Распределение выборки";
svgStrU[10][18] = "Закон больших чисел";
svgStrU[11][18] = "Решка";
svgStrU[12][18] = "Орел";
svgStrU[13][18] = "Орел";
svgStrU[14][18] = "Количество орлов";
svgStrU[15][18] = "Количество испытаний";
svgStrU[16][18] = "Выборочное распределение средних значений";
svgStrU[17][18] = "Повторение";
svgStrU[18][18] = "Стандартная ошибка среднего";
svgStrU[19][18] = "Среднее значение совокупности";
svgStrU[20][18] = "Доверительный интервал";
svgStrU[21][18] = "Точность оценки";
svgStrU[22][18] = "Среднее значение выборки";
svgStrU[23][18] = "[Тестовая статистика]";
svgStrU[24][18] = "Распределение";
svgStrU[25][18] = "Отклонить H\u2080";
svgStrU[26][18] = "Принять H\u2080";
svgStrU[27][18] = "p-Значение";
svgStrU[28][18] = "[Решение] ";
svgStrU[29][18] = "[Дисперсионный анализ]";
svgStrU[30][18] = "Ввести коэффициент корреляции и нажать кнопку «Выполнить»";
svgStrU[31][18] = "Регрессия";
svgStrU[32][18] = "Переменная строки";
svgStrU[33][18] = "Переменная столбца";
svgStrU[34][18] = "Среднее значение"
svgStrU[35][18] = "Среднеквадратичное отклонение"
svgStrU[36][18] = "<h3> Гистограмма<br>Таблица частот</h3>";
svgStrU[37][18] = "Группа Name";
svgStrU[38][18] = "Интервал";
svgStrU[39][18] = "Стебель";
svgStrU[40][18] = " Лист";
svgStrU[41][18] = "Группа 1  Лист";
svgStrU[42][18] = "Группа 2  Лист"
svgStrU[43][18] = "<h3>Дескриптивная статистика</h3>";
svgStrU[44][18] = "Наблюдение";
svgStrU[45][18] = "Минимум";
svgStrU[46][18] = "Медиана";
svgStrU[47][18] = "Максимум";
svgStrU[48][18] = "Итого";
svgStrU[49][18] = "Экспоненциальный";
svgStrU[50][18] = "Равномерно";
svgStrU[51][18] = "Точность оценки";
svgStrU[52][18] = "- Создайте точки путём нажатия, затем eStat обозначит линию регрессии.";
svgStrU[53][18] = "- Переместите или сотрите точку. Следите за изменением линии регрессии.";
svgStrU[54][18] = "[Статистика выборки] ";
svgStrU[55][18] = "[Выборка 1 Статистика] ";
svgStrU[56][18] = "[Выборка 2 Статистика] ";
svgStrU[57][18] = "Уровень доверия";
svgStrU[58][18] = "Переменные строки и столбца независимы";
svgStrU[59][18] = "Переменные строки и столбца не являются независимыми";
svgStrU[60][18] = "наблюдаемое распределение";
svgStrU[61][18] = "Теоретическое распределение";
svgStrU[62][18] = "Анализ степени согласия гипотетического распределения с наблюдаемыми данными";
svgStrU[63][18] = "Критерий суммы рангов Уилкоксона независимых измерений";
svgStrU[64][18] = "Критерий суммы рангов Уилкоксона независимых измерений таблицы";
svgStrU[65][18] = "Крускала-Уоллиса Тест";
svgStrU[66][18] = "Крускала-Уоллиса H Распределение";
svgStrU[67][18] = "Крускала-Уоллиса H статистика";
svgStrU[68][18] = "Критерий суммы рангов Уилкоксона (Т-критерий Уилкоксона) парных измерений";
svgStrU[69][18] = "Критерий знаков";
svgStrU[70][18] = "Фридман Тест";
svgStrU[71][18] = "Фридман S статистика";
svgStrU[72][18] = "Фридман S Распределение";
svgStrU[73][18] = "t Значение (or Z)";
svgStrU[74][18] = "хи-квадрат Значение";
svgStrU[75][18] = "Коэффициент вариации выборки";
svgStrU[76][18] = "Разница средних значений выборок";
svgStrU[77][18] = "Соотношение выборочных дисперсий";
svgStrU[78][18] = "переменнойiance Assumption";
svgStrU[79][18] = "Сводные данные ";
svgStrU[80][18] = "Множественный выбор";
svgStrU[81][18] = "Выберите до двух групп";
svgStrU[82][18] = "X переменной";
svgStrU[83][18] = "Y переменной";
svgStrU[84][18] = "нет";
svgStrU[85][18] = "Нет групповой переменной";
svgStrU[86][18] = "Выбранные данные: ";
svgStrU[87][18] = "Необработанные данные";
svgStrU[88][18] = "Выберите переменные, кликнув на название переменной";
svgStrU[89][18] = "Недостающие наблюдения";
svgStrU[90][18] = "Сумма рангов";
svgStrU[91][18] = "Longitude";
svgStrU[92][18] = "Latitude";
svgStrU[93][18] = "Минимум одна пара мест отличается";
svgStrU[94][18] = "Распределение суммы рангов Уилкоксона парных измерений";
svgStrU[95][18] = "Парные выборки";
svgStrU[96][18] = "Парные выборки";
svgStrU[97][18] = "Уровень доверия";
svgStrU[98][18] = "Симуляция";
svgStrU[99][18] = "Случайное число";
svgStrU[100][18] = "Нормальное распределение";
svgStrU[101][18] = "t Распределение";
svgStrU[102][18] = "&chi;&#178; Распределение";
svgStrU[103][18] = "F Распределение";
svgStrU[104][18] = "Стьюдентизированное распределение диапазонов";
svgStrU[105][18] = "первый квартиль";
svgStrU[106][18] = "третий квартиль";
svgStrU[107][18] = "межквартильный Диапазон";
svgStrU[108][18] = "коэффициент вариации";
svgStrU[109][18] = "Относительная частота (%)";
svgStrU[110][18] = "Максимальное количество целых чисел равномерного распределения";
svgStrU[111][18] = "Переместить точку с помощью мыши";
svgStrU[112][18] = "Восстановление извлечения";
svgStrU[113][18] = "без заменыt";
svgStrU[114][18] = "Линейный"; 
svgStrU[115][18] = "Изменение в процентах";
svgStrU[116][18] = "Простой индекс";
svgStrU[117][18] = "Задержка";
svgStrU[118][18] = "Разница";
svgStrU[119][18] = "Автокорреляция";
svgStrU[120][18] = "Журнал";
svgStrU[121][18] = "Квадратный корень";
svgStrU[122][18] = "Бокс-Кокс";
svgStrU[123][18] = "Базовое время";
svgStrU[124][18] = "Скользящая средняя по центру";
svgStrU[125][18] = "Экспоненциальное сглаживание";
svgStrU[126][18] = "Центрированная движущаяся медиана";
svgStrU[127][18] = "Модель";
svgStrU[128][18] = "Скользящее среднее";
svgStrU[129][18] = "Двойная скользящая средняя";
svgStrU[130][18] = "Двойное экспоненциальное сглаживание Холта";
svgStrU[131][18] = "Сезонные индексы";
svgStrU[132][18] = "Мультипликативная сезонная модель Холта-Уинтерса";
svgStrU[133][18] = "Десезонная серия";
svgStrU[134][18] = "Блок";
svgStrU[135][18] = "Кластерный анализ";
svgStrU[136][18] = "Кластер";
svgStrU[137][18] = "Дерево решений";
svgStrU[138][18] = "Условие правила принятия решения";
svgStrU[139][18] = "Решение";
svgStrU[140][18] = "Итерация";
svgStrU[141][18] = "Параллельный график";
svgStrU[142][18] = "Классификация";
svgStrU[143][18] = "Функция классификации";
svgStrU[144][18] = "Результат классификации";
svgStrU[145][18] = "Решение";
svgStrU[146][18] = "Коэффициент ошибочной классификации";
svgStrU[147][18] = "Ячейка";
svgStrU[148][18] = "Обучающие данные";
svgStrU[149][18] = "Данные тестирования";

// Turkish
$message.tr = {
    "eStat : Stat Education SW": "eStat : Stat Eğitim SW",
    "Home": "Ana Sayfa",
    "Filename": "Dosya",
    "Selected Variables": "Seçilmiş değişkenler",
    "Cancel": "Iptal",
    "Edit Variables": "Değişkenleri düzenlemək",
    "Level": "Seviye",
    "ElementaryLevel": "I",
    "MiddleLevel": "O",
    "HighLevel": "A",
    "UniversityLevel": "U",
    "Example": "Örnek",
    "New Sheets": "Yeni sayfalar",
    "csv Open": "csv Aç",
    "www Open": "www Aç",
    "json Open": "json Aç",
    "csv Save": "csv Kaydet",
    "json Save": "json Kaydet",
    "Print Sheet": "Sayfayı yazdır",
    "Bar Graph": "Çubuk grafiği",
    "Pie Chart": "Yuvarlak diyagram",
    "Band Graph": "Bant grafiği",
    "Line": "Çizgi",
    "Line Graph": "Çizgi grafiği",
    "Dot Graph": "Nokta grafiği",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Kök ve yaprak diyagramı",
    "maxStem": "** maksimum kök sayısı <= 30 **",
    "Box-Whisker Plot": "Kutu qrafiği",
    "Scatterplot": "Dağılım grafiği",
    "ScatterplotMatrix": "Dağılım grafiği matrisi",
    "Frequency Table": "Frekans tablosu",
    "Basic Statistics": "Temel istatistikler",
    "Testing Hypothesis &mu;": "Hipotez testi &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Hipotez testi &sigma;&#178;",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Hipotez testi  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Hipotez testi &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Analysis of Variance": "Varyans analizi",
    "MiddleSchool": "Orta okul",
    "HighSchool":   "Lise",
    "University":   "Üniversite",
    "eStatHeading": "eStat, dinamik veri görselleştirme ve grafiksel istatistiksel analiz kullanan daha iyi İstatistik Eğitimi için web tabanlı ücretsiz bir yazılımdır.",
    "Support":      "Destek",
    "Donation":     "Bağış",
    "Middle School Stat Education": "Ortaokul İstatistik Eğitimi",
    "High School Stat Education": "Lise istatistik eğitimi",
    "University Stat Education": "Üniversite istatistik eğitimi",
    "Elem Stat Graph Example": "Temel istatistik grafiği örneği",
    "Learning eStat w Example": "eStat'i örnek ile öğrenmek",
    "Vertical": "Dikey",
    "Horizontal": "Yatay",
    "Vertical Separated Bar": "Dikey ayrılmış çubuk grafiği",
    "Vertical Stacked Bar": "Dikey toplanmış çubuk grafiği",
    "Vertical Ratio Bar": "Dikey oran çubuk grafiği",
    "Vertical Side by Side Bar": "Dikey yan yana çubuk grafiği",
    "Vertical Two Sided Bar": "Dikey iki taraflı çubuk grafiği",
    "Horizontal Separated Bar": "Yatay ayrılmış çubuk grafiği",
    "Horizontal Stacked Bar": "Yatay toplanmış çubuk grafiği",
    "Horizontal Ratio Bar": "Yatay oran çubuk grafiği",
    "Horizontal Side by Side Bar": "Yatay yan yana çubuk grafiği",
    "Horizontal Two Sided Bar": "Yatay iki taraflı çubuk grafiği",
    "Doughnut Graph": "Halka grafiği",
    "Two Sided Stem & Leaf Plot": "İki tarafı kök ve yaprak diyagramı",
    "Graph Save": "Grafiği kaydet",
    "Graph Print": "Grafiği yazdır",
    "Move to Table": "Tabloya taşı",
    "Edit Title": "Başlığı düzenle",
    "Table Save": "Tabloyu kaydet",
    "Table Print": "Tabloyu yazdır",
    "Frequency": "Sıklık",
    "Sorting": "Sıralama",
    "SortData": "Verileri sırala",
    "Raw Data": "Xam veri",
    "Descending": "Azalan",
    "Ascending": "Artan",
    "Mean": "Ortalama",
    "Std Deviation": "Standart sapma",
    "MeanStd": "Ortalama standart sapma",
    "DotMeanStd": "Ortalama standart sapma nokta grafiği",
    "95CI": "95% güven aralığı",
    "RegressionAnalysis": "Regresyon analizi",
    "RegressionAnalysis1": "Simple Linear Regression Analysis",
    "RegressionAnalysis2": "Multiple Linear Regression Analysis",
    "ANOVA2": "İki yönlü ANOVA",
    "Regression": "Regresyon",
    "RegressionLine": "Regresyon çizgisi",
    "RegressionBand": "Regresyon bandı",
    "RegressionTable": "Regresyon tablosu",	
    "Frequency Polygon": "Frekans poligonu",
    "Execute New Interval": "Yeni aralık uygula",
    "Interval Start": "Aralık başlangıcı",
    "Interval Width": "Aralık genişliği",
    "t-test": "t testi",
    "Z-test": "Z testi",
    "(if Z-test, enter &sigma;)": "(Z-test ise, girin &sigma;)",
    "Significance Level": "Önem düzeyi",
    "Execute": "Uygula",
    "(Confidence Interval)": "(Güven aralığı)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-test ise, Z<sub>&alpha;/2</sub> kullan)",
    "&chi;<sup>2</sup> test": "&chi;&#178; test",
    "Variance Assumption": "Varyans varsayımı",
    "Variance": "Varyans",
    "F test": "F testi",
    "At least one pair of means is different": "En az bir çift ortalama farklıdır",
    "Main Title": "Ana başlık",
    "y title": "Y başlığı",
    "x title": "X başlığı",
    "yAxis": "Y Ekseni",
    "Modify": "Değiştir",
    "Confirm": "Onayla",
    "Variable Name": "Değişken adı",
    "Variable Value": "Değişken değeri",
    "Value Label": "Değer etiketi",
    "* Less than nine value labels allowed.": "* Dokuzdan az değer etiketine icaze var.",
    "Save": "Kaydet",
    "Exit": "Çıkış",
    "eStatU UnivStatEdu": "eStatU - Üniversite istatistik eğitimi",
    "eStatH HighStatEdu": "eStatH - Lise istatistik eğitimi",
    "eStatM MiddleStatEdu": "eStatM - İlkokul / Ortaokul İstatistikleri",
    "MiddleStat": "Orta okul istatistiği",
    "HighStat":   "Lise istatistiği",
    "UnivStat":   "Statistics and Data Science",
    "UnivStat2":  "Introduction to Data Science & Aritificial Intelligence using using 『eStat』 and R",
    "ebookLink":  "eKitab linki (İngilizce)",
    "Menu": "Menü",
    "Binomial Experiment": "Binom deneyi",
    "Binomial Distribution": "Binom dağılımı",
    "Binomial Prob Table": "Binom olasılık tablosu",
    "Poisson Distribution": "Poisson dağılımı",
    "Poisson Prob Table": "Poisson olasılık tablosu",
    "Geometric Distribution": "Geometrik dağılımı",
    "Geometric Prob Table": "Geometrik olasılık tablosu",
    "HyperGeometric Distribution": "Hipergeometrik dağılımı",
    "HyperGeometric Prob Table": "Hipergeometrik olasılık tablosu",
    "Exponential Distribution": "Üslü dağılım",
    "Normal Experiment": "Normal deney",
    "Normal Distribution": "Normal dağılım",
    "Normal Approx": "Normal yaklaşık",
    "t Distribution": "t dağılım",
    "ChiSquare Distribution": "Chi kare dağılım",
    "F Distribution": "F dağılım",
    "Sampling": "numune alma",
    "Population vs Sample": "Nüfus vs numune",
    "Population": "Nüfus",
    "Sample": "Numunə",
    "Exponential": "Üstel",
    "Uniform": "Üniform",
    "UniformDist": "Üniform dağılım",
    "Sample05": "5% numune",
    "Sample10": "10% numune",
    "Sample20": "20% numune",
    "Statistics/BoxPlot": "Istatistik/kutu qrafiği",
    "StatisticalProb":     "İstatistiksel olasılık",
    "Law of Large Number": "Büyük sayılar kanunı",
    "Dist of Sample Means": "Numune ortalama dağılımı",
    "Sampling Distribution": "Numune dağılımı",
    "Sample Size": "Numune ölçüsü",
    "Confidence Interval": "Güven aralığı",
    "Confidence Interval Simulation": "Güven aralığı simülasyonu",
    "Simulation": "simülasyonu",
    "Confidence Interval Mu": "Tahmin : &mu;",
    "Mu Confidence Interval": "Nüfus ortalama güven aralığı",
    "Confidence Interval Sigma": "Tahmin: &sigma;&#178 ",
    "Confidence Interval P": "Tahmin : p",
    "Estimation Accuracy": "Tahmin doğruluğu",
    "Repetition": "Tekrar",
    "Confidence Level": "Güven derecesi",
    "Testing Hypothesis mu_titleAB": "Hipotez ortalaması testi",
    "Testing Hypothesis mu_title": "Ortalama testi",
    "Testing Hypothesis sigma_title": "Varyans testi",
    "Testing Hypothesis P_title": "Oran testi",
    "Testing Hypothesis mu12_title": "2 ortalama testi",
    "Testing Hypothesis sigma12_title": "2 varyans testi",
    "Testing Hypothesis P12_title": "2 oran testi",
    "Testing Hypothesis muA":  "Varsayım testi &mu; - C, &beta;",
    "Testing Hypothesis muAB": "Varsayım testi &mu; - C, n",
    "Testing Hypothesis mu": "Varsayım testi &mu;",
    "Testing Hypothesis sigma": "Varsayım testi &sigma;&#178;",
    "Testing Hypothesis P": "P varsayım testi",
    "Testing Hypothesis mu12": "Varsayım testi &mu;<sub>1</sub>, &mu;<sub>2</sub",
    "Testing Hypothesis sigma12":  "Varsayım testi &sigma;<sub>1</sub>&#178;, &sigma;<sub>2</sub>&#178;",
    "Testing Hypothesis P12": "Varsayımın testi p<sub>1</sub>, p<sub>2</sub>",
    "Testing Hypothesis ANOVA": "1 Faktör ANOVA",
    "Testing Hypothesis ANOVA2": "2 Faktör ANOVA",
    "SameSampleSize": "Her hücrenin örnek boyutu aynı olmalıdır.",
    "Testing Independence": "Kategorik: Bağımsızlık Testi",
    "CategoryD": "Kategori",
    "Category": "Kategori",
    "Correlation Coefficient": "Korelasyon katsayısı",
    "Regression Experiment": "Regresyon deneyi",
    "Hypothesis": "Varsayım",
    "Test Type": "Test türü",
    "Z-test": "Z test",
    "t-test": "t test",
    "Chi-test": "&chi;&#178; testi",
    "F-test": "F test",
    "Sampling Type": "Numune alma türü",
    "Independent Sample": "Bağımsız numune",
    "Paired Sample": "Eşli numune",
    "Sample Data": "Örnek Veri",
    "input either sample data": "BSV kullanarak örnek verileri veya sonraki kutulara örnek istatistikleri girin",
    "input data": "Veri girin",
    "Sample Statistics": "Numune istatistikleri",
    "Sample Mean": "Numumə ortalaması",
    "Sample Variance": "Numumə dispersiyası",
    "Sample Proportion": "Numumə oranı",
    "sample range": "Örnek Aralığı",
    "control chart": "Kontrol grafiği",
    "if Z-test-1": "(Z testi ise, popülasyon varyansını &sigma;&#178; girin)",
    "if Z-test-2": "(Z testi ise, z<sub>&alpha;/2 </sub> kullanılır.)",
    "At least one pair": "En az bir çift ortalama farklıdır",
    "Row-Col-0": "Satır ve sütun değişkenleri bağımsızdır",
    "Row-Col-1": "Satır ve sütun değişkenleri bağımsız değil",
    "Enter any number of row": "(Sol üst hücreden gözlemi girin)",
    "Row": "Satır",
    "Column": "Sütun",
    "Probability": "Olasılık",
    "Show Probability": "Olasılığı göster",
    "Regression Line": "Regresyon çizgisi",
    "Erase All": "Tümünü sil",
    "Add Point": "Nokta ekle",
    "Erase Point": "Noktayı sil",
    "Reference Site": "Referans site",
    "Lot Size": "Alan ölçüsü",
    "Defect Size": "Hata boyutu",
    "Defect Rate": "Kusurlu Oranı",
    "If typed": "Numarayı yazdıktan sonra [Yürüt] veya [Giriş]'e tıklayın",
    "Stat/BoxPlot": "Istatitik/Kutu grafiği",
    "Mean": "Ortalama",
    "Std Dev": "Standart sapma",
    "SimulationWarning": "(Bir sonraki simülasyona başlamadan önce mevcut simülasyon bitirilmelidir)",
    "OneGroup": "Bir grup",
    "AnalysisVar": "Analiz değişkeni",
    "AnalysisVar2": "Y değişkeni",
    "GroupVar": "Grup",
    "GroupVar2": "X değişkeni",
    "GroupVar3": "Faktör1",
    "GroupVar4": "Faktör2",
    "AnalysisVarMu12": "Analiz(veya X1) değişkeni",
    "GroupVarMu12": "Grup(veya X2) değişkeni",
    "PairedMu12": " X1, X2 : Eşleştirilmiş değişkenler",
    "SizeVar": "Değişkeni boyutu",
    "RegressionBand": "Güven bandı",
    "RegressionTable": "Regresyon analizi",
    "RegressionResidual": "Kalıntı plotu",
    "RegressionResidualLeverage": "Kalıntısı ve kaldıraç",
    "RegressionCook": "Kuk'un mesafe grafiği",
    "RegressionQQ": "Artık Q-Q grafiği",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Normallik testi",
    "HistogramNormalQQ": "Normal Q-Q grafiği",
    "PopulationStd": "Nüfus standart sapması",
    "Type1Error": "1. tip hata",
    "Type2Error": "2. tip hata",
    "AnovaTable": " ANOVA tablosu",
    "AnovaMeanGraph": "Ortalama güven aralığı",
    "MultipleComparison": "Çoklu karşılaştırma",
    "ComparisonGraph": "Karşılaştırma",
    "AnovaResidual": "Standartlaştırılmış kalıntı plotu",
    "AnovaQQ": "Artık Q-Q grafiği",
    "TestingFit": "Kategorik: uygunluk testi",
    "FitTest0": "Gözlemlenen ve teorik dağılım aynıdır",
    "FitTest1": "Gözlemlenen ve teorik Dağılım farklıdır",
    "ObservedFreq": "Gözlemlenen frekans 0",
    "ExpectedProb": "Beklenen olasılık p",
    "ExpectedFreq": "Beklenen frekans E(>5)",
    "InputFitData": "Sol üst hücreden girin",
    "ExecuteTable": "İstatistikler",
    "MeanDotGraph": "Güven aralığı grafiği",
    "ScatterRegression": "Dağılım grafiği",
    "Factor": "Faktör",
    "Interaction": "Etkileşim",
    "NoInteraction": "Etkileşim yoktur",
    "ExistInteraction": "Etkileşim vardir",
    "eStatLecture": "e-Eğitim",
    "eDataLecture": "eDataScience Learning",
    "NonParametricMu12_title": "Parametrik olmayan: Wilcoxon sıra toplamı testi", 
    "NonParametricMu12": "Parametrik Olmayan : Wilcoxon sıra toplamı testi : Konum Parametresi M<sub>1</sub>, M<sub>2</sub>", 
    "WilcoxonTest": "Parametrik Olmayan: Sıra Toplamı Testi",
    "Sample Range":  "Sıra Toplamı",
    "DistributionTable": "Dağıtım tablosu",
    "SignedRankTestDist": "Wilcoxon işaretli sıra test dağılımı",
    "WilcoxonTestDist": "Wilcoxon sıra toplamı dağılımı",
    "KruskalTestDist": "Kruskal-Wallis H Dağıtımı",
    "FriedmanTestDist": "Friedman S Dağıtımı",
    "SignedRankTest": "Parametrik olmayan: işaretli sıra toplamı testi",
    "SignTest": "Parametrik olmayan: işaret Testi",
    "SignCount": "İşaret sayısı",
    "KruskalTest": "Parametrik Olmayan: Kruskal-Wallis Testi",
    "KruskalTestANOVA": "Parametrik Olmayan: Kruskal-Wallis Testi",
    "Total": "İşlem",
    "FriedmanTest": "Parametrik olmayan: Friedman testi",
    "FriedmanTestANOVA": "Parametrik Olmayan: Friedman Testi",
    "Block": "Engelle",
    "Treatment": "İşlem",
    "At least one locations is different": "En az bir konum çifti farklı",
    "SignCondition": "n ≤ 100 ise binom testi, n > 100 ise normal yaklaşım testi",
    "WilcoxonSignCondition": "n ≤ 20 ise Wilcoxon sıra toplamı Testi, n > 20 ise normal yaklaşım testi",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 ise Wilcoxon sıra toplamı testi, n>25 ise normal yaklaşım testi",
    "KruskalCondition": "n ≤ 10 ise H dağılım testi, yoksa &chi;&#178; yaklaşım testi",
    "VariableSelect":  "* Veri analizi : Dosya yükle >> Değişkenleri seç >> Simgeye tıkla",
    "VariableSelect2": "* Değişken Seçimi : Değişken adını tıklayın veya RHS seçim kutusunu kullanın ",
    "VariableSelect3": "Değişken seçimi",
    "VariableSelect4": "Daha fazla analiz değişkeni seçilebilir.",
    "VariableSelect5": "Daha fazla X değişkeni seçilebilir.",
    "SummaryData": "Özet veriler",
    "RawData": "Ham veriler",
    "MultiSelect": "",
    "DataType": "(Değişken adını tıklayarak seçin)",
    "by": "ile",
    "NameVar": "Değişken adi",
    "n_variance": "n-1 formülü",
    "RandomNumber": "Rastgele sayı üreticisi",
    "RealNumber":     "Gerçek",
    "IntegerNumber":  "Tamsayı",
    "NumberData":     "Veri sayı",
    "NumberDigit":    "Sayı basamağı",
    "NormalTable":    "Normal dağılım tablosu",
    "Percentile":     "Yüzdelik tablo",
    "PercentileValue": "Yüzdelik",
    "StudentRangeDist": "HSD öğrenci aralığı dağılımı",
    "copy link": "linki kopyala",
    "WithoutReplacement": "Değiştirmesiz",
    "WithReplacement":    "Değiştirme ile",
    "Replacement":     "Değiştirme",
    "NonReplacement":  "Değiştirilmeden",
    "WordCloud":       "Kelime bulutu",
    "oneColor":        "Renk",
    "defaultColor":    "Standart renk",
    "RelativeFreq":    "Bağıl frekans",
    "Density":         "Yoğunluk",
    "MarginOfError":   "Hata marjı",
    "Permutation":     "Permütasyon",
    "PermutationSame": "Aynı nesnelerler permütasyon",
    "Combination":     "Kombinasyon",
    "NumberOfCase":    "Vaka Sayısı",
    "BinomialTheorem": "Binom teoremi",
    "PascalTriangle":  "Paskal Üçgeni",
    "Character":       "Karakter",
    "AdditionRule":      "Olasılığın Toplama kuralı",
    "MultiplicationRule":"Olasılığın Çarpma kuralı",
    "ConditionalProb":   "Koşullu olasılık",
    "JointProb":         "Ortak olasılık",
    "DiscreteDist":      "Ayrık dağıtım",
    "Categorize":        "Kategorize et",
    "Recode":            "Yeniden kodla",
    "Compute":           "Hesaplama",
    "SelectIf":          "İse seç",
    "InfoValueLabel":    "*** Değişken seçin, değişken adını ve/veya değer etiketini girin.",
    "InfoSorting":       "*** Sıralama değişkenini seçin, 3 değişkene kadar sıralama yöntemini girin.",
    "InfoCategorize":    "*** Kategori için değişken seçin, 'Aralık başlangıcı' ve 'Aralık genişliği' girin.",
    "InfoRecode":        "*** Yeniden kodlamak için değişken seçin, 'Yeni değer'i girin.",
    "InfoRecode2":       "* 9 değere kadar yeniden kodlamaya izin ver.",
    "InfoCompute":       "*** Aşağıdaki düğmeleri kullanarak hesaplama formülü oluşturun.",
    "InfoSelectIf":      "*** En fazla 3 değişken seçin, koşullarını girin.",
    "SortingVariable":   "Değişken sıralama",
    "SortingMethod":     "Sıralama yöntemi",
    "NewVariable":       "Yeni değişken",
    "CategoryVariable":  "Değişkeni kategorize et",
    "CategoryListCheck": "Kategori listesi kontrolü",
    "CategoryInterval":  "Kategori aralığı",
    "CategoryLabel":     "Kategori etiketi",
    "RecodeVariable":    "Değişkeni yenidən kodla",
    "CurrentValue":      "Mevcut değer",
    "NewValue":          "Yeni değer",
    "ComputeFormula":    "Hesaplama formülü",
    "SelectVariable":    "Seçim için<br>Değişken",
    "RelationOperator":  "İlişki<br>operatörü",
    "SelectValue":       "Değer",
    "MissingValue":      "Eksik değer",
    "option":            "seçenek",
    "TimeSeries":        "Zaman serisi",                    
    "Smoothing":         "yumuşatma",
    "Filtering":         "Filtreleme",
    "Transformation":    "Dönüşüm",
    "Weight":            "Ağırlık",
    "PercentChange":     "Yüzde Değişim",
    "WeightedIndex":     "Basit Dizin",
    "BaseTime":          "Temel Zaman",
    "LagTime":           "Gecikme süresi",
    "Lag":               "Gecikme süresi",
    "Forecasting":       "Tahmin",
    "SeasonalModel":     "Mevsimlik Model",
    "HoltWinter":        "Holt-Winters Mevsimlik Modeli",
    "Trend":             "Akım",
    "Seasonal":          "Mevsimsel",
    "Deseasonal":        "Sezonluk Serisi",
    "Nseason":           "Sezondaki Zamanlar",
    "Irregular":         "Düzensiz",
    "TrendModel":        "Sezonsuz Trend Modeli",
    "RegressionModel":   "Regresyon modeli",
    "ForecastingPeriod": "Tahmin Dönemi",
    "CreateTable":       "Veri tablosu",
    "SaveTable":         "Tabloyu Kaydet",
    "MA":                "Hareketli ortalama",
    "EWMA":              "EWMA Modeli",
    "CenterMA":          "Merkezli Hareketli Ortalama",
    "MovingMedian":      "Merkezli Hareketli Medyan",
    "ES":                "Üstel Yumuşatma",
    "Default":           "Varsayılan",
    "Linear":            "Doğrusal",
    "Quadratic":         "Kuadratik",
    "Cubic":             "Kübik",
    "SquareRoot":        "Kare kök",
    "Log":               "Logaritmik",
    "Exponent":          "Üstel",
    "Power":             "Güç",
    "BoxCox":            "Kutu Cox",
    "SingleMA":          "Tek Hareketli Ortalama",
    "SingleES":          "Tek Üstel Düzeltme",
    "DoubleMA":          "Çift Hareketli Ortalama",
    "DoubleES":          "Çift Üstel Düzeltme",
    "HoltLinear":        "Holt Üstel Düzeltme",
    "DeseasonIntercept": "Sezonsuz müdahale",
    "DeseasonSlope":     "Mevsimsiz eğim",
    "SeasonalIndex":     "Mevsimsel İndeksi",
    "Diff":              "Fark",
    "DiffTime":          "Fark Zamanı",
    "AR":                "Otoregresif Model",
    "ResultTable":       "Regresyon Sonucu",
    "ForecastTable":     "Tahmin Tablosu",
    "HoltLevel":         "Seviye",
    "HoltTrend":         "Akım",
    "AutoCorrTable":     "Otokorelasyon Tablosu",
    "DiffSeries":        "Fark Serisi",
    "RawSeries":         "Ham Serisi",
    "RBD":               "Randomized Block Design",
    "Latin":             "Latin Square Design",
    "Chapter01":         "Chapter 1&nbsp; Statistics and Data Science",
    "Chapter02":         "Chapter 2&nbsp; Visualization of Qualitative Data",
    "Chapter03":         "Chapter 3&nbsp; Visualization of Quantitative Data",
    "Chapter04":         "Chapter 4&nbsp; Data Summary with Tables and Measure",
    "Chapter05":         "Chapter 5&nbsp; Probability Distribution",
    "Chapter06":         "Chapter 6&nbsp; Sampling Distributions and Estimation",
    "Chapter07":         "Chapter 7&nbsp; Testing Hypothesis for Single Population Parameters",
    "Chapter08":         "Chapter 8&nbsp; Testing Hypothesis for Two Population Parameters",
    "Chapter09":         "Chapter 9&nbsp; Testing Hypothesis for Several Population Means",
    "Chapter10":         "Chapter 10      Nonparametric Testing Hypothesis",
    "Chapter11":         "Chapter 11      Testing Hypothesis for Categorical Data",
    "Chapter12":         "Chapter 12      Correlation and Regression Analysis",
    "Chapter13":         "Chapter 13      Time Series Analysis", 
    "Distribution":      "Distribution",
    "DecisionTree":      "Decision Tree",
    "MaxDepth":          "Tree Depth Max",
    "MinData":           "Branch Data Min",
    "Discriminant":      "Discriminant Analysis",
    "BayesTable":        "Classification Table",
    "ScatterBarGraph":   "Bar Graph Matrix",
    "MultiCrossTable":   "Cross Table Matrix",
    "MultiFreqTable":    "Muti-dim Frequency Table",
    "ParallelGraph":     "Parallel Graph",
    "DataPartition":     "Data partition",
    "Training":          "Train",
    "Testing":           "Test",
    "PriorProb":         "Prior probability",
    "SampleProp":        "sample proportion",
    "EqualProp":         "equal proportion",
    "KNN":               "K Nearest Neighbor Classification",
    "numKNN":            "Nearest Neighbor",
    "PCA":               "Principal Component Analysis",
    "PCgraph":           "Principal Component Scatterplot",
    "PCtable":           "Principal Component Table",
    "Logistic":          "Logistic Regression Analysis",
    "KmeansCluster":     "K-means Clustering",
    "KmeansGraph":       "K-means Cluster Scatterplot",
    "KmeansTable":       "K-means Cluster Table",
    "NumberOfGroup":     "number of clusters",
    "MaxIteration":      "max iteration",
    "StopEpsi":          "ESS difference bound",
    "StatCluster":       "Cluster Statistics",
    "ClusterTable":      "Cluster Table",
    "StatClassification": "Classification Stat",
    "HierarchyCluster":  "Hierarchical Clustering",
    "MaxObs":            "Maximum number of observations",
    "HierarchyGraph":    "Hierarchy Graph",
    "Distance":          "Distance measure",
    "Euclid":            "Euclid",
    "Manhattan":         "Manhattan",
    "Linkage":           "Linkage",
    "Single":            "Single",
    "Complete":          "Complete",
    "Average":           "Average",
    "Centroid":          "Centroid",
    "Ward":              "Ward",
    "Standardization":   "Data standardization",
    "StatMultivariate":  "Multivariate Stat",
    "NaiveBayes":        "Naive Bayes Classification",

};

// Turkish
appStr[0][19] = "/estat/eStat/index.html";
appStr[1][19] = "/estat/eStatH/index.html";
appStr[2][19] = "/estat/eStatU/index.html";
appStr[3][19] = "/estat/eStatE/index_en.html";
appStr[4][19] = "/estat/eHelp/index_en.html";
appStr[5][19] = "index.html";
appStr[6][19] = "/estat/eLearning/en/eStatM/index.html";
appStr[7][19] = "/estat/eLearning/en/eStatH/index.html";
appStr[8][19] = "/estat/eLearning/en/eStatU/index.html";
appStr[9][19] = "/estat/eLearning/en/DataScience/index.html";
appStr[10][19] = "";
appStr[11][19] = "Large Population Country";
appStr[12][19] = "Life Expectancy (OECD)";
appStr[13][19] = "Population Pyramid (Korea)";
appStr[14][19] = "GNP per Capita (OECD)";
appStr[15][19] = "Top World Export Country";
appStr[16][19] = "Obesity % of Population";
appStr[17][19] = "Temperature of Major City";
appStr[18][19] = "Top CO2 Emission Country";
appStr[19][19] = "Alcohol Consume (OECD)";
appStr[20][19] = "Continuous Data Graph";
appStr[21][19] = "Length of Otter";
appStr[22][19] = "Age of Teacher";
appStr[23][19] = "Age of Teacher by Sex";
appStr[24][19] = "Cleanliness of Tooth";
appStr[25][19] = "Math Exam Scores";
appStr[26][19] = "Calorie of Hamberger";
appStr[27][19] = "Height vs Weight by Sex";
appStr[28][19] = "Discrete Data Graphs";
appStr[29][19] = "";
appStr[30][19] = "";
appStr[31][19] = "unit";
appStr[32][19] = "Country";
appStr[33][19] = "Male";
appStr[34][19] = "Female";
appStr[35][19] = "Age";
appStr[36][19] = "Person";
appStr[37][19] = "billion $";
appStr[38][19] = "Export";
appStr[39][19] = "Obesity %";
appStr[40][19] = "Celsius";
appStr[41][19] = "City";
appStr[42][19] = "Jan High";
appStr[43][19] = "Jul High";
appStr[44][19] = "million ton";
appStr[45][19] = "liter/year";
appStr[46][19] = "Alcohol";
alertMsg[1][19] = "Seçilen değişkenlerden birinin verisi yok";
alertMsg[2][19] = "Analiz için değişkenleri tek tek seçin (sütun adını tıklayın veya seçim kutusundaki var'ı seçin). Ham veriler için iki değişken seçilirse, ilki analiz(veya Y) değişkenidir ve 2. grup (veya X) değişkenidir.";
alertMsg[3][19] = "Seçilen değişkende veri eksik.";
alertMsg[4][19] = "Her sütundaki gözlem sayısı farklıysa analiz yapilamaz.";
alertMsg[5][19] = "Çok fazla grup var! Ekranın boyutundan dolayı grafikler çakışıyor olabilir.";
alertMsg[6][19] = "Özet verilerdeki analiz değişkeni karakter içeriyorsa, analize veya tablo oluşturulamaz.";
alertMsg[7][19] = "Ham veri için üçten fazla değişken seçilirse, analize veya tablo oluşturulamaz.";
alertMsg[8][19] = "Gözlem sayısı 200'den az isa nokta grafiği oluşturulabilir.";
alertMsg[9][19] = "Gözlem sayısı 100'den az ise gövde ve yaprak grafiği oluşturulabilir.";
alertMsg[10][19] = "Analiz değişkeni seçilmedi.";
alertMsg[11][19] = "Analiz/grup değişkeni seçilmedi.";
alertMsg[12][19] = "Analiz değişkeni karakter içeriyorsa, analize veya tablo oluşturulamaz.";
alertMsg[13][19] = "";
alertMsg[14][19] = "Devamli grafikler ve test hipotezi için özet verileri oluşturulamaz.";
alertMsg[16][19] = "Bu hipotez testi için yalnızca iki gruba izin verilir.";
alertMsg[17][19] = "Dağılım grafiği, Y değişkeni ve X değişkeni gerektirir.";
alertMsg[18][19] = "Üçten fazla değişken olmamalı.";
alertMsg[19][19] = "Verilerde karakter varsa analiz yapılamaz.";
alertMsg[20][19] = "Veri üzerinde karakter varsa regresyon analizi yapılamaz.";
alertMsg[21][19] = "Eksik veri varsa kaydedilemez.";
alertMsg[22][19] = "Negatif bir sayı varsa çubuk grafiği oluşturulamaz.";
alertMsg[25][19] = "Sadece bir grup varsa, yığın çubuk grafiği oluşturulamaz.";
alertMsg[27][19] = "Sadece bir grup varsa, oran çubuk grafiği oluşturulamaz.";
alertMsg[29][19] = "Sadece bir grup varsa, yan-yana çubuk grafiği oluşturulamaz.";
alertMsg[31][19] = "Sadece bir grup varsa, iki taraflı çubuk grafiği oluşturulamaz.";
alertMsg[32][19] = "Negatif bir sayı varsa, dairesel grafik oluşturulamaz.";
alertMsg[33][19] = "Negatif bir sayı varsa, halka grafiği oluşturulamaz.";
alertMsg[34][19] = "Negatif bir sayı varsa, bant grafiği oluşturulamaz.";
alertMsg[35][19] = "Negatif bir sayı varsa, frekans tablosu oluşturulamaz.";
alertMsg[36][19] = "Bu çubuk grafiği sadece iki grup için oluşturulabilir.";
alertMsg[37][19] = "Bu hipotez testi sadece bir değişken için yapilabilir.";
alertMsg[38][19] = "mu sayı değil. Değeri girin ve yeniden deneyin!";
alertMsg[39][19] = "Standart sapma ya sıfır ya da sayı değil. Yeniden deneyin!";
alertMsg[40][19] = "Varyansı sayı değil. Değeri girin ve ardından yeniden deneyin!";
alertMsg[41][19] = "Bu hipotez testi sadece iki değişken ile yapılabilir. 1.si bir analiz değişkenidir ve 2.si bir grup değişkenidir. Grup değişkeninin sadece iki grubu olmalıdır.";
alertMsg[42][19] = "Hipotez testinin başlığı düzenlenemez!";
alertMsg[43][19] = "Basit doğrusal regresyon sadece bir grup içindir.";
alertMsg[44][19] = "1.:Ad, 2.:enlem, 3.:boylam, 4.:analysis değişken (isteğe bağlı) giriniz";
alertMsg[45][19] = "Beşten fazla değişken varsa GIS grafiği çizilemez.";
alertMsg[46][19] = "En az iki satır gereklidir! Tekrar deneyin."; // Grafik çubuğu;
alertMsg[47][19] = "Frekansda karakter verilerine izin verilmez yok! Tekrar deneyin."; // Grafik çubuğu;
alertMsg[48][19] = "Karakter verilerine izin verilmiyor! Tekrar deneyin."; // Gövde ve yaprak grafiği;
alertMsg[49][19] = "Gözlem sayısı 100'den az olmalıdır! Tekrar deneyin.";
alertMsg[50][19] = "Sayıları aralık başlangıcında veya adımında girin.";
alertMsg[51][19] = "Sayıları girin / satır sayısı aynı olmalı! Tekrar deneyin.";
alertMsg[52][19] = "Kategori ve frekans sayıları girin.";
alertMsg[53][19] = "Aralık boyutu aynı değil! Tekrar deneyin.";
alertMsg[54][19] = "X gözlemi, Y gözlemine eşit değil! Tekrar deneyin.";
alertMsg[55][19] = "!!! Sayfada veri yok";
alertMsg[56][19] = "Aynı değişken numarası seçildi.";
alertMsg[57][19] = "Aynı değişken numarası seçildi.";
alertMsg[58][19] = "Aynı değişken numarası seçildi.";
alertMsg[59][19] = "Aynı değişken numarası seçildi.";

svgStr[1][19] = "Çubuk grafiği";
svgStr[2][19] = "Daire grafiği";
svgStr[3][19] = "Halka grafiği";
svgStr[4][19] = "Bant grafiği";
svgStr[5][19] = "Çizgi grafiği";
svgStr[6][19] = "Nokta grafiği";
svgStr[7][19] = "Box-Whisker plotu";
svgStr[8][19] = "Kök ve yaprak plotu";
svgStr[9][19] = "Histogram";
svgStr[10][19] = "Dağılım diagramı";
svgStr[11][19] = "Hipotez testi: nüfus ortalaması";
svgStr[12][19] = "Hipotez testi: nüfus varyansı";
svgStr[13][19] = "Hipotez testi: iki nüfus varyansı";
svgStr[14][19] = "Hipotez testi: iki nüfus varyansı";
svgStr[15][19] = "Varyans analizi";
svgStr[16][19] = "Frekans";
svgStr[17][19] = "Oran";
svgStr[18][19] = "Grup";
svgStr[19][19] = " ";
svgStr[20][19] = "<h3> Özet Veriler <br> Frekans tablosu</h3>";
svgStr[21][19] = "Grup değişkeni";
svgStr[22][19] = "Satır değişkeni";
svgStr[23][19] = "Toplam";
svgStr[24][19] = "Daire boyutu";
svgStr[25][19] = "<h3>Frekans tablosu</h3>";
svgStr[26][19] = "Analiz değişkeni";
svgStr[27][19] = "Değişken değeri";
svgStr[28][19] = "Değişken etiketi";
svgStr[29][19] = "Frekans";
svgStr[30][19] = "Göreceli frekans";
svgStr[31][19] = "<h3>Çapraz tablo</h3>";
svgStr[32][19] = "Sütun değişkeni";
svgStr[33][19] = "Sıra değişkeni";
svgStr[34][19] = "Ortalama"
svgStr[35][19] = "Standart sapma"
svgStr[36][19] = "<h3>Histogram<br>Frekans tablosu</h3>";
svgStr[37][19] = "Grup adı";
svgStr[38][19] = "Aralık";
svgStr[39][19] = "Sap";
svgStr[40][19] = "Yaprak";
svgStr[41][19] = "Grup 1 yaprak";
svgStr[42][19] = "Grup 2 yaprak"
svgStr[43][19] = "<h3>Tanımlayıcı istatistikler</h3>";
svgStr[44][19] = "Gözlem";
svgStr[45][19] = "Minimum";
svgStr[46][19] = "Medyan";
svgStr[47][19] = "Maksimum";
svgStr[48][19] = "Toplam";
svgStr[49][19] = "<h3>Normallik testi</h3>";
svgStr[50][19] = "Beklenen frekans> 5 <br> tavsiye edilir";
svgStr[51][19] = "&chi;&#178; Test<br>Aralık i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][19] = "Veri<br>Beklenen frekans<br>(O<sub>i</sub>)";
svgStr[53][19] = "Normal dağılım<br>beklenen olasılık<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][19] = "Normal dağılım<br>beklenen frekans<br>(E<sub>i</sub>)";
svgStr[55][19] = "Aralık<br>&chi;&#178; değeri <br>(O<sub>i</sub>-E<sub>i</sub>)&#178; / E<sub>i</sub>";
svgStr[56][19] = "Chi toplam;&#178; değeri";
svgStr[57][19] = "Olasılık histogramı ve normal dağılım";
svgStr[58][19] = "Normal Q-Q plotu";
svgStr[59][19] = "Normal miktar";
svgStr[60][19] = "Korelasyon katsayısı";
svgStr[61][19] = "Belirleme katsayısı";
svgStr[62][19] = "Standart hata";
svgStr[63][19] = "Değişken";
svgStr[64][19] = "Değişken adı";
svgStr[65][19] = "Bağımsız değişken";
svgStr[66][19] = "Bağımlı değişken";
svgStr[67][19] = "Parametre";
svgStr[68][19] = "Tahmini değer";
svgStr[69][19] = "Değer";
svgStr[70][19] = "Kesişme";
svgStr[71][19] = "Eğim";
svgStr[72][19] = "Faktör";
svgStr[73][19] = "Karelerin toplamı";
svgStr[74][19] = "Özgürlük derecesi";
svgStr[75][19] = "Ortalama kareler";
svgStr[76][19] = "Regresyon";
svgStr[77][19] = "Hata";
svgStr[78][19] = "Toplam";
svgStr[79][19] = "<h3>Reqresyon analizi</h3>";
svgStr[80][19] = "Standart kalıntı Q-Q plotu";
svgStr[81][19] = "Standart kalıntı";
svgStr[82][19] = "Normal miktar";
svgStr[83][19] = "Kalıntı qrafiği";
svgStr[84][19] = "Tahmin edilen değer";
svgStr[85][19] = "İki Yönlü ANOVA";
svgStr[86][19] = "Güven aralığı grafiği";
svgStr[87][19] = "Kalıntı";
svgStr[88][19] = "İki boyutlu istatistikler";
svgStr[89][19] = "Dağılım grafiği matrisi";
svgStr[90][19] = "Çoklu karşılaştırma";
svgStr[91][19] = "İstatistik";
svgStr[92][19] = "Faktör";
svgStr[93][19] = "Seviyə";
svgStr[94][19] = "Eşleştirilmiş örnek veri grafiği";
svgStr[95][19] = "Standart kalıntı VS Tahmin grafiği";
svgStr[96][19] = "Standart kalıntı vs Kaldıraç grafiği";
svgStr[97][19] = "Kuk'un mesafe grafiği";
svgStr[98][19] = "Kuk'un mesafesi";
svgStr[99][19] = "Veri sıralaması";
svgStr[100][19] = "Ortalama fark";
svgStr[101][19] = "Ortalama testi";
svgStr[102][19] = "İşlem";
svgStr[103][19] = "Etkileşim";
svgStr[104][19] = "Toplam satır";
svgStr[105][19] = "Toplam sütun";
svgStr[106][19] = "Çoklu korelasyon katsayısı";
svgStr[107][19] = "<h3>Korelasyon analizi</h3>";
svgStr[108][19] = "Korelasyon matrisi";
svgStr[109][19] = "Faktör A - faktör B ortalama grafiği";
svgStr[110][19] = "Kaldıraç";
svgStr[111][19] = "Coğrafi bilgi grafiği";
svgStr[112][19] = "Aralık";
svgStr[113][19] = "Ortalama - standart sapma grafiği";
svgStr[114][19] = "Nüfus varyansı";
svgStr[115][19] = "Hipotez";
svgStr[116][19] = "Test";
svgStr[117][19] = "Varyans";
svgStr[118][19] = "Aralık değeri";
svgStr[119][19] = "Kategori";
svgStr[120][19] = "Mod";
svgStr[121][19] = "Kovaryans";
svgStr[122][19] = "Paskal üçgeni";
svgStr[123][19] = "Ortak olasılık";
svgStr[124][19] = "Koşullu";
svgStr[125][19] = "Ayrık dağılım";
svgStr[126][19] = "Sıra %";
svgStr[127][19] = "Sütun %";
svgStr[128][19] = "Toplam %";
svgStr[129][19] = "Çubuk Grafik Matrisi";
svgStr[130][19] = "Önceki Olasılık";
svgStr[131][19] = "Özdeğer";
svgStr[132][19] = "Özvektör";
svgStr[133][19] = "Çok Boyutlu Frekans Tablosu";
svgStr[134][19] = "Hiyerarşik Küme Grafiği";
svgStr[135][19] = "Mesafe";
svgStr[136][19] = "Tek";
svgStr[137][19] = "Tamamlandı";
svgStr[138][19] = "Ortalama";
svgStr[139][19] = "Merkez";
svgStr[140][19] = "Koğuş";
svgStr[141][19] = "Bağlantı";
svgStr[142][19] = "Number of Clusters <br>K";
svgStr[143][19] = "Bayes Information Criteria";
svgStr[144][19] = "Within Sum of Squares";
svgStr[145][19] = "Akaike Information Criteria";

svgStrU[1][19] = "Binom dağılımı";
svgStrU[2][19] = "Tekrar";
svgStrU[3][19] = "Ortalama";
svgStrU[4][19] = "Standart sapma";
svgStrU[5][19] = "Poisson dağılımı";
svgStrU[6][19] = "Geometrik dağılım";
svgStrU[7][19] = "Hipergeometrik dağılım";
svgStrU[8][19] = "Nüfus";
svgStrU[9][19] = "Örnek dağıtım";
svgStrU[10][19] = "Büyük sayılar yasası";
svgStrU[11][19] = "Kuyruk";
svgStrU[12][19] = "Baş";
svgStrU[13][19] = "Madeni para başı";
svgStrU[14][19] = "Baş sayısı";
svgStrU[15][19] = "Deneme sayısı";
svgStrU[16][19] = "Örnek ortalamaların dağılımı";
svgStrU[17][19] = "Tekrar";
svgStrU[18][19] = "Standart hata";
svgStrU[19][19] = "Nüfus ortalaması";
svgStrU[20][19] = "Güven aralığı";
svgStrU[21][19] = "Tahmin doğruluğu";
svgStrU[22][19] = "Numune ortalaması";
svgStrU[23][19] = "[TestStat]";
svgStrU[24][19] = "Dağıtım";
svgStrU[25][19] = "H\u2080'i Reddet";
svgStrU[26][19] = "H\u2080'i Kabul et";
svgStrU[27][19] = "p-dəğər";
svgStrU[28][19] = "[Karar] ";
svgStrU[29][19] = "[ANOVA]";
svgStrU[30][19] = "Korelasyon katsayını girin ve uygula düğmesinı tıklayın";
svgStrU[31][19] = "Regresyon";
svgStrU[32][19] = "Satır değişkeni";
svgStrU[33][19] = "Sütun değişkeni";
svgStrU[34][19] = "Ortalama"
svgStrU[35][19] = "Standart sapma"
svgStrU[36][19] = "<h3> Histogram<br>frekans tablosu</h3>";
svgStrU[37][19] = "Grup adı";
svgStrU[38][19] = "Aralık";
svgStrU[39][19] = "Kök";
svgStrU[40][19] = "Yarpak";
svgStrU[41][19] = "Grup 1 yaprak";
svgStrU[42][19] = "Grup 2 yaprak"
svgStrU[43][19] = "<h3>Tanımlayıcı istatistikler</h3>";
svgStrU[44][19] = "Gözlem";
svgStrU[45][19] = "Minimum";
svgStrU[46][19] = "Medyan";
svgStrU[47][19] = "Maksimum";
svgStrU[48][19] = "Toplam";
svgStrU[49][19] = "Üslü";
svgStrU[50][19] = "Üniforma";
svgStrU[51][19] = "Tahmin doğruluğu";
svgStrU[52][19] = "- Tıklayarak noktalar oluşturduktan sonra eStat bir regresyon çizgisi bulur.";
svgStrU[53][19] = "- Bir noktayı hareket ettirin veya silin. Regresyon çizgisinin değişimini izleyin.";
svgStrU[54][19] = "[Numunə istatistik] ";
svgStrU[55][19] = "[Numunə 1 istatistik] ";
svgStrU[56][19] = "[Numunə 2 istatistik] ";
svgStrU[57][19] = "Güven düzeyi";
svgStrU[58][19] = "Satır ve sütun bağımsız";
svgStrU[59][19] = "Satır ve sütun bağımslı";
svgStrU[60][19] = "Gözlemlenen dağılım";
svgStrU[61][19] = "Teorik dağılım";
svgStrU[62][19] = "Gözlemlenen frekans uygunluk testi";
svgStrU[63][19] = "Wilcoxon sıra toplamı testi";
svgStrU[64][19] = "Wilcoxon Sıra toplamı test tablosu";
svgStrU[65][19] = "Kruskal-Wallis testi";
svgStrU[66][19] = "Kruskal-Wallis H dağılımı";
svgStrU[67][19] = "Kruskal-Wallis H İstatistik";
svgStrU[68][19] = "Wilcoxon işaretli sıra toplamı testi";
svgStrU[69][19] = "İşaretli test";
svgStrU[70][19] = "Friedman testi";
svgStrU[71][19] = "Friedman S İstatistik";
svgStrU[72][19] = "Friedman S dağıtımı";
svgStrU[73][19] = "t değeri (veya Z)";
svgStrU[74][19] = "Chi kare değeri";
svgStrU[75][19] = "Numune varyansı";
svgStrU[76][19] = "Numunə ortalamaların farkı";
svgStrU[77][19] = "Numunə varyansının oranı";
svgStrU[78][19] = "Varyans varsayımı";
svgStrU[79][19] = "Özet veri";
svgStrU[80][19] = "Birden çok seçim";
svgStrU[81][19] = "En fazla iki grup seçin";
svgStrU[82][19] = "X değişkeni";
svgStrU[83][19] = "Y değişkeni";
svgStrU[84][19] = "tarafından";
svgStrU[85][19] = "Grup değişkeni yok";
svgStrU[86][19] = "Seçilen veriler:";
svgStrU[87][19] = "Ham veri";
svgStrU[88][19] = "Değişken adını tıklayarak değişkenleri seçin";
svgStrU[89][19] = "Eksik gözlemler";
svgStrU[90][19] = "Sıralama toplamı";
svgStrU[91][19] = "Boylam";
svgStrU[92][19] = "Enlem";
svgStrU[93][19] = "En az bir konum çifti farklı";
svgStrU[94][19] = "Wilcoxon işaretli sıra toplamı dağılımı";
svgStrU[95][19] = "Eşleştirilmiş değişken";
svgStrU[96][19] = "Eşleştirilmiş veri";
svgStrU[97][19] = "Bağımsızlık Testi";
svgStrU[98][19] = "Simülasyon";
svgStrU[99][19] = "Rastgele sayı";
svgStrU[100][19] = "Normal dağılım";
svgStrU[101][19] = "t dağılım";
svgStrU[102][19] = "&chi;&#178; dağılım";
svgStrU[103][19] = "F dağılım";
svgStrU[104][19] = "HSD öğrencileştirilmiş aralık dağılımı";
svgStrU[105][19] = "1. Çeyrek";
svgStrU[106][19] = "3. Çeyrek";
svgStrU[107][19] = "Çeyrekler arası aralık";
svgStrU[108][19] = "Varyasyon katsayısı";
svgStrU[109][19] = "Kümüle göreli frekans (%)";
svgStrU[110][19] = "Tekdüzen dağın maksimum tamsayı sayısı";
svgStrU[111][19] = "Mouse'i kullanarak noktayı taşıyın";
svgStrU[112][19] = "Değiştirilmiş";
svgStrU[113][19] = "Değişimsiz";
svgStrU[114][19] = "Satır";
svgStrU[115][19] = "Yüzde Değişim";
svgStrU[116][19] = "Basit Dizin";
svgStrU[117][19] = "Gecikme Süresi";
svgStrU[118][19] = "Fark";
svgStrU[119][19] = "Otokorelasyon";
svgStrU[120][19] = "Günlük";
svgStrU[121][19] = "Kare Kök";
svgStrU[122][19] = "Box-Cox";
svgStrU[123][19] = "Temel zaman";
svgStrU[124][19] = "Ortalanmış Hareketli Ortalama";
svgStrU[125][19] = "Üstel Düzeltme";
svgStrU[126][19] = "Merkezli Hareketli Medyan";
svgStrU[127][19] = "Model";
svgStrU[128][19] = "Hareketli Ortalama";
svgStrU[129][19] = "Çift Hareketli Ortalama";
svgStrU[130][19] = "Holt Çift Üstel Düzeltme";
svgStrU[131][19] = "Mevsimsel Dizin";
svgStrU[132][19] = "Holt-Winters Çarpımsal Mevsimsel Model";
svgStrU[133][19] = "Sezonluk Seriler";
svgStrU[134][19] = "Engelle";
svgStrU[135][19] = "Küme Analizi";
svgStrU[136][19] = "Küme";
svgStrU[137][19] = "Karar Ağacı";
svgStrU[138][19] = "Karar Kuralı Koşulu";
svgStrU[139][19] = "Karar";
svgStrU[140][19] = "Yineleme";
svgStrU[141][19] = "Paralel Grafik";
svgStrU[142][19] = "Sınıflandırma";
svgStrU[143][19] = "Sınıflandırma İşlevi";
svgStrU[144][19] = "Sınıflandırma Sonucu";
svgStrU[145][19] = "Karar";
svgStrU[146][19] = "Yanlış Sınıflandırma Oranı";
svgStrU[147][19] = "Hücre";
svgStrU[148][19] = "Eğitim Verileri";
svgStrU[149][19] = "Veriler Test Ediliyor";
