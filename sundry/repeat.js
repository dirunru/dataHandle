let originalArr = [8, 9, 6, 1, 2, 4, 7, 3, 5]
function bubbleSort (data) {
  let arr = JSON.parse(JSON.stringify(data))
  for (var i = 0; i < arr.length - 1; i++) {
    // 每一组循环找到相对最大的那个排到最后
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
function selectSort (data) {
  let arr = JSON.parse(JSON.stringify(data))
  var min, temp;
  for (var i = 0; i < arr.length - 1; i++) {
    min = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}
console.log('selectSort(originalArr)', selectSort(originalArr)) 
