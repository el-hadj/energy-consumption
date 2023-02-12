let updateInterval;
var currentId;

function checkAndSave(id) {
    let stateConfig = document.getElementById("configuration").checked;

    // ICI ON CHECK LES DONNEES.
    let data = {};
    data.thermostat = $("#thermostat").val();
    data.hourStart = $("#depart").val();
    data.hourEnd = $("#fin").val();
    data.tempDeclench = $("#exte").val();
    data.mode = stateConfig ? "Automatique" : "Manuel";

    if (!stateConfig) {
        if (data.thermostat > 30) {
            Swal.fire("Attention !", "On ne peut mettre le chauffage au dessus de 30°", "error");
            return;
        }
        if (data.thermostat < 15) {
            Swal.fire("Attention !", "On ne peut mettre le chauffage en dessous de 15°", "error");
            return;
        }

        if (parseInt(data.hourStart) > 24) {
            console.log("coucou");
            Swal.fire("Attention !", "On ne peut mettre l'heure au dessus de 24", "error");
            return;
        }
        if (parseInt(data.hourEnd) > 24) {
            console.log("coucou2");
            Swal.fire("Attention !", "On ne peut mettre l'heure au dessus de 24", "error");
            return;
        }
    }

    saveHeatingBepos(data, id);
}
//172.31.250.12
function saveHeatingBepos(data, id) {
    // ICI ON APPEL LE CONTROLLER POUR SAUVEGARDER.

    let retour = $.ajax({
        type: 'POST',
        url: 'http://172.31.250.12:9001/heating/' + id,
        data: JSON.stringify(data),
        contentType: 'application/json',
    });

    retour.done(() => {
        Swal.fire("OK", "Sauvegarde ok", "success");
        return;
    })

    retour.fail(() => {
        // FAIRE UN TRUC SI ERREUR
    });
}

function onStateChange() {
    let stateConfig = document.getElementById("configuration").checked;
    $("#thermostat").prop("disabled", stateConfig);
    $("#depart").prop("disabled", stateConfig);
    $("#fin").prop("disabled", stateConfig);
    $("#exte").prop("disabled", stateConfig);

    // Si je suis en automatique
    if (stateConfig) {
        doStartUpdateData();
    } else {
        console.log("Je stop l'interval");
        clearInterval(updateInterval);
    }
    checkAndSave(currentId);
}

//172.31.250.12
function doStartUpdateData() {
    updateInterval = setInterval(function () {
        let retour = $.get("http://172.31.250.12:9001/heating/updateThermostat/" + currentId);
        retour.done((value) => {
            let split = value.split("#");
            if (split[0] === 'off') {
                $("#etat").removeClass().addClass("btn btn-danger");
                $("#etat").html("OFF");
            } else {
                $("#etat").removeClass().addClass("btn btn-success");
                $("#etat").html("ON");
            }

            $("#thermostat").val(split[1]);
        })
    }, 3000);
}

function init(currentHeating) {
    let isAuto = currentHeating.mode === "Automatique";
    document.getElementById("configuration").checked = isAuto;
    if (isAuto) {
        doStartUpdateData();
    }

    initInfoAuto();
}

function initInfoAuto() {
    let heureInterval = setInterval(function () {

        //172.31.250.13
        let retour = $.get("http://172.31.250.13:9000/heureBepos");
        retour.done((heure) => {
            let minute = heure.minute;
            let heure1 = heure.heure;
            $("#heure").text((heure1 < 10 ? "0" + heure1 : heure1) + ":" + (minute < 10 ? ("0" + minute) : minute))
        });
        
        //172.31.250.13
        let retourTemp = $.get("http://172.31.250.13:9000/captor/getAll/" + currentId + "/chauffage");
        retourTemp.done((captors) => {
            // for each sur les values
            captors.forEach((captor) => {
                // test du capteur
                if (captor.nameCaptor === "temperature piece") {
                    $("#tempPiece").text("Température de la pièce : " + captor.dataCaptor);
                } else if (captor.nameCaptor === "temperature exterieure") {
                    $("#tempExt").text("Température de la extérieure : " + captor.dataCaptor);
                }
            });

        });
    }, 10000);
}