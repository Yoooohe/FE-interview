let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "build"),
  },
  // devServer会帮我们起一个服务来做中层代理
  // devServer是node写的，它相当于一个中间件帮我们实现了跨域请求
  // 和node中间件代理差不多
  devServer: {
    port: 3000,
    progress: true,
    contentBase: "./build",
    // 在这里配置跨域处理
    proxy: {
      "/": {
        target: "http://127.0.0.1:91",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
