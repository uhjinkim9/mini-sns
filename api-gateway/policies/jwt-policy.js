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
	if (req.method === "OPTIONS") {
		return res
			.status(204) // CORS 프리플라이트 응답
			.json({message: "Preflight request skips auth verification"});
	}

	const authHeader = req.headers["authorization"];
	// const userAgent = req.headers["user-agent"] || "Unknown User-Agent";
	const accessToken = authHeader.split(" ")[1];

	// 인증 헤더 없으면 오류 반환
	if (!authHeader) {
		return res.status(401).json({error: "Authorization header missing"}); // 프론트에서 로그인 페이지로 튕겨야 함❗
	}

	// 액세스 토큰 없으면 오류 반환
	if (!accessToken) {
		return res.status(401).json({error: "Access token missing"}); // 프론트에서 로그인 페이지로 튕겨야 함❗
	}

	// 인증 헤더 있으면 액세스 토큰 검증
	jwt.verify(accessToken, JWT_PUBLIC_KEY, (err, decoded) => {
		if (err) {
			// 인증 헤더 있고 이 정책 활성화
			if (actionParams.enableRefresh) {
				console.log("Invalid or expired token");
				next(); // 재발급 로직으로 이동
			} else {
				// 인증 헤더 있지만 이 정책 비활성화
				return res.status(401).json({
					error: "enableRefresh(actionParam in jwt-policy of gateway) is false",
				});
			}
		}

		// 검증 성공하면 페이로드를 반환하지만, 실패하면 undefined
		req.user = decoded;
		if (!decoded) {
			console.log("액세스 만료하여 페이로드 없음 ➡️ 토큰 갱신");
			return refreshToken(accessToken, userId, companyId);
		}

		console.log("❗❗req.user", req.user);

		const {
			userId: userId,
			companyId: companyId,
			iat: iat,
			exp: exp,
		} = req.user; // 페이로드 구조 분해

		// 재발급
		const now = Math.floor(Date.now() / 1000); // 현재 시각(초 단위)
		const bufferTime = 60; // 60초
		// 만료 1분 전, 발급 시각 5분 경과 시 갱신
		if (
			exp - now < bufferTime &&
			now - iat > bufferTime * 5 &&
			actionParams.enableRefresh
		) {
			console.log("액세스 여전히 유효, 발급 후 5분 경과 ➡️ 토큰 갱신");
			return refreshToken(accessToken, userId, companyId);
		}

		// 토큰 유효: 바이패스
		next();
	});
}

async function refreshToken(accessToken, userId, companyId) {
	const param = {accessToken, userId, companyId};

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
