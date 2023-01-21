import React, { useMemo } from 'react';
import { getTimeString, getGameMapIndex } from '../../game/game.js';

import {resetGame} from "../../game/main.js"

let newBest = false;
const checkBest = (index, oldPB) => {
  if(getTimeString() < oldPB || !oldPB){
    localStorage.setItem(`pb${index}`,getTimeString())
    return true;
  }
  else{
    return false;
  }
}
const Finish = ({setter}) => {
  let mapIndex = getGameMapIndex();
  let oldPB = localStorage.getItem(`pb${mapIndex}`);

  useMemo(() => {
      newBest = checkBest(mapIndex, oldPB);
  }, [])

  return (
    <div className="menu finish" >
      <div className="finish-container">
        <h1>Finish!</h1>
        <div>
          <p>Your time: {getTimeString()} <span className="best-time">{newBest ? "NEW BEST" : null}</span></p>
          <p>Your best: {localStorage.getItem(`pb${mapIndex}`)}</p>
        </div>
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