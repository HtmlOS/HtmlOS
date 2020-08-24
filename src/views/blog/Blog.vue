<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- http://www.quasarchs.com/style/visibility -->
        <!-- http://www.quasarchs.com/options/platform-detection -->
        <div class="tool-bar-title">
          <strong>{{ $t("site.name") }}</strong>
        </div>
        <q-space />
        <q-tabs align="left" v-if="$q.screen.gt.xs">
          <q-route-tab
            v-for="(page, index) in pages"
            :key="index"
            :to="page.route"
            :label="$t(page.name)"
          />
        </q-tabs>
        <q-btn dense flat round icon="menu" v-if="!$q.screen.gt.xs">
          <q-menu>
            <q-list style="min-width: 144px;">
              <q-item
                clickable
                v-for="(page, index) in pages"
                :key="index"
                @click="$router.push(page.route)"
              >
                <q-item-section>{{ $t(page.name) }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section></q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- ${require('@/assets/images/bg1.jpg') -->
      <div class="fill-parent blog-root">
        <div class="blog-container">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>-->
  </q-layout>
</template>

<style lang="scss" scoped>
.tool-bar-title {
  padding-left: 8px;
  padding-right: 8px;
  font-size: 18px;
  white-space: nowrap;
}
.blog-root {
  overflow-y: auto;
  position: relative;
}
.blog-container {
  width: 100%;
  min-height: 50%;
  margin: 0 auto;
}
.blog-page {
  max-width: 768px;
  margin: 0 auto;
  padding: 8px;
}
</style>

<script>
import { LoveHeart } from "@/plugins/loveheart";

export default {
  data() {
    return {
      bg: require("@/assets/images/bg1.jpg"),
      pages: [
        {
          name: "blog.nav.articles",
          route: "/blog/articles"
        },
        {
          name: "blog.nav.archive",
          route: "/blog/archive"
        },
        {
          name: "blog.nav.projects",
          route: "/blog/projects"
        },
        {
          name: "blog.nav.about",
          route: "/blog/about"
        }
      ]
    };
  },
  methods: {},
  mounted() {
    LoveHeart.attach();
  },
  destroyed() {
    LoveHeart.detach();
  }
};
</script>
