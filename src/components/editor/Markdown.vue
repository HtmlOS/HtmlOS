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

const MD = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight: (str, lang) => {
    let fixed = undefined;
    const cls = "hljs";

    try {
      if (!fixed && lang && hljs.getLanguage(lang)) {
        try {
          const result = hljs.highlight(lang, str);
          fixed = result.value;
        } catch (__) {
          if (__) {
            __.toString();
          }
        }
      }

      if (!fixed) {
        try {
          const result = hljs.highlightAuto(str);
          fixed = result.value;
        } catch (__) {
          if (__) {
            __.toString();
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return `<pre class="${cls}"><code>${fixed || str}</code></pre>`;
  }
}).use(MarkdownItEmoji);

export default {
  name: "Markdown",
  props: {
    content: String
  },
  data() {
    return {
      html: ""
    };
  },
  methods: {
    load() {
      setTimeout(() => {
        this.$refs["markdown-it-container"].innerHTML =
          MD.render(this.content) || "";
      }, 10);
    }
  },
  mounted() {
    this.load();
  },
  watch: {
    content: function(newVal, oldVal) {
      this.load();
    }
  }
};
</script>
