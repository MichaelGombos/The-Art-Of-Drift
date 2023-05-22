import React, {useState} from "react"
import { handleGameInputDown, handleGameInputUp } from "../../game/game";
import Button from "./button";
import IconButton from "./icon-button";

import arrowUpKey from "../../assets/keys/keyboard/arrowup.png"
import arrowDownKey from "../../assets/keys/keyboard/arrowdown.png"
import arrowLeftKey from "../../assets/keys/keyboard/arrowleft.png"
import arrowRightKey from "../../assets/keys/keyboard/arrowright.png"

const MobileControls = ({showMobileControls}) => {

  if(showMobileControls){

    return (
      <ul className="hidden-menu_controls">
        <div className="drive-controls">
          <IconButton  
          iconUrl={arrowDownKey}
          onTouchStart={(() => {
            handleGameInputDown({code: "KeyS" , preventDefault: () => {}})
          })}
          onTouchEnd={(() => {
            handleGameInputUp({code: "KeyS" , preventDefault: () => {}})
          })}
          onMouseDown={(() => {
            handleGameInputDown({code: "KeyS" , preventDefault: () => {}})
          })}
          onMouseUp={(() => {
            handleGameInputUp({code: "KeyS" , preventDefault: () => {}})
          })}
          ></IconButton>  
          <IconButton
          iconUrl={arrowUpKey}
          onTouchStart={(() => {
            handleGameInputDown({code: "KeyW" , preventDefault: () => {}})
          })}
          onTouchEnd={(() => {
            handleGameInputUp({code: "KeyW" , preventDefault: () => {}})
          })}
          onMouseDown={(() => {
            handleGameInputDown({code: "KeyW" , preventDefault: () => {}})
          })}
          onMouseUp={(() => {
            handleGameInputUp({code: "KeyW" , preventDefault: () => {}})
          })}
          ></IconButton>
        </div>  
        <div className="steer-controls">
          <IconButton
          iconUrl={arrowLeftKey}
            onTouchStart={(() => {
              handleGameInputDown({code: "KeyA" , preventDefault: () => {}})
            })}
            onTouchEnd={(() => {
              handleGameInputUp({code: "KeyA" , preventDefault: () => {}})
            })}
            onMouseDown={(() => {
              handleGameInputDown({code: "KeyA" , preventDefault: () => {}})
            })}
            onMouseUp={(() => {
              handleGameInputUp({code: "KeyA" , preventDefault: () => {}})
            })}
          ></IconButton>  
          <IconButton
            onTouchStart={(() => {
              handleGameInputDown({code: "KeyD" , preventDefault: () => {}})
            })}
            iconUrl={arrowRightKey}
            onTouchEnd={(() => {
              handleGameInputUp({code: "KeyD" , preventDefault: () => {}})
            })}
            onMouseDown={(() => {
              handleGameInputDown({code: "KeyD" , preventDefault: () => {}})
            })}
            onMouseUp={(() => {
              handleGameInputUp({code: "KeyD" , preventDefault: () => {}})
            })}
          ></IconButton>
        </div>
      </ul>
    )
  }

}

export default MobileControls;