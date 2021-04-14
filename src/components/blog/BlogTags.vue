<template>
  <div class="blog-tags">
    <q-chip
      v-if="blog.created"
      square
      size="sm"
      icon="event"
      color="green-1"
      :label="
        $t('blog.created') + ' : ' + blog.created.format('yyyy-MM-dd HH:mm')
      "
    />

    <q-chip
      v-if="blog.updated"
      square
      size="sm"
      icon="event"
      color="light-green-1"
      :label="
        $t('blog.updated') + ' : ' + blog.updated.format('yyyy-MM-dd HH:mm')
      "
    />

    <q-chip v-if="blog.tags && blog.tags.length > 0" style="background: #0000">
      <q-chip
        v-for="(tag, index) in blog.tags"
        :key="index"
        square
        size="sm"
        color="orange"
        text-color="white"
      >
        {{ tag }}
      </q-chip>
    </q-chip>
  </div>
</template>

<style lang="scss" scoped>
.blog-tags {
  margin-bottom: 8px;
}
</style>

<script>
export default {
  props: {
    blog: Object,
  },
};
</script>
