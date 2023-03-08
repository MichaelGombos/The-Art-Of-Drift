import React, {useRef, useState, useEffect} from "react"




const InputToggle = ({newValue,setter,children}) => {
  
    const onChange = (event) => {
      setter(event.target.checked);
    };
  
    console.log(newValue);

  return (
    <div className='particle-limit row w-100 justify-between align-center'>
      <label htmlFor="particle-selector">{children} ({newValue ? "on" : "off"})</label>

      <label class="switch">
          <input 
          type="checkbox"
          checked={newValue}
          className="toggle"
          onChange={onChange}/>
        <span class="switch__inner"></span>
      </label>

  </div>
  )
}

export default InputToggle;