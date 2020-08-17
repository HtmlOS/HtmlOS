<template>
  <div class="fill-parent">
    <q-timeline color="secondary">
      <q-timeline-entry v-for="(blog, index) in blogs" :key="index">
        <template v-slot:title>
          <markdown :content="`#### ${blog.title}`" />
        </template>
        <template v-slot:subtitle>
          {{ blog.created }}
        </template>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { BlogManager } from "@/plugins/blog";
import Markdown from "@/components/editor/Markdown";

export default {
  components: { Markdown },
  data() {
    return {
      blogs: []
    };
  },
  mounted() {
    this.blogs = BlogManager.blogs;
  }
};
</script>
