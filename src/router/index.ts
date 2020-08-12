import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/blog/Blog.vue")
  },
  {
    path: "/desktop",
    name: "Desktop",
    component: () => import("@/views/desktop/Desktop.vue")
  },
  {
    path: "/",
    redirect: "/desktop"
  },
  {
    path: "*",
    component: () => import("@/views/error/404.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
