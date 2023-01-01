import {pauseGame,unPauseGame,resetGame} from "./main.js"
import {setParticleLimit,getParticleLimit} from "./graphics.js"
import {setEnableGhost,getEnableGhost} from "./game.js"
console.log(pauseGame)
const {useState} = React

let previous = "main"
'use strict';

const e = React.createElement;

const Menu = () => {
  let [newEnableGhost, setNewEnableGhost] = useState(true);
  let [newParticleLimit,setNewParticleLimit] = useState(500);

  let display;
  const [type,setType] = useState('main')
  if(type == "hidden"){
    display = 
    <div className="menu-button ">
      <button  onClick={() => {
        setType("pause");
       pauseGame();
      } }>Open menu</button>
    </div>
  }
  else if(type == "pause"){

    display =         
     <div className="menu">
      <button onClick={() => {
        setType("hidden");
       unPauseGame();
      }}>Return to game</button>
      <button onClick={() => {
        previous = type
        setType("options");
      }}>Options</button>
      <button onClick={() => {
        setType("main");
      }}>Back to main menu</button>
    </div>

  }
  else if(type == "main"){
    
    display = <div className="menu main">
      <button onClick={() => {
        setType("hidden");
       resetGame();
      }}>Start Game</button>
      <button onClick={() => {
        previous = type
        setType("options");
      }}>Options</button>
    </div>
  }
  else if(type == "options"){
    display = <div className="menu options">
      <h2>options</h2>
      <label htmlFor="ghost-selector">Enable Ghost Car  </label>
      <input type="checkbox" id="ghost-selector" value="on" checked={newEnableGhost} onChange={(e) => {setNewEnableGhost(e.target.checked)}}></input>
      <label htmlFor="particle-selector">Particle Limit ({newParticleLimit})</label>
      <input type="range" min="10" max="2000" value={newParticleLimit}  className="slider" id="particle-selector" onChange={(e) => {setNewParticleLimit(e.target.value)}}/>
      <button onClick={() => {
        setType(previous);
        setEnableGhost(newEnableGhost);
        setParticleLimit(newParticleLimit);
      }}>Save and exit</button>
      <button onClick={() => {
        setType(previous);
        setNewEnableGhost(getEnableGhost());
        setNewParticleLimit(getParticleLimit());
      }}>Exit without saving</button>
    </div>
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