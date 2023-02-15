import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteGameSaveButton = ({gameDataSafeteyNet,setGameDataSafeteyNet}) => {
  const navigate = useNavigate();

  return(
    <button className={gameDataSafeteyNet > 0 ? "bg-danger-500 text-color-shade-0" : "disabled"} onClick={() => {
      setGameDataSafeteyNet(gameDataSafeteyNet-1)
      if(gameDataSafeteyNet == 1){
        localStorage.clear();
        navigate("/");
      }
    }}>{gameDataSafeteyNet > 0 ? `Click ${gameDataSafeteyNet} times to delete game data` : "game Data deleted ):"}</button>
  )
}

export default DeleteGameSaveButton;