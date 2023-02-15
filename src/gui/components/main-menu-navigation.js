import React from 'react';

import { useNavigate } from 'react-router-dom';

import { startGame} from "../../game/main.js"
import {setMapData} from "../../game/game.js"
import {freeplay } from  "../../game/map-data.js"

const MainMenuNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav>
    <button onClick={() => navigate("/map-select") }>Map Select</button>
    <button onClick={() => navigate("/leaderboards")}>leaderboards</button>
    <button onClick = {()=> {
      setMapData(freeplay,[[]]);
      startGame(false);
      navigate("/hidden")
    }}
    >Free Play</button>
    <button onClick = {()=> {
      navigate("/map-import")
    }}
    >map import</button>
    <a href="https://michaelgombos.github.io/browser-driving-map-creator/" target="_blank"> <button >Map Maker</button> </a>
    <a href="https://github.com/MichaelGombos/browser-driving-demo" target="_blank"> <button >Github</button> </a>
    <button onClick={() => {
      navigate("/settings");
    }}>Settings</button>
</nav>
  )
}

export default MainMenuNavigation;