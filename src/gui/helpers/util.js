//random helper functions

export const make2DArray = (arr, depth) => {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    const chunk = arr.slice(i, i + depth);
    result.push(chunk);
    i += depth;
  }
  return result;
}

export const checkForCommonItem = (array1, array2) => {
  for(let i = 0; i < array1.length; i++) {
      for(let j = 0; j < array2.length; j++) {
          if(array1[i] === array2[j]) {
              return true;
          }
      }
  }
  return false;
}