const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")
const stats = {
   x : document.querySelector("#x"),
   y : document.querySelector("#y"),
   speed : document.querySelector("#speed"),
   angle : {
      moving:document.querySelector("#moving"),
      facing:document.querySelector("#facing")
   },
   driftForce : document.querySelector("#drift-force"),
   underSteering : document.querySelector("#under-steer"),
   particleCount : document.querySelector("#particle-count")
}
const map = document.querySelector(".map");
const mapGrid = document.querySelector(".map-grid")
const mapData = [
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,2,2,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,0,0,2,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,2,2,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,2,2,0,2,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,2,2,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,2,2,0,0,2,0,2,0,0,0,0,0,0,3,0,0,0,0,0,2,0,0,0,2,0,0,2,2,0,2,0,0,0,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,2,2,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,2,2,0,0,0,2,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,0,0,0,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,2,2,0,0,0,2,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,2,2,2,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
   ];
let rows;
let columns;
let spawn = {};

for(let rowIndex in mapData){
   let mapRow = document.createElement("div");
   let row = mapData[rowIndex];
   mapRow.classList.add("row");
   for(let cellDataIndex in row){
      let mapCell = document.createElement("div");
      let cell = row[cellDataIndex];
      mapCell.classList.add("cell");
      if(cell == 0){
         mapCell.classList.add("road");
      }
      else if(cell == 1){
         mapCell.classList.add("wall");
      }
      else if(cell == 2){
         mapCell.classList.add("dirt");
      }
      else if(cell == 3){
         mapCell.classList.add("spawn");
         spawn.x = cellDataIndex;
         spawn.y = rowIndex;
      }
      //put cell into row
      mapRow.appendChild(mapCell);
      columns = mapRow.childElementCount;
   }
   //put the row into the dom
   mapGrid.appendChild(mapRow);
   rows = mapGrid.childElementCount;
}
document.documentElement.style.setProperty("--rows",rows);
document.documentElement.style.setProperty("--columns",columns);


const tilePixelCount = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--tile-pixel-count')
);
let pixelSize = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);
   
let  gridCellSize = pixelSize * tilePixelCount;

const carSize = tilePixelCount;
const acceleration = .030;
const friction = .015;
const maxSpeed = 10;
//find spawn

let x = spawn.x * tilePixelCount;
let y = spawn.y * tilePixelCount;
let speed = 0; 
let angle = {
   moving: 0,
   facing: 0,
}

let tireGrip = 1.05;
let turningSpeed = 5;
let driftForce = 1;
let underSteering = 1;
let particles = [];
const held_directions = []; //State of which arrow keys we are holding down
let onDirt = false;

const createDriftParticle = (x,y,driftForce) => {
      let particle = {
         x : x,
         y : y,
         size : driftForce*10,
         element : document.createElement("div"),
      }
      particle.element.classList.add("particle");
      particle.element.style.width = particle.size;
      particle.element.style.height = particle.size;

      // skidMark vs cloud
      if(driftForce < 2){
         particle.element.classList.add("skid-mark");
      }
      else if(driftForce >= 2){
         particle.element.classList.add("cloud");
      }
      particles.push(particle);
      map.appendChild(particle.element)
}

const createDirtParticle = (x,y) => {
   let particle = {
      x : x + Math.floor(Math.random() * 20)-10,
      y : y + Math.floor(Math.random() * 20)-10,
      size : 40,
      element : document.createElement("div"),
   }
   particle.element.classList.add("particle");
   particle.element.style.width = particle.size;
   particle.element.style.height = particle.size;

   // skidMark vs cloud
   particle.element.classList.add("dirt");

   particles.push(particle);
   map.appendChild(particle.element)
}

