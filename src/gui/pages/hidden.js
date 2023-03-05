
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

const OpenMenuButton = () => {
  const navigate = useNavigate();
  return(
    <IconButton  iconUrl={iconPauseUrl} clickHandler={() => {
      navigate("/pause");
      pauseGame();
      } }>Open menu</IconButton>
  )
}

const ResetGameButton = () => {
  return (
    <IconButton  iconUrl={iconResetUrl} clickHandler={() => {setTimeout(resetGame,1)}}>Reset</IconButton>
  )
}

const Hidden = ({showStats}) => {
  let isExtraStatsHidden = false;
  let isDashboardHidden = false;
  // TODO TOGGLE FOR THIS IN SETTINGS
  return (
    <div className="hidden-menu">
        <div className="hidden-menu__navigation row gap-md" >
          <OpenMenuButton/>
          <ResetGameButton/>
        </div>

        <GameInfo />
      
        <ExtraStats isHidden={isExtraStatsHidden}/>
        <Dashboard isHidden={isDashboardHidden}/>
    </div>

  )
}

export default Hidden;