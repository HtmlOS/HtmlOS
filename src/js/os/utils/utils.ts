"use strict";

import { Rect } from "@/js/os/utils/rect";

export class Utils {
  public static uuid(): string {
    const url = URL.createObjectURL(new Blob());
    const uuid = url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(url);
    return uuid.substr(uuid.lastIndexOf("/") + 1).replaceAll("-", "");
  }

  public static getClientRect(): Rect {
    let winWidth = -1,
      winHeight = 1;
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
    return new Rect(0, 0, winWidth, winHeight);
  }

  public static eventPrevent(e?: Event) {
    e = e || window.event;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
    }
  }

  public static openLocalFile(
    callback: (
      list: Array<{ url: string; type: string; name: string }>
    ) => void,
    multiple = false
  ): void {
    const element = document.createElement("input");
    element.setAttribute("multiple", "" + multiple);
    element.setAttribute("id", "_ef");
    element.setAttribute("type", "file");
    element.setAttribute("style", "visibility:hidden");
    document.body.appendChild(element);
    element.onchange = function () {
      const list: Array<{ url: string; type: string; name: string }> = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const files = this.files || [];
      if (!files || files.length === 0) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        if (file.type.indexOf("video/") === -1) {
          continue;
        }
        list.push({ url: url, type: file.type, name: file.name });
      }
      if (callback) {
        callback(list);
      }
    };
    element.click();
    document.body.removeChild(element);
  }

  public static getUrlQueries(): Map<string, string> {
    const url = location.href;
    const queries = url.substr(url.indexOf("?") + 1).split("$");
    const params = new Map<string, string>();
    for (const query of queries) {
      const pair = query.trim().split("=");
      const key = pair.length > 0 ? pair[0].trim() : undefined;
      const value = pair.length > 1 ? pair[1].trim() : undefined;
      if (key && value) {
        params.set(key, decodeURIComponent(value));
      }
    }
    return params;
  }
}
