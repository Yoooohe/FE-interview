// ES5实现
function flatten(arr) {
  let res = [];
  for (var i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (Array.isArray(cur)) {
      res = res.concat(flatten(cur));
    } else {
      res.push(cur);
    }
  }
  return res;
}

// ES6实现
const flatten1 = (arr) => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};
console.log(flatten1([1, 2, 3, [4, [5, 6]], 7]));
