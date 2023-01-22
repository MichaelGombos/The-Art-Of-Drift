import {
    generateMap,
    incrementSeconds,
    step,
    resetCarValues,
} from "./game.js"

import{
    clearParticles
} from "./graphics.js"

const uploadButton = document.querySelector("#upload");
const mapInput = document.querySelector("#map-input")


let running = false;

setInterval(incrementSeconds, 50)

const handleUpload = (e) => {
    generateMap(JSON.parse("[" + mapInput.value + "]")[0])
}

const resetGame = () => {
    pauseGame();
    setTimeout(startGame,20)
}

const startGame = () => {
    resetCarValues();
    clearParticles();
    unPauseGame();
}

const unPauseGame = () => {
    running = true;
    step();
}

const pauseGame = () => {
    running = false;
}

const getRunning = () => {
    return running}


uploadButton.addEventListener("click", handleUpload);
const replayOutput = document.querySelector("#replay-output")

  

export {
    replayOutput,
    getRunning,
    resetGame,
    startGame,
    pauseGame,
    unPauseGame
}