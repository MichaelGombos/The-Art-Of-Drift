import {Howl, Howler} from 'howler';

import engineIdle from "./game/idle_engine.wav"
import roadSkid  from "./game/tires_squal_loop.wav"
import roadDrift from "./game/drifting on the road.wav"
import dirtDrive from "./game/driving on gravel road.wav"
import maxSpeed  from "./game/max speed on.flac"
import collisionBounce from "./game/collision_bounce.wav"
import collisionWall from "./game/sqeal then crash.wav"

import countdown from "./game/countdown.wav"
import lapIncrease from "./game/lapincrease.wav"
import raceFinish from "./game/racefinish.wav"

console.log("console test", engineIdle,
roadSkid  ,
roadDrift ,
dirtDrive ,
maxSpeed  )

const raceFinishSound = new Howl ({
  src: [raceFinish],
  loop:false,
  volume:.5,
})

const lapIncreaseSound = new Howl ({
  src: [lapIncrease],
  loop:false,
  volume:1,
})

const countdownSound = new Howl({
  src: [countdown],
  loop:false,
  volume:1,
  sprite: {
    0 : [ 0 , 500],
    1 : [500, 500 ],
    2 : [1160, 600],
    3 : [1800, 800]
  }
})

const collisionWallSound = new Howl({
  src: [collisionWall] ,
  loop: false,
  volume: 1,
  sprite: {
    main : [400,5000]
  }
})

const collisionBounceSound = new Howl({
  src: [collisionBounce] ,
  loop: false,
  volume: 1
})

const maxSpeedSound = new Howl({
  src: [maxSpeed],
  loop:false,
  volume:.5
})

const dirtDriveLoop = new Howl({
  src: [dirtDrive],
  loop:true,
  volume:.5
})
// dirtDriveLoop.rate(4);
//rate *4 for top speed..

const roadSkidLoop = new Howl({
  src: [roadSkid],
  loop:true,
  volume:0
}) 


const engineIdleLoop = new Howl({
  src: [engineIdle],
  loop:true,
  volume:0,
  sprite: {
    main: [100,300]
  }
})

roadSkidLoop.play();


let engine_0 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_0);
engineIdleLoop.rate(.7, engine_0);

let engine_1 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_1);
engineIdleLoop.rate(1, engine_1);

let engine_2 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_2);
engineIdleLoop.rate(1.2, engine_2);

let engine_3 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_3);
engineIdleLoop.rate(1.4, engine_3);

let engine_4 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_4);
engineIdleLoop.rate(1.5, engine_4);

let engine_5 = engineIdleLoop.play('main');
engineIdleLoop.volume(0, engine_5);
engineIdleLoop.rate(1.6, engine_5);

let engineIdIdleList = [engine_0, engine_1, engine_2, engine_3, engine_4, engine_5]

// setTimeout(() => {
//   engineIdleLoop.fade(1, 0, 1000, id1);
//   engineIdleLoop.fade(0, 1, 1000, id2);
// }, 3000) 

export const engineTransition = (index1, index2) => { //dec vol s1 inc vol s2
  engineIdleLoop.fade(.2,0, 2000, engineIdIdleList[index1])
  engineIdleLoop.fade(0,.2, 2000, engineIdIdleList[index2])
}
export const tireSqualTransition = (start,end) => {
  roadSkidLoop.fade(start,end,2000)
}
export const dirtDriveTempoUpdate = (tempo) => {
  dirtDriveLoop.rate(tempo)
}
window.tireSqualTransition = tireSqualTransition;
//TODO function that stops all game sounds. on pause/unpause?

window.engineStop = () => {
  for(let sound of engineIdIdleList){
    engineIdleLoop.stop(sound);
    console.log(sound);
  }
  console.log("hello.")
}

window.engineTransition = engineTransition;

//when the car spawns in , the engine will be running

//when the car starts accelerating, the idle loop will speed up to the 2nd phase

//hmmm

//bascially car will have 6 gears + idle
//the current gear is an integer (with 0 begin the end)
let isAtMaxSpeed = false;
let isDriftingOnRoad = false;
let isDrivingOnDirt = false;
let isSkiddingOnRoad = false;

let currentMaxSpeedVolume = 0;
let currentDriftingRoadVolume = 0;
let currentDrivingDirtVolume = 0;
let currentSkiddingVolume = 0;
export const generateCollisionSound = (isWall) => {
  if(isWall){
    collisionWallSound.play("main");
  }
  else{
    collisionBounceSound.play();
  }
}

export const generateCountdownSound = (index) => {
  countdownSound.play(String(index));
}
export const generateRaceFinishSound = () => {
  raceFinishSound.play();
}
export const generateLapIncreaseSound = () => {
  lapIncreaseSound.play();
}
window.countdown = generateCountdownSound

export const generateFrameSounds = (speed, x,y ,driftForce, onDirt,angle) => {

  if(speed > 9){
    if(!isAtMaxSpeed){
      isAtMaxSpeed = true;
      maxSpeedSound.play() // will eventually have limiter so this isn't spammed..
      //make max speed sound

    }
  }
  else{
    isAtMaxSpeed = false;
  }
  if(speed > 0 && onDirt){
    if(!isDrivingOnDirt){
      isDrivingOnDirt = true;
      dirtDriveLoop.play();
      //make driving on dirt sound
    }
    dirtDriveTempoUpdate(1 + (speed * 4 / 10)) //10 is a magic int for maxspeed 
  }
  else{
    isDrivingOnDirt = false;
    dirtDriveLoop.stop();
  }
  if (driftForce > 4.5 && !onDirt) {
      // createDriftParticle(x, y, driftForce, angle);
      if(!isSkiddingOnRoad){
        isSkiddingOnRoad = true;
        roadSkidLoop.play();
        //make skidding on dirt sound
      }
      tireSqualTransition(currentSkiddingVolume, Number((driftForce / 7).toFixed(2)))
      console.log(currentSkiddingVolume, Number((driftForce / 7).toFixed(2)))
      currentSkiddingVolume = ((driftForce - 4.5)/3).toFixed(2)

      if(driftForce > 5){
        if(!isDriftingOnRoad){
          isDriftingOnRoad = true;
          //make drifting on road sound
          
        }
      }
      else{
        isDriftingOnRoad = false;
      }

  }
  else{
    isSkiddingOnRoad = false;
    roadSkidLoop.stop();
  }
 
}