import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

const DeleteGameSaveButton = ({gameDataSafeteyNet,setGameDataSafeteyNet}) => {
  const navigate = useNavigate();

  return(
    <Button style={gameDataSafeteyNet > 0 ? "danger" : "disabled"} clickHandler={() => {
      setGameDataSafeteyNet(gameDataSafeteyNet-1)
      if(gameDataSafeteyNet == 1){
        localStorage.clear();
        navigate("/");
      }
    }}>{gameDataSafeteyNet > 0 ? `Click ${gameDataSafeteyNet} times to clear data` : "game Data deleted ):"}</Button>
  )
}

export default DeleteGameSaveButton;