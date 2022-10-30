export const addNum = (num1: number, num2: number) => {
  let sq1;
  let sq2;
  let m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
};

// 核心就是计算出两个浮点数最大的小数长度，
// 比如说 0.1 + 0.22 的小数最大长度为 2，
// 然后两数乘上 10 的 2次幂再相加得出数字 32，然后除以 10 的 2次幂即可得出正确答案 0.32。
