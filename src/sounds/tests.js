import {Howl, Howler} from 'howler';

import engineIdle from "./game/idle_engine.wav"

console.log("console test")


var engineIdleLoop = new Howl({
  src: [engineIdle],
  loop:true,
  volume:0,
  sprite: {
    main: [100,300]
  }
})

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