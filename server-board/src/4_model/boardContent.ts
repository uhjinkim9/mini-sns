import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "@/0_util/database/database";

interface BoardContentAttributes {
	idx: number;
	boardContent: string;
	creator?: string;
}

interface BoardContentCreationAttributes
	extends Optional<BoardContentAttributes, "idx"> {}

class BoardContent
	extends Model<BoardContentAttributes, BoardContentCreationAttributes>
	implements BoardContentAttributes
{
	public idx!: number;
	public boardContent!: string;
	public creator?: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

BoardContent.init(
	{
		idx: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			comment: "Board Content Index",
		},
		boardContent: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			comment: "게시물 내용",
		},
		creator: {
			type: DataTypes.STRING(50),
			comment: "게시물 등록 유저 아이디",
		},
	},
	{
		sequelize,
		modelName: "boardContent",
		comment: "게시물 정보",
		timestamps: true,
	}
);

export default BoardContent;
