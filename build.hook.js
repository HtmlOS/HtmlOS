const fs = require("fs");

(function (file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
})("./dist/blog/.git");
