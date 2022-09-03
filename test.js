setTimeout(() => {
  console.log("---20----");
}, 1);

setTimeout(() => {
  const a = 1;
  console.log("--10--");
  return () => {
    return a;
  };
}, 0);

a = 1;
console.log(a);
let a;
