function Animal(name) {
  this.name = name;
  this.say = function () {};
}
Animal.prototype.eat = function (food) {};

// 1. 原型链式继承
// 缺点：子类在实例化的时候不能给父类构造函数传参
function Cat1() {
  Cat1.prototype = new Animal();
  Cat1.prototype.name = "cat";
}

const cat1 = new Cat1();

// 2. 构造函数继承
function Cat2(name, age) {
  Animal.call(this, name);
  this.age = age;
}
const cat2 = new Cat2("cat", 6);
console.log(cat2);
