import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/button.js"

import TextInput from '../components/input-text';

import { 
  //test
  printUserProfile,
  //auth
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

const SigninForm = ({submitHandler, setEmail,setPassword,}) => {

  return (
    <div className="signup-form col-6 gap-md">

    <TextInput id="email" 
      labelText="email"
      placeholderText="enter email"
      changeHandler={setEmail}
      />


    <TextInput id="password" 
      labelText="password"
      placeholderText="enter email"
      changeHandler={setPassword}
      />


    <Button clickHandler = {submitHandler} style="primary">Play</Button>
    </div>
    
  )
}


const Signin = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = () => {
    emailSignIn("/main",email, password)
  }

  const handleGuestSignIn = () => {
    guestSignIn("/main",1,1)
    console.log("signed you in as a guest.")
  }

  return (
    <div className='menu-container'>
        <div className='col-2 gap-xl'>
          <h1 className="f-h1">Sign <span className="text-secondary-500">in</span></h1>
          <SigninForm submitHandler={handleSubmit}
          setEmail = {setEmail} 
          setPassword = {setPassword}/>
          <div className="signup-footer col-6 gap-md">
            <p>Dont have an account? <Link className="link-secondary-500" to="/signup">Sign up.</Link></p>
            <p>Too much to ask? <a 
            className="link-secondary-500" 
            onClick={handleGuestSignIn}
            
            >Plas as guest.</a></p>
          </div>
        </div>
    </div>
  )
}

export default Signin;