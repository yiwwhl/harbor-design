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
import GlobalConfig from "@harbor-design/arco-design-vue/components/GlobalConfig";

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
            <LayoutSider collapsed={basicSetting.sidebarMenu.collapse}>
              <Menu />
            </LayoutSider>
            <LayoutContent class={styles.content}>
              <GlobalConfig headerHeight={basicSetting.headerHeight}>
                <RouterView />
              </GlobalConfig>
            </LayoutContent>
          </Layout>
        </Layout>
      );
    };
  },
});
