import React from 'react';

const StackedBrandText = ({size, content}) => {
  return(
    <h1 className={"brand " + size}><span className="text-main">{content}</span><span className="text-style">{content.toUpperCase()}</span></h1>
  )
}

export default StackedBrandText;