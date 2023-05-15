import React, { useRef } from 'react';

import {getDirectionalCamera, getEnableGhost, setDirectionalCamera} from "../../game/game.js"
import {getIntensityMultipler, getParticleLimit, getSmoothnessMultiplier} from "../../game/graphics.js"
import DeleteGameSaveButton from '../components/delete-game-save-button.js';
import ExitSettingsButton from '../components/exit-settings-button.js';
import InputSlider from '../components/input-slider.js';
import ToggleDirectionalCameraButton from '../components/toggle-directional-camera-button.js';
import ToggleGhostCarButton from '../components/ARCHIVED__toggle-ghost-car-button.js';
import ToggleStatsButton from '../components/toggle-stats-button.js';
import ResetSettingsButton from '../components/reset-settings-button.js';
import InputToggle from '../components/input-toggle.js';
import Button from '../components/button.js';
import { logOut } from '../helpers/databaseFacade.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { getMusicMultipler, setMusicMultiplier } from '../../sounds/music.js';
import { getSFXMultiplier, setSFXMultiplier } from '../../sounds/sfx.js';

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

  const particleLimitSlider = useRef(null)
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newSfxSound, setNewSfxSound] = useState((getSFXMultiplier() * 100).toFixed(2));
  let [newMusicSound, setNewMusicSound] = useState((getMusicMultipler() * 100).toFixed(2));
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  let [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(10);
  let [newDirectionalCamera, setNewDirectionalCamera] = useState(getDirectionalCamera())

  let [newSmoothnessMultipler, setNewSmoothnessMultipler] = useState(getSmoothnessMultiplier() / 2)
  let [newIntensityMultiplier , setNewIntensityMultiplier ] = useState(getIntensityMultipler() * 100)


  const setStatefulMusic = (newVal) => {
    setNewMusicSound(newVal);
    setMusicMultiplier(newVal);
  }

  const setStatefulSFX = newVal => {
    setNewSfxSound(newVal);
    setSFXMultiplier(newVal);
  }

  return (

    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center ">
          <h1 className="f-h1">Settings</h1>
          <div  className="settings-wrapper col-2 align-center gap-md vertical-navigation-menu">
            {/* placeholder */}
            <Button clickHandler={( () => navigate(isGuestSession ? "/profile/guest" : "/profile" ))}>View Profile</Button>
            <Button clickHandler={( () => navigate("/settings/keybinds" ))}>View Controls</Button>
            <Button style="danger" clickHandler={( () => logOut('/'))}>Log Out</Button>
            <DeleteGameSaveButton gameDataSafeteyNet={gameDataSafeteyNet} setGameDataSafeteyNet={setGameDataSafeteyNet}/>
            <ResetSettingsButton 
            particleLimitSlider={particleLimitSlider}
            setNewEnableGhost={setNewEnableGhost}
            setNewParticleLimit={setNewParticleLimit}
            setGameDataSafeteyNet={setGameDataSafeteyNet}
            setNewDirectionalCamera={setNewDirectionalCamera}
            setShowFPS={setShowFPS}
            setShowExtraStats={setShowExtraStats}
            setShowDashboard={setShowDashboard}/>

            <InputSlider 
          newValue={newSfxSound} 
          setter={setStatefulSFX}
          minimum={0}
          maximum={100}>
            SFX Sound
          </InputSlider>
                <InputSlider 
              newValue={newMusicSound} 
              setter={setStatefulMusic}
              minimum={0}
              maximum={100}>
                Music Sound
              </InputSlider>
              
              <InputSlider 
              newValue={newSmoothnessMultipler} 
              setter={setNewSmoothnessMultipler}
              minimum={0}
              maximum={200}>
                Camera shake (smoothness)
              </InputSlider>
                <InputSlider 
              newValue={newIntensityMultiplier} 
              setter={setNewIntensityMultiplier}
              minimum={0}
              maximum={200}>
                Camera shake (distance)
              </InputSlider>

                <InputSlider 
                parentRef={particleLimitSlider}
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


            <ExitSettingsButton isSaving={false} setNewDirectionalCamera = {setNewDirectionalCamera}  setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} />
            <ExitSettingsButton 
            isSaving={true} 
            setNewEnableGhost={setNewEnableGhost} 
            setNewParticleLimit={setNewParticleLimit} 
            setNewDirectionalCamera = {setNewDirectionalCamera} 
            newEnableGhost={newEnableGhost} 
            newParticleLimit={newParticleLimit} 
            newDirectionalCamera={newDirectionalCamera}
            newIntensityMultiplier = {newIntensityMultiplier}
            newSmoothnessMultipler = {newSmoothnessMultipler}
            />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Settings;