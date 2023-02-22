import {
  replayOutput,
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
  displayDriftParticles,
  particles,
  styleCar,
  styleFinishCell,
  nameGhost,
  drawCanvasMapColor,
  updateScale,
} from "./graphics.js"
import {maps, test} from "./map-data.js"
import {generateMiniMap,updateMiniMapPlayers} from "./mini-map.js"
import getGamePadHeldDirections from "./gamepad.js"

let debug = 0;

// const ghostInput = 

let car = createCar(false);
let ghostCar = createCar(true);
let ghostStep = 0; //kind of like dubstep, but for ghosts. 
let maxLaps = undefined;
let replayExport = []

let mapIndex;

let targetFps = 144;
let currentFps = 0;

const tilePixelCount = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--tile-pixel-count')
);
const carSize = tilePixelCount;
let held_directions = []; //State of which arrow keys we are holding down
const controller_held_directions = [];

let pauseBuffers = [];
let pauseBuffer = 0;
let lastRunTime = 0;
let reqAnim;
let isPaused = true;
let inSpectateMode;
let spectateTime;


let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;

/* Direction key state */
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}
const keys = {
  16: directions.down,
  32: directions.down,
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
  87: directions.up,
  65: directions.left,
  68: directions.right,
  83: directions.down
}

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

let enableGhost = false;

// functions
const setGameMapIndex = (index) => {
  mapIndex = index;
}

const setEnableGhost = (check) => {
  enableGhost = check;
  check ? ghostCharacter.classList.remove("hidden") : ghostCharacter.classList.add("hidden")
}

const getTargetFps = () => {return targetFps}

const getReqAnim = () => {return reqAnim}

const getReplayArray = () => {return replayExport}

const getGameMapIndex = () => {return mapIndex}

const getEnableGhost = () => {return enableGhost}

const getTimeString = () => {return timeString}

const getReplayFinishTime = () => {return replayFinishTime};

const getTilePixelCount = () => {return tilePixelCount}

const getInSpectateMode = () => {return inSpectateMode}

const getSpectateTime = () => {return spectateTime}

