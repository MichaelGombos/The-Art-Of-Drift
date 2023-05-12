import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/button.js"

import { 
  //auth
  guestSignIn
 } from '../helpers/databaseFacade.js';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className='vertical-navigation-menu menu-container'>
        <div className='vertical-navigation-menu welcome-menu col-2 gap-md'>
          <Button clickHandler = {() => navigate("/signup")} style="primary">Sign Up</Button>
          <Button clickHandler = {() => navigate("/signin")} style="light">Sign In</Button>
          <Button clickHandler = {() => guestSignIn("/main")} style="light">skip (play as guest)</Button>
        </div>
    </div>
  )
}

export default Welcome;