const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://localhost:5001", // 게이트웨이
			changeOrigin: true,
			secure: false,
		})
	);
};
