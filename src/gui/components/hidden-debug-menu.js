import React, {useState} from "react"

import Button from "./button"
import InputSlider from "./input-slider"
const DebugCameraMenu = ({setShowDebugMenu}) => {
  return (
    <div className="hidden-menu__debug-menu col-6" >
      <p className="f-p2">Camera menu</p>
      <div className="row gap-sm">
        <div className="col-3 gap-md">
        <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    Zoom
    </InputSlider>

    <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    fly speed
    </InputSlider>


    <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    x position
    </InputSlider>


    <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    y position
    </InputSlider>


    <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    game speed
    </InputSlider>


    <InputSlider 
  newValue={22} 
  setter={() => {console.log("whoops")}}
  minimum={0}
  maximum={100}>
    game time
    </InputSlider>

        </div>
        <div className="col-3 gap-sm">
        <Button
    clickHandler={()=> {console.log("hi")}}
    >
      hide car menu
    </Button>
    <Button
    clickHandler={()=> {console.log("hi")}}
    >
      hide teleport menu
    </Button>
    <Button
    clickHandler={()=> {console.log("hi")}}
    >
      free cam on/off
    </Button>
    <Button
    clickHandler={()=> {console.log("hi")}}
    >
      play/pause
    </Button>
    <Button
    clickHandler={()=> {console.log("hi")}}
    >
      seek to start
    </Button>
    <Button
    clickHandler={()=> {console.log("hi")}}
    >
      seek to end
    </Button>

    <Button
    clickHandler={()=> {setShowDebugMenu(false)}}
    >
      close
    </Button>
  </div>
          </div>
      </div>


  )
}

const DebugMenu = ({setShowDebugMenu}) => {

  
  return (
    <DebugCameraMenu setShowDebugMenu={setShowDebugMenu}/>
  )
}

export default DebugMenu;