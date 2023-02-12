
var destination = '';
var startJourney = '';
var durationJourneyMinutes = 0;
var durationJourneySeconds = 0;
var listStop = [];
var dataPeople = {
    lastName: "",
    firstName: "",
    idPeople: "",
    idCompany: "",
    email: ""
};
var numberReservation = 0;

var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
});

//value with Algo Djikstra
// G --> Gare, E --> Entreprise , Ae --> aeroport, C --> commercial, Ha --> habitation
var startWithGare = { "G": "0/G", "E": "5/G", "Ae": "10/G", "C": "5/G", "Ha": "6/C" };
var startWithEntreprise = { "G": "5/E", "E": "0/E", "Ae": "7/E", "C": "2/E", "Ha": "6/C" };
var startWithCommercial = { "G": "5/C", "E": "2/C", "Ae": "7/E", "C": "0/C", "Ha": "6/C" };
var startWithAeroport = { "G": "10/Ae", "E": "7/Ae", "Ae": "0/Ae", "C": "2/E", "Ha": "11/Ae" };
var startWithHabitation = { "G": "5/C", "E": "2/C", "Ae": "11/Ha", "C": "6/Ha", "Ha": "0/Ha" };

document.addEventListener('DOMContentLoaded', function () {
    anychart.onDocumentReady(function () {
        anychart.data.loadJsonFile("/json/dataPrt.json", function (data) {
            // create a chart from the loaded data
            var chart = anychart.graph(data);
            // set the title
            chart.title("Stations");

            // enable the labels of nodes
            chart.nodes().labels().enabled(true);

            // access nodes
            var nodes = chart.nodes();
            nodes.normal().height(30);
            nodes.fill("#796aee");

            // configure the labels of nodes
            chart.nodes().labels().format("{%id}");
            chart.nodes().labels().fontSize(12);
            chart.nodes().labels().fontWeight(600);

            var edgeConfig = {
                hovered: { stroke: { thickness: 2, color: 'orange', dash: '3 1' } },
                tooltip: { enabled: true, format: 'Temps du trajet: {%time}' }
            };

            chart.edges(edgeConfig);

            chart.listen('click', function (e) {
                var tag = e.domTarget.tag;
                if (tag) {
                    if (tag.type === 'node') {

                        for (var i = 0; i < data.nodes.length; i++) {
                            if (data.nodes[i].id === tag.id) {
                                openModal(tag.id);// method in file mapPrt.js
                                break;
                            }
                        }

                    }
                }
            });

            // draw the chart
            chart.container("containerGraph").draw();
        });
    });
    startRequestAjaxForReloadPrt = setInterval(function () { requestAjaxForPrt(); }, 10000);
});

function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

function formatTime(date) {
    var hh = date.getHours();
    var mm = date.getMinutes() + 1; //January is 0!
    var ss = date.getSeconds();
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return hh + ':' + mm + ':' + ss;
}
function formatDateForDb(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
}

function requestAjaxForPrt() {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/prt/getPrtWithLocation';
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var data = JSON.parse(this.responseText);

        if (data.length > 0) {

            var htmlGareFree = "Nombre de wagon libre<br />";
            var htmlCommercialFree = htmlGareFree;
            var htmlEntrepriseFree = htmlGareFree;
            var htmlAeroportFree = htmlGareFree;
            var htmlHabitationFree = htmlGareFree;

            var htmlGareOccupy = "Nombre de wagon arrivant<br />";
            var htmlCommercialOccupy = htmlGareOccupy;
            var htmlEntrepriseOccupy = htmlGareOccupy;
            var htmlAeroportOccupy = htmlGareOccupy;
            var htmlHabitationOccupy = htmlGareOccupy;

            var today = new Date();
            todayDate = formatDate(today);
            var formatteddatestr = moment(today).format('LTS');

            var timeGare = "Informations récupérées le <span>" + todayDate + "</span> à <span>" + formatteddatestr + "</span>";

            var id_location = null;
            for (let i = 0; i < data.length; i++) {
                id_location = data[i].id_location
                if (id_location === 1) {
                    //in gare
                    htmlGareFree += addFreePrt();
                } else if (id_location === 2) {
                    //in entreprise
                    htmlEntrepriseFree += addFreePrt();
                } else if (id_location === 3) {
                    //in commercial
                    htmlCommercialFree += addFreePrt();
                } else if (id_location === 4) {
                    //in aeroport
                    htmlAeroportFree += addFreePrt();
                } else if (id_location === 5) {
                    //in habitation
                    htmlHabitationFree += addFreePrt();
                } else if (id_location === 6 || id_location === 10 || id_location === 9 || id_location === 12) {
                    //incoming in entreprise
                    htmlEntrepriseOccupy += addOccupyPrt();
                } else if (id_location === 7 || id_location === 17 || id_location === 21) {
                    //incoming in gare
                    htmlGareOccupy += addOccupyPrt();
                } else if (id_location === 8 || id_location === 14 || id_location === 16) {
                    //incoming in aeroport
                    htmlAeroportOccupy += addOccupyPrt();
                } else if (id_location === 11 || id_location === 15 || id_location === 19) {
                    //incoming in habitation
                    htmlHabitationOccupy += addOccupyPrt();
                } else if (id_location === 13 || id_location === 18 || id_location === 20) {
                    //incoming commercial
                    htmlCommercialOccupy += addOccupyPrt();
                }
            }

            document.querySelector("#dataGare .subDivPrt.prtFree p").innerHTML = htmlGareFree;
            document.querySelector("#dataGare .subDivPrt.prtOccupy p").innerHTML = htmlGareOccupy;
            document.querySelector("#dataGare .timerInformation").innerHTML = timeGare;
            document.querySelector("#dataCommercial .subDivPrt.prtFree p").innerHTML = htmlCommercialFree;
            document.querySelector("#dataCommercial .subDivPrt.prtOccupy p").innerHTML = htmlCommercialOccupy;
            document.querySelector("#dataCommercial .timerInformation").innerHTML = timeGare;
            document.querySelector("#dataEntreprise .subDivPrt.prtFree p").innerHTML = htmlEntrepriseFree;
            document.querySelector("#dataEntreprise .subDivPrt.prtOccupy p").innerHTML = htmlEntrepriseOccupy;
            document.querySelector("#dataEntreprise .timerInformation").innerHTML = timeGare;
            document.querySelector("#dataAeroport .subDivPrt.prtFree p").innerHTML = htmlAeroportFree;
            document.querySelector("#dataAeroport .subDivPrt.prtOccupy p").innerHTML = htmlAeroportOccupy;
            document.querySelector("#dataAeroport .timerInformation").innerHTML = timeGare;
            document.querySelector("#dataHabitation .subDivPrt.prtFree p").innerHTML = htmlHabitationFree;
            document.querySelector("#dataHabitation .subDivPrt.prtOccupy p").innerHTML = htmlHabitationOccupy;
            document.querySelector("#dataHabitation .timerInformation").innerHTML = timeGare;

            //display button to book or not
            addButtonToBook();
        }
    }
    request.send();
}

