export function bubbleSortanime(array) {
    var anime = [];
    if (array.length <= 1) return array;
    var temp_arr = array.slice();
    bubbleSort(anime, temp_arr);
    return anime;
  }
  
  export function bubbleSort(anime, temp_arr) {
    var flag;
    do {
      flag = false;
      for (var i = 0; i < temp_arr.length - 1; i++) {
        if (temp_arr[i] > temp_arr[i + 1]) {
          var temp = temp_arr[i];
          temp_arr[i] = temp_arr[i + 1];
          temp_arr[i + 1] = temp;
          anime.push([i, i + 1]);
          flag = true;
        }
      }
    } while (flag);
    return temp_arr;
  }
  