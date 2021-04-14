<template>
  <q-layout view="hHh lpR fFf">
    <Statusbar />
    <q-page-container>
      <Workspace />
      <Background />
    </q-page-container>
    <Taskbar />
  </q-layout>
</template>

<style></style>

<script>
// @ is an alias to /src

import Statusbar from "./statusbar/Statusbar";
import Taskbar from "./taskbar/Taskbar";
import Background from "./background/Background";
import Workspace from "./workspace/Workspace";

export default {
  name: "Home",
  components: {
    Statusbar,
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
