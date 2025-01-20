import jwt from "jsonwebtoken";

import { JWT_PRIVATE_KEY } from "../context/config.js";

// Generate JWT
// 추후 RSA 방식으로 해보기
export function generateJwt(userId, userPw) {
  let now = new Date();
  const payload = { userId: userId }; // 토큰 포함 데이터
  const secret = JWT_PRIVATE_KEY;
  const options = { algorithm: "RS256", expiresIn: "3h" }; // 토큰 만료 시간

  return jwt.sign(payload, secret, options);
}
