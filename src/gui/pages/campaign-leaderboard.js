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
import { HTMLMapNames, maps } from '../../game/map-data';
import { getAllReplays } from '../helpers/databaseFacade';


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

const LeaderboardTime = ({replayObject,index,mapIndex}) => {
  return(
    <div className="vertical-navigation-menu act__navigation leaderboard__time row">
      <div className="time__player-name">
        <p>#{index+1} {replayObject.playerName}</p>
      </div>
      <div className='horizantal-navigation-menu act__navigation time__menu row'>
        <p>{replayObject.time}</p>
        <RaceDatabaseButtons replayObject={replayObject} mapIndex={mapIndex} isTextShort={true}/>
      </div>
    </div>
  )
}

const ScrollContainer = ({children}) => {
  return (
    <div className='vertical-navigation-menu act__navigation scroll-container col-6 gap-md'>
      {children}
    </div>
  )
}

const CampaignLeaderboard = () => { 
  let {mapIndex} = useParams();
  console.log(mapIndex)
  let [allReplays,setAllReplays] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    
    getAllReplays(Number(mapIndex)).then(replays => {
      setAllReplays(replays)
    })
  },[])


  const pb = localStorage.getItem(`pb${mapIndex}`);

  return(
    <div className='vertical-navigation-menu act__navigation menu-container'>
      <div className='vertical-navigation-menu act__navigation campaign-menu col-6 gap-lg'>
        <div className='leaderboard-menu__header'>
          <h1 className='f-p1'>Campaign <span className='text-secondary-500'>map # {Number(mapIndex)+1}</span></h1>
          <MapCanvasPreview width="col-2" isTiny={true} mapIndex={mapIndex}/>
          <h2 className="f-h2" dangerouslySetInnerHTML={{__html: HTMLMapNames[mapIndex]}}></h2>
        </div>
        <Button clickHandler={() => navigate("/leaderboards/campaign")}>Back</Button>
        <ScrollContainer>
          {allReplays && allReplays.map((replayObject,index) => {
            return( <LeaderboardTime key={replayObject.playerName} replayObject={replayObject} index={index} mapIndex={Number(mapIndex)}/>)
          })}
        </ScrollContainer>

      </div>
    </div>
  )

}



export default CampaignLeaderboard;