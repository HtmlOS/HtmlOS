"use strict";

const Utils = {
  getClientRect() {
    let winWidth, winHeight;
    if (window.innerWidth) winWidth = window.innerWidth;
    else if (document.body && document.body.clientWidth)
      winWidth = document.body.clientWidth;

    if (window.innerHeight) winHeight = window.innerHeight;
    else if (document.body && document.body.clientHeight)
      winHeight = document.body.clientHeight;

    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      winHeight = document.documentElement.clientHeight;
      winWidth = document.documentElement.clientWidth;
    }
    return {
      x: 0,
      y: 0,
      w: winWidth,
      h: winHeight,
    };
  },
};

module.exports = {
  Utils,
};
