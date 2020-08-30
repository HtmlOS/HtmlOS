import Vue from "vue";

class Config {
  public static install(Vue: any) {
    Vue.prototype.$cfg = {};
  }
}

export default Config;
