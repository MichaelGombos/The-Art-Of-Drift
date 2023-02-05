import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import React, { useState , useEffect } from 'react';

import { resetGame } from '../../game/main.js';
import {setGameMapIndex, setMapData, setEnableGhost} from "../../game/game.js"
import { maps , mapNames} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"
import { drawCanvasMap , nameGhost, colorGhostCar, colorPlayerCar} from '../../game/graphics.js';

import MapList from '../components/map-list.js';
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

const Leaderboards = () => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  if(mapSelectScreen == "list"){
    return (
      <MapList screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <Leaderboard screenSetter={setMapSelectScreen} mapIndex={index}></Leaderboard>
    )
  }

}

const Leaderboard = ({screenSetter, mapIndex}) => {
  const navigate = useNavigate();
  //firebase
  const leaderboardRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`)
  const query = leaderboardRef.orderBy('time');

  const leaderBoardTimes = useCollectionData(query, {idField : 'id'})[0]

  const pb = localStorage.getItem(`pb${mapIndex}`);

  const handleWatchReplay = (replay,name,color) => () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    resetGame(true);
    nameGhost(name);
    colorGhostCar(color)
    navigate("/hidden");
  }

  const handleRaceAgainst = (replay,name,color) => () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(replay));
    resetGame();
    nameGhost(name);
    colorGhostCar(color)
    colorPlayerCar()
    navigate("/hidden");
  }

  const medals = {  
    author: pb <= replays[mapIndex].author.time,
    gold : pb <= replays[mapIndex].hard.time,
    silver : pb <= replays[mapIndex].normal.time,
    bronze : pb <= replays[mapIndex].easy.time
  }

  useEffect(() => {
    const mapPreviewCanvas = document.getElementById("map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = maps[mapIndex].data[0].length;
    mapPreviewCanvas.height = maps[mapIndex].data.length;
    drawCanvasMap(mapPreviewContext, maps[mapIndex].data)
  })

  return(
    <div className="menu leaderboard">
      <h1>{mapNames[mapIndex]}</h1>
      <button onClick = {()=> {
      screenSetter("list")
      }}>Back</button>
      <div className="map-info">
        <div className="player-stats">
          <h4>Personal Best: {pb || "UNSET"}</h4>
        </div>
        <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
        </div>
        <div id="leaderboard">
          <h4>Global Leaderboard</h4>
          <ul className="column">
            {leaderBoardTimes && leaderBoardTimes.map((racerInfo,index) => {
              console.log(leaderBoardTimes)
              return( <li  key={racerInfo.playerName}>
                <div className="time-info">#{index + 1} {racerInfo.time} {racerInfo.playerName}</div> 
                <div className="time-menu">{racerInfo.playerInputs && <> <button onClick={handleWatchReplay(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor)}>watch replay</button> <button onClick={handleRaceAgainst(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor)}>race against</button>    </>}</div>
              </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Leaderboards;