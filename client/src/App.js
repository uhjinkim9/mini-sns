import React, {useEffect, useState} from "react";

import "./assets/font/font-pretendard.css";
import "./assets/css/layout.css";

import GlobalStyles from "./assets/style/GlobalStyles";
import SideBar from "./components/Sidebar";
import NavBar from "./components/NavBar";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
	useEffect(() => {
		test();
	}, []);

	function test() {
		fetch(API_URL + "/sample/test").then((res) => {
			console.log("테스트 커밋");
		});
	}

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<>
			<div className="flex h-screen bg-gray-100">
				<GlobalStyles />

				{/* Sidebar (모바일에서는 숨김) */}
				<SideBar isOpen={isSidebarOpen} />

				{/* Main Content Area */}
				<div className="flex flex-col flex-1">
					{/* Header */}
					<NavBar
						toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
					/>

					{/* Main Content */}
					<main className="p-6">📌 메인 컨텐츠 영역</main>
				</div>
			</div>
		</>
	);
}

export default App;
