/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
      fireKeyEvent(document, "sw.download", 0);
    },
    updated() {
      console.log("New content is available; please refresh.");
      fireKeyEvent(document, "sw.updated", 0);
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}

const fireKeyEvent = function(el: any = window, evtType: any, keyCode: any) {
  const doc = el.ownerDocument || document;
  const win = doc.defaultView || doc.parentWindow;
  let evtObj;
  if (doc.createEvent) {
    if (win.KeyEvent) {
      evtObj = doc.createEvent("KeyEvents");
      evtObj.initKeyEvent(
        evtType,
        true,
        true,
        win,
        false,
        false,
        false,
        false,
        keyCode,
        0
      );
    } else {
      evtObj = doc.createEvent("UIEvents");
      Object.defineProperty(evtObj, "keyCode", {
        get: function() {
          return this.keyCodeVal;
        }
      });
      Object.defineProperty(evtObj, "which", {
        get: function() {
          return this.keyCodeVal;
        }
      });
      evtObj.initUIEvent(evtType, true, true, win, 1);
      evtObj.keyCodeVal = keyCode;
    }
    el.dispatchEvent(evtObj);
  } else if (doc.createEventObject) {
    evtObj = doc.createEventObject();
    evtObj.keyCode = keyCode;
    el.fireEvent("on" + evtType, evtObj);
  }
};
