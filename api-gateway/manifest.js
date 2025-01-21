module.exports = {
	version: "1.2.0",
	init: function (pluginContext) {
		let policy = require("./lib/plugins/proxy-with-body/index.js");
		pluginContext.registerPolicy(policy);
	},
};
