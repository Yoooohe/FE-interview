// Generator函数和普通函数区别：
// 1. function关键字与函数名之间有一个星号
// 2. 函数体内部使用yield语句，定义不同的内部状态。
function* g1() {
  yield "a";
  yield "b";
  yield "c";
  return "ending";
}
// 并不会执行g函数，也不会返回函数的运行结果，
// 而是返回一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）
var gen1 = g1();
gen1.next(); // 返回Object {value: "a", done: false}
gen1.next(); // {value: "b", done: false}
gen1.next(); // {value: "c", done: false}
gen1.next(); // {value: "ending", done: true}

// 每调用一次Generator函数，就会返回一个迭代器对象，代表Generator函数的内部指针。
// 每个迭代器对象之间互不干扰，作用域独立。
// 以后，每次调用迭代器对象的next方法，就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；
// done属性是一个布尔值，表示是否遍历结束。

// 注意：yield语句只能用于function的作用域，如果function的内部还定义了其他的普通函数，则函数内部不允许使用yield语句。

// next方法可以有参数
// next方法参数的作用，是为上一个yield语句赋值。
// 由于yield永远返回undefined，这时候，如果有了next方法的参数，yield就被赋了值，
// 比如下例，原本a变量的值是0，但是有了next的参数，a变量现在等于next的参数，也就是11。
function* g2() {
  var o = 1;
  var a = yield o++;
  console.log("a = " + a);
  var b = yield o++;
}
var gen2 = g2();

console.log(gen2.next());
console.log("------");
console.log(gen2.next(11));

// 首先说，console.log(gen.next());的作用就是输出了{value: 1, done: false}，注意var a = yield o++;，由于赋值运算是先计算等号右边，然后赋值给左边，所以目前阶段，只运算了yield o++，并没有赋值。
// 然后说，console.log(gen.next(11));的作用，首先是执行gen.next(11)，得到什么？首先：把第一个yield o++重置为11，然后，赋值给a，再然后，console.log('a = ' + a);，打印a = 11，继续然后，yield o++，得到2，最后打印出来。
// 从这我们看出了端倪：带参数跟不带参数的区别是，带参数的情况，首先第一步就是将上一个yield语句重置为参数值，然后再照常执行剩下的语句。总之，区别就是先有一步先重置值，接下来其他全都一样。

// for...of循环
// for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。for...of循环的基本语法是：
for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

function* foo() {
  yield "a";
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
// 上面代码使用for...of循环，依次显示5个yield语句的值。
// 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，
// 且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

// 使用Generator和for...of循环实现一个斐波那契额数列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    // 没有设置循环结束条件
    [prev, curr] = [curr, curr + prev];
    yield curr;
  }
}
for (let n of fibonacci()) {
  if (n > 1000) break;
  // console.log(n);
}
