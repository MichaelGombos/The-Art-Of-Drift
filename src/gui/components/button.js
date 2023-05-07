import React from 'react';

import {motion} from 'framer-motion';

import dangerCenter from "../../assets/buttons/button-danger-center.png";
import dangerLeft from "../../assets/buttons/button-danger-left.png";
import dangerRight from "../../assets/buttons/button-danger-right.png";

import disabledCenter from "../../assets/buttons/button-disabled-center.png";
import disabledLeft from "../../assets/buttons/button-disabled-left.png";
import disabledRight from "../../assets/buttons/button-disabled-right.png";

import lightCenter from "../../assets/buttons/button-light-center.png";
import lightLeft from "../../assets/buttons/button-light-left.png";
import lightRight from "../../assets/buttons/button-light-right.png";

import primaryCenter from "../../assets/buttons/button-primary-center.png";
import primaryLeft from "../../assets/buttons/button-primary-left.png";
import primaryRight from "../../assets/buttons/button-primary-right.png";

import selectedCenter from "../../assets/buttons/button-selected-center.png";
import selectedLeft from "../../assets/buttons/button-selected-left.png";
import selectedRight from "../../assets/buttons/button-selected-right.png";

import google from "../../assets/buttons/google.svg"
import googleWhite from "../../assets/buttons/google-white.svg"
import { generateMouseClickSound, generateMouseHoverSound } from '../../sounds/sounds';

const buttonImageUrlMap = {
  danger : {
    center : dangerCenter,
    left : dangerLeft,
    right : dangerRight
  },
  disabled : {
    center : disabledCenter,
    left : disabledLeft,
    right : disabledRight
  },
  light : {
    center : lightCenter,
    left : lightLeft,
    right : lightRight
  },
  primary : {
    center : primaryCenter,
    left : primaryLeft,
    right : primaryRight
  },
  selected : {
    center : selectedCenter,
    left : selectedLeft,
    right : selectedRight
  }
}

const iconMap = {
  google : google,
  "google-white":googleWhite
}

const Button = ({alignStart, clickHandler,type, style, children, icon}) => {
  if(!style) style="light";
  return(
    <motion.button 
    className='pixel-button pixel-button--primary' 
    onClick = {() => {
      clickHandler();
      generateMouseClickSound();
    }}
    onHoverStart = {generateMouseHoverSound}
    whileFocus={style == "disabled" ? {rotate:-1.2}: {scale: 1.05} }
    whileHover={style == "disabled" ? {rotate:-1.2}: {scale: 1.05} }
    whileTap={style == "disabled" ? {rotate:1.2} : { scale: .8}}
    type = {type}
    >
      <div className={`pixel-button__text ${alignStart ? "pixel-button__text--align-start" : "" }`}>
        <p className={`pixel-button__main  f-p2 ${["danger","selected"].includes(style) ? "text-shade-0" : null}`}>{children}</p>
          {icon ? <img className='pixel-button__icon' src={iconMap[icon]}></img> : ""}
      </div>

        <div className='pixel-button__images'>
          <img src={buttonImageUrlMap[style].left}  className='pixel-button__left-image'/>
          <img src={buttonImageUrlMap[style].center}  className='pixel-button__center-image'/>
          <img src={buttonImageUrlMap[style].right}  className='pixel-button__right-image'/>
        </div>

    </motion.button>
  )
}

export default Button;
