import React, {useEffect, useState} from "react"
import { getCosmeticPause, getFreecam, getFreecamLocation, getGhostStep, getPlayDirection, getShortestGhostReplayLength, getSmoothReplay, setCosmeticPause, setFreecam, setFreecamOffsetX,setFreecamOffsetY, setFreecamSpeed, setFreecamZoom, setGameSpeed, setGhostStep, setPlayDirection, setSmoothReplay } from "../../game/game"

import Button from "./button"
import InputSlider from "./input-slider"
const DebugCameraMenu = ({setShowDebugMenu}) => {

  const [newZoom,setNewZoom] = useState(1)
  const [newFlySpeed,setNewFlySpeed] = useState(1)
  const [newXPosition, setNewXPosition] = useState(200)//get camera position from game?
  //this should constantly be updating as we fly.
  const [newYPosition, setNewYPosition] = useState(200)
  const [newGameSpeed,setNewGameSpeed] = useState(100)
  const [newGameStep,setNewGameStep] = useState(0)//get gametime from game?
  //this should constantly be updating as the game progresses. The max should be pulled from the longest replay. If there is no running replay, we can instead disable this feature
  const [showCarMenu, setShowCarmenu] = useState(false)
  const [showTeleportMenu,setShowTeleportMenu] = useState(false)
  const [freecamEnabled,setFreecamEnabled] = useState(getFreecam()) //pretty sure this is in localstorage
  const [isCosmeticPauseOn,setIsCosmeticPauseOn] = useState(getCosmeticPause())
  const [shortestReplay, setShortestReplay] = useState(getShortestGhostReplayLength())
  const [playInReverse, setPlayInReverse] = useState(getPlayDirection())
  const [isSmoothReplayOn, setIsSmoothReplayOn] = useState(getSmoothReplay())

  const setStatefulZoom = (amount) => {
    setNewZoom(Number(amount))
    setFreecamZoom(Number(amount))
  }

  const setStatefulFlySpeed = (amount) => {
    setNewFlySpeed(Number(amount))
    setFreecamSpeed(Number(amount))
  }

  const setStatefulXPosition = (position) => {
    setNewXPosition(Number(position))
    setFreecamOffsetX(Number(position))
  }

  const setStatefulYPosition = (position) => {
    setNewYPosition(Number(position))
    setFreecamOffsetY(Number(position))
  }

  const setStatefulGameSpeed = (value) => {
    setNewGameSpeed(Number(value))
    setGameSpeed(Number(value))
  }

  const setStatefulGameStep = (value) => {
    console.log("I am settings the ghost step to", value)
    setNewGameStep(Number(value))
    setGhostStep(Number(value))
  }

  const toggleStatefulFreecam = () => {
    setFreecamEnabled(!getFreecam())
    setFreecam(!getFreecam())
  }

  const toggleStatefulCosmeticPause = () => {
    setIsCosmeticPauseOn(!getCosmeticPause())
    setCosmeticPause(!getCosmeticPause())
  }

  const toggleStatefulReverse = () => {
    setPlayDirection(!getPlayDirection())
    setPlayInReverse(!getPlayDirection())
  }

  const toggleStatefulSmoothReplay = () => {
    setSmoothReplay(!getSmoothReplay())
    setIsSmoothReplayOn(!getSmoothReplay())
  }



  useEffect(() => {
    setInterval(() => {
      setNewXPosition(-getFreecamLocation().x)
      setNewYPosition(-getFreecamLocation().y)
      setNewGameStep(getGhostStep())
    }, 50)
  },[])

  return (
    <div className="hidden-menu__debug-menu col-6" >
      <p className="f-p2">Camera menu</p>
      <div className="row gap-sm">
        <div className="col-3 gap-md">
        <InputSlider 
  newValue={newZoom} 
  setter={setStatefulZoom}
  minimum={-100}
  maximum={100}>
    Zoom
    </InputSlider>

    <InputSlider 
  newValue={newFlySpeed} 
  setter={setStatefulFlySpeed}
  minimum={0}
  maximum={100}>
    fly speed
    </InputSlider>


    <InputSlider 
  newValue={newXPosition} 
  setter={setStatefulXPosition}
  minimum={0}
  maximum={4000}>
    x position
    </InputSlider>


    <InputSlider 
  newValue={newYPosition} 
  setter={setStatefulYPosition}
  minimum={0}
  maximum={4000}>
    y position
    </InputSlider>


    <InputSlider 
  newValue={newGameSpeed} 
  setter={setStatefulGameSpeed}
  minimum={1}
  maximum={100}>
    game speed%
    </InputSlider>

    {
      
      <InputSlider 
      newValue={newGameStep} 
      setter={setStatefulGameStep}
      minimum={0}
      maximum={shortestReplay - 10}>
        game step
        </InputSlider>
    }


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
    style={freecamEnabled ? "selected" : "light"}
    clickHandler={toggleStatefulFreecam}
    >
      {freecamEnabled ? "Disable freecam" : "enable freecam"}
    </Button>
    <Button
    style={isCosmeticPauseOn ? "selected" : "light"}
    clickHandler={toggleStatefulCosmeticPause}
    >
      {isCosmeticPauseOn ? "Play" : "Pause"}
    </Button>


    <Button
    clickHandler={()=> {setStatefulGameStep(0)}}
    >
      seek to start
    </Button>
    <Button
    clickHandler={()=> {setStatefulGameStep(shortestReplay/2)}}
    >
      seek to end
    </Button>

    <Button
    style={playInReverse ? "selected" : "light"}
    clickHandler={()=> {toggleStatefulReverse()}}
    >
   {playInReverse ? "Play Forward" : "Play in reverse"}
    </Button>


    <Button
    style={isSmoothReplayOn ? "selected" : "light"}
    clickHandler={()=> {toggleStatefulSmoothReplay()}}
    >
   {isSmoothReplayOn ? "disable smooth replay" : "Enable smooth replay"}
    </Button>

    <Button
    clickHandler={()=> {
      setStatefulZoom(112.5)
      setShowDebugMenu(false)
    }}
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