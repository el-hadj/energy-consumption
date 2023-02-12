var nbrMessage = 0;
var startRequestAjax = 0;
var numberSendedFile = 0;

var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
});

// variable for requestAjaxMessage()
var idSender = 0;
var idReceiver = 0;
var varIdCompany = document.getElementById("idCompany").value;

function displayMessagerie() {
    var cadre = document.getElementById("cadre");
    var divCollapse = document.getElementById("divCollapse");
    if (divCollapse.classList.contains("divCollapse")) {
        cadre.classList.remove("cadreCollapse");
        divCollapse.classList.remove("divCollapse");
    } else {
        cadre.classList.add("cadreCollapse");
        divCollapse.classList.add("divCollapse");
    }

}
function displayMessage(id_sender, id_receiver) {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/favoris/verifyTwoPeopleFavoris?id_sender=' + id_sender + '&id_receiver=' + id_receiver;
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                let check = JSON.parse(request.responseText);

                var el = document.querySelector("#divBas .divIcone .fa-star");
                var textTooltip = document.querySelector("#divBas .divIcone .tooltiptext");
                if (check) {
                    el.classList.remove("far");
                    el.classList.add("fas");
                    el.style.color = "#ffd43b";
                    textTooltip.innerHTML = "Supprimer des favoris";
                } else {
                    el.style.color = "#ffffff";
                    el.classList.add("far");
                    el.classList.remove("fas");
                    textTooltip.innerHTML = "Ajouter aux favoris";
                }
            }
        }
    }
    request.open('GET', url, true);
    request.send();

    document.getElementById("divContact").style.display = "none";
    document.getElementById("divSearchContact").style.display = "none";
    document.getElementById("messageContact").style.display = "block";
    document.getElementById("divBas").style.display = "grid";
    document.getElementById("rechercheContact").style.display = "none";
    idSender = id_sender;
    idReceiver = id_receiver;
    requestAjaxMessage();
    startRequestAjax = setInterval(function () { requestAjaxMessage(); }, 10000);
}

function requestAjaxMessage() {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/messages/getMessages?id_sender=' + idSender + '&id_receiver=' + idReceiver;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        //console.log(data);

        //on compte le nombre de msg, si > on actualise la div
        if (nbrMessage < data.length) {
            emptyDivMessage(idSender, idReceiver);
            for (var i = 0; i < data.length; i++) {
                let divMessage = document.createElement('div');
                let spanMessageTime = document.createElement('span');
                spanMessageTime.classList.add("spanDateMessage");
                let spanMsg = document.createElement('span');
                if (data[i].idSender == idSender) {
                    divMessage.classList.add("sendedMessage");
                } else {
                    divMessage.classList.add("receivedMessage");
                }
                let br = document.createElement('br');
                spanMessageTime.innerText = data[i].dateSend + "," + data[i].timeSend;

                if ((data[i].msg).includes("file:")) {
                    let msgText = data[i].msg.split("/")[1];
                    let numberFile = data[i].msg.split(":")[1];
                    numberFile = numberFile.split("/")[0];
                    //msg contains file
                    idForButton = data[i].dateSend + "_" + data[i].timeSend + "_" + idSender + "_" + idReceiver;
                    spanMsg.innerHTML = "<i id=" + idForButton + " onclick='downloadFile(\"" + data[i].dateSend + "\",\"" + data[i].timeSend + "\",\"" + numberFile + "\",\"" + idSender + "\",\"" + idReceiver + "\",\"" + idForButton + "\")'" +
                        'class="fa-solid fa-file-arrow-down" style="cursor:pointer; font-size:1.25em;color: #7180AC;" ></i > ' +
                        '<span style="font-size:10px; font-style:italic">' + msgText + '</span>';
                } else spanMsg.innerText = data[i].msg;

                divMessage.appendChild(spanMessageTime);
                divMessage.appendChild(br);
                divMessage.appendChild(spanMsg);
                document.getElementById("listMessage").appendChild(divMessage);
            }
            //mettre en bas de la liste message
            document.getElementById("messageContact").scrollTop = document.getElementById("messageContact").scrollHeight;
        }
        nbrMessage = data.length;
    }
    request.send();
}

function displayContact() {
    varIdCompany = document.getElementById("idCompany").getAttribute("value");
    displayFavoris(idSender, varIdCompany, "employee"); //affiche les employee au retour
    document.getElementById("divContact").style.display = "block";
    document.getElementById("messageContact").style.display = "none";
    document.getElementById("divBas").style.display = "none";
    document.getElementById("rechercheContact").style.display = "grid";

    //on remet le nombre egal a 0
    nbrMessage = 0;
    emptyDivMessage();
    clearInterval(startRequestAjax);
}

function emptyDivMessage() {
    //vide la div à chaque requete
    document.getElementById("listMessage").innerHTML = '';
}

function sendFile(varInputForAddFile, dateMessage, timeMessage) {
    const formData = new FormData();
    //code for one file, if multiple file --> need to do with for
    formData.append("file", varInputForAddFile.files[0]);
    formData.append("idSender", idSender);
    formData.append("idReceiver", idReceiver);
    formData.append("dateMessage", dateMessage);
    formData.append("timeMessage", timeMessage);

    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/messages/sendFile';
    request.open('POST', url);
    request.send(formData);
}

