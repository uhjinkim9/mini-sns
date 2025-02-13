import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "@/0. util/database/database";

// ✅ 모델 속성 타입 정의
export interface PageAttributes {
	idx?: number; // autoIncrement이므로 선택적 필드
	pageGroup: string;
	pageNm: string;
	creator?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// ✅ 생성할 때 필요한 속성 (idx와 createdAt, updatedAt은 자동 생성)
export interface PageCreationAttributes
	extends Optional<
		PageAttributes,
		"idx" | "creator" | "createdAt" | "updatedAt"
	> {}

// ✅ `Page` 모델 정의
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

// ✅ Sequelize 모델 초기화 (`init()` 사용)
Page.init(
	{
		idx: {
			type: DataTypes.INTEGER.UNSIGNED, // ✅ 양수만 가능하도록 설정
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
			allowNull: true, // `creator`는 선택적 값이므로 `allowNull: true`
			comment: "페이지 생성한 유저 아이디",
		},
	},
	{
		sequelize,
		modelName: "Page",
		tableName: "page",
		comment: "페이지 라우팅 정보",
		timestamps: true, // ✅ `createdAt`, `updatedAt` 자동 추가
	}
);

export default Page;
