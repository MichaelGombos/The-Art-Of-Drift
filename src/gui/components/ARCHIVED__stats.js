import React, {useState} from "react"

import steering_wheel from "../../assets/steering_wheel.png"

const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}

const Stats = ({showStats}) => {
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

  window.updateStats = refreshStats;
  window.updateGameOver = refreshGameOver;
  return (
    <ul className="stats">
      <li>FPS <span id="fps">{stats.fps}</span></li>
      <br/>
      <li><span id="time-header" className={`${gameOver ? "finish" : "current"}`}>{gameOver && "FINAL "}TIME</span> <span id="time">{stats.time}</span></li>
      <li>LAP <span id="lap">{stats.lap}</span></li>
      {showStats && 
      <>
        <li>X <span id="x">{stats.x}</span></li>
        <li>Y <span id="y">{stats.y}</span></li>
        <li>SPEED <span id="speed">{stats.speed}</span></li>
        <li>DISPLAY SPEED <span id="speed">{(stats.speed*10).toFixed(2)} MPH</span></li>
        <li>MOVING ANGLE <span id="moving">{stats.movingAngle}</span></li>
        <li>FACING ANGLE <span id="facing">{stats.facingAngle}</span></li>
        <li>DRIFT FORCE <span id="drift-force">{stats.driftForce}</span></li>
        <li>UNDER STEERING <span id="under-steer">{stats.underSteering}</span></li>
        <li>PARTICLE COUNT <span id="particle-count">{stats.particleCount}</span></li>
        <li>
          <div className="inputs">
            <img id="steering-wheel" style = {{transform: `rotate(${steeringAngle*90}deg)`}}src={steering_wheel}/>
            <div id="pedals">
              <div className="pedal"  style = {{transform: `skew(${brakePressure*-30}deg)`}}><p>{stats.speed >= 0 ? "brake" : "reverse"}</p></div>
              <div className="pedal"  style = {{transform: `skew(${gasPressure*30}deg)`}}><p>gas</p></div>
            </div>
          </div>
        </li>
      </>
      }
      
    </ul>
  )
}

export default Stats;