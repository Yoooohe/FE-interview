function f1(){
  var sum = 0;
  function f2(){
    sum++;
    return f2;
  }
  f2.valueOf = function(){
    return sum;
  }
  f2.toString = function(){
    return sum+"";
  }
  return f2;
}

console.log(+f1()) // 0
console.log(+f1()()) // 1
console.log(+f1()()()) // 2

// f()中函数的执行的优先级最高为21
// +运算符会强制调用对象的valueOf方法 - 这是js的规定
// f1()+'' 则会试图转成字符串, 因此会调用对象的toString方法。

