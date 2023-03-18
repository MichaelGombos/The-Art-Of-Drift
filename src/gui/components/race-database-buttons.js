import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useDocumentData, useCollectionData} from 'react-firebase-hooks/firestore';

import React from "react"
import { useNavigate } from 'react-router-dom';

import { maps } from "../../game/map-data.js";
import { startGame } from '../../game/main.js';
import {setMapData, setEnableGhost, setSpectateTime, setSpectateMode,setGameMapIndex} from "../../game/game.js"

import { nameGhost, colorGhostCar, colorPlayerCar} from '../../game/graphics.js';
import Button from './button.js';

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

const RaceDatabaseButtons = ({replayObject,mapIndex, isTextShort}) => {
  const navigate = useNavigate();  

  // console.log(allData)
  
  let vsReplay;
  let vsColor;

  if(replayObject)
  {
    vsReplay = replayObject.playerInputs;
    vsColor = replayObject.color;
  }

  setGameMapIndex(mapIndex)

  const handleWatchReplay = (replay,name,color,spectateTime) => () => {
    console.log(JSON.parse(replay))
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    setSpectateMode(true);
    startGame();
    nameGhost(name);
    colorGhostCar(color)
    navigate("/countdown");
  }

  const handleRaceAgainst = (replay,name,color) => () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    setSpectateMode(false);
    startGame();
    nameGhost(name);
    colorGhostCar(color)
    colorPlayerCar()
    navigate("/countdown");
  }
  if(replayObject){
    return (
      <>
            <Button 
            style="primary" 
            clickHandler={handleRaceAgainst(replayObject.playerInputs, replayObject.playerName, replayObject.playerColor)}>
              {isTextShort ? "race them" : "race against them"}
              </Button>
            <Button 
            style="light" 
            clickHandler={handleWatchReplay(replayObject.playerInputs, replayObject.playerName, replayObject.playerColor,replayObject.time)}>
            {isTextShort ? "watch replay" : "watch the replay"}
              </Button> 
      </>
    )  
  }
  else{
    return(null)
  }

}

export default RaceDatabaseButtons;