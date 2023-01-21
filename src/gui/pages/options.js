import React from 'react';

import {setEnableGhost,getEnableGhost} from "../../game/game.js"
import {setParticleLimit,getParticleLimit} from "../../game/graphics.js"

const {useState} = React

const Options = ({setter,previous}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  let [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(3);

  return (
    <div className={`menu options ${previous == "main" ? "from-main" : null}`}>
    <h2>options</h2>
    <label htmlFor="ghost-selector">Enable Ghost Car  </label>
    <button  
    onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
    className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>

    <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
    <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
    <button className={gameDataSafeteyNet > 0 ? "delete-save" : "disabled"} onClick={() => {
      setGameDataSafeteyNet(gameDataSafeteyNet-1)
      if(gameDataSafeteyNet == 1){
        console.log("this is when...")
        localStorage.clear();
      }
    }}>{gameDataSafeteyNet > 0 ? `Click ${gameDataSafeteyNet} times to delete game data` : "game Data deleted"}</button>
    <button onClick={() => {
      setter(previous);
      setNewEnableGhost(getEnableGhost());
      setNewParticleLimit(getParticleLimit());
    }}>Exit without saving</button>
    <button className="exit-save"onClick={() => {
      setter(previous);
      setEnableGhost(newEnableGhost);
      setParticleLimit(newParticleLimit);
    }}>Save and exit</button>
  </div>
  )

}

export default Options;