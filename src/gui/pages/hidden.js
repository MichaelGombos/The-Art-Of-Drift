
import React from 'react';

import {pauseGame,resetGame} from "../../game/main.js"
import { useNavigate } from 'react-router-dom';

import Stats from "../components/stats.js"

const OpenMenuButton = () => {
  const navigate = useNavigate();
  return(
    <button  onClick={() => {
      navigate("/pause");
      pauseGame();
      } }>Open menu</button>
  )
}

const ResetGameButton = () => {
  return (
    <button onClick = {() => {setTimeout(resetGame,1)}}>Reset</button>
  )
}

const Hidden = ({showStats}) => {

  return (
    <>
        <div className="menu-button " >
          <OpenMenuButton/>
          <ResetGameButton/>
        </div>
        <Stats showStats={showStats}/>
        <div className="solid-background"></div>
    </>

  )
}

export default Hidden;