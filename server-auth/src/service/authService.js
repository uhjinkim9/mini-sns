import jwt from "jsonwebtoken";

import User from "../model/user.js";
import UserToken from "../model/userToken.js";
// import {JWT_PRIVATE_KEY} from "../context/config.js";
import checkStatus from "../../../util/checkStatus.js";

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
	const token = await UserToken.fineOne({
		where: {
			token: tokenStr,
		},
	});
	return token;
}

const authService = {findUser, findToken};
export default authService;
