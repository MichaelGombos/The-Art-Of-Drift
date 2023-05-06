
import React from 'react';

import {getRunning, pauseGame,resetGame, unPauseGame} from "../../game/main.js"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Hidden from './hidden.js';
import { generateCountdownSound } from '../../sounds/sounds.js';

const counterToTextMap = {
  "3" : "Three",
  "2" : "Three",
  "1" : "Two",
  "0" : "One",
  "-1" : "GO!"
}

const Countdown = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  React.useEffect(() => {

    if(counter < 0){
      navigate("/hidden");
      resetGame();
      console.log("just unpaused on god", getRunning())   
     }

    counter >= 0 && setTimeout(() => {
      generateCountdownSound(3-counter)
      setCounter(counter - 1)
    }, 1000);


  }, [counter]);

  return (
    <>
      <div className="countdown">
        <p className='f-p1'>{counterToTextMap[String(counter)]}</p>
      </div>
      <Hidden/>
    </>

  )
}

export default Countdown;