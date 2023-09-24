import { defineStore } from "pinia";

const useBasicSettingStore = defineStore("basicSetting", {
  state: () => ({
    sidebarMenu: {
      openKeys: [] as string[],
      selectedKeys: [] as string[],
      collapse: false,
    },
  }),
  getters: {
    isSelectedKeysSetted(state) {
      return state.sidebarMenu.selectedKeys.length !== 0;
    },
  },
  actions: {
    updateSidebarMenu(config: {
      openKeys?: string[];
      selectedKeys?: string[];
      collapse?: boolean;
    }) {
      Object.assign(this.sidebarMenu, config);
    },
    updateSidebarMenuKeys(type: "openKeys" | "selectedKeys", key: string) {
      this.sidebarMenu[type][0] = key;
    },
  },
});

export default useBasicSettingStore;
