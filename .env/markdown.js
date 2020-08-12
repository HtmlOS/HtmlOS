const REGEX_MORE = /<!--\s*more\s*-->/;
const REGEX_COMMENT = /<!--(.[^-]*(?=-->))-->/;
const REGEX_IMAGE = /!\[([^\]]+)\]\(([^)]*)\)/;

const REGEX_TITLE = /#+\s+(.*)/;

const Markdown = function(content) {
  content = content || "";
  return {
    content: content,
    lines: content.split("\n"),

    title() {
      for (let line of this.lines) {
        line = line.trim();
        const pc = new RegExp(REGEX_COMMENT, "gim");
        const pt = new RegExp(REGEX_TITLE, "gim");
        if (pc.test(line) !== true && pt.test(line) === true) {
          return RegExp.$1;
        }
      }
    },

    excerpt() {
      const list = [];
      const pm = new RegExp(REGEX_MORE, "gim");
      if (pm.test(this.content)) {
        const more = this.content.substr(0, pm.lastIndex);
        const splits = more.split("\n");
        for (let line of splits) {
          line = line.trim();
          if(line === "" && list.length === 0) {
            continue;
          }
          const pc = new RegExp(REGEX_COMMENT, "gim");
          if (pc.test(line) === false) {
            list.push(line);
          }
        }
      }
      return list.join("\n");
    },

    attributes() {
      const list = {};
      const pc = new RegExp(REGEX_COMMENT, "gim");
      while (pc.test(this.content)) {
        let line = RegExp.$1.trim();
        if (line.indexOf(":") < 0) {
          continue;
        }
        console.log(line);
        const key = line.split(":")[0].trim();
        const value = line.split(":")[1].trim();
        if(key !== "" && value !== ""){
          list[key] = value;
        }
      }
      return list;
    },

    images() {
      const list = [];
      const pi = new RegExp(REGEX_IMAGE, "gim");
      while (pi.test(this.content)) {
        const alt = RegExp.$1;
        const url = RegExp.$2;
        list.push({ alt: alt.trim(), url: url.trim() });
      }
      return list;
    },
  };
};
exports.default = Markdown;
