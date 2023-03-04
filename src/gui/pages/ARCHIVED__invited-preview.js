import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useDocumentData, useCollectionData} from 'react-firebase-hooks/firestore';

import React, { useEffect } from 'react';
import {  useSearchParams, useNavigate } from 'react-router-dom';

import { drawCanvasMap, nameGhost, colorGhostCar, colorPlayerCar } from '../../game/graphics.js';
import { maps } from '../../game/map-data.js';
import { setMapData, setEnableGhost,setGameMapIndex } from '../../game/game.js';
import { resetGame } from '../../game/main.js';

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

const InvitedPreview = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const playerName  = searchParams.get("racer");
  const mapIndex = Number(searchParams.get("map"));

  const playerRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`).doc(playerName)

  const defendingPlayerData = useDocumentData(playerRef)[0];

  console.log(useCollectionData(firestore.collection("leaderboards")))
  console.log(defendingPlayerData);

  console.log(mapIndex, playerName)

  let vsReplay;
  let vsColor;

  if(defendingPlayerData)
  {
    vsReplay = defendingPlayerData.playerInputs;
    vsColor = defendingPlayerData.color;
  }

  setGameMapIndex(mapIndex)

  useEffect(() => {
    const mapPreviewCanvas = document.getElementById("map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = maps[mapIndex].data[0].length;
    mapPreviewCanvas.height = maps[mapIndex].data.length;
    drawCanvasMap(mapPreviewContext, maps[mapIndex].data)
  })

  const handleWatchReplay =  () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(vsReplay));
    resetGame(true);
    nameGhost(playerName);
    colorGhostCar(vsColor)
    navigate("/hidden");
  }

  const handleRaceAgainst =  () => {
    setEnableGhost(true);
    setMapData(maps[mapIndex],JSON.parse(vsReplay));
    resetGame();
    nameGhost(playerName);
    colorGhostCar(vsColor)
    colorPlayerCar()
    navigate("/hidden");
  }

  return (
    <div className="menu invited">

      <p>Welcome, {localStorage.getItem("playerName")}</p>
      <h1>Take a look at map {Number(mapIndex)+1}</h1>
      <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
      </div>
      <button onClick={defendingPlayerData && handleWatchReplay}>watch replay</button> 
      <button onClick={defendingPlayerData && handleRaceAgainst}>race against</button>   
    </div>
  )
}

export default InvitedPreview;