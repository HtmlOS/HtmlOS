"use strict";

const heartCssName = "_love_heart_";
const heartClassName = heartCssName;

export const LoveHeart = {
  addHeart: function(event: any, anchor = document.body) {
    const divHeart: any = document.createElement("div");
    divHeart.className = heartClassName;
    divHeart.infos = {
      x: event.clientX - 5,
      y: event.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor()
    };
    // document.addEventListener("contextmenu", function(event) {
    //   const e = event || window.event;
    //   e.preventDefault();
    //   e.stopPropagation();
    //   e.cancelBubble = true;
    //   e.returnValue = false;
    // });

    anchor.appendChild(divHeart);

    function randomColor() {
      return (
        "rgb(" +
        ~~(Math.random() * 255) +
        "," +
        ~~(Math.random() * 255) +
        "," +
        ~~(Math.random() * 255) +
        ")"
      );
    }
  },
  attach: function() {
    const win: any = window;
    win.requestAnimationFrame = (function() {
      return (
        win.requestAnimationFrame ||
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.oRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function(callback: any) {
          setTimeout(callback, 1000 / 60);
        }
      );
    })();

    document.body.addEventListener("click", this.addHeart);

    init();

    function init() {
      css(
        "." +
          heartCssName +
          "{" +
          "z-index: 999999999;" +
          "pointer-events: none;" +
          "width: 10px;" +
          "height: 10px;" +
          "position: fixed;" +
          "background: #f00;" +
          "transform: rotate(45deg);" +
          "-webkit-transform: rotate(45deg);" +
          "-moz-transform: rotate(45deg);" +
          "}" +
          "." +
          heartCssName +
          ":after," +
          "." +
          heartCssName +
          ":before{" +
          "content: '';" +
          "width: inherit;" +
          "height: inherit;" +
          "background: inherit;" +
          "border-radius: 50%;" +
          "-webkit-border-radius: 50%;" +
          "-moz-border-radius: 50%;" +
          "position: absolute;" +
          "}" +
          "." +
          heartCssName +
          ":after{top: -5px;}" +
          "." +
          heartCssName +
          ":before{left: -5px;}"
      );
      gameloop();
    }

    function gameloop() {
      const hearts = document.getElementsByClassName(heartCssName);
      for (let i = 0; i < hearts.length; i++) {
        const element: any = hearts[i];
        const heart = element.infos;

        if (heart.alpha <= 0) {
          document.body.removeChild(element);
          continue;
        }
        heart.y--;
        heart.scale += 0.004;
        heart.alpha -= 0.013;
        element.style.cssText =
          "left:" +
          heart.x +
          "px;top:" +
          heart.y +
          "px;opacity:" +
          heart.alpha +
          ";transform:scale(" +
          heart.scale +
          "," +
          heart.scale +
          ") rotate(45deg);background:" +
          heart.color;
      }
      requestAnimationFrame(gameloop);
    }

    function css(css: any) {
      const style: any = document.createElement("style");
      style.type = "text/css";
      try {
        style.appendChild(document.createTextNode(css));
      } catch (ex) {
        style.styleSheet.cssText = css;
      }
      document.getElementsByTagName("head")[0].appendChild(style);
    }
  },
  detach: function() {
    document.body.removeEventListener("click", this.addHeart);
    const hearts = document.getElementsByClassName(heartClassName);
    for (let i = 0; i < hearts.length; i++) {
      const element = hearts[i];
      document.body.removeChild(element);
    }
  }
};
