import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {useMediaQuery, useTheme} from "@mui/material"; // 반응형 처리를 위한 MUI 훅

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";

import {requestPost} from "../../../util/axios/apiService";
import {isEmpty} from "../../../util/validator/emptyCheck";
import {CookieStorage} from "../../../util/context/storage";
import {useAlert} from "../../../util/hook/useAlert";

interface LoginInfo {
	userId: string;
	userPw: string;
}

interface eTarget {
	target: {name: string; value: any};
}

export default function Login() {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 화면이 `sm` (600px 이하)일 경우 true
	const {showAlert} = useAlert();

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
			showAlert("warning", "Please enter your ID.");
			return;
		}
		if (isEmpty(loginInfo.userPw)) {
			showAlert("warning", "Please enter your PW.");
			return;
		}

		const url = "/auth/login";
		try {
			const res = await requestPost(url, loginInfo);

			if (res) {
				loginCallback(
					res.accessToken,
					res.refreshToken,
					res.user.userId,
					res.user.companyId
				);
				console.log(res);
				navigate("/main/Main");
			}
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
		const expires = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000); // 7일 후 만료
		// const expires = new Date(Date.now() + 20 * 1000); // 20초 후 만료

		CookieStorage.setItem("refreshToken", refreshToken, expires);
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("userId", userId);
		localStorage.setItem("companyId", companyId);
	}

	return (
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
					width: "100%",
					maxWidth: isMobile ? "90%" : "400px", // 모바일에서는 더 작게 조정
					padding: isMobile ? "20px" : "40px", // 모바일에서 패딩 줄이기
					backgroundColor: "white",
					boxShadow: isMobile
						? "none"
						: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					borderRadius: "8px",
					// margin: "auto",
				}}
				noValidate
				autoComplete="off"
			>
				<Typography
					variant={isMobile ? "h6" : "h5"} // 모바일에서는 글자 크기 작게
					component="h2"
					sx={{paddingBottom: "20px", fontWeight: "bold"}}
				>
					로그인
				</Typography>

				<Input
					variant="outlined"
					label="ID"
					fullWidth
					onChange={handleInputChange}
					name="userId"
					value={loginInfo.userId}
					slotProps={{inputLabel: {shrink: true}}}
				/>
				<Input
					variant="outlined"
					label="PW"
					type="password"
					fullWidth
					onChange={handleInputChange}
					name="userPw"
					value={loginInfo.userPw}
					slotProps={{inputLabel: {shrink: true}}}
				/>
				<Button variant="contained" fullWidth onClick={submitLogin}>
					로그인
				</Button>
			</Box>
		</React.Fragment>
	);
}
