import AppEnv from "./env";

const getAttributes = function(str: string): Array<string> {
  const array = str ? str.split(",") : [];
  const list: Array<string> = [];
  for (let item of array) {
    item = item.trim();
    if (item.length > 0) {
      list.push(item);
    }
  }
  return list;
};

class Blog {
  file: string;
  path: string;
  name: string;
  size: number;

  title: string;

  created: Date;
  updated: Date;

  images: Array<{ alt: string; url: string }>;
  tags: Array<string>;
  categories: Array<string>;

  excerpt?: string;
  content?: string;

  constructor(obj: any) {
    this.file = obj.file;
    this.path = obj.file.substr(0, obj.file.lastIndexOf("/"));
    this.name = obj.file.substr(obj.file.lastIndexOf("/") + 1);
    this.size = obj.size;
    this.title = obj.title;
    this.created = new Date(obj.created);
    this.updated = new Date(obj.updated);
    this.images = obj.images || [];
    this.tags = getAttributes(obj.tags);
    this.categories = getAttributes(obj.categories);
    this.excerpt = this.parseExcerpt(obj.excerpt);
    this.content = this.parseContent(obj.content);
  }

  /**
   * 返回修正后的内容
   * 1. 移除 <!-- --> 注释的内容
   * 2. 移除与 this.title 相同的第一个大标题
   * @param content 源内容
   */
  fixedData(content: string) {
    if (content === undefined) {
      return undefined;
    }
    const lines = content.split("\n");
    const temp: Array<string> = [];
    let titled = false;
    for (const line of lines) {
      // 判断是否是注释, 如果是则跳过
      const pc = /^<!--(.[^>]*(?=-->))-->$/;
      if (pc.test(line.trim()) === true) {
        continue;
      }
      // 判断是否是 '# 标题'
      const pt = /^#+\s+(.*)$/;
      if (titled === false && pt.test(line.trim()) === true) {
        // 检查这个标题是否与this.title 相同, 如果相同, 则跳过
        if (RegExp.$1.trim() === this.title.trim()) {
          titled = true;
          continue;
        }
      }

      // 不需要第一个空行
      if (line === "" && temp.length === 0) {
        continue;
      }
      // 跳过重复空行
      if (line === "" && temp.length > 0 && temp[temp.length - 1] === "") {
        continue;
      }
      temp.push(line);
    }
    return temp.join("\n");
  }

  parseExcerpt(content: string) {
    if (content === undefined) {
      return undefined;
    }
    return (this.excerpt = this.fixedData(content));
  }

  parseContent(content: string) {
    if (content === undefined) {
      return undefined;
    }

    return (this.content = this.fixedData(content));
  }

  fetchContent(
    hook: (src?: string, md?: string) => void,
    err: (e: any) => void
  ) {
    if (this.content) {
      hook(this.content);
    } else {
      fetch(this.file)
        .then(response => {
          return response.text();
        })
        .then(content => {
          const src = this.parseContent(content);
          hook(src, this.fixUrl(src));
        })
        .catch(error => err(error));
    }
  }

  fixUrl(content?: string, baseUrl?: string): string | undefined {
    if (content) {
      baseUrl = baseUrl || this.path;
      const source = (baseUrl + "/").replace(/\/\//gim, "/");
      const pu = /\[([^\]]*)\]\(\s*\.\/([^)]*)\)/gim;
      return content.replace(pu, "[$1](" + source + "$2)");
    }
  }
}

class BlogManager {
  static blogs: Array<Blog> = [];
  static baseUrl?: string;

  static load() {
    for (const blog of AppEnv.blogs) {
      // 跳过 readme.md
      if (blog.file.toUpperCase().endsWith("README.MD")) {
        continue;
      }
      this.blogs.push(new Blog(blog));
    }
    console.log(this.blogs);
  }

  static findByName(name: string): Blog | undefined {
    for (const blog of this.blogs) {
      if (blog.name === name) {
        return blog;
      }
    }
  }

  static tree() {}

  static timeline() {}

  static tags() {}

  static categories() {}

  static search(
    key: string,
    hook: (blog: Blog, line: number, text: string) => void
  ) {}
}

BlogManager.load();

export { Blog, BlogManager };
