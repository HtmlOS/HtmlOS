import Vue from "vue";

import "../styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar } from "quasar";

import Intl from "./i18n";
import Bcp47 from "./bcp47";

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {}
});

class QuasarV {
  static readonly languages: Array<string> = [];

  static findLanguage(lang: string) {
    lang = Bcp47.localize(lang);
    for (const ql of this.languages) {
      if (lang === Bcp47.localize(ql)) {
        return ql;
      }
    }
  }
  static setLanguage(lang: string) {
    const l = this.findLanguage(lang);
    if (l) {
      import(`quasar/lang/${l}`).then(lang => {
        Quasar.lang.set(lang.default);
      });
    } else {
      console.log(`not found language <${lang}> match in quasar`);
    }
  }
}

// 动态检索 Quasar 支持的语言名称
const files = require.context("quasar/lang/", true, /.+\.js$/);
files.keys().forEach(key => {
  // 加载
  const path = key.substr(2);
  const name = path.substr(0, path.indexOf("."));
  QuasarV.languages.push(name);
});

// 设置 Quasar 初始语言与 Intl 初始语言相同
QuasarV.setLanguage(Intl.locale);
// 添加语言变化监听, 当 Intl 语言变化时, 同步更新 Quasar 语言
Intl.addLocaleChangedListener((lang: string) => {
  QuasarV.setLanguage(lang);
});
