//export const connexionBack2 = "172.31.250.13";


function obtenirDonnees(equipement) {
    // Faire une requête HTTP pour obtenir les données de consommation d'énergie pour l'équipement
    const donnees = faireRequeteHTTP(`/equipements/${equipement}/donnees`);

    // Extraire les dates/temps et les mesures de consommation d'énergie des données
    const labels = donnees.map(donnee => donnee.date);
    const donneesConsommation = donnees.map(donnee => donnee.consomMoy);

    // Retourner les données formatées pour le graphe
    return {
        labels: labels,
        donnees: donneesConsommation
    };
}

function openModal(name, id) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    const date = document.getElementById('date1').value;
    const form = document.getElementById("submit");
    const modal2 = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#details');
    if (name === "chauffage") {
        form.onclick = function () {
            fetch('http://172.31.250.13:9000/mesure/infoHeat?idEquip=' + id + '&date=' + date)
                .then(response => response.json())
                .then(data => {
                    var invoiceDetailNode = document.getElementById('modal2');
                    invoiceDetailNode.innerHTML = "";

                    data.forEach(list => {
                        var p = document.createElement("p");
                        var text = document.createTextNode(`Date: ${list.start_time}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);

                        p = document.createElement("p");
                        text = document.createTextNode(`Consommation en WH: ${list.energy_power}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);
                    });

                })
                .catch(error => console.log("Error "+ error));
            modal2.style.display = 'none';
            modal2.setAttribute('data-toggle', 'modal');
            modal2.setAttribute('data-target', '#exampleModalToggle2');
            container.appendChild(modal2);
            modal2.click();
            date.innerHTML = "";

        }
    } else if (name === "lampe") {
        form.onclick = function () {

            fetch('http://172.31.250.13:9000/mesure/infoLight?idEquip=' + id + '&date=' + date)
                .then(response => response.json())
                .then(data => {
                    var invoiceDetailNode = document.getElementById('modal2');
                    invoiceDetailNode.innerHTML = "";

                    data.forEach(list => {
                        var p = document.createElement("p");
                        var text = document.createTextNode(`Date: ${list.light_start_time}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);

                        p = document.createElement("p");
                        text = document.createTextNode(`Consommation en WH: ${list.energy_light}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);
                    });

                })
                .catch(error => console.log("Error "+ error));
            modal2.style.display = 'none';
            modal2.setAttribute('data-toggle', 'modal');
            modal2.setAttribute('data-target', '#exampleModalToggle2');
            container.appendChild(modal2);
            modal2.click();
            date.innerHTML = "";

        }
    } else if (name === "lave") {
        form.onclick = function () {

            fetch('http://172.31.250.13:9000/mesure/infoLaundry?idEquip=' + id + '&date=' + date)
                .then(response => response.json())
                .then(data => {
                    var invoiceDetailNode = document.getElementById('modal2');
                    invoiceDetailNode.innerHTML = "";

                    data.forEach(list => {
                        var p = document.createElement("p");
                        var text = document.createTextNode(`Date: ${list.laundry_time}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);

                        p = document.createElement("p");
                        text = document.createTextNode(`Consommation en WH: ${list.energy_laundry}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);
                    });

                })
                .catch(error => console.log("Error "+ error));
            modal2.style.display = 'none';
            modal2.setAttribute('data-toggle', 'modal');
            modal2.setAttribute('data-target', '#exampleModalToggle2');
            container.appendChild(modal2);
            modal2.click();
            date.innerHTML = "";

        }
    } else if (name === "télévision") {
        form.onclick = function () {
            if (date !== "") {
                fetch('http://172.31.250.13:9000/mesure/infoTv?idEquip=' + id + '&date=' + date)
                    .then(response => response.json())
                    .then(data => {
                        var invoiceDetailNode = document.getElementById('modal2');
                        invoiceDetailNode.innerHTML = "";

                        data.forEach(list => {
                            var p = document.createElement("p");
                            var text = document.createTextNode(`Date: ${list.tv_time}`);
                            p.appendChild(text);
                            invoiceDetailNode.appendChild(p);

                            p = document.createElement("p");
                            text = document.createTextNode(`Consommation en WH: ${list.energy_tv}`);
                            p.appendChild(text);
                            invoiceDetailNode.appendChild(p);
                        });

                    })
                    .catch(error => console.log("Error "+ error));
                modal2.style.display = 'none';
                modal2.setAttribute('data-toggle', 'modal');
                modal2.setAttribute('data-target', '#exampleModalToggle2');
                container.appendChild(modal2);
                modal2.click();
                date.innerHTML = "";
            }
        }
    } else if (name === "cuisinière") {
        form.onclick = function () {

            fetch('http://172.31.250.13:9000/mesure/infoCook?idEquip=' + id + '&date=' + date)
                .then(response => response.json())
                .then(data => {
                    var invoiceDetailNode = document.getElementById('modal2');
                    invoiceDetailNode.innerHTML = "";

                    data.forEach(list => {
                        var p = document.createElement("p");
                        var text = document.createTextNode(`Date: ${list.cook_time}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);

                        p = document.createElement("p");
                        text = document.createTextNode(`Consommation en WH: ${list.energy_cook}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);
                    });

                })
                .catch(error => console.log("Error "+ error));
            modal2.style.display = 'none';
            modal2.setAttribute('data-toggle', 'modal');
            modal2.setAttribute('data-target', '#exampleModalToggle2');
            container.appendChild(modal2);
            modal2.click();
            date.innerHTML = "";

        }
    } else if (name === "congélateur") {
        form.onclick = function () {

            fetch('http://172.31.250.13:9000/mesure/infoFreez?idEquip=' + id + '&date=' + date)
                .then(response => response.json())
                .then(data => {
                    var invoiceDetailNode = document.getElementById('modal2');
                    invoiceDetailNode.innerHTML = "";

                    data.forEach(list => {
                        var p = document.createElement("p");
                        var text = document.createTextNode(`Date: ${list.freez_time}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);

                        p = document.createElement("p");
                        text = document.createTextNode(`Consommation en WH: ${list.energy_freez}`);
                        p.appendChild(text);
                        invoiceDetailNode.appendChild(p);
                    });

                })
                .catch(error => console.log("Error "+ error));
            modal2.style.display = 'none';
            modal2.setAttribute('data-toggle', 'modal');
            modal2.setAttribute('data-target', '#exampleModalToggle2');
            container.appendChild(modal2);
            modal2.click();
            date.innerHTML = "";

        }
    }


    container.appendChild(button);
    button.click();
}





function calculateConsoPiece(idRoom) {
    var bod = document.getElementById("sum" + idRoom);
    var listVal = document.querySelectorAll(".cons" + idRoom);
    var energyTotal = 0;
    if (listVal !== undefined) {
        var list = [];
        bod.innerHTML = '';
        for (var i = 0; i < listVal.length; i++) {
            list[i] = parseFloat(listVal[i].innerHTML );
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
            const equipmentData = document.getElementById('equipment-data'+idRoom);
            equipmentData.innerHTML = '';
            data.forEach(equipment => {
                // const idCell = document.createElement('td');
                // idCell.textContent = equipment.id_equipment;

                const nameCell = document.createElement('td');
                var button = document.createElement("button");
                button.setAttribute("class", "btn text-capitalize");
                button.setAttribute("style", "width: 150px; background-color:#796aee; color : white");
                button.textContent = equipment.nom_equipment;
                nameCell.appendChild(button);


                const powerCell = document.createElement('td');
                var span = document.createElement("span");
                span.setAttribute("style", "width: 100px; text-align: right");
                span.setAttribute("class", "cons"+idRoom);
                span.setAttribute("id",'power'+equipment.id_equipment);
                span.textContent = equipment.energy_power;

                var span1 = document.createElement("span");
                span1.textContent = " WH";

                powerCell.appendChild(span);
                powerCell.appendChild(span1);


                const row = document.createElement('tr');
                //row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(powerCell);

                equipmentData.appendChild(row);
            });
        });

}

function refreshPower(idRoom){
    fetch('http://localhost:9000/consommation?idRoom=' + idRoom)
        .then(response => response.json())
        .then(data => {
            data.forEach(equipment => {
                const powerCell = document.getElementById(`power${equipment.id_equipment}`);
                powerCell.textContent = equipment.energy_power;
            });
        });
}

const loader = setInterval(test, 5000);

function test() {
    var idcons = document.querySelectorAll(".cons");
    for (var i = 0; i < idcons.length; i++) {
        var id = (idcons[i].attributes.class.value).split(' ')[1]
        refreshPower(id);
    }
    var idPiece = document.querySelectorAll(".sum");
    for (var i = 0; i < idPiece.length; i++) {
        calculateConsoPiece((idPiece[i].attributes.id.value).split('m')[1]);
    }
    calculConsoTotal()
}






