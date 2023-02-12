var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
    console.log(connexionBack);
});

function chooseRoom(idRoom) {
    var id = document.getElementById("choosedRoom");
    id.value = idRoom;
}

function ajaxRequest(params) {
    var id = document.getElementById("idSender").value;
    var url = "http://" + connexionBack + ":9000/booking/selectBooking"
    $.get(url + '?idUser=' + id).then(function (res) {
        res = addButtonRedirect(res);
        params.success(res)
    })
}
function addButtonRedirect(mydata) {
    var boutonRedirect = '';
    for (let i = 0; i < mydata.length; i++) {
        boutonRedirect = '<input type="radio" name="choiceSelected" onclick="chooseRoom(' + mydata[i].idroom + ')" id="Redirect' + mydata[i].idroom + '"/>';
        mydata[i].monitoring = boutonRedirect;
    }
    return mydata;
}
