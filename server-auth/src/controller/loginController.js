import User from "../model/user.js";
import generateJwt from "../util/jwtProvider.js";
import {Password} from "../util/password.js";

import {JWT_PRIVATE_KEY} from "../context/config.js";

async function postLogin(req, res, next) {
	console.log("req.body: ", req.body);

	console.log("Request Headers:", req.headers);
	console.log("Request Body:", req.body);
	console.log("Request Query:", req.query);
	console.log("Request Params:", req.params);

	try {
		const {userId, userPw} = req.body;
		if (userId === null || undefined || userPw === null || undefined) {
			return res.status(404).json({message: "ID or PW is empty"});
		}

		console.log("userId, userPw: ", userId, userPw);

		const existingUser = await User.findOne({
			where: {
				userId: userId,
				userPw: userPw,
			},
		});

		console.log("유저 찾음: ", existingUser);

		if (!existingUser) {
			return res.status(401).json({message: "User not found"});
		}
		// const pwMatch = await Password.compare(existingUser.userPw, userPw);
		// if (!pwMatch) {
		// 	return res.status(401).json({message: "PW does not match"});
		// }

		const userJwt = generateJwt(userId);
		// localStorage.setItem("token", userJwt); // 토큰 저장

		return res.status(200).json({user: existingUser, token: userJwt});
	} catch (err) {
		console.error("Error in postLogin:", err);
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function issueToken(req, res, next) {
	const {userId, userPw} = req.body;

	const existingUser = await User.findOne({
		where: {
			userId: userId,
			userPw: userPw,
		},
	});

	if (existingUser) {
		const token = generateJwt(userId);
		return res.status(200).json({token});
	}

	return res.status(401).json({error: "Invalid login info"});
}

const loginController = {postLogin, issueToken};

export default loginController;
