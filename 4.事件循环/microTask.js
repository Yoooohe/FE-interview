// Nodejs中，nextTick()，优先级高于.then()，
// 所以nextTick一定会比.then提前执行
process.nextTick(function () {
  console.log(7);
});

new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});

process.nextTick(function () {
  console.log(8);
});

// 3, 4, 7, 8, 5
