// Currying为实现多参函数提供了⼀个递归降解的实现思路
// 把接受多个参数的函数变换成接受⼀个单⼀参数（最初函数的第⼀个参数）的函数，
// 并且返回接受余下的参数⽽且返回结果的新函数。

// 题目：实现fn(1)(2)(3).val -> 6

// 1.最简单的实现方式
const fn1 = (num) => {
  fn1.val += num;
  return fn1;
};
fn1.val = 0;
console.log("1.最简单的方法实现");
console.log(fn1(1)(2)(3).val); // 6
console.log(fn1(1).val); // 7
// 存在的问题：fn1.val是全局变量，所以fn每一次调用，都会进行累加
// 解决方案：在fn1()方法中包含一个方法f，使每一个fn都存在一个自己的独立变量
// 这里的利用到的知识点叫做闭包。闭包的作用：避免变量被污染、私有化、保存变量使其常驻内存
// 对于闭包最初级的理解就是：方法中返回方法

// 2.使用闭包建立一个独立的变量
const fn2 = (num) => {
  const f = (x) => {
    f.val += x;
    return f;
  };
  f.val = num;
  return f;
};
console.log("2.使用闭包建立一个独立的变量");
console.log(fn2(1)(2)(3).val); // 6
console.log(fn2(1).val); // 1
// 存在的问题：只能接受一个参数的情况，无法兼容传多个参数的情况 e.g. fn(1)(2,3).val
// 解决方法：使用es6的参数打包来处理不固定参数数量的情况

// 3.兼容多参数情况
// Tips：箭头函数没有...arguments的功能
function fn3() {
  let initArr = [...arguments];
  let sum = (arr) => {
    return arr.reduce((acc, cur) => acc + cur, 0);
  };
  function f(...args) {
    f.val += sum(args);
    return f;
  }
  f.val = sum(initArr);
  return f;
}
console.log("3.兼容多参数情况");
console.log(fn3(1)(2)(3).val);
console.log(fn3(1)(2, 3).val);
console.log(fn3(1).val);

let helper = (nums) => {
  return nums.reduce((acc, cur) => acc + cur, 0);
};
const sum = (...args1) => {
  let sumNum = helper(args1);
  const fn = (...args2) => {
    sumNum += helper(args2);
    return fn;
  };
  fn.toString = () => {
    return sumNum;
  };
  return fn;
};

const sum2 = (...args1) => {
  let sumNum = helper(args1);
  const fn = (...args2) => {
    if (args2.length) {
      sumNum += helper(args2);
      return fn;
    } else {
      return sumNum;
    }
  };
  return args1.length ? fn : sumNum;
};

// 第二版
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;
  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}
