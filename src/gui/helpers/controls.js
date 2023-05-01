//on load I should pull this information from local storage?

export const commandList = [
  "accelerate",
  "reverse",
  "turnleft",
  "turnright",
  "brake"
]

export const commandToDirectionMap = {
  accelerate: "up",
  reverse: "down",
  turnleft: "left",
  turnright: "right",
  brake: "brake"
}

export const DEFAULT_keyboardToCommandMap = {
  "Backspace" : "",
  "Tab" : "",
  "Enter" : "", 
  "ShiftLeft" : commandToDirectionMap.brake,
  "ShiftRight" : "",
  "ControlLeft" : "",
  "ControlRight" : "",
  "AltLeft" : "",
  "AltRight" : "",
  "Pause" : "",
  "CapsLock" : "",
  "Escape" : "",
  "Space" : commandToDirectionMap.brake,
  "PageUp" : "",
  "PageDown" : "",
  "End" : "",
  "Home" : "",
  "ArrowLeft" : commandToDirectionMap.turnleft,
  "ArrowUp" : commandToDirectionMap.accelerate,
  "ArrowRight" : commandToDirectionMap.turnright,
  "ArrowDown"  : commandToDirectionMap.reverse,
  "PrintScreen"  : "",
  "Insert"  : "",
  "Delete"  : "",
  "Digit0"  : "",
  "Digit1"  : "",
  "Digit2" : "",
   "Digit3" : "",
  "Digit4"  : "",
  "Digit5"  : "",
  "Digit6" : "",
   "Digit7"  : "",
  "Digit8" : "",
   "Digit9"  : "",
  "KeyA"  : commandToDirectionMap.turnleft,
  "KeyB" : "",
   "KeyC"  : "",
  "KeyD" : commandToDirectionMap.turnright,
   "KeyE" : "",
  "KeyF"  : "",
  "KeyG" : "",
  "KeyH" : "",
  "KeyI" : "",
   "KeyJ" : "",
  "KeyK" : "",
   "KeyL" : "",
   "KeyM" : "",
  "KeyN" : "",
   "KeyO" : "",
   "KeyP"  : "",
  "KeyQ"  : "",
  "KeyR" : "",
  "KeyS" : commandToDirectionMap.reverse,
  "KeyT": "",
   "KeyU" : "",
  "KeyV" : "",
  "KeyW" : commandToDirectionMap.accelerate,
  "KeyX" : "",
  "KeyY" : "",
  "KeyZ" : "",
  "MetaLeft": "",
  "MetaRight" : "",
  "ContextMenu" : "",
  "Numpad0": "",
   "Numpad1" : "",
  "Numpad2": "",
   "Numpad3": "",
   "Numpad4": "",
  "Numpad5" : "",
  "Numpad6" : "",
  "Numpad7": "",
   "Numpad8" : "",
  "Numpad9": "",
   "NumpadMultiply": "", 
  "NumpadAdd" : "",
  "NumpadSubtract": "",
   "NumpadDecimal" : "",
  "NumpadDivide": "",
   "F1": "",
   "F2" : "",
  "F3" : "",
  "F4": "",
   "F5": "",
   "F6" : "",
  "F7" : "",
  "F8" : "",
  "F9" : "",
  "F10" : "",
  "F11": "",
   "F12" : "",
  "NumLock" : "",
  "ScrollLock" : "",
  "Semicolon": "",
  "Equal": "",
  "Comma": "",
  "Minus": "",
  "Period": "",
   "Slash": "",
  "Backquote": "",
  "BracketLeft": "",
  "Backslash": "",
  "BracketRight": "",
  "Quote": "",
}

