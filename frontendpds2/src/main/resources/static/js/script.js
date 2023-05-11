function getTotalQuantity() {
    fetch('http://localhost:9000/production/prod')
        .then(response => response.json())
        .then(data => {
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i].quantity;
            }
            total = (total / 1000).toFixed(3);
            document.getElementById("prodTotal").innerHTML = `${total}`;
        })
        .catch(error => console.error(error));
}

function updateTemperature() {
    fetch('http://localhost:9000/production/temp')
        .then(response => response.json())
        .then(data => {
            const temperatureSpan = document.querySelector('.temperature .value');
            temperatureSpan.textContent = data;
        })
        .catch(error => console.error(error));
}

function updateWind() {
    fetch('http://localhost:9000/production/vent')
        .then(response => response.json())
        .then(data => {
            const windSpan = document.querySelector('.wind-info .wind-speed');
            windSpan.textContent = data;
        })
        .catch(error => console.error(error));
}

function getProductionDay(){
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const ctx = document.getElementById('lineChartProd').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Production par jour',
                        data: values,
                        backgroundColor: 'rgb(54, 162, 235)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Production (Wh)'
                            }
                        }
                    }
                }
            });
        });
}

function filterDataProd() {
    // Obtenez les dates sélectionnées par l'utilisateur
    const startDateInput = document.getElementById('start-date-prod');
    const endDateInput = document.getElementById('end-date-prod');
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Convertissez les dates en dates UTC
    const start = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));
    const end = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()));

    // Obtenez les données de consommation
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data => {
            // Filtrer les données en fonction de la plage de dates sélectionnée
            const filteredData = Object.entries(data)
                .filter(([dateStr, value]) => {
                    const [day, month, year] = dateStr.split('/'); // Extraction des parties de date
                    const date = new Date(Date.UTC(year, month - 1, day)); // Création d'un objet Date UTC à partir des parties de date
                    return date >= start && date <= end;
                })
                .reduce((acc, [dateStr, value]) => {
                    acc[dateStr] = value;
                    return acc;
                }, {});
            // Obtenir les étiquettes et les valeurs filtrées
            const labels = Object.keys(filteredData);
            const values = Object.values(filteredData);

            // Mettre à jour le graphique avec les données filtrées
            const chart = Chart.getChart('lineChartProd');
            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
        });
}

function productionConsumptionGraph(){
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data1 => {
            fetch('http://localhost:9000/consommation/parjour')
                .then(response => response.json())
                .then(data2 => {
                    const labels = Object.keys(data1);
                    const data2Values = Object.values(data2);
                    const data1Values = Object.values(data1);
                    const ctx = document.getElementById('lineChart1').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Production',
                                data: data1Values,
                                backgroundColor: 'rgb(54, 162, 235)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1,
                                stack: 'Stack 0',
                            }, {
                                label: 'Consommation',
                                data: data2Values,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1,
                                stack: 'Stack 0',
                            }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Production-Consommation(Wh)'
                                    }
                                }
                            }
                        }
                    });
                });
        })
}

function filterDataProdCons() {
    // Obtenez les dates sélectionnées par l'utilisateur
    const startDate = new Date(document.getElementById('start-date-prod-cons').value);
    const endDate = new Date(document.getElementById('end-date-prod-cons').value);

    const startCons = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));
    const endCons = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()));

    // Obtenez les données de production et de consommation
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data1 => {
            fetch('http://localhost:9000/consommation/parjour')
                .then(response => response.json())
                .then(data2 => {
                    // Filtrer les données en fonction de la plage de dates sélectionnée
                    const filteredData1 = Object.entries(data1)
                        .filter(([dateStr, value]) => {
                            const [day, month, year] = dateStr.split('/'); // Extraction des parties de date
                            const date = new Date(Date.UTC(year, month - 1, day)); // Création d'un objet Date à partir des parties de date
                            return date >= startCons && date <= endCons;
                        })
                        .reduce((acc, [dateStr, value]) => {
                            acc[dateStr] = value;
                            return acc;
                        }, {});
                    const filteredData2 = Object.entries(data2)
                        .filter(([dateStr, value]) => {
                            const [day, month, year] = dateStr.split('/'); // Extraction des parties de date
                            const date = new Date(Date.UTC(year, month - 1, day)); // Création d'un objet Date à partir des parties de date
                            return date >= startCons && date <= endCons;
                        })
                        .reduce((acc, [dateStr, value]) => {
                            acc[dateStr] = value;
                            return acc;
                        }, {});

                    // Obtenir les étiquettes et les valeurs filtrées
                    const labels = Object.keys(filteredData1);
                    const data1Values = Object.values(filteredData1);
                    const data2Values = Object.values(filteredData2);

                    // Mettre à jour le graphique avec les données filtrées
                    const chart = Chart.getChart('lineChart1');
                    chart.data.labels = labels;
                    chart.data.datasets[0].data = data1Values;
                    chart.data.datasets[1].data = data2Values;
                    chart.update();
                });
        });
}

function pollProductionData() {
    fetch('http://localhost:9000/production/prod')
        .then(response => response.json())
        .then(data => {
            // récupérer le tableau et mettre à jour les valeurs
            let table = document.getElementById("myTable");
            let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                let cells = rows[i].getElementsByTagName("td");
                cells[1].innerText = data[i].quantity;
            }
        })
        .catch(error => console.error(error))
        .finally(() => {
            // Call again after delay
            setTimeout(pollProductionData, 5000);
        });
}


function runIntervall(){
    updateTemperature();
    updateWind();
    getTotalQuantity();
    pollProductionData();
    latestDate();
}

function latestDate() {
    fetch('http://localhost:9000/production/latestDate')
        .then(response => response.json())
        .then(data => {
            const date = document.getElementById("date");
            let dateString = data;
            date.textContent = dateString;

        });
}

setInterval(runIntervall, 10000);

document.addEventListener("DOMContentLoaded", function(){
    getProductionDay();
    productionConsumptionGraph();
    updateTemperature();
    updateWind();
    getTotalQuantity();
    latestDate();
})

