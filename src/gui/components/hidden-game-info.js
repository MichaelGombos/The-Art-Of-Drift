import React, {useState} from "react"



const GameInfo = () => {
  const [stats, setStats ] = useState({})
  const [gameOver, setGameOver ] = useState(false)

  const refreshStats = (information) => {
    setStats(information)
  }

  const refreshGameOver = (information) => {
    setGameOver(information)
  }
  

  window.updateStatsGameInfo = refreshStats;
  window.updateGameOver = refreshGameOver;
  return (
    <ul className="hidden-menu_game-info">
      <li><span id="time-header" className={`${gameOver ? "finish" : "current"}`}>{gameOver && "FINAL "}TIME</span> <span id="time">{stats.time}</span></li>
      <li>LAP <span id="lap">{stats.lap}</span></li>      
    </ul>
  )
  return ""

}

export default GameInfo;