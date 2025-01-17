import User from "../model/user.js";

function postLogin(req, res, next) {
	let userId = req.body.userId;
	console.log(userId);
	User.findOne({
		where: {
			userId: "admin",
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).json({message: "User not found"});
			}
			res.status(200).json({user});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({message: "Server error"});
		});
}

const loginController = {postLogin};

export default loginController;
