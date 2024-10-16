/* 
  1,2,3,4,5,6,7,8,9,10,11
  for pages less than 6


  For pages more than 6 
  default case:
  1,2,3,4,...,10,11

  case 1: if value = 4
  1,2,3,4,5,...,10,11

  case 2: if value > 4
  1,2,...,4,5,6,...,10,11
  1,2,...,5,6,7,...,10,11
  1,2,...,6,7,8,...,10,11
  case 3
  1,2,...,7,8,9,10,11
  1,2,...,8,9,10,11
  1,2,...,9,10,11
  1,2,...,10,11
*/

const pageGutter = (arr, val) => {
  if (arr.length <= 6) {
    return arr;
  }
  // if the length of pages is less than or equal to 6, then there is no need
  // fold the pages.

  const left = [1, 2, 3, 4];
  const right = [arr[arr.length - 2], arr[arr.length - 1]];
  var mid = [];

  if (val === 4) {
    return [...left, val + 1, "...", ...right];
    // if the value clicked is exactly 4, then just adjust the pagination to the above format
  } else if (val > 4) {
    // else if the value clicked is greater than 4,
    // then we want to adjust the pagination in the following format
    //1,2,...,5,6,7,...,10,11 - page 6 is the current page here
    // 1,2,...,6,7,8,...,10,11 - page 7 is the current page here
    // my adjusting the "mid" array whereby the middle value of the mid, is the current page selected
    mid = [arr[val - 2], arr[val - 1], arr[val]];
    return val < arr[arr.length - 4]
      ? [1, 2, "...", ...mid, "...", ...right]
      : val === arr[arr.length - 4] // here if val if equalto the 4th to the last value of arr, then just adjust pagination to the below format in line 48
      ? [1, 2, "...", ...mid, ...right]
      : [1, 2, "...", arr[arr.length - 4], arr[arr.length - 3], ...right]; // here, since val is initially greater than 4 (line 38), and not less than the 4th to the last value in arr (line 45)
    // and not equal to the 4th to the last value in arr(line 49), then adjust pagination to the following format
  } else {
    // adjust pagination to the below format if val is less than 4
    return [...left, "...", ...right];
  }
};

module.exports = pageGutter;
