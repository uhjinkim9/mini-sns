/**
 * express 앱 설정 모듈
 */

import express from "express";
import path from "path";
import {fileURLToPath} from "url";

import cors from "cors";

import {CLIENT_URL, GATEWAY_URL} from "./context/config.js";

const app = express();

// JSON 및 URL-encoded 파싱 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS 설정
app.use(
	cors({
		origin: [CLIENT_URL, GATEWAY_URL],
		credentials: true,
		// optionsSuccessStatus: 200,
	})
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

export default app;
