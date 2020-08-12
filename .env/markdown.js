const REGEX_MORE = /<!--\s*more\s*-->/;
const REGEX_COMMENT = /<!--(.[^-]*(?=-->))-->/;
const REGEX_IMAGE = /!\[([^\]]*)\]\(([^)]*)\)/;

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
      const temp = [];
      
      let moreLineNumber= -1;
      for (let i in this.lines) {
        const line = this.lines[i].trim();
        
        // 抛弃注释
        const pc = new RegExp(REGEX_COMMENT, "g");
        if (pc.test(line) === true) {
          continue;
        }

        temp.push(line);
        // 标记行号
        const pm = new RegExp(REGEX_MORE, "g");
        if (pm.test(line)) {
          moreLineNumber = parseInt(i, 10);
          break;
        }
      }

      if(moreLineNumber >=0){
        // 发现 more 注释 行号, 返回摘要
        return temp.join("\n");
      }

      // 没有发现 more 注释, 开始自动生成摘要流程
      const friendlyCount = 5;
      let holder=[];
      let block=[];

      for(const line of temp){
        if(line=== ""){
          const totalCount = holder.length+ block.length;
          if(totalCount >=friendlyCount){
            return holder.join("\n");
          }else{
            holder = holder.concat(block);
          }
          block =[];
        }else{
          block.push(line);
        }
      }

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
