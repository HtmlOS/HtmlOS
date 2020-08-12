<template>
  <div class="q-pa-md">
    <q-list>
      <q-item
        v-for="item in blogs"
        :key="item.name"
        clickable
        v-ripple
        class="item-section"
      >
        <q-item-section v-ripple @click="openblog(item)">
          <markdown :content="`# ${item.title}`" />

          <q-item-label style="margin-bottom: 10px; background-color: white;">
            {{ `📅 ${item.created.format("yyyy-MM-dd HH:mm")}` }}
          </q-item-label>

          <markdown :content="item.fixUrl(item.excerpt)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
.item-section {
  margin: 8px;
  padding: 8px;
  background: whitesmoke;
}
</style>

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
  methods: {
    openblog(blog) {
      blog.fetchContent((src, md) => {
        console.log(src, md);
      });
    }
  },
  mounted() {
    this.blogs = BlogManager.blogs;
  },
  destroyed() {}
};
</script>
