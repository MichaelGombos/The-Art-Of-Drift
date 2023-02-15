import React from 'react';
import { Link } from 'react-router-dom';
import ScrollingBackground from '../components/scrolling-background';
import StackedBrandText from "../components/stacked-brand-text";

const Title = () => {
  return (
    <Link className="menu title" to= {localStorage.getItem("playerName") ? "/main" : "/enter-name"}>
        <div className='game-title'>
          <StackedBrandText size="display-1" content="the art of drift"/>
          <p className="f-p1">click the screen to start </p>
        </div>
      <ScrollingBackground/>
    </Link>
  )
}

export default Title;