import React from "react";

import MedalRow from './medal-row';



const LocalMedalsList = ({bypassAuthorMedalUnlock,pb,difficultyList,toggleDifficulty, mapIndex}) => {
  return (
    <>
        {pb  ? <MedalRow 
        bypassAuthorMedalUnlock = {bypassAuthorMedalUnlock}
        buttonIndex = {0}
        medal="personalBest" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} /> : ""}
        <MedalRow 
        bypassAuthorMedalUnlock = {bypassAuthorMedalUnlock}
        buttonIndex = {1}
        medal="easy" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} />
        <MedalRow 
        bypassAuthorMedalUnlock = {bypassAuthorMedalUnlock}
        buttonIndex = {2}
        medal="normal" 
        best={pb}
        difficultyList={difficultyList}
        toggleDifficulty={toggleDifficulty}
        index={mapIndex} />
        <MedalRow 
        bypassAuthorMedalUnlock = {bypassAuthorMedalUnlock}
        buttonIndex = {3}
        medal="hard" 
        best={pb} 
        difficultyList={difficultyList} 
        toggleDifficulty={toggleDifficulty} 
        index={mapIndex} />
        <MedalRow 
        bypassAuthorMedalUnlock = {bypassAuthorMedalUnlock}
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