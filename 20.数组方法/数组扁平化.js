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

const flattenArr2 = (arr) => {
  const res = arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      acc = acc.concat(flattenArr(cur));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
  return res;
};

console.log(flatten1([1, 2, 3, [4, [5, 6]], 7]));
