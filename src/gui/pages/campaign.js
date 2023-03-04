import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/button.js"
import { mapNames } from '../../game/map-data.js';

import { replays } from "../../game/replay";

const countMedalsOnIndex = (mapIndex) => {
  const best = localStorage.getItem(`pb${mapIndex}`)
  let count = 0;
  const medalUnlockedList = [
    best <= replays[mapIndex].author.time,
    best <= replays[mapIndex].hard.time,
    best <= replays[mapIndex].normal.time,
    best <= replays[mapIndex].easy.time
]
  for(let medalIsUnlocked of medalUnlockedList){
    if(medalIsUnlocked){
      count++;
    }
  }

  return count;
}

const countAllMedals = () => {
  let allMedalCount = 0;
  for(let replayIndex in replays){
    allMedalCount += countMedalsOnIndex(replayIndex);
  }
  return allMedalCount;
}


const Act = ({actIndex, mapIndexArray,medalsRequired}) => {
  const isLocked = countAllMedals() < medalsRequired;
  
  const navigate = useNavigate();
  return (
  <div className='act col-2 align-center'>
  <p>{isLocked ? `( locked ) ${medalsRequired - countAllMedals() } more medals required ` : `Act ${actIndex} `}</p>
      <div className='act__navigation col-6 gap-sm'>
        {
          console.log(mapIndexArray.map(index => index+1))}
        {
          mapIndexArray.map(mapIndex => {
            return (
            <Button key={mapIndex} style={isLocked ? "disabled" : "light"} clickHandler={
              !isLocked ? (() => navigate(`/campaign/${mapIndex}`))
              : undefined}>{mapNames[mapIndex]}
              
            </Button>
            )

          })
        }
      </div>
   </div>
  )
}

const Campaign = () => {
  const navigate = useNavigate();
  //need a calculate medals function.
  return (
    <div className='menu-container'>
        <div className='campaign-menu col-6 gap-md'>
          <div className='campaign-menu__header col-6 align-center gap-md'>
            <h1 className='f-h1'>Campaign</h1>
            <p className='f-p2'>Total medals : <span className='text-secondary-500'>{countAllMedals()}</span></p>
          </div>
          <Button style="light" clickHandler={() => navigate(`/main`)}>back
          </Button>
          <div className='campaign-menu__acts row justify-center'>
            <Act actIndex={1} mapIndexArray={[0,1,2,3]} medalsRequired={0}/>
            <Act actIndex={2} mapIndexArray={[4,5,6,7]} medalsRequired={4}/>
            <Act actIndex={3} mapIndexArray={[8,9,10,11,12]} medalsRequired={9}/>
          </div>
        </div>
    </div>
  )
}

export default Campaign;