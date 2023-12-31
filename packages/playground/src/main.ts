import { createApp } from "vue";
import App from "./App";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/assets/style/global.scss";
import router from "@/router";
import { createPinia } from "pinia";
import { ImageAutoLoader } from "@/plugins/ImageCollector";
import { useFormPresetConfigurer } from "@harbor-design/proform";
import { Form, FormItem } from "@arco-design/web-vue";
import { NForm, NFormItem } from "naive-ui";
import Item from "@/bootstrap/ProFormRuntimeDoms/Item";
import Group from "@/bootstrap/ProFormRuntimeDoms/Group";
import List from "@/bootstrap/ProFormRuntimeDoms/List";
import ListItem from "@/bootstrap/ProFormRuntimeDoms/ListItem";
import { createPersistedState } from "pinia-plugin-persistedstate";
import "@/architecture/index";
import { ServiceAutoLoader } from "@/plugins/serviceCollector";
import { setupRouteGuards } from "@/router/guards";

const app = createApp(App);
const store = createPinia();
store.use(
	createPersistedState({
		key: (id) => `__persisted__${id}`,
	}),
);

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
app.use(store);
app.use(ServiceAutoLoader());
setupRouteGuards(router);
app.use(router);
app.use(ImageAutoLoader());
app.mount("#app");
