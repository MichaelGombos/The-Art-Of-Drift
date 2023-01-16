import React from 'react';

import {startGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import {freeplay, test} from  "../../game/map-data.js"

//assets
import menuFreePlay from "../../assets/menu/free-play.svg"
import menuGithub from "../../assets/menu/github.svg"
import menuMapmaker from "../../assets/menu/map-maker.svg"
import menuMapSelect from "../../assets/menu/map-select.svg"
import menuSettings from "../../assets/menu/settings.svg"

const graphics = {
  "free-play" : menuFreePlay,
  "github" : menuGithub,
  "map-maker" : menuMapmaker,
  "map-select" : menuMapSelect,
  "settings" : menuSettings
}

const {useState} = React



const Main = ({setter,setPrevious}) => {
  let [hover,setHover] = useState("map-select")
  return (
  <div className="menu main">
    <div className="wrapper">
      <div>
        <h2>Main Menu</h2>
      <nav>
      <button onClick={() => setter("map select") }
      onMouseEnter={() =>setHover("map-select")}>Map Select</button>
      <button onClick = {()=> {
        setMapData(freeplay,[[]]);
        startGame();
        setter("hidden")
      }}
      onMouseEnter={() =>setHover("free-play")}
      >Free Play</button>
      <a href="https://michaelgombos.github.io/browser-driving-map-creator/"> <button onMouseEnter={() =>setHover("map-maker")}>Map Maker</button> </a>
      <a href="https://github.com/MichaelGombos/browser-driving-demo"> <button onMouseEnter={() =>setHover("github")}>Github</button> </a>
      <button onClick={() => {
        setter("options");
        setPrevious("main")
      }}
      onMouseEnter={() =>setHover("settings")}
      >Options</button>
    </nav>
      </div>

      <div className="menu-splash-wrapper">
        <img className={`menu-splash menu-splash-${hover}`} src={graphics[hover]}></img>
      </div>
    </div>
  </div>
  )
}

export default Main;