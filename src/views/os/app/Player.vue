<template>
  <div class="fill-parent">
    <div class="fill-parent" ref="container" v-show="player !== undefined" />
    <div
      class="fill-parent gravity-center controller"
      v-show="player === undefined"
    >
      <q-btn @click="openLocalFile">{{ $t("os.button.open") }}</q-btn>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { Utils } from "@/js/os/utils/utils";
import Hls from "hls.js";
import DPlayer from "dplayer";

export default {
  name: "Player",
  props: {
    url: String,
  },
  setup() {
    const container = ref(null);
    const player = ref(undefined);
    const datasource = ref(undefined);
    const convert = ({ url, type }) => {
      const ext = url.substr(url.lastIndexOf(".") + 1);
      const video = {
        url: url,
        type: type,
      };
      switch (ext) {
        case "m3u8":
          video.type = "video/m3u8";
          video.customType = {
            "video/m3u8": function (video, _player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          };
      }
      console.log(video);
      return video;
    };
    const play = () => {
      if (!datasource.value) {
        return;
      }
      if (player.value) {
        player.value.pause();
        player.value.destroy();
      }
      player.value = new DPlayer({
        container: container.value,
        screenshot: false,
        autoplay: true,
        loop: true,
        preload: "auto",
        hotkey: true,
        mutex: true,
        video: convert(datasource.value),
      });
      player.value.on("ended", () => {
        player.value.destroy();
        player.value = undefined;
      });
    };
    const openLocalFile = () => {
      Utils.openLocalFile((files) => {
        console.log(files);
        if (files && files.length > 0) {
          datasource.value = files[0];
          play();
        }
      });
    };
    return { container, player, openLocalFile };
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #1d1d1d;
  position: absolute;
}
.controller {
  position: absolute;
  background: transparent;
  z-index: 2;
}
</style>

<style lang="scss">
.dplayer {
  width: 100%;
  height: 100%;
}

.dplayer-video-wrap {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.dplayer-menu {
  max-width: 0px;
  max-height: 0px;
  visibility: hidden;
  display: none;
}

.dplayer-logo {
  max-width: 0px;
  max-height: 0px;
  display: none;
}
</style>
