<template>
  <div class="fill-parent" @contextmenu.stop="$menu.show(menu)">
    <Launcher class="fill-parent" style="position: fixed" @open="openApp" />
    <Winform
      v-for="(item, index) in forms"
      :key="index"
      v-model:form="forms[index]"
      @fullscreen="item.fullscreen = true"
      @close="closeApp"
    />
  </div>
</template>

<style lang="scss" scoped>
.desktop {
  align-content: flex-start;
}
</style>

<script>
// @ is an alias to /src
import Launcher from "@/views/desktop/workspace/Launcher";
import Winform from "@/views/desktop/workspace/Winform";

export default {
  name: "Workspace",
  components: { Winform, Launcher },
  data() {
    return {
      forms: [],
      menu: [
        {
          name: "reload",
          icon: require("@/assets/images/icon/refresh.png"),
          disabled: false,
          onclick: () => {
            window.location.reload();
          },
        },
        {}, // divider
        //...
        {
          name: "reload",
          icon: require("@/assets/images/icon/refresh.png"),
          disabled: false,
          onclick: () => {
            window.location.reload();
          },
        },
      ],
    };
  },
  methods: {
    openApp(form) {
      this.forms.push(form);
    },
    closeApp(form) {
      let i = -1;
      for (const item of this.forms) {
        i++;
        if (item === form) {
          break;
        }
      }
      this.forms.splice(i, 1);
    },
  },
  mounted() {},
  destroyed() {},
};
</script>
