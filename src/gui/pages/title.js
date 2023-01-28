import React from 'react';

const Title = ({setter}) => {
  return (
    <div className="menu title" onClick= {() => {
      
      localStorage.getItem("playerName") ? setter("main") : setter("enter-name")}}>
      The art of Drift<br/>
      (click the screen to start)
    </div>
  )
}

export default Title;