function addButtonToBook() {
    // get a array for prt free
    let nbrForFreePrtGare = document.querySelectorAll("#dataGare .subDivPrt.prtFree p span").length;
    let nbrForFreePrtEntreprise = document.querySelectorAll("#dataEntreprise .subDivPrt.prtFree p span").length;
    let nbrForFreePrtAeroport = document.querySelectorAll("#dataAeroport .subDivPrt.prtFree p span").length;
    let nbrForFreePrtHabitation = document.querySelectorAll("#dataHabitation .subDivPrt.prtFree p span").length;
    let nbrForFreePrtCommercial = document.querySelectorAll("#dataCommercial .subDivPrt.prtFree p span").length;

    // get a array for prt occupy
    // let nbrForOccupyPrtGare = document.querySelectorAll("#dataGare .subDivPrt.prtOccupy p span").length;
    // let nbrForOccupyPrtEntreprise = document.querySelectorAll("#dataEntreprise .subDivPrt.prtOccupy p span").length;
    // let nbrForOccupyPrtAeroport = document.querySelectorAll("#dataAeroport .subDivPrt.prtOccupy p span").length;
    // let nbrForOccupyPrtHabitation = document.querySelectorAll("#dataHabitation .subDivPrt.prtOccupy p span").length;
    // let nbrForOccupyPrtCommercial = document.querySelectorAll("#dataCommercial .subDivPrt.prtOccupy p span").length;

    //for gare free
    let buttonFreePrtGare = document.querySelector("#dataGare .subDivPrt.prtFree button.bookPrt");
    if (buttonFreePrtGare != null) {
        //if button exists
        if (nbrForFreePrtGare === 0) buttonFreePrtGare.remove();
    } else {
        //if button dont exists
        if (nbrForFreePrtGare > 0) {
            // if new prt --> add button
            let button = "<button class='bookPrt' onclick='openModal(\"gareTerminaux\")'>J'en réserve un</button";
            let div = document.querySelector("#dataGare .subDivPrt.prtFree");
            div.innerHTML += button;
        }
    }

    // for gare occupy
    // let buttonOccupyPrtGare = document.querySelector("#dataGare .subDivPrt.prtOccupy button.bookPrt");
    // if (buttonOccupyPrtGare != null) {
    //     //if button exists
    //     if (nbrForOccupyPrtGare === 0) buttonOccupyPrtGare.remove();
    // } else {
    //     //if button dont exists
    //     if (nbrForOccupyPrtGare > 0) {
    //         // if new prt --> add button
    //         let button = "<button class='bookPrt' onclick='openModal(\"gareTerminaux\")'>J'en réserve un</button";
    //         let div = document.querySelector("#dataGare .subDivPrt.prtOccupy");
    //         div.innerHTML += button;
    //     }
    // }

    //for entreprise free
    let buttonFreePrtEntreprise = document.querySelector("#dataEntreprise .subDivPrt.prtFree button.bookPrt");
    if (buttonFreePrtEntreprise != null) {
        //if button exists
        if (nbrForFreePrtEntreprise === 0) buttonFreePrtEntreprise.remove();
    } else {
        //if button dont exists
        if (nbrForFreePrtEntreprise > 0) {
            // if new prt --> add button
            let button = "<button class='bookPrt' onclick='openModal(\"entrepriseTerminaux\")'>J'en réserve un</button";
            let div = document.querySelector("#dataEntreprise .subDivPrt.prtFree");
            div.innerHTML += button;
        }
    }
    //for entreprise occupy
    // let buttonOccupyPrtEntreprise = document.querySelector("#dataEntreprise .subDivPrt.prtOccupy button.bookPrt");
    // if (buttonOccupyPrtEntreprise != null) {
    //     //if button exists
    //     if (nbrForOccupyPrtEntreprise === 0) buttonOccupyPrtEntreprise.remove();
    // } else {
    //     //if button dont exists
    //     if (nbrForOccupyPrtEntreprise > 0) {
    //         // if new prt --> add button
    //         let button = "<button class='bookPrt' onclick='openModal(\"entrepriseTerminaux\")'>J'en réserve un</button";
    //         let div = document.querySelector("#dataEntreprise .subDivPrt.prtOccupy");
    //         div.innerHTML += button;
    //     }
    // }

    //for habitation free
    let buttonFreePrtHabitation = document.querySelector("#dataHabitation .subDivPrt.prtFree button.bookPrt");
    if (buttonFreePrtHabitation != null) {
        //if button exists
        if (nbrForFreePrtHabitation === 0) buttonFreePrtHabitation.remove();
    } else {
        //if button dont exists
        if (nbrForFreePrtHabitation > 0) {
            // if new prt --> add button
            let button = "<button class='bookPrt' onclick='openModal(\"habitationTerminaux\")'>J'en réserve un</button";
            let div = document.querySelector("#dataHabitation .subDivPrt.prtFree");
            div.innerHTML += button;
        }
    }
    //for habitation occupy
    // let buttonOccupyPrtHabitation = document.querySelector("#dataHabitation .subDivPrt.prtOccupy button.bookPrt");
    // if (buttonOccupyPrtHabitation != null) {
    //     //if button exists
    //     if (nbrForOccupyPrtHabitation === 0) buttonOccupyPrtHabitation.remove();
    // } else {
    //     //if button dont exists
    //     if (nbrForOccupyPrtHabitation > 0) {
    //         // if new prt --> add button
    //         let button = "<button class='bookPrt' onclick='openModal(\"habitationTerminaux\")'>J'en réserve un</button";
    //         let div = document.querySelector("#dataHabitation .subDivPrt.prtOccupy");
    //         div.innerHTML += button;
    //     }
    // }

    //for aeroport free
    let buttonFreePrtAeroport = document.querySelector("#dataAeroport .subDivPrt.prtFree button.bookPrt");
    if (buttonFreePrtAeroport != null) {
        //if button exists
        if (nbrForFreePrtAeroport === 0) buttonFreePrtAeroport.remove();
    } else {
        //if button dont exists
        if (nbrForFreePrtAeroport > 0) {
            // if new prt --> add button
            let button = "<button class='bookPrt' onclick='openModal(\"aeroportTerminaux\")'>J'en réserve un</button";
            let div = document.querySelector("#dataAeroport .subDivPrt.prtFree");
            div.innerHTML += button;
        }
    }
    //for aeroport occupy
    // let buttonOccupyPrtAeroport = document.querySelector("#dataAeroport .subDivPrt.prtOccupy button.bookPrt");
    // if (buttonOccupyPrtAeroport != null) {
    //     //if button exists
    //     if (nbrForOccupyPrtAeroport === 0) buttonOccupyPrtAeroport.remove();
    // } else {
    //     //if button dont exists
    //     if (nbrForOccupyPrtAeroport > 0) {
    //         // if new prt --> add button
    //         let button = "<button class='bookPrt' onclick='openModal(\"aeroportTerminaux\")'>J'en réserve un</button";
    //         let div = document.querySelector("#dataAeroport .subDivPrt.prtOccupy");
    //         div.innerHTML += button;
    //     }
    // }

    //for commercial free
    let buttonFreePrtCommercial = document.querySelector("#dataCommercial .subDivPrt.prtFree button.bookPrt");
    if (buttonFreePrtCommercial != null) {
        //if button exists
        if (nbrForFreePrtCommercial === 0) buttonFreePrtCommercial.remove();
    } else {
        //if button dont exists
        if (nbrForFreePrtCommercial > 0) {
            // if new prt --> add button
            let button = "<button class='bookPrt' onclick='openModal(\"commercialTerminaux\")'>J'en réserve un</button";
            let div = document.querySelector("#dataCommercial .subDivPrt.prtFree");
            div.innerHTML += button;
        }
    }
    //for commercial occupy
    // let buttonOccupyPrtCommercial = document.querySelector("#dataCommercial .subDivPrt.prtOccupy button.bookPrt");
    // if (buttonOccupyPrtCommercial != null) {
    //     //if button exists
    //     if (nbrForOccupyPrtCommercial === 0) buttonOccupyPrtCommercial.remove();
    // } else {
    //     //if button dont exists
    //     if (nbrForOccupyPrtCommercial > 0) {
    //         // if new prt --> add button
    //         let button = "<button class='bookPrt' onclick='openModal(\"commercialTerminaux\")'>J'en réserve un</button";
    //         let div = document.querySelector("#dataCommercial .subDivPrt.prtOccupy");
    //         div.innerHTML += button;
    //     }
    // }
}

