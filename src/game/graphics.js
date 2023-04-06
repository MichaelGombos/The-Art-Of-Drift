import { Application, Sprite, AnimatedSprite, Texture } from 'pixi.js';

import {map,camera, mapParticles, ghostCharacter, characterSprite, ghostCharacterSprite, ghostCharacterNameTag , particleLayer} from "./elements.js"
import { getDirectionalCamera } from "./game.js";


import vehicleTopDownGraphicCampaignURL from "../assets/game-vehicles/campaign-police-3.png"

import vehicleTopDownGraphic1 from "../assets/game-vehicles/jeep-9.png"
import vehicleTopDownGraphic2 from "../assets/game-vehicles/hatchback-9.png"
import vehicleTopDownGraphic3 from "../assets/game-vehicles/sedan-1-9.png"
import vehicleTopDownGraphic4 from "../assets/game-vehicles/taxi-1-9.png"
import vehicleTopDownGraphic5 from "../assets/game-vehicles/van-1-9.png"

//particles

import smoke_1_1 from "../assets/particles/smoke_1/frame1.png"
import smoke_1_2 from "../assets/particles/smoke_1/frame2.png"
import smoke_1_3 from "../assets/particles/smoke_1/frame3.png"
import smoke_1_4 from "../assets/particles/smoke_1/frame4.png"
import smoke_1_5 from "../assets/particles/smoke_1/frame5.png"
import smoke_1_6 from "../assets/particles/smoke_1/frame6.png"
import smoke_1_7 from "../assets/particles/smoke_1/frame7.png"
import smoke_1_8 from "../assets/particles/smoke_1/frame8.png"
import smoke_1_9 from "../assets/particles/smoke_1/frame9.png"
import smoke_1_10 from "../assets/particles/smoke_1/frame10.png"
import smoke_1_11 from "../assets/particles/smoke_1/frame11.png"
import smoke_1_12 from "../assets/particles/smoke_1/frame12.png"
import smoke_1_13 from "../assets/particles/smoke_1/frame13.png"

import tire_tracks from "../assets/particles/tire/tire-tracks.png"
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
  white : "brightness(100%)",
  black : "saturate(3169%) hue-rotate(337deg) brightness(36%) contrast(100%)"
}

const vehicleTopDownGraphicURLs = [vehicleTopDownGraphic1,vehicleTopDownGraphic2,vehicleTopDownGraphic3,vehicleTopDownGraphic4,vehicleTopDownGraphic5]

let animatedParticleTick = 0; //used to confirm if we should place a particle or wait.
let staticParticleTick = 0; //used to confirm if we should place a particle or wait.

map.insertBefore(mapParticles , ghostCharacter);

const updateCameraScale = (speed) => {
  camera.style.scale = 2 - (Math.abs(speed)/25)
}
const updateCameraAngle = (angle) => {
  if(getDirectionalCamera()){
    camera.style.transform = `rotate(${-angle.facing + 270}deg)`
  }
  else{
    camera.style.transform = `rotate(${0}deg)`
  }
}

const nameGhost = (name) => {
  ghostCharacterNameTag.innerHTML = name;
}



const drawPlayerVehicle = (vehicleID) => {
  //set background image to car graphic
  console.log("before drawing??")
  characterSprite.style.backgroundImage = `url(${vehicleTopDownGraphicURLs[vehicleID]})`

  console.log("drawing??" , vehicleID ,vehicleTopDownGraphicURLs[vehicleID] , characterSprite.style.backgroundImage ) 
}

const drawGhostVehicle = (vehicleID) => {
  if(vehicleID == "campaign"){
    ghostCharacterSprite.style.backgroundImage = `url(${vehicleTopDownGraphicCampaignURL})`
  }
  else{
    ghostCharacterSprite.style.backgroundImage = `url(${vehicleTopDownGraphicURLs[vehicleID]})`
  }
}

const colorPlayerCar = () => {
  // characterSprite.style.filter = playerColors[localStorage.getItem("playerColor")];
}

const colorGhostCar = (color) => {
  if(ghostColors[color]){
    console.log("inside1 ")
    ghostCharacterSprite.style.filter = ghostColors[color];
  }
  else if(playerColors[color]){
    console.log("inside2 ")
    ghostCharacterSprite.style.filter = playerColors[color]
  }

  console.log("AM I TRYING TO COLOR?", color, ghostCharacterSprite.style.filter)
}

