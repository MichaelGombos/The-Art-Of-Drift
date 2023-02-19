import {map,camera, mapParticles, ghostCharacter, characterSprite, ghostCharacterSprite, ghostCharacterNameTag} from "./elements.js"
const arrow = require("../assets/arrow.svg");
const car = require("../assets/car.svg");

const ghostColors = {
  personalBest : "opacity(.75)",
  easy : "sepia(56%) saturate(3169%) hue-rotate(337deg) brightness(85%) contrast(100%)",
  normal : "saturate(7169%) brightness(65%) contrast(101%)",
  hard : "sepia(46%) saturate(2500.8%) hue-rotate(354deg) brightness(105%) contrast(97%)",
  author : "sepia(46%) saturate(7169%) hue-rotate(67deg) brightness(85%) contrast(101%)",

}

const playerColors = {
  red : "sepia(60%) saturate(2088%) hue-rotate(310deg) brightness(90%) contrast(152%)",
  orange : "sepia(65%) saturate(2950%) hue-rotate(304deg) brightness(110%) contrast(103%)",
  yellow : "sepia(47%) saturate(7150%) hue-rotate(25deg) brightness(173%) contrast(100%)",
  green : "sepia(47%) saturate(7150%) hue-rotate(70deg) brightness(113%) contrast(100%)",
  blue : "sepia(47%) saturate(7150%) hue-rotate(157deg) brightness(86%) contrast(97%)",
  purple : "sepia(47%) saturate(7151%) hue-rotate(259deg) brightness(106%) contrast(99%)",
  white : "",
  black : "saturate(3169%) hue-rotate(337deg) brightness(36%) contrast(100%)"
}



map.insertBefore(mapParticles , ghostCharacter);

const updateScale = (speed) => {
  camera.style.scale = 1.2 - (Math.abs(speed)/40)
}

//style finish line
const styleFinishCell = (element) => {
    element.style.backgroundImage = `url('${arrow.default}')`
}

//style cars
const styleCar = (element) => {
    element.style.backgroundImage = `url('${car.default}')`
}

const nameGhost = (name) => {
  ghostCharacterNameTag.innerHTML = name;
}

const colorPlayerCar = () => {
  characterSprite.style.filter = playerColors[localStorage.getItem("playerColor")];
}

const colorGhostCar = (color) => {
  if(ghostColors[color]){
    ghostCharacterSprite.style.filter = ghostColors[color];
  }
  else if(playerColors[color]){
    ghostCharacterSprite.style.filter = playerColors[color]
  }
}

let particles = [];
let particleLimit = 1000;
//graphics 
const createDriftParticle = (carX, carY, driftForce, carAngle) => {
  let particle = (xDif,yDif,sizeMultiplier,angleModifier,className) => {
      let x = carX + xDif;
      let y = carY + yDif;
      let size = driftForce * sizeMultiplier;
      let element = document.createElement("div")
      let angle = carAngle.moving + angleModifier
      element.classList.add("particle");
      element.classList.add(className);
      if(className == "skid-mark"){
        element.style.width = 25;
        element.style.height = 2+(driftForce-1);
      }
      else{
        element.style.width = size;
        element.style.height = size;
      }
      return {x,y,size,element,angle}
  }

  let skidParticles = [
    particle(2,2,3,0,"skid-mark"), 
    particle(2,-2,3,0,"skid-mark"), 
    particle(-2,2,3,0,"skid-mark"),
    particle(-2,-2,3,0,"skid-mark")
  ] 

  let smokeParticle = particle(
  Math.floor(Math.random() * 3 * driftForce), 
  Math.floor(Math.random() * 3 * driftForce),
  4,
  carAngle.moving + Math.floor(Math.random() * 50) - 25,
  "cloud");

  
  for(let skidParticle of skidParticles ){
    particles.push(skidParticle);
    mapParticles.appendChild(skidParticle.element)
  }
  // also make cloud
  if (driftForce >= 4) {
    particles.push(smokeParticle);
    mapParticles.appendChild(smokeParticle.element)
  }
}

const createDirtParticle = (x, y) => {
  let particle = {
      x: x + Math.floor(Math.random() * 20) - 10,
      y: y + Math.floor(Math.random() * 20) - 10,
      size: 40,
      element: document.createElement("div"),
      angle: Math.floor(Math.random() * 359)
  }
  particle.element.classList.add("particle");
  particle.element.style.width = particle.size;
  particle.element.style.height = particle.size;

  particle.element.classList.add("dirt");

  particles.push(particle);
  mapParticles.appendChild(particle.element)
}
const displayDriftParticles = (x,y ,driftForce, onDirt,angle) => {
  let domParticles = Array.from(mapParticles.children) 

  if (driftForce > 1.5 && !onDirt) {
      createDriftParticle(x, y, driftForce, angle);
  }
 
  //delete drift particle if more than 100
      if (domParticles.length > particleLimit) {
          {
            for(let i = 0;  i < 8; i++){
              domParticles[i].remove();
              particles.shift();
            }              
          }
      }
  

}

const clearParticles = () => {
  particles = [];
  mapParticles.textContent = '';
}
const drawCanvasMap = (context,mapData) => {
    context.globalCompositeOperation='destination-over';
  
    for(let rowIndex in mapData){
      for(let cellIndex in mapData[rowIndex]){
        if(mapData[rowIndex][cellIndex] == 0){
          context.fillStyle = "white"
          context.fillRect(cellIndex,rowIndex,1,1);
        }
        else if(mapData[rowIndex][cellIndex] == 4 ||
          mapData[rowIndex][cellIndex] == 5 ){
          context.fillStyle = "grey"
          context.fillRect(cellIndex,rowIndex,3,3);
        }
      }
    }
    context.globalCompositeOperation='source-over';
}

const drawCanvasMapColor = (context,mapData) => {
  context.globalCompositeOperation='destination-over';
  for(let rowIndex in mapData){
    for(let cellIndex in mapData[rowIndex]){
      switch(mapData[rowIndex][cellIndex]){
        case (0): //road
          context.fillStyle = "#e69c69";
          break;
        case (1): //wall
          context.fillStyle = "#8a4836";
          break;
        case (2): // dirt
          context.fillStyle = "#bf6f4a";
          break;
        case (3): //spawn
          context.fillStyle = "#71c9ff";
          break;
        case (4): //finish-up
          context.fillStyle = "#73ff71";
          break;
        case (5): //finish-down
          context.fillStyle = "#ff29e2";
          break;
        case (6): //bumper
          context.fillStyle = "#0027d2";
          break;
        case (7): //check-point-left-road
          context.fillStyle = "#e69c69";
          break;
        case (8): //check-point-right-road
          context.fillStyle = "#e69c69";
          break;
        case (9): //check-point-left-dirt
          context.fillStyle = "#bf6f4a";
          break;
        case (10): //check-point-right-dirt
          context.fillStyle = "#bf6f4a";
          break;
        default:
          context.fillStyle = "white";
          break;
      }  
      context.fillRect(cellIndex,rowIndex,1,1);
    }
  }
  context.globalCompositeOperation='source-over';
}

const setParticleLimit = (limit) => {
    particleLimit = limit;
}
const getParticleLimit = () => {
    return particleLimit;
}

export {createDirtParticle, createDriftParticle,clearParticles, displayDriftParticles,setParticleLimit,getParticleLimit, particles, styleFinishCell, styleCar, colorGhostCar,colorPlayerCar, nameGhost, drawCanvasMap, drawCanvasMapColor, updateScale, playerColors}