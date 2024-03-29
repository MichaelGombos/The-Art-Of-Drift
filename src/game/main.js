import { muteAllGameSounds, unmuteAllGameSounds } from "../sounds/sfx.js";
import {
    getReqAnim,
    step,
    resetCarValues,
    renderFirstFrame,
    getPlayerCarObject
} from "./game.js"

import{
    clearParticles
} from "./graphics.js"

const mapInput = document.querySelector("#map-input")


let running = false;
let isGameOn = false;


// const handleUpload = (e) => {
//     generateMap(JSON.parse("[" + mapInput.value + "]")[0])
// }

const resetGame = () => {
    pauseGame();
    startGame();
    unPauseGame();
}

const startGame = () => {
    isGameOn = true;
    window.cancelAnimationFrame(getReqAnim());
    clearParticles();
    resetCarValues();
    renderFirstFrame();
    unPauseGame();
}

const getGameOn = () => {
    return isGameOn;
}
const turnOffGame = () => {
    isGameOn = false;
}

const unPauseGame = () => {
    if(!running){
        unmuteAllGameSounds()
        running = true;
        step();
    }
}

const pauseGame = () => {
    muteAllGameSounds()
    running = false;
    return;
}

const getRunning = () => {
    return running
}

Window.getRunning = getRunning


export {
    getRunning,
    resetGame,
    startGame,
    pauseGame,
    unPauseGame,
    turnOffGame,
    getGameOn
}