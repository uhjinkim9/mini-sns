import jwt from "jsonwebtoken";

import {JWT_PRIVATE_KEY, JWT_PUBLIC_KEY} from "../context/config.js";
import checkStatus from "../../../util/checkStatus.js";
import authService from "../service/authService.js";

// import {Password} from "../util/password.js";

// 테스트용으로 짧게
const expiresInAccess = "10s";
const expiresInRefresh = "20s";

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
			return res.status(401).json({message: "User not found"});
		}

		const {accessToken, refreshToken} = await issueToken({
			userId,
			companyId: existingUser.companyId,
		});
		// Insert the refreshToken to DB
		if (refreshToken) {
			await authService.insertToken(
				userId,
				accessToken,
				refreshToken
				// loginIp,
				// userAgent
			);
		}

		// Return the accesssToken
		return res.status(200).json({
			user: existingUser,
			accessToken: accessToken,
			refreshToken: refreshToken,
		});
	} catch (err) {
		console.error("Error in postLogin:", err);
		res.status(500).json({message: "Internal Server Error"});
	}
}

/**
 * Renew the access token using a valid refresh token
 */
async function renewAccessToken(req, res, next) {
	console.log(req.body);
	const {accessToken, userId, companyId} = req.body;

	// 액세스 토큰을 통해 리프레시 토큰 데이터 불러오기
	const existingToken = await authService.findToken(accessToken);
	if (!existingToken) {
		// 리프레시 토큰이 존재하지 않으니 로그인 페이지로 이동
		return res.status(401).json({message: "Invalid refresh token"});
	}
	const refreshToken = existingToken.refreshToken;
	console.log("refreshToken!!!!!!!!!!!!!!!", refreshToken);

	// 리프레시 토큰 검증
	jwt.verify(refreshToken, JWT_PUBLIC_KEY, async (err, decoded) => {
		if (err) {
			await authService.deleteToken(refreshToken);
			return res.status(401).json({
				// 여기서 중복 응답 발생
				error: "리프레시 토큰 만료 ➡️ 토큰 삭제",
			});
		}
		console.log("리프레시 토큰 검증됨");
	});

	// 액세스 토큰 재발급
	const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
		issueToken({userId, companyId});

	console.log(
		newAccessToken,
		newRefreshToken,
		"newAccessToken, newRefreshToken"
	);
	// Insert the refreshToken to DB
	if (newRefreshToken) {
		try {
			authService.insertToken(userId, newAccessToken, newRefreshToken);

			console.log("여기는 컨트롤러고 갱신 오류 없다");

			// Return the accesssToken
			return res.status(200).json({
				message: "Access token renewed successfully",
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		} catch (err) {
			console.err("Access token is not inserted in DB");
		}
	}
}

/* ----------------------------- 서비스로 보내지 않는 함수 ----------------------------- */

/**
 * Issue JWT when login succeeds
 * @return {json} Token
 */
function issueToken(userInfo) {
	const accessToken = generateJwt(
		{
			companyId: userInfo?.companyId,
			userId: userInfo?.userId,
		},
		expiresInAccess
	);
	const refreshToken = generateJwt(
		{
			companyId: userInfo?.companyId,
			userId: userInfo?.userId,
		},
		expiresInRefresh
	);
	return {accessToken, refreshToken};
}

/**
 * Generate JWT with user info
 * @param {string} userId User ID
 * @constant {object} payload Info to be included in token
 * @constant {string} secret Private key
 * @constant {object} options Token options
 * @return {string} Token
 */
function generateJwt(userInfo, expiresIn) {
	const payload = {userId: userInfo.userId, companyId: userInfo.companyId};
	const secret = JWT_PRIVATE_KEY;
	const options = {algorithm: "RS256", expiresIn: expiresIn};
	const token = jwt.sign(payload, secret, options);
	return token;
}

const authController = {postLogin, issueToken, renewAccessToken};
export default authController;
