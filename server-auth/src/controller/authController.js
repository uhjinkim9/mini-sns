import jwt from "jsonwebtoken";

import { JWT_PRIVATE_KEY } from "../context/config.js";
import checkStatus from "../../../util/checkStatus.js";
import authService from "../service/authService.js";

// import {Password} from "../util/password.js";

async function postLogin(req, res, next) {
  try {
    const { userId, userPw } = req.body;
    if (checkStatus.isEmpty(userId) || checkStatus.isEmpty(userPw)) {
      return res.status(404).json({ message: "ID or PW is empty" });
    }

    const existingUser = await authService.findUser(userId, userPw);
    // 비밀번호 해시/비교
    // const pwMatch = await Password.compare(existingUser.userPw, userPw);
    // if (!pwMatch) {
    // 	return res.status(401).json({message: "PW does not match"});
    // }
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // 로그인 성공 시 token 발급
    const { token } = await issueToken({
      userId,
      companyId: existingUser.companyId,
    });
    if (token) {
      await authService.createToken(userId, token);
    }

    return res.status(200).json({
      user: existingUser,
      token: token,
    });
  } catch (err) {
    console.error("Error in postLogin:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Renew the access token using a valid refresh token
 */
async function renewAccessToken(req, res, next) {
  const { token, userId, companyId } = req.body;

  const existingToken = await authService.findToken(token);

  if (!existingToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  const now = new Date();
  if (new Date(existingToken.expireDate) < now) {
    // await authService.deleteToken(existingToken);
    return res.status(401).json({ message: "Refresh token has expired" });
  }

  // Issue a new access token
  const { token: newAccessToken } = issueToken({
    userId: userId,
    companyId: companyId,
  });
  console.log(newAccessToken);
  if (newAccessToken) {
    try {
      await authService.createToken(userId, newAccessToken);

      return res.status(200).json({
        message: "Access token renewed successfully",
        token: newAccessToken,
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
  const token = generateJwt(
    {
      companyId: userInfo?.companyId,
      userId: userInfo?.userId,
    },
    "1h"
  );
  return { token };
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
  const payload = { userId: userInfo.userId, companyId: userInfo.companyId };
  const secret = JWT_PRIVATE_KEY;
  const options = { algorithm: "RS256", expiresIn: expiresIn };
  return jwt.sign(payload, secret, options);
}

const authController = { postLogin, issueToken, renewAccessToken };
export default authController;
