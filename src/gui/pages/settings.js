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
      <h1 className="f-h2">SETTINGS</h1>
      <div className="settings-wrapper">
        <button className={gameDataSafeteyNet > 0 ? "bg-danger-500 text-color-shade-0" : "disabled"} onClick={() => {
            setGameDataSafeteyNet(gameDataSafeteyNet-1)
            if(gameDataSafeteyNet == 1){
              localStorage.clear();
              navigate("/");
            }
          }}>{gameDataSafeteyNet > 0 ? `Click ${gameDataSafeteyNet} times to delete game data` : "game Data deleted ):"}</button>
        <button className={showStats ? "set" : ""} onClick={() =>setShowStats(!showStats)}>{showStats ? "Disable Full Stats HUD" : "Enable Full Stats HUD"}</button>
        <button  
        onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
        className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "Disable ghost car" : "Enable ghost car"}</button>
        <div className='particle-limit'>
          <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
          <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
        </div>
        <button onClick={() => {
          navigate(-1);
          setNewEnableGhost(getEnableGhost());
          setNewParticleLimit(getParticleLimit());
        }}>Exit without saving</button>
        <button className="bg-success-500 text-color-shade-0"onClick={() => {
          navigate(-1);
          setEnableGhost(newEnableGhost);
          setParticleLimit(newParticleLimit);
        }}>Save and exit</button>
      </div>
  </div>
  )

}

export default Settings;