function addFreePrt() {
    return " <span><i class='iconForPrtFree fa-solid fa-van-shuttle rotateIcons20'></i></span>";
}
function addOccupyPrt() {
    return " <span><i class='iconForPrtOccupy fa-solid fa-van-shuttle rotateIcons20'></i></span>";
}

function enterArea(area) {
    let el = null;
    let elements = document.getElementById("ac_layer_y").childNodes;
    elements.forEach(disabled);
    if (area === 'Gare') {
        el = document.getElementById("ac_path_t");
    } else if (area === 'Entreprise') {
        el = document.getElementById("ac_path_u");
    } else if (area === 'Commercial') {
        el = document.getElementById("ac_path_v");
    } else if (area === 'Aeroport') {
        el = document.getElementById("ac_path_w");
    } else if (area === 'Habitation') {
        el = document.getElementById("ac_path_x");
    }
    el.style.fill = "#b35356";
}
function disabled(el) {
    el.style.fill = "#1976d2";
}

function leaveArea() {
    let elements = document.getElementById("ac_layer_y").childNodes;
    elements.forEach(disabled);
}

function openModal(value) {
    let idModal = "myModalTerminal";
    let span = null;
    let titleModal = null;
    let htmlModal = null;
    let bodyModal = document.querySelector("#myModalTerminal .modal-body");
    bodyModal.innerHTML = '';
    if (value === 'Terminal 1 : Gare') {
        titleModal = "Terminal 1 : Gare";
    } else if (value === 'Terminal 2 : Entreprise') {
        titleModal = "Terminal 2 : Entreprise";
    } else if (value === 'Terminal 3 : Centre Commercial') {
        titleModal = "Terminal 3 : Centre Commercial";
    } else if (value === 'Terminal 4 : Aéroport') {
        titleModal = "Terminal 4 : Aéroport";
    } else if (value === 'Terminal 5 : Habitation') {
        titleModal = "Terminal 5 : Habitation";
    } else if (value === 'gareTerminaux') {
        document.getElementById("choiceTerminalForDeparture").attributes.value.value = 'gare';
        titleModal = "Terminal 1 : Gare";
        htmlModal = generateHtmlModal('gare');
    } else if (value === 'habitationTerminaux') {
        document.getElementById("choiceTerminalForDeparture").attributes.value.value = 'habitation';
        titleModal = "Terminal 5 : Habitation";
        htmlModal = generateHtmlModal('habitation');
    } else if (value === 'entrepriseTerminaux') {
        document.getElementById("choiceTerminalForDeparture").attributes.value.value = 'entreprise';
        titleModal = "Terminal 2 : Entreprise";
        htmlModal = generateHtmlModal('entreprise');
    } else if (value === 'commercialTerminaux') {
        document.getElementById("choiceTerminalForDeparture").attributes.value.value = 'commercial';
        titleModal = "Terminal 3 : Centre Commercial";
        htmlModal = generateHtmlModal('commercial');
    } else if (value === 'aeroportTerminaux') {
        document.getElementById("choiceTerminalForDeparture").attributes.value.value = 'aeroport';
        titleModal = "Terminal 4 : Aéroport";
        htmlModal = generateHtmlModal('aeroport');
    }

    var spanModal = document.querySelector("#myModalTerminal .modal-header h2");
    span = document.getElementById("closeModalTerminal");
    spanModal.innerHTML = titleModal;

    bodyModal.innerHTML = htmlModal;

    var modal = document.getElementById(idModal);
    modal.style.display = "block";

    //ferme le modal
    span.onclick = function () {
        modal.style.display = "none";
        // to restart style of the button
        document.getElementById("buttonValide").style.display = "none";
        document.getElementById("generateFileButtonForBookingPrt").style.display = "none";
    }

    // permet le modal si click en dehors du modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // to restart style of the button
            document.getElementById("buttonValide").style.display = "none";
            document.getElementById("generateFileButtonForBookingPrt").style.display = "none";
        }
    }
}

function closeModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = "none";

    // to restart style of the button
    document.getElementById("buttonValide").style.display = "none";
    document.getElementById("generateFileButtonForBookingPrt").style.display = "none";
}

function generateHtmlModal(value) {
    let subTitle = null;
    let divInModalBody = '';

    let commercialChoice = "<div id='divCommercialModalBody'>" +
        "<input onclick='activButton()' type='radio' id='commercialChoice' name='terminalChoice' value='commercial'>" +
        "<label for='commercialChoice'> Centre commercial</label>" +
        "</div>";
    let entrepriseChoice = "<div id='divEntrepriseModalBody'>" +
        "<input onclick='activButton()' type='radio' id='entrepriseChoice' name='terminalChoice' value='entreprise'>" +
        "<label for='entrepriseChoice'> Entreprise</label>" +
        "</div>";
    let habitationChoice = "<div id='divHabitationModalBody'>" +
        "<input onclick='activButton()' type='radio' id='habitationChoice' name='terminalChoice' value='habitation'>" +
        "<label for='habitationChoice'> Habitation</label>" +
        "</div>";
    let gareChoice = "<div id='divGareModalBody'>" +
        "<input onclick='activButton()' type='radio' id='gareChoice' name='terminalChoice' value='gare'>" +
        "<label for='gareChoice'> Gare</label>" +
        "</div>";
    let aeroportChoice = "<div id='divGareModalBody'>" +
        "<input onclick='activButton()' type='radio' id='aeroportChoice' name='terminalChoice' value='aeroport'>" +
        "<label for='aeroportChoice'> Aéroport</label>" +
        "</div>";

    if (value === 'gare') {
        subTitle = 'Départ de la gare';
        divInModalBody += commercialChoice + aeroportChoice + habitationChoice + entrepriseChoice;
    } else if (value === 'entreprise') {
        subTitle = 'Départ de l\'entreprise';
        divInModalBody += commercialChoice + aeroportChoice + habitationChoice + gareChoice;
    } else if (value === 'habitation') {
        subTitle = 'Départ des habitations';
        divInModalBody += commercialChoice + aeroportChoice + gareChoice + entrepriseChoice;
    } else if (value === 'aeroport') {
        subTitle = 'Départ de l\"aéroport ';
        divInModalBody += commercialChoice + gareChoice + habitationChoice + entrepriseChoice;
    } else if (value === 'commercial') {
        subTitle = 'Départ du centre commercial ';
        divInModalBody += aeroportChoice + gareChoice + habitationChoice + entrepriseChoice;
    }

    var html = "<div id ='divInModalBody'><h4>" + subTitle + "</h4>" +
        "<div class='divStyleForModalBody'><p>Choisir votre destination</p>" +
        "<div id='divForDestination' >" + divInModalBody + "</div></div><div id='divForStopsTimePassengers'></div>" + 
        "</div>";
    return html;
}

function timeForJourney() {
    let htmlForTime = "<div id='divForTimeJourney' class='hideDivArret divStyleForModalBody'>" +
        "<p>Temps de trajet : <span>" + durationJourneyMinutes + "</span></p>" +
        "</div>";
    return htmlForTime;
}

