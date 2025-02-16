import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { GATEWAY_URL } from "../../util/context/config";
import { LocalStorage, CookieStorage } from "../context/storage";
import { isEmpty } from "../validator/emptyCheck";

const baseURL = GATEWAY_URL + "/api";

const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // 쿠키 전달 허용 (리프레시 토큰 사용 시 필요)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken: string | null = LocalStorage.getItem("accessToken");
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    if (!config.data) {
      config.data = {};
      config.data.userId = LocalStorage.getItem("userId");
      config.data.companyId = LocalStorage.getItem("companyId");
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
    console.log(response);
    return response;
  },
  async (error) => {
    console.error("Axios 응답 에러:", error);

    // 기존 요청 정보
    const originalRequest = error.config;

    // 액세스 토큰이 만료되었고, 재시도 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("인터셉터에서 갱신 로직으로 들어옴");
      originalRequest._retry = true; // 무한 루프 방지

      const refreshToken = CookieStorage.getItem("refreshToken");
      if (isEmpty(refreshToken)) {
        LocalStorage.clearAll();
        return Promise.reject("리프레시 토큰 없음, 로그아웃 처리");
      }
      try {
        const param = {
          refreshToken: refreshToken,
          userId: localStorage.getItem("userId"),
          companyId: localStorage.getItem("companyId"),
        };
        const { data } = await axios.post(
          `${baseURL}/auth/renewAccessToken`,
          param,
          { withCredentials: true }
        );
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);

        // 새로운 토큰으로 원래 요청을 다시 시도
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("refreshError:", refreshError);
        localStorage.removeItem("accessToken"); // 토큰 제거
        // window.location.href = "/"; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    // switch (error.status) {
    //   case 204:
    //     console.error("해당 ID의 사용자 정보 없음");
    //		alert('회원 정보가 없습니다.');
    //     LocalStorage.clearAll();
    //     break;

    //   case 401:
    //     console.error("인증되지 않은 요청");
    //     LocalStorage.clearAll();
    //     window.location.href = "/";
    //     break;

    //   case 404:
    //     console.error("DB에 존재하는 정보 없음");
    //     break;

    //   case 500:
    //     console.error("서버 에러 발생");
    //     break;
    // }

    // 응답이 없을 경우 생기는 속성: request
    if (error.request) {
      console.log("요청이 전송되었지만 응답 없음:", error.request);
    }

    return Promise.reject(error);
  }
);

export default api;
