import Sequelize, {DataTypes} from "sequelize"; // 라이브러리
import sequelize from "../database/database.js"; // DB 연결
import moment from "moment-timezone";

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
		token: {
			type: Sequelize.STRING(500),
			allowNull: false,
			comment: "사용자 토큰",
		},
		issueDate: {
			type: DataTypes.DATE,
			defaultValue: () => moment().tz("Asia/Seoul").format(),
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
