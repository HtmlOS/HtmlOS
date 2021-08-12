<template>
  <div
    elevated
    class="title shadow-box shadow-3"
    :style="{
      height: os.settings.desktop.form.titleHeight + 'px',
      cursor: cursor,
    }"
    @dblclick="onDoubleClick"
    @mousedown="onMousedown"
  >
    <q-img class="logo" :src="form.app.icon" />

    <div class="select-none" style="flex: 1; text-align: center">
      {{ $t(form.app.name) }}
    </div>

    <div>
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.fullscreen.enter.png').default"
        @click.stop="form.fullscreen()"
        v-show="!form.state.fullscreen && !form.state.maximized"
        v-if="!os.platform.is.mobile"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.fullscreen.exit.png').default"
        @click.stop="form.normalize()"
        v-show="form.state.fullscreen"
        v-if="!os.platform.is.mobile"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.minimize.png').default"
        @click.stop="form.minimize()"
        v-if="!os.platform.is.mobile"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.maximize.png').default"
        @click.stop="form.maximize()"
        v-show="!form.state.fullscreen && !form.state.maximized"
        v-if="!os.platform.is.mobile"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.normalize.png').default"
        @click.stop="form.normalize()"
        v-show="form.state.fullscreen || form.state.maximized"
        v-if="!os.platform.is.mobile"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.close.png').default"
        @click.stop="form.close()"
        v-if="!os.platform.is.mobile"
      />
    </div>

    <span
      class="icon material-icons"
      style="color: orangered"
      @click.stop="form.close()"
      v-if="os.platform.is.mobile"
    >
      radio_button_checked
    </span>
  </div>
</template>

<script>
import { MoveHelper } from "@/js/os/utils/gesture";
import { inject, ref } from "vue";

export default {
  name: "FormTitle",
  props: ["form"],
  setup(props) {
    const os = inject("os");
    const clientRect = os.utils.getClientRect();
    const cursor = ref("auto");
    const moveHook = (shift, point) => {
      const formIndex = os.fm.indexOf(props.form);
      const form = os.fm.stacks[formIndex];
      form.focus();
      if (form.state.maximized || form.state.fullscreen) {
        // 如果当前是最大化窗口， 恢复窗口， 并保持窗口与鼠标相对位置
        form.rect.x = point.x - (point.x / clientRect.w) * form.rect.w;
        form.rect.y = shift.y;
        form.normalize();
      } else {
        // 正常移动
        form.rect.x += shift.x;
        form.rect.y += shift.y;
      }
      cursor.value = "move";
    };
    const dropHook = () => {
      cursor.value = "auto";
      const formIndex = os.fm.indexOf(props.form);
      const form = os.fm.stacks[formIndex];
      form.fixRect();
      os.settings.desktop.form.shielding = false;
    };
    const moveHelper = new MoveHelper(
      moveHook,
      dropHook,
      !os.platform.is.mobile
    );
    const onMousedown = (e) => {
      moveHelper.start(e);
      os.settings.desktop.form.shielding = true;
    };
    const onDoubleClick = (_e) => {
      const form = props.form;
      if (form.state.maximized || form.state.fullscreen) {
        form.normalize();
      } else {
        form.maximize();
      }
    };
    return {
      os,
      cursor,
      onMousedown,
      onDoubleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  background: lightgrey;

  justify-content: center;
  align-items: center;

  .logo {
    width: 16px;
    height: 16px;
    pointer-events: none;
    margin-left: 8px;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin: 2px;
    font-size: 16px;
    text-align: center;
    cursor: default;
    border-radius: 8px;
  }

  .icon:hover {
    background-color: #ffffff99;
    transform: scale(1.05, 1.05);
    transition: all 0.2s ease;
  }
}
</style>
