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
import GlobalConfig from "@harbor-design/arco-design-vue/BasicComponents/GlobalConfig";

export default defineComponent({
  setup() {
    const basicSetting = useBasicSettingStore();
    const systemConfig = {
      System: {
        headerHeight: basicSetting.headerHeight,
      },
      BasicComponents: {
        BasicWrapper: {
          headerHeight: 50,
        },
      },
    };

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
              <GlobalConfig systemConfig={systemConfig}>
                <RouterView />
              </GlobalConfig>
            </LayoutContent>
          </Layout>
        </Layout>
      );
    };
  },
});
