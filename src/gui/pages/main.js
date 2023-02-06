import React from 'react';
import { useNavigate } from 'react-router-dom';

import {resetGame, startGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import {freeplay, test} from  "../../game/map-data.js"
import ScrollingBackground from '../components/scrolling-background.js';
import StackedBrandText from '../components/stacked-brand-text.js';

//assets
// import menuFreePlay from "../../assets/menu/free-play.svg"
// import menuGithub from "../../assets/menu/github.svg"
// import menuMapmaker from "../../assets/menu/map-maker.svg"
// import menuMapSelect from "../../assets/menu/map-select.svg"
// import menuSettings from "../../assets/menu/settings.svg"
// import menuLeaderboard from "../../assets/menu/leaderboard.svg"


// const graphics = {
//   "free-play" : menuFreePlay,
//   "github" : menuGithub,
//   "map-maker" : menuMapmaker,
//   "map-select" : menuMapSelect,
//   "settings" : menuSettings,
//   "leaderboard": menuLeaderboard
// }

const {useState} = React



const Main = ({setPrevious}) => {
  const navigate = useNavigate();

  return (
  <div className="menu main">
      <div>
          <p className='text-color-primary-900 f-p2'>Welcome, {localStorage.getItem("playerName")}</p>
        <nav>
        <button onClick={() => navigate("/map-select") }>Map Select</button>
        <button onClick={() => navigate("/leaderboards")}>leaderboards</button>
        <button onClick = {()=> {
          setMapData(freeplay,[[]]);
          startGame();
          navigate("/hidden")
        }}
        >Free Play</button>
        <a href="https://michaelgombos.github.io/browser-driving-map-creator/" target="_blank"> <button >Map Maker</button> </a>
        <a href="https://github.com/MichaelGombos/browser-driving-demo" target="_blank"> <button >Github</button> </a>
        <button onClick={() => {
          navigate("/settings");
          setPrevious("main")
        }}>Settings</button>
      </nav>
    </div>
    <StackedBrandText size="f-h2" content="the art of drift"/>

    <ScrollingBackground/>
  </div>
  )
}

export default Main;