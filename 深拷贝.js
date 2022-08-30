// 深拷贝开辟一个新的栈，两个对象属性完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性
// _.cloneDeep()
// jQuery.extend()
// JSON.stringify()
// 手写循环递归

const _ = require("lodash");
const $ = require("jquery");

const obj = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
const obj1 = _.cloneDeep(obj);
// const obj2 = jquery.extend({}, obj);
const obj3 = JSON.parse(JSON.stringify(obj));
// 但是这种方式存在弊端，会忽略undefined、symbol和函数

// console.log(obj3.b.f === obj.b.f);

// 手写递归循环
// 1. 基础版本
function cloneDeepBasic(target) {
  if (typeof target === "object") {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = cloneDeepBasic(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 问题：没有考虑到数组情况

// 2. 考虑数组
function cloneDeepWithArray(target) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = cloneDeepWithArray(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 问题：没有处理循环引用的场景

// 执行下面的这个测试用例
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;
// 我们会看到递归进入死循环导致内存溢出了
// 原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况
// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
// 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
// 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

// 这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：

// 检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆

// 3. 处理循环引用的版本
function cloneDeepWithRecursion(target, map = new Map()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = cloneDeepWithRecursion(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 可以看到，执行没有报错，且target属性，变为了一个Circular类型，即循环应用的意思

// 4. WeakMap提代Map来使代码达到画龙点睛的作用
function deepCloneFinal(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepCloneFinal(obj[key], hash);
    }
  }
  return cloneObj;
}
const obj4 = deepCloneFinal(target);

console.log(obj4);
