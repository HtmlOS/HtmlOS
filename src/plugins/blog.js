"use strict";

const AppEnv = require("./env").default;

const REGEX_MD_COMMENT = /<!--(((?!-->)[\s\S\r\n])*)-->/;
const REGEX_MD_TITLE = /^\s?#{1,6}\s+(.*)/;
const REGEX_MD_IMAGE = /!\[(.*?)\]\((.*?)\)/;
const REGEX_MD_RELATIVE_LINK = /\[([^\]]*)\]\(\s*(((?!http:\/\/)(?!https:\/\/)[^)\s]*)*)\s*\)/;

const processTitle = function (content) {
  const regex = new RegExp(REGEX_MD_TITLE, "m");
  if (regex.test(content)) {
    return RegExp.$1.trim();
  } else {
    return undefined;
  }
};

const processAttributes = function (attr) {
  if (!attr) {
    return {};
  }
  const split = attr.split("\n")[0].split(" ")[0].split(":");
  const key = split[0].trim();
  const value = attr.substr(key.length + 1).trim();
  return {
    key: key,
    value: value,
  };
};

const processCover = function (content) {
  if (!content) {
    return undefined;
  }
  const regexComment = new RegExp(REGEX_MD_COMMENT, "gm");
  const regexImage = new RegExp(REGEX_MD_IMAGE, "gm");
  content = content.replace(regexComment, "");
  if (regexImage.test(content)) {
    const alt = RegExp.$1;
    const url = RegExp.$2;
    return { alt: alt.trim(), url: url.trim() };
  } else {
    return undefined;
  }
};

const processExcerpt = function (attrs) {
  const regexComment = new RegExp(REGEX_MD_COMMENT, "gm");
  let excerpt = attrs["more"];
  if (excerpt) {
    excerpt = excerpt.replace(regexComment, "").replace(/\n+/gm, "\n").trim();
  }
  // remove unused prop 'more'
  delete attrs["more"];
  return excerpt;
};

class Markdown {
  constructor(content) {
    const regexComment = new RegExp(REGEX_MD_COMMENT, "gm");
    const attrs = {};
    while (regexComment.test(content)) {
      const match = RegExp.lastMatch;
      const pos = regexComment.lastIndex;
      const attr = processAttributes(RegExp.$1.trim());
      switch (attr.key) {
        case "more":
          attr.value = content.substr(0, pos);
          break;
        case "iframe":
          content =
            content.substr(0, pos - match.length) +
            attr.value +
            content.substr(pos);
          break;
        default:
          break;
      }
      attrs[attr.key] = attr.value;
    }
    this.content = content;
    this.title = processTitle(content);
    this.cover = processCover(content);
    this.excerpt = processExcerpt(attrs);
    // assign attrs to this
    for (const p in attrs) {
      const v = attrs[p];
      if (v !== undefined && v !== null && v.trim() !== "") {
        this[p] = v;
      }
    }
  }
}

class Blog {
  constructor(envBlogObj) {
    if (!envBlogObj) {
      return;
    }
    this.file = envBlogObj.file;
    this.path = envBlogObj.file.substr(0, envBlogObj.file.lastIndexOf("/"));
    this.name = envBlogObj.file.substr(envBlogObj.file.lastIndexOf("/") + 1);
    this.size = envBlogObj.size;
    this.title = envBlogObj.title;
    this.created = new Date(envBlogObj.created);
    this.updated = new Date(envBlogObj.updated);
    this.cover = envBlogObj.cover;
    this.excerpt = envBlogObj.excerpt;

    this.categories = (envBlogObj.categories || "").split(",");

    // tags = path tags + comment tags
    this.tags = (this.path || "")
      .replace(new RegExp(envBlogObj.__basedir), "")
      .replace(/\//g, ",");
    this.tags = (this.tags + "," + (envBlogObj.tags || "")).replace(
      /,\s*,/g,
      ","
    );
    this.tags = this.tags
      .replace(/^\s*,/, "")
      .replace(/,\s*$/, "")
      .replace(/[,/]+/g, ",")
      .split(",");
    try {
      this.tags = Array.from(new Set(this.tags));
    } catch (e) {
      console.log(e);
    }

    // fix excerpt
    if (!processCover(this.excerpt) && this.cover) {
      const fixedCover = "![" + this.cover.alt + "](" + this.cover.url + ")\n";
      this.excerpt = fixedCover + this.excerpt;
    }
  }

  // hook(src, md)
  // src 用于编辑， md 用于预览
  fetchContent(hook, err) {
    fetch(this.file)
      .then((response) => {
        return response.text();
      })
      .then((content) => {
        if (hook) {
          const md = new Markdown(content);
          hook(content, this.fixed(md.content));
        }
      })
      .catch((error) => err(error));
  }

  fixed(content) {
    if (!content) {
      return "";
    }
    // 去除所有注释
    const regexComment = new RegExp(REGEX_MD_COMMENT, "gm");
    content = content.replace(regexComment, "");

    // 去除重复大标题
    if (this.title === processTitle(content)) {
      const regex = new RegExp(REGEX_MD_TITLE, "m");
      content = content.replace(regex, "");
    }
    // 当前md文件所在路径
    const path = (this.path + "/").replace(/\/\//gim, "/");

    // 替换超链接地址
    const regex = new RegExp(REGEX_MD_RELATIVE_LINK, "gim");
    return content.replace(regex, "[$1](" + path + "$2)");
  }
}

class BlogManager {
  static blogs = BlogManager.load();

  static load() {
    const blogs = [];
    if (AppEnv.blogs) {
      AppEnv.blogs.sort((a, b) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
      for (const item of AppEnv.blogs) {
        blogs.push(new Blog(item));
      }
    }
    return blogs;
  }

  static findByName(name) {
    for (const blog of BlogManager.blogs) {
      if (blog.name === name) {
        return blog;
      }
    }
  }
}

module.exports = { Markdown, Blog, BlogManager };
