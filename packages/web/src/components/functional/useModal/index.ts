import { ProjectService } from "@/architecture/core/ProjectService";
import { Modal, ModalConfig } from "@arco-design/web-vue";
import { ModalUpdateConfig } from "@arco-design/web-vue/es/modal/interface";

export function useModal(config: ModalConfig) {
	if (!Modal._context) {
		Modal._context = ProjectService.app._context;
	}

	let modalInstance: AnyObject;

	function open() {
		modalInstance = Modal.open(config);
	}

	return {
		open,
		close: () => {
			return modalInstance.close();
		},
		update: (config: ModalUpdateConfig) => {
			return modalInstance.update(config);
		},
	};
}
