const example1 = require("./8.1.CommonJS模块");
// console.log(example1.x);
// console.log(example1.addX(1));

console.log(example1.counter); // 3
example1.addCounter();
console.log(example1.counter); // 3
console.log(example1.getCounter()); // 4
