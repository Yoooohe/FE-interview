function myNew(Func, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, Object.getPrototypeOf(Func))
  // const obj = Object.create(Object.getPrototypeOf(Func))
  const result = Func.apply(obj, args);
  return result instanceof Object ? result : obj
}

function Person(ename, age) {
  this.ename = ename;
  this.age = age;
}

const p1 = new Person('Zhang San', 28)
console.log(p1)

const p2 = myNew(Person, 'Lei Si', 30);
console.log(p2)