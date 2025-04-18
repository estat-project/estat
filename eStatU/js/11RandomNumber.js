      var i, j, k, temp, info;
      var nn, digit;
      var left1, right1, left2, right2, left3, right3;
      var mean, std, mu1, mu2, sigma1, sigma2, rho;
      var nvalueMax = 200;
      var nmaxR = "(&leq; 100)";
      var nmaxI = "("+svgStrU[110][langNum]+")";
      document.getElementById("nmax").innerHTML = nmaxR;

       // 실수형 정수형
      var a = document.myForm.type;
      var type = 1;
      a[0].onclick = function() { // 정수형 비복원
        type  = 1;   
        digit = 0;
        document.getElementById("digit").disabled = true;
        document.getElementById("digit").value = 0;
      }
      a[1].onclick = function() { // 정수형 복원
        type  = 2;   
        digit = 0
        document.getElementById("digit").disabled = true;
        document.getElementById("digit").value = 0;
      }
      a[2].onclick = function() { // 실수형
        type  = 3;
        digit = 4;
        document.getElementById("digit").disabled = false;
        document.getElementById("digit").value = 4;
      }  
      a[3].onclick = function() { // 정규분포
        type  = 4;   
        digit = 4;
        document.getElementById("digit").disabled = false;
        document.getElementById("digit").value = 4;
      }
      a[4].onclick = function() { // 2D정규분포
        type  = 5;   
        digit = 4;
        document.getElementById("digit").disabled = false;
        document.getElementById("digit").value = 4;
      }
      // 실행버튼 클릭 =================================================================================
      d3.select("#execute").on("click",function() {
        //문자 데이터 체크
        if (type == 1) { // Integer Uniform(left1,right1) without replacement
          left1  = d3.select("#left1").node().value;    
          right1 = d3.select("#right1").node().value;   
          if ( isNaN(left1) || isNaN(right1) ) { 
              document.getElementById("warning").innerHTML= "!!! " + alertMsg[48][langNum];
              document.getElementById("warning").style.color= "red";
              return;
          }
        } 
        else if (type == 2) { // Integer Uniform(left2,right2) without replacement
          left2  = d3.select("#left2").node().value;    
          right2 = d3.select("#right2").node().value;   
          if ( isNaN(left2) || isNaN(right2) ) { 
              document.getElementById("warning").innerHTML= "!!! " + alertMsg[48][langNum];
              document.getElementById("warning").style.color= "red";
              return;
          }
        } 
        else if (type == 3) { // real Uniform(left3,right3) 
          left3  = d3.select("#left3").node().value;    
          right3 = d3.select("#right3").node().value;   
          if ( isNaN(left3) || isNaN(right3) ) { 
              document.getElementById("warning").innerHTML= "!!! " + alertMsg[48][langNum];
              document.getElementById("warning").style.color= "red";
              return;
          }
        } 
        else if (type == 4) {
          mean  = d3.select("#mean").node().value;    
          std   = d3.select("#std").node().value;     
          if ( isNaN(mean) || isNaN(std) ) { 
              document.getElementById("warning").innerHTML= "!!! " + alertMsg[48][langNum];
              document.getElementById("warning").style.color= "red";
              return;
          }
        } 
        else if (type == 5) {
          mu1    = d3.select("#mu1").node().value;    
          mu2    = d3.select("#mu2").node().value;     
          sigma1 = d3.select("#sigma1").node().value;    
          sigma2 = d3.select("#sigma2").node().value;     
          rho    = d3.select("#rho").node().value;     
          if ( isNaN(mu1) || isNaN(mu2) || isNaN(sigma1) || isNaN(sigma2) || isNaN(rho) ) { 
              document.getElementById("warning").innerHTML= "!!! " + alertMsg[48][langNum];
              document.getElementById("warning").style.color= "red";
              return;
          }
        }

        nn    = parseFloat(d3.select("#nn").node().value);      // data 크기 n
        digit = parseFloat(d3.select("#digit").node().value);   // digit 크기 n
        if ( nn > nvalueMax ) nn = nvalueMax;
        if ( nn < 0) nn = 1;
        if ( digit < 0) digit = 0;
        if ( digit > 4) digit = 4;      
        if (type == 1) {
          left1  = parseFloat(d3.select("#left1").node().value);    // uniform(left, right)
          right1 = parseFloat(d3.select("#right1").node().value);   // uniform(left, right)
          if ( right1 < left1 ) {
            temp   = left1;
            left1  = right1;
            right1 = temp;
            document.getElementById("left1").value = left1;
            document.getElementById("right1").value = right1;
          }
        }
        else if (type == 2) {
          left2  = parseFloat(d3.select("#left2").node().value);    // uniform(left, right)
          right2 = parseFloat(d3.select("#right2").node().value);   // uniform(left, right)
          if ( right2 < left2 ) {
            temp   = left2;
            left2  = right2;
            right2 = temp;
            document.getElementById("left2").value = left2;
            document.getElementById("right2").value = right2;
          }
        }
        else if (type == 3) {
          left3  = parseFloat(d3.select("#left3").node().value);    // uniform(left, right)
          right3 = parseFloat(d3.select("#right3").node().value);   // uniform(left, right)
          if ( right3 < left3 ) {
            temp   = left3;
            left3  = right3;
            right3 = temp;
            document.getElementById("left3").value = left3;
            document.getElementById("right3").value = right3;
          }
        }
        else if (type == 4) {
          mean  = parseFloat(mean);    
          std   = parseFloat(std);     
        }
        else if (type == 5) {
          mu1    = parseFloat(mu1);    
          mu2    = parseFloat(mu2);     
          sigma1 = parseFloat(sigma1);    
          sigma2 = parseFloat(sigma2);     
          rho    = parseFloat(rho);    
        }
        randomTable(nn, digit, type);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });


