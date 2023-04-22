import React, {useState} from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import ProfileSelect from '../components/profile-select.js';
import RaceDatabaseButtons from '../components/race-database-buttons.js';
import TextLogo from '../components/text-logo.js';

import { auth } from '../helpers/firebase.js';
import { getProfileUID, guestSignIn } from '../helpers/databaseFacade.js';

const Invited = ({user,loading,error}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [playerName, setplayerName] = useState();
  const navigate = useNavigate();

  const playerUID  = searchParams.get("racer");
  const mapIndex = searchParams.get("map");

  console.log("bruh map,", searchParams.get("map"))

  getProfileUID(playerUID).then(profile => {
    // setplayerName(profile.displayName)
    setplayerName(profile.displayName)
    console.log(profile)
  })
  let guestSignUpHandler;
  let isGuestNavigation;

  if(!loading && user == null){ //if user is not signed into any account, sign them up as a guest.
    guestSignUpHandler = () => guestSignIn(`/invited/info?racer=${playerUID}&map=${mapIndex}`,0,1);
  }else{
    guestSignUpHandler = () => navigate(`/invited/info?racer=${playerUID}&map=${mapIndex}`);
  }

  return (

    <button className="text-shade-0 menu-container clickable" 
      onClick={guestSignUpHandler}
    >
        <div className='title-menu col-4'>
          <TextLogo content="the art of drift"/>
          <p className="f-p1 flashing">{`${playerName} says hello!!`}</p>
        </div>
    </button>
  )
}

export default Invited;