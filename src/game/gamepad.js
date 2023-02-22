import { getRunning } from "./main";

const haveEvents = 'ongamepadconnected' in window;
const controllers = {};
let game_pad_held_directions = [];

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
  requestAnimationFrame(getGamepadStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function getGamePadHeldDirections() {
  return game_pad_held_directions;
}
//rewrite this to return controller input.
function getGamepadStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  game_pad_held_directions = [];
  const controller = controllers[0];

  //buttons
  controller.buttons.forEach((button, i) => {
    let pressed = button === 1.0;
    let val = button;

    if (typeof button === "object") {
      pressed = val.pressed;
      val = val.value;
    }

    const pct = `${Math.round(val * 100)}%`;
    if(val){
      if(i == 6){
        console.log("slam the brakes.")
        game_pad_held_directions.unshift("down")
      }
      else if(i == 7){
        console.log("pump the gas")
        game_pad_held_directions.unshift("up")
      }
    }
  });

  //sticks
  controller.axes.forEach((axis, i) => {
    if(axis){
      if(i == 0){
        if(axis <0){
          console.log(`turn left`)
          game_pad_held_directions.unshift("left")
        }
        else{
          console.log(`turn right`)
          game_pad_held_directions.unshift("right")
        }
      }
    }
  });


  requestAnimationFrame(getGamepadStatus);
}

function scangamepads() {
  const gamepads = navigator.getGamepads();
  for (const gamepad of gamepads) {
    if (gamepad) { // Can be null if disconnected during the session
      if (gamepad.index in controllers) {
        controllers[gamepad.index] = gamepad;
      } else {
        addgamepad(gamepad);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
 setInterval(scangamepads, 500);
}

export default getGamePadHeldDirections;