import logo from "./logo.svg";
import "./App.css";

import React, {useEffect} from "react";

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

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