const getStats = () => {
  return {
    fps : currentFps,
    time: timeString,
    lap:  `${car.getLap()}/${maxLaps}`,
    x: car.getX().toFixed(2),
    y: car.getY().toFixed(2),
    speed: car.getSpeed().toFixed(2),
    facingAngle : car.getAngle().facing.toFixed(2),
    movingAngle : car.getAngle().moving.toFixed(2),
    driftForce : car.getDriftForce().toFixed(2),
    underSteering : car.getUnderSteering().toFixed(2),
    angleLockLeft : car.getAngleLock().left,
    angleLockRight : car.getAngleLock().right,
    particleCount : particles.length
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
    characterSprite.style.transform = `rotate(${test.spawnAngle}deg)`
    car.setAngle(test.spawnAngle,test.spawnAngle)
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
  
  frameCount = 0;
  fpsInterval = 1000 / targetFps;
  then = window.performance.now();
  startTime = then;
  console.log(startTime);


  styleCar(characterSprite);
  styleCar(ghostCharacterSprite);
  
  car.resetValues(inSpectateMode)
  ghostCar.resetValues(inSpectateMode);

  updateCarSpawnPosition();
  ghostStep = 0;
  milliseconds = 0;
  replayExport = [];
}
const setMapData = (map,replay) => {
  nameGhost('');
  
  maxLaps = map.lapCount;
  mapData = {
    map:map.data,
    replay:replay
  };
  generateMap(mapData.map)
  generateMiniMap(mapData.map)
}
const getMapData = () => {return mapData}

const generateMap = (inputData) => {
  while (mapGrid.lastElementChild) {
      mapGrid.removeChild(mapGrid.lastElementChild);
  }
  gameCanvas.width = inputData[0].length;
  gameCanvas.height = inputData.length;

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

      window.updateGameOver(true)

      //paste replay array to export.
      replayOutput.innerText =  "[" + replayExport.map(frame => "\n[" + frame.map(command => "\"" + command + "\"" ) + "]") + "\n]";;
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

const placeGhost = (stepCount) => {
    let ghost_held_directions = mapData.replay[stepCount]
    if(inSpectateMode){
      car.setX(ghostCar.getX());
      car.setY(ghostCar.getY());
    }
    
    if (ghost_held_directions && ghost_held_directions.length > 0) {
        if (ghostCar.getSpeed() != 0) {
          //turn
            if (ghost_held_directions.includes(directions.right)) {
                ghostCar.turn("right");
                ghostCar.setTurning(true)
            } else if (ghost_held_directions.includes(directions.left)) {
                ghostCar.turn("left");
                ghostCar.setTurning(true)
            }
            else{
              ghostCar.setTurning(false)
            }
            ghostCharacterSprite.style.transform = `rotate(${ghostCar.getAngle().facing}deg)`;
        }
  
        if (ghost_held_directions.includes(directions.down)) {
            ghostCar.accelerate(false)
        }
        if (ghost_held_directions.includes(directions.up)) {
            ghostCar.accelerate(true)
        }
  
    }

    ghostCar.updateAngleLock()
    ghostCar.stabalizeDriftForce();
    ghostCar.stabalizeAngle()
    ghostCar.updateHandling();

  if (ghostCar.getSpeed() != 0) {
    ghostCar.collision(tilePixelCount, rows, columns, mapData.map)
      //friction
      ghostCar.applyFriction();
  }

  //Limits (gives the illusion of walls)
  //set the right and bottom limit to the image size in the dom

  const leftLimit = 0;
  const rightLimit = (columns * tilePixelCount) - carSize;
  const topLimit = 0;
  const bottomLimit = (rows * tilePixelCount) - carSize;
  if (ghostCar.getX() < leftLimit) {
    ghostCar.setX(leftLimit);
    ghostCar.reduceSpeed()
  }
  if (ghostCar.getX() > rightLimit) {
    ghostCar.setX(rightLimit);
    ghostCar.reduceSpeed()
  }
  if (ghostCar.getY() < topLimit) {
    ghostCar.setY(topLimit);
    ghostCar.reduceSpeed()
  }
  if (ghostCar.getY() > bottomLimit) {
    ghostCar.setY(bottomLimit);
    ghostCar.reduceSpeed()
  }

  ghostCharacter.style.transform = `translate3d( ${ghostCar.getX()*pixelSize}px, ${ghostCar.getY()*pixelSize}px, 0 )`;

}


const placeCharacter = () => {
  
  updateScale(car.getSpeed())
  pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
  );

  gridCellSize = pixelSize * tilePixelCount;

  // check if a direction is being held
  if (getGamePadHeldDirections()){
    held_directions = getGamePadHeldDirections();
  }
  
  
  if (held_directions.length > 0) {
      
      if (car.getSpeed() != 0) {
          //turn
          if (held_directions.includes(directions.right)) {
              car.turn("right");
              car.setTurning(true)
          } else if (held_directions.includes(directions.left)) {
              car.turn("left");
              car.setTurning(true)
          }
          else{
            car.setTurning(false)
          }
          characterSprite.style.transform = `rotate(${car.getAngle().facing}deg)`;
      }

      if (held_directions.includes(directions.down)) {
          car.accelerate(false)
      }
      if (held_directions.includes(directions.up)) {
          car.accelerate(true)
      }

  }


  replayExport.push([...held_directions])
  // console.log(replayExport);
  car.updateAngleLock()
  car.stabalizeDriftForce();
  car.stabalizeAngle()
  car.updateHandling();
  displayDriftParticles(car.getX(), car.getY(), car.getDriftForce(), car.getOnDirt(), car.getAngle());


  if (car.getSpeed() != 0) {
      car.collision(tilePixelCount, rows, columns, mapData.map)
      //friction
      car.applyFriction();
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
  const camera_left = pixelSize * camera.clientWidth/4;
  const camera_top = pixelSize * camera.clientHeight/4;

  map.style.transform = `translate3d( ${-car.getX()*pixelSize+camera_left}px, ${-car.getY()*pixelSize+camera_top}px, 0 )`;

  //place particles
  for (let particle of particles) {
      particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px , 0) rotate(${particle.angle}deg)`;
  }

  character.style.transform = `translate3d( ${car.getX()*pixelSize}px, ${car.getY()*pixelSize}px, 0 )`;


}

const setTargetFps = (target) => { targetFps = target}

const step = (newtime) => {
  if(!getRunning()){
    isPaused = true;
    return;
  } 
  if(getRunning()){
    if(isPaused){
      pauseBuffer = (performance.now() - lastRunTime);
      pauseBuffers.push(pauseBuffer);
      pauseBuffer = 0;
    }
    isPaused = false;
    //take last paused time, subtract from current time, push to paused array.


    reqAnim = window.requestAnimationFrame(step);

    now = newtime;
    lastRunTime = now
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        //draw stuff
        placeCharacter();
        if(enableGhost){
          placeGhost(ghostStep);
          ghostStep++;
        }
        updateMiniMapPlayers(car,ghostCar);


        let sinceStart = now-startTime;
        currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100
        timeString = msToTime(Math.round(sinceStart - pauseBuffers.reduce((buffer, reduce) => buffer+reduce)));
        lastRunTime = performance.now()
        window.updateStats && window.updateStats(getStats());
    }

    return;
  }
}


//listeners 

document.addEventListener("keydown", (e) => {
  const dir = keys[e.which];
  //check if current focus isn't an input
  if(document.activeElement.tagName != "INPUT"){
    if (dir == "up" || dir == "down") {
      e.preventDefault();
    }
  }

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

export {
  generateMap,
  getTargetFps,
  getReqAnim,
  getTilePixelCount,
  getTimeString,
  getMapData,
  checkGameOver,
  step,
  resetCarValues,
  getStats,
  getEnableGhost,
  getInSpectateMode,
  getSpectateTime,
  setEnableGhost,
  setGameMapIndex,
  setTargetFps,
  setSpectateMode,
  getGameMapIndex,
  getReplayArray,
  setMapData,
  setSpectateTime
}