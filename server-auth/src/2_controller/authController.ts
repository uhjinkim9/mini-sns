import jwt, { Algorithm } from "jsonwebtoken";
import { Request, Response } from "express";

import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from "@/0_util/context/config";
import password from "@/0_util/validator/password";
import { isNotEmpty } from "@/0_util/validator/emptyCheck";

import { LoginInfo, TokenArgs } from "../5_dto/user.interface";
import userService from "@/3_service/userService";
import tokenService from "@/3_service/tokenService";

// 테스트용으로 짧게
const expiresInAccess = "10s";
const expiresInRefresh = "20s";

const authController = {
  /**
   * 로그인 및 액세스 토큰 신규 발급 함수
   * @returns 사용자 정보와 신규 액세스 토큰
   */
  doLogin: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, userPw }: LoginInfo = req.body;

      const existingUser = await userService.findUser(userId as string);
      if (!existingUser) {
        return res.status(204).json({ message: "해당 ID의 사용자 정보 없음" });
      }

      const pwMatch =
        existingUser?.userPw &&
        (await password.compare(existingUser.userPw, userPw));
      if (!pwMatch) {
        return res.status(401).json({ message: "비밀번호 불일치" });
      }

      const { accessToken, refreshToken } = issueToken(
        {
          userId,
          companyId: existingUser.companyId,
        },
        false
      );

      if (refreshToken) {
        await tokenService.deleteToken(userId); // 기존 리프레시 토큰 삭제
        await tokenService.insertToken(
          userId,
          refreshToken
          // loginIp,
          // userAgent
        );
        await userService.updateUser(userId, { refreshToken: refreshToken });
      }

      // 액세스 토큰 반환
      return res.status(200).json({
        user: existingUser,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error("Error in postLogin:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  /**
   * 액세스 토큰 갱신
   * @returns
   */
  renewAccessToken: async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log(req.body);
      const { refreshToken, userId, companyId } = req.body;

      if (!isNotEmpty(refreshToken)) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // 리프레시 토큰 검증
      try {
        const decoded = jwt.verify(refreshToken, JWT_PUBLIC_KEY) as TokenArgs;

        // 페이로드의 사용자 ID와 요청의 ID가 동일한지 확인
        if (decoded.userId !== userId) {
          return res
            .status(403)
            .json({ message: "Invalid refresh token owner" });
        }

        console.log("리프레시 토큰 검증됨");

        // 액세스 토큰 재발급
        const { accessToken: newAccessToken } = issueToken(
          { userId, companyId },
          true
        );

        console.log(newAccessToken, "갱신해서 재발급한 newAccessToken");
        return res.status(200).json({
          message: "액세스 토큰 갱신",
          accessToken: newAccessToken,
        });
      } catch (err) {
        console.error("리프레시 토큰 검증 실패:", err);

        // 리프레시 토큰이 만료 시 토큰 삭제
        await tokenService.deleteToken(userId);
        await userService.updateUser(userId, { refreshToken: "" });

        return res.status(401).json({
          error: "리프레시 토큰 만료되어 토큰 삭제",
        });
      }
    } catch (err) {
      console.error("Error in renewAccessToken:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;

/* ----------------------------- 서비스로 보내지 않는 함수 ----------------------------- */

/**
 * 로그인 성공 시 JWT 발급(액세스 토큰, 리프레시 토큰)
 * @param {string} userInfo 토큰에 담길 사용자 정보
 * @param {boolean} isRenew 갱신일 경우 리프레시 토큰 재발급 생략
 * @returns {json} 토큰
 */
function issueToken(userInfo: TokenArgs, isRenew: boolean) {
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

  // 갱신일 경우 리프레시 토큰을 반환할 필요 없음
  if (isRenew) {
    return { accessToken };
  }
  return { accessToken, refreshToken };
}

/**
 * Generate JWT with user info
 * @param {string} userInfo 토큰에 담길 사용자 정보
 * @constant {string} secret RSA 비밀 키
 * @constant {object} options 토큰 옵션
 * @returns {string} 토큰
 */
function generateJwt(userInfo: TokenArgs, expiresIn: string): string {
  const payload = { userId: userInfo.userId, companyId: userInfo.companyId };
  const secret = JWT_PRIVATE_KEY;
  const options: jwt.SignOptions = {
    algorithm: "RS256" as Algorithm,
    expiresIn: expiresIn,
  };
  const token = jwt.sign(payload, secret, options);
  return token;
}
