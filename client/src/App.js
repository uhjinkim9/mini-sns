import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Progress from "./ui/components/feedback/CircularProgress";

import Frame from "./ui/layout/Frame";
import Login from "./ui/pages/main/Login";
import Board from "./ui/pages/board/Board";

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<Progress></Progress>}>
					<Routes>
						{/* 추후 DB로 관리 */}
						<Route path="/" exact element={<Login />} />
						<Route path="/main" exact element={<Frame />} />
						<Route
							path="/board/boardAll"
							exact
							element={<Board />}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
