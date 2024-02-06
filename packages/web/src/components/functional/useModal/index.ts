import { ProjectService } from "@/architecture/core/ProjectService";
import { Modal, ModalConfig } from "@arco-design/web-vue";
import { ModalUpdateConfig } from "@arco-design/web-vue/es/modal/interface";

export function useModal(config: ModalConfig) {
	if (!Modal._context) {
		Modal._context = ProjectService.app._context;
	}

	let modalInstance: AnyObject;

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
