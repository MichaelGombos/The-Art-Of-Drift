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

import collision_bounce_1 from "../assets/particles/collision_bounce/frame1.png"
import collision_bounce_2 from "../assets/particles/collision_bounce/frame2.png"
import collision_bounce_3 from "../assets/particles/collision_bounce/frame3.png"
import collision_bounce_4 from "../assets/particles/collision_bounce/frame4.png"
import collision_bounce_5 from "../assets/particles/collision_bounce/frame5.png"
import collision_bounce_6 from "../assets/particles/collision_bounce/frame6.png"
import collision_bounce_7 from "../assets/particles/collision_bounce/frame7.png"
import collision_bounce_8 from "../assets/particles/collision_bounce/frame8.png"
import collision_bounce_9 from "../assets/particles/collision_bounce/frame9.png"
import collision_bounce_10 from "../assets/particles/collision_bounce/frame10.png"
import collision_bounce_11 from "../assets/particles/collision_bounce/frame11.png"
import collision_bounce_12 from "../assets/particles/collision_bounce/frame12.png"
import collision_bounce_13 from "../assets/particles/collision_bounce/frame13.png"
import collision_bounce_14 from "../assets/particles/collision_bounce/frame14.png"

import collision_wall_1 from "../assets/particles/collision_wall/frame1.png"
import collision_wall_2 from "../assets/particles/collision_wall/frame2.png"
import collision_wall_3 from "../assets/particles/collision_wall/frame3.png"
import collision_wall_4 from "../assets/particles/collision_wall/frame4.png"
import collision_wall_5 from "../assets/particles/collision_wall/frame5.png"
import collision_wall_6 from "../assets/particles/collision_wall/frame6.png"
import collision_wall_7 from "../assets/particles/collision_wall/frame7.png"
import collision_wall_8 from "../assets/particles/collision_wall/frame8.png"
import collision_wall_9 from "../assets/particles/collision_wall/frame9.png"
import collision_wall_10 from "../assets/particles/collision_wall/frame10.png"
import collision_wall_11 from "../assets/particles/collision_wall/frame11.png"
import collision_wall_12 from "../assets/particles/collision_wall/frame12.png"

import max_speed_1 from "../assets/particles/max_speed/frame1.png"
import max_speed_2 from "../assets/particles/max_speed/frame2.png"
import max_speed_3 from "../assets/particles/max_speed/frame3.png"
import max_speed_4 from "../assets/particles/max_speed/frame4.png"
import max_speed_5 from "../assets/particles/max_speed/frame5.png"
import max_speed_6 from "../assets/particles/max_speed/frame6.png"
import max_speed_7 from "../assets/particles/max_speed/frame7.png"
import max_speed_8 from "../assets/particles/max_speed/frame8.png"
import max_speed_9 from "../assets/particles/max_speed/frame9.png"
import max_speed_10 from "../assets/particles/max_speed/frame10.png"

import drift_dirt_1 from "../assets/particles/drift_dirt/frame1.png"
import drift_dirt_2 from "../assets/particles/drift_dirt/frame2.png"
import drift_dirt_3 from "../assets/particles/drift_dirt/frame3.png"
import drift_dirt_4 from "../assets/particles/drift_dirt/frame4.png"
import drift_dirt_5 from "../assets/particles/drift_dirt/frame5.png"
import drift_dirt_6 from "../assets/particles/drift_dirt/frame6.png"
import drift_dirt_7 from "../assets/particles/drift_dirt/frame7.png"
import drift_dirt_8 from "../assets/particles/drift_dirt/frame8.png"
import drift_dirt_9 from "../assets/particles/drift_dirt/frame9.png"
import drift_dirt_10 from "../assets/particles/drift_dirt/frame10.png"
import drift_dirt_11 from "../assets/particles/drift_dirt/frame11.png"
import drift_dirt_12 from "../assets/particles/drift_dirt/frame12.png"
import drift_dirt_13 from "../assets/particles/drift_dirt/frame13.png"
import drift_dirt_14 from "../assets/particles/drift_dirt/frame14.png"
import drift_dirt_15 from "../assets/particles/drift_dirt/frame15.png"

import tire_tracks from "../assets/particles/tracks.png"
const arrow = require("../assets/arrow.svg");
const car = require("../assets/car.svg");

