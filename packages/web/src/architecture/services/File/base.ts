import { IService } from "@/architecture/types";
import useUserStore from "@/store/modules/user";
import request from "@/utils/Request";

export interface IFileService extends IService {
	upload: AnyPromiseFn;
}

interface UploadOptions {
	url?: string;
	formData: File;
}

export abstract class AbstractFileService implements IFileService {
	abstract avaliableRouteNames: string[];

	abstract upload: AnyPromiseFn;
}

export default class BaseUserService extends AbstractFileService {
	constructor(
		public _userStore = useUserStore(),
		public _request = request,
	) {
		super();
	}

	avaliableRouteNames = [];

	upload = (options: UploadOptions) => {
		const url = options.url ?? "/upload";
		return this._request.post(url, options.formData);
	};
}
