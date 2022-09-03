const example1 = require("./counter");
// console.log(example1.x);
// console.log(example1.addX(1));

console.log(example1.counter); // 3
example1.addCounter();
console.log(example1.counter); // 3
console.log(example1.getCounter()); // 4

// 在服务器端，模块的加载是运行时同步加载的；
// 在浏览器端，模块需要提前编译打包处理。（直接在html中引用main.js会报错，需要进行打包可以使用`browserify`）
// 全局：`npm install browserify -g`
// 局部：`npm install browserify --save-dev`
// `browserify js/src/main.js -o js/dist/bundle.js`
// 在html文件中引入bundle.js
