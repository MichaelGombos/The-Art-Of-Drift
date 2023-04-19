//game functions
import {pauseGame,unPauseGame,resetGame, turnOffGame} from "../game/main.js"

//pages
import Finish from "./pages/finish.js"
import Hidden from "./pages/hidden.js"
import MapSelect from "./pages/ARCHIVED__map-select.js"
import Title from "./pages/title.js"
import Pause from "./pages/pause.js"
import Main from "./pages/main.js"
import Settings from "./pages/settings.js"
import Leaderboards from "./pages/leaderboards.js"
import Invited from "./pages/invited.js"

import React, {Component, useEffect, useState} from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation} from "react-router-dom";
import InvitedPreview from "./pages/ARCHIVED__invited-preview.js"
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

import { traverseElement, findValidActionsIntree,arrayIncludesArray, arraysEqual,startsWithArray , findObjectWithLocation , convertMultiDimArrayToStringArray, findClosestSibling,findClosestRelative} from "./helpers/accessible-navigation.js"

// http://www.theartofdrift.com/invited?racer=NAME_HASH_0_309&map=0
// http://localhost:8081/invited?racer=NAME_HASH_0_309&map=0

const home = "/campaign"; //for tests

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

const Menu = () => {
  let isDeviceValid = true;
  
  const [user, loading, error] = useIdToken(auth);
  const [previousType,setPreviousType] = useState('title')
  const [showFPS,setShowFPS] = useState(true);
  const [showExtraStats,setShowExtraStats] = useState(true);
  const [showDashboard,setShowDashboard] = useState(true);
  const [showAuthStatus,setShowAuthStatus] = useState(false);
  const [isGuestSession,setIsGuestSession] = useState(false);
  const [previewMap,setPreviewMap] = useState(
    `{ "spawnAngle" : ${maps[7].spawnAngle} , "lapCount" : ${maps[7].lapCount} , "data" : [${ maps[7].data.map(mapRow => "\n[" + mapRow.map(cell => `"${cell}"`) + "]")}\n] } `
  );


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
    // http://localhost:8080/invited?racer=J&map=0
    if(
    !location.pathname.includes("/pause") &&
    !location.pathname.includes("/hidden") &&
    !location.pathname.includes("/countdown") &&
    !location.pathname.includes("/finish") &&
    !location.pathname.includes("/settings")){
      window.shutOffGame();
    }

    if(
      location.pathname == ("/") ||
      location.pathname == ("/hidden") ||
      location.pathname ==("/welcome") ||
      location.pathname == ("/signup") || 
      location.pathname.includes("/profile")){
        setShowAuthStatus(false)
      }else{
        setShowAuthStatus(true)
      }

      window.refreshDocumentTree()
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
      <Route  path="/profile" element={<Profile user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/guest" element={<ProfileGuest user = {user} loading = {loading} error = {error}/>}/>
      <Route  path="/profile/edit" element={<ProfileEdit user = {user} loading = {loading} error = {error}/>}/>
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
  }
  
  refreshDocumentTree = (locationIndex = 0) => {
    this.baseNode = document.querySelector("#gui-container");
    this.documentTree = (traverseElement(this.baseNode,this.baseNode,[0]))

    this.validActionsList = findValidActionsIntree([], this.documentTree)
    this.navLocation = this.validActionsList[locationIndex]
    this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)
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
    console.log("my direction" ,direction)
    let tempNewLocation = [...this.navLocation];
    tempNewLocation[this.navLocation.length-verticalDepth] += direction;

    //check for valid direct move
    for(let action of this.validActionsList){ 
      if(arraysEqual(action, tempNewLocation)){
        this.navLocation = tempNewLocation;
        console.log("current tile (direct move)", this.navLocation)
        this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)
        this.currentNode.element.focus()
        
        return;
      }
    }

    //recersively check ancestors for the closes valid relative
    if(findClosestSibling(this.validActionsList,this.navLocation, direction)){
      console.log("closest sibling " , findClosestSibling(this.validActionsList,this.navLocation,direction))
      this.navLocation = findClosestSibling(this.validActionsList,this.navLocation,direction);
    }
    else if(findClosestRelative(this.validActionsList,this.navLocation,direction)){
      console.log("closest cousin" , findClosestRelative(this.validActionsList,this.navLocation,direction))
      this.navLocation = findClosestRelative(this.validActionsList,this.navLocation,direction)
    }
    else{
      console.log("no closest sibling above.", this.navLocation)

    }

    console.log("current tile (recursive move)", this.navLocation)
    this.currentNode = findObjectWithLocation([],this.navLocation,this.documentTree)
    console.log("this is the one!!", this.currentNode.element)
    this.currentNode.element.focus()
  

    
  }

  responsiveAction = () => { //like when enter is pressed
    if(this.currentNode.navType == "checkbox"){
      this.currentNode.element.click();
      return;
    }
    this.currentNode.element.click();
    let tempActionNode = this.currentNode
    tempActionNode.element.classList.add('held-down')
    setTimeout(() => {
    tempActionNode.element.classList.remove('held-down')
    },200)
  }
   onKeyPressed = (e) => {
    // e.preventDefault();
    if(e.key == "w"){
      this.responsiveNavigation(-1, true)
    }
    if(e.key == "s"){
      this.responsiveNavigation(1, true)
    }
    if(e.key == "d"){
      this.responsiveNavigation(-1, false)
    }
    if(e.key == "a"){
      this.responsiveNavigation(1, false)
    }
    if(e.key == "Enter"){
      this.responsiveAction()
    }
    console.log(e.key)
  }
  // focusFirstButton = () => {
  //   let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
  //   menuList[0].focus();
  //   this.setState ({navIndex:0})
  // }
  // navigateMenu = (command) => {
  //   let menuList = Array.from(document.querySelector("#game").querySelectorAll("button,select ,input, .title"));
  //   currentNavigationInterval = performance.now() - lastNavigationTime;
  //   let validTime = currentNavigationInterval > validNavigationInterval;
  //   if(validTime){
  //     if(command == "pause" && currentNavigationInterval > validNavigationInterval * 2){
  //       if(location.pathname == "/hidden"){
  //         window.changeGUIScreen("/pause");
  //         pauseGame();
  //       }
  //       else if(location.pathname == "/pause"){
  //         window.changeGUIScreen("/hidden");
  //         unPauseGame();
  //       }
  //     }
  //     else if(command == "reset"){
  //       setTimeout(resetGame,20)
  //     }
      
  //     else if(document.querySelector(".menu")){

  //       let firstButton = menuList[0]
  //       let lastButton = menuList[menuList.length-1];
  //       let lastIndex = menuList.length-1;
  
  //       if(this.navIndex == null || this.navIndex == 0){
  //         this.navIndex = 0;
  //         firstButton.focus();
  //       }
  //       if(command == "up"){
  //         if(document.activeElement == firstButton){ 
  //           this.navIndex = lastIndex;
  //           lastButton.focus();
  //         }
  //         else{
  //           let previousButton = menuList[this.navIndex-1];
  //           this.navIndex -= 1;
  //           previousButton.focus();
  //         }
  //       }
  //       else if(command == "down"){
  //         if(document.activeElement == lastButton){ 
  //           this.navIndex = 0;
  //           firstButton.focus();
  //         }
  //         else{
  //           let nextButton = menuList[this.navIndex+1]
  //           this.navIndex += 1
  //           nextButton.focus();
  //         }
  //       }
  //       else if(command == "select"){
  //         menuList[this.navIndex].click();
  //       }
  //       else if(command == "back"){
  //         history.back()
  //       } //todo add navigate back?
  
  //     }

  //     lastNavigationTime = performance.now();
  //   }


  // }


  // onKeyPressed = () => (e) => {
  //   if(e.key == "r"){
  //     if(location.pathname == "/hidden"){
  //       setTimeout(resetGame,20)
  //     }
  //   } 
  //   else if(e.key == "p" || e.key == "Escape"){
  //     if(location.pathname == "/hidden"){
  //       window.changeGUIScreen("/pause");
  //       pauseGame();
  //     }
  //     else if(location.pathname == "/pause"){
  //       window.changeGUIScreen("/hidden");
  //       unPauseGame();
  //     }
  //   }
  //   else if(Object.keys(navKeys).includes(e.key)){
  //     this.navigateMenu(navKeys[e.key]);
  //   }
  // }

  // componentDidMount() {   window.addEventListener('keydown', this.onKeyPressed().bind(this) )    }
  
  


  ref = React.createRef();
  render() {return <Menu/>}
}


export default GUI;

