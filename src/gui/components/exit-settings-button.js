import React from "react";
import { useNavigate } from "react-router-dom";

import { getDirectionalCamera, getEnableGhost, setDirectionalCamera, setEnableGhost } from "../../game/game";
import { getParticleLimit, setIntensityMultipler, setParticleLimit, setSmoothnessMultiplier } from "../../game/graphics";
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
  setShowDashboard  
}) => {
  const navigate = useNavigate();

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