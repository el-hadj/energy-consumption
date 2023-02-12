//export const connexionBack2 = "172.31.250.13";




function lineGraph(valeur, nameEquip) {
    const ctx = document.getElementById('lineChartExample').getContext('2d');
    console.log("valeur");
    var request = new XMLHttpRequest();
    let url;
    nameEquip = nameEquip.toLowerCase();
    if (nameEquip === "chauffage") {
        url = 'http://172.31.250.13:9000/mesure/historic?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "congélateur") {
        url = 'http://172.31.250.13:9000/mesure/freezHistory?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "solaire") {
        url = 'http://172.31.250.13:9000/productionBepos/prodHistory?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "lampe") {
        url = 'http://172.31.250.13:9000/mesure/lighHistory?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "cuisinière") {
        url = 'http://172.31.250.13:9000/mesure/cookHistory?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "télévision") {
        url = 'http://172.31.250.13:9000/mesure/tvHistory?idEquip=' + valeur;
        console.log(url);
    } else if (nameEquip === "lave-linge") {
        url = 'http://172.31.250.13:9000/mesure/laundryHistory?idEquip=' + valeur;
        console.log(url);
    }


    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    var Xaxes = [];
    var Yaxes = [];
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        for (var i = 0; i < data.length; i++) {
            if (nameEquip === "chauffage") {
                var firtSplit = data[i].start_time.split('T')[0];
                Xaxes [i] = firtSplit.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_power;
            } else if (nameEquip === "congélateur") {
                var firtSplit1 = data[i].freez_time.split('T')[0];
                Xaxes[i] = firtSplit1.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_freez;
            } else if (nameEquip === "solaire") {
                Xaxes[i] = data[i].date_prod;
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].quantity;
            } else if (nameEquip === "lampe") {
                var firtSplit2 = data[i].light_start_time.split('T')[0];
                Xaxes[i] = firtSplit2.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_light;
            } else if (nameEquip === "cuisinière") {
                var firtSplit3 = data[i].cook_time.split('T')[0];
                Xaxes[i] = firtSplit3.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_cook;
            } else if (nameEquip === "congélateur") {
                var firtSplit4 = data[i].freez_time.split('T')[0];
                Xaxes[i] = firtSplit4.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_freez;
            } else if (nameEquip === "lave-linge") {
                var firtSplit6 = data[i].laundry_time.split('T')[0];
                Xaxes[i] = firtSplit6.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_laundry;
            } else if (nameEquip === "télévision") {
                var firtSplit5 = data[i].tv_time.split('T')[0];
                Xaxes[i] = firtSplit5.split('.')[0];
                Xaxes.sort((date1, date2) => date1 - date2);
                Yaxes[i] = data[i].energy_tv;
            }

        }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Xaxes.sort((date1, date2) => date1 - date2),
                datasets: [{
                    label: 'Activité énergétique du (de la) ' + nameEquip,
                    data: Yaxes,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',

                    borderColor: 'rgba(255, 99, 132, 1)',

                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value + ' WH';

                            }
                        }
                    }
                }
            }
        });


    }
    request.send();
    myChart.destroy();
}







function production() {
    var idUser = document.getElementById("user").attributes.value.value;
    var body = document.querySelector("#production" + idUser);
    let request = new XMLHttpRequest();
    const url = 'http://172.31.250.13:9000/productionBepos/production?idUser=' + idUser;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    body.innerHTML = '';
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var temp_body = "<table class=\"table table-borderless\" style=\"margin-left: 3em\" id=\"table" + idUser + "\"><tbody><tr>" +
                "<td><button onclick='lineGraph(this.id,this.name)' class=\"btnpiece btn  text-capitalize\" " +
                "id =" + data[i].id_source_prod + " name = " + data[i].type_prod + " style=\"width: 150px; background-color:#796aee; color : white\">" + data[i].type_prod + "</button></td>" +
                "<td><span style=\"width: 100px; text-align: left\" value =" + data[i].quantity + ">" + data[i].quantity + " WH</span></td>" +
                "</tr></tbody></table>";
            body.innerHTML += temp_body;

        }
    }
    request.send();
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


