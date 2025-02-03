import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Progress from "./ui/components/feedback/CircularProgress";

import Frame from "./ui/layout/Frame";
import Main from "./ui/pages/main/Main";
import Login from "./ui/pages/main/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<Progress></Progress>}>
					<Routes>
						<Route path="/" exact element={<Login />} />
						<Route
							path="/main/Main"
							exact
							element={
								<>
									<Frame />
									<Main />
								</>
							}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
