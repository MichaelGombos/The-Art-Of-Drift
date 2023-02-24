import React, {useState} from "react"

const Stats = ({showStats}) => {
  const [stats, setStats ] = useState({})
  const [gameOver, setGameOver ] = useState(false)

  const refreshStats = (information) => {
    setStats(information)
  }

  const refreshGameOver = (information) => {
    setGameOver(information)
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
        <li>SPEED <span id="speed">{(stats.speed*10).toFixed(2)} MPH</span></li>
        <li>MOVING ANGLE <span id="moving">{stats.movingAngle}</span></li>
        <li>FACING ANGLE <span id="facing">{stats.facingAngle}</span></li>
        <li>DRIFT FORCE <span id="drift-force">{stats.driftForce}</span></li>
        <li>UNDER STEERING <span id="under-steer">{stats.underSteering}</span></li>
        <li>PARTICLE COUNT <span id="particle-count">{stats.particleCount}</span></li>
      </>
      }
      
    </ul>
  )
}

export default Stats;