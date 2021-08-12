"use strict";

export const blogs: string[] = [];

const files = require.context("@/../public/blog", true, /\.\/.+\/.+\.md$/);
files.keys().forEach((it) => {
  const path = "/blog/" + it.substr(2);
  blogs.push(path);
  console.log(path);
});
