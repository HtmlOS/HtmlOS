<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item v-for="(item, i) in blogs" :key="item.name" clickable v-ripple>
        <q-item-section clickable v-ripple @click="openblog(item)">
          <q-item-label>{{ `${i}` }}</q-item-label>
          <q-item-label>{{ `${item.created}` }}</q-item-label>
          <p>
            <code>{{ `${item.fixUrl(item.excerpt)}` }}</code>
          </p>
          <a :href="item.images[0].url">{{ `${item.images[0].url}` }}</a>
          <a :href="item.file">{{ `${item.file}` }}</a>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { BlogManager } from "@/plugins/blog";
import { LoveHeart } from "@/plugins/loveheart";
export default {
  name: "Blog",
  components: {},
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
    LoveHeart.attach();
  },
  destroyed() {
    LoveHeart.detach();
  }
};
</script>
