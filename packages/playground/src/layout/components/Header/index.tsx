import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";
import { ImageCollector } from "@/plugins/ImageCollector/src";
import { Doption, Dropdown, Link } from "@arco-design/web-vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.header}>
          <div class={styles.title}>
            <Logo class={styles.logo} />
            Harbor Design
          </div>
          <div class={styles.meta}>
            <Dropdown>
              {{
                default() {
                  return (
                    <img
                      class={styles.avatar}
                      src={ImageCollector.getImage("user")}
                    />
                  );
                },
                content() {
                  return (
                    <>
                      <Doption>
                        <Link href="https://github.com/yiwwhl/harbor-design">
                          Github
                        </Link>
                      </Doption>
                    </>
                  );
                },
              }}
            </Dropdown>
          </div>
        </div>
      );
    };
  },
});
