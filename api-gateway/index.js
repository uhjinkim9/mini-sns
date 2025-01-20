import express from "express";
import bodyParser from "body-parser";

import {
	PORT, // 5001
	CLIENT_URL,
	AUTH_SERVICE_URL,
	BOARD_SERVICE_URL,
	JWT_KEY,
} from "./src/context/config.js";
import {authMiddleware} from "./src/jwt/jwtAuthorizer.js";
import proxyMiddleware from "./src/routes/apiRoutes.js";

const app = express();

app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({extended: true})); // URL-encoded 본문 파싱

if (!JWT_KEY || !AUTH_SERVICE_URL || !BOARD_SERVICE_URL) {
	console.log("환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
	process.exit(1); // 오류 발생 시 종료
}

// CORS 설정
app.use((req, res, next) => {
	const allowedOrigins = [CLIENT_URL]; // 프론트엔드 주소
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Origin", origin); // 요청 Origin을 동적으로 허용
	}

	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, X-Requested-With, Accept, Origin, Referer"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);

	if (req.method === "OPTIONS") {
		return res.status(200).end(); // Preflight 요청에 대한 응답
	}

	// 디버깅
	console.log(`Request received: ${req.method} ${req.originalUrl}`);
	next();
});

// Gateway Router
app.use(proxyMiddleware);
// authMiddleware 이것도 추가해야

// Run Server
app.listen(PORT, () => {
	console.log(`API Gateway running on port ${PORT}`);
});
