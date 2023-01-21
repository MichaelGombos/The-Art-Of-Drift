import React from 'react';

import {setEnableGhost,getEnableGhost} from "../../game/game.js"
import {setParticleLimit,getParticleLimit} from "../../game/graphics.js"

const {useState} = React

const Options = ({setter,previous}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());

  return (
    <div className="menu options">
    <h2>options</h2>
    <label htmlFor="ghost-selector">Enable Ghost Car  </label>
    <button  
    onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
    className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>

    <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
    <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
    <button className="delete-save" onClick={localStorage.clear()}>Clear game data</button>
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