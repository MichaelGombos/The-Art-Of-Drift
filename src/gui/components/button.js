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

const Button = ({clickHandler, style, children}) => {
  
  return(
    <motion.button className='pixel-button pixel-button--primary' onClick = {clickHandler}
    whileHover={{ scale: .95}}
    whileTap={{ scale: .80}}
    >
        <p className={`pixel-button__text f-p2 ${["danger","selected"].includes(style) ? "text-shade-0" : null}`}>{children}</p>
        <div className='pixel-button__images'>
          <img src={buttonImageUrlMap[style].left}  className='pixel-button__left-image'/>
          <img src={buttonImageUrlMap[style].center}  className='pixel-button__center-image'/>
          <img src={buttonImageUrlMap[style].right}  className='pixel-button__right-image'/>
        </div>

    </motion.button>
  )
}

export default Button;
