// 使用原生的call，apply模拟实现bind

function caculator(base, bonus1, bonus2) {
  console.log(`${this.name}的总工资为${base+bonus1+bonus2}`)
}

const lelei = {
  name: 'Li Lei'
}

caculator.call(lelei, 10000, 1000, 2000);
caculator.call(lelei, 10000, 4000, 2000);

// bind传入this指向的object，使得之后的调用不再需要传入lilei对象
const caculator1 = caculator.bind(lelei)
caculator1(10000, 1000, 2000);
caculator1(10000, 4000, 2000);

// 由于lilei的基本工资固定，我们也可以把基本工资传入bind，使得之后的调用不在需要传入基本工资
const caculator2 = caculator.bind(lelei, 10000)
caculator2(1000, 2000);
caculator2(4000, 2000);

console.log('---------------------------------')

// 以上是bind的使用方法，我们现在来模拟实现以下bind吧～
Function.prototype.myBind = function(obj, ...arr1) {
  console.log('这是我们自己实现的bind方法');
  // 先获得将来调用bind()的.前的原函数，保存在一个局部变量中
  var fun = this; // 这里的this，就是将来的caculator 
  return function(...arr2) {
   fun.call(obj, ...arr1, ...arr2);
  }
}
// 将来调用函数.bind()时
// this -> 先得到.前的原函数
// this将原函数对象的地址保存在局部变零fun中
// 因为返回的内层函数中，使用了才外层函数bind的局部变量fun
// 所以，形成了闭包！这次返回的内层函数中，就永久包含了对原函数的调用语句。
// 所以，调用返回的内层函数，就等效于调用原函数。

const caculator3 = caculator.myBind(lelei, 10000)
caculator3(1000, 2000);
caculator3(4000, 2000);
