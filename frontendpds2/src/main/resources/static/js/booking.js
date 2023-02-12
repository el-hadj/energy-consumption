var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
});


var usersAddforMeeting = new Array();

function openModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = "block";

    if (idModal === "myModalErrorInput") var span = document.getElementById("closeModalErrorInput");
    else if (idModal === "myModalDispoRoom") var span = document.getElementById("closeModalDispoRoom");
    else if (idModal === "myModalConfort") var span = document.getElementById("closeModalConfort");
    else if (idModal === "myModalDevice") var span = document.getElementById("closeModalDevice");
    else if (idModal == "myModalSeeDispoPeople") var span = document.getElementById("closeModalSeeDispoPeople");
    else if (idModal === "myModalForConfirmation") {
        var span = document.getElementById("closeModalForConfirmation");
        var typeRoom = document.getElementById("types");


        let textModal = document.getElementById("textModalConfirmation");
        let date = document.getElementById("date").value;
        let hourStart = document.getElementById("startTime").value;
        let hourEnd = document.getElementById("endTime").value;
        let text = "";

        // if null so it is meetingRoom
        if (typeRoom === null) {
            let listParticipant = "";
            let divListPeople = document.getElementById("listPeopleforMeeting").childNodes;
            for (let i = 0; i < divListPeople.length; i++) {
                listParticipant = divListPeople[i].innerText + ", " + listParticipant;
            }
            if (listParticipant.length > 0) {
                listParticipant.substring(0, listParticipant.length - 1);
                listParticipant = listParticipant + " + vous.";
            } else listParticipant = "vous.";
            text = "Une reunion le " + date + " entre " + hourStart + " et " + hourEnd + ".</br></br>";
            text = text + "Liste des participants : " + listParticipant;
        } else text = "Une place le " + date + " entre " + hourStart + " et " + hourEnd + ".</br></br>";
        textModal.innerHTML = text;
    }
    else var span = document.getElementById("closeModalAddPeople");

    //ferme le modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // permet le modal si click en dehors du modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function closeModal(idModal) {
    //to back to modal add people
    if (idModal === "myModalSeeDispoPeople") {
        var modalToOpenHeader = document.querySelector("#myModalSeeDispoPeople .modal-header h2");
        modalToOpenHeader.innerHTML = "Disponibilité de ";
        openModal("myModalAddPeople");
    }
    var modal = document.getElementById(idModal);
    modal.style.display = "none";
}

function addButtontoData(mydata) {

    for (let i = 0; i < mydata.length; i++) {
        let max = "";
        let buttonDisponibility = '';
        let buttonRadio = '';
        let buttonConfort = '';
        let buttonDevice = '';
        if (mydata[i].type_room === "meetingRoom") {
            buttonDisponibility = '<span style="cursor:pointer; color :#796aee" id="Map' + mydata[i].id_room + '" class="tooltipRight"><i onclick="openModalDispoRoom(' + mydata[i].id_room + ')" class="fas fa-calendar-day"></i><span class="tooltiptext">Aller voir son calendrier</span></span>';
            mydata[i].map = buttonDisponibility;
        }
        if (mydata[i].type_room === "openSpace") {
            max = "20/20";
        } else if (mydata[i].type_room === "salleTravail") {
            max = "10/10"
        } else if (mydata[i].type_room === "bureauSolo") {
            max = "1/1";
        }

        if (mydata[i].map !== max) {
            buttonRadio = '<input type="radio" class="choiceSelected" id="Radio' + mydata[i].id_room + '" name="choiceSelected" style="cursor:pointer" '
                + 'onclick="choiceBooking(' + mydata[i].id_room + ') "/>  <span style="cursor: pointer; color:#333"><i class="fas fa-map-marked-alt"></i></span>';
        }

        buttonConfort = '<span style="padding-right:10%; text-align:right"><i class="fas fa-home" style="cursor:pointer" onclick="openConfort(' + mydata[i].id_room + ')"></i></span>';
        buttonDevice = '<span style="padding-left:10%; text-align:left"><i class="fa-solid fa-tv"  style="cursor: pointer" onclick="openDevice(' + mydata[i].id_room + ')"></i></span>';
        mydata[i].listEquipment = "<div style='display: grid;grid-template-columns:auto auto;'>" + buttonConfort + buttonDevice + "</div>";
        mydata[i].choice = buttonRadio;
    }

    return mydata;
}

