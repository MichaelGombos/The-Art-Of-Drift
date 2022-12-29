import {
    checkGameOver
} from "./game.js";

import {createDirtParticle, createDriftParticle,displayDriftParticles,particles} from "./graphics.js"

//defines car physics 
const Car = () => {
    const acceleration = .030;
    const friction = .008;
    const maxSpeed = 20;
    const maxLaps = 3;
    let lap = 0;
    let driftForce = 1;

    let x = 0;
    let y = 0;

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
    let underSteering = 1;
    
    let onDirt = false;
    let onFinish = {
        up: false,
        down: false
    };
    //getters
    const getMaxLaps = () => {return maxLaps}
    const getLap = () => {return lap}
    const getAngle = () => {return angle}
    const getDriftForce = () => {return driftForce}
    const getX = () => {return x}
    const getY = () => {return y}
    const getSpeed = () => {return speed}
    const getAngleLock = () => {return angleLock}
    const getEngineLock =() => {return engineLock}
    const getUnderSteering =() => {return underSteering}
    const getOnDirt = () => {return onDirt}
    //setters 
    const setX = (value) => {x = value}
    const setY = (value) => {y = value}
    const setEngineLock = (value) => {engineLock = value}

    
    const compareFacingRelativeToMoving = (facingAngle, movingAngle) => { // 1 right 0 middle - 1l eft 

        let difference = facingAngle - movingAngle;
        if (difference > 0 && difference < 180 || difference < -180) {
            //   console.log("facingAngle is to the right of movingAngle", difference);
            return 1;
        } else if (difference < 0 || difference > 180) {
            //   console.log("facingAngle is to the left of movingAngle", difference);
            return -1;
        } else {
            return 0;
        }
    }

    const updateAngleLock = () => {

        const direction = compareFacingRelativeToMoving(angle.facing, angle.moving)
        const facingAngle = angle.facing;
        const movingAngle = angle.moving;

        let diff;
        if (direction == 1) { //facing is right of moving Angle
            if (facingAngle - movingAngle < 0) {
                diff = facingAngle + 360 - movingAngle;
            } else {
                diff = facingAngle - movingAngle;
            }

            if (diff > 90) {
                console.log("here1")

                return (
                    angleLock = {
                    right: true,
                    left: false
                })
            } else {
                if (angleLock.right) {
                    angleLock = {
                        right: false,
                        left: angleLock.left
                    }
                } else {
                    angleLock = {
                        right: false,
                        left: false
                    }
                }

            }

        } else if (direction == -1) { //facing is left of moving angle
            if (movingAngle - facingAngle < 0) {
                diff = movingAngle + 360 - facingAngle;
            } else {
                diff = movingAngle - facingAngle;
            }

            if (diff > 90) {
                angleLock = {
                    right: true,
                    left: false
                }
            } else {
                if (angleLock.left) {
                    angleLock = {
                        right: angleLock.right,
                        left: false
                    }
                } else {
                    angleLock = {
                        right: false,
                        left: false
                    }
                }
            }
        } else {
            angleLock = {
                right: false,
                left: false
            }
        }
    }

    const stabalizeDriftForce = () => {

        if (speed < 1.5 || driftForce <= 1.05) {
            driftForce =  1;
        } else if (driftForce > 1.05) {
            driftForce -= .05;
        }
    }

    const stabalizeAngle = () => {
        let movingAngle = angle.moving;
        let facingAngle = angle.facing;
        if (speed == 0) {
            angle.moving = angle.facing;
        } else if (Math.abs(angle.moving - facingAngle) < tireGrip) {
            angle.moving = angle.facing;
        }
        //angle correct normal 
        else if (Math.abs(angle.moving - facingAngle) < 30) {
            if (movingAngle > facingAngle) {
                angle.moving =  angle.moving - tireGrip;
            }
            if (movingAngle < facingAngle) {
                angle.moving =  angle.moving + tireGrip;
            }
        }
        //angle correct faster 
        else if (Math.abs(movingAngle - facingAngle) > 30) {
            if (movingAngle > facingAngle) {
                angle.moving =  angle.moving - tireGrip * 3;
            }
            if (movingAngle < facingAngle) {
                angle.moving = angle.moving + tireGrip * 3;
            }
        }
    }

    const updateUnderSteering = (speed) => {
        switch (true) {
            case (Math.abs(speed) > 0 && Math.abs(speed) < 1.5):
                underSteering = 1
            case (Math.abs(speed) > 1.5 && Math.abs(speed) < 2.5):
                underSteering = .9
            case (Math.abs(speed) > 2.5 && Math.abs(speed) < 4):
                underSteering = .7
            case (Math.abs(speed) > 4 && Math.abs(speed) < 5):
                underSteering = .5
            case (Math.abs(speed) > 5 && Math.abs(speed) < 7):
                underSteering = .4
            case (Math.abs(speed) > 7):
                underSteering = .3
            default:
                underSteering = 1;
                break;
        }
    }

    const applyFriction = () => {
        if (Math.abs(speed) < 0.025) {
            speed = 0;
        } else if (speed > 0) {
            speed -= friction;
        } else if (speed < 0) {
            speed += friction;
        }
    }

    const increaseLaps = () => {
        lap++;

        checkGameOver(lap, maxLaps)
    }

    //car controls

    const accelerate = ( forward) => {
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


    const collision = (tilePixelCount, rows, columns, mapData, held_directions) => {
        let newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));
        let newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));

        //make sure we are in map bounds

        if (Math.ceil(newX / tilePixelCount) >= 0 && Math.ceil(newY / tilePixelCount) < rows && Math.ceil(newY / tilePixelCount) >= 0 && Math.ceil(newX / tilePixelCount) < columns &&
            Math.floor(newX / tilePixelCount) >= 0 && Math.floor(newY / tilePixelCount) < rows && Math.floor(newY / tilePixelCount) >= 0 && Math.floor(newX / tilePixelCount) < columns
        ) {

            //walls
            if (mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == 1 || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == 1) {


                newY = y;
                console.log("y wall collision")
            }

            if (mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == 1 || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == 1) {

                newX = x;
                console.log("x wall collision")
            }
            //dirt
            if (mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == 2 || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == 2) {
                onDirt = true;
                if (speed > 1) {
                    speed = speed / 1.03;
                    createDirtParticle(x, y);
                }
                //different drift max in dirt
                if (driftForce < 8 && held_directions.includes("left") || driftForce < 8 && held_directions.includes("right")) {
                    driftForce += .2;
                }

            } else if (mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == 2 || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == 2) {
                onDirt = true;
                if (speed > 1) {
                    speed = speed / 1.03;
                    createDirtParticle(x, y);
                }

                
                if (driftForce < 8 && held_directions.includes("left") || driftForce < 8 && held_directions.includes("right")) {
                    driftForce += .2;
                }
            } else {
                onDirt = false;
            }

            //Finish lines (only check y)
            if ((mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == 4 || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == 4)) { //finish up
                onFinish.up = true;
            } else {
                if (onFinish.up == true) {
                    //exiting the finish line 
                    onFinish.up = false;
                    if (newY < y) {
                        increaseLaps();
                    } else {
                        // lap--;
                    }

                }
                onFinish.up == false;
            }

            if ((mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == 5 || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == 5)) { //finish down
                onFinish.down = true;
            } else {
                if (onFinish.down == true) {
                    //exiting the finish line 
                    onFinish.down = false;
                    if (newY > y) {
                        increaseLaps();
                    } else {
                        // lap--;
                    }

                }
                onFinish.down == false;
            }

            //Bumper Tiles
            if (mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == 1 || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == 6) {

                //old bouncy collition
                let tempAngle = angle.moving
                angle.moving = 360 - tempAngle;
                angle.facing = 360 - tempAngle;

                newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));

                console.log("y bounce collision")
            }

            if (mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == 1 || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == 6) {

                //old bouncy collision
                let tempAngle = angle.moving
                angle.moving = 180 - tempAngle;
                angle.facing = 180 - tempAngle;

                newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));

                console.log("x bounce collision")
            }
        }

        x = newX;
        y = newY;
    }

    
    return {
        //getters
        getMaxLaps,
        getLap,
        getAngle,
        getDriftForce,
        getX,
        getY,
        getSpeed,
        getAngleLock,
        getEngineLock,
        getUnderSteering,
        getOnDirt,
        //setters
        setX,
        setY,
        setEngineLock,
        //functions
        updateAngleLock,
        stabalizeDriftForce,
        stabalizeAngle,
        updateUnderSteering,
        applyFriction,
        turn,
        accelerate,
        collision
    }
}
const car = Car();

export default car;
