// 先看一段使用then的代码

// 1. 马上输出“成功”
const p1 = new Promise((resolve, reject) => {
  resolve("成功");
}).then(
  (res) => console.log("onResolved p1", res),
  (err) => console.log("onRejected p1 ", err)
);

// 2. 1秒后输出“失败”
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败");
  }, 1000);
}).then(
  (res) => console.log("onResolved p2", res),
  (err) => console.log("onRejected p2", err)
);

// 3. 支持多个then（不是链式操作）
const p3 = new Promise((resolve, reject) => {
  resolve("成功");
});
p3.then(
  (res) => console.log("obResolved p3 - 1", res),
  (err) => console.log("onRejected p3 - 1", err)
);
p3.then(
  (res) => console.log("obResolved p3 - 2", res),
  (err) => console.log("onRejected p3 - 2", err)
);

// 4. 链式调用输出200
const p4 = new Promise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => res * 2,
    (err) => console.log("onRejected p4", err)
  )
  .then(
    (res) => console.log("onResolved p4", res),
    (err) => console.log("onRejected p4", err)
  );

// 链式调用 输出300
const p5 = new Promise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => new Promise((resolve, reject) => resolve(3 * res)),
    (err) => console.log("onRejected p5", err)
  )
  .then(
    (res) => console.log("onResolved p5", res),
    (err) => console.log("onRejected p5", err)
  );

// ------------------------------------------------------
// 以上暴露了五个知识点
// 1. then接收两个回调，一个是成功回调，一个是失败回调
// 2. 当Promise状态为fulfilled执行成功回调，为rejected执行失败回调
// 3. 如resolve或reject在定时器里，则定时器结束后再执行then
// 4. 支持promise接收多个then
// 5. then支持链式调用，下一次then执行受上一次then返回值的影响

// 关于链式调用我们可以的得到以下四个知识点：
// 1. then方法本身会返回一个新的Promise对象
// 2. 如果返回值是promise对象，返回值为成功，新promise就是成功
// 3. 如果返回值是promise对象，返回值为失败，新promise就是失败
// 4. 如果返回值非promise对象，新promise对象就是成功，值为此返回值

class MyPromise {
  constructor(executor) {
    this._initBind();
    this._initValue();
    executor(this._resolve, this._reject);
  }
  _initBind() {
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
  }
  _initValue() {
    this.PromiseState = "pending";
    this.PromiseResult = undefined;
    this.fulfilledFnQueue = []; // 保存成功的回调函数
    this.rejectedFnQueue = []; // 保存失败的回调函数
  }

  _resolve(value) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;
    let cb;
    while ((cb = this.fulfilledFnQueue.shift())) {
      cb && cb(value);
    }
  }
  _reject(reason) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    this.PromiseResult = reason;
    let cb;
    while ((cb = this.rejectedFnQueue.shift())) {
      cb && cb(reason);
    }
  }

  // 一步一步实现then
  // then接收两个回调，一个是成功回调，一个是失败回调
  then(onResolved, onRejected) {
    // 参数校验，确保一定是函数
    onResolved = typeof onResolved === "function" ? onResolved : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    // 在then中返回一个新的promise以实现链式调用
    return new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        // 这里的setTimeout是为了先注册，再执行，then中的函数是异步函数
        setTimeout(() => {
          const res = cb && cb(this.PromiseResult);
          if (res instanceof MyPromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            // res.then(
            //   res=> { resolve(res) },
            //   err => { reject(err) }
            // })
            // 简写:
            res.then(resolve, reject);
          } else {
            // 非Promise就直接成功
            resolve(res);
          }
        });
      };

      if (this.PromiseState === "fulfilled") {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onResolved);
      } else if (this.PromiseState === "rejected") {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected);
      } else if (this.PromiseState === "pending") {
        // 如果状态为待定，将这个两个回调函数进行暂时保存
        this.fulfilledFnQueue.push(onResolved.bind(this));
        this.rejectedFnQueue.push(onRejected.bind(this));
      }
    });
  }
}

// 输出 ”成功“
const mp1 = new MyPromise((resolve, reject) => {
  resolve("成功");
}).then(
  (res) => console.log("onResolved mp1", res),
  (err) => console.log("onRejected mp1 ", err)
);

// 2. 1秒后输出“失败”
const mp2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("失败");
  }, 1000);
}).then(
  (res) => console.log("onResolved mp2", res),
  (err) => console.log("onRejected mp2", err)
);

const mp3 = new MyPromise((resolve, reject) => {
  resolve("成功");
});
mp3.then(
  (res) => console.log("obResolved mp3 - 1", res),
  (err) => console.log("onRejected mp3 - 1", err)
);
mp3.then(
  (res) => console.log("obResolved mp3 - 2", res),
  (err) => console.log("onRejected mp3 - 2", err)
);

// 链式调用 输出300
const mp5 = new MyPromise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => new MyPromise((resolve, reject) => resolve(3 * res)),
    (err) => console.log("onRejected mp5", err)
  )
  .then(
    (res) => console.log("onResolved mp5", res),
    (err) => console.log("onRejected mp5", err)
  );
