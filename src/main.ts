import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Quasar
import { LoadingBar } from "./plugins/quasar";
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});
router.afterEach(() => {
  LoadingBar.stop();
});

// 国际化
import Intl from "@/plugins/i18n";
import VueI18n from "vue-i18n";

Vue.use(Intl);
Vue.use(VueI18n);
const i18n = new VueI18n({
  fallbackLocale: "en",
  locale: Intl.locale,
  messages: Intl.messages
});

// 右键菜单
import ContextMenu from "@htmlos/contextmenu";
import "@htmlos/contextmenu/dist/contextmenu.css";
Vue.use({
  install: Vue => {
    Vue.prototype.$menu = ContextMenu;
  }
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),

  created: function() {
    // this.$os.bind(this);
    this.$intl.bind(this);
    ContextMenu.config({
      i18n: (s): string => {
        return this.$t(s).toString();
      }
    });
    document.title = this.$t("site.name").toString();
  },

  watch: {
    "i18n.locale": function() {
      document.title =
        this.$route.meta.title ||
        this.$route.meta.pathName ||
        this.$t("site.name");
    }
  }
}).$mount("#app");
