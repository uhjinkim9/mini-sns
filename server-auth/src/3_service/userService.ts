import User from "@/4_model/user";
import { UserAttributes } from "@/4_model/user";

/**
 * ID를 통해 해당 사용자 정보 가져옴
 * @param userId 사용자 ID
 * @returns 사용자 정보
 */
async function findUser(userId: string): Promise<UserAttributes | null> {
  const user = await User.findOne({
    where: {
      userId: userId,
    },
  });
  return user;
}

/**
 * 특정 ID의 사용자 정보 업데이트
 * @param userId 사용자 ID (필수)
 * @param updateData 업데이트할 데이터 객체
 */
async function updateUser(
  userId: string,
  updateData: Partial<UserAttributes> // User 모델의 필드 전체를 선택적으로 받을 수 있음
): Promise<void> {
  try {
    await User.update(updateData, {
      where: { userId: userId },
    });
  } catch (error) {
    console.log("User 테이블 업데이트 실패");
  }
}

const userService = {
  findUser,
  updateUser,
};
export default userService;
