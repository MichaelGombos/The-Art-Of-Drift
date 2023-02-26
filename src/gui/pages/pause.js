
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {turnOffGame, unPauseGame} from "../../game/main.js"

const Pause = ({setPrevious}) => {
  const navigate = useNavigate();

  return (
    <div className="menu paused">
      <h1 className="f-h2">PAUSED</h1>
      <div>
        <button onClick={() => {
          navigate("/hidden");
        unPauseGame();
        }}>Return to game</button>
        <button onClick={() => {
          setPrevious("pause")
          navigate("/settings");
        }}>Settings</button>
        <button onClick={() => {
          navigate("/main");
          turnOffGame();
        }}>Back to main menu</button>
      </div>
    </div>
  )
}

export default Pause;