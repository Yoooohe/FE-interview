function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};

Foo.a(); // 4
let obj = new Foo();
// 会创建一个新的对象继承父对象，因此，此时会执行Foo
// 执行Foo方法就更改了Foo.a，同时给obj创建了一个自己的a
obj.a(); // 2 -> 优先用自己的a，如果自己没有才会用父对象的a
Foo.a(); // 1
