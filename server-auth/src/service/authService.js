import User from "../model/user.js";
import UserToken from "../model/userToken.js";

async function findUser(userId, userPw) {
	const user = await User.findOne({
		where: {
			userId: userId,
			userPw: userPw, // 해시 함수 추가 시 지움
		},
	});
	return user;
}

async function findToken(tokenStr) {
	const token = await UserToken.findOne({
		where: {
			accessToken: tokenStr,
		},
	});
	console.log("token in service!!!!!!!!~~~~", token);
	return token;
}

async function insertToken(
	userId,
	accessToken,
	refreshToken,
	loginIp,
	userAgent
) {
	const now = new Date();

	try {
		await UserToken.create({
			userId: userId,
			accessToken: accessToken,
			refreshToken: refreshToken,
			loginIp: loginIp,
			userAgent: userAgent,
			issueDate: new Date(now.getTime()),
			expireDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days later
		});
	} catch (error) {
		console.error("Error creating token in DB:", error);
		throw new Error("Failed to create token in DB");
	}
}

// 리프레시 토큰 통한 삭제
async function deleteToken(token) {
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
