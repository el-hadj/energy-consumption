function generateButtonEquipment(equipment) {
    if (equipment.equipment === "Chauffage") {
        return "<button class='btn mr-2 mb-2' style = 'background-color:#796aee' onclick='location.href=\"/heating/"+ equipment.id +"\"'>"+ equipment.equipment+"</button>"
    } else if (equipment.equipment === "lampe") {
        return "<button class='btn mr-2 mb-2' style = 'background-color:#796aee' onclick='location.href=\"/lights/"+ equipment.id +"\"'>"+ equipment.equipment +"</button>"
    } else if (equipment.equipment === "porte 1") {
        return "<button class='btn mr-2 mb-2' style = 'background-color:#796aee' onclick='location.href=\"/doors/"+ equipment.id +"\"'>"+ equipment.equipment+"</button>"
    } else if (equipment.equipment === "porte 2") {
        return "<button class='btn mr-2 mb-2' style = 'background-color:#796aee' onclick='location.href=\"/doors/"+ equipment.id +"\"'>"+ equipment.equipment+"</button>"

    }
}

function onExpandEquipment(id) {
    let collapseBody = $("#collapseTwoBody" + id);

    // On ouvre row et col.
    let html = "<div class='row'><div class='col-lg-12'>";
//172.31.250.12
    let retour = $.get("http://172.31.250.12:9001/bepos/equipementBepos/" + id);

    retour.done((equipmentList) => {
        equipmentList.forEach((equipment) => {
            html += generateButtonEquipment(equipment);
        });
        html += "</div></div>"; // Ici on ferme le row et le col.
        collapseBody.html(html);
    });

    retour.fail(()=> {
        html += "N/A</div></div>"; // Ici on ferme le row et le col.
        collapseBody.html(html);
    })
}
//172.31.250.13
function onExpandTemperature(id) {
    let collapseBody = $("#collapseFourBody" + id);

    let retour = $.get("http://172.31.250.13:9000/captor/getAll/" + id);

    let html = "<div><ul>";
    retour.done((values) => {
        // for each sur les values
        values.forEach((captor) => {
            // test du capteur
            if (captor.nameCaptor === "temperature piece") {
                html += "<li>Température de la pièce : " + captor.dataCaptor + "</li>";
            } else if (captor.nameCaptor === "luminosite piece") {
                html += "<li>Luminosité de la pièce : " + captor.dataCaptor + "</li>";
            }
        });

        html += "</ul></div>";
        collapseBody.html(html);
    });

    retour.fail(()=> {
        collapseBody.html("");
    })
}

