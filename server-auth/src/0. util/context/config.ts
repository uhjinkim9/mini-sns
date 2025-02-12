/************************************
 * 서버에 필요한 환경변수 가져오는 함수
 ************************************/

import {getRootDir} from "./directory";
import path from "path";
import fs from "fs";

export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_PORT: string | undefined = process.env.DB_PORT;
export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
export const DB_NAME: string | undefined = process.env.DB_NAME;

export const CLIENT_URL = process.env.CLIENT_URL;
export const GATEWAY_URL: string | undefined = process.env.GATEWAY_URL;

const rootDir = getRootDir();

// PEM 파일 읽기
const privateKeyPath = path.resolve(rootDir, path.join("keys", "private.pem"));
const publicKeyPath = path.resolve(rootDir, path.join("keys", "public.pem"));

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

// 비밀키
export const JWT_PRIVATE_KEY = privateKey;

// 공개키
export const JWT_PUBLIC_KEY = publicKey;
