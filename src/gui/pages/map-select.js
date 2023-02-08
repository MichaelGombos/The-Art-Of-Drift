import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import React, { useState , useEffect } from 'react';

import {resetGame} from "../../game/main.js"
import {setMapData,setEnableGhost,getEnableGhost} from "../../game/game.js"
import { maps, mapNames} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"
import { colorGhostCar, colorPlayerCar, drawCanvasMap, nameGhost } from '../../game/graphics.js';
import { map } from '../../game/elements.js';

import playIcon from '../../assets/map-select/play.svg';
import playIconLight from '../../assets/map-select/play-light.svg';
import watchIcon from '../../assets/map-select/watch.svg';
import watchIconLight from '../../assets/map-select/watch-light.svg';


import star from '../../assets/map-select/star.png';
import lockedMedal from '../../assets/map-select/medal_locked.png';
import authorMedal from '../../assets/map-select/medal_author.png';
import goldMedal from '../../assets/map-select/medal_gold.png';
import silverMedal from '../../assets/map-select/medal_silver.png';
import bronzeMedal from '../../assets/map-select/medal_bronze.png';


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

const ghostNames = {
  easy : "Bronze",
  normal : "Silver",
  hard : "Gold",
  author : "Author",
  personalBest: "best time"
}

//assets
const ghostMedals = {
  personalBest : star,
  easy : bronzeMedal,
  normal : silverMedal,
  hard : goldMedal,
  author : authorMedal,
  locked : lockedMedal
}


const setMap = (index,difficulty) => { //sets map returns ghost name
  if(difficulty == "personalBest"){
    setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))

    return ("personal best");
  }
  else{ 
    setMapData(maps[index],replays[index][difficulty]["replay"])
    console.log(difficulty, "here");
    return (ghostNames[difficulty] + " medal");
  }
}

const MapSelect = () => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  if(mapSelectScreen == "list"){
    return (
      <MapList  screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <MapDetail screenSetter={setMapSelectScreen} mapIndex={index}></MapDetail>
    )
  }

}

const MedalRow = ({best, medal,currentDiff, setDiff,isGhostEnabled, setNewGhostEnabled, index}) => {

  const unlockedMedals = {  
    personalBest : true,
    author: best <= replays[index].author.time,
    hard : best <= replays[index].hard.time,
    normal : best <= replays[index].normal.time,
    easy : best <= replays[index].easy.time
  }


  
  if(medal == "author" && !unlockedMedals.hard){
    return "";
  }
  if(medal == "personalBest" && !best){
    return "";
  }
  return (  
    <li className={`medal-row ${unlockedMedals[medal] ? "" : "locked-text"}`}>
      <div className="medal-type"> <img src={unlockedMedals[medal] ? ghostMedals[medal] : ghostMedals["locked"]}/> {ghostNames[medal]} </div> 
      <div className="medal-menu"> 
        {medal == "personalBest" ? best : replays[index][medal].time}
      <button className={(currentDiff == medal && isGhostEnabled) ? "set" : ""} onClick={ () => {
        setDiff(medal)
        setNewGhostEnabled(true)
      }
      }>{currentDiff == medal && isGhostEnabled ? "Selected!" : "select"}</button>
      </div>
    </li>
  )
}

const MapDetail = ({screenSetter, mapIndex}) => {
  const navigate = useNavigate();
  //firebase
  const leaderboardRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`)
  const query = leaderboardRef.orderBy('time').limit(5);

  const leaderBoardTimes = useCollectionData(query, {idField : 'id'})[0]

  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [difficulty, setDifficulty] = useState("easy");
  const pb = localStorage.getItem(`pb${mapIndex}`);


  useEffect(() => {
    const mapPreviewCanvas = document.getElementById("map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = maps[mapIndex].data[0].length;
    mapPreviewCanvas.height = maps[mapIndex].data.length;
    drawCanvasMap(mapPreviewContext, maps[mapIndex].data)
  })

  const handleRaceLocal = (index,difficulty) =>{
    let ghostName = setMap(index,difficulty);
    setEnableGhost(newEnableGhost);
    resetGame();
    nameGhost(ghostName)
    colorGhostCar(difficulty);
    colorPlayerCar()
    navigate("/hidden");
  }

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


  return(
    <div className="menu map-select">
      <h1 className="f-h3">{mapNames[mapIndex]}</h1>
      <h4>Personal Best: {pb || "UNSET"}</h4>
      <div className="map-info-wrapper">
      <div className="map-info">
        <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
        </div>
        <div className="player-stats">
          <ul className="column">
          {/* const medalRow = ({medal,setDiff,setEnableGhost, index}) => { */}
            <MedalRow medal="personalBest" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
            <MedalRow medal="easy" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
            <MedalRow medal="normal" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
            <MedalRow medal="hard" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
            <MedalRow medal="author" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />


          </ul>
        </div>
      </div>
      <div className="map-info-menu">
        <button  
        onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
        className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>
        <button onClick = {()=> {
        screenSetter("list")
        }}>Back to map list</button>

        <button className="play-button f-h3" onClick = {()=> {
        handleRaceLocal(mapIndex,difficulty);
        }}>play</button>
      </div>
      </div>
    </div>
  )
}

export default MapSelect;