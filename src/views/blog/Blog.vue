<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar>
          <img src="/favicon.ico" />
        </q-avatar>
        <div class="tool-bar-title" v-if="$q.screen.gt.xs">
          <strong>{{ $t("site.name") }} </strong>
        </div>
        <q-space />
        <q-tabs align="left" style="min-width: 320px">
          <q-route-tab to="/blog/articles" :label="$t('blog.nav.articles')" />
          <q-route-tab to="/blog/archive" :label="$t('blog.nav.archive')" />
          <q-route-tab to="/blog/projects" :label="$t('blog.nav.projects')" />
          <q-route-tab to="/blog/about" :label="$t('blog.nav.about')" />
        </q-tabs>
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
    </q-footer> -->
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
      bg: require("@/assets/images/bg1.jpg")
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
