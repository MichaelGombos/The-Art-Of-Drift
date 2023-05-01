import React from 'react';

import {motion} from 'framer-motion';

const IconButton = ({style, zref ,clickHandler, iconUrl, children}) => {
  return(
    <motion.button 
    ref={zref}
    onClick={clickHandler} 
    className={` ${style == "key-selector" ? "icon-button__selector icon-button" : "icon-button"}`}
    whileHover={{ scale: 1.5}}
    whileTap={{ scale: .8}}>
      {children}
      {iconUrl ? <img className="icon-button__image" src={iconUrl}/> : ""}
    </motion.button>
  )
}


export default IconButton;