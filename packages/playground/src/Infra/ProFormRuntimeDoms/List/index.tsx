import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { Button } from "@arco-design/web-vue";

export default defineComponent({
  props: {
    schema: Object,
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class={styles.listWrapper}>
          <div class={styles.label}>
            {props.schema?.label}{" "}
            {slots.add?.({
              container: <Button type="primary">新增</Button>,
            })}
          </div>
          {slots.default?.()}
        </div>
      );
    };
  },
});
