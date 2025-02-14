export interface LoginInfo {
	userId: string;
	userPw: string;
}

export interface TokenArgs {
	userId: string;
	companyId: string;
}

export interface Token {
	userId: string;
	accessToken: string;
	refreshToken: string;
}
