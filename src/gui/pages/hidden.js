
import React from 'react';
import {pauseGame,resetGame} from "../../game/main.js"
import { useNavigate } from 'react-router-dom';

import Stats from "../components/ARCHIVED__stats.js"
import IconButton from '../components/icon-button.js';

import iconPauseUrl from "../../assets/icons/pause.png"
import iconResetUrl from "../../assets/icons/reset.png"
import GameInfo from '../components/hidden-game-info.js';
import ExtraStats from '../components/hidden-extra-stats.js';
import Dashboard from '../components/hidden-dashboard.js';
import { generatePauseSound } from '../../sounds/sfx.js';
import MobileControls from '../components/hidden-mobile-controls.js';
import DebugMenu from '../components/hidden-debug-menu.js';


const OpenMenuButton = () => {
  const navigate = useNavigate();
  return(
    <IconButton  iconUrl={iconPauseUrl} clickHandler={() => {
      generatePauseSound();
      navigate("/pause");
      pauseGame();
      } }></IconButton>
  )
}

const ResetGameButton = () => {
  return (
    <IconButton  iconUrl={iconResetUrl} clickHandler={() => {setTimeout(resetGame,1)}}></IconButton>
  )
}

const Hidden = ({showFPS,showExtraStats,showDashboard,showMobileControls,showHudButtons ,showLapInfo, showDebugMenu,setShowDebugMenu }) => {
  let isExtraStatsHidden = false;
  let isDashboardHidden = false;
  // TODO TOGGLE FOR THIS IN SETTINGS
  return (
    <div className="hidden-menu">
      {
        showHudButtons 
        ?
        <div className="hidden-menu__navigation row gap-md" >
          <OpenMenuButton/>
          <ResetGameButton/>
        </div>
        :
        ""
      }
      {
        showLapInfo
        ?
        <GameInfo/>
         :
          ""
      }

{
        showDebugMenu
        ?
        <DebugMenu setShowDebugMenu={setShowDebugMenu}/>
         :
          ""
      }
        <MobileControls showMobileControls ={showMobileControls} />

        <ExtraStats showInfo={showExtraStats} showFPS={showFPS}/>
        <Dashboard showInfo={showDashboard}/>
    </div>

  )
}

export default Hidden;