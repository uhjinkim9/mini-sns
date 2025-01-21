module.exports = {
	name: "proxy-with-body",
	policy: (actionParams) => {
		return (req, res, next) => {
			if (req.body) {
				console.log("Request Body:", req.body);
			}
			next();
		};
	},
};
