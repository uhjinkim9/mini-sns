/**
 * express 앱 설정 모듈
 */

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {fileURLToPath} from "url";

const app = express();

// CORS 설정
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5001"); // 게이트웨이 주소 허용
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

// JSON 파싱 미들웨어
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

import loginRoutes from "../routes/loginRoutes.js";
app.use("/auth", loginRoutes);

export default app;
