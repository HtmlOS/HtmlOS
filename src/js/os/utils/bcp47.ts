"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcp47 = require("bcp-47");
bcp47.normalize = require("bcp-47-normalize");

class Bcp47 {
  static normalize(tag: string): string {
    return bcp47.normalize(tag);
  }

  static localize(tag: string): string {
    tag = tag || "";
    const origin = tag.trim();
    const normalize = bcp47.normalize(origin);
    const schema = bcp47.parse(normalize);
    if (schema.script) {
      return `${schema.language}-${schema.script}`;
    } else {
      return `${schema.language}`;
    }
  }
}

export default Bcp47;
