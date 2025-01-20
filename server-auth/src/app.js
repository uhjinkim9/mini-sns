/**
 * express 앱 설정 모듈
 */

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {fileURLToPath} from "url";

const app = express();

app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({extended: true})); // URL-encoded 본문 파싱

// CORS 설정
app.use((req, res, next) => {
	const allowedOrigins = ["http://localhost:5000", "http://localhost:5001"]; // 프론트와 게이트웨이 주소
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Origin", origin);
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
	next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

import loginRoutes from "./routes/loginRoutes.js";
app.use(loginRoutes);

export default app;
