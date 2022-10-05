// https://github.com/Sunny-lucking/blog/issues/6
// generator的基本使用
function* foo() {
  var a = yield "result1";
  console.log(a);
  yield "result2";
  yield "result3";
}
const gen = foo();
console.log(gen.next()); //{value: "result1", done: false}
console.log(gen.next()); //{value: "result2", done: false}
console.log(gen.next()); //{value: "result3", done: false}
console.log(gen.next()); //{value: undefined, done: true}

console.log("-------------");

// 手写核心原理
// 使用Context类，从而实现每次创建一个生成器函数对象，都创建一个新的context对象
class Context {
  constructor() {
    this.next = 0;
    this.prev = 0;
    this.send = undefined;
    this.done = false;
  }
  stop() {
    this.done = true;
  }
}

let myFoo = function () {
  var context = new Context();
  return {
    next: function (x) {
      context.send = x;
      value = gen$(context);
      return {
        value,
        done: context.done,
      };
    },
  };
};
function gen$(context) {
  switch ((context.prev = context.next)) {
    case 0:
      context.next = 2;
      return "result1";
    case 2:
      context.next = 4;
      console.log(context.send);
      return "result2";
    case 4:
      context.next = 6;
      return "result3";
    case 6:
      context.stop();
      return undefined;
  }
}

const gen2 = myFoo();
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());

// 分析一下流程
// 我们定义的function*生成器函数被转化为以上代码
// 转化后的代码分为三大块：
// gen$(_context)由yield分割生成器函数代码而来
// context对象用于储存函数执行上下文
// 迭代器法定义next()，用于执行gen$(_context)来跳到下一步

// 从中我们可以看出，
//「Generator实现的核心在于上下文的保存，
// 函数并没有真的被挂起，每一次yield，
// 其实都执行了一遍传入的生成器函数，
// 只是在这个过程中间用了一个context对象储存上下文，
// 使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，
// 看起来就像函数被挂起了一样」

// 实现next传参
