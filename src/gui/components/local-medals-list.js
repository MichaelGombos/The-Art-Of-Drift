import React from "react";

import MedalRow from './medal-row';



const LocalMedalsList = ({pb,difficulty,setDifficulty,newEnableGhost,setNewEnableGhost, mapIndex}) => {
  return (
    <div className="player-stats">
      <ul className="column">
        <MedalRow medal="personalBest" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
        <MedalRow medal="easy" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
        <MedalRow medal="normal" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
        <MedalRow medal="hard" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
        <MedalRow medal="author" best={pb} currentDiff={difficulty} setDiff={setDifficulty} isGhostEnabled={newEnableGhost} setNewGhostEnabled={setNewEnableGhost} index={mapIndex} />
      </ul>
    </div>
  )  
}

export default LocalMedalsList;