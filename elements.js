//contains all document elements 

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
    particleCount: document.querySelector("#particle-count")
}

const timeHeader = document.querySelector("#time-header");
const fpsText = document.querySelector("#fps");
const map = document.querySelector(".map");
const mapGrid = document.querySelector(".map-grid")
const mapParticles = document.createElement("div");
const game = document.querySelector("#game");
const mapCanvas = document.querySelector("#map-canvas")
const playerCanvas = document.querySelector("#player-canvas")

export {
  character,
  characterSprite,
  ghostCharacter,
  ghostCharacterSprite,
  stats,
  timeHeader,
  fpsText,
  map,
  mapGrid,
  mapCanvas,
  playerCanvas
}