import React from 'react';

const TextInput = ({id,type,min,max, labelText, placeholderText, viewOnly, changeHandler}) => {
  return (

  <div className="vertical-navigation-menu col-6 text-input gap-md">
    <label 
    className={`text-input__label ${viewOnly ? "text-input__label--view-only" : ""}`}
    htmlFor={id}>
      {labelText}
      </label>
    <input 
    className={`text-input__text ${viewOnly ? "text-input__text--view-only" : ""}`} 
    type="text"
    onChange={e => changeHandler(e.target.value)} 
    placeholder ={placeholderText}
    minLength={min}
    maxLength={max}
    required={true}
    />
  </div>
  )
}

export default TextInput;