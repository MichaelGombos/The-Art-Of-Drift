import React from 'react';

import {playerColors} from "../../game/graphics.js"

const {useState} = React


const EnterName = ({setter}) => {
  const [nameValue, setNameValue] = useState('')
  const [color , setColor] = useState('')

  const setLocalInfo = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName",nameValue)
    color ? localStorage.setItem("playerColor",color) : localStorage.setItem("playerColor","white")
    setNameValue('')
    setColor('')
    setter("main")
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

  console.log(Object.keys(playerColors))

  return (
    <div className="menu enter-name" onClick= {() => setter("enter-name")}>
      <form onSubmit={setLocalInfo}>

        <p>If you were a racer... what would your name be?</p>
        <input value = {nameValue} onChange={(e) => setNameValue(e.target.value)} required pattern=".*\S+.*" maxLength="15" />
        <p>Select a car color</p>
        <div className="color-pickers">
          {colorPickers}
        </div>
        <button type="submit">Play</button>
      </form>
    </div>
  )
}

export default EnterName;