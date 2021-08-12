<template>
  <q-footer
    elevated
    class="panel gravity-center"
    :style="{ height: panelHeight + 'px', background: panelColor }"
  >
    <span
      class="logo material-icons"
      :style="{ height: panelHeight + 'px', width: panelHeight + 'px' }"
    >
      arrow_back
    </span>

    <span
      class="logo material-icons"
      :style="{ height: panelHeight + 'px', width: panelHeight + 'px' }"
    >
      arrow_forward
    </span>

    <span
      class="logo material-icons"
      :style="{ height: panelHeight + 'px', width: panelHeight + 'px' }"
      @click="home()"
    >
      home
    </span>

    <span
      class="logo material-icons"
      :style="{ height: panelHeight + 'px', width: panelHeight + 'px' }"
    >
      add
    </span>

    <span
      class="logo material-icons"
      :style="{ height: panelHeight + 'px', width: panelHeight + 'px' }"
    >
      more_vert
    </span>
  </q-footer>
</template>

<script>
import { computed, inject, ref } from "vue";

export default {
  name: "Navi",
  setup() {
    const os = inject("os");
    const panelHeight = computed(() => os.settings.desktop.panel.height);
    const panelColor = computed(() => os.settings.desktop.panel.color);
    const forms = computed(() => os.fm.stacks);
    const home = () => {
      for (const item of os.fm.stacks) {
        item.minimize();
      }
    };
    return {
      os,
      panelHeight,
      panelColor,
      forms,
      home,
    };
  },
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  overflow: hidden;
}

.logo {
  flex: auto;
  display: flex;
  text-align: center;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 32px;
}

.logo:hover {
  background: #99999999;
}
</style>
