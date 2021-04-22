<template>
  <div class="fill-parent">
    <q-img class="fill-parent" :src="bg" />
  </div>
</template>

<script>
export default {
  name: "Background",
  data() {
    return {
      bg: undefined,
      selected: undefined,
    };
  },
  mounted() {
    this.bg = require("@/assets/images/background/bg1.jpg");
  },
};
</script>
