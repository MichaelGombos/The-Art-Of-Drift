import React from 'react';
import { useNavigate } from 'react-router-dom';

import {playerColors} from "../../game/graphics.js"

const {useState} = React

const PlayerInfoForm = ({destination}) => {
  const [nameValue, setNameValue] = useState('')
  const [color , setColor] = useState('')
  const navigate = useNavigate();

  const setLocalInfo = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName",nameValue)
    color ? localStorage.setItem("playerColor",color) : localStorage.setItem("playerColor","white")
    setNameValue('')
    setColor('')
    navigate(destination)
  }
  const colorPickers = Object.keys(playerColors).map((key) => {
    return (    
    <div key={key} className="color-picker-wrapper">
      <div className={`color-picker-border ${key == color ? "active" : ""}`}>

      </div>
      <div style={key == "red" ? {backgroundColor : "#ff5f5f"} : {filter : playerColors[key]} } 
      className='color-picker'
      onClick={() => setColor(key)}
      >
      </div>
    </div>
  )

  })

  return (
    <form onSubmit={setLocalInfo}>
      <p>{origin == "title" ? "If you were a racer... what would your name be?" : "Choose a name."}</p>
      <input value = {nameValue} onChange={(e) => setNameValue(e.target.value)} required pattern=".*\S+.*" maxLength="15" />
      <p>Select a car color</p>
      <div className="color-pickers">
        {colorPickers}
      </div>
      <button type="submit">Continue</button>
    </form>
  )
}

export default PlayerInfoForm;