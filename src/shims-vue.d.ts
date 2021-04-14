export {}; // 这个必须有，将文件转化为模块

import Vue from "vue";

declare let window: Window;
declare let document: Document;

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// 声明全局方法
declare module "vue/types/vue" {
  interface Vue {
    $session: any;
    $intl: any; // @/i18n/index.ts
    $menu: any; // @/main.ts: contextmenu
  }
}

declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any;
  }
}
