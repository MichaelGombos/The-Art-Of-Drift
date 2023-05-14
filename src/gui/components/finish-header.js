import React from "react"

import authorMedal from '../../assets/map-select/medal_author.png';
import goldMedal from '../../assets/map-select/medal_gold.png';
import silverMedal from '../../assets/map-select/medal_silver.png';
import bronzeMedal from '../../assets/map-select/medal_bronze.png';

import { getInSpectateMode } from "../../game/game"
import { replays } from "../../game/replay"

const medalURLMap = {
  easy : bronzeMedal,
  normal : silverMedal,
  hard : goldMedal,
  author : authorMedal
}

const medalNameMap = {
  easy : "bronze",
  normal : "silver",
  hard : "gold",
  author : "author"
}

const UnlockedMedal = ({newBest,playerTime,oldPB,mapIndex}) => {
  if(newBest){ //soon I will need to check if this is a campaign map too..
    let oldBestHighestIndex;
    let playerTimeHighestIndex;
    //take the oldest PB, find the highest medal it would have had,

    //take the new PB, find the highest medal it would have had.
    // if the new PB index is higher, (easy -> author), then display the component using the new PB index..

    //else don't show anything.

    for(let medalIndex in replays[mapIndex]){
      if(oldPB < replays[mapIndex][medalIndex].time){
        oldBestHighestIndex = medalIndex;
      }
      if(playerTime < replays[mapIndex][medalIndex].time){
        playerTimeHighestIndex = medalIndex;
      }
    }

    if (oldBestHighestIndex == playerTimeHighestIndex || oldBestHighestIndex > playerTimeHighestIndex){
      return;
    }


    return(
      <div className="row unlocked-medal gap-sm f-p2">
        <p > <span className="text-secondary-500">{medalNameMap[playerTimeHighestIndex]} </span>medal </p><img src={medalURLMap[playerTimeHighestIndex]}/> <p > unlocked!</p>
      </div>
    )

  }
}

const FinishHeader = ({replayObject, spectateTime,newBest,mapIndex, oldPB}) => {
  return (
    <div className="finish__header col-6 align-center">
      {getInSpectateMode() ?  <h1 className="f-p1">Replay Over</h1> : <h1 className="f-h1">Finish</h1>}
       
       <div className="col-6  gap-md f-p3">
          <UnlockedMedal newBest={newBest} playerTime={replayObject.time} oldPB={oldPB} mapIndex={mapIndex}/>
         
         <p>{getInSpectateMode() ? `REPLAY TIME: ${spectateTime}` : `YOUR TIME: ${replayObject.time} `}<span className="new-best">{newBest ? "NEW BEST" : null}</span></p>
         {newBest 
         ?
         <p>{oldPB ? `Your OLD best: ${oldPB}` : ""}</p>
         :
        <p>Your best: {oldPB}</p>}
       </div>
    </div>
  )
}

export default FinishHeader;