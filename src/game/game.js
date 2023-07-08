import {
  getRunning
} from "./main.js"
import{
  character,
  characterSprite,
  ghostCharacters,
  ghostCharacterSprites,
  map,
  mapGrid,
  gameCanvas,
  camera
} from "./elements.js"
import createCar from "./car.js"
import {
  generateFrameParticles,
  particles,
  nameGhost,
  drawCanvasMapColor,
  updateCameraScale,
  updateCameraAngle,
  createParticleLayer,
  updateCameraShake,
  updateFreeCameraScale
} from "./graphics.js"
import {maps} from "./map-data.js"
import {generateMiniMap,updateMiniMapPlayers} from "./mini-map.js"
import getGamePadHeldDirections from "./gamepad.js"
import { decompressMapData } from "./map-compression.js"
import { commandList, commandMap, commandToDirectionMap, controllerCodesMap, keyboardToCommandMap } from "../gui/helpers/controls.js"
import { generateFrameSounds, generateRaceFinishSound } from "../sounds/sfx.js"
import { findClosestIndex } from "../gui/helpers/util.js"



let debug = 0;

// const ghostInput = 

let car = createCar(false);
// experimental-multi-ghost-race: Initialize ghostCars[] as an array, and create 5 cars.
let ghostCars = [
  createCar(true),
  createCar(true),
  createCar(true),
  createCar(true),
  createCar(true)
];
let ghostCarEnabledList = [
  false,
  false,
  false,
  false,
  false
]

let isGameValid = true;

let focusStats = null;
let closestGhostStepIndex = null;
let freecamGhostFocus = null;
let gameSpeed = 1;
let ghostStep = 0; //kind of like dubstep, but for ghosts. 
let maxLaps = undefined;
let mapAngle = undefined;
let mapAutoDrive = undefined;
let replayExport = {
  inputs : [],
  stats : ["peanut butter jelly time!"],
  runtimes : []
}
let isCosmeticPauseOn = false;
let playDirection = true; 

let mapIndex;

let timeDeltaMultipler = 1; // this value is set to 1 / currentFps * 60 each frame

let targetFps = 60;
let currentFps = 60;
const fpsInterval60 = 1000 / 60;

const tilePixelCount = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--tile-pixel-count')
);
const carSize = tilePixelCount;
let held_directions = []; 
let full_keyboard_held_keys = []; //only used in the keybind settings page.
let ghost_held_directions = []; 

//experimental-multi-ghost-race: These can basically stay the same, althought I will have 5 ghosts, theoretically these should only be able to be used one at a time, which should save some
let ghost_inputs = []
let ghost_stats = []
let ghost_runtime = []

let pauseBuffers = [];
let pauseBuffer = 0;
let lastRunTime = 0;
let lastTickTime = 0;
let reqAnim;
let isPaused = true;
let inSpectateMode;
let freecamSpeed = 1;
let spectateTime;
let replayFinishTime;
let replayFinishSeconds;
let accumulatedTime;

const freecamOffset = {
  x:0,
  y:0,
  zoom:0
}


let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;
let dt = 1;


const tileTypes = ['road', 'wall', 'dirt', 'spawn', 'finish-up', 'finish-down', 'bumper', 'check-point-left-road', 'check-point-right-road', 'check-point-left-dirt', 'check-point-right-dirt']

let mapData = {map:[[1]],
replays:[[]]}; 
let rows;
let columns;
let spawn = {};


let pixelSize = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);
let gridCellSize = pixelSize * tilePixelCount;
let milliseconds = 0;
let timeString = "00:00:00";

let enableGhost = localStorage.getItem("isGhostEnabled") ? JSON.parse(localStorage.getItem("isGhostEnabled")) :  false;
let isDirectionalCameraOn = localStorage.getItem("isDirectionalCameraEnabled") ? JSON.parse(localStorage.getItem("isDirectionalCameraEnabled")) : false
let isFreecamOn = localStorage.getItem("isFreeCamEnabled") ? JSON.parse(localStorage.getItem("isFreeCamEnabled")) : false
let isSmoothReplayOn = localStorage.getItem("isSmoothReplayEnabled")? JSON.parse(localStorage.getItem("isSmoothReplayEnabled")) : false

// functions
const setGameMapIndex = (index) => {
  mapIndex = index;
}

