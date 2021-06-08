<template>
  <div class="fill-parent">
    <Launcher class="fill-parent" style="position: fixed" />
    <Form v-for="(item, index) in os.fm.stacks" :key="index" :form="item" />
  </div>
</template>

<script>
import Launcher from "@/views/os/desktop/workspace/launcher/Launcher";
import Form from "@/views/os/desktop/workspace/form/Form";
import { inject, onMounted, onUnmounted } from "vue";

export default {
  name: "Workspace",
  components: { Launcher, Form },
  setup() {
    const os = inject("os");
    let checkActiveTimeId = undefined;

    let activeForm = undefined;
    const checkActive = () => {
      const activeElement = document.activeElement;
      // 检查 activeElement.form （这个属性在 Browser 中赋值）
      if (activeElement && activeElement.form !== undefined) {
        const form = activeElement.form;
        if (activeForm !== form) {
          form.focus();
        }
      }
      checkActiveTimeId = setTimeout(() => {
        checkActive();
      }, 100);
    };

    onMounted(() => {
      checkActive();
    });

    onUnmounted(() => {
      clearTimeout(checkActiveTimeId);
    });
    return {
      os,
    };
  },
};
</script>

<style lang="scss" scoped></style>
