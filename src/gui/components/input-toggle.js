import { motion, useMotionValue , AnimatePresence} from "framer-motion";
import React, {useRef, useState, useEffect} from "react"




const InputToggle = ({newValue,setter,children}) => {
    const inputRef = useRef();
    const [isChildFocused,setIsChildFocused] = useState(false);
    const onChange = (event) => {
      setter(event.target.checked);
    };
  
    const updateCheckbox = () => { //for keyboard/controller nav
      setter(inputRef.current.value);
      console.log(isChildFocused);
    }
  return (
    <div className='horizantal-navigation-menu particle-limit row w-100 justify-between align-center '>
      <label htmlFor="particle-selector">{children} ({newValue ? "on" : "off"})</label>

      <label className="switch horizantal-navigation-menu">
      <input

          onFocus={() => {setIsChildFocused(true)}}
          onBlur={() => setIsChildFocused(false)}
          ref={inputRef}
          type="checkbox"
          checked={newValue}
          className="toggle"
          onChange={onChange}
          onClick={updateCheckbox}
          />
          
        <motion.span 
        className="switch__inner"
        animate={ isChildFocused ? {scale:1.3} :  {scale:1}}
        transition={{ duration: 0.05 }}
        ></motion.span>
      </label>

  </div>
  )
}

export default InputToggle;