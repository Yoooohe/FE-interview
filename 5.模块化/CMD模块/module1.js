define(function (require, exports, module) {
  // 内部变量
  var data = "www.baidu.com";
  // 内部函数
  function show() {
    console.log("module1 show() " + data);
  }
  exports.show = show;
});
