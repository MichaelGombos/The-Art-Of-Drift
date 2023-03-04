import React from 'react';
import MainMenuNavigation from '../components/main-menu-navigation.js';

import ScrollingBackground from '../components/scrolling-background.js';
import TextLogo from '../components/text-logo.js';

const Main = () => {

  return (
  <div className="menu-container">
    <div className="col-2 gap-xl main-menu">

      <TextLogo size="small" content="main menu"/>
      <MainMenuNavigation/>
    </div>

  </div>
  )
}

export default Main;