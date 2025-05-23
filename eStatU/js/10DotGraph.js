      var chart = d3.select("#chart")
      var svgWidth    = 640;
      var svgHeight   = 400;  // 모집단 그래프 영역
      var margin, graphWidth, graphHeight;
      margin      = {top: 20, bottom: 100, left: 20, right: 20};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, ith;
      var x1, x2, y1, y2, cx, cy, ty;
      var nint, step, buffer, nvalue, gxmin, gxmax, gxrange, xScale, strMode, maxfreq; 
      var nn, xbar, medi, mini, maxi, range, varS, stdS, left, right, mode, nvalue;
      var nn3, xba3, medi3, mini3, maxi3, range3, stdS3;
      var rowmax = 100;
      var sdata      = new Array(rowmax);
      var sdotx      = new Array(rowmax); 
      var dataValue  = new Array(rowmax);
      var dvalueFreq = new Array(rowmax);

      var radius = 7;
      var fontsize = "1em";

      var generator, title;
      document.getElementById("msgMed").innerHTML   = svgStr[46][langNum]; 
      document.getElementById("msgMin").innerHTML   = svgStr[45][langNum]; 
      document.getElementById("msgMax").innerHTML   = svgStr[47][langNum]; 
      document.getElementById("msgRange").innerHTML = svgStr[112][langNum]; 
      document.getElementById("msgVariance").innerHTML = svgStr[117][langNum]; 
      document.getElementById("msgMode").innerHTML  = svgStr[120][langNum]; 

      document.getElementById("datasort").disabled = true;    
      document.getElementById("nn").disabled    = true;    
      document.getElementById("xsum").disabled  = true; 
      document.getElementById("xbar").disabled  = true; 
      document.getElementById("medi").disabled  = true;   
      document.getElementById("mode").disabled  = true;   
      document.getElementById("mini").disabled  = true;  
      document.getElementById("maxi").disabled  = true;  
      document.getElementById("range").disabled = true; 
      document.getElementById("varS").disabled  = true; 
      document.getElementById("stdS").disabled  = true; 

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat2("#data1");  
        nn   = stat.n;
        document.getElementById("datasort").value = data;    
        document.getElementById("nn").value    = stat.n;    
        document.getElementById("xsum").value  = f2(stat.xsum);
        document.getElementById("xbar").value  = f2(stat.xbar);
        document.getElementById("medi").value  = f2(stat.medi);  
        document.getElementById("range").value = f2(stat.range);  
        document.getElementById("mini").value  = f2(stat.mini);  
        document.getElementById("medi").value  = f2(stat.medi);  
        document.getElementById("maxi").value  = f2(stat.maxi);  
        document.getElementById("varS").value  = f2(stat.var);  
        document.getElementById("stdS").value  = f2(stat.std); 
        document.getElementById("mode").value  = stat.mode;  
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      // erase Dot Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("data1").value = "";
        document.getElementById("datasort").value = "";    
        document.getElementById("nn").value    = "";   
        document.getElementById("xsum").value  = ""; 
        document.getElementById("xbar").value  = ""; 
        document.getElementById("medi").value  = "";  
        document.getElementById("range").value = "";   
        document.getElementById("mini").value  = "";   
        document.getElementById("medi").value  = ""; 
        document.getElementById("maxi").value  = "";   
        document.getElementById("varS").value  = "";  
        document.getElementById("stdS").value  = ""; 
        document.getElementById("mode").value  = "";   
      })

      // Draw Dot Graph ======================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        nn    = stat.n;  
        for (i=0; i<nn; i++) {
            if (isNaN(data[i]) ) { //문자 데이터 체크
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
        }
  
        xbar  = stat.xbar;
        range = stat.range;  
        mini  = stat.mini;  
        medi  = stat.medi;  
        maxi  = stat.maxi; 
        varS  = stat.var;
        stdS  = stat.std;
        left  = xbar - stdS;
        right = xbar + stdS;  
        gxmin = xbar - 4*stdS;
        gxmax = xbar + 4*stdS;
        gxrange = gxmax - gxmin;
        drawSimpleDotGrpah();

        // draw dot graph simulation
        x1 = margin.left + graphWidth/2;
        y1 = margin.top + graphHeight/2 + 55;
        chart.append("text").attr("x", x1).attr("y", y1).text("  ***  "+svgStrU[98][langNum]+"  *** ("+svgStrU[111][langNum]+")")
             .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        // draw x axis for simulation
        ty = margin.top + 3*graphHeight/4 + 40; 
        xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale))                  
        // data transfer for simulation
        for (i=0; i<nn; i++) sdata[i] = data[i];
        cy = ty - 10; 
        for (i=0; i<nn; i++) {
          cx = margin.left + (sdata[i] - gxmin)*graphWidth/gxrange;
          sdotx[i] = cx;
          chart.append("circle")
               .attr("cx",cx).attr("cy",cy).attr("r",radius).attr("fill",myColor[i])
//             .on("click", clicked)
               .call(drag())
        }
        drawDotGrpahSimulation(sdata)
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width  = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

