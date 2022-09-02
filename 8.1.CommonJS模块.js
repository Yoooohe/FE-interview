// CommonJS基础用法
const x = 5;
const addX = function (value) {
  return value + x;
};
// module.exports.x = x;
// module.exports.addX = addX;

var counter = 3;
const addCounter = () => {
  counter++;
};
const getCounter = () => {
  return counter;
};
module.exports = {
  counter,
  addCounter,
  getCounter,
};