const setPlayDirection = (value) => {
  playDirection = value;
  ghostStep += playDirection ? 1 : -1;
}

const getPlayDirection = (value) => {
  return playDirection;
}

const setGameSpeed = (value) => {
  gameSpeed = value / 100;
}

const setGhostStep = (value) => {
  ghostStep = value;
}

const getGhostStep = () => {
  return ghostStep;
}

const getGameSpeed = () => {
  return gameSpeed;
}

const setFreecamGhostFocus = (index) => {
  freecamGhostFocus = index;
}

const getFreecamGhostFocus = () => {
  return freecamGhostFocus;
}

const setSmoothReplay = (value) => {isSmoothReplayOn = value}

const getSmoothReplay = () => {return isSmoothReplayOn}

const setCosmeticPause = (value) => {isCosmeticPauseOn = value}

const getCosmeticPause = () => {return isCosmeticPauseOn}


const setEnableGhost = (check) => {
  enableGhost = check;
  if(check){
    for(const ghostCharacter of ghostCharacters){
      ghostCharacter.classList.remove("hidden")
    }
  }else{
    for(const ghostCharacter of ghostCharacters){
      ghostCharacter.classList.add("hidden")
    }
  }
}

const updateGhostCarEnabledList = (index, turningOn) => {
  ghostCarEnabledList[index] = turningOn;
  if(turningOn){
    ghostCharacters[index].classList.remove("hidden")
  }
  else{
    ghostCharacters[index].classList.add("hidden")
  }
}

const getGhostCarEnabledList = () => {
  return ghostCarEnabledList;
}

const getIsGameValid = () => {
  return isGameValid;
}
const setIsGameValid = (isValid) => {
  isGameValid = isValid;
}

const setDirectionalCamera = (value) => {isDirectionalCameraOn = value}

const setFreecam = (value) => {isFreecamOn = value}

const getTargetFps = () => {return targetFps}

const getFullKeyboardHeldKeys = () => {return full_keyboard_held_keys}

const getReqAnim = () => {return reqAnim}

const getReplayArray = () => {return replayExport.inputs}

const getReplayString = () => {return "[" + replayExport.inputs.map(frame => "\n[" + frame.map(command => "\"" + command + "\"" ) + "]") + "\n]"}

const getReplayObject = () => {return replayExport}

const getGameMapIndex = () => {return mapIndex}

const getEnableGhost = () => {return enableGhost}

const getDirectionalCamera = () => {return isDirectionalCameraOn}

const getFreecam = () => {return isFreecamOn}

const getFreecamLocation = () => {return freecamOffset}

const getTimeString = () => {return timeString}

const getReplayFinishTime = () => {return replayFinishTime};

const getReplayFinishSeconds = () => {return replayFinishSeconds}

const getTilePixelCount = () => {return tilePixelCount}

const getInSpectateMode = () => {return inSpectateMode}

const getSpectateTime = () => {return spectateTime}

const getPlayerCarObject = () => {return car}

const getStats = () => {
  const target = inSpectateMode ? ghostCars[0] : car;
  const targetInputs = inSpectateMode ? (ghost_inputs ? ghost_inputs : [[]])  : held_directions;
  return {
    fps : currentFps,
    time: timeString,
    checkPoint: target.getCheckpointLap(),
    lap:  `${target.getLap()}/${maxLaps}`,
    x: target.getX().toFixed(2),
    y: target.getY().toFixed(2),
    speed: target.getSpeed().toFixed(2),
    facingAngle : target.getAngle().facing.toFixed(2),
    movingAngle : target.getAngle().moving.toFixed(2),
    driftForce : target.getDriftForce().toFixed(2),
    tireGrip : target.getTireGrip().toFixed(2),
    turningSpeed : target.getTurningSpeed(),
    acceleration : target.getAcceleration(),
    angleLockLeft : target.getAngleLock().left,
    angleLockRight : target.getAngleLock().right,
    particleCount : particles.length,
    isGameValid : isGameValid,
    inputs : targetInputs
  }
}

