import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "@/0_util/database/database";

export interface PageAttributes {
	idx?: number; // autoIncrement이므로 선택적 필드
	pageGroup: string;
	pageNm: string;
	creator?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PageCreationAttributes
	extends Optional<
		PageAttributes,
		"idx" | "creator" | "createdAt" | "updatedAt"
	> {}

class Page
	extends Model<PageAttributes, PageCreationAttributes>
	implements PageAttributes
{
	public idx!: number;
	public pageGroup!: string;
	public pageNm!: string;
	public creator!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Page.init(
	{
		idx: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			comment: "Page Index",
		},
		pageGroup: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "페이지 폴더명: 소문자로 시작",
		},
		pageNm: {
			type: DataTypes.STRING(100),
			allowNull: false,
			comment: "페이지명: 대문자로 시작, 함수명 일치",
		},
		creator: {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "페이지 생성한 유저 아이디",
		},
	},
	{
		sequelize,
		modelName: "Page",
		comment: "페이지 라우팅 정보",
		timestamps: true,
	}
);

export default Page;
