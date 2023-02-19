import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import React, { useEffect } from 'react';


import { maps , mapNames} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"
import { drawCanvasMap } from '../../game/graphics.js';



import LeaderboardTime from './leaderboard-time.js';

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

const Leaderboard = ({screenSetter, mapIndex}) => {
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
      <header >
        <h2 className="">MAP <span className="text-color-secondary-500">{mapIndex+1}</span> {mapNames[mapIndex]}</h2>
        <h1 className='f-h2'>LEADERBOARDS </h1>
      </header>
      <div className="leaderboard-info-wrapper">
      <div className="leaderboard-info">
        <div className="player-stats">
            <h4>YOUR BEST: <span className="text-color-secondary-500">{pb || "UNSET"}</span></h4>
        </div>
        <div className="map-info">
          <div id="leaderboard">
            <ul className="column">
              <button onClick = {()=> {
              screenSetter("list")
              }}>Back</button>
              {leaderBoardTimes && leaderBoardTimes.map((racerInfo,index) => {
                return( <LeaderboardTime key={racerInfo.playerName} racerInfo={racerInfo} index={index} mapIndex={mapIndex}/>)
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
      </div>
      </div>


    </div>
  )
}

export default Leaderboard;