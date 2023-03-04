import React from 'react';
import PlayerInfoForm from '../components/ARCHIVED__player-info-form.js';
import ScrollingBackground from '../components/scrolling-background.js';



const EnterName = () => {
 

  return (
    <div className="menu enter-name text-color-primary-900">
      <PlayerInfoForm destination={"/main"}/>
    </div>
  )
}

export default EnterName;