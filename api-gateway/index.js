import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import dotenv from "dotenv";

import {authMiddleware} from "./src/jwt/jwtAuthorizer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (
	!process.env.JWT_SECRET ||
	!process.env.AUTH_SERVICE_URL ||
	!process.env.BOARD_SERVICE_URL
) {
	throw new Error("환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
}

// Gateway 라우팅 설정
app.use(
	"/auth",
	createProxyMiddleware({
		target: process.env.AUTH_SERVICE_URL,
		changeOrigin: true,
	})
);

// 인증이 필요한 라우트에 미들웨어 적용
app.use(
	"/board",
	authMiddleware,
	createProxyMiddleware({
		target: process.env.BOARD_SERVICE_URL,
		changeOrigin: true,
	})
);
// app.use(
// 	"/chat",
// 	authMiddleware,
// 	createProxyMiddleware({
// 		target: process.env.CHAT_SERVICE_URL,
// 		changeOrigin: true,
// 	})
// );

// 서버 실행
app.listen(PORT, () => {
	console.log(`API Gateway running on port ${PORT}`);
});
