
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getGameMapIndex } from '../../game/game.js';
import {turnOffGame, unPauseGame} from "../../game/main.js"
import Button from '../components/button.js';

const Pause = ({setPrevious}) => {
  const navigate = useNavigate();

  return (

    <div className="opaque-background">
    <div className='menu-container'>
      <div className="paused-menu col-2 align-center gap-lg">
        <h1 className="f-h1">Pause</h1>
        <div className='col-6 align-center gap-md' >
          <Button style="primary" clickHandler={() => {
            navigate("/hidden");
          unPauseGame();
          }}>Return to game</Button>
          <Button clickHandler={() => {
            setPrevious("pause")
            navigate("/settings");
          }}>Settings</Button>
          {
            getGameMapIndex() &&
            <Button clickHandler={() => {
              navigate(`/campaign/${getGameMapIndex()}`);
              turnOffGame();
            }}>Back to level screen</Button>
          }

          <Button clickHandler={() => {
            navigate("/main");
            turnOffGame();
          }}>Back to main menu</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Pause;