import {
  character,
  characterSprite,
  stats,
  timeHeader,
  map,
  mapGrid
} from "./main.js"
import car from "./car.js"
import {
  displayDriftParticles,
  particles
} from "./graphics.js"

const tilePixelCount = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--tile-pixel-count')
);
const carSize = tilePixelCount;
const held_directions = []; //State of which arrow keys we are holding down

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

let mapData; //starting undefined 
let rows;
let columns;
let spawn = {};


let pixelSize = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);
let gridCellSize = pixelSize * tilePixelCount;

let seconds = 0;
let timeString = "00:00:00";

// functions

const generateMap = (inputData) => {
  while (mapGrid.lastElementChild) {
      mapGrid.removeChild(mapGrid.lastElementChild);
  }

  for (let rowIndex in inputData) {
      let mapRow = document.createElement("div");
      let row = inputData[rowIndex];
      mapRow.classList.add("row");
      for (let cellDataIndex in row) {
          let mapCell = document.createElement("div");
          let cell = row[cellDataIndex];
          mapCell.classList.add("cell");
          if (cell == 0) {
              mapCell.classList.add("road");
          } else if (cell == 1) {
              mapCell.classList.add("wall");
          } else if (cell == 2) {
              mapCell.classList.add("dirt");
          } else if (cell == 3) {
              mapCell.classList.add("spawn");
              spawn.x = cellDataIndex;
              spawn.y = rowIndex;
          } else if (cell == 4) {
              mapCell.classList.add("finish-up");
          } else if (cell == 5) {
              mapCell.classList.add("finish-down");
          } else if (cell == 6) {
              mapCell.classList.add("bumper");
          }
          //put cell into row
          mapRow.appendChild(mapCell);
          columns = mapRow.childElementCount;
      }
      //put the row into the dom
      mapGrid.appendChild(mapRow);
      rows = mapGrid.childElementCount;
  }

  mapData = inputData;
  document.documentElement.style.setProperty("--rows", rows);
  document.documentElement.style.setProperty("--columns", columns);

  car.setX(spawn.x * tilePixelCount)
  car.setY(spawn.y * tilePixelCount)
}

const checkGameOver = (currentLap, maxLaps) => {
  if (currentLap >= maxLaps) {
      car.setEngineLock(true); //disbales acceleration
      timeHeader.innerText = "FINAL TIME";
      timeHeader.classList.remove("current");
      timeHeader.classList.add("final")
  }
}


const incrementSeconds = () => {
  if (!car.getEngineLock()) {
      seconds += 1;
      var date = new Date(0);
      date.setSeconds(seconds); // specify value for SECONDS here
      timeString = date.toISOString().substring(11, 19);
  }
}

const placeCharacter = () => {

  //update stats
  stats.time.innerHTML = timeString;
  console.log()
  stats.lap.innerHTML = `${car.getLap()}/${car.getMaxLaps()}`;
  stats.x.innerHTML = car.getX().toFixed(2);
  stats.y.innerHTML = car.getY().toFixed(2);
  stats.speed.innerHTML = car.getSpeed().toFixed(2);
  stats.angle.facing.innerHTML = car.getAngle().facing.toFixed(2);
  stats.angle.moving.innerHTML = car.getAngle().moving.toFixed(2);
  stats.driftForce.innerHTML = car.getDriftForce().toFixed(2);
  stats.underSteering.innerHTML = car.getUnderSteering().toFixed(2);
  stats.angleLock.left.innerHTML = car.getAngleLock().left;
  stats.angleLock.right.innerHTML = car.getAngleLock().right;
  stats.particleCount.innerHTML = particles.length;


  pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
  );

  gridCellSize = pixelSize * tilePixelCount;

  // check if a direction is being held


  car.updateAngleLock()
  if (held_directions.length > 0) {
      //turn
      if (speed != 0) {
          if (held_directions.includes(directions.right)) {
              car.turn("right");
          } else if (held_directions.includes(directions.left)) {
              car.turn("left");
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

  car.stabalizeDriftForce();
  displayDriftParticles(car.getX(), car.getY(), car.getDriftForce(), car.getOnDirt(), car.getAngle());
  car.stabalizeAngle()


  if (speed != 0) {
      car.collision(tilePixelCount, rows, columns, mapData, held_directions)
      //friction
      car.applyFriction();
  }
  car.updateUnderSteering(speed);
  //understeering




  //Limits (gives the illusion of walls)
  //set the right and bottom limit to the image size in the dom

  const leftLimit = 0;
  const rightLimit = (columns * tilePixelCount) - carSize;
  const topLimit = 0;
  const bottomLimit = (rows * tilePixelCount) - carSize;
  if (car.getX() < leftLimit) {
      car.setX(leftLimit);
  }
  if (car.getX() > rightLimit) {
      car.setX(rightLimit);
  }
  if (car.getY() < topLimit) {
      car.setY(topLimit);
  }
  if (car.getY() > bottomLimit) {
      car.setY(bottomLimit);
  }
  // console.log(x);

  const camera_left = pixelSize * 70;
  const camera_top = pixelSize * 70;

  map.style.transform = `translate3d( ${-car.getX()*pixelSize+camera_left}px, ${-car.getY()*pixelSize+camera_top}px, 0 )`;

  //place particles
  for (let particle of particles) {
      particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px , 0) rotate(${particle.angle}deg)`;
  }

  character.style.transform = `translate3d( ${car.getX()*pixelSize}px, ${car.getY()*pixelSize}px, 0 )`;


}

const step = () => {
  placeCharacter();
  window.requestAnimationFrame(() => {
      step();
  })
}

//listeners 

document.addEventListener("keydown", (e) => {
  const dir = keys[e.which];
  if (dir == "up" || dir == "down") {
      e.preventDefault();
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
  checkGameOver,
  incrementSeconds,
  step
}