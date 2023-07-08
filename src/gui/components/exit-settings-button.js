import React from "react";
import { useNavigate } from "react-router-dom";

import { getDirectionalCamera, getEnableGhost, setDirectionalCamera, setEnableGhost, setFreecam, setSmoothReplay } from "../../game/game";
import { getParticleLimit, setIntensityMultipler, setParticleLimit, setSmoothnessMultiplier } from "../../game/graphics";
import { updateMapVisibility } from "../../game/mini-map";
import Button from "./button";

const ExitSettingsButton = ({
  isSaving,
  setNewEnableGhost,
  setNewParticleLimit, 
  newEnableGhost, 
  newParticleLimit, 
  setNewDirectionalCamera, 
  newDirectionalCamera,
  newIntensityMultiplier, 
  newSmoothnessMultipler ,
  newShowFPS        , 
  setShowFPS        ,
  newShowExtraStats ,
  setShowExtraStats ,
  newShowDashboard  ,
  setShowDashboard  ,
newShowHudButtons  , 
setShowHudButtons ,
newShowLapInfo    ,
setShowLapInfo    ,
newShowMiniMap    ,
setShowMiniMap    ,
newFreecam ,
newIsSmoothReplayOn,
newShowDebugMenu    ,
setShowDebugMenu ,
newBypassAuthorMedalUnlock,
setBypassAuthorMedalUnlock
}) => {
  const navigate = useNavigate();
  console.log("really? nothing.")
    if(isSaving){
      return(
        <Button style="primary" clickHandler={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          localStorage.setItem("isGhostEnabled",newEnableGhost)
          setParticleLimit(newParticleLimit);
          localStorage.setItem("particleLimit",newParticleLimit)
          setDirectionalCamera(newDirectionalCamera);
          localStorage.setItem("isDirectionalCameraEnabled", newDirectionalCamera)
          setIntensityMultipler(newIntensityMultiplier / 100)
          localStorage.setItem("intensityMultiplier", newIntensityMultiplier / 100)
          setSmoothnessMultiplier(newSmoothnessMultipler * 2)
          localStorage.setItem("smoothnessMultiplier", newSmoothnessMultipler * 2)

          setShowFPS(newShowFPS)
          localStorage.setItem("showFPS",newShowFPS)
          setShowExtraStats(newShowExtraStats)
          localStorage.setItem("showExtraStats",newShowExtraStats)
          setShowDashboard(newShowDashboard)
          localStorage.setItem("showDashboard",newShowDashboard)
          
          localStorage.setItem("showFPS",newShowHudButtons)  
          setShowHudButtons(newShowHudButtons)
          localStorage.setItem("showLapInfo",newShowLapInfo)     
          setShowLapInfo(newShowLapInfo)
          localStorage.setItem("showMiniMap",newShowMiniMap)     
          setShowMiniMap(newShowMiniMap)
          //refresh mini map visibility
          updateMapVisibility(newShowMiniMap)

          setFreecam(newFreecam)
          localStorage.setItem("isFreeCamEnabled", newFreecam)

          setSmoothReplay(newIsSmoothReplayOn)
          localStorage.setItem("isSmoothReplayEnabled", newIsSmoothReplayOn)
          setShowDebugMenu(newShowDebugMenu)

          setBypassAuthorMedalUnlock(newBypassAuthorMedalUnlock);
          localStorage.setItem("bypassAuthorMedalUnlock", newBypassAuthorMedalUnlock)

        }}>Save and exit</Button>
      )
    }
    else{
      return(
        <Button clickHandler={() => {
          navigate(-1);
          setNewEnableGhost(getEnableGhost());
          setNewParticleLimit(getParticleLimit());
          setNewDirectionalCamera(getDirectionalCamera());
        }}>Exit without saving</Button>
      )
    }
}

export default ExitSettingsButton;