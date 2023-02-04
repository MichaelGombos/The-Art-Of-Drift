import React from 'react';

import {resetGame, startGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import {freeplay, test} from  "../../game/map-data.js"

//assets
import menuFreePlay from "../../assets/menu/free-play.svg"
import menuGithub from "../../assets/menu/github.svg"
import menuMapmaker from "../../assets/menu/map-maker.svg"
import menuMapSelect from "../../assets/menu/map-select.svg"
import menuSettings from "../../assets/menu/settings.svg"
import menuLeaderboard from "../../assets/menu/leaderboard.svg"
import { useNavigate } from 'react-router-dom';

const graphics = {
  "free-play" : menuFreePlay,
  "github" : menuGithub,
  "map-maker" : menuMapmaker,
  "map-select" : menuMapSelect,
  "settings" : menuSettings,
  "leaderboard": menuLeaderboard
}

const {useState} = React



const Main = ({setPrevious}) => {
  let [hover,setHover] = useState("map-select")
  const navigate = useNavigate();

  return (
  <div className="menu main">
    <div className="wrapper">
      <div>
        <h4>Welcome, {localStorage.getItem("playerName")}</h4>
      <nav>
      <button onClick={() => navigate("/map-select") }
      onMouseEnter={() =>setHover("map-select")}>Map Select</button>
      <button onClick={() => navigate("/leaderboards")}
      onMouseEnter={() => setHover("leaderboard")}>leaderboards</button>
      <button onClick = {()=> {
        setMapData(freeplay,[[]]);
        startGame();
        navigate("/hidden")
      }}
      onMouseEnter={() =>setHover("free-play")}
      >Free Play</button>
      <a href="https://michaelgombos.github.io/browser-driving-map-creator/" target="_blank"> <button onMouseEnter={() =>setHover("map-maker")}>Map Maker</button> </a>
      <a href="https://github.com/MichaelGombos/browser-driving-demo" target="_blank"> <button onMouseEnter={() =>setHover("github")}>Github</button> </a>
      <button onClick={() => {
        navigate("/settings");
        setPrevious("main")
      }}
      onMouseEnter={() =>setHover("settings")}
      >Settings</button>
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