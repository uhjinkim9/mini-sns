import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// 컴포넌트
import Loading from "./ui/components/feedback/Loading";
import Frame from "./ui/layout/Frame.tsx";
import {AlertProvider} from "./util/hook/useAlert";

// 페이지
import Login from "./ui/pages/main/Login.tsx";

import "./App.css";

// MUI 폰트
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
	return (
		<>
			<AlertProvider>
				<BrowserRouter>
					<Suspense fallback={<Loading></Loading>}>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/*" element={<Frame />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</AlertProvider>
		</>
	);
}

export default App;
