<template>
  <div class="sw_dialog_updated" v-if="sw.updated">
    <h3>{{ $t("sw.updated") }}</h3>

    <div style="display: flex">
      <el-button type="primary" @click="refresh"> $t("sw.reload") </el-button>

      <div style="min-width: 16px"></div>

      <el-button @click="sw.updated = false"> $t("sw.later") </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sw_dialog_updated {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  background: white;
  box-shadow: 0px 0px 1px 1px #eee;
  border-radius: 2px;
  z-index: 99999999;
}
</style>

<script>
export default {
  data() {
    return {
      sw: {
        updated: false,
      },
    };
  },
  methods: {
    refresh() {
      window.location.reload();
    },
    onSwRefresh() {
      this.sw.updated = true;
    },
  },
  mounted() {
    window.addEventListener("sw.updated", this.onSwRefresh, true);
  },
  destroyed() {
    window.removeEventListener("sw.updated", this.onSwRefresh);
  },
};
</script>
