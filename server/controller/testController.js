function getTestMethod(req, res) {
	console.log("요긴 서버야");
}

function getLoginPage() {
	fetch(API_URL + "/test", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			console.log("응답 데이터:", data);
		})
		.catch((error) => {
			console.error("Fetch 요청 에러:", error.message);
		});
}

const testController = {getTestMethod, getLoginPage};

export default testController;
