import React from 'react';

import {resetGame} from "../../game/main.js"


const Finish = ({setter}) => {
  return (
    <div className="menu finish" >
      <h1>Finish!</h1>

      <button onClick={() => {
        resetGame();
        setter("hidden")
      }}>Restart Race</button>

      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>

    </div>
  )
}

export default Finish;