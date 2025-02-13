import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from "axios";
import {GATEWAY_URL} from "../../util/context/config";
import {getItem} from "../context/localStorage";
import {useNavigate} from "react-router-dom";

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

		console.log(
			`추후 SSO 인증서 적용 후 ${refreshToken}을 https only cookie에 저장,
			또는 도커 저장 후 Redis에 저장`
		);

		// 액세스 토큰 있으면 헤더에 설정
		if (accessToken) {
			config.headers!.Authorization = `Bearer ${accessToken}`;
			config.headers!.Refresh = `Bearer ${refreshToken}`; // 추후 인증서 적용 후 삭제
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 응답 인터셉터
api.interceptors.response.use(
	(response: AxiosResponse) => {
		switch (response.status) {
			case 401:
				console.error("인증되지 않은 요청");
				const navigate = useNavigate();
				navigate("/");
				break;

			case 404:
				console.error("DB에 존재하는 정보 없음");
		}
		return response;
	},
	(error) => {
		console.error("Axios 응답 에러:", error);
		return Promise.reject(error);
	}
);

export default api;
