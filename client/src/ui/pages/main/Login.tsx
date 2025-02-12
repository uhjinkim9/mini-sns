import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";

import {requestPost} from "../../../util/axios/apiService";
import {isEmpty} from "../../../util/validator/emptyCheck";

interface LoginInfo {
	userId: string;
	userPw: string;
}

interface eTarget {
	target: {name: string; value: any};
}

export default function Login() {
	const navigate = useNavigate();
	// const {showAlert} = useAlert();

	const [loginInfo, setLoginInfo] = useState<LoginInfo>({
		userId: "",
		userPw: "",
	});

	const handleInputChange = (e: eTarget) => {
		const {name, value} = e.target;
		setLoginInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	async function submitLogin() {
		if (isEmpty(loginInfo.userId)) {
			// showAlert("warning", "아이디를 입력하세요.");
			return;
		}
		if (isEmpty(loginInfo.userPw)) {
			// showAlert("warning", "비밀번호를 입력하세요.");
			return;
		}

		const url = "/auth/login";
		try {
			const res = await requestPost(url, loginInfo);

			console.log("res", res);
			// if (res && res.status === 200) {
			// 	const resData = await res.data;
			// 	const accessToken = resData.accessToken;
			// 	const refreshToken = resData.refreshToken;

			// 	loginCallback(
			// 		accessToken,
			// 		refreshToken,
			// 		resData.user.userId,
			// 		resData.user.companyId
			// 	);
			// 	navigate("/main/Main");
			// } else if (res.status === 404) {
			// 	alert("회원 정보가 없습니다.");
			// }
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	function loginCallback(
		accessToken: string,
		refreshToken: string,
		userId: string,
		companyId: string
	) {
		window.localStorage.setItem("accessToken", accessToken);
		window.localStorage.setItem("refreshToken", refreshToken);
		window.localStorage.setItem("userId", userId);
		window.localStorage.setItem("companyId", companyId);
	}

	// 로그인 페이지로 왔지만 token 만료가 1분 이상 남았을 때 Main으로 이동

	return (
		<>
			<React.Fragment>
				<CssBaseline />
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "100vh",
					}}
					noValidate
					autoComplete="off"
				>
					<Typography
						variant="h5"
						component="h2"
						sx={{
							paddingBottom: "30px",
						}}
					>
						로그인
					</Typography>

					<Input
						variant="outlined"
						label="ID"
						slotProps={{
							inputLabel: {
								shrink: true,
							},
						}}
						onChange={handleInputChange}
						name="userId"
						value={loginInfo.userId}
					/>
					<Input
						variant="outlined"
						label="PW"
						type="password"
						slotProps={{
							inputLabel: {
								shrink: true,
							},
						}}
						onChange={handleInputChange}
						name="userPw"
						value={loginInfo.userPw}
					/>
					<Button variant="contained" onClick={submitLogin}>
						로그인
					</Button>
				</Box>
			</React.Fragment>
		</>
	);
}
