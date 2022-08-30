// js中存在两大数据类型: 基本类型 & 引用类型
// 基本类型数据保存在栈内存中
// 引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中

// 浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝
// 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址
// 即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

// 简单实现一个浅拷贝
function shallowClone(obj) {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

const person = {
  name: "Alice",
  age: 18,
  nature: ["smart", "good"],
  school: {
    name: "UNC",
    rank: 30,
    location: {
      latitude: 122,
      longitude: 100,
    },
  },
  sayHi: function () {
    console.log("Hello, my name is Alice!");
  },
};

const stringArr = ["one", "two", "three"];

const person_clone1 = shallowClone(person);
const person_clone2 = Object.assign({}, person);
const person_clone3 = { ...person };

const stringArr_clone1 = stringArr.slice();
const stringArr_clone2 = stringArr.concat();
const stringArr_clone3 = [...stringArr];

person.school.rank = 2;
console.log(person_clone3);

// 在JavaScript中，存在浅拷贝的现象有：

// Object.assign
// Array.prototype.slice(), Array.prototype.concat()
// 使用拓展运算符实现的复制
