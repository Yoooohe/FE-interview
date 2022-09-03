"use strict";

var _lib = require("./lib");

var _module = require("./module1");

var _module2 = require("./module2");

var _module3 = require("./module3");

var _module4 = _interopRequireDefault(_module3);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_lib.counter); // 3
(0, _lib.addCounter)();
console.log(_lib.counter); // 4
// ES6模块的运行机制与CommonJS不一样。
// ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

(0, _module.foo)();
(0, _module.bar)();
(0, _module2.fun1)();
(0, _module2.fun2)();
(0, _module4.default)();
(0, _jquery2.default)("body").css("background", "green");

// 该文件无法在直接运行，需要对ES6进行编译
// 使用Babel将ES6编译为ES5代码(但包含CommonJS语法):  babel ./ -d lib
// 使用Browserify编译js : browserify lib/ES模块.js -o lib/ESbundle.js