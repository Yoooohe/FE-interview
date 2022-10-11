const express = require("express");

// 90端口的服务 将当前目录作为http服务，当前目录不指定的话默认是index.html
const app1 = express();
app1.use(express.static(__dirname));
app1.listen(90);

// 91端口服务 返回数据
const app2 = express();

app2.get("/", function (req, res) {
  const funcName = req.query.callback;
  res.send(funcName + "('hello2')");
  // f("你好")
});

app2.listen(91);
