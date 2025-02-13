import jwt, {Algorithm} from "jsonwebtoken";
import {Request, Response} from "express";

import {JWT_PRIVATE_KEY, JWT_PUBLIC_KEY} from "@/0. util/context/config";
import password from "@/0. util/validator/password";
import authService from "@/3. service/authService";
import {LoginInfo, TokenArgs} from "../5. dto/user.interface";

// 테스트용으로 짧게
const expiresInAccess = "10s";
const expiresInRefresh = "20s";

const authController = {
	doLogin: async (req: Request, res: Response): Promise<Response> => {
		try {
			const {userId, userPw}: LoginInfo = req.body;

			console.log("컨트롤러", userId, userPw);
			// 프론트에서 유효성 검사
			// if (isEmpty(userId) || isEmpty(userPw)) {
			// 	return res.status(404).json({message: "ID or PW is empty"});
			// }

			const existingUser = await authService.findUser(userId as string);

			if (!existingUser) {
				return res.status(404).json({message: "User not found"});
			}

			// 비밀번호 해시/비교
			const pwMatch =
				existingUser?.userPw &&
				(await password.compare(existingUser.userPw, userPw));

			if (!pwMatch) {
				return res.status(404).json({message: "PW does not match"});
			}

			const {accessToken, refreshToken} = issueToken({
				userId,
				companyId: existingUser.companyId,
			});

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
				accessToken,
				refreshToken,
			});
		} catch (err) {
			console.error("Error in postLogin:", err);

			return res.status(500).json({message: "Internal Server Error"});
		}
	},

	/**
	 * Renew the access token using a valid refresh token
	 */
	renewAccessToken: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			console.log(req.body);
			const {accessToken, userId, companyId} = req.body;

			// 액세스 토큰을 통해 리프레시 토큰 데이터 불러오기
			const existingToken = await authService.findToken(accessToken);
			if (!existingToken) {
				// 리프레시 토큰이 존재하지 않으니 로그인 페이지로 이동
				return res.status(401).json({message: "Invalid refresh token"});
			}
			const refreshToken = existingToken.refreshToken;

			// 리프레시 토큰 검증
			if (typeof refreshToken === "string") {
				jwt.verify(
					refreshToken,
					JWT_PUBLIC_KEY,
					async (err: any, decoded: any) => {
						if (err) {
							if (refreshToken) {
								await authService.deleteToken(refreshToken);
								return res.status(401).json({
									// 여기서 중복 응답 발생
									error: "리프레시 토큰 만료 ➡️ 토큰 삭제",
								});
							}
						}
						console.log("리프레시 토큰 검증됨");
					}
				);
			} else {
				return res.status(401).json({message: "Invalid refresh token"});
			}

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
					authService.insertToken(
						userId,
						newAccessToken,
						newRefreshToken
					);

					console.log("여기는 컨트롤러고 갱신 오류 없다");

					// Return the accesssToken
					return res.status(200).json({
						message: "Access token renewed successfully",
						accessToken: newAccessToken,
						refreshToken: newRefreshToken,
					});
				} catch (err: unknown) {
					console.error("Access token is not inserted in DB");
					return res
						.status(500)
						.json({message: "Internal Server Error"});
				}
			}
			return res
				.status(500)
				.json({message: "Failed to renew access token"});
		} catch (err) {
			console.error("Error in renewAccessToken:", err);
			return res.status(500).json({message: "Internal Server Error"});
		}
	},
};

export default authController;

/* ----------------------------- 서비스로 보내지 않는 함수 ----------------------------- */

/**
 * Issue JWT when login succeeds
 * @param {string} userInfo 토큰에 담길 사용자 정보
 * @return {json} 토큰
 */
function issueToken(userInfo: TokenArgs) {
	const accessToken = generateJwt(
		{
			userId: userInfo.userId,
			companyId: userInfo.companyId,
		},
		expiresInAccess
	);
	const refreshToken = generateJwt(
		{
			userId: userInfo.userId,
			companyId: userInfo.companyId,
		},
		expiresInRefresh
	);
	return {accessToken, refreshToken};
}

/**
 * Generate JWT with user info
 * @param {string} userInfo 토큰에 담길 사용자 정보
 * @constant {object} payload Info to be included in token
 * @constant {string} secret Private key
 * @constant {object} options Token options
 * @return {string} Token
 */
function generateJwt(userInfo: TokenArgs, expiresIn: string): string {
	const payload = {userId: userInfo.userId, companyId: userInfo.companyId};
	const secret = JWT_PRIVATE_KEY;
	const options: jwt.SignOptions = {
		algorithm: "RS256" as Algorithm,
		expiresIn: expiresIn,
	};
	const token = jwt.sign(payload, secret, options);
	return token;
}
