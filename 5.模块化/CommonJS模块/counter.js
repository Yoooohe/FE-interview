// CommonJS基础用法
const x = 5;
const addX = function (value) {
  return value + x;
};
// module.exports.x = x;
// module.exports.addX = addX;

var counter = 3;
var obj = {
  counter: 3,
};
const addCounter = () => {
  counter++;
  obj.counter++;
};
const getCounter = () => {
  return counter;
};
const getObjCounter = () => {
  return obj.counter;
};
module.exports = {
  counter,
  obj,
  addCounter,
  getCounter,
  getObjCounter,
};
