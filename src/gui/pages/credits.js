import React, { useEffect, useRef } from 'react';

import { Navigate, useNavigate , Link} from 'react-router-dom';
import Button from '../components/button';

const {useState} = React

const Attribution = ({type,sourceName,sourceURL}) => {
  return (

    <p className="f-p3 ">{type}: <a className="text-secondary-500" target="_blank" href={sourceURL}>{sourceName}</a></p>
  )
}

const InfiniteScrollingText = () => {
  let textRef = useRef(null)
  let textRefMaxHeight = 0;
  let textRefCurrentOffset = 0;

  useEffect(() => {
    textRefMaxHeight = textRef.current.clientHeight
    console.log(textRef)
    setTimeout(    setInterval(() => {
      if(textRefCurrentOffset < textRefMaxHeight){

        textRef.current ? textRef.current.style.bottom = `${textRefCurrentOffset++}px` : ""
      }
    }, 70) , 5000 )

  },[])
  return (
    <div className="infinite-credit-wrap w-100">
      <div ref={textRef} className="infinite-credit-text w-100">
        <h2 className="f-p1">IMAGES/ANIMATIONS</h2>

        <Attribution 
        type="Background"
        sourceName="Post-apocalyptic background by PashaSmith"
        sourceURL="https://pashasmith.itch.io/post-apocalyptic-background"/>

        <Attribution 
        type="Vehicles"
        sourceName="Pixel Art Car Pack by realcreative"
        sourceURL="https://realcreative.itch.io/pixel-art-car-pack"/>
        
        <Attribution 
        type="GUI assets"
        sourceName="UI Buttons & Scrolling bars Pixel art by Gowl"
        sourceURL="https://gowldev.itch.io/ui-buttons-scrolling-bars-pixel-art"/>
        
        <Attribution 
        type="Controller/Keyboard keys"
        sourceName="Kenny Input Prompts Pixel 16x"
        sourceURL="https://kenney-assets.itch.io/input-prompts-pixel-16"/>
        
        <Attribution 
        type="Map select medal"
        sourceName="CC0 Award Icons by AntumDeluge"
        sourceURL="https://opengameart.org/content/cc0-award-icons"/>
        
        <Attribution 
        type="Map select star"
        sourceName="Pixel Art Animated Star by Narik"
        sourceURL="https://soulofkiran.itch.io/pixel-art-animated-star"/>
        
        <Attribution 
        type="Smoke animated particles"
        sourceName="VFX - SMOKE VOL 2 - Pixel Art Effects by kiddolink"
        sourceURL="https://kiddolink.itch.io/vfx-fx-smoke-vol-2-pixel-art"/>
        
        <Attribution 
        type="Electricity Animated Particles"
        sourceName="VFX - ELECTRICITY VOL 2 - Pixel Art Effects by 	kiddolink"
        sourceURL="https://kiddolink.itch.io/vfx-fx-electricity-vol-2-pixel-art"/>
        
        <Attribution 
        type="Profile Avatars"
        sourceName="Pixel-Art Portrait Pack by Loregret"
        sourceURL="https://loregret.itch.io/pixel-art-portrait-pack"/>
        
        <Attribution 
        type="Profile vehicles"
        sourceName="Pixel Art Car Pack by realcreative"
        sourceURL="https://realcreative.itch.io/pixel-art-car-pack"/>
        
        <Attribution 
        type="Async loader"
        sourceName="Smoke Effect 01"
        sourceURL="https://pimen.itch.io/smoke-vfx-1?download"/>

        <h2 className="f-p1">FONTS</h2>

        <Attribution 
        type="Font Header"
        sourceName="The Wall By Extant"
        sourceURL="https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3733"/>
        
        <Attribution 
        type="Font Paragraph"
        sourceName="NES Cryllic by xbost"
        sourceURL="https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=234"/>

        <h2 className="f-p1">SFX</h2>
        
        <Attribution 
        type="Checkbox"
        sourceName="Light Switch ON / OFF by FillSoko"
        sourceURL="https://freesound.org/people/FillSoko/sounds/257958/"/>
        
        <Attribution 
        type="Collision bounce"
        sourceName="bounce Energy Bounce 1 by magnuswaker"
        sourceURL="https://freesound.org/people/magnuswaker/sounds/523088/"/>
        
        <Attribution 
        type="Countdown"
        sourceName="Race Start Ready go by steel2008"
        sourceURL="https://freesound.org/people/steel2008/sounds/231277/"/>
        
        <Attribution 
        type="Collision wall"
        sourceName="Car Crash by squareal"
        sourceURL="https://freesound.org/people/squareal/sounds/237375/"/>
                
        <Attribution 
        type="Driving on dirt"
        sourceName="gravel road by seth-m"
        sourceURL="https://freesound.org/people/seth-m/sounds/341069/"/>
                
        <Attribution 
        type="Error Click"
        sourceName="Access Denied by suntemple"
        sourceURL="https://freesound.org/people/suntemple/sounds/249300/"/>
                
        <Attribution 
        type="Idle engine"
        sourceName="Engine sound by oldazatloukal"
        sourceURL="https://freesound.org/people/oldazatloukal/sounds/408896/"/>
        
        <Attribution 
        type="Max speed"
        sourceName="ELECTRIC_ZAP_001 by JoelAudio"
        sourceURL="https://freesound.org/people/JoelAudio/sounds/136542/"/>
      
        <Attribution 
        type="Mouse click"
        sourceName="Typewriter Ding by NHumphrey"
        sourceURL="https://freesound.org/people/NHumphrey/sounds/204466/"/>
        
        <Attribution 
        type="Mouse hover"
        sourceName="Mouse hover by Andreas.Mustola"
        sourceURL="https://freesound.org/people/Andreas.Mustola/sounds/255764/"/>
        
        <Attribution 
        type="Pause"
        sourceName="pauseStart by Wagna"
        sourceURL="https://freesound.org/people/Wagna/sounds/326418/"/>
        
        <Attribution 
        type="Race finish"
        sourceName="Cheer 2 by jayfrosting"
        sourceURL="https://freesound.org/people/jayfrosting/sounds/333404/"/>
        
        <Attribution 
        type="Tire skid loop"
        sourceName="Car tire squeal skid loop by audible-edge"
        sourceURL="https://opengameart.org/content/car-tire-squeal-skid-loop"/>

        <h2 className="f-p1">MUSIC</h2>
        
        <Attribution 
        type="race 1 music"
        sourceName="Race of the Wasp by OwlishMedia"
        sourceURL="https://opengameart.org/content/race-of-the-wasp"/>
        
        <Attribution 
        type="race 2 music"
        sourceName="2020-03-18 Synthwave by Doctor_Dreamchip"
        sourceURL="https://freesound.org/people/Doctor_Dreamchip/sounds/511278/"/>
        
        <Attribution 
        type="race 3 music"
        sourceName="Ciptuned Rock tune by bertsz"
        sourceURL="https://opengameart.org/content/ciptuned-rock-tune"/>
        
        <Attribution 
        type="race 4 music"
        sourceName="Black Diamond by Joth"
        sourceURL="https://opengameart.org/content/black-diamond"/>
        
        <Attribution 
        type="race 5 music"
        sourceName="Drum and bass by bertsz"
        sourceURL="https://opengameart.org/content/drum-and-bass"/>
        
        <Attribution 
        type="race 6 music"
        sourceName="Spring theory by jobromedia"
        sourceURL="https://opengameart.org/content/spring-theory"/>
        
        <Attribution 
        type="race 7 music"
        sourceName="Dark Ritual by Of Far Different Nature"
        sourceURL="https://opengameart.org/content/dark-ritual"/>
        
        <Attribution 
        type="race 8 music"
        sourceName="sad trap beat by 3M4"
        sourceURL="https://freesound.org/people/3M4/sounds/474438/"/>
        
        <Attribution 
        type="race 9 music"
        sourceName="Raining Bits by Gundatsch"
        sourceURL="https://opengameart.org/content/raining-bits"/>
        
        <Attribution 
        type="race 10 music"
        sourceName="2018-12-11-3 by Doctor_Dreamchip"
        sourceURL="https://freesound.org/people/Doctor_Dreamchip/sounds/458089/"/>
        
        <Attribution 
        type="race 11 music"
        sourceName="Dayum by loveless1017"
        sourceURL="https://freesound.org/people/loveless1017/sounds/455443/"/>
        
        <Attribution 
        type="race 12 music"
        sourceName="My Friends Will Cry. by Christovix"
        sourceURL="https://opengameart.org/content/my-friends-will-cry"/>
        
        <Attribution 
        type="race 13 music"
        sourceName="Winning the Race by section31"
        sourceURL="https://opengameart.org/content/winning-the-race"/>
        
        <Attribution 
        type="menu music"
        sourceName="La Montagne by Komiku"
        sourceURL="https://opengameart.org/content/la-montagne"/>
        
        <Attribution 
        type="pause music"
        sourceName="2020-06-20 Bass by Doctor_Dreamchip"
        sourceURL="https://freesound.org/people/Doctor_Dreamchip/sounds/524619/"/>
        
        <Attribution 
        type="credits music"
        sourceName="2020-03-17 Lofi Trip Hop by Doctor_Dreamchip"
        sourceURL="https://freesound.org/people/Doctor_Dreamchip/sounds/511279/?page=2#comment"/>
        
      </div>
    </div>
  )
}

const Credits = () => {
  const navigate = useNavigate();
  return (

    <div className="vertical-navigation-menu opaque-background">
      <div className="vertical-navigation-menu menu-container" >
        <div className="vertical-navigation-menu options-menu col-6 gap-lg align-center ">
          <h1 className="f-h1">Credits :D</h1>
          <div  className="settings-wrapper col-4 align-center gap-md vertical-navigation-menu">
            <Button clickHandler={( () => navigate("/main" ))}>Back to main menu</Button>
            <InfiniteScrollingText/>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Credits;