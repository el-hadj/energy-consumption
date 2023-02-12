    const url = "http://172.31.250.13:9000/production"


    const energies = {
        '0' : 'eolien',
        '1' : 'solaire',
        '2' : 'hydraulique'
    }

    console.log("test");
    document.addEventListener("DOMContentLoaded", function () {
        const firstList = document.getElementById("firstEnergy")
        const secondList = document.getElementById("secondEnergy")
        const thirdList = document.getElementById("thirdEnergy")

        function updateOptions(list) {
            list.options.length = 0;
            opt = document.createElement("option");
            opt.value = 3;
            opt.disabled = true;
            opt.selected = true;
            opt.innerHTML = "Choix de l'énergie";
            list.appendChild(opt);
        }

        firstList.addEventListener("change", function () {
            updateOptions(secondList);
            updateOptions(thirdList);

            for(x=0;x<this.options.length;x++){
                if(this.options[x].value != this.value && this.options[x].value != 3) {
                    opt = document.createElement("option");
                    opt.value = this.options[x].value;
                    opt.innerHTML = this.options[x].innerHTML;
                    secondList.appendChild(opt);
                }
            }
        });

        secondList.addEventListener("change", function () {
            updateOptions(thirdList);

            for(x=0;x<this.options.length;x++){
                if(this.options[x].value != this.value && this.options[x].value != 3) {
                    opt = document.createElement("option");
                    opt.value = this.options[x].value;
                    opt.innerHTML = this.options[x].innerHTML;
                    thirdList.appendChild(opt);
                }
            }
        });


    });

    const firstList = document.getElementById("firstEnergy")
    const secondList = document.getElementById("secondEnergy")
    const thirdList = document.getElementById("thirdEnergy")
    function send() {
        var positions = {
            'eolien' : 1,
            'solaire' : 2,
            'hydraulique' : 3
        };
        positions[energies[firstList.value]] = 1;
        positions[energies[secondList.value]] = 2;
        positions[energies[thirdList.value]] = 3;


        const rec = {method : 'GET', headers: {}}

        fetch(url + "/basic?eolien=" + positions['eolien'] +
            "&solaire=" + positions['solaire'] + "&hydraulique=" + positions['hydraulique'], rec)

        console.log(positions);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'algorithme activé',
            showConfirmButton: false,
            timer: 1500
        })

    }


