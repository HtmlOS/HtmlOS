<template>
  <div class="fill-parent blog-article">
    <!-- toc -->
    <div class="row blog-article-toc" v-if="isTocShow">
      <q-tree
        dense
        :nodes="tocTree"
        node-key="id"
        default-expand-all
        no-connectors
        :selected.sync="tocSelected"
        @update:selected="onTocClick"
      />
    </div>

    <!-- content -->
    <div :style="`margin-left: ${isTocShow ? 240 : 0}px`">
      <div class="fill-parent blog-page">
        <markdown :content="`# ${blog.title}`" v-if="blog !== undefined" />

        <blog-tags :blog="blog" v-if="blog !== undefined"></blog-tags>

        <q-separator style="margin-bottom: 24px" />

        <markdown class="fill-parent" :content="content" @toc="ontocUpdate" />

        <q-separator style="margin-top: 24px; margin-bottom: 24px" />

        <!-- loadding ani -->
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass size="32px" color="primary" />
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-article-toc {
  position: fixed;
  left: 0px;
  top: 50px;
  bottom: 0px;
  width: 240px;
  background-color: whitesmoke;
  overflow-y: auto;
}
</style>

<script>
import { BlogManager } from "@/plugins/blog";

import BlogTags from "@/components/blog/BlogTags";

export default {
  components: { BlogTags },
  data() {
    return {
      loading: true,
      blog: undefined,
      content: "",
      tocList: [],
      tocTree: [],
      tocSelected: ""
    };
  },
  computed: {
    isTocShow() {
      return this.tocTree.length > 0 && this.$q.screen.width > 1080;
    }
  },
  methods: {
    load(blog) {
      this.loading = true;
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
    },
    ontocUpdate(list, tree) {
      for (const i in list) {
        const node = list[i];
        node.id = i;
        node.label = node.el.innerText;
      }
      this.tocList = list;
      this.tocTree = tree;
    },
    onTocClick(index) {
      this.tocSelected = "";
      const el = this.tocList[index].el;

      const top = el.getBoundingClientRect().top;
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      window.scrollTo(0, top + scrollTop - 50);
    }
  },
  mounted() {
    const href = window.location.href;
    const name = href.substr(href.lastIndexOf("/") + 1);
    this.load((this.blog = BlogManager.findByName(name)));
  }
};
</script>
