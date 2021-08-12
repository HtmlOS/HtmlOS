<template>
  <div class="clock">{{ clock }}</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "DigitClock",
  setup() {
    const datetime = () => {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      return (
        year +
        "-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0") +
        " " +
        String(hh).padStart(2, "0") +
        ":" +
        String(mm).padStart(2, "0") +
        ":" +
        String(ss).padStart(2, "0")
      );
    };

    const clock = ref(datetime());
    let clockId;

    onMounted(() => {
      clockId = setInterval(() => (clock.value = datetime()), 1000);
    });
    onUnmounted(() => {
      clearInterval(clockId);
    });
    return {
      clock,
    };
  },
};
</script>

<style lang="scss" scoped>
.clock {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
