import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/button.js"

import TextInput from '../components/text-input.js';


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
    console.log(email, password)
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
            <p>Too much to ask? <Link className="link-secondary-500" to="/main">Plas as a guest.</Link></p>
          </div>
        </div>
    </div>
  )
}

export default Signin;