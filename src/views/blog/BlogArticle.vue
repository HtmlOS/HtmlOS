<template>
  <div class="fill-parent blog">
    <!-- content -->
    <div class="fill-parent" v-if="blog !== undefined">
      <markdown class="" :content="`# ${blog.title}`" />

      <blog-tags :blog="blog"></blog-tags>

      <q-separator inset style="margin-bottom: 24px" v-if="content !== ''" />

      <markdown class="fill-parent" :content="content" v-if="content !== ''" />

      <q-separator inset style="margin-bottom: 24px" v-if="content !== ''" />
    </div>

    <!-- loadding ani -->
    <q-inner-loading :showing="loading">
      <q-spinner-ball size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<style lang="scss" scoped>
.blog {
  padding: 8px;
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
