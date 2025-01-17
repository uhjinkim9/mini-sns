import {SERVER_URL} from "../../util/context/config";

/**
 * API를 사용해 서버와 통신하는 함수(POST)
 * @param {string} url 접근하고자 하는 URL
 * @param {json} param 전달 데이터
 * @return {json} 반환 데이터
 */
export async function requestFetchPost(url, param) {
	const reqOpt = {
		method: "POST",
		// CORS 설정 시 필요(서버에서 credentials: true로 설정한 경우)
		// 통신 시 쿠키 등 인증 값 포함
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(param),
	};
	try {
		console.log("Request URL:", `${SERVER_URL}${url}`);
		console.log("Request Options:", reqOpt);
		const res = await fetch(`${SERVER_URL}${url}`, reqOpt);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = await res.json(); // JSON 파싱
		console.log("응답 데이터:", data); // 서버 응답 데이터
		return data;
	} catch (err) {
		console.error("Fetch 요청 에러:", err.message);
	}
}
