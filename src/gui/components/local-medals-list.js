import React from "react";

import MedalRow from './medal-row';



const LocalMedalsList = ({pb,difficulty,setDifficulty, mapIndex}) => {
  return (
    <>
        {pb ? <MedalRow medal="personalBest" best={pb} currentDiff={difficulty} setDiff={setDifficulty} index={mapIndex} /> : ""}
        <MedalRow medal="easy" best={pb} currentDiff={difficulty} setDiff={setDifficulty}  index={mapIndex} />
        <MedalRow medal="normal" best={pb} currentDiff={difficulty} setDiff={setDifficulty}  index={mapIndex} />
        <MedalRow medal="hard" best={pb} currentDiff={difficulty} setDiff={setDifficulty}  index={mapIndex} />
        <MedalRow medal="author" best={pb} currentDiff={difficulty} setDiff={setDifficulty}  index={mapIndex} />
    </>
  )  
}

export default LocalMedalsList;