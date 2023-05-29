
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { unPauseGame } from '../../game/main.js';
import { getTutorialDialogueAudio, playSoundChunk, stopCurrentDialogueAudio } from '../../sounds/dialogue.js';

import Button from '../components/button.js';
import DialogueControl from '../components/dialogue-control.js';
import { commandMap } from '../helpers/controls.js';
import { controllerToImageMap, keyboardToImageMap } from './settings-keybinds.js';


const keyImageFromKeyId = (keycode, isKeyboard)  => {
  let source = isKeyboard ? keyboardToImageMap[keycode] : controllerToImageMap[keycode]
  //todo check if source is false on keyboard & put text instead..
  if(source){
    return (
      <img class="dialogue-image"src={source} />
    )
  }
  else{
    return ` _${keycode}_ `
  }
}
const dialogueBodyList = {

  accelerate : [
    <p className="f-p2 dialogue-text"> 
    Accelerating will slowly increase your cars speed. Once you reach certain speeds, your car will change gears, begin to accelerate slower, and lose grip on the road faster</p>
    ,
    <p className="f-p2 dialogue-text"> 
    You can accelerate by pressing {keyImageFromKeyId(commandMap.accelerate.keyboard.primary,true)} 
     or {keyImageFromKeyId(commandMap.accelerate.keyboard.secondary,true)} on the keyboard, and
      {keyImageFromKeyId(commandMap.accelerate.controller.primary,false)} 
     or {keyImageFromKeyId(commandMap.accelerate.controller.secondary,false)} on the controller</p>
  ],
  brake : [
    <p className="f-p2 dialogue-text"> 
    Engaging the brakes will decrease your acceleration. They will work the same if you are going in reverse, as well as if you are driving forwards. If you are driving at high speeds, engaging the breaks will cause your tires to lose grip with the road.</p>
    ,
    <p className="f-p2 dialogue-text"> 
    You can engage the brakes by pressing {keyImageFromKeyId(commandMap.brake.keyboard.primary,true)}
     or {keyImageFromKeyId(commandMap.brake.keyboard.secondary,true)} on the keyboard, and
      {keyImageFromKeyId(commandMap.brake.controller.primary,false)} 
     or {keyImageFromKeyId(commandMap.brake.controller.secondary,false)} on the controller</p>
  ],
  reverse : [
    <p className="f-p2 dialogue-text"> 
    Reversing allows your car to drive in reverse. Reversing will attempt to move away from where you are currently facing, so if you are driving forward, it will engage the brakes before reversing. But If you start drifting and face away from your moving direction, the reverse key will start accelerating backwards instead of engaging the breaks.</p>
    ,
    <p className="f-p2 dialogue-text"> 
    You can reverse by pressing {keyImageFromKeyId(commandMap.reverse.keyboard.primary,true)} 
     or {keyImageFromKeyId(commandMap.reverse.keyboard.secondary,true)} on the keyboard, and
      {keyImageFromKeyId(commandMap.reverse.controller.primary,false)} 
     or {keyImageFromKeyId(commandMap.reverse.controller.secondary,false)} on the controller</p>
  ],
  turn : [
    <p className="f-p2 dialogue-text"> 
    Turning allows you to change the facing angle of your car, and your moving angle will try to catch up to the best of its ability based on your tires traction. Your tire will lose traction the longer you are turning. While your traction is low, it takes your cars moving angle more time to catch up to the facing angle, resulting in a drift.</p>
    ,
    <p className="f-p2 dialogue-text"> 
    You can turn left by pressing {keyImageFromKeyId(commandMap.turnleft.keyboard.primary,true)} 
     or {keyImageFromKeyId(commandMap.turnleft.keyboard.secondary,true)} on the keyboard, and
      {keyImageFromKeyId(commandMap.turnleft.controller.primary,false)} 
     or {keyImageFromKeyId(commandMap.turnleft.controller.secondary,false)} on the controller</p>
    ,
    <p className="f-p2 dialogue-text"> 
    You can turn right by pressing {keyImageFromKeyId(commandMap.reverse.keyboard.primary,true)} 
     or {keyImageFromKeyId(commandMap.turnright.keyboard.secondary,true)} on the keyboard, and
      {keyImageFromKeyId(commandMap.turnright.controller.primary,false)} 
     or {keyImageFromKeyId(commandMap.turnright.controller.secondary,false)} on the controller</p>
  ],
  tiles : [
    <p className="f-p2 dialogue-text"> 
    Each map is made up of several tile types that affect how you move around the track.    </p>,
    <p className="f-p2 dialogue-text"> 
    The road is a light tan tile, it does not negatively affect your car.</p>,
    <p className="f-p2 dialogue-text"> 
    Dirt is brown, and will slow down your car, it will also reduce your traction.</p>,
    <p className="f-p2 dialogue-text"> 
    The wall is a darker shade of brown, if you hit the wall you will lose alot of speed, and bounce off</p>,
    <p className="f-p2 dialogue-text"> 
    Bounce tiles are dark blue, if you hit a bounce tile you will shoot off the same way light bounces off a mirror.</p>,
    <p className="f-p2 dialogue-text"> 
    The finish tile is bright green, if you hit a finish tile your lap will increase, you can see the total and current laps at the top middle of the screen, once you reach 3 you have completed the race.</p>
  ]
  ,
  haveFun : [

    <p className="f-p2 dialogue-text"> 
    This is the end of the tutorial. Give the campaign a shot!</p>
  ]
 

}
const tutorialDialogue = [
  {type: "Tutorial" , dialogue: "accelerate", header: "Acceleration" , body: dialogueBodyList.accelerate},
  {type: "Tutorial" ,  dialogue: "brake", header: "The Brakes" , body: dialogueBodyList.brake},
  {type: "Tutorial" ,  dialogue: "reverse", header: "Reversing" , body: dialogueBodyList.reverse},
  {type: "Tutorial" ,  dialogue: "turn", header: "Turning" , body: dialogueBodyList.turn},
  {type: "Tutorial" ,  dialogue: "tiles", header: "Tiles" , body: dialogueBodyList.tiles},
  {type: "Tutorial" , dialogue: "end" , header: "Have Fun ! :)" , body: dialogueBodyList.haveFun},
]

