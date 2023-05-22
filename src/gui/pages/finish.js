import React, { useMemo , useState} from 'react';
import {  getTimeString, getGameMapIndex, getReplayArray,  getInSpectateMode, getSpectateTime, getReplayObject, getReplayFinishTime, getReplayFinishSeconds } from '../../game/game.js';

import FinishHeader from '../components/finish-header.js';
import FinishNavigation from '../components/finish-navigation.js';
import { addReplay, addToMapHistory, getCurrentAuthProfile, getCurrentAuthReplay, getDatabaseTime, getMapHistory } from '../helpers/databaseFacade.js';



let newBest = false;
let playerTime;
let spectateTime;

const sendTime = async(mapIndex,replayObject) => {
  addReplay(mapIndex,replayObject)
  console.log("map History", getMapHistory())
}

const checkBest = (setter, index, oldPB) => {
  const finishTime = getReplayFinishTime();
  const finishSeconds = getReplayFinishSeconds();


  if(!getInSpectateMode() && finishTime < oldPB || !oldPB || oldPB == "00:00:00.000"){
    //post to localStorage and to Database
    //TODO shorten this.
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
  else if(!getInSpectateMode()){
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
      setter(replayObject)

    })


    const historyDate = new Date;
    addToMapHistory(index,{time : finishTime, timeSeconds: finishSeconds, createdAt:`${historyDate.getMonth()}/${historyDate.getDay()}/${historyDate.getFullYear()}-${historyDate.getHours()}:${historyDate.getMinutes()}`}) //database time not yet supported in arrays.
    console.log("databasetime", getDatabaseTime()) 
    return false;
  }
  else{
    return false;
  }
}


const Finish = () => {
  const [replayObject, setReplayObject] = useState({big:"chungus"})

  const mapIndex = getGameMapIndex();
  const [oldPB,setOldPB] = useState("00:00:00.000");
  const [playerTime,setPlayerTime] = useState("unset");
  useMemo( () => {
    getCurrentAuthReplay(mapIndex).then((oldBest) => {
      console.log("This is the differehcnec, ", oldBest, oldPB, mapIndex)
      setOldPB(oldBest ? oldBest.time : oldPB);

      newBest = checkBest(setReplayObject, mapIndex, oldBest ? oldBest.time : oldPB);
      setPlayerTime(getReplayFinishTime());
      spectateTime = getSpectateTime();
    })
  }

  , [])


  return (
    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu finish-menu col-2 align-center  gap-md">
          <FinishHeader replayObject={replayObject} spectateTime = {spectateTime} playerTime = {playerTime} newBest={newBest} mapIndex={mapIndex} oldPB={oldPB}/>
          <FinishNavigation newBest={newBest} mapIndex={mapIndex} bestReplayObject = {replayObject} playerTime = {playerTime}/>
        </div>
      </div>
    </div>

  )
}

export default Finish;