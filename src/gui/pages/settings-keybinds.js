import React, { useEffect, useRef } from 'react';
import { commandToDirectionMap, controllerToCommandMap , commandMap, keyboardToCommandMap, DEFAULT_commandMap, DEFAULT_keyboardToCommandMap, DEFAULT_controllerToCommandMap} from '../helpers/controls.js';
import { getDirectionalCamera, getEnableGhost, getFullKeyboardHeldKeys, setDirectionalCamera} from "../../game/game.js"
import {getParticleLimit} from "../../game/graphics.js"
import DeleteGameSaveButton from '../components/delete-game-save-button.js';
import ExitSettingsButton from '../components/exit-settings-button.js';
import InputSlider from '../components/input-slider.js';
import ToggleDirectionalCameraButton from '../components/toggle-directional-camera-button.js';
import ToggleGhostCarButton from '../components/ARCHIVED__toggle-ghost-car-button.js';
import ToggleStatsButton from '../components/toggle-stats-button.js';
import ResetSettingsButton from '../components/reset-settings-button.js';
import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';

import keyboard_0 from "../../assets/keys/keyboard/0.png"
import keyboard_1 from "../../assets/keys/keyboard/1.png"
import keyboard_2 from "../../assets/keys/keyboard/2.png"
import keyboard_3 from "../../assets/keys/keyboard/3.png"
import keyboard_4 from "../../assets/keys/keyboard/4.png"
import keyboard_5 from "../../assets/keys/keyboard/5.png"
import keyboard_6 from "../../assets/keys/keyboard/6.png"
import keyboard_7 from "../../assets/keys/keyboard/7.png"
import keyboard_8 from "../../assets/keys/keyboard/8.png"
import keyboard_9 from "../../assets/keys/keyboard/9.png"

import keyboard_arrowDown from "../../assets/keys/keyboard/arrowdown.png"
import keyboard_arrowLeft from "../../assets/keys/keyboard/arrowleft.png"
import keyboard_arrowRight from "../../assets/keys/keyboard/arrowright.png"
import keyboard_arrowUp from "../../assets/keys/keyboard/arrowup.png"


import keyboard_a from "../../assets/keys/keyboard/a.png"
import keyboard_b from "../../assets/keys/keyboard/b.png"
import keyboard_c from "../../assets/keys/keyboard/c.png"
import keyboard_d from "../../assets/keys/keyboard/d.png"
import keyboard_e from "../../assets/keys/keyboard/e.png"
import keyboard_f from "../../assets/keys/keyboard/f.png"
import keyboard_g from "../../assets/keys/keyboard/g.png"
import keyboard_h from "../../assets/keys/keyboard/h.png"
import keyboard_i from "../../assets/keys/keyboard/i.png"
import keyboard_j from "../../assets/keys/keyboard/j.png"
import keyboard_k from "../../assets/keys/keyboard/k.png"
import keyboard_l from "../../assets/keys/keyboard/l.png"
import keyboard_m from "../../assets/keys/keyboard/m.png"
import keyboard_n from "../../assets/keys/keyboard/n.png"
import keyboard_o from "../../assets/keys/keyboard/o.png"
import keyboard_p from "../../assets/keys/keyboard/p.png"
import keyboard_q from "../../assets/keys/keyboard/q.png"
import keyboard_r from "../../assets/keys/keyboard/r.png"
import keyboard_s from "../../assets/keys/keyboard/s.png"
import keyboard_t from "../../assets/keys/keyboard/t.png"
import keyboard_u from "../../assets/keys/keyboard/u.png"
import keyboard_v from "../../assets/keys/keyboard/v.png"
import keyboard_w from "../../assets/keys/keyboard/w.png"
import keyboard_x from "../../assets/keys/keyboard/x.png"
import keyboard_y from "../../assets/keys/keyboard/y.png"
import keyboard_z from "../../assets/keys/keyboard/z.png"

