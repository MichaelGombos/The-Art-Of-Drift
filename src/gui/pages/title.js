import React from 'react';
import { Link } from 'react-router-dom';
import ScrollingBackground from '../components/scrolling-background';


const Title = ({setter}) => {
  return (
    <Link className="menu title" to= {
      
      localStorage.getItem("playerName") ? "/main" : "/enter-name"}>
        <div className='game-title'>
          <h1 className="display-1"><span class="text-main">the art of drift</span><span class="text-style">THE ART OF DRIFT</span></h1>
          <p className="f-p1">click the screen to start </p>
        </div>
      <ScrollingBackground/>
    </Link>
  )
}

export default Title;