/*
Music sources

Pause
    https://freesound.org/people/Doctor_Dreamchip/sounds/524619/ 
Menu
    https://opengameart.org/content/la-montagne 
Credits
    https://freesound.org/people/Doctor_Dreamchip/sounds/511279/?page=2#comment 
    https://opengameart.org/content/retroracing-menu-synthwave 
Maps 
    1
    https://opengameart.org/content/race-of-the-wasp 
    2 
    https://freesound.org/people/Doctor_Dreamchip/sounds/511278/ 
    3 
    https://opengameart.org/content/ciptuned-rock-tune
    4 
    https://opengameart.org/content/black-diamond 
    5 
    https://opengameart.org/content/drum-and-bass 
    6
    https://opengameart.org/content/spring-theory 
    7
    https://opengameart.org/content/dark-ritual
    8 
    https://freesound.org/people/3M4/sounds/474438/ 
    9 
    https://opengameart.org/content/raining-bits 
    10
    https://freesound.org/people/Doctor_Dreamchip/sounds/458089/ 
    11 
    https://freesound.org/people/loveless1017/sounds/455443/ 
    12
    https://opengameart.org/content/my-friends-will-cry 
    13
    https://opengameart.org/content/winning-the-race
*/

import {Howl, Howler} from 'howler';

import menuMusic from "./music/menu-la-montagne.mp3"
import creditsMusic from "./music/credits-2020-03-17.mp3"
import pauseMusic from "./music/pause-2020-06-20-bass.mp3"
import race1 from "./music/01-Race-of-the-Wasp.mp3"
import race2 from "./music/02-2020-03-18.mp3"
import race3 from "./music/03-chiptuned.mp3"
import race4 from "./music/04-Black-Diamond.mp3"
import race5 from "./music/05-drum-and-bass-ld47.mp3"
import race6 from "./music/06-Spring-theory.mp3"
import race7 from "./music/07-Dark-Ritual.mp3"
import race8 from "./music/08-sad-trap-beat.mp3"
import race9 from "./music/09-Raining-Bits.mp3"
import race10 from "./music/10-2018-12-11-3.mp3"
import race11 from "./music/11-dayum.mp3"
import race12 from "./music/12-My-Friends-Will-Cry.mp3"
import race13 from "./music/13-Winning-the-Race.mp3"
import { getGameMapIndex } from '../game/game';


let musicMultiplier = .2;
let unmutedMusicMultiplier = 0;
let isMusicMuted = false;

export const muteMusicMultiplier = () => {
  unmutedMusicMultiplier = musicMultiplier;
  musicMultiplier = 0;
  trackIDtoLoopMap[currentRunningTrack].volume(0)
}

export const unmuteMusicMutlipler = () => {
  musicMultiplier = unmutedMusicMultiplier;
  trackIDtoLoopMap[currentRunningTrack].volume(musicMultiplier)
}

window.muteMusic = muteMusicMultiplier;
window.unmuteMusic = unmuteMusicMutlipler;

export const setMusicMultiplier = (newMultiplier) => {
  musicMultiplier = newMultiplier / 100;
  trackIDtoLoopMap[currentRunningTrack].volume(.2 * musicMultiplier)
}

export const getMusicMultipler = () => {return musicMultiplier}

Window.setMusic = setMusicMultiplier;
export const getMusicMultiplier = () => {
  return musicMultiplier; 
}

const menuMusicLoop = new Howl ({
  src: [menuMusic],
  loop:true,
  volume:0,
})

menuMusicLoop.play();

const creditsMusicLoop = new Howl ({
  src: [creditsMusic],
  loop:true,
  volume:0,
})

creditsMusicLoop.play();

const pauseMusicLoop = new Howl ({
  src: [pauseMusic],
  loop:true,
  volume:0,
})

pauseMusicLoop.play();

const race1Loop = new Howl ({
  src: [race1],
  loop:true,
  volume:0,
})

race1Loop.play();

const race2Loop = new Howl ({
  src: [race2],
  loop:true,
  volume:0,
})

race2Loop.play();

const race3Loop = new Howl ({
  src: [race3],
  loop:true,
  volume:0,
})

race3Loop.play();

const race4Loop = new Howl ({
  src: [race4],
  loop:true,
  volume:0,
})

race4Loop.play();

const race5Loop = new Howl ({
  src: [race5],
  loop:true,
  volume:0,
})

race5Loop.play();

const race6Loop = new Howl ({
  src: [race6],
  loop:true,
  volume:0,
})

race6Loop.play();

const race7Loop = new Howl ({
  src: [race7],
  loop:true,
  volume:0,
})

race7Loop.play();

const race8Loop = new Howl ({
  src: [race8],
  loop:true,
  volume:0,
})

race8Loop.play();

const race9Loop = new Howl ({
  src: [race9],
  loop:true,
  volume:0,
})

race9Loop.play();

const race10Loop = new Howl ({
  src: [race10],
  loop:true,
  volume:0,
})

race10Loop.play();

const race11Loop = new Howl ({
  src: [race11],
  loop:true,
  volume:0,
})

race11Loop.play();

const race12Loop = new Howl ({
  src: [race12],
  loop:true,
  volume:0,
})

race12Loop.play();