import keyboard_backQuote from "../../assets/keys/keyboard/Backquote.png"
import keyboard_backSlash from "../../assets/keys/keyboard/backslash.png"
import keyboard_bracketLeft from "../../assets/keys/keyboard/bracketleft.png"
import keyboard_bracketRight from "../../assets/keys/keyboard/bracketright.png"
import keyboard_comma from "../../assets/keys/keyboard/comma.png"
import keyboard_equals from "../../assets/keys/keyboard/equals.png"
import keyboard_escape from "../../assets/keys/keyboard/escape.png"
import keyboard_meta from "../../assets/keys/keyboard/meta.png"
import keyboard_minus from "../../assets/keys/keyboard/minus.png"
import keyboard_period from "../../assets/keys/keyboard/period.png"
import keyboard_semicolon from "../../assets/keys/keyboard/semicolon.png"
import keyboard_slash from "../../assets/keys/keyboard/slash.png"


import keyboard_f1  from "../../assets/keys/keyboard/f1.png"
import keyboard_f2  from "../../assets/keys/keyboard/f2.png"
import keyboard_f3  from "../../assets/keys/keyboard/f3.png"
import keyboard_f4  from "../../assets/keys/keyboard/f4.png"
import keyboard_f5  from "../../assets/keys/keyboard/f5.png"
import keyboard_f6  from "../../assets/keys/keyboard/f6.png"
import keyboard_f7  from "../../assets/keys/keyboard/f7.png"
import keyboard_f8  from "../../assets/keys/keyboard/f8.png"
import keyboard_f9  from "../../assets/keys/keyboard/f9.png"
import keyboard_f10 from "../../assets/keys/keyboard/f10.png"
import keyboard_f11 from "../../assets/keys/keyboard/f11.png"
import keyboard_f12 from "../../assets/keys/keyboard/f12.png"

import controller_00 from "../../assets/keys/controller/00_a.png"
import controller_01 from "../../assets/keys/controller/01_b.png"
import controller_02 from "../../assets/keys/controller/02_x.png"
import controller_03 from "../../assets/keys/controller/03_y.png"
import controller_04 from "../../assets/keys/controller/04_bumperleft.png"
import controller_05 from "../../assets/keys/controller/05_bumperright.png"
import controller_06 from "../../assets/keys/controller/06_triggerleft.png"
import controller_07 from "../../assets/keys/controller/07_triggerright.png"
import controller_08 from "../../assets/keys/controller/08_share.png"
import controller_09 from "../../assets/keys/controller/09_menu.png"
import controller_10 from "../../assets/keys/controller/10_analogpressright.png"
import controller_11 from "../../assets/keys/controller/11_analogpressleft.png"
import controller_12 from "../../assets/keys/controller/12_dpadup.png"
import controller_13 from "../../assets/keys/controller/13_dpaddown.png"
import controller_14 from "../../assets/keys/controller/14_dpadleft.png"
import controller_15 from "../../assets/keys/controller/15_dpadright.png"
import controller_18 from "../../assets/keys/controller/18_axis_0_1.png"
import controller_19 from "../../assets/keys/controller/19_axis_2_3.png"


import { getFullGamePadStatus } from '../../game/gamepad.js';
import IconButton from '../components/icon-button.js';

const commandList = [
  "accelerate",
  "reverse",
  "turnleft",
  "turnright",
  "brake"
]

export const controllerToImageMap = {
  0 :   controller_00,
  1 :   controller_01,
  2 :   controller_02,
  3 :   controller_03,
  4 :   controller_04,
  5 :   controller_05,
  6 :   controller_06,
  7 :   controller_07,
  8 :   controller_08,
  9 :   controller_09,
  10 :  controller_10,
  11 :  controller_11,
  12 :  controller_12,
  13 :  controller_13,
  14 :  controller_14,
  15 :  controller_15,
  18 :  controller_18,
  19 :  controller_19,
}

