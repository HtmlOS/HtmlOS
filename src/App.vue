<template>
  <div class="fill-parent" id="app">
    <!-- Route  -->
    <router-view />
    <!-- ServiceWorker Updated Reload -->
    <Reloader></Reloader>
  </div>
</template>

<script>
import Reloader from "@/components/Reloader";

export default {
  components: {
    Reloader,
  },
  data() {
    return {};
  },
  methods: {
    removeLoading() {
      const loading = document.getElementById("boot-loading");
      if (loading) {
        setTimeout(() => {
          // TODO fade-out 需要补充
          loading.className = "fade-out";
          document.body.removeChild(loading);
        });
      }
    },
  },
  mounted() {
    // 加载完毕, 移除 /public/index.html 中的加载动画
    this.removeLoading();
  },
};
</script>
