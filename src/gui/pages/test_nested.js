import React, { useState } from 'react';

import Button from "../components/button.js"
import TextInput from '../components/input-text.js';
import IconButton from '../components/icon-button.js';


const TestNested = () => {



  return (
    <div className='horizantal-navigation-menu menu-container'>
        <div className='vertical-navigation-menu col-3 gap-xl'>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
        </div>
        <div className='vertical-navigation-menu col-3 gap-xl'>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
        </div>
        <div className='vertical-navigation-menu col-3 gap-xl'>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
          <div className='vertical-navigation-menu col-3 gap-xl'>
            <Button clickHandler={() =>{console.log("swaggy swiggers")}}>Hello There my swaggers</Button>
          </div>
        </div>
    </div>
  )
}

export default TestNested;