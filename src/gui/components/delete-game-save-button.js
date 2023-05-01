import React from "react";
import { useNavigate } from "react-router-dom";
import { commandMap, controllerToCommandMap, DEFAULT_commandMap, DEFAULT_controllerToCommandMap, DEFAULT_keyboardToCommandMap, keyboardToCommandMap } from "../helpers/controls";
import { logOut } from "../helpers/databaseFacade";
import Button from "./button";

const DeleteGameSaveButton = ({gameDataSafeteyNet,setGameDataSafeteyNet}) => {
  const navigate = useNavigate();

  return(
    <Button style={gameDataSafeteyNet > 0 ? "danger" : "disabled"} clickHandler={() => {
      setGameDataSafeteyNet(gameDataSafeteyNet-1)
      if(gameDataSafeteyNet == 1){
        //clear keybinds
        Object.assign(commandMap, JSON.parse(JSON.stringify(DEFAULT_commandMap)))
        Object.assign(keyboardToCommandMap, JSON.parse(JSON.stringify(DEFAULT_keyboardToCommandMap)))
        Object.assign(controllerToCommandMap, JSON.parse(JSON.stringify(DEFAULT_controllerToCommandMap)))
        localStorage.setItem("commandMap","")
        localStorage.setItem("keyboardToCommandMap","")
        localStorage.setItem("controllerToCommandMap","")
        //logout
        logOut("/")
      }
    }}>{gameDataSafeteyNet > 0 ? `Click x${gameDataSafeteyNet} to delete game data` : "game data deleted ):"}</Button>
  )
}

export default DeleteGameSaveButton;