var height = document.getElementById("height").innerHTML;
document.getElementById("store").style.height = height+'px';

function addHeight() {
    var element = document.getElementById("store");
    var elementStyle = element.offsetHeight;
    var newHeight = elementStyle;
    if (newHeight < 185) {
        newHeight = newHeight + 5;
        element.style.setProperty('height', newHeight + 'px');
        document.getElementById("newheight").value = newHeight;
    }
    else
        alert("Le store est fermé au maximum");
}

function removeHeight() {
    var element = document.getElementById("store");
    var elementStyle = element.offsetHeight;
    var newHeight = elementStyle;
    if (newHeight > 25) {
        newHeight = newHeight - 5;
        element.style.setProperty('height', newHeight + 'px');
        document.getElementById("newheight").value = newHeight;
    }
    else
        alert("Le store est ouvert au maximum");
}