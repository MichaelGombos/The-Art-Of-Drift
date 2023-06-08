import {
  getRunning
} from "./main.js"
import{
  character,
  characterSprite,
  ghostCharacter,
  ghostCharacterSprite,
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
  updateCameraShake
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
let ghostCar = createCar(true);
let ghostStep = 0; //kind of like dubstep, but for ghosts. 
let maxLaps = undefined;
let mapAngle = undefined;
let mapAutoDrive = undefined;
let replayExport = {
  inputs : [],
  stats : ["peanut butter jelly time!"],
  runtimes : []
}

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
replay:[[]]}; 
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

const setSmoothReplay = (value) => {isSmoothReplayOn = value}

const getSmoothReplay = () => {return isSmoothReplayOn}

const setEnableGhost = (check) => {
  enableGhost = check;
  check ? ghostCharacter.classList.remove("hidden") : ghostCharacter.classList.add("hidden")
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

const getTimeString = () => {return timeString}

const getReplayFinishTime = () => {return replayFinishTime};

const getReplayFinishSeconds = () => {return replayFinishSeconds}

const getTilePixelCount = () => {return tilePixelCount}

const getInSpectateMode = () => {return inSpectateMode}

const getSpectateTime = () => {return spectateTime}

const getPlayerCarObject = () => {return car}

const getStats = () => {
  const target = inSpectateMode ? ghostCar : car;
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
    inputs : targetInputs
  }
}

