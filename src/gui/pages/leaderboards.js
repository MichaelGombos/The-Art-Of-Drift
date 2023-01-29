import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import React, { useState , useEffect } from 'react';

import {setGameMapIndex} from "../../game/game.js"
import { maps} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"
import { drawCanvasMap } from '../../game/graphics.js';

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

const mapNames = [
  "Laying tracks",
  "Staging cars",
  "Adrift by strategem",
  "Tactical drift positions",
  "Horsepower",
  "Slipline & speed",
  "Manouvering",
  "v8 nation tactics",
  "The ralley in march",
  "Hydroplane",
  "The 9 non-first places",
  "The attack by tire",
  "The speeds of high"
]



const Leaderboards = ({setter}) => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  if(mapSelectScreen == "list"){
    return (
      <MapList setter ={setter} screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <Leaderboard setter ={setter} screenSetter={setMapSelectScreen} mapIndex={index}></Leaderboard>
    )
  }

}

const MapList = ({setter,screenSetter,setGUIMapIndex}) => {


  let listElements = []; 

  for(let i = 0; i < maps.length; i++){
    listElements.push(
      <div className="map-option" key={mapNames[i]}>
        <button onClick = {()=> {
        setGUIMapIndex(i)
        setGameMapIndex(i)
        screenSetter("detail")
        }}>#{[i+1]} {mapNames[i]}</button>
     </div>
    )
  }

  return (
    <div className="menu map-select">
    <h2>LEADERBOARDS</h2>
    <div className="map-options">
      {listElements}
    </div>

    <button onClick={() => {
      setter("main");
    }}>Back to main menu</button>
  </div>
  )
}

const Leaderboard = ({setter,screenSetter, mapIndex}) => {
  //firebase
  const leaderboardRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`)
  const query = leaderboardRef.orderBy('time');

  const leaderBoardTimes = useCollectionData(query, {idField : 'id'})[0]

  const pb = localStorage.getItem(`pb${mapIndex}`);

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
              return( <li key={racerInfo.playerName}>#{index + 1} {racerInfo.time} {racerInfo.playerName} </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Leaderboards;