const turn = (direction) => {

   if(direction === "right"){
      if(driftForce <= 1.4){
         driftForce += .1;
      }
      else if(driftForce >1.4  && driftForce < 5){
         driftForce += 0.075;
      }
      //TODO angle offset limit at 90 degrees 
      // if(Math.abs(angle.facing - angle.moving) > 90){
      //    console.log("OVER 90");
      // }
      // if(Math.abs(angle.facing - angle.moving) > 120){
      //    console.log("OVER 120?");
      // }
      angle.facing += turningSpeed *underSteering;
      angle.moving += turningSpeed/driftForce;
      if(angle.facing > 360){
         angle.facing = angle.facing - 360;
      }
      if(angle.moving > 360){
         angle.moving = angle.moving - 360;
      }
   }
   else if(direction === "left"){
      if(driftForce <= 1.4){
         driftForce += .1;
      }
      else if(driftForce >1.4 && driftForce < 5){
         driftForce += 0.075;
      }

      angle.facing -= turningSpeed *underSteering;
      angle.moving -= turningSpeed /driftForce;
      if(angle.facing < 0){
         angle.facing = angle.facing + 360;
      }
      if(angle.moving < 0){
         angle.moving = angle.moving + 360;
      }
   }
}

const stabalizeDriftForce = (driftForce,speed)=> {

   if(speed < 1.5 || driftForce <= 1.05){
      return 1;
   }
   else if(driftForce > 1.05){
      return driftForce -= .05;
   }
}

const stabalizeAngle = (movingAngle,facingAngle,speed,tireGrip) =>{
   if(speed == 0){
      return facingAngle;
   }
   else if(Math.abs(movingAngle - facingAngle) < tireGrip ){
      return movingAngle = facingAngle;
   }
   //angle correct normal 
   else if(Math.abs(movingAngle - facingAngle) < 30 ){
      if(movingAngle > facingAngle){
         return movingAngle -= tireGrip;
      }
      if(movingAngle < facingAngle){
         return movingAngle += tireGrip;
      }
   }
   //angle correct faster 
   else if(Math.abs(movingAngle - facingAngle) > 30 ){
      if(movingAngle > facingAngle){
         return movingAngle -= tireGrip*3;
      }
      if(movingAngle < facingAngle){
         return movingAngle += tireGrip*3;
      }
   }
}

const updateUnderSteering = (speed) => {
   switch(true) { 
      case (Math.abs(speed) > 0 && Math.abs(speed)< 1.5):
         return 1
      case (Math.abs(speed) > 1.5 && Math.abs(speed)< 2.5):
         return .9
      case (Math.abs(speed) > 2.5 && Math.abs(speed)< 4):
         return .8
      case (Math.abs(speed) > 4 && Math.abs(speed)< 5):
         return .7
      case (Math.abs(speed) > 5 && Math.abs(speed)< 7):
         return .6
      case (Math.abs(speed) > 7):
         return .5
      default:
         return 1;
         break;   
   }
}

const applyFriction = (speed) => {
   if(Math.abs(speed) < 0.025){
      return 0;
   }
   else if(speed > 0){
      return speed - friction;
   }
   else if(speed < 0){
      return speed + friction;
   }
}

const collision = (x,y,speed) => {
   let newX = x + (speed * Math.cos(angle.moving * Math.PI/180));
   let newY = y + (speed * Math.sin(angle.moving * Math.PI/180));

   //make sure we are in map bounds

   if(Math.ceil(newX/tilePixelCount) >= 0 && Math.ceil(newY/tilePixelCount) < rows && Math.ceil(newY/tilePixelCount) >= 0 && Math.ceil(newX/tilePixelCount) < columns &&
   Math.floor(newX/tilePixelCount) >= 0 && Math.floor(newY/tilePixelCount) < rows && Math.floor(newY/tilePixelCount) >= 0 && Math.floor(newX/tilePixelCount) < columns
   ){

      //collision detection for x or y since both can happen

      //walls
      if(mapData[Math.floor(newY/tilePixelCount)][Math.floor(x/tilePixelCount)] == 1 || mapData[Math.ceil(newY/tilePixelCount)][Math.ceil(x/tilePixelCount)] == 1){
         
         let tempAngle = angle.moving
         angle.moving = 360 - tempAngle;
         angle.facing = 360 - tempAngle;

         newY = y + (speed * Math.sin(angle.moving * Math.PI/180));
         speed = speed;
         console.log("Y BOUNCE!")
      }

      if(mapData[Math.floor(y/tilePixelCount)][Math.floor(newX/tilePixelCount)] == 1 || mapData[Math.ceil(y/tilePixelCount)][Math.ceil(newX/tilePixelCount)] == 1){
         
         let tempAngle = angle.moving
         angle.moving =   180 - tempAngle;
         angle.facing = 180 - tempAngle  ;
         
         newX = x + (speed * Math.cos(angle.moving * Math.PI/180));
         speed = speed;
         console.log("X BOUNCE")
      }
      //dirt
      if(mapData[Math.floor(newY/tilePixelCount)][Math.floor(x/tilePixelCount)] == 2 || mapData[Math.ceil(newY/tilePixelCount)][Math.ceil(x/tilePixelCount)] == 2){
         onDirt = true;
         if(speed > 1){
            speed = speed/1.03;
         }
         //different drift max in dirt
         createDirtParticle(x,y);
         if(driftForce < 8 && held_directions.includes("left") || driftForce < 8 &&held_directions.includes("right")){
            driftForce += .2;
         }

      }
      else if(mapData[Math.floor(y/tilePixelCount)][Math.floor(newX/tilePixelCount)] == 2 || mapData[Math.ceil(y/tilePixelCount)][Math.ceil(newX/tilePixelCount)] == 2){
         onDirt = true;
         if(speed > 1){
            speed = speed/1.03;
         }

         createDirtParticle(x,y);
         if(driftForce < 8 && held_directions.includes("left") || driftForce < 8 && held_directions.includes("right")){
            driftForce += .2;
         }
      }
      else{
         onDirt = false;
      }
   }

   x = newX;
   y = newY;
   return {x,y,speed};
}