let particles = [];
let particleLimit = 1000;
//graphics 
const createDriftParticle = (carX, carY, driftForce, carAngle) => {

  let particle = (xDif,yDif,sizeMultiplier,angleModifier,className) => {
      const driftForceVisualCap = 64;
      let x = carX + xDif;
      let y = carY + yDif;
      let size = driftForce * sizeMultiplier > driftForceVisualCap ? driftForceVisualCap : driftForce * sizeMultiplier;
      let element = document.createElement("div")
      let angle = carAngle.moving + angleModifier
      element.classList.add("particle");
      element.classList.add(className);
      if(className == "skid-mark"){
        element.style.width = 25;
        element.style.height = (driftForce * driftForce)/3;
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
  Math.floor((Math.random() * 6)-3) * driftForce, 
  Math.floor((Math.random() * 6)-3) * driftForce,
  driftForce,
  carAngle.moving + Math.floor(Math.random() * 50) - 25,
  "cloud");

  
  for(let skidParticle of skidParticles ){
    particles.push(skidParticle);
    mapParticles.appendChild(skidParticle.element)
  }
  // also make cloud
  if (driftForce >=4) {
    particles.push(smokeParticle);
    mapParticles.appendChild(smokeParticle.element)
  }
}

const createDirtParticle = (x, y) => {
  let particle = {
      x: x + Math.floor(Math.random() * 30) - 15,
      y: y + Math.floor(Math.random() * 30) - 15,
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
const generateFrameParticles = (x,y ,driftForce, onDirt,angle) => {
  let domParticles = Array.from(mapParticles.children) 

  if (driftForce > 1.5 && !onDirt) {
      // createDriftParticle(x, y, driftForce, angle);
      if(staticParticleTick == 1){
        addParticle("tire_tracks",x, y, driftForce, angle)
        staticParticleTick =0
      }
      else{
        staticParticleTick++;
      }
      if(driftForce > 4){
        if(animatedParticleTick == 6){
          addParticle("road_dust",x, y, driftForce, angle)
          animatedParticleTick =0
        }
        else{
          animatedParticleTick++;
        }
      }

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
  // particles = [];
  // mapParticles.textContent = '';
}
const drawCanvasMap = (context,mapData) => {
    context.globalCompositeOperation='destination-over';
  
    for(let rowIndex in mapData){
      for(let cellIndex in mapData[rowIndex]){
        if(Number(mapData[rowIndex][cellIndex]) == 0){
          context.fillStyle = "white"
          context.fillRect(cellIndex,rowIndex,1,1);
        }
        else if(Number(mapData[rowIndex][cellIndex]) == 4 ||
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
      switch(Number(mapData[rowIndex][cellIndex])){
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

//new particle layer setup with pixi JS


//define pixi app
let app 
const createParticleLayer = (width,height) => {
  particleLayer.innerHTML = ''
  app = new Application({ width: width, height: height , backgroundAlpha: 0  });
  particleLayer.appendChild(app.view) 
}

//define textures
let cowImages = [
  "https://st.depositphotos.com/1052928/1663/i/600/depositphotos_16636059-stock-photo-brown-cow.jpg",
  "https://t3.ftcdn.net/jpg/00/84/09/18/360_F_84091840_8wn1lAJ7jIuYRczt4PRqrrZUoAOoPVrO.jpg",
  "https://images.pexels.com/photos/51311/cow-calf-cattle-stock-51311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]
let cowTextures = [];
for (let i=0; i < cowImages.length; i++)
{
     let texture = Texture.from(cowImages[i]);
     cowTextures.push(texture);
};

let smoke_1_images = [
  smoke_1_1 ,
  smoke_1_2 ,
  smoke_1_3 ,
  smoke_1_4 ,
  smoke_1_5 ,
  smoke_1_6 ,
  smoke_1_7 ,
  smoke_1_8 ,
  smoke_1_9 ,
  smoke_1_10,
  smoke_1_11,
  smoke_1_12,
  smoke_1_13,
]
let smoke_1_textures = []
for (let i=0; i < smoke_1_images.length; i++)
{
     let texture = Texture.from(smoke_1_images[i]);
     smoke_1_textures.push(texture);
};

const animationTextureMap =  {
  "cow" : cowTextures,
  "road_dust" : smoke_1_textures
}

const staticTextureMap = {
  "tire_tracks" : Texture.from(tire_tracks)
}

const particleScaleMap = {
  "road_dust" : 1.2,
  "tire_tracks" : .1
}
// TODO make a map/object containing the textures :)

//add new sprite
// let cowSprite = new AnimatedSprite(cowTextures);
// cowSprite.gotoAndPlay(0);

// app.stage.addChild(cowSprite);
const addParticle = (type = "road_dust", carX= 69,carY = 69, driftForce = 2, carAngle = 24) => {
  let newCow
  

  if(Object.keys(animationTextureMap).includes(type)){
    newCow = new AnimatedSprite(animationTextureMap[type]);
    newCow.gotoAndPlay(0);
    newCow.animationSpeed = .1;
    newCow.angle = carAngle.moving -30 ;
    newCow.alpha = .4;
  }
  else{
    newCow = new Sprite(staticTextureMap[type]);
    newCow.angle = carAngle.facing;
    newCow.alpha = .2;
  }
  newCow.x = carX / 2;
  newCow.y = carY / 2;
  newCow.anchor.set(.75,.75)
  newCow.width = 100;
  newCow.height = 100;
  newCow.scale.set(particleScaleMap[type],particleScaleMap[type])
  app.stage.addChild(newCow);
  setTimeout(() => newCow.destroy(), 1000) ;
  return "wowzers"
}

window.addWindowParticle = addParticle

export {createDirtParticle, createDriftParticle,clearParticles, generateFrameParticles,setParticleLimit,getParticleLimit, particles, colorGhostCar,colorPlayerCar, nameGhost, drawCanvasMap, drawCanvasMapColor, updateCameraScale,updateCameraAngle, playerColors,
  drawPlayerVehicle,
drawGhostVehicle,
createParticleLayer}