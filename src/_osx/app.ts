class App {
  name: string;
  icon: string;
  path: string;
  exts: Array<string>;

  constructor(name: string, icon: string, path: string, exts: Array<string>) {
    this.name = name;
    this.icon = icon;
    this.path = path;
    this.exts = exts;
  }
  clone(): App {
    return new App(this.name, this.icon, this.path, this.exts);
  }
}

class AppManager {
  public static readonly apps: Array<App> = [];

  public static list(): Array<App> {
    const list: Array<App> = [];
    for (const app of this.apps) {
      list.push(app.clone());
    }
    return list;
  }

  public static find(ext: string): Array<App> {
    const point = ext.indexOf(".");
    ext = point < 0 ? ext : ext.substr(point + 1);
    const list: Array<App> = [];
    for (const i in this.apps) {
      const app = this.apps[i];
      if (app.exts.includes(ext)) {
        list.push(app.clone());
      }
    }
    return list;
  }

  public static install(target: App) {
    for (const i in this.apps) {
      const app = this.apps[i];
      if (app.name === target.name) {
        throw new Error(`App <${name}> already installed`);
      }
    }
    this.apps.push(target);
  }

  public static unstall(name: string) {
    for (const i in this.apps) {
      const app = this.apps[i];
      if (app.name === name) {
        this.apps.splice(parseInt(i, 10), 1);
      }
    }
  }
}

export { App, AppManager };
