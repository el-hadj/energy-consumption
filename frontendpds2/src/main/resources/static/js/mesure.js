//export const connexionBack2 = "172.31.250.13";
function calculateConsoPiece(idRoom) {
    var bod = document.getElementById("sum" + idRoom);
    var listVal = document.querySelectorAll(".cons" + idRoom);
    var energyTotal = 0;
    if (listVal !== undefined) {
        var list = [];
        bod.innerHTML = '';
        for (var i = 0; i < listVal.length; i++) {
            list[i] = parseFloat(listVal[i].innerHTML);
            energyTotal = energyTotal + parseFloat(list[i]);

        }
        energyTotal = parseFloat(energyTotal.toPrecision(3))
        if (isNaN(energyTotal)) {
            bod.innerHTML += 0 + " WH";
        } else {
            bod.innerHTML += energyTotal + " WH";
        }
    } else {
        bod.innerHTML += 0;
    }
}


function calculConsoTotal() {
    var body = document.getElementById("consoTotal");
    var listVal = document.querySelectorAll(".sum");
    var consoTotal = 0;
    var list = [];
    body.innerHTML = '';
    for (var i = 0; i < listVal.length; i++) {
        var variable = (listVal[i].innerHTML).split(' ')[0];
        list[i] = parseFloat(variable);
        consoTotal += parseFloat(list[i]);
    }
    consoTotal = parseFloat(consoTotal.toPrecision((3)));
    if (isNaN(consoTotal)) {
        body.innerHTML += 0;
    } else {
        body.innerHTML += consoTotal;
    }
}


function getEquipement(idRoom) {
    fetch('http://localhost:9000/consommation?idRoom=' + idRoom)
        .then(response => response.json())
        .then(data => {
            const equipmentData = document.getElementById('equipment-data' + idRoom);
            equipmentData.innerHTML = '';
            data.forEach(equipment => {


                const nameCell = document.createElement('td');
                var button = document.createElement("button");
                button.setAttribute("class", "btn text-capitalize");
                button.setAttribute("style", "width: 150px; background-color:#796aee; color : white");
                button.setAttribute("id", equipment.id_equipment);
                button.setAttribute("name", equipment.nom_equipment);
                button.setAttribute("onclick", "openModal(this.id, this.name)");
                button.textContent = equipment.nom_equipment;
                nameCell.appendChild(button);

                const buttonCell = document.createElement('td');
                var div = document.createElement("div");
                div.setAttribute("class", "btn-group btn-toggle");


                var buttonOn = document.createElement("button");
                buttonOn.setAttribute("class", "On btn btn-sm btn-outline-primary active");
                buttonOn.setAttribute("id", 'buttonOn' + equipment.id_equipment);
                buttonOn.setAttribute("name", equipment.nom_equipment);
                buttonOn.setAttribute("onclick", "OnAndOffEquipment(this.id, this.name)");
                buttonOn.textContent = "On";

                var buttonOff = document.createElement("button");
                buttonOff.setAttribute("class", "Off btn btn-sm btn-outline-primary");
                buttonOff.setAttribute("id", 'buttonOff' + equipment.id_equipment);
                buttonOff.setAttribute("name", equipment.nom_equipment);
                buttonOff.setAttribute("onclick", "OnAndOffEquipment(this.id, this.name)");
                buttonOff.textContent = "Off";

                div.appendChild(buttonOn);
                div.appendChild(buttonOff);
                buttonCell.appendChild(div);


                const powerCell = document.createElement('td');
                var span = document.createElement("span");
                span.setAttribute("style", "width: 100px; text-align: right");
                span.setAttribute("class", "p cons" + idRoom);
                span.setAttribute("id", 'power' + equipment.id_equipment);
                span.textContent = equipment.energy_power;

                var span1 = document.createElement("span");
                span1.textContent = " WH";

                powerCell.appendChild(span);
                powerCell.appendChild(span1);


                const row = document.createElement('tr');

                row.appendChild(nameCell);
                row.appendChild(buttonCell);
                row.appendChild(powerCell);


                equipmentData.appendChild(row);
            });
        });

}

