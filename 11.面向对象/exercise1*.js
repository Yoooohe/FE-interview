var a = { n: 1 }; // a中保存一个内存地址0x1234，指向内存中的{ n: 1 }
var b = a; // b中要保存了一个0x1234的地址
a.x = a = { n: 2 };
// 该行表达式遵循从左 -> 右边解析，等号再遵循从右 -> 左执行
// 从左 -> 右解析会将需要拿到a中属性的a.x 替换成0x1234.x
// 而第二个a不需要获取内部元素所以没有进行替换依旧为a
// 最后的 { n : 2 } 会再次创建一个内存地址0x9091，指向这个对象
// 变成：0x1234.x = a = 0x9091
// 需要注意一点：赋值表达式也有返回，它会返回等号左边得到的值
// 最终变成：a=0x9091, 0x1234.x = 0x9091
console.log(a); // { n: 2 }
console.log(b); // { n: 1, x: { n: 2 } }
a.n = 3;
console.log(b); // { n: 1, x: { n: 3 } }
console.log(a); // { n: 3 }
