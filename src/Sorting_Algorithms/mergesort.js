export function mergeSortanime(array) {
  const anime = [];
  if (array.length <= 1) return array;
  const temp_arr = array.slice();
  mergeSortHelper(array, 0, array.length - 1, temp_arr, anime);
  return anime;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  temp_arr,
  anime,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(temp_arr, startIdx, middleIdx, mainArray, anime);
  mergeSortHelper(temp_arr, middleIdx + 1, endIdx, mainArray, anime);
  doMerge(mainArray, startIdx, middleIdx, endIdx, temp_arr, anime);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  temp_arr,
  anime,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    anime.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    anime.push([i, j]);
    if (temp_arr[i] <= temp_arr[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      anime.push([k, temp_arr[i]]);
      mainArray[k++] = temp_arr[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      anime.push([k, temp_arr[j]]);
      mainArray[k++] = temp_arr[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    anime.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    anime.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    anime.push([k, temp_arr[i]]);
    mainArray[k++] = temp_arr[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    anime.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    anime.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    anime.push([k, temp_arr[j]]);
    mainArray[k++] = temp_arr[j++];
  }
}
