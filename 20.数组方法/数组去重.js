// ES5实现
function unique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

// ES6实现
const unique = (arr) => {
  return [...new Set(arr)];
};
