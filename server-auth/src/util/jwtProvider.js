import jwt from "jsonwebtoken";

import {JWT_PRIVATE_KEY} from "../context/config.js";

// Generate JWT
export default function generateJwt(userId) {
	let now = new Date();
	const payload = {userId: userId}; // 토큰 포함 데이터
	const secret = JWT_PRIVATE_KEY;
	const options = {algorithm: "RS256", expiresIn: "3h"}; // 토큰 만료 시간

	return jwt.sign(payload, secret, options);
}
