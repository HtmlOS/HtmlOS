"use strict";

import Vue from "vue";
import Bcp47 from "./bcp47";

// https://docs.microsoft.com/en-us/windows/uwp/publish/supported-languages
const INDEX = require("../i18n/index.json");

class IntlCache {
  languages: any = {};
  messages: any = {};
  locale: string = Bcp47.localize(navigator.language);

  constructor() {
    this.loadLanguages();
    this.loadMessages();
    this.check();
  }

  private loadLanguages() {
    const map: any = {};
    INDEX.forEach((lang: any) => {
      lang.tags.split(",").forEach((tag: string) => {
        const locale = Bcp47.localize(tag);
        map[locale] = lang.nativeName;
      });
    });
    this.languages = map;
  }

  private loadMessages() {
    // 遍历当前目录下(包含子目录)所有语言翻译文件
    const files = require.context("../i18n/", true, /\.\/.+\/.+\.json$/);
    files.keys().forEach((key) => {
      // 加载
      const path = key.substr(2);
      const lang = require("../i18n/" + path);
      // 获取目录名
      const dir = path.substr(0, path.indexOf("/"));

      if (!Object.prototype.hasOwnProperty.call(this.languages, dir)) {
        console.error(
          `found language dir [${dir}], but does not defined in index.json`
        );
      }

      // 添加 到 messages 对象
      if (Object.prototype.hasOwnProperty.call(this.messages, dir)) {
        Object.assign(this.messages[dir], lang);
      } else {
        this.messages[dir] = lang;
        this.messages[dir]["languages"] = this.languages;
      }
    });
  }

  private check() {
    for (const key in this.languages) {
      if (!Object.prototype.hasOwnProperty.call(this.messages, key)) {
        console.error(
          `found language [${key}] defined in index.json, but messages not found `
        );
        delete this.languages[key];
      }
    }
  }
}

class Intl {
  static app: any;
  static cache = new IntlCache();
  static listeners: Array<(lang: string) => void> = [];

  static install(Vue: any) {
    Vue.prototype.$intl = this;
  }

  static bind(app: Vue) {
    this.app = app;
  }

  static get languages() {
    return this.cache.languages;
  }
  static get messages() {
    return this.cache.messages;
  }

  static get locale() {
    return this.cache.locale;
  }
  static set locale(value) {
    // 修改 Intl 缓存
    this.cache.locale = value;
    // 修改 Vue-I18n
    this.app.$i18n.locale = value;
    // 回调所有监听
    for (const listener of this.listeners) {
      listener(value);
    }
  }

  static addLocaleChangedListener(listener: (lang: string) => void) {
    this.listeners.push(listener);
  }
}
export default Intl;
