import { createApp } from "vue";
import App from "./App";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@harbor-design/arco-design-vue/assets/index.module.scss";
import "@/assets/style/global.scss";
import router from "@/router";
import { createPinia } from "pinia";
import { ImageAutoLoader } from "@/plugins/ImageCollector";
import { useFormRenderer } from "@harbor-design/arco-design-vue";
import { Form, FormItem } from "@arco-design/web-vue";

const app = createApp(App);
const store = createPinia();
const formRender = useFormRenderer({
  Form,
  FormItem,
});

app.use(ArcoVue);
app.use(formRender);
app.use(router);
app.use(store);
app.use(ImageAutoLoader());
app.mount("#app");
