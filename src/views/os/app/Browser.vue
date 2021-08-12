<template>
  <div class="fill-parent container">
    <div class="fill-parent loader-wrapper" v-if="loading">
      <img
        class="loader-rubik"
        :src="require('@/assets/images/form/app.loading.gif').default"
      />
    </div>

    <iframe
      class="fill-parent app"
      width="100%"
      height="100%"
      ref="iframe"
      :src="src"
      :v-show="!loading"
      frameborder="0"
      marginwidth="0"
      marginheight="0"
      seamless="seamless"
      sandbox=" allow-top-navigation allow-scripts allow-same-origin allow-popups allow-pointer-lock  allow-forms allow-downloads"
      allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen"
    >
    </iframe>
  </div>
</template>

<script>
import { Utils } from "@/js/os/utils/utils";
import { computed, ref, onMounted } from "vue";

export default {
  name: "Browser",
  props: ["form", "url"],
  setup(props) {
    const params = Utils.getUrlQueries();
    const src = computed(
      () => props.url || params.get("url") || "https://bing.com"
    );
    console.log(src.value);
    const loading = ref(true);
    const iframe = ref(undefined);
    onMounted(() => {
      iframe.value.form = props.form;
      iframe.value.onload = () => {
        loading.value = false;
        return iframe.value.contentWindow;
      };
    });
    return {
      src,
      loading,
      iframe,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.container {
  overflow: hidden;
}

.app {
  overflow: hidden;
  display: block;
}

.loader-wrapper {
  background: white;
  position: absolute;
}

.loader-rubik {
  width: 64px;
  height: 64px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-repeat: no-repeat;
  background-position: center;
}
</style>
