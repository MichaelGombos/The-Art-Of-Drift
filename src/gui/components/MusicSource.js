import React, { useState } from 'react';
//shown is a css class that has an animation that makes a hidden component hover a little bit for a second, and then drop down under the fold.
import musicSourceImage from "../../assets/icons/music-source.png"

const MusicSource = () => {

  const [musicSourceShownAnimationOn, setMusicSourceShownAnimationOn] = useState(false)
  const [musicSourceInfo, setMusicSourceInfo] = useState({
    author: "loading",
    title : "loading",
    source : ""
  })
  Window.showMusicSource = (songInformation) => {//there is definitely a better way to share functions across game/compoennts.
    setMusicSourceShownAnimationOn(true)
    setTimeout(() => {
      setMusicSourceShownAnimationOn(false)
    } , 4000)
    setMusicSourceInfo(songInformation)
  }
  if(musicSourceInfo.source == true){
    return(
      <a target="_blank" href={musicSourceInfo.source}>
        <div className={`${musicSourceShownAnimationOn ? "music-source music-source--shown": "music-source"}`}>
          <img src={musicSourceImage}/>
          <p>{musicSourceInfo.title} by <span className="text-secondary-500">{musicSourceInfo.author}</span></p>
        </div>
      </a>
    )
  }

}

export default MusicSource;