<template>
  <div class="fill-parent blog-article">
    <!-- toc -->
    <div ref="toc" class="row blog-article-toc" v-if="isTocShow">
      <q-tree
        dense
        selected-color="primary"
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
      <div class="fill-parent blog-page" v-scroll="scrolled">
        <markdown
          :content="`# ${blog.title}`"
          @toc="onTocTitle"
          v-if="blog !== undefined"
        />

        <blog-tags :blog="blog" v-if="blog !== undefined"></blog-tags>

        <q-separator style="margin-bottom: 24px" />

        <markdown class="fill-parent" :content="content" @toc="onTocPage" />

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
  overflow: auto;
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
      tocSelected: "0",
    };
  },
  computed: {
    isTocShow() {
      return this.tocTree.length > 0 && this.$q.screen.width > 1080;
    },
  },
  methods: {
    // 加载博文正文
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
          (e) => {
            this.content = "# Blog File Load Failed";
            this.loading = false;
          }
        );
      }
    },
    // 收到标题toc 更新事件
    onTocTitle(list, tree) {
      this.onToc(list, tree, true);
    },
    // 收到正文toc 更新事件
    onTocPage(list, tree) {
      this.onToc(list, tree, false);
    },
    // 更新toc
    onToc(list, tree, isTitle) {
      for (const i in list) {
        const node = list[i];
        node.id = (isTitle ? "0" : "1") + i;
        node.label = node.el.innerText;
        if (isTitle) {
          this.tocList.unshift(node);
        } else {
          this.tocList.push(node);
        }
      }
      for (const node of tree) {
        if (isTitle) {
          this.tocTree.unshift(node);
        } else {
          this.tocTree.push(node);
        }
      }
    },
    // 当用户点击 toc 项时, 自动滚动到博文对应标题位置
    onTocClick(id) {
      for (const node of this.tocList) {
        if (node.id === id) {
          const el = node.el;
          const top = el.getBoundingClientRect().top;
          const scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          window.scrollTo(0, top + scrollTop - 50);
          return;
        }
      }
    },
    // 根据 toc list 序号 查找 toc el 元素
    findTocEl(tocIndex) {
      if (!this.$refs.toc) {
        return;
      }
      const root = this.$refs.toc.childNodes[0];
      const tocNodes = root.childNodes;

      const pos = {
        tar: tocIndex,
        cur: 0,
      };
      const findEl = function (pos, nodes) {
        for (const node of nodes) {
          if (pos.cur === pos.tar) {
            return node;
          }
          pos.cur++;
          if (node.className.indexOf("q-tree__node--parent") === -1) {
            continue;
          }
          const child = node.childNodes[1].childNodes[0];
          const children = child.childNodes || [];
          if (children.length > 0) {
            const el = findEl(pos, children);
            if (el) {
              return el;
            }
          }
        }
      };
      return findEl(pos, tocNodes);
    },
    // 滚动到toc list 序号滚动位置
    scrollTocTo(tocIndex) {
      const el = this.findTocEl(tocIndex);
      if (!el) {
        return;
      }
      const target = el.childNodes[0];
      // const rect = target.getBoundingClientRect();
      // const top = rect.top - 50;
      // const bottom = rect.bottom - 50;
      target.scrollIntoView();
    },
    // 当博文滚动时, 自动更新 toc 位置, 并自动滚动
    scrolled(position) {
      //当这个方法被调用时，意味着用户
      //已将页面滚动到“position”
      //
      //“position”是一个Integer, 指定的以像素为单位的
      //当前滚动位置。
      for (const i in this.tocList) {
        const node = this.tocList[i];
        const el = node.el;
        const bottom = el.getBoundingClientRect().bottom;
        // 找到第一个可见的节点
        if (bottom >= 50) {
          this.tocSelected = node.id;
          this.scrollTocTo(parseInt(i, 10));
          return;
        }
      }
    },
  },
  mounted() {
    const href = window.location.href;
    const name = href.substr(href.lastIndexOf("/") + 1);
    this.load((this.blog = BlogManager.findByName(name)));
  },
};
</script>
