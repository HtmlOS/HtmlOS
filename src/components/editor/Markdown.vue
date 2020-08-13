<template>
  <markdown-it-vue-light
    class="md-body"
    :content="content || ''"
    :options="options"
  />
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
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd.min.js";
import "markdown-it-vue/dist/markdown-it-vue-light.css";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow.css";

export default {
  name: "Blog",
  props: {
    content: String
  },
  components: { MarkdownItVueLight },
  data() {
    return {
      options: {
        markdownIt: {
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
              console.log(e);
            }
            return `<pre class="${cls}"><code>${fixed || str}</code></pre>`;
          }
        },
        linkAttributes: {
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        }
      }
    };
  },
  mounted() {}
};
</script>
