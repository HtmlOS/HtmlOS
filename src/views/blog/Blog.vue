<template>
  <!-- ${require('@/assets/images/bg1.jpg') -->
  <q-parallax :src="require('@/assets/images/bg1.jpg')">
    <h1 class="text-white">Basic</h1>
  </q-parallax>
</template>

<script>
import { LoveHeart } from "@/plugins/loveheart";

export default {
  name: "Blog",
  data() {
    return {};
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