function hideDivDownloadedFile(divShowFile) {
    //reset div
    divShowFile.innerHTML = '';
    divShowFile.style.display = "none";
}

function createNewDivForMessage(el, typeMessage) {
    // create the message
    var newDiv = document.createElement('div');
    newDiv.classList.add("sendedMessage");
    var newElementSpan = document.createElement("span");

    var theDate = new Date();
    var dateMessage = convertDateJSON(theDate);
    var timeMessage = convertTimeJSON(theDate);

    var spanElement = document.createElement('span');
    spanElement.classList.add("spanDateMessage");
    spanElement.innerText = dateMessage + ", " + timeMessage;
    var brElement = document.createElement('br');
    newDiv.appendChild(spanElement);
    newDiv.appendChild(brElement);

    if (typeMessage === "file") {
        // to give a unique number for the file
        getNumberSendedFile();
        newElementSpan.innerHTML = "<i onclick='downloadFile(\"" + dateMessage + "\",\"" + timeMessage + "\",\"" + numberSendedFile + "\",\"" + idSender + "\",\"" + idReceiver + "\")'" +
            'class="fa-solid fa-file-arrow-down" style="cursor: pointer; font-size: 1.25em; color: #7180AC;"></i>' +
            '<span style="font-size:10px">' + el.innerText + '</span>';
        newElementSpan.style.fontStyle = "italic";

        let varInputForAddFile = document.getElementById("selectFilePrt");
        sendFile(varInputForAddFile, dateMessage, timeMessage);
    } else if (typeMessage === "message") {
        newElementSpan.innerText = el;
        sendMessage(dateMessage, timeMessage, el);
    } 
    newDiv.appendChild(newElementSpan);
    document.getElementById("listMessage").appendChild(newDiv);
    document.getElementById("messageContact").scrollTop = document.getElementById("messageContact").scrollHeight;
}

function sendMessage(dateMessage, timeMessage, msg) {
    //request create message
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/messages/createMessage';
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');

    var message = new Object();
    message.idMessage = 0;
    message.idSender = idSender;
    message.idReceiver = idReceiver;
    message.msg = msg;
    message.dateSend = dateMessage;
    message.timeSend = timeMessage;
    var data = JSON.stringify(message);

    request.send(data);
}
function startSendMessage() {
    var msg = document.getElementById("message").value;
    let varInputForAddFile = document.getElementById("selectFilePrt");
    if (varInputForAddFile.value) {
        let divShowFile = document.getElementById("selectFileToSend");
        createNewDivForMessage(divShowFile, "file");
        hideDivDownloadedFile(divShowFile);
    }
    if (msg.trim().length > 0) {
        document.getElementById("message").value = "";
        //recupere le div pour ajouter
        createNewDivForMessage(msg, "message")
    }
}
function activeSend() {
    document.querySelector("#divBas .divIcone .far.fa-paper-plane").style.cursor = "pointer";
}
document.getElementById("message").addEventListener("keypress", function (event) {
    var msg = document.getElementById("message").value;
    if (msg.trim().length > 0) {
        if (event.charCode == 13) {
            startSendMessage();
        }
    }
});

function displayContactAfterSearchContact() {
    document.getElementById("divContact").style.display = "none";
    document.getElementById("divSearchContact").style.display = "flex";
}

function displayContactAfterSearchContactReturn() {
    document.getElementById("divContact").style.display = "block";
    document.getElementById("divSearchContact").style.display = "none";
}

function getNumberSendedFile() {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/file/getNumberSendedFile';
    request.open('GET', url, false);//false because we need to wait the end of this response before continue
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var dataReceived = JSON.parse(this.responseText);
        console.log(dataReceived);
        numberSendedFile = dataReceived;
    }
    request.send();
}


function rechercheContact(id_sender, idCompany) {
    varIdCompany = idCompany;
    var contact = document.getElementById("inputRechercheContact").value;

    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/users/getSearchContact?value=' + contact + '&id_company=' + idCompany;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var dataReceived = JSON.parse(this.responseText);

        // vide la div
        document.getElementById("divSearchContact").innerHTML = "";
        if (dataReceived.length > 0) {
            var html = ' <div style="z-index:2;position:absolute;width:250px;background-color: white;cursor:pointer" onclick="displayContactAfterSearchContactReturn()">'
                + ' <i class="fas fa-angle-double-left"></i></div> ';
            html = html + tableContactWithData(id_sender, dataReceived);
        } else {
            var html = "<p style='font-style:italic'>Pas de correspondance trouvée, veuillez réessayer votre recherche</p>";
        }
        displayContactAfterSearchContact();
        document.getElementById("divSearchContact").innerHTML = html;
        document.getElementById("inputRechercheContact").value = "";
    }
    request.send();
}

