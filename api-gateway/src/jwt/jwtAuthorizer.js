import jwt from "jsonwebtoken";

// 인증 미들웨어
export function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({error: "Atuthorization header missing"});
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({error: "Token missing"});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.user = decoded; // 인증된 사용자 정보 추가
		next();
	} catch (err) {
		console.error("JWT verification failed:", err.message);
		res.status(401).json({error: "Invalid or expired token"});
	}
}
