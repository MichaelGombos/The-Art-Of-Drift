//just logging all the leaderboard functions

import { addReplay , addUIDReplay, deleteReplay, getAllReplays, getCurrentAuthReplay, getDatabaseTime, getMedalAmount, setMedalAmount} from "../helpers/databaseFacade";

console.log("im a big ol chungus");

const runTests = () => {
  console.log('testsran..')

  addReplay(0,{
    time: "00:33.233",
    playerName : "ready player fun",
    playerInputs: "[[this should be long af..]]",
    playerFrameInformation: "[[this should be long af..]]",
    playerVehicle: 2,
    playerAvater:0,
    createdAt: getDatabaseTime()
  }).then(
    console.log("big chungus")
  )

  addUIDReplay("fartlol",0,{
    time: "00:12.233",
    playerName : "GET YOUR HOTDOGS",
    playerInputs: "[[this should be long af..]]",
    playerFrameInformation: "[[this should be long af..]]",
    playerVehicle: 3,
    playerAvater:3,
    createdAt: getDatabaseTime()
  }).then(
    console.log("2")
  )

  addUIDReplay("fartlol2",0,{
    time: "00:53.233",
    playerName : "slow poser",
    playerInputs: "[[this should be long af..]]",
    playerFrameInformation: "[[this should be long af..]]",
    playerVehicle: 1,
    playerAvater:1,
    createdAt: getDatabaseTime()
  }).then(
    console.log("3")
  )

  deleteReplay("fartlol2",0)

  getCurrentAuthReplay(0).then(information => {
    console.log("replay info" , information);
  })

  getAllReplays(0).then(allReplays => {
    console.log(allReplays);
  })

  getMedalAmount().then(amount => {
    console.log("medal AMOUNT", amount); 
  })

  getMedalAmount().then(amount => {
    setMedalAmount(amount+2)
  })
}

      
window.addEventListener("load", () => { setTimeout(
  runTests, 1000)}); 