<template>
  <div>
    <!-- content -->
    <div class="fill-parent" v-if="blog !== undefined">
      <markdown class="item-title" :content="`# ${blog.title}`" style="" />

      <q-item>
        <q-chip
          square
          size="sm"
          icon="alarm"
          :label="blog.updated.format('yyyy-MM-dd HH:mm')"
        />
        <q-chip
          v-for="(tag, index) in blog.tags"
          :key="index"
          square
          size="sm"
          color="orange"
          text-color="white"
          >{{ tag }}</q-chip
        >
      </q-item>

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

<style lang="scss" scoped></style>

<script>
import Markdown from "@/components/editor/Markdown";

import { BlogManager } from "@/plugins/blog";

export default {
  components: { Markdown },
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