function changeValueRoom(idRoom) {
    document.getElementById("roomId").value = idRoom;
    document.getElementById("dateRoomChoose").value = document.getElementById("date").value;
    document.getElementById("startTimeChoose").value = document.getElementById("startTime").value;
    document.getElementById("endTimeChoose").value = document.getElementById("endTime").value;
}

function choiceBooking(idRoom) {
    let searchDate = document.getElementById("date").value;
    let searchStartTime = document.getElementById("startTime").value;
    let searchEndTime = document.getElementById("endTime").value;

    if (!searchDate || !searchEndTime || !searchStartTime) {
        openModal('myModalErrorInput');
    } else {
        let buttonRadioBox = document.getElementsByClassName("choiceSelected");
        changeValueRoom(idRoom);

        for (let i = 0; i < buttonRadioBox.length; i++) {
            if (buttonRadioBox[i].checked == true) {
                var textModalConfirmation = document.getElementById("textModalConfirmation");
                textModalConfirmation.innerHTML = " ";
                document.getElementById("SeeRecap").style.cursor = "pointer";
                document.getElementById("SeeRecap").disabled = false;
                document.getElementById("SeeRecap").style.backgroundColor = "#796aee";

                //if user changes choice 
                document.getElementById("buttonValidate").style.cursor = "no-drop";
                document.getElementById("buttonValidate").disabled = true;
                document.getElementById("buttonValidate").style.backgroundColor = "#dcdcdc"; //to chnage style of confirmer
            }
        }
    }
}

function ajaxRequest(params) {
    var typeRoom = '';
    //if title room exits, type == meetingRoom
    if (document.getElementById("titleMeeting") != null) typeRoom = 'meetingRoom';
    else typeRoom = 'other';

    var url = "http://" + connexionBack + ":9000/roomDigital/selectRoomDigital?type=" + typeRoom;
    console.log(url);
    $.get(url).then(function (res) {
        res = addButtontoData(res);
        params.success(res);
    })
}

function searchRoom(typeRoom) {
    let searchDate = document.getElementById("date").value;
    let searchStartTime = document.getElementById("startTime").value;
    let searchEndTime = document.getElementById("endTime").value;

    let searchTypeRoom = '';
    if (typeRoom === 'meeting') {
        document.getElementById("titleMeetingForm").value = document.getElementById("titleMeeting").value;
        console.log("searchRoom " + document.getElementById("idBooker").value);
        //add person who book the room
        usersAddforMeeting.push(document.getElementById("idBooker").value);
        document.getElementById("listEmployeeInput").value = usersAddforMeeting;
        searchTypeRoom = "meetingRoom";
    }
    else searchTypeRoom = document.getElementById("types").value;

    searchEndTime = searchEndTime + ":00";
    searchStartTime = searchStartTime + ":00";

    //check if string is empty
    if (!searchDate || !searchEndTime || !searchStartTime) {
        openModal('myModalErrorInput');
    } else {
        document.querySelector("#table tbody").innerHTML = "";
        $.ajax('http://' + connexionBack + ':9000/roomDigital/getRoomsWithSearch?endTime=' + searchEndTime + '&startTime=' + searchStartTime + '&type=' + searchTypeRoom + '&day=' + searchDate, {
            contentType: 'application/json',
            dataType: 'json',
            success: function (mydata) {
                mydata = addButtontoData(mydata);
                $("#table").bootstrapTable("load", mydata)
            }
        })
    }
}

