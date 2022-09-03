// ES6: Proxies使用代理(Proxy)监听对象的操作，然后可以做一些相应事情
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  },
};
var p = new Proxy(target, handler);
p.world === "Hello, world!";

// 可监听的操作： get、set、has、deleteProperty、apply、construct、getOwnPropertyDescriptor、defineProperty、getPrototypeOf、setPrototypeOf、enumerate、ownKeys、preventExtensions、isExtensible。
