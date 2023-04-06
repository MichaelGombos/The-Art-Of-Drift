//contains all document elements 
const particleLayer = document.querySelector('#particle-layer')

const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")

const ghostCharacter = document.querySelector(".ghost");
const ghostCharacterSprite = document.querySelector(".ghost_spritesheet")
const ghostCharacterNameTag = document.querySelector(".ghost .driver-name")

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

export {
  particleLayer, 
  character,
  characterSprite,
  ghostCharacter,
  ghostCharacterSprite,
  ghostCharacterNameTag,
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