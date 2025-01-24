import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import connect from "../../../util/fetch/connect.js";

export default function SessionTimeReminder() {
	const navigate = useNavigate();

	useEffect(() => {
		checkToken();
	});

	function checkToken() {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			const userId = localStorage.getItem("user").userId;

			fetchToken(refreshToken);
			console.log(refreshToken, userId);
			// 새로운 액세스 토큰 저장
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchToken(refreshToken) {
		const url = "/api/auth/renewAccessToken";
		const param = {token: refreshToken};

		try {
			const res = await connect.requestFetchToken(url, param); // 응답
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

	// fetch(SERVER_URL + "/Login/tokenCheck.do", requestOptions)
	// 	.then((resp) => resp.json())
	// 	.then((resp) => {
	// 		if (resp.code === CODE.SUCCESS) {
	// 			localStorage.setItem("token", resp.data.token);
	// 		} else {
	// 			alert(resp.message);
	// 			localStorage.clear(); // 세션 clear
	// 			localStorage.clear(); // 세션 clear
	// 			navigate("/");
	// 		}
	// 	})

	return <>세션알리미</>;
}
