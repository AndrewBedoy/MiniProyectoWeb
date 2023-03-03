// Referencias iniciales
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
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
    startButton.classList.remove("hide");
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
        animal = new Audio("sonidos/" + draggedElementData + ".wav");
        animal.play();
    }
    else {
        incorrecto.play();
    }
    // Ganar
    if (count >= 6) {
        setTimeout( function () {
            victoria.play();
            result.innerText = `¡Ganaste! Nombre del localstorage y puntuacion ¿Botón de ver clasificación o ir al menú o jugar otra vez?`;
            stopGame();
        }, 2000);
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
    })
);
