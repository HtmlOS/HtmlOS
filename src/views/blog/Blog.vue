<template>
  <!--  <Browser url="https://gankcode.com/#/blog" />-->
  <div class="fill-parent">
    <div v-for="(item, index) in blogs" :key="index">
      <a :href="item">{{ item }}</a>
    </div>
  </div>
</template>

<script>
import { blogs } from "@/js/blog";

export default {
  name: "Blog",
  setup() {
    return {
      blogs,
    };
  },
};
</script>

<style scoped></style>
