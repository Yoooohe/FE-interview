// https://juejin.cn/post/7136424542238408718
// https://juejin.cn/post/6844904102053281806

// async await语法是ES7出现的，是基于ES6的promise和generator实现的
// async await使用示例
const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}

// 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
test().then((res) => console.log(res));

// 我们知道，generator函数是不会自动执行的，
// 每一次调用它的next方法，会停留在下一个yield的位置。
// 利用这个特性，我们只要编写一个自动执行的函数，
// 就可以让testG这个generator函数完全实现async函数的功能。

var test2 = generatorToAsync(function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
});

test2().then((res) => console.log(res));

// 大体思路：generatorToAsync接收一个generator函数，返回一个promise
// 关键点在于，里面用yield来划分的异步流程，应该如何自动执行。

function generatorToAsync(generatorFunc) {
  return function () {
    // 先调用generator函数生成迭代器
    // 对应var gen = testG()
    const gen = generatorFunc.apply(this, arguments);
    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test2 = generatorToAsync(testG)
    // test2().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield。
      function step(key, arg) {
        let generatorResult;
        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;
        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resolve的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val);
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }
      step("next");
    });
  };
}
