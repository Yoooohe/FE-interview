const express = require("express");

// 90端口的服务 将当前目录作为http服务，当前目录不指定的话默认是index.html
const app1 = express();
app1.use(express.static(__dirname));
app1.listen(90);

// 91端口服务 返回数据
const app2 = express();

// 后台修改响应头
app2.get("/user", function (req, res) {
  res.send("hello1");
});

app2.listen(91);
