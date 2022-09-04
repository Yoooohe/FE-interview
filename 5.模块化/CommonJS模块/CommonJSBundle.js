(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const example1 = require("./counter");
// console.log(example1.x);
// console.log(example1.addX(1));

console.log(example1.counter, example1.obj.counter); // 3 3
example1.addCounter();
console.log(example1.counter, example1.obj.counter); // 3 4
console.log(example1.getCounter(), example1.getObjCounter()); // 4 4

// 在服务器端，模块的加载是运行时同步加载的；
// 在浏览器端，模块需要提前编译打包处理。（直接在html中引用main.js会报错，需要进行打包可以使用`browserify`）
// 全局：`npm install browserify -g`
// 局部：`npm install browserify --save-dev`
// `browserify js/src/main.js -o js/dist/bundle.js`
// 在html文件中引入bundle.js

},{"./counter":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
