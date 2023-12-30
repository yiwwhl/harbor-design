import { defineComponent, onBeforeMount } from "vue";
import styles from "./index.module.scss";
import useBasicSettingStore from "@/store/modules/basicSetting";
import useMenuRender from "@/layout/components/Menu/useMenuRender";

export default defineComponent({
	setup() {
		const basicSettingStore = useBasicSettingStore();
		const { menuRender, retrieveMenuKeys } = useMenuRender();

		onBeforeMount(() => {
			retrieveMenuKeys();
		});

		return () => {
			return (
				<a-menu
					class={styles.menu}
					breakpoint="xl"
					auto-open
					auto-open-selected
					onCollapse={(collapse: boolean) =>
						basicSettingStore.updateSidebarMenu({
							collapse,
						})
					}
					v-model:selected-keys={basicSettingStore.sidebarMenu.selectedKeys}
					show-collapse-button
				>
					{menuRender()}
				</a-menu>
			);
		};
	},
});
