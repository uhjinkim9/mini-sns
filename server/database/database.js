import Sequelize from "sequelize";
import dotenv from "dotenv";
import path from "path";

import dirname from "../util/dirname.js";

// .env 파일 로드
dotenv.config({path: path.join(dirname, "..", ".env")});

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
	console.error("DB 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
	process.exit(1); // 서버 실행 중지
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	dialect: "mysql",
	host: DB_HOST,
	port: DB_PORT,
	logging: console.log, // 디버깅용, 운영에서는 false
	dialectOptions: {
		connectTimeout: 60000, // 타임아웃 60초 설정
	},
});

async function connectDB() {
	try {
		await sequelize.authenticate();
		console.log("데이터베이스 연결 성공");
	} catch (err) {
		console.error("데이터베이스 연결 실패:", err);
		process.exit(1); // 연결 실패 시 프로세스 종료
	}
}

connectDB();

export default sequelize;