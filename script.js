cree();

function cree(){	
	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = update_Bars;          /*y a deux methode la 1 ere consiste a verifie 'ready' de la methode avant d entre a la methode sinon on le fait au */
	httpRequest.send();                                                  /* niveau de la fonction*/   

	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data3');
	httpRequest2.onreadystatechange = update_Lines;
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data2');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData = JSON.parse(httpRequest3.response);
			update_Bar(jsonData);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData = JSON.parse(httpRequest4.response);
			update_Pie(jsonData);
		}
	};
	httpRequest4.send();
	
}  			
	
function update_Bars(){	

	if(httpRequest.readyState===XMLHttpRequest.DONE){


	 if (httpRequest.readyState === 4 && httpRequest.status === 200){ 
        response= httpRequest.response;

        jsonData = JSON.parse(response);

		var labels = jsonData.map(function(e) {
			return e.annee;
		 });
		 
		 var data = jsonData.map(function(e) {
			return e.nb_etu;
		 });
	 
		 new Chart(document.getElementById("bar-chart"), {
			 type: 'bar',
			 data: {
			   labels: labels,
			   datasets: [
				 {
				   label: "le nombre d'etudiant",
				   backgroundColor: ["#FF0000", "#00FF00","#0000FF"],
				   data: data
				 }
			   ]
			 },
			 options: {
			   responsive: false,
			   maintainAspectRatio: true,	
			   legend: { display: false },
			  scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			 }
			}
		 });
		}
	}
	

	
}


function update_Lines(){
    if(httpRequest2.readyState===XMLHttpRequest.DONE){
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200){ 
		   			response= httpRequest2.response;
					jsonData = JSON.parse(response);
					var labels = jsonData.years;
					for(d of jsonData.datasets){
						d.fill = false;				  
						d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
						d.borderWidth=2;
						d.radius=1;			
					}			
					
					var data = jsonData.datasets;

					new Chart(document.getElementById("line-chart"), {
						type: 'line',
						data: {
							labels: labels,
							datasets: data
						},
						options: {						
							responsive: false,
							maintainAspectRatio: true,
							legend:{
								position:'top'
							}
						}
					});
						
							
				}


		}

	}
function update_Bar(jsonData){
	var labels = jsonData.years;
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}	
	var data = jsonData.datasets;
			
	new Chart(document.getElementById("bar-chart-grouped"), {
			type: 'bar',
			data: {
				labels: labels,
				datasets: data
			},
			options: {
			  responsive: false,
			  maintainAspectRatio: true,
			  scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			  
			}
	});



}
function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nb_etu;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'doughnut',
		data: {
		  labels: labels,
		  datasets: [{
			label: " nombre des etudiant",
			backgroundColor: ["#3e95cd", "#8e5ea2","#FFFF00"],
			data: data                                                                   
			

		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  legend:{
			position:'right'
		  }
		}
	});	
}

/*function search_graphe() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('graphe');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}*/