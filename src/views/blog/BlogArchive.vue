<template>
  <div class="fill-parent blog-page">
    <q-timeline color="secondary">
      <q-timeline-entry v-for="(yyyy, _index) in yyyys" :key="_index">
        <template v-slot:title>{{ yyyy }}</template>
        <q-list bordered separator style="margin-right:8px;">
          <q-item
            clickable
            v-ripple
            v-for="(blog, index) in blogs[yyyy]"
            :key="index"
            @click="$router.push(`/blog/articles/${blog.name}`)"
            style="padding-top:12px;"
          >
            <div style="margin-right:16px">
              {{ blog.created.format("MM-dd") }}
            </div>
            <markdown :content="`#### ${blog.title}`" />
          </q-item>
        </q-list>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { BlogManager } from "@/plugins/blog";

export default {
  data() {
    return {
      yyyys: [],
      blogs: {}
    };
  },
  mounted() {
    for (const blog of BlogManager.blogs) {
      const dates = blog.created.format("yyyy-MM-dd").split("-");
      const yyyy = dates[0];
      if (!Object.hasOwnProperty.call(this.blogs, yyyy)) {
        this.blogs[yyyy] = [];
        this.yyyys.push(yyyy);
      }
      this.blogs[yyyy].push(blog);
    }
  }
};
</script>
