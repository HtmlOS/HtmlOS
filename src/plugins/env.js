"use strict";

const AppEnv = JSON.parse(process.env.VUE_APP_ENV || "{}");

//数组扩展contains适用于数组判断
Object.defineProperty(Array.prototype, "contains", {
  value: function (o) {
    for (const item of this) {
      if (o === item) {
        return true;
      }
    }
    return false;
  },
});

if (!Object.prototype.hasOwnProperty.call(Date.prototype, "format")) {
  // 扩展日期格式化方法
  Object.defineProperty(Date.prototype, "format", {
    value: function (fmt) {
      const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
  });
}

exports.default = AppEnv;