export const keyboardToImageMap = {
  "Backspace" : false,
  "Tab" : false,
  "Enter" : false, 
  "ShiftLeft" : false,
  "ShiftRight" : false,
  "ControlLeft" : false,
  "ControlRight" : false,
  "AltLeft" : false,
  "AltRight" : false,
  "Pause" : false,
  "CapsLock" : false,
  "Escape" : keyboard_escape,
  "Space" : false,
  "PageUp" : false,
  "PageDown" : false,
  "End" : false,
  "Home" : keyboard_meta,
  "ArrowLeft" : keyboard_arrowLeft,
  "ArrowUp" : keyboard_arrowUp,
  "ArrowRight" : keyboard_arrowRight,
  "ArrowDown"  :keyboard_arrowDown,
  "PrintScreen"  : false,
  "Insert"  : false,
  "Delete"  : false,
  "Digit0"  : keyboard_0,
  "Digit1"  : keyboard_1,
  "Digit2"  :  keyboard_2,
   "Digit3" : keyboard_3,
  "Digit4"  : keyboard_4,
  "Digit5"  : keyboard_5,
  "Digit6"  : keyboard_6,
   "Digit7" : keyboard_7,
  "Digit8"  : keyboard_8,
   "Digit9" : keyboard_9,
  "KeyA"  : keyboard_a,
  "KeyB" : keyboard_b,
   "KeyC"  : keyboard_c,
  "KeyD" : keyboard_d,
   "KeyE" : keyboard_e,
  "KeyF"  : keyboard_f,
  "KeyG" : keyboard_g,
  "KeyH" : keyboard_h,
  "KeyI" : keyboard_i,
   "KeyJ" : keyboard_j,
  "KeyK" : keyboard_k,
   "KeyL" : keyboard_l,
   "KeyM" : keyboard_m,
  "KeyN" : keyboard_n,
   "KeyO" : keyboard_o,
   "KeyP"  : keyboard_p,
  "KeyQ"  : keyboard_q,
  "KeyR" : keyboard_r,
  "KeyS" : keyboard_s,
  "KeyT": keyboard_t,
   "KeyU" : keyboard_u,
  "KeyV" : keyboard_v,
  "KeyW" : keyboard_w,
  "KeyX" : keyboard_x,
  "KeyY" : keyboard_y,
  "KeyZ" : keyboard_z,
  "MetaLeft": keyboard_meta,
  "MetaRight" : keyboard_meta,
  "ContextMenu" : false,
  "Numpad0"  : keyboard_0,
   "Numpad1" : keyboard_1,
  "Numpad2"  : keyboard_2,
   "Numpad3" : keyboard_3,
   "Numpad4" : keyboard_4,
  "Numpad5"  : keyboard_5,
  "Numpad6"  : keyboard_6,
  "Numpad7"  : keyboard_7,
   "Numpad8" : keyboard_8,
  "Numpad9"  : keyboard_9,
   "NumpadMultiply": false, 
  "NumpadAdd" : false,
  "NumpadSubtract": keyboard_minus,
   "NumpadDecimal" : keyboard_period,
  "NumpadDivide": false,
  "F1" : keyboard_f1 ,
  "F2" : keyboard_f2 ,
  "F3" : keyboard_f3 ,
  "F4" : keyboard_f4 ,
  "F5" : keyboard_f5 ,
  "F6" : keyboard_f6 ,
  "F7" : keyboard_f7 ,
  "F8" : keyboard_f8 ,
  "F9" : keyboard_f9 ,
  "F10": keyboard_f10 ,
  "F11": keyboard_f11 ,
  "F12": keyboard_f12 ,
  "NumLock" : false,
  "ScrollLock" : false,
  "Semicolon": keyboard_semicolon,
  "Equal": keyboard_equals,
  "Comma": keyboard_comma,
  "Minus": keyboard_minus,
  "Period": keyboard_period,
   "Slash": keyboard_slash,
  "Backquote": keyboard_backQuote,
  "BracketLeft": keyboard_bracketLeft,
  "Backslash": keyboard_backSlash,
  "BracketRight": keyboard_bracketRight,
  "Quote": false,
}


const {useState} = React

