import React, {useState, useEffect, Suspense} from "react";
import {useNavigate, Route, Routes} from "react-router-dom";

import connect from "../../util/fetch/connect.js";

import Progress from "../components/feedback/CircularProgress.jsx";
import Drawer from "./Drawer.jsx";
import Main from "../pages/main/Main.jsx";

export default function Frame() {
	const [pages, setPages] = useState([]);
	const [page, setPage] = useState({});

	const navigate = useNavigate();

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
	}, []);

	useEffect(() => {
		console.log(pages);
	}, [pages]);

	function onClickSideMenu(pageObj) {
		const pagePath = `../pages/${pageObj.pageGroup}/${pageObj.pageNm}`;
		const pageCompo = import(pagePath).then(() => {
			navigate(pagePath);
			setPage({
				pagePath: pagePath,
				pageCompo: pageCompo,
				pageNm: pageObj.pageNm,
			});
		});

		navigate(`/${pageObj.pageGroup}/${pageObj.pageNm}`);
	}

	return (
		<>
			<Suspense fallback={<Progress></Progress>}>
				<Routes>
					<Route path="/main/Main" element={<Main />} />
					<Route
						key={page.pageNm}
						path={page.pagePath}
						element={<pageCompo />}
					/>
				</Routes>
			</Suspense>
			<Drawer pages={pages} onClickSideMenu={onClickSideMenu} />
		</>
	);
}
