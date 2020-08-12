const fs = require("fs");
const path = require("path");
//

const Markdown = require("./markdown.js").default;

const BLOG_DIR = "public/blog";
//
const blogs = [];

const processMarkdownFile = function(dir, hook) {
  const items = fs.readdirSync(dir);
  items.forEach(function(filename) {
    const item = path.join(dir, filename);
    const stat = fs.statSync(item);
    if (stat.isFile() && filename.toLocaleLowerCase().endsWith(".md")) {
      const data = fs.readFileSync(item, "utf-8");
      hook(item, stat, data);
    } else if (stat.isDirectory()) {
      processMarkdownFile(item, hook);
    }
  });
};

processMarkdownFile(path.resolve(BLOG_DIR), function(path, stat, content) {
  const fixed = "/blog" + path.replace(/\\/g, "/").split(BLOG_DIR)[1];
  const file = fixed.substr(fixed.lastIndexOf("/") + 1);
  const filename = file.substr(0, file.lastIndexOf("."));
  if (stat.size <= 0) {
    return;
  }
  const markdown = Markdown(content);
  const timeModified = stat.mtime;
  const timeCreated = stat.birthtime;
  // console.log(stat);
  const blog = {
    file: fixed,
    size: stat.size,
    created: timeCreated,
    updated: timeModified,
    title: markdown.title() || filename,
    images: markdown.images(),
    excerpt: markdown.excerpt(),
  };
  Object.assign(blog, markdown.attributes());
  // console.log(blog);
  blogs.push(blog);
});
console.log(JSON.stringify(blogs, null, 2));
exports.default = blogs;
