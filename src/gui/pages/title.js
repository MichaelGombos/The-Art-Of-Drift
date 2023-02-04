import React from 'react';
import { Link } from 'react-router-dom';

const Title = ({setter}) => {
  return (
    <Link className="menu title" to= {
      
      localStorage.getItem("playerName") ? "/main" : "/enter-name"}>
      The art of Drift<br/>
      (click the screen to start)
    </Link>
  )
}

export default Title;