<template>
  <q-item>
    <q-chip
      square
      size="sm"
      icon="event"
      color="green-1"
      :label="
        $t('blog.created') + ' : ' + blog.created.format('yyyy-MM-dd HH:mm')
      "
    />
    <q-chip
      square
      size="sm"
      icon="event"
      color="light-green-1"
      :label="
        $t('blog.updated') + ' : ' + blog.updated.format('yyyy-MM-dd HH:mm')
      "
    />
    <q-chip
      v-for="(tag, index) in blog.tags"
      :key="index"
      square
      size="sm"
      color="orange"
      text-color="white"
      >{{ tag }}</q-chip
    >
  </q-item>
</template>

<script>
export default {
  props: {
    blog: Object
  }
};
</script>
