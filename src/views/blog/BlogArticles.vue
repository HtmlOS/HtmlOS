<template>
  <div class="q-pa-md">
    <!-- http://www.quasarchs.com/vue-components/infinite-scroll 无线滚动 -->
    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      :disable="offset >= total - 1"
    >
      <q-item
        v-for="(item, index) in items"
        :key="index"
        v-ripple
        clickable
        class="item-card"
        @click="openblog(item)"
      >
        <q-card class="fill-parent">
          <markdown class="item-title" :content="`# ${item.title}`" />

          <blog-tags :blog="item"></blog-tags>

          <q-separator inset />

          <markdown class="item-content" :content="item.fixUrl(item.excerpt)" />
        </q-card>
      </q-item>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  width: 100%;
  padding: 0px;
  margin: 16px;
}
.item-title {
  margin-top: 8px;
  margin-left: 24px;
  margin-right: 24px;
}
.item-date {
  margin-left: 8px;
  margin-right: 16px;
}
.item-content {
  margin: 16px;
}
</style>

<script>
import { BlogManager } from "@/plugins/blog";

import Markdown from "@/components/editor/Markdown";
import BlogTags from "@/components/blog/BlogTags";

export default {
  components: { Markdown, BlogTags },
  data() {
    return {
      blogs: [],
      total: 0,
      offset: 0,
      limit: 10,
      items: []
    };
  },
  methods: {
    openblog(blog) {
      this.$router.push({
        path: `/blog/articles/${blog.name}`
      });
    },
    loadMore() {
      if (this.offset >= this.total - 1) {
        return;
      }
      const next = Math.min(this.total - this.offset, this.limit);
      const pages = this.blogs.slice(this.offset, next);
      for (const page of pages) {
        this.items.push(page);
      }
      this.offset = this.offset + next;
    },
    onLoad(index, done) {
      setTimeout(() => {
        this.loadMore();
        done();
      }, 1000);
    }
  },
  mounted() {
    this.blogs = BlogManager.blogs;
    this.total = BlogManager.blogs.length;
    this.loadMore();
  },
  destroyed() {}
};
</script>
