(function () {
  require.config({
    baseUrl: "/5.模块化/AMD模块/", //基本路径 出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      //自定义模块
      alerter: "alerter", //此处不能写成alerter.js,会报错
      dataService: "dataService",
      // 第三方库模块
      jquery: "https://releases.jquery.com/git/jquery-2.x-git.min", //注意：不要加.js的扩展标识
    },
  });
  require(["alerter"], function (alerter) {
    alerter.showMsg();
  });
})();
