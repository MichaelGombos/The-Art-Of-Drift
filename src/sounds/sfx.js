/*
Sound sources

CAR SOUNDS
    Engine idleidle noise (not moving)
    https://freesound.org/people/oldazatloukal/sounds/408896/ 
    https://freesound.org/people/gladkiy/sounds/332385/ 
    Engine idle noise (accelerating [changes in noise based on speed])
    Engine acceleration layer 2 noise? (increases in noise based on accel)
    https://freesound.org/people/Soundholder/sounds/425630/ 

    Tire skidding on the road
    https://opengameart.org/content/car-tire-squeal-skid-loop 
    https://freesound.org/search/?q=tire+skid&f=duration%3A%5B0+TO+*%5D&w=&s=Automatic+by+relevance&advanced=1&g=1 
    drifting on road
    https://freesound.org/people/InspectorJ/sounds/345561/ 
    Driving on dirt
    https://freesound.org/people/seth-m/sounds/341069/ 
    Colliding with wall
    https://freesound.org/people/squareal/sounds/237375/ 
    https://freesound.org/people/FeliUsers/sounds/682370/ 
    Colliding with bumper
    https://freesound.org/people/magnuswaker/sounds/523088/ 
    https://freesound.org/people/martian/sounds/19347/ 
    Max speed
    https://freesound.org/people/JoelAudio/sounds/136542/ 
    https://freesound.org/people/Halleck/sounds/19487/

GAME SOUNDS
    Countdown timer
    https://freesound.org/people/steel2008/sounds/231277/ 
    https://freesound.org/people/Robinhood76/sounds/97879/ 
    Lap increase
    https://freesound.org/people/Benboncan/sounds/66952/ 
    Race finish
    https://freesound.org/people/jayfrosting/sounds/333404/ 

GUI SOUNDS
    Hover(mouse)/Navigate to action(keyboard/controller)
    https://freesound.org/people/Andreas.Mustola/sounds/255764/ 
    https://freesound.org/people/NenadSimic/sounds/171697/ 
    Click/action taken
    https://freesound.org/people/NHumphrey/sounds/204466/ 
    https://freesound.orhttps://freesound.org/people/NHumphrey/sounds/204466/g/people/KenRT/sounds/392624/ 
    Checkbox 
    https://freesound.org/people/FillSoko/sounds/257958/ 
    Disabled click/ Disabled action
    https://freesound.org/people/suntemple/sounds/249300/ 
    Pause game
    https://freesound.org/people/Wagna/sounds/326418/ 
*/

import {Howl, Howler} from 'howler';
//car
import engineIdle from "./sfx/idle_engine.wav"
import roadSkid  from "./sfx/tires_squal_loop.wav"
import roadDrift from "./sfx/drifting on the road.wav"
import dirtDrive from "./sfx/driving on gravel road.wav"
import maxSpeed  from "./sfx/max speed on.flac"
import collisionBounce from "./sfx/collision_bounce.wav"
import collisionWall from "./sfx/sqeal then crash.wav"
//game
import countdown from "./sfx/countdown.wav"
import lapIncrease from "./sfx/lapincrease.wav"
import raceFinish from "./sfx/racefinish.wav"
//gui
import mouseHover from "./sfx/mousehover.mp3"
import mouseClick from "./sfx/mouseclick.wav"
import pauseOpen from "./sfx/pause.wav"
import errorClick from "./sfx/errorclick.wav"
import checkBoxClick from "./sfx/checkbox.wav"
import "../sounds/music.js"
import { getRunning } from '../game/main';

let SFXMultiplier = localStorage.getItem("SFXMultiplier") > 0 ? JSON.parse(localStorage.getItem("SFXMultiplier")) / 100  :  1;


let unMutedSFXMultiplier = 0;

let currentEngineIndex = 0;

export const updateSFXLocation = () => {
  if(location.pathname !== "/hidden"){
    engineIdleLoop.mute(true)
  }
  else{
    engineIdleLoop.mute(false)
  }
}

export const setSFXMultiplier = (newMultiplier) => {
  SFXMultiplier = newMultiplier / 100; 
  // this should also unmute the SFX multiplier
}

export const muteSFXMultiplier = () => {
  unMutedSFXMultiplier = SFXMultiplier;
  SFXMultiplier = 0;
  engineIdleLoop.volume(0, engineIdIdleList[currentEngineIndex]);
}


export const unmuteSFXMultiplier = () => {
  SFXMultiplier = unMutedSFXMultiplier;
  getRunning() ?   engineIdleLoop.volume(SFXMultiplier, engineIdIdleList[currentEngineIndex]) : ""
}

window.muteSFX = muteSFXMultiplier;
window.unmuteSFX = unmuteSFXMultiplier;

Window.setSFX = setSFXMultiplier;

export const  getSFXMultiplier = () => {
  return SFXMultiplier; 
}

const checkBoxClickSound = new Howl ({
  src: [checkBoxClick],
  loop:false,
  volume:2,
  sprite : {
    'turning-on' : [2000, 200],
    'turning-off' : [4000,300]
  },
  preload:false
})

const errorClickSound = new Howl ({
  src: [errorClick],
  loop:false,
  volume:2,
  preload:false
})

const pauseOpenSound = new Howl ({
  src: [pauseOpen],
  loop:false,
  volume:2,
  preload:false
})

