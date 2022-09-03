(function () {
  require.config({
    baseUrl: "/", //基本路径 出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      //自定义模块
      alerter: "9.2.AMD模块", //此处不能写成9.2.AMD模块.js,会报错
      dataService: "9.1.AMD模块",
      // 第三方库模块
      jquery: "https://releases.jquery.com/git/jquery-2.x-git.min", //注意：不要加.js的扩展标识
    },
  });
  require(["alerter"], function (alerter) {
    alerter.showMsg();
  });
})();
