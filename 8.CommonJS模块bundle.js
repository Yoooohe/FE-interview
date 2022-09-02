(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const example1 = require("./8.1.CommonJS模块");
// console.log(example1.x);
// console.log(example1.addX(1));

console.log(example1.counter); // 3
example1.addCounter();
console.log(example1.counter); // 3
console.log(example1.getCounter()); // 4

},{"./8.1.CommonJS模块":1}]},{},[2]);
