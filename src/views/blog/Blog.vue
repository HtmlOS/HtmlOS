<template>
  <!-- ${require('@/assets/images/bg1.jpg') -->
  <div class="fill-parent blog-root">
    <div class="text-green absolute" style="z-index: 99999;">
      本站正在积极开发中...
    </div>
    <q-parallax :height="240" :src="bg" :speed="0.7">
      <h1 class="text-white">{{ $t("site.name") }}</h1>
    </q-parallax>
    <div class="blog-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-root {
  overflow-y: auto;
  position: relative;
}
.blog-container {
  position: absolute;
  top: 256px;
  left: 15%;
  width: 70%;
  min-height: 50%;
}
</style>

<script>
import { LoveHeart } from "@/plugins/loveheart";

export default {
  data() {
    return {
      bg: require("@/assets/images/bg1.jpg")
    };
  },
  methods: {},
  mounted() {
    LoveHeart.attach();
  },
  destroyed() {
    LoveHeart.detach();
  }
};
</script>