function choicePassenger() {
    var divChoicePassenger = "<div id='divForChoicePassenger' class='hideDivArret divStyleForModalBody'>" +
        "<p>Voyager avec d'autres individus <span class='tooltip'>" +
        "<i id='inforForChoicePassenger'  class='fa-solid fa-circle-info'></i>" +
        "<span class='tooltiptext'>Voyager avec d'autres salariés qui font une demande similaire à la votre. " +
        "Cela permet de fludifier le traffic et d'utiliser moins d'énergie<i style='color:green' class='fa-solid fa-leaf'></i></span></span>:</p>" +
        "<label class='switch'><input type='checkbox' value='off'><span class='slider round' onclick='changeValueSwitch()'></span></label>" +
        "</div>";

    return divChoicePassenger;
}

function changeValueSwitch() {
    let el = document.querySelector("#divForChoicePassenger input");
    if (el.value === 'on') {
        document.querySelector("#divForChoicePassenger input").value = 'off';
    } else document.querySelector("#divForChoicePassenger input").value = 'on';
}

function addStop(departure) {
    let finalStop = document.querySelector("#divForDestination input[name='terminalChoice']:checked").attributes.value.value;

    let commercialStop = "<div id='divCommercialModalBodyForStop'>" +
        "<input onclick='selectChoiceStop()' type='checkbox' id='commercialStop' name='terminalArret' value='commercial'>" +
        "<label for='commercialStop'> Centre commercial</label>" +
        "</div>";
    let entrepriseStop = "<div id='divEntrepriseModalBodyForStop'>" +
        "<input onclick='selectChoiceStop()' type='checkbox' id='entrepriseStop' name='terminalArret' value='entreprise'>" +
        "<label for='entrepriseStop'> Entreprise</label>" +
        "</div>";
    let habitationStop = "<div id='divHabitationModalBodyForStop'>" +
        "<input onclick='selectChoiceStop()' type='checkbox' id='habitationStop' name='terminalArret' value='habitation'>" +
        "<label for='habitationStop'> Habitation</label>" +
        "</div>";
    let gareStop = "<div id='divGareModalBodyForStop'>" +
        "<input onclick='selectChoiceStop()' type='checkbox' id='gareStop' name='terminalArret' value='gare'>" +
        "<label for='gareStop'> Gare</label>" +
        "</div>";
    let aeroportStop = "<div id='divGareModalBodyForStop'>" +
        "<input onclick='selectChoiceStop()' type='checkbox' id='aeroportStop' name='terminalArret' value='aeroport'>" +
        "<label for='aeroportStop'> Aéroport</label>" +
        "</div>";

    let htmlDivForPrt = "<div id='divNoneModalBodyForStop'>" +
        "<input onclick='activStop()' type='radio' id='noneStop' name='noneStop' value='aucun' checked>" +
        "<label for='noneStop'> Aucun</label>" +
        "</div><div id='divForArretExceptNone'>";

    // to avoid display the stop equals the final stop
    if (departure === 'gare') {
        if (finalStop !== 'commercial') htmlDivForPrt += commercialStop;
        if (finalStop !== 'aeroport') htmlDivForPrt += aeroportStop;
        if (finalStop !== 'habitation') htmlDivForPrt += habitationStop;
        if (finalStop !== 'entreprise') htmlDivForPrt += entrepriseStop;
    } else if (departure === 'entreprise') {
        if (finalStop !== 'commercial') htmlDivForPrt += commercialStop;
        if (finalStop !== 'aeroport') htmlDivForPrt += aeroportStop;
        if (finalStop !== 'habitation') htmlDivForPrt += habitationStop;
        if (finalStop !== 'gare') htmlDivForPrt += gareStop;
    } else if (departure === 'habitation') {
        if (finalStop !== 'aeroport') htmlDivForPrt += aeroportStop;
        if (finalStop !== 'commercial') htmlDivForPrt += commercialStop;
        if (finalStop !== 'gare') htmlDivForPrt += gareStop;
        if (finalStop !== 'entreprise') htmlDivForPrt += entrepriseStop;
    } else if (departure === 'aeroport') {
        if (finalStop !== 'commercial') htmlDivForPrt += commercialStop;
        if (finalStop !== 'gare') htmlDivForPrt += gareStop;
        if (finalStop !== 'habitation') htmlDivForPrt += habitationStop;
        if (finalStop !== 'entreprise') htmlDivForPrt += entrepriseStop;
    } else if (departure === 'commercial') {
        if (finalStop !== 'entreprise') htmlDivForPrt += entrepriseStop;
        if (finalStop !== 'aeroport') htmlDivForPrt += aeroportStop;
        if (finalStop !== 'habitation') htmlDivForPrt += habitationStop;
        if (finalStop !== 'gare') htmlDivForPrt += gareStop;
    }

    var divArret = "<div id='divForStop' class='hideDivArret divStyleForModalBody'>" +
        "<p>Prévoir des arrêts :</p>" +
        "<div id='divArretForPrt'>" + htmlDivForPrt + "</div></div>" +
        "</div>";

    return divArret;
}