const KeybindModifierRow = ({watchingRef,setWatchingRef, command, watchingIntervalID, setWatchingIntervalID, statefulCommandMap, setStatefulCommandMap, attemptInterval, setAttemptInterval}) => {
  const controllerPrimaryRef = useRef(null);
  const controllerSecondaryRef = useRef(null);
  const keyboardPrimaryRef = useRef(null);
  const keyboardSecondaryRef = useRef(null);
  const [iconArray,setIconArray] = useState(
    [controllerToImageMap[commandMap[command].controller.primary],
    controllerToImageMap[commandMap[command].controller.secondary],
    keyboardToImageMap[commandMap[command].keyboard.primary],
    keyboardToImageMap[commandMap[command].keyboard.secondary]])
  let watching = false;

    useEffect( () => {
      console.log("controls changed or sumn...", commandMap)

      setIconArray([controllerToImageMap[commandMap[command].controller.primary],
        controllerToImageMap[commandMap[command].controller.secondary],
        keyboardToImageMap[commandMap[command].keyboard.primary],
        keyboardToImageMap[commandMap[command].keyboard.secondary]])
    }, [ attemptInterval])


  const startWatchingInput = (reference, command,isController,isPrimary) => {
    setTimeout(() => {
      watching = true;
      //activate the active style on ref
      let activeButtonIndex
      let activeKeyboardCode
      let tempIntervalId = setInterval(() => {
        if(watching){
  
          if(isController){
            activeButtonIndex = getFullGamePadStatus().findIndex(status => {
              return status == true;
            })
            if(activeButtonIndex != -1){
              //clear the last key that used this button
              let oldCommandButtonIndex = commandMap[command][isController ? "controller" : "keyboard"][isPrimary ? "primary" :"secondary"] ;
              controllerToCommandMap[oldCommandButtonIndex].command = ""
              //set a new key to use the button
              controllerToCommandMap[activeButtonIndex].command = commandToDirectionMap[command]
              commandMap[command][isController ? "controller" : "keyboard"][isPrimary ? "primary" :"secondary"] = activeButtonIndex
              localStorage.setItem("commandMap", JSON.stringify(commandMap));
              localStorage.setItem("controllerToCommandMap", JSON.stringify(controllerToCommandMap));
              
              console.log(`Just updated command ${command} on the ${isController ? "controller" : "keyboard" } ${isPrimary ? "primary" : "secondary"} key` )
              stopWatchingInputs(reference);
              
              setStatefulCommandMap(commandMap)
            }
          }
          else{
            //keyboard shenannigans
            activeKeyboardCode = getFullKeyboardHeldKeys()[0];
            if(activeKeyboardCode){
              //clear the last key that used this button
              let oldCommandKeyCode = commandMap[command][isController ? "controller" : "keyboard"][isPrimary ? "primary" :"secondary"] ;
              keyboardToCommandMap[oldCommandKeyCode] = ""
              //set a new key to use the button
              keyboardToCommandMap[activeKeyboardCode] = commandToDirectionMap[command]
              commandMap[command][isController ? "controller" : "keyboard"][isPrimary ? "primary" :"secondary"] = activeKeyboardCode
              localStorage.setItem("commandMap", JSON.stringify(commandMap));
              localStorage.setItem("keyboardToCommandMap", JSON.stringify(keyboardToCommandMap));
              
              console.log(`Just updated command ${command} on the ${isController ? "controller" : "keyboard" } ${isPrimary ? "primary" : "secondary"} key` )
              stopWatchingInputs(reference);
              
              setStatefulCommandMap(commandMap)            
            }
          }
  
        }
  
      }, 20)
      setWatchingIntervalID(tempIntervalId)
      console.log("creating interval", tempIntervalId)
    }, 100) //just enough of a delay so that the enter key isn't always selected on controller/keyboard navigation
 
  }
  window.stopWatchingInputs = () => {
    stopWatchingInputs();
  }
  const handleModifierPress = (reference, command, isController, isPrimary) => (e) => {
    clearInterval(watchingIntervalID);
    console.log("clearing interval " , watchingIntervalID)
    console.log("modifier press", watchingRef, reference, command, isController, isPrimary)
    watchingRef ? watchingRef.current.classList.remove("key-display-active") : ""
    reference.current.classList.add("key-display-active")
    startWatchingInput(reference, command, isController, isPrimary)
    setWatchingRef(reference)
    e.stopPropagation();
  }
  
  const stopWatchingInputs = (reference = watchingRef) => {
    //take unique interval ID and stop watching forever :D
    console.log("so what yall watching then?", watchingRef, reference)
      watchingRef && watchingRef.current ?  watchingRef.current.classList.remove("key-display-active") : ""
      reference && reference.current ? reference.current.classList.remove("key-display-active") : ""
      watching = false;

      console.log("clearing interval " , watchingIntervalID)
      clearInterval(watchingIntervalID);
      setAttemptInterval(attemptInterval+1)
  }
  return (
    <div className="horizantal-navigation-menu keybind-list-grid ">
      <p>{command}</p>
      <div  className='horizantal-navigation-menu controller-displays row'>
        <IconButton style="key-selector" iconUrl={iconArray[0]} zref={controllerPrimaryRef} clickHandler = {handleModifierPress(controllerPrimaryRef, command, true, true)} className='primary-display'>
          {/* <p className="text-shade-0">{commandMap[command].controller.primary}</p> */}
        </IconButton>
        <IconButton style="key-selector"  iconUrl={iconArray[1]} clickHandler = {handleModifierPress(controllerSecondaryRef, command, true, false)} zref={controllerSecondaryRef} className='secondary-display'>
          {/* <p className="text-shade-0" > {commandMap[command].controller.secondary}</p> */}
          </IconButton>
      </div>
      <div className='horizantal-navigation-menu keyboard-displays  row'>
        <IconButton style="key-selector" iconUrl={iconArray[2] } clickHandler = {handleModifierPress(keyboardPrimaryRef, command, false, true)} zref={keyboardPrimaryRef} className='primary-display'>
          {iconArray[2] ? "" : <p className="text-shade-0">{statefulCommandMap[command].keyboard.primary}</p>}</IconButton>
        <IconButton style="key-selector" iconUrl={iconArray[3]} clickHandler = {handleModifierPress(keyboardSecondaryRef, command, false, false)} zref={keyboardSecondaryRef} className='secondary-display'>
        {iconArray[2] ? "" : <p className="text-shade-0">{statefulCommandMap[command].keyboard.secondary}</p>}</IconButton>
      </div>
     </div>
  )
}


