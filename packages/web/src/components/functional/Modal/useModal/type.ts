import { ModalConfig } from "@arco-design/web-vue";
import { Ref } from "vue";

interface Utils {
	loading: Ref<boolean>;
	modalCloseLock: AnyObject;
}

export type FunctionalMeta = (utils: Utils) => ModalConfig;
