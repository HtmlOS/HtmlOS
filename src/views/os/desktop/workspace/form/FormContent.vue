<template>
  <div class="fill-parent">
    <Browser :url="src" :form="form" />
    <div
      class="shield"
      :style="{ top: os.settings.desktop.form.titleHeight + 'px' }"
      v-show="os.settings.desktop.form.shielding"
    />
  </div>
</template>

<script>
import Browser from "@/views/os/app/Browser";
import { computed, inject } from "vue";

export default {
  name: "FormContent",
  components: { Browser },
  props: ["form"],
  setup(props) {
    const os = inject("os");
    const src = computed(() => props.form.app.url);
    return {
      os,
      src,
    };
  },
};
</script>

<style lang="scss" scoped>
.shield {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
