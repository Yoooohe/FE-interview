var a = 2;
var obj = {
  a: 4,
  fn1: (function(){
    this.a*=2;
    var a = 3;
    return function(){
      this.a*=2;
      a*=3;
      console.log(a);
    }
  })()
}
console.log(this.a, global.a)
var fn1 = obj.fn1;
console.log(a) // node: 2, window: 4
fn1(); // 9
obj.fn1() // 27
console.log(a) // node: 2, window: 8
console.log(obj.a) // 8

// 通过node执行的结果与在浏览中不一样
// 原因在于这个外层的a，在浏览器中obj中fn1对应的匿名自执行函数中的this指的时window，而外层的a挂在window下，从而被修改了
// 而在node中外层的a没有挂在this下，具体node部分的执行逻辑还不太了解