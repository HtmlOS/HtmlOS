<template>
  <q-layout class="fill-parent" view="hHh lpR fFf">
    <q-page-container class="fill-parent">
      <Background style="position: fixed; overflow: hidden" />
      <Workspace style="position: fixed; overflow: hidden" />
    </q-page-container>
    <Taskbar />
  </q-layout>
</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src

import Taskbar from "./taskbar/Taskbar";
import Background from "./background/Background";
import Workspace from "./workspace/Workspace";

export default {
  name: "Home",
  components: {
    Taskbar,
    Background,
    Workspace,
  },
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
};
</script>
