// 全局函数，随处都可以调用
function fun(n, o) {
  console.log(o) // 输出第二个参数值
  return {
    fun: function(m) {
      return fun(m, n) // 只把第一个参数值给孩子
    }
  }
}

var a = fun(0); // undefined
a.fun(1) // 0
a.fun(2); // 0
a.fun(3) // 0

var b = fun(0).fun(1).fun(2).fun(3)
// undefined 0 1 2

var c = fun(0).fun(1)
c.fun(2)
c.fun(3);

// undefined 0
// 1
// 1


