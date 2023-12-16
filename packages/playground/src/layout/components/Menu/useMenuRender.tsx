import { MenuItem, SubMenu } from "@arco-design/web-vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import useBasicSettingStore from "@/store/modules/basicSetting";

export default function useMenuRender() {
	const router = useRouter();
	const routes = router.options.routes;
	const basicSettingStore = useBasicSettingStore();

	function retrieveMenuKeys() {
		const { currentRoute } = router;
		basicSettingStore.updateSidebarMenuKeys(
			"selectedKeys",
			currentRoute.value.name as string,
		);
	}

	function menuRender() {
		function renderSubMenu(route: RouteRecordRaw, slots: Record<string, any>) {
			return <SubMenu key={route.name as string}>{slots}</SubMenu>;
		}

		function renderMenuItem(route: RouteRecordRaw) {
			!basicSettingStore.isSelectedKeysSetted &&
				basicSettingStore.updateSidebarMenu({
					selectedKeys: [route.name as string],
				});
			return (
				<MenuItem
					onClick={() => {
						basicSettingStore.updateSidebarMenuKeys(
							"selectedKeys",
							route.name as string,
						);
						router.push({
							name: route.name,
						});
					}}
					key={route.name as string}
				>
					{route.meta?.locale}
				</MenuItem>
			);
		}

		function renderRoutes(_routes: RouteRecordRaw[]): Element[] {
			function renderRoute(route: RouteRecordRaw) {
				if (!route.meta) return;
				if (route.children) {
					return renderSubMenu(route, {
						icon() {
							return route.meta?.icon;
						},
						title() {
							return route.meta?.locale;
						},
						default() {
							return renderRoutes(route.children ?? []);
						},
					});
				}
				return renderMenuItem(route);
			}

			const routes = _routes
				.map(renderRoute)
				.filter((i) => !!i) as unknown as Element[];

			return routes;
		}

		return renderRoutes(routes as RouteRecordRaw[]);
	}

	return {
		menuRender,
		retrieveMenuKeys,
	};
}