//tutorial text shortcode to image (for controls based on keybinds)

const Dialogue = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dialogueIndex,setDialogueIndex] = useState(0)
  const [maxDialogueIndex,setMaxDialogueIndex] = useState(tutorialDialogue[params.id].length)
  let soundChunk = tutorialDialogue[params.id][0]

  useEffect( () => {


    if(location.pathname.includes("dialogue")){

      soundChunk = getTutorialDialogueAudio()[tutorialDialogue[params.id].dialogue][dialogueIndex]
      console.log("this is the juicy sound chunk", soundChunk, tutorialDialogue[params.id].dialogue, [dialogueIndex])
      playSoundChunk(soundChunk)
    }
  }, [dialogueIndex])
  return (

    <div className="vertical-navigation-menu opaque-background">
    <div className='vertical-navigation-menu menu-container'>
      <div className="vertical-navigation-menu dialogue-menu-container col-3 align-center gap-lg">
        <h1 className="f-h1">{tutorialDialogue[params.id].type}</h1>
        <div className='vertical-navigation-menu col-6 align-center dialogue-menu gap-md' >

          <h1 className="f-h1 text-secondary-500">{tutorialDialogue[params.id].header} ({dialogueIndex+1} / {tutorialDialogue[params.id].body.length})</h1>
          <DialogueControl/>
          {tutorialDialogue[params.id].body[dialogueIndex]}
          <Button clickHandler={() => {
            if(dialogueIndex < tutorialDialogue[params.id].body.length - 1){
              setDialogueIndex(dialogueIndex+1) 
              stopCurrentDialogueAudio();
            }
            else{
              navigate("/hidden")
              unPauseGame();
              stopCurrentDialogueAudio();
            }
          }}>{
            dialogueIndex < tutorialDialogue[params.id].body.length - 1 ? "Next": "Close"}</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dialogue;