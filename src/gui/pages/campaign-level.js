import React, {useState, useEffect} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from "../components/button.js"
import { HTMLMapNames, mapDescriptions } from '../../game/map-data.js';

import { replays } from "../../game/replay";
import MapCanvasPreview from '../components/map-canvas-preview.js';
import RaceLocalButton from '../components/race-local-button.js';
import LocalMedalsList from '../components/local-medals-list.js';
import { getCurrentAuthReplayTime } from '../helpers/databaseFacade.js';
import RaceAllLocalButton from '../components/race-all-button.js';

const CampaignLevel = ({bypassAuthorMedalUnlock}) => {
  
  const navigate = useNavigate();
  let {mapIndex} = useParams();
  let [difficulty, setDifficulty] = useState("easy");
  let [difficultyList, setDifficultyList] = useState([false,false,false,false,false])
  const [bestTime, setBestTime] = useState()

  const toggleDifficulty = (index) => {
    const tempDifficultyList = JSON.parse(JSON.stringify(difficultyList))
    tempDifficultyList[index] = !tempDifficultyList[index]
    setDifficultyList(tempDifficultyList)
    console.log("just tried to toggle the difficulty List!",index,tempDifficultyList)
    window.refreshDocumentTree()

  }

  useEffect(() => {
    getCurrentAuthReplayTime(mapIndex).then(time => {
      setBestTime(time);
    })
  },[])


  //need a calculate medals function.
  return (
    <div className='vertical-navigation-menu act__navigation menu-container'>
        <div className='vertical-navigation-menu act__navigation level-menu col-6 gap-md'>
          <div className='level-menu__header col-6 gap-md'>
            <p className='f-p1'>Track <span className='text-secondary-500'># {Number(mapIndex)+1}</span></p>
            <h1 className="f-h1" dangerouslySetInnerHTML={{__html: HTMLMapNames[mapIndex]}}></h1>
          </div>

          <div className='horizantal-navigation-menu act__navigation level-menu__main row w-100 gap-md align-center'>
            <div className="vertical-navigation-menu act__navigation difficulty-selector col-2 gap-md">
              <LocalMedalsList bypassAuthorMedalUnlock={bypassAuthorMedalUnlock} pb={bestTime} difficultyList={difficultyList} toggleDifficulty={toggleDifficulty} difficulty={difficulty} setDifficulty={setDifficulty} mapIndex={mapIndex} />
            </div>
            <MapCanvasPreview width="col-4" mapIndex={mapIndex}/>
          </div>

          <div className='horizantal-navigation-menu act__navigation level-menu__footer row w-100 gap-md'>
            <div className='vertical-navigation-menu act__navigation level-navigation col-2 gap-md'>



{
                !difficultyList.every(diff => diff === false) //ensure there is atleast one enabled
                ?
                <RaceAllLocalButton
                style="primary" 
                mapIndex={mapIndex} 
                difficultyList = {difficultyList}
                isGhostEnabled={"true"}
                >{difficultyList.filter(diff => diff === true).length === 1 ? //check if only one is selected.
                "Race medal"
                :
                "Race medals"
                }</RaceAllLocalButton>
                : 
                <RaceAllLocalButton
                style="light" 
                mapIndex={mapIndex} 
                difficultyList = {difficultyList}
                isGhostEnabled={"true"}
                >
                Race solo
                </RaceAllLocalButton>
              }
              <Button clickHandler={() => navigate(`/campaign/progression/${mapIndex}`)}>Progression</Button>
              <Button clickHandler={() => navigate(`/leaderboards/campaign/${mapIndex}`)}>Leaderboard</Button>
              <Button clickHandler={() => navigate(`/campaign`)}>Back</Button>
            </div>
            <div className='level-description col-4'>
              <p className='f-p3'>
                {mapDescriptions[mapIndex]}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CampaignLevel;