function addColleague(id) {
    var modalToOpenHeader = document.querySelector("#myModalSeeDispoPeople .modal-header h2");
    modalToOpenHeader.innerHTML = "Disponibilité de ";

    let searchDate = document.getElementById("date").value;
    let searchStartTime = document.getElementById("startTime").value;
    let searchEndTime = document.getElementById("endTime").value;

    searchEndTime = searchEndTime + ":00";
    searchStartTime = searchStartTime + ":00";

    //check if string is empty
    if (!searchDate || !searchEndTime || !searchStartTime) {
        openModal('myModalErrorInput');
    } else {
        var bodyModal = document.querySelector("#myModalAddPeople .modal-body");
        let html = '';

        var request = new XMLHttpRequest();
        const url = 'http://' + connexionBack + ':9000/employee/employeeInCompanyWithTime?id=' + id + '&date=' + searchDate + '&startTime=' + searchStartTime + '&endTime=' + searchEndTime;
        console.log(url);
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            console.log(data);

            if (data.length > 0) {
                var roleOfUser = document.getElementById("roleUser").attributes.value.value;
                html = '<table id="tableModalPeople"><tbody>';
                for (let i = 0; i < data.length; i++) {
                    let td1 = '<td>' + data[i].first_name + '</td>';
                    let td2 = '<td>' + data[i].last_name + '</td>';
                    let td3 = '';

                    if (data[i].sg === "true") {
                        td3 = '<td style="text-align:right"><i  class="fas fa-user-tag"></i>';
                    }
                    else td3 = '<td style="text-align:right"><i style="margin-right:5px" class="fas fa-user"></i>';

                    let styleColor = "";
                    if (data[i].status === "free") {
                        styleColor = "style='color:#16db93' ";
                        td3 = td3 + '<i style="margin-left:5px;cursor:pointer" class="fas fa-plus-circle" onclick="addPeopleFront(' + data[i].id + ',\'' + data[i].first_name + '\',\'' + data[i].last_name + '\')"></i>';
                    } else {
                        styleColor = "style='color:#ed9775' ";
                        //display calendar of collegue or not
                        if (data[i].id_role >= roleOfUser) {
                            td3 = td3 + '<i style="color :#146ebe;cursor:pointer;margin-left:5px;" class="fas fa-calendar-day" onclick="seeDispo(' + data[i].id + ',\'' + data[i].first_name + '\',\'' + data[i].last_name + '\')"></i>';
                        }
                    }
                    td3 = td3 + '</td > ';

                    let tr = '<tr ' + styleColor + '>' + td1 + td2 + td3 + '</tr>';
                    html = html + tr;
                }
                html = html + '</tbody></table>';
            }
            bodyModal.innerHTML = html;
        }
        request.send();
        openModal('myModalAddPeople');
    }
}

function addPeopleFront(id, first_name, last_name, email) {
    let verif = true;

    for (let i = 0; i < usersAddforMeeting.length; i++) {
        if (id === usersAddforMeeting[i]) {
            verif = false;
        }
    }

    if (verif) {
        var div = document.getElementById("listPeopleforMeeting");
        let html = '';
        html = '<div class="' + id + first_name + '" style="display:grid; grid-template-columns: 50% 50%; height:25px"><span class="spanFirstName">' + first_name + ' ' + last_name + '</span><span>'
            + '<i onclick="removeColleague(' + id + ',\'' + first_name + '\')" class="fas fa-user-minus"></i></span></div>';

        div.innerHTML = div.innerHTML + html;
        //add id to the list of employee;
        usersAddforMeeting.push(id);
        document.getElementById("listEmployeeInput").value = usersAddforMeeting;
    }
}

function removeColleague(id, firstName) {
    var users = document.getElementsByClassName(id + firstName);
    for (let i = 0; i < users.length; i++) {
        users[i].style.display = "none";
        users[i].remove();//to actualize modal
    }

    //delete element of the array
    var index = usersAddforMeeting.indexOf(id);
    if (index > -1) {
        usersAddforMeeting.splice(index, 1);
    }
    document.getElementById("listEmployeeInput").value = usersAddforMeeting;
}

