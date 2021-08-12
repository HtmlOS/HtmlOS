<template>
  <div
    class="fill-parent launcher-container"
    :class="os.platform.is.mobile ? 'row' : 'column'"
    style="padding: 16px"
    @click.stop="selected = undefined"
  >
    <div
      class="launcher select-none"
      v-for="(item, index) in os.am.installed"
      :key="index"
      :class="selected === item ? 'launcher-selected' : ''"
      @click.stop="selected = item"
      @dblclick="open(item, $event)"
    >
      <q-img :src="item.icon" style="width: 44px; height: 44px" />
      <div>{{ $t(item.name) }}</div>
    </div>
    <div />
  </div>
</template>

<script>
import { inject, ref } from "vue";

import { Form } from "@/js/os/types";

export default {
  name: "Launcher",
  setup() {
    const os = inject("os");
    const open = (app) => {
      os.fm.open(new Form(os, app));
    };
    const selected = ref(undefined);
    return {
      os,
      selected,
      open,
    };
  },
};
</script>

<style lang="scss" scoped>
.launcher-container {
  align-content: flex-start;
}

.launcher {
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  align-items: center;
  justify-items: center;
  align-content: center;
  text-align: center;
  overflow: hidden;
  color: whitesmoke;
  text-shadow: 1px 1px 1px black;
}

.launcher:hover {
  background-color: #99999999;
}

.launcher-selected {
  background-color: #88888888;
}

.launcher {
  * {
    pointer-events: none;
  }
}
</style>
