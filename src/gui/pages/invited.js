import React, {useState} from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import ProfileSelect from '../components/profile-select.js';
import RaceDatabaseButtons from '../components/race-database-buttons.js';
import TextLogo from '../components/text-logo.js';

import { auth } from '../helpers/firebase.js';
import { guestSignIn } from '../helpers/databaseFacade.js';

const Invited = ({user,loading,error}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const playerName  = searchParams.get("racer");
  const mapIndex = Number(searchParams.get("map"));
  let guestSignUpHandler;
  let isGuestNavigation;

  if(!loading && user == null){ //if user is not signed into any account, sign them up as a guest.
    guestSignUpHandler = () => guestSignIn(`/invited/info?racer=${playerName}&map=${mapIndex}`,0,1);
  }else{
    guestSignUpHandler = () => navigate(`/invited/info?racer=${playerName}&map=${mapIndex}`);
  }

  return (

    <div className="menu-container clickable" 
      onClick={guestSignUpHandler}
    >
        <div className='title-menu col-4'>
          <TextLogo content="the art of drift"/>
          <p className="f-p1 flashing">{`${playerName} says hello!!`}</p>
        </div>
    </div>
  )
}

export default Invited;