import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import rootDir from "../util/rootDir.js";

dotenv.config();

// 환경변수
export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;
export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
export const BOARD_SERVICE_URL = process.env.BOARD_SERVICE_URL;
export const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL;

// PEM 파일 읽기
const privateKeyPath = path.resolve(rootDir, path.join("keys", "private.pem"));
const publicKeyPath = path.resolve(rootDir, path.join("keys", "public.pem"));

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

// 비밀키
export const JWT_PRIVATE_KEY = privateKey;

// 공개키
export const JWT_PUBLIC_KEY = publicKey;
