import {pauseGame,unPauseGame,resetGame} from "./main.js"
import {setParticleLimit,getParticleLimit} from "./graphics.js"
import {setEnableGhost,getEnableGhost} from "./game.js"
console.log(pauseGame)
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

const Pause = ({setter}) => {
  return (
    <div className="menu">
      <button onClick={() => {
        setter("hidden");
      unPauseGame();
      }}>Return to game</button>
      <button onClick={() => {
        previous = type
        setter("options");
      }}>Options</button>
      <button onClick={() => {
        setter("main");
      }}>Back to main menu</button>
    </div>
  )
}

const Main = ({setter}) => {
  return (
    <div className="menu main">
    <button onClick={() => {
      setter("hidden");
     resetGame();
    }}>Start Game</button>
    <button onClick={() => {
      previous = type
      setter("options");
    }}>Options</button>
  </div>
  )
}

const Options = ({setter}) => {
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
  const [type,setType] = useState('main')
  if(type == "hidden"){
    return <Hidden setter={setType}/>

  }
  else if(type == "pause"){

    return <Pause setter={setType}/>         
  }
  else if(type == "main"){
    
    return <Main setter ={setType}/>
  }
  else if(type == "options"){
    return <div> Hello <Options setter ={setType}/> </div>
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