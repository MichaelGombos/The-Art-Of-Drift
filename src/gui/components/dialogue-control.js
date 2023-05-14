//component that shows user status if they are logged in

import React, {useState, useEffect} from "react";

import IconButton from "./icon-button";

import muteAudioUrl from "../../assets/icons/soundOff.png"
import unMuteAudioUrl from "../../assets/icons/soundOn.png"

import { useNavigate } from "react-router-dom";
import { muteMusicMultiplier, unmuteMusicMutlipler } from "../../sounds/music";
import { muteSFXMultiplier, unmuteSFXMultiplier } from "../../sounds/sfx";
import { getDialogueMuted, muteDialogueMultipler, setDialogueMuted, unmuteDialogueMultipler } from "../../sounds/dialogue";


const DialogueControl = ({}) => {
  let [audioDisabled, setAudioDisabled] = useState(getDialogueMuted())

  const handleStatefulAudioToggle = () => {
    
    if(audioDisabled) {
      unmuteDialogueMultipler();
      setDialogueMuted(false)
      setAudioDisabled(false)
    }
    else{
      muteDialogueMultipler();
      setAudioDisabled(true)
      setDialogueMuted(true)
    }
    console.log("yoo!", audioDisabled , getDialogueMuted())
  }

    return (
      <div className=" vertical-navigation-menu dialogue-control">
        <IconButton
        clickHandler={handleStatefulAudioToggle}
        iconUrl = {audioDisabled ? muteAudioUrl : unMuteAudioUrl}/>
      </div>
    )
  

}

export default DialogueControl;