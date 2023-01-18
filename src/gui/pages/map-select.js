import React from 'react';

import {resetGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import { maps} from  "../../game/map-data.js"
import { replays } from "../../game/replay.js"

const mapNames = [
  "Taste of texas",
  "Smile :D",
  "Eye of the drift holder",
  "Da lyne",
  "Hatchet raceway"
]

const {useState} = React

const MapSelect = ({setter}) => { 
  let [mapSelectScreen, setMapSelectScreen] = useState("list"); //list or detail 
  let [index,setIndex] = useState(0);

  console.log(index);
  if(mapSelectScreen == "list"){
    return (
      <MapList setter ={setter} screenSetter={setMapSelectScreen} setMapIndex={setIndex}/>
    )
  }
  else if(mapSelectScreen == "detail"){
    return(
      <MapDetail setter ={setter} screenSetter={setMapSelectScreen} mapIndex={index}></MapDetail>
    )
  }

}

const MapList = ({setter,screenSetter,setMapIndex}) => {


  let listElements = []; 

  for(let i = 0; i < maps.length; i++){
    listElements.push(
      <div className="map-option" key={mapNames[i]}>
        <h3>{mapNames[i]}</h3>
        <button onClick = {()=> {
        setMapIndex(i)
        screenSetter("detail")
        }}>Select</button>
     </div>
    )
  }

  return (
    <div className="menu map-select">
    GL ,':') HF YOOOS

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


  let [difficulty, setDifficulty] = useState("easy");

  return(
    <div className="menu map-select">
      <h1>{mapNames[mapIndex]}</h1>

      <label htmlFor="difficulty">Difficulty</label>
      <div name="difficulty" id="difficulty">
       <button value="easy" className={difficulty == "easy" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>silver</button>
       <button value="normal" className={difficulty == "normal" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)} >gold</button>
       <button value="hard" className={difficulty == "hard" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>author</button>
      </div>

      <button onClick = {()=> {
      setMapData(maps[mapIndex],replays[mapIndex][difficulty]);
      resetGame();
      setter("hidden")
      }}>P L A Y</button>
      <button onClick = {()=> {
      screenSetter("list")
      }}>Back</button>
    </div>
  )
}

export default MapSelect;