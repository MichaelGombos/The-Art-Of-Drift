import {setGameMapIndex} from "../../game/game.js";
import { maps , mapNames} from  "../../game/map-data.js";

import React, { useState , useEffect } from 'react';



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
    GL ,':') HF 

    <h2>Maps</h2>
    <div className="map-options">
      {listElements}
    </div>

    <button onClick={() => {
      setter("main");
    }}>Back to main menu</button>
  </div>
  )
}

export default MapList