import {Sequelize} from "sequelize";

import {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
} from "@/0_util/context/config";

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
	console.error("DB 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
	process.exit(1); // 서버 실행 중지
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	dialect: "mysql",
	host: DB_HOST,
	port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
	logging: console.log, // 디버깅용, 운영에서는 false
	dialectOptions: {
		connectTimeout: 60000, // 연결될 때까지 60초 대기
	},
	define: {
		underscored: true, // snake_case
	},
});

async function connectDB(): Promise<void> {
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
