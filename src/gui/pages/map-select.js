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
  author : "Author"
}


const setMap = (index,difficulty) => { //sets map returns ghost name
  if(difficulty == "personalBest"){
    setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))

    return ("personal best");
  }
  else{ 
    setMapData(maps[index],replays[index][difficulty]["replay"])
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



const MapDetail = ({screenSetter, mapIndex}) => {
  const navigate = useNavigate();
  //firebase
  const leaderboardRef = firestore.collection("leaderboards").doc("desktop").collection(`map${mapIndex+1}`)
  const query = leaderboardRef.orderBy('time').limit(5);

  const leaderBoardTimes = useCollectionData(query, {idField : 'id'})[0]

  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [difficulty, setDifficulty] = useState("easy");
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
      <h1>{mapNames[mapIndex]}</h1>
      <div className="map-info">
        <div className="player-stats">
          <h4>Personal Best: {pb || "UNSET"}</h4>
          <ul className="column">
            {medals.gold ? <li className={`row ${medals.author ? "author-unlocked" : null}`}><div className={`medal`}></div><p>author : {replays[mapIndex].author.time}</p></li> : null}
            <li className={`row ${medals.gold ? "gold-unlocked" : null}`}><div className={`medal`}></div><p>gold : {replays[mapIndex].hard.time}</p></li>
            <li className={`row ${medals.silver ? "silver-unlocked" : null}`}><div className={`medal`}></div><p>silver : {replays[mapIndex].normal.time}</p></li>
            <li className={`row ${medals.bronze ? "bronze-unlocked" : null}`}><div className={`medal`}></div><p>bronze : {replays[mapIndex].easy.time}</p></li>
          </ul>
        </div>
        <div className='preview-wrapper'>
          <canvas id="map-preview"></canvas>
        </div>
        <div id="leaderboard">
          <h4>Top 5 Worldwide</h4>
          <ul className="column">
            {leaderBoardTimes && leaderBoardTimes.map((racerInfo,index) => {
              console.log(leaderBoardTimes)
              return( <li  key={racerInfo.playerName}>
                        <div className="time-info">#{index + 1} {racerInfo.time} {racerInfo.playerName}</div> 
                        <div className="time-menu">{racerInfo.playerInputs && 
                        <> 
                          <button onClick={handleWatchReplay(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor)}><img src={watchIcon}/></button> 
                          <button onClick={handleRaceAgainst(racerInfo.playerInputs, racerInfo.playerName, racerInfo.playerColor)}><img src={playIcon}/></button>
                        </>}</div>
                      </li>)
            })}
          </ul>
        </div>
      </div>
      <button  
      onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
      className={newEnableGhost ? "set" : "none"}>Click to {newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>
      <label htmlFor="difficulty">Difficulty</label>
      <div name="difficulty" id="difficulty" className={newEnableGhost ? "enabled" : "disabled"}>
       <button value="easy" className={difficulty == "easy" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>bronze</button>
       <button value="normal" className={difficulty == "normal" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)} >silver</button>
       <button value="hard" className={difficulty == "hard" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>gold</button>
       {medals.bronze ?<button value="author" className={difficulty == "author" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>author</button> : null}
       {localStorage.getItem(`pbReplay${mapIndex}`) ? <button value="personalBest" className={difficulty == "personalBest" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>personal best</button> : null}
      </div>

      <button onClick = {()=> {
      handleRaceLocal(mapIndex,difficulty);
      }}>P L A Y</button>
      <button onClick = {()=> {
      screenSetter("list")
      }}>Back</button>
    </div>
  )
}

export default MapSelect;