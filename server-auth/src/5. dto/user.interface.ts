interface UserAttributes {
	companyId: string;
	userId: string;
	userNm: string;
	userPw: string | null;
	empNo: string | null;
	useYn?: boolean;
	userType?: string;
	userRole?: string;
	restrictYn?: boolean;
	loginFailCount?: number;
	refreshToken?: string;
	email?: string | null;
	extEmail?: string | null;
	mailYn?: boolean;
	createUser?: string | null;
	updateUser?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserLoginInfo {
	userId: string;
	userPw: string;
}

export interface UserTokenPayload {
	userId: string;
	userPw: string;
	companyId: string;
	refreshToken?: string;
}
