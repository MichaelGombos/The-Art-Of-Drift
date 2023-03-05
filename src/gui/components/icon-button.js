import React from 'react';

import {motion} from 'framer-motion';

const IconButton = ({clickHandler, iconUrl}) => {
  return(

    <motion.button onClick={clickHandler} className='icon-button'
    whileHover={{ scale: 1.5}}
    whileTap={{ scale: .8}}>
      <img className="icon-button__image" src={iconUrl}/>
    </motion.button>
  )
}


export default IconButton;