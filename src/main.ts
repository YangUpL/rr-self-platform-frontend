import { createApp } from "vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "@/access";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .use(mavonEditor)
  .mount("#app");
