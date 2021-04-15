"use strict";

const BlogLoader = require("./public/blog/loader");
const Markdown = require("./src/plugins/blog").Markdown;

const blogs = [];

for (const blog of BlogLoader.blogs) {
  const markdown = new Markdown(blog.content);
  for (const p in markdown) {
    const v = markdown[p];
    if (v) {
      blog[p] = v;
    }
  }
  delete blog.content;
  blogs.push(blog);
}
exports.default = {
  blogs,
};
