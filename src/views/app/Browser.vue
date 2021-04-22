<template>
  <div class="fill_parent container">
    <iframe
      class="fill_parent app"
      width="100%"
      height="100%"
      :src="src"
      frameborder="0"
      marginwidth="0"
      marginheight="0"
      seamless="seamless"
      sandbox="allow-same-origin allow-forms allow-scripts allow-popups"
      allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen"
    >
    </iframe>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  overflow: hidden;
}
.app {
  overflow: hidden;
  display: block;
}
</style>

<script>
export default {
  name: "Browser",
  props: {
    url: String,
  },
  data() {
    return {};
  },
  computed: {
    src() {
      return this.url || "https://bing.com";
    },
  },
  methods: {},
  mounted() {},
  destroyed() {},
};
</script>
