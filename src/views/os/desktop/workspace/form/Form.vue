<template>
  <div
    elevated
    ref="el"
    class="form shadow-box shadow-12"
    :style="styleComputed"
    @click="form.focus()"
  >
    <FormResizer :form="form">
      <FormTitle :form="form" />
      <FormContent
        :form="form"
        :style="{ paddingBottom: os.settings.desktop.panel.height }"
      />
    </FormResizer>
  </div>
</template>

<script>
import FormResizer from "@/views/os/desktop/workspace/form/FormResizer";
import FormTitle from "@/views/os/desktop/workspace/form/FormTitle";
import FormContent from "@/views/os/desktop/workspace/form/FormContent";
import { computed, inject, ref } from "vue";

export default {
  name: "Form",
  components: { FormResizer, FormTitle, FormContent },
  props: ["form"],
  setup(props) {
    const os = inject("os");
    const el = ref(undefined);
    const panelHeight = os.settings.desktop.panel.height;
    const styleComputed = computed(() => {
      const form = props.form;
      const rect = form.rect;
      const state = form.state;

      let css;
      if (state.minimized) {
        css = {
          display: "none",
        };
      } else if (state.fullscreen) {
        css = {
          position: "fixed",
          left: 0 + "px",
          top: 0 + "px",
          right: 0 + "px",
          bottom: 0 + "px",
        };
      } else if (state.maximized || os.platform.is.mobile) {
        css = {
          position: "fixed",
          left: 0 + "px",
          top: 0 + "px",
          right: 0 + "px",
          bottom: panelHeight + "px",
        };
      } else {
        css = {
          width: rect.w + "px",
          height: rect.h + "px",
          left: rect.x + "px",
          top: rect.y + "px",
        };
      }
      css.zIndex = form.zIndex;
      return css;
    });

    return {
      os,
      el,
      styleComputed,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: fixed;
  background: whitesmoke;
}
</style>
