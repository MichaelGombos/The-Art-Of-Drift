import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/button';

import { mapNames } from '../../game/map-data';


const CampaignLeaderboardGrid = () => {

  const navigate = useNavigate();
  const items =     mapNames.map((item,index) => {
    return (
    <Button clickHandler={() => navigate(`/leaderboards/campaign/${index}`)}>{item}</Button>)
  })
  return (
    <div className="campaign-leaderboard-grid">
      {items}
    </div>
  )
}


const CampaignLeaderboards = () => { 
  const navigate = useNavigate();
  return(
    <div className='menu-container'>
      <div className='campaign-menu col-6 gap-md'>
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