const mouseClickSound = new Howl ({
  src: [mouseClick],
  loop:false,
  volume:2,
  sprite: {
    main: [200, 1000]
  },
  preload:false
})

const mouseHoverSound = new Howl ({
  src: [mouseHover],
  loop:false,
  volume:2,
  preload:false
})

const raceFinishSound = new Howl ({
  src: [raceFinish],
  loop:false,
  volume:.5,
  preload:false
})

const lapIncreaseSound = new Howl ({
  src: [lapIncrease],
  loop:false,
  volume:1,
  preload:false
})

const countdownSound = new Howl({
  src: [countdown],
  loop:false,
  volume:.2,
  sprite: {
    0 : [ 0 , 500],
    1 : [500, 500 ],
    2 : [1160, 600],
    3 : [1800, 800]
  },
  preload:false
})

const collisionWallSound = new Howl({
  src: [collisionWall] ,
  loop: false,
  volume: 1,
  sprite: {
    main : [400,5000]
  },
  preload:false
})

const collisionBounceSound = new Howl({
  src: [collisionBounce] ,
  loop: false,
  volume: 1,
  preload:false
})

const maxSpeedSound = new Howl({
  src: [maxSpeed],
  loop:false,
  volume:.5,
  preload:false
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
  currentEngineIndex = index2;
  engineIdleLoop.fade(.2 * SFXMultiplier,0, 2000, engineIdIdleList[index1])
  engineIdleLoop.fade(0,.2 * SFXMultiplier, 2000, engineIdIdleList[index2])
}
export const tireSqualTransition = (start,end) => {
  roadSkidLoop.fade(start * SFXMultiplier,end * SFXMultiplier,2000)
}
export const dirtDriveTempoUpdate = (tempo) => {
  dirtDriveLoop.rate(tempo)
}
window.tireSqualTransition = tireSqualTransition;
//TODO function that stops all game sounds. on pause/unpause?

window.engineStop = () => {
  for(let sound of engineIdIdleList){
    engineIdleLoop.stop(sound);
  }
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
    collisionWallSound.load();
    collisionWallSound.play("main");
    collisionWallSound.volume(.2 * SFXMultiplier)
  }
  else{
    collisionBounceSound.load();
    collisionBounceSound.play();
    collisionBounceSound.volume(.2 * SFXMultiplier)
  }
}

export const generateCountdownSound = (index) => {
  countdownSound.load(String(index))
  countdownSound.play(String(index));
  countdownSound.volume(.2 * SFXMultiplier)
}
export const generateRaceFinishSound = () => {
  raceFinishSound.load();
  raceFinishSound.play();
  raceFinishSound.volume(.2 * SFXMultiplier)
}
export const generateLapIncreaseSound = () => {
  lapIncreaseSound.load();
  lapIncreaseSound.play();
  lapIncreaseSound.volume(.2 * SFXMultiplier)
}

window.countdown = generateCountdownSound

export const generateFrameSounds = (speed, x,y ,driftForce, onDirt,angle) => {

  if(speed > 9){
    if(!isAtMaxSpeed){
      isAtMaxSpeed = true;
      maxSpeedSound.load() 
      maxSpeedSound.play() // will eventually have limiter so this isn't spammed..
      maxSpeedSound.volume(.2 * SFXMultiplier)
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
      dirtDriveLoop.volume(.2 * SFXMultiplier)
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
        roadSkidLoop.volume(.2 * SFXMultiplier)
        //make skidding on dirt sound
      }
      tireSqualTransition(currentSkiddingVolume, Number((driftForce / 7).toFixed(2)))
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

//gui

export const generateMouseHoverSound = () => {
  mouseHoverSound.load();
  mouseHoverSound.play();
  mouseHoverSound.volume(.2 * SFXMultiplier)
}

export const generateMouseClickSound = () => {
  mouseClickSound.load("main") 
  mouseClickSound.play("main") //main
  mouseClickSound.volume(.2 * SFXMultiplier)
}

export const generatePauseSound = () => {
  pauseOpenSound.load();
  pauseOpenSound.play();
  pauseOpenSound.volume(.2 * SFXMultiplier)
}

export const generateErrorClickSound = () => {
  errorClickSound.load()
  errorClickSound.play()
  errorClickSound.volume(.2 * SFXMultiplier)
}

export const generateCheckBoxClickSound = (isChecked) => {
  checkBoxClickSound.load(!isChecked ? "turning-on" : "turning-off")
  checkBoxClickSound.play(!isChecked ? "turning-on" : "turning-off")
  checkBoxClickSound.volume(.2 * SFXMultiplier)
}

export const muteAllGameSounds = () => {
  collisionWallSound.mute(true)
  collisionBounceSound.mute(true)
  maxSpeedSound.mute(true)
  dirtDriveLoop.mute(true)
  roadSkidLoop.mute(true)
  engineIdleLoop.mute(true)
}

export const unmuteAllGameSounds = () => {
  collisionWallSound.mute(false)
  collisionBounceSound.mute(false)
  maxSpeedSound.mute(false)
  dirtDriveLoop.mute(false)
  roadSkidLoop.mute(false)
  engineIdleLoop.mute(false)
}

window.type = generateCheckBoxClickSound