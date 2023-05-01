
import { controllerCodesMap , controllerToCommandMap} from "../gui/helpers/controls";
import { getRunning } from "./main";

const haveEvents = 'ongamepadconnected' in window;
const controllers = {};
let game_pad_held_directions = [];
let full_game_pad_status = []

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
export function getFullGamePadStatus() { 
  return full_game_pad_status;
}
//rewrite this to return controller input.
function getGamepadStatus() {

  if (!haveEvents) {
    scangamepads();
  }

  game_pad_held_directions = [];
  full_game_pad_status = [
    false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,
  ]; //booleans for which value is off or on 0-> 19

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
        // window.navigateMenu("select")
        game_pad_held_directions.unshift(`nav-select`)
      }     
      else if (i == 1){
        // window.navigateMenu("back")
        if(!getRunning()){
          game_pad_held_directions.unshift(`nav-back`)
        }
      }
      else if( i == 9 || i == 8){
        // window.navigateMenu("pause")
        game_pad_held_directions.unshift(`nav-pause`)
      }
      else if( i == 3){
        // window.navigateMenu("reset")
        game_pad_held_directions.unshift(`nav-reset`)
      }


      if(controllerCodesMap.triggers.includes(i)){
          full_game_pad_status[i] = true;
          game_pad_held_directions.unshift(`${controllerToCommandMap[i].command}@${val.toFixed(2)}`)
      }
      else if(controllerCodesMap.buttons.includes(i)){
        full_game_pad_status[i] = true;
        if(controllerToCommandMap[i].command){
          game_pad_held_directions.unshift(controllerToCommandMap[i].command)
        }
      }
    }
  });

  //sticks
  controller.axes.forEach((axis, i) => {
    if(Math.abs(axis) > .025){
      if(i == 0){ //left analog, horizantal
        full_game_pad_status[18] = true;
        if(axis <0){
          //find key from controllerToCommandMap, check if that key exists on the "pressure key list" (to determine whether to send over the pressure) then throw that sucker onto the gamePadHeldDirections
          if(location.pathname != "/hidden" && Math.abs(axis) > .4){
            game_pad_held_directions.unshift(`nav-negative-horizantal`)
          }
          if(controllerCodesMap.turningStick == "leftAnalog"){
            full_game_pad_status[18] = true;
            game_pad_held_directions.unshift(`left@${axis.toFixed(2)}`)
          }
        }
        else{
          if(location.pathname != "/hidden" && Math.abs(axis) > .4){
            game_pad_held_directions.unshift(`nav-positive-horizantal`)
          }
          if(controllerCodesMap.turningStick == "leftAnalog"){
            game_pad_held_directions.unshift(`right@${axis.toFixed(2)}`)
          }
        }
      }
      if(i == 1){ //right analog, vertical
        full_game_pad_status[19] = true;
        if(location.pathname != "/hidden" && axis < 0 && Math.abs(axis) > .4){
          game_pad_held_directions.unshift(`nav-positive-vertical`)
          // window.navigateMenu("up")
        }
        else if(location.pathname != "/hidden" && axis > 0 && Math.abs(axis) > .4){
          game_pad_held_directions.unshift(`nav-negative-vertical`)
          // window.navigateMenu("down")
        }
      }
      if( i == 2){ //right analog, horizantal
        full_game_pad_status[19] = true;
        if(axis <0){
          if(controllerCodesMap.turningStick == "rightAnalog"){
            game_pad_held_directions.unshift(`left@${axis.toFixed(2)}`)
          }
        }
        else{
          if(controllerCodesMap.turningStick == "rightAnalog"){
            game_pad_held_directions.unshift(`right@${axis.toFixed(2)}`)
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