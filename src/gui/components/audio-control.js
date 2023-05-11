//component that shows user status if they are logged in

import React, {useState, useEffect} from "react";

import IconButton from "./icon-button";

import muteAudioUrl from "../../assets/icons/soundOff.png"
import unMuteAudioUrl from "../../assets/icons/soundOn.png"

import { useNavigate } from "react-router-dom";
import { muteMusicMultiplier, unmuteMusicMutlipler } from "../../sounds/music";
import { muteSFXMultiplier, unmuteSFXMultiplier } from "../../sounds/sfx";


const AudioControl = ({isShown}) => {
  let [audioDisabled, setAudioDisabled] = useState(false)

  const handleStatefulAudioToggle = () => {
    
    if(audioDisabled) {
      unmuteMusicMutlipler();
      unmuteSFXMultiplier();
      setAudioDisabled(false)
    }
    else{
      muteMusicMultiplier();
      muteSFXMultiplier();
      setAudioDisabled(true)
    }
    console.log("yoo!", audioDisabled)
  }

  if(isShown){
    return (
      <div className=" vertical-navigation-menu audio-control">
        <IconButton
        clickHandler={handleStatefulAudioToggle}
        iconUrl = {audioDisabled ? muteAudioUrl : unMuteAudioUrl}/>
      </div>
    )
  }
  else{
    return;
  }

}

export default AudioControl;