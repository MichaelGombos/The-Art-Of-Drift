import React, {useRef, useState, useEffect} from "react"




const InputSlider = ({minimum,maximum,newValue,setter,children}) => {
    const inputRef = useRef();
  
    const onChange = (event) => {
      setter(event.target.value);
    };
  
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
    <div className='particle-limit row w-100 justify-between align-center'>
    <label htmlFor="particle-selector">{children} ({newValue})</label>
    <input 
      ref={inputRef}
    type="range"
     min={minimum}
     max={maximum}
    defaultValue={newValue}
    className="slider"
    onChange={onChange}/>
  </div>
  )
}

export default InputSlider;