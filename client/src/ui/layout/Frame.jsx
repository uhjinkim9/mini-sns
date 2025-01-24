import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import connect from "../../util/fetch/connect.js";

import Drawer from "./Drawer.jsx";

export default function Frame() {
	const [pages, setPages] = useState([]);

	async function getPages() {
		const url = "/api/board/getPages";
		try {
			const res = await connect.requestFetch(url);
			const statCd = res.status;
			if (res && statCd === 200) {
				// 응답 성공
				setPages(() => {
					return res.data;
				});
			} else if (statCd === 401) {
				// 응답 실패
				console.log("Failed response: ", res.data);
			} else {
				console.log("Unexpected response status: ", statCd);
			}
		} catch (err) {
			// 서버 오류
			console.log("Error: ", err);
		}
	}

	useEffect(() => {
		getPages();
		const token = localStorage.getItem("token");
		console.log(token);
	}, []);

	useEffect(() => {
		console.log(pages);
	}, [pages]);

	return (
		<>
			<Drawer pages={pages} />
		</>
	);
}
