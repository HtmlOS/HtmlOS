import "particles.js";

class Particles {
  static attach() {
    window.particlesJS(require("@/assets/particles.json"));
  }

  static detach() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom.forEach((pJSDomItem: any) => {
        pJSDomItem.pJS.fn.vendors.destroypJS();
      });
      window.pJSDom = [];
    }
  }
}

export default Particles;
