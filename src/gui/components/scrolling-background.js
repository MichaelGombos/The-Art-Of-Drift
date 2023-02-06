import React from 'react';
import background from "../../assets/background.png"

const ScrollingBackground = () => {

  return (
    <div className='background'>
      <div>
        <img src={background}/>
        <img src={background}/>
        <img src={background}/>
        <img src={background}/>
        <img src={background}/>
        <img src={background}/>
        <img src={background}/>
      </div>
    </div>
  )
}

export default ScrollingBackground;