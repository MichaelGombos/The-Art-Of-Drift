import React from "react";

import MedalRow from './medal-row';



const LocalMedalsList = ({pb,difficultyList,toggleDifficulty, mapIndex}) => {
  return (
    <>
        {pb ? <MedalRow 
        buttonIndex = {0}
        medal="personalBest" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} /> : ""}
        <MedalRow 
        buttonIndex = {1}
        medal="easy" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} />
        <MedalRow 
        buttonIndex = {2}
        medal="normal" 
        best={pb}
        difficultyList={difficultyList}
        toggleDifficulty={toggleDifficulty}
        index={mapIndex} />
        <MedalRow 
        buttonIndex = {3}
        medal="hard" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} />
        <MedalRow 
        buttonIndex = {4}
        medal="author" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} />
    </>
  )  
}

export default LocalMedalsList;