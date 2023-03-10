function getTotalQuantity() {
    let body = document.getElementById("prodTotal");
    body.innerHTML = '';
    const quantityCells = document.querySelectorAll("#myTable td:nth-child(2)");
    let total = 0;
    quantityCells.forEach(function(cell) {
        total += parseFloat(cell.textContent);
    });
    total = parseFloat(total.toPrecision((3)));
    if (isNaN(total)) {
        body.innerHTML += 0;
    } else {
        body.innerHTML += total;
    }
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
                                text: 'Production (KWh)'
                            }
                        }
                    }
                }
            });
        });
}

function filterDataProd() {
    // Obtenez les dates sélectionnées par l'utilisateur
    const startDate = document.getElementById('start-date-prod').value;
    const endDate = document.getElementById('end-date-prod').value;

    // Convertissez les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Obtenez les données de consommation
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data => {
            // Filtrer les données en fonction de la plage de dates sélectionnée
            const filteredData = Object.entries(data)
                .filter(([dateStr, value]) => {
                    const [day, month, year] = dateStr.split('/'); // Extraction des parties de date
                    const date = new Date(year, month - 1, day); // Création d'un objet Date à partir des parties de date
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
                                        text: 'Production (KWh)'
                                    }
                                }
                            }
                        }
                    });
                });
        })
}

function pollProductionData() {
    fetch('/production/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#myTable tbody');
            data.forEach(product => {
                const row = tableBody.querySelector(`[data-product-id="${product.id}"]`);
                if (row) {
                    const quantityCell = row.querySelector('td:last-child');
                    if (quantityCell.textContent !== `${product.quantity} KWh`) {
                        quantityCell.textContent = `${product.quantity} KWh`;
                    }
                }
            });
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
}

setInterval(runIntervall, 10000);

document.addEventListener("DOMContentLoaded", function(){
    getProductionDay();
    productionConsumptionGraph();
    updateTemperature();
    updateWind();
    getTotalQuantity();
    pollProductionData();
})

