// Referencias iniciales
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const ganar = document.getElementById("ganar");
const nombre = document.getElementById("nombre");
const puntuacion = document.getElementById("puntuacion");
const tiempo = document.getElementById("cronometro");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
    "Caballo",
    "Vaca",
    "Oveja",
    "Gallo",
    "Gallina",
    "Pollito",
    "Cerdo",
    "Burro",
    "Toro",
    "Pato",
];
let count = 0;
let puntajeRonda = 0;

var puntaje = localStorage.getItem("puntaje");
puntaje = JSON.parse(puntaje); //Cadena JSON a JS
if (puntaje == null) puntaje = [];

//Reproduccion de sonido
let incorrecto = new Audio("sonidos/Incorrecto.wav");
let victoria = new Audio("sonidos/Victoria.wav");

//Reproduccion de sonido

// Valor aleatorio para array
const randomValueGenerator = () => {
    return data[Math.floor(Math.random() * data.length)];
};

//console.log(randomValueGenerator());

// Pantalla de Ganador
const stopGame = () => {
    controls.classList.remove("hide");
    setTimeout(function () {
        startButton.innerHTML = "Volver a jugar como " + document.getElementById("jugador").value;
        document.getElementById("clasificacion").classList.remove("hide");
        startButton.classList.remove("hide");
    }, 1500);
};

// Funciones Drag & Drop
function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

// Eventos dragOver
function dragOver(e) {
    e.preventDefault();
}

// Evento Drop
const drop = (e) => {
    e.preventDefault();
    // Data de acceso
    const draggedElementData = e.dataTransfer.getData("text");
    // Obtener atributo personalizado
    const droppableElementData = e.target.getAttribute("data-id");
    if (draggedElementData === droppableElementData) {
        puntajeRonda += 100;
        const draggedElement = document.getElementById(draggedElementData);
        // dropped class
        e.target.classList.add("dropped");
        // hide current div
        draggedElement.classList.add("hide");
        // draggable set to false
        draggedElement.setAttribute("draggable", "false");
        e.target.innerHTML = ``;
        // insertar nuevo div
        e.target.insertAdjacentHTML(
            "afterbegin",
            `<div>${draggedElementData.toUpperCase()}</div>`
        );
        count += 1;
        nombreAnimal = new Audio("sonidos/nombresAnimales/" + draggedElementData + "_voz.mp3");
        nombreAnimal.play();
        setTimeout(function () {
            animal = new Audio("sonidos/" + draggedElementData + ".wav");
            animal.play();
        }, 1000);
    } else {
        puntajeRonda -= 10;
        incorrecto.play();
    }
    // Ganar
    if (count >= 6) {
        detenercronometro();
        setTimeout(function () {
            victoria.play();
            ganar.innerText = `¡Ganaste!`;
            stopGame();
        }, 2000);
        setTimeout(function () {
            nombre.innerText = document.getElementById("jugador").value;
        }, 2400);
        setTimeout(function () {
            puntuacion.innerText = `Tiempo: ${total()} Puntuación: ${puntajeRonda}`;
        }, 2500);
        guardarEnLocal();
    }
};

// Crea Animalitos y nombres
const creator = () => {
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    let randomData = [];
    // Para strings aleatorios en el vector
    for (let i = 1; i <= 6; i++) {
        let randomValue = randomValueGenerator();
        if (!randomData.includes(randomValue)) {
            randomData.push(randomValue);
        } else {
            // Si el valor a existe decrementa i en uno
            i -= 1;
        }
    }
    for (let i of randomData) {
        const nomDiv = document.createElement("div");
        nomDiv.classList.add("draggable-name");
        nomDiv.setAttribute("id", i);
        nomDiv.setAttribute("draggable", true);
        nomDiv.innerHTML = `<div id="${i}">${i}</div>`;
        dragContainer.appendChild(nomDiv);
    }
    // Ordenar array aleatoriamente antes de crear espacios para soltar
    randomData = randomData.sort(() => 0.5 - Math.random());
    for (let i of randomData) {
        const imgAnimal = document.createElement("div");
        const nomAnimal = document.createElement("div");
        const divAnimal = document.createElement("div");
        imgAnimal.innerHTML = `<img class='img-animal' src="img/${i}.png">`;
        nomAnimal.innerHTML = `<div class='nom-animal' data-id='${i}'></div>`;
        divAnimal.appendChild(imgAnimal);
        divAnimal.appendChild(nomAnimal);
        dropContainer.appendChild(divAnimal);
    }
};

// Empezar juego
startButton.addEventListener(
    "click",
    (startGame = async () => {
        controls.classList.add("hide");
        document.getElementById("clasificacion").classList.add("hide");
        startButton.classList.add("hide");
        // Espera al creador
        await creator();
        count = 0;

        dropPoints = document.querySelectorAll(".nom-animal");
        draggableObjects = document.querySelectorAll(".draggable-name");

        // Eventos
        draggableObjects.forEach((element) => {
            element.addEventListener("dragstart", dragStart);
        });
        dropPoints.forEach((element) => {
            element.addEventListener("dragover", dragOver);
            element.addEventListener("drop", drop);
        });

        iniciarCronometro();
        //Reiniciar etiquetas
        ganar.innerHTML = "";
        nombre.innerHTML = "";
        puntuacion.innerHTML = "";
        puntajeRonda = 0;
    })
);

function mostrarJuego() {
    document.getElementById("registro").style.display = "none";
    document.getElementById("juego").style.display = "block";
}

function guardarEnLocal() {
    let jugador = document.getElementById("jugador").value;
    nombre.innerHTML = jugador;

    //El método stringify converte un valor a JSON. Recibe un objeto JS y devuelve un JSON
    var puntos = JSON.stringify({
        nombre: jugador,
        puntuacion: puntajeRonda,
    });

    console.log("Puntos: " + puntos);
    puntaje.push(puntos);
    localStorage.setItem("puntaje", JSON.stringify(puntaje));
}

function mostrarPuntuacion() {
    var indice = -1;
    var puntaje = localStorage.getItem("puntaje");
    puntaje = JSON.parse(puntaje); //Cadena JSON a JS

    if (puntaje == null) puntaje = [];

    var aLength = puntaje.length;

    document.getElementById("tablaPuntaje").innerHTML = "";

    var tabla =
        "<tr><th>Nombre</th><th>Puntuación</th><th></tr>";
    //Recuperar la información
    for (var i in puntaje) {
        //En libro se almacena la información de cada registro recuperado del JSON (puntaje)
        var puntajePersonal = JSON.parse(puntaje[i]);
        tabla += "<tr><td>" + puntajePersonal.nombre + "</td>";
        tabla += "<td>" + puntajePersonal.puntuacion + "</td>";
        tabla += "</tr>";
    }

    document.getElementById("tablaPuntaje").innerHTML = tabla;
}

/*
    puntaje
    puntaje.nombre
    puntaje.puntuacion
*/

function terminarJuego() {
    window.location.href = "index.html";
}
