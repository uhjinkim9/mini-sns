import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../0_util/database/database"; // DB 연결

interface UserTokenAttributes {
	idx: number;
	userId: string;
	accessToken: string;
	refreshToken: string;
	loginIp?: string | null;
	userAgent?: string | null;
	issueDate: Date | null;
	expireDate?: Date | null;
}

interface UserTokenCreationAttributes
	extends Optional<
		UserTokenAttributes,
		"idx" | "loginIp" | "userAgent" | "issueDate" | "expireDate"
	> {}

class UserToken
	extends Model<UserTokenAttributes, UserTokenCreationAttributes>
	implements UserTokenAttributes
{
	public idx!: number;
	public userId!: string;
	public accessToken!: string;
	public refreshToken!: string;
	public loginIp!: string | null;
	public userAgent!: string | null;
	public issueDate!: Date | null;
	public expireDate!: Date | null;
}

UserToken.init(
	{
		idx: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			comment: "Token Index",
		},
		userId: {
			type: DataTypes.STRING(20),
			allowNull: false,
			comment: "사용자 ID",
		},
		accessToken: {
			type: DataTypes.STRING(500),
			allowNull: false,
			comment: "사용자 액세스 토큰",
		},
		refreshToken: {
			type: DataTypes.STRING(500),
			allowNull: false,
			comment: "사용자 리프레시 토큰",
		},
		loginIp: {
			type: DataTypes.STRING(50),
			comment: "사용자 로그인 IP",
		},
		userAgent: {
			type: DataTypes.STRING(1000),
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
		sequelize,
		modelName: "UserToken",
		comment: "리프레시 토큰",
	}
);

export default UserToken;
