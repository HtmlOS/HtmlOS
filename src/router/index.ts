import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/article",
    name: "Article",
    component: () => import("@/views/blog/BlogArticle.vue")
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/blog/Blog.vue"),
    children: [
      {
        path: "articles",
        name: "BlogArticles",
        component: () => import("@/views/blog/BlogArticles.vue")
      },
      {
        path: "archive",
        name: "BlogArchive",
        component: () => import("@/views/blog/BlogArchive.vue")
      },
      {
        path: "tags",
        name: "BlogTags",
        component: () => import("@/views/blog/BlogTags.vue")
      },
      {
        path: "about",
        name: "BlogAbout",
        component: () => import("@/views/blog/BlogAbout.vue")
      }
    ],
    redirect: "/blog/articles"
  },
  {
    path: "/desktop",
    name: "Desktop",
    component: () => import("@/views/desktop/Desktop.vue")
  },
  {
    path: "/",
    redirect: "/blog"
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
