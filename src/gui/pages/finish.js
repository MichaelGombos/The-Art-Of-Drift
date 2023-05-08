import { firestore } from '../db/firebase.js';

import { serverTimestamp } from 'firebase/firestore';

import React, { useMemo } from 'react';
import {  getTimeString, getGameMapIndex, getReplayArray,  getInSpectateMode, getSpectateTime } from '../../game/game.js';

import FinishHeader from '../components/finish-header.js';
import FinishNavigation from '../components/finish-navigation.js';



let newBest = false;
let playerTime;
let spectateTime;

const sendTime = async(mapIndex,time,pName,replay,color) => {
  //firebase
  const leaderboardPlayerRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`).doc(pName)
  console.log("SENDING ON FINISH" , firestore.FieldValue ,firestore)
  await leaderboardPlayerRef.set({
    time: time,
    playerName : pName,
    playerInputs: replay,
    playerColor: color,
    createdAt: serverTimestamp()
  })
}

const checkBest = (index, oldPB) => {
  if(!getInSpectateMode() && getTimeString() < oldPB || !oldPB){
    //post to localStorage and to Database
    localStorage.setItem(`pb${index}`,getTimeString())
    localStorage.setItem(`pbReplay${index}`,JSON.stringify(getReplayArray()))

    sendTime(index, getTimeString(), localStorage.getItem("playerName"), localStorage.getItem(`pbReplay${index}`), localStorage.getItem("playerColor"))
    return true;
  }
  else{
    return false;
  }
}


const Finish = () => {
  const mapIndex = getGameMapIndex();
  const oldPB = localStorage.getItem(`pb${mapIndex}`);

  useMemo(() => {
      newBest = checkBest(mapIndex, oldPB);
      playerTime = getTimeString();
      spectateTime = getSpectateTime();
  }, [])
  return (
    <div className="menu finish" >
      <div className="finish-container">
        <FinishHeader spectateTime = {spectateTime} playerTime = {playerTime} newBest={newBest} mapIndex={mapIndex} />
        <FinishNavigation newBest={newBest} mapIndex={mapIndex}/>
      </div>
    </div>
  )
}

export default Finish;