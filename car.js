import {
    createDirtParticle,
    createDriftParticle,
    held_directions,
    checkGameOver
} from "./main.js";


//defines car physics 
const Car = () => {
    const acceleration = .030;
    const friction = .008;
    const maxSpeed = 20;
    const maxLaps = 3;
    let lap = 0;
    let driftForce = 1;

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

    const updateAngleLock = (angle, angleLock) => {

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

                return ({ //TODO, need to reurn an angle lock object, instead of trying to mutate main from car.js!
                    right: true,
                    left: false
                })
            } else {
                if (angleLock.right) {
                    return {
                        right: false,
                        left: angleLock.left
                    }
                } else {
                    return {
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
                return {
                    right: true,
                    left: false
                }
            } else {
                if (angleLock.left) {
                    return {
                        right: angleLock.right,
                        left: false
                    }
                } else {
                    return {
                        right: false,
                        left: false
                    }
                }
            }
        } else {
            return {
                right: false,
                left: false
            }
        }
    }




    const stabalizeDriftForce = (driftForce, speed) => {

        if (speed < 1.5 || driftForce <= 1.05) {
            return 1;
        } else if (driftForce > 1.05) {
            return driftForce -= .05;
        }
    }

    const stabalizeAngle = (movingAngle, facingAngle, speed, tireGrip) => {

        if (speed == 0) {
            return facingAngle;
        } else if (Math.abs(movingAngle - facingAngle) < tireGrip) {
            return facingAngle;
        }
        //angle correct normal 
        else if (Math.abs(movingAngle - facingAngle) < 30) {
            if (movingAngle > facingAngle) {
                return movingAngle - tireGrip;
            }
            if (movingAngle < facingAngle) {
                return movingAngle + tireGrip;
            }
        }
        //angle correct faster 
        else if (Math.abs(movingAngle - facingAngle) > 30) {
            if (movingAngle > facingAngle) {
                return movingAngle - tireGrip * 3;
            }
            if (movingAngle < facingAngle) {
                return movingAngle + tireGrip * 3;
            }
        }
    }

    const updateUnderSteering = (speed) => {
        switch (true) {
            case (Math.abs(speed) > 0 && Math.abs(speed) < 1.5):
                return 1
            case (Math.abs(speed) > 1.5 && Math.abs(speed) < 2.5):
                return .9
            case (Math.abs(speed) > 2.5 && Math.abs(speed) < 4):
                return .7
            case (Math.abs(speed) > 4 && Math.abs(speed) < 5):
                return .5
            case (Math.abs(speed) > 5 && Math.abs(speed) < 7):
                return .4
            case (Math.abs(speed) > 7):
                return .3
            default:
                return 1;
                break;
        }
    }

    const applyFriction = (speed) => {
        if (Math.abs(speed) < 0.025) {
            return 0;
        } else if (speed > 0) {
            return speed - friction;
        } else if (speed < 0) {
            return speed + friction;
        }
    }

    const increaseLaps = () => {
        lap++;

        checkGameOver(lap, maxLaps)
    }

    const collision = (x, y, speed, angle, tilePixelCount, rows, columns, mapData, onDirt, onFinish) => {
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
                }
                //different drift max in dirt
                createDirtParticle(x, y);
                if (driftForce < 8 && held_directions.includes("left") || driftForce < 8 && held_directions.includes("right")) {
                    driftForce += .2;
                }

            } else if (mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == 2 || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == 2) {
                onDirt = true;
                if (speed > 1) {
                    speed = speed / 1.03;
                }

                createDirtParticle(x, y);
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
                        console.log(lap, "OMG")
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
                speed = speed;

                console.log("y bounce collision")
            }

            if (mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == 1 || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == 6) {

                //old bouncy collision
                let tempAngle = angle.moving
                angle.moving = 180 - tempAngle;
                angle.facing = 180 - tempAngle;

                newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));
                speed = speed;

                console.log("x bounce collision")
            }
        }

        x = newX;
        y = newY;
        return {
            x,
            y,
            speed
        };
    }

    return {
        acceleration,
        friction,
        maxSpeed,
        maxLaps,
        lap,
        driftForce,
        compareFacingRelativeToMoving,
        updateAngleLock,
        stabalizeDriftForce,
        stabalizeAngle,
        updateUnderSteering,
        applyFriction,
        increaseLaps,
        collision
    }
}
const car = Car();

console.log(car)

export default car;