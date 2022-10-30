class Stack {
  #length;
  #stack;
  constructor() {
    this.#length = 0;
    this.#stack = [];
    Object.defineProperty(this, "stack", {
      value: this.#stack,
      writable: false,
    });
  }
  push(val) {
    this.#stack.push(val);
    this.#length++;
  }
  pop() {
    this.#length--;
    return this.#stack.pop();
  }
}
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.stack);
console.log(stack.length);
