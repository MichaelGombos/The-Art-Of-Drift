import React from 'react';

import layer1 from "../../assets/background/1.png"
import layer2 from "../../assets/background/2.png"
import layer3 from "../../assets/background/3.png"
import layer4 from "../../assets/background/4.png"
import layer5 from "../../assets/background/5.png"

import { getGameOn, turnOffGame } from '../../game/main';

import { useEffect, useState } from 'react';


const ScrollingBackground = () => {
  const [isGameRunning,setIsGameRunning] = useState(getGameOn())

  window.shutOffGame = ()=> {
    console.log("silly poop")
    turnOffGame();
    setIsGameRunning(false)
  };

  useEffect(() => {
    //TODO if location isnt main, signup, signin, or title, then do a blur effect.

    setIsGameRunning(getGameOn())
    console.log("update?", getGameOn(), isGameRunning)
  })

  return (
    <div className={`background ${isGameRunning ? "hidden": ""}`}>
      <div className='background-layer-1'>
        <img src={layer1}/>
        <img src={layer1}/>
      </div>
      <div className='background-layer-2'>
        <img src={layer2}/>
        <img src={layer2}/>
      </div>
      <div className='background-layer-3'>
        <img src={layer3}/>
        <img src={layer3}/>
      </div>
      <div className='background-layer-4'>
        <img src={layer4}/>
        <img src={layer4}/>
      </div>
      <div className='background-layer-5'>
        <img src={layer5}/>
        <img src={layer5}/>
      </div>
    </div>
  )
}

export default ScrollingBackground;