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
      if(i == 0){
        window.navigateMenu("select")
      }     
      else if (i == 1){
        window.navigateMenu("back")
      }
      else if( i == 9 || i == 8){
        window.navigateMenu("pause")
      }
      else if( i == 3){
        window.navigateMenu("reset")
      }
      else if (i == 6){
        game_pad_held_directions.unshift(`down@${val}`)
      }
      else if(i == 7){
        game_pad_held_directions.unshift(`up@${val}`)
      }
    }
  });

  //sticks
  controller.axes.forEach((axis, i) => {
    if(Math.abs(axis) > .05){
      if(i == 0){
        if(axis <0){
          game_pad_held_directions.unshift(`left@${axis}`)
        }
        else{
          game_pad_held_directions.unshift(`right@${axis}`)
        }
      }
      if(i == 1){
        if(axis < 0){
          if(!getRunning()){
            window.navigateMenu("up")
          }
        }
        else{
          if(!getRunning()){
            window.navigateMenu("down")
          }
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