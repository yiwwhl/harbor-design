import { ProjectService } from "@/architecture/core/ProjectService";
import { FunctionalMeta } from "@/components/functional/Modal/useModal/type";
import { Modal, ModalConfig } from "@arco-design/web-vue";
import { ModalUpdateConfig } from "@arco-design/web-vue/es/modal/interface";
import { ref, watchEffect } from "vue";

export function useModal(meta: FunctionalMeta | ModalConfig) {
	if (!Modal._context) {
		Modal._context = ProjectService.app._context;
	}

	let modalInstance: AnyObject;
	let config: ModalConfig;
	const loading = ref(false);

	watchEffect(() => {
		processConfig();
	});

	function processConfig() {
		if ({}.toString.call(meta) === "[object Function]") {
			config = (meta as AnyFunction)({
				loading,
				modalCloseLock: {
					okLoading: loading.value,
					hideCancel: loading.value,
					closable: !loading.value,
					maskClosable: !loading.value,
				},
			});
			if (config instanceof Promise) {
				config.then((result) => {
					config = result;
				});
			}
		}
		modalInstance && update(config);
	}

	function invokeGuard() {
		if (modalInstance === void 0) {
			throw new Error(
				"错误的调用顺序：请勿在弹窗 open 之前调用 close 或 update",
			);
		}
	}

	function open() {
		modalInstance = Modal.open(config);
	}

	function close() {
		invokeGuard();
		modalInstance.close();
	}

	function update(config: ModalUpdateConfig) {
		invokeGuard();
		modalInstance.update(config);
	}

	return {
		open,
		close,
		update,
	};
}
