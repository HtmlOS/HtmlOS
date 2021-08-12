import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/blog",
    component: () => import("@/views/blog/Blog.vue"),
  },
  {
    path: "/app",
    component: () => import("@/views/os/AppContainer.vue"),
    children: [
      {
        path: "browser",
        component: () => import("@/views/os/app/Browser.vue"),
      },
      {
        path: "editor",
        component: () => import("@/views/os/app/Editor.vue"),
      },
      {
        path: "player",
        component: () => import("@/views/os/app/Player.vue"),
      },
    ],
  },
  {
    path: "/os",
    component: () => import("@/views/os/OS.vue"),
  },
  {
    path: "/",
    redirect: "/os",
  },
  {
    path: "/:w+",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
