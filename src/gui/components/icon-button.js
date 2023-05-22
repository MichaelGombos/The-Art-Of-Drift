import React from 'react';

import {motion} from 'framer-motion';
import { generateMouseClickSound } from '../../sounds/sfx';

const IconButton = ({style, zref ,clickHandler, iconUrl, children, onMouseDown, onMouseUp,onTouchStart, onTouchEnd}) => {
  return(
    <motion.button 
    ref={zref}
    onClick = {() => {
      clickHandler();
      generateMouseClickSound();
    }}
    className={` ${style == "key-selector" ? "icon-button__selector icon-button" : "icon-button"}`}
    whileHover={{ scale: 1.5}}
    onMouseDown = {onMouseDown}
    onMouseUp = {onMouseUp}
    onTouchStart = {onTouchStart}
    onTouchEnd = {onTouchEnd}
    whileTap={{ scale: .8}}>
      {children}
      {iconUrl ? <img className="icon-button__image" src={iconUrl}/> : ""}
    </motion.button>
  )
}


export default IconButton;