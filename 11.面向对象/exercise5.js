function A() {}
function B() {
  return new A();
}
A.prototype = new A();
B.prototype = new B();
// 构造函数内部如果return了一个引用类型的对象，
// 则构造函数整个失效，只会返回这个引用类型的对象。
var a = new A();
var b = new B();
console.log(a.__proto__ === b.__proto__); // true
