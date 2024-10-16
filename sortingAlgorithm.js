function mergeSort(arr, type) {
  if (arr.length <= 1) {
    return arr;
  }

  // Split the array into two halves
  const middle = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, middle);
  const rightHalf = arr.slice(middle);

  // Recursively sort each half
  const sortedLeft = mergeSort(leftHalf, type);
  const sortedRight = mergeSort(rightHalf, type);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight, type);
}

function merge(left, right, type) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    let leftValue, rightValue;

    if (type === "popularity") {
      leftValue = left[leftIndex].clicks; // Compare based on clicks
      rightValue = right[rightIndex].clicks;
    } else if (type === "priceAsc" || type === "priceDes") {
      leftValue = left[leftIndex].price;
      rightValue = right[rightIndex].price;
    } else if (type === "latest") {
      const dateLeft = new Date(left[leftIndex].createdAt);
      const dateRight = new Date(right[rightIndex].createdAt);

      leftValue = dateLeft;
      rightValue = dateRight;
    }

    if (type === "priceDes" || type === "popularity" || type === "latest") {
      if (leftValue > rightValue) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    } else if (type === "priceAsc") {
      if (leftValue < rightValue) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  }

  // If there are remaining elements in either array, append them
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

module.exports = mergeSort;
