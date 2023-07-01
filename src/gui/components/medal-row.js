import React from "react";
import { replays } from "../../game/replay";

import star from '../../assets/map-select/star.png';
import lockedMedal from '../../assets/map-select/medal_locked.png';
import authorMedal from '../../assets/map-select/medal_author.png';
import goldMedal from '../../assets/map-select/medal_gold.png';
import silverMedal from '../../assets/map-select/medal_silver.png';
import bronzeMedal from '../../assets/map-select/medal_bronze.png';

import Button from "./button";

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



const MedalRow = ({best, medal,difficultyList, toggleDifficulty,isGhostEnabled, setNewGhostEnabled, index, buttonIndex}) => {

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
    <li className={`horizantal-navigation-menu act__navigation medal-row ${unlockedMedals[medal] ? "" : "locked-text"}`}>
      <div className="vertical-navigation-menu act__navigation medal-row__menu"> 
      <Button style={difficultyList[buttonIndex] == true ? "selected" : "light"} clickHandler={ () => {
        toggleDifficulty(buttonIndex)
      }
      }>{ghostNames[medal]}</Button>
      </div>
      <div className="medal-row__time"> 

      <p className="f-p3">{medal == "personalBest" ? best : replays[index][medal].time}</p>
      <img src={unlockedMedals[medal] ? ghostMedals[medal] : ghostMedals["locked"]}/>
      </div> 
    </li>
  )
}

export default MedalRow;