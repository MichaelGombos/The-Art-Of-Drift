import React from 'react'
import { useNavigate } from 'react-router-dom';
import { setEnableGhost, setGameMapIndex, setMapData, setSpectateMode } from '../../game/game';
import { nameGhost } from '../../game/graphics';
import { startGame } from '../../game/main';
import Button from './button';

const RaceCommunityMapButton = ({mapInfo, replay = [[]]}) => {
  const navigate = useNavigate();

  const handlePlayCommunityMap = (mapInfo) => {

    console.log( mapInfo, mapInfo.mapObject)

    setEnableGhost(false);
    setGameMapIndex(mapInfo.mapID);
    setMapData(JSON.parse(mapInfo.mapObject),[[]])
    setSpectateMode(false);
    startGame()
    nameGhost("chungus");
    navigate("/countdown");
  }


  return(
    <Button style={"primary"} clickHandler={(() => handlePlayCommunityMap(mapInfo))}>play</Button>
  )
}

export default RaceCommunityMapButton