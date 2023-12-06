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
// import { useFormRenderer } from "@harbor-design/proform";
import { Form, FormItem } from "@arco-design/web-vue";
import Item from "@/Infra/ProFormRuntimeDoms/Item";
import Group from "@/Infra/ProFormRuntimeDoms/Group";
import List from "@/Infra/ProFormRuntimeDoms/List";
import ListItem from "@/Infra/ProFormRuntimeDoms/ListItem";
import LegendaryCursor from "legendary-cursor";

const app = createApp(App);
const store = createPinia();
const formRender = useFormRenderer({
  Form,
  FormItem,
  Item,
  Group,
  List,
  ListItem,
});

window.addEventListener("load", () => {
  LegendaryCursor.init({
    lineSize: 0.15,
    opacityDecrement: 0.55,
    speedExpFactor: 0.8,
    lineExpFactor: 0.6,
    sparklesCount: 100,
    maxOpacity: 0.1,
  });
});

app.use(ArcoVue);
app.use(formRender);
app.use(router);
app.use(store);
app.use(ImageAutoLoader());
app.mount("#app");
