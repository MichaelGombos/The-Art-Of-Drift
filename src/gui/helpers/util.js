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

export const trendDown = (start, end, count) => {
  let current = start;
  let target = end;
  let step = (current - target) / count;
  let sequence = [];

  for(let i = 0; i < count; i++) {
      // If we've reached the last number, just push the target
      if (i === count - 1) {
          sequence.push(target);
          break;
      }

      // Add some large random fluctuation
      let randomFluctuation = (Math.random() * 2 - 1) * step * 5;

      // Ensure current is always between start and target
      current = Math.max(Math.min(current - step + randomFluctuation, start), target);

      sequence.push(Math.round(current));
  }

  return sequence;
}



export const msToTime = (s) => {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}


console.log("generate seeded array test" , generateSeededArray(3,4))
