import React from 'react';

const TextInput = ({id, labelText, placeholderText, changeHandler}) => {
  return (

  <div className="col-6 text-input gap-md">
    <label className="text-input__label" htmlFor={id}>{labelText}</label>
    <input className="text-input__text"  onChange={e => changeHandler(e.target.value)} 
    placeholder ={placeholderText}/>
  </div>
  )
}

export default TextInput;