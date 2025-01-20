import User from "../model/user.js";
import {generateJwt} from "../util/jwtProvider.js";
import {Password} from "../util/password.js";

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

		// if (!existingUser) {
		// 	return res.status(401).json({message: "User not found"});
		// }
		// const pwMatch = await Password.compare(existingUser.userPw, userPw);
		// if (!pwMatch) {
		// 	return res.status(401).json({message: "PW does not match"});
		// }

		// const userJwt = generateJwt(userId, userPw);
		// req.session = {
		// 	jwt: userJwt,
		// };

		return res.status(200).json(existingUser);
	} catch (err) {
		console.error("Error in postLogin:", err);
		res.status(500).json({message: "Internal Server Error"});
	}
}

// function userRegister(req, res, next) {}

const loginController = {postLogin};

export default loginController;