const race13Loop = new Howl ({
  src: [race13],
  loop:true,
  volume:0,
})

race13Loop.play();

const trackIDtoLoopMap = {
  "pause" : pauseMusicLoop,
  "menu" : menuMusicLoop,
  "credits" : creditsMusicLoop,
  "1" : race1Loop,
  "2" : race2Loop,
  "3" : race3Loop,
  "4" : race4Loop,
  "5" : race5Loop,
  "6" : race6Loop,
  "7" : race7Loop,
  "8" : race8Loop,
  "9" : race9Loop,
  "10" : race10Loop,
  "11" : race11Loop,
  "12" : race12Loop,
  "13" : race13Loop,
}

const trackIDtoSongInformationMap = {
  "pause" : {
    author : "Doctor_Dreamchip",
    title : "2020-06-20 Bass",
    source : "https://freesound.org/people/Doctor_Dreamchip/sounds/524619/"
  },
  "menu" : {
    author : "Komiku",
    title : "La Montagne",
    source : "https://opengameart.org/content/la-montagne"
  },
  "credits" : {
    author : "Doctor_Dreamchip",
    title : "2020-03-17 Lofi Trip Hop",
    source : "https://freesound.org/people/Doctor_Dreamchip/sounds/511279/"
  },
  "1" : {
    author : "OwlishMedia",
    title : "Race of the Wasp",
    source : "https://opengameart.org/content/race-of-the-wasp"
  },
  "2" : {
    author : "Doctor_Dreamchip",
    title : "2020-03-18 Synthwave",
    source : "https://freesound.org/people/Doctor_Dreamchip/sounds/511278/"
  },
  "3" : {
    author : "bertsz",
    title : "Ciptuned Rock tune",
    source : "https://opengameart.org/content/ciptuned-rock-tune"
  },
  "4" : {
    author : "Joth",
    title : "Black Diamond",
    source : "https://opengameart.org/content/black-diamond"
  },
  "5" :{
    author : "bertsz",
    title : "Drum and bass",
    source : "https://opengameart.org/content/drum-and-bass"
  },
  "6" : {
    author : "jobromedia",
    title : "Spring theory",
    source : "https://opengameart.org/content/spring-theory"
  },
  "7" : {
    author : "Of Far Different Nature",
    title : "Dark Ritual",
    source : "https://opengameart.org/content/dark-ritual"
  },
  "8" :{
    author : "3M4",
    title : "sad trap beat",
    source : "https://freesound.org/people/3M4/sounds/474438/"
  },
  "9" : {
    author : "Gundatsch",
    title : "Raining Bits",
    source : "https://opengameart.org/content/raining-bits"
  },
  "10" : {
    author : "Doctor_Dreamchip",
    title : "2018-12-11-3",
    source : "https://freesound.org/people/Doctor_Dreamchip/sounds/458089/"
  },
  "11" : {
    author : "loveless1017",
    title : "Dayum",
    source : "https://freesound.org/people/loveless1017/sounds/455443/"
  },
  "12" : {
    author : "Christovix",
    title : "My Friends Will Cry",
    source : "https://opengameart.org/content/my-friends-will-cry"
  },
  "13" : {
    author : "section31",
    title : "Winning the Race",
    source : "https://opengameart.org/content/winning-the-race"
  },
}

let currentRunningTrack;
export const transitionMusic = (trackIDToEnable, restart) => {
  
  currentRunningTrack ? trackIDtoLoopMap[currentRunningTrack].fade(.2 * musicMultiplier,0, 2000) : "" //if not previous track, do nothing

  if(Object.keys(trackIDtoLoopMap).includes(trackIDToEnable)){

    if(restart){
      trackIDtoLoopMap[trackIDToEnable].seek(0)
    }
    trackIDtoLoopMap[trackIDToEnable].fade(0,.2 * musicMultiplier , 2000)
    currentRunningTrack = trackIDToEnable;

      Window.showMusicSource(trackIDtoSongInformationMap[currentRunningTrack])
    
  }
}

export const transitionMusicBasedOffLocation = () => {
  //only transition to desired track if its not already playing.

  if ( //pause 
    currentRunningTrack != "pause" && (
    location.pathname.includes("/settings") ||
    location.pathname.includes("/pause") ||
    location.pathname.includes("/finish") ||
    location.pathname.includes("/profile")) 
  ){
    transitionMusic("pause")
  }
  else if ( //race
  currentRunningTrack != "1" && (
  location.pathname.includes("/hidden"))
  ){ //get the current track id then play a race. For now we are just using a filler...
    transitionMusic(String(Number(getGameMapIndex())+1), true)
  }
  else if ( //Silence
  currentRunningTrack != false && (
  location.pathname.includes("/countdown") ||
  location.pathname == "/" ||
  location.pathname.includes("/invited") ) //but only the first bit.. I should change the URL to invited-title to make this easier
  ){
   
    transitionMusic(false)
  }
  else if ( //Credits
  currentRunningTrack != "credits" && (
  location.pathname.includes("/credits") ) 
  ){
   
    transitionMusic("credits", true)
  }
  else if (currentRunningTrack != "menu") { //menu music
    transitionMusic("menu")
  }
}


Window.musicTransition = transitionMusic

