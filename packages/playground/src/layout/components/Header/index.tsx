import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";

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
          </div>
        </div>
      );
    };
  },
});
