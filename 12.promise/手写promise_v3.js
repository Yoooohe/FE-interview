// 因此，这个版本主要处理两个问题
// 1. 返回自身的情况
// 2. 微任务 - queueMicrotask

// 手写promise
// 1. 书写内部的resolve和reject方法
// 2. 绑定this并设置初始值
// 3. 处理then函数中的基本逻辑，将then中的回调函数保存到数字中，用来处理多个then(非链式情况)
// 4. 通过在then中返回新的promise，处理链式调用情况
// 5. 处理返回自身的情况，及错误处理
// 6. 使用queueMicrotask处理then中的微任务
// 7. 将then中的回调函数变成可选参数，及判断并转化传入参数为函数
// 8. 实现resolve和reject的静态调用

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._initValue();
    this._initBind();
    try {
      // executor是一个执行器，进入就会立即执行
      // 并传入resolve和reject
      executor(this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }
  _initValue() {
    this.PromiseState = "pending";
    this.PromiseResult = undefined;
    this.fulfilledQueueTask = [];
    this.rejectQueueTask = [];
  }
  _initBind() {
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
  }
  _resolve(value) {
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = FULFILLED;
    this.PromiseResult = value;
    let cb;
    while ((cb = this.fulfilledQueueTask.shift())) {
      cb && cb();
    }
  }
  _reject(reason) {
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = REJECTED;
    this.PromiseResult = reason;
    let cb;
    while ((cb = this.rejectQueueTask.shift())) {
      cb && cb();
    }
  }
  then(onResolved, onRejected) {
    onResolved = typeof onResolved === "function" ? onResolved : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        queueMicrotask(() => {
          try {
            let res = cb && cb(this.PromiseResult);
            if (res === thenPromise) {
              return reject(
                new TypeError("Chaining cycle detected for promise #<Promise>")
              );
            }
            if (res instanceof MyPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (e) {
            reject(e);
          }
        });
      };
      if (this.PromiseState === FULFILLED) {
        resolvePromise(onResolved);
      } else if (this.PromiseState === REJECTED) {
        resolvePromise(onRejected);
      } else if (this.PromiseState === PENDING) {
        this.fulfilledQueueTask.push(() => {
          resolvePromise(onResolved.bind(this));
        });
        this.rejectQueueTask.push(() => {
          resolvePromise(onRejected.bind(this));
        });
      }
    });
    return thenPromise;
  }

  // 静态resolve Promise.resolve().then(()=>{})
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    // 否则将传入的参数专成常规 MyPromise
    return parameter instanceof MyPromise
      ? parameter
      : new MyPromise((resolve) => {
          resolve(parameter);
        });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

// const promise = new Promise((resolve, reject) => {
//   resolve(100);
// });
// const p1 = promise.then((value) => {
//   console.log(value);
//   return p1;
// });

// 测试一下吧～
// 基本功能

const mp1 = new MyPromise((resolve, reject) => {
  resolve("success");
  reject("err");
}).then(
  (val) => console.log("mp1", val),
  (reason) => console.log(reason)
);

// 异步任务
const mp2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
}).then(
  (val) => {
    console.log("resolve mp2", val);
  },
  (reason) => {
    console.log("reject mp2", reason);
  }
);

// 多个then
const mp3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

mp3.then((value) => {
  console.log("resolve mp3", value);
});

mp3.then((value) => {
  console.log("resolve mp3", value);
});

mp3.then((value) => {
  console.log("resolve mp3", value);
});

// 测试：then方法的链式调用
const mp4 = new MyPromise((resolve, reject) => {
  resolve("success");
})
  .then((value) => {
    console.log("resolve mp4", value);
    return new MyPromise((resolve, reject) => {
      resolve("other");
    });
  })
  .then((value) => {
    console.log("resolve mp4", value);
  });

// 测试：then方法链式调用Promise返回自身

const mp5 = new MyPromise((resolve, reject) => {
  resolve("success");
}).then((value) => {
  console.log("resolve mp5", value);
  return mp5;
});

// 运行的时候会走reject
mp5.then(
  (value) => {
    console.log("resolve mp5", value);
  },
  (reason) => {
    console.log("reject mp5", reason.message);
  }
);

// 测试：捕获执行器错误
const mp6 = new MyPromise((resolve, reject) => {
  // resolve('success')
  throw new Error("执行器错误");
}).then(
  (value) => {
    console.log("resolve mp6", value);
  },
  (reason) => {
    console.log("reject mp6", reason.message);
  }
);

// 测试：捕获then执行时的错误
const mp7 = new MyPromise((resolve, reject) => {
  resolve("success");
})
  .then((value) => {
    console.log("resolve mp7", value);
    throw new Error("then error");
  })
  .then(
    (value) => {
      console.log("resolve mp7", value);
    },
    (reason) => {
      console.log("reject mp7", reason.message);
    }
  );

// 测试：then中的参数为可选
const mp8 = new MyPromise((resolve, reject) => {
  resolve(100);
})
  .then()
  .then()
  .then()
  .then((value) => console.log("resolve mp8", value));

const mp9 = new MyPromise((resolve, reject) => {
  reject("err");
})
  .then()
  .then()
  .then(
    (value) => {
      console.log("resolve mp9", value);
    },
    (reason) => {
      console.log("reject mp9", reason);
    }
  );

// 测试：resolve与reject的静态调用
MyPromise.resolve()
  .then((value) => {
    console.log("resolve", value);
    return MyPromise.resolve(4);
  })
  .then((res) => {
    console.log("resolve static MyPromise1");
  });

MyPromise.reject(
  new MyPromise((resolve, reject) => {
    reject(5);
  })
)
  .then(
    (value) => {
      console.log("resolve", value);
      return MyPromise.resolve(4);
    },
    (reason) => {
      console.log("reject", reason);
      return MyPromise.resolve(4);
    }
  )
  .then(
    (res) => {
      console.log("resolve static MyPromise2", res);
    },
    (reason) => {
      console.log("reject static MyPromise2", reason);
    }
  );
