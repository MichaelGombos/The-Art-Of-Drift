import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import Button from "../components/button.js"
import TextInput from '../components/input-text.js';
import IconButton from '../components/icon-button.js';
import ProfileSelect from '../components/profile-select.js';

import { 
  //test
  printUserProfile,
  //auth
  emailSignUp,
  emailSignIn,
  guestSignIn,
  logOut,
  deleteAccount,
  deleteAccountUID,
  //db-users
  updateProfile,
  getCurrenAuthProfile,
  deleteProfile,
  deleteProfileUID,
  guestUpgrade,
 } from '../helpers/databaseFacade.js';


const SignupForm = ({updateProfileHandler, submitHandler, setRacerName,setEmail,setPassword, guestUpgradeHandler}) => {
  const guestSignInHandler = () => {
    guestSignIn(1,2)
  }

  return (
    <div className="signup-form col-6 gap-md">
      
      <TextInput id="racer-name" 
      labelText="racer name"
      placeholderText="enter name"
      changeHandler={setRacerName}
      />

    <TextInput id="email" 
      labelText="email"
      type="email"
      placeholderText="enter email"
      changeHandler={setEmail}
      />

    <TextInput id="password" 
      labelText="password"
      type="password"
      placeholderText="enter email"
      changeHandler={setPassword}
      />

    <Button clickHandler = {submitHandler} style="primary">Create account</Button>

    <Button clickHandler = {updateProfileHandler} style="primary">print account info</Button>

    <Button clickHandler = {logOut} style="primary">log out</Button>
    <Button clickHandler = {deleteAccount} style="primary">delete account</Button>
    <Button clickHandler = {guestSignInHandler} style="primary">sign in as guest</Button>
    <Button clickHandler = {guestUpgradeHandler} style="primary">upgrade guest to real account</Button>
    </div>
    
  )
}


const Signup = () => {


  const [racerName,setRacerName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();


  const [profileAvatarId,setProfileAvatarId] = useState(0);
  const [profileVehicleId,setProfileVehicleId] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(racerName)
    emailSignUp(email,password,racerName,profileAvatarId,profileVehicleId)
  }

  const handlePrintUser = () => {
    getCurrenAuthProfile()
  }

  const handleGuestUpgrade = () => {
    guestUpgrade(email,password,racerName,profileAvatarId,profileVehicleId)
  }

  return (
    <div className='menu-container'>
        <div className='col-3 gap-xl'>
          <h1 className="f-h1">Sign <span className="text-secondary-500">up</span></h1>
          <SignupForm 
          guestUpgradeHandler = {handleGuestUpgrade}
          updateProfileHandler = {handlePrintUser}
          submitHandler={handleSubmit}
          setRacerName = {setRacerName} 
          setEmail = {setEmail} 
          setPassword = {setPassword}/>
          <div className="signup-footer col-6 gap-md">
            <p>Already have an account? <Link className="link-secondary-500" to="/signin">Sign in instead.</Link></p>
            <p>Too much to ask? <Link className="link-secondary-500" to="/main">Plas as guest.</Link></p>
          </div>
        </div>
        <div className='col-3 gap-md'>
          <ProfileSelect profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}
          handleGuestUpgrade={handleGuestUpgrade}/>
        </div>
    </div>
  )
}

export default Signup;