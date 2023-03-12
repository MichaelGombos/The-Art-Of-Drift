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
    <div className='menu-container'>
        <div className='welcome-menu col-2 gap-md'>
          <Button clickHandler = {() => navigate("/signup")} style="primary">Create a racer</Button>
          <Button clickHandler = {() => navigate("/signin")} style="light">Sign In</Button>
          <Button clickHandler = {() => guestSignIn("/main",0,1)} style="light">skip (play as guest)</Button>
        </div>
    </div>
  )
}

export default Welcome;