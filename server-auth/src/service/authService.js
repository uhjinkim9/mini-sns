import User from "../model/user.js";
import UserToken from "../model/userToken.js";

async function findUser(userId, userPw) {
  const user = await User.findOne({
    where: {
      userId: userId,
      userPw: userPw, // 해시 함수 추가 시 지움
    },
  });
  return user;
}

async function findToken(tokenStr) {
  const token = await UserToken.findOne({
    where: {
      token: tokenStr,
    },
  });
  return token;
}

async function createToken(userId, refreshToken) {
  const now = new Date();

  try {
    await UserToken.create({
      userId: userId,
      token: refreshToken,
      issueDate: new Date(now.getTime()),
      expireDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days later
    });
  } catch (error) {
    console.error("Error creating token in DB:", error);
    throw new Error("Failed to create token in DB");
  }
}

async function updateToken(userId, refreshToken) {
  const now = new Date();
  await UserToken.update(
    {
      userId: userId,
      token: refreshToken,
      issueDate: new Date(now.getTime()),
      expireDate: new Date(now + 30 * 24 * 60 * 60 * 1000), // 30 days later
    },
    {
      where: {
        userId: userId,
      },
    }
  );
}

async function deleteToken(token) {
  await UserToken.destroy({
    where: {
      token: token,
    },
  });
}

const authService = {
  findUser,
  findToken,
  createToken,
  deleteToken,
};
export default authService;
