"use strict";

export const languages = {};
export const messages = {};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defines = require("./index.json");
for (const item of defines) {
  const lang = item.lang;
  const isoName = item.isoName;
  const nativeName = item.nativeName;
  Object.defineProperty(languages, lang, {
    value: item,
    writable: true,
  });
}

const files = require.context("@/i18n", true, /\.\/.+\/.+\.json$/);
files.keys().forEach((it) => {
  const path = it.substr(2);
  // 获取目录名
  const folder = path.split("/")[0];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = require("@/i18n/" + path);

  // 添加 到 messages 对象
  if (!Object.prototype.hasOwnProperty.call(messages, folder)) {
    Object.defineProperty(messages, folder, {
      value: {
        languages: languages,
      },
      writable: true,
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.assign(messages[folder], data);
});
