"use strict";

import { Rect } from "@/js/os/utils/rect";
import { Utils } from "@/js/os/utils/utils";

export class App {
  name: string;
  icon: string;
  url: string;
  mimeTypes?: Array<string>;

  constructor(
    name: string,
    icon: string,
    url: string,
    mimeTypes?: Array<string>
  ) {
    this.name = name;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.icon = icon["default"] || icon;
    this.url = url;
    this.mimeTypes = mimeTypes;
  }
}

export interface AppManager {
  readonly installed: Array<App>;

  findAll(): Array<App>;

  findByMimeType(mimeType: string): Array<App>;
}

export interface FormState {
  minimized: boolean;
  maximized: boolean;
  fullscreen: boolean;
}

export class Form {
  uid: string;
  os: OS;
  app: App;
  rect: Rect;
  state: FormState;
  params?: never;
  manager?: FormManager;
  zIndex: number;

  constructor(os: OS, app: App, rect?: Rect, params?: never) {
    this.uid = Utils.uuid();
    this.os = os;
    this.app = app;
    this.rect = rect || this.getDefaultRect();
    this.params = params;
    this.state = {
      minimized: false,
      maximized: false,
      fullscreen: false,
    };
    this.zIndex = 1;
  }

  getDefaultRect(): Rect {
    const clientRect = Utils.getClientRect();
    const w = (clientRect.w * 2) / 3;
    const h = (clientRect.h * 2) / 3;

    const x = (clientRect.w - w) / 2;
    const y = (clientRect.h - h) / 2;
    return new Rect(
      Math.ceil(Math.random() * x),
      Math.ceil(Math.random() * y),
      w,
      h
    );
  }

  fixRect() {
    const clientRect = Utils.getClientRect();
    const titleHeight = this.os.settings.desktop.form.titleHeight;
    const panelHeight = this.os.settings.desktop.panel.height;
    const edge = 8;
    const fixed = 16;
    let preX = this.rect.x;
    let preY = this.rect.y;
    if (preX + this.rect.w < edge) {
      preX = fixed - this.rect.w;
    } else if (preX > clientRect.w - edge) {
      preX = clientRect.w - fixed;
    }
    if (preY + titleHeight < edge) {
      preY = fixed;
    } else if (preY > clientRect.h - panelHeight - edge) {
      preY = clientRect.h - panelHeight - titleHeight - fixed;
    }
    this.rect.x = preX;
    this.rect.y = preY;
  }

  normalize(): void {
    this.state.minimized = false;
    this.state.maximized = false;
    this.state.fullscreen = false;
    this.focus();
  }

  minimize(): void {
    this.state.minimized = true;
  }

  maximize(): void {
    this.state.maximized = true;
    this.focus();
  }

  fullscreen(): void {
    this.state.fullscreen = true;
    this.focus();
  }

  close(): void {
    if (this.manager) {
      this.manager.close(this);
    }
  }

  focus(): void {
    if (this.manager) {
      if (this.zIndex === this.manager.stacks.length) {
        return;
      }
      for (const item of this.manager.stacks) {
        if (item.zIndex > this.zIndex) {
          item.zIndex--;
        }
      }
      this.zIndex = this.manager.stacks.length;
    }
  }
}

export interface FormManager {
  readonly stacks: Array<Form>;

  indexOf(form: Form): number;

  open(form: Form): void;

  close(form: Form): void;
}

export interface Settings {
  locale: {
    language: string;
  };
  desktop: {
    background: {
      images: Array<string>;
    };
    form: {
      titleColor: string;
      titleHeight: number;
      minWidth: number;
      minHeight: number;
      shielding: boolean;
    };
    panel: {
      color: string;
      height: number;
    };
  };
}

export interface OS {
  id: string;

  platform: {
    is: {
      mobile: boolean;
    };
  };

  am: AppManager;

  fm: FormManager;

  settings: Settings;

  utils: Utils;
}
