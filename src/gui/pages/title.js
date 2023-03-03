import React from 'react';
import { Link } from 'react-router-dom';
import TextLogo from '../components/stacked-brand-text';

const Title = () => {
  return (
    <Link className="menu" to= {localStorage.getItem("playerName") ? "/main" : "/enter-name"}>
        <div className='title-menu'>
          <TextLogo size="display-1" content="the art of drift"/>
          <p className="f-p1 flashing">click the screen to start </p>
        </div>
    </Link>
  )
}

export default Title;