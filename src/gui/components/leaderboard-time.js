import React from "react"
import { useNavigate } from 'react-router-dom';

import { resetGame } from '../../game/main.js';
import {setMapData, setEnableGhost, setSpectateTime} from "../../game/game.js"

import { nameGhost, colorGhostCar, colorPlayerCar} from '../../game/graphics.js';

const LeaderboardTime = ({racerInfo,index}) => {
  const navigate = useNavigate();

  const handleWatchReplay = (replay,name,color,spectateTime) => () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    setSpectateTime(spectateTime);
    resetGame(true);
    nameGhost(name);
    colorGhostCar(color)
    navigate("/hidden");
  }

  const handleRaceAgainst = (replay,name,color) => () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    resetGame();
    nameGhost(name);
    colorGhostCar(color)
    colorPlayerCar()
    navigate("/hidden");
  }

  return (
    <li  >
        <div className="time-info">#{index + 1} {racerInfo.playerName}</div> 
        <div className="time-menu">
          {racerInfo.time} 
          <button className="bg-shade-0" onClick={handleWatchReplay(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor,racerInfo.time)}>watch replay</button> 
          <button className="bg-secondary-500 text-color-shade-0" onClick={handleRaceAgainst(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor)}>race against</button>
        </div>
   </li>
  )  
}

export default LeaderboardTime;