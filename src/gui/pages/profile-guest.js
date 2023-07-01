import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from "../components/button.js"
import TextInput from '../components/input-text.js';
import ProfileSelect from '../components/profile-select.js';
import ProfileTemplate from '../components/profile-template.js';

import { 
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
 } from '../helpers/databaseFacade.js';


const ProfileForm = ({ submitHandler, setRacerName,setEmail, racerNamePlaceholder, emailPlaceholder}) => {

  const navigate = useNavigate();

  return (
    <form onSubmit={submitHandler} className="signup-form col-6 gap-md">
      
      <TextInput 
      viewOnly={true}
      id="racer-name" 
      labelText="racer name"
      placeholderText={racerNamePlaceholder}
      changeHandler={setRacerName}
      min={6}
      max={20}
      />

    {/* <TextInput 
      viewOnly={true}
      id="password" 
      labelText="password"
      type="password"
      placeholderText="enter email"
      changeHandler={setPassword}
      min={6}
      /> */}
    </form>
    
  )
}


const ProfileGuest = ({ user, loading, error}) => {

  const [racerNamePlaceholder, setRacerNamePlaceholder] = useState();
  const [emailPlaceholder,setEmailPlaceholder] = useState();

  const [racerName,setRacerName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const [profileAvatarId,setProfileAvatarId] = useState(0);
  const [profileVehicleId,setProfileVehicleId] = useState(1);

  const navigate = useNavigate();

  if(loading){
  }
  else if(error){

    setRacerNamePlaceholder("error...")
  }
  else if(user){
    getCurrentAuthProfile().then(profile => {
    setRacerNamePlaceholder(profile.displayName)
    setProfileAvatarId(profile.avatarId)
    setProfileVehicleId(profile.vehicleID)
    setEmailPlaceholder(user.email)
    })
  }

  // const handleSubmit = (e) => {
  //   console.log(racerName)
  //   e.preventDefault();
  //   emailSignUp("/main",email,password,racerName,profileAvatarId,profileVehicleId)
  // }



  const handleGuestSignIn = () => {
    guestSignIn("/profile/guest",profileAvatarId,profileVehicleId)
  }

  return (
      <ProfileTemplate>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <h1 className="f-h1">Profile <span className="text-secondary-500">(guest)</span></h1>
            <ProfileForm 
            user = {user}
            setRacerName = {setRacerName} 
            racerNamePlaceholder = {racerNamePlaceholder}
            emailPlaceholder = {emailPlaceholder}
            setEmail = {setEmail} 
            setPassword = {setPassword}/>
            <p>upgrade your guest account to unlock <span className="text-secondary-500">profile customization,</span> and the ability to <span className="text-secondary-500">upload community maps.</span> Upgrading will <span className="text-secondary-500">transfer your guest account progress</span> to your new account</p>
            <div className=" vertical-navigation-menu profile__navigation col-6 gap-sm">
              <Button alignStart={true} style="primary" clickHandler = {() => navigate("/profile/guest/edit")}>Edit profile</Button>
              <Button alignStart={true}  clickHandler = {() => navigate("/profile/guest/upgrade/email")}>Upgrade to email account</Button>
              <Button alignStart={true} icon="google" clickHandler = {() => navigate("/profile/guest/upgrade/gmail")}>Upgrade to gmail account</Button>

              <Button style="danger" clickHandler={( () => logOut('/'))}>Log Out</Button>
              <Button alignStart={true} clickHandler = {() => navigate(-1)}>Exit</Button> 
            </div>

            <div className="vertical-navigation-menu signup-footer col-6 gap-md">
              <p class="horizantal-navigation-menu">Already have an account? <Link className="link-secondary-500" to="/signin">Sign in instead.</Link></p>
            </div>
          </div>
          <div className='col-3 gap-md'>
            <ProfileSelect viewOnly={true} profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}/>
          </div>
    </ProfileTemplate>
  )
}

export default ProfileGuest;