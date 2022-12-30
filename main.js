import mapImport from "./map-data.js"

import {
    generateMap,
    incrementSeconds,
    step
} from "./game.js"

const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")
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



generateMap(mapImport);

setInterval(incrementSeconds, 1000)

const handleUpload = (e) => {
    generateMap(JSON.parse("[" + mapInput.value + "]")[0])


}

step(); //Kick off the first step

uploadButton.addEventListener("click", handleUpload);

export {
    character,
    characterSprite,
    stats,
    timeHeader,
    map,
    mapGrid,
    replayOutput
}