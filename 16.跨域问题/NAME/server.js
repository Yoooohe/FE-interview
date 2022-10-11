const express = require("express");

const app1 = express();
// 处理静态资源文件请求
app1.use(express.static(__dirname));
app1.listen(1001, () => {
  console.log("1001 ok");
});

const app2 = express();
// 处理静态资源文件请求
app2.use(express.static(__dirname));
app2.listen(1002, () => {
  console.log("1002 ok");
});
