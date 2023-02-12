var connexionBack = "";
import("./variable.js").then(variable => {
    connexionBack = variable.connexionBack2;
});

document.addEventListener('DOMContentLoaded', function () {
    var id = document.getElementById("idUser").value;
    //request ajax for fulcalendar
    var request = new XMLHttpRequest();
    // put localhost because method so fast too load connexionBack
    const url = 'http://172.31.250.13:9000/attend/selectEvent?idUser=' + id;
    console.log("url " + url);
    request.open('GET', url);
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                let evenements = JSON.parse(request.responseText);
                console.log(evenements);
                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'timeGridWeek',
                    locale: 'fr',
                    headerToolbar: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    views: {
                        dayGridMonth: {
                            titleFormat: {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }
                        },
                        timeGridWeek: {
                            titleFormat: {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }
                        },
                        timeGridDay: {
                            titleFormat: {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }
                        }
                    },
                    buttonText: {
                        today: 'Aujourd\'hui',
                        month: 'Mois',
                        week: 'Semaine',
                        list: 'Liste'
                    },
                    events: evenements,
                    eventColor: "#796aee",
                    nowIndicator: true,
                    //delete all-days
                    allDaySlot: false
                });
                calendar.render();
            }
        }
    }
    request.send();
});