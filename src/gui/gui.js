//game functions
import {pauseGame,unPauseGame,resetGame, turnOffGame} from "../game/main.js"

//pages
import Finish from "./pages/finish.js"
import Hidden from "./pages/hidden.js"
import Title from "./pages/title.js"
import Pause from "./pages/pause.js"
import Main from "./pages/main.js"
import Settings from "./pages/settings.js"
import Leaderboards from "./pages/leaderboards.js"
import Invited from "./pages/invited.js"
import Dialogue from "./pages/dialogue.js"

import React, {Component, useEffect, useState} from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation} from "react-router-dom";
import MapImport from "./pages/map-import.js"
import NotSupported from "./pages/not-supported.js"
import Countdown from "./pages/countdown.js"
import ScrollingBackground from "./components/scrolling-background.js"
import Welcome from "./pages/welcome.js"
import Signup from "./pages/signup.js"
import Signin from "./pages/signin.js"

import Campaign from "./pages/campaign.js"
import CampaignLevel from "./pages/campaign-level.js"
import CampaignLeaderboards from "./pages/campaign-leaderboards.js"

import CampaignLeaderboard from "./pages/campaign-leaderboard.js"
import CommunityMaps from "./pages/community-maps.js"
import CommunityMapsUpload from "./pages/community-maps-upload.js"
import CommunityMapsPreview from "./pages/community-maps-preview.js"

import AuthStatus from "./components/auth-status.js"
import Profile from "./pages/profile.js"
import ProfileGuest from "./pages/profile-guest.js"
import ProfileEdit from "./pages/profile-edit.js"
import ResultBanner from "./components/result-banner.js"

import MapMaker from "../mapmaker/mapmaker.js"

import { traverseElement, findValidActionsIntree, arraysEqual , findObjectWithLocation ,  findClosestSibling,findClosestRelative} from "./helpers/accessible-navigation.js"

// http://www.theartofdrift.com/invited?racer=NAME_HASH_0_309&map=0
// http://localhost:8081/invited?racer=NAME_HASH_0_309&map=0

const home = "/"; //for tests

let currentNavigationInterval = 0;
let lastNavigationTime = performance.now();
const validNavigationInterval = 150;
let previous = "main"
'use strict';
const commands = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  select: "select"
}
const navKeys = {
  "ArrowUp": commands.up,
  "ArrowLeft": commands.left,
  "ArrowRight": commands.right,
  "ArrowDown": commands.down,
  "w": commands.up,
  "a": commands.left,
  "s": commands.down,
  "d": commands.right,
  "Enter": commands.select
}
import { auth } from "./helpers/firebase.js"
import { useAuthState, useIdToken } from "react-firebase-hooks/auth"
import ProfileUpgrade from "./pages/profile-upgrade.js"
import InvitedInfo from "./pages/invited-info.js"

import "./tests/databaseTests.js"
import AsyncLoader from "./components/async-loader.js"
import { maps } from "../game/map-data.js"
import CommunityMapsLeaderboard from "./pages/community-maps-leaderboard.js"
import CommunityMapsAll from "./pages/community-maps-all.js"
import CommunityMapsLeaderboards from "./pages/community-leaderboards.js"
import WelcomeAuthSelect from "./pages/welcome-auth-select.js"
import AccessibleNavigationTest from "./pages/accessible_navigation_test.js"
import getGamePadHeldDirections from "../game/gamepad.js"
import { checkForCommonItem } from "./helpers/util.js"
import SettingsKeybinds from "./pages/settings-keybinds.js"
import { generateMouseClickSound, generateMouseHoverSound, generatePauseSound } from "../sounds/sfx.js"
import { transitionMusicBasedOffLocation } from "../sounds/music.js"
import Credits from "./pages/credits.js"
import { getFullKeyboardHeldKeys } from "../game/game.js"
import AudioControl from "./components/audio-control.js"

