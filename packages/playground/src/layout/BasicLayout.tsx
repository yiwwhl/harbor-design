import { defineComponent } from "vue";
import {
	Layout,
	LayoutContent,
	LayoutHeader,
	LayoutSider,
} from "@arco-design/web-vue";
import styles from "./index.module.scss";
import Header from "@/layout/components/Header";
import Menu from "@/layout/components/Menu";
import { RouterView } from "vue-router";
import useBasicSettingStore from "@/store/modules/basicSetting";

export default defineComponent({
	setup() {
		const basicSetting = useBasicSettingStore();

		return () => {
			return (
				<Layout class={styles.layout}>
					<LayoutHeader>
						<Header />
					</LayoutHeader>
					<Layout>
						<LayoutSider
							class={styles.layout_sider}
							collapsed={basicSetting.sidebarMenu.collapse}
						>
							<Menu />
						</LayoutSider>
						<Layout>
							<LayoutContent class={styles.layout_content}>
								<RouterView />
							</LayoutContent>
						</Layout>
					</Layout>
				</Layout>
			);
		};
	},
});