const updateCarSpawnPosition = () => {

  if(maps[mapIndex]){
    characterSprite.style.transform = `rotate(${maps[mapIndex].spawnAngle}deg)`;
    for(const ghostCharacterSprite of ghostCharacterSprites){
      ghostCharacterSprite.style.transform = `rotate(${maps[mapIndex].spawnAngle}deg)`;
    }

    car.setAngle(maps[mapIndex].spawnAngle,maps[mapIndex].spawnAngle)
    for(const ghostCar of ghostCars){
      ghostCar.setAngle(maps[mapIndex].spawnAngle,maps[mapIndex].spawnAngle)
    }
  }
  else{
    characterSprite.style.transform = `rotate(${mapAngle}deg)`
    car.setAngle(mapAngle,mapAngle)
  }
  if(mapAutoDrive){
    car.setSpeed(10)
  }
  else{
  }

  car.setX(spawn.x * tilePixelCount)
  car.setY(spawn.y * tilePixelCount)
  for(const ghostCar of ghostCars){
    ghostCar.setX(spawn.x * tilePixelCount)
    ghostCar.setY(spawn.y * tilePixelCount)
  }
}

const setSpectateMode = (spectateMode) => {
  inSpectateMode = spectateMode;
}
const setSpectateTime = (s) => {
  spectateTime = s;
}
const resetCarValues = () => {
  isGameValid = true;
  pauseBuffer = 0;
  pauseBuffers = [0];
  lastRunTime = performance.now();
  lastTickTime = performance.now();
  
  
  frameCount = 0;
  fpsInterval = 1000 / targetFps;
  then = performance.now();
  startTime = then;
  
  car.resetValues(inSpectateMode)
  for(const ghostCar of ghostCars){
    ghostCar.resetValues(inSpectateMode);
  }
  createParticleLayer(getMapDataDimensions().width, getMapDataDimensions().height)
  console.log("PARTICLE LAYER DIMENSIONS", getMapDataDimensions().width, getMapDataDimensions().height)
  updateCarSpawnPosition();
  ghostStep = 0;
  milliseconds = 0;
  replayExport = {
    inputs: [],
    stats: [],
    runtimes: []
  };

  
}
const setMapData = (map,replayJSONList) => {

  for(const ghostCarIndex in ghostCars){
    nameGhost('', ghostCarIndex);
  }
  maxLaps = map.lapCount;
  mapAngle = map.spawnAngle;
  mapAutoDrive = map.autoDrive;
  mapData = {
    map:decompressMapData(map.data),
    replays: []
  };
  if(replayJSONList.length > 0){
    console.log("What could this possibly be?",replayJSONList)
    for(const replayJSON of replayJSONList){
      if(Object.keys(replayJSON).length !== 0){
        console.log(replayJSON)
        mapData.replays.push(
          {
            inputs: JSON.parse(replayJSON.inputs),
            stats: JSON.parse(replayJSON.stats),
            runtimes: JSON.parse([replayJSON.runtimes])
          }
        )
      }
    }
  };
  if(replayJSONList.length > 0){
    for(const replayJSON of replayJSONList){
      if(replayJSON == true){
        console.log(replayJSON)
        mapData.replays.push(
          {
            inputs: JSON.parse(replayJSON.inputs),
            stats: JSON.parse(replayJSON.stats),
            runtimes: JSON.parse([replayJSON.runtimes])
          }
        )
      }
    }
  }

  generateMap(mapData.map)
  generateMiniMap(mapData.map)
}
const getMapData = () => {return mapData}

const getShortestGhostReplayLength = () => {
  let shortestArrayLength = 9999999;

  for(const replayObjects of mapData.replays){
    if(replayObjects.stats && replayObjects.stats.length < shortestArrayLength){
      shortestArrayLength = replayObjects.stats.length
    }
  }
  return shortestArrayLength;
}

const getMapDataDimensions = () => {
  return {
    width: gameCanvas.width,
    height: gameCanvas.height
  }
}
const generateMap = (inputData) => {
  while (mapGrid.lastElementChild) {
      mapGrid.removeChild(mapGrid.lastElementChild);
  }
  gameCanvas.width = inputData[0].length;
  gameCanvas.height = inputData.length;
  createParticleLayer(inputData[0].length, inputData.length)
  rows = inputData.length;
  columns = inputData[0].length;
  drawCanvasMapColor(gameCanvas.getContext("2d"),inputData);

  for (let rowIndex in inputData) {
      let row = inputData[rowIndex];
      for (let cellDataIndex in row) {
          let cell = row[cellDataIndex];

          if(cell >= 0 && cell < tileTypes.length){
            if(cell == 3){
              spawn.x = cellDataIndex;
              spawn.y = rowIndex;
            }
            else if(cell == 4 || cell == 5 ){ //|| cell >= 7 && cell <= 10 
              // styleFinishCell(mapCell)
            }
          }
      }
  }


  document.documentElement.style.setProperty("--rows", rows);
  document.documentElement.style.setProperty("--columns", columns);
  updateCarSpawnPosition();

}

