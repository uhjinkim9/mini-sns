export default function LoginManager() {
	function handleLogout() {
		window.localStorage.clear();
		window.location.href = "/";
	}

	async function saveLoginRecord() {
		const url = "/api/auth/saveLoginRecord";
		const param = {key: "value"};
		try {
			const res = await connect.requestFetch(url, param); // 응답
			const statCd = res.status;
			if (res && statCd === 200) {
				// 응답 성공
				console.log("Response received: ", res.data);
			} else if (statCd === 401) {
				// 응답 실패
				console.log("Failed response: ", res.data);
			} else {
				console.log("Unexpected response status: ", statCd);
			}
		} catch (err) {
			// 서버 에러
			console.log("Error: ", err);
		}
	}
}
