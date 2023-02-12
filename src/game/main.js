import {
    generateMap,
    getReqAnim,
    updateTimer,
    step,
    resetCarValues,
} from "./game.js"

import{
    clearParticles
} from "./graphics.js"

const mapInput = document.querySelector("#map-input")


let running = false;


// const handleUpload = (e) => {
//     generateMap(JSON.parse("[" + mapInput.value + "]")[0])
// }

const resetGame = (inSpectateMode) => {
    pauseGame();
    setTimeout(startGame(inSpectateMode),1)
}

const startGame = (inSpectateMode, fps) => {

    window.cancelAnimationFrame(getReqAnim());
    clearParticles();
    resetCarValues(inSpectateMode, fps);
    unPauseGame();
}

const unPauseGame = () => {
    if(!running){
        running = true;
        step();
    }
}

const pauseGame = () => {
    running = false;
    return;
}

const getRunning = () => {
    return running}


// uploadButton.addEventListener("click", handleUpload);
const replayOutput = document.querySelector("#replay-output")

  

export {
    replayOutput,
    getRunning,
    resetGame,
    startGame,
    pauseGame,
    unPauseGame
}