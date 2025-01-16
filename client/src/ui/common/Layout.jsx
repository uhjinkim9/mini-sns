import React, {useState} from "react";

import SideBar from "./Sidebar";
import NavBar from "./NavBar";

export default function Layout({mainContent}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<>
			<div className="flex h-screen bg-gray-100">
				{/* 사이드바 */}
				<SideBar isOpen={isSidebarOpen} />
				<div className="flex flex-col flex-1">
					{/* 헤더 */}
					<NavBar />
					{/* 메인 */}
					{mainContent}
				</div>
			</div>
		</>
	);
}
