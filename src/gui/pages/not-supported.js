
import React from 'react';
import { Link } from 'react-router-dom';

const NotSupported = () => {

  return (
    <div className="menu not-supported">
      <h1 className="f-p2">{"This game is not yet supported on mobile ( < 788px )"}</h1>
      <Link to="https://www.youtube.com/watch?v=n_ER_f3MT90"><button>Watch youtube showcase</button></Link>
    </div>
  )
}

export default NotSupported;