function openConfort(room_id) {
    var request = new XMLHttpRequest();
    var bodyModal = document.querySelector("#myModalConfort .modal-body");
    let html = '';
    const url = 'http://' + connexionBack + ':9000/roomDigital/roomById?room_id=' + room_id;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(data);
        html = '<table id="tableModalConfort" style="width: 100%">';
        html = html + '<thead style="text-align: center"> <tr> <th></th></th><th>Etat</th> <th>Température de consigne</th> <th>Mode</th> </tr> </thead>';
        let td_etat_heating = '';
        if (data.heatingDwp.etat == true) td_etat_heating = '<td>Allumé</td>';
        else td_etat_heating = '<td>Eteint</td>';
        html = html + ' <tbody style="text-align: center">' +
            ' <tr>' +
            '<td>Chauffage</td>' +
            td_etat_heating +
            '    <td>' + data.heatingDwp.temperature + '°C</td>' +
            '   <td>' + data.heatingDwp.mode + '</td>' +
            '    </tr>' +
            '    </tbody>'
        html = html + '<thead style="text-align: center"> <tr> <th></th><th>Etat</th> <th>Intensité Electrique</th> <th>Mode</th> </tr> </thead>';
        let td_etat_light = '';
        if (data.lightDwp.etat == true) td_etat_light = '<td>Allumée</td>';
        else td_etat_light = '<td>Eteint</td>';
        html = html + ' <tbody style="text-align: center">' +
            ' <tr>' +
            '<td>Lumière</td>' +
            td_etat_light +
            '    <td>' + data.lightDwp.intensity + '%</td>' +
            '   <td>' + data.lightDwp.mode + '</td>' +
            '    </tr>' +
            '    </tbody>'
        html = html + '<thead style="text-align: center"> <tr> <th></th><th>Etat</th> <th>Ouverture du store</th> <th>Mode</th> </tr> </thead>';
        let td_etat_blind = '';
        if (data.blindDwp.etat == true) td_etat_blind = '<td>Opérationnel</td>';
        else td_etat_blind = '<td>Non Opérationnel</td>';
        html = html + ' <tbody style="text-align: center">' +
            ' <tr>' +
            '<td>Store</td>' +
            td_etat_blind +
            '    <td>' + data.blindDwp.opening + '%</td>' +
            '   <td>' + data.blindDwp.mode + '</td>' +
            '    </tr>' +
            '    </tbody>'
        html = html + '</table>';
        bodyModal.innerHTML = html;
    }
    request.send();
    openModal('myModalConfort');
}

function openDevice(room_id) {
    var request = new XMLHttpRequest();
    var bodyModal = document.querySelector("#myModalDevice .modal-body");
    let html = '';
    const url = 'http://' + connexionBack + ':9000/roomDigital/roomById?room_id=' + room_id;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(data)
        html = '<table id="tableModalDevice" style="width: 100%">';
        html = html + '<thead style="text-align: center"> <tr> <th></th></th><th>Etat</th> </tr> </thead>';
        let td_etat_screen = '';
        if (data.screenDwp.etat == true) td_etat_screen = '<td>Allumé</td>';
        else td_etat_screen = '<td>Eteint</td>';
        html = html + ' <tbody style="text-align: center">' +
            ' <tr>' +
            '<td>Écran</td>' +
            td_etat_screen +
            '    </tr>' +
            '    </tbody>'
        html = html + '<thead style="text-align: center"> <tr> <th></th><th>Etat</th> </tr> </thead>';
        let td_etat_plug = '';
        if (data.plugDwp.etat == true) td_etat_plug = '<td>Allumée</td>';
        else td_etat_plug = '<td>Eteint</td>';
        html = html + ' <tbody style="text-align: center">' +
            ' <tr>' +
            '<td>Prise Connectée</td>' +
            td_etat_plug +
            '    </tr>' +
            '    </tbody>'
        html = html + '</table>';
        bodyModal.innerHTML = html;
    }
    request.send();
    openModal('myModalDevice');
}

function openModalDispoRoom(idRoom) {
    var idBooker = document.getElementById("idBooker").value;
    console.log("lalal" + idBooker);
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/roomDigital/selectEventForRoom?idRoom=' + idRoom + '&idPerson=' + idBooker;
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);

                var calendarEl = document.querySelector("#myModalDispoRoom .modal-body");
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'listWeek',
                    locale: 'fr',
                    headerToolbar: {
                        left: 'prev,next',
                        center: 'title',
                        right: ''
                    },
                    views: {
                        listWeek: {
                            titleFormat: {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }
                        }
                    },
                    events: data,
                    nowIndicator: true,
                    allDaySlot: false
                });
                calendar.render();
            }
        }
    }
    request.open('GET', url, true);
    request.send();
    openModal('myModalDispoRoom');
}

