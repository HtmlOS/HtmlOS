<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <img src="/favicon.ico" style="width: 32px; height: 32px" />

      <q-toolbar-title
        v-if="$q.screen.gt.xs"
        shrink
        class="row items-center no-wrap"
      >
        <span class="q-ml-sm">{{ $t("site.name") }}</span>
      </q-toolbar-title>
      <q-space />

      <q-input
        class
        outlined
        dense
        v-model="search"
        style="width: 50%;"
        placeholder="Search for topics, locations & sources"
      >
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input>

      <q-space />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
      </q-avatar>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  }
};
</script>
