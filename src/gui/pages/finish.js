import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import React, { useMemo } from 'react';
import {  getTimeString, getGameMapIndex, getReplayArray,  getInSpectateMode, getSpectateTime } from '../../game/game.js';

import FinishHeader from '../components/finish-header.js';
import FinishNavigation from '../components/finish-navigation.js';

firebase.initializeApp({
  apiKey: "AIzaSyDTGF6K4sLCAszEdJlBZsbFahZiFr-zkA8",
  authDomain: "the-art-of-drift.firebaseapp.com",
  projectId: "the-art-of-drift",
  storageBucket: "the-art-of-drift.appspot.com",
  messagingSenderId: "469347431957",
  appId: "1:469347431957:web:35dbf2311619fad7f6801c",
  measurementId: "G-68K0WQF6PS"
})

const firestore = firebase.firestore();


let newBest = false;
let playerTime;
let spectateTime;

const sendTime = async(mapIndex,time,pName,replay,color) => {
  //firebase
  const leaderboardPlayerRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`).doc(pName)

  await leaderboardPlayerRef.set({
    time: time,
    playerName : pName,
    playerInputs: replay,
    playerColor: color,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
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