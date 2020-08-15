<template>
  <!-- ${require('@/assets/images/bg1.jpg') -->
  <div class="fill-parent blog-root">
    <div class="text-green absolute" style="z-index: 99999;">
      本站正在积极开发中...
    </div>
    <q-parallax :height="240" :src="bg" :speed="0.7">
      <center>
        <h2 class="text-white fill-width">{{ $t("site.name") }}</h2>
      </center>
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
  width: 100%;
  max-width: 768px;
  min-height: 50%;
  margin: 0 auto;
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
