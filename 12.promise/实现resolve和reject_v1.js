// 先看一段Promise的代码
let p1 = new Promise((resolve, reject) => {
  resolve("成功");
  reject("失败");
});
console.log("p1", p1);

let p2 = new Promise((resolve, reject) => {
  reject("失败");
  resolve("成功");
});
console.log("p2", p2);

let p3 = new Promise((resolve, reject) => {
  throw "报错";
});
console.log("p3", p3);

// ------------------------------------------------------
// 以上暴露了四个知识点
// 1. 执行了resolve，Promise状态会变成fulfilled
// 2. 执行了reject，Promise状态会变成rejected
// 3. Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
// 4. Promise中有throw的话，就相当于执行了reject

// 一、实现resolve与reject
// 三个注意点：
// 1. Promise的初始状态为pending
// 2. resolve和reject的绑定this，使得resolve和reject的this指向永远指向当前的MyPromise实例，防止随着函数执行环境的改变而改变
// 3. Promise达到终态后状态不会再改变
class MyPromise {
  constructor(executor) {
    // 设置初始值
    this._initValue();
    // 绑定this
    this._initBind();
    // 执行传入MyPromise的函数
    try {
      executor(this._resolve, this._reject);
    } catch (e) {
      // 处理throw的情况：捕捉到错误执行reject
      this._reject(e);
    }
  }
  _initValue() {
    // 设置初始值
    this.PromiseState = "pending";
    this.PromiseResult = undefined;
  }
  _initBind() {
    // 绑定this
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
  }

  _resolve(value) {
    // 如果执行resolve，状态变为fulfilled
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;
  }
  _reject(reason) {
    // 如果执行reject，状态变为rejected
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    // 终值为传进来的reason
    this.PromiseResult = reason;
  }
}

// resolve, reject测试
const mp1 = new MyPromise((resolve, reject) => {
  resolve("成功");
  reject("失败");
  throw "失败";
});
console.log("mp1", mp1);
