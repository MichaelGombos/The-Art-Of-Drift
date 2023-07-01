//contains all document elements 
const particleLayer = document.querySelector('#particle-layer')

const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")

const ghostCharacters = [ 
    document.querySelector(".ghost-1"),
    document.querySelector(".ghost-2"),
    document.querySelector(".ghost-3"),
    document.querySelector(".ghost-4"),
    document.querySelector(".ghost-5")
]

const ghostCharacterSprites = [
    document.querySelector(".ghost-1_spritesheet"),
    document.querySelector(".ghost-2_spritesheet"),
    document.querySelector(".ghost-3_spritesheet"),
    document.querySelector(".ghost-4_spritesheet"),
    document.querySelector(".ghost-5_spritesheet")
]

const ghostCharacterNameTags = [
    document.querySelector(".ghost-1 .driver-name"),
    document.querySelector(".ghost-2 .driver-name"),
    document.querySelector(".ghost-3 .driver-name"),
    document.querySelector(".ghost-4 .driver-name"),
    document.querySelector(".ghost-5 .driver-name")
]

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

const timeHeader = document.querySelector("#time-header");
const fpsText = document.querySelector("#fps");
const map = document.querySelector(".map");
const mapGrid = document.querySelector(".map-grid")
const mapParticles = document.createElement("div");
const game = document.querySelector("#game");
const mapCanvas = document.querySelector("#map-canvas")
const gameCanvas = document.querySelector("#game-canvas");
const playerCanvas = document.querySelector("#player-canvas")
const camera = document.querySelector(".camera")
const cameraShakeContainer = document.querySelector(".camera-shake-container")

export {
    cameraShakeContainer,
  particleLayer, 
  character,
  characterSprite,
  ghostCharacters,
  ghostCharacterSprites,
  ghostCharacterNameTags,
  stats,
  timeHeader,
  fpsText,
  map,
  mapParticles,
  mapGrid,
  mapCanvas,
  gameCanvas,
  playerCanvas,
  camera
}