import {pauseGame,unPauseGame,startGame,resetGame} from "../game/main.js"
import {setParticleLimit,getParticleLimit} from "../game/graphics.js"
import {setEnableGhost,getEnableGhost,setMapData} from "../game/game.js"
import {freeplay, test, map1, map2, map3, map4, map5} from  "../game/map-data.js"
import {replay1, replay2, replay3, replay4, replay5} from "../game/replay.js"

import React, {Component} from 'react';

//menu assets
import menuFreePlay from "../assets/menu/free-play.svg"
import menuGithub from "../assets/menu/github.svg"
import menuMapmaker from "../assets/menu/map-maker.svg"
import menuMapSelect from "../assets/menu/map-select.svg"
import menuSettings from "../assets/menu/settings.svg"

const graphics = {
  "free-play" : menuFreePlay,
  "github" : menuGithub,
  "map-maker" : menuMapmaker,
  "map-select" : menuMapSelect,
  "settings" : menuSettings
}

// import Finish from "./pages/finish.js"

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
const e = React.createElement;



const Finish = ({setter}) => {
  return (
    <div className="menu finish" >
      <h1>Finish!</h1>

      <button onClick={() => {
        resetGame();
        setter("hidden")
      }}>Restart Race</button>

      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>

    </div>
  )
}

const Hidden = ({setter}) => {
  return (
    <div className="menu-button " >
      <button  onClick={() => {
      setter("pause");
      pauseGame();
      } }>Open menu</button>
      <button onClick = {() => {setTimeout(resetGame,100)}}>Reset</button>
    </div>
  )
}

const MapSelect = ({setter}) => { 
  let [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="menu map-select">
      GL ,':') HF
      <label htmlFor="difficulty">Difficulty</label>
      <div name="difficulty" id="difficulty">
        <button value="easy" className={difficulty == "easy" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>silver</button>
        <button value="normal" className={difficulty == "normal" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)} >gold</button>
        <button value="hard" className={difficulty == "hard" ? "set" : "not"} onClick ={(e)=> setDifficulty(e.target.value)}>author</button>
      </div>
      <div className="map-options">
        <h2>Maps</h2>
        <div className="map-option">
          <h3>Taste of texas</h3>
          <button onClick = {()=> {
          setMapData(map1,replay1[difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>


        <div className="map-option">
          <h3>Smile :D</h3>
          <button onClick = {()=> {
          setMapData(map2,replay2[difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Eye of the drift holder</h3>
          <button onClick = {()=> {
          setMapData(map3,replay3[difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Da lyne</h3>
          <button onClick = {()=> {
          setMapData(map4,replay4[difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>

        <div className="map-option">
          <h3>Hatchet Raceway</h3>
          <button onClick = {()=> {
          setMapData(map5,replay5[difficulty]);
          resetGame();
          setter("hidden")
          }}>Select</button>
        </div>
      </div>

      

      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

const Title = ({setter}) => {
  return (
    <div className="menu title" onClick= {() => setter("main")}>
      Skrrrt Tzu : The art of Drift.<br/>
      (click the screen to start)
    </div>
  )
}
const Pause = ({setter,setPrevious}) => {
  return (
    <div className="menu">
      <button onClick={() => {
        setter("hidden");
      unPauseGame();
      }}>Return to game</button>
      <button onClick={() => {
        setPrevious("pause")
        setter("options");
      }}>Options</button>
      <button onClick={() => {
        setPrevious("main")
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

const Main = ({setter,setPrevious}) => {
  let [hover,setHover] = useState("map-select")
  return (
  <div className="menu main">
    <div className="wrapper">
      <div>
        <h2>Main Menu</h2>
      <nav>
      <button onClick={() => setter("map select") }
      onMouseEnter={() =>setHover("map-select")}>Map Select</button>
      <button onClick = {()=> {
        setMapData(freeplay,[[]]);
        startGame();
        setter("hidden")
      }}
      onMouseEnter={() =>setHover("free-play")}
      >Free Play</button>
      <a href="https://michaelgombos.github.io/browser-driving-map-creator/"> <button onMouseEnter={() =>setHover("map-maker")}>Map Maker</button> </a>
      <a href="https://github.com/MichaelGombos/browser-driving-demo"> <button onMouseEnter={() =>setHover("github")}>Github</button> </a>
      <button onClick={() => {
        setter("options");
        setPrevious("main")
      }}
      onMouseEnter={() =>setHover("settings")}
      >Options</button>
    </nav>
      </div>

      <div className="menu-splash-wrapper">
        <img className={`menu-splash menu-splash-${hover}`} src={graphics[hover]}></img>
      </div>
    </div>
  </div>
  )
}

const Options = ({setter,previous}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(getEnableGhost());
  let [newParticleLimit,setNewParticleLimit] = useState(getParticleLimit());

  return (
    <div className="menu options">
    <h2>options</h2>
    <label htmlFor="ghost-selector">Enable Ghost Car  </label>
    <button  
    onClick={(e) => {setNewEnableGhost(!newEnableGhost)}} 
    className={newEnableGhost ? "set" : "none"}>{newEnableGhost ? "disable ghost car" : "enable ghost car"}</button>

    <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
    <input type="range" min="0" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
    <button onClick={() => {
      setter(previous);
      setEnableGhost(newEnableGhost);
      setParticleLimit(newParticleLimit);
    }}>Save and exit</button>
    <button onClick={() => {
      setter(previous);
      setNewEnableGhost(getEnableGhost());
      setNewParticleLimit(getParticleLimit());
    }}>Exit without saving</button>
  </div>
  )

}

const Menu = ({type, setType}) => {
  let display;
  const [previousType,setPreviousType] = useState('title')
  if(type == "hidden"){
    return <Hidden setter={setType}/>

  }
  else if(type == "pause"){

    return <Pause setter={setType} setPrevious = {setPreviousType}/>         
  }
  else if(type == "main"){
    
    return <Main setter ={setType} setPrevious = {setPreviousType}/>
  }
  else if(type == "options"){
    return <Options setter ={setType} previous = {previousType}/>
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
  else{
    display = <div>display buggin</div>
  }

  return display;
}

class GUI extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      type: "main",
      navIndex: null
    }
    window.changeMenu = this.handleTypeChange;
  }
  handleTypeChange = (type) => {
    this.setState( {type: type})
  } 
  navigateMenu = (event) => {
    if(this.state.type != "hidden"){
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
        setTimeout(resetGame,100)
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

// const domContainer = document.querySelector('#menu-container');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(GUI));

export default GUI;

