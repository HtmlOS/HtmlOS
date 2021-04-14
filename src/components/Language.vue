<template>
  <div class="gravity-center">
    <q-btn push color="primary" :label="label" icon="language">
      <q-popup-proxy ref="popup">
        <q-banner>
          <q-option-group v-model="lang" :options="languages" color="primary" />
        </q-banner>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<style scoped lang="scss"></style>

<script>
export default {
  data() {
    return {
      lang: "",
      label: "",
    };
  },
  computed: {
    languages() {
      const list = [];
      for (const lang in this.$intl.languages) {
        list.push({
          value: lang,
          label: this.$intl.languages[lang],
        });
      }
      return list;
    },
  },
  mounted() {
    this.lang = this.$intl.locale;
    this.label = this.$intl.languages[this.lang];
  },
  watch: {
    lang: function (val, old) {
      this.label = this.$intl.languages[this.lang];
      this.$intl.locale = val;
      setTimeout(() => {
        this.$refs.popup.hide();
      }, 50);
    },
  },
};
</script>
