import React from "react";

const ProfileTemplate = ({children}) => {


  return (
    <div className="vertical-navigation-menu dark-background">
      <div className='horizantal-navigation-menu menu-container '>
        {children}
      </div>
    </div>
  )
}

export default ProfileTemplate;