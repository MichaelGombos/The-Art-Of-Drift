//game functions
import {pauseGame,unPauseGame,startGame,resetGame} from "../game/main.js"

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

import React, {Component, useEffect} from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import Freeplay from "../game/maps/freeplay.js"

const {useState} = React

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

const Menu = ({type, setType}) => {
  let display;
  const [previousType,setPreviousType] = useState('title')
  const [isStatsHidden,setIsStatsHidden] = useState(true);
  const navigate = useNavigate();
  window.changeGUIScreen = navigate;

  useEffect(() => {
    if(location.pathname != "/main")
    navigate("/")
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Title/>}/>
      <Route path="/enter-name" element={<EnterName/>}/>
      <Route path="/main" element={<Main setPrevious={setPreviousType}/>}/>
      <Route path="/map-select" element={<MapSelect/>} />
      <Route path="/leaderboards" element={<Leaderboards/>} />
      <Route path="/settings" element={<Settings previous={previousType} showStats={isStatsHidden} setShowStats={setIsStatsHidden} />} />
      <Route path="/hidden" element={<Hidden  showStats={isStatsHidden} />}/>
      <Route path="/pause" element={<Pause setPrevious={setPreviousType} />}/>
      <Route path="/finish" element={<Finish/>}/>
    </Routes>
  )
}

class GUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "enter-name",
      navIndex: null
    }
  }

  navigateMenu = (event) => {
    if(this.state.type != "hidden" &&  document.activeElement.tagName != "INPUT"  ){
      let menuList = Array.from(document.querySelector(".menu").querySelectorAll("button,select ,input"));

      let firstButton = menuList[0]
      let lastButton = menuList[menuList.length-1];
      let lastIndex = menuList.length-1;
      if(this.state.navIndex == null){
        this.setState ({navIndex:0})
        firstButton.focus();
      }
      else{
        if(navKeys[event.key] == "up"){
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
        else if(navKeys[event.key] == "down"){
          if(document.activeElement == lastButton){ 
            this.setState ({navIndex:0})
            firstButton.focus();
          }
          else{
            let nextButton = menuList[this.state.navIndex+1]
            this.setState ({navIndex:this.state.navIndex+1})
            nextButton.focus();
          }
        }
        else if(navKeys[event.key] == "select"){
          
          this.setState ({navIndex:null})
        }
      }
    }
    
  }

  onKeyPressed = () => (e) => {
    if(e.key == "r"){
      if(this.state.type == "hidden"){
        setTimeout(resetGame,20)
      }
    } 
    else if(e.key == "p" || e.key == "Escape"){
      if(this.state.type == "hidden"){
        this.handleTypeChange("pause");
        pauseGame();
      }
      else if(this.state.type == "pause"){
        this.handleTypeChange("hidden");
        unPauseGame();
      }
    }
    else if(Object.keys(navKeys).includes(e.key)){
      this.navigateMenu(e);
    }
    
  }

  componentDidMount() {   window.addEventListener('keydown', this.onKeyPressed().bind(this) )    }
  
  


  ref = React.createRef();
  render() {return <Menu type={this.state.type} setType={this.handleTypeChange}/>}
}


export default GUI;

