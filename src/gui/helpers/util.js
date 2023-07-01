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

class SeededRNG {
  constructor(seed) {
      this.seed = seed;
  }

  nextFloat() {
      // LCG using parameters from Numerical Recipes
      this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
      return this.seed / 4294967296;
  }
}

export const generateSeededArray = (seed, length) => {
  const rng = new SeededRNG(seed);
  const result = [];
  for (let i = 0; i < length; i++) {
      result.push(Math.floor(rng.nextFloat() * 8)); // generate numbers from 0 to 8 
  }
  return result;
}

console.log("generate seeded array test" , generateSeededArray(3,4))
