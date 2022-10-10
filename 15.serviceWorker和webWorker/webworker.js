// 监听主线程传过来的信息
self.onmessage = (e) => {
  console.log("webworker receive:", e.data);
};

let n = 0;
setInterval(() => {
  self.postMessage(n++);
}, 1000);
