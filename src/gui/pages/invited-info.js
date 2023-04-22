import React, {useEffect, useState} from 'react';
import {  useSearchParams } from 'react-router-dom';
import ProfileSelect from '../components/profile-select.js';
import RaceDatabaseButtons from '../components/race-database-buttons.js';
import { getProfileUID, getUIDReplay } from '../helpers/databaseFacade.js';

const InvitedInfo = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [replayObject, setReplayObject] = useState({
    playerName:"loading..."
  });
  let [playerName,setPlayerName] = useState("name loading...")

  const playerUID  = searchParams.get("racer");
  const mapIndex = searchParams.get("map");
  useEffect(() => {
    getUIDReplay(playerUID,mapIndex).then(replay =>{
      setReplayObject(replay)
      setPlayerName(replay.playerName)
    })
  }, [])


  return (
    <div className="vertical-navigation-menu menu-container">
      <div className="vertical-navigation-menu invited-menu col-3 align-center gap-xl">
        <h1 className='f-p2 text-center'>You have been invited by {playerName} to watch or race against their best time on map # {mapIndex}</h1>
        <div className="vertical-navigation-menu col-3 gap-md align-center">
          <RaceDatabaseButtons replayObject={replayObject} mapIndex={Number(mapIndex)} />
        </div>
      </div>
    </div>
  )
}

export default InvitedInfo;