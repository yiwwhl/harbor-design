import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";
import { ImageCollector } from "@/plugins/ImageCollector/src";

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
            <a href="https://github.com/yiwwhl/harbor-design">Github Repo</a>
            <img class={styles.avatar} src={ImageCollector.getImage("user")} />
          </div>
        </div>
      );
    };
  },
});