const displayDriftParticles = (driftForce) => {
   if(driftForce > 1.5 && !onDirt){
      const particleX = x - ((10) * Math.cos(angle.moving * Math.PI/180));
      const particleY = y - ((10) * Math.sin(angle.moving * Math.PI/180));
      createDriftParticle(particleX,particleY,driftForce);
   }
}

const accelerate = (acceleration,forward) => {
   if(speed <= 10){
      if(forward){
         speed += acceleration;
      }
      else{
         speed -= acceleration;
      }
   }

}

const placeCharacter = () => {
   
   //update stats
   stats.x.innerHTML = x.toFixed(2);
   stats.y.innerHTML = y.toFixed(2);
   stats.speed.innerHTML = speed.toFixed(2);
   stats.angle.facing.innerHTML = angle.facing.toFixed(2);
   stats.angle.moving.innerHTML = angle.moving.toFixed(2);
   stats.driftForce.innerHTML = driftForce.toFixed(2);
   stats.underSteering.innerHTML = underSteering.toFixed(2);
   stats.particleCount.innerHTML = particles.length;

   pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
      
   gridCellSize = pixelSize * tilePixelCount;

   // check if a direction is being held

   
   if (held_directions.length > 0) {
      //turn
      if(speed != 0){
         if (held_directions.includes(directions.right)) {
            turn("right");
         }
         else if (held_directions.includes(directions.left)) {
            turn("left");
         }
         characterSprite.style.transform = `rotate(${angle.facing}deg)`;
      }
      
      if (held_directions.includes(directions.down)) {accelerate(acceleration,false)}
      if (held_directions.includes(directions.up)) {accelerate(acceleration,true)}

   }
   driftForce = stabalizeDriftForce(driftForce,speed);
   displayDriftParticles(driftForce);

   angle.moving = stabalizeAngle(angle.moving,angle.facing,speed,tireGrip)

   
   if(speed != 0){
      let position;
      position = collision(x,y,speed)
      x = position.x;
      y = position.y;
      speed = position.speed;
      //friction
      speed = applyFriction(speed);

   }
   underSteering = updateUnderSteering(speed);
   //understeering




   //Limits (gives the illusion of walls)
   //set the right and bottom limit to the image size in the dom

   const leftLimit = 0;
   const rightLimit = (columns * tilePixelCount) -carSize; 
   const topLimit = 0;
   const bottomLimit = (rows * tilePixelCount) -carSize;
   // console.log(bottomLimit);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   const camera_left = pixelSize * 70;
   const camera_top = pixelSize * 70;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;

   //place particles
   for(particle of particles){
      particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px, 0 `; 
   }

   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`; 
   

}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step();



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   const dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   const dir = keys[e.which];
   const index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});