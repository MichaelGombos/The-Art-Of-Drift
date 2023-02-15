import React from "react";
import { useNavigate } from "react-router-dom";

import { getEnableGhost, setEnableGhost } from "../../game/game";
import { getParticleLimit, setParticleLimit } from "../../game/graphics";

const ExitSettingsButton = ({isSaving,setNewEnableGhost,setNewParticleLimit, newEnableGhost, newParticleLimit}) => {
  const navigate = useNavigate();

    if(isSaving){
      return(
        <button className="bg-success-500 text-color-shade-0"onClick={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          setParticleLimit(newParticleLimit);
        }}>Save and exit</button>
      )
    }
    else{
      return(
        <button onClick={() => {
          navigate(-1);
          setNewEnableGhost(getEnableGhost());
          setNewParticleLimit(getParticleLimit());
        }}>Exit without saving</button>
      )
    }
}

export default ExitSettingsButton;