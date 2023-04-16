import React from 'react';

import {getDirectionalCamera, getEnableGhost, setDirectionalCamera} from "../../game/game.js"
import {getParticleLimit} from "../../game/graphics.js"
import DeleteGameSaveButton from '../components/delete-game-save-button.js';
import ExitSettingsButton from '../components/exit-settings-button.js';
import InputSlider from '../components/input-slider.js';
import ToggleDirectionalCameraButton from '../components/toggle-directional-camera-button.js';
import ToggleGhostCarButton from '../components/ARCHIVED__toggle-ghost-car-button.js';
import ToggleStatsButton from '../components/toggle-stats-button.js';
import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';

const {useState} = React

const Settings = ({ 
  isGuestSession,
  showFPS,
  setShowFPS,
  showExtraStats,
  setShowExtraStats,
  showDashboard,
  setShowDashboard
}) => {
  const navigate = useNavigate();
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  let [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(3);
  let [newDirectionalCamera, setNewDirectionalCamera] = useState(getDirectionalCamera())
  return (

    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center ">
          <h1 className="f-h1">Settings</h1>
          <div  className="settings-wrapper col-2 align-center gap-md vertical-navigation-menu">
            {/* placeholder */}
            <Button clickHandler={( () => logOut('/'))}>Log Out</Button>
            <Button clickHandler={( () => navigate(isGuestSession ? "/profile/guest" : "/profile" ))}>View Profile</Button>
            <DeleteGameSaveButton gameDataSafeteyNet={gameDataSafeteyNet} setGameDataSafeteyNet={setGameDataSafeteyNet}/>

            <div className='vertical-navigation-menu w-100'>
                <InputSlider 
              newValue={newParticleLimit} 
              setter={setNewParticleLimit}
              minimum={0}
              maximum={2000}>
                Particle Limit
              </InputSlider>
              <InputToggle 
              newValue={newDirectionalCamera} 
              setter={setNewDirectionalCamera}
              >
                Enable Directional Camera
              </InputToggle>

              <InputToggle 
              newValue={showExtraStats} 
              setter={setShowExtraStats}
              >
                Show Extra Stats
              </InputToggle>

              <InputToggle 
              newValue={showFPS} 
              setter={setShowFPS}
              >
                Show FPS
              </InputToggle>

              <InputToggle 
              newValue={showDashboard} 
              setter={setShowDashboard}
              >
                Show dashboard
              </InputToggle>

              <InputToggle 
              newValue={newEnableGhost} 
              setter={setNewEnableGhost}
              >
                Enable Ghost Car
              </InputToggle>
            </div>


            <ExitSettingsButton isSaving={false} setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} />
            <ExitSettingsButton isSaving={true} setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} setNewDirectionalCamera = {setNewDirectionalCamera} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} newDirectionalCamera={newDirectionalCamera}/>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Settings;