"use strict";

// process.env.VUE_APP_ENV = JSON.stringify(require("./vue.env").default);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  // 基本路径
  // publicPath: "./",

  // assetsDir: "static",
  productionSourceMap: false,
  filenameHashing: true,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: {
    plugins: [],
  },

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: (config) => {
    // 添加`md`文件`loader`支持
    config.module
      .rule("md")
      .test(/\.md$/)
      .pre()
      .include.add(path.resolve(__dirname, "./"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  },

  // 向 PWA 插件传递选项
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon16: "favicon.ico",
      favicon32: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
};
