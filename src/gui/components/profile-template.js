import React from "react";

const ProfileTemplate = ({children}) => {


  return (
    <div className="dark-background">
      <div className='menu-container '>
        {children}
      </div>
    </div>
  )
}

export default ProfileTemplate;