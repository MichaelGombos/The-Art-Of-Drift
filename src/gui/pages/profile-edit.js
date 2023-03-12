import React, { useState , useEffect} from 'react';
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
      viewOnly={false}
      id="racer-name" 
      labelText="racer name"
      placeholderText={racerNamePlaceholder}
      changeHandler={setRacerName}
      min={6}
      max={20}
      />

    {/* <TextInput 
      viewOnly={true}
      id="email" 
      labelText="email"
      type="email"
      placeholderText={emailPlaceholder}
      changeHandler={setEmail}
      /> */}

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


const ProfileEdit = ({ user, loading, error}) => {

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
  },
  [user, loading, error]
  )

  // const handleSubmit = (e) => {
  //   console.log(racerName)
  //   e.preventDefault();
  //   emailSignUp("/main",email,password,racerName,profileAvatarId,profileVehicleId)
  // }

  const handleUpdateProfile = () => {
    console.log("updating with this information",racerName,profileAvatarId,profileVehicleId);
    updateProfile("/profile" , racerName,profileAvatarId,profileVehicleId)
  }

  const handleGuestSignIn = () => {
    guestSignIn("/profile/guest",profileAvatarId,profileVehicleId)
  }

  return (
      <ProfileTemplate>
          <div className='col-3 gap-xl'>
            <h1 className="f-h1">Profile <span className="text-secondary-500">(edit)</span></h1>
            <ProfileForm 
            user = {user}
            setRacerName = {setRacerName} 
            racerNamePlaceholder = {racerNamePlaceholder}
            emailPlaceholder = {emailPlaceholder}
            setEmail = {setEmail} 
            setPassword = {setPassword}/>

            <div className="profile__navigation col-6 gap-sm">
              <Button alignStart={true} style="danger" clickHandler = {() => navigate("/profile")}>Exit without saving</Button>
              <Button alignStart={true} style="primary"  clickHandler = { handleUpdateProfile}>Save changes</Button>
            </div>

            {/* <div className="signup-footer col-6 gap-md">
              <p>Already have an account? <Link className="link-secondary-500" to="/signin">Sign in instead.</Link></p>
              <p>Too much to ask? <a 
              className="link-secondary-500" 
              onClick={handleGuestSignIn}
              >Plas as guest.</a></p>
            </div> */}
          </div>
          <div className='col-3 gap-md'>
            <ProfileSelect viewOnly={false} profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}/>
          </div>
    </ProfileTemplate>
  )
}

export default ProfileEdit;