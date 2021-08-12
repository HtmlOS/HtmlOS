<template>
  <div class="fill-parent">
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor -->

    <div class="fill-parent slot">
      <slot></slot>
    </div>

    <!-- 上和下 -->
    <div
      class="gesture h t"
      style="cursor: ns-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture h b"
      style="cursor: ns-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <!-- 左和右 -->
    <div
      class="gesture v l"
      style="cursor: ew-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture v r"
      style="cursor: ew-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />

    <!-- 左上 -->
    <div
      class="gesture hs l t"
      style="cursor: nwse-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture vs l t"
      style="cursor: nwse-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <!-- 右上 -->
    <div
      class="gesture hs r t"
      style="cursor: nesw-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture vs r t"
      style="cursor: nesw-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <!-- 左下 -->
    <div
      class="gesture hs l b"
      style="cursor: nesw-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture vs l b"
      style="cursor: nesw-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <!-- 右下 -->
    <div
      class="gesture hs r b"
      style="cursor: nwse-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
    <div
      class="gesture vs r b"
      style="cursor: nwse-resize"
      @mousedown.stop="move"
      v-show="enabled"
    />
  </div>
</template>

<script>
import { computed, inject, ref } from "vue";
import { MoveHelper } from "@/js/os/utils/gesture";

export default {
  name: "FormResizer",
  props: ["form"],
  setup(props) {
    const os = inject("os");
    let target = undefined;
    let targetW, targetH;
    const moveHook = (shift, _point) => {
      const formIndex = os.fm.indexOf(props.form);
      const form = os.fm.stacks[formIndex];
      const className = target.className;
      const classes = className.split(" ");
      const l = classes.indexOf("l") !== -1;
      const t = classes.indexOf("t") !== -1;
      const r = classes.indexOf("r") !== -1;
      const b = classes.indexOf("b") !== -1;

      const minW = os.settings.desktop.form.minWidth;
      const minH = os.settings.desktop.form.minHeight;

      const preW = (targetW += (l ? -1 : 1) * shift.x);
      const preH = (targetH += (t ? -1 : 1) * shift.y);

      const fixW = Math.max(preW, minW);
      const fixH = Math.max(preH, minH);

      if (l) {
        form.rect.x += form.rect.w - fixW;
      }
      if (t) {
        form.rect.y += form.rect.h - fixH;
      }

      if (l || r) {
        form.rect.w = fixW;
      }
      if (t || b) {
        form.rect.h = fixH;
      }
    };
    const stopHook = () => {
      const formIndex = os.fm.indexOf(props.form);
      const form = os.fm.stacks[formIndex];
      form.fixRect();
      os.settings.desktop.form.shielding = false;
    };
    const moveHelper = new MoveHelper(
      moveHook,
      stopHook,
      !os.platform.is.mobile
    );
    const move = (e) => {
      const formIndex = os.fm.indexOf(props.form);
      const form = os.fm.stacks[formIndex];
      target = e.target instanceof Element ? e.target : e.srcElement;
      targetW = form.rect.w;
      targetH = form.rect.h;
      os.settings.desktop.form.shielding = true;
      moveHelper.start(e);
    };
    const enabled = computed(() => {
      return (
        !props.form.state.minimized &&
        !props.form.state.maximized &&
        !props.form.state.fullscreen
      );
    });
    return {
      os,
      move,
      enabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.slot {
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gesture {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}

.h {
  width: 100%;
  height: 2px;
}

.v {
  height: 100%;
  width: 2px;
}

.hs {
  width: 8px;
  height: 2px;
}

.vs {
  height: 8px;
  width: 2px;
}

.l {
  left: 0px;
}

.t {
  top: 0px;
}

.r {
  right: 0px;
}

.b {
  bottom: 0px;
}
</style>
