
import React from 'react';

import {pauseGame,resetGame} from "../../game/main.js"

const Hidden = ({setter}) => {
  return (
    <div className="menu-button " >
      <button  onClick={() => {
      setter("pause");
      pauseGame();
      } }>Open menu</button>
      <button onClick = {() => {setTimeout(resetGame,100)}}>Reset</button>
    </div>
  )
}

export default Hidden;