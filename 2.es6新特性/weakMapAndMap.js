// process.arch获取到系统是32位还是64位
// process.platform可获取系统的类型
// process.memoryUsage()可以获取当前进程的内存使用情况，它有三个方法：
// rss：常驻内存大小；
// heapTotal：动态分配的可用内存；
// heapUsed：已使用堆大小。
// 注：输出数字单位是字节。除1024获取的是KB，再除1024获取的是MB，再除1024获取的是GB。

function usedSize() {
  const used = process.memoryUsage().heapUsed;
  return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

// 1. map的内存占用测试：
global.gc();
console.log("map初始内存占用: ", usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 1.93M

let map = new Map();
let a = new Array(5 * 1024 * 1024); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为42.23M左右
map.set(a, "weakMap&map测试");

console.log("在map中加入元素a后的内存占用: ", usedSize());

a = null;
global.gc();

console.log("将map中b置为null后的内存占用: ", usedSize()); // 3 将b置为空以后，heapUsed 仍为41.82M，说明Map中的那个长度为5*1024*1024的数组依然存在

// 2. weakMap的内存占用测试：
global.gc();
console.log("weakmap初始内存占用: ", usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 1.64M

let weakMap = new WeakMap();
let b = new Array(5 * 1024 * 1024);
weakMap.set(b, "weakMap&map测试");

console.log("在weakmap中加入元素b后的内存占用: ", usedSize());

b = null;
global.gc();

console.log("将map中b置为null后的内存占用: ", usedSize());
