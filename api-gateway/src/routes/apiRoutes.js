import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

import {AUTH_SERVICE_URL} from "../context/config.js";

const router = express.Router();
console.log("프록시 요청 전달 중...");

// 프록시 설정
router.use(
	"/auth",
	createProxyMiddleware({
		// target: "http://localhost:5002",
		target: AUTH_SERVICE_URL, // http://localhost:5002
		changeOrigin: true,
		// pathRewrite: {
		// 	"^/auth": "/", // 경로 재작성 (필요시)
		// },
		onProxyReq(proxyReq, req, res) {
			console.log("request to target:", proxyReq.getHeader("host"));
			console.log("Request Body:", req.body);

			if (req.body) {
				const bodyData = JSON.stringify(req.body);
				proxyReq.setHeader(
					"Content-Length",
					Buffer.byteLength(bodyData)
				);
				proxyReq.write(bodyData);
			}
		},
	})
);

export default router;
