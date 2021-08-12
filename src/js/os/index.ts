"use strict";

import { App, OS } from "./types";
import { EmbeddedOS } from "@/js/os/impl";

const os: OS = new EmbeddedOS();

const apps: Array<App> = [
  new App(
    "os.app.Browser",
    require("@/assets/images/icon/google.png"),
    "/app/browser"
  ),
  new App(
    "os.app.Player",
    require("@/assets/images/icon/player.png"),
    "/app/player"
  ),
  new App(
    "os.app.Editor",
    require("@/assets/images/icon/editor.png"),
    "/app/editor"
  ),
  new App("os.app.Blog", require("@/assets/images/icon/blog.png"), "/blog"),
];

apps.forEach((it) => os.am.installed.push(it));

export default os;
