<template>
  <div class="title">
    <q-img class="logo" :src="app.icon" />
    <div style="flex: 1; text-align: center">{{ app.name }}</div>
    <div>
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.fullscreen.png')"
        @click="$emit('fullscreen')"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.minimized.png')"
        @click="$emit('minimized')"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.maximized.png')"
        @click="$emit('maximized')"
      />
      <q-img
        class="icon"
        :src="require('@/assets/images/form/app.close.png')"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 32px;
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  background: lightgrey;

  justify-content: center;
  align-items: center;

  .logo {
    width: 24px;
    height: 24px;
  }
  .icon {
    width: 16px;
    height: 16px;
    margin: 2px;
  }
}
</style>

<script>
export default {
  name: "WinformTitle",
  props: {
    app: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
