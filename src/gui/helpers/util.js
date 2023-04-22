//random helper functions

export function make2DArray(arr, depth) {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    const chunk = arr.slice(i, i + depth);
    result.push(chunk);
    i += depth;
  }
  return result;
}