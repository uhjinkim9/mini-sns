import React, {useState, useEffect, Suspense, lazy} from "react";
import {useNavigate, Route, Routes, useLocation} from "react-router-dom";
import useIsMounted from "../../util/hook/useIsMounted.js";

import connect from "../../util/fetch/connect.js";
import Progress from "../components/feedback/CircularProgress.jsx";
import Drawer from "./Drawer.jsx";

export default function Frame() {
	const [pages, setPages] = useState([]);
	const [pageUrl, setPageUrl] = useState("");
	const [PageCompo, setPageCompo] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();
	const isMounted = useIsMounted();

	async function getPages() {
		const url = "/api/board/getPages";
		try {
			const res = await connect.requestFetch(url);
			if (res && res.status === 200) {
				setPages(res.data);
			} else {
				console.error("Failed response: ", res.data);
			}
		} catch (err) {
			console.error("Error: ", err);
		}
	}

	useEffect(() => {
		if (isMounted) {
			getPages();
		}
	}, [isMounted]);

	useEffect(() => {
		setPageUrl(location.pathname);
		getPageCompo(location.pathname);
	}, [location]);

	function getPageCompo(pathName) {
		// lazy 함수는 동적으로 import된 모듈을 받아서 React 컴포넌트로 변환하는 역할
		const LazyComponent = lazy(() =>
			import(`../pages${pathName}.jsx`).then((module) => {
				if (!module.default) {
					throw new Error(
						`Module ${pathName} does not have a default export`
					);
				}
				return module;
			})
		);

		setPageCompo(() => LazyComponent);
	}

	function onClickSideMenu(pageObj) {
		const pageUrl = `/${pageObj.pageGroup}/${pageObj.pageNm}`;
		navigate(pageUrl);
	}

	return (
		<>
			<Suspense fallback={<Progress />}>
				<Drawer pages={pages} onClickSideMenu={onClickSideMenu} />
				<Routes>
					{PageCompo && (
						<>
							<Route
								key={pageUrl}
								path={pageUrl}
								element={<PageCompo />}
							/>
						</>
					)}
				</Routes>
			</Suspense>
		</>
	);
}
