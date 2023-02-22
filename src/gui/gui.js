//game functions
import {pauseGame,unPauseGame,resetGame} from "../game/main.js"

//pages
import EnterName from "./pages/enter-name.js"
import Finish from "./pages/finish.js"
import Hidden from "./pages/hidden.js"
import MapSelect from "./pages/map-select.js"
import Title from "./pages/title.js"
import Pause from "./pages/pause.js"
import Main from "./pages/main.js"
import Settings from "./pages/settings.js"
import Leaderboards from "./pages/leaderboards.js"
import Invited from "./pages/invited.js"

import React, {Component, useEffect} from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation} from "react-router-dom";
import InvitedPreview from "./pages/invited-preview.js"
import MapImport from "./pages/map-import.js"
import NotSupported from "./pages/not-supported.js"

const {useState} = React

let currentNavigationInterval = 0;
let lastNavigationTime = performance.now();
const validNavigationInterval = 250;
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
  const [isStatsHidden,setIsStatsHidden] = useState(true);
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
    if(!location.pathname.includes("/invited"))
    navigate("/")
    handleResize();
  }, [])

  useEffect(() => {
    console.log('Location changed');
    window.focusFirstButton ? window.focusFirstButton() : null;
  }, [location])

  return (
    <Routes>
      <Route  path="/" element={<Title/>}/>
      <Route  path="/enter-name" element={<EnterName/>}/>
      <Route  path="/main" element={<Main setPrevious={setPreviousType}/>}/>
      <Route  path="/map-select" element={<MapSelect/>} />
      <Route  path="/map-import" element={<MapImport/>} />
      <Route  path="/leaderboards" element={<Leaderboards/>} />
      <Route  path="/settings" element={<Settings previous={previousType} showStats={isStatsHidden} setShowStats={setIsStatsHidden} />} />
      <Route  path="/hidden" element={<Hidden  showStats={isStatsHidden} />}/>
      <Route  path="/pause" element={<Pause setPrevious={setPreviousType} />}/>
      <Route  path="/finish" element={<Finish/>}/>
      <Route  path="/invited" element={<Invited/>}/>
      <Route  path="/invited/preview" element={<InvitedPreview/>}/>
      <Route  path="/not-supported" element={<NotSupported/>}/>
      <Route  element={<Navigate to="/"/>}/>
    </Routes>
  )
}

class GUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "enter-name",
      navIndex: 0
    }
    window.navigateMenu = this.navigateMenu;
    window.focusFirstButton = this.focusFirstButton;
  }
  focusFirstButton = () => {
    let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
    menuList[0].focus();
    this.setState ({navIndex:0})
  }
  navigateMenu = (command) => {
    currentNavigationInterval = performance.now() - lastNavigationTime
    let validTime = currentNavigationInterval > validNavigationInterval;
    if(validTime){


      if(command == "pause" && currentNavigationInterval > validNavigationInterval * 2){
        console.log("no way?",currentNavigationInterval , validNavigationInterval)
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
      
      else if(document.querySelector(".menu") &&  document.activeElement.tagName != "INPUT" ){
        let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
  
        let firstButton = menuList[0]
        let lastButton = menuList[menuList.length-1];
        let lastIndex = menuList.length-1;
  
        if(this.state.navIndex == null){
          console.log("missed?")
          this.setState ({navIndex:0})
          firstButton.focus();
        }
        if(command == "up"){
          if(document.activeElement == firstButton){ 
            this.setState ({navIndex:lastIndex})
            lastButton.focus();
          }
          else{
            let previousButton = menuList[this.state.navIndex-1];
            this.setState ({navIndex:this.state.navIndex-1})
            previousButton.focus();
          }
        }
        else if(command == "down"){
          if(document.activeElement == lastButton){ 
            this.setState ({navIndex:0})
            firstButton.focus();
          }
          else{
            let nextButton = menuList[this.state.navIndex+1]
            this.setState ({navIndex:this.state.navIndex+1})
            console.log(this.state.navIndex, menuList)
            nextButton.focus();
          }
        }
        else if(command == "select"){
          console.log(
            menuList, this.state)
          menuList[this.state.navIndex].click();
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
  render() {return <Menu type={this.state.type} setType={this.handleTypeChange} />}
}


export default GUI;