const ghostColors = {
  personalBest : "opacity(.25)",
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

const generateFrameParticles = (speed, x,y ,driftForce, onDirt,angle) => {
  let domParticles = Array.from(mapParticles.children) 
  if(speed > 9){

    addParticle("max_speed",1, x,y,driftForce,angle.moving)

  }
  if(speed > 2 && onDirt){


    addParticle("drift_dirt",speed/10,x,y,driftForce,angle.moving)
  }
  if (driftForce > 4.5 && !onDirt) {
      // createDriftParticle(x, y, driftForce, angle);

      addParticle("tire_tracks",1,x, y, driftForce, angle.facing, (driftForce-4.5) / 2.5) //magic number to get to 7, the max drift force.
      if(driftForce > 5){

        addParticle("road_dust",speed/20,x + (Math.floor(Math.random() * 60) - 30 ) , y, driftForce, angle.moving)
        addParticle("road_dust",speed/20,x + (Math.floor(Math.random() * 60) - 30 ), y, driftForce, angle.moving)
        addParticle("road_dust",speed/20,x, y + (Math.floor(Math.random() * 60) - 30 ), driftForce, angle.moving)
        addParticle("road_dust",speed/20,x, y + (Math.floor(Math.random() * 60) - 30 ), driftForce, angle.moving)
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
        case (11): //tutorial-trigger 0
          context.fillStyle = "#47694d";
          break;
        case (12): //tutorial-trigger 1
          context.fillStyle = "#4f7555";
          break;
        case (13): //tutorial-trigger 2 
          context.fillStyle = "#598561";
          break;
        case (14): //tutorial-trigger 3 
          context.fillStyle = "#65966e";
          break;
        case (15): //tutorial-trigger 4 
          context.fillStyle = "#77b582";
          break;
        case (16): //tutorial-trigger 5
          context.fillStyle = "#87cc93";
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

let collision_bounce_images = [
  collision_bounce_1 ,
  collision_bounce_2 ,
  collision_bounce_3 ,
  collision_bounce_4 ,
  collision_bounce_5 ,
  collision_bounce_6 ,
  collision_bounce_7 ,
  collision_bounce_8 ,
  collision_bounce_9 ,
  collision_bounce_10,
  collision_bounce_11,
  collision_bounce_12,
  collision_bounce_13,
  collision_bounce_14,
]

let collision_wall_images = [
  collision_wall_1 ,
collision_wall_2 ,
collision_wall_3 ,
collision_wall_4 ,
collision_wall_5 ,
collision_wall_6 ,
collision_wall_7 ,
collision_wall_8 ,
collision_wall_9 ,
collision_wall_10,
collision_wall_11,
collision_wall_12
]

let max_speed_images = [
  max_speed_1 ,
max_speed_2 ,
max_speed_3 ,
max_speed_4 ,
max_speed_5 ,
max_speed_6 ,
max_speed_7 ,
max_speed_8 ,
max_speed_9 ,
max_speed_10
]

let drift_dirt_images = [
  drift_dirt_1 ,
drift_dirt_2 ,
drift_dirt_3 ,
drift_dirt_4 ,
drift_dirt_5 ,
drift_dirt_6 ,
drift_dirt_7 ,
drift_dirt_8 ,
drift_dirt_9 ,
drift_dirt_10,
drift_dirt_11,
drift_dirt_12,
drift_dirt_13,
drift_dirt_14,
drift_dirt_15
]


const textureFromImages = (images) => {
  let temptTextureArray = []
  for (let i=0; i < images.length; i++)
  {
       let texture = Texture.from(images[i]);
       temptTextureArray.push(texture);
  };
  return temptTextureArray;
}

const animationLengthMap = {
  "road_dust" : smoke_1_images.length,
  "collision_bounce" : collision_bounce_images.length,
  "collision_wall" : collision_wall_images.length,
  "max_speed" : max_speed_images.length,
  "drift_dirt" : drift_dirt_images.length,

}

const animationTextureMap =  {
  "road_dust" : textureFromImages(smoke_1_images),
  "collision_bounce" : textureFromImages(collision_bounce_images),
  "collision_wall" : textureFromImages(collision_wall_images),
  "max_speed" : textureFromImages(max_speed_images),
  "drift_dirt" : textureFromImages(drift_dirt_images)
}

const staticTextureMap = {
  "tire_tracks" : Texture.from(tire_tracks)
}

const spriteDetailsMap = {
  "tire_tracks" : {
    scale: .2,
    anchor: [.75,.75],
    animationSpeed : .1,
    angleOffset : 0,
    angleVariance : 0,
    alpha: .25,
    width: 300,
    height: 140,
    deleteDelay : 100000,
    tick: 0,
    frequency: -1,
    tint : 0xFFFFFF
  },
  "road_dust" : {
    scale: 2,
    anchor: [.75,.75],
    animationSpeed : .1,
    angleOffset : -30,
    angleVariance : 90,
    alpha: .75,
    width: 100,
    height: 100,
    deleteDelay : 1000,
    tick: 0,
    frequency: 1,
    tint : 0xf2cbb1
  },
  "collision_bounce" : {
    scale: 1.2,
    anchor: [.5,.75],
    animationSpeed : .3,
    angleOffset : 90,
    angleVariance : 0,
    alpha: 1,
    width: 100,
    height: 100,
    deleteDelay : 750,
    tick: 0,
    frequency: -1,
    tint : 0xFFFFFF
  },
  "collision_wall" : {
    scale: 1.2,
    anchor: [.5,.5],
    animationSpeed : .3,
    angleOffset : -30,
    angleVariance : 0,
    alpha: 1,
    width: 100,
    height: 100,
    deleteDelay : 1000,
    tick: 0,
    frequency: 1,
    tint : 0xFFFFFF
  },
  "max_speed" : {
    scale: .4,
    anchor: [.5,.5],
    animationSpeed : .1,
    angleOffset : -30,
    angleVariance : 360,
    alpha: 1,
    width: 100,
    height: 100,
    deleteDelay : 1000,
    tick: 0,
    frequency: 3,
    tint : 0xFFFFFF
  },
  "drift_dirt" : {
    scale: 1.2,
    anchor: [.5,.75],
    animationSpeed : .2,
    angleOffset : -90,
    angleVariance : 90,
    alpha: .5,
    width: 100,
    height: 100,
    deleteDelay : 1000,
    tick: 0,
    frequency: 6,
    tint : 0xbf6f4a
  },
}

const addParticle = (type = "road_dust", scaleMultiplier, carX= 69,carY = 69, driftForce = 2, carAngle = 24,opacityMultiplier = null) => {
  let newParticle
  console.log("particle data", type , scaleMultiplier, carX,carY , driftForce, carAngle ,opacityMultiplier ) 


  if(spriteDetailsMap[type].tick > spriteDetailsMap[type].frequency){

    if(Object.keys(animationTextureMap).includes(type)){
      newParticle = new AnimatedSprite(animationTextureMap[type]);
      newParticle.gotoAndPlay(Math.floor(Math.random() * animationLengthMap[type]/2));
      newParticle.animationSpeed = spriteDetailsMap[type].animationSpeed;
    }
    else{
      newParticle = new Sprite(staticTextureMap[type]);
    }
    newParticle.angle = carAngle
     + spriteDetailsMap[type].angleOffset
      + ( Math.floor(Math.random() * spriteDetailsMap[type].angleVariance) - spriteDetailsMap[type].angleVariance/2);
    newParticle.alpha = opacityMultiplier !== null ? opacityMultiplier.toFixed(1) : spriteDetailsMap[type].alpha;
    newParticle.x = carX / 2;
    newParticle.y = carY / 2;
    newParticle.anchor.set(spriteDetailsMap[type].anchor[0],spriteDetailsMap[type].anchor[1])
    newParticle.width = 128;
    newParticle.height = 128;
    newParticle.tint = spriteDetailsMap[type].tint;
    newParticle.scale.set(spriteDetailsMap[type].scale * scaleMultiplier,spriteDetailsMap[type].scale * scaleMultiplier)
    app.stage.addChild(newParticle);
    setTimeout(() => newParticle.destroy(), spriteDetailsMap[type].deleteDelay) ;
    spriteDetailsMap[type].tick = 0;
  }
  else{
    console.log("increasing tick instead...")
    spriteDetailsMap[type].tick = spriteDetailsMap[type].tick+1;
  }

}

window.addWindowParticle = addParticle

export {clearParticles, generateFrameParticles,setParticleLimit,getParticleLimit, particles, colorGhostCar,colorPlayerCar, nameGhost, drawCanvasMap, drawCanvasMapColor, updateCameraScale,updateCameraAngle, playerColors,
  drawPlayerVehicle,
drawGhostVehicle, addParticle,
createParticleLayer}