import mapImport from "./map-data.js"

import {
    generateMap,
    incrementSeconds,
    step
} from "./game.js"

const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")

const ghostCharacter = document.querySelector(".ghost");
const ghostCharacterSprite = document.querySelector(".ghost_spritesheet")

const stats = {
    time: document.querySelector("#time"),
    lap: document.querySelector("#lap"),
    x: document.querySelector("#x"),
    y: document.querySelector("#y"),
    speed: document.querySelector("#speed"),
    angle: {
        moving: document.querySelector("#moving"),
        facing: document.querySelector("#facing")
    },
    driftForce: document.querySelector("#drift-force"),
    underSteering: document.querySelector("#under-steer"),
    angleLock: {
        left: document.querySelector("#lock-left"),
        right: document.querySelector("#lock-right")
    },
    particleCount: document.querySelector("#particle-count")
}

const timeHeader = document.querySelector("#time-header")
const map = document.querySelector(".map");
const mapGrid = document.querySelector(".map-grid")
const mapParticles = document.createElement("div");

const uploadButton = document.querySelector("#upload");
const mapInput = document.querySelector("#map-input")

const replayOutput = document.querySelector("#replay-output")

const game = document.querySelector("#game");
const menu = document.querySelector(".menu");
const returnToGame = menu.children[0];
const menuButton = document.querySelector(".menu-button").children[0]; 

let running = false;

generateMap(mapImport);

setInterval(incrementSeconds, 1000)

const handleUpload = (e) => {
    generateMap(JSON.parse("[" + mapInput.value + "]")[0])


}

const hideMenu = () => {
    running = true;
    menu.classList.add("hidden");
    menuButton.classList.remove("hidden");
    step();
}

const showMenu = () => {
    running = false;
    menuButton.classList.add("hidden");
    menu.classList.remove("hidden");
}

const getRunning = () => {
    console.log("hello?")
    return running}

step(); //Kick off the first step

uploadButton.addEventListener("click", handleUpload);

menu.addEventListener("click",hideMenu);
menuButton.addEventListener("click",showMenu)

export {
    character,
    characterSprite,
    ghostCharacter,
    ghostCharacterSprite,
    stats,
    timeHeader,
    map,
    mapGrid,
    replayOutput,
    getRunning
}