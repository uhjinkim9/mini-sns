import jwt from "jsonwebtoken";

import User from "../model/user.js";
import UserToken from "../model/userToken.js";
import {JWT_PRIVATE_KEY} from "../context/config.js";
import checkStatus from "../../../util/checkStatus.js";
import authService from "../service/authService.js";

// import {Password} from "../util/password.js";

async function postLogin(req, res, next) {
	try {
		const {userId, userPw} = req.body;
		if (checkStatus.isEmpty(userId) || checkStatus.isEmpty(userPw)) {
			return res.status(404).json({message: "ID or PW is empty"});
		}

		const existingUser = await authService.findUser(userId, userPw);
		// 비밀번호 해시/비교
		// const pwMatch = await Password.compare(existingUser.userPw, userPw);
		// if (!pwMatch) {
		// 	return res.status(401).json({message: "PW does not match"});
		// }
		if (!existingUser) {
			console.log("없는 사용자입니다.");
			return res.status(401).json({message: "User not found"});
		}

		// 로그인 성공 시 token 발급
		const {token, refreshToken} = await issueToken(
			{
				userId,
				companyId: existingUser.companyId,
			},
			existingUser
		);

		return res.status(200).json({
			user: existingUser,
			token: token,
			refreshToken: refreshToken,
		});
	} catch (err) {
		console.error("Error in postLogin:", err);
		res.status(500).json({message: "Internal Server Error"});
	}
}

/**
 * Issue JWT when login succeeds
 * @return {json} 토큰, 토큰 생성 여부 반환
 */
async function issueToken(userInfo, existingUser) {
	const now = new Date();
	const token = generateJwt(
		{
			companyId: userInfo?.companyId,
			userId: userInfo?.userId,
		},
		"1h"
	);

	// refresh token
	const refreshToken = generateJwt(
		{
			userId: userInfo.userId,
			companyId: existingUser.companyId,
			isRefresh: true,
		},
		"30d"
	);

	if (refreshToken) {
		await UserToken.create({
			userId: userInfo.userId,
			token: refreshToken,
			expireDate: new Date(
				now.getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days later
			),
		});

		await User.update(
			{
				refreshToken: refreshToken,
			},
			{where: {userId: userInfo.userId}}
		);
	}

	return {token, refreshToken};
}

/**
 * Generate JWT with user info
 * @param {string} userId 유저 정보
 * @constant {object} payload 토큰에 담을 정보
 * @constant {string} secret 비밀키
 * @constant {object} options 토큰 옵션
 * @return {string} 토큰
 */
function generateJwt(userInfo, expiresIn) {
	const payload = {userId: userInfo.userId, companyId: userInfo.companyId};
	const secret = JWT_PRIVATE_KEY;
	const options = {algorithm: "RS256", expiresIn: expiresIn};
	return jwt.sign(payload, secret, options);
}

/**
 * Get the refresh token info
 * @param {string} tokenStr 토큰 문자열
 * @return {string} 토큰 정보
 */
async function renewAccessToken(req, res, next) {
	const {token} = req.body;
	console.log(token);

	const existingToken = await authService.findToken(token);
}

const authController = {postLogin, issueToken, renewAccessToken};
export default authController;
