import React from "react";
import { useNavigate } from "react-router-dom";

import { getDirectionalCamera, getEnableGhost, setDirectionalCamera, setEnableGhost } from "../../game/game";
import { getParticleLimit, setParticleLimit } from "../../game/graphics";

const ExitSettingsButton = ({isSaving,setNewEnableGhost,setNewParticleLimit, newEnableGhost, newParticleLimit, setNewDirectionalCamera, newDirectionalCamera}) => {
  const navigate = useNavigate();

    if(isSaving){
      return(
        <button className="bg-success-500 text-color-shade-0"onClick={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          setParticleLimit(newParticleLimit);
          setDirectionalCamera(newDirectionalCamera);
        }}>Save and exit</button>
      )
    }
    else{
      return(
        <button onClick={() => {
          navigate(-1);
          setNewEnableGhost(getEnableGhost());
          setNewParticleLimit(getParticleLimit());
          setNewDirectionalCamera(getDirectionalCamera());
        }}>Exit without saving</button>
      )
    }
}

export default ExitSettingsButton;