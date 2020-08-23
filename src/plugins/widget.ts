

import Markdown from "@/components/editor/Markdown.vue";

class Widget{

    static install(Vue: any) {
        Vue.component("markdown", Markdown);
    }
}

export default Widget;