define(["dataService", "jquery"], function (dataService, $) {
  let name = "Tom";
  function showMsg() {
    alert(dataService.getMsg() + ", " + name);
  }
  // 暴露模块
  $("body").css("background", "green");
  return { showMsg };
});
