import mapImport from "./map-data.js"

import {
    generateMap,
    incrementSeconds,
    step,
    resetCarValues
} from "./game.js"

const uploadButton = document.querySelector("#upload");
const mapInput = document.querySelector("#map-input")

let running = false;

generateMap(mapImport);

setInterval(incrementSeconds, 1000)

const handleUpload = (e) => {
    generateMap(JSON.parse("[" + mapInput.value + "]")[0])


}

const resetGame = () => {
    resetCarValues();
    running = true;
    step();
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

step(0); //Kick off the first step

uploadButton.addEventListener("click", handleUpload);
const replayOutput = document.querySelector("#replay-output")


export {
    replayOutput,
    getRunning,
    resetGame,
    pauseGame,
    unPauseGame
}