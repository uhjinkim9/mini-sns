import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import connect from "../../util/fetch/connect.js";

export default function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    userPw: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitLogin = async () => {
    const url = "/api/auth/login";
    try {
      const res = await connect.requestFetchPost(url, loginInfo);
      const data = await res.json();
      const token = data.data.token;
      window.sessionStorage.setItem("token", token);
      if (res && res.status === 200) {
        navigate("/main");
      } else if (res.status === 401) {
        alert("회원 정보가 없습니다.");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              width: "100wh",
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
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              type="password"
              name="userPw"
              label="PW"
              variant="standard"
              value={loginInfo.userPw}
              onChange={handleInputChange}
              sx={{ marginBottom: "20px" }}
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
