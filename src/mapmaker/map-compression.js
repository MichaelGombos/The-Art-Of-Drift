



const compressMapData = (input) => {
  const output = []

  let consecutiveTiles = 1;


  let outputRow = []
  for(let rowIndex = 0; rowIndex < input.length; rowIndex++){ //row
    consecutiveTiles = 1;
    for(let cellIndex = 0; cellIndex < input[0].length; cellIndex++){//cell

      if(input[rowIndex][cellIndex] == input[rowIndex][cellIndex+1]){
        consecutiveTiles ++;
      }
      else{
        if(consecutiveTiles == 1){
          outputRow.push(input[rowIndex][cellIndex])
        }
        else if (consecutiveTiles > 1){
          outputRow.push(`${consecutiveTiles}t${input[rowIndex][cellIndex]}`)
          consecutiveTiles = 1;
        }
      }
    }
    output.push([...outputRow])
    outputRow = []
  }
  return output;
}

const decompressMapData = (compressedInput) => {

  let code = 0
  let count =0
  let tileValue = 0


  const output = [];

  for(let rowIndex = 0; rowIndex < compressedInput.length; rowIndex++){
    const outputRow = [];
    for(let cellIndex = 0; cellIndex < compressedInput[rowIndex].length; cellIndex++){
      if(!isNaN(compressedInput[rowIndex][cellIndex])){
        outputRow.push(compressedInput[rowIndex][cellIndex])
      }
      else{ //compressed chunk
         code = compressedInput[rowIndex][cellIndex];
         count = code.slice(0,code.indexOf("t"))
         tileValue = code.slice(code.indexOf("t")+1)

        for(let decodeIndex = 0; decodeIndex < count; decodeIndex++){
          outputRow.push(Number(tileValue));
        }
      }
    }
    output.push(outputRow);
  }
  return output;
}

export {compressMapData,decompressMapData};