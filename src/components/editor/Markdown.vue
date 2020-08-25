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
      const container = this.$refs["markdown-it-container"];
      container.innerHTML = MD.render(this.content) || "";
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
