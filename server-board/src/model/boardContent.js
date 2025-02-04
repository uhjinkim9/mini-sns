import Sequelize from "sequelize"; // 라이브러리
import sequelize from "../database/database.js"; // DB 연결

const BoardContent = sequelize.define(
	"boardContent",
	{
		idx: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			comment: "Board Content Index",
		},
		boardContent: {
			type: Sequelize.STRING(1000),
			allowNull: false,
			comment: "게시물 내용",
		},
		creator: {
			type: Sequelize.STRING(50),
			comment: "게시물 등록 유저 아이디",
		},
	},
	{
		comment: "게시물 정보",
		timestamps: true,
	}
);

export default BoardContent;
