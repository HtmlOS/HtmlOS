<template>
  <div class="fill-parent">
    <q-carousel
      ref="carousel"
      class="fill-parent"
      v-model="slide"
      animated
      infinite
      :autoplay="true"
    >
      <q-carousel-slide
        v-for="(item, index) in images"
        :key="index"
        :name="'bg-' + index"
        :img-src="item.default || item"
      />
    </q-carousel>
  </div>
</template>

<script>
import { computed, inject, ref, onMounted } from "vue";

export default {
  name: "Background",
  setup() {
    const os = inject("os");
    const slide = ref("style");
    const images = computed(() => os.settings.desktop.background.images);
    const carousel = ref(undefined);
    onMounted(() => {
      // 如果不加此代码，第一屏可能是白屏
      carousel.value.next();
    });
    return { os, carousel, slide, images };
  },
};
</script>

<style lang="scss" scoped>
.bg {
}
</style>