const checkGameOver = (currentLap) => {
  if (currentLap >= maxLaps && isGameValid) {
      car.setEngineLock(true); //disbales acceleration
      for(const ghostCar of ghostCars){
        ghostCar.setEngineLock(true); //disbales acceleration
      }
      replayFinishTime = timeString;
      replayFinishSeconds = accumulatedTime;
      generateRaceFinishSound();

      window.updateGameOver(true)
      window.changeGUIScreen("/finish")
  }
  else{
    window.updateGameOver(false)
  }
}

function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}


//TODO 
/*
Going to cap the games physics at 60FPS. 

Every placement to request animation frame will come with a runtime.

If you are running 60fps, and watching a 30fps replay, then there is expected to be half the amount of frames. So on each frame, we will compare the current and next frame. If the next frame time is > the current runtime, we will display this frame, if not, we will display the current frame again.

If you are running 30 fps, and watching a 60fps replay, there is expected to be double the amount of frames.
We need some way to skip frames.

We could have a second function that only handling location the closes replay step index based on an array of runtimes, and our current runtime.

If we call this right before placeCharacter, then we can be sure which ghost step to use each time.
*/
export const setFreecamSpeed = (speed) => {
  freecamSpeed = speed /10;
}

export const setFreecamOffsetX = (offset) => {
  freecamOffset.x = offset;
}

export const setFreecamOffsetY = (offset) => {
  freecamOffset.y = offset;
}

const updateFreecamLocation = (direction,multiplier) => {
  switch(direction){
    case("left"):
      freecamOffset.x = freecamOffset.x + ((1 + 4) *multiplier * freecamSpeed)
      break;
    case("right"):
      freecamOffset.x = freecamOffset.x - ((1+ 4) *multiplier * freecamSpeed)
      break;
    case("down"):
      freecamOffset.y = freecamOffset.y - ((1 + 4) *multiplier * freecamSpeed)
      break;
    case("up"):
      freecamOffset.y = freecamOffset.y + ((1 + 4) *multiplier * freecamSpeed)
      break;
  }
}
const resetFreecamLocation = () => {
  freecamOffset.x = 0
  freecamOffset.y = 0
}

// const zoomFreecam = (direction, multiplier) => {
//   if(direction == "in"){
//     if(freecamOffset.zoom < 4){
//       freecamOffset.zoom = freecamOffset.zoom +  multiplier
//     }
//   }
//   else if(direction == "out"){
//     console.log("so this is what the zoom is looking like?", freecamOffset.zoom)
//     if(freecamOffset.zoom > -20){
//       freecamOffset.zoom = freecamOffset.zoom - multiplier
//     }
//   }
// }

export const setFreecamZoom = (amount) => {
  freecamOffset.zoom = amount
  updateFreeCameraScale(amount)

}
const placeGhost = (stepCount,ghostIndex) => {
   //experimental-multi-ghost-race : Going to change this function by adding the ghostCar as a parameter. and the replay data should also be contained in an array
    const ghostCar = ghostCars[ghostIndex]
    closestGhostStepIndex = !isSmoothReplayOn ? findClosestIndex(mapData.replays[ghostIndex].runtimes, accumulatedTime) : ghostStep;

    
    ghost_inputs = mapData.replays[ghostIndex].inputs[closestGhostStepIndex];
    ghost_stats = mapData.replays[ghostIndex].stats[closestGhostStepIndex];
    ghost_runtime = mapData.replays[ghostIndex].runtimes[closestGhostStepIndex];


    if(ghost_stats){
      ghostCar.setStats(ghost_stats)
    }
    if(stepCount == mapData.replays[ghostIndex].inputs.length && inSpectateMode){
      window.changeGUIScreen("/finish");
    }

    generateFrameParticles(ghostCar.getSpeed(),ghostCar.getX(), ghostCar.getY(), ghostCar.getDriftForce(), ghostCar.getOnDirt(), ghostCar.getAngle());

    if(isFreecamOn){
      generateFrameSounds(ghostCar.getSpeed(),ghostCar.getX(), ghostCar.getY(), ghostCar.getDriftForce(), ghostCar.getOnDirt(), ghostCar.getAngle());
    }


      ghostCharacters[ghostIndex].style.transform = `translate3d( ${ghostCar.getX()*pixelSize}px, ${ghostCar.getY()*pixelSize}px, 0 )`;

    ghostCharacterSprites[ghostIndex].style.transform = `rotate(${ghostCar.getAngle().facing}deg)`;

}


