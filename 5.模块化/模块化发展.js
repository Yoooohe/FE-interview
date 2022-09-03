// 1. 什么是模块化？
// 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
// 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

// 2. 模块化的进化过程
// 2.1 全局function模式：
// 编码：将不同的功能封装成不同的全局函数
// 问题：污染全局命名空间, 容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系
function m1() {
  // ...
}
function m2() {
  // ...
}

// 2.2 namespace模式：简单对象封装
// 作用：减少了全局变量，解决命名冲突
// 问题：数据不安全，外部可以直接修改模块内的数据
let myModule1 = {
  data: "www.baidu.com",
  foo() {
    console.log(`foo() ${this.data}`);
  },
  bar() {
    console.log(`bar() ${this.data}`);
  },
};
myModule1.data = "other data"; // 能直接修改模块内部数据
myModule1.foo(); // foo other data

// 2.3 IIFE模式：匿名函数自调用（闭包）- immediately invoked function express
// 作用：数据是私有，外部只能通过暴露的方法操作
// 编码：将数据和行为封装到一个函数内部，通过给window添加属性来向外暴露接口
// 问题：如果当前这个模块依赖另外一个模块怎么办？

(function (window) {
  let data = "www.baidu.com";
  function foo() {
    //用于暴露的函数
    console.log(`foo() ${data}`);
    otherFun(); //内部调用
  }
  function bar() {
    console.log(`bar() ${data}`);
  }
  function otherFun() {
    // 内部私有函数
    console.log("otherFun()");
  }
  // 暴露行为
  window.myModule2 = { foo, bar };
})(window);

// 2.4 IIFE模式增强：引入依赖 - 现代模块实现的基石
// 通过jquery方法将页面的背景颜色改成红色，
// 所以必须先引入jQuery库，就把这个库当作参数传入。
// 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。
(function (window, $) {
  let data = "wwww.baidu.com";
  function foo() {
    //用于暴露的函数
    console.log(`foo() ${data}`);
    $("div").css("background", "red");
  }
  function bar() {
    console.log(`bar() ${data}`);
    otherFun(); //内部调用
  }
  function otherFun() {
    // 内部私有函数
    console.log("otherFun()");
  }
  // 暴露行为
  window.myModule3 = { foo, bar };
})(window, jQuery);