// Uniform - Normal Random Number
function randomTable(nn, digit, type) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

//        var table = document.getElementById("table");
        var row, header;
        var i, j, m, mcount, num, delta, tt, z1, z2;
        var temp, temp2, tempDigit, tempDigit2, check, nnMax;
        var phi11, phi12, phi21, phi22;
        var G, J, K, H, U, V;
        var ncol = 2;
        var colmax = 3;
        var cell = new Array(colmax);
        var randNum = new Array(nvalueMax);
        for (i=0; i<nvalueMax; i++) randNum[i] = null;
        var k = 0;
        table.style.fontSize = "14px";

          row  = table.insertRow(k++);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.columnWidth = "30px";
          cell[1].style.columnWidth = "130px";
          cell[0].innerHTML = "i";
          // Heading - \u00B2  superscript 2
          if (type == 1) cell[1].innerHTML = "<b>"+svgStrU[50][langNum]+"( "+left1+" , "+right1+" )<br>"+svgStrU[99][langNum]+"</b><br>("+svgStrU[113][langNum]+")";
          else if (type == 2) cell[1].innerHTML = "<b>"+svgStrU[50][langNum]+"( "+left2+" , "+right2+" )<br>"+svgStrU[99][langNum]+"</b><br>("+svgStrU[112][langNum]+")";
          else if (type == 3) cell[1].innerHTML = "<b>"+svgStrU[50][langNum]+"( "+left3+" , "+right3+" )<br>"+svgStrU[99][langNum]+"</b>";
          else if (type == 4) cell[1].innerHTML = "<b>"+svgStrU[100][langNum]+"( "+mean+" , "+std+"\u00B2 )<br>"+svgStrU[99][langNum]+"</b>";
          else if (type == 5) {
            cell[1].innerHTML = "<b>2D "+svgStrU[100][langNum]+"<br>"+svgStrU[99][langNum]+"</b>";
            cell[2] = row.insertCell(2);
            cell[2].style.textAlign = "center";
            cell[2].style.backgroundColor = "#eee";
            cell[2].style.border = "1px solid black";
            cell[2].style.columnWidth = "130px";
            cell[2].innerHTML = "(μ₁,μ₂,σ₁,σ₂, ρ)<br>=( "+mu1+", "+mu2+", "+sigma1+", "+sigma2+", "+rho+")";
          }
          nnMax = nn;
          if (type == 1) {
              num = right1 - left1 + 1;
              if(nn <= num) nnMax = nn;
          }

          mcount = 0;
          for (i=0; mcount<nnMax; i++) {
            // ****************   random number generation
            tt = Math.random();
            if (type == 1){ // Integer Uniform(a,b) without replacement
              delta = 1. / num;
              for (j = 1; j < num+1; j++) {
                if (tt < j*delta) {
                  temp = left1 + j - 1;
                  break;
                } 
              }
            }
            else if (type == 2){  // Integer Uniform(a,b) with replacement
              num = right2 - left2 + 1;
              delta = 1. / num;
              for (j = 1; j < num+1; j++) {
                if (tt < j*delta) {
                  temp = left2 + j - 1;
                  break;
                } 
              }
            }
            else if (type == 3) temp = left3 + (right3-left3)*tt;
            else if (type == 4) temp = mean + std * stdnormal_inv(tt, info );
            else if (type == 5) { // Algorithm By Prof. Werner Antweiler - Univ British Columbia Sauder https://wernerantweiler.ca/blog.php?item=2019-03-03
              if (rho==0.0) {
                  phi11=sigma1; phi22=sigma2; sigma12=sigma21=0.0;
              }
              else if (rho==1.0) {
                phi11=sigma1; phi21=sigma2; phi21=phi22=0.0;
              }
              else if (rho==-1.0) {
                phi11=sigma1; phi21=-sigma2; phi21=phi22=0.0;
              }
              else {
                G = sigma1*sigma1 + sigma2*sigma2;
                J = sigma2*sigma2 - sigma1*sigma1;
                K = rho*sigma1*sigma2;
                H = Math.sqrt(J*J + 4.0*K*K);
                U = Math.sqrt(2.0*(G+H) / ((H+J)*(H+J) + 4.0*K*K));
                V = Math.sqrt(2.0*(G-H) / ((H-J)*(H-J) + 4.0*K*K));  
                phi11 = K*U;           phi12 = -K*V;
                phi21 = (J+H)*U/2.0;   phi22 = (H-J)*V/2.0;
              }
              z1 = stdnormal_inv(Math.random(), info );
              z2 = stdnormal_inv(Math.random(), info );
              temp  = mu1 + phi11*z1 + phi12*z2;
              temp2 = mu2 + phi21*z1 + phi22*z2;
            }
            // ************************
            // digit 조정           
            if (digit == 0) tempDigit = f0(temp)
            else if (digit == 1) tempDigit = f1(temp);
            else if (digit == 2) tempDigit = f2(temp);
            else if (digit == 3) tempDigit = f3(temp);
            else if (digit == 4) tempDigit = f4(temp);
            if (type == 5) {
              if (digit == 0) tempDigit2 = f0(temp2)
              else if (digit == 1) tempDigit2 = f1(temp2);
              else if (digit == 2) tempDigit2 = f2(temp2);
              else if (digit == 3) tempDigit2 = f3(temp2);
              else if (digit == 4) tempDigit2 = f4(temp2);
            }
            // Write data
            if (type == 1) { // integer uniform without replacement
              check = 0;
              if (i == 0) {
                randNum[0] = tempDigit;
              }
              else {
                for (m=0; m<mcount; m++) {
                  if (randNum[m] == tempDigit) { check = 1; break }
                }
                if (check == 0) {
                  randNum[mcount] = tempDigit;
                }
              }
              if (check == 0) {
                row = table.insertRow(k++);
                for (j=0; j<ncol; j++) {
                  cell[j] = row.insertCell(j);
                  cell[j].style.textAlign = "center";
                  cell[j].style.border = "1px solid black";
                }
                cell[0].innerHTML = mcount+1;         
                cell[1].innerHTML = tempDigit;           
                mcount++;
              }
            } // end of elseif type==1
            else if (type == 2 || type == 3 || type == 4) { 
              row = table.insertRow(k++);
              for (j=0; j<ncol; j++) {
                cell[j] = row.insertCell(j);
                cell[j].style.textAlign = "center";
                cell[j].style.border = "1px solid black";
              }
              cell[0].innerHTML = mcount+1;         
              cell[1].innerHTML = tempDigit; 
              mcount++;
            }
            else if (type == 5) { // 2D Normal
              row = table.insertRow(k++);
              for (j=0; j<colmax; j++) {
                cell[j] = row.insertCell(j);
                cell[j].style.textAlign = "center";
                cell[j].style.border = "1px solid black";
              }
              cell[0].innerHTML = mcount+1;         
              cell[1].innerHTML = tempDigit; 
              cell[2].innerHTML = tempDigit2; 
              mcount++;
            }

          } // end of i<nn
}

