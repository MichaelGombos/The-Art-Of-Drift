import {pauseGame,unPauseGame,resetGame} from "./main.js"
import {setParticleLimit,getParticleLimit} from "./graphics.js"
import {setEnableGhost,getEnableGhost,generateMap} from "./game.js"
import {map1, map2} from "./map-data.js"

console.log(map1)
const {useState} = React

let previous = "main"
'use strict';

const e = React.createElement;
const Hidden = ({setter}) => {
  return (
    <div className="menu-button ">
      <button  onClick={() => {
      setter("pause");
      pauseGame();
      } }>Open menu</button>
    </div>
  )
}

const MapSelect = ({setter}) => { //generate map with mapData?
  return (
    <div className="menu map-select">
      You gotta choose a map or sumn..
      <button onClick = {()=> {
        generateMap(map1);
        resetGame();
        setter("hidden")
      }}>Map1</button>
      <button onClick = {()=> {
        generateMap(map2);
        resetGame();
        setter("hidden")
      }}>Map2</button>
    </div>
  )
}

const Title = ({setter}) => {
  return (
    <div className="menu title" onClick= {() => setter("main")}>
      CRUSTY DUSTERS<br/>
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
        setPrevious("main")
        setter("options");
      }}>Options</button>
      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

const Main = ({setter,setPrevious}) => {
  return (
    <div className="menu main">
    <button onClick={() => {
      setter("map select");
    }}>Map Select</button>
    <button onClick={() => {
      setter("options");
      setPrevious("main")
    }}>Options</button>
  </div>
  )
}

const Options = ({setter,previous}) => {
  let [newEnableGhost, setNewEnableGhost] = useState(true);
  let [newParticleLimit,setNewParticleLimit] = useState(500);

  return (
    <div className="menu options">
    <h2>options</h2>
    <label htmlFor="ghost-selector">Enable Ghost Car  </label>
    <input type="checkbox" id="ghost-selector" value="on" checked={newEnableGhost} onChange={(e) => {setNewEnableGhost(e.target.checked)}}></input>
    <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
    <input type="range" min="10" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
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

const Menu = () => {
  let display;
  const [type,setType] = useState('map select')
  const [previousType,setPreviousType] = useState('map select')
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
  else{
    display = <div>display buggin</div>
  }

  return display;
}

class MenuOverlay extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {return <Menu />}
}

const domContainer = document.querySelector('.menu-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(MenuOverlay));