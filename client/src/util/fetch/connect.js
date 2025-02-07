import {API_URL} from "../../util/context/config";

/**
 * API를 사용해 서버와 통신하는 함수(POST)
 * @param {string} url 접근하고자 하는 URL
 * @param {json} param 전달 데이터
 * @return {json} 반환 데이터
 */
async function requestFetch(url, param = null) {
	const accessToken = localStorage.getItem("accessToken");
	const sessionUserId = localStorage.getItem("userId");
	const sessionCompanyId = localStorage.getItem("companyId");

	const reqOpt = {
		method: "POST",
		// CORS 설정 시 필요(서버에서 credentials: true로 설정한 경우)
		credentials: "include", // 통신 시 쿠키 등 인증 값 포함
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	};

	console.log(
		"url:",
		url,
		"/ param:",
		param,
		"/ sessionUserId:",
		sessionUserId,
		"/ sessionCompanyId:",
		sessionCompanyId
	);

	if (param !== null) {
		reqOpt.body = JSON.stringify({
			...param,
			userId: sessionUserId ? sessionUserId : null,
			companyId: sessionCompanyId ? sessionCompanyId : null,
		});
	}

	try {
		const res = await fetch(`${API_URL}${url}`, reqOpt);
		const statusCode = res.status;
		const data = await res.json(); // JSON 파싱
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		console.log("프론트에서의 data", data);

		return {
			status: statusCode,
			data,
		};
	} catch (err) {
		console.error("Fetch 요청 에러:", err.message);
		throw err;
	}
}

/**
 * requestFetch()의 콜백이 되는 함수
 * 서버에서 발생하는 상태 번호와 메시지를 매칭하여 반환한다.
 * @return {json} 반환 데이터
 */
async function fetchCallback(url, param = null) {}

/**
 * 로그인에 사용하는 Fetch 함수
 * @param {string} url 접근하고자 하는 URL
 * @param {json} param 전달 데이터(token)
 * @return {json} 반환 데이터
 */
async function requestFetchLogin(url, param = null) {
	const reqOpt = {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};
	if (param !== null) {
		reqOpt.body = JSON.stringify(param);
	}
	try {
		const res = await fetch(`${API_URL}${url}`, reqOpt);
		const statusCode = res.status;
		const data = await res.json();
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		return {
			status: statusCode,
			data,
		};
	} catch (err) {
		console.error("Fetch 요청 에러:", err.message);
		throw err;
	}
}

const connect = {requestFetch, requestFetchLogin};
export default connect;
