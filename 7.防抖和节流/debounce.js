// 定义：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
// 思路：每次触发事件时都取消之前的延时调用方法。
// 这里是apply是为改变this指向，使其指向调用debounce方法的对象，这里的例子则是input dom

function debounce(fn) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      // fn(); // 打印出来的this为window
    }, 500);
  };
}

// 我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function anotherDebounce(fn, wait = 500, immediate = true) {
  let timeout;
  return function () {
    timeout && clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      // 这里可以使得timeout一直有值，直到wait时间之后，
      // 因此可以保证已经执行过的，在一段wait时间内不再执行
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        fn.apply(this, arguments);
      }
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  };
}

function sayHi() {
  console.log(this);
  console.log("防抖成功");
}

var inp1 = document.getElementById("inp1");
inp1.addEventListener("input", anotherDebounce(sayHi)); // 防抖
