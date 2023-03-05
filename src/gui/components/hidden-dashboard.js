import React, {useState} from "react"

import steering_wheel from "../../assets/steering_wheel.png"

const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}

const Dashboard = ({isHidden}) => {
  const [stats, setStats ] = useState({})
  const [gameOver, setGameOver ] = useState(false)
  let steeringAngle = 0;
  let brakePressure = 0;
  let gasPressure = 0;

  const refreshStats = (information) => {
    setStats(information)
  }

  const refreshGameOver = (information) => {
    setGameOver(information)
  }
  

  if(stats.inputs){
    for(let direction of stats.inputs){
      let pressure = 1
      if(direction.includes("@")){
        pressure = direction.slice(direction.indexOf("@")+1)

        if (direction.includes( directions.left)) {
          console.log(direction,pressure)
          steeringAngle = pressure
        }      
        if (direction.includes( directions.right)) {
          steeringAngle = pressure
        }

        if (direction.includes( directions.down)) {
          console.log(stats.inputs)
          brakePressure = pressure
        }      
        if (direction.includes( directions.up)) {
          gasPressure = pressure
        }
      }
      else{
        if (direction.includes( directions.left)) {
          console.log(direction,pressure)
          steeringAngle = -pressure
        }      
        if (direction.includes( directions.right)) {
          steeringAngle = pressure
        }
        if (direction.includes( directions.down)) {
          console.log(direction,pressure)
          brakePressure = pressure
        }      
        if (direction.includes( directions.up)) {
          gasPressure = pressure
        }
      }
  

    }
  }

  window.updateDashboard = refreshStats;
  window.updateGameOver = refreshGameOver;
  return (
    <ul className="hidden-menu__dashboard">
      {!isHidden && 
          <div className="inputs col-6 align-center gap-md">

            <li>{(stats.speed*5).toFixed(2)} MPH</li>
            <img id="steering-wheel" style = {{transform: `rotate(${steeringAngle*90}deg)`}}src={steering_wheel}/>

            <div className="col-6 gap-md" id="pedals">
              <div className="pedal"  style = {{opacity: gasPressure}}><p>gas</p></div>
              <div className="pedal"  style = {{opacity: brakePressure}}><p>{stats.speed >= 0 ? "brake" : "reverse"}</p></div>
            </div>
          </div>
      }
      
    </ul>
  )
}

export default Dashboard;