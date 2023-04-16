import { motion } from "framer-motion";
import React, {useRef, useState, useEffect} from "react"




const InputSlider = ({minimum,maximum,newValue,setter,sideEffect, children}) => {
    const inputRef = useRef();

  
    const onChange = (event) => {
      console.log("change now")
      setter(Number(event.target.value));
      sideEffect ? sideEffect() : ""
    };

    const updateSlider = () => { //for keyboard/controller nav
      console.log(inputRef.current.value)
      setter(inputRef.current.value);
    }

    
    const initSlider = () => {
      const slider = inputRef.current;
      const min = slider.min;
      const max = slider.max;
      const value = slider.value;
  
      slider.style.background = `linear-gradient(to right, #F77622 0%, #F77622 ${
        ((value - min) / (max - min)) * 100
      }%, rgb(16 16 16) ${((value - min) / (max - min)) * 100}%, rgb(16 16 16) 100%)`;
  
      slider.oninput = function () {
        this.style.background = `linear-gradient(to right, #F77622 0%, #F77622 ${
          ((this.value - this.min) / (this.max - this.min)) * 100
        }%, rgb(16 16 16) ${
          ((this.value - this.min) / (this.max - this.min)) * 100
        }%, rgb(16 16 16) 100%)`;
      };
    };

    useEffect(() => {
      initSlider();
    });

  return (
    <div className='particle-limit row w-100 justify-between align-center horizantal-navigation-menu'>
    <label htmlFor="particle-selector">{children} ({newValue})</label>
    <motion.input

whileFocus={ {scale: 1.15} }
whileHover={ {scale: 1.15} }
whileTap={ { scale: 1.20}}
      ref={inputRef}
    type="range"
    data-keyboard-navigation-speed="50"
     min={minimum}
     max={maximum}
    defaultValue={newValue}
    className="slider"
    onChange={onChange}
    onClick={updateSlider}/>
    </div>)
}

export default InputSlider;