export const DEFAULT_commandMap =  {
  // holds icon, current primary control, and current secondary control (both controller and m&k)
  accelerate : {
    keyboard : {
      primary : "KeyW",
      secondary : "ArrowUp"
    },
    controller : {
      primary : 7, //right trigger
      secondary : 12 //dpad up
    }
  },
  reverse : {
    keyboard : {
      primary : "KeyS",
      secondary : "ArrowDown"
    },
    controller : {
      primary : 6, //left trigger
      secondary : 13 //dpad down
    }
  },
  brake : {
    keyboard : {
      primary : "Shift",
      secondary : "Space"
    },
    controller : {
      primary : 1, //b button
      secondary :4 // left bumper
    }
  },
  "turnleft" : {
    keyboard : {
      primary : "KeyA",
      secondary : "ArrowLeft"
    },
    controller : {
      primary : 18, //left analog stick
      secondary :14 //dpad leftt
    }
  },
  "turnright" : {
    keyboard : {
      primary : "KeyD",
      secondary : "ArrowRight"
    },
    controller : {
      primary : 18, //left analog stick
      secondary : 15 //dpad right
    }
  }
}
// localStorage.getItem("commandMap") ? JSON.parse(localStorage.getItem("commandMap")) :
export const DEFAULT_controllerToCommandMap = {
  0 : {
    command : "",
    buttonName : "a button"
  }, 
  1 : {
    command : commandToDirectionMap.brake,
    buttonName : "b button"
  },
  2 :{
    command:"",
    buttonName : "x button"
   },
    // x button
  3 : {
    command:"",
    buttonName: "y button"
   }, // y button
  4 : {
    command: commandToDirectionMap.brake,
    buttonName: "left bumper"
    },  // lb button
  5: {
    command: "",
    buttonName : "right bumper"
   }, // rb button
  6: {
    command: commandToDirectionMap.reverse,
    buttonName : "left trigger"
  }, //left trigger
  7: {
    command: commandToDirectionMap.accelerate,
    buttonName : "right trigger"
  }, // right trigger
  8: {
    command: "",
    buttonName : "share"
  }, // share
  9:  {
    command: "",
    buttonName : "menu"
  }, // menu
  10: {
    command:"",
    buttonName: "right analog press"
  }, // analog press right
  11: {
    command : "",
    buttonName: "left analog press"
  }, // analog press left
  12: {
    command: commandToDirectionMap.accelerate,
    buttonName : "dpad up"
   }, // dpad up
  13: {
    command: commandToDirectionMap.reverse,
    buttonName : "dpad down"
  },
     // dpad down
  14: {
    command: commandToDirectionMap.turnleft,
    buttonName : "dpad left"
   }, // dpad left
  15: {
    command: commandToDirectionMap.turnright,
    buttonName:"dpad right"
   }, // dpad right
   16: {
    command:"",
    buttonName:"home"
   }, // dpad right
   17: {
    command:"",
    buttonName:"share"
   }, // dpad right
  //skip
  18:{
    command:"",
    buttonName:"left analog stick"
  }, //axis 0,1 (left analog stick)
  19: {
    command:"",
    buttonName:"right analog stick" 
  }//axis 2,3 (right analog stick)
}

export const commandMap = localStorage.getItem("commandMap") ? JSON.parse(localStorage.getItem("commandMap")) : JSON.parse(JSON.stringify(DEFAULT_commandMap));

export const keyboardToCommandMap = localStorage.getItem("keyboardToCommandMap") ? JSON.parse(localStorage.getItem("keyboardToCommandMap")) : JSON.parse(JSON.stringify(DEFAULT_keyboardToCommandMap));

export const controllerToCommandMap = localStorage.getItem("controllerToCommandMap") ? JSON.parse(localStorage.getItem("controllerToCommandMap")) : JSON.parse(JSON.stringify(DEFAULT_controllerToCommandMap));

export const controllerCodesMap = {
  turningStick : "leftAnalog", //empty if using buttons to turn instead
  buttons : [0,1,2,3,4,5,8,9,10,11,12,13,14,15,17] ,//not sure what 19 is.. maybe the home button?
  triggers : [6,7],
  axels : [0,1,2,3] //will have code to check if triggers or axels are the ones being affected, and allow a "pressure" value to be sent to the input
}