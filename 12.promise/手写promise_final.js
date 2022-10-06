//  设置Promise三种状态的常量值
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._initValue();
    this._initBind();
    try {
      executor(this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }
  _initValue() {
    this.PromiseState = PENDING;
    this.PromiseResult = undefined;
    // 设置缓存成功与失败回调的数组
    this.fulfilledQueueTask = [];
    this.rejectQueueTask = [];
  }
  _initBind() {
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
  }
  _resolve(value) {
    if (this.PromiseState === PENDING) return;
    this.PromiseState = FULFILLED;
    this.PromiseResult = value;
    // 调用对应的回调函数，并清空数组
    let cb;
    while ((cb = this.fulfilledQueueTask.shift())) {
      cb && cb();
    }
  }
  _reject(reason) {
    if (this.PromiseState === PENDING) return;
    this.PromiseState = REJECTED;
    this.PromiseResult = reason;
    // 调用对应的回调函数，并清空数组
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
        // 针对异步情况：将传入的成功失败回调函数存起来
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

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinished) {
    return this.then((val) => {
      onFinished();
      return val;
    }).catch((err) => {
      onFinished();
      return err;
    });
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve) => {
        resolve(value);
      });
    }
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // 其他常考的方法：all, race, catch, finally

  // all
  // 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 2. 如果所有Promise都成功，则返回成功结果数组
  // 3. 如果有一个Promise失败，则返回这个失败结果

  // const promiseAll = Promise.all([promise1, promise2, promise3]).then(res => { console.log('all') })
  static all(promiseList) {
    let result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        // result中接到返回值的顺序 与 all中异步函数的顺序一致，与之行结束的先后顺序无关
        result[index] = value;
        count++;
        if (count === promiseList.length) {
          resolve(result);
        }
      };

      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res);
            },
            (err) => reject(err)
          );
        } else {
          addData(index, promise);
        }
      });
    });
  }

  // race
  // 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 2. 哪个Promise最快得到结果，就返回那个结果，无论成功失败
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => resolve(res),
            (err) => reject(err)
          );
        } else {
          resolve(promise);
        }
      });
    });
  }

  // allSettled
  // 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 2. 把每一个Promise的结果，集合成数组，返回
  static allSettled(promiseList) {
    let result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value, status) => {
        result[index] = {
          value,
          status,
        };
        count++;
        if (count === promiseList.length) {
          resolve(res);
        }
      };

      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res, FULFILLED);
            },
            (err) => {
              addData(index, err, REJECTED);
            }
          );
        } else {
          addData(index, res, FULFILLED);
        }
      });
    });
  }

  // any
  // any与all相反
  // 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 2. 如果有一个Promise成功，则返回这个成功结果
  // 3. 如果所有Promise都失败，则报错
  static any(promiseList) {
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addErr = () => {
        count++;
        if (count === promiseList.length) {
          reject(new AggregateError("All promises were rejected"));
        }
      };
      promiseList.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            () => {
              addErr();
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }
}
