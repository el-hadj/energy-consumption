let updateInterval;
var currentId;

function checkAndSave(id) {
    let stateConfig = document.getElementById("configuration").checked;

    // ICI ON CHECK LES DONNEES.
    let data = {};
    data.intensity = $('#intensite').val();
    data.mode = stateConfig ? "Automatique" : "Manuel";

    if(!stateConfig) {
        if(data.intensity > 100) {
            Swal.fire("Attention !", "On ne peut mettre l'intensité de  au dessus de 100 %", "error");
            return;
        }
    }

    saveHeatingBepos(data, id);
}

function saveHeatingBepos(data, id) {
    // ICI ON APPEL LE CONTROLLER POUR SAUVEGARDER.

    let retour = $.ajax({
        type: 'POST',
        url: 'http://172.31.250.12:9001/lights/' + id,
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
    $("#intensite").prop("disabled", stateConfig);
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
        let retour = $.get("http://172.31.250.12:9001/lights/updateIntensity/" + currentId);
        retour.done((value) => {
            let split = value.split("#");
            if (split[0] === 'off') {
                $("#etat").removeClass().addClass("btn btn-danger");
                $("#etat").html("OFF");
            } else {
                $("#etat").removeClass().addClass("btn btn-success");
                $("#etat").html("ON");
            }

            $("#intensite").val(split[1]);
        })
    }, 3000);
}

function init(currentHeating) {
    let isAuto = currentHeating.mode === "Automatique";
    document.getElementById("configuration").checked = isAuto;
    if (isAuto) {
        doStartUpdateData();
    }

    initHeure();
}

function initHeure() {
    let heureInterval = setInterval(function () {

        //172.31.250.13
        let retour = $.get("http://172.31.250.13:9000/heureBepos");
        retour.done((heure) => {
            let minute = heure.minute;
            let heure1 = heure.heure;
            $("#heure").text((heure1 < 10 ? "0" + heure1 : heure1) + ":" + (minute < 10 ? ("0" + minute) : minute))
        })
    }, 10000);
}