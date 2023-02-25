import React from 'react';

import { useNavigate } from 'react-router-dom';

import { startGame, resetGame, unPauseGame} from "../../game/main.js"
import {setGameMapIndex, setMapData} from "../../game/game.js"
import {freeplay, test } from  "../../game/map-data.js"

const MainMenuNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav>
    <button onClick={() => navigate("/map-select") }>Map Select</button>
    <button onClick={() => navigate("/leaderboards")}>leaderboards</button>
    <button onClick = {()=> {
      setGameMapIndex(undefined)
      setMapData(freeplay,[[]]);
      resetGame();
      navigate("/hidden")
    }}
    >Free Play</button>
   <button onClick = {()=> {
      setGameMapIndex(undefined);
      setMapData(test,[[]]);
      resetGame();
      navigate("/hidden")
    }}
    >Test Map</button>
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