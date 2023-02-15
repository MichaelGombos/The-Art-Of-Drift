import React from "react";
import { replays } from "../../game/replay";

import star from '../../assets/map-select/star.png';
import lockedMedal from '../../assets/map-select/medal_locked.png';
import authorMedal from '../../assets/map-select/medal_author.png';
import goldMedal from '../../assets/map-select/medal_gold.png';
import silverMedal from '../../assets/map-select/medal_silver.png';
import bronzeMedal from '../../assets/map-select/medal_bronze.png';

//assets
const ghostMedals = {
  personalBest : star,
  easy : bronzeMedal,
  normal : silverMedal,
  hard : goldMedal,
  author : authorMedal,
  locked : lockedMedal
}

const ghostNames = {
  easy : "Bronze",
  normal : "Silver",
  hard : "Gold",
  author : "Author",
  personalBest: "best time"
}

const MedalRow = ({best, medal,currentDiff, setDiff,isGhostEnabled, setNewGhostEnabled, index}) => {

  const unlockedMedals = {  
    personalBest : true,
    author: best <= replays[index].author.time,
    hard : best <= replays[index].hard.time,
    normal : best <= replays[index].normal.time,
    easy : best <= replays[index].easy.time
  }


  
  if(medal == "author" && !unlockedMedals.hard){
    return "";
  }
  if(medal == "personalBest" && !best){
    return "";
  }
  return (  
    <li className={`medal-row ${unlockedMedals[medal] ? "" : "locked-text"}`}>
      <div className="medal-type"> <img src={unlockedMedals[medal] ? ghostMedals[medal] : ghostMedals["locked"]}/> {ghostNames[medal]} </div> 
      <div className="medal-menu"> 
        {medal == "personalBest" ? best : replays[index][medal].time}
      <button className={(currentDiff == medal && isGhostEnabled) ? "set" : ""} onClick={ () => {
        setDiff(medal)
        setNewGhostEnabled(true)
      }
      }>{currentDiff == medal && isGhostEnabled ? "Selected!" : "select"}</button>
      </div>
    </li>
  )
}

export default MedalRow;