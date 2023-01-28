import React from 'react';
const {useState} = React

const EnterName = ({setter}) => {
  const [nameValue, setNameValue] = useState('')

  const setLocalName = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName",nameValue)
    setNameValue('')
    setter("main")
  }

  return (
    <div className="menu enter-name" onClick= {() => setter("enter-name")}>
      <p>If you were a racer... what would your name be?</p>
      <form onSubmit={setLocalName}>
        <input value = {nameValue} onChange={(e) => setNameValue(e.target.value)} required pattern=".*\S+.*" maxlength="15" />
        <button type="submit">Enter</button>
      </form>
    </div>
  )
}

export default EnterName;