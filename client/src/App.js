import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"; // v6

import "./assets/font/font-pretendard.css"; // 폰트
import "./assets/css/tailwind.css"; // 테일윈드 UI 라이브러리

import Layout from "./ui/common/Layout";
import Login from "./ui/login/Login";
import Main from "./ui/Main";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
	function test() {
		fetch(API_URL + "/test", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // CORS 설정 시 필요(서버에서 credentials: true로 설정한 경우)
		}).then((res) => {
			console.log("테스트");
		});
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* Layout 내부의 mainContent 영역에 컴포넌트 전달 */}
					<Route path="/" exact element={<Login />} />
					<Route
						path="/main"
						exact
						element={<Layout mainContent={<Main />} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
