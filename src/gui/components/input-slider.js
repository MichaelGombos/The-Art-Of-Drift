import { motion } from "framer-motion";
import React, {useRef, useState, useEffect} from "react"




const InputSlider = ({minimum,maximum,newValue,setter,sideEffect, children, parentRef}) => {
    const inputRef = parentRef ? parentRef : useRef(); //parent ref for special pages like settings
    
  
    const onChange = (event) => {
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
    <div className='input-slider-container row w-100 justify-between align-center horizantal-navigation-menu'>
    <label htmlFor="input-slider-label">{children} ({newValue})</label>
    <motion.input

whileFocus={ {scale: 1.15} }
whileHover={ {scale: 1.15} }
whileTap={ { scale: 1.20}}
      ref={parentRef ? parentRef : inputRef}
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