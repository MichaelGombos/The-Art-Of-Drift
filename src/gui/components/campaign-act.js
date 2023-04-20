import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/button.js"
import { mapNames } from '../../game/map-data.js';

const CampaignAct = ({actIndex, mapIndexArray,medalsRequired, medalsUnlocked,destination}) => {
  // const isLocked = medalsUnlocked < medalsRequired;
  const isLocked = false;
  const navigate = useNavigate();
  return (
    <>

          <div className='vertical-navigation-menu act__navigation col-6 gap-sm'>
            {
              mapIndexArray.map(mapIndex => {
                return (
                <Button style={isLocked ? "disabled" : ""}  key={mapIndex}  clickHandler={
                  !isLocked ? (() => navigate(`${destination}/${mapIndex}`))
                  : undefined}>{isLocked ? "locked (" + (medalsRequired - medalsUnlocked) + " medals required)" : mapNames[mapIndex] }
                  
                </Button>
                )

              })
            }
          </div>
    </>
  )
}

export default CampaignAct;