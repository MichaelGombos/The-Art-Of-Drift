//shows the sign up with and sign in with menus

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/button.js"

import { 
  gmailSignIn,
  guestSignIn
 } from '../helpers/databaseFacade.js';

const SignInAuthSelect = () => {
  //type = signup or signin
  const navigate = useNavigate();
  return (
    <div className='menu-container'>
        <div className='welcome-menu col-2 gap-md'>
        <h1 className="f-h1">Sign <span className="text-secondary-500">in</span> choice</h1>
          <Button clickHandler = {() => navigate("/signin/email")} >Sign in with email</Button>
          <Button clickHandler = {() => gmailSignIn("/main")} style="light" icon="google"          >sign in with google</Button>
          <Button clickHandler = {() => navigate(-1)} style="light">back</Button>
        </div>
    </div>
  )
}

const SignUpAuthSelect = () => {
  //type = signup or signin
  const navigate = useNavigate();
  return (
    <div className='menu-container'>
        <div className='welcome-menu col-2 gap-md'>
        <h1 className="f-h1">Sign <span className="text-secondary-500">up</span> choice</h1>
          <Button clickHandler = {() => navigate("/signup/email")} >Sign up with email</Button>
          <Button clickHandler = {() => navigate("/signup/gmail")} style="light" icon="google">sign up with google</Button>
          <Button clickHandler = {() => navigate(-1)} style="light">back</Button>
        </div>
    </div>
  )
}

const WelcomeAuthSelect = ({type}) => {
  if(type == "signin"){
    return (<SignInAuthSelect/>)
  }else{
    return (<SignUpAuthSelect/>)
  }
}

export default WelcomeAuthSelect;