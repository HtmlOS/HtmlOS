"use strict";

import { Utils } from "@/js/os/utils/utils";

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromEvent(event: Event, prevent = true): Point | undefined {
    const e = event || window.event;
    if (prevent) {
      Utils.eventPrevent(e);
    }

    if (e instanceof MouseEvent) {
      const x: number = e.pageX || e.clientX;
      const y: number = e.pageY || e.clientY;
      return new Point(x, y);
    }
    return undefined;
  }
}
