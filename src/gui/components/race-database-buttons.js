import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useDocumentData, useCollectionData} from 'react-firebase-hooks/firestore';

import React from "react"
import { useNavigate } from 'react-router-dom';

import { maps } from "../../game/map-data.js";
import { startGame } from '../../game/main.js';
import {setMapData, setEnableGhost, setSpectateTime, setSpectateMode,setGameMapIndex} from "../../game/game.js"

import { nameGhost, colorGhostCar, colorPlayerCar, drawGhostVehicle, drawPlayerVehicle} from '../../game/graphics.js';
import Button from './button.js';
import { getCurrentAuthProfile } from '../helpers/databaseFacade.js';

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

const RaceDatabaseButtons = ({replayObject,mapIndex, isTextShort, mapObject}) => {
  const navigate = useNavigate();  
  console.log("This is the map we are sending...:" ,mapObject)
  // console.log(allData)
  
  let vsReplay;
  let vsColor;
  let mapInfo;

  if(replayObject)
  {
    vsReplay = replayObject.playerInputs;
    vsColor = replayObject.color;
  }

  if(mapObject){
    mapInfo = mapObject;
  }else{
    mapInfo = maps[mapIndex];
  }

  setGameMapIndex(mapIndex)

  const handleWatchReplay = (replay,name,vehicleID,spectateTime) => () => {

    getCurrentAuthProfile().then(profileData => {
      setSpectateMode(true);
      updateGhostCarEnabledList(0,true)
      updateGhostCarEnabledList(1,false)
      updateGhostCarEnabledList(2,false)
      updateGhostCarEnabledList(3,false)
      updateGhostCarEnabledList(4,false)
      setEnableGhost(true);
      setMapData(mapInfo,replay);
      setSpectateMode(true);
      startGame();
      nameGhost(name);

      colorGhostCar("white")
      drawPlayerVehicle(profileData.vehicleID);
      drawGhostVehicle(vehicleID);
      navigate("/countdown");
    })
  }

  const handleRaceAgainst = (replay,name,vehicleID) => () => {

    getCurrentAuthProfile().then(profileData => {
      setSpectateMode(false);
      updateGhostCarEnabledList(0,true)
      updateGhostCarEnabledList(1,false)
      updateGhostCarEnabledList(2,false)
      updateGhostCarEnabledList(3,false)
      updateGhostCarEnabledList(4,false)
      setEnableGhost(true);
      setMapData(mapInfo,replay);
      setSpectateMode(false);
      startGame();
      nameGhost(name);
      
      colorGhostCar("white")
      drawPlayerVehicle(profileData.vehicleID);
      drawGhostVehicle(vehicleID);
      navigate("/countdown");
    })
  }
  if(replayObject){
    console.log(replayObject);
    return (
      <>
            <Button 
            style="primary" 
            clickHandler={handleRaceAgainst(replayObject.replay, replayObject.playerName, replayObject.playerVehicle)}>
              {isTextShort ? "race them" : "race against them"}
              </Button>
            <Button 
            style="light" 
            clickHandler={handleWatchReplay(replayObject.replay, replayObject.playerName, replayObject.playerVehicle,replayObject.time)}>
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