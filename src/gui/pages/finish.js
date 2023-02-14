import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import React, { useMemo, useState } from 'react';
import { setMapData, getTimeString, getGameMapIndex, getReplayArray, setEnableGhost, getInSpectateMode, getSpectateTime, setSpectateTime } from '../../game/game.js';
import { maps } from '../../game/map-data.js';
import {resetGame} from "../../game/main.js"
import { useNavigate } from 'react-router-dom';

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

const racePB = (index) => {
 setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))
}

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


const Finish = ({setter}) => {
  const navigate = useNavigate();
  const [inviteCopied, setInviteCopied] = useState(false);
  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  let playerName = localStorage.getItem("playerName")
  let mapIndex = getGameMapIndex();
  let oldPB = localStorage.getItem(`pb${mapIndex}`);

  useMemo(() => {
      newBest = checkBest(mapIndex, oldPB);
      playerTime = getTimeString();
      spectateTime = getSpectateTime();
  }, [])
  return (
    <div className="menu finish" >
      <div className="finish-container">
        {getInSpectateMode() ?  <h1 className="f-p1">Replay Over</h1> : <h1 className="f-h1">F I N I S H</h1>}
       
        <div>
          <p>{getInSpectateMode() ? `REPLAY TIME: ${spectateTime}` : `YOUR TIME: ${playerTime} `}<span className="best-time">{newBest ? "NEW BEST" : null}</span></p>
          <p>Your best: {localStorage.getItem(`pb${mapIndex}`)}</p>
        </div>
        <nav>
          {getInSpectateMode() ? 
          <button onClick={() => {
            resetGame(true);
            navigate("/hidden");
          }}>Watch Again</button>
        : 
        <button className = {inviteCopied && "disabled"}onClick={() => {
          copyToClipboard(`http://www.theartofdrift.com/invited?racer=${playerName}&map=${mapIndex}`).then(setInviteCopied(true));
        }}>{inviteCopied ? "Copied!" : "Copy Invite Link"}</button>}

          <button onClick={() => {
            resetGame();
            navigate("/hidden")
          }}>Race Again</button>  
          {newBest && 
          <button onClick = {()=> {
            racePB(mapIndex,localStorage.getItem(`pbReplay${mapIndex}`));
            setEnableGhost(true);
            resetGame();
            navigate("/hidden");
            }}>Race New Best</button>
          }

          <button onClick={() => {
            navigate("/map-select");
          }}>Back to map select</button>
        </nav>
      </div>
    </div>
  )
}

export default Finish;