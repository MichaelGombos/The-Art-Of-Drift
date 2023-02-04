
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {unPauseGame} from "../../game/main.js"

const Pause = ({setPrevious}) => {
  const navigate = useNavigate();

  return (
    <div className="menu">
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
      }}>Back to main menu</button>
    </div>
  )
}

export default Pause;