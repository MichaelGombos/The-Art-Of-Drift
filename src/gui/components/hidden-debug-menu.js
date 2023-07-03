import React, {useEffect, useState} from "react"
import { getCosmeticPause, getFreecam, getFreecamGhostFocus, getFreecamLocation, getGhostCarEnabledList, getGhostStep, getMapData, getPlayDirection, getPlayerCarObject, getShortestGhostReplayLength, getSmoothReplay, setCosmeticPause, setFreecam, setFreecamGhostFocus, setFreecamOffsetX,setFreecamOffsetY, setFreecamSpeed, setFreecamZoom, setGameSpeed, setGhostStep, setPlayDirection, setSmoothReplay, updateGhostCarEnabledList } from "../../game/game"
import { drawGhostVehicle, getCarVisbility, getGhostCarModels, setCarVisibility } from "../../game/graphics"
import { vehicleMidGraphicURLs } from "../helpers/profileGraphicUrls"

import Button from "./button"
import InputSlider from "./input-slider"

const ghostCarNames = [
  "Personal Best",
  "Bronze",
  "Silver",
  "Gold",
  "Author"
]

const DebugCameraMenu = ({setShowDebugMenu , teleportMenuEnabled, setTeleportMenuEnabled, carMenuEnabled, setCarMenuEnabled}) => {


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

  const [isCarVisible,setIsCarVisible] = useState(getCarVisbility())

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
    setStatefulZoom(112.5)
  }

  const toggleStatefulCosmeticPause = () => {
    setIsCosmeticPauseOn(!getCosmeticPause())
    setCosmeticPause(!getCosmeticPause())
  }

  const toggleStatefulReverse = () => {
    setPlayInReverse(!getPlayDirection())
    setPlayDirection(!getPlayDirection())
  }

  const toggleStatefulSmoothReplay = () => {
    setIsSmoothReplayOn(!getSmoothReplay())
    setSmoothReplay(!getSmoothReplay())
  }

  const toggleStatefulCarVisibility = () => {
    setIsCarVisible(!getCarVisbility())
    setCarVisibility(!getCarVisbility())
  }




  useEffect(() => {
    setInterval(() => {
      setNewXPosition(-getFreecamLocation().x)
      setNewYPosition(-getFreecamLocation().y)
      setNewGameStep(getGhostStep())
    }, 50)
  },[])

  return (
    <div className="hidden-menu__debug-menu debug-menu__camera-menu col-6" >
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
    physics speed%
    </InputSlider>

    {
      
      <InputSlider 
      newValue={newGameStep} 
      setter={setStatefulGameStep}
      minimum={0}
      maximum={shortestReplay - 10}>
        ghost replay time
        </InputSlider>
    }


        </div>
        <div className="col-3 gap-sm">
        <Button
    style={carMenuEnabled ? "selected" : "light"}
    clickHandler={ () => {setCarMenuEnabled(!carMenuEnabled)}}
    >
      {carMenuEnabled ? "Hide car menu" : "show car menu"}
    </Button>
    <Button
    style={teleportMenuEnabled ? "selected" : "light"}
    clickHandler={() => {setTeleportMenuEnabled(!teleportMenuEnabled)}}
    >
      {teleportMenuEnabled ? "hide teleport menu" : "show teleport menu"}
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
    style={isCarVisible ? "selected" : "light"}
    clickHandler={()=> {toggleStatefulCarVisibility()}}
    >
   {isCarVisible ? "hide car" : "show car"}
    </Button>

    <Button
    clickHandler={()=> {
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

const GhostCarMenu = ({ghostCarIndex, freecamGhostFocusIndex, setFreecamGhostFocusIndex}) => {
  const [ghostReplays, setGhostReplays] = useState(getMapData().replays)
  const [ghostIcon,setGhostIcon] = useState(vehicleMidGraphicURLs[getGhostCarModels()[ghostCarIndex]])
  const [isCarDisabled, setIsCarDisabled] = useState(getGhostCarEnabledList[ghostCarIndex])

  const toggleStatefulCosmeticPause = () => {
    setIsCosmeticPauseOn(!getCosmeticPause())
    setCosmeticPause(!getCosmeticPause())
  }

  const handleTeleportPress = () => {
    const stats = ghostReplays[ghostCarIndex].stats
    const step = getGhostStep();
    const ghostLocation = {
      x : stats[step][0],
      y : stats[step][1]
    }
    setFreecamOffsetX( 0)
    setFreecamOffsetY( 0)
    getPlayerCarObject().setX(Number(ghostLocation.x))
    getPlayerCarObject().setY(Number(ghostLocation.y)) 
  }

  const handleFocusPress = () => {

    console.log("just pressed focus.")
    if(getFreecamGhostFocus() == ghostCarIndex){
      console.log("setting to null")
      setFreecamGhostFocusIndex(null);
      setFreecamGhostFocus(null)
    }
    else{
      console.log("setting to index", ghostCarIndex)
      setFreecamGhostFocusIndex(ghostCarIndex);
      setFreecamGhostFocus(ghostCarIndex)
    }
  }

  const toggleStatefulEnableGhost = () => {
    updateGhostCarEnabledList(ghostCarIndex, !getGhostCarEnabledList()[ghostCarIndex])
    setIsCarDisabled(!getGhostCarEnabledList()[ghostCarIndex])
  }

  useEffect(() => {
    setIsCarDisabled(!getGhostCarEnabledList()[ghostCarIndex])
  },[getGhostCarEnabledList()[ghostCarIndex]])


  return  (
  <div className="col-1 gap-md">
    <p>{ghostCarNames[ghostCarIndex]}</p>
    <img className={`car-menu__ghost-image car-menu__ghost-image${ghostCarIndex}`} src={ghostIcon}/>
    <Button 
    clickHandler={handleTeleportPress}
    >Teleport</Button>
    <Button 
    style={freecamGhostFocusIndex == ghostCarIndex ? "selected" : "light"}
    clickHandler={handleFocusPress}
    >Focus</Button>
    <Button 
    clickHandler={() => {
      getGhostCarModels()[ghostCarIndex] >= 8 ?
      drawGhostVehicle(0,ghostCarIndex)
      :
      drawGhostVehicle(getGhostCarModels()[ghostCarIndex]+1, ghostCarIndex)

      setGhostIcon(vehicleMidGraphicURLs[getGhostCarModels()[ghostCarIndex]])
  }}
    >Car Type</Button>
    <Button 
    style={isCarDisabled ? "selected" : "light"}
    clickHandler={toggleStatefulEnableGhost}
    >{isCarDisabled ? "enable" : "disable"}</Button>
  </div>
  )
}

const DebugCarMenu = () => {

  const [freecamGhostFocusIndex, setFreecamGhostFocusIndex] = useState(getFreecamGhostFocus())
  return (
    <div className = "hidden-menu__debug-menu  debug-menu__car-menu col-6">
      <p className="f-p2">Car menu</p>
      <div className="row gap-sm">
        <GhostCarMenu 
        ghostCarIndex={0}
        freecamGhostFocusIndex = {freecamGhostFocusIndex}
        setFreecamGhostFocusIndex = {setFreecamGhostFocusIndex}
        />
        <GhostCarMenu 
        ghostCarIndex={1}
        freecamGhostFocusIndex = {freecamGhostFocusIndex}
        setFreecamGhostFocusIndex = {setFreecamGhostFocusIndex}
        />
        <GhostCarMenu 
        ghostCarIndex={2}
        freecamGhostFocusIndex = {freecamGhostFocusIndex}
        setFreecamGhostFocusIndex = {setFreecamGhostFocusIndex}
        />
        <GhostCarMenu 
        ghostCarIndex={3}
        freecamGhostFocusIndex = { freecamGhostFocusIndex}
        setFreecamGhostFocusIndex = {setFreecamGhostFocusIndex}
        />
        <GhostCarMenu 
        ghostCarIndex={4}
        freecamGhostFocusIndex = {freecamGhostFocusIndex}
        setFreecamGhostFocusIndex = {setFreecamGhostFocusIndex}
        />
      </div>
    </div>
  )
}

const DebugTeleportMenu = () => {
  return (
    <div className = "hidden-menu__debug-menu debug-menu__teleport-menu col-6">
      <p>This is the debug teleport menu</p>
    </div>
  )
}

const DebugMenu = ({setShowDebugMenu}) => {

  const [carMenuEnabled,setCarMenuEnabled] = useState(true)
  const [teleportMenuEnabled,setTeleportMenuEnabled] = useState(true)
  
  return (
    <>
    <DebugCameraMenu 
    setShowDebugMenu={setShowDebugMenu}
    setCarMenuEnabled = {setCarMenuEnabled}
    carMenuEnabled = {carMenuEnabled}
    setTeleportMenuEnabled = {setTeleportMenuEnabled}
    teleportMenuEnabled = {teleportMenuEnabled}
    />

    {carMenuEnabled ? 
    <DebugCarMenu></DebugCarMenu>
    : ""
    }

        
    {teleportMenuEnabled ? 
    <DebugTeleportMenu></DebugTeleportMenu>
    : ""
    }
    </>

  )
}

export default DebugMenu;