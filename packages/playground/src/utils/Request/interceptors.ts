import { AxiosInstance } from "axios";
export function createInterceptors(request: AxiosInstance): void {
	request.interceptors.request.use(
		(config) => {
			// config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	// 响应拦截器
	request.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
}