function confirmeBooking() {
    document.getElementById("buttonValidate").style.cursor = "pointer";
    document.getElementById("buttonValidate").disabled = false;
    document.getElementById("buttonValidate").style.backgroundColor = "#796aee";//to change style of valider

    document.getElementById("myModalForConfirmation").style.display = "none";// to close modal

    document.getElementById("SeeRecap").style.cursor = "no-drop";
    document.getElementById("SeeRecap").disabled = true;
    document.getElementById("SeeRecap").style.backgroundColor = "#dcdcdc"; //to chnage style of confirmer
}

function seeDispo(idPeople, firstName, lastName) {
    closeModal("myModalAddPeople");

    var modalToOpenHeader = document.querySelector("#myModalSeeDispoPeople .modal-header h2");
    modalToOpenHeader.innerHTML += firstName + " " + lastName;

    openModalDisPeople(idPeople);
    openModal("myModalSeeDispoPeople");
}

function openModalDisPeople(idPeople) {
    var htmlTableDispo = '';
    let date = document.getElementById("date").value;
    let hourStart = document.getElementById("startTime").value;
    let hourEnd = document.getElementById("endTime").value;
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/employee/dispoPeople?idPerson=' + idPeople + '&date=' + date + '&start=' + hourStart + '&end=' + hourEnd;
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);

                var body = document.querySelector("#myModalSeeDispoPeople .modal-body");
                var beforeHtmlTh = '';
                var afterHtmlTh = '';
                var beforeHtmlTd = '';
                var afterHtmlTd = '';
                var style = '';
                var icone = '';

                for (var i = 0; i < data.length; i++) {
                    var start = formatDate(data[i].start);
                    var end = formatDate(data[i].end);

                    if (data[i].verif === "forBefore") {
                        beforeHtmlTh = '<td>' + start + ' - ' + end + '</td>';
                        if (data[i].dispo === "true") {
                            style = 'style="background-color: #d1f3d3;';
                            icone = '<i style="color:#94d094;" class="fas fa-check"></i>';
                        } else {
                            style = 'style="background-color: #ffcdca;';
                            icone = '<i style="color:#b52121" class="fas fa-times"></i>';
                        }
                        beforeHtmlTd = '<td ' + style + 'border-radius: 0 0 0 10px;" >' + icone + '</td>';
                    } else {
                        afterHtmlTh = '<td>' + start + ' - ' + end + '</td>';
                        if (data[i].dispo === "true") {
                            style = 'style="background-color: #d1f3d3;';
                            icone = '<i style="color:#94d094;" class="fas fa-check"></i>';
                        } else {
                            style = 'style="background-color: #ffcdca;';
                            icone = '<i style="color:#b52121" class="fas fa-times"></i>';
                        }
                        afterHtmlTd = '<td ' + style + 'border-radius: 0 0 10px 0px;" >' + icone + '</td>';
                    }
                }
                hourStart = hourStart.replace(':', 'h');
                hourEnd = hourEnd.replace(':', 'h');

                //to transform in french date
                moment.locale("fr");
                date = moment(date).format('LL')

                htmlTableDispo = '<table id="tableDispoPeople" cellspacing=0>' +
                    '<tr><th colspan="3">' + date + '</th></tr>' +
                    '<tr>' + beforeHtmlTh + '<td>' + hourStart + ' - ' + hourEnd + '</td >' + afterHtmlTh + '</tr>' +
                    '<tr>' + beforeHtmlTd + '<td style="background-color:#ffcdca;border-right:3px solid white; border-left:3px solid white"><i style="color:#b52121" class="fas fa-times"></i></td>' + afterHtmlTd + '</tr>' +
                    '</table>';

                body.innerHTML = htmlTableDispo;
            }
        }
    }
    request.open('GET', url, true);
    request.send();
}

function formatDate(value) {
    value = value.split(" ")[1];
    value = value.split(".")[0];
    value = value.substring(0, value.length - 3);
    value = value.replace(':', 'h');
    return value;
}