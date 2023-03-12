import React, {useState} from 'react';
import {  useSearchParams } from 'react-router-dom';
import ProfileSelect from '../components/profile-select.js';
import RaceDatabaseButtons from '../components/race-database-buttons.js';

const InvitedInfo = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const playerName  = searchParams.get("racer");
  const mapIndex = Number(searchParams.get("map"));


  console.log(mapIndex, playerName)
  return (
    <div className="menu-container">
      <div className="invited-menu col-3 align-center gap-xl">
        <h1 className='f-p2 text-center'>You have been invited by {playerName} to watch or race against their best time on map # {mapIndex+1}</h1>
        <div className="col-3 gap-md align-center">
          <RaceDatabaseButtons mapIndex={mapIndex} playerName={playerName}/>
        </div>
      </div>
    </div>
  )
}

export default InvitedInfo;