const Menu = () => {
  let isDeviceValid = true;
  
  const [user, loading, error] = useIdToken(auth);
  const [previousType,setPreviousType] = useState('title')
  const [showFPS,setShowFPS] = useState(true);
  const [showExtraStats,setShowExtraStats] = useState(true);
  const [showDashboard,setShowDashboard] = useState(true);
  const [showAuthStatus,setShowAuthStatus] = useState(false);
  const [showAudioControl, setShowAudioControl] = useState(false);
  const [isGuestSession,setIsGuestSession] = useState(false);
  const [previewMap,setPreviewMap] = useState(
    `{ "spawnAngle" : ${maps[7].spawnAngle} , "lapCount" : ${maps[7].lapCount} , "data" : [${ maps[7].data.map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `
  );

  const [locationPathHistory,setLocationPathHistory] = useState([]); //allows back to work on pages.

  window.giveAuthStatus = () => console.log(showAuthStatus)
  const location = useLocation();
  const navigate = useNavigate();
  window.changeGUIScreen = navigate;

  const handleResize = () => {
    if(window.innerWidth < 788){
      isDeviceValid = false;
      navigate("/not-supported")
    }
    else{
      if(!isDeviceValid){
        isDeviceValid = true;
        navigate(home)
      }
    }
  }


  useEffect(() => {
    if(user){
      setIsGuestSession(user.isAnonymous);
    }
  }, [user])

  useEffect(() => {
    window.addEventListener('resize',handleResize)
    if(!location.pathname.includes("/invited")){
      navigate(home)
    }

    handleResize();
  }, [])

  useEffect(() => {
    transitionMusicBasedOffLocation()
    // http://localhost:8080/invited?racer=J&map=0
    if(
    !location.pathname.includes("/pause") &&
    !location.pathname.includes("/hidden") &&
    !location.pathname.includes("/dialogue") &&
    !location.pathname.includes("/countdown") &&
    !location.pathname.includes("/finish") &&
    !location.pathname.includes("/settings")){
      window.shutOffGame();
    }

    if(
      location.pathname == ("/") ||
      location.pathname == ("/hidden") ||
      location.pathname == ("/countdown") ||
      location.pathname ==("/welcome") ||
      location.pathname == ("/signup") || 
      location.pathname == ("/title") || 
      location.pathname.includes("/dialogue") ||
      location.pathname.includes("/profile")){
        setShowAuthStatus(false)
      }else{
        setShowAuthStatus(true)
      }

    if(location.pathname == "/"){
      setShowAudioControl(false)
    }else{
      setShowAudioControl(true)
    }
      window.stopWatchingInputs ? window.stopWatchingInputs() : "";
      window.refreshDocumentTree()
      setLocationPathHistory(locationPathHistory.concat(location.pathname))
  }, [location])

  return (
    <>
    <ScrollingBackground/>
    <AuthStatus 
    isGuestSession={isGuestSession}
    isShown = {showAuthStatus}
    user = {user}
    loading = {loading}
    error = {error}/>
    <AudioControl
    isShown = {showAudioControl}/>
    <ResultBanner/>
    <AsyncLoader loading={loading} user={user} />
    <Routes>
      <Route  path="/" element={<Title/>}/>
      <Route  path="/welcome" element={<Welcome/>}/>
      <Route  path="/signup" element={<WelcomeAuthSelect type={"signup"}/>}/>
      <Route  path="/signin" element={<WelcomeAuthSelect type={"signin"}/>}/>
      <Route  path="/signup/gmail" element={<Signup type={"gmail"}/>}/>
      <Route  path="/signup/email" element={<Signup type={"email"}/>}/>
      <Route  path="/signin/email" element={<Signin/>}/>
      <Route  path="/main" element={<Main setPrevious={setPreviousType}/>}/>
      <Route  path="/profile" element={<Profile locationPathHistory = {locationPathHistory}  user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/guest" element={<ProfileGuest user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/edit" element={<ProfileEdit isGuest={false} user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/guest/edit" element={<ProfileEdit isGuest={true} user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/guest/upgrade/gmail" element={<ProfileUpgrade type="gmail" user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/guest/upgrade/email" element={<ProfileUpgrade type="email" user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/campaign" element={<Campaign/>} />
      <Route  path="/campaign/:mapIndex" element={<CampaignLevel/>} />
      <Route  path="/community-maps" element={<CommunityMaps/>} />    
      <Route  path="/community-maps/create" element={<MapMaker 
      mode='create'
      setPreviewMap={setPreviewMap}/>} />
      <Route  path="/community-maps/edit/:mapID" element={<MapMaker
       mode='edit'
        setPreviewMap={setPreviewMap}/>} />
      <Route  path="/community-maps/clone/:mapID" element={<MapMaker 
      mode='clone'
      setPreviewMap={setPreviewMap}/>} />
      <Route  path="/community-maps/upload" element={<CommunityMapsUpload previewMap={previewMap} setPreviewMap={setPreviewMap}/>} />
      <Route  path="/community-maps/all" element={<CommunityMapsAll showAll={true} />} />
      <Route  path="/community-maps/my-maps" element={<CommunityMapsAll showAll={false} />} />
      <Route  path="/community-maps/:mapId" element={<CommunityMapsPreview/>} />
      <Route  path="/community-maps/leaderboard/:mapId" element={<CommunityMapsLeaderboard/>} />
      <Route  path="/map-import" element={<MapImport/>} />
      <Route  path="/leaderboards" element={<Leaderboards/>} />

      <Route  path="/leaderboards/community" element={<CommunityMapsLeaderboards/>} />
      <Route  path="/leaderboards/campaign" element={<CampaignLeaderboards/>} />
      <Route  path="/leaderboards/campaign/:mapIndex" element={<CampaignLeaderboard/>} />
      <Route  path="/settings" element={<Settings 
      isGuestSession={isGuestSession}
      previous={previousType} 
      showFPS={showFPS}
      setShowFPS={setShowFPS} 
      showExtraStats={showExtraStats}
      setShowExtraStats={setShowExtraStats}
      showDashboard={showDashboard}
      setShowDashboard={setShowDashboard}
       />} />
      <Route  path="/settings/keybinds" element={<SettingsKeybinds/>}/>
      <Route  path="/countdown" element={<Countdown/>}/>
      <Route  path="/hidden" element={<Hidden  
      showFPS={showFPS}
      showExtraStats={showExtraStats}
      showDashboard={showDashboard}
       />}/>
      <Route  path="/pause" element={<Pause setPrevious={setPreviousType} />}/>
      <Route  path="/finish" element={<Finish/>}/>
      <Route  path="/invited" element={<Invited user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/invited/info" element={<InvitedInfo/>}/>
      <Route  path="/not-supported" element={<NotSupported/>}/>
      <Route  path="/test" element={<AccessibleNavigationTest/>}/>
      <Route  path="/dialogue/:id" element={<Dialogue/>}/>
      <Route  path="/credits" element={<Credits/>}/>
      <Route  element={<Navigate to="/"/>}/>
    </Routes>
    
    </>
  )
}

class GUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.navIndex = 0;
    this.navLocation = "wow"
    this.baseNode = ""
    this.validActionsList
    this.validActionsStringList
    this.documentTree
    this.currentNode;
    this.gamePadInputs = [];
    this.inputTick = 0;
    this.navigationInputTypeMap = {
      navigation: ["nav-positive-vertical", "nav-negative-vertical",'nav-positive-horizantal',"nav-negative-horizantal" ],
      action: ["nav-select","nav-back","nav-pause","nav-reset" ]
    }
    // window.navigateMenu = this.navigateMenu;
    // window.focusFirstButton = this.focusFirstButton;
  }
// [0, 1, 0, 1, 2, 0, 0] (7) [0, 1, 0, 1, 2, 1, 2]
  componentDidMount =() => {
    
    this.refreshDocumentTree();
    window.refreshDocumentTree = this.refreshDocumentTree;
    window.findActionWithLocation = (location) => () => {
      
      console.log("shitfart", findObjectWithLocation([],location,this.documentTree))
    }
    window.shitFart = () => {console.log("shitfart")}
    document.addEventListener("keydown", this.onKeyPressed )

    setInterval(() =>{
      this.gamePadInputs = getGamePadHeldDirections();
      
      //needs a limit for the amount of the same input we will allow at once.
      if(checkForCommonItem(this.gamePadInputs, this.navigationInputTypeMap.navigation)  && this.inputTick > 15){
        if(this.gamePadInputs.includes("nav-positive-vertical")){
          this.responsiveNavigation(-1, true)
        }
        if(this.gamePadInputs.includes("nav-negative-vertical")){
          this.responsiveNavigation(1, true)
        }
        if(this.gamePadInputs.includes("nav-positive-horizantal")){
          this.responsiveNavigation(-1, false)
        }
        if(this.gamePadInputs.includes("nav-negative-horizantal")){
          this.responsiveNavigation(1, false)
        }
        this.inputTick = 0;
      }
      if(checkForCommonItem(this.gamePadInputs, this.navigationInputTypeMap.action) && this.inputTick > 40){
        if(this.gamePadInputs.includes("nav-select")){
          this.responsiveAction("Enter") 
        }
        if(this.gamePadInputs.includes("nav-back") || this.gamePadInputs.includes("nav-pause")){
          if(location.pathname == "/hidden"){
            window.changeGUIScreen("/pause");
            generatePauseSound();
            pauseGame();
          }
          else if(location.pathname == "/pause"){
            window.changeGUIScreen("/hidden");
            unPauseGame();
          }
          else if(this.gamePadInputs.includes("nav-back")){
            this.responsiveAction("Escape") 
          }
        }
        if(this.gamePadInputs.includes("nav-reset")){
          if(location.pathname == "/hidden"){
            setTimeout(resetGame,20)
          }
        }
        this.inputTick = 0;
      }
      this.inputTick++;
    },10 ) //TODO add larger delay for navigation, smaller delay for actions..
  }

  //need a limiter for the amount of inputs I want to allow at once...

  refreshDocumentTree = () => {
    let locationIndex; 
    if(
      location.pathname == ("/") ||
      location.pathname == ("/hidden") ||
      location.pathname == ("/countdown") ||
      location.pathname ==("/welcome") ||
      location.pathname == ("/signup") || 
      location.pathname == ("/title") || 
      location.pathname.includes("/profile")){
        locationIndex = 0
      }else{
        locationIndex = 1 //for ignoring the authstatus (profile menu)
      }

   
    this.baseNode = document.querySelector("#gui-container");
    this.documentTree = (traverseElement(this.baseNode,this.baseNode,[0]))

    this.validActionsList = findValidActionsIntree([], this.documentTree)
    this.navLocation = this.validActionsList[locationIndex]
    this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)

    // console.log("finish refreshing document tree, ", this.documentTree)
    this.currentNode ? this.currentNode.element.focus() : console.log("can't focus current elemtn");
  }

  responsiveNavigation = (staticDirection, isVertical) => {
    //input navigation
    let direction = staticDirection;
    if(this.currentNode.navType == "range" && !isVertical){
      this.currentNode.element.value = Number(this.currentNode.element.value) - direction * this.currentNode.element.dataset.keyboardNavigationSpeed;
      this.currentNode.element.click();
      return;
    }
    else if(this.currentNode.navType == "checkbox" && !isVertical){
      this.currentNode.element.click();
      return;
    }
    else if(this.currentNode.navType == "text" && document.activeElement == this.currentNode.element){
      return;
    }
    //movement navigation
    let verticalDepth;
    if(this.currentNode.flowType == "row"){
      verticalDepth = isVertical ? 2 : 1;
      direction = isVertical ? direction : -direction;
    }
    else{
      direction = isVertical ? direction : -direction;
      verticalDepth = isVertical ? 1 : 2;
    }
    let tempNewLocation = [...this.navLocation];
    tempNewLocation[this.navLocation.length-verticalDepth] += direction;

    //check for valid direct move
    for(let action of this.validActionsList){ 
      if(arraysEqual(action, tempNewLocation)){
        this.navLocation = tempNewLocation;
        // console.log("current tile (direct move)", this.navLocation)
        this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)
        this.currentNode.element.focus()
        generateMouseHoverSound();
        return;
      }
    }

    //recersively check ancestors for the closes valid relative
    if(findClosestSibling(this.validActionsList,this.navLocation, direction)){
      // console.log("closest sibling " , findClosestSibling(this.validActionsList,this.navLocation,direction))
      this.navLocation = findClosestSibling(this.validActionsList,this.navLocation,direction);
    }
    else if(findClosestRelative(this.validActionsList,this.navLocation,direction)){
      // console.log("closest cousin" , findClosestRelative(this.validActionsList,this.navLocation,direction))
      this.navLocation = findClosestRelative(this.validActionsList,this.navLocation,direction)
    }
    else{
      // no closes sibling above
    }

    // console.log("current tile (recursive move)", this.navLocation)
    this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)
    this.currentNode.element.focus()
    generateMouseHoverSound();

    
  }

  responsiveAction = (type) => { //like when enter is pressed
    if(type == "Enter" || type=="EnterSpace"){
      if(this.currentNode.navType == "checkbox"){
        this.currentNode.element.click();
        return;
      }
      else if(this.currentNode.navType == "text"){
        type == "Enter" ? this.currentNode.element.blur() : ""
        
        return;
      }
      this.currentNode.element.click();
      let tempActionNode = this.currentNode
      tempActionNode.element.classList.add('held-down')
      setTimeout(() => {
      tempActionNode.element.classList.remove('held-down')
      },200)
    }
    else if(type == "Escape"){
      if(this.currentNode.navType == "text"){
        this.currentNode.element.blur();
        return;
      }else{
        //go back
        this.props.navigate(-1)
      }
    }

  }
   onKeyPressed = (e) => {

    //TODO replace with switch statement.
    if(location.pathname !== "/hidden"){
      if(e.key == "w"  || e.key == "ArrowUp" ){
        this.responsiveNavigation(-1, true)
      }
      if(e.key == "s" || e.key == "ArrowDown" ){
        this.responsiveNavigation(1, true)
      }
      if(e.key == "d" || e.key == "ArrowRight" ){
        this.responsiveNavigation(-1, false)
      }
      if(e.key == "a" || e.key == "ArrowLeft" ){
        this.responsiveNavigation(1, false)
      }
      if(e.key == "Tab" && !getFullKeyboardHeldKeys().includes("ShiftLeft")){
        this.responsiveNavigation(-1, false)
        e.preventDefault()
      }
      if(e.key == "Tab" && getFullKeyboardHeldKeys().includes("ShiftLeft")){
        this.responsiveNavigation(1, false)
        e.preventDefault()
      }
    }
    
    if(e.key == "Enter" ){
      this.responsiveAction("Enter") 
      e.preventDefault();
    }
    if(e.key == " "){
      this.responsiveAction("EnterSpace") 
      return false;
    }
    if(e.key == "Escape" || e.key == "p"){
      if(location.pathname == "/hidden"){
        window.changeGUIScreen("/pause");
        pauseGame();
        generatePauseSound();
      }
      else if(location.pathname == "/pause"){
        window.changeGUIScreen("/hidden");
        unPauseGame();
      }
      else if(e.key == "Escape"){
        e.preventDefault();
        this.responsiveAction("Escape") 
      }
    }
    if(e.key == "r"){
      if(location.pathname == "/hidden"){
        setTimeout(resetGame,20)
      }

      
    }

    console.log(e.key)
  }
  ref = React.createRef();
  render() {return <Menu/>}
}

function navigationHookWrapper(Component) { //bandaid to add router navigation to GUI class component
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

export default navigationHookWrapper(GUI);

