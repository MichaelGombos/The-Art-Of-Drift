import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/button.js"

import previousIconUrl from "../../assets/icons/previous.png"
import nextIconUrl from "../../assets/icons/next.png"

import avatarUrl1 from "../../assets/profile-avatars/portrait-no-border1.png";
import avatarUrl2 from "../../assets/profile-avatars/portrait-no-border2.png";
import avatarUrl3 from "../../assets/profile-avatars/portrait-no-border3.png";
import avatarUrl4 from "../../assets/profile-avatars/portrait-no-border4.png";
import avatarUrl5 from "../../assets/profile-avatars/portrait-no-border5.png";

import vehicleUrl1 from "../../assets/profile-vehicles/hatchback-1.png"
import vehicleUrl2 from "../../assets/profile-vehicles/jeep-1.png"
import vehicleUrl3 from "../../assets/profile-vehicles/sedan-1-1.png"
import vehicleUrl4 from "../../assets/profile-vehicles/taxi-1-1.png"
import vehicleUrl5 from "../../assets/profile-vehicles/van-1-1.png"

const TextInput = ({id, labelText, placeholderText, changeHandler}) => {
  return (

  <div className="col-6 text-input gap-md">
    <label className="text-input__label" htmlFor={id}>{labelText}</label>
    <input className="text-input__text"  onChange={e => changeHandler(e.target.value)} 
    placeholder ={placeholderText}/>
  </div>
  )
}

const SignupForm = ({submitHandler, setRacerName,setEmail,setConfirmEmail,setPassword,setConfirmPassword}) => {

  return (
    <div className="signup-form col-6 gap-md">
      <TextInput id="racer-name" 
      labelText="racer name"
      placeholderText="enter name"
      changeHandler={setRacerName}
      />

    <TextInput id="email" 
      labelText="email"
      placeholderText="enter email"
      changeHandler={setEmail}
      />


    <TextInput id="confirm-email" 
      labelText="confirm email"
      placeholderText="re enter email"
      changeHandler={setConfirmEmail}
      />

    <TextInput id="password" 
      labelText="password"
      placeholderText="enter email"
      changeHandler={setPassword}
      />

    <TextInput id="confirm-password" 
      labelText="confirm-password"
      placeholderText="re enter password"
      changeHandler={setConfirmPassword}
      />

    <Button clickHandler = {submitHandler} style="primary">Create account</Button>
    </div>
    
  )
}

const IconButton = ({clickHandler, iconUrl}) => {
  return(

    <motion.button onCLick={clickHandler} className='icon-button'
    whileHover={{ scale: 1.5}}
    whileTap={{ scale: .8}}>
      <img className="icon-button__image" src={iconUrl}/>
    </motion.button>
  )
}


const ProfileSelect = ({profileAvatarId, setProfileAvatarId,profileVehicleId, setProfileVehicleId}) => {

  return (
    <div className='profile-select col-6 gap-xl'>
          <div className='profile-scroller row'>
            <IconButton clickHandler = {1} iconUrl = {previousIconUrl}/>
            <img class="profile-scroller__image profile-scroller__image--avatar" src={avatarUrl1}></img>
            <IconButton clickHandler = {1} iconUrl = {nextIconUrl}/>
          </div>


          <div className='profile-scroller row'>
            <IconButton clickHandler = {1} iconUrl = {previousIconUrl}/>
            <img class="profile-scroller__image" src={vehicleUrl1}></img>
            <IconButton clickHandler = {1} iconUrl = {nextIconUrl}/>
          </div>
    </div>
  )
}

const Signup = () => {


  const [racerName,setRacerName] = useState();
  const [email,setEmail] = useState();
  const [confirmEmail,setConfirmEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();


  const [profileAvatarId,setProfileAvatarId] = useState(0);
  const [profileVehicleId,setProfileVehicleId] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(racerName)
  }
  return (
    <div className='menu-container'>
        <div className='col-3 gap-xl'>
          <h1 className="f-h3">Sign <span className="text-secondary-500">up</span></h1>
          <SignupForm submitHandler={handleSubmit}
          setRacerName = {setRacerName} 
          setEmail = {setEmail} 
          setConfirmEmail = {setConfirmEmail}
          setPassword = {setPassword}
          setConfirmPassword = {setConfirmPassword}/>
          <div className="signup-footer col-6 gap-sm">
            <p>Already have an account? <Link className="link-secondary-500" to="/signin">Sign in instead.</Link></p>
            <p>Too much to ask? <Link className="link-secondary-500" to="/main">Plas as guest.</Link></p>
          </div>
        </div>
        <div className='col-3 gap-md'>
          <ProfileSelect profileAvatarId={profileAvatarId} setProfileAvatarId={setProfileAvatarId} profileVehicleId={profileVehicleId} setProfileVehicleId={setProfileVehicleId}/>
        </div>
    </div>
  )
}

export default Signup;