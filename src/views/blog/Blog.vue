<template>
  <q-layout view="hHh lpR fFf" class="light">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- http://www.quasarchs.com/style/visibility -->
        <!-- http://www.quasarchs.com/options/platform-detection -->
        <div class="blog-title cursor-pointer" @click="goHome">
          <strong>{{ $t("site.name") }}</strong>
        </div>

        <q-space />

        <!-- search -->
        <q-select
          v-if="$q.screen.width >= 320"
          ref="search"
          class="blog-search"
          color="white"
          bg-color="white"
          filled
          dense
          standout
          use-input
          hide-selected
          hide-dropdown-icon
          v-model="search.model"
          :loading="search.filtering"
          :options="search.options"
          @filter="searchFilter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>

          <template v-slot:append>
            <q-icon
              v-if="
                search.text !== undefined &&
                search.text !== null &&
                search.text !== ''
              "
              class="cursor-pointer"
              name="clear"
              @click.stop="searchClear"
            />
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class="text-center">{{ $t("blog.search.none") }}</div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              @click="serchClick(scope.opt)"
            >
              <q-item-section side>
                <q-icon name="collections_bookmark" style="margin: auto" />
              </q-item-section>
              <q-item-section>
                <markdown :content="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-space />

        <!-- menu -->
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
            <q-list style="min-width: 144px">
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
      <div class="fill-parent">
        <router-view :key="$route.path" />
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

<style lang="scss">
.blog-title {
  padding-left: 8px;
  padding-right: 8px;
  font-size: 18px;
  white-space: nowrap;
}

.blog-search {
  width: 48%;
  min-width: 144px;
  max-width: 360px;
  margin: 2px;
}

.blog-page {
  max-width: 768px;
  margin: 0 auto;
  padding: 8px;
}
</style>

<script>
import { LoveHeart } from "@/plugins/loveheart";

import { BlogManager } from "@/plugins/blog";

export default {
  data() {
    return {
      bg: require("@/assets/images/bg1.jpg"),
      pages: [
        {
          name: "blog.nav.articles",
          route: "/blog/articles",
        },
        {
          name: "blog.nav.archive",
          route: "/blog/archive",
        },
        {
          name: "blog.nav.projects",
          route: "/blog/projects",
        },
        {
          name: "blog.nav.about",
          route: "/blog/about",
        },
      ],
      search: {
        text: "",
        model: null,
        filtering: false,
        options: [],
      },
    };
  },
  methods: {
    goHome() {
      const path = `/blog/articles`;
      if (this.$route.path === path) {
        return;
      }
      this.$router.push(path);
    },
    searchClear() {
      this.$refs.search.updateInputValue("", true);
      // input.value = "" ;
      this.search.filtering = false;
      this.$refs.search.updateInputValue("");
    },
    searchFilter(val, doneFn, abortFn) {
      this.search.text = val;
      this.search.options = [];

      if (val === undefined || val === null || val === "") {
        abortFn();
        return;
      }
      this.search.filtering = true;
      const titles = [];
      for (const blog of BlogManager.blogs) {
        if (blog.title.toLowerCase().indexOf(val.toLowerCase().trim()) !== -1) {
          titles.push({
            blog: blog,
            label: blog.title,
          });
        }
      }
      doneFn(() => {
        this.search.filtering = false;
        this.search.options = titles;
      });
    },
    serchClick(option) {
      this.searchClear();
      const blog = option.blog;
      const path = `/blog/articles/${blog.name}`;
      if (this.$route.path === path) {
        return;
      }
      this.$router.push(path);
    },
  },
  mounted() {
    LoveHeart.attach();
  },
  destroyed() {
    LoveHeart.detach();
  },
};
</script>
