import React from 'react';
import PlayerInfoForm from '../components/player-info-form.js';
import ScrollingBackground from '../components/scrolling-background.js';



const EnterName = () => {
 

  return (
    <div className="menu enter-name text-color-primary-900">
      <ScrollingBackground/>
      <PlayerInfoForm destination={"/main"}/>
    </div>
  )
}

export default EnterName;