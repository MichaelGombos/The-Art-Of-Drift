import mapImport from "./map-data.js"
import car from "./car.js"

const character = document.querySelector(".character");
const characterSprite = document.querySelector(".character_spritesheet")
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
    angleLock: {
        left: document.querySelector("#lock-left"),
        right: document.querySelector("#lock-right")
    },
    particleCount: document.querySelector("#particle-count")
}

const timeHeader = document.querySelector("#time-header")
const map = document.querySelector(".map");
const mapGrid = document.querySelector(".map-grid")
const mapParticles = document.createElement("div");

const uploadButton = document.querySelector("#upload");
const mapInput = document.querySelector("#map-input")

let mapData = mapImport;
let rows;
let columns;
let spawn = {};

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
}

generateMap(mapData);

const tilePixelCount = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--tile-pixel-count')
);
let pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);

let gridCellSize = pixelSize * tilePixelCount;

const carSize = tilePixelCount;
const acceleration = car.acceleration;
const friction = car.friction;
const maxSpeed = car.maxSpeed;
const maxLaps = car.maxLaps;

//find spawn
let x = spawn.x * tilePixelCount;
let y = spawn.y * tilePixelCount;
let speed = 0;
let angle = {
    moving: 0,
    facing: 0,
}
let angleLock = {
    left: false,
    right: false
}
let engineLock = false;

let tireGrip = 1.05;
let turningSpeed = 5;
let driftForce = car.driftForce;
let underSteering = 1;
let particles = [];
const held_directions = []; //State of which arrow keys we are holding down
let onDirt = false;
let onFinish = {
    up: false,
    down: false
};
let lap = car.lap;

let seconds = 0;
let timeString = "00:00:00";



//car controls

const accelerate = (acceleration, forward) => {
    if (Math.abs(speed) <= maxSpeed && !engineLock) {
        if (forward) {
            let diff = angle.facing - angle.moving;
            if (diff < 0) {
                diff += 360;
            }
            if (diff < 90 || diff > 270) { //we are facing forwards
                speed += acceleration;
            } else { // backwards
                speed -= acceleration;
            }
        } else {
            let diff = angle.facing - angle.moving;
            if (diff < 0) {
                diff += 360;
            }
            if (diff < 90) { //we are facing forwards
                speed -= acceleration;
            } else { // backwards
                speed += acceleration;
            }
        }
    }
}

const turn = (direction) => {

    //compareAngles 
    if (direction === "right" && !angleLock.right) {
        if (driftForce <= 1.4) {
            driftForce += .1;
        } else if (driftForce > 1.4 && driftForce < 5) {
            driftForce += 0.075;
        }
        //turn
        angle.facing += turningSpeed * underSteering;
        angle.moving += turningSpeed / driftForce;

        //degree correction
        if (angle.facing > 360) {
            angle.facing = angle.facing - 360;
        }
        if (angle.moving > 360) {
            angle.moving = angle.moving - 360;
        }
    } else if (direction === "left" && !angleLock.left) {
        if (driftForce <= 1.4) {
            driftForce += .1;
        } else if (driftForce > 1.4 && driftForce < 5) {
            driftForce += 0.075;
        }

        //turn
        angle.facing -= turningSpeed * underSteering;
        angle.moving -= turningSpeed / driftForce;

        //degree correction
        if (angle.facing < 0) {
            angle.facing = angle.facing + 360;
        }
        if (angle.moving < 0) {
            angle.moving = angle.moving + 360;
        }

    }
}

// car physics




//graphics 
const createDriftParticle = (x, y, driftForce, angle) => {
    let particle = {
        x: x,
        y: y,
        size: driftForce * 10,
        element: document.createElement("div"),
        angle: null
    }
    particle.element.classList.add("particle");
    particle.element.style.width = particle.size;
    particle.element.style.height = particle.size;

    // skidMark vs cloud
    if (driftForce < 2) {
        particle.angle = angle.facing;
        particle.element.classList.add("skid-mark");
    } else if (driftForce >= 2) {
        particle.angle = angle.moving + Math.floor(Math.random() * 50) - 25;
        particle.element.classList.add("cloud");
    }
    particles.push(particle);

    let index = particles.length - 1;
    map.appendChild(particle.element)


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

    // skidMark vs cloud
    particle.element.classList.add("dirt");

    particles.push(particle);
    map.appendChild(particle.element)
}
const displayDriftParticles = (driftForce) => {
    if (driftForce > 1.5 && !onDirt) {
        const particleX = x - ((10) * Math.cos(angle.moving * Math.PI / 180));
        const particleY = y - ((10) * Math.sin(angle.moving * Math.PI / 180));
        createDriftParticle(particleX, particleY, driftForce, angle);
    }

    //delete drift particle if more than 100

    setTimeout(() => {
        if (particles.length > 500) {
            if (particles[500]) {
                particles[0].element.remove();
                particles.shift();
            }
        }
    }, 1000)

}

