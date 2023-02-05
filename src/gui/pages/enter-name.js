import React from 'react';
import PlayerInfoForm from '../components/player-info-form.js';



const EnterName = () => {
 

  return (
    <div className="menu enter-name">
      <PlayerInfoForm destination={"/main"}/>
    </div>
  )
}

export default EnterName;