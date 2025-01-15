const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://localhost:3001", // 백 개발 주소
			changeOrigin: true,
		})
	);
};
