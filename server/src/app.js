/**
 * express 앱 설정 모듈
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

const corsOpt = {
	origin: "http://localhost:5001", // 프론트 개발 서버 주소
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

// JSON 파싱 미들웨어 추가
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOpt));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

import testRoutes from "../routes/testRoutes.js";
// app.use("/sample", testRoutes);
app.use(testRoutes);

export default app;
