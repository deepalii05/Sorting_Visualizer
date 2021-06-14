export function selectionSortanime(array) {
    var anime = [];
    if (array.length <= 1) return array;
    var temp_arr = array.slice();
    selectionSort(anime, temp_arr);
    return anime;
  }
  
  export function selectionSort(anime, temp_arr) {
    var flag;
    do {
        flag = false;
        for (var i = 0; i < temp_arr.length - 1; i++) {
            var min_idx = i;
            for (var j = i+1; j < temp_arr.length; j++){
                if (temp_arr[j] < temp_arr[min_idx]) {
                    min_idx = j;

                    var temp = temp_arr[i];
                    temp_arr[i] = temp_arr[min_idx];
                    temp_arr[min_idx] = temp;
                    anime.push([min_idx, i]);
                    flag = true;
                }
            }
        }

    } while (flag);
    return temp_arr;
  }
  