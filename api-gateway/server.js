const path = require("path");
const gateway = require("express-gateway");
const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();

app.use(
	"/api/auth",
	createProxyMiddleware({
		target: "http://localhost:5002",
		changeOrigin: true,
		// pathRewrite: {"^/auth": "/"},
		// onProxyReq(proxyReq, req, res) {
		// 	console.log("Incoming Request Path:", req.originalUrl);
		// 	console.log("Request Body:", req.body);

		// 	if (req.body) {
		// 		const bodyData = JSON.stringify(req.body);
		// 		proxyReq.setHeader(
		// 			"Content-Length",
		// 			Buffer.byteLength(bodyData)
		// 		);
		// 		proxyReq.write(bodyData); // 본문 데이터 전달
		// 	}
		// },
		// onProxyRes: async (proxyRes, req, res) => {
		// 	if (proxyRes.statusCode === 401) {
		// 		console.log("Proxy Response Status:", proxyRes.statusCode);

		// 		// 서버 인증으로 요청 전달
		// 		const fetch = require("node-fetch");
		// 		const tokenResponse = await fetch(
		// 			"http://localhost:5002/api/auth/issue-token",
		// 			{
		// 				method: "POST",
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify(req.body), // 요청 본문 재사용
		// 			}
		// 		);

		// 		if (tokenResponse.ok) {
		// 			const tokenData = await tokenResponse.json();
		// 			res.status(200).json(tokenData); // 발급된 토큰 반환
		// 		} else {
		// 			res.status(401).json({error: "Token issuance failed."});
		// 		}
		// 	}
		// },
	})
);

console.log("게이트웨이 굴러간다");

gateway().load(path.join(__dirname, "config")).run();
