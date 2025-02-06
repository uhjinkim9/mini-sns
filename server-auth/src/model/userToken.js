import Sequelize, {DataTypes} from "sequelize"; // 라이브러리
import sequelize from "../database/database.js"; // DB 연결

const UserToken = sequelize.define(
	"userToken",
	{
		idx: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			comment: "Token Index",
		},
		userId: {
			type: Sequelize.STRING(20),
			allowNull: false,
			comment: "사용자 ID",
		},
		accessToken: {
			type: Sequelize.STRING(500),
			allowNull: false,
			comment: "사용자 액세스 토큰",
		},
		refreshToken: {
			type: Sequelize.STRING(500),
			allowNull: false,
			comment: "사용자 리프레시 토큰",
		},
		loginIp: {
			type: Sequelize.STRING(50),
			comment: "사용자 로그인 IP",
		},
		userAgent: {
			type: Sequelize.STRING(1000),
			comment: "사용자 소프트웨어 식별 정보",
		},
		issueDate: {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "토큰 발행 시각",
		},
		expireDate: {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "토큰 만료 시각",
		},
	},
	{
		comment: "리프레시 토큰",
	}
);

export default UserToken;
