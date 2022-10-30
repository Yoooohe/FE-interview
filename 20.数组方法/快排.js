function sortArray(nums) {
  quickSort(0, nums.length - 1, nums);
  return nums;
}
function quickSort(start, end, arr) {
  if (start < end) {
    const mid = sort(start, end, arr);
    quickSort(start, mid - 1, arr);
    quickSort(mid + 1, end, arr);
  }
}

function sort(start, end, arr) {
  const pivot = arr[start];
  let left = start,
    right = end;
  while (left !== right) {
    while (arr[right] >= pivot && right > left) {
      right--;
    }
    arr[left] = arr[right];
    while (arr[left] < pivot && right > left) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = pivot;
  return left;
}

console.log(sortArray([6, 7, 1, 3, 4, 9, 8, 0, 13, 4]));
