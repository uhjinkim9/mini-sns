import { API_URL } from "../../util/context/config";

/**
 * API를 사용해 서버와 통신하는 함수(POST)
 * @param {string} url 접근하고자 하는 URL
 * @param {json} param 전달 데이터
 * @return {json} 반환 데이터
 */
async function requestFetchPost(url, param) {
  // const token = localStorage.getItem("token");
  const reqOpt = {
    method: "POST",
    // CORS 설정 시 필요(서버에서 credentials: true로 설정한 경우)
    credentials: "include", // 통신 시 쿠키 등 인증 값 포함
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(param),
  };
  console.log(JSON.stringify(param));
  try {
    const res = await fetch(`${API_URL}${url}`, reqOpt);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // const data = await res.json(); // JSON 파싱
    // console.log("서버 응답 데이터:", data); // 서버 응답 데이터
    return res;
  } catch (err) {
    console.error("Fetch 요청 에러:", err.message);
  }
}

const connect = { requestFetchPost };
export default connect;
