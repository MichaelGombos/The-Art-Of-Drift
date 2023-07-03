import React, {useState} from "react"


const ExtraStats = ({showFPS,showInfo}) => {
  const [stats, setStats ] = useState({})

  const refreshStats = (information) => {
    setStats(information)
  }

  const refreshGameOver = (information) => {
    setGameOver(information)
  }
  

  window.updateExtraStats = refreshStats;
  window.updateGameOver = refreshGameOver;
  return (
    <ul className="hidden-menu__extra-stats">
        {showFPS || showInfo ? 
        <li>FPS <span>{stats.fps}</span></li> : ""}
        {showInfo ? <>
        <li>X <span id="x">{stats.x}</span></li>
        <li>Y <span id="y">{stats.y}</span></li>
        <li>CHECKPOINT <span id="under-steer">{stats.checkpoint}</span></li>
        <li>ACCELERATION <span id="under-steer">{stats.acceleration}</span></li>

        <li>TILE SPEED <span id="speed">{stats.speed}</span></li>

        <li>TURNING SPEED <span id="under-steer">{stats.turningSpeed}</span></li>

        <li>TIRE GRIP <span id="under-steer">{stats.tireGrip}</span></li>

        <li>DRIFT FORCE <span id="drift-force">{stats.driftForce}</span></li>

        <li>MOVING ANGLE <span id="moving">{stats.movingAngle}</span></li>

        <li>FACING ANGLE <span id="facing">{stats.facingAngle}</span></li>

        <li>PARTICLE COUNT <span id="particle-count">{stats.particleCount}</span></li>

        <li>VALID GAME <span id="valid-game">{stats.isGameValid ? "Yes" : "NO"}</span></li>
        </>
        : "" }
    </ul>
  )
}

export default ExtraStats;