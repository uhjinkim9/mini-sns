const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const REFRESH_TOKEN_URL = process.env.REFRESH_TOKEN_URL;

// PEM 파일 읽기
// const publicKeyPath = path.resolve(path.join("keys", "public.pem")); // 디버거 실행 시
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
	// 인증 헤더 없으면 오류 반환
	if (!authHeader) {
		return res.status(401).json({error: "Authorization header missing"}); // 프론트에서 로그인 페이지로 튕겨야 함❗
	}
	const accessToken = authHeader.split(" ")[1];
	// 액세스 토큰 없으면 오류 반환
	if (!accessToken) {
		return res.status(401).json({error: "Access token missing"}); // 프론트에서 로그인 페이지로 튕겨야 함❗
	}

	// const userAgent = req.headers["user-agent"];

	// 인증 헤더 있으면 액세스 토큰 검증
	jwt.verify(accessToken, JWT_PUBLIC_KEY, (err, decoded) => {
		// 만료되거나 무효
		if (err) {
			// 인증 헤더 있고 이 정책 활성화
			if (actionParams.enableRefresh) {
				console.log("Invalid or expired token");

				const decodedExpired = jwt.decode(accessToken);
				const {userId, companyId} = decodedExpired;
				return refreshToken(
					req,
					res,
					next,
					accessToken,
					userId,
					companyId
				);
			} else {
				// 인증 헤더 있지만 이 정책 비활성화, 프론트에서 재로그인
				return res.status(401).json({
					error: "JWT 커스텀 정책의 enableRefresh(actionParam)이 false인 상태",
				});
			}
		}

		// 페이로드가 있으면 req.user에 저장
		req.user = decoded;
		if (!decoded) {
			// 무효 토큰의 경우 위에서 갱신 함수 분기를 이미 탔으니, 이 예외는 아예 발급된 적 없는 액세스 토큰의 경우에 발생
			return res
				.status(401)
				.json({error: "무효화한 토큰으로 페이로드 추출 불가"});
		}
		const {
			userId: userId,
			companyId: companyId,
			iat: iat,
			exp: exp,
		} = decoded; // 페이로드 구조 분해

		// 남은 유효 시간에 따라 재발급
		const now = Math.floor(Date.now() / 1000); // 현재 시각(초 단위)
		const bufferTime = 60; // 60초
		// 만료 1분 전, 발급 시각 5분 경과 시 갱신
		if (
			exp - now < bufferTime &&
			now - iat > 10 && // 10초(테스트)
			actionParams.enableRefresh
		) {
			console.log("액세스 여전히 유효, 발급 후 5분 경과 ➡️ 토큰 갱신");
			return refreshToken(req, res, next, accessToken, userId, companyId);
		}

		// 토큰 유효: 바이패스
		return next();
	});
}

async function refreshToken(req, res, next, accessToken, userId, companyId) {
	const param = {accessToken, userId, companyId};
	console.log("리프레시 토큰 함수 들어옴!~!~!~!~!~!");

	try {
		const response = await fetch(REFRESH_TOKEN_URL, {
			// 여기서 중복 응답 발생
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(param),
		});

		const data = await response.json();
		const statCd = response.status;
		console.log("정책 내의 갱신 응답 데이터~!~!~!~!~!~!~!", statCd, data);

		// 갱신된 액세스 토큰을 원래 요청의 헤더에 설정
		req.headers["authorization"] = `Bearer ${data.accessToken}`; // 헤더 말고 응답으로 주기 바디로
		// RequestContentLengthMismatchError: Request body length does not match content-length header 오류를 제거하기 위한 코드인데 이걸 하는 게 맞는지 잘 모르겠음 일단 추가
		const modifiedHeaders = {...req.headers};
		delete modifiedHeaders["content-length"];

		if (statCd === 200) {
			console.log("토큰 갱신 완료👌");

			// return next();
			// return res.status(200).json({
			// 	message: "토큰 갱신 완료",
			// 	accessToken: data.accessToken,
			// 	refreshToken: data.refreshToken,
			// });

			console.log("original인데 윗부분이고 req 출력", req);

			// 원래 요청 실행
			const originalUrl = matchBaseUrl(req.originalUrl);
			const originalResponse = await fetch(originalUrl, {
				method: req.method,
				headers: modifiedHeaders,
				body: JSON.stringify(req.body),
			});

			const originalData = await originalResponse.json();
			console.log(
				"originalData인데 이 부분이 응답이 안오는 듯",
				originalData
			);

			// 백엔드의 원래 응답을 프론트엔드로 전달
			return res.status(originalResponse.status).json(originalData);
		} else {
			console.log("Failed to renew token");
			return res.status(401).json({error: "Failed to renew token"});
		}
	} catch (err) {
		console.error("Token refresh error:", err);
		return res.status(500).json({error: "Internal server error"});
	}
}

function matchBaseUrl(url) {
	const a = "api";
	const baseUrlMap = {
		[`${a}/auth`]: process.env.SERVER_AUTH_URL,
		[`${a}/board`]: process.env.SERVER_BOARD_URL,
	};

	const matched = Object.keys(baseUrlMap).find((key) => url.startsWith(key));

	if (!matched) {
		return res.status(400).json({error: "그런 서버 없다"});
	}

	const apiBaseUrl = baseUrlMap[matched];
	const originalUrl = new URL(url, apiBaseUrl); // 절대경로 변환

	return originalUrl;
}
