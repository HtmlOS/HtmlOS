<template>
  <div
    class="form"
    :style="{
      width: form.fullscreen ? '100%' : form.w + 'px',
      height: form.fullscreen ? '100%' : form.h + 'px',
      left: form.fullscreen ? '0' : form.x + 'px',
      top: form.fullscreen ? '0' : form.y + 'px',
    }"
  >
    <WinformTitle
      :app="app"
      @fullscreen="$emit('fullscreen', form)"
      @maximized="$emit('maximized', form)"
      @minimized="$emit('minimized', form)"
      @close="$emit('close', form)"
    />
    <WinformContent :app="app" />
  </div>
</template>

<style lang="scss" scoped>
.form {
  position: fixed;
  background: white;
  display: flex;
  flex-direction: column;
}
</style>

<script>
import WinformTitle from "@/views/desktop/workspace/WinformTitle";
import WinformContent from "@/views/desktop/workspace/WinformContent";

export default {
  name: "Winform",
  components: { WinformContent, WinformTitle },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      app: {},
      style: {},
    };
  },
  methods: {},
  mounted() {
    console.log(this.form);
    this.app = this.form.app;
  },
};
</script>
