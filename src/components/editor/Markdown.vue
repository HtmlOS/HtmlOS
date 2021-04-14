<template>
  <div class="markdown-body" ref="markdown-it-container" />
</template>

<style lang="scss">
// 覆盖内部样式
// 移除大标题的下边框
.markdown-body h1,
.markdown-body h2 {
  padding-bottom: 0.1em;
  border-bottom: 0px solid #eaecef;
}
</style>

<script>
import "github-markdown-css";

import MarkdownIt from "markdown-it";

import MarkdownItEmoji from "markdown-it-emoji";

import hljs from "highlight.js";

import "highlight.js/styles/tomorrow.css";

// const files = require.context("highlight.js/lib/languages", true, /.+\.js$/);
// files.keys().forEach(iteme => {
//   const file = iteme.substr(2);
//   const name = file.substr(0, file.lastIndexOf("."));
//   const lang = require("highlight.js/lib/languages/" + name);
//   hljs.registerLanguage(name, lang);
// });

const MD = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight: (str, lang) => {
    let html = undefined;
    const cls = "hljs";

    if (lang) {
      if (hljs.getLanguage(lang)) {
        try {
          const result = hljs.highlight(lang, str);
          html = result.value;
        } catch (__) {
          if (__) {
            __.toString();
          }
        }
      }
    } else {
      try {
        const result = hljs.highlightAuto(str);
        html = result.value;
      } catch (__) {
        if (__) {
          __.toString();
        }
      }
    }
    return `<pre class="${cls}"><code>${html || str}</code></pre>`;
  },
}).use(MarkdownItEmoji);

export default {
  name: "Markdown",
  props: {
    content: String,
  },
  data() {
    return {
      html: "",
      toc: {
        list: [],
        tree: [],
      },
    };
  },
  methods: {
    load() {
      const container = this.$refs["markdown-it-container"];
      container.innerHTML = MD.render(this.content) || "";
      this.loadToc(2);
    },
    loadTocList(container) {
      const list = [];
      for (const element of container.childNodes) {
        if (element.nodeType !== 1) {
          continue;
        }
        const nodeName = element.nodeName.toLowerCase();
        if (/^h[1-6]{1}$/.test(nodeName) !== true) {
          continue;
        }
        const h = parseInt(nodeName.substr(1), 10);
        list.push({
          h: h,
          el: element,
        });
      }
      return list;
    },
    loadTocTree(list) {
      const tree = [];

      const insertNode = function (tree, node) {
        const lastNode = tree[tree.length - 1];
        if (lastNode && lastNode.h < node.h) {
          const children = lastNode.children;
          insertNode(children, node);
        } else {
          tree.push(node);
        }
      };

      for (const node of list) {
        node.children = [];
        insertNode(tree, node);
      }
      return tree;
    },
    loadToc(retry = 0) {
      setTimeout(() => {
        this.$nextTick(() => {
          const container = this.$refs["markdown-it-container"];
          const tocList = this.loadTocList(container);
          const tocTree = this.loadTocTree(tocList);
          if (tocList.length === 0 && retry > 0) {
            this.loadToc(retry - 1);
            return;
          }
          if (this.toc.list.length === 0 && this.toc.tree.length === 0) {
            this.toc.list = tocList;
            this.toc.tree = tocTree;
            this.$emit("toc", tocList, tocTree);
          }
        });
      }, 500);
    },
  },
  mounted() {
    this.load();
  },
  watch: {
    content: function (newVal, oldVal) {
      this.load();
    },
  },
};
</script>
