import React from 'react';

import { useNavigate } from 'react-router-dom';

import { startGame, resetGame, unPauseGame} from "../../game/main.js"
import {setEnableGhost, setGameMapIndex, setMapData} from "../../game/game.js"
import {freeplay, test, tutorial } from  "../../game/map-data.js"
import Button from './button.js';
import deltaTimeTest from '../../game/maps/deltaTimeTest.js';

const MainMenuNavigation = () => {
  const navigate = useNavigate();

  return (
  <div className="vertical-navigation-menu col-6 main-menu__navigation gap-md">
    <Button style="primary" clickHandler={() => navigate("/campaign") }>campaign</Button>
    <Button style="light" clickHandler={()=> {
      setGameMapIndex(undefined)
      setEnableGhost(false)
      setMapData(tutorial,[{
        inputs:"[]",
        stats:"[]",
        runtimes:"[]"
      }]);
      resetGame();
      navigate("/hidden")
    }}
    >Tutorial</Button>
    <Button style="light" clickHandler={() => navigate("/community-maps")}>community maps</Button>
    <Button style="light" clickHandler={() => navigate("/leaderboards")}>leaderboards</Button>
    <Button style="light" clickHandler={()=> {
      setGameMapIndex(undefined)
      setEnableGhost(false)
      setMapData(freeplay,[{
        inputs:"[]",
        stats:"[]",
        runtimes:"[]"
      }]);
      resetGame();
      navigate("/hidden")
    }}
    >Free Play</Button>
    <Button style="light" clickHandler={()=> {
      setGameMapIndex(undefined)
      setEnableGhost(false)
      setMapData(deltaTimeTest,[{
        inputs:"[]",
        stats:"[]",
        runtimes:"[]"
      }]);
      resetGame();
      navigate("/hidden")
    }}
    >Delta Time Tests</Button>
    <Button style="light" clickHandler={() => navigate("/credits")}>credits</Button>
    <a className="col-6"  href="https://github.com/MichaelGombos/browser-driving-demo" target="_blank"> <Button style="light"  >Source Code</Button> </a>
    <Button style="light" clickHandler={() => {
      navigate("/settings");
    }}>Settings</Button>
  </div>
  )
}

export default MainMenuNavigation;