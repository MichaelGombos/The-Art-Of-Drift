import React from 'react';

import { useNavigate } from 'react-router-dom';

import { startGame, resetGame, unPauseGame} from "../../game/main.js"
import {setGameMapIndex, setMapData} from "../../game/game.js"
import {freeplay, test } from  "../../game/map-data.js"
import Button from './button.js';

const MainMenuNavigation = () => {
  const navigate = useNavigate();

  return (
  <div className="col-6 main-menu__navigation gap-md">
    <Button style="primary" clickHandler={() => navigate("/campaign") }>campaign</Button>
    <Button style="light" clickHandler={() => navigate("/community-maps")}>community maps</Button>
    <Button style="light" clickHandler={() => navigate("/leaderboards")}>leaderboards</Button>
    <Button style="light" clickHandler={()=> {
      setGameMapIndex(undefined)
      setMapData(freeplay,[[]]);
      resetGame();
      navigate("/hidden")
    }}
    >Free Play</Button>
    <a className="col-6" href="https://michaelgombos.github.io/browser-driving-map-creator/" target="_blank"> <Button style="light"  >Map Maker</Button> </a>
    <a className="col-6"  href="https://github.com/MichaelGombos/browser-driving-demo" target="_blank"> <Button style="light"  >Source Code</Button> </a>
    <Button style="light" clickHandler={() => {
      navigate("/settings");
    }}>Settings</Button>
  </div>
  )
}

export default MainMenuNavigation;