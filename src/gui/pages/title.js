import React from 'react';
import { Link } from 'react-router-dom';
import TextLogo from '../components/text-logo.js';

const Title = () => {
  return (
    <Link className="menu-container" to= {localStorage.getItem("playerName") ? "/welcome" : "/enter-name" // I will update this to something like "logged in" later...
  }>
        <div className='title-menu col-4'>
          <TextLogo size="display-1" content="the art of drift"/>
          <p className="f-p1 flashing">click the screen to start</p>
        </div>
    </Link>
  )
}

export default Title;