function activStop() {
    document.getElementById("divForArretExceptNone").style.color = "gray";
    var inputs = document.querySelectorAll("#divForArretExceptNone input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
}
function selectChoiceStop() {
    document.getElementById("noneStop").checked = false;
    document.getElementById("divNoneModalBodyForStop").style.color = "gray";
    document.getElementById("divForArretExceptNone").style.color = "black";
    getDurationTime();
}
function generateDivPassengersDivStopTimeJourney() {
    let departure = document.getElementById("choiceTerminalForDeparture").attributes.value.value;
    //generate divPassengers divStop, and timejourney 
    startJourney = departure;
    let divStop = addStop(departure);
    let divPassengers = choicePassenger();
    let timeJourney = timeForJourney();
    document.getElementById('divForStopsTimePassengers').innerHTML = "<br/>" +
        divStop + "<br/>" + divPassengers + "<br/>" + timeJourney;
}

function activButton() {
    generateDivPassengersDivStopTimeJourney();

    destination = document.querySelector('input[name="terminalChoice"]:checked').value;
    let button = document.querySelector("#myModalTerminal .modal-footer .buttonConfirme");
    button.disabled = false;

    document.getElementById("buttonValide").style.display = "block";
    document.getElementById("generateFileButtonForBookingPrt").style.display = "block";


    let divArret = document.getElementById("divForStop");
    if (divArret.classList.contains("hideDivArret")) {
        divArret.classList.remove("hideDivArret");
        document.getElementById("divForChoicePassenger").classList.remove("hideDivArret");
        document.getElementById("divForTimeJourney").classList.remove("hideDivArret");
        document.getElementById("divForChoicePassenger").style.display = "flex";
    }

    //calcul durationTime
    destination = getInitial(destination);
    getDurationTime();

    //fulfill data
    let idPerson = document.getElementById("idPerson").attributes.value.value;
    getDataPeople(idPerson);

    //numberReservation 
    getNumberReservationPrt();
}

function getNumberReservationPrt() {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/bookingPrt/getNumberReservationPrt';
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        let data = JSON.parse(this.responseText);
        numberReservation = data;
    }
    request.send();
}

function cacheDiv(value) {
    var caret;
    var div
    switch (value) {
        case 'gare':
            caret = document.querySelector("#dataGare span i");
            div = document.querySelector("#dataGare .divDataTerminaux");
            if (caret.classList.contains("fa-caret-down")) changeCaretUp(caret, div);
            else changeCaretDown(caret, div);
            break;
        case 'habitation':
            caret = document.querySelector("#dataHabitation span i");
            div = document.querySelector("#dataHabitation .divDataTerminaux");
            if (caret.classList.contains("fa-caret-down")) changeCaretUp(caret, div);
            else changeCaretDown(caret, div);
            break;
        case 'entreprise':
            caret = document.querySelector("#dataEntreprise span i");
            div = document.querySelector("#dataEntreprise .divDataTerminaux");
            if (caret.classList.contains("fa-caret-down")) changeCaretUp(caret, div);
            else changeCaretDown(caret, div);
            break;
        case 'commercial':
            caret = document.querySelector("#dataCommercial span i");
            div = document.querySelector("#dataCommercial .divDataTerminaux");
            if (caret.classList.contains("fa-caret-down")) changeCaretUp(caret, div);
            else changeCaretDown(caret, div);
            break;
        case 'aeroport':
            caret = document.querySelector("#dataAeroport span i");
            div = document.querySelector("#dataAeroport .divDataTerminaux");
            if (caret.classList.contains("fa-caret-down")) changeCaretUp(caret, div);
            else changeCaretDown(caret, div);
            break;
    }
}

function changeCaretDown(caret, div) {
    caret.classList.add("fa-caret-down");
    caret.classList.remove("fa-caret-up");
    div.style.display = "none";
}

function changeCaretUp(caret, div) {
    caret.classList.remove("fa-caret-down");
    caret.classList.add("fa-caret-up");
    div.style.display = "flex";
}

function calculArrivingTime() {
    let arrivingTime = new Date();
    arrivingTime.setMinutes(arrivingTime.getMinutes() + durationJourneyMinutes);
    return formatTime(arrivingTime);
}

function bookPrt() {
    closeModal('myModalTerminal');
    let currentDate = new Date();
    let date = formatDateForDb(currentDate);
    let start = formatTime(currentDate);
    let end = calculArrivingTime();
    //id of people who book
    let idPerson = document.getElementById("idPerson").attributes.value.value;
    // choice for the departure
    let spanForNameOfTerminal = document.getElementById("choiceTerminalForDeparture").attributes.value.value;
    let idPrt = null;

    // check if one free else one in waiting
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/prt/selectOnePrt?location=' + spanForNameOfTerminal;
    request.open('GET', url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        idPrt = JSON.parse(this.responseText);
        if (idPrt !== null) {
            let bookingPrt = new Object();
            bookingPrt.date = date;
            bookingPrt.start = start;
            bookingPrt.end = end;
            bookingPrt.idPerson = idPerson;
            bookingPrt.idPrt = idPrt;

            allStopWithSubStop = getInitial(spanForNameOfTerminal) + "," + allStopWithSubStop;
            bookingPrt.stops = allStopWithSubStop.slice(0, allStopWithSubStop.length - 1);
            executeBookPrt(bookingPrt);
        }
    }
    request.send();
}

function executeBookPrt(bookingPrt) {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/bookingPrt/insertBookingPrt';
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    var data = {
        date: bookingPrt.date,
        start: bookingPrt.start,
        end: bookingPrt.end,
        idPerson: bookingPrt.idPerson,
        idPrt: bookingPrt.idPrt,
        stops: bookingPrt.stops
    };
    request.send(JSON.stringify(data));
}

function getInitial(value) {
    //convert destination with one letter for Djikstra
    switch (value) {
        case "entreprise":
            value = "E";
            break;
        case "habitation":
            value = "Ha";
            break;
        case "aeroport":
            value = "Ae";
            break;
        case "gare":
            value = "G";
            break;
        case "commercial":
            value = "C";
            break;
    }
    return value;
}