function OnAndOffEquipment(id, name) {
    let state = true;
    let nameLower = name.toLowerCase();
    let buttonOn = document.querySelectorAll('.On')
    let buttonOff = document.querySelectorAll('.Off')
    for (let i = 0; i < buttonOn.length; i++) {
        if (nameLower === "chauffage") {
            let idE = buttonOn[i].id.split("On")[1];
            buttonOn[i].addEventListener("click", () => {
                state = true;
                buttonOn[i].classList.add("active");
                buttonOff[i].classList.remove("active");
                buttonOn[i].disabled = true; // Disable the On button
                buttonOff[i].disabled = false; // Enable the Off button
                updateStatus(idE, "heating", state);
            });
            buttonOff[i].addEventListener("click", () => {
                state = false;
                buttonOff[i].classList.add("active");
                buttonOn[i].classList.remove("active");
                buttonOff[i].disabled = true; // Disable the Off button
                buttonOn[i].disabled = false;
                updateStatus(idE, "heating", state)
            });
        } else if (nameLower === "lampe") {
            let id = buttonOn[i].id.split("On")[1]
            buttonOn[i].addEventListener("click", () => {
                state = true;
                buttonOn[i].classList.add("active");
                buttonOff[i].classList.remove("active");
                buttonOn[i].disabled = true; // Disable the On button
                buttonOff[i].disabled = false; // Enable the Off button
                updateStatus(id, "light", state)
            });
            buttonOff[i].addEventListener("click", () => {
                state = false;
                buttonOff[i].classList.add("active");
                buttonOn[i].classList.remove("active");
                buttonOff[i].disabled = true; // Disable the Off button
                buttonOn[i].disabled = false;
                updateStatus(id, "light", state)
            });
        } else if (nameLower === "cuisinière") {
            let id = buttonOn[i].id.split("On")[1]
            buttonOn[i].addEventListener("click", () => {
                state = true;
                buttonOn[i].classList.add("active");
                buttonOff[i].classList.remove("active");
                buttonOn[i].disabled = true; // Disable the On button
                buttonOff[i].disabled = false; // Enable the Off button
                updateStatus(id, "cooker", state)
            });
            buttonOff[i].addEventListener("click", () => {
                state = false;
                buttonOff[i].classList.add("active");
                buttonOn[i].classList.remove("active");
                buttonOff[i].disabled = true; // Disable the Off button
                buttonOn[i].disabled = false;
                updateStatus(id, "cooker", state)
            });
        } else if (nameLower === "télévision") {
            let id = buttonOn[i].id.split("On")[1]
            buttonOn[i].addEventListener("click", () => {
                state = true;
                buttonOn[i].classList.add("active");
                buttonOff[i].classList.remove("active");
                buttonOn[i].disabled = true; // Disable the On button
                buttonOff[i].disabled = false; // Enable the Off button
                updateStatus(id, "tv", state)
            });
            buttonOff[i].addEventListener("click", () => {
                state = false;
                buttonOff[i].classList.add("active");
                buttonOn[i].classList.remove("active");
                buttonOff[i].disabled = true; // Disable the Off button
                buttonOn[i].disabled = false;
                updateStatus(id, "tv", state)
            });
        }

    }
}

function updateStatus(id, equipment, state) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state)
    };
    const url = 'http://localhost:9000/' + equipment + '/' + id + '/state';
    console.log("je suis " + url);
    fetch(url, requestOptions)
        .then(() => console.log("j'ai update l'etat :" + state));
}


function refreshPower(idRoom) {
    fetch('http://localhost:9000/consommation?idRoom=' + idRoom)
        .then(response => response.json())
        .then(data => {
            data.forEach(equipment => {
                const powerCell = document.getElementById(`power${equipment.id_equipment}`);
                if (powerCell) {
                    powerCell.textContent = equipment.energy_power;
                }
            });
        });
}

setInterval(test, 5000);

function test() {
    var idcons = document.querySelectorAll(".pieces");
    for (var i = 0; i < idcons.length; i++) {
        var id = (idcons[i].attributes.id.value).split('s')[1]
        refreshPower(id);
    }
    var idPiece = document.querySelectorAll(".sum");
    for (var j = 0; j < idPiece.length; j++) {
        calculateConsoPiece((idPiece[j].attributes.id.value).split('m')[1]);
    }
    calculConsoTotal()
    latestTime()
}


function getConsommationParJour() {
    fetch('http://localhost:9000/consommation/parjour')
        .then(response => response.json())
        .then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const ctx = document.getElementById('lineChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Consommation par jour',
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
                                text: 'Consommation (Wh)'
                            }
                        }
                    }
                }
            });
        });
}

function filterData() {
    // Obtenez les dates sélectionnées par l'utilisateur
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Convertissez les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Obtenez les données de consommation
    fetch('http://localhost:9000/consommation/parjour')
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
            const chart = Chart.getChart('lineChart');
            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
        });
}


function latestTime() {
    fetch('http://localhost:9000/production/latestDate')
        .then(response => response.json())
        .then(data => {
            const date = document.getElementById("date");
            const hour = document.getElementById("hour");
            let dateString = data.split("T")[0];
            let hourString = (data.split("T")[1]).slice(0, 5);
            date.textContent = dateString;
            hour.textContent = hourString;

        });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}


function filterDataHour() {
    let startDateHour = document.getElementById("start-date-hour").value;
    if (!startDateHour) {
        startDateHour = new Date().toISOString().substr(0, 10);
    }
    fetch(`http://localhost:9000/consommation/parheure?targetDate=${startDateHour}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.map(d => formatTime(d.hour));
            const values = data.map(d => d.totalEnergy);
            const ctx = document.getElementById("barchartHour").getContext("2d");
            const oldChart = Chart.getChart(ctx);
            if (oldChart) {
                oldChart.destroy();
            }
            const myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Evolution de la consommation journalière",
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
                                text: 'Consommation Energétique (Wh)'
                            }
                        }
                    }
                }

            });
        })
        .catch(error => console.log(error));
}


document.addEventListener("DOMContentLoaded", function () {
    getConsommationParJour();
    filterDataHour();
})




