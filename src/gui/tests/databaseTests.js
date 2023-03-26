//just logging all the leaderboard functions

import { serverTimestamp } from "firebase/firestore";
import { addMap, addReplay , addUIDReplay, deleteReplay, getAllMaps, getAllReplays, getCommunityMapAmount, getCurrentAuthMaps, getCurrentAuthReplay, getDatabaseTime, getMap, getMedalAmount, getUIDMaps, setMedalAmount} from "../helpers/databaseFacade";
import { auth } from "../helpers/firebase";

const runTests = () => {
  // // replay db tests

  // addReplay(0,{
  //   time: "00:00:33.233",
  //   playerName : "ready player fun",
  //   playerInputs: "[[up],[up],[down,down],[left,right],[left,right][b,a]]",
  //   playerFrameInformation: "[[this should be long af..]]",
  //   playerVehicle: 2,
  //   playerAvater:0,
  //   createdAt: getDatabaseTime()
  // }).then(
  //   console.log("big chungus")
  // )

  // addUIDReplay("fartlol",0,{
  //   time: "00:00:12.233",
  //   playerName : "GET YOUR HOTDOGS",
  //   playerInputs: "[[up],[up],[down,down],[left,right],[left,right][b,a]]",
  //   playerFrameInformation: "[[this should be long af..]]",
  //   playerVehicle: 3,
  //   playerAvater:3,
  //   createdAt: getDatabaseTime()
  // }).then(
  //   console.log("2")
  // )

  // addUIDReplay("fartlol2",0,{
  //   time: "00:00:53.233",
  //   playerName : "slow poser",
  //   playerInputs: "[[up],[up],[down,down],[left,right],[left,right][b,a]]",
  //   playerFrameInformation: "[[this should be long af..]]",
  //   playerVehicle: 1,
  //   playerAvater:1,
  //   createdAt: getDatabaseTime()
  // }).then(
  //   console.log("3")
  // )

  // deleteReplay("fartlol2",0)

  getCurrentAuthReplay(0).then(information => {
    console.log("replay info" , information);
  })

  // getAllReplays(7).then(allReplays => {
  //   console.log("all replays test" , allReplays);
  // })

  // getMedalAmount().then(amount => {
  //   console.log("medal AMOUNT", amount); 
  // })

  // getMedalAmount().then(amount => {
  //   setMedalAmount(amount+2)
  // })

// // result banner tests
  
//   window.addResultMessage(false,"message 1")
//   window.addResultMessage(true,"2 wa wa wa")
//   window.addResultMessage(false,"3 wwwwwwwwwwww s wwww s")

//   setTimeout(() => {
//     window.addResultMessage(false,"4!!!! brucc jucc!")
//   }, 2000)

// // community maps tests
  // addMap({
  //   creatorUID: auth.currentUser.uid,
  //   mapName : "testName",
  //   mapDescrition: "test Description",
  //   mapObject: {
  //     testProperty: "test"
  //   },
  //   authorProfileObject: {

  //     testProperty: "test"
  //   },
  //   isDraft: false,
  //   createdAt: serverTimestamp(),
  //   mapID: "easter egg?"
  // })

  // getCommunityMapAmount().then(amount => {
  //   console.log(amount)
  // })

  // getAllMaps().then(daMaps => console.log("map(s) ----->",daMaps))

  // getCurrentAuthMaps().then(daFilteredMaps => console.log("filtered maps??!!!? ---->" , daFilteredMaps))

  // getUIDMaps("KpTftu4hl6b3z0jeTEI3JADVvdB2").then(uidMapz => console.log("KpTftu4hl6b3z0jeTEI3JADVvdB2 maps ", uidMapz))

  // getMap("c00000001").then(datMapInfo => console.log("c00000001 information " ,datMapInfo))

  
}

      
window.addEventListener("load", () => { setTimeout(
  runTests, 3000)}); 