function getStops() {
    listStop = [];
    listStop.push(getInitial(startJourney));

    let listElementChecked = document.querySelectorAll("#divArretForPrt input[name='terminalArret']:checked");
    for (let i = 0; i < listElementChecked.length; i++) {
        add30SecondForStop();
        listStop.push(getInitial(listElementChecked[i].attributes.value.value));
    }
    listStop.push(destination);
    return listStop;
}

function getDurationTime() {
    allStopWithSubStop = ""; // set to 0;
    durationJourneyMinutes = 0;
    durationJourneySeconds = 0;
    let listStop = getStops();

    let j = 1;
    // si on a E C G HA, on calcul plus court chemin entre g ha, c g, e c 
    while ((listStop[listStop.length - j] !== startJourney) && (listStop.length - j > 0)) {
        algoDijkstraForSubJourney(listStop[listStop.length - j - 1], listStop[listStop.length - j]);
        j++;
    }
    //change display time
    document.querySelector("#divForTimeJourney p span").innerHTML = "";
    if (durationJourneySeconds !== 0) {
        document.querySelector("#divForTimeJourney p span").innerHTML = durationJourneyMinutes + "min " + durationJourneySeconds + "sec";
    } else document.querySelector("#divForTimeJourney p span").innerHTML = durationJourneyMinutes + "min ";


}
// si on a E C G HA, on calcul plus court chemin entre g ha, apres on rappelle la fonction 
function algoDijkstraForSubJourney(startJourneyForSubJourney, destinationForSubJourney) {
    while (destinationForSubJourney !== startJourneyForSubJourney) {
        getAllStopIncludeSubStop(destinationForSubJourney);//get al stop including hide stop : ha -> g, we have c
        switch (startJourneyForSubJourney) {
            case "E":
                destinationForSubJourney = calculTimeWithTimeDijkstra(startWithEntreprise, destinationForSubJourney);
                break;
            case "Ha":
                destinationForSubJourney = calculTimeWithTimeDijkstra(startWithHabitation, destinationForSubJourney);
                break;
            case "Ae":
                destinationForSubJourney = calculTimeWithTimeDijkstra(startWithAeroport, destinationForSubJourney);
                break;
            case "G":
                destinationForSubJourney = calculTimeWithTimeDijkstra(startWithGare, destinationForSubJourney);
                break;
            case "C":
                destinationForSubJourney = calculTimeWithTimeDijkstra(startWithCommercial, destinationForSubJourney);
                break;
        }
    }
}
var allStopWithSubStop = "";
function getAllStopIncludeSubStop(stop) {
    allStopWithSubStop = stop + "," + allStopWithSubStop;
}

function add30SecondForStop() {
    durationJourneySeconds = durationJourneySeconds + 30;
    if (durationJourneySeconds === 60) {
        durationJourneySeconds = 0;
        durationJourneyMinutes++;
    }
}
// calcul time between two points
function calculTimeWithTimeDijkstra(timeDijkstra, destinationForASingleJourney) {
    durationJourneyMinutes += parseInt((timeDijkstra[destinationForASingleJourney]).split("/")[0]);
    destinationForASingleJourney = (timeDijkstra[destinationForASingleJourney]).split("/")[1];

    return destinationForASingleJourney;
}
function formatSelectedStops() {
    let selectedStopArray = []
    let selectedStops = document.querySelectorAll('input[name="terminalArret"]:checked');
    for (let k = 0; k < selectedStops.length; k++) {
        selectedStopArray[k] = formatText(selectedStops[k].attributes.value.value);
    }
    return selectedStopArray;
}

function fullfillListArret(listArret, selectedStops) {
    let subStop = false;
    let valueArret = allStopWithSubStop.split(",");
    // - 1 because the string termines with , 
    for (let i = 0; i < valueArret.length - 1; i++) {
        let value = formatTextWithInitialToMajuscule(valueArret[i])
        if (i === valueArret.length - 2) {
            listArret[i + 1] = value + "  -  Arrivée";
        } else {
            // subStop is a selected stop
            subStop = selectedStops.includes(value);
            if (subStop) {
                listArret[i + 1] = value + "  -  Arrêt demandé";
            } else listArret[i + 1] = value;
        }
        subStop = false;
    }
    return listArret;
}
function tripWithPeople() {
    let tripWithPeople = document.querySelector("#divForChoicePassenger input").value;
    if (tripWithPeople === "on") return "Oui";
    else return "Non";
}

function getDataPeople(idPerson) {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/employee/getDataPeople?idPerson=' + idPerson;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        let data = JSON.parse(this.responseText);
        if (data.length > 0) {
            dataPeople["email"] = data[0].email;
            dataPeople["firstName"] = data[0].first_name;
            dataPeople["lastName"] = data[0].last_name;
            dataPeople["idPeople"] = data[0].id;
            dataPeople["idCompany"] = data[0].id_company;
        }
    }
    request.send();
}


