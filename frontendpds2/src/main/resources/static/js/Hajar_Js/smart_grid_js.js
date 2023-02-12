/**
 *  code used in the main interface of scope 3: smartgrid exploitation
 */ 
var cons=null,prod=null,prodprc=null;
            function refresh(){
            document.getElementById("refresh_").classList.add("rotate");
            	var ajaxRequest = new XMLHttpRequest();
            	ajaxRequest.onreadystatechange=function() {

            	    if (this.readyState == 4 && this.status == 200) {
            	      document.getElementById("demo").innerHTML=ajaxRequest.responseText;
            	     /* var currentdate = new Date();
            	      var datetime = "Last refresh: <br>" + currentdate.getDate() + "/"
            	                      + (currentdate.getMonth()+1)  + "/"
            	                      + currentdate.getFullYear() + " -  "
            	                      + currentdate.getHours() + ":"
            	                      + currentdate.getMinutes() + ":"
            	                      + currentdate.getSeconds();
            	      document.getElementById("time").innerHTML=datetime;*/
            	   //   document.getElementById("refresh_").classList.remove("rotate");
                     }
            	  };
            	ajaxRequest.open("GET","http://localhost:9001/map",false);
            	//works
            	 ajaxRequest.send(null);
            	 refresh2();
             	 refresh3();
             	//les consommations
            	  const cons2=cons.substr(1,cons.length-2).split(',');
            	   //les productions
            	  const prod2=prod.substr(1,prod.length-2).split(',');
                var chart = new CanvasJS.Chart("chartContainer", {
                  title:{
                    text: "Le bilan energetique de la ville"
                  },

                  data: [  //array of dataSeries
                  { //dataSeries - first quarter
               /*** Change type "column" to "bar", "area", "line" or "pie"***/
                   type: "column",
                   name: "Production",
                   dataPoints: [
                	  { label: "Eco_Q1", y:  parseInt(prod2[0]) },
             	      { label: "Eco_Q2", y:  parseInt(prod2[1]) },
             	      { label: "Eco_Q3", y:  parseInt(prod2[2]) },
             	      { label: "Eco_Q4", y:  parseInt(prod2[3]) },
             	      { label: "Eco_Q5", y:  parseInt(prod2[4]) },
             	      { label: "Eco_Q6", y:  parseInt(prod2[5]) },
             	      { label: "Eco_Q7", y:  parseInt(prod2[6]) },
             	      { label: "Eco_Q8", y:  parseInt(prod2[7]) },
             	      { label: "Eco_Q9", y:  parseInt(prod2[8]) },
             	      { label: "Eco_Q10", y: parseInt(prod2[9]) },
             	      { label: "Eco_Q11", y: parseInt(prod2[10]) }
                   ]
                 },
                 { //dataSeries - second quarter

                  type: "column",
                  name: "Consommation",
                  dataPoints: [
                	  { label: "Eco_Q1", y:  parseInt(cons2[0]) },
            	      { label: "Eco_Q2", y:  parseInt(cons2[1]) },
            	      { label: "Eco_Q3", y:  parseInt(cons2[2]) },
            	      { label: "Eco_Q4", y:  parseInt(cons2[3]) },
            	      { label: "Eco_Q5", y:  parseInt(cons2[4]) },
            	      { label: "Eco_Q6", y:  parseInt(cons2[5]) },
            	      { label: "Eco_Q7", y:  parseInt(cons2[6]) },
            	      { label: "Eco_Q8", y:  parseInt(cons2[7]) },
            	      { label: "Eco_Q9", y:  parseInt(cons2[8]) },
            	      { label: "Eco_Q10", y: parseInt(cons2[9]) },
            	      { label: "Eco_Q11", y: parseInt(cons2[10])}
                  ]
                }
                ]
              });
                chart.render();
                $('#hydr_tab').DataTable();
$('#sol_tab').DataTable();
$('#eol_tab').DataTable();
refresh4();
const prodprc2=prodprc.substr(1,prodprc.length-2).split(',');
document.getElementById("hydraulique_prog").style="width:"+prodprc2[0].substr(1,prodprc2[0].length-2).split('":"')[1]+"%;";
document.getElementById("hydraulique_prog").innerHTML=prodprc2[0].substr(1,prodprc2[0].length-2).split('":"')[1]+"%";
document.getElementById("eolien_prog").style="width:"+prodprc2[1].substr(1,prodprc2[1].length-2).split('":"')[1]+"%;";
document.getElementById("eolien_prog").innerHTML=prodprc2[1].substr(1,prodprc2[1].length-2).split('":"')[1]+"%";
document.getElementById("solaire_prog").style="width:"+prodprc2[2].substr(1,prodprc2[2].length-2).split('":"')[1]+"%;";
document.getElementById("solaire_prog").innerHTML=prodprc2[2].substr(1,prodprc2[2].length-2).split('":"')[1]+"%";
            }

             function refresh2(){

            	var ajaxRequest = new XMLHttpRequest();
            	ajaxRequest.onreadystatechange=function() {

            	    if (this.readyState == 4 && this.status == 200) {
            	    	cons=ajaxRequest.responseText
                     }
            	  };
            	ajaxRequest.open("GET","http://localhost:9001/consumptionGraph",false);
            	//works
            	 ajaxRequest.send(null);
            }
            function refresh3(){

            	var ajaxRequest = new XMLHttpRequest();
            	ajaxRequest.onreadystatechange=function() {

            	    if (this.readyState == 4 && this.status == 200) {
            	    	prod=ajaxRequest.responseText

                     }
            	  };
            	ajaxRequest.open("GET","http://localhost:9001/productionGraph",false);
            	//works
            	 ajaxRequest.send(null);
            }
             function refresh4(){

            	var ajaxRequest = new XMLHttpRequest();
            	ajaxRequest.onreadystatechange=function() {

            	    if (this.readyState == 4 && this.status == 200) {
            	    	prodprc=ajaxRequest.responseText

                     }
            	  };
            	ajaxRequest.open("GET","http://localhost:9001/statEnergy",false);
            	//works
            	 ajaxRequest.send(null);
            }

            function init()
            {
            	 //les consommations
          	  var cons1 = "[[${allDistConso.values()}]]";
          	  const cons2=cons1.substr(1,cons1.length-2).split(',');
          	   //les productions
          	  var prod1 = "[[${allDistProd.values()}]]";
          	  const prod2=prod1.substr(1,prod1.length-2).split(',');
              var chart = new CanvasJS.Chart("chartContainer", {
                title:{
                  text: "Le bilan energetique de la ville"
                },

                data: [  //array of dataSeries
                { //dataSeries - first quarter
             /*** Change type "column" to "bar", "area", "line" or "pie"***/
                 type: "column",
                 name: "Production",
                 dataPoints: [
              	  { label: "Eco_Q1", y:  parseInt(prod2[0]) },
           	      { label: "Eco_Q2", y:  parseInt(prod2[1]) },
           	      { label: "Eco_Q3", y:  parseInt(prod2[2]) },
           	      { label: "Eco_Q4", y:  parseInt(prod2[3]) },
           	      { label: "Eco_Q5", y:  parseInt(prod2[4]) },
           	      { label: "Eco_Q6", y:  parseInt(prod2[5]) },
           	      { label: "Eco_Q7", y:  parseInt(prod2[6]) },
           	      { label: "Eco_Q8", y:  parseInt(prod2[7]) },
           	      { label: "Eco_Q9", y:  parseInt(prod2[8]) },
           	      { label: "Eco_Q10", y: parseInt(prod2[9]) },
           	      { label: "Eco_Q11", y: parseInt(prod2[10]) }
                 ]
               },
               { //dataSeries - second quarter

                type: "column",
                name: "Consommation",
                dataPoints: [
              	  { label: "Eco_Q1", y:  parseInt(cons2[0]) },
          	      { label: "Eco_Q2", y:  parseInt(cons2[1]) },
          	      { label: "Eco_Q3", y:  parseInt(cons2[2]) },
          	      { label: "Eco_Q4", y:  parseInt(cons2[3]) },
          	      { label: "Eco_Q5", y:  parseInt(cons2[4]) },
          	      { label: "Eco_Q6", y:  parseInt(cons2[5]) },
          	      { label: "Eco_Q7", y:  parseInt(cons2[6]) },
          	      { label: "Eco_Q8", y:  parseInt(cons2[7]) },
          	      { label: "Eco_Q9", y:  parseInt(cons2[8]) },
          	      { label: "Eco_Q10", y: parseInt(cons2[9]) },
          	      { label: "Eco_Q11", y: parseInt(cons2[10])}
                ]
              }
              ]
            });

              chart.render();
              $('#hydr_tab').DataTable();
$('#sol_tab').DataTable();
$('#eol_tab').DataTable();
refresh4();
const prodprc2=prodprc.substr(1,prodprc.length-2).split(',');
document.getElementById("hydraulique_prog").style="width:"+prodprc2[0].substr(1,prodprc2[0].length-2).split('":"')[1]+"%;";
document.getElementById("hydraulique_prog").innerHTML=prodprc2[0].substr(1,prodprc2[0].length-2).split('":"')[1]+"%";
document.getElementById("eolien_prog").style="width:"+prodprc2[1].substr(1,prodprc2[1].length-2).split('":"')[1]+"%;";
document.getElementById("eolien_prog").innerHTML=prodprc2[1].substr(1,prodprc2[1].length-2).split('":"')[1]+"%";
document.getElementById("solaire_prog").style="width:"+prodprc2[2].substr(1,prodprc2[2].length-2).split('":"')[1]+"%;";
document.getElementById("solaire_prog").innerHTML=prodprc2[2].substr(1,prodprc2[2].length-2).split('":"')[1]+"%";
            	setInterval(refresh, 50000);
            }