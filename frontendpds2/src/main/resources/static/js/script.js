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

function getProductionDay(){
    fetch('http://localhost:9000/production/parjour')
        .then(response => response.json())
        .then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const ctx = document.getElementById('lineChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
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

document.addEventListener("DOMContentLoaded", function(){
    getProductionDay();
    getTotalQuantity();
    productionConsumptionGraph();
})

