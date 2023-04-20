import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/button';

import { mapNames } from '../../game/map-data';

import CampaignAct from '../components/campaign-act.js';

const CampaignLeaderboardGrid = () => {

  return(
    <div className='horizantal-navigation-menu campaign-menu__acts row justify-center gap-md'>
    <CampaignAct 
    actIndex={1} 
    mapIndexArray={[0,1,2,3,13]} 
    medalsRequired={0} 
    medalsUnlocked={69}
    destination={"/campaign"}
    />
    <CampaignAct 
    actIndex={2} 
    mapIndexArray={[4,5,6,7]} 
    medalsRequired={6}
    medalsUnlocked={69}
    destination={"/campaign"}/>
    <CampaignAct 
    actIndex={3} 
    mapIndexArray={[8,9,10,11,12]} 
    medalsRequired={12}
    medalsUnlocked={69}
    destination={"/campaign"}/>
  </div>
  )
}


const CampaignLeaderboards = () => { 
  const navigate = useNavigate();
  return(
    <div className='vertical-navigation-menu menu-container'>
      <div className='vertical-navigation-menu campaign-menu col-6 gap-md'>
        <div className='campaign-menu__header col-6 align-center gap-md'>
          <h1 className='f-h1'>Campaign Leaderboards</h1>
        </div>
        <Button style="light" clickHandler={() => navigate(`/main`)}>back
        </Button>
        <CampaignLeaderboardGrid/>
      </div>
    </div>
  )

}



export default CampaignLeaderboards;