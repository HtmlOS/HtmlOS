const REGEX_MORE = /<!--\s*more\s*-->/;
const REGEX_COMMENT = /<!--(.[^>]*(?=-->))-->/;
const REGEX_IMAGE = /!\[([^\]]*)\]\(([^)]*)\)/;

const REGEX_TITLE = /#+\s+(.*)/;

const Markdown = function(content) {
  content = content || "";
  return {
    content: content,
    lines: content.split("\n"),

    title() {
      for (const line of this.lines) {
        const pc = new RegExp(REGEX_COMMENT, "gim");
        const pt = new RegExp(REGEX_TITLE, "gim");
        if (!pc.test(line.trim()) && pt.test(line.trim())) {
          return RegExp.$1;
        }
      }
    },

    excerpt() {
      const temp = [];

      let moreLineNumber = -1;
      for (let i in this.lines) {
        const line = this.lines[i];

        // 标记行号
        const pm = new RegExp(REGEX_MORE, "gim");
        if (pm.test(line.trim())) {
          moreLineNumber = parseInt(i, 10);
          break;
        }
        
        // 抛弃注释
        const pc = new RegExp(REGEX_COMMENT, "gim");
        if (pc.test(line.trim())) {
          continue;
        }

        temp.push(line);
      }

      if (moreLineNumber >= 0) {
        // 发现 more 注释 行号, 返回摘要
        return temp.join("\n");
      }

      // 没有发现 more 注释, 开始自动生成摘要流程
      const friendlyBlockCount = 2;
      let holder = [];
      let block = [];
      let blockCount = 0;

      for (const line of temp) {
        if (line === "") {
          blockCount++;
          if (blockCount >= friendlyBlockCount) {
            return holder.join("\n");
          } else {
            holder = holder.concat(block);
          }
          block = [];
        } else {
          block.push(line);
        }
      }
    },

    attributes() {
      const list = {};
      const pc = new RegExp(REGEX_COMMENT, "gim");
      while (pc.test(this.content)) {
        const line = RegExp.$1.trim();
        if (line.indexOf(":") < 0) {
          continue;
        }
        const key = line.substr(0, line.indexOf(":")).trim();
        const value = line.substr(line.indexOf(":")+1).trim();
        if (key !== "" && value !== "") {
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
