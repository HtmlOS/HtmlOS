"use strict";

import { App, AppManager, Form, FormManager, OS } from "../types";
import { Utils } from "@/js/os/utils/utils";

import { Platform } from "quasar";

class EmbeddedAppManager implements AppManager {
  readonly installed: App[] = [];

  findAll(): Array<App> {
    return this.installed;
  }

  findByMimeType(mimeType: string): Array<App> {
    return [];
  }
}

class EmbeddedFormManager implements FormManager {
  readonly stacks: Form[] = [];

  indexOf(form: Form): number {
    let index = -1;
    if (form) {
      for (const item of this.stacks) {
        index++;
        if (item === form || item.uid === form.uid) {
          return index;
        }
      }
    }
    return -1;
  }

  close(form: Form): void {
    const index = this.indexOf(form);
    if (index >= 0) {
      this.stacks.splice(index, 1);
    }
  }

  open(form: Form): void {
    form.manager = this;
    form.zIndex = this.stacks.length + 1;
    this.stacks.push(form);
  }
}

export class EmbeddedOS implements OS {
  id = "Embedded";

  platform = {
    is: {
      mobile: Platform.is.mobile,
    },
  };

  am = new EmbeddedAppManager();

  fm = new EmbeddedFormManager();

  settings = {
    locale: {
      language: navigator.language.split("-")[0],
    },
    desktop: {
      background: {
        images: [
          require("@/assets/images/background/bg1.jpg"),
          require("@/assets/images/background/bg2.jpg"),
        ],
      },
      form: {
        titleHeight: 32,
        titleColor: "#FFFFFF",
        minWidth: 196,
        minHeight: 169,
        shielding: false,
      },
      panel: {
        color: "#99999999",
        height: 48,
      },
    },
  };

  utils = Utils;
}
