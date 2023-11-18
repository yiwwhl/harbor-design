import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="计划">
          <div>* 重写 ProForm</div>
          <div>
            考虑到现有设计无法满足灵活的拓展，同时一开始的出发点和做的过程中不断产生的新
            idea 的碰撞导致项目 ProForm
            代码比较复杂，会增加后续维护的成本,所以需要尽快重写
          </div>
          <br />
          <div>* 可能重写 BasicWrapper</div>
          <div>
            现有 BasicWrapper 功能过于复杂，支持了
            header，后续考虑重构，优先级较低
          </div>
        </PageWrapper>
      );
    };
  },
});
