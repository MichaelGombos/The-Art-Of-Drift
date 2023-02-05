import React from 'react';
import {  useSearchParams } from 'react-router-dom';
import PlayerInfoForm from '../components/player-info-form.js';


const Invited = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const playerName  = searchParams.get("racer");
  const mapIndex = Number(searchParams.get("map"));


  console.log(mapIndex, playerName)
  return (
    <div className="menu invited">
      <h1>You have been invited to race {playerName} on map {mapIndex+1}</h1>
      <PlayerInfoForm destination={`/invited/preview?racer=${playerName}&map=${mapIndex}`}/>
    </div>
  )
}

export default Invited;