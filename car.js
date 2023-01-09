import {
    checkGameOver
} from "./game.js";

import {createDirtParticle, createDriftParticle,displayDriftParticles,particles} from "./graphics.js"

//defines car physics 
const Car = () => {
    const acceleration = .030;
    const friction = .008;
    const maxSpeed = 20;
    const maxLaps = 5;
    let lap = 0;
    let driftForce = 1;

    let x = 0;
    let y = 0;

    let speed = 0;
    let angle = {
        moving: 0,
        facing: 0,
    }
    let engineLock = false;

    const tireGrip = 2;
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
    const getEngineLock =() => {return engineLock}
    const getUnderSteering =() => {return underSteering}
    const getOnDirt = () => {return onDirt}
    //setters 
    const setX = (value) => {x = value}
    const setY = (value) => {y = value}
    const setEngineLock = (value) => {engineLock = value}

    const resetValues = () => {
        speed = 0;
        angle = {
            moving: 0,
            facing: 0,
        }
        lap = 0;
        engineLock = false;
    }

    const reduceSpeed = () => { //wall/border
        speed = speed/1.05; 
    }

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
        else if (movingAngle > facingAngle) {
            if((Math.abs(angle.moving - facingAngle) > 180)){ //long way home fix 
                angle.moving =  angle.moving + tireGrip;
            }
            else{
                angle.moving =  angle.moving - tireGrip;
            }
        }
        else if (movingAngle < facingAngle) {
            if((Math.abs(angle.moving - facingAngle) > 180)){ //long way home fix 
                angle.moving =  angle.moving - tireGrip;
            }
            else{
                angle.moving =  angle.moving + tireGrip;

            }
        }

    }

    const updateUnderSteering = () => {
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
        if (direction === "right") {
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
        } else if (direction === "left") {
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

    const inBounds = (newX,newY,rows,columns,tilePixelCount) => {
        return(Math.ceil(newX / tilePixelCount) >= 0 && Math.ceil(newY / tilePixelCount) < rows && Math.ceil(newY / tilePixelCount) >= 0 && Math.ceil(newX / tilePixelCount) < columns &&
        Math.floor(newX / tilePixelCount) >= 0 && Math.floor(newY / tilePixelCount) < rows && Math.floor(newY / tilePixelCount) >= 0 && Math.floor(newX / tilePixelCount) < columns)
    }

    const collidingWithValue = (value,axis,mapData,tilePixelCount) =>{


        let count = 0;
        let speedSteps = []
        if(speed > 4){
            for(let i = speed; i >= 4;  i-=4){
                count++;
            }
            for(let c = 1; c <= count; c++){
                speedSteps.push(c * 4); //tile size
            }
            
        }
        speedSteps.push(speed);

        for(let speedStep of speedSteps){
            let newX = x + (speedStep * Math.cos(angle.moving * Math.PI / 180));
            let newY = y + (speedStep * Math.sin(angle.moving * Math.PI / 180));
            if(axis == "y"){
                return mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == value || mapData[Math.ceil(newY / tilePixelCount)][Math.ceil(x / tilePixelCount)] == value
            }
            else if (axis == "x"){
                return mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == value || mapData[Math.ceil(y / tilePixelCount)][Math.ceil(newX / tilePixelCount)] == value
            }
        }

    }


    const collision = (tilePixelCount, rows, columns, mapData) => {
        let newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));
        let newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));

        //make sure we are in map bounds

        if (inBounds(newX,newY,rows,columns,tilePixelCount)) {

            //walls
            if (collidingWithValue(1,"y",mapData,tilePixelCount)) {
                reduceSpeed()
                newY = y;
            }

            if (collidingWithValue(1,"x",mapData,tilePixelCount)) {
                reduceSpeed()
                newX = x;
            }
            //dirt
            if (collidingWithValue(2,"y",mapData,tilePixelCount) || collidingWithValue(2,"x",mapData,tilePixelCount)) {
                onDirt = true;
                if (speed > 1) {
                    speed = speed / 1.03;
                    createDirtParticle(x, y);
                }
                //different drift max in dirt
                if (driftForce < 8) {
                    driftForce += .2;
                }

            } else {
                onDirt = false;
            }

            //Finish lines (only check y)
            if (collidingWithValue(4,"y",mapData,tilePixelCount)) { //finish up
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

            if (collidingWithValue(5,"y",mapData,tilePixelCount)) { //finish down
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
            if (collidingWithValue(6,"y",mapData,tilePixelCount)) {

                //old bouncy collition
                let tempAngle = angle.moving
                angle.moving = 360 - tempAngle;
                angle.facing = 360 - tempAngle;

                newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));

            }

            if (collidingWithValue(6,"x",mapData,tilePixelCount)) {

                //old bouncy collision
                let tempAngle = angle.moving
                angle.moving = 180 - tempAngle;
                angle.facing = 180 - tempAngle;

                newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));

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
        getEngineLock,
        getUnderSteering,
        getOnDirt,
        //setters
        setX,
        setY,
        setEngineLock,
        //functions
        resetValues,
        stabalizeDriftForce,
        stabalizeAngle,
        updateUnderSteering,
        applyFriction,
        turn,
        accelerate,
        reduceSpeed,
        collision
    }
}


export default Car;
