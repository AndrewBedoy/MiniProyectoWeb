var can = document.getElementById("cancion");

function controlarMusica() {
    if(can.paused) {
        reproducirMusica();
    }
    else if(can.volume > 0.25) {
        bajarMusica(can.volume - .25);
    }
    else {
        detenerMusica();
    }
}

function reproducirMusica() {
    can.play();
    can.volume = 1;
    document.getElementById("iconoMusica").className = "fa-solid fa-volume-high";
}

function bajarMusica(volumen) {
    can.volume = volumen;
    document.getElementById("iconoMusica").className = "fa-solid fa-volume-low";
}

function detenerMusica() {
    document.getElementById("iconoMusica").className = "fa-solid fa-volume-off";
    can.pause();
}