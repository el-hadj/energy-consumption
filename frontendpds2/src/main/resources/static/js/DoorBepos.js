var currentId;

function doUpdateStatus() {
    let stateConfig = document.getElementById("configuration").checked;
    if (stateConfig) {
    updateInterval = setInterval(function () {
        doCallUpdateStatus();
    }, 10000);} else {
        clearInterval(updateInterval);
    }
}



function doCallUpdateStatus() {
    let retour = $.get("http://172.31.250.12:9001/doors/updateStatus/" + currentId);
    retour.done((value) => {
        let parse = JSON.parse(value);

        let tempPiece = parse.temperaturePiece.dataCaptor;
        $("#tempPiece").html("Température de la pièce : " + tempPiece);

        let tempVoisin = parse.temperatureVoisin.dataCaptor;
        $("#tempVoisin").html("Température de la pièce voisine : " + tempVoisin);
        let ouverture = parse.
        $("#ouverture").html();

    })
}


function init() {
    let heureInterval = setInterval(function () {

        //172.31.250.13
        let retour = $.get("http://172.31.250.13:9000/heureBepos");
        retour.done((heure) => {
            let minute = heure.minute;
            let heure1 = heure.heure;
            $("#heure").text((heure1 < 10 ? "0" + heure1 : heure1) + ":" + (minute < 10 ? ("0" + minute) : minute))
        });
    }, 10000);
}