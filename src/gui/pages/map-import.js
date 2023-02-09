import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMap, setMapData, setEnableGhost } from '../../game/game';
import { resetGame } from '../../game/main';
import { colorPlayerCar } from '../../game/graphics';

const MapImport = () => {
  const [mapInput,setMapInput] = useState([]);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    //create dummy map values.
    const map = {
      data: JSON.parse("[" + mapInput + "]")[0],
      spawnAngle: 0,
      lapCount: 3
    }
    setMapData(map)
    resetGame();
    colorPlayerCar();
    setEnableGhost(false);
    navigate("/hidden");
  }

  return (
    <div className="menu import">
      <p>Enter your map Below, and click import to play it.</p>
      <div id="import">
           <textarea id="map-input" onChange={ e => setMapInput(e.target.value) }>
           </textarea>
           <button className="play-button f-h3"id="upload" onClick={handleUpload}>IMPORT</button>
      </div>
      <div>
        <button onClick={() => {
          navigate("/main");
        } }>Back to main menu</button>
      </div>
    </div>
  )
}

export default MapImport;