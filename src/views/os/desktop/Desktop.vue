<template>
  <q-layout class="fill-parent" view="hHh lpR fFf" @contextmenu.prevent.stop>
    <q-page-container class="fill-parent">
      <Background style="position: fixed; overflow: hidden" />
      <Workspace style="position: fixed; overflow: hidden" />
    </q-page-container>
    <Panel v-show="!isFullscreen" v-if="!os.platform.is.mobile" />
    <Navi v-if="os.platform.is.mobile" />
  </q-layout>
</template>

<script>
import Background from "@/views/os/desktop/background/Background";
import Workspace from "@/views/os/desktop/workspace/Workspace";
import Panel from "@/views/os/desktop/panel/Panel";
import { computed, inject } from "vue";
import Navi from "@/views/os/desktop/navi/Navi";

export default {
  name: "Desktop",
  components: { Navi, Background, Workspace, Panel },
  setup() {
    const os = inject("os");
    const isFullscreen = computed(() => {
      for (const item of os.fm.stacks) {
        if (item.state === 3) {
          return true;
        }
      }
      return false;
    });
    return {
      os,
      isFullscreen,
    };
  },
};
</script>

<style lang="scss" scoped></style>
