import { createApp, watch, onBeforeMount } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { createI18n } from "vue-i18n";
import { ContextMenu } from "@htmlos/contextmenu";
import "@htmlos/contextmenu/dist/contextmenu.css";

import { messages } from "./i18n";

const i18n = createI18n({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  locale: (navigator.language || navigator.userLanguage).split("-")[0], // set locale
  fallbackLocale: "en", // set fallback locale
  messages: messages, // set locale messages
});

ContextMenu.config({
  i18n: (s): string => {
    return i18n.global.t(s).toString();
  },
});

const app = createApp(App);

app
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .use(i18n)
  .use({
    install(app) {
      app.config.globalProperties.$menu = ContextMenu;
    },
  })
  .mount("#app");