const SettingsKeybinds = ({}) => {
  const navigate = useNavigate();

  const [statefulCommandMap, setStatefulCommandMap] = useState(commandMap);
  const [watchingRef,setWatchingRef] = useState();
  const [watchingIntervalID,setWatchingIntervalID ] = useState();
  const [attemptInterval, setAttemptInterval] = useState(0)
  let [newDirectionalCamera, setNewDirectionalCamera] = useState(getDirectionalCamera())

  const handleResetDefault = () => {
    setStatefulCommandMap(DEFAULT_commandMap)
    Object.assign(commandMap, JSON.parse(JSON.stringify(DEFAULT_commandMap)))
    Object.assign(keyboardToCommandMap, JSON.parse(JSON.stringify(DEFAULT_keyboardToCommandMap)))
    Object.assign(controllerToCommandMap, JSON.parse(JSON.stringify(DEFAULT_controllerToCommandMap)))
    localStorage.setItem("commandMap","")
    localStorage.setItem("keyboardToCommandMap","")
    localStorage.setItem("controllerToCommandMap","")
    setAttemptInterval(attemptInterval+1)
  }

  return (

    <div onClick={() => window.stopWatchingInputs()} className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center ">
          <h1 className="f-h1">Keybinds</h1>
          <div  className="vertical-navigation-menu col-4 align-center gap-md vertical-navigation-menu">
            <p>Click on a key, then click on any button on your controller or keyboard to setup a new control.</p>
            {/* <Button style="primary" clickHandler={(() => console.log("edit button"))}>edit</Button> */}
              <div className="vertical-navigation-menu col-6 gap-md">
                <div className="f-p2 text-secondary-500 keybind-list-grid">
                  <h2>Command</h2>
                  <h2>Controller key</h2>
                  <h2>Keyboard key</h2>
                </div>
                {commandList.map( command => {
                  return (
                    <KeybindModifierRow watchingRef={watchingRef} statefulCommandMap={statefulCommandMap}  setStatefulCommandMap={setStatefulCommandMap} setWatchingRef={setWatchingRef} command={command} watchingIntervalID={watchingIntervalID} setWatchingIntervalID={setWatchingIntervalID} setAttemptInterval={setAttemptInterval} attemptInterval={attemptInterval}/>
                  )
                })}
              </div>
            <Button style="danger" clickHandler={handleResetDefault}>Reset to default</Button>
            <Button clickHandler={(() => navigate(-1))}>Exit</Button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default SettingsKeybinds;