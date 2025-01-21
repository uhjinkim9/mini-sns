import express from "express";

import {createProxyMiddleware} from "http-proxy-middleware";
import cors from "cors";

import {
	PORT, // 5001
	CLIENT_URL,
	AUTH_SERVICE_URL,
	BOARD_SERVICE_URL,
} from "./src/context/config.js";
import {authMiddleware} from "./src/jwt/jwtAuthorizer.js";
import proxyMiddleware from "./src/routes/apiRoutes.js";

const app = express();

if (!AUTH_SERVICE_URL || !BOARD_SERVICE_URL) {
	console.log("환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
	process.exit(1); // 오류 발생 시 종료
}

// JSON 및 URL-encoded 파싱 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
	cors({
		origin: CLIENT_URL,
		credentials: true,
		// optionsSuccessStatus: 200,
	})
);

app.use((req, res, next) => {
	console.log(`Gateway received request: ${req.method} ${req.originalUrl}`);
	next();
});

// app.use(proxyMiddleware); // Gateway Router
app.use(
	"/api/auth",
	createProxyMiddleware({
		target: AUTH_SERVICE_URL, // http://localhost:5002
		changeOrigin: true,
		pathRewrite: {"^/api": ""},
		secure: false,
		onProxyReq: (proxyReq, req, res) => {
			console.log("Final Proxy Path:", proxyReq.path);
			if (req.body) {
				const bodyData = JSON.stringify(req.body);
				proxyReq.setHeader("Content-Type", "application/json");
				proxyReq.setHeader(
					"Content-Length",
					Buffer.byteLength(bodyData)
				);
				proxyReq.write(bodyData);
				proxyReq.end(); // 중요: 요청 스트림을 종료해야 백엔드로 전달됨
			}
		},
		onError: (err, req, res) => {
			console.error("Proxy Error:", err);
			res.status(500).send("Proxy Error");
		},
	})
);

// authMiddleware 이것도 추가해야 함

// Run Server
app.listen(PORT, () => {
	console.log(`API Gateway running on port ${PORT}`);
});