function definitionPdfForPrt() {
    let departure = document.getElementById('choiceTerminalForDeparture').attributes.value.value;
    let finalStop = document.querySelector('input[name="terminalChoice"]:checked').value;
    departure = formatText(departure);
    finalStop = formatText(finalStop);

    let selectedStops = formatSelectedStops();
    let nbrStop = selectedStops.length + 1;

    let withPeople = tripWithPeople();

    var listArret = [];
    listArret[0] = departure + "  -  Départ";
    listArret = fullfillListArret(listArret, selectedStops);


    let lastName = dataPeople["lastName"];
    let firstName = dataPeople["firstName"];

    let numberReservationForPdf = formatNumberReservation(numberReservation + "");

    var docDefinition = {
        content: [
            {
                columns: [
                    {
                        text: "Récapitulatif de la course",
                        style: "header",
                        margin: [0, 2, 0, 0],
                    },
                    {
                        qr: 'Récapitulatif de la commande de ' + lastName + "/" + firstName,
                        margin: [0, 0, 0, 0],
                        alignment: 'right'
                    }
                ]
            },
            {
                text: 'Information passager : ',
                style: 'subHeader',
                margin: [0, 50, 0, 0],
                decoration: 'underline'
            },
            {
                text: [
                    'Nom/Prénom \n' + lastName + "/" + firstName + '\n\n',
                    'Numéro de transaction : \n' + numberReservationForPdf,
                ],
                style: 'textInformationClient',
                margin: [10, 5, 0, 0]
            },
            {
                text: 'Liste des arrêts : ',
                style: 'subHeader',
                decoration: 'underline',
                margin: [0, 20, 0, 0],
            },
            {
                margin: [10, 5, 0, 0],
                columns: [
                    {
                        ul: listArret,
                    }, {
                        text: [
                            'Durée totale du voyage : ' + durationJourneyMinutes + 'min ' + durationJourneySeconds + 'sec\n',
                            'Nombre d\'arrêts sélectionés : ' + nbrStop + '\n',
                            'Voyager avec d\'autres individus : ' + withPeople
                        ]
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,

            },
            subHeader: {
                fontSize: 15,
                bold: false
            },
            textInformationClient: {
                bold: true
            }
        }
    }
    return docDefinition;
}

function openPdf() {
    let docDefinition = definitionPdfForPrt();
    //open pdf in a other window
    pdfMake.createPdf(docDefinition).open();
}

function formatTextWithInitialToMajuscule(value) {
    switch (value) {
        case "E":
            value = "Entreprise";
            break;
        case "Ha":
            value = "Habitation";
            break;
        case "Ae":
            value = "Aéroport";
            break;
        case "G":
            value = "Gare";
            break;
        case "C":
            value = "Commercial";
            break;
    }
    return value;
}

function formatText(value) {
    switch (value) {
        case "entreprise":
            value = "Entreprise";
            break;
        case "habitation":
            value = "Habitation";
            break;
        case "aeroport":
            value = "Aéroport";
            break;
        case "gare":
            value = "Gare";
            break;
        case "commercial":
            value = "Commercial";
            break;
    }
    return value;
}

// Ajax For recap Table
function ajaxRequest(params) {
    var id = document.getElementById("idPerson").attributes.value.value;
    var url = "http://172.31.250.13:9000/bookingPrt/getBookingPrtOfOneUser"
    $.get(url + '?idPerson=' + id).then(function (res) {
        res = manipResForTable(res);
        console.log(res)
        params.success(res)

    })
}
function displayOldPdf(numberReservation) {
    var request = new XMLHttpRequest();
    const url = 'http://' + connexionBack + ':9000/bookingPrt/getDataFromBookingPrt?numberReservation=' + numberReservation;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        let data = JSON.parse(this.responseText);
        console.log(data);

        let lastName = data[0].lastname;
        let firstName = data[0].firstname;
        let numberReservationForPdf = formatNumberReservation(numberReservation + "");

        var docDefinition = {
            content: [
                {
                    columns: [
                        {
                            text: "Récapitulatif de la course",
                            style: "header",
                            margin: [0, 2, 0, 0],
                        },
                        {
                            qr: 'Récapitulatif de la commande de ' + lastName + "/" + firstName,
                            margin: [0, 0, 0, 0],
                            alignment: 'right'
                        }
                    ]
                },
                {
                    text: 'Information passager : ',
                    style: 'subHeader',
                    margin: [0, 50, 0, 0],
                    decoration: 'underline'
                },
                {
                    text: [
                        'Nom/Prénom \n' + lastName + "/" + firstName + '\n\n',
                        'Numéro de transaction : \n' + numberReservationForPdf,
                    ],
                    style: 'textInformationClient',
                    margin: [10, 5, 0, 0]
                },
                {
                    text: 'Liste des arrêts : ',
                    style: 'subHeader',
                    decoration: 'underline',
                    margin: [0, 20, 0, 0],
                }
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,

                },
                subHeader: {
                    fontSize: 15,
                    bold: false
                },
                textInformationClient: {
                    bold: true
                }
            }
        }
        pdfMake.createPdf(docDefinition).open();
    }
    request.send();
}

function manipResForTable(result) {
    let valueForPdf = "";
    for (let i = 0; i < result.length; i++) {
        if (result[i].pdf !== "/" && result[i].pdf !== "") {
            valueForPdf = '<span>' +
                '<i class="fa-solid fa-magnifying-glass" onclick="displayOldPdf(' + result[i].numero + ')" style="cursor:pointer"></i> </span>';
            result[i].pdf = valueForPdf;
        } 
        if (result[i].pdf === "/") result[i].pdf = "";
        result[i].date = formatDateWithDate(result[i].date);
        result[i].numero = formatNumberReservation(result[i].numero);
    }
    return result;
}

function formatNumberReservation(value) {
    let size = value.length;
    switch (size) {
        case 1:
            value = "000000000" + value;
            break;
        case 2:
            value = "00000000" + value;
            break;
        case 3:
            value = "0000000" + value;
            break;
        case 4:
            value = "000000" + value;
            break;
        case 5:
            value = "00000" + value;
            break;
        case 6:
            value = "0000" + value;
            break;
        case 7:
            value = "000" + value;
            break;
        case 8:
            value = "00" + value;
            break;
        case 9:
            value = "0" + value;
            break;
    }
    return value;
}

function formatDateWithDate(value) {
    let day = value.split("-")[2];
    let month = value.split("-")[1];
    let year = value.split("-")[0];
    return day + "/" + month + "/" + year;
}




