import {map, mapParticles, characterSprite, ghostCharacterSprite} from "./elements.js"
const arrow = require("../assets/arrow.svg");
const car = require("../assets/car.svg");

map.appendChild(mapParticles);
//style finish line
const styleFinishCell = (element) => {
    element.style.backgroundImage = `url('${arrow.default}')`
}

//style cars
const styleCar = (element) => {
    element.style.backgroundImage = `url('${car.default}')`
}

let particles = [];
let particleLimit = 1000;
//graphics 
const createDriftParticle = (carX, carY, driftForce, carAngle) => {
  let newParticles = []
  let particle = (xDif,yDif,sizeMultiplier,angleModifier,className) => {
    console.log("class",className)
      let x = carX + xDif;
      let y = carY + yDif;
      let size = driftForce * sizeMultiplier;
      let element = document.createElement("div")
      let angle = carAngle.facing + angleModifier
      element.classList.add("particle");
      element.classList.add(className);
      if(className == "skid-mark"){
        element.style.width = 11;
        element.style.height = 3;
      }
      else{
        element.style.width = size;
        element.style.height = size;
      }
      return {x,y,size,element,angle}
  }

  let skidParticles = [
    particle(1,2,3,0,"skid-mark"), 
    particle(1,-2,3,0,"skid-mark"), 
    particle(-1,2,3,0,"skid-mark"),
    particle(-1,-2,3,0,"skid-mark")
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
    console.log("OK I PUSHED")
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
      const particleX = x - ((.8) * Math.cos(angle.moving * Math.PI / 180));
      const particleY = y - ((.8) * Math.sin(angle.moving * Math.PI / 180));
      createDriftParticle(particleX, particleY, driftForce, angle);
  }
 
  //delete drift particle if more than 100
      if (domParticles.length > particleLimit) {
          {
            for(let i = 0;  i < 8; i++){
              domParticles[i].remove();
              particles.shift();
              console.log(particles)
              console.log(domParticles)
            }              
          }
      }
  

}

const clearParticles = () => {
  particles = [];
  mapParticles.textContent = '';
}
console.log(clearParticles)
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

const setParticleLimit = (limit) => {
    particleLimit = limit;
}
const getParticleLimit = () => {
    return particleLimit;
}

export {createDirtParticle, createDriftParticle,clearParticles, displayDriftParticles,setParticleLimit,getParticleLimit, particles, styleFinishCell, styleCar, drawCanvasMap}