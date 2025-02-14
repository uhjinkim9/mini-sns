import {useState, useEffect, Suspense, lazy, ComponentType} from "react";
import {useNavigate, Route, Routes, useLocation} from "react-router-dom";
import useIsMounted from "../../util/hook/useIsMounted";
import {requestPost} from "../../util/axios/apiService";
import Loading from "../components/feedback/Loading";
import Drawer from "./Drawer";

interface Page {
	pageGroup: string;
	pageNm: string;
}

export default function Frame() {
	const [pages, setPages] = useState<Page[]>([]);
	const [pageUrl, setPageUrl] = useState<string>("");
	const [PageCompo, setPageCompo] = useState<ComponentType<any> | null>(null);

	const navigate = useNavigate();
	const location = useLocation();
	const isMounted = useIsMounted();

	async function getPages() {
		const url = "/board/getPages";
		try {
			const res = await requestPost(url);
			setPages(res);
		} catch (err) {
			console.error(err);
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

	function getPageCompo(pathName: string) {
		// const notFoundUrl = "../pages/main/404";

		// URL과 일치하지 않는 페이지 있으면
		// const pageExists = pages.some(
		// 	(page) => `/${page.pageGroup}/${page.pageNm}` === pathName
		// );

		// 404 페이지 반환
		// if (!pageExists) {
		// 	const notFound = lazy(() =>
		// 		import(notFoundUrl).then((module) => {
		// 			return module;
		// 		})
		// 	);
		// 	setPageCompo(() => notFound);

		// URL과 일치하는 페이지는
		// } else {
		// 동적으로 해당 페이지 반환
		// lazy: 동적으로 import된 모듈을 받아 React 컴포넌트로 변환하는 역할
		const LazyComponent = lazy(() =>
			import(`../pages${pathName}`).then((module) => {
				console.log(`${pathName}`);

				if (!module.default) {
					throw new Error(
						`Module ${pathName} does not have a default export`
					);
				}
				return module;
			})
		);

		setPageCompo(() => LazyComponent);
		// }
	}

	function onClickSideMenu(pageObj: {pageGroup: string; pageNm: string}) {
		const pageUrl = `/${pageObj.pageGroup}/${pageObj.pageNm}`;
		navigate(pageUrl);
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
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
