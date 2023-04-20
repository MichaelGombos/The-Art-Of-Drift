import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/button.js"
import { mapNames } from '../../game/map-data.js';

import { getMedalAmount } from '../helpers/databaseFacade.js';

import CampaignAct from '../components/campaign-act.js';

const Campaign = () => {
  const [medals,setMedals] = useState(0)
  getMedalAmount().then(amount => {
    setMedals(amount)
  })

  const navigate = useNavigate();
  //need a calculate medals function.
  return (
    <div className='vertical-navigation-menu menu-container'>
        <div className='vertical-navigation-menu campaign-menu col-6 gap-md'>
          <div className='campaign-menu__header col-6 align-center gap-md'>
            <h1 className='f-h1'>Campaign</h1>
            <p className='f-p2'>Total medals : <span className='text-secondary-500'>{medals}</span></p>
          </div>
          <Button style="light" clickHandler={() => navigate(`/main`)}>back
          </Button>
          <div className='horizantal-navigation-menu campaign-menu__acts row justify-center gap-md'>
            <CampaignAct 
            actIndex={1} 
            mapIndexArray={[0,1,2,3,13]} 
            medalsRequired={0} 
            medalsUnlocked={medals}
            destination={"/campaign"}
            />
            <CampaignAct 
            actIndex={2} 
            mapIndexArray={[4,5,6,7]} 
            medalsRequired={6}
            medalsUnlocked={medals}
            destination={"/campaign"}/>
            <CampaignAct 
            actIndex={3} 
            mapIndexArray={[8,9,10,11,12]} 
            medalsRequired={12}
            medalsUnlocked={medals}
            destination={"/campaign"}/>
          </div>
        </div>
    </div>
  )
}

export default Campaign;