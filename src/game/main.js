import {
    getReqAnim,
    step,
    resetCarValues,
    renderNewFrame
} from "./game.js"

import{
    clearParticles
} from "./graphics.js"

const mapInput = document.querySelector("#map-input")


let running = false;


// const handleUpload = (e) => {
//     generateMap(JSON.parse("[" + mapInput.value + "]")[0])
// }

const resetGame = () => {
    pauseGame();
    setTimeout(startGame(),1)
    unPauseGame();
}

const startGame = () => {
    window.cancelAnimationFrame(getReqAnim());
    clearParticles();
    resetCarValues();
    renderNewFrame();
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



export {
    getRunning,
    resetGame,
    startGame,
    pauseGame,
    unPauseGame
}