// basic statistics function ============================================
simplestat2 = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
	         .map(parseFloat);                      // [8.0, 8.0, 9.0]
	if(isNaN(data[0])) data = [];
        n = data.length;
        sum = 0;
        sumsq = 0;
        data.forEach(function(d) {
          sum += d;
          sumsq += d*d;
        });
        xbar = sum / n;
        v = (sumsq - n*xbar*xbar) / (n);
        s = Math.sqrt(v)
        data.sort(function(a, b) { return a - b; });
        mini  = data[0];
        maxi  = data[n-1];
        range = maxi - mini;
        medi = medianCalc(n,data);
        var tdata = new Array(n);
        var ntemp; 
        if (n%2 == 1) { // odd
          ntemp = (n+1)/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp-1; i<n; i++) tdata[i-ntemp+1] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        else {
          ntemp = n/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp; i<n; i++) tdata[i-ntemp] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        iqr = q3 - q1;
        // mode
        nvalue = modeCalc(n, data, dataValue, dvalueFreq) ;
        maxfreq = dvalueFreq[0];
        for (i = 1; i < nvalue; i++) {
          if (dvalueFreq[i] > maxfreq) maxfreq = dvalueFreq[i];
        }
        strMode ="";
        if (maxfreq > 1) {
          for (i = 0; i < nvalue; i++) {
            if (dvalueFreq[i] == maxfreq) strMode += (dataValue[i]).toString() + " ";
          }
        }
        return {'n':n, 'xbar':xbar, 'xsum':sum, 'sumsq':sumsq, 'var':v, 'std':s, 'mini':mini, 'q1':q1, 'medi':medi, 'q3':q3, 'maxi':maxi, 'range':range, 'iqr':iqr, 'mode': strMode};
}
// median calculation
function medianCalc(n, data) {
        if (n < 2) return;
        if (n%2 == 1) { // odd
          return data[(n+1)/2 -1];
        }
        else { // even
          return ( data[n/2 -1] + data[(n+2)/2 -1] ) / 2.;
        }
}
// basic stat for sdata 
function simplestat3(sdata) {
        var i, sum, sumsq, xbar, v, s, ntemp;
        var mini,q1,medi,q3, maxi,range, iqr;
        var tdata = new Array(nn);

        sum = 0;
        sumsq = 0;
        for (i=0; i<nn; i++) {
          sum += sdata[i];
          sumsq += sdata[i]*sdata[i];
        }
        xbar = sum / nn;
        v = (sumsq - nn*xbar*xbar) / (nn);
        s = Math.sqrt(v)

        sdata.sort(function(a, b) { return a - b; });
        sdotx.sort(function(a, b) { return a - b; });
        mini  = sdata[0];
        maxi  = sdata[nn-1];
        range = maxi - mini;
        medi = medianCalc(nn,sdata);
        if (nn%2 == 1) { // odd
          ntemp = (nn+1)/2;
          for (i=0; i<ntemp; i++) tdata[i] = sdata[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp-1; i<nn; i++) tdata[i-ntemp+1] = sdata[i];
          q3 = medianCalc(ntemp,tdata)
        }
        else {
          ntemp = nn/2;
          for (i=0; i<ntemp; i++) tdata[i] = sdata[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp; i<nn; i++) tdata[i-ntemp] = sdata[i];
        }
        iqr = q3 - q1;
        return {'n':nn, 'xbar':xbar,'xsum':sum, 'sumsq':sumsq, 'var':v, 'std':s, 'mini':mini, 'q1':q1, 'medi':medi, 'q3':q3, 'maxi':maxi, 'range':range, 'iqr':iqr};
}
  // Sorting in ascending and count each value frequency
  function modeCalc(dobs, dataA, dataValue, dvalueFreq) {
    var i, j, temp;
    var nvalue = 0;
    for (i = 0; i < dobs; i++) {
        dvalueFreq[i] = 0;
    }
    dataValue[nvalue] = dataA[0];
    dvalueFreq[nvalue] = 1;
    nvalue = 0;
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
// draw dot graph for input data
function drawSimpleDotGrpah() {
        var xavg, xmed;
        ty    = margin.top + graphHeight/4;
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

        // draw dot graph
        cy = ty - 10; 
        for (i=0; i<nn; i++) {
          cx = margin.left + (data[i] - gxmin)*graphWidth/gxrange;
          chart.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radius)
               .attr("fill",myColor[i])
        }
        // draw xbar line 
        xavg = margin.left + (xbar-gxmin)*graphWidth/gxrange;
        xmed = margin.left + (medi-gxmin)*graphWidth/gxrange;
        y1 = ty + 25;
        y2 = y1 - 60;
        chart.append("line").attr("x1",xavg).attr("x2",xavg).attr("y1",y1).attr("y2",y2).style("stroke","green")
        chart.append("text").attr("x", xavg).attr("y", y1+15).text("\u03BC="+f2(xbar))
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        chart.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1+25).attr("y2",y2).style("stroke","red")
        chart.append("text").attr("x", xmed).attr("y", y1+40).text("m="+f2(medi))
             .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle")
        x1 = margin.left + (left-gxmin)*graphWidth/gxrange;
        x2 = margin.left + (right-gxmin)*graphWidth/gxrange;   
        chart.append("text").attr("x", x1).attr("y", y1+15).text("\u03BC-\u03C3")
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        chart.append("text").attr("x", x2).attr("y", y1+15).text("\u03BC+\u03C3")
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        chart.append("text").attr("x", x2+50).attr("y", y1+15).text("\u03C3="+f2(stdS))
             .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        chart.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y1).style("stroke","green")
        chart.append("circle").attr("cx",x1).attr("cy",y1).attr("r",2).style("fill","green")
        chart.append("circle").attr("cx",xavg).attr("cy",y1).attr("r",2).style("fill","green")
        chart.append("circle").attr("cx",x2).attr("cy",y1).attr("r",2).style("fill","green")

}
// draw dot graph for simulation data
function drawDotGrpahSimulation(sdata) {
        chart.selectAll("text.simul").remove();
        chart.selectAll("line.simul").remove();
        chart.selectAll("circle.simul").remove();
        var xavg, xmed;
        stat3  = simplestat3(sdata);
        nn3    = stat3.n;
        xbar3  = stat3.xbar;
        medi3  = stat3.medi;  
        stdS3  = stat3.std; 
        left3  = xbar3 - stdS3;
        right3 = xbar3 + stdS3; 

        // draw xbar line 
        xavg = margin.left + (xbar3-gxmin)*graphWidth/gxrange;
        xmed = margin.left + (medi3-gxmin)*graphWidth/gxrange;
        ty = margin.top + 3*graphHeight/4 + 40; 
        y1 = ty + 25;
        y2 = y1 - 60;
        chart.append("line").attr("x1",xavg).attr("x2",xavg).attr("y1",y1).attr("y2",y2)
             .style("stroke","green").attr("class","simul")
        chart.append("text").attr("x", xavg).attr("y", y1+15).text("\u03BC="+f2(xbar3))
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle").attr("class","simul")
        chart.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1+25).attr("y2",y2)
             .style("stroke","red").attr("class","simul")
        chart.append("text").attr("x", xmed).attr("y", y1+40).text("m="+f2(medi3))
             .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle")
        x1 = margin.left + (left3-gxmin)*graphWidth/gxrange;
        x2 = margin.left + (right3-gxmin)*graphWidth/gxrange;   
        chart.append("text").attr("x", x1).attr("y", y1+15).text("\u03BC-\u03C3").attr("class","simul")
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        chart.append("text").attr("x", x2).attr("y", y1+15).text("\u03BC+\u03C3").attr("class","simul")
             .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        chart.append("text").attr("x", x2+50).attr("y", y1+15).text("\u03C3="+f2(stdS3)).attr("class","simul")
             .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        chart.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y1).style("stroke","green").attr("class","simul")
        chart.append("circle").attr("cx",x1).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")
        chart.append("circle").attr("cx",xavg).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")
        chart.append("circle").attr("cx",x2).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")
}
// mouse drag
function drag() {

   return d3.drag()
            .on("start", function(d) {
               d3.event.sourceEvent.stopPropagation();
	       d3.select(this)
	         .attr("r", radius*2)
               var x = d3.event.x;
               for (i=nn; i>0; i--) {
                  if ( Math.abs(x - sdotx[i-1]) < (radius) ) {ith =i-1; break;} 
               }
            })
            .on("drag", function(d) {
               var x = d3.event.x;
	       d3.select(this).attr("cx", x);

            })
            .on("end", function(d) {
               var x = d3.event.x;
               if (x < margin.left) {
                 x = margin.left;
               }
               if (x > margin.left + graphWidth) {
                 x = margin.left + graphWidth;
               }
	       d3.select(this)
                 .attr("cx", x)
                 .attr("r", radius*2)
                 .transition()
                 .attr("r", radius)
               sdata[ith] = gxmin + gxrange*(x-margin.left)/graphWidth
               sdotx[ith] = x;
	       drawDotGrpahSimulation(sdata)
            });
}
// mouse clicked
function clicked(d, i) {
    if (d3.event.defaultPrevented) return; // dragged
    d3.select(this).transition()
        .attr("fill", "black")
        .attr("r", radius * 2)
      .transition()
        .attr("r", radius)
        .attr("fill", "red");
}
