import React from 'react';
import { getTimeString } from '../../game/game.js';

import {resetGame} from "../../game/main.js"


const Finish = ({setter}) => {
  return (
    <div className="menu finish" >
      <div className="finish-container">
        <h1>Finish!</h1>
        <p>Your time: {getTimeString()}</p>
        <nav>
          <button onClick={() => {
            resetGame();
            setter("hidden")
          }}>Restart Race</button>

          <button onClick={() => {
            setter("map select");
          }}>Map Select</button>
        </nav>
      </div>
    </div>
  )
}

export default Finish;