const updateCarSpawnPosition = () => {

  if(maps[mapIndex]){
    characterSprite.style.transform = `rotate(${maps[mapIndex].spawnAngle}deg)`;
    ghostCharacterSprite.style.transform = `rotate(${maps[mapIndex].spawnAngle}deg)`;

    car.setAngle(maps[mapIndex].spawnAngle,maps[mapIndex].spawnAngle)
    ghostCar.setAngle(maps[mapIndex].spawnAngle,maps[mapIndex].spawnAngle)
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
  ghostCar.setX(spawn.x * tilePixelCount)
  ghostCar.setY(spawn.y * tilePixelCount)
}

const setSpectateMode = (spectateMode) => {
  inSpectateMode = spectateMode;
}
const setSpectateTime = (s) => {
  spectateTime = s;
}
const resetCarValues = () => {

  pauseBuffer = 0;
  pauseBuffers = [0];
  lastRunTime = performance.now();
  lastTickTime = performance.now();
  
  
  frameCount = 0;
  fpsInterval = 1000 / targetFps;
  then = performance.now();
  startTime = then;
  
  car.resetValues(inSpectateMode)
  ghostCar.resetValues(inSpectateMode);

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
const setMapData = (map,replayJSON) => {

  nameGhost('');
  maxLaps = map.lapCount;
  mapAngle = map.spawnAngle;
  mapAutoDrive = map.autoDrive;
  mapData = {
    map:decompressMapData(map.data),
    replay: {
      inputs: JSON.parse(replayJSON.inputs),
      stats: JSON.parse(replayJSON.stats),
      runtimes: JSON.parse([replayJSON.runtimes])
    }
  };
  generateMap(mapData.map)
  generateMiniMap(mapData.map)
}
const getMapData = () => {return mapData}

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
  if (currentLap >= maxLaps) {
      car.setEngineLock(true); //disbales acceleration
      ghostCar.setEngineLock(true); //disbales acceleration
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

const updateFreecamLocation = (direction,multiplier) => {
  switch(direction){
    case("left"):
      console.log("move freecam left")
      freecamOffset.x = freecamOffset.x + ((1 + 4) *multiplier)
      break;
    case("right"):
      console.log("move freecam right")
      freecamOffset.x = freecamOffset.x - ((1+ 4) *multiplier)
      break;
    case("down"):
      console.log("move freecam down")
      freecamOffset.y = freecamOffset.y - ((1 + 4) *multiplier)
      break;
    case("up"):
      console.log("move freecam up")
      freecamOffset.y = freecamOffset.y + ((1 + 4) *multiplier)
      break;
  }
}
const resetFreecamLocation = () => {
  freecamOffset.x = 0
  freecamOffset.y = 0
}

const zoomFreecam = (direction, multiplier) => {
  if(direction == "in"){
    if(freecamOffset.zoom < 4){
      freecamOffset.zoom = freecamOffset.zoom +  multiplier
    }
  }
  else if(direction == "out"){
    console.log("so this is what the zoom is looking like?", freecamOffset.zoom)
    if(freecamOffset.zoom > -20){
      freecamOffset.zoom = freecamOffset.zoom - multiplier
    }
  }
}
const placeGhost = (stepCount) => {
  console.log("placing ghost, " , stepCount)
    //ghost_held_directions = mapData.replay.inputs[stepCount]


    const closestGhostStepIndex = !isSmoothReplayOn ? findClosestIndex(mapData.replay.runtimes, accumulatedTime) : ghostStep;
    

    ghost_inputs = mapData.replay.inputs[closestGhostStepIndex];
    ghost_stats = mapData.replay.stats[closestGhostStepIndex];
    ghost_runtime = mapData.replay.runtimes[closestGhostStepIndex];




    if(ghost_stats){
      ghostCar.setStats(ghost_stats)
    }
    if(stepCount == mapData.replay.inputs.length && inSpectateMode){
      window.changeGUIScreen("/finish");
    }

    // if (ghost_held_directions && ghost_held_directions.length > 0) {
    //   if (ghostCar.getSpeed() != 0) {
    //       let pressure = 1;
    //       //turn
    //       for(let direction of ghost_held_directions){
    //         if(direction.includes("@")){
    //           pressure = direction.slice(direction.indexOf("@")+1)
    //         }

    //         if (direction.includes(directions.right)) {
    //           ghostCar.turn("right",pressure);
    //           ghostCar.setTurning(true)
    //         } else if (direction.includes(directions.left)) {
    //           ghostCar.turn("left",pressure);
    //           ghostCar.setTurning(true)
    //         }
    //         else{
    //           ghostCar.setTurning(false)
    //         }
    //       }
    //       ghostCharacterSprite.style.transform = `rotate(${ghostCar.getAngle().facing}deg)`;
    //   }
    //   for(let direction of ghost_held_directions){
    //     let pressure = 1;
    //     if(direction.includes("@")){
    //       pressure = direction.slice(direction.indexOf("@")+1)
    //     }
    //     if (direction.includes(directions.down)) {
    //       ghostCar.accelerate(false,pressure)
    //     }
    //     if (direction.includes(directions.up)) {
    //       ghostCar.accelerate(true,pressure)
    //     }
    //   }
    // }

    // ghostCar.updateAngleLock()
    // ghostCar.stabalizeDriftForce();
    // ghostCar.stabalizeAngle()
    // ghostCar.updateHandling();
    generateFrameParticles(ghostCar.getSpeed(),ghostCar.getX(), ghostCar.getY(), ghostCar.getDriftForce(), ghostCar.getOnDirt(), ghostCar.getAngle());

    if(isFreecamOn){
      generateFrameSounds(ghostCar.getSpeed(),ghostCar.getX(), ghostCar.getY(), ghostCar.getDriftForce(), ghostCar.getOnDirt(), ghostCar.getAngle());
      console.log("sounds generated with this data", ghost_stats)
    }
  // if (ghostCar.getSpeed() != 0) {
  //   ghostCar.collision(tilePixelCount, rows, columns, mapData.map)
  //     //friction
  //     ghostCar.applyFriction();
  // }

  //Limits (gives the illusion of walls)
  //set the right and bottom limit to the image size in the dom

  // const leftLimit = 0;
  // const rightLimit = (columns * tilePixelCount) - carSize;
  // const topLimit = 0;
  // const bottomLimit = (rows * tilePixelCount) - carSize;
  // if (ghostCar.getX() < leftLimit) {
  //   ghostCar.setX(leftLimit);
  //   ghostCar.reduceSpeed()
  // }
  // if (ghostCar.getX() > rightLimit) {
  //   ghostCar.setX(rightLimit);
  //   ghostCar.reduceSpeed()
  // }
  // if (ghostCar.getY() < topLimit) {
  //   ghostCar.setY(topLimit);
  //   ghostCar.reduceSpeed()
  // }
  // if (ghostCar.getY() > bottomLimit) {
  //   ghostCar.setY(bottomLimit);
  //   ghostCar.reduceSpeed()
  // }

  ghostCharacter.style.transform = `translate3d( ${ghostCar.getX()*pixelSize}px, ${ghostCar.getY()*pixelSize}px, 0 )`;
  ghostCharacterSprite.style.transform = `rotate(${ghostCar.getAngle().facing}deg)`;
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
    if (held_directions && held_directions.length > 0) {

      for(let direction of held_directions){
        let camPressure = 1;
        if(direction.includes("@")){
          camPressure = direction.slice(direction.indexOf("@")+1)
        }
        if( direction.includes(commandToDirectionMap.brake) && held_directions.includes(commandToDirectionMap.accelerate)){
          console.log("me gusta in" , direction)
          zoomFreecam("in",camPressure)
          updateCameraScale(freecamOffset.zoom)
          continue;
        }
        if( direction.includes(commandToDirectionMap.brake) && held_directions.includes(commandToDirectionMap.reverse)){
          console.log("me gusta out")
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

  if(inSpectateMode){
    car.setX(ghostCar.getX());
    car.setY(ghostCar.getY());
    updateCameraShake(ghostCar.getSpeed())
    updateCameraScale(ghostCar.getSpeed())
    updateCameraAngle(ghostCar.getAngle())
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
          for(let direction of held_directions){
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
      for(let direction of held_directions){
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
    placeGhost(ghostStep);
  }
  updateMiniMapPlayers(car,ghostCar);
}

const renderNewFrame = () => {
  //draw stuff
  placeCharacter();
  if(enableGhost){
    placeGhost(ghostStep);
    ghostStep++;
  }
  updateMiniMapPlayers(car,ghostCar);
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
Window.toggleFreecam = () => {
  isFreecamOn = !isFreecamOn;
}
Window.setReplayFrame = (frame) => {
  ghostStep = frame;
}

const step = (newtime) => {
  dt = (performance.now() - lastTickTime) / 1000
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
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    renderNewFrame();
    // for(let i = 0; i < (Math.floor(60/currentFps)) ; i++){
    //   renderNewFrame();
    //   //this works compared to having a delta time multiplier. But I am noticing camera stuttering at low fps (<20)
    // }


    accumulatedTime = now - startTime - pauseBuffers.reduce((buffer, reduce) => buffer + reduce);
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
  getReplayFinishSeconds,
  getSmoothReplay
}