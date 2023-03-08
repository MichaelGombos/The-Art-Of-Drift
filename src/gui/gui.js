//game functions
import {pauseGame,unPauseGame,resetGame, turnOffGame} from "../game/main.js"

//pages
import Finish from "./pages/finish.js"
import Hidden from "./pages/hidden.js"
import MapSelect from "./pages/ARCHIVED__map-select.js"
import Title from "./pages/title.js"
import Pause from "./pages/pause.js"
import Main from "./pages/main.js"
import Settings from "./pages/settings.js"
import Leaderboards from "./pages/leaderboards.js"
import Invited from "./pages/invited.js"

import React, {Component, useEffect} from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation} from "react-router-dom";
import InvitedPreview from "./pages/ARCHIVED__invited-preview.js"
import MapImport from "./pages/map-import.js"
import NotSupported from "./pages/not-supported.js"
import Countdown from "./pages/countdown.js"
import ScrollingBackground from "./components/scrolling-background.js"
import Welcome from "./pages/welcome.js"
import Signup from "./pages/signup.js"
import Signin from "./pages/signin.js"
import Campaign from "./pages/campaign.js"
import CampaignLevel from "./pages/campaign-level.js"

const {useState} = React

let currentNavigationInterval = 0;
let lastNavigationTime = performance.now();
const validNavigationInterval = 150;
let previous = "main"
'use strict';
const commands = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  select: "select"
}
const navKeys = {
  "ArrowUp": commands.up,
  "ArrowLeft": commands.left,
  "ArrowRight": commands.right,
  "ArrowDown": commands.down,
  "w": commands.up,
  "a": commands.left,
  "s": commands.down,
  "d": commands.right,
  "Enter": commands.select
}

const Menu = () => {
  let isDeviceValid = true;
  const [previousType,setPreviousType] = useState('title')
  const [showFPS,setShowFPS] = useState(true);
  const [showExtraStats,setShowExtraStats] = useState(true);
  const [showDashboard,setShowDashboard] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  window.changeGUIScreen = navigate;

  const handleResize = () => {
    if(window.innerWidth < 788){
      isDeviceValid = false;
      navigate("/not-supported")
    }
    else{
      if(!isDeviceValid){
        isDeviceValid = true;
        navigate("/")
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize',handleResize)
    if(!location.pathname.includes("/invited")){
      navigate("/")
    }

    handleResize();
  }, [])

  useEffect(() => {
    // http://localhost:8080/invited?racer=J&map=0
    if(
    !location.pathname.includes("/pause") &&
    !location.pathname.includes("/hidden") &&
    !location.pathname.includes("/countdown") &&
    !location.pathname.includes("/finish") &&
    !location.pathname.includes("/settings")){
      window.shutOffGame();
    }
    if(!location.pathname.includes("/") && window.focusFirstButton){
      window.focusFirstButton()
    }
  }, [location])

  return (
    <>
    <ScrollingBackground/>
    <Routes>
      <Route  path="/" element={<Title/>}/>
      <Route  path="/welcome" element={<Welcome/>}/>
      <Route  path="/signup" element={<Signup/>}/>
      <Route  path="/signin" element={<Signin/>}/>
      <Route  path="/main" element={<Main setPrevious={setPreviousType}/>}/>
      <Route  path="/campaign" element={<Campaign/>} />
      <Route  path="/campaign/:mapIndex" element={<CampaignLevel/>} />
      
      <Route  path="/map-select" element={<MapSelect/>} />
      <Route  path="/map-import" element={<MapImport/>} />
      <Route  path="/leaderboards" element={<Leaderboards/>} />
      <Route  path="/settings" element={<Settings 
      previous={previousType} 
      showFPS={showFPS}
      setShowFPS={setShowFPS} 
      showExtraStats={showExtraStats}
      setShowExtraStats={setShowExtraStats}
      showDashboard={showDashboard}
      setShowDashboard={setShowDashboard}
       />} />
      <Route  path="/countdown" element={<Countdown/>}/>
      <Route  path="/hidden" element={<Hidden  
      showFPS={showFPS}
      showExtraStats={showExtraStats}
      showDashboard={showDashboard}
       />}/>
      <Route  path="/pause" element={<Pause setPrevious={setPreviousType} />}/>
      <Route  path="/finish" element={<Finish/>}/>
      <Route  path="/invited" element={<Invited/>}/>
      <Route  path="/not-supported" element={<NotSupported/>}/>
      <Route  element={<Navigate to="/"/>}/>
    </Routes>
    
    </>
  )
}

class GUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.navIndex = 0;
    window.navigateMenu = this.navigateMenu;
    window.focusFirstButton = this.focusFirstButton;
  }
  focusFirstButton = () => {
    let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
    menuList[0].focus();
    this.setState ({navIndex:0})
  }
  navigateMenu = (command) => {
    let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
    currentNavigationInterval = performance.now() - lastNavigationTime;
    let validTime = currentNavigationInterval > validNavigationInterval;
    if(validTime){
      if(command == "pause" && currentNavigationInterval > validNavigationInterval * 2){
        if(location.pathname == "/hidden"){
          window.changeGUIScreen("/pause");
          pauseGame();
        }
        else if(location.pathname == "/pause"){
          window.changeGUIScreen("/hidden");
          unPauseGame();
        }
      }
      else if(command == "reset"){
        setTimeout(resetGame,20)
      }
      
      else if(document.querySelector(".menu")){

        let firstButton = menuList[0]
        let lastButton = menuList[menuList.length-1];
        let lastIndex = menuList.length-1;
  
        if(this.navIndex == null || this.navIndex == 0){
          this.navIndex = 0;
          firstButton.focus();
        }
        if(command == "up"){
          if(document.activeElement == firstButton){ 
            this.navIndex = lastIndex;
            lastButton.focus();
          }
          else{
            let previousButton = menuList[this.navIndex-1];
            this.navIndex -= 1;
            previousButton.focus();
          }
        }
        else if(command == "down"){
          if(document.activeElement == lastButton){ 
            this.navIndex = 0;
            firstButton.focus();
          }
          else{
            let nextButton = menuList[this.navIndex+1]
            this.navIndex += 1
            nextButton.focus();
          }
        }
        else if(command == "select"){
          menuList[this.navIndex].click();
        }
        else if(command == "back"){
          history.back()
        } //todo add navigate back?
  
      }

      lastNavigationTime = performance.now();
    }


  }


  onKeyPressed = () => (e) => {
    if(e.key == "r"){
      if(location.pathname == "/hidden"){
        setTimeout(resetGame,20)
      }
    } 
    else if(e.key == "p" || e.key == "Escape"){
      if(location.pathname == "/hidden"){
        window.changeGUIScreen("/pause");
        pauseGame();
      }
      else if(location.pathname == "/pause"){
        window.changeGUIScreen("/hidden");
        unPauseGame();
      }
    }
    else if(Object.keys(navKeys).includes(e.key)){
      this.navigateMenu(navKeys[e.key]);
    }
  }

  componentDidMount() {   window.addEventListener('keydown', this.onKeyPressed().bind(this) )    }
  
  


  ref = React.createRef();
  render() {return <Menu/>}
}


export default GUI;

