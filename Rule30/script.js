const canvas = document.getElementById("automaton");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const initialConfigInput = document.getElementById("initialConfig");

const cellSize = 10;
const canvasWidth = 800; // Width of the canvas
const canvasHeight = 400; // Height of the canvas
const width = Math.floor(canvasWidth / cellSize);
const height = Math.floor(canvasHeight / cellSize);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let generation = 0;
let intervalId;
let cells = new Array(width).fill(0);

// Initialize cells based on user-specified configuration and show a live preview
initialConfigInput.addEventListener("input", () => {
    const input = initialConfigInput.value;
    if (input.length <= width) {
        cells = input.split("").map(Number);
        generation = 0;
        clearCanvas();
        drawGeneration();
    }
});

function drawGeneration() {
    for (let i = 0; i < width; i++) {
        if (cells[i] === 1) {
            ctx.fillRect(i * cellSize, generation * cellSize, cellSize, cellSize);
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function calculateNextGeneration() {
    const newCells = [];
    for (let i = 0; i < width; i++) {
        newCells[i] = rule30(cells[i - 1], cells[i], cells[i + 1]);
    }
    cells = newCells;
    generation++;
}

function rule30(left, center, right) {
    return left ^ (center || right);
}

function startSimulation() {
    intervalId = setInterval(() => {
        calculateNextGeneration();
        drawGeneration();
    }, 100);
    startButton.disabled = true;
    stopButton.disabled = false;
    initialConfigInput.disabled = true;
}

function stopSimulation() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
    initialConfigInput.disabled = false;
}

startButton.addEventListener("click", startSimulation);
stopButton.addEventListener("click", stopSimulation);

clearCanvas();
