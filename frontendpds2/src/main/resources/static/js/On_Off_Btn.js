function setStateScreen() {
    let state = document.getElementById("state").innerHTML;
    if (state == "true") {
        document.getElementById("newStateScreen").setAttribute('value',false);
    }
    if(state == "false"){
        document.getElementById("newStateScreen").setAttribute('value',true);
    }
}

function setStatePlug() {
    let state = document.getElementById("statePlug").innerHTML;
    if (state == "true") {
        document.getElementById("newStatePlug").setAttribute('value',false);
    }
    if(state == "false"){
        document.getElementById("newStatePlug").setAttribute('value',true);
    }
}

function setStateHeating() {
    let state = document.getElementById("stateHeating").innerHTML;
    if (state == "true") {
        document.getElementById("newStateHeating").setAttribute('value',false);
    }
    if(state == "false"){
        document.getElementById("newStateHeating").setAttribute('value',true);
    }
}

function setStateBlind() {
    let state = document.getElementById("stateBlind").innerHTML;
    if (state == "true") {
        document.getElementById("newStateBlind").setAttribute('value',false);
    }
    if(state == "false"){
        document.getElementById("newStateBlind").setAttribute('value',true);
    }
}

function setStateLight() {
    let state = document.getElementById("stateLight").innerHTML;
    console.log(state);
    if (state == "true") {
        document.getElementById("newStateLight").setAttribute('value',false);
    }
    if(state == "false"){
        document.getElementById("newStateLight").setAttribute('value',true);
    }
}