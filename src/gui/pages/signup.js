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
  getCurrentAuthProfile,
  deleteProfile,
  deleteProfileUID,
  guestUpgrade,
  gmailSignUp,
 } from '../helpers/databaseFacade.js';


const SignupForm = ({ submitHandler, setRacerName,setEmail,setPassword, guestUpgradeHandler,type}) => {

  const navigate = useNavigate();

  return (
    <form onSubmit={submitHandler} className="signup-form col-6 gap-md">
      
      <TextInput id="racer-name" 
      labelText="racer name"
      placeholderText="enter name"
      changeHandler={setRacerName}
      min={6}
      max={20}
      />

    {type == "gmail" ? "" : <>
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
      min={6}
      />
      </>
     }
    {type == "gmail" ? 
    <Button type="submit" style="primary" icon="google-white">Create google account</Button>
    :
    <Button type="submit" style="primary">Create email account</Button>
    }

    <Button clickHandler = {() => navigate("/signup")}>back</Button>
    </form>
    
  )
}


const Signup = ({type}) => {


  const [racerName,setRacerName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();


  const [profileAvatarId,setProfileAvatarId] = useState(0);
  const [profileVehicleId,setProfileVehicleId] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(racerName)
    e.preventDefault();
    if(type == "gmail"){
      gmailSignUp("/main",racerName,profileAvatarId,profileVehicleId)
    }
      else{
        emailSignUp("/main",email,password,racerName,profileAvatarId,profileVehicleId)

      }
  }


  const handleGuestSignIn = () => {
    guestSignIn("/main",profileAvatarId,profileVehicleId)
    console.log("signed you in as a guest.")
  }

  return (
    <div className='menu-container'>
        <div className='col-3 gap-xl'>
          <h1 className="f-h1">
            {type == "gmail" ? <span className="text-secondary-500">(google) </span> : ""}
             Sign <span className="text-secondary-500">up</span></h1>
          <SignupForm 
          submitHandler={handleSubmit}
          setRacerName = {setRacerName} 
          setEmail = {setEmail} 
          setPassword = {setPassword}
          type={type}/>
          <div className="signup-footer col-6 gap-md">
            <p>Already have an account? <Link className="link-secondary-500" to="/signin">Sign in instead.</Link></p>
            <p>Too much to ask? <a 
            className="link-secondary-500" 
            onClick={handleGuestSignIn}
            >Plas as guest.</a></p>
          </div>
        </div>
        <div className='col-3 gap-md'>
          <ProfileSelect profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}/>
        </div>
    </div>
  )
}

export default Signup;