import React, { useEffect } from 'react';

import {resetGame} from "../../game/main.js"
import {setMapData,setEnableGhost,getEnableGhost,setGameMapIndex} from "../../game/game.js"
import { maps} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"
import { drawCanvasMap } from '../../game/graphics.js';

const mapNames = [
  "Taste of texas",
  "Smile :D",
  "Eye of the drift holder",
  "Da lyne",
  "Hatchet raceway"
]

const {useState} = React

const setMap = (index,difficulty) => {
  if(difficulty == "personalBest"){
    setMapData(maps[index],JSON.parse(localStorage.getItem(`pbReplay${index}`)))
  }
  else{ 
    setMapData(maps[index],replays[index][difficulty])
  }
}

const MapSelect = ({setter}) => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  console.log(index);
  if(mapSelectScreen == "list"){
    return (
      <MapList setter ={setter} screenSetter={setMapSelectScreen} setGUIMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <MapDetail setter ={setter} screenSetter={setMapSelectScreen} mapIndex={index}></MapDetail>
    )
  }

}

const MapList = ({setter,screenSetter,setGUIMapIndex}) => {


  let listElements = []; 

  for(let i = 0; i < maps.length; i++){
    listElements.push(
      <div className="map-option" key={mapNames[i]}>
        <h3>{mapNames[i]}</h3>
        <button onClick = {()=> {
        setGUIMapIndex(i)
        setGameMapIndex(i)
        screenSetter("detail")
        }}>Select</button>
     </div>
    )
  }

  return (
    <div className="menu map-select">
    GL ,':') HF 

    <div className="map-options">
      <h2>Maps</h2>
      {listElements}
    </div>

    <button onClick={() => {
      setter("main");
    }}>Back to main menu</button>
  </div>
  )

}

const MapDetail = ({setter,screenSetter, mapIndex}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [difficulty, setDifficulty] = useState("easy");
  const pb = localStorage.getItem(`pb${mapIndex}`);

  useEffect(() => {
    const mapPreviewCanvas = document.getElementById("map-preview");
    const mapPreviewContext = mapPreviewCanvas.getContext("2d")
    mapPreviewCanvas.width = maps[mapIndex][0].length;
    mapPreviewCanvas.height = maps[mapIndex].length;
    drawCanvasMap(mapPreviewContext, maps[mapIndex])
  })

  return(
    <div className="menu map-select">
      <h1>{mapNames[mapIndex]}</h1>
      <canvas id="map-preview"></canvas>
      <h3>BEST TIME {pb || "UNSET"}</h3>
      <button  
      onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
      className={newEnableGhost ? "set" : "none"}>Click to {newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>
      <label htmlFor="difficulty">Difficulty</label>
      <div name="difficulty" id="difficulty" className={newEnableGhost ? "enabled" : "disabled"}>
       <button value="easy" className={difficulty == "easy" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>silver</button>
       <button value="normal" className={difficulty == "normal" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)} >gold</button>
       <button value="hard" className={difficulty == "hard" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>author</button>
       {localStorage.getItem(`pbReplay${mapIndex}`) ? <button value="personalBest" className={difficulty == "personalBest" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>personal best</button> : null}
      </div>

      <button onClick = {()=> {
      setMap(mapIndex,difficulty);
      setEnableGhost(newEnableGhost);
      resetGame();
      setter("hidden");
      }}>P L A Y</button>
      <button onClick = {()=> {
      screenSetter("list")
      }}>Back</button>
    </div>
  )
}

export default MapSelect;