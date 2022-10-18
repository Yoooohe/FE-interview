// setTimeout(() => {
//   console.log("---20----");
// }, 1);

// setTimeout(() => {
//   const a = 1;
//   console.log("--10--");
//   return () => {
//     return a;
//   };
// }, 0);

// a = 1;
// console.log(a);
// let a;

// var a = {
//   'one':1,
//   'two':2,
// }

// function fn(b){
//   console.log(a === b)
// }

// fn(a)
// console.log(a)

class UserModel {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  say() {
    return this.firstname + this.lastname;
  }
}

const user = new UserModel("h", "z");

function shallowCopy(user) {
  let resArgs = [];
  for (let key in user) {
    resArgs.push(user[key]);
  }
  let res = new user.constructor(...resArgs);
  return res;
}

const copy = shallowCopy(user);
console.log(copy);
