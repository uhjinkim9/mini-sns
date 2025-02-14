/**********************
 * express 앱 설정 모듈
 **********************/

import express from "express";
import path from "path";

import cors from "cors";

import {CLIENT_URL, GATEWAY_URL} from "./0_util/context/config";
import {getAppRootDir} from "./0_util/context/directory";

const app = express();

// JSON 및 URL-encoded 파싱 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS 설정
app.use(
	cors({
		origin: [CLIENT_URL || "", GATEWAY_URL || ""],
		credentials: true,
		// optionsSuccessStatus: 200,
	})
);

// 정적 파일 제공
app.use(express.static(path.join(getAppRootDir(), "public")));

import boardRoutes from "./1_router/boardRoutes";
app.use("/api/board", boardRoutes);

export default app;
