import jwt from "jsonwebtoken";

import {JWT_PUBLIC_KEY} from "../../util/getKeys.js";

// 인증 미들웨어
export function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({error: "Atuthorization header missing"});
	}

	const token = authHeader.split(" ")[1]; // "Bearer <token>" 형식
	if (!token) {
		return res.status(401).json({error: "Token missing"});
	}

	try {
		const decoded = jwt.verify(token, JWT_PUBLIC_KEY, {
			algorithms: ["RS256"],
		});
		req.user = decoded; // 토큰에서 사용자 정보 추출
		next();
	} catch (err) {
		console.error("JWT verification failed:", err.message);
		res.status(401).json({error: "Invalid or expired token"});
	}

	// 검증 실패 시 server-auth에서 새 토큰 요청 로직 필요
}
