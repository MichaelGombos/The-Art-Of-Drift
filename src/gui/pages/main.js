import React from 'react';
import MainMenuNavigation from '../components/main-menu-navigation.js';

import ScrollingBackground from '../components/scrolling-background.js';
import StackedBrandText from '../components/stacked-brand-text.js';

const Main = () => {

  return (
  <div className="menu main">
    <p className='text-color-primary-900 f-p2'>Welcome, {localStorage.getItem("playerName")}</p>
    <MainMenuNavigation/>
    <StackedBrandText size="f-h2" content="main menu"/>
    <ScrollingBackground/>
  </div>
  )
}

export default Main;