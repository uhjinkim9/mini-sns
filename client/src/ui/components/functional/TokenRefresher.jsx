import React, {useEffect, useRef, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {jwtDecode} from "jwt-decode";

import connect from "../../../util/fetch/connect.js";
import useIsMounted from "../../../util/hook/useIsMounted.js";

export default function TokenRefresher() {
	const navigate = useNavigate();
	const isMounted = useIsMounted();

	// 렌더링마다 함수 재생성되어 중복 호출되는 현상 방지(memoization)
	const checkToken = useCallback(() => {
		console.log("checkToken 호출됨");
		const token = localStorage.getItem("token");

		// check the expiration of the access token
		const exp = jwtDecode(token).exp;
		const now = Math.floor(Date.now() / 1000); // 현재 시간(초 단위)

		if (exp > now + 1 * 60) {
			return;
		} else {
			const userId = localStorage.getItem("userId");
			const companyId = localStorage.getItem("companyId");

			try {
				fetchToken(token, userId, companyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, []);

	// set a new access token
	async function fetchToken(token, userId, companyId) {
		const url = "/api/auth/renewAccessToken";
		const param = {token: token, userId: userId, companyId: companyId};

		try {
			const res = await connect.requestFetchToken(url, param);
			const statCd = res.status;
			if (res && statCd === 200) {
				localStorage.clear();
				window.localStorage.setItem("token", res.data.token);
				window.localStorage.setItem("userId", userId);
				window.localStorage.setItem("companyId", companyId);
				console.log("Token renewed");
			} else {
				navigate("/"); // redirect to the login page 여기서 튕기지 말고 게이트웨이에서 튕기자
			}
		} catch (err) {
			console.log("Error: ", err);
			navigate("/"); // redirect to the login page 여기서 튕기지 말고 게이트웨이에서 튕기자
		}
	}

	useEffect(() => {
		if (!isMounted) return;
		// setTimeout(() => {
		checkToken();
		// }, 1000);
	}, [isMounted, checkToken]);

	return <>TokenRefresher</>;
}
