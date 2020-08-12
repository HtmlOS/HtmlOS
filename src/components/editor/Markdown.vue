<template>
  <markdown-it-vue-light class="md-body" :content="content" :options="options" />
</template>


<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd.min.js";
import "markdown-it-vue/dist/markdown-it-vue-light.css";

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
          breaks: true,
        //   highlight: function(/*str, lang*/) {
        //     return "";
        //   }
        },
        linkAttributes: {
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        }
      }
    };
  }
};
</script>