import {
    checkGameOver
} from "./game.js";

import { characterSprite } from "./elements.js";

import {addParticle, createDirtParticle} from "./graphics.js"
import { engineTransition, generateCollisionSound, generateLapIncreaseSound } from "../sounds/sfx.js";
import { pauseGame } from "./main.js";

//defines car physics 
const createCar = (isGhost) => {
    let gear = 0;
    let acceleration = .15;
    const friction = .006;
    const maxSpeed = 25;
    const maxLaps = 5;
    let lap = 0;
    let checkPointLap = 0;
    let driftForce = 1;
    let driftForceMax = 12;
    let turnTime = 0;
    let tireGripTime = 0;
    let dt = 16.67;

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

    let tireGrip = 1.7;
    let turningSpeed = 3.5;
    let underSteering = 1;
    
    let onTutorialIndex = 0;
    let onTutorial= 0;
    let onDirt = false;
    let onWall = false;
    let onBounce = false;
    let onFinish = {
        up: false,
        down: false
    };
    let onCheckPoint = {
        left: false,
        right: false
    };

    let isSpectating;
    let turning = false;
    //getters
    const getInSpectateMode = () => {return isSpectating}
    const getMaxLaps = () => {return maxLaps}
    const getLap = () => {return lap}
    const getCheckpointLap = () => {  return checkPointLap}
    const getAngle = () => {return angle}
    const getDriftForce = () => {return driftForce}
    const getX = () => {return x}
    const getY = () => {return y}
    const getSpeed = () => {return speed}
    const getAngleLock = () => {return angleLock}
    const getEngineLock =() => {return engineLock}
    const getUnderSteering =() => {return underSteering}
    const getTireGrip = () => {return tireGrip};
    const getTurningSpeed = () => {return turningSpeed};
    const getAcceleration = () => {return acceleration};
    const getOnDirt = () => {return onDirt}
    const getOnWall = () => {return onWall}
    const getOnBoucne = () => {return onBounce}
    const getStats = () => {
        return [
            x.toFixed(2), //0
            y.toFixed(2), //1
            angle.facing.toFixed(2), //2
            angle.moving.toFixed(2), //3
            onDirt, //4
            driftForce.toFixed(2), //5
            speed //6
        ]
    }
    const getDt = () => {return dt}
    const getMaxSpeed = () => {return maxSpeed}
    //setters 
    const setDt = (value) => {dt = value * 16.67 * 2}
    const setAutoDrive = (newDrive) => {autoDrive = newDrive}
    const setStats = (stats) => {
        x = Number(stats[0]);
        y = Number(stats[1]);
        angle.facing = Number(stats[2]);
        angle.moving = Number(stats[3]);
        onDirt =  stats[4];
        driftForce = Number(stats[5]);
        speed = Number(stats[6]);
    }
    const setX = (value) => {x = value}
    const setY = (value) => {y = value}
    const setEngineLock = (value) => {engineLock = value}
    const setTurning = (value) => {
        value ? turnTime++ : turnTime = 0;
        turning = value;
    }
    const setAngle = (moving,facing) => {
        angle = {moving,facing}
    }
    const setSpeed = (newSpeed) => {speed = newSpeed}

    const resetValues = (inSpectateMode) => {
        isSpectating = inSpectateMode
        if(!isGhost){
            if(inSpectateMode){
                //do that ghost car shit!
                characterSprite.style.opacity = 0;
                engineLock = true;
            }
            else{
                characterSprite.style.opacity = 1;
                engineLock = false;
            }
        }
        else if(isGhost){
            engineLock = false;
        }

        speed = 0;
        angle = {
            moving: 0,
            facing: 0,
        }
        lap = 0;
        checkPointLap = 0;
        console.log("just cleared checkpoints..." , checkPointLap)
    }

    const reduceSpeed = (multiplier = 1) => { //wall/border
        speed = speed/1.25 / multiplier; 
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

    let isAccelerating = false;
    const updateAccelerating = (value) => {isAccelerating = value} 

    const updateAngleLock = () => {

        const direction = compareFacingRelativeToMoving(angle.facing, angle.moving)
        const facingAngle = angle.facing;
        const movingAngle = angle.moving;

        return (
            angleLock = {
            right: false,
            left: false
        })

        let diff;
        if (direction == 1) { //facing is right of moving Angle
            if (facingAngle - movingAngle < 0) {
                diff = facingAngle + 360 - movingAngle;
            } else {
                diff = facingAngle - movingAngle;
            }

            if (diff > 120) {
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

            if (diff > 120) {
                angleLock = {
                    right: false,
                    left: true
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
        if (Math.abs(speed) < .5 || driftForce < 1.2) {
            driftForce = 1;
        } 
        else if (driftForce > driftForceMax){
            driftForce = driftForceMax;
        }
        else if (driftForce >= 1.2) {
            driftForce -= .2 * dt;
        }
    }

    const stabalizeAngle = () => {

        //degree correction
        if (angle.facing > 360) {
            angle.facing = angle.facing - 360;
        }
        else if (angle.facing < 0) {
            angle.facing = angle.facing + 360;
        }
        if (angle.moving > 360) {
            angle.moving = angle.moving - 360;
        }
        else if (angle.moving < 0) {
            angle.moving = angle.moving + 360;
        }

        let movingAngle = angle.moving;
        let facingAngle = angle.facing;

        if (speed == 0) {
            angle.moving = angle.facing;
        } 
        else if (Math.abs(movingAngle - facingAngle) < 2) {
            angle.moving = angle.facing;
        }
        else if (movingAngle > facingAngle) {
            if((Math.abs(movingAngle - facingAngle) > 180)){ //long way home fix 
                angle.moving =  angle.moving + tireGrip * dt;
            }
            else{
                angle.moving = angle.moving - tireGrip * dt;
            }
        }
        else if (movingAngle < facingAngle) {
            if((Math.abs(movingAngle - facingAngle) > 180)){ //long way home fix 
                angle.moving = angle.moving - tireGrip * dt;
            }
            else{
                angle.moving =  angle.moving + tireGrip * dt;

            }
        }

    }

    const updateGear = () => { //turning speed & tiregrip
        switch (true) {

            case (Math.abs(speed) > 5 * maxSpeed/6):
                if(gear != 5){
                    engineTransition(gear, 5)
                }
                gear = 5;
                tireGrip = 2.2
                turningSpeed = 6
                acceleration = .060 * dt;
                break;

            case (Math.abs(speed) > 3 * maxSpeed/4):
                if(gear != 4){
                    engineTransition(gear, 4)
                }
                gear = 4;
                tireGrip = 2.7
                turningSpeed = 7
                acceleration = 0.08 * dt;
                break;

            case (Math.abs(speed) > maxSpeed/2):
                if(gear != 3){
                    engineTransition(gear, 3)
                }
                gear = 3;
                tireGrip = 3
                turningSpeed =  8
                acceleration = .12 * dt;
                break;

            case (Math.abs(speed) > maxSpeed/4):  //only barley getting here.
                if(gear != 2){
                    engineTransition(gear, 2)
                }
                gear = 2;
                tireGrip = 3.4
                turningSpeed = 9
                acceleration = .15 * dt;
                break;

            case (Math.abs(speed) > maxSpeed/6):
                if(gear != 1){
                    engineTransition(gear, 1)
                }
                gear = 1;
                tireGrip = 4
                turningSpeed = 8
                acceleration = .12 * dt;
                break;

            case (Math.abs(speed) > maxSpeed/8):
                if(gear != 1){
                    engineTransition(gear, 1)
                }
                gear = 1;
                tireGrip = 4.25
                turningSpeed = 7
                acceleration = 0.1 * dt;
                break;

            case (Math.abs(speed) > maxSpeed/16):
                if(gear != 1){
                    engineTransition(gear, 1)
                }
                gear = 1;
                tireGrip = 4.5
                turningSpeed = 6
                acceleration = 0.09 * dt;
                break;

            case (Math.abs(speed) > 0):
                if(gear != 0){
                    engineTransition(gear, 0)
                }
                gear = 0;
                tireGrip = 4.75
                turningSpeed = 5
                acceleration = 0.07 * dt;
                break;
            case (Math.abs(speed) == 0):
                if(gear != 0){
                    engineTransition(gear, 0)
                }
                gear = 0;
                tireGrip = 5
                turningSpeed = 0
                acceleration = 0.05 * dt;
                break;
            default:
                turningSpeed = 10
                break;
        }
    }

    const applyFriction = () => {
        if (Math.abs(speed) < 0.003) {
            speed = 0;
        } else if (speed > 0) {
            speed -= friction *dt;
        } else if (speed < 0) {
            speed += friction *dt;
        }
    }

    const increaseCheckPointLaps = () => {
        checkPointLap++;
    }

    const increaseLaps = () => {
        if(checkPointLap >= 2){
            generateLapIncreaseSound();
            lap++;
            checkPointLap = 0
        }
        checkGameOver(lap, maxLaps)
    }

    //car controls  

    const engageBrakes = (pressure = 1) => {

        let absSpeed = Math.abs(speed)
        if(speed > 0){

                speed -= (acceleration * 2) * pressure;
        
                if(gear > 1){
                    
                    driftForce += .3 * 2 * dt * pressure;
                }
                else{
                    driftForce += .1 * dt * pressure;
                }
        }
        else if(speed < 0){
            speed += (acceleration *  2) * pressure;
        
            if(gear > 1){
                
                driftForce += .3 * 2 * dt * pressure;
            }
            else{
                driftForce += .1 * dt * pressure ;
            }
        }

    }    


    const accelerate = ( forward) => {
        if (Math.abs(speed) <= maxSpeed && !engineLock) {
            let diff = angle.facing - angle.moving;
            if(diff < 0){
                diff += 360;
             }

            if (forward) {
                if(diff < 90 || diff > 270) {//we are facing forwards
                    speed += acceleration;
                 }
                 else{ // backwards
                    speed -= acceleration;
                 }
            } 
            else {
                if(diff < 90 || diff > 270) {//we are facing forwards
                    if(speed > 0){
                        engageBrakes()
                    }
                    else{
                        speed -= acceleration;
                    }
                 }
                 else{ // backwards
                    if(speed < 0){
                        engageBrakes()
                    }
                    else{
                        speed += acceleration;
                    }
                 }


                
            }
        }
    }

    const turn = (direction, pressure = 1) => {
        //compareAngles 

        pressure = Math.abs(pressure).toFixed(2);
        if (direction === "right" && !angleLock.right) {
            if (driftForce <= driftForceMax / 2) {
                if(isAccelerating){
                    driftForce += .271 * dt * pressure;
                }
                else{
                    driftForce += .255 * dt * pressure;
                }
            } else if (driftForce > driftForceMax / 2 && pressure > .5) {
                if(isAccelerating){
                    driftForce += .15 * dt * pressure;
                }
                else{
                    driftForce += .10 * dt * pressure;
                }
            }


            angle.facing += (turningSpeed * pressure * dt );
            angle.moving += (turningSpeed * pressure * dt ) / driftForce;


        } else if (direction === "left" && !angleLock.left) {
            if (driftForce <= driftForceMax / 2) {
                if(isAccelerating){
                    driftForce += .271 * dt * pressure;
                }
                else{
                    driftForce += .255 * dt * pressure;
                }
            } else if (driftForce > driftForceMax / 2 && pressure > .5) {
                if(isAccelerating){
                    driftForce += .15 * dt * pressure;
                }
                else{
                    driftForce += .10 * dt * pressure;
                }
            }



            angle.facing -= (turningSpeed * pressure * dt )
            angle.moving -= (turningSpeed * pressure * dt ) / driftForce;

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
        if(speed > 2){
            for(let i = speed; i >= 2;  i-=4){
                count++;
            }
            for(let c = 1; c <= count; c++){
                speedSteps.push(c * 2); //magic number for size
            }
            
        }
        speedSteps.push(speed);

        for(let speedStep of speedSteps){
            let newX = x + (speedStep * Math.cos(angle.moving * Math.PI / 180));
            let newY = y + (speedStep * Math.sin(angle.moving * Math.PI / 180));
            if(axis == "y"){
                if(mapData[Math.floor(newY / tilePixelCount)][Math.floor(x / tilePixelCount)] == value){
                    if(value== 11){}
                    return true;
                }
            }
            else if (axis == "x"){
                if(mapData[Math.floor(y / tilePixelCount)][Math.floor(newX / tilePixelCount)] == value){
                    return true;
                }
            }
        }
        return false;

    }


    const collision = (tilePixelCount, rows, columns, mapData) => {
        let newX = x + (speed * dt) * Math.cos(angle.moving * Math.PI / 180);
        let newY = y + (speed * dt) * Math.sin(angle.moving * Math.PI / 180);

        //make sure we are in map bounds

        if (inBounds(newX,newY,rows,columns,tilePixelCount)) {

            //walls
            if (collidingWithValue(1,"y",mapData,tilePixelCount)) {
                
                let tempAngle = angle.moving
                angle.moving = 360 - tempAngle;
                angle.facing = 360 - tempAngle;
                addParticle("collision_wall",.2 + (speed/10), x,y,driftForce,angle.facing)
                reduceSpeed(6)
                newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));
                if(!onWall){
                    generateCollisionSound(true)
                }
                onWall = true;
            }
            else if (collidingWithValue(1,"x",mapData,tilePixelCount)) {

                let tempAngle = angle.moving
                angle.moving = 180 - tempAngle;
                angle.facing = 180 - tempAngle;

                addParticle("collision_wall",.2 + (speed/10), x,y,driftForce,angle.facing)
                generateCollisionSound(true)
                reduceSpeed(6)
                newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));

                if(!onWall){
                    generateCollisionSound(true)
                }
                onWall = true;
            }
            else{
                onWall = false;
            }

            //dirt
            if (collidingWithValue(2,"y",mapData,tilePixelCount) || collidingWithValue(2,"x",mapData,tilePixelCount)) {
                onDirt = true;
                if(driftForce < 4){
                    driftForce = 4;
                }
                if(!isGhost){
                    if (Math.abs(speed) > 4 ) {
                        speed = speed - (Math. sign(speed) * (.30 * (dt))) ;


                        // createDirtParticle(x, y);
                    }
                    if(turning){
                    }
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
                    if (newY < y && (!isGhost || isSpectating)) {
                        increaseLaps();
                        console.log(lap);
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
                    if (newY > y && (!isGhost || isSpectating)) {
                        increaseLaps();
                    } else {
                        // lap--;
                    }

                }
                onFinish.down == false;
            }
            //checkpoint tiles 

            if (collidingWithValue(7,"x",mapData,tilePixelCount) || 
            collidingWithValue(9,"x",mapData,tilePixelCount)) { //checkPoint left
                onCheckPoint.left = true;
            } else {
                if (onCheckPoint.left == true) {
                    //exiting the finish line 
                    onCheckPoint.left = false;
                    if (newX < x && (!isGhost || isSpectating)) {
                        increaseCheckPointLaps();
                    } else {
                        // lap--;
                    }

                }
                onFinish.up == false;
            }

            if (collidingWithValue(8,"x",mapData,tilePixelCount) || 
            collidingWithValue(10,"x",mapData,tilePixelCount)) { //checkPoint right
                onCheckPoint.right = true;
            } else {
                if (onCheckPoint.right == true) {
                    //exiting the finish line 
                    onCheckPoint.right = false;
                    if (newX > x && (!isGhost || isSpectating)) {
                        increaseCheckPointLaps();
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
                addParticle("collision_bounce",1, x,y,driftForce,angle.facing)
                generateCollisionSound(false)

                newY = y + (speed * Math.sin(angle.moving * Math.PI / 180));

            }

            if (collidingWithValue(6,"x",mapData,tilePixelCount)) {
                //old bouncy collision
                let tempAngle = angle.moving
                angle.moving = 180 - tempAngle;
                angle.facing = 180 - tempAngle;

                addParticle("collision_bounce",1, x,y,driftForce,angle.facing)
                generateCollisionSound(false)

                newX = x + (speed * Math.cos(angle.moving * Math.PI / 180));

            }

            let collidingWithTutorialList = [
                collidingWithValue(11,"y",mapData,tilePixelCount)||
                collidingWithValue(11,"x",mapData,tilePixelCount),
                collidingWithValue(12,"y",mapData,tilePixelCount)||
                collidingWithValue(12,"x",mapData,tilePixelCount),
                collidingWithValue(13,"y",mapData,tilePixelCount)||
                collidingWithValue(13,"x",mapData,tilePixelCount),
                collidingWithValue(14,"y",mapData,tilePixelCount)||
                collidingWithValue(14,"x",mapData,tilePixelCount),
                collidingWithValue(15,"y",mapData,tilePixelCount)||
                collidingWithValue(15,"x",mapData,tilePixelCount),
                collidingWithValue(16,"y",mapData,tilePixelCount)||
                collidingWithValue(16,"x",mapData,tilePixelCount)            ]
            if (
                collidingWithTutorialList.findIndex(truthExpression => {
                    return (truthExpression == true)}) > -1) { //tutorial triggers
                    onTutorialIndex = collidingWithTutorialList.findIndex(truthExpression => {
                        return (truthExpression == true)
                    });
                    onTutorial = true;
            } 
            else {
                if (onTutorialIndex > -1 && onTutorial == true) {
                    //exiting the finish line 
                    pauseGame();
                    window.changeGUIScreen(`dialogue/${onTutorialIndex}`)
                    onTutorialIndex = -1;
                }
                onTutorialIndex = -1;
                onTutorial = false;
            }
            
        }

        x = newX;
        y = newY;
    }

    
    return {
        //getters
        getInSpectateMode,
        getMaxLaps,
        getLap,
        getCheckpointLap,
        getAngle,
        getDriftForce,
        getX,
        getY,
        getSpeed,
        getAngleLock,
        getEngineLock,
        getUnderSteering,
        getTireGrip,
        getTurningSpeed,
        getAcceleration,
        getOnDirt,
        getStats,
        getDt,
        getMaxSpeed,
        //setters
        setSpeed,
        setStats,
        setX,
        setY,
        setEngineLock,
        setTurning,
        setAngle,
        setDt,
        //functions
        resetValues,
        updateAngleLock,
        updateAccelerating,
        stabalizeDriftForce,
        stabalizeAngle,
        updateGear,
        applyFriction,
        turn,
        accelerate,
        engageBrakes,
        reduceSpeed,
        collision
    }
}


export default createCar;
