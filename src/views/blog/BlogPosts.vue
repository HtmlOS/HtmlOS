<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item v-for="(item, i) in blogs" :key="item.name" clickable v-ripple>
        <q-item-section clickable v-ripple @click="openblog(item)">
          <q-item-label>
            {{ `${i + 1}` }}
            <a :href="item.file">{{ `${item.file}` }}</a>
          </q-item-label>
          <q-item-label>{{ `${item.created.format("yyyy年MM月dd日 HH:mm")}` }}</q-item-label>
          <markdown :content="item.fixUrl(item.excerpt)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { BlogManager } from "@/plugins/blog";

import Markdown from "@/components/editor/Markdown";

export default {
  name: "BlogPosts",
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
