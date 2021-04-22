<template>
  <div
    class="fill-parent desktop column"
    style="padding: 16px"
    @click.stop="selectApp(undefined, $event)"
  >
    <div
      class="launcher no-select"
      v-for="(item, index) in launchers"
      :key="index"
      :class="selected === item ? 'launcher-selected' : ''"
      @click.stop="selectApp(item, $event)"
      @dblclick="openApp(item, $event)"
    >
      <q-img :src="item.icon" style="width: 44px; height: 44px" />
      <div>{{ item.name }}</div>
    </div>
    <div />
  </div>
</template>

<style lang="scss" scoped>
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

<script>
import { Form } from "@/_osx/form";
import { AppManager } from "@/_osx/app";

export default {
  name: "Launcher",
  data() {
    return {
      launchers: [],
      selected: undefined,
    };
  },
  methods: {
    selectApp(app) {
      this.selected = app;
    },
    openApp(app) {
      this.selectApp(undefined);
      this.$emit("open", new Form(app));
    },
  },
  mounted() {
    this.launchers = AppManager.findAll();
  },
};
</script>