function convertTimeJSON(theDate) {
    if (theDate.getSeconds() < 10) var seconds = "0" + theDate.getSeconds();
    else seconds = theDate.getSeconds();

    if (theDate.getMinutes() < 10) var minutes = "0" + theDate.getMinutes();
    else minutes = theDate.getMinutes();

    if (theDate.getHours() < 10) var hours = "0" + theDate.getHours();
    else hours = theDate.getHours();

    return hours + ":" + minutes + ":" + seconds;
}

function convertDateJSON(theDate) {
    if (theDate.getFullYear() < 10) var years = "0" + theDate.getFullYear();
    else years = theDate.getFullYear();

    if (theDate.getMonth() < 10) var month = "0" + (theDate.getMonth() + 1);
    else month = (theDate.getMonth() + 1);

    if (theDate.getDate() < 10) var day = "0" + theDate.getDate();
    else day = theDate.getDate();

    return years + "-" + month + "-" + day;
}

function addFavoris() {
    var star = document.querySelector(".divIcone .tooltipFavoris .fa-star");
    var request = new XMLHttpRequest();
    var url = '';
    //add favoris
    if (star.classList.contains("far")) {
        star.classList.remove("far");
        star.classList.add("fas");
        star.style.color = "#ffd43b";

        url = 'http://' + connexionBack + ':9000/favoris/favorisInsert';
    } else {
        //delete favoris
        star.classList.add("far");
        star.classList.remove("fas");
        star.style.color = "#ffffff";

        url = 'http://' + connexionBack + ':9000/favoris/dropFavoris';
    }

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    var data = {
        idPerson1: idSender,
        idPerson2: idReceiver
    };
    request.send(JSON.stringify(data));
}

function displayFavoris(id, idCompany, text) {
    varIdCompany = idCompany;
    var div = document.getElementById("cacheForFavoris");
    div.innerHTML = '';//vide la div
    var request = new XMLHttpRequest();
    var url = '';
    if (text === "favoris") {
        url = 'http://' + connexionBack + ':9000/favoris/selectFavoris?id_sender=' + id;
    } else if (text === "employee") {
        url = 'http://' + connexionBack + ':9000/messages/getContacts?id_sender=' + id + "&id_company=" + idCompany;
    }
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                let conversations = JSON.parse(request.responseText);
                div.innerHTML = tableContactWithData(id, conversations);
            }
        }
    }
    request.open('GET', url, true);
    request.send();
}

function tableContactWithData(id_sender, dataReceived) {
    let img = "";
    let span = "";
    var html = '';
    html = html + "<table id='tableContact' style='width:100%;margin-top:15px;'><tbody>";
    for (var i = 0; i < dataReceived.length; i++) {
        if (dataReceived[i].id != id_sender) {
            if (dataReceived[i].id <= 20150 && dataReceived[i].id >= 20001) img = '<img src="/images/homme1.png" />';
            else if (dataReceived[i].id > 20150 && dataReceived[i].id <= 20300) img = '<img src="/images/homme2.png" />';
            else if (dataReceived[i].id > 20300 && dataReceived[i].id <= 20450) img = '<img src="/images/femme1.png" />';
            else img = '<img src="/images/femme2.png" />';

            if (dataReceived[i].status == 'occupy') span = "<span class='spanStatus' style='color:red;'><i class='fas fa-circle' style='font-size:0.75rem'></i></span>";
            else span = '<span class="spanStatus" style="color:green;"><i class="fas fa-circle"style="font-size:0.75rem"></i></span>';

            html += "<tr onclick=displayMessage(" + id_sender + "," + dataReceived[i].id + ")>" +
                "<td class='divSpanStatus'>" + img + span + "</td>" +
                "<td><span style='color:#212529'>" + dataReceived[i].firstname + " " +
                "<span style='color:#212529'>" + dataReceived[i].lastname + "</span> </td>" +
                "<td><i class='fas fa-angle-right'></i></td></tr>";
        }
    }
    html += "</tbody></table>";
    return html;
}

function clickAddFile() {
    let varInputForAddFile = document.getElementById("selectFilePrt");
    varInputForAddFile.click();
}
function selectedFile() {
    let varInputForAddFile = document.getElementById("selectFilePrt");
    if (varInputForAddFile.value) {
        let divShowFile = document.getElementById("selectFileToSend");
        divShowFile.style.display = "block";
        divShowFile.innerHTML = '<i class="fa-solid fa-file"></i> ' + varInputForAddFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]; // to delete C://fakepath//
        activeSend();
    }
}

function downloadFile(date, time, numberFile, sender, receiver, idForButton) {


    //seek file
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/file/searchFile?idSender=' +
        sender + '&idReceiver=' + receiver + '&dateMessage=' + date + '&timeMessage=' + time + '&numberFile=' + numberFile;
    request.open('POST', url, true);
    request.responseType = 'blob';
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function () {
        var contentDisposition = request.getResponseHeader('content-disposition');

        let fileName = contentDisposition.split("=")[1];
        fileName = fileName.replace(/\"/g, "");
        var blob = new Blob([request.response], { type: 'application/txt' });
        var elParent = document.getElementById("" + idForButton + "").parentElement;
        //to force click
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        elParent.appendChild(link);
        link.click();
        elParent.removeChild(link);
    }
    request.send();

}
