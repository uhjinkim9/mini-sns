import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import connect from "../../../util/fetch/connect.js";

export default function Login() {
	const navigate = useNavigate();

	const [loginInfo, setLoginInfo] = useState({
		userId: "",
		userPw: "",
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setLoginInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	async function submitLogin() {
		const url = "/api/auth/login";
		try {
			const res = await connect.requestFetch(url, loginInfo);

			if (res && res.status === 200) {
				const resData = await res.data;
				const token = resData.token;

				loginCallback(
					token,
					resData.user.userId,
					resData.user.companyId
				);
				navigate("/main/Main");
			} else if (res.status === 401) {
				alert("회원 정보가 없습니다.");
			}
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	function loginCallback(token, userId, companyId) {
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("userId", userId);
		window.localStorage.setItem("companyId", companyId);
	}

	// 로그인 페이지로 왔지만 token 만료가 1분 이상 남았을 때 Main으로 이동

	return (
		<>
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth="xl">
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
							U-CUBE 그룹웨어 로그인
						</Typography>
						<TextField
							type="text"
							name="userId"
							label="ID"
							variant="standard"
							value={loginInfo.userId}
							onChange={handleInputChange}
							sx={{marginBottom: "20px"}}
						/>
						<TextField
							type="password"
							name="userPw"
							label="PW"
							variant="standard"
							value={loginInfo.userPw}
							onChange={handleInputChange}
							sx={{marginBottom: "20px"}}
						/>
						<Stack spacing={2} direction="row">
							<Button variant="contained" onClick={submitLogin}>
								로그인
							</Button>
						</Stack>
					</Box>
				</Container>
			</React.Fragment>
		</>
	);
}
