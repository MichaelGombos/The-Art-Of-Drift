import React, { useState, useEffect } from 'react';
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
  guestUpgradeEmail,
  guestUpgradeGmail,
 } from '../helpers/databaseFacade.js';


const ProfileForm = ({ submitHandler, setRacerName,setEmail, setPassword, racerNamePlaceholder, emailPlaceholder,type}) => {

  const navigate = useNavigate();

  return (
    <form onSubmit={submitHandler} className="vertical-navigation-menu signup-form col-6 gap-md">
      
      <TextInput 
      viewOnly={false}
      id="racer-name" 
      labelText="racer name"
      placeholderText={"pick a cool name"}
      changeHandler={setRacerName}
      min={6}
      max={20}
      />
    {type == "gmail" ? "" : <>
      <TextInput 
        viewOnly={false}
        id="email" 
        labelText="email"
        type="email"
        placeholderText={"enter an email"}
        changeHandler={setEmail}
        />

      <TextInput 
        viewOnly={false}
        id="password" 
        labelText="password"
        type="password"
        placeholderText={"choose a secure password"}
        changeHandler={setPassword}
        min={6}
        />
      </>
      }
    </form>
    
  )
}


const ProfileUpgrade = ({type, user, loading, error}) => {

  const [racerNamePlaceholder, setRacerNamePlaceholder] = useState();
  const [emailPlaceholder,setEmailPlaceholder] = useState();

  const [racerName,setRacerName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const [profileAvatarId,setProfileAvatarId] = useState(0);
  const [profileVehicleId,setProfileVehicleId] = useState(1);

  const navigate = useNavigate();


  useEffect(() => {
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
  }, [user, loading, error])

  // const handleSubmit = (e) => {
  //   console.log(racerName)
  //   e.preventDefault();
  //   emailSignUp("/main",email,password,racerName,profileAvatarId,profileVehicleId)
  // }



  const handleGuestUpgrade = () => {
    console.log("Signing in a new guest with this info...",racerName, email, password, profileAvatarId,profileVehicleId)
    if(type == "email"){

      guestUpgradeEmail("/profile",email, password,racerName, profileAvatarId,profileVehicleId)
    }
    else{
      guestUpgradeGmail("/profile",racerName, profileAvatarId,profileVehicleId)
    }

  }

  return (
      <ProfileTemplate>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <h1 className="f-h1">Profile <span className="text-secondary-500">(upgrade)</span></h1>
            <ProfileForm 
            type={type}
            user = {user}
            setRacerName = {setRacerName} 
            racerNamePlaceholder = {racerNamePlaceholder}
            emailPlaceholder = {emailPlaceholder}
            setEmail = {setEmail} 
            setPassword = {setPassword}/>

            <div className="vertical-navigation-menu profile__navigation col-6 gap-sm">
              <Button alignStart={true} style="primary" icon={type == "gmail" ? "google-white" : "" } clickHandler = {handleGuestUpgrade}>Create account</Button>
              <Button alignStart={true} clickHandler = {() => navigate(-1)}>Cancel</Button> 
            </div>

          </div>
          <div className='vertical-navigation-menu col-3 gap-md'>
            <ProfileSelect viewOnly={false} profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}/>
          </div>
    </ProfileTemplate>
  )
}

export default ProfileUpgrade;