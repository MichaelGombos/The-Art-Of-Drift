import React from 'react';
import { Link } from 'react-router-dom';
import TextLogo from '../components/text-logo.js';
import { auth } from '../helpers/firebase.js';

const Title = () => {

  return (
    <Link className="menu-container" 
    to= {auth.currentUser ? "/main" : "/welcome"
  }>
        <div className='title-menu col-4'>
          <TextLogo content="the art of drift"/>
          <p className="f-p1 flashing">click the screen to start</p>
        </div>
    </Link>
  )
}

export default Title;