<template>
  <div class="fill-parent">
    <Browser class="fill-parent" :url="app.url" />
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import Browser from "@/views/app/Browser";
export default {
  name: "WinformContent",
  components: { Browser },
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>
