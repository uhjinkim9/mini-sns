import jwt from "jsonwebtoken";
const secret = "your-secret-key"; // 환경 변수 가져와

module.exports = {
	name: "jwtAuth",
	middleware: (req, res, next) => {
		const token = req.headers["authorization"]?.split(" ")[1];
		if (!token) {
			return res.status(401).send("Unauthorized");
		}

		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.status(403).send("Forbidden");
			}
			req.user = decoded;
			next();
		});
	},
};
