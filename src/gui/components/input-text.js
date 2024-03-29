import React, { useRef } from 'react';

const TextInput = ({id,type,min,max, labelText, placeholderText, viewOnly, changeHandler}) => {
  const inputRef = useRef(null)

  return (

  <div className="vertical-navigation-menu col-6 text-input gap-md">
    <label 
    className={`text-input__label ${viewOnly ? "text-input__label--view-only" : ""}`}
    htmlFor={id}>
      {labelText}
      </label>
    {!viewOnly ?     <input 

    ref = {inputRef}
    onClick = {(() => {
      Window.setNavLocation( Window.getObjectWithElement(inputRef.current).location);
    } )}
    className={`text-input__text`} 
    type="text"
    onChange={e => changeHandler(e.target.value)} 
    placeholder ={placeholderText}
    minLength={min}
    maxLength={max}
    required={true}
    /> :
    <p 
    className="text-input__text__view-only" >{placeholderText}</p>
    }

  </div>
  )
}

export default TextInput;