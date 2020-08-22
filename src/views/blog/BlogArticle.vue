<template>
  <div class="fill-parent blog-page">
    <!-- content -->
    <div class="fill-parent">
      <markdown :content="`# ${blog.title}`" v-if="blog !== undefined" />

      <blog-tags :blog="blog" v-if="blog !== undefined"></blog-tags>

      <q-separator style="margin-bottom: 24px" />

      <markdown class="fill-parent" :content="content" />

      <q-separator style="margin-top: 24px; margin-bottom: 24px" />
    </div>

    <!-- loadding ani -->
    <q-inner-loading :showing="loading">
      <q-spinner-hourglass size="32px" color="purple" />
    </q-inner-loading>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { BlogManager } from "@/plugins/blog";

import Markdown from "@/components/editor/Markdown";
import BlogTags from "@/components/blog/BlogTags";

export default {
  components: { Markdown, BlogTags },
  data() {
    return {
      loading: true,
      blog: undefined,
      content: ""
    };
  },
  methods: {
    load(blog) {
      if (blog === undefined) {
        this.content = "# Blog File Not Found";
        this.loading = false;
      } else {
        blog.fetchContent(
          (src, md) => {
            this.content = md;
            this.loading = false;
          },
          e => {
            this.content = "# Blog File Load Failed";
            this.loading = false;
          }
        );
      }
    }
  },
  mounted() {
    const href = window.location.href;
    const name = href.substr(href.lastIndexOf("/") + 1);
    this.load((this.blog = BlogManager.findByName(name)));
  }
};
</script>
