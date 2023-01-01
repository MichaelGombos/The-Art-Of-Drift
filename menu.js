import {pauseGame,unPauseGame,resetGame} from "./main.js"
console.log(pauseGame)
const {useState} = React

'use strict';

const e = React.createElement;

const Menu = () => {
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