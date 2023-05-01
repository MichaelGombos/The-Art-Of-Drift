import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import React, { useMemo , useState} from 'react';
import {  getTimeString, getGameMapIndex, getReplayArray,  getInSpectateMode, getSpectateTime, getReplayObject } from '../../game/game.js';

import FinishHeader from '../components/finish-header.js';
import FinishNavigation from '../components/finish-navigation.js';
import { addReplay, getCurrentAuthProfile, getCurrentAuthReplay, getDatabaseTime } from '../helpers/databaseFacade.js';

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

const sendTime = async(mapIndex,replayObject) => {

  addReplay(mapIndex,replayObject)


  // pName = `NAME_HASH_${Math.floor(Math.random()*10)}_${Math.floor(Math.random()*500)}`
  // //firebase
  // const leaderboardPlayerRef = firestore.collection("leaderboards").doc("desktop").collection(`map${Number(mapIndex)+1}`).doc(pName)

  // await leaderboardPlayerRef.set({
  //   time: time,
  //   playerName : pName,
  //   playerInputs: replay,
  //   playerColor: color,
  //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
  // })
}

const checkBest = (setter, index, oldPB) => {
  const finishTime = getTimeString();
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

      console.log("but itshould actually be sending here?")
    })


    console.log("send it!");

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