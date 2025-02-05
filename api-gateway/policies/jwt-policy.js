const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const REFRESH_TOKEN_URL = "http://localhost:5003/api/board/getPages";

// PEM 파일 읽기
const publicKeyPath = path.resolve(path.join("..", "keys", "public.pem"));
const publicKey = fs.readFileSync(publicKeyPath, "utf8");
const JWT_PUBLIC_KEY = publicKey;

module.exports = {
	name: "jwt-policy",
	schema: {
		$id: "http://express-gateway.io/schemas/policies/jwt-policy.json",
		type: "object",
		properties: {
			enableRefresh: {
				type: "boolean",
				default: true,
			},
		},
	},
	policy: (actionParams) => {
		return async (req, res, next) =>
			verifyToken(req, res, next, actionParams);
	},
};

async function verifyToken(req, res, next, actionParams) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(401).json({error: "Authorization header missing"});
	}

	const token = authHeader.split(" ")[1]; // "Bearer <token>" 형식
	if (!token) {
		return res.status(401).json({error: "Token missing"});
	}

	jwt.verify(token, JWT_PUBLIC_KEY, async (err, decoded) => {
		if (err) {
			return res.status(401).json({error: "Invalid or expired token"});
		}

		req.user = decoded; // 사용자 정보 저장
		const exp = decoded.exp;
		const now = Math.floor(Date.now() / 1000); // 현재 시간(초 단위)
		const bufferTime = 60; // 1분 (만료 1분 전 갱신)

		if (exp - now < bufferTime && actionParams.enableRefresh) {
			console.log("Token is attempting refresh");
			return refreshToken(req, res, next);
		}

		next();
	});
}

async function refreshToken(req, res, next) {
	const {companyId, userId} = req.user;
	const token = req.headers["authorization"].split(" ")[1];

	const param = {token, userId, companyId};

	try {
		const response = await fetch(REFRESH_TOKEN_URL, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(param),
		});

		const data = await response.json();
		const statCd = response.status;

		if (statCd === 200) {
			console.log("Token successfully renewed");
			req.headers["authorization"] = `Bearer ${data.token}`;
			return next();
		} else {
			console.log("Failed to renew token");
			return res.status(401).json({error: "Failed to renew token"});
		}
	} catch (err) {
		console.error("Token refresh error:", err);
		return res.status(500).json({error: "Internal server error"});
	}
}
