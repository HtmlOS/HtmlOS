const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");
const pkg = require("./package.json");

(function() {
  shell("yarn lint");
  shell("yarn build");

  const users = {
    gitee: {
      name: "gankcode",
      mail: "zlhc@live.com",
      publish: "https://gitee.com/htmlos/htmlos.git",
      website: `https://htmlos.gitee.io`
    },
    github: {
      name: "robotism",
      mail: "zlhc@live.com",
      publish: "https://github.com/HtmlOS/htmlos.github.io.git",
      website: `https://htmlos.github.io`
    }
  };
  const user = users["github"];
  const remote = shell("git remote -v", process.cwd(), "pipe");
  const regex = /(http.{1}:\/\/.*\.git)/;
  const repo = remote.join("\n").match(regex)[0];

  deleteFile(path.resolve(process.cwd(), "./dist/blog/.git"));

  writeFile(
    path.resolve(process.cwd(), "./dist/README.md"),
    [
      `# Htmlos Website`,
      ``,
      `##### version: ${pkg.version}`,
      ``,
      `> Sources publish @ [${repo}](${repo})<br/>`,
      ``,
      `> Website publish @ [${user.website}](${user.website})`,
      ``
    ].join("\n")
  );
  writeFile(path.resolve(process.cwd(), "./dist/CNAME"), "gankcode.com");

  const commands = [
    `git config user.name '${user.name}'`,
    `git config user.email '${user.mail}'`,

    `git init`,
    `git add .`,
    `git commit -m 'deploy'`,
    `git remote add origin ${user.publish}`,
    `git push -u origin master --force`
  ];

  commands.forEach(function(cmd) {
    shell(cmd, path.resolve(process.cwd(), "./dist"));
  });
})();

function shell(command, directory, stdio) {
  console.log("$ " + command);
  try {
    const args = command.split(" ");
    const cmd = args.shift();

    const result = spawn.sync(cmd, args, {
      cwd: directory || process.cwd(),
      env: process.env,
      stdio: stdio || "inherit",
      encoding: "utf-8"
    });
    if (result.status !== 0) {
      process.exit(result.status);
    } else if (result.output) {
      const output = [];
      for (const log of result.output) {
        if (log !== undefined && log !== null && log.length > 0) {
          output.push(log);
        }
      }
      console.log(output.join("\n"));
      return output;
    }
  } catch (err) {
    console.log("catch err =>", err);
  }
}

function deleteFile(file) {
  if (!fs.existsSync(file)) {
    return;
  }
  if (fs.statSync(file).isDirectory()) {
    const list = fs.readdirSync(file);
    list.forEach((v, i) => {
      const url = file + "/" + v;
      const stats = fs.statSync(url);
      if (stats.isFile()) {
        fs.unlinkSync(url);
      } else {
        arguments.callee(url);
      }
    });
    fs.rmdirSync(file);
  } else {
    fs.unlinkSync(file);
  }
}

function writeFile(file, content) {
  if (content) {
    fs.writeFileSync(file, content);
  }
}