//game 

const checkGameOver = (currentLap, maxLaps) => {
    lap = currentLap

    console.log(lap)
    if (currentLap >= maxLaps) {
        engineLock = true; //disbales acceleration
        timeHeader.innerText = "FINAL TIME";
        timeHeader.classList.remove("current");
        timeHeader.classList.add("final")
    }
}


const incrementSeconds = () => {
    if (!engineLock) {
        seconds += 1;
        var date = new Date(0);
        date.setSeconds(seconds); // specify value for SECONDS here
        timeString = date.toISOString().substring(11, 19);
    }
}

setInterval(incrementSeconds, 1000)



const placeCharacter = () => {

    //update stats
    stats.time.innerHTML = timeString;
    console.log()
    stats.lap.innerHTML = `${lap}/${maxLaps}`;
    stats.x.innerHTML = x.toFixed(2);
    stats.y.innerHTML = y.toFixed(2);
    stats.speed.innerHTML = speed.toFixed(2);
    stats.angle.facing.innerHTML = angle.facing.toFixed(2);
    stats.angle.moving.innerHTML = angle.moving.toFixed(2);
    stats.driftForce.innerHTML = driftForce.toFixed(2);
    stats.underSteering.innerHTML = underSteering.toFixed(2);
    stats.angleLock.left.innerHTML = angleLock.left;
    stats.angleLock.right.innerHTML = angleLock.right;
    stats.particleCount.innerHTML = particles.length;


    pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    gridCellSize = pixelSize * tilePixelCount;

    // check if a direction is being held


    angleLock = car.updateAngleLock(angle, angleLock)
    if (held_directions.length > 0) {
        //turn
        if (speed != 0) {
            if (held_directions.includes(directions.right)) {
                turn("right");
            } else if (held_directions.includes(directions.left)) {
                turn("left");
            }
            characterSprite.style.transform = `rotate(${angle.facing}deg)`;
        }

        if (held_directions.includes(directions.down)) {
            accelerate(acceleration, false)
        }
        if (held_directions.includes(directions.up)) {
            accelerate(acceleration, true)
        }

    }

    driftForce = car.stabalizeDriftForce(driftForce, speed);
    displayDriftParticles(driftForce);
    angle.moving = car.stabalizeAngle(angle.moving, angle.facing, speed, tireGrip)


    if (speed != 0) {
        let position;
        position = car.collision(x, y, speed, angle, tilePixelCount, rows, columns, mapData, onDirt, onFinish)
        x = position.x;
        y = position.y;
        speed = position.speed;
        //friction
        speed = car.applyFriction(speed);

    }
    underSteering = car.updateUnderSteering(speed);
    //understeering




    //Limits (gives the illusion of walls)
    //set the right and bottom limit to the image size in the dom

    const leftLimit = 0;
    const rightLimit = (columns * tilePixelCount) - carSize;
    const topLimit = 0;
    const bottomLimit = (rows * tilePixelCount) - carSize;
    if (x < leftLimit) {
        x = leftLimit;
    }
    if (x > rightLimit) {
        x = rightLimit;
    }
    if (y < topLimit) {
        y = topLimit;
    }
    if (y > bottomLimit) {
        y = bottomLimit;
    }

    const camera_left = pixelSize * 70;
    const camera_top = pixelSize * 70;

    map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;

    //place particles
    for (let particle of particles) {
        particle.element.style.transform = `translate3d( ${particle.x*pixelSize}px, ${particle.y*pixelSize}px , 0) rotate(${particle.angle}deg)`;
    }

    character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;


}


const handleUpload = (e) => {
    generateMap(JSON.parse("[" + mapInput.value + "]")[0])
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

uploadButton.addEventListener("click", handleUpload);

export {
    createDirtParticle,
    createDriftParticle,
    held_directions,
    checkGameOver
}