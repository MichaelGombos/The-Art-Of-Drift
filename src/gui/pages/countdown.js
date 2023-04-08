
import React from 'react';

import {getRunning, pauseGame,resetGame, unPauseGame} from "../../game/main.js"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Hidden from './hidden.js';


const Countdown = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => {
      setCounter(counter - 1)
    }, 1000);

    if(counter == 0){
      navigate("/hidden");
      resetGame();
      console.log("just unpaused on god", getRunning())
    }
  }, [counter]);

  return (
    <>
      <div className="countdown">
        <p className='f-p1'>{counter}</p>
      </div>
      <Hidden/>
    </>

  )
}

export default Countdown;