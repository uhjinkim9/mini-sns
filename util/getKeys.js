import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import rootDir from "./rootDir.js";

dotenv.config();

// PEM 파일 읽기
const privateKeyPath = path.resolve(rootDir, path.join("keys", "private.pem"));
const publicKeyPath = path.resolve(rootDir, path.join("keys", "public.pem"));

console.log(privateKeyPath, " - privateKeyPath");
console.log(publicKeyPath, " - publicKeyPath");

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

// 비밀키
export const JWT_PRIVATE_KEY = privateKey;
// 공개키
export const JWT_PUBLIC_KEY = publicKey;
