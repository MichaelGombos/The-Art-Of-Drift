import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../components/button.js';
import InputSlider from '../components/input-slider.js';

const TestButton = ({text}) => {
  return(

    <Button style="light" clickHandler={()=> {console.log("pressed", text)}}
    >{text}</Button>
  )
}

const AccessibleNavigationTest = () => {
  const navigate = useNavigate();

  return (
  <div className="vertical-navigation-menu col-6 main-menu__navigation gap-md">
    <div className="horizantal-navigation-menu row">
      <TestButton text="test"/>
      <TestButton text="test2"/>
      <TestButton text="test3"/>
    </div>
    <div className="horizantal-navigation-menu row">
      <TestButton text="testa"/>
      <TestButton text="test3a"/>
    </div>
    <div className="horizantal-navigation-menu row">
      <TestButton text="testb"/>
      <TestButton text="test2b"/>
      <TestButton text="test3b"/>
    </div>
  </div>
  )
}

export default AccessibleNavigationTest;