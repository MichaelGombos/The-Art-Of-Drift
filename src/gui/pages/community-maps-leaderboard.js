import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import React, { useState, useEffect  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/button';

import MapCanvasPreview from '../components/map-canvas-preview';
import RaceDatabaseButtons from '../components/race-database-buttons';


import { replays } from "../../game/replay.js"
import { drawCanvasMap } from '../../game/graphics.js';
import { mapNames, maps } from '../../game/map-data';
import { getAllReplays, getCurrentAuthMaps, getCurrentAuthReplay, getMap } from '../helpers/databaseFacade';


firebase.initializeApp({
  apiKey: "AIzaSyDTGF6K4sLCAszEdJlBZsbFahZiFr-zkA8",
  authDomain: "the-art-of-drift.firebaseapp.com",
  projectId: "the-art-of-drift",
  storageBucket: "the-art-of-drift.appspot.com",
  messagingSenderId: "469347431957",
  appId: "1:469347431957:web:35dbf2311619fad7f6801c",
  measurementId: "G-68K0WQF6PS"
})

const firestore = firebase.firestore();

const LeaderboardTime = ({replayObject,index,mapIndex, mapObject}) => {
  return(
    <div className="leaderboard__time row">
      <div className="time__player-name">
        <p>#{index+1} {replayObject.playerName}</p>
      </div>
      <div className='time__menu row'>
        <p>{replayObject.time}</p>
        <RaceDatabaseButtons replayObject={replayObject} mapIndex={mapIndex} isTextShort={true} mapObject={mapObject}/>
      </div>
    </div>
  )
}

const ScrollContainer = ({children}) => {
  return (
    <div className='scroll-container col-6 gap-md'>
      {children}
    </div>
  )
}

const CommunityMapsLeaderboard = () => { 
  let {mapId} = useParams();
  const [communityMapObject,setCommunityMapObject] = useState({
    spawnAngle:420,
    lapCount:3,
    data:[[1]]
  })
  const [communityMapName,setCommunityMapName] = useState("loading...")
  const [allReplays,setAllReplays] = useState();
  const navigate = useNavigate();
  let pb;

  useEffect(() => {

    getAllReplays(mapId).then(replays => {
      setAllReplays(replays)
    })
    getMap(mapId).then(dataBaseMap => {
      setCommunityMapObject(JSON.parse(dataBaseMap.mapObject));
      setCommunityMapName(dataBaseMap.mapName)

      getCurrentAuthReplay(mapId).then(result => {
        pb = result;
      })
    })
  },[])
  


  return(
    <div className='menu-container'>
      <div className='campaign-menu col-6 gap-lg'>
        <div className='leaderboard-menu__header'>
          <h1 className='f-p1'>Community <span className='text-secondary-500'>map # {mapId}</span></h1>
            <MapCanvasPreview width="col-2" isTiny={true} communityMapData={communityMapObject.data} />
          <h2 className="f-h2">{communityMapName}</h2>
        </div>
        <Button clickHandler={() => navigate("/leaderboards/campaign")}>Back</Button>
        <ScrollContainer>
          {allReplays && allReplays.map((replayObject,index) => {
            return( <LeaderboardTime key={replayObject.playerName} replayObject={replayObject} mapObject={communityMapObject} index={index} mapIndex={mapId} />)
          })}
        </ScrollContainer>

      </div>
    </div>
  )

}



export default CommunityMapsLeaderboard;