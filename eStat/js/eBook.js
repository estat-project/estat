// eBook.js

// function to evaluate multiple choice question
  function radio(numQ,form) {
    var eval;
    var len = form.item.length;
    var ith = 0;
    var i;
    for (i=0; i<len; i++) {
      if (form.item[i].checked) {
        ith = i+1;
        break;
      }
    }
    document.getElementById(ansID[numQ]).style.font = "bold 14px arial,serif";
    if (ith == 0) {
      if (langNum == 0) eval = "라디오 버튼을 누르세요!!!";
      else eval = "!!! Click Radio Button";
      document.getElementById(ansID[numQ]).value = eval;
    }
    else if (ith == ans[numQ]) {
      if (langNum == 0) eval = "정답에요. 정말 잘했어요! ❤ 😉";
      else eval = "Good! You are right 😉";
      document.getElementById(ansID[numQ]).style.color = "lime";
      document.getElementById(ansID[numQ]).value = eval;
    }
    else {
      if (langNum == 0) eval = "틀렸습니다. 다시 하세요!!! 😢";
      else eval = "Wrong! Try again 😢";
      document.getElementById(ansID[numQ]).style.color = "red";
      document.getElementById(ansID[numQ]).value = eval;
    }  
  }

// eStat link address
    var temp      = "http://www.estat.me/estat/eStat/?json=";
    var nString   = 200;
    var addrStr   = new Array(nString);
    addrStr[0]   = "../../../eStat/index.html";
    addrStr[1]   = "../../../eStatH/index.html";
    addrStr[2]   = "../../../eStatU/index.html";
    addrStr[3]   = "https://www.youtube.com/watch?v=jjfCqdDZZ6Q";
    addrStr[4]   = temp+JSON.stringify({"dataURL":"../Example/eBook/A21Summary_StudentByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[5]   = temp+JSON.stringify({"dataURL":"../Example/eBook/A34Raw_Gender.csv","analysisVar":1,"graphNum":1});
    addrStr[6]   = temp+JSON.stringify({"dataURL":"../Example/eBook/Ch3_Ex_Mixed_Survey.csv","graphNum":1});
    addrStr[7]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020201_Summary_Gender.csv","analysisVar":1,"groupVars":[2],"graphNum":1});
    addrStr[8]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020202_OECD_LifeExpectancy.csv","analysisVar":1,"groupVars":[2],"graphNum":1});
    addrStr[9]   = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020203_Summary_StudentByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[10]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020204_Summary_PopulationByGenderKorea.csv","analysisVar":1,"groupVars":[2,3],"graphNum":1});
    addrStr[11]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020205_OECD_ExportImport__2017.csv","analysisVar":1,"groupVars":[2,3],"graphNum":14});
    addrStr[12]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020301_Raw_Gender.csv","analysisVar":1,"graphNum":1});
    addrStr[13]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX020302_Raw_MaritalByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":1});
    addrStr[14]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030201_Continuous_OtterLength.csv","analysisVar":1,"graphNum":15});
    addrStr[15]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030202_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":15});
    addrStr[16]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030203_Continuous_CalorieByHotDog.csv","analysisVar":2,"groupVars":[1],"graphNum":15});
    addrStr[17]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX030301_Continuous_HeightWeightByGender.csv","analysisVar":2,"groupVars":[3],"graphNum":20});
    addrStr[18]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040101_Categorical_Gender.csv","analysisVar":1,"groupVars":[3],"graphNum":1});
    addrStr[19]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040102_Continuous_OtterLength.csv","analysisVar":1,"groupVars":[3],"graphNum":19});
    addrStr[20]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040201_Categorical_MaritalByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":1});
    addrStr[21]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040202_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":19});
    addrStr[22]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040301_Continuous_QuizScore.csv","analysisVar":1,"graphNum":15});
    addrStr[23]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX040310_Continous_TeacherAgeByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":16});
    addrStr[24]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX070104_Height.csv","analysisVar":1,"graphNum":25});
    addrStr[25]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080103_WageByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":29});
    addrStr[26]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080104_TypingSpeedEducation.csv","analysisVar":1,"groupVars":[2],"graphNum":29});
    addrStr[27]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090101_EnglishScoreByGrade.csv","analysisVar":2,"groupVars":[1],"graphNum":33});
    addrStr[28]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090201_GasMileage.csv","analysisVar":3,"groupVars":[1],"graphNum":33});
    addrStr[29]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX090301_YieldByRiceFertilizer.csv","analysisVar":3,"groupVars":[2,1],"graphNum":33});
    addrStr[30]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100101_CookieWeight.csv","analysisVar":1,"graphNum":25});
    addrStr[31]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100201_ScoreByDept.csv","analysisVar":2,"groupVars":[1],"graphNum":29});
    addrStr[32]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100202_AgeOfCouple.csv","analysisVar":1,"graphNum":25});
    addrStr[33]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX100301_JobSatisfaction.csv","analysisVar":2,"groupVars":[1],"graphNum":33});
    addrStr[34]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110102_AgeOfLibraryVisitor.csv","analysisVar":1,"graphNum":19});
    addrStr[35]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110201_GlassesByGender.csv","analysisVar":1,"groupVars":[2,3],"graphNum":14});
    addrStr[36]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX110202_BeverageByRegion.csv","analysisVar":1,"groupVars":[2,3,4],"graphNum":14});
    addrStr[37]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120101_SalesByAdvertise.csv","analysisVar":2,"groupVars":[1],"graphNum":20});
    addrStr[38]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120104_Iris.csv","analysisVar":2,"groupVars":[3,4,5],"graphNum":35});
    addrStr[39]  = temp+JSON.stringify({"dataURL":"../Example/eBook/EX120301_TreeVolume.csv","analysisVar":3,"groupVars":[1,2],"graphNum":35});
    addrStr[40]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020201_OECD_AlcoholExpenditure_2013.csv","graphNum":1});
    addrStr[41]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020202_WORLD_ObesityRatio_Age15over__2017.csv","graphNum":1});
    addrStr[42]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020203_Rdatasets_VADeaths.csv","graphNum":1});
    addrStr[43]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020204_OECD_NationalIncome__2017.csv","graphNum":1});
    addrStr[44]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020205_Summary_TemperatureBySeason.csv","graphNum":1});
    addrStr[45]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020301_Raw_MathPreferenceByGender.csv","graphNum":1});
    addrStr[46]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR020302_Raw_MathPreferenceByGender.csv","graphNum":1});
    addrStr[47]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030201_Continuous_BikeRoad.csv","graphNum":1});
    addrStr[48]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030202_Rdatasets_Rivers.csv","graphNum":1});
    addrStr[49]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030203_Rdatasets_Precip.csv","graphNum":1});
    addrStr[50]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030204_Continuous_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[51]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030205_Rdatasets_PlantGrowth.csv","graphNum":1});
    addrStr[52]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030206_Rdatasets_InsectSprays.csv","graphNum":1});
    addrStr[53]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030301_Rdatasets_faithful.csv","graphNum":1});
    addrStr[54]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030302_Continuous_IncomeAge.csv","graphNum":1});
    addrStr[55]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR030303_Rdatasets_Mtcars.csv","graphNum":1});
    addrStr[56]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040101_Categorical_VegetablePrefByGender.csv","graphNum":1});
    addrStr[57]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040102_Continuous_LibraryVisitorAge.csv","graphNum":1});
    addrStr[58]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040201_Categorical_VegetablePrefByGender.csv","graphNum":1});
    addrStr[59]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040202_Continuous_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[60]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040301_Continuous_OtterLength.csv","graphNum":1});
    addrStr[61]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR040302_Rdatasets_ToothGrowth.csv","graphNum":1});
    addrStr[62]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR070101_Weight.csv","graphNum":1});
    addrStr[63]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR080101_ToothCleanByBrushMethod.csv","graphNum":1});
    addrStr[64]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR080102_CoupleAge.csv","graphNum":1});
    addrStr[65]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090101_Rdatasets_PlantGrowth.csv","graphNum":1});
    addrStr[66]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090201_WheatAreaYield.csv","graphNum":1});
    addrStr[67]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR090301_LifeByTemeratureHumidity.csv","graphNum":1});
    addrStr[68]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100101_CompetencyScore.csv","graphNum":1});
    addrStr[69]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100201_ScoreByMethod.csv","graphNum":1});
    addrStr[70]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100202_DifferenceOfMileage.csv","graphNum":1});
    addrStr[71]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR100301_ScoreByMixingMethod.csv","graphNum":1});
    addrStr[72]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR110102_OtterLength.csv","graphNum":1});
    addrStr[73]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR110201_TV_Reading.csv","graphNum":1});
    addrStr[74]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120101_MidtermFinal.csv","graphNum":1});
    addrStr[75]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120102_SomkingObesityExercise.csv","graphNum":1});
    addrStr[76]  = temp+JSON.stringify({"dataURL":"../Example/eBook/PR120301_SomkingObesityExercise.csv","graphNum":1});
    addrStr[77]  = "../../../eStatU/10BoxGraph.htm";
    addrStr[78]  = "../../../eStatU/11RandomNumber.htm";
    addrStr[79]  = "../../../eStatU/31CorrelationEng.htm";
    addrStr[80]  = "../../../eStatU/32RegressionEng.htm";
    addrStr[81]  = "../../../eStatU/41BinomialEng.htm";
    addrStr[82]  = "../../../eStatU/42BinomialEng.htm";
    addrStr[83]  = "../../../eStatU/44PoissonEng.htm";
    addrStr[84]  = "../../../eStatU/45GeometricEng.htm";
    addrStr[85]  = "../../../eStatU/46HyperGeoEng.htm";
    addrStr[86]  = "../../../eStatU/50ExponentialEng.htm";
    addrStr[87]  = "../../../eStatU/51NormalEng.htm";
    addrStr[88]  = "../../../eStatU/52NormalEng.htm";
    addrStr[89]  = "../../../eStatU/54TdistEng.htm";
    addrStr[90]  = "../../../eStatU/56ChisqEng.htm";
    addrStr[91]  = "../../../eStatU/58FdistEng.htm";
    addrStr[92]  = "../../../eStatU/61SampleEng.htm";
    addrStr[93]  = "../../../eStatU/62SampleEng.htm";
    addrStr[94]  = "../../../eStatU/63SampleEng.htm";
    addrStr[95]  = "../../../eStatU/64SampleEng.htm";
    addrStr[96]  = "../../../eStatU/65ConfidenceIntervalMu.htm";
    addrStr[97]  = "../../../eStatU/65ConfidenceIntervalMuN.htm";
    addrStr[98]  = "../../../eStatU/66ConfidenceIntervalSigma.htm";
    addrStr[99]  = "../../../eStatU/67ConfidenceIntervalP.htm";
    addrStr[100] = "../../../eStatU/67ConfidenceIntervalPN.htm";
    addrStr[101] = "../../../eStatU/70TestingMu.htm";
    addrStr[102] = "../../../eStatU/72TestingSigma.htm";
    addrStr[103] = "../../../eStatU/74TestingP.htm";
    addrStr[104] = "../../../eStatU/75TestingMuAlpha.htm";
    addrStr[105] = "../../../eStatU/76TestingMuAlphaBeta.htm";
    addrStr[106] = "../../../eStatU/80TestingMu12.htm";
    addrStr[107] = "../../../eStatU/82TestingSigma12.htm";
    addrStr[108] = "../../../eStatU/84TestingP12.htm";
    addrStr[109] = "../../../eStatU/90TestingANOVA.htm";
    addrStr[110] = "../../../eStatU/91TestingFit.htm";
    addrStr[111] = "../../../eStatU/92TestingIndependence.htm";
    addrStr[112] = "../../../eStatU/94SignTest.htm";
    addrStr[113] = "../../../eStatU/950SignedRankDist.htm";
    addrStr[114] = "../../../eStatU/95SignedRank.htm";
    addrStr[115] = "../../../eStatU/960RankSumDist.htm";
    addrStr[116] = "../../../eStatU/96RankSum.htm";
    addrStr[117] = "../../../eStatU/980KruskalDist.htm";
    addrStr[118] = "../../../eStatU/98Kruskal.htm";
    addrStr[119] = "../../../eStatU/990FriedmanDist.htm";
    addrStr[120] = "../../../eStatU/995StudentRangeDist.htm";
    addrStr[121] = "../../../eStatU/99Friedman.htm";
    addrStr[122] = temp+JSON.stringify({"dataURL":"../Example/eBook/EX070104_Height.csv","analysisVar":1,"graphNum":27});
    addrStr[123] = temp+JSON.stringify({"dataURL":"../Example/eBook/EX080103_WageByGender.csv","analysisVar":2,"groupVars":[1],"graphNum":31});
    addrStr[124] = "../../../eStatU/05WordCloud.htm";
    addrStr[125] = "../../../eStatU/02LineGraph.htm";
    addrStr[126] = "../../../eStatU/40Permutation.htm";
    addrStr[127] = "../../../eStatU/40AdditionRule.htm";
    addrStr[128] = "../../../eStatU/40Complementary.htm";
    addrStr[129] = "../../../eStatU/40DiscreteDistribution.htm";
    addrStr[130] = "../../../eStatU/40MultiplicationRule.htm";
    addrStr[131] = "../../../eStatU/40Pascal.htm";
    addrStr[132] = "../../../eStatU/43LawOfLarge.htm";
    addrStr[133] = "../../../eStatU/50NormalComparison.htm";
    addrStr[134] = "../../../eStatU/33TimeseriesSmoothing.htm";
    addrStr[135] = "../../../eStatU/34TimeseriesTransformation.htm";
    addrStr[136] = "../../../eStatU/35TimeseriesRegression.htm";
    addrStr[137] = "../../../eStatU/36TimeseriesHeuristic.htm";
    addrStr[138] = "../../../eStatU/37TimeseriesSeasonal.htm";
    addrStr[139] = "../../../eStatU/38TimeseriesHoltWinter.htm";
    addrStr[140] = "../../../eStatU/39TimeseriesAutoRegressive.htm";

    // eStatM, eStatH
    addrStr[141] = "../../../eStatU/01BarChart.htm";
    addrStr[142] = "../../../eStatU/05WordCloud.htm";
    addrStr[143] = "../../../eStatU/07StemLeafPlot.htm";
    addrStr[144] = "../../../eStatU/08Histogram.htm";
    addrStr[145] = "../../../eStatU/09RelativeFrequency.htm";
    addrStr[146] = "../../../eStatM/10DotGraph.htm";
    addrStr[147] = "../../../eStatU/40Permutation.htm";
    addrStr[148] = "../../../eStatU/41BinomialEng.htm";
    addrStr[149] = "../../../eStatU/42BinomialEng.htm";
    addrStr[150] = "../../../eStatU/51NormalEng.htm";
    addrStr[151] = "../../../eStatU/52NormalEng.htm";
    addrStr[152] = "../../../eStatU/61SampleEng.htm";
    addrStr[153] = "../../../eStatU/62SampleEng.htm";
    addrStr[154] = "../../../eStatU/63SampleEng.htm";
    addrStr[155] = "../../../eStatU/64SampleEng.htm";
    addrStr[156] = "../../../eStatH/65ConfidenceIntervalMu_H.htm";
    addrStr[157] = "../../../eStatM/30ScatterPlotH.htm";
    addrStr[158] = "../../../eStatU/31CorrelationEng.htm";
    addrStr[159] = "../../../eStatU/32RegressionEng.htm";
    addrStr[160] = "../../../eStatU/11RandomNumber.htm";
    addrStr[161] = "../../../eStatU/40AdditionRule.htm";
    addrStr[162] = "../../../eStatU/40Complementary.htm";
    addrStr[163] = "../../../eStatU/40DiscreteDistribution.htm";
    addrStr[164] = "../../../eStatU/40MultiplicationRule.htm";
    addrStr[165] = "../../../eStatU/40Pascal.htm";
    addrStr[166] = "../../../eStatU/43LawOfLarge.htm";
    addrStr[167] = "../../../eStatU/50NormalComparison.htm";
    addrStr[168] = "../../../eStatU/02LineGraph.htm";
    addrStr[169] = "../../../eStatU/30ScatterPlotU.htm";

// eLearning
    addrStr[170] = "../../../eLearning/kr/eStatBasicOperation.html";
    addrStr[171] = "../../../eLearning/kr/index.html";
    addrStr[172] = "../../../eStatU/90TestingANOVA_RBD.htm";
    addrStr[173] = "../../../eStatU/90TestingANOVA_Latin.htm";
    addrStr[174] = "../../../eStatU/90TestingANOVA_TwoFactors.htm";
    addrStr[175] = "../../../eStatU/30ScatterPlotU.htm";
    addrStr[176] = "../../../eStatU/32RegressionAnalysis.htm";
    addrStr[177] = "../../../eStatU/32RegressionAnalysis2.htm";
// eStatM
    addrStr[181] = "../../../eStatM/index.html";