const placeCharacter = () => {

  car.updateAngleLock()
  car.stabalizeDriftForce();
  car.stabalizeAngle()
  car.updateGear();
  if (car.getSpeed() != 0) {
      // car.collision( 1 / currentFps * 60 , tilePixelCount, rows, columns, mapData.map)
      car.collision(tilePixelCount, rows, columns, mapData.map)
      //friction
      car.applyFriction();
  }

  if(!isFreecamOn){

    generateFrameSounds(car.getSpeed(),car.getX(), car.getY(), car.getDriftForce(), car.getOnDirt(), car.getAngle());
    generateFrameParticles(car.getSpeed(),car.getX(), car.getY(), car.getDriftForce(), car.getOnDirt(), car.getAngle());
  }
  
  
  //understeering




  //Limits (gives the illusion of walls)
  //set the right and bottom limit to the image size in the dom

  const leftLimit = 0;
  const rightLimit = (columns * tilePixelCount) - carSize;
  const topLimit = 0;
  const bottomLimit = (rows * tilePixelCount) - carSize;
  if (car.getX() < leftLimit) {
      car.setX(leftLimit);
      car.reduceSpeed()
  }
  if (car.getX() > rightLimit) {
      car.setX(rightLimit);
      car.reduceSpeed()
  }
  if (car.getY() < topLimit) {
      car.setY(topLimit);
      car.reduceSpeed()
  }
  if (car.getY() > bottomLimit) {
      car.setY(bottomLimit);
      car.reduceSpeed()
  }
  const camera_left =  camera.clientWidth /2 + (freecamOffset.x) ; //2 is magic number
  const camera_top =  camera.clientHeight /2 + (freecamOffset.y) ;

  map.style.transform = `translate3d( ${-car.getX()*pixelSize+camera_left}px, ${-car.getY()*pixelSize+camera_top}px, 0 )`;

  //place particles
  for (let particle of particles) {
      particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px , 0) rotate(${particle.angle}deg)`;
  }

  character.style.transform = `translate3d( ${car.getX()*pixelSize}px, ${car.getY()*pixelSize}px, 0 )`;
  characterSprite.style.transform = `rotate(${car.getAngle().facing}deg)`;

  // car interaction stuffz

  car.setDt(dt);
  

  if(isFreecamOn){
    //if free cam was not on before, snap current camera location to car location (could be done outside this conditional)

    // when free cam is on, allow the updateFreecamCamera function to be used. 
    if(freecamGhostFocus !== null){
      focusStats = mapData.replays[freecamGhostFocus].stats
      const ghostLocation = {
        x : focusStats[closestGhostStepIndex][0],
        y : focusStats[closestGhostStepIndex][1]
      }
      
      setFreecamOffsetX( 0)
      setFreecamOffsetY( 0)
      car.setX(Number(ghostLocation.x));
      car.setY(Number(ghostLocation.y));
      updateCameraShake(focusStats[closestGhostStepIndex][6])
      updateCameraScale(focusStats[closestGhostStepIndex][6])
      updateCameraAngle({facing:focusStats[ghostStep][2]})
      }
    else if (held_directions && held_directions.length > 0) {

      for(const direction of held_directions){
        let camPressure = 1;
        if(direction.includes("@")){
          camPressure = direction.slice(direction.indexOf("@")+1)
        }
        if( direction.includes(commandToDirectionMap.brake) && held_directions.includes(commandToDirectionMap.accelerate)){
          zoomFreecam("in",camPressure)
          updateCameraScale(freecamOffset.zoom)
          continue;
        }
        if( direction.includes(commandToDirectionMap.brake) && held_directions.includes(commandToDirectionMap.reverse)){
          zoomFreecam("out",camPressure)
          updateCameraScale(freecamOffset.zoom)
          continue;
        }
        if (direction.includes(commandToDirectionMap.turnright)) {
          updateFreecamLocation("right",camPressure)
        } 
        if (direction.includes(commandToDirectionMap.turnleft)) {
          updateFreecamLocation("left",camPressure)
        }
        if (direction.includes(commandToDirectionMap.accelerate)) {
          updateFreecamLocation("up",camPressure)
        } 
        if (direction.includes(commandToDirectionMap.reverse)) {
          updateFreecamLocation("down",camPressure)
        }

        
        else{
          car.setTurning(false)
        }
      }
    }

    return;
  }else{
    resetFreecamLocation();
  }
  
  if(inSpectateMode){ //for now will just choose the first car.
    car.setX(ghostCars[0].getX());
    car.setY(ghostCars[0].getY());
    updateCameraShake(ghostCars[0].getSpeed())
    updateCameraScale(ghostCars[0].getSpeed())
    updateCameraAngle(ghostCars[0].getAngle())
  }
  else{
    updateCameraShake(car.getDriftForce())
    updateCameraScale(car.getSpeed())
    updateCameraAngle(car.getAngle())
  }

  pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
  );

  gridCellSize = pixelSize * tilePixelCount;

  // check if a direction is being held
  if (getGamePadHeldDirections()){
    held_directions = getGamePadHeldDirections();
  }
  
  
  if (held_directions && held_directions.length > 0) {
      if (car.getSpeed() != 0) {
        let pressure = 1;
          //turn
          for(const direction of held_directions){
            if(direction.includes("@")){
              pressure = direction.slice(direction.indexOf("@")+1)
            }

            if (direction.includes(commandToDirectionMap.turnright)) {
              car.turn("right",pressure);
              car.setTurning(true)
            } else if (direction.includes(commandToDirectionMap.turnleft)) {
                car.turn("left",pressure);
                car.setTurning(true)
            }
            else{
              car.setTurning(false)
            }
          }
      }
      for(const direction of held_directions){
        let pressure = 1;
        car.updateAccelerating(false)
        if(direction.includes("@")){
          pressure = direction.slice(direction.indexOf("@")+1)
        }
        if (direction.includes(commandToDirectionMap.reverse)) {
          car.accelerate(false,pressure)
          car.updateAccelerating(true)
        }
        if (direction.includes(commandToDirectionMap.accelerate)) {
          car.accelerate(true,pressure)
          car.updateAccelerating(true)
        }
        if (direction.includes(commandToDirectionMap.brake)) {
          car.engageBrakes(pressure)
        }


      }
  }

}

const pushReplayInformation = () => {
  replayExport.inputs.push([...held_directions])
  replayExport.stats.push(car.getStats())
  replayExport.runtimes.push(accumulatedTime);
}

const setTargetFps = (target) => { targetFps = target}

const renderFirstFrame = () => {
  //draw stuff
  placeCharacter();
  if(enableGhost){
    for(const ghostCarIndex in ghostCars){
      if(ghostCarEnabledList[ghostCarIndex]){
        placeGhost(ghostStep,ghostCarIndex);
      }
    }
  }
  updateMiniMapPlayers(car,ghostCars); //need to have this function iterate through ghost cars
}

const renderNewFrame = () => {
  //draw stuff
  placeCharacter();
  if(enableGhost && !isCosmeticPauseOn){
    for(const ghostCarIndex in ghostCars){
      if(ghostCarEnabledList[ghostCarIndex]){
        placeGhost(ghostStep,ghostCarIndex);
      }
    }
    if(ghostStep >= 0){
      ghostStep = ghostStep + (playDirection ? 1 : -1);
    }
  }
  updateMiniMapPlayers(car,ghostCars); //need to have this function iterate through ghost cars
}

Window.cosmeticPause = () => {
  isPaused = !isPaused;
}
Window.freecamTeleport = (xLocation, yLocation) => {
  if(isFreecamOn){
    freecamOffset.x = xLocation;
    freecamOffset.y = yLocation;
  }
  console.log("freecam teleported")
}
Window.getFreeplayInfo = () => {return {
  freecam: freecamOffset,
  frame : ghostStep
}}
Window.addFrames = (framesToAdd) => {
  ghostStep += framesToAdd;
}
Window.toggleFreecam = () => {
  isFreecamOn = !isFreecamOn;
}
Window.setReplayFrame = (frame) => {
  ghostStep = frame;
}

const step = (newtime) => {
  const elapsedGameSpeedMult = isSmoothReplayOn ? gameSpeed : 1;
  const dtGameSpeedMult = isSmoothReplayOn ? 1 : gameSpeed;

  dt = (performance.now() - lastTickTime) / 1000 * dtGameSpeedMult
  lastTickTime = performance.now();
  if (!getRunning()) {
    isPaused = true;
    return;
  } 

  if (isPaused) {
    pauseBuffer = performance.now() - lastRunTime;
    pauseBuffers.push(pauseBuffer);
    pauseBuffer = 0;
    isPaused = false;
  }

  reqAnim = window.requestAnimationFrame(step);

  now = newtime;
  elapsed = now - then;

  pushReplayInformation();
  if (elapsed * elapsedGameSpeedMult > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    renderNewFrame();
    // for(const i = 0; i < (Math.floor(60/currentFps)) ; i++){
    //   renderNewFrame();
    //   //this works compared to having a delta time multiplier. But I am noticing camera stuttering at low fps (<20)
    // }


    accumulatedTime = (now - startTime - pauseBuffers.reduce((buffer, reduce) => buffer + reduce) ) * gameSpeed;
    currentFps = Math.round(1000 / (accumulatedTime / ++frameCount) * 100) / 100;
    timeString = msToTime(Math.round(accumulatedTime));
    lastRunTime = performance.now();

    if (window.updateStatsGameInfo) {
      window.updateStatsGameInfo(getStats());
    }
    if (window.updateExtraStats) {
      window.updateExtraStats(getStats());
    }
    if (window.updateDashboard) {
      window.updateDashboard(getStats());
    }
  }
}


//listeners 

export const handleGameInputDown = (e) => {
  const dir = keyboardToCommandMap[e.code];
  //check if current focus isn't an input
  if(document.activeElement.tagName != "INPUT"){
    if (dir == "up" || dir == "down") {
      e.preventDefault();
    }
  }
  if(full_keyboard_held_keys.indexOf(e.code) === -1){
    full_keyboard_held_keys.unshift(e.code)
  }
  if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
  }
}

export const handleGameInputUp = (e) => {
  const dir = keyboardToCommandMap[e.code];
  const keyCode = e.code;
  const heldDirectionIndex = held_directions.indexOf(dir);
  const fullHeldDirectionIndex = full_keyboard_held_keys.indexOf(keyCode);
  if (heldDirectionIndex > -1) {
      held_directions.splice(heldDirectionIndex, 1)
  }
  if (fullHeldDirectionIndex > -1) {
    full_keyboard_held_keys.splice(fullHeldDirectionIndex, 1)
}
}

document.addEventListener("keydown",handleGameInputDown)


document.addEventListener("keyup", handleGameInputUp);

export {
  getGhostCarEnabledList,
  updateGhostCarEnabledList,
  generateMap,
  getTargetFps,
  getPlayerCarObject,
  getReqAnim,
  getTilePixelCount,
  getTimeString,
  getMapData,
  checkGameOver,
  step,
  renderNewFrame,
  renderFirstFrame,
  resetCarValues,
  getDirectionalCamera,
  getFreecam,
  getStats,
  getEnableGhost,
  getInSpectateMode,
  getSpectateTime,
  setEnableGhost,
  setSmoothReplay,
  setGameMapIndex,
  setTargetFps,
  setSpectateMode,
  getGameMapIndex,
  getReplayArray,
  getReplayObject,
  getReplayString,
  getFullKeyboardHeldKeys,
  setMapData,
  setFreecam,
  setSpectateTime,
  setDirectionalCamera,
  getReplayFinishTime,
  getFreecamLocation,
  getReplayFinishSeconds,
  getSmoothReplay,
  setGameSpeed,
  getGameSpeed,
  getGhostStep,
  setGhostStep,
  getCosmeticPause,
  setCosmeticPause,
  getShortestGhostReplayLength,
  setPlayDirection,
  getPlayDirection,
  setFreecamGhostFocus,
  getFreecamGhostFocus,
  setIsGameValid,
  getIsGameValid
}