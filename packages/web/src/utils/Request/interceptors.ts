import { ProjectService } from "@/architecture/core/ProjectService";
import { Message } from "@arco-design/web-vue";
import { AxiosInstance } from "axios";

export enum ApiResponseStatus {
	SUCCESS = "success",
	ERROR = "error",
}

export enum HttpStatus {
	UNAUTHORIZED = 401,
}

export function createInterceptors(request: AxiosInstance): void {
	const AuthService = ProjectService.getService("Auth");

	request.interceptors.request.use(
		(config) => {
			config.headers.Authorization = `Bearer ${AuthService?.getToken()}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	// 响应拦截器
	request.interceptors.response.use(
		(response) => {
			const data = response.data;
			if (data.status !== ApiResponseStatus.SUCCESS) {
				Message.error(`${data.message}`);
				return Promise.reject(`${data.message}`);
			}
			return data;
		},
		(error) => {
			if (error.response.status === HttpStatus.UNAUTHORIZED) {
				Message.error(error.response.data.message);
				return AuthService.logout();
			}
			return Promise.reject(error);
		},
	);
}
