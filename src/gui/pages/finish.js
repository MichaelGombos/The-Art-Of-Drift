import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import React, { useMemo } from 'react';
import { getTimeString, getGameMapIndex, getReplayArray } from '../../game/game.js';

import {resetGame} from "../../game/main.js"

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

const sendTime = async(mapIndex,time,pName) => {
  //firebase
  const leaderboardPlayerRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`).doc(pName)

  await leaderboardPlayerRef.set({
    time: time,
    playerName : pName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}

const checkBest = (index, oldPB) => {
  if(getTimeString() < oldPB || !oldPB){
    //post to localStorage and to Database
    localStorage.setItem(`pb${index}`,getTimeString())
    localStorage.setItem(`pbReplay${index}`,JSON.stringify(getReplayArray()))

    sendTime(index, getTimeString(), localStorage.getItem("playerName"))
    return true;
  }
  else{
    return false;
  }
}


const Finish = ({setter}) => {

  let mapIndex = getGameMapIndex();
  let oldPB = localStorage.getItem(`pb${mapIndex}`);


  

  useMemo(() => {
      newBest = checkBest(mapIndex, oldPB);
  }, [])

  return (
    <div className="menu finish" >
      <div className="finish-container">
        <h1>Finish!</h1>
        <div>
          <p>Your time: {getTimeString()} <span className="best-time">{newBest ? "NEW BEST" : null}</span></p>
          <p>Your best: {localStorage.getItem(`pb${mapIndex}`)}</p>
        </div>
        <nav>
          <button onClick={() => {
            resetGame();
            setter("hidden")
          }}>Restart Race</button>

          <button onClick={() => {
            setter("map select");
          }}>Map Select</button>
        </nav>
      </div>
    </div>
  )
}

export default Finish;