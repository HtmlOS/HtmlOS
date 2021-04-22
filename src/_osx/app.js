"use strict";

class App {
  constructor(name, icon, url, supportMimeTypes) {
    this.name = name;
    this.icon = icon;
    this.url = url;
    this.supportMimeTypes = supportMimeTypes;
  }
}

class AppManager {
  static install(app) {
    if (this.apps === undefined) {
      this.apps = [];
    }
    for (const item of this.apps) {
      if (item.name === app.name && item.url === app.url) {
        return;
      }
    }
    this.apps.push(app);
  }

  static findAll() {
    return this.apps || [];
  }

  static findByMimeType(mime) {
    const apps = [];
    for (const item of this.findAll()) {
      if (item.supportMimeTypes) {
        for (const mimeType of item.supportMimeTypes) {
          if (mimeType === mime) {
            apps.push(item);
          }
        }
      }
    }
    return apps;
  }
}

AppManager.install(
  new App(
    "Explorer",
    require("@/assets/images/icon/computer.png"),
    "/#/explorer"
  )
);
AppManager.install(
  new App("Browser", require("@/assets/images/icon/google.png"), "/#/browser")
);
AppManager.install(
  new App(
    "Editor",
    require("@/assets/images/icon/editor.png"),
    "/#/editor",
    "*"
  )
);
AppManager.install(
  new App(
    "Player",
    require("@/assets/images/icon/player.png"),
    "/#/player",
    "video/*"
  )
);
AppManager.install(
  new App(
    "Viewer",
    require("@/assets/images/icon/player.png"),
    "/#/viewer",
    "image/*"
  )
);
AppManager.install(
  new App("Blog", require("@/assets/images/icon/blog.png"), "/#/blog")
);

module.exports = {
  App,
  AppManager,
};
