import React from 'react'
import { useNavigate } from 'react-router-dom';
import { setEnableGhost, setGameMapIndex, setMapData, setSpectateMode } from '../../game/game';
import { drawPlayerVehicle, nameGhost } from '../../game/graphics';
import { startGame } from '../../game/main';
import { getCurrentAuthProfile } from '../helpers/databaseFacade';
import Button from './button';

const RaceCommunityMapButton = ({mapInfo}) => {
  const navigate = useNavigate();

  const handlePlayCommunityMap = (mapInfo) => {

    getCurrentAuthProfile().then(profileData => {

      setEnableGhost(false);
      setGameMapIndex(mapInfo.mapID);
      setMapData(JSON.parse(mapInfo.mapObject),{
        inputs:"[]",
        stats:"[]"
      })
      drawPlayerVehicle(profileData.vehicleID)
      setSpectateMode(false);
      startGame()
      navigate("/countdown");
    })

  }


  return(
    <Button style={"primary"} clickHandler={(() => handlePlayCommunityMap(mapInfo))}>play</Button>
  )
}

export default RaceCommunityMapButton