"use strict";

const Utils = require("./utils").Utils;

class Form {
  constructor(app, params) {
    const clientRect = Utils.getClientRect();
    this.app = app;
    this.params = params;
    this.w = clientRect.w / 2;
    this.h = clientRect.h / 2;
    this.x = (clientRect.w - this.w) / 2; // 居中
    this.y = (clientRect.h - this.h) / 2; // 居中
  }
}

module.exports = {
  Form,
};
