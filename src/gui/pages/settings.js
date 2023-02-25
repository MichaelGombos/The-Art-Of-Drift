import React from 'react';

import {getDirectionalCamera, getEnableGhost} from "../../game/game.js"
import {getParticleLimit} from "../../game/graphics.js"
import DeleteGameSaveButton from '../components/delete-game-save-button.js';
import ExitSettingsButton from '../components/exit-settings-button.js';
import ParticleLimitSlider from '../components/particle-limit-slider.js';
import ToggleDirectionalCameraButton from '../components/toggle-directional-camera-button.js';
import ToggleGhostCarButton from '../components/toggle-ghost-car-button.js';
import ToggleStatsButton from '../components/toggle-stats-button.js';

const {useState} = React

const Settings = ({previous , showStats, setShowStats}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  let [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(3);
  let [newDirectionalCamera, setNewDirectionalCamera] = useState(getDirectionalCamera())
  return (
    <div className={`menu options ${previous == "main" ? "from-main" : null}`}>
      <h1 className="f-h2">SETTINGS</h1>
      <div className="settings-wrapper">
        <DeleteGameSaveButton gameDataSafeteyNet={gameDataSafeteyNet} setGameDataSafeteyNet={setGameDataSafeteyNet}/>
        <ToggleStatsButton setShowStats={setShowStats} showStats={showStats}/>
        {/* <ToggleStatsButton setShowStats={setShowStats} showStats={showStats}/> */}
        <ToggleDirectionalCameraButton  setDirectionalCamera = {setNewDirectionalCamera }directionalCamera= {newDirectionalCamera}/>
        <ToggleGhostCarButton newEnableGhost={newEnableGhost} setNewEnableGhost={setNewEnableGhost}/>
        <ParticleLimitSlider newParticleLimit={newParticleLimit} setNewParticleLimit={setNewParticleLimit}/>
        <ExitSettingsButton isSaving={false} setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} />
        <ExitSettingsButton isSaving={true} setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} setNewDirectionalCamera = {setNewDirectionalCamera} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} newDirectionalCamera={newDirectionalCamera}/>
      </div>
  </div>
  )

}

export default Settings;