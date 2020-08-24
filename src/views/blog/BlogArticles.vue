<template>
  <div class="fill-parent blog-page">
    <!-- http://www.quasarchs.com/vue-components/infinite-scroll 无线滚动 -->
    <q-infinite-scroll @load="onLoad" :offset="250" :disable="offset >= total - 1">
      <q-list padding class="rounded-borders text-primary">
        <q-item
          v-for="(item, index) in items"
          :key="index"
          v-ripple
          clickable
          class="blog-card"
          @click="openblog(item)"
        >
          <div class="fill-parent">
            <markdown class :content="`# ${item.title}`" />

            <blog-tags :blog="item"></blog-tags>

            <q-separator inset style="margin-bottom: 24px" />

            <markdown class :content="item.fixUrl(item.excerpt)" />
          </div>
        </q-item>
      </q-list>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-hourglass color="purple" size="32px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<style lang="scss">
.blog-page .blog-card {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;

  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(109, 62, 24, 0.2);
}
.blog-page .blog-card .blog-card:hover {
  box-shadow: 0 8px 16px 0 rgba(90, 45, 8, 0.2);
}
.blog-page .blog-card .markdown-body {
  overflow: hidden;
}
.blog-page .blog-card .markdown-body img {
  transition: all 0.6s;
}
.blog-page .blog-card .markdown-body img:hover {
  transform: scale(1.025);
}
</style>

<script>
import { BlogManager } from "@/plugins/blog";

import BlogTags from "@/components/blog/BlogTags";

export default {
  components: { BlogTags },
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
      setTimeout(() => {
        this.$router.push({
          path: `/blog/articles/${blog.name}`
        });
      }, 300);
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
