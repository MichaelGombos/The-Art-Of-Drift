import {setGameMapIndex} from "../../game/game.js";
import { maps , mapNames} from  "../../game/map-data.js";

import React, { useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";



const MapList = ({screenSetter,setGUIMapIndex}) => {
  let listElements = []; 
  const navigate = useNavigate()

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
  <div className="menu map-list">

      <h2 className="f-h2">MAP LIST</h2>
      <div className="map-options">
        {listElements}
      </div>

      <button className="md-btn"onClick={() => {
        navigate("/main");
      }}>Back to main menu</button>
  </div>
  )
}

export default MapList