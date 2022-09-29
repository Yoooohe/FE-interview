var a = {}; // 0x1234
var b = { key: "a" }; // 0x9091
var c = { key: "c" }; // 0x2345

// 所有对象底层都是关联数组，所有关联数组的属性名/下标都是字符串
// 所以 a[b]中的b会被隐式专成字符串，b.toString() -> "[object Object]"
a[b] = "123"; // -> a["[object Object]"] = "123"
a[c] = "456"; // -> a["[object Object]"] = "456"

console.log(a[b]); // -> a["[object Object]"] -> "456"
