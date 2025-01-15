/**
 * express 앱 설정 모듈
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000", // 프론트 개발 서버 주소
		credentials: true,
	})
);

app.use(bodyParser.urlencoded({extended: true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

import testRoutes from "../routes/testRoutes.js";
app.use("/sample", testRoutes);

// JSON 파싱 미들웨어 추가
app.use(express.json());

export default app;
