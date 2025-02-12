import User from "../4. model/user";
import UserToken from "../4. model/userToken";

import {UserTokenPayload} from "../5. dto/user.interface";

async function findUser(
	userId: string,
	userPw: string
): Promise<UserTokenPayload | null> {
	const user = await User.findOne({
		where: {
			userId: userId,
			userPw: userPw, // 해시 함수 추가 시 지움
		},
	});
	return user;
}

async function findToken(tokenStr: string): Promise<UserTokenPayload | null> {
	const token = await UserToken.findOne({
		where: {
			accessToken: tokenStr,
		},
	});
	return token;
}

async function insertToken(
	userId: string,
	accessToken: string,
	refreshToken: string,
	loginIp?: string,
	userAgent?: string
): Promise<void> {
	const now = new Date();

	try {
		await UserToken.create({
			userId: userId,
			accessToken: accessToken,
			refreshToken: refreshToken,
			loginIp: loginIp,
			userAgent: userAgent,
			issueDate: new Date(now.getTime()),
			expireDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
		});
	} catch (error) {
		console.error("Error creating token in DB:", error);
		throw new Error("Failed to create token in DB");
	}
}

// 리프레시 토큰 통한 삭제
async function deleteToken(token: string): Promise<void> {
	await UserToken.destroy({
		where: {
			refreshToken: token,
		},
	});
}

const authService = {
	findUser,
	findToken,
	insertToken,
	deleteToken,
};
export default authService;
