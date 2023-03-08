import React from "react";
import { useNavigate } from "react-router-dom";

import { getDirectionalCamera, getEnableGhost, setDirectionalCamera, setEnableGhost } from "../../game/game";
import { getParticleLimit, setParticleLimit } from "../../game/graphics";
import Button from "./button";

const ExitSettingsButton = ({
  isSaving,
  setNewEnableGhost,
  setNewParticleLimit, 
  newEnableGhost, 
  newParticleLimit, 
  setNewDirectionalCamera, 
  newDirectionalCamera
}) => {
  const navigate = useNavigate();

    if(isSaving){
      return(
        <Button style="primary" clickHandler={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          setParticleLimit(newParticleLimit);
          setDirectionalCamera(newDirectionalCamera);
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