function tryingGetAllEquipment(valeur, nom) {
    var body = document.querySelector("#pieces" + valeur);
    nom = nom.toLowerCase();
    var request = new XMLHttpRequest();
    const url = 'http://localhost:9000/consommation?idRoom=' + valeur;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    body.innerHTML = '';
    console.log(url);
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var newdata = data.filter(obj => !(obj && Object.keys(obj).length === 0 && obj.constructor === Object));
        console.log(newdata);
        for (var i = 0; i < newdata.length; i++) {
            var temp_body = "<table class=\"table table-borderless\" style=\"margin-left: 3em\"><tbody>";
            if (nom === "chambre") {
                if (i === 0) {
                    var ligne1 = "<tr>" +
                        "<td><button data-toggle=\"modal\" data-target =\"#tar1\"  onclick='lineGraph(this.id, this.name)' class=\"valeur btn  text-capitalize tar1\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button>" +
                        "</td>" +
                        "<td><span id = 'chauffage' style=\"width: 100px; text-align: right\" class='chauffage cons val" + valeur + "' " +
                        " value =" + newdata[i].energy_power + ">" + newdata[i].energy_power + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 1) {
                    var ligne2 = "<tr>" +
                        "<td><button data-toggle=\"modal\" data-target =\"#tar2\" onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button>" +
                        "</td>" +
                        "<td><span id = 'lampe' style=\"width: 100px; text-align: right\" class='lampe cons  val" + valeur + "' " +
                        "value =" + newdata[i].energy_light + " >" + newdata[i].energy_light + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>" +
                        "</tbody></table>";
                }
                temp_body += ligne1 + ligne2;
            } else if (nom === "cuisine") {
                if (i === 0) {
                    var ligne1 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"valeur btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'chauffage' style=\"width: 100px; text-align: right\" class='chauffage cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_power + ">" + newdata[i].energy_power + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 1) {
                    var ligne2 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'lampe' style=\"width: 100px; text-align: right\" class='lampe cons val" + valeur + "'  " +
                        " value =" + newdata[i].energy_light + " >" + newdata[i].energy_light + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 2) {
                    var ligne3 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"valeur btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'cuisiniere' style=\"width: 100px; text-align: right\" class='cuisiniere cons val" + valeur + "'" +
                        " value =" + newdata[i].energy_cook + ">" + newdata[i].energy_cook + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";

                } else if (i === 3) {
                    var ligne4 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id,this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'congelateur' style=\"width: 100px; text-align: right\" class='congelateur cons val" + valeur + "'" +
                        " value =" + newdata[i].energy_freez + ">" + newdata[i].energy_freez + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>" +
                        "</tbody></table>";
                }
                temp_body += ligne1 + ligne2 + ligne3 + ligne4;

            } else if (nom === "salon") {
                if (i === 0) {
                    var ligne1 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"valeur btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'chauffage' style=\"width: 100px; text-align: right\" class='chauffage cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_power + ">" + newdata[i].energy_power + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 1) {
                    var ligne2 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'lampe' style=\"width: 100px; text-align: right\" class='lampe cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_light + " >" + newdata[i].energy_light + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 2) {
                    var ligne3 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\"name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'television' style=\"width: 100px; text-align: right\" class='television cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_tv + ">" + newdata[i].energy_tv + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>" +
                        "</tbody></table>";
                }

                temp_body += ligne1 + ligne2 + ligne3;
            } else {
                if (i === 0) {
                    var ligne1 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"valeur btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'chauffage' style=\"width: 100px; text-align: right\" class='chauffage cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_power + ">" + newdata[i].energy_power + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 1) {
                    var ligne2 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name =" + newdata[i].nom_equipment + ">" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'lampe' style=\"width: 100px; text-align: right\" class='lampe cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_light + " >" + newdata[i].energy_light + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>";
                } else if (i === 2) {
                    var ligne3 = "<tr>" +
                        "<td><button onclick='lineGraph(this.id, this.name)' class=\"btn  text-capitalize\" id =" + newdata[i].id_equipment +
                        " style=\"width: 150px; background-color:#796aee; color : white\" name ='lave-linge'>" + newdata[i].nom_equipment + "</button></td>" +
                        "<td><span id = 'lave linge' style=\"width: 100px; text-align: right\" class='lave linge cons val" + valeur + "' " +
                        "value =" + newdata[i].energy_laundry + " >" + newdata[i].energy_laundry + " WH</span></td>" +
                        "<td><button onclick='openModal(this.name, this.id)' id = " + newdata[i].id_equipment + " " +
                        "style=\"width: 150px; background-color:#796aee; color : white\" name = " + newdata[i].nom_equipment + " " +
                        "class=\"btn\">Details" +
                        "</button></td>" +
                        "</tr>" +
                        "</tbody></table>";
                }
                temp_body += ligne1 + ligne2 + ligne3;
            }

            body.innerHTML = temp_body;
        }
    }


    request.send();

}


function calculateConsoPiece(idRoom) {
    var bod = document.getElementById("sum" + idRoom);
    var listVal = document.querySelectorAll(".cons");
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

setInterval(calculConsoTotal, 5);

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
                span.setAttribute("class", "cons "+idRoom);
                span.setAttribute("id",'power'+equipment.id_equipment);
                span.textContent = equipment.energy_power;
                powerCell.appendChild(span);

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
}






