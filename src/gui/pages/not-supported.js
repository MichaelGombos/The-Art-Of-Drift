
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';

const NotSupported = () => {

  return (
    <div className="vertical-navigation-menu menu not-supported">
      <h1 className="f-p2">{"This game is not yet supported on mobile ( < 788px )"}</h1>
      <Link to="https://www.youtube.com/watch?v=n_ER_f3MT90"><Button>Watch youtube showcase</Button></Link>
    </div>
  )
}

export default NotSupported; 