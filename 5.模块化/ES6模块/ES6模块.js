import { counter, addCounter } from "./addCounter";
import { foo, bar } from "./module1";
import { fun1, fun2 } from "./module2";
import module3 from "./module3";
import $ from "jquery"; // 第三方库的引入

console.log(counter); // 3
addCounter();
console.log(counter); // 4
// ES6模块的运行机制与CommonJS不一样。
// ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

foo();
bar();
fun1();
fun2();
module3();
$("body").css("background", "green");

// 该文件无法在直接运行，需要对ES6进行编译
// 使用Babel将ES6编译为ES5代码(但包含CommonJS语法):  babel ./ -d lib
// 使用Browserify编译js : browserify lib/ES6模块.js -o lib/ES6bundle.js
