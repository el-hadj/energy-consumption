function getEquipement(idRoom) {
    var body = document.querySelector("#pieces" + idRoom);
    fetch('http://localhost:9000/consommation?idRoom=' + idRoom)
        .then(response => response.json())
        .then(data => {
            var table = document.createElement("table");
            table.classList.add("table");
            table.classList.add("table-borderless");
            table.style.marginLeft = "3em";
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);
            data.forEach(list => {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                var td = document.createElement("td");
                tr.appendChild(td);
                var button = document.createElement("button");
                button.className = "valeur btn text-capitalize";
                button.style.width = "150px";
                button.style.backgroundColor = "#796aee";
                button.style.color = "white";
                button.id = "2";
                var text = document.createTextNode(${list.nom_equipment});
                button.appendChild(text)
                button.addEventListener();
                bu
            });


        });
}

