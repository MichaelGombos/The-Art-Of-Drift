import React from 'react';

const TextLogo = ({size}) => {
  return(
    <h1 className="text-logo">
      <span className={`text-logo__header text-logo__header--${size}`}>THE ART OF</span>
      <span className={`text-logo__subheader text-logo__subheader--${size}`}>Drift</span>
    </h1>
  )
}

export default TextLogo;