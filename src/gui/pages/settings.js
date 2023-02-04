import React from 'react';
import { useNavigate } from 'react-router-dom';

import {setEnableGhost,getEnableGhost} from "../../game/game.js"
import {setParticleLimit,getParticleLimit} from "../../game/graphics.js"

const {useState} = React

const Settings = ({previous , showStats, setShowStats}) => {
  const navigate = useNavigate();
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  let [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(3);

  return (
    <div className={`menu options ${previous == "main" ? "from-main" : null}`}>
      <div className="settings-wrapper">
        <h2>Settings</h2>

        <button className={showStats ? "set" : ""} onClick={() =>setShowStats(!showStats)}>{showStats ? "Disable Full Stats HUD" : "Enable Full Stats HUD"}</button>
        <button  
        onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
        className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "Disable ghost car" : "Enable ghost car"}</button>

        <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
        <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
        <button className={gameDataSafeteyNet > 0 ? "delete-save" : "disabled"} onClick={() => {
          setGameDataSafeteyNet(gameDataSafeteyNet-1)
          if(gameDataSafeteyNet == 1){
            console.log("this is when...")
            localStorage.clear();
          }
        }}>{gameDataSafeteyNet > 0 ? `Click ${gameDataSafeteyNet} times to delete game data` : "game Data deleted ):"}</button>
        <button onClick={() => {
          navigate(-1);
          setNewEnableGhost(getEnableGhost());
          setNewParticleLimit(getParticleLimit());
        }}>Exit without saving</button>
        <button className="exit-save"onClick={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          setParticleLimit(newParticleLimit);
        }}>Save and exit</button>
      </div>
  </div>
  )

}

export default Settings;