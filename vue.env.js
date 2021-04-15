"use strict";

const _fs = require("fs");
const _path = require("path");

const Markdown = require("./src/plugins/blog").Markdown;

const processMarkdownFile = function (dir, hook) {
  _fs.readdirSync(dir).forEach(function (filename) {
    const item = _path.join(dir, filename);
    const stat = _fs.statSync(item);
    if (stat.isFile() && filename.toLocaleLowerCase().endsWith(".md")) {
      const data = _fs.readFileSync(item, "utf-8");
      hook(item, stat, data);
    } else if (stat.isDirectory()) {
      processMarkdownFile(item, hook);
    }
  });
};

const load = function (dir) {
  const blogs = [];
  processMarkdownFile(_path.resolve(dir), function (path, stat, content) {
    const publicDir = _path.resolve("./") + "/public";
    const filePath = path.replace(/\\/g, "/").substr(publicDir.length);
    const fileFullName = filePath.substr(filePath.lastIndexOf("/") + 1);
    const fileName = fileFullName.substr(0, fileFullName.lastIndexOf("."));
    if (stat.size <= 0) {
      return;
    }
    if (fileFullName.toUpperCase() === "README.MD") {
      return;
    }
    const markdown = new Markdown(content);
    // console.log(stat);
    const blog = {
      title: fileName,
      created: stat.birthtime,
      updated: stat.mtime,
      size: stat.size,
      file: filePath,
    };

    for (const p in markdown) {
      const v = markdown[p];
      if (v) {
        blog[p] = v;
      }
    }
    delete blog.content;
    blogs.push(blog);
  });
  // console.log(JSON.stringify(blogs, null, 2));
  return blogs;
};

exports.default = {
  blogs: load("public/blog"),
};
