import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../0. util/database/database"; // DB 연결

export interface UserAttributes {
	companyId: string;
	userId: string;
	userPw: string;
	userNm: string;
	empNo: string | null;
	useYn?: boolean;
	userType?: string;
	userRole?: string;
	restrictYn?: boolean;
	loginFailCount?: number;
	refreshToken?: string;
	email?: string | null;
	extEmail?: string | null;
	emailYn?: boolean;
	createUser?: string | null;
	updateUser?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

interface UserCreationAttributes
	extends Optional<
		UserAttributes,
		| "empNo"
		| "useYn"
		| "userType"
		| "userRole"
		| "restrictYn"
		| "loginFailCount"
		| "email"
		| "extEmail"
		| "emailYn"
		| "createUser"
		| "updateUser"
		| "createdAt"
		| "updatedAt"
	> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public companyId!: string;
	public userId!: string;
	public userNm!: string;
	public userPw!: string;
	public empNo!: string | null;
	public useYn!: boolean;
	public userType!: string;
	public userRole!: string;
	public restrictYn!: boolean;
	public loginFailCount!: number;
	public refreshToken!: string;
	public email!: string | null;
	public extEmail!: string | null;
	public emailYn!: boolean;
	public createUser!: string | null;
	public updateUser!: string | null;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		companyId: {
			type: DataTypes.STRING(20),
			allowNull: false,
			comment: "회사 ID",
		},
		userId: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			comment: "사용자 ID",
		},
		userNm: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "사용자 이름",
		},
		userPw: {
			type: DataTypes.STRING(500),
			allowNull: false,
			comment: "사용자 비밀번호",
		},
		empNo: {
			type: DataTypes.STRING(20),
			defaultValue: null,
			comment: "사용자 사번",
		},
		useYn: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			comment: "계정 사용 여부: 1. true / 0. false",
		},
		userType: {
			type: DataTypes.STRING(1),
			defaultValue: "3",
			comment:
				"사용자 유형(기능 개방 범위): 1. 개발자 / 2. 관리자 / 3. 사용자",
		},
		userRole: {
			type: DataTypes.STRING(20),
			defaultValue: "ROLE002",
			comment:
				"사용자 역할(기능 개방 범위 내에서 권한 부여): ROLE001.관리자 / ROLE002.사용자",
		},
		restrictYn: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			comment: "관리자에 의해 사용 제한",
		},
		loginFailCount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: "로그인 실패 횟수",
		},
		refreshToken: {
			type: DataTypes.STRING(500),
			defaultValue: null,
			comment: "사용자 토큰",
		},
		email: {
			type: DataTypes.STRING(100),
			defaultValue: null,
			comment: "내부 이메일",
			validate: {
				isEmail: true,
			},
		},
		extEmail: {
			type: DataTypes.STRING(100),
			defaultValue: null,
			comment: "외부 이메일",
			validate: {
				isEmail: true,
			},
		},
		emailYn: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			comment: "안내 메일 수신 여부",
		},
		createUser: {
			type: DataTypes.STRING(20),
			defaultValue: null,
			comment: "등록자",
		},
		updateUser: {
			type: DataTypes.STRING(20),
			defaultValue: null,
			comment: "변경자",
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: "User",
		comment: "그룹웨어 사용자",
		indexes: [
			{
				unique: true,
				fields: ["user_id"],
			},
		],
	}
);

export default User;
