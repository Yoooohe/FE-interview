// [1,2,3].reduce((acc, cur) => acc + cur, 0)

Array.prototype.myReduce = function (cb, initialVal) {
  const arr = this;
  let total = initialVal;
  for (let i = 0; i < arr.length; i++) {
    total = cb(total, arr[i]);
  }
  return total;
};

const res = [1, 2, 3].myReduce((acc, cur) => acc + cur, 9);
console.log(res);
