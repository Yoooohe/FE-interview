// 顺序执行f1, f2, f3
// 并且上一个函数执行结果是下一个函数的参数
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

f3(f2(f1("omg"))); // 洋葱模型 - 潜逃地狱

// 封装一个compose函数，接收f1,f2,f3，并返回一个聚合函数
// compose(f1,f2,f3)("omg")

function compose(...funcs) {
  if (!funcs.length) return (arg) => arg;
  return funcs.reduce(
    (composeF, f) =>
      (...args) =>
        composeF(f(...args))
  );
}

compose(f1, f2, f3)("omg");
let res = compose()("omg");
console.log("res", res);
