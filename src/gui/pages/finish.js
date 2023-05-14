import React, { useMemo , useState} from 'react';
import {  getTimeString, getGameMapIndex, getReplayArray,  getInSpectateMode, getSpectateTime, getReplayObject, getReplayFinishTime } from '../../game/game.js';

import FinishHeader from '../components/finish-header.js';
import FinishNavigation from '../components/finish-navigation.js';
import { addReplay, getCurrentAuthProfile, getCurrentAuthReplay, getDatabaseTime } from '../helpers/databaseFacade.js';



let newBest = false;
let playerTime;
let spectateTime;

const sendTime = async(mapIndex,replayObject) => {
  addReplay(mapIndex,replayObject)

}

const checkBest = (setter, index, oldPB) => {
  const finishTime = getReplayFinishTime();
  if(!getInSpectateMode() && finishTime < oldPB || !oldPB){
    //post to localStorage and to Database
    const gameReplayObject = getReplayObject();
    getCurrentAuthProfile().then((profile) => {
      const replayObject = {
        time: finishTime,
        playerName : profile.displayName,
        replay: {
          inputs: JSON.stringify(gameReplayObject.inputs),
          stats: JSON.stringify(gameReplayObject.stats)
        },
        playerVehicle: profile.vehicleID,
        playerAvatar: profile.avatarId,
        createdAt: getDatabaseTime()
      }
      
      sendTime(index, replayObject)
      setter(replayObject)

    })



    return true;
  }
  else{
    return false;
  }
}


const Finish = () => {
  const [replayObject, setReplayObject] = useState({big:"chungus"})

  const mapIndex = getGameMapIndex();
  let oldPB;
  useMemo(async() => {
      oldPB = await getCurrentAuthReplay(mapIndex)
      newBest = checkBest(setReplayObject, mapIndex, oldPB);
      playerTime = getTimeString();
      spectateTime = getSpectateTime();
  }, [])
  return (
    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu finish-menu col-2 align-center  gap-md">
          <FinishHeader replayObject={replayObject} spectateTime = {spectateTime} playerTime = {playerTime} newBest={newBest} mapIndex={mapIndex} oldPB={oldPB}/>
          <FinishNavigation newBest={newBest} mapIndex={mapIndex} bestReplayObject = {replayObject}/>
        </div>
      </div>
    </div>

  )
}

export default Finish;