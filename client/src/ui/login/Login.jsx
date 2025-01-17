import React, {useRef, useState, useEffect} from "react";

import {requestFetchPost} from "../../util/fetch/connect";

export default function Login() {
	const refId = useRef();

	const [loginInfo, setLoginInfo] = useState();

	function enterId(e) {
		console.log(e);
		console.log(refId.current.value);

		const userId = refId.current.value;
		const param = {userId: userId};
		requestFetchPost("/auth/login", param).then((res) =>
			console.log("프론트에서의 응답: ", res)
		);
	}

	useEffect(() => {
		console.log(loginInfo);
	}, [loginInfo]);

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
					<div className="md:flex md:items-center md:justify-center md:w-2/5 md:bg-gray-700 md:dark:bg-gray-800">
						<div className="px-6 py-6 md:px-8 md:py-0">
							<h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
								<p className="text-blue-600 dark:text-blue-400 md:text-blue-300">
									U-CUBE 그룹웨어
								</p>
								<span>로그인</span>
							</h2>
						</div>
					</div>

					<div className="flex items-center justify-center pb-6 md:py-0 md:w-3/5">
						<div className="flex flex-col p-1 m-2 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
							<input
								ref={refId}
								onChange={(e) => {
									setLoginInfo(e.target.value);
								}}
								className="px-4 py-1.5 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
								type="text"
								name="id"
								placeholder="Enter your ID"
								aria-label="아이디를 입력하세요."
							/>

							<button
								onClick={enterId}
								className="w-full px-3 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none lg:w-auto"
							>
								다음
							</button>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
