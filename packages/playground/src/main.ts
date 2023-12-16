import { createApp } from "vue";
import App from "./App";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@harbor-design/arco-design-vue/assets/index.module.scss";
import "@/assets/style/global.scss";
import router from "@/router";
import { createPinia } from "pinia";
import { ImageAutoLoader } from "@/plugins/ImageCollector";
import { useFormPresetConfigurer } from "@harbor-design/arco-design-vue";
// import { useFormRenderer } from "@harbor-design/proform";
import { Form, FormItem } from "@arco-design/web-vue";
import { NForm, NFormItem } from "naive-ui";
import Item from "@/Infra/ProFormRuntimeDoms/Item";
import Group from "@/Infra/ProFormRuntimeDoms/Group";
import List from "@/Infra/ProFormRuntimeDoms/List";
import ListItem from "@/Infra/ProFormRuntimeDoms/ListItem";

const app = createApp(App);
const store = createPinia();
useFormPresetConfigurer({
	ui: "ArcoVue",
	uiPresets: {
		ArcoVue: {
			container: {
				Form,
				FormItem,
				Item,
				Group,
				List,
				ListItem,
			},
		},
		NaiveUI: {
			container: {
				Form: NForm,
				FormItem: NFormItem,
				Item,
				Group,
				List,
				ListItem,
			},
		},
	},
});

app.use(ArcoVue);
app.use(router);
app.use(store);
app.use(ImageAutoLoader());
app.mount("#app");
