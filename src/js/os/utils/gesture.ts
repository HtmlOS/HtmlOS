"use strict";

import { Point } from "@/js/os/utils/point";

export class MoveHelper {
  private readonly enabled: boolean;
  private readonly onMove: (e: Event) => void;
  private readonly onStop: (e: Event) => void;

  private readonly moveHook?: (shift: Point, point: Point) => void;
  private readonly dropHook?: () => void;

  private lastPoint?: Point;

  constructor(
    moveHook: (shift: Point, point: Point) => void,
    dropHook: () => void,
    enabled: boolean
  ) {
    this.enabled = enabled;
    this.moveHook = moveHook;
    this.dropHook = dropHook;
    this.onMove = (e: Event) => {
      this.move(e);
    };
    this.onStop = (e: Event) => {
      if (this.dropHook) {
        this.dropHook();
      }
      this.stop(e);
    };
  }

  /**
   * start helper
   * @param e mousedown event
   */
  public start(e: Event): void {
    if (!this.enabled) {
      return;
    }
    this.lastPoint = undefined;
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.onStop);
    window.addEventListener("mouseleave", this.onStop);
  }

  private move(e: Event) {
    if (!this.enabled) {
      return;
    }
    const point = Point.fromEvent(e);
    if (!point) {
      return;
    }
    if (this.lastPoint) {
      const moveX = point.x - this.lastPoint.x;
      const moveY = point.y - this.lastPoint.y;
      const shift = new Point(moveX, moveY);
      if (this.moveHook) {
        this.moveHook(shift, point);
      }
    }
    this.lastPoint = point;
  }

  private stop(_e: Event) {
    if (!this.enabled) {
      return;
    }
    this.lastPoint = undefined;
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onStop);
    window.removeEventListener("mouseleave", this.onStop);
  }
}
