import React, { useRef } from 'react';

import {getDirectionalCamera, getEnableGhost, getFreecam, getSmoothReplay, setDirectionalCamera} from "../../game/game.js"
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
  setShowDashboard,
  setShowHudButtons,
  showHudButtons,
  setShowLapInfo,
  showLapInfo,
  setShowMiniMap,
  showMiniMap,
}) => {
  const navigate = useNavigate();

  const particleLimitSlider = useRef(null)

  const [newShowHudButtons, setNewShowHudButtons] = useState(showHudButtons)
  const [newShowLapInfo, setNewShowLapInfo] = useState(showLapInfo)
  const [newShowMiniMap, setNewShowMiniMap] = useState(showMiniMap) 
  const [newIsSmoothReplayOn, setNewIsSmoothReplayOn] = useState(getSmoothReplay())

  const [newFreecam, setNewFreecam] = useState(getFreecam());

  const [newShowFPS, setNewShowFPS] = useState(showFPS)
  const [newShowExtraStats,setNewShowExtraStats] = useState(showExtraStats)
  const [newShowDashboard,setNewShowDashboard] = useState(showDashboard)

  const [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  const [newSfxSound, setNewSfxSound] = useState((getSFXMultiplier() * 100).toFixed(2));
  const [newMusicSound, setNewMusicSound] = useState((getMusicMultipler() * 100).toFixed(2));
  const [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());
  const [gameDataSafeteyNet,setGameDataSafeteyNet] = useState(10);
  const [newDirectionalCamera, setNewDirectionalCamera] = useState(getDirectionalCamera())

  const [newSmoothnessMultipler, setNewSmoothnessMultipler] = useState(getSmoothnessMultiplier() / 2)
  const [newIntensityMultiplier , setNewIntensityMultiplier ] = useState(getIntensityMultipler() * 100)


  const setStatefulMusic = (newVal) => {
    setNewMusicSound(newVal);
    setMusicMultiplier(newVal);
    localStorage.setItem("musicMultiplier", newVal)
  }

  const setStatefulSFX = newVal => {
    setNewSfxSound(newVal);
    setSFXMultiplier(newVal);
    localStorage.setItem("SFXMultiplier", newVal)
  }

  return (

    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center ">
          <h1 className="f-h1">Settings</h1>
          <div  className="scroll-container settings-wrapper col-3 align-center gap-md vertical-navigation-menu">
            {/* placeholder */}
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
            newShowFPS           = {newShowFPS            }  
            setShowFPS        = {setShowFPS         }  
            newShowExtraStats    = {newShowExtraStats     }  
            setShowExtraStats = {setShowExtraStats  }  
            newShowDashboard     = {newShowDashboard      }    
            setShowDashboard  = {setShowDashboard   }    

            newShowHudButtons    = {newShowHudButtons}
            setShowHudButtons  ={setShowHudButtons}
            newShowLapInfo       = {newShowLapInfo}
            setShowLapInfo     = {setShowLapInfo}
            newShowMiniMap       = {newShowMiniMap}
            setShowMiniMap     = {setShowMiniMap}

            newFreecam = {newFreecam}
            newIsSmoothReplayOn = {newIsSmoothReplayOn}
            
            />
            <ExitSettingsButton isSaving={false} setNewDirectionalCamera = {setNewDirectionalCamera}  setNewEnableGhost={setNewEnableGhost} setNewParticleLimit={setNewParticleLimit} newEnableGhost={newEnableGhost} newParticleLimit={newParticleLimit} />
            <Button clickHandler={( () => navigate("/settings/keybinds" ))}>View Controls</Button>
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
                <span title="This feature will make your camera angle match your cars facing direction. I think its pretty fun, but it may give you a headache.">Enable Directional Camera⚠️</span>
              </InputToggle>

              <InputToggle 
              newValue={newShowExtraStats} 
              setter={setNewShowExtraStats}
              >
                Show Extra Stats
              </InputToggle>

              <InputToggle 
              newValue={newShowFPS} 
              setter={setNewShowFPS}
              >
                Show FPS
              </InputToggle>

              <InputToggle 
              newValue={newShowDashboard} 
              setter={setNewShowDashboard}
              >
                Show dashboard
              </InputToggle>

              <InputToggle 
              newValue={newEnableGhost} 
              setter={setNewEnableGhost}
              >
                Enable Ghost Car
              </InputToggle>


              <InputToggle 
              newValue={newShowHudButtons} 
              setter={setNewShowHudButtons}
              >
                Show Hud Buttons
              </InputToggle>


              <InputToggle 
              newValue={newShowLapInfo} 
              setter={setNewShowLapInfo}
              >
                Show Lap Info
              </InputToggle>


              <InputToggle 
              newValue={newShowMiniMap} 
              setter={setNewShowMiniMap}
              >
                Show Mini Map
              </InputToggle>


              <InputToggle 
              newValue={newFreecam} 
              setter={setNewFreecam}
              >
                Enable free cam
              </InputToggle>

              <InputToggle 
              newValue={newIsSmoothReplayOn} 
              setter={setNewIsSmoothReplayOn}
              >
                <span title="This feature is only meant for recording footage for the game trailer. Instead of taking the replays frametime and using the data from each frame to match up the replay, we will just run the replay as fast as we can. This will be an issue if your fps is below or above the replays recorded fps, but if not, it can give the recording a smoother look">Enable smooth replay⚠️</span>
               
              </InputToggle>


           
          </div>
        </div>
      </div>
    </div>
  )

}

export default Settings;