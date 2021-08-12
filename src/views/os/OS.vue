<template>
  <Desktop />
</template>

<script>
import os from "@/js/os";
import { provide, reactive } from "vue";

import Desktop from "@/views/os/desktop/Desktop";

export default {
  name: "OS",
  components: { Desktop },
  setup() {
    provide("os", reactive(os));
    return {};
  },
};
</script>

<style scoped></style>
