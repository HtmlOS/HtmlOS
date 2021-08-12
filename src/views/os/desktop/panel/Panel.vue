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
      desktop_windows
    </span>

    <div class="divider" />

    <div class="tasks select-none">
      <div
        class="task row gravity-center"
        v-for="(item, index) in forms"
        :key="index"
        :class="actived === item ? 'task-actived' : ''"
        @click="toggleState(item)"
      >
        <q-img class="icon" :src="item.app.icon" />
        <div class="text single-line">{{ $t(item.app.name) }}</div>
      </div>
    </div>

    <div class="divider" />

    <div class="status">
      <digit-clock />
    </div>
  </q-footer>
</template>

<script>
import { computed, inject, ref } from "vue";

import DigitClock from "@/components/widget/DigitClock";

export default {
  name: "Panel",
  components: { DigitClock },
  setup() {
    const os = inject("os");
    const panelHeight = computed(() => os.settings.desktop.panel.height);
    const panelColor = computed(() => os.settings.desktop.panel.color);
    const forms = computed(() => os.fm.stacks);
    const actived = computed(() => {
      for (const item of os.fm.stacks) {
        if (item.zIndex === os.fm.stacks.length) {
          return item;
        }
      }
      return os.fm.stacks[os.fm.stacks - 1];
    });
    const toggleState = (form) => {
      if (form.state.minimized) {
        form.state.minimized = false;
      } else if (actived.value === form) {
        form.state.minimized = true;
      } else {
        form.focus();
      }
    };
    return {
      os,
      panelHeight,
      panelColor,
      forms,
      actived,
      toggleState,
    };
  },
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  overflow: hidden;
}

.divider {
  height: 66.7%;
  width: 2px;
  background: whitesmoke;
  margin-left: 4px;
  margin-right: 4px;
}

.logo {
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

.tasks {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;

  .task {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;

    .icon {
      width: 32px;
      height: 32px;
      margin: 4px;
    }

    .text {
      width: 64px;
      padding-right: 4px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .task:hover {
    background: #1d1d1d33;
  }

  .task-actived {
    background: #1d1d1d33;
  }
}

.status {
}
</style>
