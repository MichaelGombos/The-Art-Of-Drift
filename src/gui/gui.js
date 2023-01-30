//game functions
import {pauseGame,unPauseGame,startGame,resetGame} from "../game/main.js"
import {setParticleLimit,getParticleLimit} from "../game/graphics.js"
import {setEnableGhost,getEnableGhost,setMapData} from "../game/game.js"
import {freeplay, test, map1, map2, map3, map4, map5} from  "../game/map-data.js"
import {replay1, replay2, replay3, replay4, replay5} from "../game/replay.js"

//pages
import EnterName from "./pages/enter-name.js"
import Finish from "./pages/finish.js"
import Hidden from "./pages/hidden.js"
import MapSelect from "./pages/map-select.js"
import Title from "./pages/title.js"
import Pause from "./pages/pause.js"
import Main from "./pages/main.js"
import Options from "./pages/options.js"
import Leaderboards from "./pages/leaderboards.js"

import React, {Component} from 'react';


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

  if(type == "hidden"){
    return <Hidden setter={setType} showStats={isStatsHidden} />

  }
  else if(type == "pause"){

    return <Pause setter={setType} setPrevious = {setPreviousType}/>         
  }
  else if(type == "main"){
    
    return <Main setter ={setType} setPrevious = {setPreviousType}/>
  }
  else if(type == "options"){
    return <Options setter ={setType} previous = {previousType} showStats={isStatsHidden} setShowStats={setIsStatsHidden}/>
  }
  else if(type == "title"){
    return <Title setter ={setType}/> 
  }
  else if(type == "map select"){
    return <MapSelect setter={setType}/> 
  }
  else if(type == "finish"){
    return <Finish setter={setType}/> 
  }
  else if(type == "enter-name"){
    return <EnterName setter={setType}/> 
  }
  else if(type == "leaderboards"){
    return <Leaderboards setter={setType}/>
  }
  else{
    display = <div>display buggin</div>
  }

  return display;
}

class GUI extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      type: "title",
      navIndex: null
    }
    window.changeMenu = this.handleTypeChange;
  }
  handleTypeChange = (type) => {
    this.setState( {type: type})
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

