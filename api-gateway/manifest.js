module.exports = {
	version: "1.2.0",
	init: function (pluginContext) {
		let jwtPolicy = require("./policies/jwt-policy");
		pluginContext.registerPolicy(jwtPolicy);
		console.log("✅ jwtPolicy registered successfully!");
	},
};
