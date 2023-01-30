
import React from 'react';

import {unPauseGame} from "../../game/main.js"

const Pause = ({setter,setPrevious}) => {
  return (
    <div className="menu">
      <button onClick={() => {
        setter("hidden");
      unPauseGame();
      }}>Return to game</button>
      <button onClick={() => {
        setPrevious("pause")
        setter("settings");
      }}>Settings</button>
      <button onClick={() => {
        setPrevious("main")
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

export default Pause;