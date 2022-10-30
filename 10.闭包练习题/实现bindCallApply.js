Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function (context) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result;
  if (arguments[1]) {
    result = context[fn](...arguments[1]);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

Function.prototype.myBind = function (context) {
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

function test(c) {
  console.log(this.a + c);
}

obj = {
  a: 1,
};

test.myApply(obj, [2]);
