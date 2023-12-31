import { createInterceptors } from "@/utils/Request/interceptors";
import axios from "axios";

const request = axios.create({
	baseURL: `/api`,
});

createInterceptors(request);

export default request;
