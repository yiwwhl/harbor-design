import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { Button } from "@arco-design/web-vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => {
      return (
        <div class={styles.listItemWrapper}>
          <div class={styles.mainContent}>{slots.default?.()}</div>
          {slots.delete?.({
            container: <Button>移除</Button>,
          })}
        </div>
      );
    };
  },
});
