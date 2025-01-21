import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

import {AUTH_SERVICE_URL} from "../context/config.js";

const router = express.Router();
console.log("로그인 관리 서버 주소: ", AUTH_SERVICE_URL);

router.use((req, res, next) => {
	console.log(
		`Request received: ${req.method} ${AUTH_SERVICE_URL}${req.path}`
	);
	next();
});

// 프록시 설정
router.use(
	"/api/auth",
	createProxyMiddleware({
		target: AUTH_SERVICE_URL, // http://localhost:5002
		changeOrigin: true,
		pathRewrite: {
			"^/api/auth": "/auth",
		},
	})
);

// 다른 서비스 프록시 설정 예시
router.use(
	"/other-service",
	createProxyMiddleware({
		target: "http://localhost:5003", // 다른 백엔드 서비스 주소
		changeOrigin: true,
		pathRewrite: {
			"^/api/other-service": "",
		},
	})
);

export default router;
