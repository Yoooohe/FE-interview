// JS 实现一个带并发限制的异度调度器 Scheduler，保证同时运行的任务最多有两个。
// 完善下面代码中的 Scheduler 类，使得以下程序能正确输出。

// class Scheduler {
//   add(promiseMaker) {}
// }

// const timeout = (time) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });

// const scheduler = new Scheduler();
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time).then(() => console.log(order)));
// };

class Scheduler {
  #waitTasks;
  #executingTasks;
  #maxExecutingNum;
  constructor() {
    this.#waitTasks = [];
    this.#executingTasks = [];
    this.#maxExecutingNum = 2;
  }
  add(promiseMaker) {
    if (this.#executingTasks.length < this.#maxExecutingNum) {
      this.run(promiseMaker);
    } else {
      this.#waitTasks.push(promiseMaker);
    }
  }
  run(promiseMaker) {
    const len = this.#executingTasks.push(promiseMaker);
    const index = len - 1;
    promiseMaker().then(() => {
      this.#executingTasks.splice(index, 1);
      if (this.#waitTasks.length > 0) {
        this.run(this.#waitTasks.shift());
      }
    });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。
