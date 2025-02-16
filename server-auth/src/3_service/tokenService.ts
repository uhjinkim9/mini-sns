import UserToken from "@/4_model/userToken";

/**
 * 사용자 ID 통해 토큰 정보 가져오는 함수
 * @param userId
 * @returns 토큰 정보
 */
async function findToken(userId: string): Promise<UserToken | null> {
  const token = await UserToken.findOne({
    where: {
      userId: userId,
    },
  });
  return token;
}

async function insertToken(
  userId: string,
  refreshToken: string,
  loginIp?: string,
  userAgent?: string
): Promise<void> {
  const now = new Date();

  try {
    await UserToken.create({
      userId: userId,
      refreshToken: refreshToken,
      loginIp: loginIp,
      userAgent: userAgent,
      issueDate: new Date(now.getTime()),
      expireDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    console.error("Error creating token in DB:", error);
    throw new Error("Failed to create token in DB");
  }
}

/**
 * 사용자 ID를 통한 토큰 정보 삭제
 * @param userId
 */
async function deleteToken(userId: string): Promise<void> {
  await UserToken.destroy({
    where: {
      userId: userId,
    },
  });
}

const tokenService = {
  findToken,
  insertToken,
  deleteToken,
};
export default tokenService;
