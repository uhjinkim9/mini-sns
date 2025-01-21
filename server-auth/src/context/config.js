import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import rootDir from "../util/rootDir.js";

dotenv.config();

// 환경변수
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const CLIENT_URL = process.env.CLIENT_URL;
export const GATEWAY_URL = process.env.CLIENT_URL;

// PEM 파일 읽기
const privateKeyPath = path.resolve(
	rootDir,
	path.join("../", "keys", "private.pem")
);
const publicKeyPath = path.resolve(
	rootDir,
	path.join("../", "keys", "public.pem")
);

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

// 비밀키
export const JWT_PRIVATE_KEY = privateKey;

// 공개키
export const JWT_PUBLIC_KEY = publicKey;
