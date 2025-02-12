import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from "axios";
import {GATEWAY_URL} from "../../util/context/config";
import {getItem} from "../context/localStorage";

const api: AxiosInstance = axios.create({
	baseURL: GATEWAY_URL,
	withCredentials: true, // 쿠키 등 인증 값 포함
	headers: {
		"Content-Type": "application/json",
	},
});

// 요청 인터셉터
api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const accessToken = config.headers["Authorization"];
		const refreshToken: string | null = getItem("refreshToken");
		console.log("config", config);
		console.log("GATEWAY_URL", GATEWAY_URL);

		console.log(
			`추후 SSO 인증서 적용 후 ${refreshToken}을 https only cookie에 저장`
		);

		// 액세스 토큰 있으면 헤더에 설정
		if (accessToken) {
			console.log("인터셉터에서 액세스 토큰 있음");
			config.headers!.Authorization = `Bearer ${accessToken}`;
			config.headers!.Refresh = `Bearer ${refreshToken}`; // 추후 인증서 적용 후 삭제
		}

		return config;
	},
	(error) => {
		console.log("인터셉터 에러", error);
		return Promise.reject(error);
	}
);

// 응답 인터셉터
api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		console.error("Axios 응답 에러:", error);
		return Promise.reject(error);
	}
);

export default api;
