var uno = 0;
var dos = 0;

function clickCounter() {
    if (typeof(Storage) !== "undefined") {
        if (uno) {
            uno = Number(uno) + 1;
        } else {
            uno = 1;
        }
        document.getElementById("result").innerHTML = uno;
    } else {
        document.getElementById("result").innerHTML = "Su navegador no soporta localstorage";
    }
}


function clickCounter1() {
    if (typeof(Storage) !== "undefined") {
        if (dos) {
            dos = Number(dos) + 1;
        } else {
            dos = 1;
        }
        document.getElementById("result1").innerHTML = dos;
    } else {
        document.getElementById("result1").innerHTML = "Su navegador no soporta localstorage";
    }
}


/************************************ */