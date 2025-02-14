/*******************************************************************************
 * 서버와 통신하는 함수
 *
 * < 사용 예시 >
 * const response = await requestLogin("/user/login", { username, password });
 * console.log(response);
 *******************************************************************************/

import api from "./axiosInstance";

/**
 * 서버와 통신하는 POST 요청 함수
 * @param url 접근하고자 하는 URL
 * @param param 전달할 데이터 (optional)
 * @returns 서버 응답 데이터
 */
export const requestPost = async (
	url: string,
	param: object = {}
): Promise<any> => {
	try {
		const response = await api.post(url, param);
		return response.data;
	} catch (error) {
		console.error("POST 요청 에러:", error);
		throw error;
	}
};

/**
 * 서버와 통신하는 GET 요청 함수
 * @param url 접근하고자 하는 URL
 * @returns 서버 응답 데이터
 */
export const requestGet = async (url: string): Promise<any> => {
	try {
		const response = await api.get(url);
		return response.data;
	} catch (error) {
		console.error("GET 요청 에러:", error);
		throw error;
	}
};
