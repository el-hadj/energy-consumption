var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
});

function openModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = "block";

    if(idModal == "modalAlgoBasic") var span = document.getElementById("closeModalAlgoBasic");

    span.onclick = function () {
        modal.style.display = "none";
    }
}