import React, {useRef, useState, useEffect} from "react";

import connect from "../../util/fetch/connect";

export default function Login() {
	const refId = useRef();
	const refPw = useRef();

	const [loginInfo, setLoginInfo] = useState();

	async function enterId(e) {
		let userId = refId.current.value;
		let userPw = refPw.current.value;

		const updatedLoginInfo = {
			userId: userId,
			userPw: userPw,
		};
		setLoginInfo(() => {
			return updatedLoginInfo;
		});

		const url = "/auth/login";
		try {
			const res = await connect.requestFetchPost(url, updatedLoginInfo);
			console.log("프론트에서의 응답: ", res);
		} catch (err) {
			console.log("에러: ", err);
		}
	}

	useEffect(() => {
		console.log("loginInfo:", loginInfo);
	}, [loginInfo]);

	return (
		<>
			<p className="text-blue-600 dark:text-blue-400 md:text-blue-300">
				U-CUBE 그룹웨어 로그인
			</p>

			<input
				ref={refId}
				className="px-4 py-1.5 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
				type="text"
				name="id"
				placeholder="Enter your ID"
				aria-label="아이디를 입력하세요."
			/>
			<input
				ref={refPw}
				className="px-4 py-1.5 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
				type="password"
				name="pw"
				placeholder="Enter your PW"
				aria-label="비밀번호를 입력하세요."
			/>
			<button
				onClick={enterId}
				className="w-full px-3 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none lg:w-auto"
			>
				다음
			</button>
		</>
	);
}
