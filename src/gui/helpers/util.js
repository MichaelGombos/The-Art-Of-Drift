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

export const findClosestIndex = (arr, target) => {
  if (!arr || arr.length === 0) return -1;  // Empty array, return -1
  
  let closest = 0;
  for (let i = 1; i < arr.length; i++) {
      if (Math.abs(target - arr[i]) < Math.abs(target - arr[closest])) {
          closest = i;
      }
  }
  
  return closest;
}

console.log("closes index test" , findClosestIndex([1,2,3,4,5,99,10], 7))