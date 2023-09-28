import { createApp } from "vue";
import App from "./App";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@harbor-design/arco-design-vue/assets/index.module.scss";
import "@/assets/style/global.scss";
import router from "@/router";
import { createPinia } from "pinia";

const app = createApp(App);
const store = createPinia();

app.use(ArcoVue);
app.use(router);
app.use(store);
app.mount("#app");
