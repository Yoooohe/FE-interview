// 定义：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
// 思路：每次出触发事件时都判断当前是否有等待执行的延时函数。

function throttle(fn, wait) {
  let timeout;
  return function () {
    if (timeout) return;
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      timeout = null;
    }, wait);
  };
}

function sayHi() {
  console.log(this);
  console.log("节流成功");
}

var inp2 = document.getElementById("inp2");
inp2.addEventListener("input", throttle(sayHi, 1000)); // 节流
